import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { chatText } from '../../lib/openrouter';
import { bump } from '../../lib/stats';
import { openrouterApiKey } from '../../lib/env';

/* "Estudio de Marca · IA" — orquestador multi-agente. Un solo modelo actúa como
   4 especialistas (Estratega, Naming, Copy, Diseñador) y devuelve un kit de marca
   completo en JSON: posicionamiento, nombre, paleta, tipografía, tono y copy.
   El cliente reproduce la "sala de agentes" en vivo. Key solo en el servidor. */
export const prerender = false;

const APP_TITLE = 'Estudio de Marca IA';

/* Formas de logotipo que el cliente sabe renderizar como SVG limpio. */
const MARKS = ['spark', 'wave', 'arc', 'orbit', 'leaf', 'bolt', 'hex', 'drop', 'sun', 'monoline'] as const;

const SYSTEM_PROMPT = `Eres el director de un "Estudio de Marca con IA" en Almería (España). Orquestas a CUATRO agentes especialistas que colaboran para crear, en una sola pasada, la identidad de una marca real:
- ESTRATEGA: define posicionamiento, público objetivo y personalidad (arquetipo).
- NAMING: propone el nombre (o respeta el que ya existe) y alternativas, con su concepto.
- DISEÑADOR: elige paleta de color, tipografías y una forma de logotipo.
- COPYWRITER: escribe tagline, titulares y bio, fijando el tono de voz.

Trabajas para negocios locales y pymes. Sé concreto, original y comercial; nada de relleno ni promesas vacías.

Devuelve EXCLUSIVAMENTE un objeto JSON válido (sin markdown, sin texto antes ni después). Estructura EXACTA:

{
  "marca": {
    "nombre": "Nombre de la marca (respeta el que dé el usuario si lo aporta; si no, invéntalo)",
    "tagline": "Eslogan corto y memorable (máx 7 palabras)",
    "monograma": "1 o 2 letras para el logo (iniciales del nombre)",
    "mark": "una de: ${MARKS.join(', ')} (la que mejor encaje con el sector)"
  },
  "estrategia": {
    "posicionamiento": "2-3 frases: qué es, para quién y por qué es diferente",
    "publico": "1 frase describiendo al cliente ideal",
    "personalidad": "Arquetipo + 2-3 palabras, ej: 'El Explorador cercano y vital'"
  },
  "naming": {
    "concepto": "1-2 frases explicando por qué funciona ese nombre",
    "alternativos": ["Nombre alternativo 1", "Nombre alternativo 2", "Nombre alternativo 3"]
  },
  "paleta": [
    { "nombre": "Nombre evocador del color", "hex": "#RRGGBB", "uso": "Principal / CTA" },
    { "nombre": "...", "hex": "#RRGGBB", "uso": "Texto y fondos oscuros" },
    { "nombre": "...", "hex": "#RRGGBB", "uso": "Fondos claros" },
    { "nombre": "...", "hex": "#RRGGBB", "uso": "Acento secundario" }
  ],
  "tipografia": {
    "titulares": "Tipografía para titulares (nombre real de Google Fonts)",
    "texto": "Tipografía para texto largo (nombre real de Google Fonts)",
    "nota": "1 frase justificando la elección"
  },
  "tono": {
    "adjetivos": ["3 o 4 adjetivos que definen la voz"],
    "hacer": ["2-3 cosas que SÍ hace la marca al comunicar"],
    "evitar": ["2-3 cosas que NO hace al comunicar"]
  },
  "copy": {
    "titulares": ["Titular web 1", "Titular web 2", "Titular web 3"],
    "bio_corta": "1-2 frases para redes o sección 'sobre nosotros'"
  },
  "agentes": {
    "estratega": "Frase en 1ª persona de lo que decidió el estratega",
    "naming": "Frase en 1ª persona del agente de naming",
    "disenador": "Frase en 1ª persona del diseñador",
    "copy": "Frase en 1ª persona del copywriter"
  }
}

Los colores DEBEN ser hex válidos de 6 dígitos. La paleta debe tener buen contraste y al menos un color oscuro para texto y uno claro para fondo. Todo en español de España.`;

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

