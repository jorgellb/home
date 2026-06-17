import { useEffect, useRef, useState } from 'react';
import styles from './VozAsistente.module.css';

/* Asistente de VOZ de Platanito Rico. Hablas por el micro (Web Speech API STT),
   la pregunta va a /api/asistente (mismo cerebro que el chat) y la respuesta se
   reproduce con voz (SpeechSynthesis TTS). Degradación elegante si el navegador
   no soporta reconocimiento de voz. */

interface ChatMessage { role: 'user' | 'assistant'; content: string }
type Phase = 'idle' | 'listening' | 'thinking' | 'speaking';

/* eslint-disable @typescript-eslint/no-explicit-any */
function getSR(): any {
  if (typeof window === 'undefined') return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

export default function VozAsistente() {
  const [supported, setSupported] = useState(true);
  const [phase, setPhase] = useState<Phase>('idle');
  const [interim, setInterim] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState('');

  const recRef = useRef<any>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const phaseRef = useRef<Phase>('idle');
  const mutedRef = useRef(false);
  const messagesRef = useRef<ChatMessage[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { const el = logRef.current; if (el) el.scrollTop = el.scrollHeight; }, [messages, interim]);

  // Soporte + carga de voces TTS
  useEffect(() => {
    if (!getSR()) setSupported(false);
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    const load = () => { if (synth) voicesRef.current = synth.getVoices() || []; };
    load();
    synth?.addEventListener?.('voiceschanged', load);
    return () => {
      synth?.removeEventListener?.('voiceschanged', load);
      try { synth?.cancel(); } catch { /* noop */ }
      try { recRef.current?.abort?.(); } catch { /* noop */ }
    };
  }, []);

  function speak(text: string) {
    const synth = window.speechSynthesis;
    if (mutedRef.current || !synth) { setPhase('idle'); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    const v = voicesRef.current.find((x) => /es[-_]ES/i.test(x.lang)) || voicesRef.current.find((x) => x.lang?.startsWith('es'));
    if (v) u.voice = v;
    u.rate = 1.03;
    u.onstart = () => setPhase('speaking');
    u.onend = () => setPhase('idle');
    u.onerror = () => setPhase('idle');
    synth.speak(u);
  }

  async function ask(text: string) {
    const history: ChatMessage[] = [...messagesRef.current, { role: 'user', content: text }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setPhase('thinking');

    const ctrl = new AbortController();
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    const arm = () => { if (watchdog) clearTimeout(watchdog); watchdog = setTimeout(() => ctrl.abort(), 30000); };

    let acc = '';
    try {
      arm();
      const res = await fetch('/api/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        let msg = 'Ahora mismo no puedo responder. Escríbenos a hola@platanitorico.com.';
        try { const j = await res.json(); if (j?.error) msg = j.error; } catch { /* noop */ }
        acc = msg;
        setMessages((p) => withLast(p, msg));
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        arm();
        acc += dec.decode(value, { stream: true });
        setMessages((p) => withLast(p, acc));
      }
      if (!acc.trim()) { acc = 'Perdona, no me ha llegado respuesta. ¿Lo repetimos?'; setMessages((p) => withLast(p, acc)); }
    } catch {
      acc = acc.trim() || 'Se ha cortado la conexión. Inténtalo otra vez.';
      setMessages((p) => withLast(p, acc));
    } finally {
      if (watchdog) clearTimeout(watchdog);
    }
    speak(acc);
  }

  function startListening() {
    setError('');
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    try { synth?.cancel(); } catch { /* noop */ }
    const SR = getSR();
    if (!SR) { setSupported(false); return; }

    const rec = new SR();
    recRef.current = rec;
    rec.lang = 'es-ES';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e: any) => {
      let itr = '';
      let fin = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const tr = e.results[i][0].transcript;
        if (e.results[i].isFinal) fin += tr; else itr += tr;
      }
      setInterim(itr);
      if (fin.trim()) {
        setInterim('');
        try { rec.stop(); } catch { /* noop */ }
        ask(fin.trim());
      }
    };
    rec.onerror = (e: any) => {
      if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') {
        setError('No tengo permiso para el micrófono. Pulsa el icono a la izquierda de la dirección (controles del sitio) → Micrófono → Permitir, recarga y vuelve a intentarlo. Funciona mejor en Chrome.');
      } else if (e?.error === 'no-speech') {
        setError('No te he oído. Toca el micro y habla.');
      } else if (e?.error !== 'aborted') {
        setError('No se pudo escuchar. Inténtalo de nuevo.');
      }
      if (phaseRef.current === 'listening') setPhase('idle');
    };
    rec.onend = () => { if (phaseRef.current === 'listening') setPhase('idle'); };

    try { rec.start(); setPhase('listening'); setInterim(''); } catch { /* ya iniciado */ }
  }

  function stopAll() {
    try { recRef.current?.stop?.(); } catch { /* noop */ }
    try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
    setPhase('idle');
    setInterim('');
  }

  function onMic() {
    if (phase === 'listening' || phase === 'speaking' || phase === 'thinking') stopAll();
    else startListening();
  }

  function reset() {
    stopAll();
    setMessages([]);
    setError('');
  }

  const label =
    phase === 'listening' ? 'Escuchando… habla' :
    phase === 'thinking' ? 'Vera está pensando…' :
    phase === 'speaking' ? 'Vera está hablando…' :
    messages.length ? 'Toca para responder' : 'Toca y pregunta en voz alta';

  if (!supported) {
    return (
      <div className={styles.wrap}>
        <div className={styles.unsupported}>
          <span className={styles.uIco} aria-hidden="true">🎙️</span>
          <p>Tu navegador no soporta el reconocimiento de voz.</p>
          <span>Pruébalo en <strong>Chrome</strong> (móvil u ordenador), o usa el <a href="/asistente-ia/">asistente por chat</a>.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {messages.length > 0 && (
        <div className={styles.log} ref={logRef}>
          {messages.map((m, i) => (
            <div key={i} className={`${styles.row} ${m.role === 'user' ? styles.rowUser : ''}`}>
              <div className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}>
                {m.content || <span className={styles.dots}><i /><i /><i /></span>}
              </div>
            </div>
          ))}
          {interim && (
            <div className={`${styles.row} ${styles.rowUser}`}>
              <div className={`${styles.bubble} ${styles.bubbleUser} ${styles.bubbleInterim}`}>{interim}</div>
            </div>
          )}
        </div>
      )}

      <div className={styles.stage}>
        <button
          className={`${styles.mic} ${styles['mic_' + phase]}`}
          onClick={onMic}
          aria-label={phase === 'idle' ? 'Empezar a hablar' : 'Parar'}
        >
          <span className={styles.micGlow} aria-hidden="true" />
          <span className={styles.micIco} aria-hidden="true">
            {phase === 'listening' ? '■' : phase === 'speaking' ? '🔊' : '🎙️'}
          </span>
        </button>
        <p className={styles.label}>{label}</p>
        {interim && phase === 'listening' && <p className={styles.interimLine}>“{interim}”</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.tools}>
        <button className={styles.tool} onClick={() => setMuted((m) => !m)}>
          {muted ? '🔇 Voz desactivada' : '🔊 Voz activada'}
        </button>
        {messages.length > 0 && <button className={styles.tool} onClick={reset}>↻ Reiniciar</button>}
        <a className={styles.tool} href="/asistente-ia/">⌨ Prefiero escribir</a>
      </div>
      <p className={styles.hint}>Demo con IA. Mejor en Chrome y con permiso de micrófono. Para temas concretos te atiende una persona en hola@platanitorico.com.</p>
    </div>
  );
}

function withLast(arr: ChatMessage[], content: string): ChatMessage[] {
  const copy = arr.slice();
  copy[copy.length - 1] = { ...copy[copy.length - 1], content };
  return copy;
}
