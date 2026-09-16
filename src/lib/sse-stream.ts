/* Convierte el stream SSE de OpenRouter en un stream de texto plano (solo los
   deltas de contenido). Usa el patrón start+pump con cierre garantizado en
   `finally`, que termina de forma fiable en Vercel (a diferencia de `pull`,
   que dependía de que el consumidor siguiera pidiendo datos). */
export function sseToText(upstreamBody: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = upstreamBody.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const close = () => { if (!closed) { closed = true; try { controller.close(); } catch { /* ya cerrado */ } } };
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith('data:')) continue;
            const data = t.slice(5).trim();
            if (data === '[DONE]') { close(); reader.cancel().catch(() => { /* noop */ }); return; }
            try {
              const chunk = JSON.parse(data);
              const delta = chunk?.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch { /* keep-alive o fragmento parcial */ }
          }
        }
      } catch (err) {
        console.error('[sse] error en el stream:', err);
      } finally {
        close();
      }
    },
    cancel() { reader.cancel().catch(() => { /* noop */ }); },
  });
}

/* ── Detección de razonamiento filtrado ──────────────────────────────────
   Algunos modelos (gpt-oss y familia) escriben primero su deliberación y
   luego la respuesta, y ciertos proveedores la sirven como contenido normal.
   No se puede "recortar": en las muestras reales no hay ninguna marca que
   separe ambas partes, y la respuesta buena puede aparecer en medio, repetida
   o entrecomillada. Por eso no se intenta reconstruir nada: se detecta y se
   descarta la respuesta entera para probar con otro modelo. */

/** Marcas inequívocas de andamiaje interno, en cualquier posición. */
const MARCAS = [
  'assistantfinal',
  '<|channel|>',
  '<|message|>',
  '<think>',
  '</think>',
];

/** Arranques típicos de deliberación en inglés (el asistente responde en el
    idioma del usuario, así que un comienzo así ya es anómalo de por sí). */
const ARRANQUES = [
  /^\s*(okay|ok|alright|hmm|so)\b[,.]?\s+(the|we|i|let|this|user)\b/i,
  /^\s*(the user|we need to|i need to|let me|first,?\s+i|we should|i should)\b/i,
  /^\s*(analysis|commentary)\b\s*[:.]/i,
];

/** Frases que delatan que está razonando sobre sus propias instrucciones. */
const REFERENCIAS_AL_PROMPT = [
  /\b(the|my) (system )?(prompt|guidelines|instructions|rules)\b/i,
  /\bper the (rules|guidelines|instructions)\b/i,
  /\bcheck the (guidelines|rules|services|pricing)\b/i,
];

/**
 * ¿La respuesta trae el razonamiento del modelo en lugar de (o además de) la
 * respuesta? Se mira solo el principio para poder decidir en streaming.
 */
export function pareceRazonamiento(texto: string): boolean {
  if (!texto.trim()) return false;
  const inicio = texto.slice(0, 400);

  if (MARCAS.some((m) => texto.toLowerCase().includes(m))) return true;
  if (ARRANQUES.some((r) => r.test(inicio))) return true;
  // Referencias al propio prompt: solo cuentan si además arranca en inglés,
  // para no marcar una respuesta en español que mencione la palabra "rules".
  if (REFERENCIAS_AL_PROMPT.some((r) => r.test(inicio)) && /^[\sA-Za-z0-9'",.:;()-]{40,}/.test(inicio)) return true;

  return false;
}
