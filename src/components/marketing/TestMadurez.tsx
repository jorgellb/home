import { useMemo, useState } from 'react';
import styles from './Herramientas.module.css';

/* Test de madurez digital — 10 preguntas autoevaluadas, puntuación local.
   No hay modelo de IA detrás: es un cuestionario con pesos fijos, y el
   resultado depende solo de lo que responde el usuario. El lead se envía
   al mismo endpoint que el resto de demos (/api/vera-lead/). */

type Cat = 'Medición' | 'Captación' | 'Conversión' | 'Seguimiento' | 'Reputación';
type Valor = 0 | 5 | 10;

interface Pregunta { q: string; cat: Cat; ayuda: string }

const PREGUNTAS: Pregunta[] = [
  { q: '¿Tienes GA4 configurado y revisas los datos?',                cat: 'Medición',    ayuda: 'Instalado y con eventos propios, no solo el código pegado.' },
  { q: '¿Mides envíos de formulario, llamadas y clics a WhatsApp?',   cat: 'Medición',    ayuda: 'Cada vía de contacto registrada como conversión.' },
  { q: '¿Sabes cuánto te cuesta conseguir un cliente nuevo?',         cat: 'Medición',    ayuda: 'El CAC real, no el coste por clic.' },
  { q: '¿Usas un CRM donde queda registrado cada contacto?',          cat: 'Seguimiento', ayuda: 'Aunque sea sencillo, pero que no se pierda nada en WhatsApp.' },
  { q: '¿Haces remarketing a quien ya visitó tu web?',                cat: 'Captación',   ayuda: 'Audiencias de recuperación en Google o Meta.' },
  { q: '¿Trabajas keywords de intención de compra, no solo de marca?', cat: 'Captación',  ayuda: '"Presupuesto de X" o "comprar X", no solo tu nombre.' },
  { q: '¿Tienes automatizaciones tras un nuevo contacto?',            cat: 'Seguimiento', ayuda: 'Un aviso al comercial, un email de bienvenida, un recordatorio.' },
  { q: '¿Revisas las campañas al menos una vez por semana?',          cat: 'Captación',   ayuda: 'Términos de búsqueda, negativas, presupuesto, creatividades.' },
  { q: '¿Tu ficha de Google recibe reseñas nuevas cada mes?',         cat: 'Reputación',  ayuda: 'Flujo constante, no diez reseñas de hace tres años.' },
  { q: '¿Tienes landing pages específicas por servicio o campaña?',   cat: 'Conversión',  ayuda: 'No mandar todo el tráfico a la portada.' },
];

const CATS: Cat[] = ['Medición', 'Captación', 'Conversión', 'Seguimiento', 'Reputación'];

const COLOR: Record<Cat, string> = {
  'Medición': '#18e0ff',
  'Captación': '#c6ff3a',
  'Conversión': '#ffb24d',
  'Seguimiento': '#9b7bff',
  'Reputación': '#5eead4',
};

const DIAGNOSTICO: Record<Cat, string> = {
  'Medición': 'No sabes qué parte de tu inversión genera negocio. Sin eso, optimizar es adivinar: se acaba recortando lo que funciona y manteniendo lo que no.',
  'Captación': 'Estás dejando demanda sin recoger. Hay gente buscando exactamente lo que vendes que hoy termina en la competencia.',
  'Conversión': 'Traes visitas pero se te caen antes de contactar. Subir la conversión es más barato que comprar más tráfico.',
  'Seguimiento': 'Los contactos entran pero se enfrían. La mayoría de ventas perdidas en negocio local no se pierden por precio, sino por tardar en responder.',
  'Reputación': 'Tu prueba social no acompaña. En decisiones locales, las reseñas pesan tanto como el precio.',
};

