import { useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './RayosX.module.css';

/* "Rayos X de Atención" — sube una captura de una web y la IA predice el mapa de
   calor de atención (dónde miran los ojos), el recorrido visual y la primera
   impresión. El mapa de calor se renderiza en un canvas sobre la imagen. */

interface Zona { x: number; y: number; r: number; intensidad: number; etiqueta: string }
interface Punto { x: number; y: number; que: string }
interface Analisis {
  primera_impresion?: { puntuacion?: number; mensaje_percibido?: string; veredicto?: string };
  punto_focal?: string;
  claridad?: number;
  cta_visible?: boolean;
  mapa_calor?: Zona[];
  recorrido_visual?: Punto[];
  aciertos?: string[];
  problemas?: string[];
  recomendaciones?: string[];
}
type Phase = 'idle' | 'loading' | 'done' | 'error';

/* ── Color de calor (azul→cian→verde→amarillo→rojo) ── */
function heatColor(t: number): [number, number, number] {
  t = Math.max(0, Math.min(1, t));
  const stops: [number, [number, number, number]][] = [
    [0.0, [0, 0, 255]], [0.35, [0, 255, 255]], [0.55, [0, 255, 0]], [0.75, [255, 255, 0]], [1.0, [255, 0, 0]],
  ];
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1]; const [t1, c1] = stops[i];
      const f = (t - t0) / (t1 - t0);
      return [Math.round(c0[0] + (c1[0] - c0[0]) * f), Math.round(c0[1] + (c1[1] - c0[1]) * f), Math.round(c0[2] + (c1[2] - c0[2]) * f)];
    }
  }
  return [255, 0, 0];
}

