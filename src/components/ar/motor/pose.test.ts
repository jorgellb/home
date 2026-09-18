import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { poseDesdeMatriz, recorteCover, distanciaCamara } from './pose';
import { FiltroUnEuro, factorRotacion } from './suavizado';
import { parsearMallaCanonica, dimensionesCabeza, LM } from './malla-canonica';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('pose de cabeza', () => {
  it('descompone la matriz de MediaPipe en posición, giro y escala', () => {
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(-5, 0.5, -20),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0.1, 0.3, 0)),
      new THREE.Vector3(1, 1, 1),
    );
    const pose = poseDesdeMatriz(m.toArray());
    expect(pose.posicion.x).toBeCloseTo(-5, 5);
    expect(pose.posicion.z).toBeCloseTo(-20, 5);
    expect(distanciaCamara(pose)).toBeCloseTo(Math.hypot(5, 0.5, 20), 4);
  });
});

describe('recorte del vídeo', () => {
  it('con la misma proporción no recorta nada', () => {
    const r = recorteCover({ anchoVideo: 640, altoVideo: 480, anchoCaja: 320, altoCaja: 240 });
    expect(r).toEqual({ x: 0, y: 0, ancho: 640, alto: 480 });
  });

  it('en caja vertical recorta por los lados, no por arriba', () => {
    const r = recorteCover({ anchoVideo: 640, altoVideo: 480, anchoCaja: 390, altoCaja: 700 });
    expect(r.alto).toBe(480);
    expect(r.ancho).toBeLessThan(640);
    expect(r.x).toBeGreaterThan(0);
    expect(r.y).toBe(0);
  });
});

describe('filtro One Euro', () => {
  it('quita el temblor cuando la señal está quieta', () => {
    const f = new FiltroUnEuro();
    let t = 0;
    let salida = 0;
    for (let i = 0; i < 60; i++) {
      t += 33;
      salida = f.filtrar(10 + (i % 2 ? 0.4 : -0.4), t);
    }
    expect(Math.abs(salida - 10)).toBeLessThan(0.25);
  });

  it('sigue un movimiento rápido sin quedarse atrás', () => {
    const f = new FiltroUnEuro();
    let t = 0;
    let salida = 0;
    for (let i = 0; i < 30; i++) {
      t += 33;
      salida = f.filtrar(i, t);
    }
    expect(salida).toBeGreaterThan(24);
  });
});

describe('factor de rotación', () => {
  it('sube con el ángulo y no se pasa del máximo', () => {
    expect(factorRotacion(0)).toBeLessThan(factorRotacion(0.2));
    expect(factorRotacion(10)).toBeLessThanOrEqual(0.9);
  });
});

describe('malla canónica', () => {
  const obj = readFileSync(join(process.cwd(), 'public/models/canonical_face_model.obj'), 'utf8');
  const { puntos, geometria } = parsearMallaCanonica(obj);

  it('mantiene la correspondencia vértice = landmark', () => {
    expect(puntos).toHaveLength(468);
    /* Las sienes son simétricas y la punta de la nariz es lo más adelantado. */
    expect(puntos[LM.sienIzq].x).toBeCloseTo(-puntos[LM.sienDer].x, 2);
    expect(puntos[1].z).toBeGreaterThan(puntos[LM.frente].z);
    expect(geometria.getIndex()!.count).toBeGreaterThan(2000);
  });

  it('deduce una cabeza de proporciones humanas', () => {
    const d = dimensionesCabeza(puntos);
    expect(d.anchoCara).toBeGreaterThan(14);
    expect(d.anchoCara).toBeLessThan(17);
    expect(d.altoCabeza).toBeGreaterThan(d.anchoCabeza);
    expect(d.centroCraneo[1]).toBeLessThan(puntos[LM.frente].y);
  });
});
