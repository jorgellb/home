import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  FaceLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import styles from './VirtualTryOn.module.css';

/* ════════════════════════════════════════════════════════════════
   Probador virtual AR — demo para ecommerce (Platanito Rico)
   Cámara (getUserMedia) + MediaPipe FaceLandmarker + Three.js.
   Sin WebXR. Pensado para móvil. Assets autoalojados en /public.
   ════════════════════════════════════════════════════════════════ */

type ProductId = 'glasses' | 'earrings' | 'necklace';
type Status = 'idle' | 'starting' | 'running' | 'error' | 'unsupported';

interface Product {
  id: ProductId;
  label: string;
  tag: string;
  model: string; // GLB que se usará en una tienda real
}

const PRODUCTS: Product[] = [
  { id: 'glasses', label: 'Gafas', tag: 'Eyewear', model: '/models/glasses.glb' },
  { id: 'earrings', label: 'Pendientes', tag: 'Jewelry', model: '/models/earrings.glb' },
  { id: 'necklace', label: 'Colgante', tag: 'Necklace', model: '/models/necklace.glb' },
];

/* Índices del mesh facial de 468 puntos de MediaPipe */
const LM = {
  eyeL: 33, // esquina externa del ojo (lado imagen-izquierda)
  eyeR: 263, // esquina externa del ojo (lado imagen-derecha)
  earL: 234, // lateral del rostro izq. (zona oreja)
  earR: 454, // lateral del rostro der. (zona oreja)
  chin: 152, // mentón
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Navegadores embebidos en apps (Instagram, Facebook…) que bloquean la cámara. */
function isInAppBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /FBAN|FBAV|FB_IAB|Instagram|Line\/|Twitter|TikTok|musical_ly|LinkedInApp|Snapchat|Pinterest|GSA\//i.test(ua);
}

interface Engine {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  accessory: THREE.Group; // raíz que se posiciona cada frame
  kind: ProductId;
  faceLandmarker: FaceLandmarker | null;
  stream: MediaStream | null;
  raf: number;
  ro: ResizeObserver | null;
  cw: number;
  ch: number;
  lastVideoTime: number;
  smooth: Smooth;
}

interface Smooth {
  init: boolean;
  cx: number; cy: number; w: number; roll: number; // glasses/necklace
  elx: number; ely: number; erx: number; ery: number; // earrings
  chx: number; chy: number; // chin
}

/* ───────────────────── Fallbacks geométricos ───────────────────── */
function frameMat() {
  return new THREE.MeshStandardMaterial({ color: 0x14151a, metalness: 0.6, roughness: 0.35 });
}
function lensMat() {
  return new THREE.MeshStandardMaterial({
    color: 0x18e0ff, metalness: 0.1, roughness: 0.1,
    transparent: true, opacity: 0.32, emissive: 0x0a5566, emissiveIntensity: 0.4,
  });
}
function goldMat() {
  return new THREE.MeshStandardMaterial({ color: 0xe6c15a, metalness: 0.9, roughness: 0.25, emissive: 0x3a2e07, emissiveIntensity: 0.3 });
}

/** Gafas: dos aros + lentes tintadas + puente + patillas. Ancho ≈ 1 unidad. */
function buildGlasses(): THREE.Object3D {
  const g = new THREE.Group();
  const ring = new THREE.TorusGeometry(0.24, 0.035, 12, 32);
  const lens = new THREE.CircleGeometry(0.24, 32);
  for (const sx of [-0.3, 0.3]) {
    const r = new THREE.Mesh(ring, frameMat());
    r.position.set(sx, 0, 0);
    g.add(r);
    const l = new THREE.Mesh(lens, lensMat());
    l.position.set(sx, 0, -0.01);
    g.add(l);
  }
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.04), frameMat());
  g.add(bridge);
  for (const sx of [-0.54, 0.54]) {
    const temple = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.035, 0.035), frameMat());
    temple.position.set(sx, 0.04, -0.06);
    g.add(temple);
  }
  return g;
}

/** Un pendiente: tija + esfera/lágrima colgante. */
function buildEarring(): THREE.Group {
  const g = new THREE.Group();
  const stud = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 20), goldMat());
  g.add(stud);
  const drop = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), goldMat());
  drop.position.set(0, -0.22, 0);
  g.add(drop);
  const link = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.16, 8), goldMat());
  link.position.set(0, -0.11, 0);
  g.add(link);
  return g;
}

