import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { chatText } from '../../lib/openrouter';
import { bump } from '../../lib/stats';

/* "Sonido de Marca" — la IA COMPONE la identidad sonora (escala, tempo,
   instrumento, motivo del logo sonoro y melodía del jingle + acordes). El cliente
   lo sintetiza con Web Audio. Devuelve solo el "brief musical" en JSON. */
export const prerender = false;

const APP_TITLE = 'Sonido de Marca';

const ESCALAS = ['C_major', 'G_major', 'D_major', 'F_major', 'A_minor', 'E_minor', 'D_minor', 'C_pentatonic', 'A_pentatonic_minor'];
const INSTRUMENTOS = ['marimba', 'campanas', 'piano', 'pluck', 'pad'];
const ACORDES = ['C', 'G', 'Am', 'F', 'D', 'Em', 'A', 'E', 'Dm', 'Bm'];

const SYSTEM_PROMPT = `Eres un compositor de identidad sonora de marcas (sonic branding). Dado un negocio y un carácter, diseñas un LOGO SONORO corto (un motivo memorable de 3-5 notas) y un MINI-JINGLE (melodía de 6-14 notas con una progresión de acordes). Piensas como un músico: coherencia tonal, gancho y carácter.

Devuelve EXCLUSIVAMENTE un JSON válido (sin markdown). Notas en notación científica (ej. C5, F#4, Bb4), octavas 3 a 6. Duraciones en PULSOS (0.25, 0.5, 1, 1.5, 2). Estructura EXACTA:
{
  "concepto": "1-2 frases sobre la identidad sonora y por qué encaja con la marca",
  "bpm": 100,
  "escala": "una de: ${ESCALAS.join(', ')}",
  "instrumento": "uno de: ${INSTRUMENTOS.join(', ')}",
  "adjetivos": ["3 adjetivos del carácter sonoro"],
  "logo_sonoro": [ { "nota": "C5", "dur": 0.5 }, { "nota": "E5", "dur": 0.5 }, { "nota": "G5", "dur": 1 } ],
  "jingle": {
    "acordes": ["2 a 4 de: ${ACORDES.join(', ')}"],
    "melodia": [ { "nota": "E5", "dur": 0.5 }, { "nota": "D5", "dur": 0.5 } ]
  }
}
Las notas deben pertenecer mayoritariamente a la escala elegida. Español de España en los textos.`;

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

const NOTE_RE = /^[A-G](#|b)?[3-6]$/;
const DURS = [0.25, 0.5, 1, 1.5, 2];
const snapDur = (d: unknown) => { const n = Number(d); return DURS.reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a), 1); };

function cleanNotes(arr: any, min: number, max: number, fallback: { nota: string; dur: number }[]) {
  const out = (Array.isArray(arr) ? arr : [])
    .filter((x: any) => x && NOTE_RE.test(String(x.nota)))
    .map((x: any) => ({ nota: String(x.nota), dur: snapDur(x.dur) }))
    .slice(0, max);
  return out.length >= min ? out : fallback;
}

const FB_LOGO = [{ nota: 'C5', dur: 0.5 }, { nota: 'E5', dur: 0.5 }, { nota: 'G5', dur: 1 }];
const FB_MEL = [{ nota: 'E5', dur: 0.5 }, { nota: 'G5', dur: 0.5 }, { nota: 'C6', dur: 1 }, { nota: 'B5', dur: 0.5 }, { nota: 'G5', dur: 0.5 }, { nota: 'C6', dur: 1 }];

function sanitize(k: Record<string, any>) {
  k.concepto = String(k.concepto || '').slice(0, 240);
  k.bpm = Math.max(70, Math.min(150, Math.round(Number(k.bpm) || 100)));
  k.escala = ESCALAS.includes(k.escala) ? k.escala : 'C_major';
  k.instrumento = INSTRUMENTOS.includes(k.instrumento) ? k.instrumento : 'marimba';
  k.adjetivos = (Array.isArray(k.adjetivos) ? k.adjetivos : []).map((s: any) => String(s).slice(0, 24)).filter(Boolean).slice(0, 4);
  k.logo_sonoro = cleanNotes(k.logo_sonoro, 2, 6, FB_LOGO);
  const j = (k.jingle = k.jingle || {});
  j.acordes = (Array.isArray(j.acordes) ? j.acordes : []).filter((c: any) => ACORDES.includes(String(c))).slice(0, 4);
  if (!j.acordes.length) j.acordes = ['C', 'G', 'Am', 'F'];
  j.melodia = cleanNotes(j.melodia, 4, 16, FB_MEL);
  return k;
}

export const POST: APIRoute = async ({ request }) => {
  let body: { nombre?: string; vibe?: string; sector?: string };
  try { body = await request.json(); } catch { return jsonError('Petición inválida.', 400); }

  const nombre = String(body.nombre || '').trim().slice(0, 60);
  const vibe = String(body.vibe || '').trim().slice(0, 30);
  const sector = String(body.sector || '').trim().slice(0, 80);
  if (!nombre) return jsonError('Dinos el nombre de la marca.', 400);

  const limit = await rateLimit(`sonido:${clientIp(request)}`, 10, 300);
  if (!limit.ok) return jsonError('Has generado varios sonidos seguidos. Espera un momento.', 429, { 'Retry-After': String(limit.retryAfter) });

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[sonido-marca] OPENROUTER_API_KEY no configurada');
    return jsonError('El compositor no está disponible ahora mismo. Mira el ejemplo mientras tanto.', 503);
  }

  void bump('demo:sonido');
  const userPrompt = `Marca: "${nombre}".${sector ? ` Sector: ${sector}.` : ''} Carácter sonoro deseado: ${vibe || 'cálido y cercano'}.
Compón su identidad sonora en JSON.`;

  // Hasta 2 intentos: los modelos gratis a veces devuelven JSON mal envuelto.
  let saturado = false;
  for (let attempt = 0; attempt < 2; attempt++) {
    const result = await chatText({
      apiKey, title: APP_TITLE, temperature: attempt === 0 ? 0.8 : 0.5, maxTokens: 800,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: attempt === 0 ? userPrompt : `${userPrompt}\nIMPORTANTE: devuelve SOLO el objeto JSON, sin texto ni markdown.` },
      ],
    });
    if (!result.ok) { saturado = true; continue; }
    let raw = result.text.trim();
    const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) raw = fence[1].trim();
    const s = raw.indexOf('{'); const e = raw.lastIndexOf('}');
    if (s !== -1 && e !== -1) raw = raw.slice(s, e + 1);
    try {
      return new Response(JSON.stringify({ brief: sanitize(JSON.parse(raw)) }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    } catch {
      console.warn(`[sonido-marca] JSON no parseable (intento ${attempt + 1}):`, result.text.slice(0, 120));
    }
  }
  return jsonError(saturado ? 'El compositor está saturado ahora mismo. Inténtalo de nuevo en unos segundos.' : 'La IA no devolvió un formato válido. Prueba otra vez.', 502);
};
