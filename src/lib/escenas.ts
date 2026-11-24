/* Escenas isométricas de la web: una por servicio, variantes por municipio y
   versiones mini para iconos. Se dibujan con el motor de src/lib/iso.ts en el
   build; la animación la pone el CSS (clases iso-*). */
import { Escena, type Punto3 } from './iso';
import { pueblos, comarcas } from '../data/pueblos-almeria';
import { esPuebloIndexable } from '../data/pueblos-indexables';

const TINTA = '#14160F';
const VERDE = '#0E5B3A';
const VERDE_2 = '#3A9A6B';
const PLATANO = '#FFCF3F';
const GRIS = '#E9EAE3';
const GRIS_2 = '#D7D9CF';
const CIELO = '#BFDFF4';
const CORAL = '#FF7F5C';
const BLANCO = '#FFFFFF';

export type NombreEscena =
  | 'portada'
  | 'mapa'
  | 'web'
  | 'tienda'
  | 'marketing'
  | 'informatica'
  | 'grafico'
  | 'audiovisual'
  | 'apps'
  | 'ia'
  | 'soporte'
  | 'programador'
  | 'pueblo'
  | 'contacto'
  | 'proceso'
  | 'blog';

/* ── Piezas reutilizables ─────────────────────────────────────────── */

/** Plataforma: zócalo verde, tablero blanco y retícula punteada. Devuelve la cota superior. */
function plataforma(e: Escena, w = 220, d = 220) {
  e.sombraCaja(0, 0, -2, w, d, 10, 0.05);
  e.caja({ x: 0, y: 0, w, d, h: 8, m: 'verde', brillo: false });
  e.caja({ x: 0, y: 0, z: 8, w, d, h: 6, m: 'blanco' });
  const z = 14;
  for (let i = 30; i < w; i += 30) e.linea([i, 4, z], [i, d - 4, z], GRIS, 1, ' stroke-dasharray="2 6"');
  for (let j = 30; j < d; j += 30) e.linea([4, j, z], [w - 4, j, z], GRIS, 1, ' stroke-dasharray="2 6"');
  return z;
}

function arbol(e: Escena, x: number, y: number, z: number, escala = 1, retraso = 0) {
  e.sombra(x + 6, y, z, 14 * escala, 0.07);
  e.cilindro(x, y, z, 7 * escala, 11 * escala, 'arena');
  e.grupo({ clase: 'iso-balanceo', retraso }, (g) => {
    g.esfera([x, y, z + 27 * escala], 15 * escala, '#2E8A5F');
    g.esfera([x + 5, y - 5, z + 38 * escala], 10 * escala, '#45AE77');
  });
}

/** Ventana de navegador de pie, mirando a la izquierda. Devuelve la cota de su cara frontal. */
function navegador(e: Escena, x: number, y: number, z: number, w: number, h: number, m: 'blanco' | 'tinta' = 'blanco') {
  const d = 8;
  e.caja({ x, y, z, w, d, h, m, sombra: true });
  const f = y + d + 0.01;
  e.caraY(x + 3, f, z + h - 13, w - 6, 10, m === 'tinta' ? '#2C3128' : GRIS);
  [CORAL, PLATANO, VERDE_2].forEach((c, i) => e.caraY(x + 8 + i * 8, f, z + h - 9, 4, 3.5, c));
  e.caraY(x + 36, f, z + h - 10, w - 48, 4.5, m === 'tinta' ? '#3D4339' : BLANCO);
  return f;
}

function pin(e: Escena, x: number, y: number, z: number, color = CORAL) {
  e.ondas(x, y, z, 14, color);
  e.sombra(x, y, z, 7, 0.12);
  e.grupo({ clase: 'iso-flota', duracion: 4 }, (g) => {
    g.linea([x, y, z + 2], [x, y, z + 30], TINTA, 2.2);
    g.esfera([x, y, z + 40], 11, color);
    g.esfera([x, y, z + 40], 4, BLANCO, 'transparent');
  });
}

/** Burbuja de aviso que aparece y desaparece (contactos, mensajes). */
function aviso(e: Escena, x: number, y: number, z: number, color: string, retraso = 0, texto = 2) {
  const verde = color === VERDE;
  e.grupo({ clase: 'iso-aparece', retraso, duracion: 6 }, (g) => {
    g.caja({ x, y, z, w: 40, d: 4, h: 18, m: verde ? 'verde' : 'blanco' });
    g.caraY(x + 5, y + 4.02, z + 6, 6, 6, verde ? PLATANO : color);
    for (let i = 0; i < texto; i++) g.caraY(x + 14, y + 4.02, z + 11 - i * 5, 20 - i * 6, 2.4, verde ? 'rgba(255,255,255,.75)' : GRIS_2);
  });
}

function movil(e: Escena, x: number, y: number, z: number, pantalla: (cara: number, base: number) => void) {
  e.caja({ x, y, z, w: 38, d: 6, h: 74, m: 'tinta' });
  e.caraY(x + 3, y + 6.01, z + 5, 32, 64, BLANCO);
  e.caraY(x + 14, y + 6.02, z + 70, 10, 2, '#3D4339');
  pantalla(y + 6.02, z + 5);
}

/* ── Portada: diorama vivo ────────────────────────────────────────── */

