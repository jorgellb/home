import { useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './SonidoMarca.module.css';

/* "Sonido de Marca" — la IA compone el logo sonoro y el jingle; aquí se sintetiza
   con Web Audio (timbres + reverb), se dibuja la onda y se exporta a WAV. */

interface Nota { nota: string; dur: number }
interface Brief {
  concepto: string; bpm: number; escala: string; instrumento: string; adjetivos: string[];
  logo_sonoro: Nota[]; jingle: { acordes: string[]; melodia: Nota[] };
}
type Phase = 'form' | 'loading' | 'done' | 'error';
type Part = 'logo' | 'jingle';

const VIBES = ['cálido', 'enérgico', 'elegante', 'divertido', 'tecnológico', 'relajado'];

const SEMI: Record<string, number> = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
function midi(name: string): number { const m = name.match(/^([A-G])(#|b)?(\d)$/); if (!m) return 60; return SEMI[m[1] + (m[2] || '')] + (parseInt(m[3]) + 1) * 12; }
const freq = (mi: number) => 440 * Math.pow(2, (mi - 69) / 12);

const CHORDS: Record<string, string[]> = { C: ['C', 'E', 'G'], G: ['G', 'B', 'D'], Am: ['A', 'C', 'E'], F: ['F', 'A', 'C'], D: ['D', 'F#', 'A'], Em: ['E', 'G', 'B'], A: ['A', 'C#', 'E'], E: ['E', 'G#', 'B'], Dm: ['D', 'F', 'A'], Bm: ['B', 'D', 'F#'] };
const chordMidis = (c: string) => (CHORDS[c] || CHORDS.C).map((pc) => 48 + SEMI[pc]);

interface Instr { type: OscillatorType; partials: [number, number][]; attack: number; decay: number }
const INSTR: Record<string, Instr> = {
  marimba: { type: 'triangle', partials: [[1, 1], [4, 0.22], [9, 0.07]], attack: 0.004, decay: 0.45 },
  campanas: { type: 'sine', partials: [[1, 1], [2, 0.5], [2.76, 0.34], [5.4, 0.14]], attack: 0.004, decay: 1.6 },
  piano: { type: 'triangle', partials: [[1, 1], [2, 0.38], [3, 0.16]], attack: 0.005, decay: 0.9 },
  pluck: { type: 'sawtooth', partials: [[1, 0.7], [2, 0.22]], attack: 0.003, decay: 0.4 },
  pad: { type: 'sine', partials: [[1, 1], [2, 0.28], [0.5, 0.4]], attack: 0.12, decay: 0.6 },
};

function impulse(ctx: BaseAudioContext, dur = 1.5, decay = 2.4): AudioBuffer {
  const rate = ctx.sampleRate, len = Math.floor(rate * dur);
  const buf = ctx.createBuffer(2, len, rate);
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
  return buf;
}

function voice(ctx: BaseAudioContext, bus: AudioNode, instr: Instr, f: number, t0: number, dur: number, gain: number, sustain = false) {
  const g = ctx.createGain(); g.connect(bus);
  const oscs: OscillatorNode[] = [];
  for (const [mult, amp] of instr.partials) {
    const o = ctx.createOscillator(); o.type = instr.type; o.frequency.value = f * mult;
    const og = ctx.createGain(); og.gain.value = amp; o.connect(og); og.connect(g); oscs.push(o);
  }
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + instr.attack);
  let stop: number;
  if (sustain) { g.gain.setValueAtTime(gain, t0 + Math.max(0.05, dur - 0.18)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur); stop = t0 + dur + 0.05; }
  else { g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(0.1, instr.decay)); stop = t0 + Math.max(instr.decay, dur) + 0.08; }
  oscs.forEach((o) => { o.start(t0); o.stop(stop); });
}

async function render(brief: Brief, part: Part): Promise<AudioBuffer> {
  const spb = 60 / brief.bpm;
  const notes = part === 'logo' ? brief.logo_sonoro : brief.jingle.melodia;
  const totalBeats = notes.reduce((a, n) => a + n.dur, 0);
  const tail = (brief.instrumento === 'campanas' ? 1.8 : 0.9) + 0.2;
  const seconds = Math.max(1, totalBeats * spb + tail);
  const ctx = new OfflineAudioContext(2, Math.ceil(44100 * seconds), 44100);

  const comp = ctx.createDynamicsCompressor();
  const master = ctx.createGain(); master.gain.value = 0.85; master.connect(comp); comp.connect(ctx.destination);
  const dry = ctx.createGain(); dry.gain.value = 0.82; dry.connect(master);
  const conv = ctx.createConvolver(); conv.buffer = impulse(ctx); const wet = ctx.createGain(); wet.gain.value = part === 'logo' ? 0.3 : 0.22; conv.connect(wet); wet.connect(master);
  const bus = ctx.createGain(); bus.connect(dry); bus.connect(conv);

  const instr = INSTR[brief.instrumento] || INSTR.marimba;
  let t = 0.06;
  for (const n of notes) { voice(ctx, bus, instr, freq(midi(n.nota)), t, n.dur * spb, 0.5); t += n.dur * spb; }

  if (part === 'jingle') {
    const ch = brief.jingle.acordes.length ? brief.jingle.acordes : ['C', 'G', 'Am', 'F'];
    const totalSec = totalBeats * spb; const each = totalSec / ch.length;
    ch.forEach((c, ci) => chordMidis(c).forEach((m) => voice(ctx, bus, INSTR.pad, freq(m), 0.06 + ci * each, each, 0.14, true)));
  }
  return ctx.startRendering();
}

function bufToWav(buf: AudioBuffer): Blob {
  const nc = buf.numberOfChannels, len = buf.length, rate = buf.sampleRate;
  const ab = new ArrayBuffer(44 + len * nc * 2); const v = new DataView(ab);
  const w = (o: number, s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + len * nc * 2, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); v.setUint16(22, nc, true); v.setUint32(24, rate, true); v.setUint32(28, rate * nc * 2, true);
  v.setUint16(32, nc * 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, len * nc * 2, true);
  let off = 44; const chans: Float32Array[] = []; for (let c = 0; c < nc; c++) chans.push(buf.getChannelData(c));
  for (let i = 0; i < len; i++) for (let c = 0; c < nc; c++) { const s = Math.max(-1, Math.min(1, chans[c][i])); v.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true); off += 2; }
  return new Blob([ab], { type: 'audio/wav' });
}

function drawWave(canvas: HTMLCanvasElement | null, buf: AudioBuffer, color: string) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const W = canvas.width = canvas.clientWidth * 2, H = canvas.height = canvas.clientHeight * 2;
  ctx.clearRect(0, 0, W, H);
  const data = buf.getChannelData(0); const step = Math.floor(data.length / W) || 1;
  ctx.fillStyle = color;
  for (let x = 0; x < W; x++) {
    let min = 1, max = -1;
    for (let i = 0; i < step; i++) { const d = data[x * step + i] || 0; if (d < min) min = d; if (d > max) max = d; }
    const y1 = (1 + min) * H / 2, y2 = (1 + max) * H / 2;
    ctx.fillRect(x, y1, 1, Math.max(2, y2 - y1));
  }
}

