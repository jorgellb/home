/* Escenas de /informatica-empresas/: la oficina cuidada (portada) y el mapa
   de cobertura con los municipios de visita el mismo día. */
import { Escena, type Punto3 } from './iso';
import { plataforma, navegador, aviso } from './escenas';
import { pueblosIT } from '../data/servicios-it';
import { pueblos } from '../data/pueblos-almeria';
import { territorioDe } from '../data/territorio';

const TINTA = '#14160F';
const VERDE = '#0E5B3A';
const VERDE_2 = '#3A9A6B';
const PLATANO = '#FFCF3F';
const CORAL = '#FF7F5C';
const CIELO = '#BFDFF4';
const GRIS = '#E9EAE3';
const GRIS_2 = '#D7D9CF';
const BLANCO = '#FFFFFF';

/* ── La oficina cuidada ───────────────────────────────────────────── */

function puesto(e: Escena, x: number, y: number, z: number, ropa: 'verde' | 'azul' | 'coral' | 'platano', retraso: number) {
  e.caja({ x, y, z, w: 50, d: 30, h: 22, m: 'arena', sombra: true });
  const f = navegador(e, x + 10, y + 4, z + 22, 30, 24, 'tinta');
  e.caraY(x + 13, f, z + 25, 24, 13, '#1F2A1E');
  e.grupo({ clase: 'iso-parpadeo', retraso, duracion: 2.4 }, (g) => g.caraY(x + 16, f + 0.01, z + 32, 12, 2.2, '#45AE77'));
  e.caja({ x: x + 12, y: y + 20, z: z + 22, w: 20, d: 6, h: 1.5, m: 'blanco', brillo: false });
  e.persona(x + 25, y + 42, z, ropa, 0.8);
}

function oficina(e: Escena) {
  const z = plataforma(e, 300, 250);

  // Suelo de la oficina y carretera de acceso
  e.losa(0, 0, z + 0.2, 300, 178, '#F6F8F4');
  e.losa(0, 196, z + 0.3, 300, 26, '#5A6153');
  e.linea([6, 209, z + 0.5], [294, 209, z + 0.5], '#FFE68F', 1.6, ' stroke-dasharray="8 8"');
  e.losa(0, 178, z + 0.4, 300, 18, '#E9E5D7');

  // Escudo que protege la oficina (latido suave)
  e.ondas(150, 90, z, 120, VERDE_2);

  // Armario de servidores con luces
  e.caja({ x: 18, y: 18, z, w: 46, d: 46, h: 104, m: 'tinta', sombra: true });
  for (let i = 0; i < 5; i++) {
    e.caraY(23, 64.01, z + 8 + i * 19, 36, 13, '#2C3128');
    e.caraY(27, 64.02, z + 13 + i * 19, 16, 2, '#4A5245');
    e.grupo({ clase: 'iso-parpadeo', retraso: i * 0.3, duracion: 1.1 + (i % 3) * 0.4 }, (g) => g.caraY(50, 64.02, z + 12 + i * 19, 3.5, 3.5, i % 2 ? '#45AE77' : PLATANO));
  }

  // Copias: NAS que sube a la nube cifrada
  e.caja({ x: 80, y: 26, z, w: 30, d: 24, h: 26, m: 'blanco', sombra: true });
  [0, 1, 2].forEach((i) => e.caraY(84 + i * 8, 50.01, z + 6, 5, 16, '#D7D9CF'));
  e.grupo({ clase: 'iso-parpadeo', duracion: 1.6 }, (g) => g.caraY(105, 50.02, z + 20, 3, 3, '#45AE77'));
  const nube: Punto3 = [150, 20, z + 170];
  e.arco([95, 38, z + 30], nube, 50, VERDE, { n: 3, duracion: 2.6 });
  e.grupo({ clase: 'iso-flota', duracion: 6 }, (g) => {
    g.esfera([150, 20, z + 170], 16, BLANCO, 'rgba(255,255,255,.9)');
    g.esfera([136, 20, z + 164], 12, BLANCO, 'rgba(255,255,255,.9)');
    g.esfera([164, 20, z + 164], 12, BLANCO, 'rgba(255,255,255,.9)');
    g.caja({ x: 145, y: 15, z: z + 168, w: 10, d: 10, h: 8, m: 'verde' });
  });

  // Router con wifi
  e.caja({ x: 210, y: 22, z, w: 44, d: 30, h: 10, m: 'blanco', sombra: true });
  e.linea([216, 28, z + 10], [216, 28, z + 28], TINTA, 2);
  e.linea([248, 28, z + 10], [248, 28, z + 28], TINTA, 2);
  e.grupo({ clase: 'iso-parpadeo', duracion: 1 }, (g) => g.caraY(216, 52.01, z + 3, 4, 3, '#45AE77'));
  e.ondas(232, 37, z + 10, 46, CIELO);

  // Cableado con datos hacia los puestos
  e.flujo([[64, 70, z + 0.6], [64, 92, z + 0.6], [120, 92, z + 0.6]], VERDE, { n: 3, duracion: 2.4, guia: '#B6E4CA' });
  e.flujo([[232, 52, z + 0.6], [232, 92, z + 0.6], [190, 92, z + 0.6]], PLATANO, { n: 2, duracion: 2, guia: '#B6E4CA' });

  // Tres puestos de trabajo
  puesto(e, 80, 96, z, 'azul', 0);
  puesto(e, 150, 96, z, 'coral', 0.7);
  puesto(e, 220, 96, z, 'platano', 1.4);

  // Impresora
  e.caja({ x: 22, y: 112, z, w: 34, d: 28, h: 18, m: 'blanco', sombra: true });
  e.caja({ x: 26, y: 116, z: z + 18, w: 26, d: 14, h: 3, m: 'papel' });

  // Escudo de ciberseguridad flotando
  e.sombra(140, 60, z, 14, 0.06);
  e.grupo({ clase: 'iso-flota', retraso: 0.5 }, (g) => {
    g.caja({ x: 126, y: 54, z: z + 92, w: 30, d: 6, h: 36, m: 'verde' });
    g.caraY(135, 60.01, z + 104, 12, 4, BLANCO);
    g.caraY(139, 60.01, z + 100, 4, 12, BLANCO);
  });

  // Avisos del helpdesk resueltos
  aviso(e, 240, 70, z + 70, VERDE, 0.8);
  aviso(e, 70, 70, z + 140, 'blanco', 3.6, 2);

  // La furgoneta del técnico llegando por la carretera
  e.viajero([[-30, 209, z + 1], [150, 209, z + 1], [150, 209, z + 1], [330, 209, z + 1]], { duracion: 12 }, (g) => {
    g.caja({ x: -22, y: -8, z: 2, w: 34, d: 16, h: 18, m: 'blanco' });
    g.caja({ x: 12, y: -7, z: 2, w: 10, d: 14, h: 12, m: 'verde' });
    g.caraX(22.01, -5, 8, 10, 5, CIELO);
    g.caraY(-18, 8.01, 6, 26, 8, VERDE);
    g.caraY(-14, 8.02, 9, 10, 2.4, PLATANO);
    g.cilindro(-14, 8, 0, 3.4, 2, 'tinta');
    g.cilindro(14, 8, 0, 3.4, 2, 'tinta');
  });

  // Etiquetas al final, encima de todo
  e.cartel([41, 41, z + 132], 'Servidor');
  e.cartel([95, 38, z + 40], 'Copias');
  e.cartel([150, 20, z + 200], 'Nube cifrada');
  e.cartel([232, 37, z + 44], 'Red y wifi');
  e.cartel([150, 209, z + 40], 'Técnico en camino');
}

