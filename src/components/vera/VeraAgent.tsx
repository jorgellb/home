import { useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './VeraAgent.module.css';

/* Vera AI Business Agent — wizard bilingüe (ES/EN). Llama a /api/vera en
   streaming y escribe la propuesta (markdown) en vivo. Incluye "ver un ejemplo"
   instantáneo, exportar a PDF, compartir y captura de lead. La IA va en servidor. */

type SectorId = 'alquiler' | 'inmobiliaria' | 'restaurante' | 'clinica' | 'facturacion';
type Lang = 'es' | 'en';
type Phase = 'form' | 'streaming' | 'result' | 'error';
type Bi<T> = Record<Lang, T>;

interface Sector {
  id: SectorId;
  icon: string;
  nombre: Bi<string>;
  ejTipo: Bi<string[]>;
  ejProblema: Bi<string[]>;
  ejObjetivo: Bi<string[]>;
}

const SECTORES: Sector[] = [
  {
    id: 'alquiler', icon: '🏖️',
    nombre: { es: 'Alquiler vacacional', en: 'Vacation rentals' },
    ejTipo: { es: ['Agencia con 20 apartamentos', 'Dueño de 3 pisos en la playa'], en: ['Agency with 20 apartments', 'Owner of 3 beach flats'] },
    ejProblema: { es: ['Recibo muchos mensajes repetidos', 'Pierdo reservas por contestar tarde', 'Dependo demasiado de Booking'], en: ['I get many repeated messages', 'I lose bookings by replying late', 'I rely too much on Booking'] },
    ejObjetivo: { es: ['Ahorrar tiempo', 'Conseguir más reservas directas'], en: ['Save time', 'Get more direct bookings'] },
  },
  {
    id: 'inmobiliaria', icon: '🏠',
    nombre: { es: 'Inmobiliaria', en: 'Real estate' },
    ejTipo: { es: ['Inmobiliaria pequeña', 'Agente independiente'], en: ['Small agency', 'Independent agent'] },
    ejProblema: { es: ['Pierdo leads', 'Tardo demasiado en responder', 'Me cuesta captar propietarios'], en: ['I lose leads', 'I respond too slowly', 'Hard to get new listings'] },
    ejObjetivo: { es: ['Vender más', 'Captar más propietarios'], en: ['Sell more', 'Get more listings'] },
  },
  {
    id: 'restaurante', icon: '🍽️',
    nombre: { es: 'Restaurante / Hostelería', en: 'Restaurant / Hospitality' },
    ejTipo: { es: ['Restaurante familiar en zona turística', 'Bar con terraza'], en: ['Family restaurant in a tourist area', 'Bar with terrace'] },
    ejProblema: { es: ['Me llaman demasiado para reservas', 'Clientes que no aparecen', 'Reseñas sin responder'], en: ['Too many booking calls', 'No-show customers', 'Unanswered reviews'] },
    ejObjetivo: { es: ['Conseguir más reservas', 'Mejorar la atención al cliente'], en: ['Get more bookings', 'Improve customer service'] },
  },
  {
    id: 'clinica', icon: '💆',
    nombre: { es: 'Clínica / Estética', en: 'Clinic / Aesthetics' },
    ejTipo: { es: ['Clínica estética con agenda manual', 'Centro de fisioterapia'], en: ['Aesthetic clinic with manual diary', 'Physiotherapy centre'] },
    ejProblema: { es: ['Tengo citas perdidas', 'Clientes que no vuelven', 'Formularios en papel'], en: ['Missed appointments', 'Clients who do not return', 'Paper forms'] },
    ejObjetivo: { es: ['Perder menos clientes', 'Automatizar recordatorios'], en: ['Lose fewer clients', 'Automate reminders'] },
  },
  {
    id: 'facturacion', icon: '🧾',
    nombre: { es: 'Facturación / Pyme', en: 'Invoicing / SMB' },
    ejTipo: { es: ['Autónomo que gestiona facturas en Excel', 'Pyme con 5 empleados'], en: ['Freelancer managing invoices in Excel', 'SMB with 5 employees'] },
    ejProblema: { es: ['Tengo facturas desordenadas', 'Mucho doble trabajo', 'No controlo los cobros'], en: ['Messy invoices', 'Lots of double work', 'No control over payments'] },
    ejObjetivo: { es: ['Automatizar tareas', 'Tener control de cobros'], en: ['Automate tasks', 'Control payments'] },
  },
];

const T: Bi<{
  steps: string[]; presupuestos: string[]; example: string;
  qSector: string; qTipo: string; qProblema: string; qObjetivo: string; qPresupuesto: string;
  phTipo: string; phProblema: string; phObjetivo: string; phPresupuesto: string;
  back: string; next: string; generate: string;
  badgeEx: string; badgeReal: string; pdf: string; share: string; copiedW: string; copyMsg: string; again: string;
  msgNeedle: string; retry: string; seeExample: string;
  leadTitle: string; leadSub: string; leadName: string; leadEmail: string; leadContact: string;
  leadSend: string; leadSending: string; leadPriv: string; leadDoneT: string; leadDoneP: string; leadErrContact: string;
  disc: (ex: boolean) => string;
}> = {
  es: {
    steps: ['Sector', 'Tu negocio', 'Problema', 'Objetivo', 'Presupuesto'],
    presupuestos: ['Bajo', 'Medio', 'Alto'],
    example: '⚡ Ver un ejemplo al instante',
    qSector: '¿A qué sector pertenece tu negocio?',
    qTipo: '¿Qué tipo de negocio tienes?',
    qProblema: '¿Cuál es tu problema principal?',
    qObjetivo: '¿Qué objetivo quieres conseguir?',
    qPresupuesto: '¿Qué presupuesto aproximado tienes?',
    phTipo: 'Ej.: agencia con 20 apartamentos turísticos…',
    phProblema: 'Ej.: recibo muchos mensajes repetidos y pierdo reservas…',
    phObjetivo: 'Ej.: ahorrar tiempo y conseguir más reservas directas…',
    phPresupuesto: '…o una cantidad aproximada (ej.: 1.500 €)',
    back: '← Atrás', next: 'Siguiente →', generate: '✦ Generar propuesta',
    badgeEx: '✦ Ejemplo de muestra', badgeReal: '✦ Propuesta generada por IA',
    pdf: '⬇ Descargar PDF', share: '↗ Compartir', copiedW: '✓ Copiado', copyMsg: '📋 Copiar mensaje comercial', again: '↻ Probar otro negocio',
    msgNeedle: 'mensaje comercial', retry: 'Volver a intentarlo', seeExample: 'Ver un ejemplo',
    leadTitle: '📩 ¿Lo quieres aplicado a tu negocio?',
    leadSub: 'Déjanos tus datos y te preparamos una demo real con tu caso, sin compromiso.',
    leadName: 'Tu nombre (opcional)', leadEmail: 'Tu email', leadContact: 'WhatsApp / teléfono',
    leadSend: 'Enviar y recibir mi demo →', leadSending: 'Enviando…',
    leadPriv: 'Usaremos tus datos solo para contactarte sobre esta solución.',
    leadDoneT: '¡Recibido!', leadDoneP: 'Te contactaremos pronto para preparar una demo real con tu caso.',
    leadErrContact: 'Déjanos un email o un teléfono/WhatsApp.',
    disc: (ex) => `Propuesta ${ex ? 'de ejemplo ' : ''}generada por IA con fines de demostración. Los precios son orientativos y no constituyen una oferta.`,
  },
  en: {
    steps: ['Sector', 'Your business', 'Problem', 'Goal', 'Budget'],
    presupuestos: ['Low', 'Medium', 'High'],
    example: '⚡ See an instant example',
    qSector: 'What sector is your business in?',
    qTipo: 'What kind of business do you have?',
    qProblema: 'What is your main problem?',
    qObjetivo: 'What goal do you want to achieve?',
    qPresupuesto: 'What is your approximate budget?',
    phTipo: 'E.g.: agency with 20 holiday apartments…',
    phProblema: 'E.g.: I get many repeated messages and lose bookings…',
    phObjetivo: 'E.g.: save time and get more direct bookings…',
    phPresupuesto: '…or an approximate amount (e.g.: €1,500)',
    back: '← Back', next: 'Next →', generate: '✦ Generate proposal',
    badgeEx: '✦ Sample example', badgeReal: '✦ AI-generated proposal',
    pdf: '⬇ Download PDF', share: '↗ Share', copiedW: '✓ Copied', copyMsg: '📋 Copy sales message', again: '↻ Try another business',
    msgNeedle: 'sales message', retry: 'Try again', seeExample: 'See an example',
    leadTitle: '📩 Want it applied to your business?',
    leadSub: 'Leave your details and we will prepare a real demo for your case, no strings attached.',
    leadName: 'Your name (optional)', leadEmail: 'Your email', leadContact: 'WhatsApp / phone',
    leadSend: 'Send and get my demo →', leadSending: 'Sending…',
    leadPriv: 'We will only use your data to contact you about this solution.',
    leadDoneT: 'Got it!', leadDoneP: 'We will contact you soon to prepare a real demo for your case.',
    leadErrContact: 'Leave an email or a phone/WhatsApp.',
    disc: (ex) => `${ex ? 'Sample ' : ''}AI-generated proposal for demonstration purposes. Prices are indicative and not a binding offer.`,
  },
};

const EXAMPLE_MD: Bi<string> = {
  es: `# StayConcierge AI

## 1. Diagnóstico del negocio
Una agencia con 20 apartamentos turísticos dedica muchas horas a responder por WhatsApp las mismas preguntas (horarios de entrada, wifi, parking, normas). Esa lentitud hace perder reservas y satura al equipo en temporada alta.

## 2. Oportunidad detectada
La mayor oportunidad es automatizar la atención inicial al huésped: responder al instante las dudas frecuentes, captar los datos de la reserva y pasar a una persona solo los casos importantes.

## 3. App o sistema recomendado
StayConcierge AI, un asistente para apartamentos turísticos que atiende a los huéspedes por WhatsApp y web, envía las instrucciones de llegada y ayuda a conseguir más reservas directas, con menos comisiones.

## 4. Cómo funcionaría
- El huésped escribe por WhatsApp o desde la web.
- El asistente pregunta fechas, número de personas y dudas.
- Responde al instante con información útil y disponibilidad.
- Si hay interés, guarda los datos y avisa al gestor.
- Tras la reserva, envía instrucciones de llegada y recordatorios.
- Al final, pide una reseña automáticamente.

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
Se mostraría una pantalla donde el visitante elige su sector, describe su problema y recibe una propuesta personalizada generada por IA.

## 9. Mensaje comercial
Hola, he preparado una demo de IA para alojamientos como el tuyo: responde sola a los huéspedes por WhatsApp, ahorra tiempo y ayuda a conseguir más reservas directas. ¿Quieres que te enseñe cómo funcionaría con tus apartamentos?

## 10. Límites y riesgos
- La IA no sustituye decisiones importantes.
- Hay que revisar las respuestas sensibles.
- No debe inventar precios, condiciones ni información legal.
- Debe proteger los datos del huésped.
- Una persona puede tomar el control cuando haga falta.`,
  en: `# StayConcierge AI

## 1. Business diagnosis
An agency with 20 holiday apartments spends many hours answering the same WhatsApp questions (check-in times, wifi, parking, rules). That slowness loses bookings and overloads the team in high season.

## 2. Opportunity detected
The biggest opportunity is to automate the first contact with guests: instantly answer common questions, capture booking details and pass only important cases to a person.

## 3. Recommended app or system
StayConcierge AI, an assistant for holiday rentals that handles guests on WhatsApp and the web, sends arrival instructions and helps win more direct bookings with lower commissions.

## 4. How it would work
- The guest writes via WhatsApp or the website.
- The assistant asks for dates, number of guests and questions.
- It instantly replies with useful info and availability.
- If interested, it saves the details and notifies the manager.
- After booking, it sends arrival instructions and reminders.
- At the end, it automatically asks for a review.

## 5. Main features
- 24/7 automatic replies.
- Multi-language support.
- Guest data capture.
- Check-in instruction delivery.
- Automatic reminders.
- Review requests.
- Local upselling.
- Manager alerts for important cases.

## 6. Business benefit
It can save several hours a week, improve response speed and increase the chances of closing direct bookings with lower commissions.

## 7. Indicative pricing
- Basic version: between €600 and €1,500.
- Full version: between €2,000 and €5,000.
- Optional maintenance: between €80 and €300 per month.

## 8. Portfolio demo
It would show a screen where the visitor picks their sector, describes their problem and receives a personalised, AI-generated proposal.

## 9. Sales message
Hi, I've built an AI demo for accommodations like yours: it answers guests on WhatsApp by itself, saves time and helps win more direct bookings. Want me to show how it would work for your apartments?

## 10. Limits and risks
- AI does not replace important decisions.
- Sensitive answers must be reviewed.
- It must not invent prices, terms or legal info.
- It must protect guest data.
- A person can take over whenever needed.`,
};

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
    if (t.startsWith('# ')) continue;
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
  const [lang, setLang] = useState<Lang>('es');
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

  const [leadPhase, setLeadPhase] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadContacto, setLeadContacto] = useState('');
  const [leadHoneypot, setLeadHoneypot] = useState('');
  const [leadError, setLeadError] = useState('');

  useEffect(() => () => { if (exampleTimer.current) clearInterval(exampleTimer.current); }, []);

  const t = T[lang];
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
        body: JSON.stringify({ sector, tipoNegocio, problema, objetivo, presupuesto, lang }),
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
    const full = EXAMPLE_MD[lang];
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
    setPhase('form'); setStep(0); setSector(null);
    setTipoNegocio(''); setProblema(''); setObjetivo(''); setPresupuesto('');
    setMd(''); setIsExample(false); setError(''); setCopied('');
    setLeadPhase('idle'); setLeadName(''); setLeadEmail(''); setLeadContacto(''); setLeadError('');
  }

  function flash(what: string) { setCopied(what); setTimeout(() => setCopied(''), 2000); }

  function copyMensaje() {
    const msg = extractSection(md, t.msgNeedle) || md;
    navigator.clipboard?.writeText(msg).then(() => flash('mensaje'), () => { /* noop */ });
  }

  async function share() {
    const title = extractTitle(md) || 'Vera AI';
    const text = md.replace(/[#*]/g, '');
    const nav = navigator as Navigator & { share?: (d: { title: string; text: string }) => Promise<void> };
    if (nav.share) { try { await nav.share({ title, text }); return; } catch { /* cancelado */ } }
    navigator.clipboard?.writeText(text).then(() => flash('compartir'), () => { /* noop */ });
  }

  function exportPDF() {
    const title = extractTitle(md) || 'Vera AI';
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(title)} · Vera AI</title>
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
  <div class="foot">${esc(t.disc(isExample))}</div>
</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 350);
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    if (!leadEmail.trim() && !leadContacto.trim()) { setLeadError(t.leadErrContact); return; }
    setLeadPhase('sending');
    setLeadError('');
    try {
      const res = await fetch('/api/vera-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName, email: leadEmail, contacto: leadContacto, company_url: leadHoneypot,
          sector, tipoNegocio, problema, objetivo, presupuesto, proposal: md, isExample, lang,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo enviar.');
      setLeadPhase('sent');
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : 'Error.');
      setLeadPhase('error');
    }
  }

  const LangToggle = (
    <div className={styles.langToggle} role="group" aria-label="Idioma / Language">
      {(['es', 'en'] as Lang[]).map((l) => (
        <button key={l} className={`${styles.langBtn} ${lang === l ? styles.langOn : ''}`} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  /* ─────────────── Propuesta (streaming / resultado) ─────────────── */
  if (phase === 'streaming' || phase === 'result') {
    const title = extractTitle(md);
    const streaming = phase === 'streaming';
    return (
      <div className={styles.wrap}>
        <div className={styles.resultHead}>
          <span className={styles.badge}>{isExample ? t.badgeEx : t.badgeReal}</span>
          {title && <h3 className={styles.resultTitle}>{title}</h3>}
        </div>

        <div className={styles.proposal}>
          <div className={styles.md} dangerouslySetInnerHTML={{ __html: mdToHtml(md) }} />
          {streaming && <span className={styles.cursor} aria-hidden="true" />}
        </div>

        {!streaming && (
          <>
            <div className={styles.exportBar}>
              <button className={styles.toolBtn} onClick={exportPDF}>{t.pdf}</button>
              <button className={styles.toolBtn} onClick={share}>{copied === 'compartir' ? t.copiedW : t.share}</button>
              <button className={styles.toolBtn} onClick={copyMensaje}>{copied === 'mensaje' ? t.copiedW : t.copyMsg}</button>
            </div>

            {leadPhase === 'sent' ? (
              <div className={styles.leadDone}>
                <span className={styles.leadDoneIco} aria-hidden="true">✓</span>
                <div><b>{t.leadDoneT}</b><p>{t.leadDoneP}</p></div>
              </div>
            ) : (
              <form className={styles.lead} onSubmit={submitLead}>
                <h4 className={styles.leadTitle}>{t.leadTitle}</h4>
                <p className={styles.leadSub}>{t.leadSub}</p>
                <div className={styles.leadRow}>
                  <input className={styles.leadInput} placeholder={t.leadName} value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                  <input className={styles.leadInput} type="email" placeholder={t.leadEmail} value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
                  <input className={styles.leadInput} placeholder={t.leadContact} value={leadContacto} onChange={(e) => setLeadContacto(e.target.value)} />
                </div>
                <input className={styles.hp} tabIndex={-1} autoComplete="off" aria-hidden="true" value={leadHoneypot} onChange={(e) => setLeadHoneypot(e.target.value)} />
                {leadError && <p className={styles.leadErr}>{leadError}</p>}
                <button className={styles.leadBtn} type="submit" disabled={leadPhase === 'sending'}>
                  {leadPhase === 'sending' ? t.leadSending : t.leadSend}
                </button>
                <small className={styles.leadPriv}>{t.leadPriv}</small>
              </form>
            )}

            <div className={styles.resultActions}>
              <button className={styles.secondary} onClick={reset}>{t.again}</button>
            </div>
            <p className={styles.disclaimer}>{t.disc(isExample)}</p>
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
            <button className={styles.secondary} onClick={showExample}>{t.seeExample}</button>
            <button className={styles.primary} onClick={() => setPhase('form')}>{t.retry}</button>
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
          {t.steps.map((label, i) => (
            <div key={label} className={`${styles.progStep} ${i === step ? styles.progOn : ''} ${i < step ? styles.progDone : ''}`}>
              <span>{i + 1}</span>{label}
            </div>
          ))}
        </div>
        <div className={styles.topActions}>
          {LangToggle}
          <button className={styles.exampleLink} onClick={showExample}>{t.example}</button>
        </div>
      </div>

      <div className={styles.panel}>
        {step === 0 && (
          <>
            <h3 className={styles.q}>{t.qSector}</h3>
            <div className={styles.sectors}>
              {SECTORES.map((s) => (
                <button key={s.id} className={`${styles.sector} ${sector === s.id ? styles.sectorOn : ''}`} onClick={() => setSector(s.id)}>
                  <span className={styles.sectorIco} aria-hidden="true">{s.icon}</span>
                  <span>{s.nombre[lang]}</span>
                </button>
              ))}
            </div>
          </>
        )}
        {step === 1 && <StepText q={t.qTipo} value={tipoNegocio} onChange={setTipoNegocio} placeholder={t.phTipo} chips={activeSector?.ejTipo[lang] || []} />}
        {step === 2 && <StepText q={t.qProblema} value={problema} onChange={setProblema} placeholder={t.phProblema} chips={activeSector?.ejProblema[lang] || []} />}
        {step === 3 && <StepText q={t.qObjetivo} value={objetivo} onChange={setObjetivo} placeholder={t.phObjetivo} chips={activeSector?.ejObjetivo[lang] || []} />}
        {step === 4 && (
          <>
            <h3 className={styles.q}>{t.qPresupuesto}</h3>
            <div className={styles.chips}>
              {t.presupuestos.map((b) => (
                <button key={b} className={`${styles.chip} ${presupuesto === b ? styles.chipOn : ''}`} onClick={() => setPresupuesto(b)}>{b}</button>
              ))}
            </div>
            <input className={styles.input} value={t.presupuestos.includes(presupuesto) ? '' : presupuesto} onChange={(e) => setPresupuesto(e.target.value)} placeholder={t.phPresupuesto} />
          </>
        )}
      </div>

      <div className={styles.nav}>
        <button className={styles.secondary} onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>{t.back}</button>
        {step < 4 ? (
          <button className={styles.primary} onClick={() => setStep((s) => s + 1)} disabled={!canNext}>{t.next}</button>
        ) : (
          <button className={styles.primary} onClick={submit} disabled={!canNext}>{t.generate}</button>
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
