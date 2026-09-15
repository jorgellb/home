# Centro de mando, fase 1 (sistema + home) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar la home de platanitorico.com convertida en el «centro de mando» (consola oscura con radar de cobertura, medidas reales y demo marcada), con la cabecera y el footer nuevos en todas las páginas, sin tocar URLs, títulos, H1 ni datos estructurados.

**Architecture:** Componentes Astro sin hidratación en `src/components/cdm/`, tokens `--color-cdm-*` en `global.css` y datos puros en `src/data/` (cobertura con proyección, medidas validadas con Zod). Un script de build (`prebuild`) mide las webs de clientes con PageSpeed Insights y guarda `src/data/medidas.json`. Una auditoría SEO sobre `dist/client` compara cada build con una línea base guardada antes de empezar.

**Tech Stack:** Astro 7 (static, adaptador Vercel), Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript estricto, Zod 4, Vitest 4, tsx, React 19 solo en las islas que ya existen (FAQ, carrusel, testimonios, footer ASCII).

**Spec:** `docs/superpowers/specs/2026-09-15-centro-de-mando-design.md`

## Global Constraints

- Repo real: `/home/jorge/Documentos/platanito/home` (todas las rutas de este plan son relativas a esa carpeta). Rama `feat/centro-de-mando`.
- Mismas URLs, `<title>`, meta description, canonical, robots, H1, primer H2 dentro de `<main>` y tipos JSON-LD que la línea base (Task 1). `npm run audit:seo` es el juez.
- Tokens: suelo `#070B10`, panel `#0C131A`, panel-2 `#111B24`, regla `#1C2A36`, regla-2 `#26394A`, texto `#E6EDF2`, tenue `#8494A2`, señal `#FF5A00`, ok `#D6FF44`.
- Titulares: Bricolage Grotesque variable con `font-stretch: 82%`, peso 700-760, interlineado 0,92-0,95, tracking −0,02 em. Lectura en DM Sans. JetBrains Mono solo en datos.
- Marco sólido + etiqueta «real» = dato medido. Marco discontinuo + etiqueta «demo» = simulación. Lima solo significa ok/verificado; naranja solo acción o sede.
- Un único arranque por visita (escáner + paneles que se encienden), marcado en `sessionStorage` con la clave `cdm-arranque`. El H1, el H2 y los botones nunca empiezan con `opacity: 0`.
- Toda animación va dentro de `@media (prefers-reduced-motion: no-preference)` o se anula con `reduce`.
- Nunca se inventan cifras: si no hay medida, se escribe «sin medida».
- No se elimina ninguna ilustración SVG hecha a mano; sobre fondo oscuro van en una ficha clara que conserva sus colores.
- Textos en español, en minúscula de frase; nada de «→» añadido a botones nuevos ni de metadatos unidos con «·» en componentes nuevos.
- Lighthouse móvil de la home: rendimiento ≥ 95, accesibilidad ≥ 95, SEO 100. HTML de la home ≤ 180 KB y no más JS de islas que la línea base.
- Commit único al cerrar la fase (Task 14), sin push salvo que el usuario lo pida. Mensajes terminan con `Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>`.
- Comandos de verificación: `npm run check`, `npm run lint`, `npm test`, `npm run build`, `npm run audit:seo`.

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/scripts/auditoria-seo/extraer.ts` | Crear | Extraer ficha SEO de un HTML y compararla con la base |
| `src/scripts/auditoria-seo/extraer.test.ts` | Crear | Tests de extracción y comparación |
| `src/scripts/auditoria-seo.ts` | Crear | CLI: recorre `dist/client`, guarda o compara la base, pesa la home |
| `src/scripts/auditoria-seo/base.json` | Generado | Línea base previa al rediseño |
| `src/styles/fuentes.test.ts` | Crear | Garantiza que `--font-*` apunta a familias registradas y que existen los tokens |
| `src/styles/global.css` | Modificar | Import de Bricolage con eje de anchura, nombres de familia, tokens `cdm`, capa global del centro de mando |
| `src/layouts/BaseLayout.astro` | Modificar | Quitar la banda marquee, `theme-color` oscuro, precarga de Bricolage |
| `src/data/proyectos.ts` | Crear | Lista de proyectos publicada (antes dentro de la home) |
| `src/data/negocio.ts` | Modificar | Cifras de negocio con origen |
| `src/data/negocio.test.ts` | Crear | Años en Almería |
| `src/data/cobertura.ts` | Crear | Coordenadas, costa, proyección y puntos del radar |
| `src/data/cobertura.test.ts` | Crear | Proyección y geografía coherente |
| `src/data/medidas.ts` | Crear | Esquema Zod y funciones puras de medidas |
| `src/data/medidas.test.ts` | Crear | Tests de las funciones de medidas |
| `src/data/medidas.json` | Crear / generado | Última medida de las webs de clientes |
| `src/scripts/medir-webs.ts` | Crear | CLI de medidas (PageSpeed + tiempo de respuesta) |
| `src/components/cdm/tipos.ts` | Crear | Tipos compartidos de los componentes `cdm` |
| `src/components/cdm/Consola.astro` | Crear | Sección oscura con retícula y escáner |
| `src/components/cdm/Panel.astro` | Crear | Marco real/demo/neutro |
| `src/components/cdm/Boton.astro` | Crear | Botón señal/línea |
| `src/components/cdm/RadarCobertura.astro` | Crear | Mapa radar del Levante y Almanzora |
| `src/components/cdm/WebsMedidas.astro` | Crear | Panel de Lighthouse de webs de clientes |
| `src/components/cdm/RegistroDemo.astro` | Crear | Registro demo del Plan 360 |
| `src/components/cdm/Telemetria.astro` | Crear | Franja de cifras con contador sin React |
| `src/components/cdm/PortadaConsola.astro` | Crear | Hero de la home |
| `src/components/cdm/PreciosConsola.astro` | Crear | Precios de la home |
| `src/components/layout/Header.astro` | Reescribir | Barra de estado + cajón móvil |
| `src/components/layout/Footer.astro` | Reescribir estilos y marcas | Footer oscuro con footer ASCII |
| `src/components/sections/Contact.astro` | Modificar | Prop `tono="consola"` |
| `src/pages/index.astro` | Modificar | Home con componentes `cdm` y secciones en oscuro |
| `package.json` | Modificar | Scripts `audit:seo`, `medir`, `prebuild` |
| `src/components/vg/*`, 10 archivos de `src/components/ui/` | Borrar | Componentes que dejan de usarse |

Fuera de esta fase: `CookieConsent` y `ChatWidget` siguen en claro; los atributos SVG `font-family="JetBrains Mono"` de audiovisual y desarrollo web se corrigen al migrar esas páginas (fase 4).

---

### Task 1: Auditoría SEO y línea base

**Files:**
- Create: `src/scripts/auditoria-seo/extraer.ts`
- Create: `src/scripts/auditoria-seo/extraer.test.ts`
- Create: `src/scripts/auditoria-seo.ts`
- Modify: `package.json` (bloque `scripts`)
- Generated: `src/scripts/auditoria-seo/base.json`

**Interfaces:**
- Consumes: nada.
- Produces: `extraerSeo(html: string): FichaSeo`, `compararConBase(base: MapaSeo, actual: MapaSeo): string[]`, `textoPlano(html: string): string`, tipos `FichaSeo` y `MapaSeo`; comando `npm run audit:seo` con flags `--guardar-base` y `--sin-peso`. Los paneles demo se reconocen por los atributos `data-panel="demo"` y `data-panel-etiqueta="demo"` (Task 5 los emite).

- [ ] **Step 1: Escribir los tests que fallan**

`src/scripts/auditoria-seo/extraer.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { compararConBase, extraerSeo, textoPlano, type FichaSeo } from './extraer';

const html = `<!DOCTYPE html><html><head>
<title>Diseño web en Mojácar | Platanito Rico</title>
<meta name="description" content="Webs para hoteles &amp; restaurantes">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://platanitorico.com/diseno-web/mojacar/">
<script type="application/ld+json">{"@type":"Service"}</script>
<script type="application/ld+json">[{"@type":"FAQPage"},{"@type":["Organization","LocalBusiness"]}]</script>
</head><body>
<aside><h2>Menú</h2></aside>
<main><h1 class="x">Diseño web <span>en Mojácar</span></h1><h2>Hoteles que venden</h2>
<div class="cdm-panel" data-panel="demo"><span data-panel-etiqueta="demo">demo</span></div>
<div data-panel="demo"></div>
<div data-panel="real"><span data-panel-etiqueta="real">real</span></div></main>
</body></html>`;

describe('textoPlano', () => {
  it('quita etiquetas, decodifica entidades y colapsa espacios', () => {
    expect(textoPlano(' a&nbsp;&amp;<b>b</b>\n c ')).toBe('a & b c');
  });
});

describe('extraerSeo', () => {
  const ficha = extraerSeo(html);

  it('lee título, descripción, robots y canonical', () => {
    expect(ficha.title).toBe('Diseño web en Mojácar | Platanito Rico');
    expect(ficha.description).toBe('Webs para hoteles & restaurantes');
    expect(ficha.robots).toBe('index, follow');
    expect(ficha.canonical).toBe('https://platanitorico.com/diseno-web/mojacar/');
  });

  it('normaliza el texto de los H1', () => {
    expect(ficha.h1).toEqual(['Diseño web en Mojácar']);
  });

  it('toma el primer H2 dentro de main, no el del menú', () => {
    expect(ficha.h2Primero).toBe('Hoteles que venden');
    expect(extraerSeo('<aside><h2>Menú</h2></aside>').h2Primero).toBeNull();
  });

  it('ordena los tipos JSON-LD, incluidos los que vienen en arrays', () => {
    expect(ficha.jsonLdTipos).toEqual(['FAQPage', 'LocalBusiness', 'Organization', 'Service']);
  });

  it('cuenta paneles demo y etiquetas demo por separado', () => {
    expect(ficha.panelesDemo).toBe(2);
    expect(ficha.etiquetasDemo).toBe(1);
  });
});

describe('compararConBase', () => {
  const base: FichaSeo = {
    title: 'Home', description: 'Desc', canonical: 'https://platanitorico.com/', robots: 'index, follow',
    h1: ['Diseño web en Almería'], h2Primero: 'Gancho', jsonLdTipos: ['FAQPage'], panelesDemo: 0, etiquetasDemo: 0,
  };

  it('no devuelve errores si nada cambia', () => {
    expect(compararConBase({ '/': base }, { '/': { ...base } })).toEqual([]);
  });

  it('avisa si desaparece una página o cambia un campo fijo', () => {
    const errores = compararConBase({ '/': base, '/a/': base }, { '/': { ...base, title: 'Otro', h1: ['Otro H1'] } });
    expect(errores).toContain('/a/: la página ha desaparecido');
    expect(errores.some((e) => e.startsWith('/: title cambió'))).toBe(true);
    expect(errores.some((e) => e.startsWith('/: H1 cambió'))).toBe(true);
  });

  it('exige un H1 en páginas indexables que en la base tenían uno', () => {
    const errores = compararConBase({ '/': base }, { '/': { ...base, h1: [] } });
    expect(errores).toContain('/: tiene 0 H1 y debe tener 1');
  });

  it('no exige H1 a páginas noindex', () => {
    const noindex = { ...base, robots: 'noindex, nofollow', h1: [] };
    expect(compararConBase({ '/x/': noindex }, { '/x/': noindex })).toEqual([]);
  });

  it('marca paneles demo sin etiqueta', () => {
    const errores = compararConBase({ '/': base }, { '/': { ...base, panelesDemo: 2, etiquetasDemo: 1 } });
    expect(errores).toContain('/: 1 panel(es) demo sin etiqueta «demo»');
  });
});
```

- [ ] **Step 2: Ejecutar y ver que falla**

Run: `npx vitest run src/scripts/auditoria-seo/extraer.test.ts`
Expected: FAIL con `Failed to resolve import "./extraer"`.

- [ ] **Step 3: Implementar `extraer.ts`**

`src/scripts/auditoria-seo/extraer.ts`:

```ts
/* Auditoría SEO del rediseño: saca de cada HTML generado los datos que no
   deben cambiar y los compara con la línea base. Sin dependencias: el HTML
   que genera Astro es regular y basta con expresiones regulares. */

export interface FichaSeo {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  h1: string[];
  h2Primero: string | null;
  jsonLdTipos: string[];
  panelesDemo: number;
  etiquetasDemo: number;
}

export type MapaSeo = Record<string, FichaSeo>;

const ENTIDADES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&nbsp;': ' ',
};

export function textoPlano(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, (m) => ENTIDADES[m] ?? m)
    .replace(/\s+/g, ' ')
    .trim();
}

