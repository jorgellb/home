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
