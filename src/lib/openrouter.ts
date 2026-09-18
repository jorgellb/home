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

/* Por debajo de esto no hay respuesta útil (un saludo suelto, un token roto). */
const MINIMO_RESPUESTA = 40;

export { FREE_MODELS, VISION_MODELS } from './modelos-openrouter';
import { FREE_MODELS } from './modelos-openrouter';

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
async function leerInicio(texto: ReadableStream<Uint8Array>, minimo: number): Promise<{ inicio: string; agotado: boolean; completo: ReadableStream<Uint8Array> }> {
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

  return { inicio, agotado, completo };
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
      const { inicio, agotado, completo } = await leerInicio(sseToText(res.body), MUESTRA_CONTROL);

      // El modelo ha soltado su deliberación en vez de la respuesta: no se
      // sirve (llevaría dentro las instrucciones internas) y se prueba otro.
      if (pareceRazonamiento(inicio)) {
        console.warn(`[openrouter] ${model} devolvió su razonamiento; se descarta y se prueba el siguiente`);
        completo.cancel().catch(() => { /* noop */ });
        lastStatus = 200;
        lastDetail = 'razonamiento filtrado';
        continue;
      }

      // `leerInicio` solo devuelve menos de MUESTRA_CONTROL caracteres si el
      // stream ya terminó: entonces eso es TODA la respuesta. Un «Hola» suelto
      // (visto en producción al pedir que no manden razonamiento) no sirve.
      if (agotado && inicio.trim().length < MINIMO_RESPUESTA) {
        console.warn(`[openrouter] ${model} devolvió una respuesta demasiado corta (${inicio.trim().length} caracteres); se prueba el siguiente`);
        lastStatus = 200;
        lastDetail = 'respuesta demasiado corta';
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
/* IMPORTANTE: el tramo gratuito de OpenRouter se limita POR CUENTA Y POR DÍA,
   no por modelo: 50 peticiones diarias (1.000 si alguna vez se compran 10 $ de
   crédito) y 20 por minuto. El contador se reinicia a medianoche UTC.

   Eso da la vuelta a la intuición de siempre: cada modelo de reserva que se
   prueba gasta una petición del mismo cupo, así que una cadena larga no da más
   aguante, lo agota antes. Con cinco modelos, una sola visita podía gastar
   cinco de las cincuenta del día. Por eso la cadena es CORTA a propósito: dos
   modelos. Antes de añadir un tercero, recuerda que se paga en demos que otro
   visitante ya no podrá hacer.

   Del mismo modo, reintentar a ciegas duplica el consumo justo cuando escasea.
   Solo se reintenta si el propio OpenRouter dice que la espera es corta, que es
   el tope por minuto; contra el tope diario esperar no sirve de nada y se corta
   al momento para no quemar el cupo que quede. */
const PLAZO_MODELO_MS = 22_000;
const PRESUPUESTO_MS = 55_000;
/* Por encima de esto ya no es el tope por minuto: es el diario. */
const ESPERA_MAXIMA_MS = 5_000;
/* Fallos del proveedor, no del cupo: el siguiente modelo puede funcionar. */
const PASAJEROS = new Set([408, 409, 425, 500, 502, 503, 504]);

export type MotivoFallo = 'cupo-diario' | 'saturado' | 'error';

/** Cuánto pide esperar OpenRouter, en ms, o null si no lo dice. */
function esperaPedida(res: Response): number | null {
  const reset = res.headers.get('x-ratelimit-reset');
  if (reset) {
    /* Viene en epoch de milisegundos. */
    const ms = Number(reset) - Date.now();
    if (Number.isFinite(ms) && ms > 0) return ms;
  }
  const retry = res.headers.get('retry-after');
  if (retry) {
    const s = Number(retry);
    if (Number.isFinite(s) && s > 0) return s * 1000;
  }
  return null;
}

export type ResultadoTexto =
  | { ok: true; text: string }
  | { ok: false; status: number; detail: string; motivo: MotivoFallo };

export async function chatText(
  opts: Opts,
  models: string[] = FREE_MODELS,
): Promise<ResultadoTexto> {
  const limite = Date.now() + PRESUPUESTO_MS;
  let lastStatus = 0;
  let lastDetail = '';
  let esperado = false;

  for (const model of models) {
    if (Date.now() >= limite) {
      lastDetail = 'se agotó el tiempo disponible';
      break;
    }
    /* Ni el plazo del modelo ni lo que queda de presupuesto, lo que antes se
       acabe: así el último modelo de la lista todavía tiene su oportunidad. */
    const plazo = Math.min(PLAZO_MODELO_MS, limite - Date.now());
    const corte = AbortSignal.timeout(plazo);
    let res: Response;
    try {
      res = await fetch(OPENROUTER_URL, {
        signal: corte,
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
    } catch (err) {
      /* Un corte por plazo cuenta como pasajero: el modelo estaba colgado. */
      const cortado = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');
      lastStatus = cortado ? 504 : lastStatus;
      lastDetail = cortado ? `${model} no contestó en ${Math.round(plazo / 1000)} s` : String(err);
      continue;
    }

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

    if (res.status === 429) {
      const espera = esperaPedida(res);
      /* Sin dato o con una espera larga, es el tope diario de la cuenta: probar
         otro modelo gastaría cupo para nada, porque el límite es de la cuenta
         entera. Se corta aquí y se dice por qué. */
      if (espera === null || espera > ESPERA_MAXIMA_MS) {
        console.error('[openrouter] (json) cupo diario del tramo gratuito agotado');
        return { ok: false, status: 429, detail: lastDetail, motivo: 'cupo-diario' };
      }
      /* Espera corta: es el tope por minuto y sí se despeja. Se espera una sola
         vez en toda la llamada, no una por modelo. */
      if (!esperado && Date.now() + espera < limite) {
        esperado = true;
        console.warn(`[openrouter] (json) tope por minuto; esperando ${Math.round(espera)} ms`);
        await new Promise((r) => setTimeout(r, espera));
        continue;
      }
    }
    console.warn(`[openrouter] (json) ${model} → ${res.status}, siguiente…`);
  }

  console.error('[openrouter] (json) todos los modelos fallaron', lastStatus, lastDetail);
  const motivo: MotivoFallo = PASAJEROS.has(lastStatus) ? 'saturado' : 'error';
  return { ok: false, status: lastStatus, detail: lastDetail, motivo };
}
