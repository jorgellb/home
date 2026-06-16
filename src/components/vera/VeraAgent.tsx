import { useState, type ReactNode } from 'react';
import styles from './VeraAgent.module.css';

/* Vera AI Business Agent — wizard de 5 pasos que llama a /api/vera y muestra
   una propuesta de consultoría estructurada. La IA corre en el servidor. */

type SectorId = 'alquiler' | 'inmobiliaria' | 'restaurante' | 'clinica' | 'facturacion';

interface Sector {
  id: SectorId;
  nombre: string;
  icon: string;
  ejTipo: string[];
  ejProblema: string[];
  ejObjetivo: string[];
}

const SECTORES: Sector[] = [
  {
    id: 'alquiler', nombre: 'Alquiler vacacional', icon: '🏖️',
    ejTipo: ['Agencia con 20 apartamentos', 'Dueño de 3 pisos en la playa'],
    ejProblema: ['Recibo muchos mensajes repetidos', 'Pierdo reservas por contestar tarde', 'Dependo demasiado de Booking'],
    ejObjetivo: ['Ahorrar tiempo', 'Conseguir más reservas directas'],
  },
  {
    id: 'inmobiliaria', nombre: 'Inmobiliaria', icon: '🏠',
    ejTipo: ['Inmobiliaria pequeña', 'Agente independiente'],
    ejProblema: ['Pierdo leads', 'Tardo demasiado en responder', 'Me cuesta captar propietarios'],
    ejObjetivo: ['Vender más', 'Captar más propietarios'],
  },
  {
    id: 'restaurante', nombre: 'Restaurante / Hostelería', icon: '🍽️',
    ejTipo: ['Restaurante familiar en zona turística', 'Bar con terraza'],
    ejProblema: ['Me llaman demasiado para reservas', 'Clientes que no aparecen', 'Reseñas sin responder'],
    ejObjetivo: ['Conseguir más reservas', 'Mejorar la atención al cliente'],
  },
  {
    id: 'clinica', nombre: 'Clínica / Estética', icon: '💆',
    ejTipo: ['Clínica estética con agenda manual', 'Centro de fisioterapia'],
    ejProblema: ['Tengo citas perdidas', 'Clientes que no vuelven', 'Formularios en papel'],
    ejObjetivo: ['Perder menos clientes', 'Automatizar recordatorios'],
  },
  {
    id: 'facturacion', nombre: 'Facturación / Pyme', icon: '🧾',
    ejTipo: ['Autónomo que gestiona facturas en Excel', 'Pyme con 5 empleados'],
    ejProblema: ['Tengo facturas desordenadas', 'Mucho doble trabajo', 'No controlo los cobros'],
    ejObjetivo: ['Automatizar tareas', 'Tener control de cobros'],
  },
];

const PRESUPUESTOS = ['Bajo', 'Medio', 'Alto'];

interface Proposal {
  diagnostico?: string;
  oportunidad?: string;
  solucion?: { nombre?: string; descripcion?: string };
  comoFunciona?: string[];
  funciones?: string[];
  beneficio?: string;
  precio?: { basico?: string; completo?: string; mantenimiento?: string };
  demoPortfolio?: string;
  mensajeComercial?: string;
  limites?: string[];
}

type Phase = 'form' | 'loading' | 'result' | 'error';

const STEPS = ['Sector', 'Tu negocio', 'Problema', 'Objetivo', 'Presupuesto'];

