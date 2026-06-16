import { useEffect, useRef, useState } from 'react';
import styles from './VeraAgent.module.css';

/* Vera AI Business Agent — wizard de 5 pasos. Llama a /api/vera en streaming y
   escribe la propuesta (markdown) en vivo. Incluye "Ver un ejemplo" instantáneo,
   exportar a PDF y compartir. La IA corre en el servidor. */

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
const STEPS = ['Sector', 'Tu negocio', 'Problema', 'Objetivo', 'Presupuesto'];

const EXAMPLE_MD = `# GuestPilot AI

## 1. Diagnóstico del negocio
Una agencia con 20 apartamentos turísticos dedica muchas horas a responder por WhatsApp las mismas preguntas (horarios de entrada, wifi, parking, normas). Esa lentitud hace perder reservas y satura al equipo en temporada alta.

## 2. Oportunidad detectada
La mayor oportunidad es automatizar la atención inicial al huésped: responder al instante las dudas frecuentes, captar los datos de la reserva y pasar a una persona solo los casos importantes.

## 3. App o sistema recomendado
GuestPilot AI, un asistente para apartamentos turísticos que atiende a los huéspedes por WhatsApp y web, envía las instrucciones de llegada y ayuda a conseguir más reservas directas, con menos comisiones de Booking o Airbnb.

## 4. Cómo funcionaría
- El huésped escribe por WhatsApp o desde la web del apartamento.
- El asistente pregunta fechas, número de personas y dudas principales.
- Responde al instante con información útil y disponibilidad.
- Si hay interés, guarda los datos y avisa al gestor.
- Tras la reserva, envía instrucciones de llegada y recordatorios.
- Al final de la estancia, pide una reseña automáticamente.

## 5. Funciones principales
- Respuestas automáticas 24/7.
- Atención en varios idiomas.
- Captación de datos del huésped.
- Envío de instrucciones de check-in.
- Recordatorios automáticos.
- Solicitud de reseñas.
- Upselling de servicios locales.
- Aviso al gestor en casos importantes.

## 6. Beneficio para el negocio
Puede ahorrar varias horas a la semana, mejorar la rapidez de respuesta y aumentar las posibilidades de cerrar reservas directas con menos comisiones.

## 7. Precio orientativo
- Versión básica: entre 600 € y 1.500 €.
- Versión completa: entre 2.000 € y 5.000 €.
- Mantenimiento opcional: entre 80 € y 300 € al mes.

## 8. Demo para portfolio
Se mostraría una pantalla donde el visitante elige su sector, describe su problema y recibe una propuesta personalizada generada por IA, demostrando soluciones prácticas para negocios reales.

## 9. Mensaje comercial
Hola, he preparado una demo de IA para alojamientos como el tuyo: responde sola a los huéspedes por WhatsApp, ahorra tiempo y ayuda a conseguir más reservas directas. ¿Quieres que te enseñe cómo funcionaría con tus apartamentos?

## 10. Límites y riesgos
- La IA no sustituye decisiones importantes.
- Hay que revisar las respuestas sensibles.
- No debe inventar precios, condiciones ni información legal.
- Debe proteger los datos del huésped.
- Una persona puede tomar el control cuando haga falta.`;

type Phase = 'form' | 'streaming' | 'result' | 'error';

