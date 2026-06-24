import { useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './MaquinaTiempo.module.css';

/* "Máquina del Tiempo de Marca" — la IA genera el contenido de la web del negocio
   en 4 épocas y aquí se renderiza cada una con su estética real (1995 GeoCities,
   2010 web 2.0, 2026 minimal, 2035 futurista), con un viaje animado en el tiempo. */

interface Epoca { anio: string; titular: string; subtitulo: string; cta: string; nav: string[]; detalle: string; color: string }
interface Kit { nombre: string; dominio: string; epocas: Epoca[]; comentario: string }
type Phase = 'form' | 'loading' | 'done' | 'error';

const CHIPS = ['Bar de tapas', 'Tienda de ropa', 'Peluquería', 'Inmobiliaria', 'Cafetería', 'Gimnasio', 'Floristería', 'Taller mecánico'];
const ANIOS = ['1995', '2010', '2026', '2035'];

const EXAMPLE: Kit = {
  nombre: 'El Rincón', dominio: 'elrincon',
  epocas: [
    { anio: '1995', titular: '¡Bienvenidos a la página web de El Rincón!', subtitulo: 'Su bar de tapas de confianza en Níjar, ahora también en Internet.', cta: 'Firmar el libro de visitas', nav: ['Inicio', 'Nosotros', 'La Carta', 'Libro de visitas', 'Contacto'], detalle: 'Visitas: 000042 · Última actualización: 12/03/1995', color: '#000080' },
    { anio: '2010', titular: 'El Rincón · Tapas con alma en Níjar', subtitulo: '¡Ya estamos en Facebook! Hazte fan y entérate de las tapas del día.', cta: 'Síguenos en Facebook', nav: ['Inicio', 'Blog', 'Galería', 'Eventos', 'Contacto'], detalle: '❤ 1.243 Me gusta · 320 personas hablan de esto', color: '#1b9de2' },
    { anio: '2026', titular: 'Las mejores tapas de Níjar, recién hechas', subtitulo: 'Producto local y cocina de siempre. Reserva tu mesa en 10 segundos.', cta: 'Reservar mesa', nav: ['Inicio', 'Carta', 'Reservar', 'Nosotros'], detalle: '★★★★★ 4,9 en Google · +600 reseñas', color: '#FF6B35' },
    { anio: '2035', titular: 'Tu mesa te espera, justo como te gusta', subtitulo: 'Nuestro asistente IA recuerda tus tapas favoritas y te sugiere maridaje. Pruébalo en realidad aumentada.', cta: 'Hablar con el asistente', nav: ['Inicio', 'Experiencia', 'IA', 'Contacto'], detalle: '✦ Asistente IA activo · menú en realidad aumentada', color: '#18e0ff' },
  ],
  comentario: 'De firmar el libro de visitas a que la IA te recuerde que te encanta el salmorejo. El Rincón siempre supo de tapas; ahora también sabe de ti.',
};

function urlFor(anio: string, dominio: string): string {
  if (anio === '1995') return `http://www.geocities.com/${dominio}`;
  if (anio === '2010') return `http://www.${dominio}.es`;
  if (anio === '2026') return `https://${dominio}.es`;
  return `${dominio}.ai`;
}

export default function MaquinaTiempo() {
  const [phase, setPhase] = useState<Phase>('form');
  const [nombre, setNombre] = useState('');
  const [actividad, setActividad] = useState('');
  const [kit, setKit] = useState<Kit | null>(null);
  const [error, setError] = useState('');
  const [isExample, setIsExample] = useState(false);
  const [idx, setIdx] = useState(0);
  const [traveling, setTraveling] = useState(false);

  // Lead
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadPhase, setLeadPhase] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [leadName, setLeadName] = useState(''); const [leadEmail, setLeadEmail] = useState('');
  const [leadContacto, setLeadContacto] = useState(''); const [leadHp, setLeadHp] = useState(''); const [leadError, setLeadError] = useState('');

  const timers = useRef<number[]>([]);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  function travel(from = 0) {
    clearTimers(); setTraveling(true); setIdx(from);
    for (let i = from + 1; i < 4; i++) {
      timers.current.push(window.setTimeout(() => { setIdx(i); if (i === 3) setTraveling(false); }, (i - from) * 1100));
    }
    if (from >= 3) setTraveling(false);
  }

  async function generate(e?: FormEvent) {
    e?.preventDefault();
    if (!actividad.trim()) { setError('Cuéntanos a qué se dedica tu negocio.'); return; }
    setError(''); setIsExample(false); setKit(null); setPhase('loading');
    try {
      const res = await fetch('/api/maquina-tiempo/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), actividad: actividad.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo viajar en el tiempo.');
      setKit((data as { kit: Kit }).kit); setPhase('done'); travel(0);
    } catch (err) { setError(err instanceof Error ? err.message : 'Error inesperado.'); setPhase('error'); }
  }

  function showExample() { setError(''); setIsExample(true); setKit(EXAMPLE); setPhase('done'); travel(0); }
  function reset() {
    clearTimers(); setPhase('form'); setKit(null); setIdx(0); setTraveling(false); setIsExample(false);
    setLeadOpen(false); setLeadPhase('idle'); setLeadName(''); setLeadEmail(''); setLeadContacto(''); setLeadError('');
  }

  async function submitLead(ev: FormEvent) {
    ev.preventDefault();
    if (!leadEmail.trim() && !leadContacto.trim()) { setLeadError('Déjanos un email o un teléfono/WhatsApp.'); return; }
    setLeadPhase('sending'); setLeadError('');
    const ctx = `Máquina del tiempo · marca "${kit?.nombre}" (${actividad || 'ejemplo'}). Interesado en su web del futuro.`;
    try {
      const res = await fetch('/api/vera-lead/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadName, email: leadEmail, contacto: leadContacto, company_url: leadHp, source: 'tiempo', proposal: ctx, sector: 'Web a medida', isExample }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo enviar.');
      setLeadPhase('sent'); setLeadOpen(false);
    } catch (err) { setLeadError(err instanceof Error ? err.message : 'Error.'); setLeadPhase('error'); }
  }

  /* ── FORM ── */
  if (phase === 'form') {
    return (
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={generate}>
          <label className={styles.field}>
            <span>¿A qué se dedica tu negocio? <i>*</i></span>
            <input value={actividad} onChange={(e) => setActividad(e.target.value)} placeholder="Ej: Bar de tapas en Níjar" maxLength={160} />
          </label>
          <div className={styles.chips}>
            {CHIPS.map((c) => <button type="button" key={c} className={styles.chip} onClick={() => setActividad(c)}>{c}</button>)}
          </div>
          <label className={styles.field}>
            <span>Nombre de la marca <em>(opcional)</em></span>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Déjalo vacío y la IA te propone uno" maxLength={60} />
          </label>
          {error && <p className={styles.err}>{error}</p>}
          <div className={styles.formBtns}>
            <button type="submit" className={styles.primary}>⏳ Viajar en el tiempo</button>
            <button type="button" className={styles.ghost} onClick={showExample}>⚡ Ver un ejemplo</button>
          </div>
          <p className={styles.hint}>La IA imaginará tu web en 1995, 2010, hoy y 2035.</p>
        </form>
      </div>
    );
  }

  if (phase === 'loading') {
    return (
      <div className={styles.wrap}>
        <div className={styles.state}>
          <div className={styles.machine} aria-hidden="true"><span /><span /><span /></div>
          <p>Calibrando la máquina del tiempo…</p>
          <span>Reconstruyendo tu marca a lo largo de las décadas.</span>
        </div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className={styles.wrap}>
        <div className={styles.state}>
          <div className={styles.errIco}>!</div><p>{error}</p>
          <button className={styles.ghost} onClick={reset}>← Volver</button>
        </div>
      </div>
    );
  }

  const ep = kit!.epocas[idx];
  const url = urlFor(ep.anio, kit!.dominio);

  return (
    <div className={styles.wrap}>
      {/* Línea temporal */}
      <div className={styles.timeline}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${(idx / 3) * 100}%` }} />
          {kit!.epocas.map((e, i) => (
            <button key={e.anio} className={`${styles.stop} ${i === idx ? styles.stopOn : ''} ${i <= idx ? styles.stopPast : ''}`} style={{ left: `${(i / 3) * 100}%` }} onClick={() => { clearTimers(); setTraveling(false); setIdx(i); }}>
              <span className={styles.stopDot} />
              <span className={styles.stopYear}>{e.anio}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ventana del navegador */}
      <div className={`${styles.browser} ${styles['skin' + ep.anio]}`}>
        <div className={styles.chrome}>
          <span className={styles.dots}><i /><i /><i /></span>
          <span className={styles.address}>{url}</span>
          {traveling && <span className={styles.travelTag}>viajando…</span>}
        </div>
        <div className={styles.viewport} key={ep.anio}>
          {ep.anio === '1995' && <Scene95 ep={ep} nombre={kit!.nombre} />}
          {ep.anio === '2010' && <Scene10 ep={ep} nombre={kit!.nombre} />}
          {ep.anio === '2026' && <Scene26 ep={ep} nombre={kit!.nombre} />}
          {ep.anio === '2035' && <Scene35 ep={ep} nombre={kit!.nombre} />}
        </div>
      </div>

      <div className={styles.toolbar}>
        <button className={styles.navBtn} onClick={() => { clearTimers(); setTraveling(false); setIdx((v) => Math.max(0, v - 1)); }} disabled={idx === 0}>← Antes</button>
        <button className={styles.replay} onClick={() => travel(0)}>▶ Viajar en el tiempo</button>
        <button className={styles.navBtn} onClick={() => { clearTimers(); setTraveling(false); setIdx((v) => Math.min(3, v + 1)); }} disabled={idx === 3}>Después →</button>
      </div>

      {kit!.comentario && <p className={styles.comment}>“{kit!.comentario}”</p>}

      {/* Lead */}
      {leadPhase === 'sent' ? (
        <div className={styles.leadDone}>✓ ¡Recibido! Te montamos tu web del 2026 (o del 2035 😉) de verdad.</div>
      ) : leadOpen ? (
        <form className={styles.lead} onSubmit={submitLead}>
          <b>📩 Quiero mi web del futuro</b>
          <p>Te montamos la versión moderna —la de hoy o la del 2035— lista para vender. Déjanos tus datos.</p>
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
        <button className={styles.leadCta} onClick={() => setLeadOpen(true)}>📩 Quiero esta web (la de hoy o la del futuro)</button>
      )}

      <div className={styles.actions}>
        <button className={styles.ghost} onClick={reset}>↻ Otra marca</button>
        <a className={styles.primary} href="/contacto/">Hablar con el equipo →</a>
      </div>
      <p className={styles.disc}>Recreación generada por IA con fines de demostración{isExample ? ' · ejemplo de muestra' : ''}.</p>
    </div>
  );
}

/* ───────── Escenas por época ───────── */
function Scene95({ ep, nombre }: { ep: Epoca; nombre: string }) {
  return (
    <div className={styles.s95}>
      <div className={styles.s95marquee}><span>🚧 Página en construcción · {ep.detalle || 'Bienvenido a nuestra web'} 🚧</span></div>
      <h1 className={styles.s95h1} style={{ color: ep.color }}>{ep.titular}</h1>
      <nav className={styles.s95nav}>{(ep.nav.length ? ep.nav : ['Inicio', 'Nosotros', 'Contacto']).map((n, i) => <span key={i}>[ {n} ]</span>)}</nav>
      <hr className={styles.s95hr} />
      <p className={styles.s95sub}>{ep.subtitulo}</p>
      <p className={styles.s95cta}><span className={styles.s95blink}>►</span> <u>{ep.cta}</u> <span className={styles.s95blink}>◄</span></p>
      <div className={styles.s95counter}><b>Visitas:</b> <code>00042</code></div>
      <p className={styles.s95foot}>Mejor visto en Netscape Navigator a 800×600 · © {nombre} 1995</p>
    </div>
  );
}
function Scene10({ ep, nombre }: { ep: Epoca; nombre: string }) {
  return (
    <div className={styles.s10}>
      <header className={styles.s10bar} style={{ background: `linear-gradient(#3aa9ef, ${ep.color})` }}>
        <b>{nombre}</b>
        <nav>{(ep.nav.length ? ep.nav : ['Inicio', 'Blog', 'Contacto']).map((n, i) => <span key={i}>{n}</span>)}</nav>
      </header>
      <div className={styles.s10body}>
        <h1 className={styles.s10h1}>{ep.titular}</h1>
        <p className={styles.s10sub}>{ep.subtitulo}</p>
        <button className={styles.s10btn} style={{ background: `linear-gradient(#ffffff55, ${ep.color})`, borderColor: ep.color }}>{ep.cta}</button>
        <div className={styles.s10social}>
          <span className={styles.s10fb}>f Facebook</span><span className={styles.s10tw}>t Twitter</span>
          <span className={styles.s10likes}>{ep.detalle || '❤ 1.2k Me gusta'}</span>
        </div>
      </div>
    </div>
  );
}
function Scene26({ ep, nombre }: { ep: Epoca; nombre: string }) {
  return (
    <div className={styles.s26}>
      <header className={styles.s26nav}>
        <b>{nombre}</b>
        <nav>{(ep.nav.length ? ep.nav : ['Inicio', 'Servicios', 'Contacto']).map((n, i) => <span key={i}>{n}</span>)}</nav>
      </header>
      <div className={styles.s26hero}>
        <h1 className={styles.s26h1}>{ep.titular}</h1>
        <p className={styles.s26sub}>{ep.subtitulo}</p>
        <div className={styles.s26row}>
          <button className={styles.s26btn} style={{ background: ep.color }}>{ep.cta}</button>
          <span className={styles.s26trust}>{ep.detalle || '★★★★★ 4,9'}</span>
        </div>
      </div>
    </div>
  );
}
function Scene35({ ep, nombre }: { ep: Epoca; nombre: string }) {
  return (
    <div className={styles.s35}>
      <div className={styles.s35glow} aria-hidden="true" />
      <header className={styles.s35nav}>
        <b>{nombre}</b>
        <span className={styles.s35chip} style={{ borderColor: ep.color, color: ep.color }}>✦ IA</span>
      </header>
      <div className={styles.s35body}>
        <h1 className={styles.s35h1} style={{ backgroundImage: `linear-gradient(120deg, #fff, ${ep.color})` }}>{ep.titular}</h1>
        <p className={styles.s35sub}>{ep.subtitulo}</p>
        <button className={styles.s35btn} style={{ boxShadow: `0 0 30px -4px ${ep.color}`, borderColor: ep.color }}>{ep.cta}</button>
        <p className={styles.s35detail}>{ep.detalle}</p>
      </div>
    </div>
  );
}
