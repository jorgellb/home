/* Malla facial canónica de MediaPipe (Apache-2.0), en centímetros.

   Se parsea a mano a propósito: OBJLoader desindexa la geometría y entonces el
   vértice 234 deja de ser el landmark 234, que es justo lo que necesitamos para
   anclar productos. Aquí vértice i = landmark i. */
import * as THREE from 'three';
import type { DimensionesCabeza } from './tipos';

/** Landmarks estables: nada de labios ni mandíbula, que se mueven al hablar. */
export const LM = {
  puenteNasal: 168,
  entrecejo: 6,
  frente: 10,
  menton: 152,
  sienIzq: 234,
  sienDer: 454,
  orejaIzq: 127,
  orejaDer: 356,
  ojoIzqExt: 33,
  ojoDerExt: 263,
  lobuloIzq: 132,
  lobuloDer: 361,
} as const;

/* Proporciones antropométricas medias para deducir el cráneo, que la malla
   facial no incluye. Se centralizan aquí para poder calibrarlas de una vez. */
export const RATIOS_CABEZA = {
  ancho: 1.02,   // ancho craneal respecto a la distancia entre sienes
  alto: 1.28,
  fondo: 1.16,
  /** Altura del centro del cráneo por debajo de la frente (× ancho de cara). */
  centroBajoFrente: 0.34,
  /** Retranqueo del centro del cráneo respecto a las orejas (× ancho de cara). */
  centroTrasOrejas: 0.07,
} as const;

export interface MallaCanonica {
  geometria: THREE.BufferGeometry;
  puntos: THREE.Vector3[];
}

export function parsearMallaCanonica(texto: string): MallaCanonica {
  const puntos: THREE.Vector3[] = [];
  const indices: number[] = [];
  for (const linea of texto.split('\n')) {
    if (linea.startsWith('v ')) {
      const [x, y, z] = linea.slice(2).trim().split(/\s+/).map(Number);
      puntos.push(new THREE.Vector3(x, y, z));
    } else if (linea.startsWith('f ')) {
      const cara = linea.slice(2).trim().split(/\s+/).map((t) => parseInt(t.split('/')[0], 10) - 1);
      for (let i = 1; i < cara.length - 1; i++) indices.push(cara[0], cara[i], cara[i + 1]);
    }
  }
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.Float32BufferAttribute(puntos.flatMap((p) => [p.x, p.y, p.z]), 3));
  geometria.setIndex(indices);
  geometria.computeVertexNormals();
  return { geometria, puntos };
}

let cache: Promise<MallaCanonica> | null = null;

export function cargarMallaCanonica(url = '/models/canonical_face_model.obj'): Promise<MallaCanonica> {
  cache ??= fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`malla canónica ${r.status}`);
      return r.text();
    })
    .then(parsearMallaCanonica);
  return cache;
}

/** Dimensiones de cabeza deducidas de la malla canónica, en centímetros. */
export function dimensionesCabeza(puntos: THREE.Vector3[]): DimensionesCabeza {
  const sienIzq = puntos[LM.sienIzq];
  const sienDer = puntos[LM.sienDer];
  const frente = puntos[LM.frente];
  const orejaIzq = puntos[LM.orejaIzq];
  const anchoCara = sienIzq.distanceTo(sienDer);
  return {
    anchoCara,
    anchoCabeza: anchoCara * RATIOS_CABEZA.ancho,
    altoCabeza: anchoCara * RATIOS_CABEZA.alto,
    fondoCabeza: anchoCara * RATIOS_CABEZA.fondo,
    centroCraneo: [
      0,
      frente.y - anchoCara * RATIOS_CABEZA.centroBajoFrente,
      orejaIzq.z - anchoCara * RATIOS_CABEZA.centroTrasOrejas,
    ],
  };
}
