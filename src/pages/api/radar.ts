import type { APIRoute } from 'astro';
import { rateLimit, clientIp } from '../../lib/rate-limit';

/* "Radar captador de clientes" — herramienta PRIVADA (clave STATS_KEY). Busca
   negocios reales de un sector y pueblo usando datos públicos de OpenStreetMap
   (Nominatim + Overpass) y los puntúa por oportunidad comercial (sobre todo, si
   NO tienen web). No inventa nada: solo usa datos publicados abiertamente. */
export const prerender = false;

const UA = 'PlatanitoRico-Radar/1.0 (https://platanitorico.com; hola@platanitorico.com)';
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];

const URL_UP = import.meta.env.UPSTASH_REDIS_REST_URL || import.meta.env.KV_REST_API_URL;
const TOK_UP = import.meta.env.UPSTASH_REDIS_REST_TOKEN || import.meta.env.KV_REST_API_TOKEN;

export const SECTORS: Record<string, { label: string; tags: string[] }> = {
  peluqueria: { label: 'Peluquerías', tags: ['shop=hairdresser'] },
  belleza: { label: 'Estética y uñas', tags: ['shop=beauty', 'shop=cosmetics'] },
  restaurante: { label: 'Restaurantes', tags: ['amenity=restaurant'] },
  bar: { label: 'Bares y cafeterías', tags: ['amenity=cafe', 'amenity=bar', 'amenity=pub'] },
  dentista: { label: 'Clínicas dentales', tags: ['amenity=dentist', 'healthcare=dentist'] },
  fisio: { label: 'Fisioterapia / clínicas', tags: ['healthcare=physiotherapist', 'amenity=clinic'] },
  veterinario: { label: 'Veterinarios', tags: ['amenity=veterinary'] },
  inmobiliaria: { label: 'Inmobiliarias', tags: ['office=estate_agent'] },
  abogado: { label: 'Abogados / gestorías', tags: ['office=lawyer', 'office=accountant', 'office=tax_advisor'] },
  gimnasio: { label: 'Gimnasios', tags: ['leisure=fitness_centre'] },
  ropa: { label: 'Tiendas de ropa', tags: ['shop=clothes'] },
  floristeria: { label: 'Floristerías', tags: ['shop=florist'] },
  taller: { label: 'Talleres mecánicos', tags: ['shop=car_repair'] },
  panaderia: { label: 'Panaderías y pastelerías', tags: ['shop=bakery', 'shop=pastry'] },
  ferreteria: { label: 'Ferreterías y bricolaje', tags: ['shop=hardware', 'shop=doityourself'] },
  hotel: { label: 'Hoteles y alojamientos', tags: ['tourism=hotel', 'tourism=guest_house', 'tourism=apartment'] },
};

interface Negocio {
  nombre: string; web: string | null; telefono: string | null; redes: string[];
  lat: number | null; lon: number | null; score: number; motivos: string[];
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}

async function cacheGet(key: string): Promise<unknown | null> {
  if (!URL_UP || !TOK_UP) return null;
  try {
    const r = await fetch(URL_UP, { method: 'POST', headers: { Authorization: `Bearer ${TOK_UP}`, 'Content-Type': 'application/json' }, body: JSON.stringify(['GET', key]) });
    const d = r.ok ? await r.json() : null;
    return d?.result ? JSON.parse(d.result) : null;
  } catch { return null; }
}
async function cacheSet(key: string, value: unknown, ttl = 86400): Promise<void> {
  if (!URL_UP || !TOK_UP) return;
  try {
    await fetch(URL_UP, { method: 'POST', headers: { Authorization: `Bearer ${TOK_UP}`, 'Content-Type': 'application/json' }, body: JSON.stringify(['SET', key, JSON.stringify(value), 'EX', ttl]) });
  } catch { /* noop */ }
}

