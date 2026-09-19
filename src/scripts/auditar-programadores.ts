/* Auditoría del clúster /programador-web/ sobre el build.
 *
 * Comprueba el HTML generado, no las intenciones del código: es la única forma
 * de cazar que una página se declare indexable y no esté en el sitemap, o que
 * dos URLs acaben con el mismo title porque alguien tocó una plantilla.
 *
 * Falla con código 1 para que sirva en CI.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist/client';
const RAIZ = ['programador-web', 'desarrollo-aplicaciones-moviles'];
/* Por encima de esto, dos páginas dicen prácticamente lo mismo. No es una
   norma de Google: es el umbral interno a partir del cual conviene mirarlas. */
const UMBRAL_SIMILITUD = 0.75;

interface Pagina {
  ruta: string;
  title: string;
  h1: string[];
  description: string;
  robots: string;
  canonical: string;
  enSitemap: boolean;
  tieneMenu: boolean;
  tienePie: boolean;
  /* Texto sustancial: sin cabecera, pie ni navegación, que son iguales en todo
     el sitio y dispararían la similitud de cualquier par de páginas. */
  cuerpo: string;
  enlacesInternos: string[];
}

function htmls(dir: string): string[] {
  const salida: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) salida.push(...htmls(p));
    else if (e.name === 'index.html') salida.push(p);
  }
  return salida;
}

const entre = (html: string, re: RegExp): string => (html.match(re)?.[1] ?? '').trim();

function leer(archivo: string, sitemap: Set<string>): Pagina {
  const html = readFileSync(archivo, 'utf8');
  const ruta = '/' + archivo.replace(`${DIST}/`, '').replace(/index\.html$/, '');
  /* El cuerpo se acota a <main> si existe; si no, se quitan cabecera y pie. */
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    ?? html.replace(/<header[\s\S]*?<\/header>/gi, '').replace(/<footer[\s\S]*?<\/footer>/gi, '');
  const texto = main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return {
    ruta,
    title: entre(html, /<title[^>]*>([^<]*)<\/title>/i),
    h1: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, '').trim()),
    description: entre(html, /<meta name="description" content="([^"]*)"/i),
    robots: entre(html, /<meta name="robots" content="([^"]*)"/i),
    canonical: entre(html, /<link rel="canonical" href="([^"]*)"/i),
    enSitemap: sitemap.has(`https://platanitorico.com${ruta}`),
    /* Se comprueba sobre el HTML completo, no sobre `main`: la navegación vive
       fuera del contenido. Faltaba en las 152 páginas del clúster y no lo vio
       ninguna comprobación, porque ninguna miraba si estaba. */
    tieneMenu: /<header[\s>]/i.test(html) && html.includes('cdm-barra__menu'),
    tienePie: /<\/footer>/i.test(html),
    cuerpo: texto,
    enlacesInternos: [...main.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]),
  };
}

/** Similitud por trigramas de palabras: reconoce el texto reordenado, que es
 *  como se disfraza el contenido duplicado. */
function similitud(a: string, b: string): number {
  const gramas = (t: string) => {
    const p = t.toLowerCase().split(/\s+/);
    const s = new Set<string>();
    for (let i = 0; i + 2 < p.length; i++) s.add(`${p[i]} ${p[i + 1]} ${p[i + 2]}`);
    return s;
  };
  const ga = gramas(a);
  const gb = gramas(b);
  if (!ga.size || !gb.size) return 0;
  let comunes = 0;
  for (const g of ga) if (gb.has(g)) comunes++;
  return comunes / Math.min(ga.size, gb.size);
}

if (!existsSync(DIST)) {
  console.error('[prog] No existe dist/client: ejecuta npm run build antes.');
  process.exit(1);
}

const sitemapXml = readdirSync(DIST)
  .filter((f) => /^sitemap-\d+\.xml$/.test(f))
  .map((f) => readFileSync(join(DIST, f), 'utf8'))
  .join('');
const sitemap = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

const paginas = RAIZ
  .filter((r) => existsSync(join(DIST, r)))
  .flatMap((r) => htmls(join(DIST, r)))
  .map((a) => leer(a, sitemap));

const errores: string[] = [];
const avisos: string[] = [];
const rutasExistentes = new Set(paginas.map((p) => p.ruta));

/* 1. Coherencia entre robots y sitemap. Anunciar en el sitemap una página que
      se declara noindex es mandar a Google a una puerta cerrada. */
