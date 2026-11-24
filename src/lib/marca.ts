/* Marca: plátano de vóxeles en isométrico 2:1 (estilo pixel art).
   El sprite se dibuja de pie y se extruye con dos vóxeles de fondo. La
   proyección 2:1 da coordenadas enteras, así el SVG en línea pesa poco.
   Lo usan el logo, el favicon y los iconos (ver src/scripts/generar-marca.ts). */

/* Filas de arriba abajo. T punta, Y piel, B brillo, G tallo. */
const SPRITE = [
  '...........G',
  '..........GG',
  'T.........Y.',
  'TY.......YY.',
  '.YY.....YYY.',
  '.BYY...YYYY.',
  '..BYYYYYYY..',
  '...BYYYYYY..',
  '.....YYY....',
];
const FONDO = 2;

/* [techo, cara +y (frente), cara +x (lateral)] */
const COLORES: Record<string, [string, string, string]> = {
  Y: ['#FFD94A', '#F2B705', '#C98F00'],
  B: ['#FFF3B0', '#FFD94A', '#F2B705'],
  T: ['#9A6A2E', '#7A5222', '#5C3D18'],
  G: ['#5FC48C', '#2E8F5E', '#0E5B3A'],
};

type Vox = [number, number, number, string];

function generar() {
  const alto = SPRITE.length;
  const vox: Vox[] = [];
  SPRITE.forEach((fila, r) =>
    [...fila].forEach((ch, c) => {
      if (ch !== '.') for (let d = 0; d < FONDO; d++) vox.push([c, d, alto - 1 - r, ch]);
    }),
  );
  const hay = new Set(vox.map(([x, y, z]) => `${x},${y},${z}`));
  const ocupado = (x: number, y: number, z: number) => hay.has(`${x},${y},${z}`);
  // Proyección 2:1: un cubo mide 4 de ancho, 2 de techo y 2 de alto.
  const P = (x: number, y: number, z: number): [number, number] => [(x - y) * 2, x + y - z * 2];
  vox.sort((a, b) => a[0] + a[1] - (b[0] + b[1]) || a[2] - b[2]);

  const caras: { pts: [number, number][]; color: string }[] = [];
  for (const [x, y, z, k] of vox) {
    const [techo, frente, lado] = COLORES[k];
    if (!ocupado(x, y, z + 1)) caras.push({ color: techo, pts: [P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)] });
    if (!ocupado(x, y + 1, z)) caras.push({ color: frente, pts: [P(x, y + 1, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)] });
    if (!ocupado(x + 1, y, z)) caras.push({ color: lado, pts: [P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)] });
  }

  const xs = caras.flatMap((c) => c.pts.map((p) => p[0]));
  const ys = caras.flatMap((c) => c.pts.map((p) => p[1]));
  const x0 = Math.min(...xs);
  const y0 = Math.min(...ys);
  const ancho = Math.max(...xs) - x0;
  const altoVista = Math.max(...ys) - y0;

  // Caras consecutivas del mismo color comparten <path> (el orden de pintado se mantiene).
  const trazos: { color: string; d: string }[] = [];
  for (const c of caras) {
    const [[ax, ay], ...resto] = c.pts.map(([px, py]) => [px - x0, py - y0]);
    let d = `M${ax} ${ay}`;
    let [cx, cy] = [ax, ay];
    for (const [px, py] of resto) {
      d += `l${px - cx} ${py - cy}`;
      [cx, cy] = [px, py];
    }
    d += 'z';
    const ultimo = trazos.at(-1);
    if (ultimo && ultimo.color === c.color) ultimo.d += d;
    else trazos.push({ color: c.color, d });
  }
  // Cada color es una clase; el trazo fino del mismo color tapa las juntas
  // de antialiasing entre caras vecinas.
  const colores = [...new Set(trazos.map((t) => t.color))];
  const clase = (c: string) => `c${colores.indexOf(c).toString(36)}`;
  const estilo =
    'path{stroke-width:.15px;stroke-linejoin:round}' + colores.map((c) => `.${clase(c)}{fill:${c};stroke:${c}}`).join('');
  const compacta = (d: string) => d.replace(/ -/g, '-');
  const cuerpo = trazos.map((t) => `<path class="${clase(t.color)}" d="${compacta(t.d)}"/>`).join('');
  return { ancho, alto: altoVista, cuerpo: `<style>${estilo}</style>${cuerpo}` };
}

export const MARCA = generar();
export const MARCA_VIEWBOX = `-.5 -.5 ${MARCA.ancho + 1} ${MARCA.alto + 1}`;

/* SVG completo, para favicon e iconos. `lado` cuadra el plátano en un lienzo cuadrado. */
export function marcaSvg({ lado, fondo, margen = 0.12, radio = 0.22 }: { lado?: number; fondo?: string; margen?: number; radio?: number } = {}) {
  const m = Math.max(MARCA.ancho, MARCA.alto) * (1 + margen * 2);
  const vx = (MARCA.ancho - m) / 2;
  const vy = (MARCA.alto - m) / 2;
  const tam = lado ? ` width="${lado}" height="${lado}"` : '';
  const capa = fondo ? `<rect x="${vx}" y="${vy}" width="${m}" height="${m}" rx="${m * radio}" fill="${fondo}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${m} ${m}"${tam}>${capa}${MARCA.cuerpo}</svg>`;
}
