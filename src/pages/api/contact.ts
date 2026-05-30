import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Ejecutar como Vercel Function, no prerender en build
export const prerender = false;

const TO_EMAIL    = 'hola@platanitorico.com';
const FROM_EMAIL  = 'web@platanitorico.com'; // dominio verificado en Resend
const FROM_NAME   = 'Platanito Rico · Web';

// Honeypot field name (debe estar oculto en el HTML)
const HONEYPOT_FIELD = 'bot-field';

const RAW = Symbol('html-raw');

function raw(s: string): { __html: string; [RAW]: true } {
  return { __html: s, [RAW]: true as const };
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
    if (typeof v === 'object' && v !== null && RAW in v) {
      return acc + s + (v as { __html: string }).__html;
    }
    return acc + s + escapeHtml(String(v ?? ''));
  }, '');
}

export const POST: APIRoute = async ({ request, redirect }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return new Response('Datos del formulario inválidos', { status: 400 });
  }

  // Honeypot anti-spam: si está rellenado, es un bot — devolvemos OK silencioso
  if (data.get(HONEYPOT_FIELD)) {
    return redirect('/success/', 303);
  }

  const name    = String(data.get('name')    || '').trim();
  const email   = String(data.get('email')   || '').trim();
  const phone   = String(data.get('phone')   || '').trim();
  const company = String(data.get('company') || '').trim();
  const service = String(data.get('service') || '').trim();
  const budget  = String(data.get('budget')  || '').trim();
  const timing  = String(data.get('timing')  || '').trim();
  const message = String(data.get('message') || '').trim();

  // Validación mínima — campos obligatorios
  if (!name || !email || !message) {
    return new Response('Faltan campos obligatorios', { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response('Email no válido', { status: 400 });
  }

  // Si no hay API key configurada, devolvemos error claro (no enviamos email pero la
  // app sigue funcionando — útil en preview y dev sin variables).
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY no configurada — el envío se ha omitido');
    // En producción esto es un fallo silencioso para el usuario pero registrado en logs.
    return redirect('/success/', 303);
  }

  const resend = new Resend(apiKey);

  const subject = `[Web] Briefing de ${name}${company ? ` · ${company}` : ''}`;

  const bodyHtml = html`
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#F5F0E6">
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 640px; margin: 24px auto; padding: 24px; background:#fff; border-radius:8px; color: #0E0D0B;">
        <h1 style="font-size: 20px; margin: 0 0 12px; border-bottom: 2px solid #FF6B35; padding-bottom: 8px;">Nuevo briefing desde la web</h1>
        <p style="font-size: 13px; color: #555; margin: 0 0 24px;">Recibido a través de platanitorico.com/contacto</p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 110px; font-weight: 700;">Nombre</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #FF6B35;">${email}</a></td></tr>
          ${phone   ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Teléfono</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #FF6B35;">${phone}</a></td></tr>`) : ''}
          ${company ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Empresa</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${company}</td></tr>`) : ''}
          ${service ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Servicio</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${service}</td></tr>`) : ''}
          ${budget  ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Presupuesto</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${budget}</td></tr>`) : ''}
          ${timing  ? raw(html`<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 700;">Plazo</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${timing}</td></tr>`) : ''}
        </table>

        <h2 style="font-size: 16px; margin: 24px 0 8px;">Mensaje</h2>
        <div style="background: #FAF5E6; border-left: 4px solid #FF6B35; padding: 14px 18px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${message}</div>

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
    return new Response('Error al enviar el mensaje. Inténtalo en unos minutos.', { status: 502 });
  }

  return redirect('/success/', 303);
};
