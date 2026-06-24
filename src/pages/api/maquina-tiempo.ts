import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { chatText } from '../../lib/openrouter';
import { bump } from '../../lib/stats';

/* "Máquina del Tiempo de Marca" — la IA imagina la web de un negocio en 4 épocas
   (1995, 2010, 2026, 2035). Devuelve solo el CONTENIDO por época; el cliente lo
   renderiza con la estética real de cada era. Key solo en el servidor. */
export const prerender = false;

const APP_TITLE = 'Máquina del Tiempo de Marca';
const ANIOS = ['1995', '2010', '2026', '2035'] as const;

const SYSTEM_PROMPT = `Eres una "Máquina del Tiempo de Marcas". Dado un negocio, imaginas cómo habría sido (y será) su página web en CUATRO épocas, con el tono y los tópicos de cada una:
- 1995: web primitiva e ingenua (estilo GeoCities). Lenguaje formal y entusiasta, "Bienvenidos a la página web de…", contador de visitas, "página en construcción", "mejor visto en Netscape". Menú con cosas como Inicio, Nosotros, Libro de visitas.
- 2010: web 2.0 y redes sociales. "¡Síguenos en Facebook!", blog, newsletter, botones brillantes, "Web 2.0". Tono cercano y peppy.
- 2026: web moderna, limpia y orientada a conversión. Titular de beneficio claro, reservas/compra online, reseñas, llamada a la acción directa.
- 2035: web futurista. Asistente de IA, personalización, realidad aumentada/voz, hiper-conveniencia. Tono visionario pero creíble.

Devuelve EXCLUSIVAMENTE un objeto JSON válido (sin markdown ni texto alrededor). Estructura EXACTA:
{
  "nombre": "Nombre de la marca (usa el que dé el usuario; si no, invéntalo)",
  "dominio": "slug-sin-espacios-para-la-url",
  "epocas": [
    { "anio": "1995", "titular": "Titular de portada propio de 1995", "subtitulo": "Frase secundaria", "cta": "Texto del botón/enlace típico de la época", "nav": ["4-5 items de menú"], "detalle": "Coletilla de época (p.ej. 'Visitas: 000042 · En construcción')", "color": "#RRGGBB acorde a la época" },
    { "anio": "2010", "titular": "...", "subtitulo": "...", "cta": "...", "nav": ["..."], "detalle": "...", "color": "#RRGGBB" },
    { "anio": "2026", "titular": "...", "subtitulo": "...", "cta": "...", "nav": ["..."], "detalle": "...", "color": "#RRGGBB" },
    { "anio": "2035", "titular": "...", "subtitulo": "...", "cta": "...", "nav": ["..."], "detalle": "...", "color": "#RRGGBB" }
  ],
  "comentario": "Una frase divertida y con gracia sobre cómo ha evolucionado la marca a lo largo del tiempo"
}
Todo en español de España. Sé específico del NEGOCIO en cada época (no genérico).`;

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

const HEX = /^#[0-9a-fA-F]{6}$/;
const DEFAULT_COLOR: Record<string, string> = { '1995': '#000080', '2010': '#1b9de2', '2026': '#FF6B35', '2035': '#18e0ff' };
const slugify = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24) || 'minegocio';

function sanitize(kit: Record<string, any>, userName: string) {
  if (userName) kit.nombre = userName;
  kit.nombre = String(kit.nombre || 'Mi Negocio').slice(0, 60);
  kit.dominio = slugify(String(kit.dominio || kit.nombre));
  const byYear: Record<string, any> = {};
  for (const e of Array.isArray(kit.epocas) ? kit.epocas : []) if (e && ANIOS.includes(String(e.anio) as any)) byYear[String(e.anio)] = e;
  kit.epocas = ANIOS.map((anio) => {
    const e = byYear[anio] || {};
    return {
      anio,
      titular: String(e.titular || '').slice(0, 120) || kit.nombre,
      subtitulo: String(e.subtitulo || '').slice(0, 160),
      cta: String(e.cta || '').slice(0, 40) || 'Más info',
      nav: (Array.isArray(e.nav) ? e.nav : []).map((n: any) => String(n).slice(0, 24)).filter(Boolean).slice(0, 5),
      detalle: String(e.detalle || '').slice(0, 90),
      color: HEX.test(String(e.color)) ? e.color : DEFAULT_COLOR[anio],
    };
  });
  kit.comentario = String(kit.comentario || '').slice(0, 240);
  return kit;
}

export const POST: APIRoute = async ({ request }) => {
  let body: { nombre?: string; actividad?: string };
  try { body = await request.json(); } catch { return jsonError('Petición inválida.', 400); }

  const actividad = String(body.actividad || '').trim().slice(0, 300);
  const nombre = String(body.nombre || '').trim().slice(0, 60);
  if (!actividad) return jsonError('Cuéntanos a qué se dedica tu negocio.', 400);

  const limit = await rateLimit(`tiempo:${clientIp(request)}`, 8, 300);
  if (!limit.ok) return jsonError('Has viajado en el tiempo varias veces seguidas. Espera un momento.', 429, { 'Retry-After': String(limit.retryAfter) });

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[maquina-tiempo] OPENROUTER_API_KEY no configurada');
    return jsonError('La máquina del tiempo no está disponible ahora mismo. Mira el ejemplo mientras tanto.', 503);
  }

  void bump('demo:tiempo');
  const userPrompt = `Negocio: ${actividad}.
${nombre ? `Nombre (respétalo): ${nombre}.` : 'No tiene nombre todavía: invéntale uno con gancho.'}
Genera el JSON con su web en las 4 épocas.`;

  const result = await chatText({
    apiKey, title: APP_TITLE, temperature: 0.85, maxTokens: 1300,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  });

  if (!result.ok) return jsonError('La máquina del tiempo está saturada ahora mismo. Inténtalo de nuevo en unos segundos.', 502);

  let raw = result.text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const start = raw.indexOf('{'); const end = raw.lastIndexOf('}');
  if (start !== -1 && end !== -1) raw = raw.slice(start, end + 1);
  try {
    const kit = sanitize(JSON.parse(raw), nombre);
    return new Response(JSON.stringify({ kit }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch {
    console.error('[maquina-tiempo] JSON no parseable:', result.text.slice(0, 200));
    return jsonError('La IA no devolvió un formato válido. Prueba a describirlo de otra forma.', 502);
  }
};
