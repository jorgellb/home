/* Construye la vista de cada landing de /diseno-web/<pueblo>/.
   Si el pueblo tuvo página hecha a mano, usa su contenido propio
   (landings-diseno-web.ts); si no, lo compone con los datos de
   pueblos-almeria.ts. La plantilla única no distingue entre ambos. */

import type { Pueblo } from './pueblos-almeria';
import { landingsManuales, type Cabecera } from './landings-diseno-web';
import { esPuebloIndexable } from './pueblos-indexables';

export type ClaveCabecera = 'lugares' | 'datos' | 'sectores' | 'diferenciales' | 'testimonios' | 'faq';

export interface Landing {
  slug: string;
  nombre: string;
  comarca: string;
  title: string;
  description: string;
  indexable: boolean;
  h1: string;
  lead: string;
  coords?: [number, number];
  caracteristicas: string[];
  panorama: string[];
  lugares: { name: string; sub: string; desc: string; dato: string }[];
  datos: { k: string; v: string }[];
  sectores: { nombre: string; stat: string; desc: string; tags: string[] }[];
  diferenciales: { t: string; d: string }[];
  extras: { key: string; titulo: string; lead: string; items: { t: string; d: string; meta?: string }[] }[];
  testimonios: { nombre: string; negocio: string; texto: string }[];
  faq: { q: string; a: string }[];
  cabeceras: Record<ClaveCabecera, Cabecera>;
}

const TITULOS_EXTRA: Record<string, (n: string) => string> = {
  peliculas: () => 'Almería, plató de cine',
  lonjaFlow: (n) => `De la lonja de ${n} a tu web`,
  mineriaTimeline: (n) => `La historia minera de ${n}`,
  vestigios: (n) => `Patrimonio de ${n}`,
  mercados: (n) => `Mercados internacionales de ${n}`,
  platos: (n) => `La gastronomía de ${n}`,
  conexiones: (n) => `${n}, bien conectado`,
  mercado: (n) => `Un día de mercado en ${n}`,
  idiomas: (n) => `Idiomas para vender en ${n}`,
  oficios: (n) => `Oficios de ${n}`,
  reservaPasos: () => 'Reservas en tres pasos',
  ocupacion: (n) => `La temporada turística en ${n}`,
};

// Los datos base traen claves en mayúsculas («POBLACIÓN»): se normalizan.
const normalizarClave = (k: string) => (k === k.toUpperCase() ? k.charAt(0) + k.slice(1).toLowerCase() : k);

function cabecerasPorDefecto(n: string): Record<ClaveCabecera, Cabecera> {
  return {
    lugares: { h2: `Los lugares que definen ${n}`, lead: '' },
    datos: { h2: `${n} en datos`, lead: '' },
    sectores: { h2: `Para quién diseñamos en ${n}`, lead: 'Sectores locales que ya venden más online con una web hecha con criterio.' },
    diferenciales: { h2: `Por qué una web propia funciona en ${n}`, lead: '' },
    testimonios: { h2: `Negocios de ${n} que confían en nosotros`, lead: '' },
    faq: { h2: `Preguntas frecuentes sobre diseño web en ${n}`, lead: '' },
  };
}

export function getLanding(p: Pueblo): Landing {
  const n = p.nombre;
  const base = cabecerasPorDefecto(n);
  const comun = {
    slug: p.slug,
    nombre: n,
    comarca: p.comarca,
    indexable: esPuebloIndexable(p.slug),
    coords: p.coords,
    caracteristicas: p.caracteristicas,
  };

  const m = landingsManuales[p.slug];
  if (m) {
    return {
      ...comun,
      title: m.title,
      description: m.description,
      h1: m.h1,
      lead: m.heroLead,
      panorama: p.panorama ?? [],
      lugares: m.lugares,
      datos: m.datos.map((d) => ({ k: normalizarClave(d.k), v: d.v })),
      sectores: m.sectores.map((s) => ({ nombre: s.nombre, stat: s.stat, desc: s.desc, tags: s.tags })),
      diferenciales: m.diferenciales.map((d) => ({ t: d.title, d: d.desc })),
      extras: m.extras.map((e) => ({
        key: e.key,
        titulo: e.head?.h2 ?? TITULOS_EXTRA[e.key]?.(n) ?? n,
        lead: e.head?.lead ?? '',
        items: e.items,
      })),
      testimonios: m.testimonios,
      faq: m.faq,
      cabeceras: {
        lugares: m.lugaresHead ?? base.lugares,
        datos: m.datosHead ?? base.datos,
        sectores: m.sectoresHead ?? base.sectores,
        diferenciales: m.diferencialesHead ?? base.diferenciales,
        testimonios: m.testimoniosHead ?? base.testimonios,
        faq: m.faqHead ?? base.faq,
      },
    };
  }

  // ≤43 caracteres (BaseLayout añade « | Platanito Rico», 17 más).
  const title = [
    p.sectorPrincipal ? `Diseño Web en ${n}: ${p.sectorPrincipal}` : '',
    `Diseño Web en ${n} y SEO Local`,
  ].find((t) => t && t.length <= 43) ?? `Diseño Web en ${n}`;
  const description = p.sectorPrincipal
    ? `Diseño web en ${n} para ${p.sectorPrincipal.slice(0, 45)}. Desde 500€ con hosting gratis de por vida. Presupuesto en 24h.`
    : `Diseño web en ${n}, ${p.comarca}. Desde 500€ con hosting gratis. SEO local incluido. Presupuesto gratis en 24h.`;

  const datos = (p.hitos ?? []).map((h) => ({ k: normalizarClave(h.k), v: h.v }));
  if (p.poblacion && !datos.some((d) => /poblaci/i.test(d.k))) {
    datos.push({ k: 'Población', v: `${p.poblacion.toLocaleString('es-ES')} habitantes` });
  }
  if (p.lugarIconico) datos.push({ k: 'Lugar icónico', v: p.lugarIconico });

  return {
    ...comun,
    title,
    description,
    h1: `Diseño web en ${n}`,
    lead: `${p.descripcion}. Creamos páginas web profesionales que posicionan a tu negocio en Google para las búsquedas locales de ${n}.`,
    panorama: p.panorama ?? [],
    lugares: [],
    datos,
    sectores: (p.sectores ?? []).map((s) => ({ nombre: s.nombre, stat: '', desc: s.descripcion, tags: s.keywords.slice(0, 3) })),
    diferenciales: [
      { t: 'Conocemos la zona', d: `Trabajamos con negocios de ${p.comarca} y sabemos qué busca aquí cada cliente.` },
      { t: 'Trato directo', d: 'Hablas con quien diseña y programa tu web, sin intermediarios ni comerciales.' },
      { t: 'Webs que cargan en menos de un segundo', d: 'Rápidas en el móvil, accesibles y preparadas para posicionar en Google.' },
      { t: 'Sin permanencia', d: 'Tu web, tu dominio y tus contenidos son tuyos desde el primer día.' },
    ],
    extras: [],
    testimonios: (p.testimonios ?? []).map((t) => ({ nombre: t.nombre, negocio: t.sector, texto: t.texto })),
    faq: p.faqs ?? [],
    cabeceras: base,
  };
}
