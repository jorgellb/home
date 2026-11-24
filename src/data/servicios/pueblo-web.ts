/* Contenido de /diseno-web/<pueblo>/ a partir de los datos de cada municipio.
   Fuentes, por prioridad:
   1. textos-pueblos.ts — texto escrito para el rediseño (entradilla y bloque local).
   2. landings.ts — contenido propio heredado (sectores, lugares, datos, FAQ).
   Los testimonios heredados no se publican: no hay forma de verificarlos. */
import type { ContenidoPueblo } from './tipos-pueblo';
import type { Punto } from './tipos';
import type { NombreIcono } from '../../components/sitio/iconos';
import { pueblos, getPueblosByComarca, type Pueblo } from '../pueblos-almeria';
import { getLanding } from '../landings';
import { esPuebloIndexable } from '../pueblos-indexables';
import { territorioDe, BASE } from '../territorio';
import { codigoPostalDe } from '../codigos-postales';
import { getPuebloIT, HUB_IT } from '../servicios-it';
import { proyectos } from '../proyectos';
import { TEXTOS_PUEBLOS } from '../textos-pueblos';
import { sinPrecios, preguntasSinPrecios, rasgosDe } from '../../lib/pueblo';

const ICONOS: [RegExp, NombreIcono][] = [
  [/(restaura|hostel|gastro|bar|tapas|cocina|platos)/i, 'restaurante'],
  [/(hotel|aloja|turis|apartament|rural|camping|vacacion)/i, 'sol'],
  [/(salud|clínic|dent|médic|fisio|estétic|bienestar|farmac)/i, 'salud'],
  [/(inmobil|reforma|constru|vivienda|arquitect)/i, 'casa'],
  [/(agr|invernader|campo|ganad|aceite|almendr|cítric|hortofrut|cooperativ|vino|bodega|queso)/i, 'hoja'],
  [/(mármol|piedra|industr|fábric|metal|cantera|transport|logíst|naves?)/i, 'fabrica'],
  [/(pesc|puerto|náutic|mar\b|lonja|buceo|kayak)/i, 'ancla'],
  [/(comerci|tienda|artesan|moda|mercad)/i, 'tienda'],
  [/(asesor|gestor|abogad|despach|profesional|seguro)/i, 'maletin'],
];
const iconoDe = (texto: string): NombreIcono => ICONOS.find(([r]) => r.test(texto))?.[1] ?? 'estrella';

const SERVICIO = { nombre: 'Diseño web', href: '/desarrollo-web/', contacto: 'web' };

const incluye: Punto[] = [
  { icono: 'pincel', t: 'Diseño a medida', d: 'Partimos de tu negocio y de tus clientes, no de una plantilla. Apruebas el diseño antes de programar.' },
  { icono: 'movil', t: 'Rápida en el móvil', d: 'Pensada para cargar en menos de 2,5 segundos en un teléfono, que es desde donde te buscan.' },
  { icono: 'ubicacion', t: 'SEO local', d: 'Ficha de Google, una página por servicio y los datos de tu negocio coherentes en toda la red.' },
  { icono: 'llave', t: 'Todo a tu nombre', d: 'Dominio, código y contenidos son tuyos. Sin permanencia y sin letra pequeña.' },
];

const pasos = [
  { t: 'Te escuchamos', d: 'Media hora, por teléfono, videollamada o en persona, para entender tu negocio y qué tiene que conseguir la web.', cuando: 'Día 1' },
  { t: 'Propuesta', d: 'Qué haremos, en qué plazo y qué incluye, por escrito.', cuando: 'Día 3' },
  { t: 'Diseño y desarrollo', d: 'Ves el diseño antes de programar y sigues el avance en un entorno de pruebas.', cuando: '2-4 semanas' },
  { t: 'Publicación', d: 'Publicamos, damos de alta tu ficha de Google y te enseñamos a llevarla.', cuando: 'Lanzamiento' },
];

function cercanos(p: Pueblo): Pueblo[] {
  const t = territorioDe(p.slug, 6);
  const porDistancia = (t?.vecinos ?? []).map((s) => pueblos.find((x) => x.slug === s)).filter((x): x is Pueblo => Boolean(x));
  const deComarca = getPueblosByComarca(p.comarca).filter((x) => x.slug !== p.slug && !porDistancia.includes(x));
  return [...porDistancia, ...deComarca].slice(0, 8);
}