for (const p of paginas) {
  const noindex = p.robots.includes('noindex');
  if (noindex && p.enSitemap) errores.push(`${p.ruta}: es noindex y está en el sitemap.`);
  if (!noindex && !p.enSitemap) errores.push(`${p.ruta}: es indexable y falta en el sitemap.`);
  if (noindex && !p.robots.includes('follow')) {
    errores.push(`${p.ruta}: noindex sin follow, corta el enlazado interno.`);
  }
  if (p.h1.length !== 1) errores.push(`${p.ruta}: tiene ${p.h1.length} H1 y debe tener uno.`);
  if (!p.canonical) errores.push(`${p.ruta}: sin canonical.`);
  else if (!p.canonical.endsWith(p.ruta)) {
    errores.push(`${p.ruta}: canonical apunta a ${p.canonical}.`);
  }
  if (!p.description) errores.push(`${p.ruta}: sin meta description.`);
  if (!p.tieneMenu) errores.push(`${p.ruta}: sin menú de navegación.`);
  if (!p.tienePie) errores.push(`${p.ruta}: sin pie de página.`);
}

/* 2. Duplicados de title, H1 y description entre las indexables. En las
      noindex no importa: no compiten en el índice. */
const indexables = paginas.filter((p) => !p.robots.includes('noindex'));
for (const [campo, saca] of [
  ['title', (p: Pagina) => p.title],
  ['H1', (p: Pagina) => p.h1[0] ?? ''],
  ['description', (p: Pagina) => p.description],
] as const) {
  const visto = new Map<string, string>();
  for (const p of indexables) {
    const v = saca(p);
    if (!v) continue;
    const previo = visto.get(v);
    if (previo) errores.push(`${campo} duplicado entre ${previo} y ${p.ruta}: «${v.slice(0, 70)}»`);
    else visto.set(v, p.ruta);
  }
}

/* 3. Enlaces internos rotos dentro del clúster. Fuera de él solo se comprueba
      que la ruta exista en el build, porque el resto del sitio ya tiene su
      propio verificador. */
for (const p of paginas) {
  for (const href of new Set(p.enlacesInternos)) {
    if (!href.startsWith('/programador-web/') && !href.startsWith('/desarrollo-aplicaciones-moviles/')) continue;
    /* Las landings de pueblo viven fuera del clúster y las comprueba el
       verificador general de enlaces. */
    if (href.startsWith('/diseno-web/')) continue;
    if (!rutasExistentes.has(href)) errores.push(`${p.ruta}: enlaza a ${href}, que no existe.`);
  }
}

/* 4. Huérfanas: una página indexable a la que nadie enlaza no la encuentra ni
      Google ni una persona. */
const recibe = new Map<string, number>();
for (const p of paginas) {
  for (const href of new Set(p.enlacesInternos)) {
    if (href === p.ruta) continue;
    recibe.set(href, (recibe.get(href) ?? 0) + 1);
  }
}
for (const p of indexables) {
  if (p.ruta === '/programador-web/') continue; // entra desde el menú
  if (!(recibe.get(p.ruta) ?? 0)) errores.push(`${p.ruta}: es indexable y no recibe ningún enlace interno.`);
}

/* 5. Similitud sustancial entre indexables. */
const pares: { a: string; b: string; v: number }[] = [];
for (let i = 0; i < indexables.length; i++) {
  for (let j = i + 1; j < indexables.length; j++) {
    const v = similitud(indexables[i].cuerpo, indexables[j].cuerpo);
    if (v >= UMBRAL_SIMILITUD) pares.push({ a: indexables[i].ruta, b: indexables[j].ruta, v });
  }
}
pares.sort((x, y) => y.v - x.v);
for (const p of pares) {
  avisos.push(`${(p.v * 100).toFixed(0)} % de contenido común: ${p.a} y ${p.b}`);
}

console.log(`[prog] ${paginas.length} páginas del clúster: ${indexables.length} indexables, ${paginas.length - indexables.length} noindex.`);
if (avisos.length) {
  console.warn(`\n[prog] ${avisos.length} aviso(s) de similitud (umbral ${UMBRAL_SIMILITUD * 100} %):`);
  for (const a of avisos.slice(0, 15)) console.warn(`  - ${a}`);
  if (avisos.length > 15) console.warn(`  … y ${avisos.length - 15} más.`);
}
if (errores.length) {
  console.error(`\n[prog] ${errores.length} error(es):`);
  for (const e of errores.slice(0, 40)) console.error(`  - ${e}`);
  if (errores.length > 40) console.error(`  … y ${errores.length - 40} más.`);
  process.exit(1);
}
console.log('[prog] Sin errores.');
