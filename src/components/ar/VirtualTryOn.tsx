import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  FaceLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
  type Matrix,
} from '@mediapipe/tasks-vision';
import styles from './VirtualTryOn.module.css';

/* ════════════════════════════════════════════════════════════════
   Probador virtual AR — demo para ecommerce (Platanito Rico)
   Cámara (getUserMedia) + MediaPipe FaceLandmarker + Three.js.
   Sin WebXR. Pensado para móvil. Assets autoalojados en /public.
   ════════════════════════════════════════════════════════════════ */

type ProductId = 'glasses' | 'earrings' | 'hat' | 'cap';
type Status = 'idle' | 'starting' | 'running' | 'error' | 'unsupported';

interface Product {
  id: ProductId;
  label: string;
  tag: string;
  model: string;
}

const PRODUCTS: Product[] = [
  { id: 'glasses', label: 'Gafas', tag: 'Eyewear', model: '/models/glasses.glb' },
  { id: 'earrings', label: 'Pendientes', tag: 'Jewelry', model: '/models/earrings.glb' },
  { id: 'hat', label: 'Sombrero', tag: 'Headwear', model: '/models/hat.glb' },
  { id: 'cap', label: 'Gorra', tag: 'Headwear', model: '/models/cap.glb' },
];

/* Índices del mesh facial de 468 puntos de MediaPipe */
const LM = {
  eyeL: 33,
  eyeR: 263,
  earL: 234,
  earR: 454,
  brow: 10,
  chin: 152,
  nose: 1,
};

/* Estimación del giro 3D de la cabeza desde landmarks 2D (ganancias ajustables) */
const YAW_GAIN = 1.4, YAW_MAX = 0.95;
const PITCH_GAIN = 1.3, PITCH_MAX = 0.55, PITCH_NEUTRAL = 0.46;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* Throttle: detectar rostro a ~20fps, renderizar a 60fps */
const DETECT_INTERVAL = 3;

/* Correcta orientación de los GLB a la convención de la escena */
const MODEL_ORIENT: Partial<Record<ProductId, [number, number, number]>> = {
  hat: [-Math.PI / 2, 0, 0],
  glasses: [0, 0, 0],
  cap: [0, 0, 0],
  earrings: [0, 0, 0],
};

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
  accessory: THREE.Group;
  kind: ProductId;
  faceLandmarker: FaceLandmarker | null;
  stream: MediaStream | null;
  raf: number;
  ro: ResizeObserver | null;
  cw: number;
  ch: number;
  lastVideoTime: number;
  smooth: Smooth;
  frameCount: number;
  lastLm: NormalizedLandmark[] | null;
  lastMatrix: Matrix | null;
}

interface Smooth {
  init: boolean;
  cx: number; cy: number; w: number; roll: number;
  elx: number; ely: number; erx: number; ery: number;
  fx: number; fy: number;
  chx: number; chy: number;
  yaw: number; pitch: number;
}

/* Cache de objetos reutilizados para evitar GC en el hot path */
const _mat4 = new THREE.Matrix4();
const _pos = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _sca = new THREE.Vector3();
const _euler = new THREE.Euler();

/** Extraer yaw/pitch de la matrix de transformación facial de MediaPipe.
 *  La matrix 4x4 row-major mapea de rostro canonico a detectado.
 *  La matrix ya viene en coordenadas de pantalla (selfie invertida),
 *  por lo que yaw y pitch NO se niegan. */
function headRotationFromMatrix(m: Matrix): { yaw: number; pitch: number } | null {
  const d = m.data;
  if (d.length < 16) return null;
  _mat4.set(
    d[0], d[1], d[2], d[3],
    d[4], d[5], d[6], d[7],
    d[8], d[9], d[10], d[11],
    d[12], d[13], d[14], d[15],
  );
  _mat4.decompose(_pos, _quat, _sca);
  _euler.setFromQuaternion(_quat, 'YXZ');
  return { yaw: _euler.y, pitch: _euler.x };
}

/* ───────────────────── Fallbacks geométricos ───────────────────── */
function frameMat() {
  return new THREE.MeshStandardMaterial({ color: 0x16181d, metalness: 0.9, roughness: 0.28, envMapIntensity: 1.3 });
}
function lensMat() {
  return new THREE.MeshPhysicalMaterial({
    color: 0x0a1018, metalness: 0.15, roughness: 0.06,
    clearcoat: 1, clearcoatRoughness: 0.04,
    transparent: true, opacity: 0.82, ior: 1.5, envMapIntensity: 1.8,
  });
}
function goldMat() {
  return new THREE.MeshStandardMaterial({ color: 0xe8c25c, metalness: 1, roughness: 0.17, envMapIntensity: 1.5 });
}

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

