import { useEffect, useRef, useState, type FormEvent, type ReactElement } from 'react';
import styles from './EstudioMarca.module.css';

/* "Estudio de Marca · IA" — orquestación multi-agente. El usuario describe su
   negocio y una "sala de agentes" (Estratega · Naming · Diseñador · Copy) trabaja
   en vivo y entrega un kit de marca: logo, paleta, tipografía, tono y copy. */

interface Color { nombre?: string; hex: string; uso?: string }
interface Kit {
  marca?: { nombre?: string; tagline?: string; monograma?: string; mark?: string };
  estrategia?: { posicionamiento?: string; publico?: string; personalidad?: string };
  naming?: { concepto?: string; alternativos?: string[] };
  paleta?: Color[];
  tipografia?: { titulares?: string; texto?: string; nota?: string };
  tono?: { adjetivos?: string[]; hacer?: string[]; evitar?: string[] };
  copy?: { titulares?: string[]; bio_corta?: string };
  agentes?: { estratega?: string; naming?: string; disenador?: string; copy?: string };
}

type Phase = 'form' | 'running' | 'done' | 'error';

const AGENTS = [
  { key: 'estratega', ico: '🧭', name: 'Estratega', role: 'Posicionamiento y público' },
  { key: 'naming', ico: '🏷️', name: 'Naming', role: 'Nombre y concepto' },
  { key: 'disenador', ico: '🎨', name: 'Diseñador', role: 'Paleta, tipografía y logo' },
  { key: 'copy', ico: '✍️', name: 'Copywriter', role: 'Tono, tagline y titulares' },
] as const;

const CHIPS = ['Restaurante de tapas', 'Tienda de ropa', 'Clínica dental', 'Cafetería de especialidad', 'Estudio de yoga', 'Inmobiliaria', 'Peluquería', 'Bodega de vino'];

const EXAMPLE: Kit = {
  marca: { nombre: 'Sal de Cabo', tagline: 'El sabor del Cabo de Gata, en tu mesa', monograma: 'SC', mark: 'wave' },
  estrategia: {
    posicionamiento: 'Restaurante de tapas de producto local en Níjar que reivindica la cocina del Cabo de Gata con un toque actual. Para quien quiere comer auténtico sin renunciar al diseño y la cercanía.',
    publico: 'Locales y turistas de 28-55 años que valoran el producto de cercanía y los sitios con carácter.',
    personalidad: 'El Explorador cercano, salado y vital.',
  },
  naming: {
    concepto: '«Sal de Cabo» evoca el mar, el sabor y la salida hacia el Cabo de Gata. Corto, sonoro y fácil de recordar.',
    alternativos: ['Levante Tapas', 'Marejada', 'Cabo Salado'],
  },
  paleta: [
    { nombre: 'Naranja Poniente', hex: '#FF6B35', uso: 'Principal / CTA' },
    { nombre: 'Negro Lava', hex: '#14110E', uso: 'Texto y fondos oscuros' },
    { nombre: 'Arena Cálida', hex: '#F5EFE3', uso: 'Fondos claros' },
    { nombre: 'Turquesa Mar', hex: '#1FA3A3', uso: 'Acento secundario' },
  ],
  tipografia: { titulares: 'Clash Display', texto: 'Inter', nota: 'Titulares con carácter y mucha personalidad, texto neutro y legible para la carta.' },
  tono: { adjetivos: ['Cercano', 'Fresco', 'Auténtico', 'Con salero'], hacer: ['Hablar de tú', 'Frases cortas y con chispa'], evitar: ['Tecnicismos de cocina', 'Postureo vacío'] },
  copy: {
    titulares: ['Tapas con el sabor del Cabo', 'Producto de aquí, cocina de ahora', 'Ven con hambre, vete con historia'],
    bio_corta: 'Cocina del Cabo de Gata en versión tapa. Producto local, fuego y mucho salero, en pleno corazón de Níjar.',
  },
  agentes: {
    estratega: 'He posicionado la marca en el producto local con un giro moderno: auténtico pero con diseño.',
    naming: 'Elegí «Sal de Cabo»: mar, sabor y el Cabo de Gata en tres sílabas fáciles de recordar.',
    disenador: 'Paleta de naranja poniente y turquesa de mar, con una marca tipo «ola» que respira costa.',
    copy: 'Tono con salero, frases cortas y titulares que dan hambre y cuentan historia.',
  },
};

