/* Escena de Three: render, cámara en perspectiva encajada con el vídeo, luz
   discreta y limpieza completa al cerrar. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { encajarCamara, FOV_MEDIAPIPE } from './pose';

export type Calidad = 'alta' | 'media' | 'baja';

export interface Escena {
  renderer: THREE.WebGLRenderer;
  escena: THREE.Scene;
  camara: THREE.PerspectiveCamera;
  /** Nodo que recibe la pose de la cabeza; todo lo demás cuelga de él. */
  cabeza: THREE.Group;
  redimensionar(caja: { ancho: number; alto: number }, video: { ancho: number; alto: number }): void;
  aplicarCalidad(c: Calidad): void;
  pintar(): void;
  liberar(): void;
}

export function crearEscena(lienzo: HTMLCanvasElement, calidad: Calidad = 'alta'): Escena {
  const renderer = new THREE.WebGLRenderer({
    canvas: lienzo,
    alpha: true,
    antialias: calidad === 'alta',
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(FOV_MEDIAPIPE, 1, 1, 2000);

  /* Luz suave y neutra: el producto tiene que parecer que está en la misma
     habitación que la persona, no en un estudio de fotografía. */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const entorno = pmrem.fromScene(new RoomEnvironment(), 0.06);
  escena.environment = entorno.texture;
  const hemisferio = new THREE.HemisphereLight(0xffffff, 0x445566, 0.9);
  const principal = new THREE.DirectionalLight(0xffffff, 1.1);
  principal.position.set(0.6, 1.4, 2);
  escena.add(hemisferio, principal);

  const cabeza = new THREE.Group();
  cabeza.matrixAutoUpdate = false;
  escena.add(cabeza);

  let calidadActual = calidad;

  return {
    renderer,
    escena,
    camara,
    cabeza,
    redimensionar(caja, video) {
      renderer.setSize(caja.ancho, caja.alto, false);
      encajarCamara(camara, {
        anchoVideo: video.ancho,
        altoVideo: video.alto,
        anchoCaja: caja.ancho,
        altoCaja: caja.alto,
      });
    },
    aplicarCalidad(c) {
      calidadActual = c;
      const tope = c === 'alta' ? 2 : c === 'media' ? 1.5 : 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, tope));
    },
    pintar() {
      renderer.render(escena, camara);
    },
    liberar() {
      escena.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      entorno.texture.dispose();
      pmrem.dispose();
      renderer.dispose();
      void calidadActual;
    },
  };
}
