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

/* ¿Puede alguna página local indexarse hoy? No, y ahora hay número exacto.
 *
 * Medición del 19-09-2026 sobre el build, tras reescribir los encajes para que
 * usen los sectores REALES de cada municipio (mármol de Macael, jamón IGP de
 * Serón, lonja de Garrucha) en vez de siete categorías genéricas. El contenido
 * mejoró mucho y aun así:
 *
 *   palabras por página local ....... 633
 *   molde compartido ................ 588
 *   contenido propio del municipio ... 45
 *   similitud entre pares .......... hasta 89 %, umbral 75 %
 *
 * Para bajar del umbral haría falta que cada página tuviera unas 151 palabras
 * MÁS de contenido único: cerca de 11.000 palabras en total. Y tienen que ser
 * reales —un proyecto de esa zona, un dato propio, algo que se pueda sostener—
 * porque inventarlas es justo lo que este fichero existe para impedir.
 *
 * Ya se intentó dos veces por la vía del código: adelgazar la plantilla (subió
 * la similitud, porque al acortar la página el molde pesa más) y afinar los
 * encajes (bajó poco: 45 palabras propias de 633). La conclusión es la misma
 * por los dos caminos y conviene no repetirla una tercera vez.
 *
 * Mientras tanto viven como noindex,follow: navegables, repartiendo enlace
 * interno y sin competir con el hub, que es la página que sí tiene contenido.
 *
 * Para reactivarlas: `true` y pasar `npm run audit:programadores`. Si sigue
 * habiendo avisos por encima del umbral, la respuesta sigue siendo no.
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
      'Medido sobre el build: de 633 palabras por página, 588 son molde compartido y solo '
      + '45 son propias del municipio. Faltan unas 151 palabras únicas por página para bajar '
      + 'del umbral del 75 %.',
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
