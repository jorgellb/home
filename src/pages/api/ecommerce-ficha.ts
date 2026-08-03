import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';
import { chatText, VISION_MODELS } from '../../lib/openrouter';
import { bump } from '../../lib/stats';
import { openrouterApiKey } from '../../lib/env';

/* "Almería Commerce-AI Engine" — agente de VISIÓN + copywriting: a partir de la
   foto de un producto genera una ficha de e-commerce (JSON) con análisis visual,
   copy ES/EN optimizado SEO y automatización de backend (slug/SKU/SQL).
   Usa modelos de visión gratuitos de OpenRouter; la key vive en el servidor. */
export const prerender = false;

const APP_TITLE = 'Almería Commerce-AI Engine';

const SYSTEM_PROMPT = `Actúas como "Almería Commerce-AI Engine", un agente de visión y copywriting comercial para agencias de desarrollo web. Tu objetivo es transformar la imagen de un producto en una ficha de e-commerce de nivel corporativo, optimizada para SEO internacional (Español/Inglés) y lista para bases de datos.

REGLAS (basadas en la imagen provista):
1. Identifica el producto, sus materiales/ingredientes aparentes, su estética y su público objetivo.
2. Genera un título gancho, descripciones persuasivas (storytelling) y especificaciones técnicas detalladas.
3. Tono comercialmente irresistible, adaptado al cliente local y al comprador extranjero/turista de la zona de Almería.

Devuelve EXCLUSIVAMENTE un objeto JSON válido. Sin texto antes ni después, sin markdown. Estructura EXACTA:

{
  "analisis_visual_ia": {
    "producto_detectado": "Nombre del objeto",
    "paleta_colores_hex": ["#HEX1", "#HEX2", "#HEX3"],
    "calidad_percibida": "Premium / Artesanal / Rústico / Moderno"
  },
  "ficha_ecommerce_es": {
    "seo_title": "Título optimizado para Google, máx 60 caracteres",
    "h1_title": "Título comercial del producto",
    "precio_sugerido_eur": "Precio de mercado realista según calidad visual (número o rango en €)",
    "descripcion_corta": "Texto directo que resalta el beneficio principal",
    "storytelling_emocional": "Un párrafo potente que conecte el producto con la exclusividad, el mediterráneo, la artesanía o el lujo local",
    "caracteristicas_tecnicas": [ { "clave": "Material/Origen/Capacidad", "valor": "Valor deducido" } ],
    "tags_seo": ["tag1", "tag2", "tag3"],
    "titulos_alternativos": ["Variante de título comercial 1", "Variante de título comercial 2"]
  },
  "ficha_ecommerce_en": {
    "h1_title_en": "Título traducido y adaptado al cliente británico/europeo",
    "descripcion_corta_en": "Descripción corta en inglés",
    "storytelling_en": "Storytelling adaptado al mercado anglosajón, resaltando 'Authentic Spanish / Mediterranean Luxury'"
  },
  "ficha_ecommerce_fr": {
    "h1_title_fr": "Título comercial en francés",
    "descripcion_corta_fr": "Descripción corta en francés"
  },
  "ficha_ecommerce_de": {
    "h1_title_de": "Título comercial en alemán",
    "descripcion_corta_de": "Descripción corta en alemán"
  },
  "automatizacion_backend": {
    "slug_url": "url-amigable-del-producto",
    "sku_sugerido": "Código SKU autogenerado, ej: PROD-ESP-001",
    "categoria_sugerida": "Categoría exacta para el inventario",
    "query_sql_insert": "INSERT INTO products (sku, name, price, stock) VALUES ('SKU', 'Title', PRECIO, 50);"
  }
}`;

function jsonError(message: string, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

function slugify(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
}
function priceNum(p: unknown): number {
  const m = String(p ?? '').replace(',', '.').match(/[\d.]+/);
  return m ? Math.round(parseFloat(m[0]) * 100) / 100 || 0 : 0;
}
/* Garantiza que la sección de backend esté completa aunque la IA la omita. */
function completarBackend(ficha: Record<string, any>) {
  const es = ficha.ficha_ecommerce_es || {};
  const v = ficha.analisis_visual_ia || {};
  const name = String(es.h1_title || v.producto_detectado || 'Producto').trim();
  const be = (ficha.automatizacion_backend = ficha.automatizacion_backend || {});
  if (!be.slug_url) be.slug_url = slugify(name) || 'producto';
  if (!be.sku_sugerido) {
    const code = (name.normalize('NFD').replace(/[̀-ͯ]/g, '').match(/[A-Za-z]/g) || []).join('').slice(0, 3).toUpperCase() || 'ESP';
    be.sku_sugerido = `PROD-${code}-001`;
  }
  if (!be.categoria_sugerida) be.categoria_sugerida = 'General';
  if (!be.query_sql_insert) {
    be.query_sql_insert = `INSERT INTO products (sku, name, price, stock) VALUES ('${be.sku_sugerido}', '${name.replace(/'/g, "''")}', ${priceNum(es.precio_sugerido_eur)}, 50);`;
  }
}

export const POST: APIRoute = async ({ request }) => {
  let body: { image?: string };
  try { body = await request.json(); } catch { return jsonError('Petición inválida.', 400); }

  const image = String(body.image || '');
  if (!/^data:image\/(png|jpe?g|webp);base64,/.test(image)) {
    return jsonError('Sube una imagen válida (JPG, PNG o WEBP).', 400);
  }
  if (image.length > 3_000_000) {
    return jsonError('La imagen es demasiado grande. Usa una más ligera.', 413);
  }

  const limit = await rateLimit(`ecom:${clientIp(request)}`, 15, 300);
  if (!limit.ok) return jsonError('Has analizado varias imágenes seguidas. Espera un momento.', 429, { 'Retry-After': String(limit.retryAfter) });

  const apiKey = openrouterApiKey();
  if (!apiKey) {
    console.error('[ecommerce-ficha] OPENROUTER_API_KEY no configurada');
    return jsonError('El analizador no está disponible ahora mismo. Mira el ejemplo mientras tanto.', 503);
  }

  void bump('demo:ecommerce');
  const result = await chatText({
    apiKey, title: APP_TITLE, temperature: 0.5, maxTokens: 2200,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Analiza esta imagen de producto y genera la ficha de e-commerce en JSON.' },
          { type: 'image_url', image_url: { url: image } },
        ],
      },
    ],
  }, VISION_MODELS);

  if (!result.ok) {
    return jsonError('El analizador de imágenes está saturado ahora mismo. Inténtalo de nuevo en unos segundos.', 502);
  }

  // Extraer y parsear el JSON (por si viene con ``` o texto alrededor)
  let raw = result.text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const start = raw.indexOf('{'); const end = raw.lastIndexOf('}');
  if (start !== -1 && end !== -1) raw = raw.slice(start, end + 1);
  try {
    const ficha = JSON.parse(raw);
    completarBackend(ficha);
    return new Response(JSON.stringify({ ficha }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch {
    console.error('[ecommerce-ficha] JSON no parseable:', result.text.slice(0, 200));
    return jsonError('La IA no devolvió un formato válido. Prueba con otra foto.', 502);
  }
};