const HEX = /^#[0-9a-fA-F]{6}$/;
const FALLBACK_PALETTE = [
  { nombre: 'Naranja Volcán', hex: '#FF6B35', uso: 'Principal / CTA' },
  { nombre: 'Negro Lava', hex: '#0E0D0B', uso: 'Texto y fondos oscuros' },
  { nombre: 'Arena Cálida', hex: '#F5F1EA', uso: 'Fondos claros' },
  { nombre: 'Turquesa Mar', hex: '#18C7C7', uso: 'Acento secundario' },
];

function initials(name: string): string {
  const w = name.trim().split(/\s+/).filter(Boolean);
  if (!w.length) return 'M';
  return (w.length === 1 ? w[0].slice(0, 2) : w[0][0] + w[1][0]).toUpperCase();
}

/* Garantiza un kit coherente aunque el modelo omita o malforme campos. */
function sanitize(kit: Record<string, any>, userName: string) {
  kit.marca = kit.marca || {};
  if (userName) kit.marca.nombre = userName; // el nombre del usuario manda
  if (!kit.marca.nombre) kit.marca.nombre = 'Tu Marca';
  if (!kit.marca.monograma) kit.marca.monograma = initials(kit.marca.nombre);
  kit.marca.monograma = String(kit.marca.monograma).slice(0, 2).toUpperCase();
  if (!MARKS.includes(kit.marca.mark)) kit.marca.mark = 'spark';

  let pal = Array.isArray(kit.paleta) ? kit.paleta.filter((c: any) => c && HEX.test(String(c.hex))) : [];
  if (pal.length < 3) pal = FALLBACK_PALETTE;
  kit.paleta = pal.slice(0, 5);

  kit.tono = kit.tono || {};
  if (!Array.isArray(kit.tono.adjetivos) || !kit.tono.adjetivos.length) kit.tono.adjetivos = ['Cercano', 'Claro', 'Auténtico'];
  kit.copy = kit.copy || {};
  if (!Array.isArray(kit.copy.titulares)) kit.copy.titulares = [];
  kit.naming = kit.naming || {};
  if (!Array.isArray(kit.naming.alternativos)) kit.naming.alternativos = [];
  return kit;
}

export const POST: APIRoute = async ({ request }) => {
  let body: { nombre?: string; actividad?: string };
  try { body = await request.json(); } catch { return jsonError('Petición inválida.', 400); }

  const actividad = String(body.actividad || '').trim().slice(0, 400);
  const nombre = String(body.nombre || '').trim().slice(0, 80);
  if (!actividad) return jsonError('Cuéntanos a qué se dedica tu negocio.', 400);

  const limit = await rateLimit(`marca:${clientIp(request)}`, 8, 300);
  if (!limit.ok) return jsonError('Has creado varias marcas seguidas. Espera un momento y vuelve a probar.', 429, { 'Retry-After': String(limit.retryAfter) });

  const apiKey = openrouterApiKey();
  if (!apiKey) {
    console.error('[estudio-marca] OPENROUTER_API_KEY no configurada');
    return jsonError('El estudio no está disponible ahora mismo. Mira el ejemplo mientras tanto.', 503);
  }

  void bump('demo:marca');
  const userPrompt = `Crea la identidad de marca para este negocio.
- Actividad / sector: ${actividad}
${nombre ? `- Nombre que ya tiene (respétalo): ${nombre}` : '- Aún no tiene nombre: invéntale uno original y con marca registrable.'}

Devuelve SOLO el JSON con el kit de marca completo.`;

  const result = await chatText({
    apiKey, title: APP_TITLE, temperature: 0.75, maxTokens: 1500,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  });

  if (!result.ok) return jsonError('El estudio de marca está saturado ahora mismo. Inténtalo de nuevo en unos segundos.', 502);

  let raw = result.text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const start = raw.indexOf('{'); const end = raw.lastIndexOf('}');
  if (start !== -1 && end !== -1) raw = raw.slice(start, end + 1);
  try {
    const kit = sanitize(JSON.parse(raw), nombre);
    return new Response(JSON.stringify({ kit }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch {
    console.error('[estudio-marca] JSON no parseable:', result.text.slice(0, 200));
    return jsonError('La IA no devolvió un formato válido. Prueba a describirlo de otra forma.', 502);
  }
};
