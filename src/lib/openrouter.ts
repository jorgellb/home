import { sseToText } from './sse-stream';
import { openrouterModel } from './env';

/* Llamada a OpenRouter en streaming con CADENA DE MODELOS GRATIS y fallback:
   si un modelo está saturado (429) o falla, prueba el siguiente. Así el demo
   sigue funcionando aunque un modelo gratis concreto esté rate-limited. */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const SITE_URL = 'https://platanitorico.com';

/* Modelos gratuitos capaces y multilingües (verificados en la API de OpenRouter).
   Se prueban en orden hasta que uno responda. */
export const FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'openai/gpt-oss-120b:free',
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
          messages: opts.messages,
        }),
      });
    } catch (err) {
      lastDetail = String(err);
      continue; // error de red → siguiente modelo
    }

    if (res.ok && res.body) {
      return new Response(sseToText(res.body), {
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
          messages: opts.messages,
        }),
      });
    } catch (err) { lastDetail = String(err); continue; }

    if (res.ok) {
      const data = await res.json().catch(() => null);
      const text = data?.choices?.[0]?.message?.content;
      if (typeof text === 'string' && text.trim()) return { ok: true, text };
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
