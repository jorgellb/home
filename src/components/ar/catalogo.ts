/* Catálogo de demostración del probador virtual.

   Nada de `if (producto === 'gorra')` en el motor: cada producto se describe
   aquí y el motor lo coloca con la estrategia de su categoría. Este mismo
   formato es el que puede venir de WooCommerce o de una API externa. */
import type { ProductoAR } from './motor/tipos';

export const catalogoAR: ProductoAR[] = [
  {
    id: 'gafas-aviador',
    nombre: 'Gafas aviador',
    etiqueta: 'Eyewear',
    categoria: 'gafas',
    modelo: '/models/glasses.glb',
    oclusion: { cara: true, cabeza: true },
    medidasMm: { ancho: 140 },
  },
  {
    id: 'gorra-basica',
    nombre: 'Gorra',
    etiqueta: 'Headwear',
    categoria: 'sombrero',
    modelo: '/models/cap.glb',
    /* El GLB viene mirando hacia atrás: se corrige en el asset, no en el motor.
       Anotado en docs/ar-modelos.md para rehacer la exportación. */
    orientacion: [0, 180, 0],
    calibracion: { escala: 1, posicion: [0, 0, -0.4], rotacion: [-8, 0, 0] },
    oclusion: { cara: false, cabeza: true },
    medidasMm: { contorno: 580 },
  },
  {
    id: 'sombrero-ala',
    nombre: 'Sombrero',
    etiqueta: 'Headwear',
    categoria: 'sombrero',
    modelo: '/models/hat.glb',
    orientacion: [0, 180, 0],
    calibracion: { escala: 1.02, posicion: [0, 0, 0], rotacion: [-5, 0, 0] },
    oclusion: { cara: false, cabeza: true },
    medidasMm: { contorno: 580 },
  },
  {
    id: 'pendientes-aro',
    nombre: 'Pendientes',
    etiqueta: 'Jewelry',
    categoria: 'pendientes',
    modelo: '/models/earrings.glb',
    oclusion: { cara: true, cabeza: true },
  },
];

export const productoPorDefecto = catalogoAR[0];
