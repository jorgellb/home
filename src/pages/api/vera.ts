import type { APIRoute } from 'astro';

/* Vera AI Business Agent — endpoint server (Vercel Function), con streaming.
   La API key de OpenRouter vive SOLO aquí (entorno), nunca en el navegador.
   Devuelve la propuesta en markdown, en streaming (token a token) para que el
   cliente la escriba en vivo. */
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

/* Base de conocimiento por sector: problemas frecuentes + soluciones posibles. */
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
Problemas frecuentes del sector: ${sector.problemas.join('; ')}.
Soluciones típicas del sector: ${sector.soluciones.join('; ')}.

TONO: claro, comercial, profesional, fácil de entender, orientado a negocio, sin tecnicismos innecesarios.

REGLAS:
- No prometas resultados garantizados (usa "puede", "podría", "ayuda a").
- No inventes precios cerrados, condiciones ni información legal. Los precios son rangos orientativos en euros.
- Responde en español de España.
- Sé concreto y conciso. Sin relleno.

FORMATO DE SALIDA (markdown, exactamente esta estructura):

# <Nombre atractivo y comercial del producto, ej.: GuestPilot AI>

## 1. Diagnóstico del negocio
<2-3 frases sobre el problema que parece tener>

## 2. Oportunidad detectada
<2-3 frases sobre la oportunidad de automatización>

## 3. App o sistema recomendado
<qué es la solución, 2-3 frases>

## 4. Cómo funcionaría
<lista de 4 a 6 pasos del flujo, con guiones>

## 5. Funciones principales
<lista de 5 a 8 funciones, con guiones>

## 6. Beneficio para el negocio
<2-3 frases de valor comercial, sin garantizar resultados>

## 7. Precio orientativo
<rangos: versión básica, versión completa y cuota de mantenimiento opcional, en euros>

## 8. Demo para portfolio
<1-2 frases sobre cómo se mostraría en un portfolio>

## 9. Mensaje comercial
<un mensaje corto y directo, listo para enviar por WhatsApp/email>

## 10. Límites y riesgos
<lista de 4 a 6 límites profesionales, con guiones>

Devuelve SOLO el markdown, sin texto antes ni después.`;
}

function buildUserPrompt(input: VeraInput): string {
  return `Datos del negocio:
- Tipo de negocio: ${input.tipoNegocio || '(no especificado)'}
- Problema principal: ${input.problema || '(no especificado)'}
- Objetivo que quiere conseguir: ${input.objetivo || '(no especificado)'}
- Presupuesto aproximado: ${input.presupuesto || '(no especificado)'}

Genera la propuesta en markdown para este negocio.`;
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
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

  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[vera] OPENROUTER_API_KEY no configurada en el entorno');
    return jsonError('El asistente no está configurado todavía. Mira un ejemplo mientras tanto.', 503);
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
        stream: true,
        messages: [
          { role: 'system', content: buildSystemPrompt(sector) },
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

  /* Parsear el SSE de OpenRouter en el servidor y reenviar solo el texto. */
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith('data:')) continue;
        const data = t.slice(5).trim();
        if (data === '[DONE]') {
          controller.close();
          return;
        }
        try {
          const json = JSON.parse(data);
          const delta = json?.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        } catch {
          /* línea de keep-alive o fragmento parcial: ignorar */
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => { /* noop */ });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
};
