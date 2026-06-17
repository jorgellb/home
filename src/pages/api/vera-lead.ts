import type { APIRoute } from 'astro';
import { Resend } from 'resend';

/* Captura de leads del demo Vera AI. Recibe los datos de contacto + el contexto
   del negocio + la propuesta generada, y se lo envía al negocio por email
   (Resend). La key de Resend vive solo en el entorno (igual que /api/contact). */
export const prerender = false;

const TO_EMAIL = 'hola@platanitorico.com';
const FROM_EMAIL = 'web@platanitorico.com'; // dominio verificado en Resend
const FROM_NAME = 'Vera AI · Lead';
const HONEYPOT_FIELD = 'company_url'; // campo trampa oculto

const SECTOR_NOMBRE: Record<string, string> = {
  alquiler: 'Alquiler vacacional y apartamentos turísticos',
  inmobiliaria: 'Inmobiliarias',
  restaurante: 'Restaurantes y hostelería',
  clinica: 'Clínicas, estética y servicios locales',
  facturacion: 'Facturación digital e integraciones para pymes',
};

/* Rate limiting best-effort (en memoria) para evitar spam del endpoint. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_IP = 8;
const ipHits = new Map<string, number[]>();
function clientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (ipHits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_IP) return true;
  arr.push(now);
  ipHits.set(ip, arr);
  if (ipHits.size > 5000) ipHits.clear();
  return false;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
function row(label: string, value: string): string {
  if (!value) return '';
  return `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;width:130px;font-weight:700;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`;
}

interface LeadBody {
  name?: string;
  email?: string;
  contacto?: string;
  sector?: string;
  tipoNegocio?: string;
  problema?: string;
  objetivo?: string;
  presupuesto?: string;
  proposal?: string;
  isExample?: boolean;
  [HONEYPOT_FIELD]?: string;
}

export const POST: APIRoute = async ({ request }) => {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Datos inválidos.' }, 400);
  }

  // Honeypot: si está relleno es un bot → OK silencioso.
  if (body[HONEYPOT_FIELD]) return json({ ok: true });

  if (rateLimited(clientIp(request))) {
    return json({ error: 'Demasiados envíos. Inténtalo dentro de un rato.' }, 429);
  }

  const name = String(body.name || '').trim().slice(0, 120);
  const email = String(body.email || '').trim().slice(0, 160);
  const contacto = String(body.contacto || '').trim().slice(0, 80);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk && !contacto) {
    return json({ error: 'Déjanos un email válido o un teléfono/WhatsApp para contactarte.' }, 400);
  }
  if (email && !emailOk) {
    return json({ error: 'El email no parece válido.' }, 400);
  }

  const sectorNombre = SECTOR_NOMBRE[String(body.sector || '')] || String(body.sector || '—');
  const tipoNegocio = String(body.tipoNegocio || '').trim().slice(0, 500);
  const problema = String(body.problema || '').trim().slice(0, 1000);
  const objetivo = String(body.objetivo || '').trim().slice(0, 500);
  const presupuesto = String(body.presupuesto || '').trim().slice(0, 200);
  const proposal = String(body.proposal || '').trim().slice(0, 8000);

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    // Paridad con /api/contact: sin key registramos y devolvemos OK (no rompe el demo).
    console.error('[vera-lead] RESEND_API_KEY no configurada — lead no enviado:', { name, email, contacto, sectorNombre });
    return json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const subject = `[Vera AI] Lead · ${sectorNombre}${name ? ` · ${name}` : ''}${body.isExample ? ' (ejemplo)' : ''}`;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;background:#F5F0E6">
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:680px;margin:24px auto;padding:24px;background:#fff;border-radius:8px;color:#0E0D0B">
    <h1 style="font-size:20px;margin:0 0 4px;border-bottom:2px solid #FF6B35;padding-bottom:8px">Nuevo lead desde Vera AI</h1>
    <p style="font-size:12px;color:#666;margin:8px 0 20px">Demo: platanitorico.com/vera-ai/${body.isExample ? ' · (rellenó tras ver un ejemplo)' : ''}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${row('Nombre', name)}
      ${email ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:700">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(email)}" style="color:#FF6B35">${escapeHtml(email)}</a></td></tr>` : ''}
      ${row('Teléfono/WhatsApp', contacto)}
      ${row('Sector', sectorNombre)}
      ${row('Tipo de negocio', tipoNegocio)}
      ${row('Problema', problema)}
      ${row('Objetivo', objetivo)}
      ${row('Presupuesto', presupuesto)}
    </table>
    ${proposal ? `<h2 style="font-size:15px;margin:24px 0 8px">Propuesta que recibió</h2>
    <div style="background:#FAF5E6;border-left:4px solid #FF6B35;padding:14px 18px;white-space:pre-wrap;font-size:13px;line-height:1.5">${escapeHtml(proposal)}</div>` : ''}
    <p style="margin-top:28px;font-size:11px;color:#888;text-align:center">★ Vera AI Business Agent · Platanito Rico ★</p>
  </div>
</body></html>`;

  try {
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: emailOk ? email : undefined,
      subject,
      html,
    });
  } catch (err) {
    console.error('[vera-lead] Resend error:', err);
    return json({ error: 'No se pudo enviar. Inténtalo de nuevo en un momento.' }, 502);
  }

  return json({ ok: true });
};
