/* Motor de ilustración isométrica que se ejecuta en el build.

   Cada escena se describe con cajas, losas, cilindros y caras en coordenadas
   3D (x hacia la derecha-abajo, y hacia la izquierda-abajo, z hacia arriba) y
   sale como SVG estático: el navegador no ejecuta nada. La animación la pone
   el CSS con las clases `iso-*`, que solo tocan transform, opacity y
   offset-distance (todas componibles en GPU).

   Acabado: cada caja lleva contorno fino del tono oscuro de su material, un
   brillo en las aristas superiores y, si se pide, sombra proyectada en el
   suelo. El orden de pintado es el orden de llamada: de atrás (x + y
   pequeños, z bajo) hacia delante. */

import { ISO_CSS } from './iso-css';

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

export type Punto3 = [number, number, number];

/** Material: color de la cara superior, la izquierda (frente y) y la derecha (frente x). */
export interface Material {
  arriba: string;
  izquierda: string;
  derecha: string;
  /** Color del contorno. Por defecto, el de la cara derecha oscurecido. */
  borde?: string;
}

export const MATERIALES = {
  blanco: { arriba: '#FFFFFF', izquierda: '#EEEFE9', derecha: '#DCDED4', borde: '#C9CCC0' },
  papel: { arriba: '#F8F6EE', izquierda: '#E9E5D7', derecha: '#D8D3C1', borde: '#C3BDA8' },
  tinta: { arriba: '#3D4339', izquierda: '#262A22', derecha: '#171A13', borde: '#0E100B' },
  verde: { arriba: '#3A9A6B', izquierda: '#16724A', derecha: '#0E5B3A', borde: '#0A452C' },
  menta: { arriba: '#DDF4E7', izquierda: '#B6E4CA', derecha: '#93D0AE', borde: '#76B993' },
  platano: { arriba: '#FFE68F', izquierda: '#FFD34D', derecha: '#F0B82A', borde: '#D39C12' },
  cielo: { arriba: '#E3F2FC', izquierda: '#BFDFF4', derecha: '#9BC9E8', borde: '#7DB2D8' },
  azul: { arriba: '#6E9BF2', izquierda: '#4678DB', derecha: '#2F5DB8', borde: '#22479A' },
  arena: { arriba: '#F8EED9', izquierda: '#EBDBB8', derecha: '#D9C497', borde: '#C2AB7A' },
  coral: { arriba: '#FFB199', izquierda: '#FF8A68', derecha: '#E86A47', borde: '#C95432' },
  lila: { arriba: '#EBE5FC', izquierda: '#D0C6F6', derecha: '#B0A2EA', borde: '#9584D6' },
  cristal: { arriba: 'rgba(227,242,252,.9)', izquierda: 'rgba(191,223,244,.85)', derecha: 'rgba(155,201,232,.85)', borde: '#7DB2D8' },
} satisfies Record<string, Material>;

export type NombreMaterial = keyof typeof MATERIALES;
type MaterialArg = NombreMaterial | Material;

const mat = (m: MaterialArg): Material => (typeof m === 'string' ? MATERIALES[m] : m);

const r = (n: number) => Math.round(n * 10) / 10;

