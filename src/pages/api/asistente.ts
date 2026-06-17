import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { sseToText } from '../../lib/sse-stream';

/* Asistente IA de Platanito Rico — chat conversacional sobre los servicios.
   Streaming desde OpenRouter; la API key vive solo en el servidor. */
export const prerender = false;

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const SITE_URL = 'https://platanitorico.com';
const APP_TITLE = 'Asistente IA · Platanito Rico';

const MAX_MESSAGES = 14;     // últimos N mensajes que se mandan al modelo
const MAX_CONTENT = 2000;    // caracteres por mensaje

interface ChatMessage { role: 'user' | 'assistant'; content: string }

const SYSTEM_PROMPT = `Eres "Vera", la asistente virtual de Platanito Rico, un estudio de diseño y desarrollo web con IA en Almería (España). Atiendes por chat a posibles clientes y resuelves sus dudas sobre los servicios como lo haría una persona del equipo: cercana, clara y útil.

ESTILO:
- Tono humano, cercano y profesional. Mensajes BREVES (2-5 frases), como un chat real. Nada de muros de texto.
- Tutea. Cuando encaje, haz una pregunta de seguimiento para entender qué necesita.
- Responde SIEMPRE en el mismo idioma en el que te escribe el usuario.
- Evita tecnicismos innecesarios; ve al grano.

SERVICIOS DE PLATANITO RICO:
- Diseño y desarrollo web ultrarrápido (Astro/Next, objetivo 100/100 en Lighthouse, carga <1s): landings de conversión, webs corporativas (5-15 páginas con blog), tiendas online (Stripe, PayPal, Redsys, Bizum, transferencia) y web apps a medida (intranets, CRM, paneles).
- SEO técnico y local incluido. Webs multiidioma para captar clientes extranjeros.
- Hosting gratuito para webs estáticas + SSL incluido. La web y el dominio son del cliente, sin permanencia (te llevas el código cuando quieras).
- Mantenimiento opcional: Básico 39€/mes, Pro 79€/mes, Tienda 149€/mes.
- Otros servicios: marketing digital, diseño gráfico, audiovisual, probador virtual AR para ecommerce y agentes de IA a medida (como esta misma demo).
- Plazos orientativos: landing 5-7 días, web corporativa 1-2 semanas, tienda online 2-3 semanas; proyectos a medida según complejidad.
- Contacto: hola@platanitorico.com · WhatsApp/teléfono +34 657 085 019 · platanitorico.com · Almería (trabajan con toda España).

PRECIOS:
- Da rangos ORIENTATIVOS de inicio: landing desde ~350€, web corporativa desde ~500€, tienda online desde ~700€, web app a medida según proyecto. Aclara que el presupuesto final es cerrado y gratis tras conocer el proyecto. Los precios de mantenimiento de arriba sí son exactos.
- NUNCA inventes precios cerrados, condiciones legales ni garantías de resultados. Si no estás segura de una cifra, ofrece un presupuesto personalizado.

REGLAS:
- Si no sabes algo o se sale de los servicios, dilo con naturalidad y ofrece poner en contacto con el equipo.
- Si el usuario muestra interés real (quiere presupuesto, fechas o empezar), anímale con suavidad a dejar sus datos en /contacto/, escribir a hola@platanitorico.com o al WhatsApp +34 657 085 019.
- No trates temas ajenos al negocio; redirige con amabilidad.
- Si te preguntan si eres una persona, sé honesta: eres la asistente virtual (IA) del equipo de Platanito Rico, y con gusto les pasas con una persona si lo necesitan.
- Esta conversación es una demo que muestra cómo Platanito Rico crea agentes de IA para negocios.`;

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonError('Cuerpo de la petición inválido.', 400);
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = raw
    .filter((m): m is ChatMessage =>
      !!m && typeof m === 'object' &&
      ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant') &&
      typeof (m as ChatMessage).content === 'string')
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CONTENT) }));

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return jsonError('Escribe un mensaje para empezar.', 400);
  }

  const limit = await rateLimit(`chat:${clientIp(request)}`, 30, 300);
  if (!limit.ok) {
    return jsonError('Estás escribiendo muy rápido 🙂. Espera un momento y sigue.', 429, { 'Retry-After': String(limit.retryAfter) });
  }

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[asistente] OPENROUTER_API_KEY no configurada');
    return jsonError('El asistente no está disponible ahora mismo. Escríbenos a hola@platanitorico.com.', 503);
  }
  const model = import.meta.env.OPENROUTER_MODEL || 'openai/gpt-4o';

  let upstream: Response;
  try {
    upstream = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': SITE_URL,
        'X-Title': APP_TITLE,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        max_tokens: 600,
        stream: true,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    });
  } catch (err) {
    console.error('[asistente] Error de red:', err);
    return jsonError('No se pudo contactar con el asistente. Inténtalo en un momento.', 502);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '');
    console.error('[asistente] OpenRouter', upstream.status, detail.slice(0, 300));
    return jsonError('El asistente no pudo responder. Inténtalo de nuevo.', 502);
  }

  return new Response(sseToText(upstream.body), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' },
  });
};
