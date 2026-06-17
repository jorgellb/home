import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/* Avatar 3D humano de Vera (cara real con blendshapes ARKit).
   - parpadea de forma natural,
   - abre la boca al hablar (jawOpen ← picos por palabra),
   - mira/gesticula según el estado.
   Modelo facecap.glb (CC0, three.js) autoalojado en /public. */

type Phase = 'idle' | 'listening' | 'thinking' | 'speaking';

interface Props {
  phase: Phase;
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
  levelRef: React.MutableRefObject<number>;
}

export default function VeraAvatar({ phase, analyserRef, levelRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>(phase);
  const [loading, setLoading] = useState(true);
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
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.45).texture;

    const fov = 22;
    const camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 100);

    const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(1, 1.5, 2); scene.add(key);
    const fill = new THREE.DirectionalLight(0xbcd4ff, 0.5); fill.position.set(-2, 0, 1); scene.add(fill);

    const audioData = new Uint8Array(128);
    function micLevel(): number {
      const an = analyserRef.current;
      if (!an) return 0;
      an.getByteTimeDomainData(audioData);
      let sum = 0;
      for (let i = 0; i < audioData.length; i++) { const v = (audioData[i] - 128) / 128; sum += v * v; }
      return Math.min(1, Math.sqrt(sum / audioData.length) * 3.2);
    }

    let head: THREE.Mesh | null = null;
    let dict: Record<string, number> = {};
    let infl: number[] = [];
    let root: THREE.Object3D | null = null;
    let eyeY = 0;
    const cur: Record<string, number> = {};
    const setM = (name: string, val: number) => { const i = dict[name]; if (i !== undefined) infl[i] = val; };
    const lerpM = (name: string, target: number, k: number) => {
      cur[name] = (cur[name] ?? 0) + ((target) - (cur[name] ?? 0)) * k;
      setM(name, cur[name]);
    };

    const ktx2 = new KTX2Loader().setTranscoderPath('/basis/').detectSupport(renderer);
    const loader = new GLTFLoader().setKTX2Loader(ktx2).setMeshoptDecoder(MeshoptDecoder);
    loader.load('/models/facecap.glb', (gltf) => {
      root = gltf.scene;
      root.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.morphTargetDictionary && m.morphTargetDictionary['jawOpen'] !== undefined) {
          head = m; dict = m.morphTargetDictionary; infl = m.morphTargetInfluences as number[];
        }
      });
      const box = new THREE.Box3().setFromObject(root);
      const c = box.getCenter(new THREE.Vector3());
      const s = box.getSize(new THREE.Vector3());
      root.position.sub(c);            // centrar la cara en el origen
      eyeY = s.y * 0.08;               // ojos un poco por encima del centro
      const dist = (s.y * 0.5) / Math.tan((fov * Math.PI / 180) / 2) * 1.12;
      camera.position.set(0, eyeY, dist);
      camera.lookAt(0, eyeY, 0);
      scene.add(root);
      setLoading(false);
    }, undefined, (err) => { console.error('[avatar] error cargando facecap:', err); setLoading(false); });

    const clock = new THREE.Clock();
    let tAcc = 0;
    let nextBlink = 2 + Math.random() * 3;
    let blink = 0; // 0..1
    let gazeX = 0, gazeY = 0, nextGaze = 1.5;
    let raf = 0;

    const animate = () => {
      const dt = Math.min(0.05, clock.getDelta());
      tAcc += dt;
      const t = tAcc;
      const ph = phaseRef.current;

      if (head) {
        // Parpadeo natural
        if (t > nextBlink && blink === 0) blink = 0.0001;
        if (blink > 0) {
          blink += dt * 9;
          const v = blink < 0.5 ? blink * 2 : (1 - blink) * 2; // sube y baja
          lerpM('eyeBlink_L', Math.max(0, v), 0.6);
          lerpM('eyeBlink_R', Math.max(0, v), 0.6);
          if (blink >= 1) { blink = 0; nextBlink = t + 2 + Math.random() * 3.5; }
        } else {
          lerpM('eyeBlink_L', 0, 0.4);
          lerpM('eyeBlink_R', 0, 0.4);
        }

        // Boca
        let jaw = 0;
        if (ph === 'speaking') jaw = 0.10 + levelRef.current * 0.55 + 0.08 * Math.abs(Math.sin(t * 12));
        else if (ph === 'listening') jaw = micLevel() * 0.25;
        lerpM('jawOpen', Math.min(0.75, jaw), 0.35);

        // Gestos por estado
        lerpM('mouthSmile_L', ph === 'speaking' ? 0.12 : 0.2, 0.05);
        lerpM('mouthSmile_R', ph === 'speaking' ? 0.12 : 0.2, 0.05);
        lerpM('browInnerUp', ph === 'listening' ? 0.35 : ph === 'thinking' ? 0.2 : 0.05, 0.06);

        // Mirada viva (ojos)
        if (t > nextGaze) { gazeX = (Math.random() - 0.5) * 0.5; gazeY = (Math.random() - 0.5) * 0.4; nextGaze = t + 1.2 + Math.random() * 2.5; }
        lerpM('eyeLookIn_L', Math.max(0, gazeX), 0.05);
        lerpM('eyeLookOut_L', Math.max(0, -gazeX), 0.05);
        lerpM('eyeLookIn_R', Math.max(0, -gazeX), 0.05);
        lerpM('eyeLookOut_R', Math.max(0, gazeX), 0.05);
        lerpM('eyeLookUp_L', Math.max(0, gazeY), 0.05);
        lerpM('eyeLookUp_R', Math.max(0, gazeY), 0.05);
        lerpM('eyeLookDown_L', Math.max(0, -gazeY), 0.05);
        lerpM('eyeLookDown_R', Math.max(0, -gazeY), 0.05);
      }

      // Movimiento sutil de cabeza
      if (root) {
        root.rotation.y = Math.sin(t * 0.4) * 0.1 + gazeX * 0.15;
        root.rotation.x = Math.sin(t * 0.33) * 0.04 - gazeY * 0.1;
      }

      levelRef.current *= 0.88;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const sz = size(); w = sz.w; h = sz.h;
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      ktx2.dispose();
      pmrem.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (mat) (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose());
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [analyserRef, levelRef]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {loading && (
        <span style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'monospace', fontSize: '.8rem', color: '#9aa7ba',
        }}>cargando rostro…</span>
      )}
    </div>
  );
}