function atributo(etiqueta: string, nombre: string): string {
  const m = etiqueta.match(new RegExp(`\\s${nombre}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return textoPlano(m?.[1] ?? m?.[2] ?? m?.[3] ?? '');
}

function tiposJsonLd(html: string): string[] {
  const bloques = [...html.matchAll(/<script[^>]*type=["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)];
  return bloques
    .flatMap((m) => {
      try {
        const datos: unknown = JSON.parse(m[1]);
        return (Array.isArray(datos) ? datos : [datos]).flatMap((d) => [(d as { '@type'?: unknown })?.['@type']].flat());
      } catch {
        return ['JSON-LD inválido'];
      }
    })
    .filter((t): t is string => typeof t === 'string')
    .sort();
}

export function extraerSeo(html: string): FichaSeo {
  const metaDescripcion = html.match(/<meta[^>]*\sname=["']?description["']?[^>]*>/i)?.[0] ?? '';
  const metaRobots = html.match(/<meta[^>]*\sname=["']?robots["']?[^>]*>/i)?.[0] ?? '';
  const enlaceCanonical = html.match(/<link[^>]*\srel=["']?canonical["']?[^>]*>/i)?.[0] ?? '';
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? '';
  const h2 = main.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);

  return {
    title: textoPlano(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? ''),
    description: atributo(metaDescripcion, 'content'),
    canonical: atributo(enlaceCanonical, 'href'),
    robots: atributo(metaRobots, 'content'),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => textoPlano(m[1])),
    h2Primero: h2 ? textoPlano(h2[1]) : null,
    jsonLdTipos: tiposJsonLd(html),
    panelesDemo: (html.match(/data-panel=["']?demo\b/g) ?? []).length,
    etiquetasDemo: (html.match(/data-panel-etiqueta=["']?demo\b/g) ?? []).length,
  };
}

const CAMPOS_FIJOS = ['title', 'description', 'canonical', 'robots', 'h2Primero'] as const;

export function compararConBase(base: MapaSeo, actual: MapaSeo): string[] {
  const errores: string[] = [];

  for (const [ruta, antes] of Object.entries(base)) {
    const ahora = actual[ruta];
    if (!ahora) {
      errores.push(`${ruta}: la página ha desaparecido`);
      continue;
    }
    for (const campo of CAMPOS_FIJOS) {
      if (ahora[campo] !== antes[campo]) errores.push(`${ruta}: ${campo} cambió de «${antes[campo]}» a «${ahora[campo]}»`);
    }
    if (ahora.h1.join(' | ') !== antes.h1.join(' | ')) {
      errores.push(`${ruta}: H1 cambió de «${antes.h1.join(' | ')}» a «${ahora.h1.join(' | ')}»`);
    }
    if (ahora.jsonLdTipos.join(',') !== antes.jsonLdTipos.join(',')) {
      errores.push(`${ruta}: JSON-LD cambió de [${antes.jsonLdTipos.join(', ')}] a [${ahora.jsonLdTipos.join(', ')}]`);
    }
  }

  for (const [ruta, ahora] of Object.entries(actual)) {
    const indexable = !/noindex/i.test(ahora.robots);
    const teniaUnH1 = (base[ruta]?.h1.length ?? 1) === 1;
    if (indexable && teniaUnH1 && ahora.h1.length !== 1) errores.push(`${ruta}: tiene ${ahora.h1.length} H1 y debe tener 1`);
    if (ahora.panelesDemo !== ahora.etiquetasDemo) {
      errores.push(`${ruta}: ${ahora.panelesDemo - ahora.etiquetasDemo} panel(es) demo sin etiqueta «demo»`);
    }
  }

  return errores;
}
```

- [ ] **Step 4: Ejecutar los tests**

Run: `npx vitest run src/scripts/auditoria-seo/extraer.test.ts`
Expected: PASS (11 tests).

- [ ] **Step 5: Crear la CLI**

`src/scripts/auditoria-seo.ts`:

```ts
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
```

En `package.json`, dentro de `"scripts"`, añadir después de `"test:watch": "vitest",`:

```json
    "audit:seo": "tsx src/scripts/auditoria-seo.ts",
```

- [ ] **Step 6: Generar la línea base con el código actual**

Todavía no se ha tocado nada visual, así que el build de ahora es la base.

Run: `npm run build && npm run audit:seo -- --guardar-base`
Expected: `[seo] Línea base guardada: N páginas; home con ~241000 B de HTML y J B de JS.` con N > 100 y J > 0.

Run: `node -e "const b=require('./src/scripts/auditoria-seo/base.json');console.log(b.paginas['/'])"`
Expected: `h1: [ 'Diseño web en Almería' ]` y el `h2Primero` que tenga hoy la home. Anota ese texto: la portada nueva debe emitir exactamente ese H2 como primer `<h2>` de `<main>` (Task 9).

- [ ] **Step 7: Comprobar que la base se valida contra sí misma**

Run: `npm run audit:seo -- --sin-peso`
Expected: `[seo] Sin errores.` Si aparecen errores de «tiene N H1» en páginas de la base, son páginas que ya incumplían; `compararConBase` solo lo exige a las que tenían uno, así que no deberían salir. Si salen, detente y revisa `teniaUnH1`.

---

### Task 2: Fuentes que cargan de verdad y tokens del centro de mando

**Files:**
- Create: `src/styles/fuentes.test.ts`
- Modify: `src/styles/global.css:9` (import de Bricolage), `src/styles/global.css:24-36` (`@theme static`), `src/styles/global.css:39-51` (`--font-*` del `@theme`), `src/styles/global.css:739-742` (`--font-*` del `:root`)
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: nada.
- Produces: tokens CSS `--color-cdm-suelo`, `--color-cdm-panel`, `--color-cdm-panel-2`, `--color-cdm-regla`, `--color-cdm-regla-2`, `--color-cdm-texto`, `--color-cdm-tenue`, `--color-cdm-senal`, `--color-cdm-ok`; `--font-display`, `--font-body` y `--font-mono` resuelven a familias registradas; Bricolage admite `font-stretch` de 75 % a 100 %.

- [ ] **Step 1: Escribir el test que falla**

`src/styles/fuentes.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/* Hasta septiembre de 2026 la web pedía 'Bricolage Grotesque', pero
   fontsource registra 'Bricolage Grotesque Variable': el navegador caía a
   fuentes del sistema sin avisar. Este test impide que vuelva a pasar. */

const raiz = process.cwd();
const css = readFileSync(join(raiz, 'src/styles/global.css'), 'utf8');

const HOJAS_FONTSOURCE = [
  'node_modules/@fontsource-variable/bricolage-grotesque/wdth.css',
  'node_modules/@fontsource-variable/dm-sans/index.css',
  'node_modules/@fontsource-variable/jetbrains-mono/index.css',
];

function familiasRegistradas(): Set<string> {
  const familias = new Set<string>();
  for (const hoja of HOJAS_FONTSOURCE) {
    for (const m of readFileSync(join(raiz, hoja), 'utf8').matchAll(/font-family:\s*'([^']+)'/g)) familias.add(m[1]);
  }
  return familias;
}

function primerasFamilias(variable: string): string[] {
  return [...css.matchAll(new RegExp(`${variable}:\\s*([^;]+);`, 'g'))].map((m) =>
    m[1].split(',')[0].trim().replace(/^['"]|['"]$/g, ''),
  );
}

describe('fuentes', () => {
  const registradas = familiasRegistradas();

  it('importa Bricolage con el eje de anchura', () => {
    expect(css).toContain("@import '@fontsource-variable/bricolage-grotesque/wdth.css';");
  });

  for (const variable of ['--font-display', '--font-body', '--font-mono']) {
    it(`${variable} empieza siempre por una familia que fontsource registra`, () => {
      const familias = primerasFamilias(variable);
      expect(familias.length).toBeGreaterThan(0);
      for (const familia of familias) expect(registradas).toContain(familia);
    });
  }
});

describe('tokens del centro de mando', () => {
  const tokens: Record<string, string> = {
    '--color-cdm-suelo': '#070b10',
    '--color-cdm-panel': '#0c131a',
    '--color-cdm-panel-2': '#111b24',
    '--color-cdm-regla': '#1c2a36',
    '--color-cdm-regla-2': '#26394a',
    '--color-cdm-texto': '#e6edf2',
    '--color-cdm-tenue': '#8494a2',
    '--color-cdm-senal': '#ff5a00',
    '--color-cdm-ok': '#d6ff44',
  };
  for (const [token, valor] of Object.entries(tokens)) {
    it(`define ${token} = ${valor}`, () => {
      expect(css).toContain(`${token}: ${valor};`);
    });
  }
});
```

- [ ] **Step 2: Ejecutar y ver que falla**

Run: `npx vitest run src/styles/fuentes.test.ts`
Expected: FAIL. Falla el import de `wdth.css`, `--font-display` recibe `Bricolage Grotesque` y faltan los nueve tokens.

- [ ] **Step 3: Corregir `global.css`**

Línea 9, sustituir:

```css
@import '@fontsource-variable/bricolage-grotesque';
```

por:

```css
@import '@fontsource-variable/bricolage-grotesque/wdth.css';
```

Dentro de `@theme static { … }`, justo antes de la llave de cierre (después de `--color-plano-reticula: rgb(14 13 11 / 0.11);`), añadir:

```css

  /* Centro de mando (rediseño 2026-09-15) */
  --color-cdm-suelo: #070b10;
  --color-cdm-panel: #0c131a;
  --color-cdm-panel-2: #111b24;
  --color-cdm-regla: #1c2a36;
  --color-cdm-regla-2: #26394a;
  --color-cdm-texto: #e6edf2;
  --color-cdm-tenue: #8494a2;
  --color-cdm-senal: #ff5a00;
  --color-cdm-ok: #d6ff44;
```

En el bloque `@theme { … }` (líneas 39-51), sustituir las tres definiciones:

```css
  --font-display:
    Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
```
```css
  --font-body:
    DM Sans, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
```
```css
  --font-mono:
    JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
```

por:

```css
  --font-display:
    'Bricolage Grotesque Variable', 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
```
```css
  --font-body:
    'DM Sans Variable', 'DM Sans', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
```
```css
  --font-mono:
    'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
```

En el `:root` de `@layer utilities` (líneas 739-742), sustituir:

```css
    --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
    --font-editorial: 'Instrument Serif', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

por:

```css
    --font-display: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', system-ui, sans-serif;
    --font-editorial: 'Instrument Serif', Georgia, serif;
    --font-body: 'DM Sans Variable', 'DM Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace;
```

- [ ] **Step 4: Ejecutar el test**

Run: `npx vitest run src/styles/fuentes.test.ts`
Expected: PASS (13 tests).

- [ ] **Step 5: `BaseLayout.astro`: sin marquee, color de tema oscuro y precarga de Bricolage**

En el frontmatter, después de `import ChatWidget from '../components/asistente/ChatWidget.astro';`, añadir:

```ts
// Precarga del subconjunto latino de Bricolage (titulares): evita el salto
// de fuente en el H1, que es el LCP de casi todas las páginas.
import bricolageLatino from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2?url';
```

Sustituir `<meta name="theme-color" content="#F5F1EA" />` por:

```astro
    <meta name="theme-color" content="#070B10" />
    <link rel="preload" href={bricolageLatino} as="font" type="font/woff2" crossorigin />
```

Borrar completo el bloque de la banda superior, desde `{/* Marquee superior — banda fija de identidad */}` hasta el `</div>` que cierra `.brand-band` (las 16 líneas con `brand-band__item`).

Borrar el `<style is:global>` completo que contiene `.brand-band`, `.brand-band__track` y `.brand-band__item` (desde `<style is:global>` hasta su `</style>`).

- [ ] **Step 6: Verificar tipos, build y que las fuentes cargan**

Run: `npm run check && npm run build && npm run audit:seo -- --sin-peso`
Expected: `astro check` y `tsc` sin errores; build OK; `[seo] Sin errores.`

Con el servidor local (`python3 -m http.server 4330 --bind 127.0.0.1 --directory dist/client`, si no está ya en marcha), en Playwright:

```js
async (page) => {
  await page.goto('http://127.0.0.1:4330/', { waitUntil: 'networkidle' });
  return page.evaluate(async () => {
    await document.fonts.ready;
    return [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family))];
  });
}
```

Expected: el array incluye `Bricolage Grotesque Variable` y `DM Sans Variable`. Antes solo salía `Instrument Serif`.

---

### Task 3: Datos de proyectos, cifras y cobertura del radar

**Files:**
- Create: `src/data/proyectos.ts`
- Modify: `src/data/negocio.ts`
- Create: `src/data/negocio.test.ts`
- Create: `src/data/cobertura.ts`
- Create: `src/data/cobertura.test.ts`
- Modify: `src/pages/index.astro:65-78` (bloque `const casos`)

**Interfaces:**
- Consumes: `pueblosIT` de `src/data/servicios-it.ts` (10 pueblos: vera, garrucha, mojacar, turre, antas, cuevas-del-almanzora, pulpi, huercal-overa, albox, olula-del-rio).
- Produces:
  - `interface Proyecto { id; cliente; sector; result; tags: string[]; year; url; image }` y `proyectos: Proyecto[]`.
  - `CIFRAS` `{ valoracion: 4.9, numResenas: 87, anioFundacion: 2018, websEntregadas: 50, respuestaHoras: 4 }` y `aniosEnAlmeria(hoy?: Date): number`.
  - `CAJA_RADAR: Caja` (`ancho: 400`, `alto: 332`), `COSTA: [number, number][]`, `COORDENADAS: Record<string, [number, number]>`.
  - `proyectar(lat, lon, caja?): { x, y }`.
  - `puntosRadar(): PuntoRadar[]`, donde `PuntoRadar = { slug; nombre; x; y; etiqueta: 'derecha'|'izquierda'|'arriba'|'abajo'; sede: boolean }`.
  - `trazadoCosta(caja?): { linea: string; tierra: string }`.

- [ ] **Step 1: Escribir los tests que fallan**

`src/data/negocio.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { CIFRAS, aniosEnAlmeria } from './negocio';

describe('cifras de negocio', () => {
  it('cuenta los años desde la fundación en 2018', () => {
    expect(aniosEnAlmeria(new Date('2026-09-15T10:00:00Z'))).toBe(8);
    expect(aniosEnAlmeria(new Date('2027-01-02T10:00:00Z'))).toBe(9);
  });

  it('mantiene la valoración que publica el JSON-LD de la home', () => {
    expect(CIFRAS.valoracion).toBe(4.9);
    expect(CIFRAS.numResenas).toBe(87);
  });
});
```

`src/data/cobertura.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { CAJA_RADAR, COORDENADAS, COSTA, proyectar, puntosRadar, trazadoCosta } from './cobertura';
import { pueblosIT } from './servicios-it';

function lonCostaEn(lat: number): number {
  for (let i = 0; i < COSTA.length - 1; i++) {
    const [latA, lonA] = COSTA[i];
    const [latB, lonB] = COSTA[i + 1];
    if (lat <= latA && lat >= latB) return lonA + ((latA - lat) / (latA - latB)) * (lonB - lonA);
  }
  throw new Error(`La latitud ${lat} queda fuera de la costa trazada`);
}

describe('proyectar', () => {
  it('lleva las esquinas de la caja a las esquinas del viewBox', () => {
    expect(proyectar(CAJA_RADAR.latMax, CAJA_RADAR.lonMin)).toEqual({ x: 0, y: 0 });
    expect(proyectar(CAJA_RADAR.latMin, CAJA_RADAR.lonMax)).toEqual({ x: CAJA_RADAR.ancho, y: CAJA_RADAR.alto });
  });
});

describe('puntosRadar', () => {
  const puntos = puntosRadar();
  const punto = (slug: string) => {
    const encontrado = puntos.find((p) => p.slug === slug);
    if (!encontrado) throw new Error(`Sin punto para ${slug}`);
    return encontrado;
  };

  it('tiene un punto por cada pueblo con visita el mismo día, en el mismo orden', () => {
    expect(puntos.map((p) => p.slug)).toEqual(pueblosIT.map((p) => p.slug));
  });

  it('coloca todos los puntos dentro del mapa', () => {
    for (const p of puntos) {
      expect(p.x, p.slug).toBeGreaterThanOrEqual(0);
      expect(p.x, p.slug).toBeLessThanOrEqual(CAJA_RADAR.ancho);
      expect(p.y, p.slug).toBeGreaterThanOrEqual(0);
      expect(p.y, p.slug).toBeLessThanOrEqual(CAJA_RADAR.alto);
    }
  });

  it('respeta la geografía: oeste a la izquierda y norte arriba', () => {
    expect(punto('albox').x).toBeLessThan(punto('vera').x);
    expect(punto('garrucha').x).toBeGreaterThan(punto('vera').x);
    expect(punto('pulpi').y).toBeLessThan(punto('garrucha').y);
    expect(punto('mojacar').y).toBeGreaterThan(punto('vera').y);
  });

  it('solo Vera es la sede', () => {
    expect(puntos.filter((p) => p.sede).map((p) => p.slug)).toEqual(['vera']);
  });
});

describe('costa', () => {
  it('deja todos los pueblos en tierra, al oeste de la línea de costa', () => {
    for (const [slug, [lat, lon]] of Object.entries(COORDENADAS)) {
      expect(lon, slug).toBeLessThan(lonCostaEn(lat));
    }
  });

  it('traza un vértice por punto de costa y cierra la tierra', () => {
    const { linea, tierra } = trazadoCosta();
    expect(linea.match(/[ML]/g)).toHaveLength(COSTA.length);
    expect(tierra.startsWith(linea)).toBe(true);
    expect(tierra.endsWith('Z')).toBe(true);
  });
});
```

- [ ] **Step 2: Ejecutar y ver que falla**

Run: `npx vitest run src/data/negocio.test.ts src/data/cobertura.test.ts`
Expected: FAIL. `CIFRAS` no existe y `./cobertura` no se resuelve.

- [ ] **Step 3: Implementar datos**

Añadir al final de `src/data/negocio.ts`:

```ts

/* Cifras que la web enseña como datos. Origen: ficha de Google del estudio
   (valoración y reseñas, las mismas que el JSON-LD de la home), registro de
   proyectos entregados y año de alta (2018). Si cambian, se cambian aquí. */
export const CIFRAS = {
  valoracion: 4.9,
  numResenas: 87,
  anioFundacion: 2018,
  // Pendiente de confirmar por el usuario (15-09-2026).
  websEntregadas: 50,
  respuestaHoras: 4,
} as const;

export function aniosEnAlmeria(hoy: Date = new Date()): number {
  return hoy.getFullYear() - CIFRAS.anioFundacion;
}
```

`src/data/proyectos.ts`:

```ts
/* Proyectos publicados. El campo `result` recoge datos publicados por el
   propio cliente en su web, no métricas nuestras: así no afirmamos nada que
   no puedan respaldar ellos. El orden importa: la portada mide y enseña los
   cuatro primeros. */

export interface Proyecto {
  id: string;
  cliente: string;
  sector: string;
  result: string;
  tags: string[];
  year: string;
  url: string;
  image: string;
}

export const proyectos: Proyecto[] = [
  { id: 'juan-alcaraz', cliente: 'Juan Alcaraz', sector: 'Web · Audiovisual', result: '+25 selecciones · 6 premios', tags: ['Astro', 'Vimeo', 'Portfolio'], year: '2026', url: 'https://juanalcaraz.es/', image: '/imagenes/clientes/juan.jpg' },
  { id: 'taller-el-pinon', cliente: 'Taller El Piñón', sector: 'Web · Automoción', result: '+20 años de servicio', tags: ['Astro', 'SEO Local', 'Automoción'], year: '2026', url: 'https://tallerelpinon.com/', image: '/imagenes/clientes/taller.jpg' },
  { id: 'excavaciones-tripiana', cliente: 'Excavaciones Tripiana', sector: 'Web · Mov. de tierras', result: '+20 años · maquinaria propia', tags: ['Astro', 'SEO Local', 'Obra civil'], year: '2026', url: 'https://excavacionestripiana.com/', image: '/imagenes/clientes/tripiana.jpg' },
  { id: 'clinica-koral', cliente: 'Clínica Dental Koral', sector: 'Web · SEO', result: '+220% leads orgánicos', tags: ['Astro', 'SEO', 'Multiidioma'], year: '2024', url: 'https://clinicadentalkoral.es/', image: '/imagenes/clientes/clinica-dental-koral.jpg' },
  { id: 'murcia-production', cliente: 'Murcia Production Service', sector: 'Web · Corporativa', result: '#1 keyword sector', tags: ['Producción', 'Cine', 'AV'], year: '2025', url: 'https://murciaproductionservice.com/', image: '/imagenes/clientes/murcia-production-services.jpg' },
  { id: 'actualidad-almanzora', cliente: 'Actualidad Almanzora', sector: 'Portal Noticias', result: '+45k visitas/mes', tags: ['Noticias', 'Radio', 'Podcast'], year: '2023', url: 'https://www.actualidadalmanzora.es/', image: '/imagenes/clientes/actualidad-almanzora.jpg' },
  { id: 'oveja-bohemia', cliente: 'Oveja Bohemia', sector: 'E-commerce', result: '+180% ventas', tags: ['WooCommerce', 'E-com', 'Branding'], year: '2024', url: 'https://ovejabohemia.com/', image: '/imagenes/clientes/oveja-bohemia.jpg' },
  { id: 'ysy', cliente: 'YSY Style Up', sector: 'Web · Diseño', result: 'Lighthouse 100', tags: ['Elementor', 'SEO', 'Moda'], year: '2024', url: 'https://ysy.es/', image: '/imagenes/clientes/ysy.es.jpg' },
  { id: 'metales-sureste', cliente: 'Metales del Sureste', sector: 'Web · B2B', result: '+12 leads/mes', tags: ['Astro', 'SEO Local', 'B2B'], year: '2023', url: 'https://metalesdelsureste.com/', image: '/imagenes/clientes/metalesdelsureste.com.jpg' },
];
```

`src/data/cobertura.ts`:

```ts
/* Radar de cobertura: pueblos con visita el mismo día sobre un esquema de la
   costa del Levante almeriense. Proyección equirectangular dentro de una caja
   cuya proporción ya corrige el coseno de la latitud (≈ 37,2° N), así que el
   mapa no sale estirado. */
import { pueblosIT } from './servicios-it';

export interface Caja {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
  ancho: number;
  alto: number;
}

export interface Punto {
  x: number;
  y: number;
}

export type PosicionEtiqueta = 'derecha' | 'izquierda' | 'arriba' | 'abajo';

export interface PuntoRadar extends Punto {
  slug: string;
  nombre: string;
  etiqueta: PosicionEtiqueta;
  sede: boolean;
}

/* De Olula del Río (oeste) a San Juan de los Terreros (este) y de Pulpí
   (norte) a Carboneras (sur). */
export const CAJA_RADAR: Caja = { latMin: 36.97, latMax: 37.46, lonMin: -2.36, lonMax: -1.62, ancho: 400, alto: 332 };

/* Centro urbano de cada pueblo (WGS84). Vera coincide con el JSON-LD de la home. */
export const COORDENADAS: Record<string, [number, number]> = {
  vera: [37.2471, -1.8673],
  garrucha: [37.1814, -1.8217],
  mojacar: [37.1403, -1.8511],
  turre: [37.152, -1.895],
  antas: [37.2447, -1.9178],
  'cuevas-del-almanzora': [37.2968, -1.8804],
  pulpi: [37.4036, -1.7514],
  'huercal-overa': [37.3875, -1.9442],
  albox: [37.3886, -2.1478],
  'olula-del-rio': [37.3558, -2.2997],
};

/* Dónde va el nombre de cada pueblo para que no se pisen entre ellos. */
const ETIQUETAS: Record<string, PosicionEtiqueta> = {
  vera: 'abajo',
  garrucha: 'derecha',
  mojacar: 'derecha',
  turre: 'izquierda',
  antas: 'izquierda',
  'cuevas-del-almanzora': 'izquierda',
  pulpi: 'derecha',
  'huercal-overa': 'arriba',
  albox: 'arriba',
  'olula-del-rio': 'derecha',
};

/* Línea de costa de norte a sur; el primer y el último punto quedan fuera
   de la caja para que la tierra cierre por los bordes. */
export const COSTA: [number, number][] = [
  [37.46, -1.598],
  [37.4, -1.64],
  [37.357, -1.667], // San Juan de los Terreros
  [37.3, -1.72],
  [37.249, -1.773], // Villaricos
  [37.215, -1.808], // Vera Playa
  [37.181, -1.818], // Garrucha
  [37.14, -1.828], // Mojácar Playa
  [37.09, -1.845], // Macenas
  [37.04, -1.87],
  [36.997, -1.895], // Carboneras
  [36.96, -1.915],
];

export function proyectar(lat: number, lon: number, caja: Caja = CAJA_RADAR): Punto {
  const x = ((lon - caja.lonMin) / (caja.lonMax - caja.lonMin)) * caja.ancho;
  const y = ((caja.latMax - lat) / (caja.latMax - caja.latMin)) * caja.alto;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

export function puntosRadar(caja: Caja = CAJA_RADAR): PuntoRadar[] {
  return pueblosIT.map((pueblo) => {
    const coordenada = COORDENADAS[pueblo.slug];
    if (!coordenada) throw new Error(`Falta la coordenada de ${pueblo.slug} en src/data/cobertura.ts`);
    return {
      slug: pueblo.slug,
      nombre: pueblo.nombre,
      ...proyectar(coordenada[0], coordenada[1], caja),
      etiqueta: ETIQUETAS[pueblo.slug] ?? 'derecha',
      sede: pueblo.slug === 'vera',
    };
  });
}

export function trazadoCosta(caja: Caja = CAJA_RADAR): { linea: string; tierra: string } {
  const puntos = COSTA.map(([lat, lon]) => proyectar(lat, lon, caja));
  const linea = puntos.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  return { linea, tierra: `${linea} L-10 ${caja.alto + 10} L-10 -10 Z` };
}
```

- [ ] **Step 4: Ejecutar los tests**

Run: `npx vitest run src/data/negocio.test.ts src/data/cobertura.test.ts`
Expected: PASS (2 + 7 tests).

- [ ] **Step 5: La home usa `proyectos.ts`**

En `src/pages/index.astro`, borrar el bloque que empieza en `// Casos reales con imágenes` y termina en el `];` que cierra `const casos` (líneas 65-78, incluidos los dos comentarios sobre `result`). Añadir, después de `import { comarcas, getPueblosByComarca, comarcaSlug } from '../data/pueblos-almeria';`:

```ts
import { proyectos as casos } from '../data/proyectos';
```

- [ ] **Step 6: Verificar**

Run: `npm run check && npm test`
Expected: sin errores de tipos; todos los tests en verde (26 previos + los de Task 1, 2 y 3).

---

### Task 4: Medidas reales de las webs de clientes

**Files:**
- Create: `src/data/medidas.ts`
- Create: `src/data/medidas.test.ts`
- Create: `src/data/medidas.json`
- Create: `src/scripts/medir-webs.ts`
- Modify: `package.json` (bloque `scripts`)

**Interfaces:**
- Consumes: `proyectos` (Task 3).
- Produces:
  - `medidasSchema`, `type Medidas`, `type WebMedida` (`{ id, url, lighthouse: number|null, ttfbMs: number|null, medidoEl: string|null }`) y `interface Lectura { id; url; lighthouse: number|null; ttfbMs: number|null }`.
  - `puntuacionPsi(respuesta: unknown): number | null`.
  - `mediana(valores: number[]): number | null`.
  - `fusionarMedidas(anterior: Medidas | null, lecturas: Lectura[], ahora: Date): Medidas`.
  - `caducada(medidas: Medidas | null, ahora: Date, horas?: number): boolean`.
  - `fechaCorta(iso: string | null): string | null` (formato «15 sep», hora de Madrid).
  - Comandos `npm run medir` y `prebuild`.

- [ ] **Step 1: Escribir los tests que fallan**

`src/data/medidas.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { caducada, fechaCorta, fusionarMedidas, mediana, medidasSchema, puntuacionPsi, type Medidas } from './medidas';

describe('puntuacionPsi', () => {
  it('pasa la puntuación de rendimiento de 0-1 a 0-100', () => {
    expect(puntuacionPsi({ lighthouseResult: { categories: { performance: { score: 0.973 } } } })).toBe(97);
  });

  it('devuelve null si la respuesta no trae puntuación válida', () => {
    expect(puntuacionPsi({ error: { code: 429 } })).toBeNull();
    expect(puntuacionPsi(null)).toBeNull();
    expect(puntuacionPsi({ lighthouseResult: { categories: { performance: { score: null } } } })).toBeNull();
  });
});

describe('mediana', () => {
  it('toma el valor central', () => {
    expect(mediana([300, 120, 200])).toBe(200);
    expect(mediana([100, 101])).toBe(101);
  });

  it('devuelve null sin valores', () => {
    expect(mediana([])).toBeNull();
  });
});

describe('fusionarMedidas', () => {
  const ayer = '2026-09-14T08:00:00.000Z';
  const ahora = new Date('2026-09-15T08:00:00.000Z');
  const anterior: Medidas = {
    medidoEl: ayer,
    webs: [
      { id: 'a', url: 'https://a.es/', lighthouse: 91, ttfbMs: 300, medidoEl: ayer },
      { id: 'b', url: 'https://b.es/', lighthouse: 88, ttfbMs: 500, medidoEl: ayer },
    ],
  };

  it('usa la lectura nueva cuando la hay', () => {
    const r = fusionarMedidas(anterior, [
      { id: 'a', url: 'https://a.es/', lighthouse: 95, ttfbMs: 250 },
      { id: 'b', url: 'https://b.es/', lighthouse: 90, ttfbMs: 400 },
    ], ahora);
    expect(r.webs[0]).toEqual({ id: 'a', url: 'https://a.es/', lighthouse: 95, ttfbMs: 250, medidoEl: ahora.toISOString() });
    expect(r.medidoEl).toBe(ahora.toISOString());
  });

  it('conserva valor y fecha anteriores si PageSpeed falla para una web', () => {
    const r = fusionarMedidas(anterior, [
      { id: 'a', url: 'https://a.es/', lighthouse: null, ttfbMs: null },
      { id: 'b', url: 'https://b.es/', lighthouse: 90, ttfbMs: 400 },
    ], ahora);
    expect(r.webs[0]).toEqual({ id: 'a', url: 'https://a.es/', lighthouse: 91, ttfbMs: 300, medidoEl: ayer });
  });

  it('sin ninguna lectura nueva mantiene la fecha general anterior', () => {
    const r = fusionarMedidas(anterior, [
      { id: 'a', url: 'https://a.es/', lighthouse: null, ttfbMs: null },
      { id: 'b', url: 'https://b.es/', lighthouse: null, ttfbMs: null },
    ], ahora);
    expect(r.medidoEl).toBe(ayer);
  });

  it('una web nueva sin lectura queda sin medida, nunca con un valor inventado', () => {
    expect(fusionarMedidas(null, [{ id: 'c', url: 'https://c.es/', lighthouse: null, ttfbMs: null }], ahora)).toEqual({
      medidoEl: null,
      webs: [{ id: 'c', url: 'https://c.es/', lighthouse: null, ttfbMs: null, medidoEl: null }],
    });
  });

  it('el resultado cumple el esquema', () => {
    expect(() => medidasSchema.parse(fusionarMedidas(anterior, [], ahora))).not.toThrow();
  });
});

describe('caducada', () => {
  const ahora = new Date('2026-09-15T20:00:00.000Z');

  it('sin medidas siempre hay que medir', () => {
    expect(caducada(null, ahora)).toBe(true);
    expect(caducada({ medidoEl: null, webs: [] }, ahora)).toBe(true);
  });

  it('caduca a las 12 horas', () => {
    expect(caducada({ medidoEl: '2026-09-15T09:00:00.000Z', webs: [] }, ahora)).toBe(false);
    expect(caducada({ medidoEl: '2026-09-15T07:00:00.000Z', webs: [] }, ahora)).toBe(true);
  });
});

describe('fechaCorta', () => {
  it('formatea en hora de Madrid', () => {
    expect(fechaCorta('2026-09-14T23:30:00.000Z')).toBe('15 sep');
  });

  it('devuelve null sin fecha', () => {
    expect(fechaCorta(null)).toBeNull();
  });
});
```

- [ ] **Step 2: Ejecutar y ver que falla**

Run: `npx vitest run src/data/medidas.test.ts`
Expected: FAIL con `Failed to resolve import "./medidas"`.

- [ ] **Step 3: Implementar `medidas.ts` y el JSON inicial**

`src/data/medidas.ts`:

```ts
/* Medidas reales de las webs de clientes (Lighthouse móvil vía PageSpeed
   Insights y tiempo de respuesta). Las genera src/scripts/medir-webs.ts; la
   web solo las lee. Regla: si una medida falla se conserva la anterior con su
   fecha, y si nunca hubo medida se enseña «sin medida». */
import { z } from 'zod';

export const webMedidaSchema = z.object({
  id: z.string(),
  url: z.url(),
  lighthouse: z.number().int().min(0).max(100).nullable(),
  ttfbMs: z.number().int().nonnegative().nullable(),
  medidoEl: z.iso.datetime().nullable(),
});

export const medidasSchema = z.object({
  medidoEl: z.iso.datetime().nullable(),
  webs: z.array(webMedidaSchema),
});

export type WebMedida = z.infer<typeof webMedidaSchema>;
export type Medidas = z.infer<typeof medidasSchema>;

export interface Lectura {
  id: string;
  url: string;
  lighthouse: number | null;
  ttfbMs: number | null;
}

export function puntuacionPsi(respuesta: unknown): number | null {
  const score = (respuesta as { lighthouseResult?: { categories?: { performance?: { score?: unknown } } } } | null)
    ?.lighthouseResult?.categories?.performance?.score;
  return typeof score === 'number' && score >= 0 && score <= 1 ? Math.round(score * 100) : null;
}

export function mediana(valores: number[]): number | null {
  if (valores.length === 0) return null;
  const ordenados = [...valores].sort((a, b) => a - b);
  const medio = Math.floor(ordenados.length / 2);
  return ordenados.length % 2 ? ordenados[medio] : Math.round((ordenados[medio - 1] + ordenados[medio]) / 2);
}

export function fusionarMedidas(anterior: Medidas | null, lecturas: Lectura[], ahora: Date): Medidas {
  const iso = ahora.toISOString();
  const previas = new Map((anterior?.webs ?? []).map((w) => [w.id, w]));

  const webs = lecturas.map((lectura) => {
    const previa = previas.get(lectura.id);
    const nueva = lectura.lighthouse !== null;
    return {
      id: lectura.id,
      url: lectura.url,
      lighthouse: nueva ? lectura.lighthouse : previa?.lighthouse ?? null,
      ttfbMs: lectura.ttfbMs ?? previa?.ttfbMs ?? null,
      medidoEl: nueva ? iso : previa?.medidoEl ?? null,
    };
  });

  const algunaNueva = lecturas.some((l) => l.lighthouse !== null);
  return { medidoEl: algunaNueva ? iso : anterior?.medidoEl ?? null, webs };
}

export function caducada(medidas: Medidas | null, ahora: Date, horas = 12): boolean {
  if (!medidas?.medidoEl) return true;
  return ahora.getTime() - new Date(medidas.medidoEl).getTime() > horas * 3_600_000;
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function fechaCorta(iso: string | null): string | null {
  if (!iso) return null;
  const partes = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'numeric' }).formatToParts(new Date(iso));
  const dia = partes.find((p) => p.type === 'day')?.value;
  const mes = Number(partes.find((p) => p.type === 'month')?.value);
  return dia && mes ? `${dia} ${MESES[mes - 1]}` : null;
}
```

`src/data/medidas.json`:

```json
{
  "medidoEl": null,
  "webs": []
}
```

- [ ] **Step 4: Ejecutar los tests**

Run: `npx vitest run src/data/medidas.test.ts`
Expected: PASS (13 tests).

- [ ] **Step 5: Crear la CLI de medidas**

`src/scripts/medir-webs.ts`:

```ts
#!/usr/bin/env tsx
/* Mide las webs de clientes publicadas y guarda src/data/medidas.json.
   - Lighthouse móvil (rendimiento) con PageSpeed Insights. Clave opcional en
     la variable PSI_API_KEY; sin ella Google limita las peticiones.
   - Tiempo de respuesta: mediana de 3 peticiones hasta recibir cabeceras.
   Nunca rompe el build: si algo falla conserva la última medida.
   Uso: npm run medir            mide siempre
        npm run medir -- --si-caduca   solo si la última medida tiene más de 12 h */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { proyectos } from '../data/proyectos';
import { caducada, fusionarMedidas, mediana, medidasSchema, puntuacionPsi, type Lectura, type Medidas } from '../data/medidas';

const RUTA = join(process.cwd(), 'src/data/medidas.json');
const LIMITE_TOTAL_MS = 90_000;
const LIMITE_URL_MS = 25_000;
const CONCURRENCIA = 3;

function leerAnterior(): Medidas | null {
  try {
    return medidasSchema.parse(JSON.parse(readFileSync(RUTA, 'utf8')));
  } catch {
    return null;
  }
}

async function conLimite<T>(ms: number, tarea: (senal: AbortSignal) => Promise<T>): Promise<T | null> {
  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), ms);
  try {
    return await tarea(control.signal);
  } catch {
    return null;
  } finally {
    clearTimeout(reloj);
  }
}

async function lighthouse(url: string, senal: AbortSignal): Promise<number | null> {
  const api = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  api.searchParams.set('url', url);
  api.searchParams.set('strategy', 'mobile');
  api.searchParams.set('category', 'performance');
  if (process.env.PSI_API_KEY) api.searchParams.set('key', process.env.PSI_API_KEY);
  const respuesta = await fetch(api, { signal: senal });
  if (!respuesta.ok) return null;
  return puntuacionPsi(await respuesta.json());
}

async function tiempoRespuesta(url: string, senal: AbortSignal): Promise<number | null> {
  const tiempos: number[] = [];
  for (let intento = 0; intento < 3; intento++) {
    const inicio = performance.now();
    const respuesta = await fetch(url, { signal: senal, headers: { 'user-agent': 'PlatanitoRico-Medidas/1.0' } });
    tiempos.push(Math.round(performance.now() - inicio));
    await respuesta.body?.cancel();
  }
  return mediana(tiempos);
}

async function medir(proyecto: { id: string; url: string }): Promise<Lectura> {
  const [puntuacion, ttfb] = await Promise.all([
    conLimite(LIMITE_URL_MS, (senal) => lighthouse(proyecto.url, senal)),
    conLimite(LIMITE_URL_MS, (senal) => tiempoRespuesta(proyecto.url, senal)),
  ]);
  return { id: proyecto.id, url: proyecto.url, lighthouse: puntuacion, ttfbMs: ttfb };
}

async function principal(): Promise<void> {
  const ahora = new Date();
  const anterior = leerAnterior();

  if (process.argv.includes('--si-caduca') && !caducada(anterior, ahora)) {
    console.log(`[medir] Las medidas del ${anterior?.medidoEl} siguen vigentes; no se vuelve a medir.`);
    return;
  }

  const pendientes = [...proyectos];
  const lecturas: Lectura[] = [];
  const fin = Date.now() + LIMITE_TOTAL_MS;

  async function trabajador(): Promise<void> {
    while (Date.now() < fin) {
      const proyecto = pendientes.shift();
      if (!proyecto) return;
      lecturas.push(await medir(proyecto));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCIA }, trabajador));
  // Lo que no dio tiempo a medir entra sin lectura y conserva la medida anterior.
  for (const proyecto of pendientes) lecturas.push({ id: proyecto.id, url: proyecto.url, lighthouse: null, ttfbMs: null });

  const orden = new Map(proyectos.map((p, i) => [p.id, i]));
  lecturas.sort((a, b) => (orden.get(a.id) ?? 0) - (orden.get(b.id) ?? 0));

  writeFileSync(RUTA, JSON.stringify(fusionarMedidas(anterior, lecturas, ahora), null, 2) + '\n');
  const conPuntuacion = lecturas.filter((l) => l.lighthouse !== null).length;
  console.log(`[medir] ${conPuntuacion}/${lecturas.length} webs medidas con PageSpeed. Guardado en src/data/medidas.json.`);
}

principal().catch((error: unknown) => {
  console.warn('[medir] No se pudo medir; se mantienen las medidas anteriores.', error);
});
```

En `package.json`, dentro de `"scripts"`, sustituir `"build": "astro build",` por:

```json
    "prebuild": "tsx src/scripts/medir-webs.ts --si-caduca",
    "build": "astro build",
    "medir": "tsx src/scripts/medir-webs.ts",
```

- [ ] **Step 6: Primera medida real**

Run: `npm run medir`
Expected: `[medir] N/9 webs medidas con PageSpeed.` Tarda como mucho unos 2 minutos. Si sale `0/9`, PageSpeed está limitando las peticiones sin clave: el JSON queda con `lighthouse: null` y la web enseñará «sin medida». Es correcto, pero anótalo para el informe al usuario.

Run: `node -e "const m=require('./src/data/medidas.json');console.log(m.medidoEl, m.webs.map(w=>w.id+':'+w.lighthouse+'/'+w.ttfbMs).join(' '))"`
Expected: fecha ISO de hoy (o `null` si todo falló) y las 9 webs en el orden de `proyectos.ts`.

- [ ] **Step 7: Verificar que `prebuild` respeta la caducidad**

Run: `npm run build 2>&1 | head -5`
Expected: la primera línea con `[medir]` dice `siguen vigentes; no se vuelve a medir` (si Step 6 midió algo) y el build termina bien.

Run: `npm run check && npm run lint && npm test`
Expected: sin errores.

---

### Task 5: Primitivas del centro de mando (Consola, Panel, Boton) y capa CSS compartida

**Files:**
- Create: `src/components/cdm/tipos.ts`
- Create: `src/components/cdm/Consola.astro`
- Create: `src/components/cdm/Panel.astro`
- Create: `src/components/cdm/Boton.astro`
- Modify: `src/styles/global.css` (añadir al final)

**Interfaces:**
- Consumes: tokens `--color-cdm-*` (Task 2).
- Produces:
  - `<Consola as? id? escaner? class? aria-labelledby?>`: añade `class="dark"`. Con `escaner`, marca `data-cdm-arranque="hecho"` en `<html>` desde la segunda vista de la sesión.
  - `<Panel titulo tipo?='neutro'|'real'|'demo' nota? as? class? id?>`: emite `data-panel={tipo}` y, si no es neutro, `data-panel-etiqueta={tipo}`.
  - `<Boton href variante?='senal'|'linea' class?>`.
  - Clases globales `.cdm-dentro`, `.cdm-cabecera`, `.cdm-cabecera__h2`, `.cdm-cabecera__lead` y `.cdm-enciende` (con `--cdm-retardo`).
  - Tipos `LineaRegistro`, `Cifra`, `TarifaCdm`, `Enlace`.

- [ ] **Step 1: Tipos compartidos**

`src/components/cdm/tipos.ts`:

```ts
/* Tipos de los componentes del centro de mando. Viven en .ts y no en los
   .astro para que tsc y los scripts puedan importarlos sin compilar Astro. */

export interface Enlace {
  href: string;
  label: string;
}

export interface LineaRegistro {
  hora: string;
  texto: string;
  estado?: 'ok' | 'aviso';
}

export interface Cifra {
  etiqueta: string;
  valor: number;
  prefijo?: string;
  sufijo?: string;
}

export interface TarifaCdm {
  servicio: string;
  desde: string;
  nota: string;
  incluye: string[];
  href: string;
  cta: string;
  destacada?: boolean;
}
```

- [ ] **Step 2: Capa CSS compartida**

Añadir al final de `src/styles/global.css`:

```css

/* ════════════════════════════════════════════════════════════════════
   CENTRO DE MANDO — capa compartida del rediseño (2026-09-15)
   ════════════════════════════════════════════════════════════════════ */
.cdm-dentro {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: clamp(4rem, 8vw, 6.5rem) var(--container-gutter);
}
.cdm-cabecera {
  display: grid;
  gap: 1rem 3rem;
  margin-bottom: 2.5rem;
}
@media (min-width: 1024px) {
  .cdm-cabecera { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); align-items: end; }
}
.cdm-cabecera__h2 {
  margin: 0;
  max-width: 18ch;
  font-family: var(--font-display);
  font-stretch: 82%;
  font-weight: 740;
  font-size: clamp(2.2rem, 5vw, 3.9rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: var(--color-cdm-texto);
}
.cdm-cabecera__lead {
  margin: 0;
  max-width: 46ch;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #b9c5cf;
}
.cdm-cabecera__lead strong { color: var(--color-cdm-texto); font-weight: 600; }

/* Arranque: los paneles secundarios se encienden una sola vez por visita.
   Nunca se aplica a H1, H2 ni botones (LCP). */
@keyframes cdm-enciende {
  0% { opacity: 0; }
  30% { opacity: 0.6; }
  40% { opacity: 0.15; }
  60% { opacity: 0.9; }
  70% { opacity: 0.4; }
  100% { opacity: 1; }
}
@media (prefers-reduced-motion: no-preference) {
  :root:not([data-cdm-arranque='hecho']) .cdm-enciende {
    animation: cdm-enciende 0.9s var(--cdm-retardo, 0s) both;
  }
}
```

- [ ] **Step 3: `Panel.astro`**

`src/components/cdm/Panel.astro`:

```astro
---
/* Panel del centro de mando.
   tipo="real": dato medido, marco sólido y etiqueta «real».
   tipo="demo": simulación, marco discontinuo y etiqueta «demo».
   La auditoría SEO comprueba que todo data-panel="demo" lleva su etiqueta. */
interface Props {
  titulo: string;
  tipo?: 'real' | 'demo' | 'neutro';
  nota?: string;
  as?: 'div' | 'section' | 'article';
  class?: string;
  id?: string;
}

const { titulo, tipo = 'neutro', nota, as: Etiqueta = 'div', class: clase, id } = Astro.props;
---

<Etiqueta class:list={['cdm-panel', `cdm-panel--${tipo}`, clase]} data-panel={tipo} id={id}>
  <div class="cdm-panel__cab">
    <span class="cdm-panel__titulo">{titulo}</span>
    {tipo !== 'neutro' && <span class="cdm-panel__etq" data-panel-etiqueta={tipo}>{tipo}</span>}
  </div>
  <div class="cdm-panel__cuerpo"><slot /></div>
  {nota && <p class="cdm-panel__nota">{nota}</p>}
</Etiqueta>

<style>
  .cdm-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: rgb(12 19 26 / 0.92);
    border: 1px solid var(--color-cdm-regla-2);
    color: var(--color-cdm-texto);
  }
  .cdm-panel--demo {
    background: rgb(12 19 26 / 0.7);
    border-style: dashed;
    border-color: #3a4c5c;
  }
  .cdm-panel__cab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid var(--color-cdm-regla);
    font-size: 0.8rem;
  }
  .cdm-panel__titulo { font-weight: 600; }
  .cdm-panel__etq {
    padding: 0.05rem 0.4rem;
    border: 1px solid currentColor;
    font-family: var(--font-mono);
    font-size: 0.68rem;
  }
  .cdm-panel--real .cdm-panel__etq { color: var(--color-cdm-ok); }
  .cdm-panel--demo .cdm-panel__etq { color: var(--color-cdm-tenue); border-style: dashed; }
  .cdm-panel__cuerpo { flex: 1; min-width: 0; }
  .cdm-panel__nota {
    margin: 0;
    padding: 0.5rem 0.8rem;
    border-top: 1px solid var(--color-cdm-regla);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-cdm-tenue);
  }
</style>
```

- [ ] **Step 4: `Consola.astro`**

`src/components/cdm/Consola.astro`:

```astro
---
/* Sección oscura del centro de mando: retícula de plano y viñeta. Lleva la
   clase "dark" para que los componentes React con variantes dark: se pinten
   en oscuro. Con `escaner`, pasa la franja naranja una sola vez por visita:
   el script marca la sesión antes de que se pinte el contenido. */
interface Props {
  as?: 'section' | 'div';
  id?: string;
  escaner?: boolean;
  class?: string;
  'aria-labelledby'?: string;
}

const { as: Etiqueta = 'section', id, escaner = false, class: clase, 'aria-labelledby': etiquetadaPor } = Astro.props;
---

<Etiqueta class:list={['cdm-consola', 'dark', clase]} id={id} aria-labelledby={etiquetadaPor}>
  {escaner && (
    <script is:inline>
      try {
        if (sessionStorage.getItem('cdm-arranque')) document.documentElement.dataset.cdmArranque = 'hecho';
        else sessionStorage.setItem('cdm-arranque', '1');
      } catch (e) {}
    </script>
  )}
  {escaner && <div class="cdm-consola__escaner" aria-hidden="true"></div>}
  <slot />
</Etiqueta>

<style>
  .cdm-consola {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    color: var(--color-cdm-texto);
    background-color: var(--color-cdm-suelo);
    background-image:
      linear-gradient(var(--color-cdm-regla) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-cdm-regla) 1px, transparent 1px);
    background-size: 64px 64px;
    background-position: -1px -1px;
  }
  .cdm-consola::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: radial-gradient(90% 70% at 70% 35%, transparent 0, var(--color-cdm-suelo) 78%);
  }
  .cdm-consola__escaner {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    opacity: 0;
    background: linear-gradient(
      180deg,
      transparent calc(100% - 120px),
      rgb(255 90 0 / 0.1) calc(100% - 24px),
      rgb(255 90 0 / 0.55) calc(100% - 2px),
      transparent 100%
    );
  }
  @media (prefers-reduced-motion: no-preference) {
    :global(:root:not([data-cdm-arranque='hecho'])) .cdm-consola__escaner {
      animation: cdm-escanea 2.2s 0.15s cubic-bezier(0.5, 0, 0.3, 1) both;
    }
  }
  @keyframes cdm-escanea {
    0% { opacity: 1; transform: translateY(-100%); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(0); }
  }
</style>
```

- [ ] **Step 5: `Boton.astro`**

`src/components/cdm/Boton.astro`:

```astro
---
interface Props {
  href: string;
  variante?: 'senal' | 'linea';
  class?: string;
}

const { href, variante = 'senal', class: clase } = Astro.props;
---

<a href={href} class:list={['cdm-boton', `cdm-boton--${variante}`, clase]}><slot /></a>

<style>
  .cdm-boton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.9rem;
    padding: 0.7rem 1.15rem;
    border: 1px solid;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.95rem;
    line-height: 1.1;
    text-decoration: none;
    transition: background-color 0.15s, border-color 0.15s, color 0.15s;
  }
  /* #120600 sobre #FF5A00: 6,5:1 */
  .cdm-boton--senal { background: var(--color-cdm-senal); border-color: var(--color-cdm-senal); color: #120600; }
  .cdm-boton--senal:hover { background: #ff7a33; border-color: #ff7a33; }
  .cdm-boton--linea { background: transparent; border-color: var(--color-cdm-regla-2); color: var(--color-cdm-texto); }
  .cdm-boton--linea:hover { border-color: var(--color-cdm-texto); }
  .cdm-boton:focus-visible { outline: 2px solid var(--color-cdm-ok); outline-offset: 3px; }
</style>
```

- [ ] **Step 6: Verificar**

Run: `npm run check && npm run lint`
Expected: 0 errores. Estos componentes aún no se usan; se ven por primera vez en Task 9.

---

### Task 6: Paneles de datos (radar, webs medidas, registro demo, telemetría)

**Files:**
- Create: `src/components/cdm/RadarCobertura.astro`
- Create: `src/components/cdm/WebsMedidas.astro`
- Create: `src/components/cdm/RegistroDemo.astro`
- Create: `src/components/cdm/Telemetria.astro`

**Interfaces:**
- Consumes: `Panel` (Task 5); `CAJA_RADAR`, `puntosRadar`, `trazadoCosta` (Task 3); `proyectos` (Task 3); `medidasSchema`, `fechaCorta` y `medidas.json` (Task 4); tipos `LineaRegistro` y `Cifra` (Task 5).
- Produces:
  - `<RadarCobertura destacado?: slug class?>`: panel real con SVG accesible (`role="img"` y la lista de pueblos en `aria-label`).
  - `<WebsMedidas max?=4 class?>`: panel real con las N primeras webs de `proyectos`.
  - `<RegistroDemo lineas titulo?='Así verás tu Plan 360' class?>`: panel demo.
  - `<Telemetria cifras class?>`: `<dl>` con contador sin React; el HTML trae el valor final.

- [ ] **Step 1: `RadarCobertura.astro`**

```astro
---
/* Radar de cobertura con visita el mismo día. Dato real: son los pueblos
   del servicio IT, en sus coordenadas, sobre la costa del Levante. */
import Panel from './Panel.astro';
import { CAJA_RADAR, puntosRadar, trazadoCosta, type PuntoRadar } from '../../data/cobertura';

interface Props {
  destacado?: string;
  class?: string;
}

const { destacado, class: clase } = Astro.props;
const { ancho, alto } = CAJA_RADAR;
const puntos = puntosRadar();
const { linea, tierra } = trazadoCosta();
const sede = puntos.find((p) => p.sede) ?? puntos[0];
const anillos = [60, 120, 180];
const nombres = puntos.map((p) => p.nombre).join(', ');

function posicion(p: PuntoRadar): { x: number; y: number; anclaje: 'start' | 'middle' | 'end' } {
  switch (p.etiqueta) {
    case 'izquierda': return { x: p.x - 7, y: p.y + 3.5, anclaje: 'end' };
    case 'arriba': return { x: p.x, y: p.y - 8, anclaje: 'middle' };
    case 'abajo': return { x: p.x, y: p.y + 15, anclaje: 'middle' };
    default: return { x: p.x + 7, y: p.y + 3.5, anclaje: 'start' };
  }
}
---

<Panel titulo="Cobertura in situ el mismo día" tipo="real" nota="Sede en Vera, visita el mismo día en el Levante y el Almanzora" class:list={['cdm-radar', clase]}>
  <svg viewBox={`0 0 ${ancho} ${alto}`} role="img" aria-label={`Mapa de pueblos con visita el mismo día: ${nombres}.`} class="cdm-radar__mapa">
    <defs>
      <pattern id="cdm-radar-mar" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="#26394a"></circle>
      </pattern>
      <linearGradient id="cdm-radar-haz" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ff5a00" stop-opacity="0"></stop>
        <stop offset="1" stop-color="#ff5a00" stop-opacity="0.38"></stop>
      </linearGradient>
    </defs>
    <rect width={ancho} height={alto} fill="url(#cdm-radar-mar)"></rect>
    <path d={tierra} class="cdm-radar__tierra"></path>
    <path d={linea} class="cdm-radar__costa"></path>
    {anillos.map((r) => <circle cx={sede.x} cy={sede.y} r={r} class="cdm-radar__anillo"></circle>)}
    <line x1={sede.x} y1="0" x2={sede.x} y2={alto} class="cdm-radar__eje"></line>
    <line x1="0" y1={sede.y} x2={ancho} y2={sede.y} class="cdm-radar__eje"></line>
    <g class="cdm-radar__barrido" style={`transform-origin:${sede.x}px ${sede.y}px`}>
      <path d={`M${sede.x} ${sede.y} L${sede.x} ${sede.y - 190} A190 190 0 0 1 ${sede.x + 164.5} ${sede.y - 95} Z`} fill="url(#cdm-radar-haz)"></path>
    </g>
    {puntos.map((p) => {
      const e = posicion(p);
      return (
        <g class:list={['cdm-radar__pueblo', { 'is-sede': p.sede, 'is-destacado': p.slug === destacado }]}>
          {p.sede && <circle cx={p.x} cy={p.y} r="3" class="cdm-radar__pulso"></circle>}
          <circle cx={p.x} cy={p.y} r={p.sede ? 4.2 : 2.6} class="cdm-radar__punto"></circle>
          <text x={e.x} y={e.y} text-anchor={e.anclaje}>{p.sede ? `${p.nombre}, sede` : p.nombre}</text>
        </g>
      );
    })}
  </svg>
</Panel>

<style>
  .cdm-radar__mapa { display: block; width: 100%; height: auto; }
  .cdm-radar__tierra { fill: var(--color-cdm-panel-2); }
  .cdm-radar__costa { fill: none; stroke: var(--color-cdm-texto); stroke-width: 1.2; opacity: 0.75; }
  .cdm-radar__anillo { fill: none; stroke: var(--color-cdm-regla-2); }
  .cdm-radar__eje { stroke: var(--color-cdm-regla); }
  .cdm-radar__barrido { transform-box: view-box; }
  .cdm-radar__punto { fill: var(--color-cdm-texto); }
  .is-sede .cdm-radar__punto,
  .is-destacado .cdm-radar__punto { fill: var(--color-cdm-senal); }
  .cdm-radar__pulso { fill: none; stroke: var(--color-cdm-senal); transform-box: fill-box; transform-origin: center; }
  .cdm-radar__pueblo text { font-family: var(--font-mono); font-size: 9.5px; fill: var(--color-cdm-tenue); }
  .is-sede text,
  .is-destacado text { fill: var(--color-cdm-texto); }
  @media (prefers-reduced-motion: no-preference) {
    .cdm-radar__barrido { animation: cdm-gira 6s linear infinite; }
    .cdm-radar__pulso { animation: cdm-pulso 2.4s ease-out infinite; }
  }
  @keyframes cdm-gira { to { transform: rotate(360deg); } }
  @keyframes cdm-pulso {
    0% { transform: scale(1); opacity: 0.9; }
    100% { transform: scale(5); opacity: 0; }
  }
</style>
```

- [ ] **Step 2: `WebsMedidas.astro`**

```astro
---
/* Lighthouse móvil real de las primeras webs de proyectos.ts, en su orden
   (no las de mejor nota). Sin medida se dice «sin medida». Solo ≥ 90 va en
   lima, porque lima significa «ok». */
import Panel from './Panel.astro';
import medidasJson from '../../data/medidas.json';
import { fechaCorta, medidasSchema } from '../../data/medidas';
import { proyectos } from '../../data/proyectos';

interface Props {
  max?: number;
  class?: string;
}

const { max = 4, class: clase } = Astro.props;
const medidas = medidasSchema.parse(medidasJson);
const porId = new Map(medidas.webs.map((w) => [w.id, w]));
const filas = proyectos.slice(0, max).map((p) => ({
  dominio: new URL(p.url).hostname.replace(/^www\./, ''),
  url: p.url,
  lighthouse: porId.get(p.id)?.lighthouse ?? null,
}));
const fecha = fechaCorta(medidas.medidoEl);
const nota = fecha ? `Lighthouse móvil medido el ${fecha} con PageSpeed Insights` : 'Todavía sin medida disponible';
---

<Panel titulo="Webs de clientes medidas" tipo="real" nota={nota} class={clase}>
  <ul class="cdm-medidas">
    {filas.map((f) => (
      <li class="cdm-medidas__fila">
        <a href={f.url} target="_blank" rel="noopener noreferrer" class="cdm-medidas__dominio">
          {f.dominio}<span class="sr-only"> (abre en una pestaña nueva)</span>
        </a>
        {f.lighthouse === null ? (
          <span class="cdm-medidas__valor is-vacio">sin medida</span>
        ) : (
          <span class:list={['cdm-medidas__valor', { 'is-bajo': f.lighthouse < 90 }]}>
            {f.lighthouse}<span class="sr-only"> sobre 100 en Lighthouse</span>
          </span>
        )}
        <span class:list={['cdm-medidas__barra', { 'is-bajo': (f.lighthouse ?? 0) < 90 }]} aria-hidden="true">
          <i style={`--v:${f.lighthouse ?? 0}`}></i>
        </span>
      </li>
    ))}
  </ul>
</Panel>

<style>
  .cdm-medidas { list-style: none; margin: 0; padding: 0.35rem 0.8rem 0.6rem; }
  .cdm-medidas__fila {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.3rem 0.6rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-cdm-regla);
    font-size: 0.82rem;
  }
  .cdm-medidas__fila:last-child { border-bottom: 0; }
  .cdm-medidas__dominio { color: #c9d3db; text-decoration: none; overflow-wrap: anywhere; }
  .cdm-medidas__dominio:hover { color: var(--color-cdm-texto); text-decoration: underline; }
  .cdm-medidas__dominio:focus-visible { outline: 2px solid var(--color-cdm-ok); outline-offset: 2px; }
  .cdm-medidas__valor { font-family: var(--font-mono); color: var(--color-cdm-ok); }
  .cdm-medidas__valor.is-bajo { color: var(--color-cdm-texto); }
  .cdm-medidas__valor.is-vacio { font-size: 0.72rem; color: var(--color-cdm-tenue); }
  .cdm-medidas__barra { grid-column: 1 / -1; height: 3px; background: var(--color-cdm-regla); }
  .cdm-medidas__barra i {
    display: block;
    height: 100%;
    width: calc(var(--v) * 1%);
    background: var(--color-cdm-ok);
    transform-origin: left;
  }
  .cdm-medidas__barra.is-bajo i { background: var(--color-cdm-tenue); }
  @media (prefers-reduced-motion: no-preference) {
    :global(:root:not([data-cdm-arranque='hecho'])) .cdm-medidas__barra i {
      animation: cdm-carga 1.4s 1.9s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
  }
  @keyframes cdm-carga { from { transform: scaleX(0); } }
</style>
```

- [ ] **Step 3: `RegistroDemo.astro`**

```astro
---
/* Registro simulado del panel del Plan 360. Siempre tipo="demo". */
import Panel from './Panel.astro';
import type { LineaRegistro } from './tipos';

interface Props {
  lineas: LineaRegistro[];
  titulo?: string;
  class?: string;
}

const { lineas, titulo = 'Así verás tu Plan 360', class: clase } = Astro.props;
---

<Panel titulo={titulo} tipo="demo" nota="Simulación del panel del cliente, no son datos reales" class={clase}>
  <ol class="cdm-registro">
    {lineas.map((l, i) => (
      <li style={`--i:${i}`}>
        <span class="cdm-registro__hora">{l.hora}</span>
        <span class:list={['cdm-registro__texto', l.estado && `is-${l.estado}`]}>{l.texto}</span>
      </li>
    ))}
  </ol>
</Panel>

<style>
  .cdm-registro {
    list-style: none;
    margin: 0;
    padding: 0.5rem 0.8rem 0.7rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    line-height: 1.75;
    color: #aebbc6;
  }
  .cdm-registro li { display: grid; grid-template-columns: 3.2em minmax(0, 1fr); gap: 0.6em; }
  .cdm-registro__hora { color: var(--color-cdm-tenue); }
  .cdm-registro__texto.is-ok { color: var(--color-cdm-texto); }
  .cdm-registro__texto.is-ok::after { content: ' ok'; color: var(--color-cdm-ok); }
  .cdm-registro__texto.is-aviso::before { content: 'aviso '; color: var(--color-cdm-senal); }
  @media (prefers-reduced-motion: no-preference) {
    .cdm-registro li { animation: cdm-linea 0.01s calc(2.2s + var(--i) * 0.6s) both; }
  }
  @keyframes cdm-linea {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
```

- [ ] **Step 4: `Telemetria.astro`**

```astro
---
/* Franja de cifras. El HTML trae el valor final (buscadores y sin JS); en el
   navegador cuenta desde 0 al entrar en pantalla, salvo con movimiento
   reducido. Sin React: un script de pocas líneas. */
import type { Cifra } from './tipos';

interface Props {
  cifras: Cifra[];
  class?: string;
}

const { cifras, class: clase } = Astro.props;
---

<dl class:list={['cdm-telemetria', clase]}>
  {cifras.map((c) => (
    <div class="cdm-telemetria__cifra">
      <dt>{c.etiqueta}</dt>
      <dd>
        <span data-cuenta={c.valor} data-prefijo={c.prefijo ?? ''} data-sufijo={c.sufijo ?? ''}>{`${c.prefijo ?? ''}${c.valor}${c.sufijo ?? ''}`}</span>
      </dd>
    </div>
  ))}
</dl>

<script>
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cifras = document.querySelectorAll<HTMLElement>('[data-cuenta]');

  function contar(el: HTMLElement) {
    const objetivo = Number(el.dataset.cuenta);
    const prefijo = el.dataset.prefijo ?? '';
    const sufijo = el.dataset.sufijo ?? '';
    const inicio = performance.now();
    const paso = (ahora: number) => {
      const t = Math.min((ahora - inicio) / 1400, 1);
      el.textContent = `${prefijo}${Math.round(objetivo * (1 - Math.pow(1 - t, 3)))}${sufijo}`;
      if (t < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }

  if (!reducido && 'IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        contar(entrada.target as HTMLElement);
        observador.unobserve(entrada.target);
      }
    }, { threshold: 0.6 });
    cifras.forEach((el) => observador.observe(el));
  }
</script>

<style>
  .cdm-telemetria {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin: 0;
    border-top: 1px solid var(--color-cdm-regla);
    background: rgb(7 11 16 / 0.9);
  }
  .cdm-telemetria__cifra {
    display: flex;
    flex-direction: column-reverse;
    gap: 0.25rem;
    padding: 1.1rem 1.4rem;
    border-right: 1px solid var(--color-cdm-regla);
  }
  .cdm-telemetria__cifra:last-child { border-right: 0; }
  .cdm-telemetria dt { font-size: 0.82rem; color: var(--color-cdm-tenue); }
  .cdm-telemetria dd {
    margin: 0;
    font-family: var(--font-display);
    font-stretch: 82%;
    font-weight: 700;
    font-size: clamp(1.7rem, 3vw, 2.2rem);
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
    color: var(--color-cdm-texto);
  }
  @media (max-width: 900px) {
    .cdm-telemetria { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .cdm-telemetria__cifra:nth-child(2n) { border-right: 0; }
    .cdm-telemetria__cifra:nth-child(-n + 2) { border-bottom: 1px solid var(--color-cdm-regla); }
  }
</style>
```

- [ ] **Step 5: Verificar**

Run: `npm run check && npm run lint`
Expected: 0 errores. La comprobación visual se hace en Task 9, cuando la portada los monta.

---

### Task 7: Cabecera «barra de estado» en todas las páginas

**Files:**
- Rewrite: `src/components/layout/Header.astro`

**Interfaces:**
- Consumes: tokens `cdm` (Task 2).
- Produces:
  - `<Header />`, con la misma API que antes (sin props) y la misma posición en las 58 páginas que lo importan.
  - Se mantienen los IDs `menuBtn`, `menuClose` y `mobileMenu` y el atributo `data-menu-backdrop` (hoy nadie más los usa; verificado con grep).
  - Deja de usar `SpotlightNavbar` (se borra en Task 14).

- [ ] **Step 1: Reescribir `Header.astro` completo**

```astro
---
/* Cabecera del centro de mando: barra de estado oscura con marca, menú,
   posición de la sede, turno de técnicos y hora de Madrid. Por debajo de
   1280 px el menú va en un cajón lateral. */
const navLinks = [
  { href: '/desarrollo-web/', label: 'Web', meta: 'Diseño y desarrollo' },
  { href: '/informatica-empresas/', label: 'Sistemas IT', meta: 'Redes, equipos y soporte' },
  { href: '/plan-360/', label: 'Plan 360', meta: 'Web e informática, 400 €/mes' },
  { href: '/audiovisual/', label: 'Audiovisual', meta: 'Dron y vídeo 4K' },
  { href: '/marketing/', label: 'Marketing', meta: 'SEO, SEM y anuncios' },
  { href: '/diseno-grafico/', label: 'Diseño', meta: 'Marca e impresión' },
  { href: '/soporte/', label: 'Soporte', meta: 'Mantenimiento web' },
  { href: '/blog/', label: 'Blog', meta: 'Guías y tecnología' },
  { href: '/laboratorio-ia/', label: 'Lab IA', meta: 'Demos de IA en vivo' },
];

const solutionLinks = [
  { href: '/soluciones/emprendedor/', label: 'Emprendedores', meta: 'Lanza tu negocio' },
  { href: '/soluciones/empresa/', label: 'Empresas', meta: 'Escala tu marca' },
  { href: '/soluciones/ecommerce/', label: 'E-commerce', meta: 'Tienda online' },
  { href: '/soluciones/agencia/', label: 'Agencias', meta: 'Marca blanca' },
];

const legalLinks = [
  { href: '/privacidad/', label: 'Privacidad' },
  { href: '/terminos-condiciones/', label: 'Términos' },
  { href: '/cookies/', label: 'Cookies' },
  { href: '/aviso-legal/', label: 'Aviso legal' },
];

const currentPath = Astro.url.pathname;
const esActivo = (href: string) => currentPath === href || currentPath.startsWith(href);
---

<header class="cdm-barra dark">
  <div class="cdm-barra__dentro">
    <a href="/" class="cdm-barra__marca">
      <span class="cdm-barra__sello" aria-hidden="true">P★</span>
      <span>Platanito Rico</span>
    </a>

    <nav class="cdm-barra__nav" aria-label="Principal">
      <ul>
        {navLinks.map((l) => (
          <li>
            <a href={l.href} class:list={['cdm-barra__enlace', { 'is-activo': esActivo(l.href) }]} aria-current={esActivo(l.href) ? 'page' : undefined}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>

    <div class="cdm-barra__estado">
      <span>Vera 37,25 N</span>
      <span class="cdm-barra__turno" data-turno>
        <span class="cdm-barra__led" aria-hidden="true"></span>
        <span data-turno-texto>L–V de 9 a 19 h</span>
      </span>
      <time class="cdm-barra__hora" data-reloj></time>
    </div>

    <a href="/contacto/" class="cdm-barra__cta">Presupuesto</a>

    <button id="menuBtn" class="cdm-barra__menu" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileMenu">
      <span class="cdm-barra__barras" aria-hidden="true"><span></span><span></span><span></span></span>
      <span class="cdm-barra__menu-txt">Menú</span>
    </button>
  </div>
</header>

<aside id="mobileMenu" class="cdm-cajon dark" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Menú principal">
  <div class="cdm-cajon__fondo" data-menu-backdrop></div>
  <div class="cdm-cajon__panel">
    <div class="cdm-cajon__cab">
      <span class="cdm-cajon__titulo">Menú</span>
      <button id="menuClose" class="cdm-cajon__cerrar" aria-label="Cerrar menú">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
      </button>
    </div>

    <nav aria-label="Servicios">
      <ul class="cdm-cajon__lista">
        {navLinks.map((l) => (
          <li>
            <a href={l.href} class:list={['cdm-cajon__enlace', 'mobile-nav-link', { 'is-activo': esActivo(l.href) }]}>
              <span class="cdm-cajon__etq">{l.label}</span>
              <span class="cdm-cajon__meta">{l.meta}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <p class="cdm-cajon__grupo">Soluciones</p>
    <nav aria-label="Soluciones">
      <ul class="cdm-cajon__sub">
        {solutionLinks.map((l) => (
          <li><a href={l.href} class="mobile-nav-link">{l.label}<span>{l.meta}</span></a></li>
        ))}
      </ul>
    </nav>

    <div class="cdm-cajon__contacto">
      <a href="/contacto/" class="cdm-cajon__cta" data-menu-link>Pedir presupuesto</a>
      <div class="cdm-cajon__directo">
        <a href="https://wa.me/34657085019" target="_blank" rel="noopener noreferrer" data-menu-link>WhatsApp</a>
        <a href="tel:+34657085019" data-menu-link>657 085 019</a>
      </div>
    </div>

    <nav aria-label="Legal" class="cdm-cajon__legal">
      {legalLinks.map((l) => <a href={l.href} class="mobile-nav-link">{l.label}</a>)}
    </nav>
  </div>
</aside>

<style>
  .cdm-barra {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgb(7 11 16 / 0.88);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-cdm-regla);
    color: var(--color-cdm-texto);
  }
  .cdm-barra__dentro {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    height: 64px;
    max-width: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-gutter);
  }
  .cdm-barra__marca {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    color: inherit;
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1rem;
    white-space: nowrap;
  }
  .cdm-barra__sello {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border: 1px solid var(--color-cdm-senal);
    color: var(--color-cdm-senal);
    font-family: var(--font-mono);
    font-size: 0.72rem;
  }
  .cdm-barra__nav { display: none; flex: 1; }
  .cdm-barra__nav ul { display: flex; gap: 1.1rem; margin: 0; padding: 0; list-style: none; }
  .cdm-barra__enlace {
    padding-block: 0.35rem;
    color: var(--color-cdm-tenue);
    text-decoration: none;
    font-size: 0.88rem;
    white-space: nowrap;
  }
  .cdm-barra__enlace:hover { color: var(--color-cdm-texto); }
  .cdm-barra__enlace.is-activo { color: var(--color-cdm-texto); box-shadow: inset 0 -2px 0 var(--color-cdm-senal); }
  .cdm-barra__estado {
    display: none;
    align-items: center;
    gap: 0.9rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--color-cdm-tenue);
    white-space: nowrap;
  }
  .cdm-barra__turno { display: inline-flex; align-items: center; gap: 0.4rem; }
  .cdm-barra__led { width: 6px; height: 6px; border-radius: 50%; background: var(--color-cdm-tenue); }
  .cdm-barra__turno.is-abierto .cdm-barra__led { background: var(--color-cdm-ok); }
  .cdm-barra__cta {
    display: inline-flex;
    align-items: center;
    min-height: 2.5rem;
    margin-left: auto;
    padding: 0.5rem 0.95rem;
    background: var(--color-cdm-senal);
    color: #120600;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
  }
  .cdm-barra__cta:hover { background: #ff7a33; }
  .cdm-barra__menu {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    padding: 0 0.75rem;
    background: transparent;
    color: var(--color-cdm-texto);
    border: 1px solid var(--color-cdm-regla-2);
    cursor: pointer;
    font: inherit;
    font-size: 0.85rem;
  }
  .cdm-barra__barras { display: grid; gap: 4px; width: 16px; }
  .cdm-barra__barras span { display: block; height: 1.5px; background: currentColor; transition: transform 0.25s, opacity 0.2s; }
  .cdm-barra__menu.is-open .cdm-barra__barras span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
  .cdm-barra__menu.is-open .cdm-barra__barras span:nth-child(2) { opacity: 0; }
  .cdm-barra__menu.is-open .cdm-barra__barras span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }
  .cdm-barra a:focus-visible,
  .cdm-barra button:focus-visible,
  .cdm-cajon a:focus-visible,
  .cdm-cajon button:focus-visible { outline: 2px solid var(--color-cdm-ok); outline-offset: 3px; }
  @media (max-width: 480px) {
    .cdm-barra__cta { display: none; }
    .cdm-barra__menu { margin-left: auto; }
  }
  @media (min-width: 1280px) {
    .cdm-barra__nav { display: block; }
    .cdm-barra__menu { display: none; }
    .cdm-barra__cta { margin-left: 0; }
  }
  @media (min-width: 1536px) {
    .cdm-barra__estado { display: inline-flex; }
  }

  .cdm-cajon { position: fixed; inset: 0; z-index: 60; visibility: hidden; pointer-events: none; }
  .cdm-cajon.is-open { visibility: visible; pointer-events: auto; }
  .cdm-cajon__fondo { position: absolute; inset: 0; background: rgb(3 6 10 / 0.7); opacity: 0; transition: opacity 0.3s; }
  .cdm-cajon.is-open .cdm-cajon__fondo { opacity: 1; }
  .cdm-cajon__panel {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: min(92vw, 420px);
    height: 100%;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 1rem 1.25rem 2rem;
    background: var(--color-cdm-suelo);
    border-left: 1px solid var(--color-cdm-regla-2);
    color: var(--color-cdm-texto);
    transform: translateX(100%);
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .cdm-cajon.is-open .cdm-cajon__panel { transform: none; }
  .cdm-cajon__cab { display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--color-cdm-regla); }
  .cdm-cajon__titulo { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-cdm-tenue); }
  .cdm-cajon__cerrar { display: grid; place-items: center; width: 40px; height: 40px; background: transparent; color: var(--color-cdm-texto); border: 1px solid var(--color-cdm-regla-2); cursor: pointer; }
  .cdm-cajon__lista,
  .cdm-cajon__sub { margin: 0; padding: 0; list-style: none; }
  .cdm-cajon__enlace { display: flex; flex-direction: column; padding: 0.7rem 0 0.7rem 0.75rem; border-bottom: 1px solid var(--color-cdm-regla); color: inherit; text-decoration: none; }
  .cdm-cajon__enlace.is-activo { box-shadow: inset 2px 0 0 var(--color-cdm-senal); }
  .cdm-cajon__etq { font-family: var(--font-display); font-stretch: 82%; font-weight: 700; font-size: 1.5rem; line-height: 1.1; }
  .cdm-cajon__meta { font-size: 0.8rem; color: var(--color-cdm-tenue); }
  .cdm-cajon__grupo { margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-cdm-tenue); }
  .cdm-cajon__sub { display: grid; gap: 0.4rem; }
  .cdm-cajon__sub a { display: flex; justify-content: space-between; gap: 1rem; padding: 0.6rem 0.75rem; border: 1px solid var(--color-cdm-regla); color: inherit; text-decoration: none; font-weight: 600; }
  .cdm-cajon__sub a span { font-weight: 400; font-size: 0.8rem; color: var(--color-cdm-tenue); }
  .cdm-cajon__contacto { display: grid; gap: 0.5rem; }
  .cdm-cajon__cta { display: flex; justify-content: center; padding: 0.85rem; background: var(--color-cdm-senal); color: #120600; font-weight: 600; text-decoration: none; }
  .cdm-cajon__directo { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
  .cdm-cajon__directo a { display: flex; justify-content: center; padding: 0.7rem; border: 1px solid var(--color-cdm-regla-2); color: inherit; text-decoration: none; font-size: 0.9rem; }
  .cdm-cajon__legal { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; margin-top: auto; }
  .cdm-cajon__legal a { color: var(--color-cdm-tenue); font-size: 0.8rem; }
  @media (prefers-reduced-motion: reduce) {
    .cdm-cajon__panel,
    .cdm-cajon__fondo { transition: none; }
  }
</style>

<script>
  const menuBtn = document.getElementById('menuBtn');
  const menuClose = document.getElementById('menuClose');
  const drawer = document.getElementById('mobileMenu');
  const backdrop = drawer?.querySelector('[data-menu-backdrop]');
  const links = drawer?.querySelectorAll('[data-menu-link], .mobile-nav-link');

  function setOpen(open: boolean) {
    if (!drawer || !menuBtn) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    menuBtn.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  menuBtn?.addEventListener('click', () => setOpen(!drawer?.classList.contains('is-open')));
  menuClose?.addEventListener('click', () => setOpen(false));
  backdrop?.addEventListener('click', () => setOpen(false));
  links?.forEach((l) => l.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('is-open')) setOpen(false);
  });

  // Hora de Madrid y turno de técnicos (L–V de 9 a 19 h). Se calcula en el
  // navegador: el HTML estático solo trae el horario.
  const reloj = document.querySelector<HTMLTimeElement>('[data-reloj]');
  const turno = document.querySelector<HTMLElement>('[data-turno]');
  const turnoTexto = document.querySelector<HTMLElement>('[data-turno-texto]');
  const madrid = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

  function actualizarEstado() {
    const p = Object.fromEntries(madrid.formatToParts(new Date()).map((x) => [x.type, x.value]));
    const hora = Number(p.hour);
    const abierto = !['Sat', 'Sun'].includes(p.weekday) && hora >= 9 && hora < 19;
    if (reloj) {
      reloj.textContent = `${p.hour}:${p.minute}`;
      reloj.dateTime = `${p.hour}:${p.minute}`;
    }
    if (turno && turnoTexto) {
      turno.classList.toggle('is-abierto', abierto);
      turnoTexto.textContent = abierto ? 'Técnicos disponibles' : 'Fuera de horario: L–V de 9 a 19 h';
    }
  }

  actualizarEstado();
  setInterval(actualizarEstado, 30_000);
</script>
```

- [ ] **Step 2: Verificar build y SEO**

Run: `npm run check && npm run lint && npm run build && npm run audit:seo -- --sin-peso`
Expected: 0 errores y `[seo] Sin errores.` El H2 «★ Índice» del cajón anterior estaba fuera de `<main>`, así que no afecta a la base.

- [ ] **Step 3: Verificar a 1440 px y 390 px**

Con el servidor local en 4330, en Playwright:

```js
async (page) => {
  const salida = '/home/jorge/Documentos/platanito/.playwright-mcp';
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4330/plan-360/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${salida}/cdm-t7-barra-1440.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.click('#menuBtn');
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${salida}/cdm-t7-cajon-390.png` });
  return page.evaluate(() => ({
    abierto: document.getElementById('mobileMenu')?.classList.contains('is-open'),
    activo: document.querySelector('.cdm-cajon__enlace.is-activo')?.textContent?.trim(),
  }));
}
```

Expected: `{ abierto: true, activo: 'Plan 360Web e informática, 400 €/mes' }`. En las capturas: barra oscura con «Plan 360» subrayado en naranja; cajón oscuro a la derecha. Pulsa Escape y comprueba que se cierra.

---

### Task 8: Footer oscuro

**Files:**
- Rewrite: `src/components/layout/Footer.astro`

**Interfaces:**
- Consumes: `AnimatedFooter` (sin cambios), `pueblos`, `comarcas`, `getPueblosByComarca`, `getPueblosDestacados` y `esPuebloIndexable`.
- Produces: `<Footer hideHero?: boolean />`, con la misma API. Se mantienen los IDs y clases que usa el buscador de pueblos: `pueblo-selector`, `pueblo-dropdown-btn`, `pueblo-dropdown-panel`, `dropdown-arrow`, `selected-pueblo-text`, `pueblo-search`, `pueblos-list`, `no-results`, `ver-todos-btn`, `.pueblo-item`, `.comarca-section`, `.is-open` e `.is-shown`.

- [ ] **Step 1: Reescribir `Footer.astro` completo**

```astro
---
import { AnimatedFooter } from '@/components/ui/animated-footer';
import { pueblos, comarcas, getPueblosByComarca, getPueblosDestacados } from '../../data/pueblos-almeria';
import { esPuebloIndexable } from '../../data/pueblos-indexables';

