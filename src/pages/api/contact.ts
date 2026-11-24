import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { resendApiKey } from '../../lib/env';
import { rateLimit, clientIp } from '../../lib/rate-limit';

// Ejecutar como Vercel Function, no prerender en build
export const prerender = false;

const TO_EMAIL    = 'hola@platanitorico.com';
const FROM_EMAIL  = 'web@platanitorico.com'; // dominio verificado en Resend
const FROM_NAME   = 'Platanito Rico · Web';

// Honeypot field name (debe estar oculto en el HTML)
const HONEYPOT_FIELD = 'bot-field';

const RAW = Symbol('html-raw');

interface RawHtml { __html: string; [RAW]: true }

function raw(s: string): RawHtml {
  return { __html: s, [RAW]: true as const };
}

function isRaw(v: unknown): v is RawHtml {
  return typeof v === 'object' && v !== null && RAW in v;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function html(strings: TemplateStringsArray, ...values: unknown[]): string {
  return strings.reduce((acc, s, i) => {
    const v = i < values.length ? values[i] : '';
    if (isRaw(v)) {
      return acc + s + v.__html;
    }
    return acc + s + escapeHtml(String(v ?? ''));
  }, '');
}

/* Longitud máxima de cada campo: el correo no admite novelas ni basura masiva. */
const MAXIMOS: Record<string, number> = { name: 120, email: 160, phone: 40, company: 160, service: 40, timing: 40, message: 5000 };

export const POST: APIRoute = async ({ request, redirect }) => {
  /* El formulario con JS pide JSON para mostrar el resultado sin recargar; sin
     JS se mantiene el envío clásico con redirección y errores en texto. */
  const quiereJson = (request.headers.get('accept') || '').includes('application/json');
  const responder = (ok: boolean, mensaje: string, status: number, extra: Record<string, string> = {}) =>
    quiereJson
      ? new Response(JSON.stringify({ ok, mensaje }), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...extra } })
      : ok
        ? redirect('/success/', 303)
        : new Response(mensaje, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', ...extra } });

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return responder(false, 'Datos del formulario inválidos', 400);
  }

  // Honeypot anti-spam: si está rellenado, es un bot — devolvemos OK silencioso
  if (data.get(HONEYPOT_FIELD)) {
    return responder(true, 'Recibido', 200);
  }

  for (const [campo, max] of Object.entries(MAXIMOS)) {
    if (String(data.get(campo) || '').length > max) {
      return responder(false, 'Alguno de los campos es demasiado largo.', 400);
    }
  }

  const name    = String(data.get('name')    || '').trim();
  const email   = String(data.get('email')   || '').trim();
  const phone   = String(data.get('phone')   || '').trim();
  const company = String(data.get('company') || '').trim();
  const service = String(data.get('service') || '').trim();
  const budget  = String(data.get('budget')  || '').trim();
  const timing  = String(data.get('timing')  || '').trim();
  const message = String(data.get('message') || '').trim();
  // Campos opcionales del formulario de auditoría (/marketing/auditoria/).
  // El formulario general no los envía y simplemente no se pintan.
  const web      = String(data.get('web')      || '').trim();
  const sector   = String(data.get('sector')   || '').trim();
  const puestos  = String(data.get('puestos')  || '').trim().slice(0, 40);
  const canales  = String(data.get('canales')  || '').trim();
  const objetivo = String(data.get('objetivo') || '').trim();

  // Validación mínima — campos obligatorios
  if (!name || !email || !message) {
    return responder(false, 'Faltan campos obligatorios: nombre, email y mensaje.', 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return responder(false, 'El email no parece válido.', 400);
  }
  // Consentimiento RGPD explícito (casilla obligatoria en los formularios).
  if (data.get('privacidad') !== 'si') {
    return responder(false, 'Necesitamos que aceptes la política de privacidad para responderte.', 400);
  }

  // El honeypot solo frena bots ingenuos: limitamos también por IP para que no
  // se pueda inundar el buzón ni agotar la cuota de Resend.
  const limit = await rateLimit(`contact:${clientIp(request)}`, 5, 900);
  if (!limit.ok) {
    return responder(false, 'Has enviado varios mensajes seguidos. Espera unos minutos.', 429, { 'Retry-After': String(limit.retryAfter) });
  }

  // Si no hay API key configurada, devolvemos error claro (no enviamos email pero la
  // app sigue funcionando — útil en preview y dev sin variables).
  const apiKey = resendApiKey();
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY no configurada — el envío se ha omitido');
    // En producción esto es un fallo silencioso para el usuario pero registrado en logs.
    return responder(true, 'Recibido', 200);
  }

  const resend = new Resend(apiKey);

  const subject = `[Web] Briefing de ${name}${company ? ` · ${company}` : ''}`;

  const bodyHtml = html`
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#FAFAF7">
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 640px; margin: 24px auto; padding: 24px; background:#fff; border-radius:8px; color: #0E0D0B;">
        <h1 style="font-size: 20px; margin: 0 0 12px; border-bottom: 3px solid #FFCF3F; padding-bottom: 8px;">Nuevo briefing desde la web</h1>
        <p style="font-size: 13px; color: #555; margin: 0 0 24px;">Recibido a través de platanitorico.com/contacto</p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 110px; font-weight: 700;">Nombre</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #0E5B3A;">${email}</a></td></tr>
          ${phone   ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Teléfono</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #0E5B3A;">${phone}</a></td></tr>`) : ''}
          ${company ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Empresa</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${company}</td></tr>`) : ''}
          ${service ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Servicio</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${service}</td></tr>`) : ''}
          ${budget  ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Presupuesto</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${budget}</td></tr>`) : ''}
          ${timing  ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Plazo</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${timing}</td></tr>`) : ''}
          ${web      ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Web</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${web}</td></tr>`) : ''}
          ${puestos  ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Equipos</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${puestos}</td></tr>`) : ''}
          ${sector   ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Sector</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${sector}</td></tr>`) : ''}
          ${canales  ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Canales activos</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${canales}</td></tr>`) : ''}
          ${objetivo ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Objetivo</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${objetivo}</td></tr>`) : ''}
        </table>

        <h2 style="font-size: 16px; margin: 24px 0 8px;">Mensaje</h2>
        <div style="background: #FAF5E6; border-left: 4px solid #0E5B3A; padding: 14px 18px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${message}</div>

        <p style="margin-top: 32px; font-size: 11px; color: #888; text-align: center;">
          ★ Platanito Rico · Ctra. de Ronda 82, Vera · Almería ★
        </p>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      html: bodyHtml,
    });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return responder(false, 'No hemos podido enviar el mensaje. Inténtalo en unos minutos o escríbenos por WhatsApp.', 502);
  }

  return responder(true, 'Recibido', 200);
};
