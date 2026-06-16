import type { APIRoute } from 'astro';

/* Vera AI Business Agent — endpoint server (Vercel Function).
   La API key de OpenRouter vive SOLO aquí (entorno), nunca en el navegador.
   El cliente envía las respuestas del wizard; aquí se construye el prompt con
   la base de conocimiento por sector y se devuelve una propuesta estructurada. */
export const prerender = false;

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const SITE_URL = 'https://platanitorico.com';
const APP_TITLE = 'Vera AI Business Agent';

type SectorId = 'alquiler' | 'inmobiliaria' | 'restaurante' | 'clinica' | 'facturacion';

interface VeraInput {
  sector: SectorId;
  tipoNegocio: string;
  problema: string;
  objetivo: string;
  presupuesto: string;
}

/* Base de conocimiento por sector: problemas frecuentes + soluciones posibles.
   Se inyecta en el prompt para que el modelo proponga algo aterrizado y vendible. */
const SECTORES: Record<SectorId, { nombre: string; problemas: string[]; soluciones: string[] }> = {
  alquiler: {
    nombre: 'Alquiler vacacional y apartamentos turísticos',
    problemas: ['Muchas preguntas repetidas', 'Check-in manual', 'Coordinación de limpieza', 'Incidencias', 'Dependencia de Booking o Airbnb', 'Pocas reservas directas'],
    soluciones: ['Asistente de huéspedes', 'Guía digital', 'Sistema de reservas directas', 'Coordinador de limpieza', 'Gestor de reseñas', 'Sistema de upselling local'],
  },
  inmobiliaria: {
    nombre: 'Inmobiliarias',
    problemas: ['Leads sin seguimiento', 'Respuesta lenta', 'Fichas de propiedades pobres', 'Poca captación de propietarios', 'Visitas mal organizadas'],
    soluciones: ['CRM inteligente', 'Clasificador de compradores', 'Generador de anuncios', 'Calculadora de rentabilidad', 'Agenda de visitas', 'Sistema de captación de propietarios'],
  },
  restaurante: {
    nombre: 'Restaurantes y hostelería',
    problemas: ['Muchas llamadas', 'Reservas desordenadas', 'Menús mal traducidos', 'Reseñas sin responder', 'Clientes que no aparecen', 'Mala gestión de turnos'],
    soluciones: ['Bot de reservas', 'Menú inteligente', 'Gestor de reseñas', 'Recordatorios de reserva', 'Recomendador de platos', 'Asistente para camareros'],
  },
  clinica: {
    nombre: 'Clínicas, estética y servicios locales',
    problemas: ['Citas perdidas', 'Agenda manual', 'Clientes que no vuelven', 'Formularios en papel', 'Pocas reseñas', 'Mala comunicación con clientes'],
    soluciones: ['Agenda inteligente', 'Recordatorios automáticos', 'Reactivación de clientes', 'Formularios digitales', 'Sistema de consentimiento', 'Gestor de reseñas'],
  },
  facturacion: {
    nombre: 'Facturación digital e integraciones para pymes',
    problemas: ['Facturas desordenadas', 'Mucho Excel', 'Doble trabajo', 'Documentos repartidos por email, WhatsApp y carpetas', 'Falta de control de cobros', 'Mala previsión de caja'],
    soluciones: ['Lector inteligente de facturas', 'Organizador de documentos', 'Conector con asesoría', 'Generador de presupuestos', 'Panel de cobros y pagos', 'Sistema de alertas'],
  },
};

