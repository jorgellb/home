/* Tipos del motor de prueba virtual.

   CONVENCIONES DEL PROYECTO (no cambiar sin actualizar este comentario):
   · Espacio de cabeza = el del modelo facial canónico de MediaPipe, en
     CENTÍMETROS, con X a la derecha, Y arriba y Z hacia delante (hacia la
     cámara). El vértice i de la malla canónica es el landmark i.
   · Los modelos GLB se autorizan en metros y el motor los reescala.
   · Toda calibración se expresa en centímetros y grados, nunca en píxeles. */

export type CategoriaAR = 'gafas' | 'sombrero' | 'pendientes' | 'cuello' | 'torso';

export interface CalibracionAR {
  /** Multiplicador sobre la escala que calcula la estrategia (1 = tal cual). */
  escala: number;
  /** Desplazamiento fino en centímetros dentro del espacio de cabeza. */
  posicion: [number, number, number];
  /** Giro fino en grados. */
  rotacion: [number, number, number];
}

export interface ProductoAR {
  id: string;
  sku?: string;
  nombre: string;
  categoria: CategoriaAR;
  modelo: string;
  etiqueta?: string;
  /** Corrección de orientación del ASSET, en grados. Se aplica antes de medir
      la caja del modelo, así que no descoloca el anclaje. Es el sitio para
      arreglar un GLB exportado mirando hacia atrás. */
  orientacion?: [number, number, number];
  /** Ajustes propios del SKU. Se aplican SOBRE la base de la categoría. */
  calibracion?: Partial<CalibracionAR>;
  oclusion?: { cara?: boolean; cabeza?: boolean };
  /** Medidas reales, si se conocen. Hoy solo documentan; mañana calibran. */
  medidasMm?: { ancho?: number; alto?: number; contorno?: number };
}

export interface DimensionesCabeza {
  /** Distancia real entre sienes del modelo canónico, en cm. */
  anchoCara: number;
  anchoCabeza: number;
  altoCabeza: number;
  fondoCabeza: number;
  /** Centro del cráneo en espacio de cabeza. */
  centroCraneo: [number, number, number];
}

export type EstadoSesion =
  | 'inactiva'
  | 'pidiendo-permiso'
  | 'iniciando'
  | 'buscando-cara'
  | 'calibrando'
  | 'siguiendo'
  | 'confianza-baja'
  | 'error'
  | 'cerrada';

export type CodigoErrorAR =
  | 'AR_CAMERA_DENIED'
  | 'AR_CAMERA_BUSY'
  | 'AR_NO_CAMERA'
  | 'AR_INSECURE_CONTEXT'
  | 'AR_WEBGL_UNAVAILABLE'
  | 'AR_TRACKER_INIT_ERROR'
  | 'AR_MODEL_LOAD_ERROR';

export interface AvisoEncuadre {
  tipo: 'lejos' | 'cerca' | 'centrado' | 'sin-cara';
  texto: string;
}
