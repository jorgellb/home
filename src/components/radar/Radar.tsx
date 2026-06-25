import { useState, type FormEvent } from 'react';
import styles from './Radar.module.css';

/* "Radar captador de clientes" — herramienta privada. Busca negocios reales por
   sector y pueblo (datos públicos de OpenStreetMap), los ordena por oportunidad
   (sobre todo, si no tienen web) y redacta el mensaje de contacto con IA. */

interface Negocio { nombre: string; web: string | null; telefono: string | null; redes: string[]; lat: number | null; lon: number | null; score: number; motivos: string[] }
interface Data { pueblo: string; sector: string; total: number; sinWeb: number; negocios: Negocio[]; cache?: boolean }
interface Msg { phase: 'idle' | 'loading' | 'done' | 'error'; whatsapp?: string; asunto?: string; email?: string; error?: string }

const SECTORS: [string, string][] = [
  ['peluqueria', 'Peluquerías'], ['belleza', 'Estética y uñas'], ['restaurante', 'Restaurantes'],
  ['bar', 'Bares y cafeterías'], ['dentista', 'Clínicas dentales'], ['fisio', 'Fisioterapia / clínicas'],
  ['veterinario', 'Veterinarios'], ['inmobiliaria', 'Inmobiliarias'], ['abogado', 'Abogados / gestorías'],
  ['gimnasio', 'Gimnasios'], ['ropa', 'Tiendas de ropa'], ['floristeria', 'Floristerías'],
  ['taller', 'Talleres mecánicos'], ['panaderia', 'Panaderías y pastelerías'], ['ferreteria', 'Ferreterías y bricolaje'],
  ['hotel', 'Hoteles y alojamientos'],
];