/* ─── Markdown → HTML (subconjunto seguro: escapamos antes de formatear) ─── */
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function inlineHtml(s: string): string {
  return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
function mdToHtml(md: string): string {
  const lines = md.split('\n');
  let html = '';
  let list: 'ul' | 'ol' | null = null;
  const closeList = () => { if (list) { html += `</${list}>`; list = null; } };
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) { closeList(); continue; }
    if (t.startsWith('## ')) { closeList(); html += `<h4>${inlineHtml(t.slice(3))}</h4>`; continue; }
    if (t.startsWith('### ')) { closeList(); html += `<h5>${inlineHtml(t.slice(4))}</h5>`; continue; }
    if (t.startsWith('# ')) continue; // el título (H1) se muestra aparte
    const um = t.match(/^[-*]\s+(.*)$/);
    const om = t.match(/^\d+\.\s+(.*)$/);
    if (um) { if (list !== 'ul') { closeList(); html += '<ul>'; list = 'ul'; } html += `<li>${inlineHtml(um[1])}</li>`; continue; }
    if (om) { if (list !== 'ol') { closeList(); html += '<ol>'; list = 'ol'; } html += `<li>${inlineHtml(om[1])}</li>`; continue; }
    closeList();
    html += `<p>${inlineHtml(t)}</p>`;
  }
  closeList();
  return html;
}
function extractTitle(md: string): string {
  const line = md.split('\n').find((l) => /^#\s+/.test(l.trim()) && !l.trim().startsWith('## '));
  return line ? line.trim().replace(/^#\s+/, '') : '';
}
function extractSection(md: string, needle: string): string {
  const lines = md.split('\n');
  let cap = false;
  const buf: string[] = [];
  for (const l of lines) {
    const t = l.trim();
    if (t.startsWith('## ')) { if (cap) break; cap = t.toLowerCase().includes(needle); continue; }
    if (cap && t) buf.push(t.replace(/^[-*]\s+/, ''));
  }
  return buf.join('\n').trim();
}

export default function VeraAgent() {
  const [phase, setPhase] = useState<Phase>('form');
  const [step, setStep] = useState(0);
  const [sector, setSector] = useState<SectorId | null>(null);
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [problema, setProblema] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [md, setMd] = useState('');
  const [isExample, setIsExample] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const exampleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (exampleTimer.current) clearInterval(exampleTimer.current); }, []);

  const activeSector = SECTORES.find((s) => s.id === sector);
  const canNext =
    (step === 0 && !!sector) ||
    (step === 1 && tipoNegocio.trim().length > 0) ||
    (step === 2 && problema.trim().length > 0) ||
    (step === 3 && objetivo.trim().length > 0) ||
    (step === 4 && presupuesto.trim().length > 0);

  async function submit() {
    setIsExample(false);
    setPhase('streaming');
    setMd('');
    setError('');
    try {
      const res = await fetch('/api/vera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector, tipoNegocio, problema, objetivo, presupuesto }),
      });
      if (!res.ok || !res.body) {
        let msg = 'No se pudo generar la propuesta.';
        try { const j = await res.json(); msg = j?.error || msg; } catch { /* noop */ }
        throw new Error(msg);
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMd(acc);
      }
      setPhase('result');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado.');
      setPhase('error');
    }
  }

  function showExample() {
    if (exampleTimer.current) clearInterval(exampleTimer.current);
    setIsExample(true);
    setPhase('streaming');
    setMd('');
    const full = EXAMPLE_MD;
    const stepSize = Math.max(3, Math.round(full.length / 90));
    let i = 0;
    exampleTimer.current = setInterval(() => {
      i += stepSize;
      setMd(full.slice(0, i));
      if (i >= full.length) {
        if (exampleTimer.current) clearInterval(exampleTimer.current);
        setMd(full);
        setPhase('result');
      }
    }, 20);
  }

  function reset() {
    if (exampleTimer.current) clearInterval(exampleTimer.current);
    setPhase('form');
    setStep(0);
    setSector(null);
    setTipoNegocio('');
    setProblema('');
    setObjetivo('');
    setPresupuesto('');
    setMd('');
    setIsExample(false);
    setError('');
    setCopied('');
  }

  function flash(what: string) {
    setCopied(what);
    setTimeout(() => setCopied(''), 2000);
  }

  function copyMensaje() {
    const msg = extractSection(md, 'mensaje comercial') || md;
    navigator.clipboard?.writeText(msg).then(() => flash('mensaje'), () => { /* noop */ });
  }

  async function share() {
    const title = extractTitle(md) || 'Propuesta Vera AI';
    const text = md.replace(/[#*]/g, '');
    const nav = navigator as Navigator & { share?: (d: { title: string; text: string }) => Promise<void> };
    if (nav.share) {
      try { await nav.share({ title, text }); return; } catch { /* cancelado */ }
    }
    navigator.clipboard?.writeText(text).then(() => flash('compartir'), () => { /* noop */ });
  }

  function exportPDF() {
    const title = extractTitle(md) || 'Propuesta Vera AI';
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(title)} · Vera AI</title>
<style>
  body{font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;color:#1a1714;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.55}
  .brand{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#FF6B35;font-weight:800}
  h1{font-size:30px;margin:.2rem 0 1.5rem;letter-spacing:-.02em}
  h4{font-size:16px;margin:1.4rem 0 .4rem;color:#FF6B35}
  ul,ol{margin:.3rem 0 .3rem 1.1rem;padding:0}
  li{margin:.2rem 0}
  p{margin:.4rem 0}
  .foot{margin-top:2.5rem;border-top:1px solid #e5ddcf;padding-top:1rem;font-size:11px;color:#8a8175}
</style></head><body>
  <div class="brand">✦ Vera AI Business Agent · platanitorico.com</div>
  <h1>${esc(title)}</h1>
  ${mdToHtml(md)}
  <div class="foot">Propuesta generada por IA con fines de demostración. Los precios son orientativos y no constituyen una oferta vinculante.</div>
</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 350);
  }

  /* ─────────────── Propuesta (streaming / resultado) ─────────────── */
  if (phase === 'streaming' || phase === 'result') {
    const title = extractTitle(md);
    const streaming = phase === 'streaming';
    return (
      <div className={styles.wrap}>
        <div className={styles.resultHead}>
          <span className={styles.badge}>{isExample ? '✦ Ejemplo de muestra' : '✦ Propuesta generada por IA'}</span>
          {title && <h3 className={styles.resultTitle}>{title}</h3>}
        </div>

        <div className={styles.proposal}>
          <div className={styles.md} dangerouslySetInnerHTML={{ __html: mdToHtml(md) }} />
          {streaming && <span className={styles.cursor} aria-hidden="true" />}
        </div>

        {!streaming && (
          <>
            <div className={styles.exportBar}>
              <button className={styles.toolBtn} onClick={exportPDF}>⬇ Descargar PDF</button>
              <button className={styles.toolBtn} onClick={share}>{copied === 'compartir' ? '✓ Copiado' : '↗ Compartir'}</button>
              <button className={styles.toolBtn} onClick={copyMensaje}>{copied === 'mensaje' ? '✓ Copiado' : '📋 Copiar mensaje comercial'}</button>
            </div>
            <div className={styles.resultActions}>
              <button className={styles.secondary} onClick={reset}>↻ Probar otro negocio</button>
              <a className={styles.primary} href="/contacto/">Quiero algo así para mi negocio →</a>
            </div>
            <p className={styles.disclaimer}>
              Propuesta {isExample ? 'de ejemplo ' : ''}generada por IA con fines de demostración. Los precios son orientativos y no constituyen una oferta.
            </p>
          </>
        )}
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
          <div className={styles.resultActions}>
            <button className={styles.secondary} onClick={showExample}>Ver un ejemplo</button>
            <button className={styles.primary} onClick={() => setPhase('form')}>Volver a intentarlo</button>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────── Formulario (wizard) ─────────────── */
  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <div className={styles.progress}>
          {STEPS.map((label, i) => (
            <div key={label} className={`${styles.progStep} ${i === step ? styles.progOn : ''} ${i < step ? styles.progDone : ''}`}>
              <span>{i + 1}</span>{label}
            </div>
          ))}
        </div>
        <button className={styles.exampleLink} onClick={showExample}>⚡ Ver un ejemplo al instante</button>
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
          <StepText q="¿Qué tipo de negocio tienes?" value={tipoNegocio} onChange={setTipoNegocio}
            placeholder="Ej.: agencia con 20 apartamentos turísticos…" chips={activeSector?.ejTipo || []} />
        )}
        {step === 2 && (
          <StepText q="¿Cuál es tu problema principal?" value={problema} onChange={setProblema}
            placeholder="Ej.: recibo muchos mensajes repetidos y pierdo reservas…" chips={activeSector?.ejProblema || []} />
        )}
        {step === 3 && (
          <StepText q="¿Qué objetivo quieres conseguir?" value={objetivo} onChange={setObjetivo}
            placeholder="Ej.: ahorrar tiempo y conseguir más reservas directas…" chips={activeSector?.ejObjetivo || []} />
        )}
        {step === 4 && (
          <>
            <h3 className={styles.q}>¿Qué presupuesto aproximado tienes?</h3>
            <div className={styles.chips}>
              {PRESUPUESTOS.map((b) => (
                <button key={b} className={`${styles.chip} ${presupuesto === b ? styles.chipOn : ''}`} onClick={() => setPresupuesto(b)}>{b}</button>
              ))}
            </div>
            <input className={styles.input} value={PRESUPUESTOS.includes(presupuesto) ? '' : presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)} placeholder="…o una cantidad aproximada (ej.: 1.500 €)" />
          </>
        )}
      </div>

      <div className={styles.nav}>
        <button className={styles.secondary} onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>← Atrás</button>
        {step < 4 ? (
          <button className={styles.primary} onClick={() => setStep((s) => s + 1)} disabled={!canNext}>Siguiente →</button>
        ) : (
          <button className={styles.primary} onClick={submit} disabled={!canNext}>✦ Generar propuesta</button>
        )}
      </div>
    </div>
  );
}

function StepText(props: { q: string; value: string; onChange: (v: string) => void; placeholder: string; chips: string[] }) {
  return (
    <>
      <h3 className={styles.q}>{props.q}</h3>
      <textarea className={styles.textarea} value={props.value} onChange={(e) => props.onChange(e.target.value)} placeholder={props.placeholder} rows={3} />
      {props.chips.length > 0 && (
        <div className={styles.chips}>
          {props.chips.map((c) => (
            <button key={c} className={styles.chipGhost} onClick={() => props.onChange(c)}>{c}</button>
          ))}
        </div>
      )}
    </>
  );
}
