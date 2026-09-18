/* Sesión de prueba virtual: orquesta cámara, rastreo, escena y producto.

   Máquina de estados explícita en vez de una maraña de banderas, y una sola
   función de limpieza que apaga todo lo que se encendió. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { crearEscena, type Calidad, type Escena } from './escena';
import { crearRastreador, type Rastreador } from './rastreador';
import { crearOclusores, type Oclusores } from './oclusores';
import { cargarMallaCanonica, dimensionesCabeza } from './malla-canonica';
import { anclar, calibracionDe, OCLUSION_BASE } from './anclajes';
import { poseDesdeMatriz, distanciaCamara, type PoseCabeza } from './pose';
import { FiltroVector, factorRotacion } from './suavizado';
import type { AvisoEncuadre, CalibracionAR, CodigoErrorAR, DimensionesCabeza, EstadoSesion, ProductoAR } from './tipos';

export interface OpcionesSesion {
  video: HTMLVideoElement;
  lienzo: HTMLCanvasElement;
  producto: ProductoAR;
  /** Fuente de imagen. Con una URL, el probador funciona sobre una foto fija:
      se usa para calibrar productos y para las pruebas visuales, porque una
      cámara real no es reproducible. Nunca se activa sola en producción. */
  fuente?: { tipo: 'camara' } | { tipo: 'imagen'; url: string };
  depurar?: boolean;
  onEstado?: (estado: EstadoSesion) => void;
  onAviso?: (aviso: AvisoEncuadre | null) => void;
  onError?: (codigo: CodigoErrorAR, detalle?: string) => void;
  onMetricas?: (m: { fps: number; inferenciaMs: number; delegado: string }) => void;
}

/* Distancias cómodas en centímetros, medidas desde la cámara. */
const CERCA = 22;
const LEJOS = 65;
/* El rastreo no necesita ir a la velocidad del render. */
const MS_ENTRE_DETECCIONES = 33;

const cacheModelos = new Map<string, Promise<THREE.Object3D>>();

function cargarModelo(url: string): Promise<THREE.Object3D> {
  if (!cacheModelos.has(url)) {
    cacheModelos.set(
      url,
      new GLTFLoader().loadAsync(url).then((g) => g.scene),
    );
  }
  return cacheModelos.get(url)!.then((o) => o.clone(true));
}

export class SesionAR {
  private escena: Escena | null = null;
  private rastreador: Rastreador | null = null;
  private oclusores: Oclusores | null = null;
  private stream: MediaStream | null = null;
  private anim = 0;
  private animFoto = 0;
  private estado: EstadoSesion = 'inactiva';
  private producto: ProductoAR;
  private accesorio: THREE.Group | null = null;
  private dims: DimensionesCabeza | null = null;
  private puntos: THREE.Vector3[] = [];
  private pose: PoseCabeza | null = null;
  private filtroPos = new FiltroVector({ minCutoff: 1.1, beta: 0.015 });
  private filtroEscala = new FiltroVector({ minCutoff: 0.8, beta: 0.01 }, 1);
  private giroSuave = new THREE.Quaternion();
  private hayGiro = false;
  private ultimaDeteccion = 0;
  private ultimoFrame = 0;
  private fps = 0;
  private inferenciaMs = 0;
  private sinCaraDesde = 0;
  private opacidad = 0;
  /* Ajuste en vivo del producto (solo herramienta de calibración). */
  private ajuste: Partial<CalibracionAR> = {};
  private cajas = new Map<THREE.Group, THREE.Box3>();

  constructor(private op: OpcionesSesion) {
    this.producto = op.producto;
  }

  private ir(estado: EstadoSesion) {
    if (this.estado === estado) return;
    this.estado = estado;
    this.op.onEstado?.(estado);
  }

