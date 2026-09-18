/* SPIKE (desechable): probador AR con pose métrica 6DoF y oclusión real.
   Trabaja sobre una foto fija para poder comparar sin cámara.

   Diferencias con VirtualTryOn.tsx:
   1. Cámara en perspectiva, no ortográfica en píxeles.
   2. La matriz 4x4 de MediaPipe coloca un nodo «cabeza» en centímetros; el
      accesorio cuelga de ese nodo con offsets métricos.
   3. El oclusor es la malla facial canónica + un cráneo elipsoidal, no una
      esfera aproximada, y el accesorio NO se empuja delante: puede quedar
      detrás de la cara y de la oreja. */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

interface Props {
  foto?: string;
  producto?: 'glasses' | 'hat';
  fov?: number;
  oclusion?: boolean;
}

/* Puntos del modelo canónico (cm): vértice i = landmark i. */
const PUENTE = 168;   // puente nasal
const SIEN_I = 234;
const SIEN_D = 454;
const OREJA_I = 127;
const OREJA_D = 356;
const FRENTE = 10;
const OJO_I = 33;
const OJO_D = 263;

/* El modelo canónico se parsea a mano: OBJLoader desindexa la malla y entonces
   el vértice 234 deja de ser el landmark 234. Aquí vértice i = landmark i. */
