/* Escenas del clúster /programador-web/: la integración de sistemas (portada
   del pilar), una mini escena animada por tecnología y una por sector. */
import { Escena, type Punto3 } from './iso';
import { plataforma, navegador, movil, aviso, baldosa, escenaPueblo, type RasgosPueblo } from './escenas';
import type { SlugTecnologia } from '../data/tecnologias';

const TINTA = '#14160F';
const VERDE = '#0E5B3A';
const VERDE_2 = '#3A9A6B';
const PLATANO = '#FFCF3F';
const CORAL = '#FF7F5C';
const CIELO = '#BFDFF4';
const GRIS = '#E9EAE3';
const GRIS_2 = '#D7D9CF';
const BLANCO = '#FFFFFF';

/* ── Integración: lo que ya tienes, conectado ─────────────────────── */

function integracion(e: Escena) {
  const z = plataforma(e, 280, 260);

  // Motor central con código que se desplaza en su pantalla
  const cx = 110;
  const cy = 100;
  e.caja({ x: cx, y: cy, z, w: 64, d: 64, h: 46, m: 'tinta', sombra: true });
  const f = cy + 64.01;
  const vista: Punto3[] = [[cx + 6, f, z + 6], [cx + 58, f, z + 6], [cx + 58, f, z + 40], [cx + 6, f, z + 40]];
  e.caraY(cx + 6, f - 0.005, z + 6, 52, 34, '#1C211A');
  const lineas: [number, number, string][] = [[0, 26, '#7CC4A0'], [6, 34, PLATANO], [6, 18, BLANCO], [12, 28, CIELO], [6, 22, '#FFB199'], [0, 30, '#7CC4A0'], [6, 20, PLATANO], [12, 26, CIELO]];
  e.recorte(vista, (c) =>
    c.grupo({ clase: 'iso-desplaza', duracion: 7 }, (g) =>
      lineas.forEach(([x, w, color], i) => g.caraY(cx + 10 + x, f, z + 34 - i * 6, w, 2.6, color)),
    ),
  );
  e.grupo({ clase: 'iso-pulso', duracion: 2.2 }, (g) => g.caja({ x: cx + 14, y: cy + 14, z: z + 46, w: 36, d: 36, h: 8, m: 'verde' }));
  e.grupo({ clase: 'iso-flota', duracion: 3 }, (g) => g.esfera([cx + 32, cy + 32, z + 76], 11, PLATANO));
  e.ondas(cx + 32, cy + 32, z + 54, 34, VERDE_2);

  // Hoja de cálculo (lo que hoy se hace a mano)
  e.caja({ x: 16, y: 20, z, w: 66, d: 8, h: 64, m: 'blanco', sombra: true });
  for (let fila = 0; fila < 6; fila++) {
    for (let col = 0; col < 4; col++) {
      e.caraY(20 + col * 15, 28.01, z + 50 - fila * 8, 13, 6, fila === 0 ? '#DDF4E7' : (fila + col) % 3 === 0 ? '#FFE2D8' : '#F6F5EF');
    }
  }
  e.caraY(20, 28.01, z + 58, 58, 3, VERDE);
  e.cartel([49, 24, z + 86], 'Hoja de cálculo');

  // Programa de gestión (ERP) en un armario
  e.caja({ x: 200, y: 22, z, w: 42, d: 42, h: 84, m: 'tinta', sombra: true });
  for (let i = 0; i < 4; i++) {
    e.caraY(205, 64.01, z + 8 + i * 18, 32, 12, '#2C3128');
    e.grupo({ clase: 'iso-parpadeo', retraso: i * 0.3, duracion: 1.3 + (i % 2) * 0.5 }, (g) => g.caraY(230, 64.02, z + 12 + i * 18, 3.5, 3.5, i % 2 ? '#45AE77' : PLATANO));
  }
  e.cartel([221, 43, z + 104], 'Programa de gestión');

  // Base de datos
  [0, 1, 2].forEach((i) => e.cilindro(236, 150, z + i * 11, 18, 9, i === 2 ? 'menta' : 'blanco'));
  e.cartel([236, 150, z + 52], 'Base de datos');

  // Web y app que reciben el dato ya limpio
  const fw = navegador(e, 24, 196, z, 70, 52);
  e.caraY(27, fw, z + 24, 64, 14, VERDE);
  e.caraY(31, fw, z + 30, 30, 3, BLANCO);
  [0, 1, 2].forEach((i) => e.caraY(28 + i * 21, fw, z + 4, 18, 16, i === 1 ? '#FFF4CC' : '#F6F5EF'));
  e.cartel([59, 200, z + 64], 'Tu web');

  e.sombra(150, 214, z, 18, 0.09);
  e.grupo({ clase: 'iso-flota', retraso: 0.8 }, (g) =>
    movil(g, 132, 206, z + 24, (cara, base) => {
      g.caraY(135, cara, base + 38, 32, 26, VERDE);
      g.caraY(139, cara, base + 24, 24, 8, '#DDF4E7');
      g.caraY(139, cara, base + 10, 24, 8, PLATANO);
    }),
  );
  e.cartel([151, 209, z + 112], 'App');

  // Tuberías con datos: entra lo manual (coral), sale ordenado (verde)
  e.flujo([[49, 28, z + 0.6], [49, 132, z + 0.6], [110, 132, z + 0.6]], CORAL, { n: 3, duracion: 3, guia: GRIS_2 });
  e.flujo([[200, 50, z + 0.6], [190, 50, z + 0.6], [190, 120, z + 0.6], [174, 120, z + 0.6]], PLATANO, { n: 2, duracion: 2.6, guia: GRIS_2 });
  e.flujo([[218, 150, z + 0.6], [190, 150, z + 0.6], [190, 150, z + 0.6], [174, 150, z + 0.6]], PLATANO, { n: 2, duracion: 2.2, guia: GRIS_2 });
  e.flujo([[120, 164, z + 0.6], [120, 180, z + 0.6], [60, 180, z + 0.6], [60, 196, z + 0.6]], VERDE, { n: 3, duracion: 2.8, guia: GRIS_2 });
  e.flujo([[150, 164, z + 0.6], [150, 206, z + 0.6]], VERDE, { n: 2, duracion: 1.8, guia: GRIS_2 });

  // El aviso de «hecho» que antes era una tarde copiando
  aviso(e, 150, 96, z + 104, VERDE, 1.6);
  e.persona(96, 214, z, 'coral', 0.9);
}

