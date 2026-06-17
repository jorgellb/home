import { useEffect, useRef, useState } from 'react';
import styles from '../mapa/MapaNeuronal.module.css';

/* Estratega de marketing — visualización del "motor de marketing" (marca + canales)
   que cambia por sector/empresa + agente que genera la estrategia en vivo. */

const SECTORES = [
  'Inmobiliaria', 'Clínica / Estética', 'Despacho profesional', 'Agencia',
  'Ecommerce', 'Reformas / Construcción', 'Hotel', 'Restaurante',
  'Consultoría', 'Logística', 'Educación', 'Otro',
];

const DEFAULT_NODES = ['SEO Local', 'Google Ads', 'Instagram', 'Email', 'Contenido', 'Reseñas', 'WhatsApp', 'Web', 'Vídeo', 'Referidos', 'Newsletter', 'Analítica'];

const SECTOR_NODES: Record<string, string[]> = {
  'Inmobiliaria': ['SEO Local', 'Portales', 'Google Ads', 'Instagram', 'Email', 'Reseñas', 'WhatsApp', 'Vídeo tours', 'Captación', 'Web', 'Referidos', 'Newsletter'],
  'Clínica / Estética': ['Google Maps', 'Reseñas', 'Instagram', 'Email', 'WhatsApp', 'SEO Local', 'Recordatorios', 'Antes/Después', 'Contenido', 'Ads', 'Fidelización', 'Referidos'],
  'Despacho profesional': ['SEO Local', 'LinkedIn', 'Contenido', 'Email', 'Reseñas', 'Google Ads', 'Web', 'Webinars', 'Referidos', 'Newsletter', 'Casos', 'Analítica'],
  'Agencia': ['LinkedIn', 'SEO', 'Contenido', 'Email', 'Casos', 'Referidos', 'Webinars', 'Ads', 'Portfolio', 'Newsletter', 'Eventos', 'Analítica'],
  'Ecommerce': ['SEO', 'Google Ads', 'Email', 'Instagram', 'TikTok', 'Contenido', 'Remarketing', 'Influencers', 'Reseñas', 'Carritos', 'Newsletter', 'Analítica'],
  'Reformas / Construcción': ['Google Maps', 'Reseñas', 'SEO Local', 'Google Ads', 'Instagram', 'Antes/Después', 'WhatsApp', 'Web', 'Referidos', 'Vídeo', 'Presupuestos', 'Fidelización'],
  'Hotel': ['Reseñas', 'Instagram', 'Google Ads', 'Email', 'Reserva directa', 'SEO', 'TikTok', 'Web', 'Influencers', 'Newsletter', 'Fidelización', 'Metabuscadores'],
  'Restaurante': ['Reseñas', 'Instagram', 'Google Maps', 'WhatsApp', 'TikTok', 'Email', 'Reservas', 'Web', 'Carta QR', 'Influencers', 'Eventos', 'Fidelización'],
  'Consultoría': ['LinkedIn', 'Contenido', 'SEO', 'Email', 'Webinars', 'Casos', 'Referidos', 'Newsletter', 'Ads', 'Eventos', 'Lead magnet', 'Analítica'],
  'Logística': ['SEO', 'LinkedIn', 'Google Ads', 'Email', 'Contenido', 'Web', 'Casos', 'Referidos', 'Newsletter', 'Ferias', 'Reseñas', 'Analítica'],
  'Educación': ['SEO Local', 'Instagram', 'Google Ads', 'Email', 'TikTok', 'Contenido', 'Reseñas', 'WhatsApp', 'Jornadas', 'Referidos', 'Newsletter', 'Webinars'],
  'Otro': DEFAULT_NODES,
};

const PALETTE = ['#4fe3ff', '#8ad753', '#9b7bff', '#ffd24a', '#ff9b3a', '#c6ff3a', '#18e0ff', '#5eead4'];
const isHot = (s: string) => /ads|google ads|remarket|influencer|tiktok|paid|campañ/i.test(s); // canales "calientes" (pago) resaltados