interface Props {
  hideHero?: boolean;
}
const { hideHero = false } = Astro.props;

const currentYear = new Date().getFullYear();
// El buscador del footer enlaza solo a los pueblos indexables (Tier 1): evita
// volcar ~90 enlaces (muchos noindex) en cada página y concentra el link equity.
const pueblosDestacados = getPueblosDestacados().filter((p) => esPuebloIndexable(p.slug));

const servicios = [
  { href: '/desarrollo-web/', label: 'Diseño web' },
  { href: '/informatica-empresas/', label: 'Mantenimiento informático' },
  { href: '/plan-360/', label: 'Plan 360: web e informática' },
  { href: '/audiovisual/', label: 'Audiovisual' },
  { href: '/marketing/', label: 'Marketing y SEO' },
  { href: '/diseno-grafico/', label: 'Diseño gráfico' },
  { href: '/soporte/', label: 'Mantenimiento web' },
];
const capacidades = ['Diseño web', 'SEO local', 'Tiendas online', 'Redes y wifi', 'Servidores', 'Ciberseguridad', 'Vídeo con dron', 'Branding', 'Astro', 'WordPress', 'WooCommerce', 'Analytics'];
---

<footer class="cdm-pie dark">
  {!hideHero && (
    <section class="cdm-pie__cierre">
      <div class="cdm-pie__dentro">
        <p class="cdm-pie__coord">37,2471 N  1,8673 O  Vera, Almería</p>
        <h2 class="cdm-pie__claim">¿Empezamos tu proyecto?</h2>
        <p class="cdm-pie__sub">Web, sistemas informáticos y vídeo con dron desde Vera para toda la provincia. Presupuesto cerrado en 24 horas.</p>
        <div class="cdm-pie__acciones">
          <a href="/contacto/?servicio=web#contacto" class="cdm-pie__btn is-senal">Pedir presupuesto</a>
          <a href="tel:+34657085019" class="cdm-pie__btn is-linea">Llamar al 657 085 019</a>
        </div>
      </div>
    </section>
  )}

  <section class="cdm-pie__cuerpo">
    <div class="cdm-pie__dentro cdm-pie__cols">
      <div>
        <a href="/" class="cdm-pie__logo">
          <span class="cdm-pie__sello" aria-hidden="true">P★</span>
          <span>Platanito Rico</span>
        </a>
        <p class="cdm-pie__pitch">Diseñamos y construimos productos digitales con presencia. Web, vídeo, identidad y crecimiento, sin plantillas ni atajos.</p>
        <p class="cdm-pie__estado"><span class="cdm-pie__led" aria-hidden="true"></span>Aceptando proyectos en {currentYear}</p>
      </div>

      <nav aria-label="Servicios">
        <h3 class="cdm-pie__titulo">Servicios</h3>
        <ul class="cdm-pie__lista">
          {servicios.map((s) => <li><a href={s.href}>{s.label}</a></li>)}
        </ul>
      </nav>

      <div>
        <h3 class="cdm-pie__titulo">Contacto</h3>
        <ul class="cdm-pie__lista">
          <li><a href="tel:+34657085019">+34 657 085 019</a></li>
          <li><a href="mailto:hola@platanitorico.com">hola@platanitorico.com</a></li>
          <li class="cdm-pie__dato">Vera, Almería</li>
          <li class="cdm-pie__dato">L–V de 9:00 a 19:00</li>
        </ul>
      </div>

      <div>
        <h3 class="cdm-pie__titulo">Capacidades</h3>
        <ul class="cdm-pie__etiquetas">
          {capacidades.map((c) => <li>{c}</li>)}
        </ul>
      </div>
    </div>
  </section>

  <section class="cdm-pie__pueblos">
    <div class="cdm-pie__dentro">
      <div class="cdm-pie__pueblos-cab">
        <div>
          <h3 class="cdm-pie__pueblos-titulo">Diseño web en toda Almería</h3>
          <p class="cdm-pie__dato">{pueblos.length} localidades en {comarcas.length} comarcas</p>
          <a href="/diseno-web/" class="cdm-pie__atlas">Ver todos los municipios con diseño web en Almería</a>
        </div>

        <div class="cdm-pie__selector" id="pueblo-selector">
          <button type="button" id="pueblo-dropdown-btn" class="cdm-pie__selector-btn" aria-expanded="false" aria-haspopup="listbox">
            <span aria-hidden="true">⌖</span>
            <span id="selected-pueblo-text">Busca tu pueblo</span>
            <span id="dropdown-arrow" aria-hidden="true">▾</span>
          </button>

          <div id="pueblo-dropdown-panel" class="cdm-pie__panel" role="listbox">
            <div class="cdm-pie__panel-buscar">
              <input type="text" id="pueblo-search" placeholder="Escribe un pueblo o comarca" class="cdm-pie__input" aria-label="Buscar pueblo o comarca" />
            </div>
            <div class="cdm-pie__panel-lista" id="pueblos-list">
              <div class="cdm-pie__grupo">
                <span class="cdm-pie__grupo-titulo">Destacadas</span>
                {pueblosDestacados.map((pueblo) => (
                  <a href={`/diseno-web/${pueblo.slug}/`} class="pueblo-item cdm-pie__item" data-nombre={pueblo.nombre.toLowerCase()} data-comarca={pueblo.comarca.toLowerCase()}>
                    <span>{pueblo.nombre}</span>
                    <span class="cdm-pie__item-meta">{pueblo.comarca}</span>
                  </a>
                ))}
              </div>
              {comarcas.map((comarca) => {
                const items = getPueblosByComarca(comarca).filter((p) => !p.destacado && esPuebloIndexable(p.slug));
                if (!items.length) return null;
                return (
                  <div class="cdm-pie__grupo comarca-section" data-comarca={comarca.toLowerCase()}>
                    <span class="cdm-pie__grupo-titulo">{comarca}</span>
                    {items.map((pueblo) => (
                      <a href={`/diseno-web/${pueblo.slug}/`} class="pueblo-item cdm-pie__item" data-nombre={pueblo.nombre.toLowerCase()} data-comarca={pueblo.comarca.toLowerCase()}>
                        <span>{pueblo.nombre}</span>
                      </a>
                    ))}
                  </div>
                );
              })}
              <div id="no-results" class="cdm-pie__vacio">
                <p>Sin resultados</p>
                <small>Prueba con otro nombre</small>
              </div>
            </div>
            <div class="cdm-pie__panel-pie">{pueblos.length} pueblos de la provincia de Almería</div>
          </div>
        </div>
      </div>

      <div class="cdm-pie__chips">
        {pueblosDestacados.slice(0, 10).map((pueblo) => <a href={`/diseno-web/${pueblo.slug}/`}>{pueblo.nombre}</a>)}
        <button type="button" id="ver-todos-btn">Ver todos</button>
      </div>
    </div>
  </section>

  <section class="cdm-pie__legal">
    <div class="cdm-pie__dentro cdm-pie__legal-dentro">
      <p>© {currentYear} Platanito Rico. Todos los derechos reservados.</p>
      <ul>
        <li><a href="/privacidad/">Privacidad</a></li>
        <li><a href="/aviso-legal/">Aviso legal</a></li>
        <li><a href="/cookies/">Cookies</a></li>
        <li><a href="/terminos-condiciones/">Términos</a></li>
      </ul>
      <p>Hecho en Almería</p>
    </div>
  </section>

  {/* Cierre animado (Vengeance UI): estrellas de marca en ASCII que se iluminan con el cursor */}
  <div class="cdm-pie__ascii" aria-hidden="true">
    <AnimatedFooter
      client:visible
      headingLines={['Platanito', 'Rico']}
      leftImage="/imagenes/ascii/estrella.png"
      rightImage="/imagenes/ascii/estrella.png"
      background="#070B10"
      textColor="#E6EDF2"
      charColor="#803500"
      hoverColor="#FF5A00"
      hoverCharColor="#070B10"
      columns={56}
      cellSize={14}
      fontSize={12}
    />
  </div>