async function geocode(pueblo: string): Promise<[string, string, string, string] | null> {
  const q = encodeURIComponent(`${pueblo}, Almería, España`);
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 6000);
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=es`, { headers: { 'User-Agent': UA, 'Accept-Language': 'es' }, signal: ctrl.signal });
    if (!r.ok) return null;
    const d = await r.json();
    const bb = d?.[0]?.boundingbox; // [south, north, west, east]
    return Array.isArray(bb) && bb.length === 4 ? [bb[0], bb[1], bb[2], bb[3]] : null;
  } catch { return null; } finally { clearTimeout(t); }
}

function buildQL(tags: string[], bb: [string, string, string, string]): string {
  const [s, n, w, e] = bb; const bbox = `${s},${w},${n},${e}`;
  const parts = tags.map((t) => { const [k, v] = t.split('='); return `nwr["${k}"="${v}"](${bbox});`; }).join('');
  return `[out:json][timeout:18];(${parts});out center tags 120;`;
}

async function overpass(ql: string): Promise<any[] | null> {
  for (const url of OVERPASS) {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 9000);
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA }, body: 'data=' + encodeURIComponent(ql), signal: ctrl.signal });
      if (!r.ok) continue;
      const d = await r.json();
      if (Array.isArray(d?.elements)) return d.elements;
    } catch { /* siguiente mirror */ } finally { clearTimeout(t); }
  }
  return null;
}

function parse(elements: any[]): Negocio[] {
  const seen = new Set<string>();
  const out: Negocio[] = [];
  for (const el of elements) {
    const tg = el.tags || {};
    const nombre = String(tg.name || '').trim();
    if (!nombre) continue;
    const keyN = nombre.toLowerCase();
    if (seen.has(keyN)) continue; seen.add(keyN);

    const web = tg.website || tg['contact:website'] || tg.url || tg['contact:url'] || null;
    const telefono = tg.phone || tg['contact:phone'] || tg['contact:mobile'] || null;
    const redes: string[] = [];
    if (tg['contact:instagram'] || tg.instagram) redes.push('Instagram');
    if (tg['contact:facebook'] || tg.facebook) redes.push('Facebook');

    let score = 3; const motivos: string[] = [];
    if (!web) { score += 5; motivos.push('Sin web detectada'); } else { score = 2; motivos.push('Ya tiene web (oportunidad menor)'); }
    if (!web && telefono) { score += 1; motivos.push('Localizable por teléfono'); }
    if (!web && redes.length) { score += 1; motivos.push('Está en redes pero sin web propia'); }
    if (!web && !telefono && !redes.length) motivos.push('Presencia online muy escasa');
    score = Math.max(0, Math.min(10, score));

    out.push({
      nombre, web: web || null, telefono: telefono || null, redes,
      lat: el.lat ?? el.center?.lat ?? null, lon: el.lon ?? el.center?.lon ?? null,
      score, motivos,
    });
  }
  out.sort((a, b) => b.score - a.score || a.nombre.localeCompare(b.nombre));
  return out.slice(0, 60);
}

export const POST: APIRoute = async ({ request }) => {
  let body: { k?: string; pueblo?: string; sector?: string };
  try { body = await request.json(); } catch { return json({ error: 'Petición inválida.' }, 400); }

  const STATS_KEY = import.meta.env.STATS_KEY;
  if (!STATS_KEY || body.k !== STATS_KEY) return json({ error: 'No autorizado.' }, 401);

  const pueblo = String(body.pueblo || '').trim().slice(0, 60);
  const sectorId = String(body.sector || '');
  const sector = SECTORS[sectorId];
  if (!pueblo) return json({ error: 'Indica un pueblo o zona.' }, 400);
  if (!sector) return json({ error: 'Selecciona un sector válido.' }, 400);

  const rl = await rateLimit(`radar:${clientIp(request)}`, 20, 300);
  if (!rl.ok) return json({ error: 'Demasiadas búsquedas seguidas. Espera un momento.' }, 429);

  const cacheKey = `radar:v1:${sectorId}:${pueblo.toLowerCase()}`;
  const cached = await cacheGet(cacheKey);
  if (cached) return json({ ...(cached as object), cache: true });

  const bb = await geocode(pueblo);
  if (!bb) return json({ error: `No encuentro la zona "${pueblo}". Prueba con otro nombre.` }, 404);

  const elements = await overpass(buildQL(sector.tags, bb));
  if (elements === null) return json({ error: 'El servicio de mapas está saturado ahora mismo. Inténtalo en un minuto.' }, 502);

  const negocios = parse(elements);
  const sinWeb = negocios.filter((n) => !n.web).length;
  const payload = { pueblo, sector: sector.label, total: negocios.length, sinWeb, negocios };
  await cacheSet(cacheKey, payload);
  return json(payload);
};
