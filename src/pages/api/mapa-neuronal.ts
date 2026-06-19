import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { streamChatResponse } from '../../lib/openrouter';
import { bump } from '../../lib/stats';

/* "Mapa Neuronal de la Empresa" — agente que diseña la propuesta del producto
   adaptada al sector del visitante. Streaming desde OpenRouter; key en servidor. */
export const prerender = false;

const APP_TITLE = 'Mapa Neuronal · Platanito Rico';

const SYSTEM_PROMPT = `Eres un experto senior en diseño de producto digital, experiencia de usuario, visualización de datos, inteligencia de negocio e interfaces futuristas. Diseñas el concepto comercial de una solución llamada "Mapa Neuronal de la Empresa".

CONCEPTO: una visualización futurista e intuitiva donde la empresa se ve como un cerebro vivo: un núcleo de inteligencia central y, alrededor, nodos conectados (clientes, ventas, documentos, tareas, equipos, procesos, oportunidades, alertas, métricas, riesgos). Las conexiones expresan flujo, dependencia, urgencia y prioridad. La IA detecta patrones, cuellos de botella, riesgos y oportunidades, y convierte datos dispersos en inteligencia accionable.

TAREA: adapta el concepto al SECTOR del usuario y genera una propuesta breve, premium y comercial, en español de España. Sofisticada pero clara para perfiles no técnicos. NO cites tecnologías, herramientas, frameworks ni nombres técnicos: habla de capacidades, comportamientos y valor.

FORMATO (markdown, exactamente estas secciones, conciso —2 a 4 frases o 4 a 6 viñetas por sección—):

# Mapa Neuronal · <Sector>

## Tu empresa como un cerebro vivo
<visión adaptada al sector, 2-3 frases>

## Los nodos que protagonizan tu mapa
<viñetas: los elementos clave de ESE sector y qué representan>

## Las conexiones que importan
<viñetas: relaciones más relevantes del sector y qué revelan>

## Lo que la IA detectaría en tu negocio
<viñetas: 4-6 riesgos y oportunidades CONCRETOS y creíbles del sector>

## Tu panel ejecutivo de un vistazo
<viñetas: 4-5 indicadores de salud del negocio relevantes para el sector>

## Por qué te conviene
<2-3 frases de valor comercial, sin prometer resultados garantizados>

## En una frase
<una frase de impacto, memorable>

Devuelve SOLO el markdown.`;

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

export const POST: APIRoute = async ({ request }) => {
  let body: { sector?: string; tipoNegocio?: string };
  try { body = await request.json(); } catch { return jsonError('Petición inválida.', 400); }

  const sector = String(body.sector || '').trim().slice(0, 120);
  const tipoNegocio = String(body.tipoNegocio || '').trim().slice(0, 300);
  if (!sector) return jsonError('Elige un sector.', 400);

  const limit = await rateLimit(`mapa:${clientIp(request)}`, 10, 300);
  if (!limit.ok) return jsonError('Has generado varios mapas seguidos. Espera un momento.', 429, { 'Retry-After': String(limit.retryAfter) });

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[mapa-neuronal] OPENROUTER_API_KEY no configurada');
    return jsonError('El generador no está disponible ahora mismo.', 503);
  }
  const userPrompt = `Sector del negocio: ${sector}.${tipoNegocio ? ` Detalle: ${tipoNegocio}.` : ''}\nGenera la propuesta del Mapa Neuronal adaptada a este negocio.`;

  void bump('demo:mapa');
  return streamChatResponse({
    apiKey, title: APP_TITLE, temperature: 0.7, maxTokens: 1600,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  });
};