function buildSystemPrompt(sector: { nombre: string; problemas: string[]; soluciones: string[] }): string {
  return `Eres "Vera AI Business Agent", un consultor de IA experto en automatización para negocios locales (provincia de Almería, España). No eres un chatbot: analizas un problema real de negocio y propones una solución concreta y vendible.

SECTOR DEL CLIENTE: ${sector.nombre}
Problemas frecuentes de este sector: ${sector.problemas.join('; ')}.
Soluciones típicas para este sector: ${sector.soluciones.join('; ')}.

CÓMO RAZONAS (en este orden):
1. Identifica el sector. 2. Detecta el dolor principal. 3. Relaciónalo con una oportunidad de automatización. 4. Propón una app o sistema concreto (con nombre atractivo y comercial, p. ej. "GuestPilot AI"). 5. Explica cómo funcionaría de forma sencilla. 6. Di el beneficio para el negocio. 7. Sugiere un precio orientativo prudente. 8. Redacta un mensaje comercial reutilizable.

TONO: claro, comercial, profesional, fácil de entender, orientado a negocio, sin tecnicismos innecesarios.

REGLAS IMPORTANTES:
- No prometas resultados garantizados (usa "puede", "podría", "ayuda a").
- No inventes precios cerrados, condiciones ni información legal.
- Precios siempre como rangos orientativos en euros, prudentes.
- 5 a 8 funciones principales.
- Responde en español de España.

Devuelve EXCLUSIVAMENTE un objeto JSON válido (sin markdown, sin texto fuera del JSON) con esta forma exacta:
{
  "diagnostico": "string — qué problema parece tener el negocio",
  "oportunidad": "string — qué oportunidad de automatización hay",
  "solucion": { "nombre": "string — nombre atractivo del producto", "descripcion": "string — 1-2 frases" },
  "comoFunciona": ["string — pasos del flujo, 4 a 6 pasos"],
  "funciones": ["string — entre 5 y 8 funciones"],
  "beneficio": "string — valor comercial, sin garantizar resultados",
  "precio": { "basico": "string — rango €", "completo": "string — rango €", "mantenimiento": "string — cuota mensual € o 'opcional'" },
  "demoPortfolio": "string — cómo se vería esta solución en un portfolio",
  "mensajeComercial": "string — mensaje corto y directo para vender la solución",
  "limites": ["string — 4 a 6 límites y riesgos profesionales"]
}`;
}

function buildUserPrompt(input: VeraInput): string {
  return `Datos del negocio:
- Tipo de negocio: ${input.tipoNegocio || '(no especificado)'}
- Problema principal: ${input.problema || '(no especificado)'}
- Objetivo que quiere conseguir: ${input.objetivo || '(no especificado)'}
- Presupuesto aproximado: ${input.presupuesto || '(no especificado)'}

Genera la propuesta JSON para este negocio.`;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let input: Partial<VeraInput>;
  try {
    input = await request.json();
  } catch {
    return json({ error: 'Cuerpo de la petición inválido.' }, 400);
  }

  const sectorId = input.sector as SectorId;
  const sector = sectorId && SECTORES[sectorId];
  if (!sector) {
    return json({ error: 'Selecciona un sector válido.' }, 400);
  }
  if (!input.problema || !String(input.problema).trim()) {
    return json({ error: 'Cuéntanos cuál es el problema principal.' }, 400);
  }

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[vera] OPENROUTER_API_KEY no configurada en el entorno');
    return json({ error: 'El asistente no está configurado todavía. Inténtalo más tarde.' }, 503);
  }

  const model = import.meta.env.OPENROUTER_MODEL || 'openai/gpt-4o';

  const payload: VeraInput = {
    sector: sectorId,
    tipoNegocio: String(input.tipoNegocio || '').slice(0, 500),
    problema: String(input.problema || '').slice(0, 1000),
    objetivo: String(input.objetivo || '').slice(0, 500),
    presupuesto: String(input.presupuesto || '').slice(0, 200),
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
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: buildSystemPrompt(sector) },
          { role: 'user', content: buildUserPrompt(payload) },
        ],
      }),
    });
  } catch (err) {
    console.error('[vera] Error de red llamando a OpenRouter:', err);
    return json({ error: 'No se pudo contactar con el asistente. Inténtalo en unos minutos.' }, 502);
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '');
    console.error('[vera] OpenRouter respondió', upstream.status, detail.slice(0, 500));
    return json({ error: 'El asistente no pudo generar la propuesta. Inténtalo de nuevo.' }, 502);
  }

  let proposal: unknown;
  try {
    const data = await upstream.json();
    const content = data?.choices?.[0]?.message?.content;
    proposal = typeof content === 'string' ? JSON.parse(content) : content;
  } catch (err) {
    console.error('[vera] No se pudo parsear la respuesta del modelo:', err);
    return json({ error: 'La respuesta del asistente no tuvo el formato esperado. Inténtalo de nuevo.' }, 502);
  }

  return json({ sector: sector.nombre, proposal });
};
