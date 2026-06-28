import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import styles from './Configurador3D.module.css';

/* Configurador 3D de producto con materiales físicos (PBR) y AR (WebXR). Gira el
   producto, cambia color y acabado en vivo con reflejos realistas, y colócalo en
   tu espacio con realidad aumentada (Android Chrome). Todo en el navegador. */

type Profile = 'jarron' | 'lampara' | 'silla';
type Finish = 'ceramica' | 'mate' | 'metal' | 'oro' | 'cristal';

const PRODUCTS: { id: Profile; label: string; ico: string }[] = [
  { id: 'jarron', label: 'Jarrón', ico: '🏺' },
  { id: 'lampara', label: 'Lámpara', ico: '💡' },
  { id: 'silla', label: 'Silla', ico: '🪑' },
];
const COLORS = ['#c94b4b', '#2d6cdf', '#1f9d6b', '#e0a020', '#16181d', '#f0ede6', '#7a4ddb', '#d96aa0'];
const FINISHES: { id: Finish; label: string }[] = [
  { id: 'ceramica', label: 'Cerámica' }, { id: 'mate', label: 'Mate' },
  { id: 'metal', label: 'Metal' }, { id: 'oro', label: 'Oro' }, { id: 'cristal', label: 'Cristal' },
];

function buildProduct(profile: Profile, body: THREE.Material, accent: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, pos: [number, number, number]) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(...pos); m.castShadow = true; m.receiveShadow = true; g.add(m); return m;
  };
  if (profile === 'jarron') {
    const pts = [[0, -0.5], [0.25, -0.5], [0.33, -0.2], [0.41, 0.05], [0.3, 0.3], [0.17, 0.45], [0.22, 0.5]]
      .map(([x, y]) => new THREE.Vector2(x, y));
    add(new THREE.LatheGeometry(pts, 64), body, [0, 0, 0]);
  } else if (profile === 'lampara') {
    add(new THREE.CylinderGeometry(0.22, 0.26, 0.05, 48), accent, [0, -0.5, 0]);
    add(new THREE.CylinderGeometry(0.025, 0.025, 0.85, 24), accent, [0, -0.07, 0]);
    const shade = [[0.06, 0], [0.36, 0], [0.3, 0.3], [0.07, 0.32]].map(([x, y]) => new THREE.Vector2(x, y));
    add(new THREE.LatheGeometry(shade, 48), body, [0, 0.42, 0]);
  } else {
    add(new RoundedBoxGeometry(0.52, 0.09, 0.52, 4, 0.04), body, [0, 0, 0]);
    add(new RoundedBoxGeometry(0.52, 0.52, 0.09, 4, 0.04), body, [0, 0.3, -0.21]);
    const leg = new THREE.CylinderGeometry(0.03, 0.025, 0.5, 20);
    for (const [x, z] of [[0.21, 0.21], [-0.21, 0.21], [0.21, -0.21], [-0.21, -0.21]]) add(leg, accent, [x, -0.29, z]);
  }
  return g;
}

