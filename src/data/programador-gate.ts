/* Control de calidad de las páginas locales de /programador-web/.
 *
 * Existe porque la combinatoria miente: 7 tecnologías × 25 municipios son 175
 * URLs posibles, y que una URL se pueda generar no significa que merezca
 * indexarse. Este módulo decide, y su decisión se respeta aunque deje fuera a
 * la mayoría.
 *
 * El criterio de fondo es uno solo: ¿esta página le sirve a alguien si Google
 * no existiera? Traducido a algo comprobable, eso significa que tenga materia
 * propia —sectores reales de ese municipio que encajen con esa tecnología— y
 * no solo el nombre del pueblo sustituido dentro de un molde.
 *
 * Aviso para quien venga a subir el número de páginas indexadas: hacerlo
 * relajando los umbrales de aquí no mejora el SEO, solo mueve el problema al
 * informe de Search Console. El repositorio ya registra lo que pasó la última
 * vez que se publicaron ~100 landings locales casi idénticas (ver
 * `pueblos-indexables.ts`): Google dejó de rastrearlas.
 */
import type { SlugTecnologia } from './tecnologias';
import { TECNOLOGIAS } from './tecnologias';
import { territorioDe } from './territorio';
import { landingsManuales } from './landings-diseno-web';
import { pueblos } from './pueblos-almeria';

export type EstadoSeo = 'index' | 'noindex' | 'draft';

export interface Veredicto {
  estado: EstadoSeo;
  /** Motivos legibles. Si el estado no es `index`, explican por qué. */
  motivos: string[];
  /** Sectores del municipio que justifican esta tecnología. Son el contenido
   *  diferencial de la página: si están vacíos, la página no tiene razón de ser. */
  encajes: Encaje[];
}

export interface Encaje {
  /** Sector real del municipio, tal cual está registrado en el dataset. */
  sector: string;
  /** Qué necesita ese sector que esta tecnología resuelve. */
  necesidad: string;
}

/* Qué tipo de encargo cubre cada tecnología, en términos de lo que un negocio
   hace, no de lo que el programador usa. Es la tabla que cruza el sector real
   de un municipio con la tecnología, y la que evita que las siete páginas de
   un mismo pueblo digan lo mismo. */
const NECESIDADES: Record<SlugTecnologia, { patron: RegExp; necesidad: string }[]> = {
  wordpress: [
    { patron: /comercio|tienda|moda|shop/i, necesidad: 'catálogo y venta online sobre la web que ya tienen' },
    { patron: /restaurant|hostel|bar|gastron/i, necesidad: 'carta, reservas y pedidos integrados en su web actual' },
    { patron: /hotel|apartament|turis|aloja/i, necesidad: 'motor de reservas y versiones en varios idiomas' },
    { patron: /inmobil|vivienda/i, necesidad: 'fichas de inmueble sincronizadas con su gestor de cartera' },
    { patron: /agro|hortofrut|invernader|agríc|agric/i, necesidad: 'catálogo B2B con precios por cliente' },
    { patron: /mármol|marmol|piedra|cantera|industria/i, necesidad: 'catálogo técnico con fichas descargables' },
    { patron: /salud|clínic|clinic|dental|fisio/i, necesidad: 'cita previa conectada con su agenda' },
  ],
  astro: [
    { patron: /turis|hotel|aloja|apartament/i, necesidad: 'webs multiidioma que carguen rápido con mala cobertura' },
    { patron: /agro|hortofrut|invernader|agríc|agric/i, necesidad: 'catálogo de producto que cargue bien desde fuera de España' },
    { patron: /mármol|marmol|piedra|cantera|industria/i, necesidad: 'catálogo técnico pesado servido sin esperas' },
    { patron: /comercio|tienda|moda/i, necesidad: 'escaparate rápido enlazado a la tienda' },
    { patron: /construc|reforma|servicio/i, necesidad: 'web corporativa ligera y fácil de actualizar' },
  ],
  react: [
    { patron: /agro|hortofrut|invernader|agríc|agric/i, necesidad: 'panel de control de partidas, lotes y trazabilidad' },
    { patron: /inmobil|vivienda/i, necesidad: 'buscador de inmuebles con filtros combinados' },
    { patron: /mármol|marmol|piedra|cantera|industria/i, necesidad: 'configurador de pedido y control de producción' },
    { patron: /logíst|logist|transport|puerto|pesca/i, necesidad: 'seguimiento de expediciones en pantalla' },
    { patron: /hotel|aloja|apartament/i, necesidad: 'panel de ocupación y disponibilidad' },
  ],
  nextjs: [
    { patron: /agro|hortofrut|invernader|agríc|agric/i, necesidad: 'zona privada para clientes y comerciales' },
    { patron: /inmobil|vivienda/i, necesidad: 'portal con área privada y fichas públicas indexables' },
    { patron: /hotel|aloja|apartament|turis/i, necesidad: 'reserva directa propia sin comisión de portales' },
    { patron: /mármol|marmol|piedra|cantera|industria/i, necesidad: 'extranet de pedidos para distribuidores' },
  ],
  nodejs: [
    { patron: /agro|hortofrut|invernader|agríc|agric/i, necesidad: 'integración entre campo, almacén y facturación' },
    { patron: /logíst|logist|transport|puerto|pesca/i, necesidad: 'sincronización de albaranes y seguimiento' },
    { patron: /mármol|marmol|piedra|cantera|industria/i, necesidad: 'conexión entre producción y el programa de gestión' },
    { patron: /comercio|tienda|moda/i, necesidad: 'sincronía de stock entre tienda física y online' },
    { patron: /hotel|aloja|apartament/i, necesidad: 'sincronización de disponibilidad con portales' },
  ],
  javascript: [
    { patron: /construc|reforma|obra/i, necesidad: 'presupuestador en la web con sus propias tarifas' },
    { patron: /mármol|marmol|piedra|cantera/i, necesidad: 'calculadora de medidas y material' },
    { patron: /comercio|tienda|moda/i, necesidad: 'configurador de producto con opciones dependientes' },
    { patron: /turis|hotel|aloja|apartament/i, necesidad: 'mapa de disponibilidad incrustado en su web' },
    { patron: /agro|hortofrut|agríc|agric/i, necesidad: 'calculadora de dosis, superficie o rendimiento' },
  ],
  apps: [
    { patron: /agro|hortofrut|invernader|agríc|agric/i, necesidad: 'partes de campo que funcionan sin cobertura' },
    { patron: /logíst|logist|transport|puerto|pesca/i, necesidad: 'control de entregas desde el móvil' },
    { patron: /construc|reforma|obra/i, necesidad: 'partes de obra con fotos desde el tajo' },
    { patron: /mármol|marmol|piedra|cantera|industria/i, necesidad: 'control de producción a pie de nave' },
  ],
};

