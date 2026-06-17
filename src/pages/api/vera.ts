import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { sseToText } from '../../lib/sse-stream';

/* Vera AI Business Agent — endpoint server (Vercel Function), con streaming.
   La API key de OpenRouter vive SOLO aquí (entorno), nunca en el navegador.
   Devuelve la propuesta en markdown, en streaming, en español o inglés. */
export const prerender = false;

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const SITE_URL = 'https://platanitorico.com';
const APP_TITLE = 'Vera AI Business Agent';

type SectorId = 'alquiler' | 'inmobiliaria' | 'restaurante' | 'clinica' | 'facturacion';
type Lang = 'es' | 'en';

interface VeraInput {
  sector: SectorId;
  tipoNegocio: string;
  problema: string;
  objetivo: string;
  presupuesto: string;
  lang: Lang;
}

/* Base de conocimiento por sector + ejemplos de estilo para nombrar el producto. */
const SECTORES: Record<SectorId, { nombre: string; problemas: string[]; soluciones: string[]; nombres: string[] }> = {
  alquiler: {
    nombre: 'Alquiler vacacional y apartamentos turísticos',
    problemas: ['Muchas preguntas repetidas', 'Check-in manual', 'Coordinación de limpieza', 'Incidencias', 'Dependencia de Booking o Airbnb', 'Pocas reservas directas'],
    soluciones: ['Asistente de huéspedes', 'Guía digital', 'Sistema de reservas directas', 'Coordinador de limpieza', 'Gestor de reseñas', 'Sistema de upselling local'],
    nombres: ['StayConcierge', 'DirectStay', 'GuestPilot', 'RentalFlow'],
  },
  inmobiliaria: {
    nombre: 'Inmobiliarias',
    problemas: ['Leads sin seguimiento', 'Respuesta lenta', 'Fichas de propiedades pobres', 'Poca captación de propietarios', 'Visitas mal organizadas'],
    soluciones: ['CRM inteligente', 'Clasificador de compradores', 'Generador de anuncios', 'Calculadora de rentabilidad', 'Agenda de visitas', 'Sistema de captación de propietarios'],
    nombres: ['LeadNest', 'PropMatch', 'RealtyPilot', 'CasaLead'],
  },
  restaurante: {
    nombre: 'Restaurantes y hostelería',
    problemas: ['Muchas llamadas', 'Reservas desordenadas', 'Menús mal traducidos', 'Reseñas sin responder', 'Clientes que no aparecen', 'Mala gestión de turnos'],
    soluciones: ['Bot de reservas', 'Menú inteligente', 'Gestor de reseñas', 'Recordatorios de reserva', 'Recomendador de platos', 'Asistente para camareros'],
    nombres: ['TableMate', 'MesaFlow', 'ReservaBot', 'DineDesk'],
  },
  clinica: {
    nombre: 'Clínicas, estética y servicios locales',
    problemas: ['Citas perdidas', 'Agenda manual', 'Clientes que no vuelven', 'Formularios en papel', 'Pocas reseñas', 'Mala comunicación con clientes'],
    soluciones: ['Agenda inteligente', 'Recordatorios automáticos', 'Reactivación de clientes', 'Formularios digitales', 'Sistema de consentimiento', 'Gestor de reseñas'],
    nombres: ['CitaCare', 'AgendaPro', 'ClinicFlow', 'BeautyDesk'],
  },
  facturacion: {
    nombre: 'Facturación digital e integraciones para pymes',
    problemas: ['Facturas desordenadas', 'Mucho Excel', 'Doble trabajo', 'Documentos repartidos por email, WhatsApp y carpetas', 'Falta de control de cobros', 'Mala previsión de caja'],
    soluciones: ['Lector inteligente de facturas', 'Organizador de documentos', 'Conector con asesoría', 'Generador de presupuestos', 'Panel de cobros y pagos', 'Sistema de alertas'],
    nombres: ['FacturaFlow', 'BillSense', 'CashPilot', 'InvoiceIQ'],
  },
};

const SECCIONES: Record<Lang, string[]> = {
  es: ['Diagnóstico del negocio', 'Oportunidad detectada', 'App o sistema recomendado', 'Cómo funcionaría', 'Funciones principales', 'Beneficio para el negocio', 'Precio orientativo', 'Demo para portfolio', 'Mensaje comercial', 'Límites y riesgos'],
  en: ['Business diagnosis', 'Opportunity detected', 'Recommended app or system', 'How it would work', 'Main features', 'Business benefit', 'Indicative pricing', 'Portfolio demo', 'Sales message', 'Limits and risks'],
};

