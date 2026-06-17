import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { streamChatResponse } from '../../lib/openrouter';

/* Estratega de marketing — genera una estrategia adaptada al negocio/sector.
   Streaming desde OpenRouter (cadena de modelos gratis); key en servidor. */
export const prerender = false;

const APP_TITLE = 'Estrategia de Marketing · Platanito Rico';

const SYSTEM_PROMPT = `Eres un director de marketing (CMO) senior, experto en marketing digital, captación, conversión y fidelización para negocios locales y pymes (España). Diseñas estrategias de marketing claras, accionables y rentables.

TAREA: a partir del negocio/sector del usuario, crea una estrategia de marketing breve, premium y comercial, en español de España. Sofisticada pero clara para perfiles no técnicos. NO cites herramientas, plataformas técnicas ni nombres de software concretos: habla de canales, acciones, mensajes y valor.

FORMATO (markdown, exactamente estas secciones, conciso —2 a 4 frases o 4 a 6 viñetas por sección—):

# Estrategia de Marketing · <Negocio o sector>

## Diagnóstico
<2-3 frases: situación y principal reto de marketing de este negocio>

## A quién te diriges
<2-3 frases o viñetas: público objetivo y qué le mueve>

## Canales recomendados
<viñetas: los 6-8 canales más rentables para ESTE negocio, cada uno con 3-6 palabras de por qué>

## Mensajes y ángulos que conectan
<viñetas: 3-5 ideas de mensaje/gancho específicos del sector>

## Plan por fases
<viñetas con 3 fases: Captación, Conversión, Fidelización — una acción concreta por fase>

## Tus primeros 30 días
<viñetas: 4-5 acciones para arrancar ya>

## Qué medir
<viñetas: 4-5 indicadores clave para este negocio>

## En una frase
<una frase de impacto, memorable>

NO prometas resultados garantizados (usa "puede", "ayuda a"). Precios, si los mencionas, como rangos orientativos. Devuelve SOLO el markdown.`;

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

export const POST: APIRoute = async ({ request }) => {
  let body: { sector?: string; tipoNegocio?: string };
  try { body = await request.json(); } catch { return jsonError('Petición inválida.', 400); }

  const sector = String(body.sector || '').trim().slice(0, 160);
  const tipoNegocio = String(body.tipoNegocio || '').trim().slice(0, 300);
  if (!sector) return jsonError('Dinos a qué se dedica tu empresa o elige un sector.', 400);

  const limit = await rateLimit(`mkt:${clientIp(request)}`, 10, 300);
  if (!limit.ok) return jsonError('Has generado varias estrategias seguidas. Espera un momento.', 429, { 'Retry-After': String(limit.retryAfter) });

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[marketing] OPENROUTER_API_KEY no configurada');
    return jsonError('El generador no está disponible ahora mismo.', 503);
  }

  const userPrompt = `Negocio / sector: ${sector}.${tipoNegocio ? ` Detalle: ${tipoNegocio}.` : ''}\nGenera la estrategia de marketing adaptada a este negocio.`;

  return streamChatResponse({
    apiKey, title: APP_TITLE, temperature: 0.7, maxTokens: 1600,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  });
};