function buildHat(): THREE.Object3D {
  const g = new THREE.Group();
  const felt = new THREE.MeshPhysicalMaterial({ color: 0x4a3526, roughness: 0.95, metalness: 0, sheen: 0.6, sheenRoughness: 0.8, sheenColor: new THREE.Color(0x6b4f3a), envMapIntensity: 0.55, side: THREE.DoubleSide });
  const band = new THREE.MeshStandardMaterial({ color: 0x241812, roughness: 0.55, metalness: 0.15, envMapIntensity: 0.7 });
  const profile = [
    [0.001, 0.50], [0.23, 0.49], [0.30, 0.40], [0.315, 0.10], [0.33, 0.02],
    [0.40, 0.0], [0.58, -0.05], [0.57, -0.09], [0.34, -0.05], [0.30, -0.02], [0.0, -0.02],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 64), felt);
  g.add(body);
  const bandM = new THREE.Mesh(new THREE.TorusGeometry(0.315, 0.045, 14, 56), band);
  bandM.rotation.x = Math.PI / 2;
  bandM.position.y = 0.07;
  g.add(bandM);
  return g;
}

function buildCap(): THREE.Object3D {
  const g = new THREE.Group();
  const main = new THREE.MeshStandardMaterial({ color: 0x1c2c52, roughness: 0.68, metalness: 0.06, envMapIntensity: 0.7 });
  const accent = new THREE.MeshStandardMaterial({ color: 0xc6ff3a, roughness: 0.5, metalness: 0.1, envMapIntensity: 0.8 });
  const crown = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 36, 22, 0, Math.PI * 2, 0, Math.PI * 0.52),
    main,
  );
  crown.scale.set(1, 0.94, 0.86);
  crown.position.set(0, 0.04, 0);
  g.add(crown);
  const visor = new THREE.Mesh(new THREE.CircleGeometry(0.44, 36, Math.PI, Math.PI), main);
  visor.scale.set(1.05, 0.6, 1);
  visor.rotation.x = -0.95;
  visor.position.set(0, -0.05, 0.17);
  g.add(visor);
  const btn = new THREE.Mesh(new THREE.SphereGeometry(0.04, 14, 14), accent);
  btn.position.set(0, 0.4, 0);
  g.add(btn);
  return g;
}

function normalizeModel(obj: THREE.Object3D): THREE.Object3D {
  const meshes: THREE.Mesh[] = [];
  const seen = new Set<string>();
  obj.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    if (!mesh.material) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach((mat) => {
      const m = mat as THREE.MeshStandardMaterial;
      if ('envMapIntensity' in m) m.envMapIntensity = 1.25;
    });
    const geo = mesh.geometry;
    if (!geo.boundingBox) geo.computeBoundingBox();
    const box = geo.boundingBox!;
    const key = `${geo.attributes.position.count}_${box.min.toArray()}_${box.max.toArray()}`;
    if (seen.has(key)) {
      mesh.parent?.remove(mesh);
      geo.dispose();
      mats.forEach((m) => m.dispose());
      return;
    }
    seen.add(key);
    meshes.push(mesh);
  });
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

async function buildAccessory(engine: Engine, product: ProductId): Promise<string> {
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
    let m: THREE.Object3D;
    if (loaded) m = loaded;
    else if (product === 'glasses') m = buildGlasses();
    else if (product === 'hat') m = buildHat();
    else m = buildCap();
    content = [m];
  }
  if (loaded) {
    const o = MODEL_ORIENT[product];
    if (o) content.forEach((c) => c.rotation.set(o[0], o[1], o[2]));
  }
  content.forEach((c) => engine.accessory.add(c));
  return info;
}