/* ── Cobertura: municipios con visita el mismo día ────────────────── */

function cobertura(e: Escena) {
  const lon = (v: number) => (v + 2.36) * 520;
  const lat = (v: number) => (37.46 - v) * 520;
  const lista = pueblosIT
    .map((p) => ({ p, c: pueblos.find((x) => x.slug === p.slug)?.coords, km: territorioDe(p.slug)?.kmDesdeBase ?? null }))
    .filter((x): x is { p: (typeof pueblosIT)[number]; c: [number, number]; km: number | null } => Boolean(x.c));
  const xs = lista.map((x) => lon(x.c[0]));
  const ys = lista.map((x) => lat(x.c[1]));
  const x0 = Math.min(...xs) - 34;
  const y0 = Math.min(...ys) - 34;
  const W = Math.max(...xs) - x0 + 34;
  const D = Math.max(...ys) - y0 + 34;
  e.sombraCaja(x0, y0, -2, W, D, 10, 0.05);
  e.caja({ x: x0, y: y0, w: W, d: D, h: 8, m: 'verde', brillo: false });
  e.caja({ x: x0, y: y0, z: 8, w: W, d: D, h: 6, m: 'blanco' });
  const z = 14;
  for (let i = x0 + 40; i < x0 + W; i += 40) e.linea([i, y0 + 4, z], [i, y0 + D - 4, z], GRIS, 1, ' stroke-dasharray="2 6"');
  for (let j = y0 + 40; j < y0 + D; j += 40) e.linea([x0 + 4, j, z], [x0 + W - 4, j, z], GRIS, 1, ' stroke-dasharray="2 6"');

  const vera = lista.find((x) => x.p.slug === 'vera')!;
  const vx = lon(vera.c[0]);
  const vy = lat(vera.c[1]);
  lista
    .filter((x) => x.p.slug !== 'vera')
    .forEach((x, i) => {
      const px = lon(x.c[0]);
      const py = lat(x.c[1]);
      e.arco([vx, vy, z + 30], [px, py, z + 16], 20 + Math.hypot(px - vx, py - vy) * 0.22, i % 2 ? VERDE : CORAL, { n: 1, duracion: 2 + i * 0.15, retraso: -i * 0.4 });
    });
  const orden = [...lista].sort((a, b) => lon(a.c[0]) + lat(a.c[1]) - (lon(b.c[0]) + lat(b.c[1])));
  for (const x of orden) {
    const px = lon(x.c[0]);
    const py = lat(x.c[1]);
    const base = x.p.slug === 'vera';
    e.caja({ x: px - 7, y: py - 7, z, w: 14, d: 14, h: base ? 36 : 16, m: base ? 'platano' : x.p.comarca === 'Valle del Almanzora' ? 'azul' : 'verde', sombra: true });
  }
  e.ondas(vx, vy, z, 34, CORAL);
  // Solo la etiqueta del estudio: los municipios van como enlaces en el HTML.
  e.cartel([vx, vy, z + 62], 'Vera · estudio', { color: '#fff', fondo: VERDE });
}

/* ── Registro ─────────────────────────────────────────────────────── */

export const ESCENAS_IT = { oficina, cobertura } as const;
export type NombreEscenaIT = keyof typeof ESCENAS_IT;

export function escenaIT(nombre: NombreEscenaIT, independiente = false) {
  const e = new Escena();
  ESCENAS_IT[nombre](e);
  return e.svg({ clase: `iso-${nombre}`, independiente });
}
