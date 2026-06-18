import { useRef, useState } from 'react';
import styles from './FichaEcommerce.module.css';

/* "Almería Commerce-AI Engine" — sube la foto de un producto y la IA de visión
   genera una ficha de e-commerce completa (análisis visual + copy ES/EN + SEO +
   automatización de backend). Incluye un ejemplo instantáneo (capazo). */

interface Spec { clave: string; valor: string }
interface Ficha {
  analisis_visual_ia?: { producto_detectado?: string; paleta_colores_hex?: string[]; calidad_percibida?: string };
  ficha_ecommerce_es?: { seo_title?: string; h1_title?: string; precio_sugerido_eur?: string; descripcion_corta?: string; storytelling_emocional?: string; caracteristicas_tecnicas?: Spec[]; tags_seo?: string[] };
  ficha_ecommerce_en?: { h1_title_en?: string; descripcion_corta_en?: string; storytelling_en?: string };
  automatizacion_backend?: { slug_url?: string; sku_sugerido?: string; categoria_sugerida?: string; query_sql_insert?: string };
}

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
  },
  ficha_ecommerce_en: {
    h1_title_en: 'Handmade Esparto Basket Bag · Natural Leather Handles',
    descripcion_corta_en: 'Hand-woven natural esparto basket with authentic leather handles. Light, sturdy and full of Mediterranean soul.',
    storytelling_en: 'Hand-woven in Almería following a craft passed down through generations, every basket carries the sun and calm of the Mediterranean. Authentic Spanish craftsmanship meets timeless design — genuine Mediterranean luxury to take from the beach to the market.',
  },
  automatizacion_backend: {
    slug_url: 'capazo-esparto-artesanal-asas-cuero',
    sku_sugerido: 'PROD-ESP-001',
    categoria_sugerida: 'Cestería artesanal > Capazos',
    query_sql_insert: "INSERT INTO products (sku, name, price, stock) VALUES ('PROD-ESP-001', 'Capazo de Esparto Hecho a Mano', 49.90, 50);",
  },
};

type Phase = 'idle' | 'loading' | 'result' | 'error';

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