async function cargarMallaCanonica(url: string): Promise<{ geo: THREE.BufferGeometry; puntos: THREE.Vector3[] }> {
  const texto = await (await fetch(url)).text();
  const puntos: THREE.Vector3[] = [];
  const indices: number[] = [];
  for (const linea of texto.split('\n')) {
    if (linea.startsWith('v ')) {
      const [x, y, z] = linea.slice(2).trim().split(/\s+/).map(Number);
      puntos.push(new THREE.Vector3(x, y, z));
    } else if (linea.startsWith('f ')) {
      const cara = linea.slice(2).trim().split(/\s+/).map((t) => parseInt(t.split('/')[0], 10) - 1);
      for (let i = 1; i < cara.length - 1; i++) indices.push(cara[0], cara[i], cara[i + 1]);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(puntos.flatMap((p) => [p.x, p.y, p.z]), 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return { geo, puntos };
}

export default function SpikeAR(props: Props) {
  const q = typeof location !== 'undefined' ? new URLSearchParams(location.search) : new URLSearchParams();
  const foto = props.foto ?? q.get('foto') ?? '/_spike/cara.png';
  const producto = (props.producto ?? (q.get('producto') === 'hat' ? 'hat' : 'glasses')) as 'glasses' | 'hat';
  const fov = props.fov ?? Number(q.get('fov') ?? 63);
  const oclusion = props.oclusion ?? q.get('oclusion') !== '0';
  const depurar = q.get('debug') === '1';
  const ajuste = {
    y: Number(q.get('y') ?? 0), z: Number(q.get('z') ?? 0), escala: Number(q.get('escala') ?? 1),
  };
  const contenedor = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    let vivo = true;
    let renderer: THREE.WebGLRenderer | null = null;

    (async () => {
      try {
        const img = new Image();
        img.src = foto;
        await img.decode();
        const W = img.naturalWidth, H = img.naturalHeight;

        /* ── MediaPipe en modo imagen, con matriz de transformación facial ── */
        const fileset = await FilesetResolver.forVisionTasks('/mediapipe/wasm');
        const landmarker = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: '/models/face_landmarker.task', delegate: 'GPU' },
          runningMode: 'IMAGE',
          numFaces: 1,
          outputFacialTransformationMatrixes: true,
        });
        const res = landmarker.detect(img);
        const matriz = res.facialTransformationMatrixes?.[0];
        if (!matriz) { setEstado('sin cara detectada'); return; }

        /* ── Escena: la foto de fondo y el 3D encima, mismo tamaño ── */
        const escena = new THREE.Scene();
        const camara = new THREE.PerspectiveCamera(fov, W / H, 1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        const pmrem = new THREE.PMREMGenerator(renderer);
        escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        escena.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.2));
        const sol = new THREE.DirectionalLight(0xffffff, 1.6);
        sol.position.set(1, 2, 3);
        escena.add(sol);

        /* ── Nodo cabeza: la matriz de MediaPipe, tal cual ── */
        const cabeza = new THREE.Group();
        cabeza.matrixAutoUpdate = false;
        cabeza.matrix.fromArray(matriz.data);
        escena.add(cabeza);

        /* ── Oclusores: cara canónica + cráneo. Invisibles, escriben profundidad ── */
        const materialOclusor = depurar
          ? new THREE.MeshBasicMaterial({ color: 0x00ff94, wireframe: true })
          : new THREE.MeshBasicMaterial({ colorWrite: false });
        const { geo: caraGeo, puntos } = await cargarMallaCanonica('/models/canonical_face_model.obj');
        const cara = new THREE.Mesh(caraGeo, materialOclusor);
        cara.renderOrder = -1;
        cara.visible = oclusion;
        cabeza.add(cara);

        /* El cráneo no está en la malla facial: se estima desde las sienes. */
        const sienI = puntos[SIEN_I], sienD = puntos[SIEN_D], puente = puntos[PUENTE];
        const orejaI = puntos[OREJA_I], orejaD = puntos[OREJA_D], frente = puntos[FRENTE];
        const anchoCabeza = sienI.distanceTo(sienD);            // ~15,3 cm
        const centroCraneo = new THREE.Vector3(0, frente.y - anchoCabeza * 0.34, orejaI.z - anchoCabeza * 0.07);
        const craneo = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), materialOclusor);
        craneo.scale.set(anchoCabeza * 0.54, anchoCabeza * 0.60, anchoCabeza * 0.58);
        craneo.position.copy(centroCraneo);
        craneo.renderOrder = -1;
        craneo.visible = oclusion;
        cabeza.add(craneo);

        /* ── Accesorio con medidas reales ── */
        console.log('[spike] matriz', Array.from(matriz.data).map((x) => +x.toFixed(2)).join(','));
        const gltf = await new GLTFLoader().loadAsync(producto === 'hat' ? '/models/hat.glb' : '/models/glasses.glb');
        const modelo = gltf.scene;
        const caja = new THREE.Box3().setFromObject(modelo);
        const tam = caja.getSize(new THREE.Vector3());
        console.log('[spike] bbox modelo', tam.toArray().map((x) => +x.toFixed(3)).join(' x '), '| ancho cabeza cm', anchoCabeza.toFixed(2));
        const centro = caja.getCenter(new THREE.Vector3());
        modelo.position.sub(centro);                 // origen al centro del modelo
        const envoltorio = new THREE.Group();
        envoltorio.add(modelo);

        /* Coloca el modelo alineando un punto de su caja (no su centro) con un
           punto de la cabeza: así «apoyar» significa lo mismo que en la vida real. */
        const alinear = (obj: THREE.Object3D, destino: THREE.Vector3, ancla: { x?: 'centro'; y: 'centro' | 'min' | 'max'; z: 'centro' | 'min' | 'max' }) => {
          const c = new THREE.Box3().setFromObject(obj);
          const punto = new THREE.Vector3(
            (c.min.x + c.max.x) / 2,
            ancla.y === 'centro' ? (c.min.y + c.max.y) / 2 : ancla.y === 'min' ? c.min.y : c.max.y,
            ancla.z === 'centro' ? (c.min.z + c.max.z) / 2 : ancla.z === 'min' ? c.min.z : c.max.z,
          );
          obj.position.add(destino.clone().sub(punto));
        };

        if (producto === 'glasses') {
          /* Ancho de montura = distancia entre sienes menos un margen: así una
             cara ancha lleva montura ancha, como en una tienda real. */
          const anchoMontura = anchoCabeza * 0.92;
          const escala = (anchoMontura / tam.x) * ajuste.escala;
          envoltorio.scale.setScalar(escala);
          /* El puente descansa sobre el puente nasal; las patillas quedan a la
             altura de las orejas y se meten hacia atrás (Z negativa). */
          /* La cara frontal de la montura se apoya en el puente nasal y el
             centro vertical de las lentes cae a la altura de los ojos. */
          const alturaOjos = (puntos[OJO_I].y + puntos[OJO_D].y) / 2;
          alinear(envoltorio, new THREE.Vector3(0, alturaOjos + ajuste.y, puente.z + 0.5 + ajuste.z), { y: 'centro', z: 'max' });
        } else {
          const contorno = anchoCabeza * 1.12;       // el ala vuela algo más que la cabeza
          const escala = (contorno / tam.x) * ajuste.escala;
          envoltorio.scale.setScalar(escala);
          /* El borde inferior del sombrero se hunde un poco en el cráneo. */
          envoltorio.rotation.x = -0.10;
          const altoCraneo = centroCraneo.y + anchoCabeza * 0.60;
          alinear(envoltorio, new THREE.Vector3(0, altoCraneo - 3.2 + ajuste.y, centroCraneo.z + ajuste.z), { y: 'min', z: 'centro' });
        }
        cabeza.add(envoltorio);

        if (depurar) {
          const marcar = (p: THREE.Vector3, color: number) => {
            const m = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 10), new THREE.MeshBasicMaterial({ color, depthTest: false }));
            m.position.copy(p); m.renderOrder = 10; cabeza.add(m);
          };
          marcar(puente, 0xff5a00);
          marcar(new THREE.Vector3(0, (puntos[OJO_I].y + puntos[OJO_D].y) / 2, puente.z), 0xd6ff44);
          marcar(centroCraneo, 0x18e0ff);
          const cajaFinal = new THREE.Box3().setFromObject(envoltorio);
          console.log('[spike] caja accesorio', cajaFinal.min.toArray().map((x) => +x.toFixed(1)).join(','), '→', cajaFinal.max.toArray().map((x) => +x.toFixed(1)).join(','));
        }
        renderer.render(escena, camara);
        const lienzo = renderer.domElement;
        lienzo.style.position = 'absolute';
        lienzo.style.inset = '0';
        lienzo.style.width = '100%';
        lienzo.style.height = '100%';
        if (!vivo) return;
        const cont = contenedor.current!;
        cont.style.position = 'relative';
        cont.style.width = W + 'px';
        cont.style.maxWidth = '100%';
        cont.style.aspectRatio = `${W} / ${H}`;
        const fondo = document.createElement('img');
        fondo.src = foto;
        fondo.style.width = '100%';
        fondo.style.display = 'block';
        cont.appendChild(fondo);
        cont.appendChild(lienzo);
        setEstado('listo');
      } catch (e) {
        setEstado('error: ' + (e as Error).message);
      }
    })();

    return () => { vivo = false; renderer?.dispose(); };
  }, [foto, producto, fov, oclusion, depurar, ajuste.y, ajuste.z, ajuste.escala]);

  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: '.8rem', color: '#8494a2' }}>
        {producto} · fov {fov} · oclusión {String(oclusion)} · {estado}
      </p>
      <div ref={contenedor} />
    </div>
  );
}
