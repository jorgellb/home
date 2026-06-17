import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import styles from './AsistenteChat.module.css';

/* Asistente IA de Platanito Rico — chat conversacional sobre los servicios.
   Multivuelta con streaming desde /api/asistente. */

interface ChatMessage { role: 'user' | 'assistant'; content: string }

const GREETING =
  '¡Hola! 👋 Soy Vera, la asistente de Platanito Rico. Resuelvo tus dudas sobre webs, tiendas online, precios, plazos, mantenimiento… ¿En qué te ayudo?';

const SUGERENCIAS = [
  '¿Cuánto cuesta una web?',
  '¿En cuánto tiempo está lista?',
  'Quiero una tienda online',
  '¿Qué incluye el mantenimiento?',
];

function setLast(arr: ChatMessage[], content: string): ChatMessage[] {
  const copy = arr.slice();
  copy[copy.length - 1] = { ...copy[copy.length - 1], content };
  return copy;
}

export default function AsistenteChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const fresh = messages.length <= 1;

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;
    const history: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setStreaming(true);
    try {
      const res = await fetch('/api/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        let msg = 'Ahora mismo no puedo responder. Escríbenos a hola@platanitorico.com 🙏';
        try { const j = await res.json(); if (j?.error) msg = j.error; } catch { /* noop */ }
        setMessages((p) => setLast(p, msg));
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((p) => setLast(p, acc));
      }
    } catch {
      setMessages((p) => setLast(p, 'Uy, ha fallado la conexión. Inténtalo de nuevo en un momento.'));
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  function reset() {
    setMessages([{ role: 'assistant', content: GREETING }]);
    setInput('');
    setStreaming(false);
  }

  return (
    <div className={styles.chat}>
      <header className={styles.head}>
        <span className={styles.avatar} aria-hidden="true">V</span>
        <div className={styles.headInfo}>
          <b>Vera</b>
          <span className={styles.status}><i className={styles.dot} /> Asistente de Platanito Rico</span>
        </div>
        <button className={styles.reset} onClick={reset} aria-label="Reiniciar conversación">↻</button>
      </header>

      <div className={styles.log} ref={scrollRef}>
        {messages.map((m, i) => {
          const isUser = m.role === 'user';
          const isLast = i === messages.length - 1;
          const showTyping = !isUser && isLast && streaming && m.content === '';
          return (
            <div key={i} className={`${styles.row} ${isUser ? styles.rowUser : ''}`}>
              {!isUser && <span className={styles.bubbleAvatar} aria-hidden="true">V</span>}
              <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleBot}`}>
                {showTyping ? (
                  <span className={styles.typing} aria-label="escribiendo">
                    <i /><i /><i />
                  </span>
                ) : (
                  <span className={styles.text}>
                    {m.content}
                    {!isUser && isLast && streaming && m.content !== '' && <span className={styles.caret} aria-hidden="true" />}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {fresh && (
        <div className={styles.suggestions}>
          {SUGERENCIAS.map((s) => (
            <button key={s} className={styles.chip} onClick={() => send(s)} disabled={streaming}>{s}</button>
          ))}
        </div>
      )}

      <div className={styles.composer}>
        <input
          ref={inputRef}
          className={styles.field}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Escribe tu pregunta…"
          aria-label="Escribe tu pregunta"
        />
        <button className={styles.sendBtn} onClick={() => send(input)} disabled={streaming || !input.trim()} aria-label="Enviar">
          {streaming ? '…' : '➤'}
        </button>
      </div>
      <p className={styles.disclaimer}>Asistente con IA · demo. Para temas concretos te atiende una persona en hola@platanitorico.com.</p>
    </div>
  );
}
