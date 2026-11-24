import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/* En 2026 la web pidió durante meses una familia con un nombre distinto del
   que registra fontsource y el navegador caía a la fuente del sistema sin
   avisar. Este test impide que vuelva a pasar con la tipografía actual. */

const raiz = process.cwd();
const css = readFileSync(join(raiz, 'src/styles/sitio.css'), 'utf8');
const hoja = readFileSync(join(raiz, 'node_modules/@fontsource-variable/plus-jakarta-sans/wght.css'), 'utf8');
const registradas = new Set([...hoja.matchAll(/font-family:\s*'([^']+)'/g)].map((m) => m[1]));

describe('fuentes', () => {
  it('importa la hoja variable de Plus Jakarta Sans', () => {
    expect(css).toContain("@import '@fontsource-variable/plus-jakarta-sans/wght.css';");
  });

  it('--fuente empieza por la familia que fontsource registra', () => {
    const valor = css.match(/--fuente:\s*([^;]+);/)?.[1] ?? '';
    const primera = valor.split(',')[0].trim().replace(/^['"]|['"]$/g, '');
    expect(registradas.has(primera)).toBe(true);
  });

  it('la fuente de respaldo tiene métricas ajustadas para no mover el texto', () => {
    expect(css).toMatch(/font-family:\s*'Jakarta Fallback'[\s\S]*?size-adjust/);
  });
});
