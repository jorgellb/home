/**
 * Lista blanca de pueblos indexables (Tier 1).
 *
 * Solo estos municipios de `/diseno-web/<slug>/` se sirven con
 * `<meta name="robots" content="index">` y se incluyen en el sitemap. El resto
 * de landings de pueblos se generan con `noindex` y quedan fuera del sitemap.
 *
 * Motivo: publicar ~100 landings locales casi idénticas en un dominio sin
 * autoridad provoca el estado "Descubierta: actualmente sin indexar" en Search
 * Console (Google ni siquiera las rastrea). Concentrando la indexación en los
 * municipios con mercado real + páginas ya diferenciadas, el sitio sale de ese
 * estado. Reintroducir más pueblos por tandas a medida que el dominio gane
 * autoridad (enlaces, Google Business Profile, etc.).
 *
 * Criterio del Tier 1: población / mercado real + contenido ya diferenciado
 * (las 21 con página propia hecha a mano + los 4 núcleos grandes >15k hab.).
 */
export const PUEBLOS_INDEXABLES = new Set<string>([
  // Grandes núcleos y cabeceras de comarca
  'almeria',
  'roquetas-de-mar',
  'el-ejido',
  'nijar',
  'vicar',
  'adra',
  'huercal-overa',
  'huercal-de-almeria',
  'vera',
  'cuevas-del-almanzora',
  'berja',
  'albox',
  'pulpi',
  'garrucha',
  'mojacar',
  'carboneras',
  'olula-del-rio',
  'macael',
  'cantoria',
  'tabernas',
  'seron',
  'san-juan-de-los-terreros',
  'purchena',
  'los-gallardos',
  'fines',
]);

/** ¿Debe indexarse la landing de diseño web de este pueblo? */
export function esPuebloIndexable(slug: string): boolean {
  return PUEBLOS_INDEXABLES.has(slug);
}
