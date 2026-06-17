import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/* Presencia de Vera: un núcleo de energía futurista.
   - metal líquido con reflejos que se deforma (ruido),
   - jaula geométrica girando alrededor,
   - halo de partículas,
   - flota y late según el estado (color + intensidad).
   Animación procedural (no usa el micro → estable en móvil). */

type Phase = 'idle' | 'listening' | 'thinking' | 'speaking';

const COLORS: Record<Phase, number> = {
  idle: 0x18e0ff,       // cian
  listening: 0x4fe3ff,  // cian brillante
  thinking: 0x9b7bff,   // violeta
  speaking: 0x8ad753,   // verde
};

interface Props {
  phase: Phase;
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
  levelRef: React.MutableRefObject<number>;
}

export default function VeraOrb({ phase, levelRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>(phase);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const size = () => ({ w: mount.clientWidth || 240, h: mount.clientHeight || 240 });
    let { w, h } = size();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 3.5;

    const group = new THREE.Group();
    scene.add(group);

    // Núcleo — metal líquido reflectante que emite luz
    const geo = new THREE.IcosahedronGeometry(1, 12);
    const base = Float32Array.from(geo.attributes.position.array);
    const mat = new THREE.MeshStandardMaterial({
      color: COLORS.idle, emissive: COLORS.idle, emissiveIntensity: 0.5,
      metalness: 0.6, roughness: 0.16, envMapIntensity: 1.2,
    });
    const core = new THREE.Mesh(geo, mat);
    group.add(core);

    // Jaula geométrica (wireframe) girando alrededor
    const cageGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const cageMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    group.add(cage);

    // Halo de partículas
    const N = 340;
    const pPos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 1.7 + Math.random() * 0.6;
      const th = Math.random() * Math.PI * 2;
      const ph2 = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(ph2) * Math.cos(th);
      pPos[i * 3 + 1] = r * Math.sin(ph2) * Math.sin(th);
      pPos[i * 3 + 2] = r * Math.cos(ph2);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: COLORS.idle, size: 0.035, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
    const particles = new THREE.Points(pGeo, pMat);
    group.add(particles);

    const target = new THREE.Color(COLORS.idle);
    const clock = new THREE.Clock();
    let tAcc = 0;
    let raf = 0;

    const noise = (x: number, y: number, z: number, t: number) =>
      Math.sin(x * 1.7 + t) * Math.cos(y * 1.7 + t * 1.1) * Math.sin(z * 1.7 + t * 0.7) +
      0.5 * Math.sin(x * 3.4 + t * 1.6) * Math.sin(y * 3.4 - t);

    const pos = geo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      const dt = Math.min(0.05, clock.getDelta());
      tAcc += dt;
      const t = tAcc;
      const ph = phaseRef.current;

      target.set(COLORS[ph]);
      mat.color.lerp(target, 0.06);
      mat.emissive.lerp(target, 0.06);
      pMat.color.lerp(target, 0.06);

      let energy = 0.05 + 0.025 * Math.sin(t * 1.3);
      if (ph === 'listening') energy = 0.10 + 0.06 * Math.sin(t * 4.5);
      else if (ph === 'thinking') energy = 0.13 + 0.05 * Math.sin(t * 7);
      else if (ph === 'speaking') energy = 0.13 + levelRef.current * 0.45 + 0.04 * Math.sin(t * 10);

      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.4 + energy * 1.6, 0.1);

      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
        const bx = base[ix], by = base[ix + 1], bz = base[ix + 2];
        const d = 1 + energy * noise(bx, by, bz, t * 0.8) * 0.5;
        pos.setXYZ(i, bx * d, by * d, bz * d);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();

      group.rotation.y += 0.004;
      core.rotation.y -= 0.0018;
      cage.rotation.x -= 0.0026;
      cage.rotation.y += 0.0034;
      particles.rotation.y -= 0.0014;
      particles.rotation.x += 0.001;
      group.position.y = Math.sin(t * 0.9) * 0.06;        // flotar
      core.scale.setScalar(1 + energy * 0.18);
      pMat.opacity = Math.min(1, 0.45 + energy * 1.3);

      levelRef.current *= 0.9;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const s = size(); w = s.w; h = s.h;
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      pmrem.dispose();
      geo.dispose(); mat.dispose();
      cageGeo.dispose(); cageMat.dispose();
      pGeo.dispose(); pMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [levelRef]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