function portada(e: Escena) {
  const W = 300;
  const D = 260;
  e.sombraCaja(0, 0, -2, W, D, 10, 0.05);
  e.caja({ x: 0, y: 0, w: W, d: D, h: 8, m: 'verde', brillo: false });
  e.caja({ x: 0, y: 0, z: 8, w: W, d: D, h: 6, m: 'blanco' });
  const z = 14;
  // Hierba trasera, carretera y mar delantero
  e.losa(0, 0, z + 0.2, W, 176, '#F4FAF6');
  for (let i = 30; i < W; i += 30) e.linea([i, 4, z + 0.3], [i, 172, z + 0.3], '#E1EEE5', 1, ' stroke-dasharray="2 6"');
  e.losa(0, 214, z + 0.3, W, 46, '#CFE6F5');
  e.losa(0, 214, z + 0.4, W, 5, '#E3F2FC');
  e.grupo({ clase: 'iso-ola', duracion: 6 }, (g) => {
    g.linea([30, 236, z + 1], [80, 236, z + 1], BLANCO, 2);
    g.linea([150, 248, z + 1], [210, 248, z + 1], BLANCO, 2);
    g.linea([240, 230, z + 1], [280, 230, z + 1], BLANCO, 2);
  });
  e.losa(0, 180, z + 0.4, W, 28, '#5A6153');
  e.linea([6, 194, z + 0.6], [W - 6, 194, z + 0.6], '#FFE68F', 1.6, ' stroke-dasharray="8 8"');
  e.losa(0, 208, z + 0.5, W, 6, '#E9E5D7');

  // Barco que navega
  e.viajero([[-10, 238, z + 1], [W + 10, 238, z + 1]], { duracion: 26, retraso: -8 }, (g) => {
    g.caja({ x: -16, y: -5, z: 0, w: 32, d: 10, h: 6, m: 'coral' });
    g.caja({ x: -6, y: -3, z: 6, w: 12, d: 6, h: 6, m: 'blanco' });
    g.linea([10, 0, 6], [10, 0, 30], TINTA, 1.6);
    g.caraY(10, 0.01, 12, 14, 16, BLANCO, ` stroke="${GRIS_2}" stroke-width=".7"`);
  });

  // Estudio con la marca en la azotea
  e.caja({ x: 18, y: 30, z, w: 64, d: 56, h: 70, m: 'papel', sombra: true });
  [0, 1].forEach((f) => [0, 1, 2].forEach((c) => e.caraY(24 + c * 19, 86.01, z + 14 + f * 26, 12, 16, CIELO)));
  e.caraX(82.01, 44, z + 40, 16, 18, CIELO);
  e.caraY(30, 86.02, z, 14, 20, VERDE);
  e.caja({ x: 34, y: 42, z: z + 70, w: 30, d: 30, h: 8, m: 'blanco' });
  e.grupo({ clase: 'iso-latido', duracion: 4 }, (g) => {
    g.caja({ x: 40, y: 48, z: z + 78, w: 18, d: 18, h: 14, m: 'verde' });
    g.losa(40, 48, z + 92.05, 18, 18, PLATANO);
  });
  e.cartel([50, 58, z + 126], 'Estudio · Vera');

  // Navegador gigante con la web desplazándose
  const f = navegador(e, 104, 24, z, 150, 128);
  const vista: Punto3[] = [[107, f, z + 4], [251, f, z + 4], [251, f, z + 114], [107, f, z + 114]];
  e.caraY(107, f - 0.005, z + 4, 144, 110, '#FAFAF7');
  e.recorte(vista, (c) =>
    c.grupo({ clase: 'iso-desplaza', duracion: 11 }, (g) => {
      g.caraY(107, f, z + 66, 144, 48, VERDE);
      g.caraY(115, f, z + 98, 64, 6, BLANCO);
      g.caraY(115, f, z + 88, 46, 3.5, 'rgba(255,255,255,.65)');
      g.caraY(115, f, z + 74, 28, 8, PLATANO);
      g.caraY(192, f, z + 70, 52, 38, CIELO);
      g.caraY(202, f, z + 76, 32, 24, BLANCO);
      [0, 1, 2].forEach((i) => {
        g.caraY(113 + i * 46, f, z + 18, 42, 42, i === 1 ? '#FFF4CC' : BLANCO);
        g.caraY(118 + i * 46, f, z + 48, 10, 7, i === 1 ? PLATANO : '#DDF4E7');
        g.caraY(118 + i * 46, f, z + 38, 30, 3, GRIS_2);
        g.caraY(118 + i * 46, f, z + 32, 22, 3, GRIS);
      });
      g.caraY(107, f, z - 34, 144, 48, '#F3F2EC');
      g.caraY(115, f, z - 6, 70, 4, GRIS_2);
      g.caraY(198, f, z - 26, 44, 32, BLANCO);
      g.caraY(107, f, z - 70, 144, 34, TINTA);
    }),
  );
  aviso(e, 214, 40, z + 140, VERDE, 1.2);
  aviso(e, 96, 26, z + 122, 'blanco', 4.2, 2);

  // Torre de resultados
  [30, 48, 70].forEach((h, i) =>
    e.grupo({ clase: 'iso-crece', retraso: i * 0.3, duracion: 5 }, (g) =>
      g.caja({ x: 266, y: 104 + i * 22, z, w: 16, d: 16, h, m: i === 2 ? 'verde' : 'menta', sombra: true }),
    ),
  );

  // Móvil flotando sobre la hierba
  e.sombra(176, 150, z, 22, 0.09);
  e.grupo({ clase: 'iso-flota', retraso: 1.2 }, (g) =>
    movil(g, 156, 140, z + 34, (cara, base) => {
      g.caraY(159, cara, base + 38, 32, 26, VERDE);
      g.caraY(163, cara, base + 54, 18, 3.5, BLANCO);
      g.caraY(163, cara, base + 44, 12, 5, PLATANO);
      g.caraY(163, cara, base + 26, 24, 8, '#DDF4E7');
      g.caraY(163, cara, base + 14, 24, 8, GRIS);
    }),
  );

  // Arcos de datos: estudio, móvil y web conectados
  e.arco([50, 58, z + 96], [150, 32, z + 128], 50, VERDE, { n: 2, duracion: 3.2 });
  e.arco([175, 146, z + 110], [180, 32, z + 96], 46, CORAL, { n: 2, duracion: 2.8, retraso: -1 });
  e.arco([210, 32, z + 60], [274, 148, z + 72], 34, PLATANO, { n: 1, duracion: 2.6 });

  // Furgoneta que circula
  e.viajero([[-20, 196, z + 1], [W + 20, 196, z + 1]], { duracion: 14 }, (g) => {
    g.caja({ x: -22, y: -8, z: 2, w: 34, d: 16, h: 18, m: 'blanco' });
    g.caja({ x: 12, y: -7, z: 2, w: 10, d: 14, h: 12, m: 'verde' });
    g.caraX(22.01, -5, 8, 10, 5, CIELO);
    g.caraY(-16, 8.01, 8, 20, 6, VERDE);
    g.cilindro(-14, 8, 0, 3.4, 2, 'tinta');
    g.cilindro(14, 8, 0, 3.4, 2, 'tinta');
  });

  // Árboles, gente y ubicación
  arbol(e, 96, 120, z, 0.9, 0.3);
  arbol(e, 236, 168, z, 0.8, 1.1);
  arbol(e, 14, 160, z, 0.75, 0.6);
  e.persona(64, 150, z, 'coral', 0.9);
  e.persona(238, 160, z, 'azul', 0.9);
  pin(e, 112, 150, z);

  // Nubes que pasan
  e.nube(120, 60, z + 230, z, { duracion: 38, retraso: -10, escala: 1.1 });
  e.nube(230, 120, z + 200, z, { duracion: 46, retraso: -30, escala: 0.8 });
}

/* ── Mapa de la provincia con los municipios reales ───────────────── */

const COLORES_COMARCA = ['verde', 'azul', 'coral', 'platano', 'lila', 'cielo', 'menta', 'arena'] as const;

