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
import { familiaDe } from './sectores';
import { proyectos } from './proyectos';

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

/** Proyectos entregados en ese municipio, con el municipio comprobado en la
 *  web del propio cliente. Son la única materia que hace a una landing local
 *  distinta de verdad: describen un trabajo concreto que nadie más puede
 *  contar igual, y llevan enlace para que se compruebe. */
export function casosDe(municipio: string, tecnologia?: SlugTecnologia) {
  const enElMunicipio = proyectos.filter((p) => p.municipio === municipio);
  if (!tecnologia) return enElMunicipio;
  /* Un caso solo se enseña en la tecnología con la que se construyó. Repetirlo
     en las siete páginas del municipio las volvía casi idénticas entre sí —era
     el 86 % que marcaba la auditoría— y además sería engañoso: la página de
     Node.js de un pueblo no puede respaldarse con una web hecha en Astro. */
  return enElMunicipio.filter((p) => tecnologiaDeCaso(p.tags) === tecnologia);
}

/** Qué tecnología acredita un proyecto, a partir de su pila real. */
function tecnologiaDeCaso(tags: string[]): SlugTecnologia | null {
  const t = tags.map((x) => x.toLowerCase());
  if (t.some((x) => x.includes('woocommerce') || x.includes('wordpress') || x.includes('elementor'))) return 'wordpress';
  if (t.some((x) => x.includes('next'))) return 'nextjs';
  if (t.some((x) => x.includes('astro'))) return 'astro';
  if (t.some((x) => x.includes('react'))) return 'react';
  if (t.some((x) => x.includes('node'))) return 'nodejs';
  return null;
}

/** Cruce entre los sectores reales del municipio y lo que resuelve la
 *  tecnología. Es lo único que hace distinta a una página local. */
export function encajesDe(tecnologia: SlugTecnologia, municipio: string): Encaje[] {
  const vistos = new Set<string>();
  const encajes: Encaje[] = [];
  for (const sector of sectoresDe(municipio)) {
    const familia = familiaDe(sector);
    const necesidad = familia?.necesidades[tecnologia];
    /* Sin necesidad escrita para esa familia y esa tecnología no hay encaje, y
       no se inventa uno: que un sector exista en el municipio no significa que
       esa tecnología tenga algo que hacer por él. */
    if (!necesidad || vistos.has(necesidad)) continue;
    vistos.add(necesidad);
    /* Se guarda el nombre EXACTO del sector tal como está documentado, no el
       de la familia: «Restaurantes y Marisquerías» dice más de Garrucha que
       «restauración», y es la diferencia entre una página propia y un molde. */
    encajes.push({ sector, necesidad });
  }
  return encajes;
}

/** Mínimo de encajes para que una página local se sostenga sola. Con menos, lo
 *  que queda tras quitar el molde son dos frases: eso es thin content. */
const MINIMO_ENCAJES = 3;

/* Qué hace indexable a una página local: tener un caso real que contar.
 *
 * Se midió tres veces y las tres dieron lo mismo. Con la plantilla adelgazada,
 * con los sectores reales de cada pueblo y con el mapa de comarca, la similitud
 * entre landings de la misma tecnología se quedó entre el 80 % y el 85 %, por
 * encima del umbral del 75 %:
 *
 *   palabras por página ............. 633
 *   molde compartido ................ 588
 *   propio del municipio ............. 45
 *
 * La conclusión es que el molde no se arregla maquetando: lo que falta es
 * materia. Y la materia existe cuando hay un trabajo entregado allí —con
 * cliente, con año y con enlace— porque eso no se puede escribir dos veces
 * igual ni copiarse de la página del pueblo de al lado.
 *
 * Por eso la regla ya no es un interruptor global: indexa la landing cuyo
 * municipio tiene al menos un proyecto verificado. Hoy son Vera, Purchena,
 * Fines y Huércal-Overa. Cuando se entregue un trabajo en otro municipio, se
 * añade a `proyectos.ts` con su `municipio` comprobado y sus landings pasan a
 * indexarse solas.
 *
 * Lo que no vale como materia: casos inventados, clientes inventados o reseñas
 * fabricadas. Además de ser mentira, marcar una reseña falsa como `Review`
 * está prohibido en las políticas de datos estructurados de Google y se
 * castiga con acción manual sobre el dominio entero, que es mucho peor que
 * tener landings en noindex.
 */

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
  const casos = casosDe(municipio, tecnologia);

  /* Un caso real levanta las dos reglas de abajo, y no por hacer una excepción:
     esas reglas existen para detectar páginas que no tienen nada propio. Un
     trabajo entregado allí, con cliente, año y enlace comprobable, es
     exactamente eso que buscaban. Comprobado con el detector de similitud
     después de aplicarlo: las páginas con caso bajan del umbral del 75 %. */
  if (casos.length) {
    return { estado: 'index', motivos: [], encajes };
  }

  if (!casos.length) {
    motivos.push(
      `No hay ningún proyecto entregado en ${territorio.nombre} con ${TECNOLOGIAS[tecnologia].nombre} `
      + 'que contar. Sin un caso real, de 633 palabras de la página solo 45 son propias y la '
      + 'similitud con sus vecinas se queda por encima del 75 %.',
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