function drawHeatmap(canvas: HTMLCanvasElement, zonas: Zona[]) {
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const maxSide = Math.max(W, H);
  ctx.globalCompositeOperation = 'lighter';
  for (const z of zonas) {
    const cx = z.x / 100 * W, cy = z.y / 100 * H, rad = Math.max(8, z.r / 100 * maxSide);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    g.addColorStop(0, `rgba(0,0,0,${z.intensidad})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  ctx.globalCompositeOperation = 'source-over';
  const img = ctx.getImageData(0, 0, W, H); const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3];
    if (a < 6) { d[i + 3] = 0; continue; }
    const t = Math.min(1, a / 255);
    const [r, g, b] = heatColor(t);
    d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = Math.min(225, 50 + t * 190);
  }
  ctx.putImageData(img, 0, 0);
}

function fileToDataURL(file: File, max = 1280, q = 0.86): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.width, h = img.height;
      if (Math.max(w, h) > max) { const s = max / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const ctx = c.getContext('2d'); if (!ctx) { reject(new Error('no ctx')); return; }
      ctx.drawImage(img, 0, 0, w, h); resolve(c.toDataURL('image/jpeg', q));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo leer la imagen.')); };
    img.src = url;
  });
}

/* Maqueta de web para el ejemplo (sin necesidad de subir nada). */
function makeMock(): string {
  const c = document.createElement('canvas'); c.width = 1000; c.height = 650;
  const x = c.getContext('2d'); if (!x) return '';
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1000, 650);
  x.fillStyle = '#0f172a'; x.font = 'bold 26px system-ui,sans-serif'; x.fillText('LunaShop', 60, 52);
  x.fillStyle = '#94a3b8'; x.font = '15px system-ui,sans-serif';
  ['Inicio', 'Tienda', 'Sobre', 'Contacto'].forEach((t, i) => x.fillText(t, 620 + i * 92, 48));
  x.fillStyle = '#0f172a'; x.font = 'bold 44px system-ui,sans-serif'; x.fillText('Productos para tu hogar', 60, 180);
  x.fillStyle = '#64748b'; x.font = '18px system-ui,sans-serif'; x.fillText('Calidad y diseño al mejor precio', 60, 214);
  x.fillStyle = '#e2e8f0'; x.fillRect(60, 250, 160, 46); x.fillStyle = '#94a3b8'; x.font = '16px system-ui,sans-serif'; x.fillText('Comprar', 108, 279);
  x.fillStyle = '#cbd5e1'; x.fillRect(520, 110, 420, 270); x.fillStyle = '#94a3b8'; x.font = '16px system-ui,sans-serif'; x.fillText('imagen', 705, 250);
  for (let i = 0; i < 3; i++) { const fx = 60 + i * 300; x.fillStyle = '#f1f5f9'; x.fillRect(fx, 440, 260, 160); x.fillStyle = '#475569'; x.font = 'bold 18px system-ui,sans-serif'; x.fillText('Ventaja ' + (i + 1), fx + 22, 488); x.fillStyle = '#94a3b8'; x.font = '13px system-ui,sans-serif'; x.fillText('Texto descriptivo corto', fx + 22, 516); }
  return c.toDataURL('image/jpeg', 0.92);
}

const EXAMPLE: Analisis = {
  primera_impresion: { puntuacion: 6.1, mensaje_percibido: 'Parece una tienda de productos para el hogar, pero no queda claro qué la hace especial ni por qué comprar aquí.', veredicto: 'Limpia y ordenada, pero la imagen manda sobre el mensaje y la llamada a la acción casi no se ve.' },
  punto_focal: 'El titular y la imagen grande de la derecha se llevan casi toda la atención inicial.',
  claridad: 58, cta_visible: false,
  mapa_calor: [
    { x: 25, y: 26, r: 14, intensidad: 0.95, etiqueta: 'Titular' },
    { x: 73, y: 38, r: 17, intensidad: 0.82, etiqueta: 'Imagen hero' },
    { x: 10, y: 7, r: 7, intensidad: 0.5, etiqueta: 'Logo' },
    { x: 76, y: 7, r: 9, intensidad: 0.3, etiqueta: 'Menú' },
    { x: 14, y: 43, r: 7, intensidad: 0.22, etiqueta: 'Botón “Comprar” (poco visible)' },
    { x: 16, y: 80, r: 9, intensidad: 0.25, etiqueta: 'Ventajas' },
    { x: 50, y: 80, r: 9, intensidad: 0.2, etiqueta: 'Ventajas' },
  ],
  recorrido_visual: [{ x: 25, y: 26, que: 'Titular' }, { x: 73, y: 38, que: 'Imagen' }, { x: 50, y: 80, que: 'Ventajas' }],
  aciertos: ['El titular está bien colocado arriba a la izquierda, donde empieza la lectura', 'Estructura clara en tres columnas', 'Buen espacio en blanco, no agobia'],
  problemas: ['El botón “Comprar” tiene muy poco contraste y pasa desapercibido', 'La imagen pesa más que el mensaje: atrae la vista pero no comunica', 'No se entiende en 3 segundos qué vende exactamente ni su ventaja'],
  recomendaciones: ['Dale al botón un color de marca contrastado y más tamaño', 'Añade un subtítulo que diga en una frase qué vendes y para quién', 'Usa una imagen real de producto en vez de un bloque genérico'],
};

export default function RayosX() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [imgSrc, setImgSrc] = useState('');
  const [a, setA] = useState<Analisis | null>(null);
  const [error, setError] = useState('');
  const [isExample, setIsExample] = useState(false);
  const [showHeat, setShowHeat] = useState(true);
  const [showPath, setShowPath] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lead
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadPhase, setLeadPhase] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [leadName, setLeadName] = useState(''); const [leadEmail, setLeadEmail] = useState('');
  const [leadContacto, setLeadContacto] = useState(''); const [leadHp, setLeadHp] = useState(''); const [leadError, setLeadError] = useState('');

  function paint() {
    const canvas = canvasRef.current, img = imgRef.current;
    if (!canvas || !img || !a?.mapa_calor) return;
    const w = img.naturalWidth || 1000, h = img.naturalHeight || 650;
    canvas.width = w; canvas.height = h;
    drawHeatmap(canvas, a.mapa_calor);
  }
  useEffect(() => { if (phase === 'done') paint(); /* eslint-disable-next-line */ }, [phase, a]);

  async function onFiles(files: FileList | null) {
    if (!files || !files.length) return;
    const f = Array.from(files).find((x) => /^image\//.test(x.type));
    if (!f) return;
    setError(''); setIsExample(false); setPhase('loading');
    try {
      const src = await fileToDataURL(f);
      setImgSrc(src);
      const res = await fetch('/api/rayos-x/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: src }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo analizar.');
      setA((data as { analisis: Analisis }).analisis); setPhase('done');
    } catch (e) { setError(e instanceof Error ? e.message : 'Error inesperado.'); setPhase('error'); }
  }

  function showExample() {
    setError(''); setIsExample(true); setImgSrc(makeMock()); setA(EXAMPLE); setShowHeat(true); setShowPath(true); setPhase('done');
  }
  function reset() {
    setPhase('idle'); setImgSrc(''); setA(null); setError(''); setIsExample(false);
    setLeadOpen(false); setLeadPhase('idle'); setLeadName(''); setLeadEmail(''); setLeadContacto(''); setLeadError('');
  }

  async function submitLead(ev: FormEvent) {
    ev.preventDefault();
    if (!leadEmail.trim() && !leadContacto.trim()) { setLeadError('Déjanos un email o un teléfono/WhatsApp.'); return; }
    setLeadPhase('sending'); setLeadError('');
    const ctx = `Rayos X de atención · primera impresión ${a?.primera_impresion?.puntuacion ?? '—'}/10. Problemas: ${(a?.problemas || []).join(' · ')}. (Interesado en mejorar la web).`;
    try {
      const res = await fetch('/api/vera-lead/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadName, email: leadEmail, contacto: leadContacto, company_url: leadHp, source: 'rayosx', proposal: ctx, sector: 'Mejora web (Rayos X)', isExample }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo enviar.');
      setLeadPhase('sent'); setLeadOpen(false);
    } catch (err) { setLeadError(err instanceof Error ? err.message : 'Error.'); setLeadPhase('error'); }
  }

  /* ── IDLE ── */
  if (phase === 'idle') {
    return (
      <div className={styles.wrap}>
        <div className={styles.drop} role="button" tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.click(); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}>
          <span className={styles.dropIco} aria-hidden="true">🩻</span>
          <p className={styles.dropTitle}>Sube una captura de tu web (o la de tu competencia)</p>
          <p className={styles.dropSub}>La IA predice el mapa de calor de atención: dónde miran los ojos en los primeros segundos, qué se ve y qué pasa desapercibido.</p>
          <span className={styles.dropBtn}>Elegir captura</span>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => onFiles(e.target.files)} />
        </div>
        <div className={styles.exampleRow}>
          <span>¿Sin captura a mano?</span>
          <button className={styles.exampleBtn} onClick={showExample}>⚡ Ver ejemplo con una web de muestra</button>
        </div>
      </div>
    );
  }

  if (phase === 'loading') {
    return (
      <div className={styles.wrap}>
        <div className={styles.state}>
          {imgSrc && <img className={styles.loadingImg} src={imgSrc} alt="" />}
          <div className={styles.scan} aria-hidden="true" />
          <p>Escaneando la atención visual…</p>
          <span>Analizando jerarquía, contraste y recorrido de la mirada.</span>
        </div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className={styles.wrap}>
        <div className={styles.state}>
          <div className={styles.errIco} aria-hidden="true">!</div>
          <p>{error}</p>
          <button className={styles.ghost} onClick={reset}>← Volver</button>
        </div>
      </div>
    );
  }

  const pi = a?.primera_impresion || {};
  const score = Number(pi.puntuacion ?? 0);
  const scoreColor = score >= 7.5 ? '#33d17a' : score >= 5 ? '#ffce4d' : '#ff5c5c';
  const path = a?.recorrido_visual || [];

  return (
    <div className={styles.wrap}>
      <div className={styles.layout}>
        {/* Visor */}
        <div className={styles.viewer}>
          <div className={styles.stage}>
            <img ref={imgRef} className={styles.shot} src={imgSrc} alt="Captura analizada" onLoad={paint} />
            <canvas ref={canvasRef} className={styles.heat} style={{ opacity: showHeat ? 0.8 : 0 }} />
            {showPath && path.length > 0 && (
              <svg className={styles.path} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polyline points={path.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="1.5 1.2" vectorEffect="non-scaling-stroke" />
                {path.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="2.6" fill="#0b0f17" stroke="#18e0ff" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                    <text x={p.x} y={p.y} dy="0.9" textAnchor="middle" fontSize="3" fill="#18e0ff" fontWeight="700">{i + 1}</text>
                  </g>
                ))}
              </svg>
            )}
          </div>
          <div className={styles.toolbar}>
            <button className={`${styles.toggle} ${showHeat ? styles.on : ''}`} onClick={() => setShowHeat((v) => !v)}>🔥 Mapa de calor</button>
            <button className={`${styles.toggle} ${showPath ? styles.on : ''}`} onClick={() => setShowPath((v) => !v)}>👁️ Recorrido</button>
            <div className={styles.legend}><span>frío</span><i /><span>caliente</span></div>
          </div>
        </div>

        {/* Informe */}
        <div className={styles.report}>
          <div className={styles.scoreRow}>
            <div className={styles.gauge} style={{ borderColor: scoreColor, color: scoreColor }}>
              <b>{score.toFixed(1)}</b><small>/10</small>
            </div>
            <div className={styles.scoreInfo}>
              <span className={styles.scoreLabel}>Primera impresión</span>
              <p className={styles.verdict}>{pi.veredicto}</p>
              <div className={styles.bars}>
                <div className={styles.bar}><span>Claridad del mensaje</span><i><b style={{ width: `${a?.claridad ?? 0}%` }} /></i></div>
                <div className={styles.ctaFlag} data-ok={a?.cta_visible ? '1' : '0'}>{a?.cta_visible ? '✓ La llamada a la acción se ve' : '⚠ La llamada a la acción casi no se ve'}</div>
              </div>
            </div>
          </div>

          {pi.mensaje_percibido && (
            <div className={styles.perceived}>
              <span className={styles.kLabel}>👁️ Lo que se entiende en 3 segundos</span>
              <p>“{pi.mensaje_percibido}”</p>
            </div>
          )}

          <div className={styles.cols}>
            {!!a?.problemas?.length && (
              <div className={styles.col}>
                <span className={`${styles.kLabel} ${styles.bad}`}>⚠ Qué falla</span>
                <ul>{a.problemas.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            )}
            {!!a?.aciertos?.length && (
              <div className={styles.col}>
                <span className={`${styles.kLabel} ${styles.good}`}>✓ Qué funciona</span>
                <ul>{a.aciertos.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            )}
          </div>

          {!!a?.recomendaciones?.length && (
            <div className={styles.recs}>
              <span className={`${styles.kLabel} ${styles.tip}`}>💡 Cómo mejorarlo</span>
              <ul>{a.recomendaciones.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          )}

          {/* Lead */}
          {leadPhase === 'sent' ? (
            <div className={styles.leadDone}>✓ ¡Recibido! Te decimos cómo subir esa puntuación y mejorar la conversión de tu web.</div>
          ) : leadOpen ? (
            <form className={styles.lead} onSubmit={submitLead}>
              <b>📩 ¿Te lo dejamos a 10/10?</b>
              <p>Te pasamos un plan concreto para mejorar la atención y la conversión de tu web.</p>
              <div className={styles.leadRow}>
                <input placeholder="Nombre (opcional)" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                <input type="email" placeholder="Tu email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
                <input placeholder="WhatsApp / teléfono" value={leadContacto} onChange={(e) => setLeadContacto(e.target.value)} />
              </div>
              <input className={styles.hp} tabIndex={-1} aria-hidden="true" value={leadHp} onChange={(e) => setLeadHp(e.target.value)} />
              {leadError && <p className={styles.err}>{leadError}</p>}
              <button className={styles.primary} type="submit" disabled={leadPhase === 'sending'}>{leadPhase === 'sending' ? 'Enviando…' : 'Enviar →'}</button>
            </form>
          ) : (
            <button className={styles.leadCta} onClick={() => setLeadOpen(true)}>📩 Quiero que mejoréis la atención de mi web</button>
          )}

          <div className={styles.actions}>
            <button className={styles.ghost} onClick={reset}>↻ Analizar otra captura</button>
            <a className={styles.primary} href="/contacto/">Hablar con el equipo →</a>
          </div>
          <p className={styles.disc}>Predicción de IA basada en jerarquía visual y saliencia (no es eye-tracking real){isExample ? ' · ejemplo de muestra' : ''}. Orientativo.</p>
        </div>
      </div>
    </div>
  );
}