/** Colgante: cadena en U + medallón. Ancho ≈ 1 unidad. */
function buildNecklace(): THREE.Object3D {
  const g = new THREE.Group();
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.5, 0.18, 0),
    new THREE.Vector3(-0.32, -0.12, 0.04),
    new THREE.Vector3(0, -0.34, 0.06),
    new THREE.Vector3(0.32, -0.12, 0.04),
    new THREE.Vector3(0.5, 0.18, 0),
  ]);
  const chain = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.022, 8, false), goldMat());
  g.add(chain);
  const medallion = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), goldMat());
  medallion.position.set(0, -0.42, 0.06);
  g.add(medallion);
  return g;
}

/** Normaliza un modelo GLB cargado: centrado en origen y ancho ≈ 1 unidad. */
function normalizeModel(obj: THREE.Object3D): THREE.Object3D {
  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxXY = Math.max(size.x, size.y) || 1;
  const wrap = new THREE.Group();
  obj.position.sub(center);
  wrap.add(obj);
  wrap.scale.setScalar(1 / maxXY);
  return wrap;
}

const gltfLoader = new GLTFLoader();
function loadModel(url: string): Promise<THREE.Object3D> {
  return new Promise((resolve, reject) => {
    gltfLoader.load(url, (gltf) => resolve(normalizeModel(gltf.scene)), undefined, reject);
  });
}

function disposeObject(obj: THREE.Object3D) {
  obj.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) m.geometry.dispose();
    if (m.material) {
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((mat) => mat.dispose());
    }
  });
}

/* ─────── construir el accesorio activo (modelo real o fallback) ─────── */
async function buildAccessory(engine: Engine, product: ProductId): Promise<string> {
  // limpiar lo anterior
  while (engine.accessory.children.length) {
    const c = engine.accessory.children[0];
    engine.accessory.remove(c);
    disposeObject(c);
  }
  engine.accessory.position.set(0, 0, 0);
  engine.accessory.rotation.set(0, 0, 0);
  engine.accessory.scale.set(1, 1, 1);
  engine.kind = product;

  const def = PRODUCTS.find((p) => p.id === product)!;
  let info = 'modelo 3D real';
  let content: THREE.Object3D[] = [];

  // intentar cargar el GLB; si no existe → fallback
  let loaded: THREE.Object3D | null = null;
  try {
    loaded = await loadModel(def.model);
  } catch {
    loaded = null;
    info = 'demo (geometría provisional)';
  }

  if (product === 'earrings') {
    const left = loaded ? loaded.clone() : buildEarring();
    const right = loaded ? loaded.clone() : buildEarring();
    left.name = 'earL';
    right.name = 'earR';
    content = [left, right];
  } else {
    const m = loaded ?? (product === 'glasses' ? buildGlasses() : buildNecklace());
    content = [m];
  }
  content.forEach((c) => engine.accessory.add(c));
  return info;
}

/* ───────────────────── mapeo de coordenadas ───────────────────── */
/** Landmark normalizado (frame del vídeo) → píxel de la tarjeta (object-fit: cover), con espejo. */
function toCard(p: NormalizedLandmark, vw: number, vh: number, cw: number, ch: number) {
  const scale = Math.max(cw / vw, ch / vh);
  const dw = vw * scale, dh = vh * scale;
  const ox = (cw - dw) / 2, oy = (ch - dh) / 2;
  const x = cw - (ox + p.x * dw); // espejo horizontal (selfie)
  const y = oy + p.y * dh;
  return { x, y };
}