/* ───────── helpers ───────── */
const lum = (hex: string) => {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};
function darkest(pal: Color[]): string { return pal.reduce((a, c) => (lum(c.hex) < lum(a.hex) ? c : a), pal[0]).hex; }
function lightest(pal: Color[]): string { return pal.reduce((a, c) => (lum(c.hex) > lum(a.hex) ? c : a), pal[0]).hex; }
function accent(pal: Color[], dark: string, light: string): string {
  return (pal.find((c) => c.hex !== dark && c.hex !== light) || pal[0]).hex;
}

/* Marca/logotipo: SVG limpio según la forma elegida por la IA. */
function Mark({ mark, color }: { mark?: string; color: string }) {
  const s = { stroke: color, fill: 'none', strokeWidth: 5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const f = { fill: color };
  const paths: Record<string, ReactElement> = {
    spark: <path d="M32 6 C36 22 42 28 58 32 C42 36 36 42 32 58 C28 42 22 36 6 32 C22 28 28 22 32 6 Z" {...f} />,
    wave: <g {...s}><path d="M8 26c6-8 12-8 18 0s12 8 18 0 6-8 12-4" /><path d="M8 40c6-8 12-8 18 0s12 8 18 0 6-8 12-4" /></g>,
    arc: <g {...s}><path d="M14 46a18 18 0 0 1 36 0" /><path d="M22 46a10 10 0 0 1 20 0" /><circle cx="32" cy="46" r="2.5" {...f} stroke="none" /></g>,
    orbit: <g {...s}><circle cx="32" cy="32" r="10" /><ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(-30 32 32)" /><circle cx="51" cy="20" r="4" {...f} stroke="none" /></g>,
    leaf: <g {...s}><path d="M16 48C16 28 32 14 50 14c0 20-14 34-34 34Z" /><path d="M22 42 44 22" /></g>,
    bolt: <path d="M36 6 16 36h12l-6 22 22-32H30l6-20Z" {...f} />,
    hex: <g {...s}><path d="M32 8 54 20v24L32 56 10 44V20L32 8Z" /><path d="M32 8v48M10 20l44 24M54 20 10 44" opacity=".35" /></g>,
    drop: <path d="M32 8C22 22 16 30 16 40a16 16 0 0 0 32 0C48 30 42 22 32 8Z" {...f} />,
    sun: <g {...s}><circle cx="32" cy="32" r="11" {...f} stroke="none" /><g><path d="M32 6v8M32 50v8M6 32h8M50 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" /></g></g>,
    monoline: <g {...s}><circle cx="32" cy="32" r="22" /><path d="M22 32h20M32 22v20" /></g>,
  };
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      {paths[mark || 'spark'] || paths.spark}
    </svg>
  );
}

