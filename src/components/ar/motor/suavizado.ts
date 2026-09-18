/* Suavizado del seguimiento.

   El filtro «One Euro» hace lo que necesita un probador: cuando la persona está
   quieta filtra mucho (nada de temblor) y cuando se mueve deprisa filtra poco
   (nada de retraso). Un lerp fijo, como el del motor anterior, obliga a elegir
   entre las dos cosas. Referencia: Casiez, Roussel y Vogel (2012). */

export interface OpcionesUnEuro {
  /** Frecuencia mínima de corte: cuanto más baja, más quieto se ve. */
  minCutoff?: number;
  /** Cuánto se abre el filtro con la velocidad. */
  beta?: number;
  /** Corte del filtro de la derivada. */
  dCutoff?: number;
}

class PasoBajo {
  private y: number | null = null;
  filtrar(x: number, alfa: number): number {
    this.y = this.y === null ? x : alfa * x + (1 - alfa) * this.y;
    return this.y;
  }
  get valor(): number | null {
    return this.y;
  }
  reiniciar(): void {
    this.y = null;
  }
}

const alfa = (corte: number, dt: number): number => {
  const tau = 1 / (2 * Math.PI * corte);
  return 1 / (1 + tau / dt);
};

export class FiltroUnEuro {
  private x = new PasoBajo();
  private dx = new PasoBajo();
  private tPrevio: number | null = null;
  private xPrevio: number | null = null;

  constructor(private op: Required<OpcionesUnEuro> = { minCutoff: 1.2, beta: 0.02, dCutoff: 1 }) {}

  filtrar(valor: number, t: number): number {
    const dt = this.tPrevio === null ? 1 / 30 : Math.max((t - this.tPrevio) / 1000, 1 / 240);
    this.tPrevio = t;
    const derivada = this.xPrevio === null ? 0 : (valor - this.xPrevio) / dt;
    this.xPrevio = valor;
    const dSuave = this.dx.filtrar(derivada, alfa(this.op.dCutoff, dt));
    const corte = this.op.minCutoff + this.op.beta * Math.abs(dSuave);
    return this.x.filtrar(valor, alfa(corte, dt));
  }

  reiniciar(): void {
    this.x.reiniciar();
    this.dx.reiniciar();
    this.tPrevio = null;
    this.xPrevio = null;
  }
}

/** Tres filtros, uno por eje. Para posición y escala. */
export class FiltroVector {
  private ejes: FiltroUnEuro[];
  constructor(op?: OpcionesUnEuro, n = 3) {
    this.ejes = Array.from({ length: n }, () => new FiltroUnEuro({ minCutoff: 1.2, beta: 0.02, dCutoff: 1, ...op }));
  }
  filtrar(valores: number[], t: number): number[] {
    return valores.map((v, i) => this.ejes[i].filtrar(v, t));
  }
  reiniciar(): void {
    this.ejes.forEach((f) => f.reiniciar());
  }
}

/** Factor de interpolación esférica adaptativo para la rotación.
    Ángulo grande (movimiento rápido) → sigue más; quieto → suaviza más. */
export function factorRotacion(anguloRad: number, base = 0.22, maximo = 0.9): number {
  const extra = Math.min(anguloRad / 0.35, 1);
  return Math.min(base + extra * (maximo - base), maximo);
}
