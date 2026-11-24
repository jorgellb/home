/* Escenas isométricas de la web: una por servicio y alguna de apoyo.
   Se dibujan con el motor de src/lib/iso.ts en el build. */
import { Escena } from './iso';

const TINTA = '#14160F';
const VERDE = '#0E5B3A';
const PLATANO = '#FFCF3F';
const GRIS = '#E9EAE3';
const GRIS_2 = '#D7D9CF';
const CIELO = '#B7DAF2';
const CORAL = '#FF7F5C';

export type NombreEscena =
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

function plataforma(e: Escena, w = 240, d = 240, h = 16) {
  e.caja({ x: 0, y: 0, w, d, h: h - 6, m: 'verde' });
  e.caja({ x: 0, y: 0, z: h - 6, w, d, h: 6, m: 'blanco' });
  // Retícula suave sobre la plataforma
  for (let i = 40; i < w; i += 40) e.linea([i, 0, h], [i, d, h], GRIS, 1);
  for (let j = 40; j < d; j += 40) e.linea([0, j, h], [w, j, h], GRIS, 1);
  return h;
}

function arbol(e: Escena, x: number, y: number, z: number, escala = 1, retraso = 0) {
  e.cilindro(x, y, z, 7 * escala, 10 * escala, 'arena');
  e.grupo({ clase: 'iso-balanceo', retraso }, (g) => {
    g.esfera([x, y, z + 26 * escala], 15 * escala, '#2E8A5F', 'rgba(255,255,255,.35)');
    g.esfera([x + 4, y - 4, z + 36 * escala], 10 * escala, '#3FA571', 'rgba(255,255,255,.35)');
  });
}

function navegador(e: Escena, x: number, y: number, z: number, w: number, h: number) {
  const d = 8;
  e.caja({ x, y, z, w, d, h, m: 'blanco' });
  const f = y + d + 0.01;
  e.caraY(x, f, z + h - 12, w, 12, GRIS);
  [0, 1, 2].forEach((i) => e.caraY(x + 6 + i * 8, f, z + h - 8, 4, 4, [CORAL, PLATANO, '#2E8A5F'][i]));
  e.caraY(x + 34, f, z + h - 9, w - 44, 6, '#FFFFFF');
  return { cara: f, d };
}

function pin(e: Escena, x: number, y: number, z: number, color = CORAL) {
  e.sombra(x, y, z, 10, 0.14);
  e.grupo({ clase: 'iso-flota' }, (g) => {
    g.linea([x, y, z + 2], [x, y, z + 34], TINTA, 2);
    g.esfera([x, y, z + 44], 12, color);
    g.esfera([x, y, z + 44], 4.5, '#FFFFFF', 'transparent');
  });
}

/* ── Escenas ──────────────────────────────────────────────────────── */

function web(e: Escena) {
  const z = plataforma(e);
  arbol(e, 26, 26, z, 1, 0.4);
  const { cara } = navegador(e, 50, 34, z, 160, 112);
  // Contenido de la web en la pantalla
  e.caraY(58, cara, z + 62, 74, 34, VERDE);
  e.caraY(62, cara, z + 84, 46, 5, '#FFFFFF');
  e.caraY(62, cara, z + 76, 32, 4, 'rgba(255,255,255,.6)');
  e.caraY(62, cara, z + 66, 22, 6, PLATANO);
  e.caraY(140, cara, z + 62, 62, 34, CIELO);
  [0, 1, 2].forEach((i) => e.caraY(58 + i * 50, cara, z + 14, 44, 40, i === 1 ? '#FFF4CC' : '#F6F4EC'));
  [0, 1, 2].forEach((i) => e.caraY(64 + i * 50, cara, z + 38, 26, 4, GRIS_2));
  // Tarjeta flotante con la nota de velocidad
  e.sombra(196, 176, z, 30);
  e.grupo({ clase: 'iso-flota', retraso: 0.6 }, (g) => {
    g.caja({ x: 168, y: 150, z: z + 46, w: 58, d: 52, h: 6, m: 'blanco' });
    [22, 34, 48].forEach((h, i) => g.caja({ x: 176 + i * 15, y: 170, z: z + 52, w: 10, d: 10, h, m: i === 2 ? 'verde' : 'menta' }));
  });
  // Móvil
  e.sombra(48, 196, z, 22);
  e.grupo({ clase: 'iso-flota', retraso: 1.2 }, (g) => {
    g.caja({ x: 28, y: 190, z: z + 30, w: 40, d: 6, h: 74, m: 'tinta' });
    g.caraY(31, 196.01, z + 36, 34, 62, '#FFFFFF');
    g.caraY(34, 196.02, z + 70, 28, 22, VERDE);
    g.caraY(34, 196.02, z + 58, 22, 4, GRIS_2);
    g.caraY(34, 196.02, z + 42, 28, 9, PLATANO);
  });
  pin(e, 120, 200, z);
}

