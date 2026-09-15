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