export default function Configurador3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const three = useRef<{
    renderer: THREE.WebGLRenderer; scene: THREE.Scene; camera: THREE.PerspectiveCamera;
    controls: OrbitControls; body: THREE.MeshPhysicalMaterial; accent: THREE.MeshStandardMaterial;
    product: THREE.Group; reticle: THREE.Mesh; placed: THREE.Object3D[]; hitSource: XRHitTestSource | null;
    raf: number;
  } | null>(null);

  const [profile, setProfile] = useState<Profile>('jarron');
  const [color, setColor] = useState('#2d6cdf');
  const [finish, setFinish] = useState<Finish>('ceramica');
  const [ready, setReady] = useState(false);
  const [arSupported, setArSupported] = useState(false);
  const [arActive, setArActive] = useState(false);
  const [arHint, setArHint] = useState('Mueve el móvil para detectar el suelo…');

  /* Aplica acabado al material físico. */
  function applyFinish(body: THREE.MeshPhysicalMaterial, f: Finish, hex: string) {
    body.transmission = 0; body.opacity = 1; body.transparent = false; body.clearcoat = 0;
    body.color.set(hex);
    if (f === 'ceramica') { body.metalness = 0; body.roughness = 0.35; body.clearcoat = 0.7; body.clearcoatRoughness = 0.25; }
    else if (f === 'mate') { body.metalness = 0; body.roughness = 0.92; }
    else if (f === 'metal') { body.metalness = 1; body.roughness = 0.25; }
    else if (f === 'oro') { body.metalness = 1; body.roughness = 0.2; body.color.set('#d4af37'); }
    else if (f === 'cristal') { body.metalness = 0; body.roughness = 0.04; body.transmission = 1; body.transparent = true; body.ior = 1.5; body.thickness = 0.6; }
    body.needsUpdate = true;
  }

  // Init Three.js (una vez)
  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    camera.position.set(1.3, 0.8, 1.7);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.autoRotate = true; controls.autoRotateSpeed = 1.2;
    controls.target.set(0, 0, 0); controls.minDistance = 1; controls.maxDistance = 5;
    controls.maxPolarAngle = Math.PI / 1.9;

    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(2.5, 5, 3); dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024); dir.shadow.camera.near = 0.5; dir.shadow.camera.far = 20;
    dir.shadow.bias = -0.0005; scene.add(dir);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.28 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.52; ground.receiveShadow = true; scene.add(ground);

    const body = new THREE.MeshPhysicalMaterial({ color: '#2d6cdf', roughness: 0.35, metalness: 0, clearcoat: 0.7, clearcoatRoughness: 0.25 });
    const accent = new THREE.MeshStandardMaterial({ color: '#2b2f36', roughness: 0.4, metalness: 0.9 });
    applyFinish(body, 'ceramica', '#2d6cdf');

    const product = buildProduct('jarron', body, accent);
    scene.add(product);

    const reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.07, 0.09, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x18e0ff }),
    );
    reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle);

    const st = { renderer, scene, camera, controls, body, accent, product, reticle, placed: [] as THREE.Object3D[], hitSource: null as XRHitTestSource | null, raf: 0 };
    three.current = st;

    const onResize = () => {
      if (!wrapRef.current || renderer.xr.isPresenting) return;
      const w = wrapRef.current.clientWidth, h = wrapRef.current.clientHeight;
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    renderer.setAnimationLoop((_t, frame) => {
      if (renderer.xr.isPresenting && frame) {
        const session = renderer.xr.getSession(); const refSpace = renderer.xr.getReferenceSpace();
        if (session && refSpace) {
          if (!st.hitSource && (session as any).requestHitTestSource) {
            session.requestReferenceSpace('viewer').then((vs) => {
              (session as any).requestHitTestSource({ space: vs }).then((s: XRHitTestSource) => { st.hitSource = s; });
            });
          }
          if (st.hitSource) {
            const hits = frame.getHitTestResults(st.hitSource);
            if (hits.length) {
              const pose = hits[0].getPose(refSpace);
              if (pose) { reticle.visible = true; reticle.matrix.fromArray(pose.transform.matrix); }
            } else reticle.visible = false;
          }
        }
      } else controls.update();
      renderer.render(scene, camera);
    });

    setReady(true);
    try { (window as any).track?.('demo:config'); } catch { /* noop */ }
    if ((navigator as any).xr?.isSessionSupported) {
      (navigator as any).xr.isSessionSupported('immersive-ar').then((ok: boolean) => setArSupported(ok)).catch(() => setArSupported(false));
    }

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.setAnimationLoop(null); controls.dispose(); pmrem.dispose();
      renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      three.current = null;
    };
  }, []);

  // Camb?io de producto
  useEffect(() => {
    const st = three.current; if (!st) return;
    st.scene.remove(st.product);
    st.product.traverse((o) => { if ((o as THREE.Mesh).geometry) (o as THREE.Mesh).geometry.dispose(); });
    st.product = buildProduct(profile, st.body, st.accent);
    st.scene.add(st.product);
  }, [profile, ready]);

  // Cambio de color / acabado
  useEffect(() => {
    const st = three.current; if (!st) return;
    applyFinish(st.body, finish, color);
  }, [color, finish, ready]);

  async function startAR() {
    const st = three.current; if (!st) return;
    const xr = (navigator as any).xr; if (!xr) return;
    const overlay = document.getElementById('ar-overlay') || undefined;
    try {
      const session: XRSession = await xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'], optionalFeatures: ['dom-overlay'], domOverlay: overlay ? { root: overlay } : undefined,
      });
      setArActive(true); setArHint('Mueve el móvil para detectar el suelo…');
      st.controls.autoRotate = false;
      st.product.visible = false; // en AR se coloca con el retículo
      st.renderer.xr.enabled = true;
      await st.renderer.xr.setReferenceSpaceType('local');
      await st.renderer.xr.setSession(session);

      const onSelect = () => {
        if (!st.reticle.visible) return;
        const clone = st.product.clone(true);
        clone.visible = true; clone.scale.setScalar(0.35);
        clone.position.setFromMatrixPosition(st.reticle.matrix);
        st.scene.add(clone); st.placed.push(clone);
        setArHint('¡Colocado! Toca para añadir otro · pellizca para acercarte.');
      };
      session.addEventListener('select', onSelect);
      session.addEventListener('end', () => {
        setArActive(false);
        st.hitSource = null; st.reticle.visible = false;
        st.placed.forEach((p) => st.scene.remove(p)); st.placed = [];
        st.product.visible = true; st.controls.autoRotate = true;
        st.renderer.xr.enabled = false;
        const w = wrapRef.current!.clientWidth, h = wrapRef.current!.clientHeight;
        st.renderer.setSize(w, h); st.camera.aspect = w / h; st.camera.updateProjectionMatrix();
      });
    } catch {
      setArActive(false);
      setArHint('No se pudo iniciar la realidad aumentada.');
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.stageWrap}>
        <div ref={wrapRef} className={styles.stage} />
        {!ready && <div className={styles.loading}><span className={styles.spin} />Cargando motor 3D…</div>}
        <span className={styles.hintRotate}>↺ Arrastra para girar · rueda para acercar</span>
      </div>

      <div className={styles.panel}>
        <div className={styles.group}>
          <span className={styles.gLabel}>Producto</span>
          <div className={styles.products}>
            {PRODUCTS.map((p) => (
              <button key={p.id} className={`${styles.prod} ${profile === p.id ? styles.on : ''}`} onClick={() => setProfile(p.id)}>
                <span aria-hidden="true">{p.ico}</span>{p.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.gLabel}>Color</span>
          <div className={styles.colors}>
            {COLORS.map((c) => (
              <button key={c} className={`${styles.sw} ${color === c ? styles.swOn : ''}`} style={{ background: c }} onClick={() => setColor(c)} aria-label={`Color ${c}`} />
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.gLabel}>Acabado</span>
          <div className={styles.finishes}>
            {FINISHES.map((f) => (
              <button key={f.id} className={`${styles.fin} ${finish === f.id ? styles.on : ''}`} onClick={() => setFinish(f.id)}>{f.label}</button>
            ))}
          </div>
        </div>

        <div className={styles.arRow}>
          {arSupported ? (
            <button className={styles.arBtn} onClick={startAR}>👁️ Ver en tu espacio (AR)</button>
          ) : (
            <span className={styles.arNo}>📱 La AR está disponible en Android (Chrome). El 3D funciona en cualquier dispositivo.</span>
          )}
        </div>
        <p className={styles.note}>Materiales físicos (PBR) con reflejos reales. Esto es una maqueta: en un proyecto real cargamos tus productos en 3D y AR.</p>
      </div>

      {/* Overlay DOM para la sesión AR */}
      <div id="ar-overlay" className={arActive ? styles.arOverlay : styles.arHidden}>
        <div className={styles.arTop}><span>{arHint}</span></div>
        <button className={styles.arExit} onClick={() => three.current?.renderer.xr.getSession()?.end()}>✕ Salir</button>
      </div>
    </div>
  );
}
