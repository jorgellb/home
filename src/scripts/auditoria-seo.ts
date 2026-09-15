#!/usr/bin/env tsx
/* Auditoría SEO del build (dist/client) contra la línea base del rediseño.
   npm run audit:seo                      compara y valida (sale con 1 si hay errores)
   npm run audit:seo -- --guardar-base    guarda la línea base (solo antes de empezar)
   npm run audit:seo -- --sin-peso        omite los límites de peso de la home */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { compararConBase, extraerSeo, type MapaSeo } from './auditoria-seo/extraer';

const DIST = join(process.cwd(), 'dist/client');
const BASE = join(process.cwd(), 'src/scripts/auditoria-seo/base.json');
const LIMITE_HTML_HOME = 180_000;

interface Peso { html: number; js: number }
interface Base { paginas: MapaSeo; pesoHome: Peso }

function paginasHtml(dir: string): string[] {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) return paginasHtml(ruta);
    return nombre === 'index.html' ? [ruta] : [];
  });
}

function rutaPublica(archivo: string): string {
  const carpeta = relative(DIST, archivo).split(sep).slice(0, -1).join('/');
  return carpeta ? `/${carpeta}/` : '/';
}

function pesoHome(): Peso {
  const html = readFileSync(join(DIST, 'index.html'), 'utf8');
  const patron = /(?:src|component-url|renderer-url|before-hydration-url)=["']?(\/_astro\/[^"'\s>]+\.js)/g;
  const scripts = new Set([...html.matchAll(patron)].map((m) => m[1]));
  const js = [...scripts].reduce((total, s) => {
    const archivo = join(DIST, s);
    return total + (existsSync(archivo) ? statSync(archivo).size : 0);
  }, 0);
  return { html: Buffer.byteLength(html), js };
}

if (!existsSync(DIST)) {
  console.error('[seo] No existe dist/client: ejecuta npm run build antes.');
  process.exit(1);
}

const actual: MapaSeo = Object.fromEntries(
  paginasHtml(DIST).map((archivo) => [rutaPublica(archivo), extraerSeo(readFileSync(archivo, 'utf8'))]),
);
const peso = pesoHome();

if (process.argv.includes('--guardar-base')) {
  const base: Base = { paginas: actual, pesoHome: peso };
  writeFileSync(BASE, JSON.stringify(base, null, 2) + '\n');
  console.log(`[seo] Línea base guardada: ${Object.keys(actual).length} páginas; home con ${peso.html} B de HTML y ${peso.js} B de JS.`);
  process.exit(0);
}

const base = JSON.parse(readFileSync(BASE, 'utf8')) as Base;
const errores = compararConBase(base.paginas, actual);

if (!process.argv.includes('--sin-peso')) {
  if (peso.html > LIMITE_HTML_HOME) errores.push(`/: el HTML pesa ${peso.html} B y el límite es ${LIMITE_HTML_HOME} B`);
  if (peso.js > base.pesoHome.js) errores.push(`/: carga ${peso.js} B de JS y la base era ${base.pesoHome.js} B`);
}

const nuevas = Object.keys(actual).filter((ruta) => !base.paginas[ruta]);
console.log(`[seo] ${Object.keys(actual).length} páginas revisadas. Home: ${peso.html} B de HTML (base ${base.pesoHome.html}) y ${peso.js} B de JS (base ${base.pesoHome.js}).`);
if (nuevas.length) console.log(`[seo] Páginas nuevas: ${nuevas.join(', ')}`);
if (errores.length) {
  console.error(`[seo] ${errores.length} error(es):\n- ${errores.join('\n- ')}`);
  process.exit(1);
}
console.log('[seo] Sin errores.');