function tienda(e: Escena) {
  const z = plataforma(e);
  // Local con toldo
  e.caja({ x: 50, y: 40, z, w: 130, d: 90, h: 82, m: 'papel' });
  const f = 130.01;
  e.caraY(62, f, z, 40, 56, '#FFFFFF');
  e.caraY(66, f, z, 32, 50, CIELO);
  e.caraY(112, f, z + 16, 58, 40, CIELO);
  e.caraY(112, f, z + 16, 58, 6, 'rgba(255,255,255,.5)');
  for (let i = 0; i < 6; i++) {
    e.caja({ x: 50 + i * (130 / 6), y: 130, z: z + 60, w: 130 / 6, d: 18, h: 4, m: i % 2 ? 'blanco' : 'verde' });
  }
  e.caraY(78, f, z + 70, 74, 8, PLATANO);
  // Paquetes saliendo
  [0, 1, 2].forEach((i) =>
    e.grupo({ clase: 'iso-sube', retraso: i * 0.5 }, (g) =>
      g.caja({ x: 190, y: 150 + i * 22, z: z + i * 0, w: 26, d: 18, h: 20, m: 'arena' }),
    ),
  );
  // Carrito flotante
  e.sombra(70, 196, z, 24);
  e.grupo({ clase: 'iso-flota', retraso: 0.8 }, (g) => {
    g.caja({ x: 48, y: 182, z: z + 40, w: 46, d: 30, h: 26, m: 'verde' });
    g.cilindro(56, 214, z + 30, 5, 4, 'tinta');
    g.cilindro(88, 214, z + 30, 5, 4, 'tinta');
    g.caja({ x: 54, y: 186, z: z + 66, w: 14, d: 14, h: 12, m: 'platano' });
    g.caja({ x: 72, y: 190, z: z + 66, w: 14, d: 12, h: 18, m: 'coral' });
  });
  arbol(e, 214, 30, z, 0.9);
}

function marketing(e: Escena) {
  const z = plataforma(e);
  // Barras de crecimiento
  const alturas = [30, 52, 78, 110];
  alturas.forEach((h, i) =>
    e.grupo({ clase: 'iso-sube', retraso: i * 0.25 }, (g) =>
      g.caja({ x: 40 + i * 40, y: 70, z, w: 28, d: 28, h, m: i === 3 ? 'verde' : 'menta' }),
    ),
  );
  e.ruta([[54, 84, z + 40], [94, 84, z + 64], [134, 84, z + 90], [174, 84, z + 124], [204, 84, z + 150]], CORAL, 4, ' class="iso-traza"');
  e.esfera([204, 84, z + 150], 7, CORAL);
  // Lupa
  e.sombra(70, 190, z, 26);
  e.grupo({ clase: 'iso-flota', retraso: 0.4 }, (g) => {
    g.cilindro(70, 186, z + 50, 24, 6, 'platano');
    g.cilindro(70, 186, z + 56, 17, 1, { arriba: '#EAF6FD', izquierda: CIELO, derecha: CIELO });
    g.caja({ x: 84, y: 204, z: z + 44, w: 30, d: 8, h: 8, m: 'tinta' });
  });
  // Diana
  e.grupo({ clase: 'iso-flota', retraso: 1.1 }, (g) => {
    g.cilindro(180, 186, z + 24, 26, 6, 'blanco');
    g.cilindro(180, 186, z + 30, 18, 2, 'coral');
    g.cilindro(180, 186, z + 32, 10, 2, 'blanco');
    g.cilindro(180, 186, z + 34, 4, 2, 'coral');
  });
}

