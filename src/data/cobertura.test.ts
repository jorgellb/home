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