function buildSystemPrompt(sector: typeof SECTORES[SectorId], lang: Lang): string {
  const s = SECCIONES[lang];
  const langLine = lang === 'en'
    ? 'Respond ENTIRELY in English (UK/EU business English). The input data may be in Spanish; translate concepts as needed.'
    : 'Responde en español de España.';
  const intro = lang === 'en'
    ? `You are "Vera AI Business Agent", an AI consultant specialised in automation for local businesses (Almería, Spain). You are not a chatbot: you analyse a real business problem and propose a concrete, sellable solution.`
    : `Eres "Vera AI Business Agent", un consultor de IA experto en automatización para negocios locales (provincia de Almería, España). No eres un chatbot: analizas un problema real de negocio y propones una solución concreta y vendible.`;
  const rules = lang === 'en'
    ? `RULES:
- Never promise guaranteed results (use "can", "could", "helps to").
- Do not invent fixed prices, terms or legal info. Prices are indicative ranges in euros.
- Be concrete and concise. No filler.
- The product name must FIT THIS SECTOR, be original and brandable. Style examples (do NOT copy them, invent a new one): ${sector.nombres.join(', ')}.`
    : `REGLAS:
- No prometas resultados garantizados (usa "puede", "podría", "ayuda a").
- No inventes precios cerrados, condiciones ni información legal. Los precios son rangos orientativos en euros.
- Sé concreto y conciso. Sin relleno.
- El nombre del producto debe ENCAJAR CON ESTE SECTOR, ser original y comercial. Ejemplos de estilo (NO los copies, inventa uno nuevo): ${sector.nombres.join(', ')}.`;

  return `${intro}

SECTOR: ${sector.nombre}
${lang === 'en' ? 'Common problems' : 'Problemas frecuentes'}: ${sector.problemas.join('; ')}.
${lang === 'en' ? 'Typical solutions' : 'Soluciones típicas'}: ${sector.soluciones.join('; ')}.

${langLine}
${rules}

${lang === 'en' ? 'OUTPUT FORMAT (markdown, exactly this structure):' : 'FORMATO DE SALIDA (markdown, exactamente esta estructura):'}

# <${lang === 'en' ? 'Attractive, brandable product name that fits the sector' : 'Nombre atractivo y comercial del producto, acorde al sector'}>

## 1. ${s[0]}
## 2. ${s[1]}
## 3. ${s[2]}
## 4. ${s[3]}
${lang === 'en' ? '<list of 4-6 flow steps, with dashes>' : '<lista de 4 a 6 pasos del flujo, con guiones>'}
## 5. ${s[4]}
${lang === 'en' ? '<list of 5-8 features, with dashes>' : '<lista de 5 a 8 funciones, con guiones>'}
## 6. ${s[5]}
## 7. ${s[6]}
${lang === 'en' ? '<basic range, full range and optional monthly maintenance, in euros>' : '<rangos: versión básica, versión completa y cuota de mantenimiento opcional, en euros>'}
## 8. ${s[7]}
## 9. ${s[8]}
${lang === 'en' ? '<a short, direct message ready to send by WhatsApp/email>' : '<un mensaje corto y directo, listo para enviar por WhatsApp/email>'}
## 10. ${s[9]}
${lang === 'en' ? '<list of 4-6 professional limits, with dashes>' : '<lista de 4 a 6 límites profesionales, con guiones>'}

${lang === 'en' ? 'Each "##" section that is not a list must have 2-3 sentences. Return ONLY the markdown.' : 'Cada sección "##" que no sea lista debe tener 2-3 frases. Devuelve SOLO el markdown.'}`;
}

function buildUserPrompt(input: VeraInput): string {
  if (input.lang === 'en') {
    return `Business data:
- Business type: ${input.tipoNegocio || '(not specified)'}
- Main problem: ${input.problema || '(not specified)'}
- Goal: ${input.objetivo || '(not specified)'}
- Approx. budget: ${input.presupuesto || '(not specified)'}

Generate the markdown proposal for this business.`;
  }
  return `Datos del negocio:
- Tipo de negocio: ${input.tipoNegocio || '(no especificado)'}
- Problema principal: ${input.problema || '(no especificado)'}
- Objetivo que quiere conseguir: ${input.objetivo || '(no especificado)'}
- Presupuesto aproximado: ${input.presupuesto || '(no especificado)'}

Genera la propuesta en markdown para este negocio.`;
}

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let input: Partial<VeraInput>;
  try {
    input = await request.json();
  } catch {
    return jsonError('Cuerpo de la petición inválido.', 400);
  }

  const sectorId = input.sector as SectorId;
  const sector = sectorId && SECTORES[sectorId];
  if (!sector) return jsonError('Selecciona un sector válido.', 400);
  if (!input.problema || !String(input.problema).trim()) {
    return jsonError('Cuéntanos cuál es el problema principal.', 400);
  }

  // Rate limiting: evita abuso del endpoint (coste del modelo).
  const limit = await rateLimit(clientIp(request), 6, 300);
  if (!limit.ok) {
    return jsonError(
      'Has hecho muchas peticiones seguidas. Espera un momento y vuelve a probar (o mira un ejemplo mientras tanto).',
      429,
      { 'Retry-After': String(limit.retryAfter) },
    );
  }

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[vera] OPENROUTER_API_KEY no configurada en el entorno');
    return jsonError('El asistente no está configurado todavía. Mira un ejemplo mientras tanto.', 503);
  }

  const model = import.meta.env.OPENROUTER_MODEL || 'openai/gpt-4o';
  const lang: Lang = input.lang === 'en' ? 'en' : 'es';
  const payload: VeraInput = {
    sector: sectorId,
    tipoNegocio: String(input.tipoNegocio || '').slice(0, 500),
    problema: String(input.problema || '').slice(0, 1000),
    objetivo: String(input.objetivo || '').slice(0, 500),
    presupuesto: String(input.presupuesto || '').slice(0, 200),
    lang,
  };

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
        temperature: 0.6,
        max_tokens: 1500,
        stream: true,
        messages: [
          { role: 'system', content: buildSystemPrompt(sector, lang) },
          { role: 'user', content: buildUserPrompt(payload) },
        ],
      }),
    });
  } catch (err) {
    console.error('[vera] Error de red llamando a OpenRouter:', err);
    return jsonError('No se pudo contactar con el asistente. Inténtalo en unos minutos.', 502);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '');
    console.error('[vera] OpenRouter respondió', upstream.status, detail.slice(0, 300));
    return jsonError('El asistente no pudo generar la propuesta. Inténtalo de nuevo.', 502);
  }

  return new Response(sseToText(upstream.body), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
};
