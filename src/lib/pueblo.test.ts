import { describe, expect, it } from 'vitest';
import { sinPrecios, preguntasSinPrecios, RESPUESTA_PRECIO, rasgosDe } from './pueblo';

describe('sinPrecios', () => {
  it('quita las frases con importe y deja el resto', () => {
    const t = 'Hacemos webs rápidas. Desde 500€ con hosting gratuito. Sin permanencia.';
    expect(sinPrecios(t)).toBe('Hacemos webs rápidas. Sin permanencia.');
  });

  it('reconoce importes con punto de miles y la palabra euros', () => {
    expect(sinPrecios('Una tienda desde 1.400 euros. Te asesoramos.')).toBe('Te asesoramos.');
    expect(sinPrecios('Cuota de 39€/mes.')).toBe('');
  });

  it('no toca textos sin importes salvo la promesa «de por vida»', () => {
    expect(sinPrecios('Hosting gratuito de por vida para webs estáticas.')).toBe('Hosting gratuito para webs estáticas.');
    expect(sinPrecios('Más de 300 días de sol.')).toBe('Más de 300 días de sol.');
  });
});

describe('preguntasSinPrecios', () => {
  it('sustituye la respuesta de las preguntas de precio y deja solo una', () => {
    const r = preguntasSinPrecios([
      { q: '¿Cuánto cuesta una web en Vera?', a: 'Desde 400€ con hosting gratuito.' },
      { q: '¿Qué precio tiene una tienda?', a: 'Desde 700€.' },
      { q: '¿Hacéis SEO local?', a: 'Sí, configuramos tu ficha de Google y las páginas de cada servicio.' },
    ]);
    expect(r).toHaveLength(2);
    expect(r[0].a).toBe(RESPUESTA_PRECIO);
    expect(r.map((f) => f.a).join(' ')).not.toMatch(/€/);
  });
});

describe('rasgosDe', () => {
  it('detecta costa y castillo', () => {
    const r = rasgosDe({ slug: 'x', comarca: 'Levante Almeriense', caracteristicas: ['Playas', 'Castillo árabe'] });
    expect(r.mar).toBe(true);
    expect(r.castillo).toBe(true);
  });

  it('pone invernaderos en el Poniente', () => {
    expect(rasgosDe({ slug: 'x', comarca: 'Poniente Almeriense' }).invernaderos).toBe(true);
  });
});