function mapa(e: Escena) {
  const lon = (v: number) => (v + 3.2) * 190;
  const lat = (v: number) => (37.98 - v) * 190;
  const con = pueblos.filter((p) => p.coords);
  const xs = con.map((p) => lon(p.coords![0]));
  const ys = con.map((p) => lat(p.coords![1]));
  const x0 = Math.min(...xs) - 18;
  const y0 = Math.min(...ys) - 18;
  const W = Math.max(...xs) - x0 + 18;
  const D = Math.max(...ys) - y0 + 18;
  e.sombraCaja(x0, y0, -2, W, D, 10, 0.05);
  e.caja({ x: x0, y: y0, w: W, d: D, h: 8, m: 'verde', brillo: false });
  e.caja({ x: x0, y: y0, z: 8, w: W, d: D, h: 6, m: 'blanco' });
  const z = 14;
  for (let i = x0 + 45; i < x0 + W; i += 45) e.linea([i, y0 + 4, z], [i, y0 + D - 4, z], GRIS, 1, ' stroke-dasharray="2 6"');
  for (let j = y0 + 45; j < y0 + D; j += 45) e.linea([x0 + 4, j, z], [x0 + W - 4, j, z], GRIS, 1, ' stroke-dasharray="2 6"');

  const vera = pueblos.find((p) => p.slug === 'vera')!;
  const vx = lon(vera.coords![0]);
  const vy = lat(vera.coords![1]);

  // Conexiones desde el estudio a los municipios principales
  const destinos = con.filter((p) => esPuebloIndexable(p.slug) && p.slug !== 'vera');
  destinos.forEach((p, i) => {
    const px = lon(p.coords![0]);
    const py = lat(p.coords![1]);
    const dist = Math.hypot(px - vx, py - vy);
    e.arco([vx, vy, z + 46], [px, py, z + 14], 18 + dist * 0.25, i % 3 === 0 ? CORAL : VERDE, { n: 1, duracion: 2.4 + dist / 90, retraso: -i * 0.37 });
  });

  // Columnas de cada municipio (altura según población), de atrás a delante
  const orden = [...con].sort((a, b) => lon(a.coords![0]) + lat(a.coords![1]) - (lon(b.coords![0]) + lat(b.coords![1])));
  for (const p of orden) {
    const px = lon(p.coords![0]);
    const py = lat(p.coords![1]);
    const h = p.slug === 'vera' ? 46 : 6 + Math.log10(Math.max(p.poblacion ?? 1500, 300)) * 6;
    const i = Math.max(0, comarcas.indexOf(p.comarca as (typeof comarcas)[number]));
    const m = p.slug === 'vera' ? 'platano' : COLORES_COMARCA[i % COLORES_COMARCA.length];
    const lado = esPuebloIndexable(p.slug) ? 9 : 6;
    const principal = esPuebloIndexable(p.slug);
    e.caja({ x: px - lado / 2, y: py - lado / 2, z, w: lado, d: lado, h, m, sombra: principal, brillo: principal });
  }
  e.ondas(vx, vy, z, 26, CORAL);
  ['almeria', 'el-ejido', 'mojacar', 'albox', 'macael', 'nijar', 'adra', 'huercal-overa'].forEach((slug) => {
    const p = pueblos.find((x) => x.slug === slug);
    if (!p?.coords) return;
    e.cartel([lon(p.coords[0]), lat(p.coords[1]), z + 44], p.nombre);
  });
  e.cartel([vx, vy, z + 82], 'Vera · estudio', { color: '#fff', fondo: VERDE });
}

/* ── Proceso: recorrido por cuatro estaciones ─────────────────────── */

function recorrido(e: Escena) {
  const estaciones: [number, number][] = [[0, 150], [70, 100], [140, 50], [210, 0]];
  const mats = ['blanco', 'menta', 'cielo', 'verde'] as const;
  estaciones.forEach(([x, y], i) => e.caja({ x, y, z: 0, w: 60, d: 60, h: 10 + i * 10, m: mats[i], sombra: true }));
  const camino: Punto3[] = estaciones.map(([x, y], i) => [x + 30, y + 30, 10 + i * 10 + 1] as Punto3);
  e.ruta(camino, GRIS_2, 3, ' stroke-dasharray="2 7"');
  const [a, b, c, d] = estaciones;
  // 1 · Te escuchamos
  e.caja({ x: a[0] + 16, y: a[1] + 22, z: 10, w: 28, d: 6, h: 20, m: 'verde' });
  [0, 1, 2].forEach((k) => e.caraY(a[0] + 21 + k * 7, a[1] + 28.01, 18, 4, 4, BLANCO));
  // 2 · Propuesta por escrito
  [0, 1, 2].forEach((k) => e.caja({ x: b[0] + 14, y: b[1] + 14 + k * 3, z: 20 + k * 4, w: 30, d: 30, h: 3, m: k === 2 ? 'blanco' : 'arena' }));
  // 3 · Diseño
  e.caja({ x: c[0] + 12, y: c[1] + 24, z: 30, w: 36, d: 5, h: 28, m: 'blanco' });
  e.caraY(c[0] + 15, c[1] + 29.01, 44, 30, 10, VERDE);
  e.caraY(c[0] + 15, c[1] + 29.01, 34, 14, 8, PLATANO);
  // 4 · Lanzamiento
  e.caja({ x: d[0] + 22, y: d[1] + 22, z: 40, w: 16, d: 16, h: 34, m: 'blanco' });
  e.caja({ x: d[0] + 24, y: d[1] + 24, z: 74, w: 12, d: 12, h: 8, m: 'coral' });
  e.grupo({ clase: 'iso-latido', duracion: 1.6 }, (g) => g.esfera([d[0] + 30, d[1] + 30, 34], 8, PLATANO));
  // Viajero que recorre los pasos y check en cada estación, en secuencia
  e.flujo(camino.map(([x, y, zz]) => [x, y, zz + 10] as Punto3), PLATANO, { n: 1, duracion: 6, radio: 7 });
  estaciones.forEach(([x, y], i) =>
    e.grupo({ clase: 'iso-aparece', retraso: i * 1.5, duracion: 6 }, (g) => {
      g.esfera([x + 50, y + 8, 50 + i * 10], 8, VERDE);
      g.ruta([[x + 47, y + 8, 50 + i * 10], [x + 49.5, y + 8, 47 + i * 10], [x + 54, y + 8, 53 + i * 10]], BLANCO, 2);
    }),
  );
}

/* ── Escenas ──────────────────────────────────────────────────────── */

