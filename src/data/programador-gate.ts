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

/** Objeciones propias de los sectores de ese municipio. Son lo que convierte
 *  una FAQ genérica en una que reconoce a quien la lee: el marmolista de Macael
 *  no pregunta lo mismo que el hotelero de Mojácar, y sus dudas están escritas
 *  por familia de sector en `sectores.ts`. */
export function objecionesDe(municipio: string, limite = 3): { q: string; a: string }[] {
  const vistas = new Set<string>();
  /* Primero las familias MENOS repetidas en la provincia: son las que
     caracterizan a este municipio y no a sus vecinos. Sin esto, dos pueblos
     costeros sacaban las mismas tres dudas —alojamiento, restauración,
     inmobiliaria— y sus páginas se medían al 78 % entre sí. La pesca artesanal
     de Carboneras dice más de Carboneras que su hostelería. */
  const conRareza = sectoresDe(municipio)
    .map((sector) => ({ sector, familia: familiaDe(sector) }))
    .filter((x) => x.familia?.objecion)
    .map((x) => ({ ...x, rareza: frecuenciaFamilia(x.familia!.id) }))
    .sort((a, b) => a.rareza - b.rareza);

  const salida: { q: string; a: string }[] = [];
  for (const { familia } of conRareza) {
    const o = familia!.objecion!;
    if (vistas.has(o.q)) continue;
    vistas.add(o.q);
    salida.push(o);
    if (salida.length >= limite) break;
  }
  return salida;
}

/* En cuántos municipios indexables aparece una familia. Se calcula una vez. */
const frecuencias = new Map<string, number>();
function frecuenciaFamilia(id: string): number {
  if (!frecuencias.size) {
    for (const p of pueblos) {
      if (!territorioDe(p.slug)?.tieneDisenoWeb) continue;
      const vistas = new Set<string>();
      for (const sector of sectoresDe(p.slug)) {
        const f = familiaDe(sector);
        if (!f || vistas.has(f.id)) continue;
        vistas.add(f.id);
        frecuencias.set(f.id, (frecuencias.get(f.id) ?? 0) + 1);
      }
    }
  }
  return frecuencias.get(id) ?? 0;
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

/* Qué hace indexable a una página local.
 *
 * Esto se ha reescrito tres veces siguiendo la medición, y esta es la versión
 * en la que la medición por fin sale bien.
 *
 * Durante un tiempo la respuesta fue «ninguna»: con 633 palabras por página,
 * 588 eran molde y 45 propias, y la similitud entre municipios se quedaba
 * entre el 80 % y el 85 %. Al estudiar a la competencia que sí posiciona se
 * vio que sus páginas rondan las 1.080 palabras y el 54-59 % de similitud, y
 * que su diferenciación venía sobre todo de una FAQ escrita para el sector
 * dominante de cada pueblo, más código postal y seis municipios vecinos.
 *
 * Aplicado aquí con nuestros propios datos —que son más ricos: 119 sectores
 * documentados frente a uno o dos suyos— las landings pasaron a 841 palabras
 * y la similitud cayó al 50-66 %. Es decir: por debajo del umbral y por debajo
 * de la competencia.
 *
 * Así que la regla vuelve a ser de contenido y no un interruptor: indexa la
 * landing que tenga materia propia suficiente, entendida como al menos dos
 * sectores del municipio que encajen con esa tecnología. Un caso real
 * entregado allí vale por sí solo, porque es la materia más fuerte que existe.
 *
 * El árbitro final no es este fichero: es `npm run audit:programadores`, que
 * mide el HTML ya construido. Si alguna vez vuelve a avisar por encima del
 * umbral, se aprieta aquí, no se sube el umbral allí.
 */
const MINIMO_ENCAJES_INDEX = 2;

/* Aquí vivía la regla de «firma única»: si dos municipios generaban el mismo
   conjunto de necesidades, solo se indexaba uno. Dejó de hacer falta cuando el
   contenido pasó a diferenciarse por los sectores reales y sus objeciones, y
   sobre todo cuando la landing indexable pasó a ser una por municipio en vez
   de una por tecnología. Se retira entera en lugar de dejarla sin usar: código
   muerto que parece una salvaguarda es peor que no tenerla, porque el
   siguiente que lo lea creerá que algo está protegido. Quien vigila ahora es
   `npm run audit:programadores`, que mide el HTML construido. */

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

  /* Ninguna landing tecnología × municipio se indexa, y no por falta de
     contenido: por arquitectura. Las seis de un mismo pueblo daban un 90 % de
     similitud entre ellas —comparten mapa, cobertura, vecinos y las dudas de
     sus sectores, y solo cambia el nombre de la herramienta— y competían entre
     sí por el mismo municipio.
     La competencia que posiciona tiene UNA página por pueblo, no siete, y tiene
     razón: quien busca desde Macael no busca «programador Astro en Macael»,
     busca quién le arregla lo suyo. Esa página es /programador-web/zona/<pueblo>/
     y estas se quedan como apoyo de navegación y enlazado. */
  motivos.push(
    'La landing indexable del municipio es /programador-web/zona/' + municipio + '/. '
    + 'Las de tecnología × municipio daban un 90 % de similitud entre las seis del mismo '
    + 'pueblo y competían entre ellas.',
  );

  if (!territorio.tieneDisenoWeb) {
    motivos.push(
      'El municipio no está en la lista de indexables: si su landing de diseño web no '
      + 'se indexa, esta tampoco debe hacerlo.',
    );
  }
  if (encajes.length < MINIMO_ENCAJES_INDEX) {
    motivos.push(
      `Solo ${encajes.length} sector(es) de ${territorio.nombre} encajan con `
      + `${TECNOLOGIAS[tecnologia].nombre}. Sin al menos ${MINIMO_ENCAJES_INDEX}, lo que queda `
      + 'tras quitar el molde no sostiene una página propia.',
    );
  }
  if (!territorio.vecinos.length) {
    motivos.push('No hay municipios vecinos indexables con los que enlazar: quedaría huérfana.');
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
