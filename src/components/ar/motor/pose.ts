/* Pose de la cabeza y encaje de la cámara virtual con la real.

   MediaPipe entrega una matriz 4×4 que coloca el modelo facial canónico (en cm)
   en el espacio de una cámara en perspectiva con un campo de visión vertical
   conocido. Usar esa matriz tal cual —en vez de deducir ángulos a mano— es lo
   que hace que el producto deje de parecer una pegatina. */
import * as THREE from 'three';

/** Campo de visión vertical que asume la geometría facial de MediaPipe. */
export const FOV_MEDIAPIPE = 63;

export interface PoseCabeza {
  posicion: THREE.Vector3;
  cuaternion: THREE.Quaternion;
  escala: THREE.Vector3;
}

const _m = new THREE.Matrix4();

/** Descompone la matriz de MediaPipe (column-major, 16 números). */
export function poseDesdeMatriz(datos: ArrayLike<number>, destino?: PoseCabeza): PoseCabeza {
  const pose: PoseCabeza = destino ?? {
    posicion: new THREE.Vector3(),
    cuaternion: new THREE.Quaternion(),
    escala: new THREE.Vector3(1, 1, 1),
  };
  _m.fromArray(datos as ArrayLike<number> as number[]);
  _m.decompose(pose.posicion, pose.cuaternion, pose.escala);
  return pose;
}

/** Distancia de la cabeza a la cámara, en cm (para avisar de cerca/lejos). */
export function distanciaCamara(pose: PoseCabeza): number {
  return pose.posicion.length();
}

export interface EncajeVideo {
  anchoVideo: number;
  altoVideo: number;
  anchoCaja: number;
  altoCaja: number;
}

/** Recorte que aplica `object-fit: cover` al pintar el vídeo en la caja.
    Devuelve el rectángulo visible en píxeles del propio vídeo. */
export function recorteCover({ anchoVideo, altoVideo, anchoCaja, altoCaja }: EncajeVideo) {
  const escala = Math.max(anchoCaja / anchoVideo, altoCaja / altoVideo);
  const anchoVisible = Math.min(anchoVideo, anchoCaja / escala);
  const altoVisible = Math.min(altoVideo, altoCaja / escala);
  return {
    x: (anchoVideo - anchoVisible) / 2,
    y: (altoVideo - altoVisible) / 2,
    ancho: anchoVisible,
    alto: altoVisible,
  };
}

/** Ajusta la cámara virtual al trozo de vídeo que realmente se ve.
    Sin esto, el producto «nada» cuando el vídeo va recortado. */
export function encajarCamara(camara: THREE.PerspectiveCamera, encaje: EncajeVideo): void {
  const { anchoVideo, altoVideo } = encaje;
  const r = recorteCover(encaje);
  camara.fov = FOV_MEDIAPIPE;
  camara.aspect = r.ancho / r.alto;
  camara.setViewOffset(anchoVideo, altoVideo, r.x, r.y, r.ancho, r.alto);
  camara.updateProjectionMatrix();
}