export function contenidoWebPueblo(p: Pueblo): ContenidoPueblo {
  const l = getLanding(p);
  const n = p.nombre;
  const texto = TEXTOS_PUEBLOS[p.slug];
  const t = territorioDe(p.slug);
  const cp = codigoPostalDe(p.slug);
  const it = getPuebloIT(p.slug);

  const datos: { k: string; v: string }[] = [];
  datos.push({ k: 'Comarca', v: p.comarca });
  if (cp) datos.push({ k: 'Código postal', v: cp });
  if (t?.kmDesdeBase != null) datos.push({ k: 'Desde nuestro estudio', v: p.slug === BASE.slug ? 'Aquí mismo' : `${t.kmDesdeBase} km de Vera` });
  const extraDatos = l.datos.map((x) => ({ k: x.k, v: sinPrecios(x.v) })).filter((x) => x.v && !/comarca|postal/i.test(x.k));
  datos.push(...extraDatos);

  const parrafos = (texto?.local ?? l.panorama).map(sinPrecios).filter(Boolean);
  const entradilla = sinPrecios(texto?.entradilla ?? l.lead);

  const sectores = l.sectores.map((s) => ({
    icono: iconoDe(`${s.nombre} ${s.tags.join(' ')}`),
    t: sinPrecios(s.nombre),
    d: sinPrecios(s.desc),
    etiquetas: s.tags.map(sinPrecios).filter(Boolean).slice(0, 3),
  }));

  const singulares: ContenidoPueblo['singulares'] = [];
  if (l.lugares.length) {
    singulares.push({
      titulo: l.cabeceras.lugares.h2,
      entradilla: l.cabeceras.lugares.lead || undefined,
      items: l.lugares.map((x) => ({ t: sinPrecios(x.name), d: sinPrecios(x.desc), meta: sinPrecios(x.sub) || undefined })),
    });
  }
  for (const e of l.extras) {
    singulares.push({ titulo: e.titulo, entradilla: e.lead ? sinPrecios(e.lead) : undefined, items: e.items.map((x) => ({ t: sinPrecios(x.t), d: sinPrecios(x.d), meta: x.meta ? sinPrecios(x.meta) : undefined })) });
  }

  const casos = proyectos.filter((c) => c.municipio === p.slug).map((c) => c.id);

  const otros = [
    ...(it ? [{ nombre: `Informático en ${n}`, href: `${HUB_IT}${p.slug}/`, d: 'Equipos, redes y copias con visita el mismo día' }] : []),
    ...(esPuebloIndexable(p.slug) ? [{ nombre: `Programador web en ${n}`, href: p.slug === 'almeria' ? '/programador-web/' : `/programador-web/zona/${p.slug}/`, d: 'Desarrollo a medida y sobre lo que ya tienes' }] : []),
    { nombre: 'Marketing y SEO local', href: '/marketing/', d: `Para que te encuentren en ${n} y alrededores` },
    { nombre: 'Tiendas online', href: '/soluciones/ecommerce/', d: 'Si además quieres vender por internet' },
  ];

  const preguntas = preguntasSinPrecios([...(texto?.preguntas ?? []), ...l.faq]).slice(0, 6);

  return {
    ruta: `/diseno-web/${p.slug}/`,
    seo: {
      title: sinPrecios(l.title).length >= 20 ? l.title.replace(/\s*\|\s*Platanito Rico$/, '') : `Diseño web en ${n}`,
      description: texto?.description ?? (sinPrecios(l.description) || `Diseño web en ${n} (${p.comarca}): webs a medida, rápidas y preparadas para el SEO local. Estudio en Vera, sin permanencia.`),
    },
    noindex: !l.indexable,
    servicio: SERVICIO,
    pueblo: { slug: p.slug, nombre: n, comarca: p.comarca, cp, km: t?.kmDesdeBase ?? null, rasgos: rasgosDe(p) },
    migas: [{ nombre: 'Diseño web', href: '/diseno-web/' }, { nombre: n }],
    portada: {
      antetitulo: `Diseño web · ${p.comarca}`,
      h1: texto?.h1 ?? `Diseño web en ${n}`,
      entradilla,
      puntos: texto?.puntos ?? [
        `Pensada para quien busca en ${n} desde el móvil`,
        'Diseño a medida, sin plantillas',
        'Dominio, código y contenidos a tu nombre',
      ],
    },
    datos: datos.slice(0, 4),
    local: parrafos.length ? { titulo: texto?.tituloLocal ?? `${n}, lo que hay que saber antes de hacer una web`, parrafos } : undefined,
    sectores: sectores.length
      ? { titulo: sinPrecios(l.cabeceras.sectores.h2), entradilla: l.cabeceras.sectores.lead ? sinPrecios(l.cabeceras.sectores.lead) : undefined, items: sectores }
      : undefined,
    singulares,
    incluye: { titulo: `Qué incluye una web hecha con nosotros`, items: incluye },
    pasos: { titulo: `Cómo trabajamos con negocios de ${n}`, items: pasos },
    casos,
    preguntas,
    enlaces: [
      { titulo: `Más servicios en ${n}`, items: otros },
      { titulo: 'Municipios cercanos', items: cercanos(p).map((x) => ({ nombre: `Diseño web en ${x.nombre}`, href: `/diseno-web/${x.slug}/` })) },
    ],
  };
}

export const pueblosDisenoWeb = pueblos;