/* ── Mini escenas por tecnología ──────────────────────────────────── */

const TECNOLOGIAS: Record<SlugTecnologia, (e: Escena) => void> = {
  wordpress: (e) => {
    const z = baldosa(e);
    e.caja({ x: 8, y: 16, z, w: 40, d: 5, h: 34, m: 'blanco' });
    e.caraY(11, 21.01, z + 24, 34, 7, VERDE);
    [0, 1].forEach((i) => e.caraY(11 + i * 18, 21.01, z + 4, 16, 16, i ? CIELO : '#FFF4CC'));
    e.grupo({ clase: 'iso-flota', retraso: 0.4, duracion: 3 }, (g) => g.caja({ x: 40, y: 34, z: z + 14, w: 14, d: 14, h: 12, m: 'platano' }));
  },
  astro: (e) => {
    const z = baldosa(e);
    [0, 1, 2].forEach((i) =>
      e.grupo({ clase: 'iso-crece', retraso: i * 0.3, duracion: 4 }, (g) => g.caja({ x: 10 + i * 4, y: 16 + i * 4, z: z + i * 8, w: 34, d: 30, h: 4, m: i === 2 ? 'verde' : 'blanco' })),
    );
    e.grupo({ clase: 'iso-pulso', duracion: 1.6 }, (g) => g.esfera([42, 20, z + 44], 6, PLATANO));
  },
  react: (e) => {
    const z = baldosa(e);
    const nodos: Punto3[] = [[30, 30, z + 34], [14, 40, z + 16], [46, 22, z + 16], [36, 48, z + 10]];
    [[0, 1], [0, 2], [0, 3]].forEach(([a, b]) => e.flujo([nodos[a], nodos[b]], VERDE_2, { n: 1, duracion: 1.8 + a * 0.2 + b * 0.2, radio: 2, guia: GRIS_2 }));
    nodos.forEach((p, i) => e.esfera(p, i ? 5 : 7, i ? CIELO : VERDE));
  },
  nextjs: (e) => {
    const z = baldosa(e);
    e.caja({ x: 6, y: 10, z, w: 20, d: 20, h: 30, m: 'tinta' });
    e.caja({ x: 30, y: 30, z, w: 26, d: 4, h: 24, m: 'blanco' });
    e.caraY(32, 34.01, z + 14, 22, 6, VERDE);
    e.arco([16, 20, z + 30], [43, 32, z + 24], 14, PLATANO, { n: 2, duracion: 2 });
  },
  nodejs: (e) => {
    const z = baldosa(e);
    e.caja({ x: 4, y: 8, z, w: 18, d: 18, h: 18, m: 'cielo' });
    e.caja({ x: 38, y: 34, z, w: 18, d: 18, h: 18, m: 'menta' });
    e.flujo([[22, 17, z + 9], [36, 17, z + 9], [36, 43, z + 9], [38, 43, z + 9]], VERDE, { n: 3, duracion: 1.8, radio: 2.4, guia: GRIS_2 });
  },
  python: (e) => {
    const z = baldosa(e);
    [0, 1, 2].forEach((i) => e.losa(6, 8 + i * 8, z + 0.5, 22, 5, i === 1 ? '#FFE2D8' : GRIS));
    [12, 20, 30].forEach((h, i) =>
      e.grupo({ clase: 'iso-crece', retraso: i * 0.3, duracion: 3.6 }, (g) => g.caja({ x: 30 + i * 9, y: 34, z, w: 7, d: 7, h, m: i === 2 ? 'verde' : 'menta' })),
    );
    e.flujo([[17, 26, z + 1], [17, 37, z + 1], [30, 37, z + 1]], PLATANO, { n: 2, duracion: 1.6, radio: 2 });
  },
  genai: (e) => {
    const z = baldosa(e);
    e.caja({ x: 8, y: 18, z, w: 26, d: 32, h: 4, m: 'blanco' });
    [0, 1, 2].forEach((i) => e.losa(12, 22 + i * 8, z + 4.05, i ? 16 : 10, 3, i ? GRIS_2 : TINTA));
    e.grupo({ clase: 'iso-pulso', duracion: 2 }, (g) => g.esfera([44, 26, z + 26], 8, PLATANO));
    e.arco([20, 34, z + 6], [44, 26, z + 20], 10, VERDE, { n: 2, duracion: 1.8 });
  },
  javascript: (e) => {
    const z = baldosa(e);
    e.caja({ x: 14, y: 14, z, w: 30, d: 30, h: 8, m: 'platano' });
    e.caja({ x: 14, y: 40, z: z + 8, w: 30, d: 4, h: 16, m: 'tinta' });
    e.grupo({ clase: 'iso-parpadeo', duracion: 1 }, (g) => g.caraY(36, 44.01, z + 14, 2.5, 6, PLATANO));
    for (let f = 0; f < 3; f++) for (let c = 0; c < 3; c++) e.losa(17 + c * 9, 17 + f * 7, z + 8.05, 6, 5, (f + c) % 4 === 0 ? VERDE : BLANCO);
  },
  apps: (e) => {
    const z = baldosa(e);
    e.caja({ x: 18, y: 26, z, w: 22, d: 4, h: 40, m: 'tinta' });
    e.caraY(20, 30.01, z + 4, 18, 32, BLANCO);
    e.caraY(22, 30.02, z + 20, 14, 12, VERDE);
    e.grupo({ clase: 'iso-aparece', duracion: 4 }, (g) => {
      g.caja({ x: 30, y: 26, z: z + 44, w: 20, d: 3, h: 9, m: 'verde' });
      g.caraY(33, 29.02, z + 47, 3, 3, PLATANO);
    });
  },
};

