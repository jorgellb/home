/* Estrategias de anclaje por categoría.

   Cada categoría resuelve por su cuenta escala, posición y giro dentro del
   espacio de cabeza (centímetros). Son funciones puras: entran los landmarks,
   las dimensiones de cabeza y la caja del modelo, y sale una transformación.
   Así se pueden probar sin WebGL y calibrar sin tocar el render.

   Regla de oro: la posición se resuelve alineando una CARA de la caja del
   modelo con un punto de contacto real (puente nasal, corona del cráneo,
   lóbulo), nunca centrando el modelo «a ojo». */
import * as THREE from 'three';
import type { CalibracionAR, CategoriaAR, DimensionesCabeza } from './tipos';
import { LM } from './malla-canonica';

export interface EntradaAnclaje {
  puntos: THREE.Vector3[];
  dims: DimensionesCabeza;
  /** Caja del modelo GLB, en sus unidades de origen (normalmente metros). */
  caja: THREE.Box3;
  calibracion: CalibracionAR;
}

export interface SalidaAnclaje {
  /** Factor que lleva el modelo de sus unidades a centímetros de cabeza. */
  escala: number;
  posicion: THREE.Vector3;
  rotacion: THREE.Euler;
  oclusion: { cara: boolean; cabeza: boolean };
}

export const CALIBRACION_BASE: Record<CategoriaAR, CalibracionAR> = {
  gafas:      { escala: 1, posicion: [0, 0, 0], rotacion: [0, 0, 0] },
  sombrero:   { escala: 1, posicion: [0, 0, 0], rotacion: [-6, 0, 0] },
  pendientes: { escala: 1, posicion: [0, 0, 0], rotacion: [0, 0, 0] },
  cuello:     { escala: 1, posicion: [0, 0, 0], rotacion: [0, 0, 0] },
  torso:      { escala: 1, posicion: [0, 0, 0], rotacion: [0, 0, 0] },
};

const grados = (g: number) => (g * Math.PI) / 180;

/** Qué oclusores necesita cada categoría por defecto. */
export const OCLUSION_BASE: Record<CategoriaAR, { cara: boolean; cabeza: boolean }> = {
  gafas: { cara: true, cabeza: true },
  sombrero: { cara: false, cabeza: true },
  pendientes: { cara: true, cabeza: true },
  cuello: { cara: false, cabeza: true },
  torso: { cara: false, cabeza: false },
};

/** Punto de la caja del modelo (ya escalada) que se apoya en la cabeza. */
type Ancla = { y: 'centro' | 'min' | 'max'; z: 'centro' | 'min' | 'max' };

function puntoDeCaja(caja: THREE.Box3, escala: number, ancla: Ancla): THREE.Vector3 {
  const min = caja.min.clone().multiplyScalar(escala);
  const max = caja.max.clone().multiplyScalar(escala);
  return new THREE.Vector3(
    (min.x + max.x) / 2,
    ancla.y === 'centro' ? (min.y + max.y) / 2 : ancla.y === 'min' ? min.y : max.y,
    ancla.z === 'centro' ? (min.z + max.z) / 2 : ancla.z === 'min' ? min.z : max.z,
  );
}

function resolver(
  entrada: EntradaAnclaje,
  escala: number,
  destino: THREE.Vector3,
  ancla: Ancla,
  rotacionBase: [number, number, number],
  oclusion: { cara: boolean; cabeza: boolean },
): SalidaAnclaje {
  const { calibracion } = entrada;
  const escalaFinal = escala * calibracion.escala;
  const punto = puntoDeCaja(entrada.caja, escalaFinal, ancla);
  const posicion = destino.clone().sub(punto).add(new THREE.Vector3(...calibracion.posicion));
  return {
    escala: escalaFinal,
    posicion,
    rotacion: new THREE.Euler(
      grados(rotacionBase[0] + calibracion.rotacion[0]),
      grados(rotacionBase[1] + calibracion.rotacion[1]),
      grados(rotacionBase[2] + calibracion.rotacion[2]),
      'YXZ',
    ),
    oclusion,
  };
}

