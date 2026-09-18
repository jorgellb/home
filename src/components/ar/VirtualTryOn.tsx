/* Probador virtual AR — interfaz.

   El motor vive en ./motor; aquí solo hay estado de interfaz, textos y
   controles. La cámara no se abre hasta que la persona lo pide, y todo el
   procesamiento ocurre en su dispositivo: no se sube ni se guarda ninguna
   imagen. */
import { useCallback, useEffect, useRef, useState } from 'react';
import estilos from './VirtualTryOn.module.css';
import { catalogoAR, productoPorDefecto } from './catalogo';
import { SesionAR } from './motor/sesion';
import type { AvisoEncuadre, CodigoErrorAR, EstadoSesion, ProductoAR } from './motor/tipos';

const MENSAJES_ERROR: Record<CodigoErrorAR, { titulo: string; ayuda: string }> = {
  AR_CAMERA_DENIED: { titulo: 'No hay permiso de cámara', ayuda: 'Actívalo en el candado de la barra de direcciones y vuelve a intentarlo.' },
  AR_CAMERA_BUSY: { titulo: 'La cámara está ocupada', ayuda: 'Cierra otras aplicaciones o pestañas que la estén usando.' },
  AR_NO_CAMERA: { titulo: 'No encontramos cámara', ayuda: 'Prueba desde un móvil o un portátil con cámara frontal.' },
  AR_INSECURE_CONTEXT: { titulo: 'Conexión no segura', ayuda: 'El navegador solo permite la cámara en páginas con HTTPS.' },
  AR_WEBGL_UNAVAILABLE: { titulo: 'Tu navegador no puede pintar 3D', ayuda: 'Activa la aceleración por hardware o prueba en otro navegador.' },
  AR_TRACKER_INIT_ERROR: { titulo: 'No se pudo cargar el seguimiento', ayuda: 'Puede ser la conexión. Vuelve a intentarlo en un momento.' },
  AR_MODEL_LOAD_ERROR: { titulo: 'No se pudo cargar el producto', ayuda: 'Prueba con otro producto o recarga la página.' },
};

const TEXTO_ESTADO: Partial<Record<EstadoSesion, string>> = {
  'pidiendo-permiso': 'Pidiendo permiso de cámara…',
  iniciando: 'Preparando la cámara…',
  'buscando-cara': 'Buscando tu cara…',
  calibrando: 'Ajustando…',
};

function contar(evento: string) {
  try {
    void fetch('/api/track/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ event: evento }),
      keepalive: true,
    });
  } catch { /* la analítica nunca rompe la experiencia */ }
}