function web(e: Escena) {
  const z = plataforma(e);
  arbol(e, 22, 26, z, 0.95, 0.4);

  // Navegador grande con la web desplazándose dentro de la pantalla
  const f = navegador(e, 52, 26, z, 152, 120);
  const vista: Punto3[] = [[55, f, z + 4], [201, f, z + 4], [201, f, z + 106], [55, f, z + 106]];
  e.caraY(55, f - 0.005, z + 4, 146, 102, '#FAFAF7');
  e.recorte(vista, (c) =>
    c.grupo({ clase: 'iso-desplaza', duracion: 10 }, (g) => {
      // Cabecera de la web
      g.caraY(55, f, z + 62, 146, 44, VERDE);
      g.caraY(63, f, z + 92, 60, 5, BLANCO);
      g.caraY(63, f, z + 84, 44, 3.5, 'rgba(255,255,255,.65)');
      g.caraY(63, f, z + 70, 26, 8, PLATANO);
      g.caraY(140, f, z + 66, 52, 36, CIELO);
      g.caraY(150, f, z + 72, 32, 22, BLANCO);
      // Tarjetas de servicios
      [0, 1, 2].forEach((i) => {
        g.caraY(61 + i * 47, f, z + 18, 42, 38, i === 1 ? '#FFF4CC' : BLANCO);
        g.caraY(66 + i * 47, f, z + 44, 10, 7, i === 1 ? PLATANO : '#DDF4E7');
        g.caraY(66 + i * 47, f, z + 34, 30, 3, GRIS_2);
        g.caraY(66 + i * 47, f, z + 28, 22, 3, GRIS);
      });
      // Bloque inferior con opiniones y pie
      g.caraY(55, f, z - 30, 146, 44, '#F3F2EC');
      g.caraY(63, f, z - 4, 70, 4, GRIS_2);
      g.caraY(63, f, z - 12, 50, 3, GRIS);
      g.caraY(150, f, z - 22, 42, 30, BLANCO);
      g.caraY(55, f, z - 62, 146, 30, TINTA);
      g.caraY(63, f, z - 44, 40, 3, '#5A6153');
    }),
  );
  aviso(e, 160, 40, z + 132, VERDE, 1.5);

  // Móvil con la misma web
  e.sombra(44, 186, z, 22, 0.09);
  e.grupo({ clase: 'iso-flota', retraso: 1.2 }, (g) =>
    movil(g, 24, 176, z + 28, (cara, base) => {
      g.caraY(27, cara, base + 38, 32, 26, VERDE);
      g.caraY(31, cara, base + 54, 18, 3.5, BLANCO);
      g.caraY(31, cara, base + 44, 12, 5, PLATANO);
      g.caraY(31, cara, base + 26, 24, 8, '#DDF4E7');
      g.caraY(31, cara, base + 14, 24, 8, GRIS);
    }),
  );

  // Visitas que llegan a la web
  e.flujo([[60, 176, z + 0.5], [60, 120, z + 0.5], [120, 120, z + 0.5], [120, 40, z + 0.5]], VERDE, { n: 4, duracion: 4.5, guia: GRIS_2 });

  // Tarjeta de resultados con barras que crecen
  e.sombra(186, 172, z, 30, 0.08);
  e.grupo({ clase: 'iso-flota', retraso: 0.6 }, (g) => {
    g.caja({ x: 160, y: 148, z: z + 44, w: 56, d: 48, h: 5, m: 'blanco' });
    [26, 38, 52].forEach((h, i) =>
      g.grupo({ clase: 'iso-crece', retraso: i * 0.35 }, (b) =>
        b.caja({ x: 168 + i * 15, y: 166, z: z + 49, w: 10, d: 10, h, m: i === 2 ? 'verde' : 'menta' }),
      ),
    );
  });

  pin(e, 118, 186, z);
}

function tienda(e: Escena) {
  const z = plataforma(e);
  // Local con escaparate y toldo
  e.caja({ x: 36, y: 26, z, w: 128, d: 78, h: 80, m: 'papel', sombra: true });
  const f = 104.01;
  e.caraY(48, f, z, 34, 54, BLANCO);
  e.caraY(51, f, z, 28, 50, CIELO);
  e.caraY(75, f, z + 22, 3, 6, PLATANO);
  e.caraY(92, f, z + 14, 62, 42, BLANCO);
  e.caraY(95, f, z + 17, 56, 36, CIELO);
  // Productos en el escaparate
  ([[100, 'platano', 14], [116, 'coral', 20], [132, 'verde', 16]] as const).forEach(([x, m, h]) => e.caja({ x, y: 96, z: z + 17, w: 10, d: 8, h, m }));
  for (let i = 0; i < 8; i++) e.caja({ x: 36 + i * 16, y: 104, z: z + 62, w: 16, d: 16, h: 4, m: i % 2 ? 'blanco' : 'verde', brillo: false });
  e.caraY(66, f, z + 70, 68, 8, PLATANO);
  e.caraY(74, f, z + 72.5, 52, 3, '#D39C12');

  // Envíos que salen hacia la furgoneta
  e.flujo([[100, 120, z + 1], [100, 158, z + 1], [156, 158, z + 1], [156, 172, z + 1]], '#D9C497', { n: 3, duracion: 4, radio: 4.5, guia: GRIS_2 });

  // Furgoneta de reparto
  e.caja({ x: 150, y: 172, z: z + 6, w: 58, d: 32, h: 34, m: 'blanco', sombra: true });
  e.caja({ x: 208, y: 174, z: z + 6, w: 10, d: 28, h: 22, m: 'verde' });
  e.caraX(218.01, 178, z + 16, 20, 9, CIELO);
  e.caraY(160, 204.01, z + 16, 36, 10, VERDE);
  e.cilindro(166, 205, z, 6, 3, 'tinta');
  e.cilindro(206, 205, z, 6, 3, 'tinta');

  // Carrito flotante
  e.sombra(52, 178, z, 24, 0.09);
  e.grupo({ clase: 'iso-flota', retraso: 0.8 }, (g) => {
    g.caja({ x: 30, y: 164, z: z + 38, w: 46, d: 30, h: 24, m: 'verde' });
    g.caja({ x: 36, y: 168, z: z + 62, w: 14, d: 14, h: 12, m: 'platano' });
    g.caja({ x: 54, y: 172, z: z + 62, w: 14, d: 12, h: 18, m: 'coral' });
    g.cilindro(38, 196, z + 30, 4.5, 4, 'tinta');
    g.cilindro(70, 196, z + 30, 4.5, 4, 'tinta');
  });
  aviso(e, 120, 20, z + 110, VERDE, 0.5);
  arbol(e, 200, 34, z, 0.9);
}

function marketing(e: Escena) {
  const z = plataforma(e);
  // Barras de crecimiento que suben en bucle
  [34, 56, 80, 112].forEach((h, i) =>
    e.grupo({ clase: 'iso-crece', retraso: i * 0.3, duracion: 5 }, (g) =>
      g.caja({ x: 44 + i * 36, y: 64, z, w: 26, d: 26, h, m: i === 3 ? 'verde' : 'menta', sombra: true }),
    ),
  );
  // Línea de tendencia con un punto que la recorre
  const tendencia: Punto3[] = [[57, 77, z + 46], [93, 77, z + 70], [129, 77, z + 96], [165, 77, z + 130], [196, 77, z + 156]];
  e.ruta(tendencia, CORAL, 3.5);
  e.flujo(tendencia, CORAL, { n: 1, duracion: 3, radio: 5 });
  e.esfera([196, 77, z + 156], 6, CORAL);

  // Lupa flotante
  e.sombra(58, 180, z, 26, 0.08);
  e.grupo({ clase: 'iso-flota', retraso: 0.4 }, (g) => {
    g.cilindro(58, 176, z + 52, 24, 7, 'platano');
    g.cilindro(58, 176, z + 59, 17, 1, 'cristal');
    g.caja({ x: 72, y: 196, z: z + 46, w: 32, d: 9, h: 9, m: 'tinta' });
  });

  // Diana con ondas y dardo
  e.ondas(172, 182, z, 26, VERDE_2);
  e.cilindro(172, 182, z, 26, 6, 'blanco');
  e.cilindro(172, 182, z + 6, 18, 2, 'coral');
  e.cilindro(172, 182, z + 8, 10, 2, 'blanco');
  e.cilindro(172, 182, z + 10, 4, 2, 'coral');
  e.grupo({ clase: 'iso-flota', retraso: 1, duracion: 3 }, (g) => {
    g.linea([152, 202, z + 40], [172, 182, z + 14], TINTA, 2.4);
    g.caja({ x: 148, y: 200, z: z + 36, w: 6, d: 6, h: 10, m: 'verde' });
  });
}