function informatica(e: Escena) {
  const z = plataforma(e);
  // Armario de servidores
  e.caja({ x: 40, y: 40, z, w: 60, d: 60, h: 130, m: 'tinta' });
  for (let i = 0; i < 6; i++) {
    e.caraY(46, 100.01, z + 10 + i * 20, 48, 14, '#2C3128');
    e.grupo({ clase: 'iso-parpadeo', retraso: i * 0.3 }, (g) => g.caraY(84, 100.02, z + 15 + i * 20, 5, 4, i % 2 ? '#3FA571' : PLATANO));
  }
  // Puesto de trabajo
  e.caja({ x: 130, y: 110, z, w: 90, d: 60, h: 40, m: 'arena' });
  e.caja({ x: 150, y: 120, z: z + 40, w: 54, d: 6, h: 40, m: 'tinta' });
  e.caraY(153, 126.01, z + 44, 48, 33, CIELO);
  e.caraY(157, 126.02, z + 64, 28, 4, '#FFFFFF');
  e.caraY(157, 126.02, z + 54, 36, 4, 'rgba(255,255,255,.6)');
  // Cables de red
  e.ruta([[100, 70, z + 2], [120, 70, z + 2], [120, 140, z + 2], [130, 140, z + 2]], VERDE, 3, ' class="iso-traza"');
  // Router con ondas
  e.caja({ x: 30, y: 150, z, w: 50, d: 34, h: 12, m: 'blanco' });
  e.grupo({ clase: 'iso-pulso' }, (g) => {
    g.cilindro(55, 167, z + 12, 22, 0.5, { arriba: 'rgba(46,138,95,.18)', izquierda: 'transparent', derecha: 'transparent' });
  });
  // Escudo flotante
  e.grupo({ clase: 'iso-flota', retraso: 0.5 }, (g) => {
    g.caja({ x: 170, y: 40, z: z + 80, w: 40, d: 8, h: 46, m: 'verde' });
    g.caraY(182, 48.01, z + 96, 16, 4, '#FFFFFF');
    g.caraY(188, 48.01, z + 90, 4, 16, '#FFFFFF');
  });
}

function grafico(e: Escena) {
  const z = plataforma(e);
  // Muestras de color en abanico
  const colores = ['coral', 'platano', 'verde', 'azul', 'lila'] as const;
  colores.forEach((c, i) =>
    e.grupo({ clase: 'iso-sube', retraso: i * 0.2 }, (g) => g.caja({ x: 40, y: 40 + i * 18, z, w: 70, d: 14, h: 20 + i * 14, m: c })),
  );
  // Lienzo con logotipo
  e.caja({ x: 130, y: 40, z, w: 90, d: 8, h: 110, m: 'blanco' });
  e.caraY(140, 48.01, z + 50, 70, 50, '#FFF4CC');
  e.esfera([175, 48.1, z + 75], 16, VERDE, 'rgba(255,255,255,.3)');
  e.caraY(146, 48.01, z + 24, 58, 8, TINTA);
  e.caraY(156, 48.01, z + 12, 38, 5, GRIS_2);
  // Lápiz flotante
  e.grupo({ clase: 'iso-flota', retraso: 0.7 }, (g) => {
    g.caja({ x: 120, y: 170, z: z + 40, w: 90, d: 12, h: 12, m: 'platano' });
    g.caja({ x: 210, y: 170, z: z + 40, w: 14, d: 12, h: 12, m: 'arena' });
    g.caja({ x: 106, y: 170, z: z + 40, w: 14, d: 12, h: 12, m: 'coral' });
  });
  e.sombra(160, 180, z, 30);
}

