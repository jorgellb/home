/* Motor de ilustración isométrica que se ejecuta en el build.

   Cada escena se describe con cajas, losas, cilindros y caras en coordenadas
   3D (x hacia la derecha-abajo, y hacia la izquierda-abajo, z hacia arriba) y
   sale como SVG estático: el navegador no ejecuta nada. La animación la pone
   el CSS con las clases `iso-*`, que solo tocan transform y opacity.

   El orden de pintado es el orden de llamada: se dibuja de atrás (x + y
   pequeños, z bajo) hacia delante. */

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

export type Punto3 = [number, number, number];

/** Material: color de la cara superior, la izquierda (frente y) y la derecha (frente x). */
export interface Material {
  arriba: string;
  izquierda: string;
  derecha: string;
}

export const MATERIALES = {
  blanco: { arriba: '#FFFFFF', izquierda: '#E9EAE3', derecha: '#D7D9CF' },
  papel: { arriba: '#F6F4EC', izquierda: '#E4E1D4', derecha: '#D2CEBE' },
  tinta: { arriba: '#3A3F36', izquierda: '#22261F', derecha: '#14160F' },
  verde: { arriba: '#2E8A5F', izquierda: '#0E5B3A', derecha: '#0A472D' },
  menta: { arriba: '#D5F0E0', izquierda: '#AFDFC3', derecha: '#8FCBA8' },
  platano: { arriba: '#FFE07A', izquierda: '#FFCF3F', derecha: '#E9B21C' },
  cielo: { arriba: '#DCEEFA', izquierda: '#B7DAF2', derecha: '#93C3E5' },
  azul: { arriba: '#5B8DEF', izquierda: '#3B6FD6', derecha: '#2A55AE' },
  arena: { arriba: '#F6EBD3', izquierda: '#E8D6B0', derecha: '#D5BE8E' },
  coral: { arriba: '#FFA48A', izquierda: '#FF7F5C', derecha: '#E0603F' },
  lila: { arriba: '#E4DDFB', izquierda: '#C8BCF3', derecha: '#A898E6' },
} satisfies Record<string, Material>;

export type NombreMaterial = keyof typeof MATERIALES;
type MaterialArg = NombreMaterial | Material;

const mat = (m: MaterialArg): Material => (typeof m === 'string' ? MATERIALES[m] : m);

const r = (n: number) => Math.round(n * 100) / 100;

/** Proyección isométrica de un punto 3D a 2D. */
export function proyectar([x, y, z]: Punto3): [number, number] {
  return [(x - y) * COS, (x + y) * SIN - z];
}

export interface Caja {
  x: number; y: number; z?: number;
  w: number; d: number; h: number;
  m: MaterialArg;
  /** Trazo de las aristas; por defecto ninguno. */
  trazo?: string;
}

export interface Grupo {
  /** Clase de animación (`iso-flota`, `iso-sube`, `iso-pulso`, `iso-gira`, `iso-parpadeo`…). */
  clase?: string;
  /** Retraso de la animación en segundos, para desfasar elementos. */
  retraso?: number;
}

/** Constructor de escenas. Acumula SVG y calcula su caja envolvente. */
export class Escena {
  private partes: string[] = [];
  private minX = Infinity;
  private minY = Infinity;
  private maxX = -Infinity;
  private maxY = -Infinity;

  private anotar(pts: [number, number][]) {
    for (const [x, y] of pts) {
      if (x < this.minX) this.minX = x;
      if (y < this.minY) this.minY = y;
      if (x > this.maxX) this.maxX = x;
      if (y > this.maxY) this.maxY = y;
    }
  }

  private poligono(pts3: Punto3[], relleno: string, extra = '') {
    const pts = pts3.map(proyectar);
    this.anotar(pts);
    const d = pts.map(([x, y]) => `${r(x)},${r(y)}`).join(' ');
    this.partes.push(`<polygon points="${d}" fill="${relleno}"${extra}/>`);
  }

