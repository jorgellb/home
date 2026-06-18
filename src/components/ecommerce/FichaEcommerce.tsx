import { useRef, useState, type FormEvent } from 'react';
import styles from './FichaEcommerce.module.css';

/* "Almería Commerce-AI Engine" — sube una o VARIAS fotos de producto y la IA de
   visión genera fichas de e-commerce completas (análisis visual + copy ES/EN/FR/DE
   + variantes + SEO + backend). Exporta a CSV/PDF, copia campos y capta leads. */

interface Spec { clave: string; valor: string }
interface Ficha {
  analisis_visual_ia?: { producto_detectado?: string; paleta_colores_hex?: string[]; calidad_percibida?: string };
  ficha_ecommerce_es?: { seo_title?: string; h1_title?: string; precio_sugerido_eur?: string; descripcion_corta?: string; storytelling_emocional?: string; caracteristicas_tecnicas?: Spec[]; tags_seo?: string[]; titulos_alternativos?: string[] };
  ficha_ecommerce_en?: { h1_title_en?: string; descripcion_corta_en?: string; storytelling_en?: string };
  ficha_ecommerce_fr?: { h1_title_fr?: string; descripcion_corta_fr?: string };
  ficha_ecommerce_de?: { h1_title_de?: string; descripcion_corta_de?: string };
  automatizacion_backend?: { slug_url?: string; sku_sugerido?: string; categoria_sugerida?: string; query_sql_insert?: string };
}
interface Item { id: number; preview: string; status: 'pending' | 'loading' | 'done' | 'error'; ficha?: Ficha; error?: string; isExample?: boolean }
type Lang = 'es' | 'en' | 'fr' | 'de';

const EXAMPLE: Ficha = {
  analisis_visual_ia: { producto_detectado: 'Capazo de esparto artesanal con asas de cuero', paleta_colores_hex: ['#D9C59A', '#8A6A3B', '#3E2C1B'], calidad_percibida: 'Artesanal Premium' },
  ficha_ecommerce_es: {
    seo_title: 'Capazo de Esparto Artesanal con Asas de Cuero | Almería',
    h1_title: 'Capazo de Esparto Hecho a Mano · Asas de Cuero Natural',
    precio_sugerido_eur: '49,90 €',
    descripcion_corta: 'Capazo tejido a mano en esparto natural con asas de cuero auténtico. Resistente, ligero y con el alma del Mediterráneo.',
    storytelling_emocional: 'Tejido a mano siguiendo una tradición almeriense de generaciones, cada capazo guarda el sol, la sal y la calma del Mediterráneo. El esparto, recogido en la sierra, se entrelaza con paciencia hasta convertirse en una pieza única; el cuero curtido aporta carácter y durabilidad. No es un bolso: es un trozo de Almería que te acompaña a la playa, al mercado o a la mesa.',
    caracteristicas_tecnicas: [
      { clave: 'Material', valor: 'Esparto natural trenzado + cuero auténtico' },
      { clave: 'Origen', valor: 'Hecho a mano en Almería, España' },
      { clave: 'Capacidad', valor: 'Aprox. 18 L' },
      { clave: 'Acabado', valor: 'Asas de cuero cosidas a mano' },
    ],
    tags_seo: ['capazo esparto', 'cesta artesanal', 'bolso playa Almería', 'hecho a mano', 'esparto natural'],
    titulos_alternativos: ['Cesta de Esparto Mediterránea con Asas de Cuero', 'Capazo Artesano de Playa · Esparto y Cuero de Almería'],
  },
  ficha_ecommerce_en: {
    h1_title_en: 'Handmade Esparto Basket Bag · Natural Leather Handles',
    descripcion_corta_en: 'Hand-woven natural esparto basket with authentic leather handles. Light, sturdy and full of Mediterranean soul.',
    storytelling_en: 'Hand-woven in Almería following a craft passed down through generations, every basket carries the sun and calm of the Mediterranean. Authentic Spanish craftsmanship meets timeless design — genuine Mediterranean luxury to take from the beach to the market.',
  },
  ficha_ecommerce_fr: { h1_title_fr: 'Panier en Sparte Fait Main · Anses en Cuir Naturel', descripcion_corta_fr: 'Panier tissé à la main en sparte naturel avec anses en cuir authentique. Léger, robuste et plein d’âme méditerranéenne.' },
  ficha_ecommerce_de: { h1_title_de: 'Handgefertigte Esparto-Korbtasche · Echte Lederhenkel', descripcion_corta_de: 'Handgewebte Korbtasche aus natürlichem Esparto mit echten Lederhenkeln. Leicht, robust und voller mediterraner Seele.' },
  automatizacion_backend: { slug_url: 'capazo-esparto-artesanal-asas-cuero', sku_sugerido: 'PROD-ESP-001', categoria_sugerida: 'Cestería artesanal > Capazos', query_sql_insert: "INSERT INTO products (sku, name, price, stock) VALUES ('PROD-ESP-001', 'Capazo de Esparto Hecho a Mano', 49.90, 50);" },
};