export default function FichaEcommerce() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [ficha, setFicha] = useState<Ficha | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isExample, setIsExample] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File | null) {
    if (!file) return;
    if (!/^image\//.test(file.type)) { setError('El archivo no es una imagen.'); setPhase('error'); return; }
    setIsExample(false);
    try {
      const data = await fileToDataURL(file);
      setPreview(data);
      analyze(data);
    } catch {
      setError('No se pudo procesar la imagen.'); setPhase('error');
    }
  }

  async function analyze(dataUrl: string) {
    setPhase('loading'); setError('');
    try {
      const res = await fetch('/api/ecommerce-ficha', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'No se pudo analizar la imagen.');
      setFicha(data.ficha); setPhase('result');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado.'); setPhase('error');
    }
  }

  function showExample() {
    setIsExample(true); setPreview(''); setFicha(EXAMPLE); setError(''); setPhase('result');
  }
  function reset() { setPhase('idle'); setFicha(null); setPreview(''); setIsExample(false); setError(''); }
  function copy(text: string, what: string) {
    navigator.clipboard?.writeText(text).then(() => { setCopied(what); setTimeout(() => setCopied(''), 2000); }, () => { /* noop */ });
  }

  /* ─── Resultado: la ficha ─── */
  if (phase === 'result' && ficha) {
    const v = ficha.analisis_visual_ia || {};
    const es = ficha.ficha_ecommerce_es || {};
    const en = ficha.ficha_ecommerce_en || {};
    const be = ficha.automatizacion_backend || {};
    return (
      <div className={styles.wrap}>
        <div className={styles.resultHead}>
          <span className={styles.badge}>{isExample ? '✦ Ejemplo · Capazo de esparto' : '✦ Ficha generada por IA'}</span>
          <h3 className={styles.prodName}>{es.h1_title || v.producto_detectado || 'Producto'}</h3>
        </div>

        <div className={styles.grid}>
          {/* Análisis visual */}
          <article className={`${styles.card} ${styles.cardVisual}`}>
            <div className={styles.thumb}>
              {preview
                ? <img src={preview} alt="Producto" />
                : <span className={styles.thumbPh} aria-hidden="true">🧺</span>}
            </div>
            <div className={styles.visualInfo}>
              <span className={styles.cardLabel}>👁️ Análisis visual IA</span>
              <p className={styles.detected}>{v.producto_detectado}</p>
              {v.calidad_percibida && <span className={styles.quality}>{v.calidad_percibida}</span>}
              <div className={styles.palette}>
                {(v.paleta_colores_hex || []).map((c, i) => (
                  <span key={i} className={styles.swatch} style={{ background: c }} title={c}><b>{c}</b></span>
                ))}
              </div>
            </div>
          </article>

          {/* Ficha ES */}
          <article className={styles.card}>
            <span className={styles.cardLabel}>🇪🇸 Ficha ES · SEO</span>
            {es.seo_title && <p className={styles.seo}>SEO: {es.seo_title}</p>}
            {es.precio_sugerido_eur && <p className={styles.price}>{es.precio_sugerido_eur}</p>}
            {es.descripcion_corta && <p className={styles.short}>{es.descripcion_corta}</p>}
            {es.storytelling_emocional && <p className={styles.story}>{es.storytelling_emocional}</p>}
            {!!es.caracteristicas_tecnicas?.length && (
              <table className={styles.specs}><tbody>
                {es.caracteristicas_tecnicas.map((s, i) => (
                  <tr key={i}><td>{s.clave}</td><td>{s.valor}</td></tr>
                ))}
              </tbody></table>
            )}
            {!!es.tags_seo?.length && (
              <div className={styles.tags}>{es.tags_seo.map((t, i) => <span key={i}>#{t}</span>)}</div>
            )}
          </article>

          {/* Ficha EN */}
          <article className={styles.card}>
            <span className={styles.cardLabel}>🇬🇧 Ficha EN · Mercado internacional</span>
            {en.h1_title_en && <p className={styles.h1en}>{en.h1_title_en}</p>}
            {en.descripcion_corta_en && <p className={styles.short}>{en.descripcion_corta_en}</p>}
            {en.storytelling_en && <p className={styles.story}>{en.storytelling_en}</p>}
          </article>

          {/* Backend */}
          <article className={`${styles.card} ${styles.cardBackend}`}>
            <span className={styles.cardLabel}>⚙️ Automatización backend</span>
            <div className={styles.kv}><b>Slug</b><code>{be.slug_url}</code></div>
            <div className={styles.kv}><b>SKU</b><code>{be.sku_sugerido}</code></div>
            <div className={styles.kv}><b>Categoría</b><span>{be.categoria_sugerida}</span></div>
            {be.query_sql_insert && (
              <div className={styles.sqlBox}>
                <div className={styles.sqlHead}><span>SQL · INSERT</span>
                  <button onClick={() => copy(be.query_sql_insert!, 'sql')}>{copied === 'sql' ? '✓ Copiado' : 'Copiar'}</button>
                </div>
                <pre><code>{be.query_sql_insert}</code></pre>
              </div>
            )}
          </article>
        </div>

        <div className={styles.actions}>
          <button className={styles.secondary} onClick={() => copy(JSON.stringify(ficha, null, 2), 'json')}>{copied === 'json' ? '✓ JSON copiado' : '⧉ Copiar JSON'}</button>
          <button className={styles.secondary} onClick={reset}>↻ Analizar otra foto</button>
          <a className={styles.primary} href="/contacto/">Quiero esto en mi tienda →</a>
        </div>
        <p className={styles.disc}>Ficha {isExample ? 'de ejemplo ' : ''}generada por IA con fines de demostración. Precios orientativos.</p>
      </div>
    );
  }

  if (phase === 'loading') {
    return (
      <div className={styles.wrap}>
        <div className={styles.state}>
          {preview && <img className={styles.loadingImg} src={preview} alt="" />}
          <div className={styles.spinner} aria-hidden="true" />
          <p>Analizando la imagen…</p>
          <span>Detectando producto, materiales, paleta y redactando la ficha.</span>
        </div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className={styles.wrap}>
        <div className={styles.state}>
          <div className={styles.errIco} aria-hidden="true">!</div>
          <p>{error}</p>
          <div className={styles.actions}>
            <button className={styles.secondary} onClick={showExample}>Ver un ejemplo</button>
            <button className={styles.primary} onClick={reset}>Probar otra foto</button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Idle: subir foto ─── */
  return (
    <div className={styles.wrap}>
      <div
        className={styles.drop}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0] || null); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.click(); }}
      >
        <span className={styles.dropIco} aria-hidden="true">📷</span>
        <p className={styles.dropTitle}>Sube la foto de un producto</p>
        <p className={styles.dropSub}>Arrastra una imagen o haz clic. La IA la convierte en una ficha de e-commerce completa (ES/EN, SEO, SKU, SQL).</p>
        <span className={styles.dropBtn}>Elegir foto</span>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0] || null)} />
      </div>
      <div className={styles.exampleRow}>
        <span>¿Sin foto a mano?</span>
        <button className={styles.exampleBtn} onClick={showExample}>⚡ Ver ejemplo: Capazo de esparto</button>
      </div>
    </div>
  );
}
