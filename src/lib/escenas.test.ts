import { describe, expect, it } from 'vitest';
import { escena, escenaPueblo, ESCENAS } from './escenas';
import { rasgosDe } from './pueblo';
import { pueblos } from '../data/pueblos-almeria';

/* Las ilustraciones isométricas sustituyen a las fotos y a los SVG hechos a
   mano de las landings antiguas: si una escena deja de generarse, la página
   se queda sin su imagen principal. */

describe('escenas isométricas', () => {
  for (const nombre of ESCENAS) {
    it(`«${nombre}» genera un SVG con viewBox y medidas válidas`, () => {
      const { html, ancho, alto } = escena(nombre);
      expect(html).toMatch(/^<svg class="iso /);
      expect(html).toMatch(/viewBox="-?\d+ -?\d+ \d+ \d+"/);
      expect(ancho).toBeGreaterThan(100);
      expect(alto).toBeGreaterThan(100);
      expect(html).not.toMatch(/NaN|undefined/);
    });
  }

  it('sin título es decorativa y con título es accesible', () => {
    expect(escena('web').html).toContain('aria-hidden="true"');
    expect(escena('web', { titulo: 'Una web' }).html).toContain('role="img" aria-label="Una web"');
  });

  it('solo anima con transform y opacity (clases iso-*)', () => {
    const { html } = escena('web');
    expect(html).toMatch(/class="iso-flota"/);
    expect(html).not.toMatch(/<animate|<script/);
  });
});

describe('ilustración de cada municipio', () => {
  const generadas = pueblos.map((p) => escenaPueblo(rasgosDe(p), p.nombre).html);

  it('todos los municipios tienen su escena', () => {
    for (const html of generadas) expect(html).toMatch(/^<svg class="iso iso-pueblo"/);
  });

  it('la escena cambia entre municipios', () => {
    const distintas = new Set(generadas).size;
    expect(distintas).toBe(pueblos.length);
  });
});
