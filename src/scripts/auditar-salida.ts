#!/usr/bin/env tsx
/* Auditoría del HTML generado (lo que de verdad se publica), tras `astro build`.
   Falla si encuentra:
   - enlaces internos que no llevan a ninguna página ni redirección;
   - importes en euros fuera del blog (la web no publica precios);
   - páginas sin <title>, sin meta description, sin canonical o con un número de H1 distinto de uno;
   - enlaces a las secciones eliminadas en el rediseño.
   Uso: npm run check:links */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const RAIZ = process.cwd();
const SALIDA = [join(RAIZ, '.vercel/output/static'), join(RAIZ, 'dist/client'), join(RAIZ, 'dist')].find((d) => existsSync(d));
if (!SALIDA) {
  console.error('No hay build. Ejecuta antes `npx astro build`.');
  process.exit(1);
}

const vercel = JSON.parse(readFileSync(join(RAIZ, 'vercel.json'), 'utf8')) as { redirects?: { source: string }[] };
const redirecciones = (vercel.redirects ?? []).map((r) => r.source.replace(/\/:path\*$/, '').replace(/\/$/, ''));
const ELIMINADAS = ['/asistente-ia', '/asistente-voz', '/laboratorio-ia', '/probador-virtual-ar', '/radar', '/stats', '/conversaciones', '/marketing/recursos'];

function html(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const r = join(dir, n);
    return statSync(r).isDirectory() ? html(r) : n.endsWith('.html') ? [r] : [];
  });
}

function existe(ruta: string): boolean {
  const limpia = decodeURI(ruta.split('#')[0].split('?')[0]);
  if (!limpia || limpia === '/') return true;
  if (limpia.startsWith('/api/')) return true;
  const candidatos = limpia.endsWith('/') ? [join(SALIDA!, limpia, 'index.html')] : [join(SALIDA!, limpia), join(SALIDA!, limpia, 'index.html')];
  if (candidatos.some((c) => existsSync(c))) return true;
  return redirecciones.includes(limpia.replace(/\/$/, ''));
}

const errores: string[] = [];
const paginas = html(SALIDA);

for (const fichero of paginas) {
  const ruta = '/' + relative(SALIDA, fichero).split(sep).join('/').replace(/index\.html$/, '');
  const texto = readFileSync(fichero, 'utf8');
  const esBlog = ruta.startsWith('/blog/');
  const es404 = ruta.startsWith('/404');

  for (const m of texto.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (href.startsWith('//') || /\.(css|js|woff2|png|svg|ico|webmanifest|jpg|avif|webp|xml|txt)$/.test(href.split('?')[0])) continue;
    if (ELIMINADAS.some((e) => href.startsWith(e))) errores.push(`${ruta}: enlace a sección eliminada ${href}`);
    else if (!existe(href)) errores.push(`${ruta}: enlace roto ${href}`);
  }

  if (!esBlog) {
    const visible = texto.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
    const precio = visible.match(/[^>]{0,40}(\d[\d.,]*\s?€|€\s?\d|\d+\s?euros?\b)[^<]{0,20}/);
    if (precio) errores.push(`${ruta}: precio publicado «${precio[0].trim()}»`);
    const ld = [...texto.matchAll(/"(price|priceRange)"/g)];
    if (ld.length) errores.push(`${ruta}: JSON-LD con ${ld.map((x) => x[1]).join(', ')}`);
  }

  const h1 = (texto.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) errores.push(`${ruta}: ${h1} elementos H1`);
  if (!/<title>[^<]+<\/title>/.test(texto)) errores.push(`${ruta}: sin <title>`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(texto)) errores.push(`${ruta}: meta description ausente o muy corta`);
  if (!es404 && !/<link rel="canonical"/.test(texto)) errores.push(`${ruta}: sin canonical`);
}

if (errores.length) {
  console.error(`✗ ${errores.length} problemas en ${paginas.length} páginas:\n` + errores.slice(0, 80).map((e) => `  ${e}`).join('\n'));
  if (errores.length > 80) console.error(`  …y ${errores.length - 80} más`);
  process.exit(1);
}
console.log(`✓ ${paginas.length} páginas: enlaces internos, precios, H1, títulos, descripciones y canonical correctos.`);