export default function VirtualTryOn() {
  const video = useRef<HTMLVideoElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const sesion = useRef<SesionAR | null>(null);

  const [abierto, setAbierto] = useState(false);
  const [estado, setEstado] = useState<EstadoSesion>('inactiva');
  const [aviso, setAviso] = useState<AvisoEncuadre | null>(null);
  const [error, setError] = useState<CodigoErrorAR | null>(null);
  const [producto, setProducto] = useState<ProductoAR>(productoPorDefecto);
  const [captura, setCaptura] = useState<string | null>(null);
  const [metricas, setMetricas] = useState({ fps: 0, inferenciaMs: 0, delegado: '' });
  const [depurar, setDepurar] = useState(false);
  const [fotoPrueba, setFotoPrueba] = useState<string | null>(null);
  const [ajuste, setAjuste] = useState({ escala: 1, x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 });
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    setDepurar(q.get('arDebug') === '1');
    /* Solo con ?arDebug=1: permite calibrar sobre una foto fija en vez de la
       cámara, que no es reproducible. */
    if (q.get('arDebug') === '1') setFotoPrueba(q.get('arFoto'));
  }, []);

  const cerrar = useCallback(() => {
    sesion.current?.cerrar();
    sesion.current = null;
    setAbierto(false);
    setEstado('inactiva');
    setAviso(null);
  }, []);

  useEffect(() => () => { sesion.current?.cerrar(); sesion.current = null; }, []);

  useEffect(() => {
    if (!abierto) return;
    const alRedimensionar = () => sesion.current?.ajustarTamano();
    window.addEventListener('resize', alRedimensionar);
    window.addEventListener('orientationchange', alRedimensionar);
    return () => {
      window.removeEventListener('resize', alRedimensionar);
      window.removeEventListener('orientationchange', alRedimensionar);
    };
  }, [abierto]);

  async function abrir() {
    if (!video.current || !lienzo.current) return;
    setError(null);
    setAbierto(true);
    contar('demo:ar');
    const s = new SesionAR({
      video: video.current,
      lienzo: lienzo.current,
      producto,
      depurar,
      fuente: fotoPrueba ? { tipo: 'imagen', url: fotoPrueba } : { tipo: 'camara' },
      onEstado: setEstado,
      onAviso: setAviso,
      onError: (codigo) => { setError(codigo); contar('demo:arerr'); },
      onMetricas: setMetricas,
    });
    sesion.current = s;
    await s.iniciar();
    /* Un segundo ajuste cuando el vídeo ya conoce su tamaño real. */
    setTimeout(() => s.ajustarTamano(), 300);
  }

  async function elegir(p: ProductoAR) {
    setProducto(p);
    if (sesion.current) await sesion.current.cambiarProducto(p);
  }

  /* Calibración en vivo: mueve el producto y escupe el JSON del catálogo. */
  function calibrar(campo: keyof typeof ajuste, valor: number) {
    const nuevo = { ...ajuste, [campo]: valor };
    setAjuste(nuevo);
    sesion.current?.recalibrar({
      escala: nuevo.escala,
      posicion: [nuevo.x, nuevo.y, nuevo.z],
      rotacion: [nuevo.rx, nuevo.ry, nuevo.rz],
    });
    try { localStorage.setItem(`ar:cal:${producto.id}`, JSON.stringify(nuevo)); } catch { /* modo privado */ }
  }

  async function copiarConfiguracion() {
    const texto = sesion.current?.configuracionActual();
    if (!texto) return;
    await navigator.clipboard.writeText(texto).catch(() => undefined);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  }

  function capturar() {
    const dato = sesion.current?.capturar();
    if (!dato) return;
    setCaptura(dato);
    contar('demo:arfoto');
  }

  async function compartir() {
    if (!captura) return;
    const archivo = await fetch(captura).then((r) => r.blob());
    const fichero = new File([archivo], 'probador-platanito.jpg', { type: 'image/jpeg' });
    if (navigator.canShare?.({ files: [fichero] })) {
      await navigator.share({ files: [fichero], title: 'Probador virtual' }).catch(() => undefined);
    } else {
      const a = document.createElement('a');
      a.href = captura;
      a.download = 'probador-platanito.jpg';
      a.click();
    }
  }

  const cargando = ['pidiendo-permiso', 'iniciando'].includes(estado);

  return (
    <div className={estilos.wrap}>
      {!abierto && !error && (
        <div className={estilos.intro}>
          <h2 className={estilos.introTit}>Pruébatelo desde la cámara</h2>
          <p className={estilos.introTxt}>
            Necesitamos acceso a la cámara para colocar el producto sobre ti. Todo ocurre en tu
            dispositivo: no subimos, no guardamos y no compartimos ninguna imagen.
          </p>
          <ul className={estilos.introLista}>
            <li>Funciona en el navegador, sin instalar nada</li>
            <li>Mejor con buena luz y la cara dentro del encuadre</li>
            <li>Puedes cerrar la cámara cuando quieras</li>
          </ul>
          <button type="button" className={estilos.boton} onClick={abrir}>Activar cámara</button>
        </div>
      )}

      {error && (
        <div className={estilos.intro}>
          <h2 className={estilos.introTit}>{MENSAJES_ERROR[error].titulo}</h2>
          <p className={estilos.introTxt}>{MENSAJES_ERROR[error].ayuda}</p>
          <div className={estilos.acciones}>
            <button type="button" className={estilos.boton} onClick={() => { setError(null); void abrir(); }}>Reintentar</button>
            <a className={`${estilos.boton} ${estilos.botonLinea}`} href="/contacto/">Que nos lo enseñen en directo</a>
          </div>
        </div>
      )}

      <div className={estilos.escena} hidden={!abierto || Boolean(error)}>
        <video ref={video} className={estilos.video} playsInline muted autoPlay />
        <canvas ref={lienzo} className={estilos.lienzo} />

        {estado === 'siguiendo' && (
          <span className={estilos.estado}><i className={estilos.punto} /> en vivo</span>
        )}

        {(cargando || TEXTO_ESTADO[estado]) && (
          <div className={estilos.capa}>
            <p className={estilos.capaTxt}>{TEXTO_ESTADO[estado]}</p>
            <p className={estilos.capaMini}>El procesamiento ocurre en tu dispositivo</p>
          </div>
        )}

        {aviso && estado === 'siguiendo' && <span className={estilos.aviso}>{aviso.texto}</span>}
      </div>

      {abierto && !error && (
        <div className={estilos.controles}>
          <div className={estilos.productos} role="group" aria-label="Productos para probar">
            {catalogoAR.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`${estilos.producto} ${p.id === producto.id ? estilos.productoOn : ''}`}
                aria-pressed={p.id === producto.id}
                onClick={() => void elegir(p)}
              >
                {p.nombre}
              </button>
            ))}
          </div>
          <div className={estilos.acciones}>
            <button type="button" className={estilos.accion} onClick={capturar} disabled={estado !== 'siguiendo'}>
              Hacer foto
            </button>
            {captura && (
              <button type="button" className={estilos.accion} onClick={() => void compartir()}>
                Compartir o guardar
              </button>
            )}
            <button type="button" className={estilos.accion} onClick={cerrar}>Cerrar cámara</button>
          </div>
          <p className={estilos.nota}>
            Vista virtual aproximada del producto: sirve para ver cómo queda, no para calcular tu talla.
          </p>
        </div>
      )}

      {depurar && abierto && (
        <div className={estilos.depurar}>
          <div className={estilos.hud}>
            <span>fps {metricas.fps.toFixed(0)}</span>
            <span>inferencia {metricas.inferenciaMs.toFixed(1)} ms</span>
            <span>delegado {metricas.delegado}</span>
            <span>estado {estado}</span>
          </div>
          <label>
            <input type="checkbox" onChange={(e) => sesion.current?.verDepuracion(e.currentTarget.checked)} /> ver oclusores
          </label>
          {([
            ['escala', 0.6, 1.6, 0.01],
            ['x', -6, 6, 0.1],
            ['y', -6, 6, 0.1],
            ['z', -6, 6, 0.1],
            ['rx', -30, 30, 1],
            ['ry', -180, 180, 1],
            ['rz', -30, 30, 1],
          ] as const).map(([campo, min, max, paso]) => (
            <div key={campo} className={estilos.depurarFila}>
              <label htmlFor={`cal-${campo}`}>{campo}</label>
              <input
                id={`cal-${campo}`}
                type="range"
                min={min}
                max={max}
                step={paso}
                value={ajuste[campo]}
                onChange={(e) => calibrar(campo, Number(e.currentTarget.value))}
              />
              <input
                type="number"
                aria-label={`${campo} (valor)`}
                min={min}
                max={max}
                step={paso}
                value={ajuste[campo]}
                onChange={(e) => calibrar(campo, Number(e.currentTarget.value))}
              />
            </div>
          ))}
          <button type="button" className={estilos.accion} onClick={() => void copiarConfiguracion()}>
            {copiado ? 'Copiado' : 'Copiar configuración del SKU'}
          </button>
        </div>
      )}
    </div>
  );
}