function audiovisual(e: Escena) {
  const z = plataforma(e);
  // Claqueta
  e.caja({ x: 40, y: 60, z, w: 80, d: 60, h: 40, m: 'tinta' });
  for (let i = 0; i < 4; i++) e.caja({ x: 40 + i * 20, y: 60, z: z + 40, w: 10, d: 60, h: 6, m: 'blanco' });
  // Cámara
  e.caja({ x: 140, y: 110, z, w: 70, d: 50, h: 44, m: 'tinta' });
  e.cilindro(175, 170, z + 22, 1, 1, 'tinta');
  e.caja({ x: 160, y: 160, z: z + 10, w: 30, d: 18, h: 26, m: 'tinta' });
  e.caraY(166, 178.01, z + 16, 18, 14, CIELO);
  e.grupo({ clase: 'iso-parpadeo' }, (g) => g.esfera([198, 116, z + 50], 5, CORAL));
  // Dron
  e.sombra(80, 180, z, 34);
  e.grupo({ clase: 'iso-flota', retraso: 0.3 }, (g) => {
    g.caja({ x: 64, y: 164, z: z + 70, w: 32, d: 32, h: 10, m: 'blanco' });
    [[50, 150], [110, 150], [50, 210], [110, 210]].forEach(([x, y]) => {
      g.linea([80, 180, z + 76], [x, y, z + 78], GRIS_2, 3);
      g.cilindro(x, y, z + 78, 14, 1, { arriba: 'rgba(20,22,15,.18)', izquierda: 'transparent', derecha: 'transparent' });
    });
    g.caja({ x: 74, y: 174, z: z + 62, w: 12, d: 12, h: 8, m: 'tinta' });
  });
}

function apps(e: Escena) {
  const z = plataforma(e);
  const movil = (x: number, y: number, alto: number, color: string, retraso: number) => {
    e.sombra(x + 22, y + 4, z, 22);
    e.grupo({ clase: 'iso-flota', retraso }, (g) => {
      g.caja({ x, y, z: z + alto, w: 44, d: 6, h: 84, m: 'tinta' });
      g.caraY(x + 3, y + 6.01, z + alto + 6, 38, 72, '#FFFFFF');
      g.caraY(x + 7, y + 6.02, z + alto + 46, 30, 26, color);
      [0, 1, 2].forEach((i) => g.caraY(x + 7 + i * 11, y + 6.02, z + alto + 30, 8, 8, i === 1 ? PLATANO : GRIS));
      g.caraY(x + 7, y + 6.02, z + alto + 12, 30, 10, VERDE);
    });
  };
  movil(40, 80, 30, CIELO, 0);
  movil(110, 120, 16, '#FFA48A', 0.6);
  movil(170, 60, 40, '#D5F0E0', 1.2);
  // Notificación
  e.grupo({ clase: 'iso-pulso', retraso: 0.4 }, (g) => g.esfera([90, 86, z + 128], 8, CORAL));
}