export default function EstudioMarca() {
  const [phase, setPhase] = useState<Phase>('form');
  const [nombre, setNombre] = useState('');
  const [actividad, setActividad] = useState('');
  const [kit, setKit] = useState<Kit | null>(null);
  const [error, setError] = useState('');
  const [isExample, setIsExample] = useState(false);
  const [step, setStep] = useState(0);      // agentes revelados (0..4)
  const [spin, setSpin] = useState(0);      // agente "pensando" mientras se espera
  const [waiting, setWaiting] = useState(false);
  const [copied, setCopied] = useState('');

  // Lead
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadPhase, setLeadPhase] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadContacto, setLeadContacto] = useState('');
  const [leadHp, setLeadHp] = useState('');
  const [leadError, setLeadError] = useState('');

  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Ciclo de "pensando" mientras llega la respuesta
  useEffect(() => {
    if (!waiting) return;
    const id = window.setInterval(() => setSpin((s) => (s + 1) % AGENTS.length), 850);
    return () => clearInterval(id);
  }, [waiting]);

  function flash(w: string) { setCopied(w); setTimeout(() => setCopied(''), 1500); }
  function copy(text: string, w: string) { navigator.clipboard?.writeText(text).then(() => flash(w), () => { /* noop */ }); }

  function revealSequence(k: Kit) {
    setWaiting(false);
    setKit(k);
    [1, 2, 3, 4].forEach((n, i) => {
      timers.current.push(window.setTimeout(() => {
        setStep(n);
        if (n === 4) timers.current.push(window.setTimeout(() => setPhase('done'), 600));
      }, i * 650));
    });
  }

  async function generate(e?: FormEvent) {
    e?.preventDefault();
    if (!actividad.trim()) { setError('Cuéntanos a qué se dedica tu negocio.'); return; }
    setError(''); setIsExample(false); setKit(null); setStep(0); setSpin(0);
    setPhase('running'); setWaiting(true);
    try {
      const res = await fetch('/api/estudio-marca/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), actividad: actividad.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo crear la marca.');
      revealSequence((data as { kit: Kit }).kit);
    } catch (err) {
      setWaiting(false);
      setError(err instanceof Error ? err.message : 'Error inesperado.');
      setPhase('error');
    }
  }

  function showExample() {
    setIsExample(true); setError(''); setKit(EXAMPLE); setStep(0); setSpin(0);
    setPhase('running'); setWaiting(false);
    revealSequence(EXAMPLE);
  }

  function reset() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setPhase('form'); setKit(null); setStep(0); setWaiting(false); setIsExample(false);
    setLeadOpen(false); setLeadPhase('idle'); setLeadName(''); setLeadEmail(''); setLeadContacto(''); setLeadError('');
  }

  async function submitLead(ev: FormEvent) {
    ev.preventDefault();
    if (!leadEmail.trim() && !leadContacto.trim()) { setLeadError('Déjanos un email o un teléfono/WhatsApp.'); return; }
    setLeadPhase('sending'); setLeadError('');
    const ctx = `Marca generada: ${kit?.marca?.nombre || '—'} · ${kit?.marca?.tagline || ''}. Actividad: ${actividad || '(ejemplo)'} (interesado en identidad de marca).`;
    try {
      const res = await fetch('/api/vera-lead/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadName, email: leadEmail, contacto: leadContacto, company_url: leadHp, source: 'marca', proposal: ctx, sector: 'Identidad de marca', isExample }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo enviar.');
      setLeadPhase('sent'); setLeadOpen(false);
    } catch (err) { setLeadError(err instanceof Error ? err.message : 'Error.'); setLeadPhase('error'); }
  }

  function exportPDF() {
    if (!kit) return;
    const m = kit.marca || {}, e = kit.estrategia || {}, t = kit.tipografia || {}, to = kit.tono || {}, c = kit.copy || {};
    const pal = kit.paleta || [];
    const esc = (s: unknown) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const dark = pal.length ? darkest(pal) : '#14110E';
    const swatches = pal.map((col) => `<div style="flex:1;min-width:90px"><div style="height:54px;border-radius:8px;background:${esc(col.hex)};border:1px solid #0001"></div><b style="font-size:12px;display:block;margin-top:4px">${esc(col.nombre)}</b><span style="font-size:11px;color:#666">${esc(col.hex)} · ${esc(col.uso)}</span></div>`).join('');
    const w = window.open('', '_blank'); if (!w) return;
    w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(m.nombre)} · Manual de marca</title>
