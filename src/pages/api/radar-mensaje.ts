import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { chatText } from '../../lib/openrouter';

/* Redacta un mensaje de contacto comercial B2B para un negocio detectado por el
   Radar. Privado (clave STATS_KEY). Tono honesto y conforme a LSSI/RGPD:
   identifica al emisor, ofrece algo relevante y deja salida fácil. */
export const prerender = false;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}

const SYSTEM = `Eres un comercial honesto de "Platanito Rico", un estudio de diseño y desarrollo web en Almería. Escribes un primer mensaje de contacto B2B en frío a un negocio local. Reglas (LSSI/RGPD): identifícate con claridad, sé breve y cercano, ofrece algo de valor real y sin presión, y deja una salida fácil ("si no te interesa, dímelo y no te escribo más"). Nada de promesas exageradas ni urgencia falsa. Español de España, de tú.

Devuelve EXCLUSIVAMENTE un JSON válido:
{
  "whatsapp": "Mensaje para WhatsApp, máximo 480 caracteres, cercano y directo",
  "asunto": "Asunto de email corto y honesto",
  "email": "Email de 4-6 frases: saludo personalizado, el motivo (lo que has visto), la oferta (p.ej. una maqueta o mini-auditoría gratis), una llamada a la acción suave y la salida fácil. Firma como 'Jorge · Platanito Rico'."
}`;

export const POST: APIRoute = async ({ request }) => {
  let body: { k?: string; negocio?: string; sector?: string; pueblo?: string; sinWeb?: boolean; redes?: string[] };
  try { body = await request.json(); } catch { return json({ error: 'Petición inválida.' }, 400); }

  const STATS_KEY = import.meta.env.STATS_KEY;
  if (!STATS_KEY || body.k !== STATS_KEY) return json({ error: 'No autorizado.' }, 401);

  const negocio = String(body.negocio || '').trim().slice(0, 120);
  if (!negocio) return json({ error: 'Falta el negocio.' }, 400);
  const sector = String(body.sector || '').slice(0, 60);
  const pueblo = String(body.pueblo || '').slice(0, 60);

  const rl = await rateLimit(`radarmsg:${clientIp(request)}`, 25, 300);
  if (!rl.ok) return json({ error: 'Demasiados mensajes seguidos. Espera un momento.' }, 429);

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) return json({ error: 'IA no configurada.' }, 503);

  const situacion = body.sinWeb
    ? `No parece tener página web propia${body.redes?.length ? `, aunque está en ${body.redes.join(' y ')}` : ''}.`
    : 'Ya tiene web, pero podría rendir y vender más.';
  const userPrompt = `Negocio: "${negocio}" (${sector || 'negocio local'}) en ${pueblo || 'Almería'}.
Situación detectada: ${situacion}
Escribe el mensaje de contacto en JSON.`;

  const result = await chatText({
    apiKey, title: 'Radar · Mensaje', temperature: 0.7, maxTokens: 600,
    messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: userPrompt }],
  });
  if (!result.ok) return json({ error: 'La IA está saturada ahora mismo. Inténtalo de nuevo.' }, 502);

  let raw = result.text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const s = raw.indexOf('{'); const e = raw.lastIndexOf('}');
  if (s !== -1 && e !== -1) raw = raw.slice(s, e + 1);
  try {
    const m = JSON.parse(raw);
    return json({ whatsapp: String(m.whatsapp || '').slice(0, 700), asunto: String(m.asunto || '').slice(0, 160), email: String(m.email || '').slice(0, 1600) });
  } catch {
    return json({ error: 'La IA no devolvió un formato válido. Inténtalo otra vez.' }, 502);
  }
};