export default function VeraAgent() {
  const [phase, setPhase] = useState<Phase>('form');
  const [step, setStep] = useState(0);
  const [sector, setSector] = useState<SectorId | null>(null);
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [problema, setProblema] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [result, setResult] = useState<{ sector: string; proposal: Proposal } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const activeSector = SECTORES.find((s) => s.id === sector);

  const canNext =
    (step === 0 && !!sector) ||
    (step === 1 && tipoNegocio.trim().length > 0) ||
    (step === 2 && problema.trim().length > 0) ||
    (step === 3 && objetivo.trim().length > 0) ||
    (step === 4 && presupuesto.trim().length > 0);

  async function submit() {
    setPhase('loading');
    setError('');
    try {
      const res = await fetch('/api/vera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector, tipoNegocio, problema, objetivo, presupuesto }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'No se pudo generar la propuesta.');
      setResult({ sector: data.sector, proposal: data.proposal || {} });
      setPhase('result');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado.');
      setPhase('error');
    }
  }

  function reset() {
    setPhase('form');
    setStep(0);
    setSector(null);
    setTipoNegocio('');
    setProblema('');
    setObjetivo('');
    setPresupuesto('');
    setResult(null);
    setError('');
    setCopied(false);
  }

  function copyMensaje(text: string) {
    navigator.clipboard?.writeText(text).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 2000); },
      () => { /* noop */ },
    );
  }

  /* ─────────────── Resultado ─────────────── */
  if (phase === 'result' && result) {
    const p = result.proposal;
    return (
      <div className={styles.wrap}>
        <div className={styles.resultHead}>
          <span className={styles.badge}>✦ Propuesta generada · {result.sector}</span>
          <h3 className={styles.resultTitle}>{p.solucion?.nombre || 'Tu solución a medida'}</h3>
          {p.solucion?.descripcion && <p className={styles.resultLead}>{p.solucion.descripcion}</p>}
        </div>

        <div className={styles.cards}>
          <Block n="01" t="Diagnóstico del negocio">{p.diagnostico}</Block>
          <Block n="02" t="Oportunidad detectada">{p.oportunidad}</Block>

          {!!p.comoFunciona?.length && (
            <article className={styles.card}>
              <span className={styles.cardN}>03</span>
              <h4 className={styles.cardT}>Cómo funcionaría</h4>
              <ol className={styles.flow}>
                {p.comoFunciona.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </article>
          )}

          {!!p.funciones?.length && (
            <article className={styles.card}>
              <span className={styles.cardN}>04</span>
              <h4 className={styles.cardT}>Funciones principales</h4>
              <ul className={styles.feats}>
                {p.funciones.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </article>
          )}

          <Block n="05" t="Beneficio para el negocio">{p.beneficio}</Block>

          {p.precio && (
            <article className={styles.card}>
              <span className={styles.cardN}>06</span>
              <h4 className={styles.cardT}>Precio orientativo</h4>
              <div className={styles.precio}>
                {p.precio.basico && <div><b>Básico</b><span>{p.precio.basico}</span></div>}
                {p.precio.completo && <div><b>Completo</b><span>{p.precio.completo}</span></div>}
                {p.precio.mantenimiento && <div><b>Mantenimiento</b><span>{p.precio.mantenimiento}</span></div>}
              </div>
            </article>
          )}

          {p.mensajeComercial && (
            <article className={`${styles.card} ${styles.cardAccent}`}>
              <span className={styles.cardN}>07</span>
              <h4 className={styles.cardT}>Mensaje comercial listo para usar</h4>
              <p className={styles.mensaje}>{p.mensajeComercial}</p>
              <button className={styles.copyBtn} onClick={() => copyMensaje(p.mensajeComercial!)}>
                {copied ? '✓ Copiado' : 'Copiar mensaje'}
              </button>
            </article>
          )}

          {p.demoPortfolio && <Block n="08" t="Cómo se vería en portfolio">{p.demoPortfolio}</Block>}

          {!!p.limites?.length && (
            <article className={`${styles.card} ${styles.cardMuted}`}>
              <span className={styles.cardN}>09</span>
              <h4 className={styles.cardT}>Límites y riesgos</h4>
              <ul className={styles.limits}>
                {p.limites.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </article>
          )}
        </div>

        <div className={styles.resultActions}>
          <button className={styles.secondary} onClick={reset}>↻ Probar otro negocio</button>
          <a className={styles.primary} href="/contacto/">Quiero algo así para mi negocio →</a>
        </div>
        <p className={styles.disclaimer}>
          Propuesta generada por IA con fines de demostración. Los precios son orientativos y no constituyen una oferta.
        </p>
      </div>
    );
  }

  /* ─────────────── Cargando ─────────────── */
  if (phase === 'loading') {
    return (
      <div className={styles.wrap}>
        <div className={styles.loading}>
          <div className={styles.spinner} aria-hidden="true" />
          <p>Vera está analizando tu negocio…</p>
          <span>Detectando el dolor principal y diseñando una solución a medida.</span>
        </div>
      </div>
    );
  }

  /* ─────────────── Error ─────────────── */
  if (phase === 'error') {
    return (
      <div className={styles.wrap}>
        <div className={styles.loading}>
          <div className={styles.errIco} aria-hidden="true">!</div>
          <p>{error}</p>
          <button className={styles.primary} onClick={() => setPhase('form')}>Volver a intentarlo</button>
        </div>
      </div>
    );
  }

  /* ─────────────── Formulario (wizard) ─────────────── */
  return (
    <div className={styles.wrap}>
      <div className={styles.progress}>
        {STEPS.map((label, i) => (
          <div key={label} className={`${styles.progStep} ${i === step ? styles.progOn : ''} ${i < step ? styles.progDone : ''}`}>
            <span>{i + 1}</span>{label}
          </div>
        ))}
      </div>

      <div className={styles.panel}>
        {step === 0 && (
          <>
            <h3 className={styles.q}>¿A qué sector pertenece tu negocio?</h3>
            <div className={styles.sectors}>
              {SECTORES.map((s) => (
                <button
                  key={s.id}
                  className={`${styles.sector} ${sector === s.id ? styles.sectorOn : ''}`}
                  onClick={() => setSector(s.id)}
                >
                  <span className={styles.sectorIco} aria-hidden="true">{s.icon}</span>
                  <span>{s.nombre}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <StepText
            q="¿Qué tipo de negocio tienes?"
            value={tipoNegocio}
            onChange={setTipoNegocio}
            placeholder="Ej.: agencia con 20 apartamentos turísticos…"
            chips={activeSector?.ejTipo || []}
          />
        )}
        {step === 2 && (
          <StepText
            q="¿Cuál es tu problema principal?"
            value={problema}
            onChange={setProblema}
            placeholder="Ej.: recibo muchos mensajes repetidos y pierdo reservas…"
            chips={activeSector?.ejProblema || []}
          />
        )}
        {step === 3 && (
          <StepText
            q="¿Qué objetivo quieres conseguir?"
            value={objetivo}
            onChange={setObjetivo}
            placeholder="Ej.: ahorrar tiempo y conseguir más reservas directas…"
            chips={activeSector?.ejObjetivo || []}
          />
        )}
        {step === 4 && (
          <>
            <h3 className={styles.q}>¿Qué presupuesto aproximado tienes?</h3>
            <div className={styles.chips}>
              {PRESUPUESTOS.map((b) => (
                <button
                  key={b}
                  className={`${styles.chip} ${presupuesto === b ? styles.chipOn : ''}`}
                  onClick={() => setPresupuesto(b)}
                >
                  {b}
                </button>
              ))}
            </div>
            <input
              className={styles.input}
              value={PRESUPUESTOS.includes(presupuesto) ? '' : presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              placeholder="…o una cantidad aproximada (ej.: 1.500 €)"
            />
          </>
        )}
      </div>

      <div className={styles.nav}>
        <button
          className={styles.secondary}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          ← Atrás
        </button>
        {step < 4 ? (
          <button className={styles.primary} onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
            Siguiente →
          </button>
        ) : (
          <button className={styles.primary} onClick={submit} disabled={!canNext}>
            ✦ Generar propuesta
          </button>
        )}
      </div>
    </div>
  );
}

function StepText(props: {
  q: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  chips: string[];
}) {
  return (
    <>
      <h3 className={styles.q}>{props.q}</h3>
      <textarea
        className={styles.textarea}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        rows={3}
      />
      {props.chips.length > 0 && (
        <div className={styles.chips}>
          {props.chips.map((c) => (
            <button key={c} className={styles.chipGhost} onClick={() => props.onChange(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function Block({ n, t, children }: { n: string; t: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <article className={styles.card}>
      <span className={styles.cardN}>{n}</span>
      <h4 className={styles.cardT}>{t}</h4>
      <p>{children}</p>
    </article>
  );
}