  /** Convierte una imagen fija en un MediaStream, para calibrar sin cámara. */
  private async streamDeImagen(url: string): Promise<MediaStream> {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    await img.decode();
    const lienzo = document.createElement('canvas');
    lienzo.width = img.naturalWidth;
    lienzo.height = img.naturalHeight;
    const ctx = lienzo.getContext('2d')!;
    const pintar = () => {
      ctx.drawImage(img, 0, 0);
      this.animFoto = requestAnimationFrame(pintar);
    };
    pintar();
    return lienzo.captureStream(30);
  }

  async iniciar(calidad: Calidad = 'alta'): Promise<void> {
    const fuente = this.op.fuente ?? { tipo: 'camara' };
    if (fuente.tipo === 'camara' && !window.isSecureContext) return this.op.onError?.('AR_INSECURE_CONTEXT');
    this.ir('pidiendo-permiso');
    try {
      this.stream =
        fuente.tipo === 'imagen'
          ? await this.streamDeImagen(fuente.url)
          : await navigator.mediaDevices.getUserMedia({
              video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
              audio: false,
            });
    } catch (e) {
      const nombre = (e as DOMException)?.name;
      const codigo: CodigoErrorAR =
        nombre === 'NotAllowedError' ? 'AR_CAMERA_DENIED' : nombre === 'NotReadableError' ? 'AR_CAMERA_BUSY' : 'AR_NO_CAMERA';
      this.ir('error');
      return this.op.onError?.(codigo);
    }

    this.ir('iniciando');
    const { video, lienzo } = this.op;
    video.srcObject = this.stream;
    await video.play().catch(() => undefined);

    try {
      this.escena = crearEscena(lienzo, calidad);
      this.escena.aplicarCalidad(calidad);
    } catch {
      this.ir('error');
      return this.op.onError?.('AR_WEBGL_UNAVAILABLE');
    }

    try {
      const [malla, rastreador] = await Promise.all([cargarMallaCanonica(), crearRastreador()]);
      this.puntos = malla.puntos;
      this.dims = dimensionesCabeza(malla.puntos);
      this.oclusores = crearOclusores(malla.geometria, this.dims);
      this.escena.cabeza.add(this.oclusores.grupo);
      this.oclusores.verGeometria(false); // en depuración se activa a mano
      this.rastreador = rastreador;
    } catch (e) {
      this.ir('error');
      return this.op.onError?.('AR_TRACKER_INIT_ERROR', (e as Error)?.message);
    }

    await this.cambiarProducto(this.producto);
    this.ajustarTamano();
    this.ir('buscando-cara');
    this.bucle();
  }

