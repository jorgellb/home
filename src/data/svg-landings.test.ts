import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import base from './svg-landings.json';

/* Guardián de la fase 2 del rediseño: las 23 landings de pueblo están hechas
   a mano y sus ilustraciones SVG son parte de la identidad del proyecto. El
   recuento se tomó ANTES de pasarlas a oscuro (16-09-2026); si una página
   pierde ilustraciones al retocarla, este test lo caza. */

const CARPETA = join(process.cwd(), 'src/pages/diseno-web');

function contar(pueblo: string): { svg: number; ilustraciones: number } {
  const texto = readFileSync(join(CARPETA, `${pueblo}.astro`), 'utf8');
  const svg = texto.match(/<svg\b/g)?.length ?? 0;
  const grandes = [...texto.matchAll(/<svg[^>]*viewBox="0 0 (\d+) (\d+)"/g)]
    .filter((m) => Number(m[1]) >= 80 && Number(m[2]) >= 80).length;
  return { svg, ilustraciones: grandes };
}

const registradas = Object.keys(base as Record<string, { svg: number; ilustraciones: number }>);

describe('ilustraciones de las landings de pueblo', () => {
  it('sigue habiendo 23 landings hechas a mano', () => {
    const enDisco = readdirSync(CARPETA)
      .filter((f) => f.endsWith('.astro') && !['index.astro', '[pueblo].astro'].includes(f))
      .map((f) => f.replace('.astro', ''))
      .sort();
    expect(enDisco).toEqual([...registradas].sort());
  });

  for (const pueblo of registradas) {
    it(`${pueblo} conserva sus ilustraciones`, () => {
      const esperado = (base as Record<string, { svg: number; ilustraciones: number }>)[pueblo];
      const actual = contar(pueblo);
      expect(actual.svg, `${pueblo}: SVG totales`).toBeGreaterThanOrEqual(esperado.svg);
      expect(actual.ilustraciones, `${pueblo}: ilustraciones grandes`).toBeGreaterThanOrEqual(esperado.ilustraciones);
    });
  }
});