/** Oscurece un color #RRGGBB un porcentaje. */
function oscurecer(hex: string, f = 0.18): string {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return 'rgba(20,22,15,.25)';
  const n = parseInt(m[1], 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(v * (1 - f)));
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

/** Proyección isométrica de un punto 3D a 2D. */
export function proyectar([x, y, z]: Punto3): [number, number] {
  return [(x - y) * COS, (x + y) * SIN - z];
}

export interface Caja {
  x: number; y: number; z?: number;
  w: number; d: number; h: number;
  m: MaterialArg;
  /** Trazo de las aristas; por defecto el del material. `false` para no dibujarlo. */
  trazo?: string | false;
  /** Sombra proyectada sobre el plano de su base. */
  sombra?: boolean;
  /** Brillo en las aristas superiores (por defecto, sí). */
  brillo?: boolean;
}

export interface Grupo {
  /** Clase de animación (`iso-flota`, `iso-sube`, `iso-pulso`, `iso-crece`…). */
  clase?: string;
  /** Retraso de la animación en segundos, para desfasar elementos. */
  retraso?: number;
  /** Duración propia de la animación en segundos. */
  duracion?: number;
}

let contadorEscenas = 0;

/** Constructor de escenas. Acumula SVG y calcula su caja envolvente. */
export class Escena {
  private partes: string[] = [];
  private defs: string[] = [];
  private minX = Infinity;
  private minY = Infinity;
  private maxX = -Infinity;
  private maxY = -Infinity;
  /** Prefijo único: varias escenas en la misma página no comparten ids. */
  private uid = `i${(contadorEscenas++).toString(36)}`;
  private n = 0;

  private id(base: string) {
    return `${this.uid}-${base}${this.n++}`;
  }

  private anotar(pts: [number, number][]) {
    for (const [x, y] of pts) {
      if (x < this.minX) this.minX = x;
      if (y < this.minY) this.minY = y;
      if (x > this.maxX) this.maxX = x;
      if (y > this.maxY) this.maxY = y;
    }
  }

  private puntos(pts3: Punto3[]) {
    const pts = pts3.map(proyectar);
    this.anotar(pts);
    return pts.map(([x, y]) => `${r(x)},${r(y)}`).join(' ');
  }

  private poligono(pts3: Punto3[], relleno: string, extra = '') {
    this.partes.push(`<polygon points="${this.puntos(pts3)}" fill="${relleno}"${extra}/>`);
  }

  /** Prisma rectangular con sus tres caras visibles, contorno y brillo. */
  caja({ x, y, z = 0, w, d, h, m, trazo, sombra = false, brillo = true }: Caja) {
    const c = mat(m);
    if (sombra) this.sombraCaja(x, y, z, w, d, h);
    const borde = trazo === false ? null : trazo ?? c.borde ?? oscurecer(c.derecha);
    const t = borde ? ` stroke="${borde}" stroke-width=".8" stroke-linejoin="round"` : '';
    this.poligono([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], c.derecha, t);
    this.poligono([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], c.izquierda, t);
    this.poligono([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], c.arriba, t);
    if (brillo && h > 2) {
      this.partes.push(
        `<polyline points="${this.puntos([[x, y + d, z + h], [x + w, y + d, z + h], [x + w, y, z + h]])}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1" stroke-linejoin="round"/>`,
      );
    }
    return this;
  }

  /** Sombra proyectada de una caja: la luz entra desde arriba a la izquierda. */
  sombraCaja(x: number, y: number, z: number, w: number, d: number, h: number, opacidad = 0.08) {
    const s = Math.min(h * 0.6, 60);
    this.poligono([[x, y, z], [x + w + s, y, z], [x + w + s, y + d, z], [x, y + d, z]], '#14160F', ` opacity="${opacidad}"`);
    return this;
  }

  /** Losa plana (rectángulo en el plano z). */
  losa(x: number, y: number, z: number, w: number, d: number, relleno: string, extra = '') {
    this.poligono([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]], relleno, extra);
    return this;
  }

  /** Rectángulo pegado a la cara izquierda (plano y = constante), p. ej. una pantalla. */
  caraY(x: number, y: number, z: number, w: number, h: number, relleno: string, extra = '') {
    this.poligono([[x, y, z], [x + w, y, z], [x + w, y, z + h], [x, y, z + h]], relleno, extra);
    return this;
  }

  /** Rectángulo pegado a la cara derecha (plano x = constante). */
  caraX(x: number, y: number, z: number, d: number, h: number, relleno: string, extra = '') {
    this.poligono([[x, y, z], [x, y + d, z], [x, y + d, z + h], [x, y, z + h]], relleno, extra);
    return this;
  }

  /** Cilindro vertical de radio r centrado en (cx, cy). */
  cilindro(cx: number, cy: number, z: number, radio: number, h: number, m: MaterialArg) {
    const c = mat(m);
    const borde = c.borde ?? oscurecer(c.derecha);
    const rx = radio * COS * Math.SQRT2;
    const ry = radio * SIN * Math.SQRT2;
    const [bx, by] = proyectar([cx, cy, z]);
    const [tx, ty] = proyectar([cx, cy, z + h]);
    this.anotar([[bx - rx, by + ry], [bx + rx, by + ry], [tx - rx, ty - ry], [tx + rx, ty - ry]]);
    const g = this.id('g');
    this.defs.push(
      `<linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${c.izquierda}"/><stop offset=".55" stop-color="${c.izquierda}"/><stop offset="1" stop-color="${c.derecha}"/></linearGradient>`,
    );
    const lado =
      `M${r(tx - rx)},${r(ty)} L${r(bx - rx)},${r(by)} ` +
      `A${r(rx)},${r(ry)} 0 0 0 ${r(bx + rx)},${r(by)} L${r(tx + rx)},${r(ty)} Z`;
    const t = rx > 3 ? ` stroke="${borde}" stroke-width=".8"` : '';
    this.partes.push(
      `<path d="${lado}" fill="url(#${g})"${t}/>` +
        `<ellipse cx="${r(tx)}" cy="${r(ty)}" rx="${r(rx)}" ry="${r(ry)}" fill="${c.arriba}"${t}/>`,
    );
    return this;
  }

  /** Esfera con degradado radial y brillo. */
  esfera(p: Punto3, radio: number, relleno: string, brillo = 'rgba(255,255,255,.6)') {
    const [x, y] = proyectar(p);
    this.anotar([[x - radio, y - radio], [x + radio, y + radio]]);
    const g = this.id('e');
    this.defs.push(
      `<radialGradient id="${g}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="${brillo === 'transparent' ? relleno : '#fff'}" stop-opacity=".45"/><stop offset=".5" stop-color="${relleno}" stop-opacity="0"/></radialGradient>`,
    );
    this.partes.push(
      `<circle cx="${r(x)}" cy="${r(y)}" r="${radio}" fill="${relleno}"/>` +
        `<circle cx="${r(x)}" cy="${r(y)}" r="${radio}" fill="url(#${g})"/>`,
    );
    return this;
  }

  /** Línea entre dos puntos 3D. */
  linea(a: Punto3, b: Punto3, trazo: string, ancho = 2, extra = '') {
    const [ax, ay] = proyectar(a);
    const [bx, by] = proyectar(b);
    this.anotar([[ax, ay], [bx, by]]);
    this.partes.push(
      `<line x1="${r(ax)}" y1="${r(ay)}" x2="${r(bx)}" y2="${r(by)}" stroke="${trazo}" stroke-width="${ancho}" stroke-linecap="round"${extra}/>`,
    );
    return this;
  }

  private camino(puntos: Punto3[]) {
    const pts = puntos.map(proyectar);
    this.anotar(pts);
    return pts.map(([x, y], i) => `${i ? 'L' : 'M'}${r(x)},${r(y)}`).join(' ');
  }

  /** Polilínea en el espacio 3D (gráficas, rutas, cables). */
  ruta(puntos: Punto3[], trazo: string, ancho = 3, extra = '') {
    this.partes.push(
      `<path d="${this.camino(puntos)}" fill="none" stroke="${trazo}" stroke-width="${ancho}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`,
    );
    return this;
  }

  /** Paquetes que recorren una ruta en bucle (datos por un cable, envíos…). */
  flujo(puntos: Punto3[], color: string, { n = 3, duracion = 3, radio = 3.2, guia }: { n?: number; duracion?: number; radio?: number; guia?: string } = {}) {
    const d = this.camino(puntos);
    if (guia) this.partes.push(`<path d="${d}" fill="none" stroke="${guia}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 5"/>`);
    for (let i = 0; i < n; i++) {
      this.partes.push(
        `<circle class="iso-paquete" r="${radio}" fill="${color}" stroke="#fff" stroke-width="1.2" style="offset-path:path('${d}');animation-duration:${duracion}s;animation-delay:${r((-duracion * i) / n)}s"/>`,
      );
    }
    return this;
  }

  private idSombra: string | null = null;

  /** Sombra suave en el suelo bajo un objeto que flota: degradado que se difumina. */
  sombra(cx: number, cy: number, z: number, radio: number, opacidad = 0.07) {
    if (!this.idSombra) {
      this.idSombra = this.id('s');
      this.defs.push(
        `<radialGradient id="${this.idSombra}"><stop offset="0" stop-color="#14160F" stop-opacity=".9"/><stop offset=".55" stop-color="#14160F" stop-opacity=".35"/><stop offset="1" stop-color="#14160F" stop-opacity="0"/></radialGradient>`,
      );
    }
    const [x, y] = proyectar([cx, cy, z]);
    const rx = radio * COS * Math.SQRT2 * 0.8;
    const ry = radio * SIN * Math.SQRT2 * 0.8;
    this.anotar([[x - rx, y - ry], [x + rx, y + ry]]);
    this.partes.push(
      `<ellipse class="iso-sombra" cx="${r(x)}" cy="${r(y)}" rx="${r(rx)}" ry="${r(ry)}" fill="url(#${this.idSombra})" opacity="${r(Math.min(opacidad * 2.4, 0.3))}"/>`,
    );
    return this;
  }

  /** Anillos que se expanden desde un punto del suelo (ubicación, señal). */
  ondas(cx: number, cy: number, z: number, radio: number, color: string) {
    const [x, y] = proyectar([cx, cy, z]);
    const rx = radio * COS * Math.SQRT2;
    const ry = radio * SIN * Math.SQRT2;
    for (let i = 0; i < 2; i++) {
      this.partes.push(
        `<ellipse class="iso-onda" cx="${r(x)}" cy="${r(y)}" rx="${r(rx)}" ry="${r(ry)}" fill="none" stroke="${color}" stroke-width="1.5" style="--retraso:${i * 1.2}s"/>`,
      );
    }
    return this;
  }

  /** Hélice que gira en el plano horizontal (la rotación se aplasta a isométrico). */
  helice(p: Punto3, radio: number, color = '#14160F') {
    const [x, y] = proyectar(p);
    this.anotar([[x - radio, y - radio * 0.58], [x + radio, y + radio * 0.58]]);
    this.partes.push(
      `<ellipse cx="${r(x)}" cy="${r(y)}" rx="${radio}" ry="${r(radio * 0.58)}" fill="${color}" opacity=".08"/>` +
        `<g transform="translate(${r(x)} ${r(y)}) scale(1 .58)"><g class="iso-gira" style="--dur:.5s">` +
        `<line x1="${-radio}" y1="0" x2="${radio}" y2="0" stroke="${color}" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>` +
        `<line x1="0" y1="${-radio}" x2="0" y2="${radio}" stroke="${color}" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>` +
        `</g></g>`,
    );
    return this;
  }

  /** Persona sencilla de pie (cuerpo y cabeza). */
  persona(x: number, y: number, z: number, ropa: MaterialArg = 'verde', escala = 1) {
    const s = escala * 1.35;
    this.sombra(x, y, z, 10 * s, 0.1);
    this.cilindro(x, y, z, 6 * s, 9 * s, 'tinta');
    this.cilindro(x, y, z + 9 * s, 6.5 * s, 13 * s, ropa);
    this.esfera([x, y, z + 29 * s], 6.5 * s, '#F2C9A5');
    this.esfera([x - 1 * s, y - 1 * s, z + 33 * s], 5 * s, '#3D2B1F');
    return this;
  }

  /** Arco de datos por el aire entre dos puntos (parábola), con paquetes que lo recorren. */
  arco(a: Punto3, b: Punto3, altura: number, color: string, { n = 2, duracion = 3, guia = true, retraso = 0 }: { n?: number; duracion?: number; guia?: boolean; retraso?: number } = {}) {
    const pasos = 12;
    const pts: Punto3[] = [];
    for (let i = 0; i <= pasos; i++) {
      const t = i / pasos;
      pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t + Math.sin(Math.PI * t) * altura]);
    }
    const d = this.camino(pts);
    if (guia) this.partes.push(`<path d="${d}" fill="none" stroke="${color}" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round" class="iso-traza-lenta"/>`);
    for (let i = 0; i < n; i++) {
      this.partes.push(
        `<circle class="iso-paquete" r="3.4" fill="${color}" stroke="#fff" stroke-width="1.2" style="offset-path:path('${d}');animation-duration:${duracion}s;animation-delay:${r(retraso - (duracion * i) / n)}s"/>`,
      );
    }
    return this;
  }

  /** Algo que recorre una ruta en bucle (vehículo, barco). Se dibuja en el origen. */
  viajero(ruta: Punto3[], { duracion = 12, retraso = 0 }: { duracion?: number; retraso?: number }, dibujar: (e: this) => void) {
    const d = this.camino(ruta);
    const caja = [this.minX, this.minY, this.maxX, this.maxY];
    this.partes.push(`<g class="iso-viaja" style="offset-path:path('${d}');--dur:${duracion}s;--retraso:${retraso}s">`);
    dibujar(this);
    this.partes.push('</g>');
    [this.minX, this.minY, this.maxX, this.maxY] = caja;
    return this;
  }

  /** Nube que deriva por encima de la escena, con su sombra en el suelo. */
  nube(x: number, y: number, z: number, suelo: number, { duracion = 32, retraso = 0, escala = 1 }: { duracion?: number; retraso?: number; escala?: number } = {}) {
    const s = escala;
    const caja = [this.minX, this.minY, this.maxX, this.maxY];
    const vars = `--dur:${duracion}s;--retraso:${retraso}s`;
    this.partes.push(`<g class="iso-deriva" style="${vars}">`);
    this.sombra(x, y, suelo, 26 * s, 0.05);
    this.partes.push('</g>');
    this.partes.push(`<g class="iso-deriva" style="${vars}">`);
    const [cx, cy] = proyectar([x, y, z]);
    this.partes.push(
      `<g transform="translate(${r(cx)} ${r(cy)}) scale(${s})" fill="#fff" stroke="#D8E6EF" stroke-width="1">` +
        `<ellipse cx="0" cy="0" rx="26" ry="9"/><circle cx="-8" cy="-6" r="10"/><circle cx="7" cy="-9" r="12"/><ellipse cx="0" cy="1" rx="25" ry="7" stroke="none"/></g>`,
    );
    this.partes.push('</g>');
    [this.minX, this.minY, this.maxX, this.maxY] = caja;
    return this;
  }

  /** Texto tumbado sobre el suelo (plano z), en perspectiva isométrica. */
  texto(p: Punto3, contenido: string, { tamano = 9, color = '#14160F', peso = 700 }: { tamano?: number; color?: string; peso?: number } = {}) {
    const [x, y] = proyectar(p);
    this.anotar([[x - 20, y - 10], [x + 20, y + 10]]);
    const seguro = contenido.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    // Matriz del plano del suelo: eje x isométrico → (cos30, sin30), eje y → (-cos30, sin30).
    this.partes.push(
      `<text transform="matrix(${r(COS)} ${SIN} ${r(-COS)} ${SIN} ${r(x)} ${r(y)})" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="${tamano}" font-weight="${peso}" fill="${color}" text-anchor="middle">${seguro}</text>`,
    );
    return this;
  }

  /** Etiqueta vertical (cartel) que mira al espectador, sin perspectiva. */
  cartel(p: Punto3, contenido: string, { color = '#14160F', fondo = '#fff' }: { color?: string; fondo?: string } = {}) {
    const [x, y] = proyectar(p);
    const ancho = contenido.length * 5.6 + 14;
    this.anotar([[x - ancho / 2, y - 18], [x + ancho / 2, y + 2]]);
    const seguro = contenido.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    this.partes.push(
      `<g transform="translate(${r(x)} ${r(y)})"><rect x="${r(-ancho / 2)}" y="-18" width="${r(ancho)}" height="15" rx="7.5" fill="${fondo}" stroke="#D7D9CF"/>` +
        `<text x="0" y="-7.4" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="8.5" font-weight="700" fill="${color}" text-anchor="middle">${seguro}</text></g>`,
    );
    return this;
  }

  /** Agrupa lo que dibuje `dibujar` bajo una clase de animación. */
  grupo({ clase, retraso, duracion }: Grupo, dibujar: (e: this) => void) {
    const vars = [retraso ? `--retraso:${retraso}s` : '', duracion ? `--dur:${duracion}s` : ''].filter(Boolean).join(';');
    this.partes.push(`<g${clase ? ` class="${clase}"` : ''}${vars ? ` style="${vars}"` : ''}>`);
    dibujar(this);
    this.partes.push('</g>');
    return this;
  }

  /** Recorta lo que dibuje `dibujar` al polígono dado (pantallas con contenido que se desplaza). */
  recorte(contorno: Punto3[], dibujar: (e: this) => void) {
    const id = this.id('c');
    this.defs.push(`<clipPath id="${id}"><polygon points="${this.puntos(contorno)}"/></clipPath>`);
    this.partes.push(`<g clip-path="url(#${id})">`);
    const [minX, minY, maxX, maxY] = [this.minX, this.minY, this.maxX, this.maxY];
    dibujar(this);
    // Lo recortado no amplía la caja de la escena.
    [this.minX, this.minY, this.maxX, this.maxY] = [minX, minY, maxX, maxY];
    this.partes.push('</g>');
    return this;
  }

  /** SVG completo con viewBox ajustado al contenido más un margen. */
  svg({ titulo, margen = 12, clase = '', independiente = false }: { titulo?: string; margen?: number; clase?: string; independiente?: boolean } = {}) {
    // Margen extra arriba: los grupos que flotan suben unos píxeles.
    const x = Math.floor(this.minX - margen);
    const y = Math.floor(this.minY - margen - 10);
    const w = Math.ceil(this.maxX - this.minX + margen * 2);
    const h = Math.ceil(this.maxY - this.minY + margen * 2 + 10);
    const accesible = titulo
      ? ` role="img" aria-label="${titulo.replace(/"/g, '&quot;')}"`
      : ' aria-hidden="true" focusable="false"';
    const estilo = independiente ? `<style>${ISO_CSS.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ')}</style>` : '';
    const defs = this.defs.length || estilo ? `<defs>${estilo}${this.defs.join('')}</defs>` : '';
    return {
      ancho: w,
      alto: h,
      html:
        `<svg class="iso ${clase}" viewBox="${x} ${y} ${w} ${h}" width="${w}" height="${h}"` +
        ` xmlns="http://www.w3.org/2000/svg"${accesible}>${defs}${this.partes.join('')}</svg>`,
    };
  }
}