function informatica(e: Escena) {
  const z = plataforma(e);
  // Armario de servidores con luces
  e.caja({ x: 30, y: 30, z, w: 56, d: 56, h: 128, m: 'tinta', sombra: true });
  for (let i = 0; i < 6; i++) {
    e.caraY(36, 86.01, z + 10 + i * 19, 44, 13, '#2C3128');
    e.caraY(40, 86.02, z + 15 + i * 19, 20, 2, '#4A5245');
    e.grupo({ clase: 'iso-parpadeo', retraso: i * 0.27, duracion: 1.2 + (i % 3) * 0.4 }, (g) =>
      g.caraY(70, 86.02, z + 14 + i * 19, 4, 4, i % 2 ? '#45AE77' : PLATANO),
    );
  }
  // Puesto de trabajo
  e.caja({ x: 120, y: 112, z, w: 84, d: 54, h: 36, m: 'arena', sombra: true });
  const f = navegador(e, 136, 122, z + 36, 54, 42, 'tinta');
  e.caraY(140, f, z + 40, 46, 26, '#1F2A1E');
  [0, 1, 2].forEach((i) => e.caraY(144, f + 0.01, z + 58 - i * 6, 18 + i * 8, 2.5, i === 1 ? PLATANO : '#45AE77'));
  e.caja({ x: 140, y: 150, z: z + 36, w: 30, d: 10, h: 2, m: 'blanco' });
  e.persona(214, 140, z, 'azul', 0.9);

  // Router con wifi
  e.caja({ x: 22, y: 150, z, w: 48, d: 32, h: 12, m: 'blanco', sombra: true });
  e.linea([30, 156, z + 12], [30, 156, z + 30], TINTA, 2);
  e.linea([62, 156, z + 12], [62, 156, z + 30], TINTA, 2);
  e.grupo({ clase: 'iso-parpadeo', duracion: 1 }, (g) => g.caraY(30, 182.01, z + 4, 4, 3, '#45AE77'));
  e.ondas(46, 166, z + 12, 30, VERDE_2);

  // Cables con datos
  e.flujo([[86, 64, z + 0.5], [104, 64, z + 0.5], [104, 138, z + 0.5], [120, 138, z + 0.5]], VERDE, { n: 3, duracion: 2.6, guia: '#8FCBA8' });
  e.flujo([[58, 86, z + 0.5], [58, 150, z + 0.5]], PLATANO, { n: 2, duracion: 2, guia: '#8FCBA8' });

  // Escudo flotante
  e.sombra(170, 34, z, 22, 0.06);
  e.grupo({ clase: 'iso-flota', retraso: 0.5 }, (g) => {
    g.caja({ x: 150, y: 30, z: z + 74, w: 40, d: 8, h: 46, m: 'verde' });
    g.caraY(162, 38.01, z + 90, 16, 5, BLANCO);
    g.caraY(167.5, 38.01, z + 84.5, 5, 16, BLANCO);
  });
}

function grafico(e: Escena) {
  const z = plataforma(e);
  // Abanico de muestras de color
  (['coral', 'platano', 'verde', 'azul', 'lila'] as const).forEach((c, i) =>
    e.grupo({ clase: 'iso-sube', retraso: i * 0.15 }, (g) => g.caja({ x: 30, y: 36 + i * 16, z, w: 64, d: 12, h: 22 + i * 14, m: c, sombra: i === 4 })),
  );
  // Lienzo con el logotipo
  e.caja({ x: 122, y: 28, z, w: 92, d: 8, h: 118, m: 'blanco', sombra: true });
  e.caraY(130, 36.01, z + 48, 76, 62, '#FFF4CC');
  e.esfera([168, 36.1, z + 80], 18, VERDE);
  e.esfera([174, 36.2, z + 86], 7, PLATANO);
  e.caraY(138, 36.01, z + 24, 60, 8, TINTA);
  e.caraY(148, 36.01, z + 12, 40, 5, GRIS_2);
  // Curva de Bézier con tiradores
  e.ruta([[120, 150, z + 1], [150, 140, z + 1], [175, 165, z + 1], [205, 150, z + 1]], TINTA, 2.5, ' class="iso-traza"');
  e.linea([120, 150, z + 1], [140, 125, z + 1], CORAL, 1.5);
  e.linea([205, 150, z + 1], [190, 185, z + 1], CORAL, 1.5);
  [[140, 125], [190, 185]].forEach(([x, y]) => e.esfera([x, y, z + 1], 3.5, CORAL));
  [[120, 150], [205, 150]].forEach(([x, y]) => e.caja({ x: x - 3, y: y - 3, z, w: 6, d: 6, h: 3, m: 'blanco' }));
  // Lápiz flotante
  e.sombra(70, 182, z, 30, 0.08);
  e.grupo({ clase: 'iso-flota', retraso: 0.7 }, (g) => {
    g.caja({ x: 26, y: 176, z: z + 40, w: 14, d: 12, h: 12, m: 'coral' });
    g.caja({ x: 40, y: 176, z: z + 40, w: 80, d: 12, h: 12, m: 'platano' });
    g.caja({ x: 120, y: 176, z: z + 40, w: 14, d: 12, h: 12, m: 'arena' });
    g.caja({ x: 134, y: 179, z: z + 43, w: 6, d: 6, h: 6, m: 'tinta' });
  });
}

function audiovisual(e: Escena) {
  const z = plataforma(e);
  // Claqueta
  e.caja({ x: 30, y: 50, z, w: 78, d: 56, h: 38, m: 'tinta', sombra: true });
  for (let i = 0; i < 4; i++) e.caja({ x: 30 + i * 20, y: 50, z: z + 38, w: 10, d: 56, h: 6, m: 'blanco', brillo: false });
  e.caraY(40, 106.01, z + 14, 30, 4, '#5A6153');
  e.caraY(40, 106.01, z + 24, 46, 4, '#5A6153');
  // Cámara en trípode
  [[150, 150], [190, 150], [170, 186]].forEach(([x, y]) => e.linea([x, y, z], [170, 160, z + 50], '#5A6153', 2.5));
  e.caja({ x: 146, y: 140, z: z + 50, w: 56, d: 36, h: 34, m: 'tinta' });
  e.caja({ x: 160, y: 176, z: z + 56, w: 24, d: 16, h: 22, m: 'tinta' });
  e.caraY(164, 192.01, z + 60, 16, 14, CIELO);
  e.caraY(167, 192.02, z + 63, 6, 6, BLANCO);
  e.grupo({ clase: 'iso-parpadeo', duracion: 1.4 }, (g) => g.esfera([196, 144, z + 88], 4, CORAL));
  // Dron con hélices que giran
  e.sombra(80, 168, z, 30, 0.08);
  e.grupo({ clase: 'iso-flota', retraso: 0.3, duracion: 4 }, (g) => {
    const c: Punto3 = [80, 168, z + 80];
    [[56, 144], [104, 144], [56, 192], [104, 192]].forEach(([x, y]) => {
      g.linea(c, [x, y, z + 82], '#5A6153', 3);
      g.cilindro(x, y, z + 80, 3, 4, 'tinta');
      g.helice([x, y, z + 85], 18);
    });
    g.caja({ x: 68, y: 156, z: z + 74, w: 24, d: 24, h: 10, m: 'blanco' });
    g.caja({ x: 74, y: 162, z: z + 66, w: 12, d: 12, h: 8, m: 'tinta' });
    g.caraY(77, 174.01, z + 68, 6, 5, CIELO);
  });
}