  /** Prisma rectangular con sus tres caras visibles. */
  caja({ x, y, z = 0, w, d, h, m, trazo }: Caja) {
    const c = mat(m);
    const t = trazo ? ` stroke="${trazo}" stroke-width="1" stroke-linejoin="round"` : '';
    // Cara x = x + w (derecha)
    this.poligono([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], c.derecha, t);
    // Cara y = y + d (izquierda)
    this.poligono([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], c.izquierda, t);
    // Cara superior
    this.poligono([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], c.arriba, t);
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
    const rx = radio * COS * Math.SQRT2;
    const ry = radio * SIN * Math.SQRT2;
    const [bx, by] = proyectar([cx, cy, z]);
    const [tx, ty] = proyectar([cx, cy, z + h]);
    this.anotar([[bx - rx, by + ry], [bx + rx, by + ry], [tx - rx, ty - ry], [tx + rx, ty - ry]]);
    const lado =
      `M${r(tx - rx)},${r(ty)} L${r(bx - rx)},${r(by)} ` +
      `A${r(rx)},${r(ry)} 0 0 0 ${r(bx + rx)},${r(by)} L${r(tx + rx)},${r(ty)} Z`;
    this.partes.push(
      `<path d="${lado}" fill="${c.izquierda}"/>` +
        `<ellipse cx="${r(tx)}" cy="${r(ty)}" rx="${r(rx)}" ry="${r(ry)}" fill="${c.arriba}"/>`,
    );
    return this;
  }

  /** Esfera (círculo con brillo) centrada en un punto 3D. */
  esfera(p: Punto3, radio: number, relleno: string, brillo = 'rgba(255,255,255,.55)') {
    const [x, y] = proyectar(p);
    this.anotar([[x - radio, y - radio], [x + radio, y + radio]]);
    this.partes.push(
      `<circle cx="${r(x)}" cy="${r(y)}" r="${radio}" fill="${relleno}"/>` +
        `<circle cx="${r(x - radio * 0.35)}" cy="${r(y - radio * 0.35)}" r="${r(radio * 0.3)}" fill="${brillo}"/>`,
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

  /** Polilínea en el espacio 3D (gráficas, rutas). */
  ruta(puntos: Punto3[], trazo: string, ancho = 3, extra = '') {
    const pts = puntos.map(proyectar);
    this.anotar(pts);
    const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${r(x)},${r(y)}`).join(' ');
    this.partes.push(
      `<path d="${d}" fill="none" stroke="${trazo}" stroke-width="${ancho}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`,
    );
    return this;
  }

  /** Sombra suave en el suelo bajo un objeto que flota. */
  sombra(cx: number, cy: number, z: number, radio: number, opacidad = 0.07) {
    const [x, y] = proyectar([cx, cy, z]);
    const rx = radio * COS * Math.SQRT2;
    const ry = radio * SIN * Math.SQRT2;
    this.anotar([[x - rx, y - ry], [x + rx, y + ry]]);
    this.partes.push(
      `<ellipse class="iso-sombra" cx="${r(x)}" cy="${r(y)}" rx="${r(rx)}" ry="${r(ry)}" fill="#14160F" opacity="${opacidad}"/>`,
    );
    return this;
  }

  /** Agrupa lo que dibuje `dibujar` bajo una clase de animación. */
  grupo({ clase, retraso }: Grupo, dibujar: (e: this) => void) {
    const estilo = retraso ? ` style="--retraso:${retraso}s"` : '';
    this.partes.push(`<g${clase ? ` class="${clase}"` : ''}${estilo}>`);
    dibujar(this);
    this.partes.push('</g>');
    return this;
  }

  /** SVG completo con viewBox ajustado al contenido más un margen. */
  svg({ titulo, margen = 12, clase = '' }: { titulo?: string; margen?: number; clase?: string } = {}) {
    // Margen extra arriba: los grupos que flotan suben unos píxeles.
    const x = Math.floor(this.minX - margen);
    const y = Math.floor(this.minY - margen - 10);
    const w = Math.ceil(this.maxX - this.minX + margen * 2);
    const h = Math.ceil(this.maxY - this.minY + margen * 2 + 10);
    const accesible = titulo
      ? ` role="img" aria-label="${titulo.replace(/"/g, '&quot;')}"`
      : ' aria-hidden="true" focusable="false"';
    return {
      ancho: w,
      alto: h,
      html:
        `<svg class="iso ${clase}" viewBox="${x} ${y} ${w} ${h}" width="${w}" height="${h}"` +
        ` xmlns="http://www.w3.org/2000/svg"${accesible}>${this.partes.join('')}</svg>`,
    };
  }
}