const EXAMPLE: Brief = {
  concepto: 'Un motivo cálido y luminoso, como el primer sorbo de café al sol. Marimba redonda sobre acordes mayores que transmiten cercanía y optimismo.',
  bpm: 96, escala: 'C_major', instrumento: 'marimba', adjetivos: ['cálido', 'cercano', 'optimista'],
  logo_sonoro: [{ nota: 'G4', dur: 0.5 }, { nota: 'C5', dur: 0.5 }, { nota: 'E5', dur: 1 }],
  jingle: { acordes: ['C', 'G', 'Am', 'F'], melodia: [{ nota: 'E5', dur: 0.5 }, { nota: 'G5', dur: 0.5 }, { nota: 'C6', dur: 1 }, { nota: 'B5', dur: 0.5 }, { nota: 'A5', dur: 0.5 }, { nota: 'G5', dur: 1 }, { nota: 'E5', dur: 0.5 }, { nota: 'F5', dur: 0.5 }, { nota: 'G5', dur: 1 }] },
};

export default function SonidoMarca() {
  const [phase, setPhase] = useState<Phase>('form');
  const [nombre, setNombre] = useState('');
  const [vibe, setVibe] = useState('cálido');
  const [sector, setSector] = useState('');
  const [brief, setBrief] = useState<Brief | null>(null);
  const [error, setError] = useState('');
  const [isExample, setIsExample] = useState(false);
  const [playing, setPlaying] = useState<Part | null>(null);

  const buffers = useRef<{ logo?: AudioBuffer; jingle?: AudioBuffer }>({});
  const liveCtx = useRef<AudioContext | null>(null);
  const src = useRef<AudioBufferSourceNode | null>(null);
  const logoCanvas = useRef<HTMLCanvasElement>(null);
  const jingleCanvas = useRef<HTMLCanvasElement>(null);

  // Lead
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadPhase, setLeadPhase] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [leadName, setLeadName] = useState(''); const [leadEmail, setLeadEmail] = useState('');
  const [leadContacto, setLeadContacto] = useState(''); const [leadHp, setLeadHp] = useState(''); const [leadError, setLeadError] = useState('');

  useEffect(() => () => { try { src.current?.stop(); liveCtx.current?.close(); } catch { /* noop */ } }, []);

  async function build(b: Brief, example: boolean) {
    setError(''); setIsExample(example); setBrief(b); setPhase('loading');
    try {
      const [logo, jingle] = await Promise.all([render(b, 'logo'), render(b, 'jingle')]);
      buffers.current = { logo, jingle };
      setPhase('done');
      requestAnimationFrame(() => {
        drawWave(logoCanvas.current, logo, '#18e0ff');
        drawWave(jingleCanvas.current, jingle, '#c6ff3a');
      });
    } catch { setError('No se pudo sintetizar el audio en este navegador.'); setPhase('error'); }
  }

  async function generate(e?: FormEvent) {
    e?.preventDefault();
    if (!nombre.trim()) { setError('Dinos el nombre de la marca.'); return; }
    setError(''); setPhase('loading'); setBrief(null);
    try {
      const res = await fetch('/api/sonido-marca/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre: nombre.trim(), vibe, sector: sector.trim() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo componer.');
      await build((data as { brief: Brief }).brief, false);
    } catch (err) { setError(err instanceof Error ? err.message : 'Error inesperado.'); setPhase('error'); }
  }

  function stop() { try { src.current?.stop(); } catch { /* noop */ } src.current = null; setPlaying(null); }
  async function play(part: Part) {
    const buf = buffers.current[part]; if (!buf) return;
    if (!liveCtx.current) liveCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = liveCtx.current; if (ctx.state === 'suspended') await ctx.resume();
    stop();
    const s = ctx.createBufferSource(); s.buffer = buf; s.connect(ctx.destination); s.onended = () => { if (src.current === s) { src.current = null; setPlaying(null); } };
    s.start(); src.current = s; setPlaying(part);
  }
  function download(part: Part) {
    const buf = buffers.current[part]; if (!buf) return;
    const a = document.createElement('a'); a.href = URL.createObjectURL(bufToWav(buf));
    a.download = `${(brief && nombre || 'marca').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'marca'}-${part}.wav`; a.click(); URL.revokeObjectURL(a.href);
  }

  function reset() {
    stop(); setPhase('form'); setBrief(null); setError(''); setIsExample(false); buffers.current = {};
    setLeadOpen(false); setLeadPhase('idle'); setLeadName(''); setLeadEmail(''); setLeadContacto(''); setLeadError('');
  }

  async function submitLead(ev: FormEvent) {
    ev.preventDefault();
    if (!leadEmail.trim() && !leadContacto.trim()) { setLeadError('Déjanos un email o un teléfono/WhatsApp.'); return; }
    setLeadPhase('sending'); setLeadError('');
    const ctx = `Sonido de marca para "${nombre || 'marca'}" (${vibe}). Interesado en identidad sonora profesional.`;
    try {
      const res = await fetch('/api/vera-lead/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: leadName, email: leadEmail, contacto: leadContacto, company_url: leadHp, source: 'sonido', proposal: ctx, sector: 'Identidad sonora', isExample }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo enviar.');
      setLeadPhase('sent'); setLeadOpen(false);
    } catch (err) { setLeadError(err instanceof Error ? err.message : 'Error.'); setLeadPhase('error'); }
  }

  /* ── FORM ── */
  if (phase === 'form' || (phase === 'loading' && !brief)) {
    const loading = phase === 'loading';
    return (
      <div className={styles.wrap}>
        <form className={styles.form} onSubmit={generate}>
          <label className={styles.field}><span>Nombre de la marca <i>*</i></span>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Café Solsticio" maxLength={60} disabled={loading} />
          </label>
          <label className={styles.field}><span>Carácter sonoro</span>
            <div className={styles.vibes}>
              {VIBES.map((v) => <button type="button" key={v} className={`${styles.vibe} ${vibe === v ? styles.on : ''}`} onClick={() => setVibe(v)} disabled={loading}>{v}</button>)}
            </div>
          </label>
          <label className={styles.field}><span>Sector <em>(opcional)</em></span>
            <input value={sector} onChange={(e) => setSector(e.target.value)} placeholder="Ej: cafetería de especialidad" maxLength={80} disabled={loading} />
          </label>
          {error && <p className={styles.err}>{error}</p>}
          <div className={styles.formBtns}>
            <button type="submit" className={styles.primary} disabled={loading}>{loading ? '🎼 Componiendo…' : '🎼 Componer el sonido'}</button>
            <button type="button" className={styles.ghost} onClick={() => build(EXAMPLE, true)} disabled={loading}>⚡ Ver ejemplo</button>
          </div>
          <p className={styles.hint}>La IA compone el motivo y un mini-jingle; se sintetiza aquí mismo y lo descargas en WAV.</p>
        </form>
      </div>
    );
  }

  if (phase === 'loading') {
    return <div className={styles.wrap}><div className={styles.state}><div className={styles.eq} aria-hidden="true"><span /><span /><span /><span /><span /></div><p>Sintetizando el audio…</p></div></div>;
  }
  if (phase === 'error') {
    return <div className={styles.wrap}><div className={styles.state}><div className={styles.errIco}>!</div><p>{error}</p><button className={styles.ghost} onClick={reset}>← Volver</button></div></div>;
  }

  const b = brief!;
  const Player = ({ part, label, color, canvasRef }: { part: Part; label: string; color: string; canvasRef: React.RefObject<HTMLCanvasElement | null> }) => (
    <div className={styles.player} style={{ ['--c' as string]: color }}>
      <div className={styles.pHead}><b>{label}</b><span>{part === 'logo' ? `${b.logo_sonoro.length} notas` : `${b.jingle.melodia.length} notas · ${b.jingle.acordes.join(' ')}`}</span></div>
      <canvas ref={canvasRef} className={styles.wave} />
      <div className={styles.pBtns}>
        <button className={styles.play} onClick={() => (playing === part ? stop() : play(part))}>{playing === part ? '■ Parar' : '▶ Reproducir'}</button>
        <button className={styles.dl} onClick={() => download(part)}>⬇ WAV</button>
      </div>
    </div>
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.result}>
        <div className={styles.brief}>
          <span className={styles.badges}>
            <i>🎹 {b.instrumento}</i><i>🎵 {b.escala.replace('_', ' ')}</i><i>⏱ {b.bpm} BPM</i>
          </span>
          {b.concepto && <p className={styles.concepto}>{b.concepto}</p>}
          {!!b.adjetivos.length && <div className={styles.adjs}>{b.adjetivos.map((a, i) => <span key={i}>{a}</span>)}</div>}
        </div>

        <div className={styles.players}>
          <Player part="logo" label="Logo sonoro" color="#18e0ff" canvasRef={logoCanvas} />
          <Player part="jingle" label="Jingle" color="#c6ff3a" canvasRef={jingleCanvas} />
        </div>

        {leadPhase === 'sent' ? (
          <div className={styles.leadDone}>✓ ¡Recibido! Te producimos la versión de estudio de tu sonido de marca.</div>
        ) : leadOpen ? (
          <form className={styles.lead} onSubmit={submitLead}>
            <b>📩 Quiero mi sonido de marca pro</b>
            <p>Lo producimos con calidad de estudio y te lo entregamos listo para tus vídeos y redes.</p>
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
          <button className={styles.leadCta} onClick={() => setLeadOpen(true)}>📩 Quiero este sonido producido en calidad de estudio</button>
        )}

        <div className={styles.actions}>
          <button className={styles.ghost} onClick={reset}>↻ Otro sonido</button>
          <a className={styles.primary} href="/contacto/">Hablar con el estudio →</a>
        </div>
        <p className={styles.disc}>Síntesis generada por IA en tu navegador con fines de demostración{isExample ? ' · ejemplo' : ''}. La versión final la producimos a mano.</p>
      </div>
    </div>
  );
}
