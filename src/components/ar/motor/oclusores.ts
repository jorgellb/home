/* Oclusores: geometría invisible que escribe profundidad.

   Es la pieza que separa «puesto» de «superpuesto». Sin ella, la patilla de
   unas gafas cruza por encima de la mejilla y la parte de atrás de una gorra se
   dibuja sobre la frente. El motor anterior usaba una esfera aproximada y,
   además, empujaba el accesorio por delante, así que nada podía quedar detrás
   de la cabeza. */
import * as THREE from 'three';
import type { DimensionesCabeza } from './tipos';

export interface Oclusores {
  grupo: THREE.Group;
  cara: THREE.Mesh;
  cabeza: THREE.Mesh;
  /** Muestra la geometría en modo depuración. */
  verGeometria(visible: boolean): void;
  aplicar(opciones: { cara: boolean; cabeza: boolean }): void;
  liberar(): void;
}

function materialOclusor(): THREE.MeshBasicMaterial {
  /* colorWrite:false + depthWrite:true = invisible pero presente en el buffer
     de profundidad, que es justo lo que necesitamos. */
  return new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true });
}

function materialDepuracion(color: number): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.6 });
}

export function crearOclusores(geometriaCara: THREE.BufferGeometry, dims: DimensionesCabeza): Oclusores {
  const grupo = new THREE.Group();
  grupo.name = 'oclusores';

  const matCara = materialOclusor();
  const cara = new THREE.Mesh(geometriaCara, matCara);
  cara.name = 'oclusor-cara';
  cara.renderOrder = -2;
  grupo.add(cara);

  const matCabeza = materialOclusor();
  const cabeza = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), matCabeza);
  cabeza.name = 'oclusor-cabeza';
  cabeza.renderOrder = -2;
  /* Un pelín más pequeño que la cabeza anatómica: el pelo ocupa sitio y, si el
     oclusor llega hasta la superficie visible, se come la copa de las gorras. */
  const MARGEN_PELO = 0.95;
  cabeza.scale.set(
    (dims.anchoCabeza / 2) * MARGEN_PELO,
    (dims.altoCabeza / 2) * MARGEN_PELO,
    (dims.fondoCabeza / 2) * MARGEN_PELO,
  );
  cabeza.position.fromArray(dims.centroCraneo);
  grupo.add(cabeza);

  const depCara = materialDepuracion(0x18e0ff);
  const depCabeza = materialDepuracion(0xff5a00);

  return {
    grupo,
    cara,
    cabeza,
    verGeometria(visible) {
      cara.material = visible ? depCara : matCara;
      cabeza.material = visible ? depCabeza : matCabeza;
    },
    aplicar({ cara: conCara, cabeza: conCabeza }) {
      cara.visible = conCara;
      cabeza.visible = conCabeza;
    },
    liberar() {
      cabeza.geometry.dispose();
      [matCara, matCabeza, depCara, depCabeza].forEach((m) => m.dispose());
    },
  };
}
