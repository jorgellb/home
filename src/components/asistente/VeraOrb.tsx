import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Presencia 3D de Vera: un núcleo que respira y reacciona al estado.
   - listening: se deforma con tu voz real (AnalyserNode del micro).
   - speaking: pulsa con cada palabra (levelRef, picos en onboundary).
   - thinking / idle: animación procedural.
   Three.js ya es dependencia del proyecto (se usa en el probador AR). */

type Phase = 'idle' | 'listening' | 'thinking' | 'speaking';

const COLORS: Record<Phase, number> = {
  idle: 0xff6b35,
  listening: 0x18e0ff,
  thinking: 0x8b93a7,
  speaking: 0x8ad753,
};

interface Props {
  phase: Phase;
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
  levelRef: React.MutableRefObject<number>;
}

export default function VeraOrb({ phase, analyserRef, levelRef }: Props) {
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
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 3.1;

    const geo = new THREE.IcosahedronGeometry(1, 14);
    const base = Float32Array.from(geo.attributes.position.array);
    const mat = new THREE.MeshStandardMaterial({
      color: COLORS.idle, emissive: COLORS.idle, emissiveIntensity: 0.45,
      metalness: 0.35, roughness: 0.35, flatShading: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.07 }));
    wire.scale.setScalar(1.04);
    scene.add(wire);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.PointLight(0xffffff, 1.3); key.position.set(2, 3, 4); scene.add(key);
    const rim = new THREE.PointLight(0x66ccff, 0.6); rim.position.set(-3, -2, 2); scene.add(rim);

    const target = new THREE.Color(COLORS.idle);
    const clock = new THREE.Clock();
    const audioData = new Uint8Array(128);
    let raf = 0;

    const noise = (x: number, y: number, z: number, t: number) =>
      Math.sin(x * 1.8 + t) * Math.cos(y * 1.8 + t * 1.1) * Math.sin(z * 1.8 + t * 0.7) +
      0.5 * Math.sin(x * 4 + t * 1.7) * Math.sin(y * 4 - t);

    function micLevel(): number {
      const an = analyserRef.current;
      if (!an) return 0;
      an.getByteTimeDomainData(audioData);
      let sum = 0;
      for (let i = 0; i < audioData.length; i++) { const v = (audioData[i] - 128) / 128; sum += v * v; }
      return Math.min(1, Math.sqrt(sum / audioData.length) * 3.2);
    }

    const pos = geo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      const t = clock.getElapsedTime();
      const ph = phaseRef.current;
      target.set(COLORS[ph]);
      mat.color.lerp(target, 0.07);
      mat.emissive.lerp(target, 0.07);

      let energy = 0.05 + 0.03 * Math.sin(t * 1.4); // idle: respira
      if (ph === 'listening') energy = 0.07 + micLevel() * 0.55;
      else if (ph === 'thinking') energy = 0.11 + 0.05 * Math.sin(t * 6.5);
      else if (ph === 'speaking') energy = 0.12 + levelRef.current * 0.5 + 0.04 * Math.sin(t * 11);

      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.35 + energy * 1.4, 0.1);

      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
        const bx = base[ix], by = base[ix + 1], bz = base[ix + 2];
        const d = 1 + energy * noise(bx, by, bz, t * 0.8) * 0.55;
        pos.setXYZ(i, bx * d, by * d, bz * d);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();

      mesh.rotation.y += 0.0035;
      mesh.rotation.x = Math.sin(t * 0.3) * 0.18;
      wire.rotation.copy(mesh.rotation);

      levelRef.current *= 0.9; // decaimiento de los picos de habla

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
      geo.dispose();
      mat.dispose();
      (wire.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [analyserRef, levelRef]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