/** Sectores reales del municipio, de donde estén registrados. Nunca inventa:
 *  si un municipio no tiene sectores documentados, devuelve lista vacía y la
 *  página se quedará sin materia con la que justificarse. */
export function sectoresDe(slug: string): string[] {
  const manual = landingsManuales[slug];
  if (manual?.sectores?.length) return manual.sectores.map((s) => s.nombre);
  const pueblo = pueblos.find((p) => p.slug === slug);
  if (pueblo?.sectores?.length) return pueblo.sectores.map((s) => s.nombre);
  /* Último recurso: las características, que son etiquetas cortas pero reales. */
  return pueblo?.caracteristicas ?? [];
}

/** Cruce entre los sectores reales del municipio y lo que resuelve la
 *  tecnología. Es lo único que hace distinta a una página local. */
export function encajesDe(tecnologia: SlugTecnologia, municipio: string): Encaje[] {
  const sectores = sectoresDe(municipio);
  const reglas = NECESIDADES[tecnologia];
  const vistos = new Set<string>();
  const encajes: Encaje[] = [];
  for (const sector of sectores) {
    const regla = reglas.find((r) => r.patron.test(sector));
    if (!regla || vistos.has(regla.necesidad)) continue;
    vistos.add(regla.necesidad);
    encajes.push({ sector, necesidad: regla.necesidad });
  }
  return encajes;
}

/** Mínimo de encajes para que una página local se sostenga sola. Con menos, lo
 *  que queda tras quitar el molde son dos frases: eso es thin content. */
const MINIMO_ENCAJES = 3;

/* ¿Puede alguna página local indexarse hoy? No.
 *
 * Esto no es una decisión de criterio, es el resultado de una medición hecha
 * el 18-09-2026 con `npm run audit:programadores` sobre el build real. Las 41
 * combinaciones que superaban todo lo demás daban entre un 80 % y un 84 % de
 * contenido común entre sí, muy por encima del umbral del 75 %.
 *
 * Se intentó arreglar por las bravas —fuera la entradilla del hub, fuera el
 * catálogo de servicios repetido, fuera la FAQ heredada— y el porcentaje SUBIÓ:
 * al acortar las páginas, el molde que queda pesa proporcionalmente más. Esa es
 * la aritmética y no se arregla escribiendo mejor el mismo esqueleto.
 *
 * Lo que falta no es código: es materia. Un caso real de esa zona, un proyecto
 * que se pueda contar, un dato propio del municipio. Cuando exista para un
 * municipio concreto, se le escribe su página y se la indexa; hasta entonces
 * viven como noindex,follow, que las mantiene navegables y repartiendo enlace
 * sin competir en el índice con el hub, que es la página que sí tiene contenido.
 *
 * Para reactivarlas: pon esto a `true` y vuelve a pasar la auditoría. Si sigue
 * dando avisos por encima del umbral, la respuesta sigue siendo no.
 */
const LOCALES_INDEXABLES = false;