/** Gafas: el frente de la montura se apoya en el puente nasal y el centro de
    las lentes cae a la altura de los ojos. El ancho sale de las sienes, que no
    se mueven al hablar ni al sonreír. */
export function anclarGafas(entrada: EntradaAnclaje): SalidaAnclaje {
  const { puntos, dims, caja } = entrada;
  const anchoModelo = caja.max.x - caja.min.x;
  const escala = (dims.anchoCara * 0.92) / anchoModelo;
  const alturaOjos = (puntos[LM.ojoIzqExt].y + puntos[LM.ojoDerExt].y) / 2;
  const puente = puntos[LM.puenteNasal];
  const destino = new THREE.Vector3(0, alturaOjos, puente.z + 0.5);
  return resolver(entrada, escala, destino, { y: 'centro', z: 'max' }, [0, 0, 0], { cara: true, cabeza: true });
}

/** Sombreros y gorras: se escalan por el ancho CRANEAL, no por el de la cara, y
    su borde inferior se hunde un poco en el cráneo. Esa interpenetración, junto
    con la oclusión, es lo que hace que se vea «puesto» y no «encima». */
export function anclarSombrero(entrada: EntradaAnclaje): SalidaAnclaje {
  const { dims, caja } = entrada;
  const anchoModelo = caja.max.x - caja.min.x;
  const escala = (dims.anchoCabeza * 1.06) / anchoModelo;
  const [cx, cy, cz] = dims.centroCraneo;
  const coronaY = cy + dims.altoCabeza / 2;
  /* Se ancla por la COPA, no por el borde: lo que toca la cabeza es la parte de
     arriba del modelo. Anclando por abajo, cualquier gorra con copa alta acaba
     flotando. El pequeño margen deja sitio al pelo. */
  const destino = new THREE.Vector3(cx, coronaY + dims.anchoCara * 0.09, cz);
  return resolver(entrada, escala, destino, { y: 'max', z: 'centro' }, CALIBRACION_BASE.sombrero.rotacion, {
    cara: false,
    cabeza: true,
  });
}

/** Pendientes: el lóbulo no existe como tal en la malla, así que se deduce de
    los puntos del contorno de la oreja bajando un poco en Y. */
export function anclarPendiente(entrada: EntradaAnclaje, lado: 'izq' | 'der'): SalidaAnclaje {
  const { puntos, dims, caja } = entrada;
  const anchoModelo = Math.max(caja.max.x - caja.min.x, 1e-6);
  const escala = (dims.anchoCara * 0.22) / anchoModelo;
  /* El lóbulo no está en la malla: se deduce bajando desde el contorno de la
     oreja, que sí es un punto rígido. */
  const oreja = puntos[lado === 'izq' ? LM.orejaIzq : LM.orejaDer];
  const destino = new THREE.Vector3(oreja.x * 0.94, oreja.y - dims.anchoCara * 0.16, oreja.z - dims.anchoCara * 0.06);
  return resolver(entrada, escala, destino, { y: 'max', z: 'centro' }, [0, 0, 0], { cara: true, cabeza: true });
}

export function anclar(categoria: CategoriaAR, entrada: EntradaAnclaje, lado: 'izq' | 'der' = 'izq'): SalidaAnclaje {
  switch (categoria) {
    case 'gafas':
      return anclarGafas(entrada);
    case 'sombrero':
      return anclarSombrero(entrada);
    case 'pendientes':
      return anclarPendiente(entrada, lado);
    default:
      return anclarGafas(entrada);
  }
}

/** Mezcla la base de la categoría con el ajuste del SKU. Primero categoría,
    después producto: nunca al revés. */
export function calibracionDe(categoria: CategoriaAR, propia?: Partial<CalibracionAR>): CalibracionAR {
  const base = CALIBRACION_BASE[categoria];
  return {
    escala: propia?.escala ?? base.escala,
    posicion: propia?.posicion ?? base.posicion,
    rotacion: propia?.rotacion ?? base.rotacion,
  };
}