function fileToDataURL(file: File, max = 1024, q = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.width, h = img.height;
      if (Math.max(w, h) > max) { const s = max / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const ctx = c.getContext('2d'); if (!ctx) { reject(new Error('no ctx')); return; }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(c.toDataURL('image/jpeg', q));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo leer la imagen.')); };
    img.src = url;
  });
}
function priceNum(p: unknown): number { const m = String(p ?? '').replace(',', '.').match(/[\d.]+/); return m ? parseFloat(m[0]) || 0 : 0; }
const csvCell = (s: unknown) => `"${String(s ?? '').replace(/"/g, '""')}"`;

export default function FichaEcommerce() {
  const [items, setItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [working, setWorking] = useState(false);
  const [lang, setLang] = useState<Lang>('es');
  const [copied, setCopied] = useState('');
  const idSeq = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lead
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadPhase, setLeadPhase] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadContacto, setLeadContacto] = useState('');
  const [leadHp, setLeadHp] = useState('');
  const [leadError, setLeadError] = useState('');

  const active = items.find((i) => i.id === activeId) || null;

  async function onFiles(files: FileList | null) {
    if (!files || !files.length) return;
    const list = Array.from(files).filter((f) => /^image\//.test(f.type)).slice(0, 10);
    if (!list.length) return;
    const built: Item[] = [];
    for (const f of list) {
      try { const preview = await fileToDataURL(f); built.push({ id: ++idSeq.current, preview, status: 'pending' }); } catch { /* skip */ }
    }
    if (!built.length) return;
    setItems(built);
    setActiveId(built[0].id);
    setLang('es');
    processQueue(built);
  }

  async function processQueue(queue: Item[]) {
    setWorking(true);
    for (const it of queue) {
      setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, status: 'loading' } : p)));
      try {
        const res = await fetch('/api/ecommerce-ficha', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: it.preview }) });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || 'No se pudo analizar.');
        setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, status: 'done', ficha: data.ficha } : p)));
      } catch (e) {
        setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, status: 'error', error: e instanceof Error ? e.message : 'Error' } : p)));
      }
    }
    setWorking(false);
  }

  function showExample() {
    const it: Item = { id: ++idSeq.current, preview: '', status: 'done', ficha: EXAMPLE, isExample: true };
    setItems([it]); setActiveId(it.id); setLang('es');
  }
  function reset() {
    setItems([]); setActiveId(null); setWorking(false); setLeadOpen(false); setLeadPhase('idle');
    setLeadName(''); setLeadEmail(''); setLeadContacto(''); setLeadError('');
  }
  function flash(w: string) { setCopied(w); setTimeout(() => setCopied(''), 1800); }
  function copy(text: string, w: string) { navigator.clipboard?.writeText(text).then(() => flash(w), () => { /* noop */ }); }

  function downloadCSV(f: Ficha) {
    const es = f.ficha_ecommerce_es || {}; const be = f.automatizacion_backend || {}; const v = f.analisis_visual_ia || {};
    const body = `<p>${(es.descripcion_corta || '')}</p><p>${(es.storytelling_emocional || '')}</p>`;
    const rows = [
      ['Handle', 'Title', 'Body (HTML)', 'Tags', 'Category', 'Variant SKU', 'Variant Price'],
      [be.slug_url || '', es.h1_title || v.producto_detectado || '', body, (es.tags_seo || []).join(', '), be.categoria_sugerida || '', be.sku_sugerido || '', String(priceNum(es.precio_sugerido_eur))],
    ];
    const csv = rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${be.slug_url || 'producto'}.csv`; a.click(); URL.revokeObjectURL(a.href);
  }

  function exportPDF(f: Ficha) {
    const es = f.ficha_ecommerce_es || {}; const en = f.ficha_ecommerce_en || {}; const v = f.analisis_visual_ia || {}; const be = f.automatizacion_backend || {};
    const esc = (s: unknown) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const specs = (es.caracteristicas_tecnicas || []).map((s) => `<tr><td style="color:#888;padding:3px 10px 3px 0">${esc(s.clave)}</td><td>${esc(s.valor)}</td></tr>`).join('');
    const w = window.open('', '_blank'); if (!w) return;
    w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(es.h1_title || v.producto_detectado)} · Ficha</title>
<style>body{font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;color:#1a1714;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.55}.brand{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#18a0c8;font-weight:800}h1{font-size:26px;margin:.3rem 0 .4rem}.price{font-size:22px;font-weight:800;color:#0a7f3f}.muted{color:#666;font-size:12px}h2{font-size:15px;margin:1.4rem 0 .3rem;color:#18a0c8}table{border-collapse:collapse;font-size:14px}.tags span{display:inline-block;background:#eef;border-radius:4px;padding:2px 7px;margin:2px;font-size:12px}.foot{margin-top:2rem;border-top:1px solid #e5ddcf;padding-top:1rem;font-size:11px;color:#888}</style></head><body>
<div class="brand">✦ Almería Commerce-AI · platanitorico.com</div>
<h1>${esc(es.h1_title || v.producto_detectado)}</h1>
<p class="price">${esc(es.precio_sugerido_eur)}</p>
<p class="muted">SEO: ${esc(es.seo_title)} · SKU: ${esc(be.sku_sugerido)} · ${esc(be.categoria_sugerida)}</p>
<h2>Descripción</h2><p>${esc(es.descripcion_corta)}</p><p><em>${esc(es.storytelling_emocional)}</em></p>
<h2>Especificaciones</h2><table>${specs}</table>
<h2>Tags</h2><div class="tags">${(es.tags_seo || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
${en.h1_title_en ? `<h2>English</h2><p><b>${esc(en.h1_title_en)}</b></p><p>${esc(en.descripcion_corta_en)}</p><p><em>${esc(en.storytelling_en)}</em></p>` : ''}
<div class="foot">Ficha generada por IA con fines de demostración. Precios orientativos.</div>
</body></html>`);
    w.document.close(); w.focus(); setTimeout(() => w.print(), 350);
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    if (!leadEmail.trim() && !leadContacto.trim()) { setLeadError('Déjanos un email o un teléfono/WhatsApp.'); return; }
    setLeadPhase('sending'); setLeadError('');
    const f = active?.ficha;
    const ctx = `Producto: ${f?.ficha_ecommerce_es?.h1_title || f?.analisis_visual_ia?.producto_detectado || '—'}. (Interesado en automatizar fichas de catálogo).`;
    try {
      const res = await fetch('/api/vera-lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadName, email: leadEmail, contacto: leadContacto, company_url: leadHp, source: 'ecommerce', proposal: ctx, sector: 'Ecommerce' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string })?.error || 'No se pudo enviar.');
      setLeadPhase('sent'); setLeadOpen(false);
    } catch (err) { setLeadError(err instanceof Error ? err.message : 'Error.'); setLeadPhase('error'); }
  }

  /* ─────────── Idle: subir ─────────── */
  if (!items.length) {
    return (
      <div className={styles.wrap}>
        <div className={styles.drop} role="button" tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.click(); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}>
          <span className={styles.dropIco} aria-hidden="true">📷</span>
          <p className={styles.dropTitle}>Sube una o varias fotos de producto</p>
          <p className={styles.dropSub}>Arrastra imágenes o haz clic. La IA las convierte en fichas de e-commerce completas (ES · EN · FR · DE, SEO, SKU, SQL) y las exportas a tu tienda.</p>
          <span className={styles.dropBtn}>Elegir fotos</span>
          <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
        </div>
        <div className={styles.exampleRow}>
          <span>¿Sin foto a mano?</span>
          <button className={styles.exampleBtn} onClick={showExample}>⚡ Ver ejemplo: Capazo de esparto</button>
        </div>
      </div>
    );
  }

  const f = active?.ficha;
  const es = f?.ficha_ecommerce_es || {}; const en = f?.ficha_ecommerce_en || {}; const fr = f?.ficha_ecommerce_fr || {}; const de = f?.ficha_ecommerce_de || {}; const v = f?.analisis_visual_ia || {}; const be = f?.automatizacion_backend || {};
  const langs: { k: Lang; label: string }[] = [
    { k: 'es', label: '🇪🇸 ES' },
    ...(en.h1_title_en ? [{ k: 'en' as Lang, label: '🇬🇧 EN' }] : []),
    ...(fr.h1_title_fr ? [{ k: 'fr' as Lang, label: '🇫🇷 FR' }] : []),
    ...(de.h1_title_de ? [{ k: 'de' as Lang, label: '🇩🇪 DE' }] : []),
  ];
  const cur = lang === 'es' ? { h1: es.h1_title, desc: es.descripcion_corta, story: es.storytelling_emocional }
    : lang === 'en' ? { h1: en.h1_title_en, desc: en.descripcion_corta_en, story: en.storytelling_en }
    : lang === 'fr' ? { h1: fr.h1_title_fr, desc: fr.descripcion_corta_fr, story: '' }
    : { h1: de.h1_title_de, desc: de.descripcion_corta_de, story: '' };

  return (
    <div className={styles.wrap}>
      {/* tira de lote */}
      {items.length > 1 && (
        <div className={styles.batch}>
          {items.map((it) => (
            <button key={it.id} className={`${styles.batchItem} ${it.id === activeId ? styles.batchOn : ''}`} onClick={() => { setActiveId(it.id); setLang('es'); }} title={it.ficha?.ficha_ecommerce_es?.h1_title || ''}>
              {it.preview ? <img src={it.preview} alt="" /> : <span>🧺</span>}
              <span className={`${styles.batchDot} ${styles['st_' + it.status]}`} />
            </button>
          ))}
          {working && <span className={styles.batchInfo}>Analizando {items.filter((i) => i.status === 'done').length}/{items.length}…</span>}
        </div>
      )}

      {active?.status === 'loading' && (
        <div className={styles.state}>
          {active.preview && <img className={styles.loadingImg} src={active.preview} alt="" />}
          <div className={styles.spinner} aria-hidden="true" /><p>Analizando la imagen…</p>
          <span>Detectando producto, paleta y redactando la ficha en 4 idiomas.</span>
        </div>
      )}

      {active?.status === 'error' && (
        <div className={styles.state}>
          <div className={styles.errIco} aria-hidden="true">!</div><p>{active.error}</p>
          <button className={styles.secondary} onClick={reset}>Volver</button>
        </div>
      )}

      {active?.status === 'done' && f && (
        <div className={styles.sheet}>
          <div className={styles.resultHead}>
            <span className={styles.badge}>{active.isExample ? '✦ Ejemplo · Capazo de esparto' : '✦ Ficha generada por IA'}</span>
            <h3 className={styles.prodName}>{es.h1_title || v.producto_detectado || 'Producto'}</h3>
          </div>

          <div className={styles.grid}>
            <article className={`${styles.card} ${styles.cardVisual}`}>
              <div className={styles.thumb}>{active.preview ? <img src={active.preview} alt="Producto" /> : <span className={styles.thumbPh} aria-hidden="true">🧺</span>}</div>
              <div className={styles.visualInfo}>
                <span className={styles.cardLabel}>👁️ Análisis visual IA</span>
                <p className={styles.detected}>{v.producto_detectado}</p>
                {v.calidad_percibida && <span className={styles.quality}>{v.calidad_percibida}</span>}
                <div className={styles.palette}>{(v.paleta_colores_hex || []).map((c, i) => <span key={i} className={styles.swatch} style={{ background: c }} title={c}><b>{c}</b></span>)}</div>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.langTabs}>
                {langs.map((l) => <button key={l.k} className={`${styles.langTab} ${lang === l.k ? styles.langOn : ''}`} onClick={() => setLang(l.k)}>{l.label}</button>)}
              </div>
              {lang === 'es' && es.seo_title && <p className={styles.seo}>SEO: {es.seo_title}</p>}
              {lang === 'es' && es.precio_sugerido_eur && <p className={styles.price}>{es.precio_sugerido_eur}</p>}
              {cur.h1 && <p className={styles.h1en}>{cur.h1}</p>}
              {lang === 'es' && !!es.titulos_alternativos?.length && (
                <div className={styles.variants}>
                  <span>Variantes de título:</span>
                  {es.titulos_alternativos.map((t, i) => <button key={i} className={styles.variant} onClick={() => copy(t, 'v' + i)}>{copied === 'v' + i ? '✓ copiado' : t}</button>)}
                </div>
              )}
              {cur.desc && <p className={styles.short}>{cur.desc}</p>}
              {cur.story && <p className={styles.story}>{cur.story}</p>}
              {lang === 'es' && !!es.caracteristicas_tecnicas?.length && (
                <table className={styles.specs}><tbody>{es.caracteristicas_tecnicas.map((s, i) => <tr key={i}><td>{s.clave}</td><td>{s.valor}</td></tr>)}</tbody></table>
              )}
              {lang === 'es' && !!es.tags_seo?.length && <div className={styles.tags}>{es.tags_seo.map((t, i) => <span key={i}>#{t}</span>)}</div>}
              <div className={styles.fieldCopy}>
                <button onClick={() => copy(cur.h1 || '', 'title')}>{copied === 'title' ? '✓' : '⧉'} Título</button>
                <button onClick={() => copy(cur.desc || '', 'desc')}>{copied === 'desc' ? '✓' : '⧉'} Descripción</button>
              </div>
            </article>

            <article className={`${styles.card} ${styles.cardBackend}`}>
              <span className={styles.cardLabel}>⚙️ Automatización backend</span>
              <div className={styles.kv}><b>Slug</b><code>{be.slug_url}</code></div>
              <div className={styles.kv}><b>SKU</b><code>{be.sku_sugerido}</code></div>
              <div className={styles.kv}><b>Categoría</b><span>{be.categoria_sugerida}</span></div>
              {be.query_sql_insert && (
                <div className={styles.sqlBox}>
                  <div className={styles.sqlHead}><span>SQL · INSERT</span><button onClick={() => copy(be.query_sql_insert!, 'sql')}>{copied === 'sql' ? '✓ Copiado' : 'Copiar'}</button></div>
                  <pre><code>{be.query_sql_insert}</code></pre>
                </div>
              )}
            </article>

            <article className={`${styles.card} ${styles.cardExport}`}>
              <span className={styles.cardLabel}>⬇️ Exportar a tu tienda</span>
              <p className={styles.exportSub}>Lleva la ficha a Shopify, WooCommerce o tu base de datos.</p>
              <div className={styles.exportBtns}>
                <button onClick={() => downloadCSV(f)}>⬇ CSV (Shopify/Woo)</button>
                <button onClick={() => exportPDF(f)}>⬇ PDF</button>
                <button onClick={() => copy(JSON.stringify(f, null, 2), 'json')}>{copied === 'json' ? '✓ JSON' : '⧉ Copiar JSON'}</button>
              </div>
            </article>
          </div>

          {/* Lead */}
          {leadPhase === 'sent' ? (
            <div className={styles.leadDone}>✓ ¡Recibido! Te contactaremos para automatizar tu catálogo.</div>
          ) : leadOpen ? (
            <form className={styles.lead} onSubmit={submitLead}>
              <b>📩 Automatiza tu catálogo entero</b>
              <p>Déjanos tus datos y te enseñamos cómo generar miles de fichas como esta.</p>
              <div className={styles.leadRow}>
                <input placeholder="Nombre (opcional)" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                <input type="email" placeholder="Tu email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
                <input placeholder="WhatsApp / teléfono" value={leadContacto} onChange={(e) => setLeadContacto(e.target.value)} />
              </div>
              <input className={styles.hp} tabIndex={-1} aria-hidden="true" value={leadHp} onChange={(e) => setLeadHp(e.target.value)} />
              {leadError && <p className={styles.leadErr}>{leadError}</p>}
              <button className={styles.primary} type="submit" disabled={leadPhase === 'sending'}>{leadPhase === 'sending' ? 'Enviando…' : 'Enviar →'}</button>
            </form>
          ) : (
            <button className={styles.leadCta} onClick={() => setLeadOpen(true)}>📩 ¿Quieres esto para todo tu catálogo? Déjanos tus datos</button>
          )}

          <div className={styles.actions}>
            <button className={styles.secondary} onClick={reset}>↻ Analizar otras fotos</button>
            <a className={styles.primary} href="/contacto/">Quiero esto en mi tienda →</a>
          </div>
          <p className={styles.disc}>Fichas {active.isExample ? 'de ejemplo ' : ''}generadas por IA con fines de demostración. Precios orientativos.</p>
        </div>
      )}
    </div>
  );
}