/** La firma es el conjunto de necesidades que cubriría la página. Dos páginas
 *  con la misma firma dicen lo mismo con otro topónimo, que es la definición
 *  operativa de doorway page. Solo sobrevive una por firma. */
export function firmaDe(encajes: Encaje[]): string {
  return encajes.map((e) => e.necesidad).sort().join(' | ');
}

/* Cuando varios municipios comparten firma hay que elegir uno, y la elección
   debe ser reproducible, no arbitraria: gana el que tenga más materia propia
   documentada (landing escrita a mano y más sectores) y, a igualdad, el más
   cercano a la base, que es donde la cobertura es más real. */
function peso(municipio: string): number {
  const manual = landingsManuales[municipio];
  const sectores = sectoresDe(municipio).length;
  const km = territorioDe(municipio)?.kmDesdeBase ?? 999;
  return (manual ? 1000 : 0) + sectores * 10 + Math.max(0, 100 - km) / 100;
}

/* Qué municipio se queda cada firma, por tecnología. Se calcula una vez y lo
   consultan tanto la generación de páginas como la auditoría. */
const duenoDeFirma = new Map<string, string>();
let firmasCalculadas = false;

function calcularFirmas(): void {
  if (firmasCalculadas) return;
  firmasCalculadas = true;
  const grupos = new Map<string, string[]>();
  for (const tecnologia of Object.keys(TECNOLOGIAS) as SlugTecnologia[]) {
    for (const p of pueblos) {
      if (!territorioDe(p.slug)?.tieneDisenoWeb) continue;
      const encajes = encajesDe(tecnologia, p.slug);
      if (encajes.length < MINIMO_ENCAJES) continue;
      const clave = `${tecnologia}::${firmaDe(encajes)}`;
      grupos.set(clave, [...(grupos.get(clave) ?? []), p.slug]);
    }
  }
  for (const [clave, municipios] of grupos) {
    const ganador = [...municipios].sort((a, b) => peso(b) - peso(a))[0];
    duenoDeFirma.set(clave, ganador);
  }
}

export function evaluar(tecnologia: SlugTecnologia, municipio: string): Veredicto {
  const motivos: string[] = [];
  const territorio = territorioDe(municipio);

  if (!territorio) {
    return { estado: 'draft', motivos: [`El municipio "${municipio}" no está en el dataset.`], encajes: [] };
  }
  if (!TECNOLOGIAS[tecnologia]) {
    return { estado: 'draft', motivos: [`La tecnología "${tecnologia}" no existe.`], encajes: [] };
  }

  const encajes = encajesDe(tecnologia, municipio);

  if (!LOCALES_INDEXABLES) {
    motivos.push(
      'Medido sobre el build: las locales comparten entre un 80 % y un 84 % de contenido '
      + 'entre sí, por encima del umbral del 75 %. Les falta materia propia, no maquetación.',
    );
  }
  if (!territorio.tieneDisenoWeb) {
    motivos.push(
      'El municipio no está en la lista de indexables: si su landing de diseño web no '
      + 'se indexa, esta tampoco debe hacerlo.',
    );
  }
  if (encajes.length < MINIMO_ENCAJES) {
    motivos.push(
      `Solo ${encajes.length} sector(es) del municipio encajan con ${TECNOLOGIAS[tecnologia].nombre}; `
      + `hacen falta ${MINIMO_ENCAJES}. Sin eso la página es el hub con el nombre del pueblo cambiado.`,
    );
  }
  if (!territorio.vecinos.length) {
    motivos.push('No hay municipios vecinos indexables con los que enlazar: quedaría huérfana.');
  }
  if (encajes.length >= MINIMO_ENCAJES) {
    calcularFirmas();
    const clave = `${tecnologia}::${firmaDe(encajes)}`;
    const dueno = duenoDeFirma.get(clave);
    if (dueno && dueno !== municipio) {
      motivos.push(
        `Diría exactamente lo mismo que la de ${dueno}: mismos sectores, mismas necesidades. `
        + 'Entre dos páginas intercambiables solo se indexa una.',
      );
    }
  }

  return { estado: motivos.length ? 'noindex' : 'index', motivos, encajes };
}

/** Todas las combinaciones con su veredicto. Lo usan la generación de páginas
 *  y el script de auditoría, para que ambos vean exactamente lo mismo. */
export function matriz(): { tecnologia: SlugTecnologia; municipio: string; veredicto: Veredicto }[] {
  const salida: { tecnologia: SlugTecnologia; municipio: string; veredicto: Veredicto }[] = [];
  for (const tecnologia of Object.keys(TECNOLOGIAS) as SlugTecnologia[]) {
    for (const p of pueblos) {
      if (!territorioDe(p.slug)?.tieneDisenoWeb) continue;
      salida.push({ tecnologia, municipio: p.slug, veredicto: evaluar(tecnologia, p.slug) });
    }
  }
  return salida;
}