export default function VirtualTryOn() {
  const [status, setStatus] = useState<Status>('idle');
  const [product, setProduct] = useState<ProductId>('glasses');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorHint, setErrorHint] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');
  const [modelInfo, setModelInfo] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const productRef = useRef<ProductId>(product);
  const adjustRef = useRef({ scale: 1, dx: 0, dy: 0 });
  const engineRef = useRef<Engine | null>(null);

  /* —— teardown completo —— */
  const teardown = useCallback(() => {
    const e = engineRef.current;
    if (!e) return;
    cancelAnimationFrame(e.raf);
    e.ro?.disconnect();
    e.stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    try { e.faceLandmarker?.close(); } catch { /* noop */ }
    disposeObject(e.scene);
    e.renderer.dispose();
    engineRef.current = null;
  }, []);

  /* —— cambio de producto en caliente —— */
  useEffect(() => {
    productRef.current = product;
    const e = engineRef.current;
    if (e && status === 'running') {
      e.smooth.init = false;
      buildAccessory(e, product).then(setModelInfo);
    }
  }, [product, status]);

  /* —— limpiar al desmontar —— */
  useEffect(() => () => teardown(), [teardown]);

  /* —— bucle de render + tracking —— */
  const renderLoop = useCallback(() => {
    const e = engineRef.current;
    if (!e) return;
    const v = videoRef.current;

    if (v && v.readyState >= 2 && v.videoWidth > 0 && e.faceLandmarker) {
      if (v.currentTime !== e.lastVideoTime) {
        e.lastVideoTime = v.currentTime;
        let res;
        try { res = e.faceLandmarker.detectForVideo(v, performance.now()); } catch { res = undefined; }
        const lm = res?.faceLandmarks?.[0];
        if (lm) {
          updateAccessory(e, lm, v.videoWidth, v.videoHeight, adjustRef.current);
          e.accessory.visible = true;
        } else {
          e.accessory.visible = false;
        }
      }
    }
    e.renderer.render(e.scene, e.camera);
    e.raf = requestAnimationFrame(renderLoop);
  }, []);

  /* —— posicionar el accesorio desde los landmarks (con suavizado) —— */
  function updateAccessory(
    e: Engine,
    lm: NormalizedLandmark[],
    vw: number,
    vh: number,
    adj: { scale: number; dx: number; dy: number },
  ) {
    const eyeL = toCard(lm[LM.eyeL], vw, vh, e.cw, e.ch);
    const eyeR = toCard(lm[LM.eyeR], vw, vh, e.cw, e.ch);
    const earL = toCard(lm[LM.earL], vw, vh, e.cw, e.ch);
    const earR = toCard(lm[LM.earR], vw, vh, e.cw, e.ch);
    const chin = toCard(lm[LM.chin], vw, vh, e.cw, e.ch);

    const cx = (eyeL.x + eyeR.x) / 2;
    const cy = (eyeL.y + eyeR.y) / 2;
    const w = Math.hypot(eyeR.x - eyeL.x, eyeR.y - eyeL.y);
    const roll = Math.atan2(eyeR.y - eyeL.y, eyeR.x - eyeL.x);
    const faceW = Math.hypot(earR.x - earL.x, earR.y - earL.y);

    const s = e.smooth;
    const t = s.init ? 0.4 : 1; // primer frame sin lerp
    s.cx = lerp(s.cx, cx, t); s.cy = lerp(s.cy, cy, t);
    s.w = lerp(s.w, w, t); s.roll = lerp(s.roll, roll, t);
    s.elx = lerp(s.elx, earL.x, t); s.ely = lerp(s.ely, earL.y, t);
    s.erx = lerp(s.erx, earR.x, t); s.ery = lerp(s.ery, earR.y, t);
    s.chx = lerp(s.chx, chin.x, t); s.chy = lerp(s.chy, chin.y, t);
    s.init = true;

    const g = e.accessory;
    if (e.kind === 'glasses') {
      g.position.set(s.cx + adj.dx, s.cy + adj.dy, 0);
      g.rotation.z = s.roll;
      g.scale.setScalar(s.w * 1.1 * adj.scale);
    } else if (e.kind === 'necklace') {
      g.position.set(s.cx + adj.dx, s.chy + faceW * 0.55 + adj.dy, 0);
      g.rotation.z = s.roll * 0.6;
      g.scale.setScalar(faceW * 1.15 * adj.scale);
    } else {
      // pendientes: cada uno en su oreja, colgando hacia abajo
      const size = faceW * 0.5 * adj.scale;
      const drop = faceW * 0.14;
      const l = g.getObjectByName('earL');
      const r = g.getObjectByName('earR');
      if (l) { l.position.set(s.elx + adj.dx, s.ely + drop + adj.dy, 0); l.scale.setScalar(size); l.rotation.z = s.roll; }
      if (r) { r.position.set(s.erx + adj.dx, s.ery + drop + adj.dy, 0); r.scale.setScalar(size); r.rotation.z = s.roll; }
    }
  }

  /* —— ajustar tamaño del renderer al contenedor —— */
  function resize(e: Engine) {
    const el = containerRef.current;
    if (!el) return;
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    e.cw = cw; e.ch = ch;
    e.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    e.renderer.setSize(cw, ch, false);
    // cámara ortográfica en espacio-píxel (origen arriba-izquierda)
    e.camera.left = 0; e.camera.right = cw; e.camera.top = 0; e.camera.bottom = ch;
    e.camera.updateProjectionMatrix();
  }

  /* —— iniciar cámara + IA + escena —— */
  const start = useCallback(async () => {
    setErrorMsg('');
    setErrorHint('');
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setStatus('unsupported');
      return;
    }
    setStatus('starting');
    try {
      setLoadingMsg('Solicitando acceso a la cámara…');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();

      setLoadingMsg('Cargando modelo de IA facial…');
      const fileset = await FilesetResolver.forVisionTasks('/mediapipe/wasm');
      let faceLandmarker: FaceLandmarker;
      try {
        faceLandmarker = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: '/models/face_landmarker.task', delegate: 'GPU' },
          runningMode: 'VIDEO',
          numFaces: 1,
        });
      } catch {
        faceLandmarker = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: '/models/face_landmarker.task', delegate: 'CPU' },
          runningMode: 'VIDEO',
          numFaces: 1,
        });
      }

      setLoadingMsg('Preparando escena 3D…');
      const canvas = canvasRef.current!;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      const scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xffffff, 0.85));
      const dir = new THREE.DirectionalLight(0xffffff, 1.1);
      dir.position.set(0.4, -0.6, 1);
      scene.add(dir);
      const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -2000, 2000);
      camera.position.z = 800;
      const accessory = new THREE.Group();
      accessory.visible = false;
      scene.add(accessory);

      const engine: Engine = {
        renderer, scene, camera, accessory, kind: productRef.current,
        faceLandmarker, stream, raf: 0, ro: null, cw: 1, ch: 1, lastVideoTime: -1,
        smooth: { init: false, cx: 0, cy: 0, w: 0, roll: 0, elx: 0, ely: 0, erx: 0, ery: 0, chx: 0, chy: 0 },
      };
      engineRef.current = engine;
      resize(engine);

      const ro = new ResizeObserver(() => engineRef.current && resize(engineRef.current));
      ro.observe(containerRef.current!);
      engine.ro = ro;

      const info = await buildAccessory(engine, productRef.current);
      setModelInfo(info);

      setStatus('running');
      engine.raf = requestAnimationFrame(renderLoop);
    } catch (err) {
      teardown();
      const name = (err as DOMException)?.name || '';
      let msg = 'No se pudo iniciar el probador. Inténtalo de nuevo.';
      let hint = '';
      if (name === 'NotAllowedError' || name === 'SecurityError') {
        if (isInAppBrowser()) {
          msg = 'Este navegador no permite la cámara.';
          hint = 'Estás viendo la página dentro de una app (Instagram, Facebook, TikTok…). Ábrela en Safari o Chrome y vuelve a intentarlo.';
        } else {
          msg = 'No hemos podido acceder a la cámara.';
          hint = 'Toca el candado 🔒 junto a la dirección → Cámara → Permitir (o «Restablecer permisos»), recarga la página y acepta el aviso del navegador.';
        }
      } else if (name === 'NotFoundError' || name === 'OverconstrainedError') {
        msg = 'No se ha encontrado ninguna cámara compatible en este dispositivo.';
      } else if (name === 'NotReadableError') {
        msg = 'La cámara está siendo usada por otra aplicación. Ciérrala e inténtalo de nuevo.';
      }
      setErrorMsg(msg);
      setErrorHint(hint);
      setStatus('error');
    }
  }, [renderLoop, teardown]);

  const stop = useCallback(() => {
    teardown();
    setStatus('idle');
    adjustRef.current = { scale: 1, dx: 0, dy: 0 };
  }, [teardown]);

  /* —— controles manuales —— */
  const adjust = (kind: 'in' | 'out' | 'up' | 'down' | 'center') => {
    const a = adjustRef.current;
    if (kind === 'in') a.scale = Math.min(a.scale + 0.08, 3);
    else if (kind === 'out') a.scale = Math.max(a.scale - 0.08, 0.3);
    else if (kind === 'up') a.dy -= 8;
    else if (kind === 'down') a.dy += 8;
    else { a.scale = 1; a.dx = 0; a.dy = 0; }
  };

  const running = status === 'running';

  return (
    <section className={styles.wrap} aria-label="Probador virtual AR">
      {/* selector de producto */}
      <div className={styles.products} role="tablist" aria-label="Elige un accesorio">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={product === p.id}
            className={`${styles.product} ${product === p.id ? styles.productOn : ''}`}
            onClick={() => setProduct(p.id)}
          >
            <span className={styles.productIco} aria-hidden="true">{productIcon(p.id)}</span>
            <span>{p.label}</span>
            <span className={styles.productTag}>{p.tag}</span>
          </button>
        ))}
      </div>

      {/* mockup tipo smartphone */}
      <div className={styles.phone}>
        <div className={styles.notch} aria-hidden="true" />
        <div className={styles.screen} ref={containerRef}>
          <video ref={videoRef} className={styles.video} playsInline muted />
          <canvas ref={canvasRef} className={styles.canvas} />

          {/* overlays por estado */}
          {status === 'idle' && (
            <div className={styles.overlay}>
              <div className={styles.scan} aria-hidden="true">{faceSvg()}</div>
              <p className={styles.overlayLead}>Probador virtual AR</p>
              <p className={styles.overlaySub}>
                Pruébate <strong>gafas, pendientes o un colgante</strong> desde la cámara de tu móvil — sin instalar nada.
              </p>
              <button className={styles.cta} onClick={start}>Activar probador virtual</button>
              <span className={styles.priv}>🔒 El vídeo se procesa en tu dispositivo. No se sube nada.</span>
            </div>
          )}

          {status === 'starting' && (
            <div className={styles.overlay}>
              <div className={styles.spinner} aria-hidden="true" />
              <p className={styles.overlaySub}>{loadingMsg}</p>
            </div>
          )}

          {status === 'error' && (
            <div className={styles.overlay}>
              <div className={styles.errIco} aria-hidden="true">!</div>
              <p className={styles.overlaySub}>{errorMsg}</p>
              {errorHint && <p className={styles.priv}>{errorHint}</p>}
              <button className={styles.cta} onClick={start}>Reintentar</button>
            </div>
          )}

          {status === 'unsupported' && (
            <div className={styles.overlay}>
              <div className={styles.errIco} aria-hidden="true">!</div>
              <p className={styles.overlaySub}>
                Tu navegador no permite acceder a la cámara. Prueba con Chrome o Safari actualizados en un móvil.
              </p>
            </div>
          )}

          {running && (
            <>
              <span className={styles.liveTag}><i className={styles.liveDot} /> EN VIVO · {PRODUCTS.find((p) => p.id === product)?.label}</span>
              <span className={styles.modelTag}>{modelInfo}</span>
            </>
          )}
        </div>
      </div>

      {/* controles */}
      {running && (
        <div className={styles.controls}>
          <div className={styles.ctrlRow}>
            <button className={styles.ctrl} onClick={() => adjust('out')} aria-label="Reducir escala">A−</button>
            <button className={styles.ctrl} onClick={() => adjust('in')} aria-label="Aumentar escala">A+</button>
            <button className={styles.ctrl} onClick={() => adjust('up')} aria-label="Subir">↑</button>
            <button className={styles.ctrl} onClick={() => adjust('down')} aria-label="Bajar">↓</button>
            <button className={styles.ctrl} onClick={() => adjust('center')} aria-label="Centrar">Centrar</button>
          </div>
          <button className={styles.close} onClick={stop}>Cerrar probador</button>
        </div>
      )}

      {!running && status !== 'starting' && (
        <p className={styles.hint}>
          Mejor con buena luz y el rostro centrado. Compatible con móvil, tablet y escritorio.
        </p>
      )}
    </section>
  );
}

/* ───────────────────── iconitos ───────────────────── */
function productIcon(id: ProductId) {
  if (id === 'glasses') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="6.5" cy="13" r="3.5" /><circle cx="17.5" cy="13" r="3.5" /><path d="M10 12.5h4M3 10l1.5-1M21 10l-1.5-1" /></svg>
  );
  if (id === 'earrings') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 4a3 3 0 016 0" /><circle cx="8" cy="16" r="2.5" /><circle cx="16" cy="16" r="2.5" /><path d="M8 7v6M16 7v6" /></svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4c0 6 3.5 9 8 9s8-3 8-9" /><circle cx="12" cy="16.5" r="2.5" /></svg>
  );
}

function faceSvg() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 20V12a4 4 0 014-4h8M44 8h8a4 4 0 014 4v8M56 44v8a4 4 0 01-4 4h-8M20 56h-8a4 4 0 01-4-4v-8" />
      <circle cx="32" cy="30" r="13" opacity="0.5" /><circle cx="27" cy="28" r="1.6" /><circle cx="37" cy="28" r="1.6" /><path d="M28 35c2 2 6 2 8 0" />
    </svg>
  );
}