function apps(e: Escena) {
  const z = plataforma(e);
  // Servidor del que se sincronizan los móviles
  e.caja({ x: 150, y: 24, z, w: 54, d: 40, h: 34, m: 'blanco', sombra: true });
  e.caja({ x: 156, y: 28, z: z + 34, w: 42, d: 32, h: 18, m: 'cielo' });
  [0, 1].forEach((i) => e.caraY(158, 64.01, z + 8 + i * 12, 36, 6, i ? '#DDF4E7' : GRIS));

  const tel = (x: number, y: number, alto: number, color: string, retraso: number) => {
    e.sombra(x + 20, y + 4, z, 22, 0.08);
    e.grupo({ clase: 'iso-flota', retraso }, (g) =>
      movil(g, x, y, z + alto, (cara, base) => {
        g.caraY(x + 3, cara, base + 38, 32, 26, color);
        [0, 1, 2].forEach((i) => g.caraY(x + 7 + i * 10, cara, base + 24, 7, 7, i === 1 ? PLATANO : GRIS));
        g.caraY(x + 7, cara, base + 6, 24, 10, VERDE);
      }),
    );
  };
  e.flujo([[120, 64, z + 1], [120, 110, z + 1], [60, 110, z + 1]], VERDE, { n: 2, duracion: 3, guia: GRIS_2 });
  e.flujo([[176, 64, z + 1], [176, 150, z + 1], [126, 150, z + 1]], VERDE, { n: 2, duracion: 3.4, guia: GRIS_2 });
  tel(28, 90, 26, CIELO, 0);
  tel(88, 128, 12, '#FFB199', 0.6);
  aviso(e, 26, 60, z + 118, VERDE, 0.4);
  aviso(e, 96, 104, z + 104, CORAL, 3.4);
  e.persona(196, 186, z, 'coral', 1);
}

function ia(e: Escena) {
  const z = plataforma(e);
  // Documentos que entran
  [0, 1, 2].forEach((i) =>
    e.caja({ x: 18, y: 26 + i * 4, z: z + i * 7, w: 52, d: 66, h: 5, m: (['cielo', 'arena', 'blanco'] as const)[i], sombra: i === 0 }),
  );
  [0, 1, 2, 3].forEach((i) => e.losa(26, 40 + i * 10, z + 19.1, i ? 30 : 20, 4, i ? GRIS_2 : TINTA));
  // Flujos: documento → núcleo → tareas
  e.flujo([[70, 70, z + 1], [104, 70, z + 1], [104, 84, z + 1]], CORAL, { n: 2, duracion: 2.4, guia: GRIS_2 });
  e.flujo([[152, 130, z + 1], [176, 130, z + 1], [176, 160, z + 1]], VERDE, { n: 2, duracion: 2.4, guia: GRIS_2 });
  // Núcleo
  e.caja({ x: 90, y: 84, z, w: 62, d: 62, h: 40, m: 'tinta', sombra: true });
  e.grupo({ clase: 'iso-pulso', duracion: 2.4 }, (g) => g.caja({ x: 102, y: 96, z: z + 40, w: 38, d: 38, h: 10, m: 'verde' }));
  e.grupo({ clase: 'iso-flota', duracion: 3 }, (g) => g.esfera([121, 115, z + 74], 13, PLATANO));
  [0, 1, 2].forEach((i) => e.caraY(98 + i * 16, 146.01, z + 14, 10, 12, i === 1 ? '#45AE77' : '#3D4339'));
  // Tareas hechas
  [0, 1, 2].forEach((i) => {
    e.caja({ x: 160, y: 162 + i * 18, z, w: 50, d: 13, h: 7, m: 'blanco' });
    e.losa(166, 165 + i * 18, z + 7.05, 7, 7, i < 2 ? '#2E8A5F' : GRIS);
    e.losa(178, 167 + i * 18, z + 7.05, 24, 3, GRIS_2);
  });
  // Persona que aprueba
  e.persona(130, 190, z, 'coral', 1);
  e.grupo({ clase: 'iso-aparece', retraso: 1, duracion: 5 }, (g) => {
    g.esfera([130, 190, z + 66], 9, VERDE);
    g.ruta([[126, 190, z + 66], [129, 190, z + 63], [135, 190, z + 70]], BLANCO, 2.2);
  });
}

function soporte(e: Escena) {
  const z = plataforma(e);
  // Copias de seguridad que reciben datos
  e.flujo([[120, 90, z + 1], [120, 160, z + 1], [166, 160, z + 1]], VERDE, { n: 3, duracion: 2.8, guia: GRIS_2 });
  // Escudo grande
  e.caja({ x: 64, y: 54, z, w: 96, d: 14, h: 116, m: 'verde', sombra: true });
  e.caraY(92, 68.01, z + 46, 40, 12, BLANCO);
  e.caraY(106, 68.01, z + 32, 12, 40, BLANCO);
  [0, 1, 2].forEach((i) => e.cilindro(186, 160, z + i * 12, 20, 10, i === 2 ? 'platano' : 'blanco'));
  // Reloj con aguja que gira
  e.sombra(44, 176, z, 22, 0.08);
  e.grupo({ clase: 'iso-flota', retraso: 0.5 }, (g) => {
    g.cilindro(44, 176, z + 34, 22, 8, 'blanco');
    g.grupo({ clase: 'iso-gira', duracion: 8 }, (a) => a.linea([44, 176, z + 42], [44, 162, z + 42], TINTA, 2.6));
    g.cilindro(44, 176, z + 42, 2, 2, 'tinta');
  });
  arbol(e, 200, 34, z, 0.85);
}

function programador(e: Escena) {
  const z = plataforma(e);
  const f = navegador(e, 36, 30, z, 150, 116, 'tinta');
  const vista: Punto3[] = [[40, f, z + 4], [182, f, z + 4], [182, f, z + 100], [40, f, z + 100]];
  e.caraY(40, f - 0.005, z + 4, 142, 96, '#1C211A');
  const lineas: [number, number, string][] = [
    [0, 40, '#7CC4A0'], [10, 64, PLATANO], [10, 30, BLANCO], [20, 52, CIELO], [20, 38, '#FFB199'], [10, 24, '#7CC4A0'],
    [0, 46, PLATANO], [10, 58, CIELO], [20, 30, BLANCO], [10, 44, '#7CC4A0'], [0, 20, '#FFB199'], [10, 52, CIELO],
  ];
  e.recorte(vista, (c) =>
    c.grupo({ clase: 'iso-desplaza', duracion: 12 }, (g) => {
      lineas.forEach(([x, w, color], i) => {
        g.caraY(46, f, z + 88 - i * 11, 6, 4, '#3D4339');
        g.caraY(56 + x, f, z + 88 - i * 11, w, 4, color);
      });
    }),
  );
  e.grupo({ clase: 'iso-parpadeo', duracion: 1 }, (g) => g.caraY(112, f + 0.01, z + 22, 3, 8, PLATANO));
  // Componentes que se ensamblan y se conectan
  e.flujo([[110, 146, z + 1], [110, 174, z + 1], [150, 174, z + 1]], PLATANO, { n: 2, duracion: 2.6, guia: GRIS_2 });
  e.caja({ x: 150, y: 160, z, w: 30, d: 28, h: 22, m: 'verde', sombra: true });
  e.caja({ x: 186, y: 160, z, w: 28, d: 28, h: 34, m: 'platano', sombra: true });
  e.grupo({ clase: 'iso-flota', retraso: 0.6 }, (g) => g.caja({ x: 168, y: 162, z: z + 52, w: 26, d: 24, h: 18, m: 'cielo' }));
  arbol(e, 26, 188, z, 0.9);
}

