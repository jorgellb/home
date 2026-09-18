import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parsearMallaCanonica, dimensionesCabeza, LM } from './malla-canonica';
import { anclarGafas, anclarSombrero, anclarPendiente, calibracionDe } from './anclajes';

const obj = readFileSync(join(process.cwd(), 'public/models/canonical_face_model.obj'), 'utf8');
const { puntos } = parsearMallaCanonica(obj);
const dims = dimensionesCabeza(puntos);
const calibracion = calibracionDe('gafas');

/** Caja de un modelo cualquiera en metros: 14 cm de ancho, 4 de alto, 15 de fondo. */
const caja = (ancho = 0.14, alto = 0.04, fondo = 0.15) =>
  new THREE.Box3(new THREE.Vector3(-ancho / 2, -alto / 2, -fondo / 2), new THREE.Vector3(ancho / 2, alto / 2, fondo / 2));

describe('anclaje de gafas', () => {
  const r = anclarGafas({ puntos, dims, caja: caja(), calibracion });

  it('escala la montura al ancho de las sienes, no al de la caja del modelo', () => {
    const anchoFinal = 0.14 * r.escala;
    expect(anchoFinal).toBeGreaterThan(dims.anchoCara * 0.85);
    expect(anchoFinal).toBeLessThan(dims.anchoCara);
  });

  it('apoya el frente de la montura en el puente nasal', () => {
    const frenteZ = r.posicion.z + (0.15 / 2) * r.escala;
    expect(frenteZ).toBeCloseTo(puntos[LM.puenteNasal].z + 0.5, 3);
  });

  it('coloca las lentes a la altura de los ojos', () => {
    const alturaOjos = (puntos[LM.ojoIzqExt].y + puntos[LM.ojoDerExt].y) / 2;
    expect(r.posicion.y).toBeCloseTo(alturaOjos, 3);
  });

  it('pide oclusión de cara para que las patillas pasen por detrás', () => {
    expect(r.oclusion.cara).toBe(true);
  });
});

describe('anclaje de sombrero', () => {
  const c = caja(0.2, 0.12, 0.2);
  const r = anclarSombrero({ puntos, dims, caja: c, calibracion: calibracionDe('sombrero') });

  it('escala por el ancho craneal, mayor que el de la cara', () => {
    const anchoFinal = 0.2 * r.escala;
    expect(anchoFinal).toBeGreaterThan(dims.anchoCabeza);
  });

  it('apoya la copa en la coronilla y deja el resto abrazando la cabeza', () => {
    const coronaY = dims.centroCraneo[1] + dims.altoCabeza / 2;
    const bordeSuperior = r.posicion.y + c.max.y * r.escala;
    const bordeInferior = r.posicion.y + c.min.y * r.escala;
    expect(bordeSuperior - coronaY).toBeLessThan(2);   // no flota por encima
    expect(bordeInferior).toBeLessThan(coronaY - 2);   // baja abrazando el cráneo
  });

  it('se inclina ligeramente hacia atrás y ocluye con la cabeza', () => {
    expect(r.rotacion.x).toBeLessThan(0);
    expect(r.oclusion.cabeza).toBe(true);
  });
});

describe('anclaje de pendientes', () => {
  it('cuelga de cada lóbulo, con simetría entre lados', () => {
    const c = caja(0.02, 0.05, 0.02);
    const izq = anclarPendiente({ puntos, dims, caja: c, calibracion: calibracionDe('pendientes') }, 'izq');
    const der = anclarPendiente({ puntos, dims, caja: c, calibracion: calibracionDe('pendientes') }, 'der');
    expect(izq.posicion.x).toBeLessThan(0);
    expect(der.posicion.x).toBeGreaterThan(0);
    expect(izq.posicion.x).toBeCloseTo(-der.posicion.x, 1);
    expect(izq.posicion.y).toBeLessThan(puntos[LM.orejaIzq].y);
  });
});

describe('calibración', () => {
  it('el ajuste del SKU manda sobre la base de la categoría', () => {
    const c = calibracionDe('sombrero', { escala: 1.1 });
    expect(c.escala).toBe(1.1);
    expect(c.rotacion).toEqual([-6, 0, 0]);
  });
});