function ia(e: Escena) {
  const z = plataforma(e);
  // Documentos que entran
  [0, 1, 2].forEach((i) =>
    e.grupo({ clase: 'iso-sube', retraso: i * 0.4 }, (g) => g.caja({ x: 26, y: 30 + i * 4, z: z + i * 10, w: 56, d: 70, h: 6, m: (['cielo', 'arena', 'blanco'] as const)[i] })),
  );
  // Núcleo
  e.caja({ x: 100, y: 90, z, w: 60, d: 60, h: 40, m: 'tinta' });
  e.grupo({ clase: 'iso-pulso' }, (g) => g.caja({ x: 112, y: 102, z: z + 40, w: 36, d: 36, h: 10, m: 'verde' }));
  e.grupo({ clase: 'iso-gira' }, (g) => g.esfera([130, 120, z + 74], 14, PLATANO));
  // Flujo
  e.ruta([[80, 72, z + 10], [100, 110, z + 10]], VERDE, 3, ' class="iso-traza"');
  e.ruta([[160, 130, z + 10], [190, 170, z + 10]], VERDE, 3, ' class="iso-traza"');
  // Salida: tareas hechas
  [0, 1, 2].forEach((i) => {
    e.caja({ x: 176, y: 160 + i * 20, z, w: 46, d: 14, h: 8, m: 'blanco' });
    e.losa(182, 163 + i * 20, z + 8.01, 8, 8, i < 2 ? '#2E8A5F' : GRIS);
  });
}

function soporte(e: Escena) {
  const z = plataforma(e);
  // Escudo grande
  e.caja({ x: 70, y: 70, z, w: 100, d: 14, h: 120, m: 'verde' });
  e.caraY(98, 84.01, z + 44, 44, 12, '#FFFFFF');
  e.caraY(114, 84.01, z + 28, 12, 44, '#FFFFFF');
  // Reloj de copias
  e.grupo({ clase: 'iso-flota', retraso: 0.5 }, (g) => {
    g.cilindro(190, 170, z + 30, 22, 8, 'platano');
    g.linea([190, 170, z + 38], [190, 158, z + 38], TINTA, 3);
    g.linea([190, 170, z + 38], [200, 170, z + 38], TINTA, 3);
  });
  e.sombra(190, 170, z, 22);
  // Engranaje (cilindro con dientes)
  e.cilindro(50, 180, z, 26, 10, 'blanco');
  e.cilindro(50, 180, z + 10, 10, 4, 'tinta');
  arbol(e, 210, 40, z, 0.8);
}

function programador(e: Escena) {
  const z = plataforma(e);
  const { cara } = navegador(e, 40, 40, z, 150, 110);
  e.caraY(40, cara, z, 150, 98, TINTA);
  const lineas: [number, number, string][] = [
    [8, 40, '#7CC4A0'], [16, 64, PLATANO], [16, 30, '#FFFFFF'], [24, 52, CIELO], [16, 44, '#FFA48A'], [8, 24, '#7CC4A0'],
  ];
  lineas.forEach(([x, w, c], i) => e.caraY(46 + x, cara, z + 82 - i * 12, w, 5, c));
  e.grupo({ clase: 'iso-parpadeo' }, (g) => g.caraY(100, cara, z + 10, 4, 8, PLATANO));
  // Bloques de componentes
  [0, 1, 2].forEach((i) =>
    e.grupo({ clase: 'iso-sube', retraso: 0.3 * i }, (g) => g.caja({ x: 150 + (i % 2) * 34, y: 160 + Math.floor(i / 2) * 30, z: z + (i === 2 ? 0 : 0), w: 28, d: 26, h: 20 + i * 8, m: (['verde', 'platano', 'cielo'] as const)[i] })),
  );
  arbol(e, 30, 200, z, 0.9);
}

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