<style>body{font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;color:#1a1714;max-width:760px;margin:40px auto;padding:0 24px;line-height:1.55}.brand{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#FF6B35;font-weight:800}h1{font-size:32px;margin:.2rem 0}.tag{color:#555;font-size:16px;font-style:italic}h2{font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:${esc(dark)};margin:1.6rem 0 .4rem;border-bottom:2px solid #eee;padding-bottom:4px}.row{display:flex;gap:10px;flex-wrap:wrap}.chip{display:inline-block;background:#f1efe9;border-radius:999px;padding:3px 10px;margin:2px;font-size:12px}.foot{margin-top:2rem;border-top:1px solid #e5ddcf;padding-top:1rem;font-size:11px;color:#888}</style></head><body>
<div class="brand">✦ Estudio de Marca IA · platanitorico.com</div>
<h1>${esc(m.nombre)}</h1><p class="tag">${esc(m.tagline)}</p>
<h2>Posicionamiento</h2><p>${esc(e.posicionamiento)}</p>
<p style="font-size:13px;color:#555"><b>Público:</b> ${esc(e.publico)}<br><b>Personalidad:</b> ${esc(e.personalidad)}</p>
<h2>Paleta de color</h2><div class="row">${swatches}</div>
<h2>Tipografía</h2><p><b>Titulares:</b> ${esc(t.titulares)} · <b>Texto:</b> ${esc(t.texto)}<br><span style="font-size:13px;color:#555">${esc(t.nota)}</span></p>
<h2>Tono de voz</h2><div>${(to.adjetivos || []).map((a) => `<span class="chip">${esc(a)}</span>`).join('')}</div>
<p style="font-size:13px;color:#555"><b>Sí:</b> ${(to.hacer || []).map(esc).join(' · ')}<br><b>No:</b> ${(to.evitar || []).map(esc).join(' · ')}</p>
<h2>Copy de ejemplo</h2><ul>${(c.titulares || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul><p style="font-size:13px;color:#555"><em>${esc(c.bio_corta)}</em></p>
<div class="foot">Identidad generada por IA con fines de demostración · Platanito Rico, Almería.</div>
</body></html>`);
    w.document.close(); w.focus(); setTimeout(() => w.print(), 350);
  }

  /* ───────── FORM ───────── */
  if (phase === 'form') {
    return (
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={generate}>
          <label className={styles.field}>
            <span>¿A qué se dedica tu negocio? <i>*</i></span>
            <input value={actividad} onChange={(ev) => setActividad(ev.target.value)} placeholder="Ej: Restaurante de tapas de producto local en Níjar" maxLength={200} />
          </label>
          <div className={styles.chips}>
            {CHIPS.map((c) => <button type="button" key={c} className={styles.chip} onClick={() => setActividad(c)}>{c}</button>)}
          </div>
          <label className={styles.field}>
            <span>Nombre de la marca <em>(si ya lo tienes — opcional)</em></span>
            <input value={nombre} onChange={(ev) => setNombre(ev.target.value)} placeholder="Déjalo vacío y la IA te propone uno" maxLength={60} />
          </label>
          {error && <p className={styles.err}>{error}</p>}
          <div className={styles.formBtns}>
            <button type="submit" className={styles.primary}>🎛️ Crear identidad de marca</button>
            <button type="button" className={styles.ghost} onClick={showExample}>⚡ Ver un ejemplo</button>
          </div>
          <p className={styles.hint}>4 agentes de IA trabajan en equipo: estrategia, naming, diseño y copy. Tarda unos segundos.</p>
        </form>
      </div>
    );
  }

  const pal = kit?.paleta || EXAMPLE.paleta!;
  const dark = darkest(pal), light = lightest(pal), acc = accent(pal, dark, light);

  return (
    <div className={styles.wrap}>
      {/* SALA DE AGENTES */}
      <div className={styles.studio}>
        <div className={styles.studioHead}>
          <span className={styles.live}><i />{phase === 'done' ? 'Equipo · completado' : 'Sala de agentes · en vivo'}</span>
          {isExample && <span className={styles.exTag}>Ejemplo</span>}
        </div>
        <div className={styles.agents}>
          {AGENTS.map((a, i) => {
            const status = i < step ? 'done' : (waiting ? (i === spin ? 'work' : 'idle') : (i === step ? 'work' : 'idle'));
            const log = i < step ? (kit?.agentes as Record<string, string> | undefined)?.[a.key] : null;
            return (
              <div key={a.key} className={`${styles.agent} ${styles['ag_' + status]}`}>
                <span className={styles.agIco}>{a.ico}</span>
                <div className={styles.agBody}>
                  <b>{a.name}</b>
                  <span className={styles.agRole}>{status === 'work' ? 'Trabajando…' : status === 'done' ? '✓ Listo' : a.role}</span>
                  {log && <p className={styles.agLog}>{log}</p>}
                </div>
                {status === 'work' && <span className={styles.agDots}><i /><i /><i /></span>}
              </div>
            );
          })}
        </div>
      </div>

      {phase === 'error' && (
        <div className={styles.state}>
          <div className={styles.errIco}>!</div>
          <p>{error}</p>
          <button className={styles.ghost} onClick={reset}>← Volver a intentarlo</button>
        </div>
      )}

      {/* KIT DE MARCA */}
      {phase === 'done' && kit && (
        <div className={styles.kit}>
          {/* Logo en dos fondos */}
          <div className={styles.logos}>
            <div className={styles.logoCard} style={{ background: light, color: dark }}>
              <span className={styles.logoMark} style={{ background: acc }}><Mark mark={kit.marca?.mark} color={light} /></span>
              <div>
                <span className={styles.logoName}>{kit.marca?.nombre}</span>
                <span className={styles.logoTag} style={{ color: acc }}>{kit.marca?.tagline}</span>
              </div>
            </div>
            <div className={styles.logoCard} style={{ background: dark, color: light }}>
              <span className={styles.logoMark} style={{ background: acc }}><Mark mark={kit.marca?.mark} color={dark} /></span>
              <div>
                <span className={styles.logoName}>{kit.marca?.nombre}</span>
                <span className={styles.logoTag} style={{ color: acc }}>{kit.marca?.tagline}</span>
              </div>
            </div>
            <button className={styles.monoChip} onClick={() => copy(kit.marca?.nombre || '', 'name')} title="Copiar nombre">
              <span className={styles.mono} style={{ background: acc, color: light }}>{kit.marca?.monograma}</span>
              {copied === 'name' ? '✓ copiado' : 'Monograma'}
            </button>
          </div>

          <div className={styles.grid}>
            {/* Estrategia */}
            <article className={styles.card}>
              <span className={styles.cardLabel}>🧭 Estrategia</span>
              <p className={styles.posit}>{kit.estrategia?.posicionamiento}</p>
              <div className={styles.kv}><b>Público</b><span>{kit.estrategia?.publico}</span></div>
              <div className={styles.kv}><b>Personalidad</b><span>{kit.estrategia?.personalidad}</span></div>
            </article>

            {/* Naming */}
            <article className={styles.card}>
              <span className={styles.cardLabel}>🏷️ Naming</span>
              <p className={styles.concept}>{kit.naming?.concepto}</p>
              {!!kit.naming?.alternativos?.length && (
                <div className={styles.alts}>
                  <span>Alternativas:</span>
                  {kit.naming.alternativos.map((n, i) => <button key={i} className={styles.alt} onClick={() => copy(n, 'alt' + i)}>{copied === 'alt' + i ? '✓' : n}</button>)}
                </div>
              )}
            </article>

            {/* Paleta */}
            <article className={`${styles.card} ${styles.cardWide}`}>
              <span className={styles.cardLabel}>🎨 Paleta de color</span>
              <div className={styles.palette}>
                {pal.map((c, i) => (
                  <button key={i} className={styles.swatch} onClick={() => copy(c.hex, 'sw' + i)} title={`Copiar ${c.hex}`}>
                    <span className={styles.swColor} style={{ background: c.hex }} />
                    <b>{copied === 'sw' + i ? '✓ copiado' : c.nombre}</b>
                    <code>{c.hex}</code>
                    <small>{c.uso}</small>
                  </button>
                ))}
              </div>
            </article>

            {/* Tipografía */}
            <article className={styles.card}>
              <span className={styles.cardLabel}>🔠 Tipografía</span>
              <p className={styles.typeBig} style={{ fontFamily: 'var(--font-display, sans-serif)' }}>{kit.tipografia?.titulares}</p>
              <p className={styles.typeSub}>Titulares</p>
              <p className={styles.typeBody}>{kit.tipografia?.texto} · texto</p>
              {kit.tipografia?.nota && <p className={styles.typeNote}>{kit.tipografia.nota}</p>}
            </article>

            {/* Tono */}
            <article className={styles.card}>
              <span className={styles.cardLabel}>🗣️ Tono de voz</span>
              <div className={styles.tags}>{(kit.tono?.adjetivos || []).map((a, i) => <span key={i} style={{ borderColor: acc, color: acc }}>{a}</span>)}</div>
              {!!kit.tono?.hacer?.length && <p className={styles.doDont}><b className={styles.yes}>Sí</b> {kit.tono.hacer.join(' · ')}</p>}
              {!!kit.tono?.evitar?.length && <p className={styles.doDont}><b className={styles.no}>No</b> {kit.tono.evitar.join(' · ')}</p>}
            </article>

            {/* Copy */}
            <article className={`${styles.card} ${styles.cardWide}`}>
              <span className={styles.cardLabel}>✍️ Copy de ejemplo</span>
              <ul className={styles.heads}>
                {(kit.copy?.titulares || []).map((h, i) => <li key={i} onClick={() => copy(h, 'h' + i)}>{copied === 'h' + i ? '✓ copiado' : h}</li>)}
              </ul>
              {kit.copy?.bio_corta && <p className={styles.bio}>{kit.copy.bio_corta}</p>}
            </article>
          </div>

          {/* Lead */}
          {leadPhase === 'sent' ? (
            <div className={styles.leadDone}>✓ ¡Recibido! Te contactamos para llevar esta marca al mundo real (logo final, web y aplicaciones).</div>
          ) : leadOpen ? (
            <form className={styles.lead} onSubmit={submitLead}>
              <b>📩 ¿La hacemos de verdad?</b>
              <p>Te entregamos el logo en vectorial, el manual de marca y la web. Déjanos tus datos.</p>
              <div className={styles.leadRow}>
                <input placeholder="Nombre (opcional)" value={leadName} onChange={(ev) => setLeadName(ev.target.value)} />
                <input type="email" placeholder="Tu email" value={leadEmail} onChange={(ev) => setLeadEmail(ev.target.value)} />
                <input placeholder="WhatsApp / teléfono" value={leadContacto} onChange={(ev) => setLeadContacto(ev.target.value)} />
              </div>
              <input className={styles.hp} tabIndex={-1} aria-hidden="true" value={leadHp} onChange={(ev) => setLeadHp(ev.target.value)} />
              {leadError && <p className={styles.err}>{leadError}</p>}
              <button className={styles.primary} type="submit" disabled={leadPhase === 'sending'}>{leadPhase === 'sending' ? 'Enviando…' : 'Enviar →'}</button>
            </form>
          ) : (
            <button className={styles.leadCta} onClick={() => setLeadOpen(true)}>📩 Quiero esta marca de verdad (logo + manual + web)</button>
          )}

          <div className={styles.actions}>
            <button className={styles.ghost} onClick={reset}>↻ Crear otra marca</button>
            <button className={styles.ghost} onClick={exportPDF}>⬇ Descargar manual (PDF)</button>
            <a className={styles.primary} href="/contacto/">Hablar con el estudio →</a>
          </div>
          <p className={styles.disc}>Identidad {isExample ? 'de ejemplo ' : ''}generada por IA con fines de demostración. El diseño final lo afinamos a mano.</p>
        </div>
      )}
    </div>
  );
}