export default function Radar({ apiKey }: { apiKey: string }) {
  const [pueblo, setPueblo] = useState('Almería');
  const [sector, setSector] = useState('peluqueria');
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState('');
  const [msgs, setMsgs] = useState<Record<number, Msg>>({});
  const [copied, setCopied] = useState('');

  function flash(id: string) { setCopied(id); setTimeout(() => setCopied(''), 1500); }
  function copy(text: string, id: string) { navigator.clipboard?.writeText(text).then(() => flash(id), () => { /* noop */ }); }

  async function search(e?: FormEvent) {
    e?.preventDefault();
    if (!pueblo.trim()) { setError('Indica un pueblo o zona.'); return; }
    setError(''); setPhase('loading'); setData(null); setMsgs({});
    try {
      const res = await fetch('/api/radar/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ k: apiKey, pueblo: pueblo.trim(), sector }) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((d as { error?: string })?.error || 'No se pudo buscar.');
      setData(d as Data); setPhase('done');
    } catch (err) { setError(err instanceof Error ? err.message : 'Error inesperado.'); setPhase('error'); }
  }

  async function prepararMensaje(i: number, n: Negocio) {
    setMsgs((p) => ({ ...p, [i]: { phase: 'loading' } }));
    try {
      const res = await fetch('/api/radar-mensaje/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ k: apiKey, negocio: n.nombre, sector: data?.sector, pueblo: data?.pueblo, sinWeb: !n.web, redes: n.redes }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((d as { error?: string })?.error || 'No se pudo redactar.');
      setMsgs((p) => ({ ...p, [i]: { phase: 'done', ...(d as object) } }));
    } catch (err) { setMsgs((p) => ({ ...p, [i]: { phase: 'error', error: err instanceof Error ? err.message : 'Error' } })); }
  }

  function exportCSV() {
    if (!data) return;
    const cell = (s: unknown) => `"${String(s ?? '').replace(/"/g, '""')}"`;
    const rows = [['Negocio', 'Oportunidad', 'Web', 'Teléfono', 'Redes', 'Motivos']];
    data.negocios.forEach((n) => rows.push([n.nombre, String(n.score), n.web || '—', n.telefono || '—', n.redes.join(' '), n.motivos.join('; ')]));
    const csv = rows.map((r) => r.map(cell).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `radar-${sector}-${data.pueblo}.csv`; a.click(); URL.revokeObjectURL(a.href);
  }

  const mapsLink = (n: Negocio) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.nombre + ' ' + (data?.pueblo || ''))}`;
  const dotClass = (s: number) => (s >= 8 ? styles.hot : s >= 5 ? styles.warm : styles.cold);

  return (
    <div className={styles.wrap}>
      <form className={styles.bar} onSubmit={search}>
        <div className={styles.fieldP}>
          <label>Pueblo o zona</label>
          <input value={pueblo} onChange={(e) => setPueblo(e.target.value)} placeholder="Ej: Roquetas de Mar" maxLength={60} />
        </div>
        <div className={styles.fieldS}>
          <label>Sector</label>
          <select value={sector} onChange={(e) => setSector(e.target.value)}>
            {SECTORS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </div>
        <button className={styles.go} type="submit" disabled={phase === 'loading'}>{phase === 'loading' ? 'Rastreando…' : '🔍 Rastrear'}</button>
      </form>

      {error && <p className={styles.err}>{error}</p>}

      {phase === 'loading' && (
        <div className={styles.loading}><div className={styles.radar} aria-hidden="true" /><p>Rastreando negocios en {pueblo}…</p></div>
      )}

      {phase === 'done' && data && (
        <>
          <div className={styles.summary}>
            <div className={styles.kpis}>
              <span><b>{data.total}</b> negocios</span>
              <span className={styles.kpiHot}><b>{data.sinWeb}</b> sin web 🔥</span>
              <span><b>{data.total - data.sinWeb}</b> con web</span>
            </div>
            <div className={styles.sumActions}>
              {data.cache && <span className={styles.cacheTag}>desde caché</span>}
              <button className={styles.csv} onClick={exportCSV}>⬇ CSV</button>
            </div>
          </div>

          {data.negocios.length === 0 ? (
            <p className={styles.empty}>No se han encontrado negocios de este sector en la zona. Prueba otro pueblo o sector.</p>
          ) : (
            <ul className={styles.list}>
              {data.negocios.map((n, i) => {
                const m = msgs[i];
                return (
                  <li key={i} className={styles.row}>
                    <div className={styles.main}>
                      <span className={`${styles.dot} ${dotClass(n.score)}`} title={`Oportunidad ${n.score}/10`}>{n.score}</span>
                      <div className={styles.info}>
                        <b className={styles.name}>{n.nombre}</b>
                        <div className={styles.badges}>
                          {n.web ? <a className={styles.bWeb} href={n.web.startsWith('http') ? n.web : `https://${n.web}`} target="_blank" rel="noopener">🌐 web</a> : <span className={styles.bNoweb}>🚫 sin web</span>}
                          {n.telefono ? <a className={styles.bTel} href={`tel:${n.telefono.replace(/\s/g, '')}`}>📞 {n.telefono}</a> : <span className={styles.bMute}>sin teléfono</span>}
                          {n.redes.map((r) => <span key={r} className={styles.bSocial}>📷 {r}</span>)}
                          <a className={styles.bMap} href={mapsLink(n)} target="_blank" rel="noopener">📍 mapa</a>
                        </div>
                        <span className={styles.motivos}>{n.motivos.join(' · ')}</span>
                      </div>
                      <button className={styles.prep} onClick={() => prepararMensaje(i, n)} disabled={m?.phase === 'loading'}>
                        {m?.phase === 'loading' ? '✍️…' : m?.phase === 'done' ? '↻ Rehacer' : '✉️ Mensaje'}
                      </button>
                    </div>

                    {m?.phase === 'error' && <p className={styles.msgErr}>{m.error}</p>}
                    {m?.phase === 'done' && (
                      <div className={styles.msgBox}>
                        <div className={styles.msgCol}>
                          <div className={styles.msgHead}><span>💬 WhatsApp</span><button onClick={() => copy(m.whatsapp || '', `wa${i}`)}>{copied === `wa${i}` ? '✓ copiado' : 'Copiar'}</button></div>
                          <p>{m.whatsapp}</p>
                          {n.telefono && <a className={styles.waSend} href={`https://wa.me/${('34' + n.telefono.replace(/\D/g, '')).replace(/^3434/, '34')}?text=${encodeURIComponent(m.whatsapp || '')}`} target="_blank" rel="noopener">Abrir en WhatsApp →</a>}
                        </div>
                        <div className={styles.msgCol}>
                          <div className={styles.msgHead}><span>✉️ Email</span><button onClick={() => copy(`${m.asunto}\n\n${m.email}`, `em${i}`)}>{copied === `em${i}` ? '✓ copiado' : 'Copiar'}</button></div>
                          <p className={styles.asunto}><b>Asunto:</b> {m.asunto}</p>
                          <p>{m.email}</p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <p className={styles.ethics}>
            Datos públicos de OpenStreetMap. Úsalo para contacto comercial B2B conforme a la ley (LSSI/RGPD):
            identifícate siempre, ofrece algo relevante y respeta a quien te pida no volver a escribir.
          </p>
        </>
      )}
    </div>
  );
}
