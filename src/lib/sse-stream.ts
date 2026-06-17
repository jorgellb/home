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
