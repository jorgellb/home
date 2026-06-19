import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { bump } from '../../lib/stats';

/* Recibe eventos anónimos del cliente (solo con consentimiento) y los cuenta.
   Allowlist estricta de nombres de evento; no guarda nada personal. */
export const prerender = false;

const ALLOWED = /^(pv:[a-z0-9/_-]{1,60}|demo:[a-z]{1,14}|cta:[a-z0-9_-]{1,20})$/;

export const POST: APIRoute = async ({ request }) => {
  let body: { event?: string };
  try { body = await request.json(); } catch { return new Response(null, { status: 204 }); }
  const event = String(body.event || '');
  if (!ALLOWED.test(event)) return new Response(null, { status: 204 });

  // Límite generoso para no bloquear navegación normal, pero frena abusos.
  const limit = await rateLimit(`trk:${clientIp(request)}`, 80, 300);
  if (limit.ok) {
    await bump(event);
    if (event.startsWith('pv:')) await bump('pv:all');
  }

  return new Response(null, { status: 204 });
};