function esc(s: string) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function inl(s: string) { return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); }
function mdToHtml(md: string): string {
  const lines = md.split('\n'); let html = ''; let list: 'ul' | null = null;
  const close = () => { if (list) { html += '</ul>'; list = null; } };
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) { close(); continue; }
    if (t.startsWith('## ')) { close(); html += `<h4>${inl(t.slice(3))}</h4>`; continue; }
    if (t.startsWith('# ')) continue;
    const m = t.match(/^[-*]\s+(.*)$/);
    if (m) { if (!list) { html += '<ul>'; list = 'ul'; } html += `<li>${inl(m[1])}</li>`; continue; }
    close(); html += `<p>${inl(t)}</p>`;
  }
  close(); return html;
}
function title(md: string) { const l = md.split('\n').find((x) => /^#\s+/.test(x.trim()) && !x.trim().startsWith('## ')); return l ? l.trim().replace(/^#\s+/, '') : ''; }
function parseChannels(md: string): string[] {
  const lines = md.split('\n'); let cap = false; const out: string[] = [];
  for (const l of lines) {
    const t = l.trim();
    if (t.startsWith('## ')) { if (cap) break; cap = /canal/i.test(t); continue; }
    if (cap) {
      const m = t.match(/^[-*]\s+(.*)$/);
      if (m) { const b = m[1].match(/\*\*([^*]+)\*\*/); const s = (b ? b[1] : m[1].split(/[–\-:(]/)[0]).trim(); if (s) out.push(s.slice(0, 16)); }
    }
  }
  return out;
}

type Phase = 'idle' | 'streaming' | 'result' | 'error';

export default function EstrategiaMarketing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<{ l: string; c: string; alert: boolean; ang: number; rr: number; ph: number }[]>([]);
  const pairsRef = useRef<[number, number][]>([]);

  const [sector, setSector] = useState<string | null>(null);
  const [tipo, setTipo] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [md, setMd] = useState('');
  const [error, setError] = useState('');

  function setGraph(labels: string[]) {
    const ls = labels.filter(Boolean).slice(0, 12);
    nodesRef.current = ls.map((l, i, a) => ({
      l: l.toUpperCase(),
      alert: isHot(l),
      c: isHot(l) ? '#ff9b3a' : PALETTE[i % PALETTE.length],
      ang: (i / a.length) * Math.PI * 2,
      rr: 0.74 + 0.16 * (i % 3),
      ph: Math.random() * Math.PI * 2,
    }));
    const n = ls.length;
    const pairs: [number, number][] = [];
    for (let i = 0; i < n; i++) { const j = (i + 2 + (i % 3)) % n; if (i !== j) pairs.push([i, j]); }
    pairsRef.current = pairs.slice(0, Math.min(10, n));
  }
  if (!nodesRef.current.length) setGraph(DEFAULT_NODES);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const resize = () => {
      W = parent.clientWidth || 320; H = parent.clientHeight || 360;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(parent);

    let t = 0, raf = 0;
    const dot = (x: number, y: number, r: number, color: string, blur: number) => {
      ctx.save(); ctx.shadowBlur = blur; ctx.shadowColor = color; ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.5, cy = H * 0.5;
      const ringR = Math.min(W, H) * 0.42;
      const NODES = nodesRef.current;
      const PAIRS = pairsRef.current;
      const pts = NODES.map((n) => {
        const ang = n.ang + 0.08 * Math.sin(t * 0.25 + n.ph);
        const rad = ringR * n.rr + 6 * Math.sin(t * 0.8 + n.ph);
        return { x: cx + Math.cos(ang) * rad, y: cy + Math.sin(ang) * rad * 0.82, c: n.c, l: n.l, alert: n.alert };
      });

      pts.forEach((p, i) => {
        const grad = ctx.createLinearGradient(cx, cy, p.x, p.y);
        grad.addColorStop(0, 'rgba(120,200,255,0.05)');
        grad.addColorStop(1, p.c + '33');
        ctx.strokeStyle = grad; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); ctx.stroke();
        const f = ((t * 0.28 + i * 0.16) % 1);
        dot(cx + (p.x - cx) * f, cy + (p.y - cy) * f, 2, p.c, 8);
      });
      PAIRS.forEach(([a, b], i) => {
        const pa = pts[a], pb = pts[b]; if (!pa || !pb) return;
        ctx.strokeStyle = 'rgba(150,180,230,0.07)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
        const f = ((t * 0.22 + i * 0.27) % 1);
        dot(pa.x + (pb.x - pa.x) * f, pa.y + (pb.y - pa.y) * f, 1.6, pb.c, 6);
      });

      const pulse = 1 + 0.12 * Math.sin(t * 1.6);
      const coreR = Math.min(W, H) * 0.07 * pulse;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.4);
      cg.addColorStop(0, 'rgba(110,230,255,0.95)');
      cg.addColorStop(0.4, 'rgba(40,170,255,0.35)');
      cg.addColorStop(1, 'rgba(40,170,255,0)');
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, coreR * 2.4, 0, Math.PI * 2); ctx.fill();
      dot(cx, cy, coreR, '#bff0ff', 26);

      ctx.font = '600 10px ui-monospace, monospace'; ctx.textAlign = 'center';
      pts.forEach((p) => {
        const r = p.alert ? 5 + Math.abs(Math.sin(t * 3)) * 2 : 4.5;
        dot(p.x, p.y, r, p.c, 14);
        if (p.alert) { ctx.strokeStyle = p.c + '88'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(p.x, p.y, r + 4 + Math.sin(t * 3) * 2, 0, Math.PI * 2); ctx.stroke(); }
        ctx.fillStyle = 'rgba(220,235,250,0.82)';
        ctx.fillText(p.l, p.x, p.y - 11);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  async function generate(sec: string, detail = '') {
    setSector(sec);
    setGraph(SECTOR_NODES[sec] || DEFAULT_NODES);
    setPhase('streaming'); setMd(''); setError('');
    const ctrl = new AbortController();
    const wd = setTimeout(() => ctrl.abort(), 45000);
    try {
      const res = await fetch('/api/marketing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector: sec, tipoNegocio: detail }), signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        let m = 'No se pudo generar la estrategia.'; try { const j = await res.json(); if (j?.error) m = j.error; } catch { /* noop */ }
        throw new Error(m);
      }
      const reader = res.body.getReader(); const dec = new TextDecoder(); let acc = '';
      for (;;) { const { done, value } = await reader.read(); if (done) break; acc += dec.decode(value, { stream: true }); setMd(acc); }
      const n = parseChannels(acc); if (n.length >= 4) setGraph(n);
      setPhase('result');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado.'); setPhase('error');
    } finally { clearTimeout(wd); }
  }

  function reset() { setPhase('idle'); setMd(''); setError(''); setSector(null); setGraph(DEFAULT_NODES); }

  const streaming = phase === 'streaming';

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <span className={styles.coreTag}>TU MARCA</span>
        <span className={styles.liveTag}><i /> {sector ? sector : 'motor de marketing'}</span>
      </div>

      <div className={styles.panel}>
        {phase === 'idle' && (
          <>
            <span className={styles.kicker}>✦ Demo · Estrategia con IA</span>
            <h3 className={styles.h3}>Genera tu estrategia de marketing</h3>
            <p className={styles.lead}>Escribe a qué se dedica tu empresa: el motor de la izquierda se reconfigura con tus canales y la IA diseña, en vivo, tu estrategia (público, canales, mensajes, plan y KPIs).</p>
            <div className={styles.genrow}>
              <input
                className={styles.input}
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && tipo.trim()) generate(tipo.trim()); }}
                placeholder="Ej.: restaurante familiar en Mojácar, tienda online de moda…"
              />
              <button className={styles.gen} onClick={() => tipo.trim() && generate(tipo.trim())} disabled={!tipo.trim()}>✦ Generar</button>
            </div>
            <span className={styles.orline}>o elige un sector</span>
            <div className={styles.chips}>
              {SECTORES.map((s) => (
                <button key={s} className={styles.chip} onClick={() => generate(s, tipo.trim())}>{s}</button>
              ))}
            </div>
          </>
        )}

        {(streaming || phase === 'result') && (
          <div className={styles.result}>
            <span className={styles.kicker}>✦ {sector}{streaming ? ' · generando…' : ''}</span>
            {title(md) && <h3 className={styles.h3}>{title(md)}</h3>}
            <div className={styles.md} dangerouslySetInnerHTML={{ __html: mdToHtml(md) }} />
            {streaming && <span className={styles.caret} aria-hidden="true" />}
            {!streaming && (
              <div className={styles.actions}>
                <a className={styles.primary} href="/contacto/">Quiero esta estrategia en mi empresa →</a>
                <button className={styles.secondary} onClick={reset}>↻ Otro negocio</button>
              </div>
            )}
          </div>
        )}

        {phase === 'error' && (
          <div className={styles.result}>
            <p className={styles.err}>{error}</p>
            <button className={styles.secondary} onClick={reset}>Volver</button>
          </div>
        )}
      </div>
    </div>
  );
}
