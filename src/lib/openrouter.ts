import { sseToText, pareceRazonamiento } from './sse-stream';
import { openrouterModel } from './env';

/* Llamada a OpenRouter en streaming con CADENA DE MODELOS GRATIS y fallback:
   si un modelo está saturado (429), falla, o devuelve su propio razonamiento
   en lugar de la respuesta, prueba el siguiente. Así el demo sigue funcionando
   aunque un modelo gratis concreto esté rate-limited. */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const SITE_URL = 'https://platanitorico.com';

/* Caracteres que se leen antes de dejar pasar la respuesta al navegador: lo
   justo para detectar una deliberación filtrada sin que se note la espera. */
const MUESTRA_CONTROL = 320;

/* Modelos gratuitos capaces y multilingües (verificados en la API de OpenRouter).
   Se prueban en orden hasta que uno responda.
   NOTA (16-09-2026): `openai/gpt-oss-120b:free` se retiró de la cadena. Escribe
   en canales (analysis/commentary/final) y varios proveedores de OpenRouter
   sirven el canal de análisis como contenido normal: el visitante veía el
   razonamiento del modelo y las instrucciones internas. */
export const FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'google/gemma-4-31b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
];

/* Modelos gratuitos con VISIÓN (aceptan imágenes), para análisis multimodal. */
export const VISION_MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-nano-12b-v2-vl:free',
  'nex-agi/nex-n2-pro:free',
];

interface ChatMsg { role: 'system' | 'user' | 'assistant'; content: string | unknown[] }
interface Opts {
  apiKey: string;
  title: string;
  messages: ChatMsg[];
  temperature?: number;
  maxTokens?: number;
}

/** Lee el principio del stream para poder inspeccionarlo antes de servirlo.
 *  Devuelve lo leído y un stream que lo reproduce seguido del resto. */
async function leerInicio(texto: ReadableStream<Uint8Array>, minimo: number): Promise<{ inicio: string; completo: ReadableStream<Uint8Array> }> {
  const reader = texto.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let inicio = '';
  let agotado = false;

  while (inicio.length < minimo) {
    const { done, value } = await reader.read();
    if (done) { agotado = true; break; }
    inicio += decoder.decode(value, { stream: true });
  }

  const completo = new ReadableStream<Uint8Array>({
    start(controller) {
      if (inicio) controller.enqueue(encoder.encode(inicio));
      if (agotado) controller.close();
    },
    async pull(controller) {
      if (agotado) return;
      const { done, value } = await reader.read();
      if (done) { agotado = true; controller.close(); return; }
      controller.enqueue(value);
    },
    cancel() { reader.cancel().catch(() => { /* noop */ }); },
  });

  return { inicio, completo };
}

/** Devuelve una Response: stream de texto (200) o JSON de error (502). */
export async function streamChatResponse(opts: Opts): Promise<Response> {
  // Si hay un modelo forzado por entorno, se prueba primero; si no, la cadena gratis.
  const forced = openrouterModel();
  const models = forced ? [forced, ...FREE_MODELS.filter((m) => m !== forced)] : FREE_MODELS;

  let lastStatus = 0;
  let lastDetail = '';

  for (const model of models) {
    let res: Response;
    try {
      res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${opts.apiKey}`,
          'HTTP-Referer': SITE_URL,
          'X-Title': opts.title,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          temperature: opts.temperature ?? 0.7,
          max_tokens: opts.maxTokens ?? 1200,
          stream: true,
          // Que el proveedor no mande el razonamiento por ningún canal.
          reasoning: { exclude: true },
          messages: opts.messages,
        }),
      });
    } catch (err) {
      lastDetail = String(err);
      continue; // error de red → siguiente modelo
    }

    if (res.ok && res.body) {
      const { inicio, completo } = await leerInicio(sseToText(res.body), MUESTRA_CONTROL);

      // El modelo ha soltado su deliberación en vez de la respuesta: no se
      // sirve (llevaría dentro las instrucciones internas) y se prueba otro.
      if (pareceRazonamiento(inicio)) {
        console.warn(`[openrouter] ${model} devolvió su razonamiento; se descarta y se prueba el siguiente`);
        completo.cancel().catch(() => { /* noop */ });
        lastStatus = 200;
        lastDetail = 'razonamiento filtrado';
        continue;
      }

      if (!inicio.trim()) {
        lastStatus = 200;
        lastDetail = 'respuesta vacía';
        completo.cancel().catch(() => { /* noop */ });
        continue;
      }

      return new Response(completo, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' },
      });
    }

    lastStatus = res.status;
    lastDetail = (await res.text().catch(() => '')).slice(0, 200);
    console.warn(`[openrouter] ${model} → ${res.status}, probando siguiente…`);
    // saturado / no disponible → siguiente modelo de la cadena
  }

  console.error('[openrouter] todos los modelos fallaron', lastStatus, lastDetail);
  return new Response(
    JSON.stringify({ error: 'El asistente está muy solicitado ahora mismo. Inténtalo de nuevo en unos segundos.' }),
    { status: 502, headers: { 'Content-Type': 'application/json' } },
  );
}

/** Llamada NO-streaming con cadena de modelos: devuelve el texto completo
 *  (útil cuando se espera JSON). Pasa VISION_MODELS para análisis de imagen. */
export async function chatText(
  opts: Opts,
  models: string[] = FREE_MODELS,
): Promise<{ ok: true; text: string } | { ok: false; status: number; detail: string }> {
  let lastStatus = 0;
  let lastDetail = '';
  for (const model of models) {
    let res: Response;
    try {
      res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${opts.apiKey}`,
          'HTTP-Referer': SITE_URL,
          'X-Title': opts.title,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          temperature: opts.temperature ?? 0.5,
          max_tokens: opts.maxTokens ?? 1500,
          reasoning: { exclude: true },
          messages: opts.messages,
        }),
      });
    } catch (err) { lastDetail = String(err); continue; }

    if (res.ok) {
      const data = await res.json().catch(() => null);
      const text = data?.choices?.[0]?.message?.content;
      if (typeof text === 'string' && text.trim()) {
        if (pareceRazonamiento(text)) {
          console.warn(`[openrouter] (json) ${model} devolvió su razonamiento; se descarta`);
          lastStatus = 200; lastDetail = 'razonamiento filtrado';
          continue;
        }
        return { ok: true, text };
      }
      lastStatus = res.status; lastDetail = 'respuesta sin contenido';
      continue;
    }
    lastStatus = res.status;
    lastDetail = (await res.text().catch(() => '')).slice(0, 200);
    console.warn(`[openrouter] (json) ${model} → ${res.status}, siguiente…`);
  }
  console.error('[openrouter] (json) todos los modelos fallaron', lastStatus, lastDetail);
  return { ok: false, status: lastStatus, detail: lastDetail };
}