</footer>

<style>
  .cdm-pie { background: var(--color-cdm-suelo); color: var(--color-cdm-texto); border-top: 1px solid var(--color-cdm-regla); }
  .cdm-pie__dentro { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-gutter); }
  .cdm-pie a:focus-visible,
  .cdm-pie button:focus-visible,
  .cdm-pie input:focus-visible { outline: 2px solid var(--color-cdm-ok); outline-offset: 3px; }

  .cdm-pie__cierre {
    padding-block: clamp(4rem, 8vw, 6.5rem);
    border-bottom: 1px solid var(--color-cdm-regla);
    background-image:
      linear-gradient(var(--color-cdm-regla) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-cdm-regla) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .cdm-pie__coord { margin: 0 0 1rem; font-family: var(--font-mono); font-size: 0.76rem; color: var(--color-cdm-ok); white-space: pre; }
  .cdm-pie__claim {
    margin: 0;
    max-width: 16ch;
    font-family: var(--font-display);
    font-stretch: 82%;
    font-weight: 760;
    font-size: clamp(2.6rem, 7vw, 5.5rem);
    line-height: 0.92;
    letter-spacing: -0.025em;
  }
  .cdm-pie__sub { max-width: 52ch; margin: 1.25rem 0 0; font-size: 1.1rem; line-height: 1.55; color: #b9c5cf; }
  .cdm-pie__acciones { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2rem; }
  .cdm-pie__btn { display: inline-flex; align-items: center; min-height: 3rem; padding: 0.75rem 1.25rem; border: 1px solid; font-weight: 600; text-decoration: none; }
  .cdm-pie__btn.is-senal { background: var(--color-cdm-senal); border-color: var(--color-cdm-senal); color: #120600; }
  .cdm-pie__btn.is-senal:hover { background: #ff7a33; border-color: #ff7a33; }
  .cdm-pie__btn.is-linea { border-color: var(--color-cdm-regla-2); color: var(--color-cdm-texto); }
  .cdm-pie__btn.is-linea:hover { border-color: var(--color-cdm-texto); }

  .cdm-pie__cuerpo { padding-block: 3.5rem; }
  .cdm-pie__cols { display: grid; gap: 2.5rem; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 640px) { .cdm-pie__cols { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .cdm-pie__cols { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; } }
  .cdm-pie__logo { display: inline-flex; align-items: center; gap: 0.6rem; margin-bottom: 1.25rem; color: inherit; text-decoration: none; font-family: var(--font-display); font-weight: 700; font-size: 1.15rem; }
  .cdm-pie__sello { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid var(--color-cdm-senal); color: var(--color-cdm-senal); font-family: var(--font-mono); font-size: 0.8rem; }
  .cdm-pie__pitch { max-width: 34ch; margin: 0 0 1.25rem; font-size: 0.92rem; line-height: 1.55; color: #b9c5cf; }
  .cdm-pie__estado { display: inline-flex; align-items: center; gap: 0.5rem; margin: 0; font-size: 0.85rem; }
  .cdm-pie__led { width: 7px; height: 7px; border-radius: 50%; background: var(--color-cdm-ok); }
  .cdm-pie__titulo { margin: 0 0 1rem; font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; }
  .cdm-pie__lista { display: grid; gap: 0.6rem; margin: 0; padding: 0; list-style: none; font-size: 0.95rem; }
  .cdm-pie__lista a { color: #c9d3db; text-decoration: none; }
  .cdm-pie__lista a:hover { color: var(--color-cdm-texto); text-decoration: underline; }
  .cdm-pie__dato { margin: 0; font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-cdm-tenue); }
  .cdm-pie__etiquetas { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
  .cdm-pie__etiquetas li { padding: 0.25rem 0.55rem; border: 1px solid var(--color-cdm-regla-2); font-size: 0.8rem; color: #c9d3db; }

  .cdm-pie__pueblos { padding-block: 3.5rem; border-top: 1px solid var(--color-cdm-regla); background: var(--color-cdm-panel); }
  .cdm-pie__pueblos-cab { display: grid; gap: 2rem; margin-bottom: 1.5rem; }
  @media (min-width: 1024px) { .cdm-pie__pueblos-cab { grid-template-columns: 1fr auto; align-items: end; } }
  .cdm-pie__pueblos-titulo { margin: 0 0 0.5rem; font-family: var(--font-display); font-stretch: 82%; font-weight: 740; font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 0.95; letter-spacing: -0.02em; }
  .cdm-pie__atlas { display: inline-block; margin-top: 0.75rem; color: var(--color-cdm-texto); font-weight: 600; text-underline-offset: 3px; }
  .cdm-pie__selector { position: relative; width: 100%; max-width: 380px; }
  .cdm-pie__selector-btn { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.75rem; width: 100%; padding: 0.9rem 1.1rem; background: var(--color-cdm-suelo); color: var(--color-cdm-texto); border: 1px solid var(--color-cdm-regla-2); font: inherit; text-align: left; cursor: pointer; }
  .cdm-pie__selector-btn:hover { border-color: var(--color-cdm-texto); }
  #dropdown-arrow { transition: transform 0.25s; }
  .cdm-pie__panel { position: absolute; bottom: calc(100% + 0.5rem); left: 0; right: 0; z-index: 30; max-height: 440px; overflow: hidden; background: var(--color-cdm-suelo); border: 1px solid var(--color-cdm-regla-2); opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity 0.2s, transform 0.2s, visibility 0.2s; }
  .cdm-pie__panel.is-open { opacity: 1; visibility: visible; transform: none; }
  .cdm-pie__panel-buscar { padding: 0.75rem; border-bottom: 1px solid var(--color-cdm-regla); }
  .cdm-pie__input { width: 100%; padding: 0.7rem 0.8rem; background: var(--color-cdm-panel); color: var(--color-cdm-texto); border: 1px solid var(--color-cdm-regla-2); font: inherit; }
  .cdm-pie__input::placeholder { color: var(--color-cdm-tenue); }
  .cdm-pie__panel-lista { max-height: 320px; overflow-y: auto; padding: 0.75rem; }
  .cdm-pie__grupo { margin-bottom: 1rem; }
  .cdm-pie__grupo-titulo { display: block; margin-bottom: 0.4rem; padding-bottom: 0.25rem; border-bottom: 1px solid var(--color-cdm-regla); font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-cdm-tenue); }
  .cdm-pie__item { display: flex; justify-content: space-between; gap: 1rem; padding: 0.5rem; color: var(--color-cdm-texto); text-decoration: none; font-size: 0.92rem; }
  .cdm-pie__item:hover { background: var(--color-cdm-panel-2); }
  .cdm-pie__item-meta { font-size: 0.75rem; color: var(--color-cdm-tenue); }
  .cdm-pie__vacio { display: none; padding: 1.5rem; text-align: center; color: var(--color-cdm-tenue); }
  .cdm-pie__vacio.is-shown { display: block; }
  .cdm-pie__vacio p { margin: 0 0 0.25rem; color: var(--color-cdm-texto); }
  .cdm-pie__panel-pie { padding: 0.6rem 0.75rem; border-top: 1px solid var(--color-cdm-regla); font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-cdm-tenue); text-align: center; }
  .cdm-pie__chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .cdm-pie__chips a,
  .cdm-pie__chips button { padding: 0.35rem 0.7rem; background: transparent; color: #c9d3db; border: 1px solid var(--color-cdm-regla-2); font: inherit; font-size: 0.85rem; text-decoration: none; cursor: pointer; }
  .cdm-pie__chips a:hover,
  .cdm-pie__chips button:hover { color: var(--color-cdm-texto); border-color: var(--color-cdm-texto); }

  .cdm-pie__legal { padding-block: 1.1rem; border-top: 1px solid var(--color-cdm-regla); font-size: 0.82rem; color: var(--color-cdm-tenue); }
  .cdm-pie__legal-dentro { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; }
  .cdm-pie__legal p { margin: 0; }
  .cdm-pie__legal ul { display: flex; flex-wrap: wrap; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }
  .cdm-pie__legal a { color: #c9d3db; }
  .cdm-pie__legal a:hover { color: var(--color-cdm-texto); }
  .cdm-pie__ascii { height: clamp(260px, 34vw, 480px); background: var(--color-cdm-suelo); }
  @media (prefers-reduced-motion: reduce) {
    .cdm-pie__panel,
    #dropdown-arrow { transition: none; }
  }
</style>

<script>
  const dropdownBtn = document.getElementById('pueblo-dropdown-btn');
  const dropdownPanel = document.getElementById('pueblo-dropdown-panel');
  const dropdownArrow = document.getElementById('dropdown-arrow');
  const searchInput = document.getElementById('pueblo-search') as HTMLInputElement | null;
  const puebloItems = document.querySelectorAll('.pueblo-item');
  const comarcaSections = document.querySelectorAll('.comarca-section');
  const noResults = document.getElementById('no-results');

  let isOpen = false;

  function setOpen(open: boolean) {
    isOpen = open;
    dropdownPanel?.classList.toggle('is-open', open);
    dropdownBtn?.setAttribute('aria-expanded', String(open));
    if (dropdownArrow) dropdownArrow.style.transform = open ? 'rotate(180deg)' : '';
    if (open) setTimeout(() => searchInput?.focus(), 100);
  }

  dropdownBtn?.addEventListener('click', () => setOpen(!isOpen));

  document.getElementById('ver-todos-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(true);
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('#pueblo-selector')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  searchInput?.addEventListener('input', (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.toLowerCase().trim();
    let hasResults = false;

    puebloItems.forEach((item) => {
      const nombre = item.getAttribute('data-nombre') || '';
      const comarca = item.getAttribute('data-comarca') || '';
      const matches = nombre.includes(searchTerm) || comarca.includes(searchTerm);
      (item as HTMLElement).style.display = matches ? '' : 'none';
      if (matches) hasResults = true;
    });

    comarcaSections.forEach((section) => {
      const visibleItems = section.querySelectorAll('.pueblo-item:not([style*="display: none"])');
      (section as HTMLElement).style.display = visibleItems.length > 0 ? '' : 'none';
    });

    noResults?.classList.toggle('is-shown', !hasResults);
  });
</script>
```

- [ ] **Step 2: Verificar**

Run: `npm run check && npm run lint && npm run build && npm run audit:seo -- --sin-peso`
Expected: 0 errores y `[seo] Sin errores.` (el footer está fuera de `<main>`).

En Playwright, con `http://127.0.0.1:4330/vera-ai/` a 1440 px: haz scroll al footer, pulsa `#pueblo-dropdown-btn`, escribe `moj` en `#pueblo-search` y comprueba con `document.querySelectorAll('.pueblo-item:not([style*="display: none"])').length` que queda al menos 1 resultado. Guarda la captura en `/home/jorge/Documentos/platanito/.playwright-mcp/cdm-t8-footer.png`.

---

### Task 9: Portada consola en la home

**Files:**
- Create: `src/components/cdm/PortadaConsola.astro`
- Modify: `src/pages/index.astro`: imports (líneas 7-13), bloque `<HeroVengeance … />` (líneas 216-229), script inline `ho-js` (línea 209) y el `<script>` de revelado y contadores (líneas 813-870).

**Interfaces:**
- Consumes: `Consola`, `Boton`, `RadarCobertura`, `WebsMedidas`, `RegistroDemo`, `Telemetria`, tipos `Cifra`, `LineaRegistro` y `Enlace` (Tasks 5-6); `CIFRAS` y `aniosEnAlmeria` (Task 3).
- Produces: `<PortadaConsola prompt h1Lineas frases h2 primario secundario confianza registro cifras />`. `frases` debe tener exactamente 4 elementos (la animación está calculada para 4). Emite un único `<h1>` y el `<h2>` con el texto de la prop `h2`, que es el primer H2 de `<main>`. La constante `registroPlan360` queda en la home para reutilizarla en Task 10.

- [ ] **Step 1: Crear `PortadaConsola.astro`**

```astro
---
/* Portada del centro de mando. El H1, el H2 y los botones se pintan desde el
   primer momento (son el LCP); solo los paneles de la derecha se encienden en
   el arranque, que ocurre una vez por visita. */
import Consola from './Consola.astro';
import Boton from './Boton.astro';
import RadarCobertura from './RadarCobertura.astro';
import WebsMedidas from './WebsMedidas.astro';
import RegistroDemo from './RegistroDemo.astro';
import Telemetria from './Telemetria.astro';
import type { Cifra, Enlace, LineaRegistro } from './tipos';

interface Props {
  prompt: string;
  h1Lineas: string[];
  frases: string[];
  h2: string;
  primario: Enlace;
  secundario: Enlace;
  confianza: { valor: string; texto: string }[];
  registro: LineaRegistro[];
  cifras: Cifra[];
}

const { prompt, h1Lineas, frases, h2, primario, secundario, confianza, registro, cifras } = Astro.props;
if (frases.length !== 4) throw new Error('PortadaConsola: `frases` necesita 4 elementos; la animación está calculada para 4.');
const ultima = h1Lineas.length - 1;
---

<Consola escaner class="cdm-portada" aria-labelledby="cdm-portada-h1">
  <div class="cdm-portada__rejilla">
    <div>
      <p class="cdm-portada__prompt cdm-enciende" style="--cdm-retardo: 0.9s"><span aria-hidden="true">&gt; </span>{prompt}</p>
      <h1 id="cdm-portada-h1" class="cdm-portada__h1">
        {h1Lineas.map((linea, i) => (
          <span class="cdm-portada__linea">{linea}{i === ultima && <span class="cdm-portada__cursor" aria-hidden="true"></span>}</span>
        ))}
      </h1>
      <p class="cdm-portada__frases" aria-hidden="true">
        <span class="cdm-portada__carril">{[...frases, frases[0]].map((f) => <span>{f}</span>)}</span>
      </p>
      <h2 class="cdm-portada__h2">{h2}</h2>
      <div class="cdm-portada__acciones">
        <Boton href={primario.href}>{primario.label}</Boton>
        <Boton href={secundario.href} variante="linea">{secundario.label}</Boton>
      </div>
      <ul class="cdm-portada__confianza">
        {confianza.map((c) => <li><strong>{c.valor}</strong> {c.texto}</li>)}
      </ul>
    </div>

    <div class="cdm-portada__paneles">
      <RadarCobertura class="cdm-enciende cdm-portada__radar" />
      <div class="cdm-portada__dos">
        <WebsMedidas class="cdm-enciende cdm-portada__medidas" />
        <RegistroDemo lineas={registro} class="cdm-enciende cdm-portada__registro" />
      </div>
    </div>
  </div>

  <Telemetria cifras={cifras} />
</Consola>

<style>
  .cdm-portada__rejilla {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
    max-width: var(--container-max);
    margin-inline: auto;
    padding: clamp(2rem, 5vw, 3.5rem) var(--container-gutter) 2.5rem;
  }
  @media (min-width: 1100px) {
    .cdm-portada__rejilla { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 2.5rem; align-items: start; }
  }
  .cdm-portada__prompt { margin: 0 0 1.25rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-cdm-ok); }
  .cdm-portada__prompt span { color: var(--color-cdm-tenue); }
  .cdm-portada__h1 {
    margin: 0;
    font-family: var(--font-display);
    font-stretch: 82%;
    font-weight: 760;
    font-size: clamp(3.1rem, 7.2vw, 5.9rem);
    line-height: 0.92;
    letter-spacing: -0.025em;
    color: var(--color-cdm-texto);
  }
  .cdm-portada__linea { display: block; }
  .cdm-portada__cursor {
    display: inline-block;
    width: 0.42em;
    height: 0.74em;
    margin-left: 0.1em;
    vertical-align: -0.04em;
    background: var(--color-cdm-senal);
  }
  .cdm-portada__frases {
    height: 1.1em;
    margin: 0.9rem 0 1.25rem;
    overflow: hidden;
    font-family: var(--font-display);
    font-stretch: 82%;
    font-weight: 500;
    font-size: clamp(1.9rem, 3.6vw, 3rem);
    line-height: 1.1;
    color: var(--color-cdm-tenue);
  }
  .cdm-portada__carril { display: flex; flex-direction: column; }
  .cdm-portada__carril span { height: 1.1em; line-height: 1.1em; }
  .cdm-portada__h2 {
    max-width: 46ch;
    margin: 0 0 1.75rem;
    font-family: var(--font-body);
    font-weight: 400;
    font-size: clamp(1.05rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    letter-spacing: 0;
    color: #b9c5cf;
  }
  .cdm-portada__acciones { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .cdm-portada__confianza { display: flex; flex-wrap: wrap; gap: 0.5rem 1.4rem; margin: 1.75rem 0 0; padding: 0; list-style: none; font-size: 0.88rem; color: var(--color-cdm-tenue); }
  .cdm-portada__confianza strong { font-weight: 600; color: var(--color-cdm-texto); }
  .cdm-portada__paneles { display: grid; gap: 0.9rem; }
  .cdm-portada__dos { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.9rem; }
  @media (min-width: 640px) { .cdm-portada__dos { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .cdm-portada__radar { --cdm-retardo: 1.4s; }
  .cdm-portada__medidas { --cdm-retardo: 1.6s; }
  .cdm-portada__registro { --cdm-retardo: 1.75s; }
  @media (prefers-reduced-motion: no-preference) {
    .cdm-portada__cursor { animation: cdm-parpadeo 1.1s steps(1) infinite; }
    .cdm-portada__carril { animation: cdm-frases 12s cubic-bezier(0.7, 0, 0.3, 1) infinite; }
  }
  @keyframes cdm-parpadeo { 50% { opacity: 0; } }
  @keyframes cdm-frases {
    0%, 20% { transform: translateY(0); }
    25%, 45% { transform: translateY(-1.1em); }
    50%, 70% { transform: translateY(-2.2em); }
    75%, 95% { transform: translateY(-3.3em); }
    100% { transform: translateY(-4.4em); }
  }
</style>
```

- [ ] **Step 2: Montarla en la home**

En `src/pages/index.astro`, sustituir el import:

```ts
import HeroVengeance from '../components/vg/HeroVengeance.astro';
```

por:

```ts
import PortadaConsola from '../components/cdm/PortadaConsola.astro';
import type { LineaRegistro } from '../components/cdm/tipos';
import { CIFRAS, aniosEnAlmeria } from '../data/negocio';
```

Después del array `faqHome` (antes del `---` que cierra el frontmatter), añadir:

```ts

// Registro simulado del Plan 360 (portada y precios). Siempre en un panel «demo».
const registroPlan360: LineaRegistro[] = [
  { hora: '09:41', texto: 'Copia del servidor completada, 128 GB', estado: 'ok' },
  { hora: '09:44', texto: 'Parches instalados en 8 de 10 puestos' },
  { hora: '09:46', texto: 'Disco de recepción al 91 %', estado: 'aviso' },
  { hora: '09:47', texto: 'Ticket 0412, impresora de recepción', estado: 'ok' },
  { hora: '09:49', texto: 'Certificado de la web renovado', estado: 'ok' },
  { hora: '09:50', texto: 'Técnico en camino a Garrucha' },
];
```

Sustituir el bloque completo `<HeroVengeance … />` (desde `<HeroVengeance` hasta su `/>`, líneas 216-229) y el comentario de tres líneas que lo precede (`HERO — VENGEANCE UI + SVG DE MARCA (oscuro)`) por:

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* PORTADA — CENTRO DE MANDO                         */}
    {/* ════════════════════════════════════════════════ */}
    <PortadaConsola
      prompt="Diseño web y sistemas IT para empresas de Almería"
      h1Lineas={['Diseño web', 'en Almería']}
      frases={['que vende.', 'que posiciona.', 'que impacta.', 'sin plantillas.']}
      h2="Webs, sistemas informáticos y vídeo con dron que hacen vender a tu empresa"
      primario={{ href: '/contacto/?servicio=web#contacto', label: 'Pedir presupuesto' }}
      secundario={{ href: plan360.href, label: 'Ver el Plan 360' }}
      confianza={[
        { valor: String(CIFRAS.valoracion).replace('.', ','), texto: `en ${CIFRAS.numResenas} reseñas` },
        { valor: `< ${CIFRAS.respuestaHoras} h`, texto: 'de respuesta' },
        { valor: 'Sin permanencia', texto: 'en el Plan 360' },
      ]}
      registro={registroPlan360}
      cifras={[
        { valor: CIFRAS.websEntregadas, prefijo: '+', etiqueta: 'webs entregadas' },
        { valor: aniosEnAlmeria(), sufijo: ' años', etiqueta: 'trabajando en Almería' },
        { valor: CIFRAS.respuestaHoras, prefijo: '< ', sufijo: ' h', etiqueta: 'de respuesta a una incidencia' },
        { valor: 400, sufijo: ' €', etiqueta: 'al mes el Plan 360, + IVA' },
      ]}
    />
```

Borrar la línea del script de revelado (el comentario de encima incluido):

```astro
  {/* Activa reveal/animaciones solo si hay JS (fallback: todo visible) */}
  <script is:inline>document.documentElement.classList.add('ho-js');</script>
```

Borrar el bloque `<script>` completo que empieza en `// ✦ Contadores animados + scroll reveal de la home` y termina en su `</script>`, justo antes de `<style>` (líneas 813-870). Sin la clase `ho-js`, el CSS antiguo deja visibles todas las tarjetas. El «revelado al hacer scroll» desaparece a propósito: el spec pide un único momento de arranque.

- [ ] **Step 3: Build y auditoría**

Run: `npm run check && npm run lint && npm run build && npm run audit:seo -- --sin-peso`
Expected: 0 errores y `[seo] Sin errores.` Si falla `h2Primero` en `/`, compara el texto con el que anotaste en Task 1, Step 6, y corrige la prop `h2`, nunca la base.

- [ ] **Step 4: Comprobación visual y de comportamiento**

En Playwright, con el servidor local en 4330:

```js
async (page) => {
  const salida = '/home/jorge/Documentos/platanito/.playwright-mcp';
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4330/', { waitUntil: 'networkidle' });
  const h1Visible = await page.evaluate(() => getComputedStyle(document.querySelector('h1')).opacity);
  await page.waitForTimeout(4500);
  await page.screenshot({ path: `${salida}/cdm-t9-portada-1440.png` });
  const primera = await page.evaluate(() => document.documentElement.dataset.cdmArranque ?? 'sin marcar');
  await page.reload({ waitUntil: 'networkidle' });
  const segunda = await page.evaluate(() => document.documentElement.dataset.cdmArranque ?? 'sin marcar');
  const demos = await page.evaluate(() => ({
    paneles: document.querySelectorAll('[data-panel="demo"]').length,
    etiquetas: document.querySelectorAll('[data-panel-etiqueta="demo"]').length,
    cifras: [...document.querySelectorAll('[data-cuenta]')].map((e) => e.textContent),
  }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: `${salida}/cdm-t9-portada-390.png`, fullPage: false });
  const desborde = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  return { h1Visible, primera, segunda, demos, desborde };
}
```

Expected: `h1Visible: '1'`, `primera: 'sin marcar'`, `segunda: 'hecho'`, `paneles` igual a `etiquetas` (1), `cifras: ['+50', '8 años', '< 4 h', '400 €']` y `desborde: false`.

Revisa las dos capturas:
- H1 condensado con el cursor naranja.
- El radar con la costa a la derecha y Vera en naranja.
- El panel de medidas con valores reales o «sin medida».
- El registro con marco discontinuo.
- La franja de cifras abajo.

Ningún texto debe pisar a otro.

---

### Task 10: Precios en consola

**Files:**
- Create: `src/components/cdm/PreciosConsola.astro`
- Modify: `src/pages/index.astro`: import de `PreciosVengeance` (línea 8), import de `Tarifa` (línea 12), tipo de `tarifas` y bloque `<PreciosVengeance … />`.

**Interfaces:**
- Consumes: `Consola`, `RegistroDemo`, tipos `TarifaCdm` y `LineaRegistro` (Task 5); `registroPlan360` de la home (Task 9); clases globales `.cdm-dentro` y `.cdm-cabecera*` (Task 5).
- Produces: `<PreciosConsola h2 lead tarifas registro />`, que emite `<section id="precios">`.

- [ ] **Step 1: Crear `PreciosConsola.astro`**

```astro
---
/* Precios de entrada: tres fichas y, debajo, qué hace el Plan 360 cada día
   con su panel demo. El H2 conserva la palabra clave de la home actual. */
import Consola from './Consola.astro';
import RegistroDemo from './RegistroDemo.astro';
import type { LineaRegistro, TarifaCdm } from './tipos';

interface Props {
  h2: string;
  lead: string;
  tarifas: TarifaCdm[];
  registro: LineaRegistro[];
}

const { h2, lead, tarifas, registro } = Astro.props;
---

<Consola id="precios" class="cdm-precios" aria-labelledby="cdm-precios-h2">
  <div class="cdm-dentro">
    <header class="cdm-cabecera">
      <h2 id="cdm-precios-h2" class="cdm-cabecera__h2">{h2}</h2>
      <p class="cdm-cabecera__lead">{lead}</p>
    </header>

    <ul class="cdm-precios__lista">
      {tarifas.map((t) => (
        <li class:list={['cdm-precios__tarifa', { 'is-destacada': t.destacada }]}>
          <p class="cdm-precios__servicio">{t.servicio}</p>
          <p class="cdm-precios__precio"><span class="cdm-precios__desde">desde</span> {t.desde}</p>
          <p class="cdm-precios__nota">{t.nota}</p>
          <ul class="cdm-precios__incluye">
            {t.incluye.map((item) => <li>{item}</li>)}
          </ul>
          <a href={t.href} class:list={['cdm-precios__cta', t.destacada ? 'is-senal' : 'is-linea']}>{t.cta}</a>
        </li>
      ))}
    </ul>

    <div class="cdm-precios__plan">
      <div>
        <h3 class="cdm-precios__plan-titulo">Qué pasa cada día con el Plan 360</h3>
        <p class="cdm-precios__plan-texto">Vigilamos tus equipos, la red, las copias y la web. Cuando algo falla lo ves en tu panel, y un técnico lo resuelve en remoto o en tu local el mismo día.</p>
      </div>
      <RegistroDemo lineas={registro} titulo="Panel del Plan 360" />
    </div>
  </div>
</Consola>

<style>
  .cdm-precios__lista { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin: 0; padding: 0; list-style: none; }
  @media (min-width: 900px) { .cdm-precios__lista { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .cdm-precios__tarifa { display: flex; flex-direction: column; padding: 1.4rem; background: rgb(12 19 26 / 0.92); border: 1px solid var(--color-cdm-regla-2); }
  .cdm-precios__tarifa.is-destacada { border-color: var(--color-cdm-senal); box-shadow: 0 0 0 1px var(--color-cdm-senal); }
  .cdm-precios__servicio { margin: 0; font-weight: 600; color: var(--color-cdm-texto); }
  .cdm-precios__precio {
    margin: 0.6rem 0 0.2rem;
    font-family: var(--font-display);
    font-stretch: 82%;
    font-weight: 740;
    font-size: clamp(2.3rem, 4vw, 3rem);
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--color-cdm-texto);
  }
  .cdm-precios__desde { font-family: var(--font-body); font-stretch: 100%; font-weight: 400; font-size: 0.9rem; letter-spacing: 0; color: var(--color-cdm-tenue); }
  .cdm-precios__nota { margin: 0 0 1.1rem; font-size: 0.85rem; color: var(--color-cdm-tenue); }
  .cdm-precios__incluye { display: grid; gap: 0.5rem; margin: 0 0 1.4rem; padding: 0; list-style: none; font-size: 0.92rem; color: #c3ced7; }
  .cdm-precios__incluye li { position: relative; padding-left: 1.1rem; }
  .cdm-precios__incluye li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 0.45rem; height: 1px; background: var(--color-cdm-tenue); }
  .cdm-precios__cta { display: flex; justify-content: center; margin-top: auto; padding: 0.75rem 1rem; border: 1px solid; font-weight: 600; text-decoration: none; }
  .cdm-precios__cta.is-senal { background: var(--color-cdm-senal); border-color: var(--color-cdm-senal); color: #120600; }
  .cdm-precios__cta.is-senal:hover { background: #ff7a33; border-color: #ff7a33; }
  .cdm-precios__cta.is-linea { border-color: var(--color-cdm-regla-2); color: var(--color-cdm-texto); }
  .cdm-precios__cta.is-linea:hover { border-color: var(--color-cdm-texto); }
  .cdm-precios__cta:focus-visible { outline: 2px solid var(--color-cdm-ok); outline-offset: 3px; }
  .cdm-precios__plan { display: grid; gap: 1.5rem; align-items: center; margin-top: 2.5rem; }
  @media (min-width: 900px) { .cdm-precios__plan { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); } }
  .cdm-precios__plan-titulo { margin: 0 0 0.6rem; font-family: var(--font-display); font-stretch: 82%; font-weight: 700; font-size: 1.8rem; line-height: 1.05; }
  .cdm-precios__plan-texto { max-width: 46ch; margin: 0; line-height: 1.6; color: #b9c5cf; }
</style>
```

- [ ] **Step 2: Montarla en la home**

En `src/pages/index.astro`:

Sustituir `import PreciosVengeance from '../components/vg/PreciosVengeance.astro';` por:

```ts
import PreciosConsola from '../components/cdm/PreciosConsola.astro';
```

Sustituir `import type { Tarifa } from '../components/brutal/types';` por nada (borrar la línea) y cambiar el import de tipos de Task 9 a:

```ts
import type { LineaRegistro, TarifaCdm } from '../components/cdm/tipos';
```

Sustituir `const tarifas: Tarifa[] = [` por `const tarifas: TarifaCdm[] = [`.

Sustituir el bloque `<PreciosVengeance … />` completo por:

```astro
    <PreciosConsola
      h2="Precios de páginas web y del Plan 360 en Almería"
      lead="Precio de partida claro y presupuesto cerrado por escrito. Web, tienda online o tu tecnología completa por una cuota fija."
      tarifas={tarifas}
      registro={registroPlan360}
    />
```

- [ ] **Step 3: Verificar**

Run: `npm run check && npm run lint && npm run build && npm run audit:seo -- --sin-peso`
Expected: 0 errores y `[seo] Sin errores.`

En Playwright a 1440 px, en `http://127.0.0.1:4330/#precios`, captura en `/home/jorge/Documentos/platanito/.playwright-mcp/cdm-t10-precios-1440.png`. Comprueba:
- Tres fichas; la del Plan 360 con borde naranja.
- Debajo, el texto y el panel demo.
- `document.querySelectorAll('[data-panel="demo"]').length === document.querySelectorAll('[data-panel-etiqueta="demo"]').length`, que debe dar 2 y 2.

---

### Task 11: Home en oscuro (razones, servicios, soluciones y proceso)

**Files:**
- Modify: `src/styles/global.css` (añadir `.cdm-seccion` a la capa del centro de mando)
- Modify: `src/pages/index.astro`: `<main>`, secciones «RAZONES», «SERVICIOS», «SOLUCIONES POR PERFIL» y «PROCESO», y un segundo bloque `<style>` al final del archivo.

**Interfaces:**
- Consumes: `.cdm-dentro` y `.cdm-cabecera*` (Task 5); `aniosEnAlmeria` (Task 3).
- Produces: clase global `.cdm-seccion` (sección oscura lisa con `.dark`); clases `h-tinta--{green|red|blue|magenta|woo|gold|accent|navy}` para los iconos a mano; segundo `<style>` de la home, donde Tasks 12 y 13 añaden reglas.

Regla de esta tarea y las dos siguientes: los SVG hechos a mano de servicios (7 bloques `{s.icon === …}`), soluciones (3 bloques) y tecnología (8 bloques `{t.id === …}`) se **mueven sin tocar ni un carácter**. Sobre oscuro van dentro de una ficha clara `#F5F1EA`, con el mismo `currentColor` que tenían.

- [ ] **Step 1: Contar los SVG a mano antes de tocar nada**

Run: `grep -c "{s.icon === \|{t.id === " src/pages/index.astro`
Expected: `18`. Anótalo: al final de Task 13 debe seguir dando 18.

- [ ] **Step 2: Capa `.cdm-seccion`**

Añadir al final de `src/styles/global.css`:

```css
.cdm-seccion {
  background: var(--color-cdm-suelo);
  color: var(--color-cdm-texto);
  border-top: 1px solid var(--color-cdm-regla);
}
.cdm-seccion a:focus-visible { outline: 2px solid var(--color-cdm-ok); outline-offset: 3px; }
```

- [ ] **Step 3: `<main>` de la home**

Sustituir `<main id="main-content" class="ho">` por `<main id="main-content" class="cdm-home">`.

- [ ] **Step 4: Razones**

Sustituir la sección completa que empieza en el comentario `{/* RAZONES — POR QUÉ NOSOTROS */}` (incluidas sus dos líneas de marco) y termina en su `</section>` por:

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* POR QUÉ NOSOTROS                                  */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" aria-labelledby="h2-razones">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-razones" class="cdm-cabecera__h2">Por qué somos la agencia web del Levante almeriense.</h2>
          <p class="cdm-cabecera__lead">
            En {aniosEnAlmeria()} años en Almería hemos aprendido qué <strong>importa de verdad</strong> cuando contratas un equipo digital. Esto es lo que ofrecemos, y lo que no toleramos.
          </p>
        </header>
        <ul class="h-razones">
          {razones.map((r) => (
            <li class="h-razones__item">
              <h3 class="h-razones__t">{r.t}</h3>
              <p class="h-razones__s">{r.s}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
```

- [ ] **Step 5: Servicios**

Pega el bloque de abajo justo **antes** de la sección que empieza en `{/* SERVICIOS — BENTO 6-UP */}`. Luego **corta** las siete líneas que empiezan por `{s.icon === 'web'`, `{s.icon === 'cam'`, `{s.icon === 'mkt'`, `{s.icon === 'art'`, `{s.icon === 'cart'`, `{s.icon === 'shield'` y `{s.icon === 'it'` del bloque antiguo y pégalas en lugar de la línea `{/* ICONOS-SERVICIOS */}`. Por último borra la sección antigua completa (desde su comentario hasta su `</section>`):

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* SERVICIOS                                         */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" id="servicios" aria-labelledby="h2-servicios">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-servicios" class="cdm-cabecera__h2">Diseño web, sistemas IT y vídeo aéreo bajo el mismo techo.</h2>
          <p class="cdm-cabecera__lead">
            Diseño web, sistemas IT, audiovisual, marketing, identidad y mantenimiento. Hechos por el <strong>mismo equipo bajo el mismo techo</strong>, sin descoordinación ni «te derivamos al freelance X».
          </p>
        </header>
        <ul class="h-modulos">
          {servicios.map((s) => (
            <li>
              <a href={s.href} class="h-modulo">
                <span class={`h-modulo__icono h-tinta--${s.color}`} aria-hidden="true">
                  {/* ICONOS-SERVICIOS */}
                </span>
                <span class="h-modulo__sub">{s.sub}</span>
                <h3 class="h-modulo__titulo">{s.title}</h3>
                <p class="h-modulo__desc">{s.desc}</p>
                <span class="h-modulo__dato"><strong>{s.metric}</strong> {s.metricLbl}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
```

- [ ] **Step 6: Soluciones**

Pega el bloque de abajo justo **antes** de la sección que empieza en `{/* SOLUCIONES POR PERFIL */}`. Luego **corta** los tres bloques `{s.icon === 'rocket' && (…)}`, `{s.icon === 'building' && (…)}` y `{s.icon === 'cart' && (…)}` (cada uno desde su `{s.icon ===` hasta su `)}`) del bloque antiguo y pégalos en lugar de `{/* ICONOS-SOLUCIONES */}`. Por último borra la sección antigua completa (el nuevo bloque reutiliza el mismo comentario de cabecera, así que borra la **segunda** aparición):

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* SOLUCIONES POR PERFIL                             */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" aria-labelledby="h2-soluciones">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-soluciones" class="cdm-cabecera__h2">Soluciones de diseño web para cada tipo de negocio.</h2>
          <p class="cdm-cabecera__lead">
            Cada perfil tiene necesidades distintas. Estos son nuestros <strong>3 packs principales</strong> con todo lo que incluyen, precios cerrados y plazos de entrega claros.
          </p>
        </header>
        <ul class="h-packs">
          {soluciones.map((s) => (
            <li>
              <a href={s.href} class="h-pack">
                <span class={`h-pack__icono h-tinta--${s.color}`} aria-hidden="true">
                  {/* ICONOS-SOLUCIONES */}
                </span>
                <span class="h-pack__precio">{s.price}</span>
                <h3 class="h-pack__nombre">{s.name}</h3>
                <span class="h-pack__sub">{s.sub}</span>
                <p class="h-pack__desc">{s.desc}</p>
                <span class="h-pack__cta">Ver pack completo</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
```

- [ ] **Step 7: Proceso**

Sustituir la sección completa que empieza en `{/* PROCESO — 5 PASOS */}` y termina en su `</section>` por:

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* PROCESO (secuencia real: numerada)                */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" aria-labelledby="h2-proceso">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-proceso" class="cdm-cabecera__h2">Cómo hacemos tu página web.</h2>
          <p class="cdm-cabecera__lead">
            Cinco fases bien definidas, cada una con entregables claros, fecha y tu aprobación antes de avanzar. <strong>Sin sorpresas.</strong>
          </p>
        </header>
        <ol class="h-proceso">
          {proceso.map((p) => (
            <li class="h-proceso__paso">
              <span class="h-proceso__num">{p.num}</span>
              <h3 class="h-proceso__t">{p.t}</h3>
              <p class="h-proceso__body">{p.body}</p>
              <span class="h-proceso__eta">{p.eta}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
```

- [ ] **Step 8: Segundo bloque de estilos**

Añadir al final de `src/pages/index.astro`, después del `</style>` existente:

```astro

<style>
  /* ═══ CENTRO DE MANDO: secciones de la home ═══ */
  .cdm-home { background: var(--color-cdm-suelo); }

  /* Ficha clara para los iconos hechos a mano: conservan su color */
  .h-tinta--green { color: #00b85c; }
  .h-tinta--red { color: #dc1b2c; }
  .h-tinta--blue { color: #003b7a; }
  .h-tinta--magenta { color: #ff2d9a; }
  .h-tinta--woo { color: #7f54b3; }
  .h-tinta--gold { color: #c9a24f; }
  .h-tinta--accent { color: #ae3f13; }
  .h-tinta--navy { color: #003b7a; }

  .h-razones {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
    background: var(--color-cdm-regla);
    border: 1px solid var(--color-cdm-regla);
  }
  @media (min-width: 768px) { .h-razones { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1200px) { .h-razones { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .h-razones__item { padding: 1.5rem; background: var(--color-cdm-suelo); }
  .h-razones__t { margin: 0 0 0.6rem; font-family: var(--font-display); font-stretch: 82%; font-weight: 700; font-size: 1.45rem; line-height: 1.05; }
  .h-razones__s { margin: 0; font-size: 0.95rem; line-height: 1.6; color: #b9c5cf; }

  .h-modulos { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin: 0; padding: 0; list-style: none; }
  @media (min-width: 700px) { .h-modulos { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1100px) { .h-modulos { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .h-modulo { display: flex; flex-direction: column; height: 100%; padding: 1.4rem; background: var(--color-cdm-panel); border: 1px solid var(--color-cdm-regla-2); color: inherit; text-decoration: none; transition: border-color 0.15s; }
  .h-modulo:hover { border-color: var(--color-cdm-texto); }
  .h-modulo__icono { display: block; width: 72px; height: 72px; margin-bottom: 1.1rem; padding: 6px; background: #f5f1ea; }
  .h-modulo__icono svg { display: block; width: 100%; height: 100%; }
  .h-modulo__sub { font-size: 0.8rem; color: var(--color-cdm-tenue); }
  .h-modulo__titulo { margin: 0.25rem 0 0.6rem; font-family: var(--font-display); font-stretch: 82%; font-weight: 740; font-size: 1.9rem; line-height: 1; letter-spacing: -0.02em; }
  .h-modulo__desc { margin: 0 0 1.2rem; font-size: 0.95rem; line-height: 1.55; color: #b9c5cf; }
  .h-modulo__dato { margin-top: auto; padding-top: 0.8rem; border-top: 1px solid var(--color-cdm-regla); font-size: 0.85rem; color: var(--color-cdm-tenue); }
  .h-modulo__dato strong { font-weight: 600; color: var(--color-cdm-texto); }

  .h-packs { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin: 0; padding: 0; list-style: none; }
  @media (min-width: 900px) { .h-packs { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .h-pack { display: flex; flex-direction: column; height: 100%; padding: 1.4rem; background: var(--color-cdm-panel); border: 1px solid var(--color-cdm-regla-2); color: inherit; text-decoration: none; transition: border-color 0.15s; }
  .h-pack:hover { border-color: var(--color-cdm-texto); }
  .h-pack__icono { display: block; width: 88px; height: 88px; margin-bottom: 1rem; padding: 6px; background: #f5f1ea; }
  .h-pack__icono svg { display: block; width: 100%; height: 100%; }
  .h-pack__precio { font-weight: 600; color: var(--color-cdm-texto); }
  .h-pack__nombre { margin: 0.3rem 0 0.15rem; font-family: var(--font-display); font-stretch: 82%; font-weight: 740; font-size: 2rem; line-height: 1; letter-spacing: -0.02em; }
  .h-pack__sub { font-size: 0.85rem; color: var(--color-cdm-tenue); }
  .h-pack__desc { margin: 0.8rem 0 1.2rem; font-size: 0.95rem; line-height: 1.55; color: #b9c5cf; }
  .h-pack__cta { margin-top: auto; font-weight: 600; text-decoration: underline; text-decoration-color: var(--color-cdm-senal); text-underline-offset: 4px; }

  .h-proceso { display: grid; margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--color-cdm-regla); }
  .h-proceso__paso { display: grid; grid-template-columns: 3rem minmax(0, 1fr); gap: 0.2rem 1rem; padding: 1.25rem 0; border-bottom: 1px solid var(--color-cdm-regla); }
  .h-proceso__num { grid-row: span 3; font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-cdm-tenue); }
  .h-proceso__t { margin: 0; font-family: var(--font-display); font-stretch: 82%; font-weight: 700; font-size: 1.5rem; line-height: 1.05; }
  .h-proceso__body { margin: 0.4rem 0; font-size: 0.92rem; line-height: 1.55; color: #b9c5cf; }
  .h-proceso__eta { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-cdm-tenue); }
  @media (min-width: 1000px) {
    .h-proceso { grid-template-columns: repeat(5, minmax(0, 1fr)); border-top: 0; }
    .h-proceso__paso { grid-template-columns: minmax(0, 1fr); padding: 1.25rem 1.1rem 1.5rem 0; border-bottom: 0; border-top: 2px solid var(--color-cdm-regla-2); }
    .h-proceso__num { grid-row: auto; }
  }
</style>
```

- [ ] **Step 9: Verificar**

Run: `grep -c "{s.icon === \|{t.id === " src/pages/index.astro`
Expected: `18`.

Run: `npm run check && npm run lint && npm run build && npm run audit:seo -- --sin-peso`
Expected: 0 errores y `[seo] Sin errores.`

En Playwright a 1440 px y 390 px, captura `#servicios` y la sección siguiente en `/home/jorge/Documentos/platanito/.playwright-mcp/cdm-t11-servicios-1440.png` y `cdm-t11-servicios-390.png`. Comprueba que los 6 iconos se ven con sus colores sobre la ficha clara, que `document.documentElement.scrollWidth <= window.innerWidth` en 390 px y que ningún texto pisa a otro.

---

### Task 12: Home en oscuro (portfolio con medidas, opiniones y tecnología)

**Files:**
- Modify: `src/pages/index.astro`: frontmatter y secciones «PORTFOLIO / CASOS REALES», «TESTIMONIOS» y «STACK TECNOLÓGICO con SVGs CUSTOM», más reglas en el segundo `<style>`.

**Interfaces:**
- Consumes: `medidas.json`, `medidasSchema` y `fechaCorta` (Task 4); `casos` (alias de `proyectos`, Task 3); `CIFRAS` (Task 3); `PerspectiveCarousel` y `TestimonialsCard`, sin cambios.
- Produces: `casosMedidos` (proyectos con `lighthouse: number | null`) y `notaMedidas` en el frontmatter. La franja «50+ / 99/100 / <1 s / 100 %» desaparece: no tiene respaldo y la sustituyen las medidas reales (spec §6.1.4).

- [ ] **Step 1: Frontmatter**

Después de `import { proyectos as casos } from '../data/proyectos';` añadir:

```ts
import medidasJson from '../data/medidas.json';
import { fechaCorta, medidasSchema } from '../data/medidas';
```

Después de la constante `tech` añadir:

```ts

// Lighthouse real de cada proyecto (src/data/medidas.json). Sin medida → null.
const medidas = medidasSchema.parse(medidasJson);
const lighthousePorId = new Map(medidas.webs.map((w) => [w.id, w.lighthouse]));
const casosMedidos = casos.map((c) => ({ ...c, lighthouse: lighthousePorId.get(c.id) ?? null }));
const fechaMedidas = fechaCorta(medidas.medidoEl);
const notaMedidas = fechaMedidas
  ? `Lighthouse móvil medido el ${fechaMedidas} con PageSpeed Insights.`
  : 'Estas webs todavía no tienen medida de Lighthouse.';
```

- [ ] **Step 2: Portfolio**

Sustituir la sección completa que empieza en `{/* PORTFOLIO / CASOS REALES */}` y termina en su `</section>` por:

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* PORTFOLIO CON MEDIDAS REALES                      */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" id="portfolio" aria-labelledby="h2-portfolio">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-portfolio" class="cdm-cabecera__h2">Portfolio de diseño web con resultados reales.</h2>
          <p class="cdm-cabecera__lead">
            Una selección de proyectos lanzados en los últimos años. Sin renders falsos ni maquetas vacías: <strong>todos en línea ahora mismo</strong>. Puedes visitarlos.
          </p>
        </header>

        <div class="h-carrusel">
          <PerspectiveCarousel
            client:visible
            items={casos.map((c) => ({ src: c.image, title: `${c.cliente} · ${c.result}`, alt: `${c.cliente}, ${c.sector}` }))}
            slideWidth={340}
            rotationStep={42}
            inactiveScale={0.8}
            aspectClassName="aspect-[16/10]"
            label="Proyectos publicados"
            loop
            imageClassName="ring-1 ring-white/10"
            labelClassName="font-semibold"
          />
        </div>

        <ul class="h-proyectos">
          {casosMedidos.map((c) => (
            <li>
              <a href={c.url} target="_blank" rel="noopener noreferrer" class="h-proyecto">
                <span class="h-proyecto__cliente">{c.cliente}</span>
                <span class="h-proyecto__sector">{c.sector}, {c.result}</span>
                <span class:list={['h-proyecto__lh', { 'is-ok': c.lighthouse !== null && c.lighthouse >= 90 }]}>
                  {c.lighthouse === null ? 'sin medida' : `Lighthouse ${c.lighthouse}`}
                </span>
                <span class="sr-only">(abre en una pestaña nueva)</span>
              </a>
            </li>
          ))}
        </ul>
        <p class="h-proyectos__nota">{notaMedidas}</p>
      </div>
    </section>
```

- [ ] **Step 3: Opiniones**

Sustituir la sección completa que empieza en `{/* TESTIMONIOS */}` y termina en su `</section>` por:

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* OPINIONES                                         */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" aria-labelledby="h2-opiniones">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-opiniones" class="cdm-cabecera__h2">Opiniones de clientes: {String(CIFRAS.valoracion).replace('.', ',')} sobre 5.</h2>
          <p class="cdm-cabecera__lead">Reseñas reales de empresas, autónomos y emprendedores con los que hemos trabajado. Sin filtros.</p>
        </header>
        <TestimonialsCard
          client:visible
          items={testimonios.map((t, i) => ({ id: i, title: `${t.author} · ${t.role}`, description: t.text, image: monograma(t.author, i) }))}
          width={860}
          autoPlay
          autoPlayInterval={5000}
          className="h-testimonios"
        />
      </div>
    </section>
```

- [ ] **Step 4: Tecnología**

Pega el bloque de abajo justo **antes** de la sección que empieza en `{/* STACK TECNOLÓGICO con SVGs CUSTOM */}`. Luego **corta** los ocho bloques `{t.id === 'astro' && (…)}`, `'wp'`, `'woo'`, `'stripe'`, `'bizum'`, `'vercel'`, `'cloudflare'` y `'ga4'` (cada uno desde su `{t.id ===` hasta su `)}`) del bloque antiguo y pégalos en lugar de `{/* LOGOS-TECNOLOGIA */}`. Por último borra la sección antigua completa (desde `{/* STACK TECNOLÓGICO con SVGs CUSTOM */}` hasta su `</section>`):

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* TECNOLOGÍA (órbita fija: el spec solo deja moverse radar y registro) */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" aria-labelledby="h2-tecnologia">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-tecnologia" class="cdm-cabecera__h2">Tecnología web que dominamos.</h2>
          <p class="cdm-cabecera__lead">
            Tecnologías estándar de la industria, probadas en cientos de proyectos. Sin plataformas raras de las que no puedas escapar. <strong>Tu stack es tuyo. Para siempre.</strong>
          </p>
        </header>
        <div class="h-orbita">
          <div class="h-orbita__nucleo" aria-hidden="true"><span>P★</span></div>
          <ul class="h-tech">
            {tech.map((t) => (
              <li class="h-tech__item">
                <div class="h-tech__logo" aria-hidden="true">
                  {/* LOGOS-TECNOLOGIA */}
                </div>
                <h3 class="h-tech__nombre">{t.name}</h3>
                <p class="h-tech__desc">{t.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
```

- [ ] **Step 5: Estilos**

Añadir dentro del segundo `<style>` de la home, antes de su `</style>`:

```css

  /* El carrusel ocupa el 100 % del alto de su contenedor: sin altura, mide 0. */
  .h-carrusel { position: relative; height: clamp(320px, 42vw, 440px); margin-bottom: 2rem; }
  .h-proyectos { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1px; margin: 0; padding: 0; list-style: none; background: var(--color-cdm-regla); border: 1px solid var(--color-cdm-regla); }
  @media (min-width: 700px) { .h-proyectos { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .h-proyecto { display: grid; gap: 0.2rem; height: 100%; padding: 1rem 1.1rem; background: var(--color-cdm-suelo); color: inherit; text-decoration: none; }
  .h-proyecto:hover { background: var(--color-cdm-panel); }
  .h-proyecto__cliente { font-weight: 600; }
  .h-proyecto__sector { font-size: 0.85rem; color: var(--color-cdm-tenue); }
  .h-proyecto__lh { margin-top: 0.3rem; font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-cdm-texto); }
  .h-proyecto__lh.is-ok { color: var(--color-cdm-ok); }
  .h-proyectos__nota { margin: 0.75rem 0 0; font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-cdm-tenue); }

  .h-tech { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin: 0; padding: 0; list-style: none; }
  @media (min-width: 640px) { .h-tech { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .h-tech { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .h-tech__item { padding: 1.1rem; background: var(--color-cdm-panel); border: 1px solid var(--color-cdm-regla-2); }
  .h-tech__logo { width: 56px; height: 56px; margin-bottom: 0.75rem; }
  .h-tech__nombre { margin: 0 0 0.3rem; font-weight: 600; font-size: 1rem; }
  .h-tech__desc { margin: 0; font-size: 0.85rem; line-height: 1.5; color: #b9c5cf; }
  .h-orbita { position: relative; }
  .h-orbita__nucleo { display: none; }
  @media (min-width: 1100px) {
    .h-orbita { display: grid; place-items: center; height: 820px; }
    .h-orbita::before,
    .h-orbita::after { content: ''; position: absolute; left: 50%; top: 50%; border: 1px dashed var(--color-cdm-regla-2); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; }
    .h-orbita::before { width: 380px; height: 380px; }
    .h-orbita::after { width: 690px; height: 690px; }
    .h-orbita__nucleo {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 2;
      display: grid;
      place-items: center;
      width: 150px;
      height: 150px;
      margin: -75px 0 0 -75px;
      border: 1px solid var(--color-cdm-senal);
      border-radius: 50%;
      background: var(--color-cdm-panel);
      color: var(--color-cdm-senal);
      font-family: var(--font-mono);
      font-size: 2.6rem;
      box-shadow: 0 0 0 10px rgb(255 90 0 / 0.08), 0 0 60px rgb(255 90 0 / 0.25);
    }
    .h-tech { position: absolute; inset: 0; display: block; }
    .h-tech__item {
      position: absolute;
      width: 132px;
      margin: -66px 0 0 -66px;
      padding: 0.75rem;
      text-align: center;
      left: calc(50% + var(--r) * cos(var(--a0)));
      top: calc(50% + var(--r) * sin(var(--a0)));
    }
    .h-tech__desc { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    .h-tech__logo { width: 64px; height: 64px; margin: 0 auto 0.4rem; }
    .h-tech__nombre { margin: 0; font-size: 0.85rem; }
    /* Anillo interior (3) y exterior (5) con ángulos alternos para que no se solapen */
    .h-tech__item:nth-child(1) { --a0: 36deg; --r: 190px; }
    .h-tech__item:nth-child(2) { --a0: 156deg; --r: 190px; }
    .h-tech__item:nth-child(3) { --a0: 276deg; --r: 190px; }
    .h-tech__item:nth-child(4) { --a0: 0deg; --r: 345px; }
    .h-tech__item:nth-child(5) { --a0: 72deg; --r: 345px; }
    .h-tech__item:nth-child(6) { --a0: 144deg; --r: 345px; }
    .h-tech__item:nth-child(7) { --a0: 216deg; --r: 345px; }
    .h-tech__item:nth-child(8) { --a0: 288deg; --r: 345px; }
  }
```

- [ ] **Step 6: Verificar**

Run: `grep -c "{s.icon === \|{t.id === " src/pages/index.astro`
Expected: `18`.

Run: `npm run check && npm run lint && npm run build && npm run audit:seo -- --sin-peso`
Expected: 0 errores y `[seo] Sin errores.`

En Playwright a 1440 px, captura `#portfolio` y la sección de tecnología en `/home/jorge/Documentos/platanito/.playwright-mcp/cdm-t12-portfolio-1440.png` y `cdm-t12-tecnologia-1440.png`. Comprueba:
- El carrusel y las tarjetas de opiniones se pintan en oscuro, porque sus variantes `dark:` están activas.
- Cada proyecto dice «Lighthouse N» o «sin medida», nunca otra cifra.
- Los 8 logos no se solapan. En consola: `[...document.querySelectorAll('.h-tech__item')].map(e=>e.getBoundingClientRect())`. Ningún par de rectángulos puede intersecar.

---

### Task 13: Home en oscuro (cobertura, Vera AI, blog, FAQ y contacto)

**Files:**
- Modify: `src/pages/index.astro`: frontmatter y secciones «COBERTURA ALMERÍA», «VERA AI», «BLOG», «FAQ» y `<Contact />`, más reglas en el segundo `<style>`.
- Modify: `src/components/sections/Contact.astro` (prop `tono` y estilos del tono consola)

**Interfaces:**
- Consumes: `comarcas`, `getPueblosByComarca`, `comarcaSlug` (sin cambios); `CIFRAS` (Task 3); `FaqAccordion` (sin cambios).
- Produces: `<Contact tono?: 'papel' | 'consola' />`, con `papel` por defecto. Las otras 3 páginas que lo usan no cambian.

- [ ] **Step 1: Frontmatter**

Después de la constante `faqHome` añadir:

```ts

// Localidades destacadas de la sección de cobertura
const localidadesDestacadas = [
  { nombre: 'Almería', slug: 'almeria', sub: 'Capital, 200.000 habitantes' },
  { nombre: 'Vera', slug: 'vera', sub: 'Levante, sede del estudio' },
  { nombre: 'Mojácar', slug: 'mojacar', sub: 'Levante, turismo' },
  { nombre: 'Huércal-Overa', slug: 'huercal-overa', sub: 'Almanzora, cabecera comarcal' },
  { nombre: 'Albox', slug: 'albox', sub: 'Almanzora, centro comercial' },
  { nombre: 'Garrucha', slug: 'garrucha', sub: 'Costa, puerto pesquero' },
];
```

- [ ] **Step 2: Cobertura, Vera AI, blog y FAQ**

Sustituir todo lo que va desde el comentario `{/* COBERTURA ALMERÍA */}` (incluidas sus líneas de marco) hasta el `</section>` de la sección FAQ (justo antes del comentario `{/* CONTACTO (componente existente) */}`) por:

```astro
    {/* ════════════════════════════════════════════════ */}
    {/* COBERTURA                                         */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" id="cobertura" aria-labelledby="h2-cobertura">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-cobertura" class="cdm-cabecera__h2">Diseño web e informática en toda Almería.</h2>
          <p class="cdm-cabecera__lead">Trabajamos con negocios de la provincia entera. Encuentra tu localidad o pídenos cobertura en la tuya si no aparece.</p>
        </header>

        <ul class="h-localidades">
          {localidadesDestacadas.map((p) => (
            <li>
              <a href={`/diseno-web/${p.slug}/`} class="h-localidad">
                <span class="h-localidad__nombre">{p.nombre}</span>
                <span class="h-localidad__sub">{p.sub}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Comarcas — enlazado en cascada: cada comarca lleva al hub /diseno-web/
            (a su sección), en lugar de volcar las ~90 localidades aquí. Concentra
            el link equity en el hub y evita enlazar páginas noindex desde la home. */}
        <h3 class="h-comarcas__titulo">Por comarcas</h3>
        <div class="h-comarcas">
          {comarcas.map((comarca) => {
            const list = getPueblosByComarca(comarca);
            if (!list.length) return null;
            return (
              <a class="h-comarca" href={`/diseno-web/#${comarcaSlug(comarca)}`}>
                <span class="h-comarca__nombre">{comarca}</span>
                <span class="h-comarca__num">{list.length} localidades</span>
              </a>
            );
          })}
        </div>
        <a href="/diseno-web/" class="h-enlace">Ver todas las localidades</a>
      </div>
    </section>

    {/* ════════════════════════════════════════════════ */}
    {/* VERA AI — Demo de agente de IA                   */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" aria-labelledby="h2-vera">
      <div class="cdm-dentro h-vera">
        <div>
          <p class="h-vera__etq">Demo de IA</p>
          <h2 id="h2-vera" class="cdm-cabecera__h2">Vera AI Business Agent</h2>
          <p class="cdm-cabecera__lead h-vera__lead">
            Una IA que analiza tu negocio local y te propone qué automatizar. Elige tu sector, cuéntale tu problema y recibe un diagnóstico, una solución y un precio orientativo. No es un chatbot: es un <strong>consultor de IA</strong>.
          </p>
          <a href="/vera-ai/" class="h-vera__btn">Probar la demo de Vera</a>
        </div>
        <ul class="h-vera__sectores" aria-label="Sectores que analiza la demo">
          <li>Alquiler vacacional</li>
          <li>Inmobiliarias</li>
          <li>Restaurantes</li>
          <li>Clínicas y estética</li>
          <li>Facturación y pymes</li>
        </ul>
      </div>
    </section>

    {/* ════════════════════════════════════════════════ */}
    {/* BLOG — Últimos artículos                         */}
    {/* ════════════════════════════════════════════════ */}
    {recentPosts.length > 0 && (
      <section class="cdm-seccion dark" aria-labelledby="h2-blog">
        <div class="cdm-dentro">
          <header class="cdm-cabecera">
            <h2 id="h2-blog" class="cdm-cabecera__h2">Guías de diseño web y tecnología.</h2>
            <p class="cdm-cabecera__lead">Tecnología, marketing, casos de estudio y opinión. Publicado cuando tenemos algo que decir.</p>
          </header>
          <ul class="h-blog">
            {recentPosts.map((p: Post) => (
              <li>
                <a href={`/blog/${p.data.slug}/`} class="h-post">
                  <time class="h-post__fecha" datetime={p.data.publishedAt.toISOString()}>{formatDateShort(p.data.publishedAt)}</time>
                  <h3 class="h-post__titulo">{p.data.title}</h3>
                  {p.data.excerpt && <p class="h-post__resumen">{p.data.excerpt}</p>}
                  {p.data.categories?.[0] && <span class="h-post__cat">{p.data.categories[0]}</span>}
                </a>
              </li>
            ))}
          </ul>
          <a href="/blog/" class="h-enlace">Ver todos los artículos</a>
        </div>
      </section>
    )}

    {/* ════════════════════════════════════════════════ */}
    {/* FAQ                                              */}
    {/* ════════════════════════════════════════════════ */}
    <section class="cdm-seccion dark" aria-labelledby="h2-faq">
      <div class="cdm-dentro">
        <header class="cdm-cabecera">
          <h2 id="h2-faq" class="cdm-cabecera__h2">Preguntas frecuentes sobre precios de páginas web.</h2>
          <p class="cdm-cabecera__lead">Respuestas honestas. Si no está aquí, escríbenos por WhatsApp y respondemos en menos de {CIFRAS.respuestaHoras} h.</p>
        </header>
        <FaqAccordion client:visible title="" items={faqHome.map((f) => ({ question: f.q, answer: f.a }))} className="max-w-4xl" />
      </div>
    </section>
```

Sustituir `<Contact />` por `<Contact tono="consola" />`.

- [ ] **Step 3: Estilos de las secciones**

Añadir dentro del segundo `<style>` de la home, antes de su `</style>`:

```css

  .h-localidades { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; margin: 0 0 2.5rem; padding: 0; list-style: none; background: var(--color-cdm-regla); border: 1px solid var(--color-cdm-regla); }
  @media (min-width: 900px) { .h-localidades { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .h-localidad { display: grid; gap: 0.25rem; height: 100%; padding: 1.2rem; background: var(--color-cdm-suelo); color: inherit; text-decoration: none; }
  .h-localidad:hover { background: var(--color-cdm-panel); }
  .h-localidad__nombre { font-family: var(--font-display); font-stretch: 82%; font-weight: 740; font-size: clamp(1.5rem, 3vw, 2.1rem); line-height: 1; }
  .h-localidad__sub { font-size: 0.85rem; color: var(--color-cdm-tenue); }
  .h-comarcas__titulo { margin: 0 0 0.75rem; font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; }
  .h-comarcas { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem; }
  .h-comarca { display: inline-flex; align-items: baseline; gap: 0.6rem; padding: 0.55rem 0.85rem; border: 1px solid var(--color-cdm-regla-2); color: inherit; text-decoration: none; }
  .h-comarca:hover { border-color: var(--color-cdm-texto); }
  .h-comarca__nombre { font-weight: 600; }
  .h-comarca__num { font-size: 0.8rem; color: var(--color-cdm-tenue); }
  .h-enlace { display: inline-block; color: var(--color-cdm-texto); font-weight: 600; text-decoration: underline; text-decoration-color: var(--color-cdm-senal); text-underline-offset: 4px; }

  .h-vera { display: grid; gap: 2rem; align-items: center; }
  @media (min-width: 1000px) { .h-vera { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); } }
  .h-vera__etq { margin: 0 0 0.75rem; font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-cdm-tenue); }
  .h-vera__lead { margin-top: 1rem; }
  .h-vera__btn { display: inline-flex; align-items: center; min-height: 2.9rem; margin-top: 1.5rem; padding: 0.7rem 1.15rem; background: var(--color-cdm-senal); color: #120600; font-weight: 600; text-decoration: none; }
  .h-vera__btn:hover { background: #ff7a33; }
  .h-vera__sectores { display: grid; gap: 1px; margin: 0; padding: 0; list-style: none; background: var(--color-cdm-regla); border: 1px solid var(--color-cdm-regla); }
  .h-vera__sectores li { padding: 0.85rem 1rem; background: var(--color-cdm-panel); font-size: 0.95rem; }

  .h-blog { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin: 0 0 1.75rem; padding: 0; list-style: none; }
  @media (min-width: 900px) { .h-blog { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .h-post { display: flex; flex-direction: column; gap: 0.5rem; height: 100%; padding: 1.3rem; background: var(--color-cdm-panel); border: 1px solid var(--color-cdm-regla-2); color: inherit; text-decoration: none; }
  .h-post:hover { border-color: var(--color-cdm-texto); }
  .h-post__fecha { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-cdm-tenue); }
  .h-post__titulo { margin: 0; font-family: var(--font-display); font-weight: 700; font-size: 1.3rem; line-height: 1.15; }
  .h-post__resumen { margin: 0; font-size: 0.92rem; line-height: 1.55; color: #b9c5cf; }
  .h-post__cat { margin-top: auto; padding-top: 0.6rem; font-size: 0.8rem; color: var(--color-cdm-tenue); }
```

- [ ] **Step 4: `Contact.astro` con tono consola**

Sustituir la primera línea del frontmatter (`const channels = [`) por:

```ts
interface Props {
  /* 'consola': versión oscura para la home del centro de mando. */
  tono?: 'papel' | 'consola';
}
const { tono = 'papel' } = Astro.props;

const channels = [
```

Sustituir `<section class="section-brutal" id="contacto">` por:

```astro
<section class:list={['section-brutal', { 'contacto--consola dark': tono === 'consola' }]} id="contacto">
```

Añadir dentro del `<style>` de `Contact.astro`, antes de `</style>`:

```css

  /* Tono consola: se reasignan las variables de la paleta brutal dentro de la
     sección, así los utilitarios globales (input-brutal, spec-list…) se pintan
     en oscuro sin duplicar sus reglas. */
  .contacto--consola {
    --brutal-bg-alt: var(--color-cdm-panel-2);
    --brutal-card: var(--color-cdm-panel);
    --brutal-ink: var(--color-cdm-texto);
    --brutal-text-secondary: #b9c5cf;
    --brutal-text-muted: var(--color-cdm-tenue);
    --brutal-border-soft: var(--color-cdm-regla);
    --brutal-accent-ink: var(--color-cdm-senal);
    color-scheme: dark;
    background: var(--color-cdm-suelo);
    color: var(--color-cdm-texto);
    border-top: 1px solid var(--color-cdm-regla);
  }
  .contacto--consola .brutal-section-head__col > .text-meta,
  .contacto--consola .contact-channels > .text-meta { display: none; }
  .contacto--consola .brutal-section-head__title { font-stretch: 82%; letter-spacing: -0.02em; }
  .contacto--consola .brutal-section-head__title em { font-family: inherit; font-style: normal; font-weight: inherit; color: inherit; }
  .contacto--consola .contact-channels__list { border-top: 1px solid var(--color-cdm-regla-2); }
  .contacto--consola .contact-status { background: transparent; border: 1px solid var(--color-cdm-regla-2); box-shadow: none; }
  .contacto--consola .contact-status .live-dot { background: var(--color-cdm-ok); }
  .contacto--consola .contact-status__sub { color: var(--color-cdm-tenue); opacity: 1; }
  .contacto--consola .contact-form-wrap { border: 1px solid var(--color-cdm-regla-2); box-shadow: none; }
  .contacto--consola .contact-form-head,
  .contacto--consola .contact-form__foot { border-color: var(--color-cdm-regla); border-width: 1px; }
  .contacto--consola .input-brutal { border: 1px solid var(--color-cdm-regla-2); }
  .contacto--consola .input-brutal:focus { box-shadow: 0 0 0 2px var(--color-cdm-ok); transform: none; }
  .contacto--consola select option { background: var(--color-cdm-panel); color: var(--color-cdm-texto); }
  .contacto--consola .contact-form__chips label { border-color: var(--color-cdm-regla-2); }
  .contacto--consola .contact-form__chips input[type='radio']:checked + label { background: var(--color-cdm-senal); border-color: var(--color-cdm-senal); color: #120600; }
  .contacto--consola .contact-form__chips input[type='radio']:focus-visible + label { outline: 2px solid var(--color-cdm-ok); outline-offset: 2px; }
  .contacto--consola .contact-form__submit { background: var(--color-cdm-senal); border: 1px solid var(--color-cdm-senal); color: #120600; box-shadow: none; }
  .contacto--consola .spec-list { border-top-color: var(--color-cdm-regla-2); }
```

- [ ] **Step 5: Verificar**

Run: `grep -c "{s.icon === \|{t.id === " src/pages/index.astro`
Expected: `18`.

Run: `npm run check && npm run lint && npm run build && npm run audit:seo -- --sin-peso`
Expected: 0 errores y `[seo] Sin errores.` La página `/contacto/` sigue en papel porque usa el tono por defecto.

En Playwright a 1440 px, captura `#cobertura`, la FAQ y `#contacto` de la home en `/home/jorge/Documentos/platanito/.playwright-mcp/cdm-t13-*.png`. Captura también `/contacto/` para confirmar que no cambió. En la home:
- Abre una pregunta de la FAQ.
- Pulsa un chip de presupuesto y comprueba que se marca en naranja con texto oscuro.
- Enfoca el campo nombre y comprueba que se ve el anillo lima.

---

### Task 14: Limpieza, verificación de la fase y commit

**Files:**
- Modify: `src/pages/index.astro` (borrar el primer `<style>`)
- Delete: `src/components/vg/HeroVengeance.astro`, `src/components/vg/PreciosVengeance.astro`, `src/components/vg/PlanBento.tsx`
- Delete: `src/components/ui/animated-rays.tsx`, `morph-text.tsx`, `radial-glow-button.tsx`, `corner-button.tsx`, `glow-border-card.tsx`, `research-bento-grid.tsx`, `spotlight-navbar.tsx`, `border-beam.tsx`, `flip-fade-text.tsx`, `stats-counter.tsx`
- Modify: `docs/superpowers/specs/2026-09-15-centro-de-mando-design.md` (solo si en la verificación sale una desviación que haya que anotar)

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: fase 1 cerrada con un commit local en `feat/centro-de-mando`.

- [ ] **Step 1: Borrar el CSS antiguo de la home**

En `src/pages/index.astro`, borrar el **primer** bloque `<style>` completo: el que empieza con el comentario `PALETA · HOME EDITORIAL` y termina en el `</style>` que sigue a `@keyframes ho-orbit-spin { to { --ho-orbit: 360deg; } }`. El segundo `<style>` (centro de mando) se queda.

Run: `grep -n "ho-" src/pages/index.astro`
Expected: sin resultados.

- [ ] **Step 2: Borrar componentes sin uso**

Run:

```bash
git rm src/components/vg/HeroVengeance.astro src/components/vg/PreciosVengeance.astro src/components/vg/PlanBento.tsx \
  src/components/ui/animated-rays.tsx src/components/ui/morph-text.tsx src/components/ui/radial-glow-button.tsx \
  src/components/ui/corner-button.tsx src/components/ui/glow-border-card.tsx src/components/ui/research-bento-grid.tsx \
  src/components/ui/spotlight-navbar.tsx src/components/ui/border-beam.tsx src/components/ui/flip-fade-text.tsx \
  src/components/ui/stats-counter.tsx
grep -rnE "components/vg/|ui/(animated-rays|morph-text|radial-glow-button|corner-button|glow-border-card|research-bento-grid|spotlight-navbar|border-beam|flip-fade-text|stats-counter)" src
```

Expected: `git rm` sin errores y el `grep` sin resultados.

Run: `grep -rln "react-icons\|from 'gsap'\|lucide-react" src`
Expected: anota la salida. Las dependencias no se tocan en esta fase (spec §4: se retiran en la fase 4 si nada las usa).

- [ ] **Step 3: Verificación completa**

Run: `npm run check && npm run lint && npm test && npm run build && npm run audit:seo`
Expected:
- `check`: 0 errores.
- `lint`: 0 errores.
- `test`: todo en verde, con los 26 tests previos más los nuevos de las tareas 1-4.
- `build`: OK.
- `audit:seo`: `[seo] Sin errores.`, con la home ≤ 180000 B de HTML y sin más JS que la base.

Si `audit:seo` falla solo por peso, mide qué ocupa el HTML antes de cambiar nada:

```bash
node -e "const h=require('fs').readFileSync('dist/client/index.html','utf8');const css=[...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce((t,m)=>t+m[1].length,0);const ld=[...h.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)].reduce((t,m)=>t+m[1].length,0);const islas=[...h.matchAll(/<astro-island[\s\S]*?<\/astro-island>/g)].reduce((t,m)=>t+m[0].length,0);console.log({total:h.length,cssInline:css,jsonLd:ld,islas})"
```

Con esas cifras, detente y consulta con el usuario antes de recortar contenido.

- [ ] **Step 4: Lighthouse móvil local**

```bash
export CHROME_PATH="$(node -e "console.log(require('playwright-core').chromium.executablePath())")"
ls "$CHROME_PATH" || npx playwright install chromium
npx lighthouse http://127.0.0.1:4330/ --quiet --chrome-flags="--headless=new --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=/tmp/claude-1000/-home-jorge-Documentos-platanito/c8922639-9b31-459e-8402-76db8155bd60/scratchpad/lh-home.json
node -e "const r=require('/tmp/claude-1000/-home-jorge-Documentos-platanito/c8922639-9b31-459e-8402-76db8155bd60/scratchpad/lh-home.json');for(const [k,v] of Object.entries(r.categories))console.log(k,Math.round(v.score*100));console.log('LCP',Math.round(r.audits['largest-contentful-paint'].numericValue),'ms','CLS',r.audits['cumulative-layout-shift'].numericValue.toFixed(3),'TBT',Math.round(r.audits['total-blocking-time'].numericValue),'ms')"
```

Expected: rendimiento ≥ 95, accesibilidad ≥ 95, SEO 100 y CLS < 0,1. El servidor local de Python no comprime: si el rendimiento se queda justo por debajo solo por transferencia, anótalo en el informe en lugar de ocultarlo. Si accesibilidad < 95, lista las auditorías fallidas con `node -e "const r=require('…/lh-home.json');Object.values(r.audits).filter(a=>a.score===0&&r.categories.accessibility.auditRefs.some(x=>x.id===a.id)).forEach(a=>console.log(a.id,a.title))"` y corrígelas antes de seguir.

- [ ] **Step 5: Capturas finales**

En Playwright, captura la home completa a 1440 px y a 390 px (`fullPage: true`) en `/home/jorge/Documentos/platanito/.playwright-mcp/cdm-fase1-home-1440.png` y `cdm-fase1-home-390.png`. Captura también la cabecera y el footer de `/diseno-web/mojacar/` a 1440 px, para ver cómo quedan sobre una página aún sin migrar. Revisa:
- Sin desbordes horizontales.
- Ningún texto sobre otro.
- Todos los iconos y logos a mano visibles.
- Paneles demo con su etiqueta.
- Foco visible al tabular por la cabecera.

- [ ] **Step 6: Commit de la fase**

```bash
git add -A
git commit -m "feat(cdm): fase 1 del centro de mando: sistema, cabecera, footer y home" \
  -m "- Tokens cdm y fuentes que cargan de verdad (antes la web caía a fuentes del sistema)
- Auditoría SEO con línea base (npm run audit:seo)
- Medidas reales de webs de clientes con PageSpeed en prebuild
- Radar de cobertura, paneles real/demo y telemetría sin React
- Cabecera barra de estado y footer oscuro en todas las páginas
- Home completa en consola; iconos SVG a mano conservados" \
  -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
git log --oneline -1
```

Expected: el hash del commit. **Sin push.**

- [ ] **Step 7: Informe al usuario**

Contar:
- Qué se ve ahora, con las capturas.
- Cifras de Lighthouse y peso de la home.
- Cuántas webs se midieron de verdad (o que PageSpeed limitó sin clave).
- Contenido pendiente de confirmar:
  - «+50 webs entregadas».
  - Métricas de las fichas de servicios («99+ Lighthouse», «+180 % leads», «99,9 % uptime») sin respaldo medido.
  - Horario: el JSON-LD dice 18:00 y la web 19:00.
- Que cabecera y footer ya salen oscuros en todas las páginas mientras los cuerpos siguen en papel hasta la fase 2.

Pedir aprobación antes de empezar la fase 2.

---

## Fuera de esta fase (para no perderlo)

- `IndiceLateral.astro`, `Postal.astro` y `LecturaLayout.astro` se crean en la fase 2 (spec §4 y §6.2).
- `CookieConsent` y `ChatWidget` siguen en claro.
- Atributos `font-family="JetBrains Mono"` dentro de SVG de audiovisual y desarrollo web.
- Retirar Instrument Serif, tokens `plano` y dependencias sin uso en la fase 4.