  /** Cambia de producto sin reiniciar cámara ni MediaPipe. */
  async cambiarProducto(producto: ProductoAR): Promise<void> {
    this.producto = producto;
    if (!this.escena || !this.dims) return;
    if (this.accesorio) {
      this.escena.cabeza.remove(this.accesorio);
      this.accesorio = null;
    }
    try {
      const esPar = producto.categoria === 'pendientes';
      const grupo = new THREE.Group();
      grupo.name = 'accesorio';
      const lados: ('izq' | 'der')[] = esPar ? ['izq', 'der'] : ['izq'];
      for (const lado of lados) {
        const modelo = await cargarModelo(producto.modelo);
        if (producto.orientacion) {
          const [ox, oy, oz] = producto.orientacion.map((g) => (g * Math.PI) / 180);
          modelo.rotation.set(ox, oy, oz);
          modelo.updateMatrixWorld(true);
        }
        const caja = new THREE.Box3().setFromObject(modelo);
        const centro = caja.getCenter(new THREE.Vector3());
        modelo.position.sub(centro); // origen al centro; el anclaje usa las caras
        const envoltorio = new THREE.Group();
        envoltorio.add(modelo);
        const cajaLocal = new THREE.Box3(caja.min.clone().sub(centro), caja.max.clone().sub(centro));
        this.cajas.set(envoltorio, cajaLocal);
        envoltorio.userData.lado = lado;
        this.colocar(envoltorio, cajaLocal, lado);
        grupo.add(envoltorio);
      }
      const base = OCLUSION_BASE[producto.categoria];
      this.oclusores?.aplicar({
        cara: producto.oclusion?.cara ?? base.cara,
        cabeza: producto.oclusion?.cabeza ?? base.cabeza,
      });
      grupo.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.renderOrder = 1;
      });
      this.accesorio = grupo;
      this.escena.cabeza.add(grupo);
      this.aplicarOpacidad(this.opacidad);
    } catch (e) {
      this.op.onError?.('AR_MODEL_LOAD_ERROR', (e as Error)?.message);
    }
  }

  /** Coloca un envoltorio ya cargado según la estrategia de su categoría. */
  private colocar(envoltorio: THREE.Group, caja: THREE.Box3, lado: 'izq' | 'der') {
    if (!this.dims) return;
    const calibracion = calibracionDe(this.producto.categoria, {
      ...this.producto.calibracion,
      ...this.ajuste,
    });
    const r = anclar(this.producto.categoria, { puntos: this.puntos, dims: this.dims, caja, calibracion }, lado);
    envoltorio.scale.setScalar(r.escala);
    envoltorio.position.copy(r.posicion);
    envoltorio.rotation.copy(r.rotacion);
    if (lado === 'der') envoltorio.scale.x *= -1; // el par es simétrico
  }

  /** Herramienta de calibración: recoloca sin recargar el modelo. */
  recalibrar(ajuste: Partial<CalibracionAR>): void {
    this.ajuste = ajuste;
    this.accesorio?.children.forEach((hijo) => {
      const envoltorio = hijo as THREE.Group;
      const caja = this.cajas.get(envoltorio);
      if (caja) this.colocar(envoltorio, caja, (envoltorio.userData.lado as 'izq' | 'der') ?? 'izq');
    });
  }

  /** Configuración lista para pegar en el catálogo. */
  configuracionActual(): string {
    const cal = calibracionDe(this.producto.categoria, { ...this.producto.calibracion, ...this.ajuste });
    return JSON.stringify({ id: this.producto.id, calibracion: cal }, null, 2);
  }

  ajustarTamano(): void {
    const { video, lienzo } = this.op;
    if (!this.escena) return;
    const caja = lienzo.getBoundingClientRect();
    if (!caja.width || !video.videoWidth) return;
    this.escena.redimensionar(
      { ancho: Math.round(caja.width), alto: Math.round(caja.height) },
      { ancho: video.videoWidth, alto: video.videoHeight },
    );
  }

  private aplicarOpacidad(valor: number) {
    this.accesorio?.traverse((o) => {
      const m = o as THREE.Mesh;
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      const aplicar = (x: THREE.Material) => {
        x.transparent = valor < 1;
        (x as THREE.MeshStandardMaterial).opacity = valor;
      };
      if (Array.isArray(mat)) mat.forEach(aplicar);
      else if (mat) aplicar(mat);
    });
  }

  private bucle = () => {
    this.anim = requestAnimationFrame(this.bucle);
    const ahora = performance.now();
    if (this.ultimoFrame) this.fps = this.fps * 0.9 + (1000 / Math.max(ahora - this.ultimoFrame, 1)) * 0.1;
    this.ultimoFrame = ahora;

    if (ahora - this.ultimaDeteccion >= MS_ENTRE_DETECCIONES && this.rastreador) {
      const t0 = performance.now();
      const res = this.rastreador.detectar(this.op.video, ahora);
      this.inferenciaMs = this.inferenciaMs * 0.8 + (performance.now() - t0) * 0.2;
      this.ultimaDeteccion = ahora;
      const matriz = res?.facialTransformationMatrixes?.[0];
      if (matriz) {
        this.sinCaraDesde = 0;
        this.actualizarPose(matriz.data, ahora);
      } else if (!this.sinCaraDesde) {
        this.sinCaraDesde = ahora;
      }
      this.op.onMetricas?.({ fps: this.fps, inferenciaMs: this.inferenciaMs, delegado: this.rastreador.delegado });
    }

    /* Perder la cara no congela el producto: se desvanece y vuelve al reaparecer. */
    const perdida = this.sinCaraDesde && performance.now() - this.sinCaraDesde > 250;
    const objetivo = perdida || !this.pose ? 0 : 1;
    if (this.opacidad !== objetivo) {
      this.opacidad += Math.sign(objetivo - this.opacidad) * 0.12;
      this.opacidad = Math.max(0, Math.min(1, this.opacidad));
      this.aplicarOpacidad(this.opacidad);
      if (perdida && this.opacidad === 0) {
        this.ir('buscando-cara');
        this.op.onAviso?.({ tipo: 'sin-cara', texto: 'Buscando tu cara…' });
        this.hayGiro = false;
        this.filtroPos.reiniciar();
        this.filtroEscala.reiniciar();
      }
    }

    this.escena?.pintar();
  };

  private actualizarPose(datos: ArrayLike<number>, t: number) {
    if (!this.escena) return;
    const cruda = poseDesdeMatriz(datos);
    const [px, py, pz] = this.filtroPos.filtrar([cruda.posicion.x, cruda.posicion.y, cruda.posicion.z], t);
    const [s] = this.filtroEscala.filtrar([cruda.escala.x], t);

    if (!this.hayGiro) {
      this.giroSuave.copy(cruda.cuaternion);
      this.hayGiro = true;
    } else {
      const angulo = this.giroSuave.angleTo(cruda.cuaternion);
      this.giroSuave.slerp(cruda.cuaternion, factorRotacion(angulo));
    }

    this.escena.cabeza.matrix.compose(
      new THREE.Vector3(px, py, pz),
      this.giroSuave,
      new THREE.Vector3(s, s, s),
    );
    this.pose = cruda;

    /* Hay pose: ya estamos siguiendo. La distancia solo cambia el consejo que
       se muestra, nunca bloquea la experiencia. */
    this.ir('siguiendo');
    const d = distanciaCamara(cruda);
    if (d < CERCA) this.op.onAviso?.({ tipo: 'cerca', texto: 'Aléjate un poco' });
    else if (d > LEJOS) this.op.onAviso?.({ tipo: 'lejos', texto: 'Acércate un poco' });
    else this.op.onAviso?.(null);
  }

  verDepuracion(activo: boolean): void {
    this.oclusores?.verGeometria(activo);
  }

  /** Foto compuesta: vídeo + capa 3D, sin enviar nada a ningún servidor. */
  capturar(): string | null {
    const { video, lienzo } = this.op;
    if (!video.videoWidth) return null;
    const salida = document.createElement('canvas');
    salida.width = lienzo.width;
    salida.height = lienzo.height;
    const ctx = salida.getContext('2d');
    if (!ctx) return null;
    /* El vídeo se muestra reflejado, así que la foto también. */
    ctx.save();
    ctx.translate(salida.width, 0);
    ctx.scale(-1, 1);
    const escala = Math.max(salida.width / video.videoWidth, salida.height / video.videoHeight);
    const w = video.videoWidth * escala;
    const h = video.videoHeight * escala;
    ctx.drawImage(video, (salida.width - w) / 2, (salida.height - h) / 2, w, h);
    ctx.drawImage(lienzo, 0, 0, salida.width, salida.height);
    ctx.restore();
    return salida.toDataURL('image/jpeg', 0.92);
  }

  cerrar(): void {
    cancelAnimationFrame(this.anim);
    cancelAnimationFrame(this.animFoto);
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    if (this.op.video) this.op.video.srcObject = null;
    this.rastreador?.liberar();
    this.rastreador = null;
    this.oclusores?.liberar();
    this.oclusores = null;
    this.escena?.liberar();
    this.escena = null;
    this.accesorio = null;
    this.pose = null;
    this.hayGiro = false;
    this.ir('cerrada');
  }
}
