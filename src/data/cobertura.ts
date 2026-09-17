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

/* Si un pueblo cae dentro del mapa. Las landings solo enseñan el radar a
   los pueblos que salen en él: fuera de la caja no hay visita el mismo día. */
export function dentroDeCaja(lat: number, lon: number, caja: Caja = CAJA_RADAR): boolean {
  return lat >= caja.latMin && lat <= caja.latMax && lon >= caja.lonMin && lon <= caja.lonMax;
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
