import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { chatText, VISION_MODELS } from '../../lib/openrouter';
import { bump } from '../../lib/stats';

/* "Rayos X de Atención" — agente de visión que ESTIMA el mapa de calor de
   atención de una captura de web: dónde se va la mirada en los primeros segundos,
   el recorrido visual, la primera impresión y qué falla. No es eye-tracking real:
   es una predicción de la IA basada en jerarquía visual, contraste y saliencia. */
export const prerender = false;

const APP_TITLE = 'Rayos X de Atención';

const SYSTEM_PROMPT = `Eres "Rayos X de Atención", un sistema de IA de neuromarketing que PREDICE dónde mira un usuario al ver una web por primera vez (primeros 3-5 segundos). Te basas en principios de jerarquía visual, contraste, tamaño, posición, rostros, dirección de la mirada, patrón F/Z y saliencia. No tienes eye-tracking real: das una estimación experta.

Analiza la captura de pantalla recibida y devuelve EXCLUSIVAMENTE un objeto JSON válido (sin markdown ni texto alrededor). Todas las coordenadas son PORCENTAJES de la imagen: x e y son el CENTRO (0 = izquierda/arriba, 100 = derecha/abajo); r es el radio de la zona (en % del lado mayor); intensidad de 0 a 1 (1 = donde más se fija la vista).

Estructura EXACTA:
{
  "primera_impresion": {
    "puntuacion": 7.2,
    "mensaje_percibido": "Lo que un visitante entiende del negocio en 3 segundos, en una frase",
    "veredicto": "Frase corta y honesta sobre la primera impresión"
  },
  "punto_focal": "Qué elemento capta la atención el primero y por qué",
  "claridad": 70,
  "cta_visible": true,
  "mapa_calor": [
    { "x": 50, "y": 18, "r": 16, "intensidad": 0.95, "etiqueta": "Titular principal" },
    { "x": 22, "y": 12, "r": 8, "intensidad": 0.6, "etiqueta": "Logo" }
  ],
  "recorrido_visual": [
    { "x": 50, "y": 18, "que": "Titular" },
    { "x": 30, "y": 45, "que": "Imagen principal" },
    { "x": 70, "y": 70, "que": "Botón" }
  ],
  "aciertos": ["2-4 cosas que funcionan visualmente"],
  "problemas": ["2-4 problemas concretos de atención o jerarquía"],
  "recomendaciones": ["2-4 mejoras accionables y específicas"]
}

Reglas: incluye entre 4 y 8 zonas en "mapa_calor" (las más miradas, con intensidad realista), y de 3 a 4 puntos en "recorrido_visual" en orden de mirada. Sé concreto y profesional. Español de España.`;

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

const clamp = (n: unknown, min: number, max: number, def: number): number => {
  const v = Number(n); return Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : def;
};

/* Saneado + fallback: si la IA no da zonas válidas, generamos un patrón-F por
   defecto para que el demo siempre muestre un mapa de calor coherente. */
function sanitize(r: Record<string, any>) {
  const pi = (r.primera_impresion = r.primera_impresion || {});
  pi.puntuacion = clamp(pi.puntuacion, 0, 10, 6);
  pi.mensaje_percibido = String(pi.mensaje_percibido || '').slice(0, 300);
  pi.veredicto = String(pi.veredicto || '').slice(0, 300);
  r.claridad = clamp(r.claridad, 0, 100, 60);
  r.cta_visible = Boolean(r.cta_visible);

  let zonas = Array.isArray(r.mapa_calor) ? r.mapa_calor : [];
  zonas = zonas
    .filter((z: any) => z && Number.isFinite(Number(z.x)) && Number.isFinite(Number(z.y)))
    .map((z: any) => ({
      x: clamp(z.x, 0, 100, 50), y: clamp(z.y, 0, 100, 50),
      r: clamp(z.r, 3, 45, 14), intensidad: clamp(z.intensidad, 0.1, 1, 0.6),
      etiqueta: String(z.etiqueta || '').slice(0, 60),
    }))
    .slice(0, 10);
  if (zonas.length < 2) {
    zonas = [
      { x: 28, y: 14, r: 14, intensidad: 0.95, etiqueta: 'Zona superior izquierda' },
      { x: 60, y: 22, r: 16, intensidad: 0.8, etiqueta: 'Titular' },
      { x: 35, y: 48, r: 18, intensidad: 0.55, etiqueta: 'Contenido central' },
      { x: 50, y: 80, r: 12, intensidad: 0.3, etiqueta: 'Parte inferior' },
    ];
  }
  r.mapa_calor = zonas;

  let rec = Array.isArray(r.recorrido_visual) ? r.recorrido_visual : [];
  rec = rec
    .filter((p: any) => p && Number.isFinite(Number(p.x)))
    .map((p: any) => ({ x: clamp(p.x, 0, 100, 50), y: clamp(p.y, 0, 100, 50), que: String(p.que || '').slice(0, 50) }))
    .slice(0, 5);
  if (!rec.length) rec = zonas.slice(0, 3).map((z: any) => ({ x: z.x, y: z.y, que: z.etiqueta }));
  r.recorrido_visual = rec;

  for (const k of ['aciertos', 'problemas', 'recomendaciones']) {
    r[k] = (Array.isArray(r[k]) ? r[k] : []).map((s: any) => String(s).slice(0, 200)).filter(Boolean).slice(0, 5);
  }
  return r;
}

export const POST: APIRoute = async ({ request }) => {
  let body: { image?: string };
  try { body = await request.json(); } catch { return jsonError('Petición inválida.', 400); }

  const image = String(body.image || '');
  if (!/^data:image\/(png|jpe?g|webp);base64,/.test(image)) return jsonError('Sube una captura válida (JPG, PNG o WEBP).', 400);
  if (image.length > 4_000_000) return jsonError('La imagen es demasiado grande. Usa una más ligera.', 413);

  const limit = await rateLimit(`rayosx:${clientIp(request)}`, 12, 300);
  if (!limit.ok) return jsonError('Has analizado varias capturas seguidas. Espera un momento.', 429, { 'Retry-After': String(limit.retryAfter) });

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[rayos-x] OPENROUTER_API_KEY no configurada');
    return jsonError('El analizador no está disponible ahora mismo. Mira el ejemplo mientras tanto.', 503);
  }

  void bump('demo:rayosx');
  const result = await chatText({
    apiKey, title: APP_TITLE, temperature: 0.4, maxTokens: 1600,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Predice el mapa de calor de atención de esta captura de web y devuelve el JSON.' },
          { type: 'image_url', image_url: { url: image } },
        ],
      },
    ],
  }, VISION_MODELS);

  if (!result.ok) return jsonError('El analizador de visión está saturado ahora mismo. Inténtalo de nuevo en unos segundos.', 502);

  let raw = result.text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const start = raw.indexOf('{'); const end = raw.lastIndexOf('}');
  if (start !== -1 && end !== -1) raw = raw.slice(start, end + 1);
  try {
    const analisis = sanitize(JSON.parse(raw));
    return new Response(JSON.stringify({ analisis }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch {
    console.error('[rayos-x] JSON no parseable:', result.text.slice(0, 200));
    return jsonError('La IA no devolvió un formato válido. Prueba con otra captura.', 502);
  }
};
