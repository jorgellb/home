import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { saveConversation, claimNotify, validCid, type StoredMsg } from '../../lib/chatlog';
import { bump } from '../../lib/stats';
import { resendApiKey } from '../../lib/env';

/* Guarda las conversaciones del asistente IA en Upstash (con caducidad) y, cuando
   una parece un cliente potencial (pide precio/presupuesto o deja contacto), envía
   un aviso por email — una sola vez por conversación. La key vive en el servidor. */
export const prerender = false;

const TO_EMAIL = 'hola@platanitorico.com';
const FROM_EMAIL = 'web@platanitorico.com';
const FROM_NAME = 'Asistente IA · Conversación';

const MAX_MSGS = 40;
const MAX_LEN = 2000;

/* Señales de intención de compra / contacto (sin acentos, en minúscula). */
const HOT_WORDS = [
  'precio', 'cuesta', 'cuanto', 'presupuesto', 'tarifa', 'coste', 'cotizacion',
  'contratar', 'contrato', 'comprar', 'pagar', 'factura', 'oferta', 'descuento',
  'whatsapp', 'telefono', 'llamar', 'llamadme', 'contacto', 'contactar', 'correo',
  'email', 'reunion', 'cita', 'quiero una', 'quiero un', 'necesito una', 'necesito un',
  'me interesa', 'presupuestar', 'encargar',
];
const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_RE = /(?:\+?\d[\s.-]?){9,}/;

const noAccents = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const POST: APIRoute = async ({ request }) => {
  let body: { cid?: string; source?: string; messages?: unknown };
  try { body = await request.json(); } catch { return json({ error: 'Datos inválidos.' }, 400); }

  const cid = String(body.cid || '').trim();
  if (!validCid(cid)) return json({ error: 'cid inválido.' }, 400);
  const source = (String(body.source || 'chat').match(/[a-z]{1,12}/i)?.[0] || 'chat').toLowerCase();

  if (!Array.isArray(body.messages)) return json({ error: 'Sin mensajes.' }, 400);
  const msgs: StoredMsg[] = body.messages
    .filter((m): m is StoredMsg => !!m && typeof (m as StoredMsg).content === 'string' && ((m as StoredMsg).role === 'user' || (m as StoredMsg).role === 'assistant'))
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_LEN) }))
    .filter((m) => m.content)
    .slice(-MAX_MSGS);

  // Necesita al menos un mensaje del usuario para que valga la pena guardar.
  const userMsgs = msgs.filter((m) => m.role === 'user');
  if (!userMsgs.length) return new Response(null, { status: 204 });

  // Rate limit generoso (se llama una vez por turno).
  const rl = await rateLimit(`chatlog:${clientIp(request)}`, 60, 300);
  if (!rl.ok) return new Response(null, { status: 204 });

  // Detección de "cliente potencial".
  const userText = noAccents(userMsgs.map((m) => m.content).join('  '));
  const hot = HOT_WORDS.some((w) => userText.includes(w)) || EMAIL_RE.test(userText) || PHONE_RE.test(userText);

  const now = Date.now();
  await saveConversation({ cid, ts: now, updated: now, source, hot, msgs });
  void bump('chat:saved');

  // Aviso por email solo si parece cliente, hay intercambio real, y solo una vez.
  if (hot && msgs.length >= 2) {
    const apiKey = resendApiKey();
    if (apiKey && (await claimNotify(cid))) {
      void bump('chat:hot');
      const rows = msgs.map((m) => {
        const who = m.role === 'user' ? 'Cliente' : 'Vera (IA)';
        const color = m.role === 'user' ? '#0E0D0B' : '#FF6B35';
        return `<tr><td style="padding:6px 10px 6px 0;vertical-align:top;white-space:nowrap;font-weight:700;color:${color}">${who}</td><td style="padding:6px 0;border-bottom:1px solid #f0ece2;color:#2a261f">${esc(m.content)}</td></tr>`;
      }).join('');
      const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;background:#F5F0E6">
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:680px;margin:24px auto;padding:24px;background:#fff;border-radius:8px;color:#0E0D0B">
    <h1 style="font-size:19px;margin:0 0 4px;border-bottom:2px solid #FF6B35;padding-bottom:8px">🟠 Posible cliente en el chat</h1>
    <p style="font-size:12px;color:#666;margin:8px 0 18px">Origen: ${esc(source === 'widget' ? 'widget flotante' : 'asistente web')} · ${msgs.length} mensajes · ${new Date(now).toLocaleString('es-ES')}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5">${rows}</table>
    <p style="margin-top:24px;font-size:11px;color:#888;text-align:center">★ Asistente IA · Platanito Rico · revisa todas en /conversaciones/ ★</p>
  </div>
</body></html>`;
      try {
        await new Resend(apiKey).emails.send({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: [TO_EMAIL],
          subject: `[Chat] Posible cliente · ${userMsgs[0].content.slice(0, 50)}`,
          html,
        });
      } catch (err) { console.error('[chat-log] Resend error:', err); }
    }
  }

  return new Response(null, { status: 204 });
};