/* ── Municipios ───────────────────────────────────────────────────── */

export interface RasgosPueblo {
  mar?: boolean;
  sierra?: boolean;
  invernaderos?: boolean;
  marmol?: boolean;
  castillo?: boolean;
  /** Semilla para variar la disposición de las casas entre municipios. */
  semilla?: number;
}

/* Generador pseudoaleatorio determinista: el mismo pueblo dibuja siempre lo mismo. */
function aleatorio(semilla: number) {
  let x = semilla || 1;
  return () => {
    x = (x * 16807) % 2147483647;
    return (x - 1) / 2147483646;
  };
}

function casa(e: Escena, x: number, y: number, z: number, w: number, d: number, h: number, puerta: string, azotea: boolean) {
  e.caja({ x, y, z, w, d, h, m: 'blanco', sombra: true });
  e.caraY(x + w / 2 - 4, y + d + 0.01, z, 8, 13, puerta);
  e.caraY(x + 5, y + d + 0.01, z + h - 13, 7, 7, CIELO);
  e.caraX(x + w + 0.01, y + d / 2 - 4, z + h - 14, 8, 8, CIELO);
  if (azotea) e.caja({ x: x + 4, y: y + 4, z: z + h, w: w * 0.4, d: d * 0.4, h: 6, m: 'blanco' });
}

function dibujarPueblo(e: Escena, r: RasgosPueblo) {
  const z = plataforma(e, 260, 240);
  const azar = aleatorio(r.semilla ?? 7);

  if (r.mar) {
    e.losa(0, 172, z + 0.3, 260, 68, '#CFE6F5');
    e.losa(0, 172, z + 0.4, 260, 6, '#E3F2FC');
    e.grupo({ clase: 'iso-ola' }, (g) => {
      g.linea([20, 194, z + 1], [70, 194, z + 1], BLANCO, 2);
      g.linea([110, 218, z + 1], [170, 218, z + 1], BLANCO, 2);
      g.linea([200, 198, z + 1], [240, 198, z + 1], BLANCO, 2);
    });
    e.grupo({ clase: 'iso-flota', retraso: 0.9, duracion: 5 }, (g) => {
      g.caja({ x: 150, y: 198, z: z + 1, w: 34, d: 12, h: 6, m: 'coral' });
      g.linea([167, 204, z + 7], [167, 204, z + 36], TINTA, 2);
      g.caraY(168, 204, z + 14, 15, 20, BLANCO, ` stroke="${GRIS_2}" stroke-width=".8"`);
    });
  }

  if (r.sierra) {
    const montes: [number, number, number][] = [[0, 0, 70], [60, 0, 96], [130, 0, 60]];
    montes.forEach(([x, y, h]) => {
      e.caja({ x, y, z, w: 60, d: 26, h: h * 0.35, m: 'menta' });
      e.caja({ x: x + 10, y: y + 4, z: z + h * 0.35, w: 40, d: 18, h: h * 0.35, m: 'menta' });
      e.caja({ x: x + 20, y: y + 8, z: z + h * 0.7, w: 20, d: 10, h: h * 0.3, m: 'blanco' });
    });
  }

  if (r.marmol) {
    [[200, 118, 30], [222, 126, 20], [206, 142, 16]].forEach(([x, y, h], i) =>
      e.grupo({ clase: 'iso-sube', retraso: i * 0.2 }, (g) => g.caja({ x, y, z, w: 22, d: 18, h, m: 'blanco', sombra: true })),
    );
  }

  const fondoY = r.mar ? 168 : 240;
  if (r.invernaderos) {
    [0, 1, 2].forEach((i) => {
      e.caja({ x: 20 + i * 34, y: fondoY - 46, z, w: 30, d: 40, h: 14, m: 'cristal' });
      e.linea([20 + i * 34 + 15, fondoY - 46, z + 14], [20 + i * 34 + 15, fondoY - 6, z + 14], '#9BC9E8', 1);
    });
  }

  const y0 = r.sierra ? 40 : 30;
  const huecos: [number, number][] = [[40, y0], [90, y0 - 6], [134, y0 + 14], [56, y0 + 66], [106, y0 + 62], [160, y0 + 56]];
  huecos.forEach(([x, y], i) => {
    if (r.invernaderos && y > fondoY - 60 && x < 120) return;
    const w = 28 + Math.round(azar() * 14);
    const d = 26 + Math.round(azar() * 12);
    const h = 24 + Math.round(azar() * 26);
    casa(e, x, y, z, w, d, h, i % 2 ? '#8FCBA8' : '#93C3E5', azar() > 0.6);
  });

  if (r.castillo) {
    e.caja({ x: 196, y: 24, z, w: 44, d: 36, h: 44, m: 'arena', sombra: true });
    [0, 1, 2, 3].forEach((i) => e.caja({ x: 196 + i * 12, y: 24, z: z + 44, w: 8, d: 6, h: 8, m: 'arena' }));
    e.caja({ x: 222, y: 28, z: z + 44, w: 16, d: 16, h: 24, m: 'arena' });
  } else {
    e.caja({ x: 200, y: 30, z, w: 26, d: 26, h: 76, m: 'arena', sombra: true });
    e.caja({ x: 204, y: 34, z: z + 76, w: 18, d: 18, h: 14, m: 'platano' });
  }

  arbol(e, 26, r.mar ? 146 : 200, z, 0.8, 0.2);
  arbol(e, 236, r.mar ? 132 : 210, z, 0.9, 0.8);
  pin(e, 120, 74, z + 46);
}

function pueblo(e: Escena) {
  dibujarPueblo(e, { mar: true, semilla: 7 });
}

/** Escena de un municipio concreto, con sus rasgos. */
export function escenaPueblo(rasgos: RasgosPueblo, titulo?: string, independiente = false) {
  const e = new Escena();
  dibujarPueblo(e, rasgos);
  return e.svg({ titulo, clase: 'iso-pueblo', independiente });
}

/* ── Apoyo ────────────────────────────────────────────────────────── */