function dibujarPueblo(e: Escena, r: RasgosPueblo) {
  const z = plataforma(e, 260, 240, 16);
  const azar = aleatorio(r.semilla ?? 7);
  const fondoY = r.mar ? 168 : 240;

  // Mar con olas y barca
  if (r.mar) {
    e.losa(0, 170, z + 0.5, 260, 70, '#CFE6F5');
    e.grupo({ clase: 'iso-ola' }, (g) => {
      g.linea([20, 192, z + 1], [80, 192, z + 1], '#FFFFFF', 2);
      g.linea([110, 216, z + 1], [180, 216, z + 1], '#FFFFFF', 2);
      g.linea([200, 196, z + 1], [240, 196, z + 1], '#FFFFFF', 2);
    });
    e.grupo({ clase: 'iso-flota', retraso: 0.9 }, (g) => {
      g.caja({ x: 150, y: 196, z: z + 1, w: 34, d: 12, h: 6, m: 'coral' });
      g.linea([167, 202, z + 7], [167, 202, z + 34], '#14160F', 2);
      g.caraY(168, 202, z + 14, 14, 18, '#FFFFFF');
    });
  }

  // Sierra al fondo
  if (r.sierra) {
    const montes: [number, number, number][] = [[0, 0, 70], [60, 0, 96], [130, 0, 60]];
    montes.forEach(([x, y, h]) => {
      e.caja({ x, y, z, w: 60, d: 26, h: h * 0.35, m: 'menta' });
      e.caja({ x: x + 10, y: y + 4, z: z + h * 0.35, w: 40, d: 18, h: h * 0.35, m: 'menta' });
      e.caja({ x: x + 20, y: y + 8, z: z + h * 0.7, w: 20, d: 10, h: h * 0.3, m: 'blanco' });
    });
  }

  // Bloques de mármol de cantera
  if (r.marmol) {
    [[200, 120, 30], [222, 128, 20], [206, 144, 16]].forEach(([x, y, h], i) =>
      e.grupo({ clase: 'iso-sube', retraso: i * 0.2 }, (g) => g.caja({ x, y, z, w: 22, d: 18, h, m: 'blanco', trazo: '#D7D9CF' })),
    );
  }

  // Invernaderos
  if (r.invernaderos) {
    [0, 1, 2].forEach((i) => {
      e.caja({ x: 20 + i * 34, y: fondoY - 46, z, w: 30, d: 40, h: 14, m: { arriba: '#F3F7FA', izquierda: '#DDE8EF', derecha: '#C9D7E0' } });
      e.linea([20 + i * 34 + 15, fondoY - 46, z + 14], [20 + i * 34 + 15, fondoY - 6, z + 14], '#C9D7E0', 1);
    });
  }

  // Casas blancas con disposición propia de cada municipio
  const y0 = r.sierra ? 40 : 30;
  const huecos: [number, number][] = [[40, y0], [90, y0 - 6], [134, y0 + 14], [56, y0 + 66], [106, y0 + 62], [160, y0 + 56]];
  huecos.forEach(([x, y], i) => {
    if (r.invernaderos && y > fondoY - 60 && x < 120) return;
    const w = 28 + Math.round(azar() * 14);
    const d = 26 + Math.round(azar() * 12);
    const h = 24 + Math.round(azar() * 26);
    e.caja({ x, y, z, w, d, h, m: 'blanco' });
    e.caraY(x + w / 2 - 4, y + d + 0.01, z, 8, 12, i % 2 ? '#8FCBA8' : '#93C3E5');
    e.caraX(x + w + 0.01, y + d / 2 - 4, z + h - 14, 8, 8, '#B7DAF2');
  });

  // Castillo o torre
  if (r.castillo) {
    e.caja({ x: 196, y: 24, z, w: 44, d: 36, h: 44, m: 'arena' });
    [0, 1, 2, 3].forEach((i) => e.caja({ x: 196 + i * 12, y: 24, z: z + 44, w: 8, d: 6, h: 8, m: 'arena' }));
    e.caja({ x: 222, y: 28, z: z + 44, w: 16, d: 16, h: 24, m: 'arena' });
  } else {
    e.caja({ x: 200, y: 30, z, w: 26, d: 26, h: 76, m: 'arena' });
    e.caja({ x: 204, y: 34, z: z + 76, w: 18, d: 18, h: 14, m: 'platano' });
  }

  arbol(e, 26, r.mar ? 146 : 200, z, 0.8, 0.2);
  arbol(e, 236, r.mar ? 132 : 210, z, 0.9, 0.8);
  pin(e, 120, 72, z + 46);
}