export default function TestMadurez() {
  const [resp, setResp] = useState<Record<number, Valor>>({});
  const [enviado, setEnviado] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [fase, setFase] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  const contestadas = Object.keys(resp).length;
  const completo = contestadas === PREGUNTAS.length;

  const r = useMemo(() => {
    const total = PREGUNTAS.reduce((a, _, i) => a + (resp[i] ?? 0), 0);
    const porCat = CATS.map((cat) => {
      const idx = PREGUNTAS.map((p, i) => (p.cat === cat ? i : -1)).filter((i) => i >= 0);
      const max = idx.length * 10;
      const suma = idx.reduce((a, i) => a + (resp[i] ?? 0), 0);
      return { cat, pct: max ? Math.round((suma / max) * 100) : 0, max, suma };
    });
    const fuga = [...porCat].sort((a, b) => a.pct - b.pct)[0];
    let nivel = 'Inicial';
    if (total >= 80) nivel = 'Avanzado';
    else if (total >= 60) nivel = 'Consolidado';
    else if (total >= 35) nivel = 'En desarrollo';
    return { total, porCat, fuga, nivel };
  }, [resp]);

  async function enviarLead(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) { setError('Necesitamos nombre y email.'); return; }
    setFase('enviando'); setError('');
    const detalle = r.porCat.map((c) => `${c.cat}: ${c.pct}%`).join(' · ');
    const ctx = `Test de madurez digital — puntuación ${r.total}/100 (${r.nivel}). Principal fuga: ${r.fuga.cat}. Desglose: ${detalle}. Respuestas: ${PREGUNTAS.map((p, i) => `${p.q} → ${resp[i] === 10 ? 'Sí' : resp[i] === 5 ? 'Parcialmente' : 'No'}`).join(' | ')}`;
    try {
      const res = await fetch('/api/vera-lead/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre, email, company_url: hp,
          source: 'test-madurez', sector: 'Diagnóstico de marketing',
          proposal: ctx,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo enviar.');
      setFase('ok'); setLeadOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar.');
      setFase('error');
    }
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <p className={styles.kicker}>Diagnóstico · 2 minutos</p>
        <h2 className={styles.title}>¿Por dónde se te está escapando el negocio?</h2>
        <p className={styles.sub}>
          Diez preguntas sobre cómo captas y sigues a tus clientes. Al terminar verás tu
          puntuación y dónde está la fuga principal. Responder es anónimo: solo pedimos
          datos si quieres el diagnóstico ampliado por email.
        </p>
      </header>

      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${(contestadas / PREGUNTAS.length) * 100}%` }} />
      </div>

      <ol className={styles.questions}>
        {PREGUNTAS.map((p, i) => (
          <li key={p.q} className={styles.question}>
            <p className={styles.qText}>
              <span className={styles.qNum}>{String(i + 1).padStart(2, '0')}</span>
              <span>{p.q}</span>
            </p>
            <span className={styles.qCat}>{p.cat} · {p.ayuda}</span>
            <div className={styles.opts}>
              <button type="button" className={styles.opt} aria-pressed={resp[i] === 10}
                onClick={() => { setResp({ ...resp, [i]: 10 }); setEnviado(false); }}>Sí</button>
              <button type="button" className={`${styles.opt} ${styles.optMid}`} aria-pressed={resp[i] === 5}
                onClick={() => { setResp({ ...resp, [i]: 5 }); setEnviado(false); }}>Parcialmente</button>
              <button type="button" className={`${styles.opt} ${styles.optNo}`} aria-pressed={resp[i] === 0}
                onClick={() => { setResp({ ...resp, [i]: 0 }); setEnviado(false); }}>No</button>
            </div>
          </li>
        ))}
      </ol>

      {!enviado && (
        <div className={styles.actions}>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}
            disabled={!completo} onClick={() => setEnviado(true)}>
            {completo ? 'Ver mi diagnóstico' : `Faltan ${PREGUNTAS.length - contestadas} respuestas`}
          </button>
        </div>
      )}

      {enviado && (
        <div className={styles.results}>
          <div className={styles.score}>
            <div className={styles.scoreV} style={{ color: r.total >= 60 ? '#c6ff3a' : r.total >= 35 ? '#ffb24d' : '#ff6b6b' }}>
              {r.total}<span style={{ fontSize: '.4em', opacity: .6 }}>/100</span>
            </div>
            <div className={styles.scoreL}>Madurez digital · {r.nivel}</div>
          </div>

          <ul className={styles.bars}>
            {r.porCat.map((c) => (
              <li key={c.cat} className={styles.bar}>
                <div className={styles.barTop}>
                  <span>{c.cat}</span>
                  <b style={{ color: COLOR[c.cat] }}>{c.pct}%</b>
                </div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${c.pct}%`, background: COLOR[c.cat] }} />
                </div>
              </li>
            ))}
          </ul>

          <div className={`${styles.verdict} ${r.total >= 60 ? styles['verdict--ok'] : r.total >= 35 ? styles['verdict--warn'] : styles['verdict--bad']}`}>
            <b>Principal fuga: {r.fuga.cat.toLowerCase()}.</b> {DIAGNOSTICO[r.fuga.cat]}
          </div>

          <p className={styles.disclaimer}>
            Es una <b>autoevaluación orientativa</b>: la puntuación sale de lo que has
            respondido, no de un análisis de tus cuentas. Para saber qué pasa de verdad hay
            que mirar tu analítica, tus campañas y tu proceso comercial.
          </p>

          {fase === 'ok' ? (
            <div className={styles.leadDone}>
              ✓ Recibido. Te enviamos el diagnóstico ampliado y, si quieres, lo repasamos juntos.
            </div>
          ) : leadOpen ? (
            <form className={styles.leadBox} onSubmit={enviarLead}>
              <p className={styles.leadTitle}>Recibe el diagnóstico ampliado</p>
              <p className={styles.leadSub}>
                Te mandamos por email qué revisar primero en tu caso, con el desglose por área.
                Sin newsletter ni llamadas insistentes.
              </p>
              <div className={styles.leadGrid}>
                <input className={styles.input} type="text" placeholder="Tu nombre" value={nombre}
                  onChange={(e) => setNombre(e.target.value)} required autoComplete="name" />
                <input className={styles.input} type="email" placeholder="Tu email" value={email}
                  onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </div>
              <label className={styles.hp} aria-hidden="true">
                No rellenar
                <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </label>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.actions} style={{ marginTop: '.9rem' }}>
                <button type="submit" className={`${styles.btn} ${styles.btnLime}`} disabled={fase === 'enviando'}>
                  {fase === 'enviando' ? 'Enviando…' : 'Enviármelo'}
                </button>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setLeadOpen(false)}>
                  Ahora no
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.actions}>
              <button type="button" className={`${styles.btn} ${styles.btnLime}`} onClick={() => setLeadOpen(true)}>
                Recibir el diagnóstico ampliado
              </button>
              <a href="/marketing/recursos/calculadora-roas/" className={`${styles.btn} ${styles.btnGhost}`}>
                Calcular mi inversión
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