/* ── Escena de sector (reutiliza el municipio con rasgos del sector) ── */

const SECTORES: Record<string, RasgosPueblo> = {
  marmol: { marmol: true, sierra: true, semilla: 11 },
  agricultura: { invernaderos: true, semilla: 23 },
  turismo: { mar: true, castillo: true, semilla: 5 },
  pesca: { mar: true, semilla: 41 },
  inmobiliaria: { mar: true, semilla: 77 },
};

/* ── Registro ─────────────────────────────────────────────────────── */

export const TECNOLOGIAS_ISO = Object.keys(TECNOLOGIAS) as SlugTecnologia[];
export const SECTORES_ISO = Object.keys(SECTORES);

export function escenaIntegracion(independiente = false) {
  const e = new Escena();
  integracion(e);
  return e.svg({ clase: 'iso-integracion', independiente });
}

export function escenaTecnologia(slug: string, independiente = false) {
  const e = new Escena();
  (TECNOLOGIAS[slug as SlugTecnologia] ?? TECNOLOGIAS.javascript)(e);
  return e.svg({ margen: 6, clase: 'iso-mini', independiente });
}

export function escenaSector(slug: string, independiente = false) {
  return escenaPueblo(SECTORES[slug] ?? { semilla: 3 }, undefined, independiente);
}