function pueblo(e: Escena) {
  dibujarPueblo(e, { mar: true, semilla: 7 });
}

/** Escena de un municipio concreto, con sus rasgos. */
export function escenaPueblo(rasgos: RasgosPueblo, titulo?: string) {
  const e = new Escena();
  dibujarPueblo(e, rasgos);
  return e.svg({ titulo, clase: 'iso-pueblo' });
}

function contacto(e: Escena) {
  const z = plataforma(e, 220, 200, 14);
  // Sobre
  e.grupo({ clase: 'iso-flota' }, (g) => {
    g.caja({ x: 40, y: 50, z: z + 40, w: 110, d: 76, h: 10, m: 'platano' });
    g.losa(44, 54, z + 50.01, 102, 68, '#FFF4CC');
    g.ruta([[44, 54, z + 50.2], [95, 92, z + 50.2], [146, 54, z + 50.2]], '#E9B21C', 3);
    g.esfera([95, 92, z + 56], 9, CORAL);
  });
  e.sombra(95, 88, z, 50, 0.1);
  // Burbujas de conversación
  e.grupo({ clase: 'iso-flota', retraso: 0.7 }, (g) => {
    g.caja({ x: 140, y: 130, z: z + 30, w: 60, d: 8, h: 40, m: 'verde' });
    [0, 1, 2].forEach((i) => g.caraY(152 + i * 14, 138.01, z + 46, 8, 8, '#FFFFFF'));
  });
  e.grupo({ clase: 'iso-flota', retraso: 1.3 }, (g) => {
    g.caja({ x: 30, y: 150, z: z + 20, w: 50, d: 8, h: 30, m: 'platano' });
  });
}

function proceso(e: Escena) {
  // Escalera de cuatro pasos
  // Escalera que sube hacia el fondo: se pinta del escalón más alto (detrás) al más bajo.
  const mats = ['verde', 'menta', 'cielo', 'blanco'] as const;
  [3, 2, 1, 0].forEach((i) =>
    e.grupo({ clase: 'iso-sube', retraso: (3 - i) * 0.25 }, (g) =>
      g.caja({ x: 0, y: (3 - i) * 46, z: 0, w: 70, d: 46, h: 20 + i * 26, m: mats[3 - i] }),
    ),
  );
  e.sombra(35, 20, 98, 12, 0.12);
  e.grupo({ clase: 'iso-flota' }, (g) => g.esfera([35, 20, 124], 13, PLATANO));
}

function blog(e: Escena) {
  const z = plataforma(e, 200, 180, 12);
  [0, 1, 2, 3].forEach((i) => e.caja({ x: 30, y: 40 + i * 0, z: z + i * 12, w: 80, d: 100, h: 10, m: (['verde', 'blanco', 'platano', 'blanco'] as const)[i] }));
  e.grupo({ clase: 'iso-flota', retraso: 0.4 }, (g) => {
    g.caja({ x: 120, y: 60, z: z + 40, w: 60, d: 8, h: 76, m: 'blanco' });
    [0, 1, 2, 3, 4].forEach((i) => g.caraY(128, 68.01, z + 100 - i * 12, i === 0 ? 30 : 44, 5, i === 0 ? TINTA : GRIS_2));
  });
  e.sombra(150, 64, z, 30);
}

const DIBUJOS: Record<NombreEscena, (e: Escena) => void> = {
  web, tienda, marketing, informatica, grafico, audiovisual, apps, ia, soporte, programador, pueblo, contacto, proceso, blog,
};

export function escena(nombre: NombreEscena, opciones: { titulo?: string } = {}) {
  const e = new Escena();
  DIBUJOS[nombre](e);
  return e.svg({ titulo: opciones.titulo, clase: `iso-${nombre}` });
}

export const ESCENAS = Object.keys(DIBUJOS) as NombreEscena[];