function toCard(p: NormalizedLandmark, vw: number, vh: number, cw: number, ch: number) {
  const scale = Math.max(cw / vw, ch / vh);
  const dw = vw * scale, dh = vh * scale;
  const ox = (cw - dw) / 2, oy = (ch - dh) / 2;
  const x = cw - (ox + p.x * dw);
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
  const [loadingModel, setLoadingModel] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [activeCameraLabel, setActiveCameraLabel] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  const productRef = useRef<ProductId>(product);
  const adjustRef = useRef({ scale: 1, dx: 0, dy: 0 });
  const engineRef = useRef<Engine | null>(null);
  const initialBuildDone = useRef(false);

  const teardown = useCallback(() => {
    const e = engineRef.current;
    if (!e) return;
    cancelAnimationFrame(e.raf);
    e.ro?.disconnect();
    e.stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    try { e.faceLandmarker?.close(); } catch { /* noop */ }
    e.scene.environment?.dispose();
    disposeObject(e.scene);
    e.renderer.dispose();
    engineRef.current = null;
  }, []);

  useEffect(() => {
    productRef.current = product;
    const e = engineRef.current;
    if (e && status === 'running') {
      if (!initialBuildDone.current) return;
      e.smooth.init = false;
      e.lastLm = null;
      e.lastMatrix = null;
      setLoadingModel(true);
      buildAccessory(e, product).then((info) => {
        setModelInfo(info);
        setLoadingModel(false);
      });
    }
  }, [product, status]);

  useEffect(() => () => teardown(), [teardown]);

  const renderLoop = useCallback(() => {
    const e = engineRef.current;
    if (!e) return;
    const v = videoRef.current;

    if (v && v.readyState >= 2 && v.videoWidth > 0 && e.faceLandmarker) {
      if (v.currentTime !== e.lastVideoTime) {
        e.lastVideoTime = v.currentTime;
        e.frameCount++;
        if (e.frameCount % DETECT_INTERVAL === 0) {
          let res;
          try { res = e.faceLandmarker.detectForVideo(v, performance.now()); } catch { res = undefined; }
          const lm = res?.faceLandmarks?.[0];
          if (lm) {
            e.lastLm = lm;
            e.lastMatrix = res?.facialTransformationMatrixes?.[0] ?? null;
          } else {
            e.lastLm = null;
            e.lastMatrix = null;
          }
        }
        if (e.lastLm) {
          updateAccessory(e, e.lastLm, e.lastMatrix, v.videoWidth, v.videoHeight, adjustRef.current);
          e.accessory.visible = true;
        } else {
          e.accessory.visible = false;
        }
      }
    }
    e.renderer.render(e.scene, e.camera);
    e.raf = requestAnimationFrame(renderLoop);
  }, []);

  function updateAccessory(
    e: Engine,
    lm: NormalizedLandmark[],
    matrix: Matrix | null,
    vw: number,
    vh: number,
    adj: { scale: number; dx: number; dy: number },
  ) {
    const eyeL = toCard(lm[LM.eyeL], vw, vh, e.cw, e.ch);
    const eyeR = toCard(lm[LM.eyeR], vw, vh, e.cw, e.ch);
    const earL = toCard(lm[LM.earL], vw, vh, e.cw, e.ch);
    const earR = toCard(lm[LM.earR], vw, vh, e.cw, e.ch);
    const brow = toCard(lm[LM.brow], vw, vh, e.cw, e.ch);
    const chin = toCard(lm[LM.chin], vw, vh, e.cw, e.ch);
    const nose = toCard(lm[LM.nose], vw, vh, e.cw, e.ch);

    const cx = (eyeL.x + eyeR.x) / 2;
    const cy = (eyeL.y + eyeR.y) / 2;
    const w = Math.hypot(eyeR.x - eyeL.x, eyeR.y - eyeL.y);
    const roll = Math.atan2(eyeR.y - eyeL.y, eyeR.x - eyeL.x);

    /* Rotacion: priorizar matrix 3D de MediaPipe, fallback a estimacion 2D */
    let yaw: number, pitch: number;
    const mr = matrix ? headRotationFromMatrix(matrix) : null;
    if (mr) {
      yaw = mr.yaw;
      pitch = mr.pitch;
    } else {
      const dL = nose.x - earL.x, dR = earR.x - nose.x;
      yaw = -clamp(((dR - dL) / Math.max(Math.abs(dR) + Math.abs(dL), 1)) * YAW_GAIN, -YAW_MAX, YAW_MAX);
      const pratio = (nose.y - cy) / Math.max(chin.y - cy, 1);
      pitch = -clamp((pratio - PITCH_NEUTRAL) * PITCH_GAIN, -PITCH_MAX, PITCH_MAX);
    }

    const s = e.smooth;
    const speed = Math.hypot(cx - s.cx, cy - s.cy) + Math.abs(w - s.w) * 0.5;
    const t = s.init ? Math.min(0.18 + speed * 0.024, 0.55) : 1;
    s.cx = lerp(s.cx, cx, t); s.cy = lerp(s.cy, cy, t);
    s.w = lerp(s.w, w, t); s.roll = lerp(s.roll, roll, t);
    s.elx = lerp(s.elx, earL.x, t); s.ely = lerp(s.ely, earL.y, t);
    s.erx = lerp(s.erx, earR.x, t); s.ery = lerp(s.ery, earR.y, t);
    s.fx = lerp(s.fx, brow.x, t); s.fy = lerp(s.fy, brow.y, t);
    s.chx = lerp(s.chx, chin.x, t); s.chy = lerp(s.chy, chin.y, t);
    s.yaw = lerp(s.yaw, yaw, t); s.pitch = lerp(s.pitch, pitch, t);
    s.init = true;

    const faceW = Math.hypot(s.erx - s.elx, s.ery - s.ely);
    const faceH = Math.abs(s.chy - s.fy);

    const g = e.accessory;
    if (e.kind === 'glasses') {
      g.position.set(s.cx + adj.dx, s.cy + adj.dy, 0);
      g.rotation.set(s.pitch, s.yaw, s.roll, 'YXZ');
      g.scale.setScalar(s.w * 1.1 * adj.scale);
    } else if (e.kind === 'hat') {
      g.position.set(s.fx + adj.dx, s.fy - faceH * 0.15 + adj.dy, 0);
      g.rotation.set(s.pitch, s.yaw, s.roll, 'YXZ');
      g.scale.setScalar(faceW * 1.4 * adj.scale);
    } else if (e.kind === 'cap') {
      g.position.set(s.fx + adj.dx, s.fy - faceH * 0.3 + adj.dy, 0);
      g.rotation.set(s.pitch, s.yaw, s.roll, 'YXZ');
      g.scale.setScalar(faceW * 1.25 * adj.scale);
    } else {
      const size = faceW * 0.5 * adj.scale;
      const drop = faceW * 0.14;
      const l = g.getObjectByName('earL');
      const r = g.getObjectByName('earR');
      if (l) { l.position.set(s.elx + adj.dx, s.ely + drop + adj.dy, 0); l.scale.setScalar(size); l.rotation.z = s.roll; }
      if (r) { r.position.set(s.erx + adj.dx, s.ery + drop + adj.dy, 0); r.scale.setScalar(size); r.rotation.z = s.roll; }
    }
  }

  function resize(e: Engine) {
    const el = containerRef.current;
    if (!el) return;
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    e.cw = cw; e.ch = ch;
    e.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    e.renderer.setSize(cw, ch, false);
    e.camera.left = 0; e.camera.right = cw; e.camera.top = 0; e.camera.bottom = ch;
    e.camera.updateProjectionMatrix();
  }

  async function enumerateCameras() {
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      const videoCams = all.filter((d) => d.kind === 'videoinput');
      setCameras(videoCams);
      if (videoCams.length > 0) setActiveCameraLabel(videoCams[0].label || 'Cámara frontal');
    } catch {
      /* silencioso */
    }
  }

  async function switchCamera(deviceId: string) {
    const e = engineRef.current;
    if (!e) return;
    e.stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      e.stream = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();
      const cam = cameras.find((c) => c.deviceId === deviceId);
      if (cam) setActiveCameraLabel(cam.label || 'Cámara');
    } catch {
      /* Si falla el cambio, reintentar con la cámara por defecto */
    }
  }

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
      await enumerateCameras();

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
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: true,
        });
      } catch {
        faceLandmarker = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: '/models/face_landmarker.task', delegate: 'CPU' },
          runningMode: 'VIDEO',
          numFaces: 1,
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: true,
        });
      }

      setLoadingMsg('Preparando escena 3D…');
      const canvas = canvasRef.current!;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const key = new THREE.DirectionalLight(0xffffff, 0.85);
      key.position.set(0.4, -0.6, 1);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xbfe0ff, 0.4);
      rim.position.set(-0.6, 0.2, -0.5);
      scene.add(rim);
      const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -2000, 2000);
      camera.position.z = 800;
      const accessory = new THREE.Group();
      accessory.visible = false;
      scene.add(accessory);

      const engine: Engine = {
        renderer, scene, camera, accessory, kind: productRef.current,
        faceLandmarker, stream, raf: 0, ro: null, cw: 1, ch: 1, lastVideoTime: -1,
        frameCount: 0, lastLm: null, lastMatrix: null,
        smooth: { init: false, cx: 0, cy: 0, w: 0, roll: 0, elx: 0, ely: 0, erx: 0, ery: 0, fx: 0, fy: 0, chx: 0, chy: 0, yaw: 0, pitch: 0 },
      };
      engineRef.current = engine;
      resize(engine);

      const ro = new ResizeObserver(() => engineRef.current && resize(engineRef.current));
      ro.observe(containerRef.current!);
      engine.ro = ro;

      setLoadingModel(true);
      const info = await buildAccessory(engine, productRef.current);
      setModelInfo(info);
      setLoadingModel(false);

      initialBuildDone.current = true;
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
    setCameras([]);
    setActiveCameraLabel('');
    adjustRef.current = { scale: 1, dx: 0, dy: 0 };
    initialBuildDone.current = false;
  }, [teardown]);

  const adjust = (kind: 'in' | 'out' | 'up' | 'down' | 'center') => {
    const a = adjustRef.current;
    const step = engineRef.current ? Math.max(engineRef.current.cw * 0.005, 4) : 8;
    if (kind === 'in') a.scale = Math.min(a.scale + 0.08, 3);
    else if (kind === 'out') a.scale = Math.max(a.scale - 0.08, 0.3);
    else if (kind === 'up') a.dy -= step;
    else if (kind === 'down') a.dy += step;
    else { a.scale = 1; a.dx = 0; a.dy = 0; }
  };

  const running = status === 'running';

  return (
    <section className={styles.wrap} aria-label="Probador virtual AR">
      <div
        ref={liveRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {status === 'running' ? 'Probador activo. Cámara encendida.' : ''}
        {status === 'error' ? `Error: ${errorMsg}` : ''}
      </div>

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

      <div className={styles.phone}>
        <div className={styles.notch} aria-hidden="true" />
        <div className={styles.screen} ref={containerRef}>
          <video ref={videoRef} className={styles.video} playsInline muted />
          <canvas ref={canvasRef} className={styles.canvas} />

          {status === 'idle' && (
            <div className={styles.overlay}>
              <div className={styles.scan} aria-hidden="true">{faceSvg()}</div>
              <p className={styles.overlayLead}>Probador virtual AR</p>
              <p className={styles.overlaySub}>
                Pruébate <strong>gafas, pendientes, sombreros o gorras</strong> desde la cámara de tu móvil — sin instalar nada.
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
              <span className={styles.liveTag}>
                <i className={styles.liveDot} /> EN VIVO · {PRODUCTS.find((p) => p.id === product)?.label}
              </span>
              {loadingModel && <span className={styles.modelTag}>Cargando modelo…</span>}
              {!loadingModel && <span className={styles.modelTag}>{modelInfo}</span>}
            </>
          )}
        </div>
      </div>

      {running && (
        <div className={styles.controls}>
          <div className={styles.ctrlRow}>
            <button className={styles.ctrl} onClick={() => adjust('out')} aria-label="Reducir escala">A−</button>
            <button className={styles.ctrl} onClick={() => adjust('in')} aria-label="Aumentar escala">A+</button>
            <button className={styles.ctrl} onClick={() => adjust('up')} aria-label="Subir">↑</button>
            <button className={styles.ctrl} onClick={() => adjust('down')} aria-label="Bajar">↓</button>
            <button className={styles.ctrl} onClick={() => adjust('center')} aria-label="Centrar">Centrar</button>
          </div>
          {cameras.length > 1 && (
            <div className={styles.ctrlRow}>
              {cameras.map((cam) => (
                <button
                  key={cam.deviceId}
                  className={`${styles.ctrl} ${activeCameraLabel === cam.label ? styles.ctrlOn : ''}`}
                  onClick={() => switchCamera(cam.deviceId)}
                  aria-label={`Cambiar a ${cam.label || 'cámara'}`}
                >
                  {cam.label?.replace(/\s*\(.*?\)/g, '').trim() || 'Cámara'}
                </button>
              ))}
            </div>
          )}
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
  if (id === 'hat') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17.5c2.5 1 6 1.5 9 1.5s6.5-.5 9-1.5" /><path d="M6.5 16.5C7 11 8.5 7 12 7s5 4 5.5 9.5" /></svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a8 8 0 0116 0" /><path d="M4 14h12a5 5 0 005-2.5" /></svg>
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