function contacto(e: Escena) {
  const z = plataforma(e, 220, 200);
  // Sobre flotante
  e.sombra(80, 80, z, 46, 0.07);
  e.grupo({ clase: 'iso-flota' }, (g) => {
    g.caja({ x: 30, y: 44, z: z + 44, w: 104, d: 72, h: 10, m: 'platano' });
    g.losa(34, 48, z + 54.01, 96, 64, '#FFF4CC');
    g.ruta([[34, 48, z + 54.2], [82, 86, z + 54.2], [130, 48, z + 54.2]], '#D39C12', 3);
    g.esfera([82, 86, z + 62], 9, CORAL);
  });
  // Teléfono que suena
  e.caja({ x: 150, y: 40, z, w: 46, d: 40, h: 14, m: 'tinta', sombra: true });
  e.grupo({ clase: 'iso-balanceo', duracion: 0.6 }, (g) => g.caja({ x: 154, y: 46, z: z + 14, w: 38, d: 12, h: 8, m: 'verde' }));
  e.ondas(173, 60, z + 22, 22, VERDE_2);
  // Conversación
  aviso(e, 130, 136, z + 30, VERDE, 0.4, 2);
  aviso(e, 40, 150, z + 20, PLATANO, 2.4, 2);
  e.persona(196, 176, z, 'verde', 1);
}

function blog(e: Escena) {
  const z = plataforma(e, 200, 180);
  [0, 1, 2, 3].forEach((i) =>
    e.caja({ x: 24, y: 40, z: z + i * 12, w: 80, d: 100, h: 10, m: (['verde', 'blanco', 'platano', 'blanco'] as const)[i], sombra: i === 0 }),
  );
  e.sombra(148, 56, z, 30, 0.07);
  e.grupo({ clase: 'iso-flota', retraso: 0.4 }, (g) => {
    g.caja({ x: 118, y: 52, z: z + 40, w: 62, d: 8, h: 80, m: 'blanco' });
    g.caraY(124, 60.01, z + 90, 50, 22, CIELO);
    [0, 1, 2, 3].forEach((i) => g.caraY(126, 60.01, z + 80 - i * 10, i === 0 ? 30 : 46, 4, i === 0 ? TINTA : GRIS_2));
  });
  e.persona(160, 140, z, 'coral', 0.95);
}

/* ── Registro ─────────────────────────────────────────────────────── */

const DIBUJOS: Record<NombreEscena, (e: Escena) => void> = {
  portada, mapa, web, tienda, marketing, informatica, grafico, audiovisual, apps, ia, soporte, programador, pueblo, contacto, proceso: recorrido, blog,
};

export function escena(nombre: NombreEscena, opciones: { titulo?: string; independiente?: boolean } = {}) {
  const e = new Escena();
  DIBUJOS[nombre](e);
  return e.svg({ titulo: opciones.titulo, clase: `iso-${nombre}`, independiente: opciones.independiente });
}

export const ESCENAS = Object.keys(DIBUJOS) as NombreEscena[];

/* ── Iconos isométricos de servicio ───────────────────────────────────
   Un objeto sobre una baldosa: legibles a 56-72 px, para menús y tarjetas. */

function baldosa(e: Escena) {
  e.caja({ x: 0, y: 0, w: 60, d: 60, h: 5, m: 'menta', brillo: false });
  return 5;
}

const MINIS: Record<string, (e: Escena) => void> = {
  web: (e) => {
    const z = baldosa(e);
    e.caja({ x: 10, y: 18, z, w: 42, d: 5, h: 34, m: 'blanco' });
    e.caraY(13, 23.01, z + 24, 36, 7, VERDE);
    e.caraY(13, 23.01, z + 4, 16, 17, '#FFF4CC');
    e.caraY(31, 23.01, z + 4, 18, 17, CIELO);
  },
  tienda: (e) => {
    const z = baldosa(e);
    e.caja({ x: 12, y: 12, z, w: 38, d: 30, h: 28, m: 'papel' });
    for (let i = 0; i < 4; i++) e.caja({ x: 12 + i * 9.5, y: 42, z: z + 22, w: 9.5, d: 8, h: 3, m: i % 2 ? 'blanco' : 'verde', brillo: false });
    e.caraY(18, 42.01, z, 12, 16, CIELO);
    e.caraY(34, 42.01, z + 6, 12, 10, CIELO);
  },
  apps: (e) => {
    const z = baldosa(e);
    e.caja({ x: 18, y: 26, z, w: 22, d: 4, h: 40, m: 'tinta' });
    e.caraY(20, 30.01, z + 4, 18, 32, BLANCO);
    e.caraY(22, 30.02, z + 20, 14, 12, VERDE);
    e.caraY(22, 30.02, z + 8, 14, 6, PLATANO);
  },
  programador: (e) => {
    const z = baldosa(e);
    e.caja({ x: 10, y: 18, z, w: 42, d: 5, h: 32, m: 'tinta' });
    [0, 1, 2, 3].forEach((i) => e.caraY(15 + (i % 2) * 4, 23.01, z + 24 - i * 6, 14 + i * 4, 3, [PLATANO, '#7CC4A0', CIELO, '#FFB199'][i]));
  },
  marketing: (e) => {
    const z = baldosa(e);
    [14, 22, 32].forEach((h, i) => e.caja({ x: 10 + i * 14, y: 24, z, w: 10, d: 10, h, m: i === 2 ? 'verde' : 'blanco' }));
    e.ruta([[15, 29, z + 20], [29, 29, z + 28], [43, 29, z + 40]], CORAL, 2.4);
  },
  grafico: (e) => {
    const z = baldosa(e);
    (['coral', 'platano', 'verde'] as const).forEach((m, i) => e.caja({ x: 12, y: 14 + i * 11, z, w: 34, d: 9, h: 10 + i * 9, m }));
  },
  audiovisual: (e) => {
    const z = baldosa(e);
    e.caja({ x: 12, y: 16, z, w: 32, d: 22, h: 20, m: 'tinta' });
    e.caja({ x: 20, y: 38, z: z + 4, w: 14, d: 8, h: 12, m: 'tinta' });
    e.caraY(22, 46.01, z + 6, 10, 8, CIELO);
    e.esfera([40, 18, z + 22], 2.5, CORAL);
  },
  informatica: (e) => {
    const z = baldosa(e);
    e.caja({ x: 16, y: 16, z, w: 24, d: 24, h: 44, m: 'tinta' });
    [0, 1, 2, 3].forEach((i) => {
      e.caraY(19, 40.01, z + 5 + i * 9, 18, 6, '#2C3128');
      e.caraY(31, 40.02, z + 7 + i * 9, 3, 2, i % 2 ? '#45AE77' : PLATANO);
    });
  },
  ia: (e) => {
    const z = baldosa(e);
    e.caja({ x: 12, y: 12, z, w: 36, d: 36, h: 18, m: 'tinta' });
    e.caja({ x: 19, y: 19, z: z + 18, w: 22, d: 22, h: 5, m: 'verde' });
    e.esfera([30, 30, z + 36], 7, PLATANO);
  },
  soporte: (e) => {
    const z = baldosa(e);
    e.caja({ x: 14, y: 24, z, w: 32, d: 6, h: 40, m: 'verde' });
    e.caraY(24, 30.01, z + 18, 12, 4, BLANCO);
    e.caraY(28, 30.01, z + 14, 4, 12, BLANCO);
  },
};

export function escenaIcono(nombre: string, independiente = false) {
  const dibujar = MINIS[nombre] ?? MINIS.web;
  const e = new Escena();
  dibujar(e);
  return e.svg({ margen: 4, clase: 'iso-mini', independiente });
}

export const ICONOS_SERVICIO = Object.keys(MINIS);
