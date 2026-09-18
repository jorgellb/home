/* Rastreador facial: envoltorio de MediaPipe Face Landmarker.

   Dos decisiones importantes:
   1. Pedimos la matriz de transformación facial (`outputFacialTransformationMatrixes`),
      que es la pose 3D completa. El motor anterior la pedía y solo le sacaba
      dos ángulos.
   2. Intentamos GPU y caemos a CPU sin romper el probador si el dispositivo no
      la soporta. */
import { FaceLandmarker, FilesetResolver, type FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export interface Rastreador {
  detectar(video: HTMLVideoElement, tiempoMs: number): FaceLandmarkerResult | null;
  liberar(): void;
  delegado: 'GPU' | 'CPU';
}

export async function crearRastreador(): Promise<Rastreador> {
  const fileset = await FilesetResolver.forVisionTasks('/mediapipe/wasm');

  const opciones = (delegate: 'GPU' | 'CPU') => ({
    baseOptions: { modelAssetPath: '/models/face_landmarker.task', delegate },
    runningMode: 'VIDEO' as const,
    numFaces: 1,
    outputFacialTransformationMatrixes: true,
    outputFaceBlendshapes: false,
  });

  let delegado: 'GPU' | 'CPU' = 'GPU';
  let landmarker: FaceLandmarker;
  try {
    landmarker = await FaceLandmarker.createFromOptions(fileset, opciones('GPU'));
  } catch {
    delegado = 'CPU';
    landmarker = await FaceLandmarker.createFromOptions(fileset, opciones('CPU'));
  }

  let ultimoTiempo = -1;
  return {
    delegado,
    detectar(video, tiempoMs) {
      if (video.readyState < 2) return null;
      /* MediaPipe exige marcas de tiempo crecientes. */
      const t = tiempoMs <= ultimoTiempo ? ultimoTiempo + 1 : tiempoMs;
      ultimoTiempo = t;
      try {
        return landmarker.detectForVideo(video, t);
      } catch {
        return null;
      }
    },
    liberar() {
      landmarker.close();
    },
  };
}