/* ── Python: pipeline de datos ────────────────────────────────────── */

function pipelinePython(e: Escena) {
  const z = plataforma(e, 300, 236);

  // Fuentes: hoja de cálculo, PDF del proveedor, fichero del banco y una web
  e.caja({ x: 18, y: 18, z, w: 56, d: 6, h: 50, m: 'blanco', sombra: true });
  for (let f = 0; f < 5; f++) for (let c = 0; c < 4; c++) e.caraY(21 + c * 12.5, 24.01, z + 38 - f * 8, 11, 6, f === 0 ? '#DDF4E7' : (f + c) % 3 === 0 ? '#FFE2D8' : '#F6F5EF');

  [0, 1, 2].forEach((i) => e.caja({ x: 96, y: 14 + i * 3, z: z + i * 5, w: 38, d: 46, h: 4, m: i === 2 ? 'blanco' : 'papel', sombra: i === 0 }));
  e.losa(100, 22, z + 14.1, 12, 6, CORAL);
  [0, 1, 2].forEach((i) => e.losa(100, 32 + i * 7, z + 14.1, i ? 26 : 18, 3, i ? GRIS_2 : TINTA));

  e.caja({ x: 160, y: 16, z, w: 42, d: 36, h: 30, m: 'tinta', sombra: true });
  [0, 1, 2].forEach((i) => e.caraY(165, 52.01, z + 20 - i * 7, 30 - i * 6, 3, i === 0 ? PLATANO : '#5A6153'));

  const fw = navegador(e, 226, 20, z, 56, 46);
  e.caraY(229, fw, z + 20, 50, 12, CIELO);
  [0, 1].forEach((i) => e.caraY(232, fw, z + 12 - i * 6, 36 - i * 10, 3, GRIS_2));

  // Lo que entra (desordenado, coral) hacia el proceso
  e.flujo([[46, 24, z + 0.6], [46, 84, z + 0.6], [112, 84, z + 0.6], [112, 98, z + 0.6]], CORAL, { n: 2, duracion: 3.2, guia: GRIS_2 });
  e.flujo([[115, 60, z + 0.6], [130, 98, z + 0.6]], CORAL, { n: 2, duracion: 2.2, guia: GRIS_2 });
  e.flujo([[181, 52, z + 0.6], [181, 84, z + 0.6], [160, 84, z + 0.6], [160, 98, z + 0.6]], CORAL, { n: 2, duracion: 2.6, guia: GRIS_2 });
  e.flujo([[254, 66, z + 0.6], [254, 90, z + 0.6], [178, 90, z + 0.6], [178, 98, z + 0.6]], CORAL, { n: 2, duracion: 3, guia: GRIS_2 });

  // El proceso en Python (azul y amarillo), con código que corre en su frente
  const px = 104;
  const py = 98;
  e.caja({ x: px, y: py, z, w: 80, d: 56, h: 42, m: 'azul', sombra: true });
  e.grupo({ clase: 'iso-pulso', duracion: 2.4 }, (g) => g.caja({ x: px + 12, y: py + 10, z: z + 42, w: 56, d: 36, h: 8, m: 'platano' }));
  const f = py + 56.01;
  const vista: Punto3[] = [[px + 8, f, z + 6], [px + 72, f, z + 6], [px + 72, f, z + 36], [px + 8, f, z + 36]];
  e.caraY(px + 8, f - 0.005, z + 6, 64, 30, '#1C2747');
  const lineas: [number, number, string][] = [[0, 30, PLATANO], [6, 40, '#9BC9E8'], [6, 22, BLANCO], [12, 34, PLATANO], [6, 28, '#7CC4A0'], [0, 38, '#9BC9E8'], [6, 24, PLATANO], [12, 30, BLANCO]];
  e.recorte(vista, (c) =>
    c.grupo({ clase: 'iso-desplaza', duracion: 6 }, (g) => lineas.forEach(([x, w, color], i) => g.caraY(px + 12 + x, f, z + 30 - i * 5, w, 2.4, color))),
  );

  // Sale ordenado (verde) por la cinta hacia el informe y el panel
  e.losa(130, 156, z + 0.4, 20, 48, '#5A6153');
  for (let k = 0; k < 6; k++) e.linea([130, 160 + k * 8, z + 0.6], [150, 160 + k * 8, z + 0.6], '#3D4339', 1);
  e.flujo([[140, 156, z + 2], [140, 202, z + 2]], VERDE, { n: 3, duracion: 1.8, radio: 3.6 });
  e.flujo([[184, 126, z + 0.6], [214, 126, z + 0.6], [214, 158, z + 0.6]], VERDE, { n: 2, duracion: 2, guia: GRIS_2 });

  // Informe automático con barras que crecen
  e.caja({ x: 112, y: 206, z, w: 60, d: 6, h: 54, m: 'blanco', sombra: true });
  e.caraY(116, 212.01, z + 44, 30, 4, TINTA);
  [18, 28, 38].forEach((h, i) =>
    e.grupo({ clase: 'iso-crece', retraso: i * 0.3, duracion: 4 }, (g) => g.caraY(118 + i * 15, 212.02, z + 6, 10, h, i === 2 ? VERDE : '#93D0AE')),
  );

  // Panel con los datos al día
  const fp = navegador(e, 214, 158, z, 70, 54);
  [0, 1, 2, 3].forEach((i) => e.grupo({ clase: 'iso-crece', retraso: 0.2 + i * 0.25, duracion: 5 }, (g) => g.caraY(220 + i * 15, fp, z + 4, 10, 12 + i * 7, i === 3 ? VERDE : CIELO)));

  // El informe sale solo por correo
  e.arco([142, 209, z + 60], [290, 236, z + 26], 46, PLATANO, { n: 2, duracion: 2.8 });
  e.grupo({ clase: 'iso-flota', duracion: 3 }, (g) => {
    g.caja({ x: 276, y: 224, z: z + 18, w: 22, d: 16, h: 4, m: 'platano' });
    g.ruta([[276, 224, z + 22.1], [287, 232, z + 22.1], [298, 224, z + 22.1]], '#D39C12', 1.4);
  });

  e.persona(22, 104, z, 'verde', 0.95);
  aviso(e, 30, 90, z + 52, VERDE, 2);

  // Etiquetas al final, para que queden encima de todo
  e.cartel([46, 21, z + 70], 'Hoja de cálculo');
  e.cartel([80, 14, z + 40], 'PDF del proveedor');
  e.cartel([196, 34, z + 34], 'Fichero del banco');
  e.cartel([254, 24, z + 80], 'Una web');
  e.cartel([px + 40, py + 28, z + 96], 'Proceso en Python');
  e.cartel([142, 209, z + 70], 'Informe del lunes');
  e.cartel([262, 186, z + 60], 'Panel');
}

export function escenaPython(independiente = false) {
  const e = new Escena();
  pipelinePython(e);
  return e.svg({ clase: 'iso-python', independiente });
}
