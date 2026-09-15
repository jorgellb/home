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
