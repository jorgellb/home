import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { readMany, statsEnabled } from '../../lib/stats';
import { listConversations } from '../../lib/chatlog';
import { chatText } from '../../lib/openrouter';

/* Resumen diario por email (Vercel Cron, 06:00 UTC ≈ 08:00 España). Recopila la
   actividad de AYER (visitas, demos, leads, conversaciones) desde Upstash, pide a
   la IA 2-3 recomendaciones y lo envía a la dirección del negocio. Protegido por
   CRON_SECRET (lo añade Vercel) o, para pruebas manuales, por ?k=STATS_KEY. */
export const prerender = false;

const TO_EMAIL = 'hola@platanitorico.com';
const FROM_EMAIL = 'web@platanitorico.com';
const FROM_NAME = 'Platanito Rico · Resumen diario';

const DEMOS: [string, string][] = [
  ['demo:vera', 'Vera · Propuestas'],
  ['demo:marca', 'Estudio de Marca'],
  ['demo:rayosx', 'Rayos X · Atención'],
  ['demo:tiempo', 'Máquina del Tiempo'],
  ['demo:config', 'Configurador 3D'],
  ['demo:sonido', 'Sonido de Marca'],
  ['demo:ecommerce', 'Commerce-AI · Visión'],
  ['demo:mapa', 'Mapa Neuronal'],
  ['demo:marketing', 'Estrategia Marketing'],
  ['demo:asistente', 'Asistente · Chat'],
];
const LEADS: [string, string][] = [
  ['lead:vera', 'Vera'], ['lead:marca', 'Marca'], ['lead:chat', 'Chat'], ['lead:ecommerce', 'Ecommerce'],
];
const PAGES: [string, string][] = [
  ['pv:/', 'Inicio'], ['pv:/laboratorio-ia/', 'Laboratorio IA'], ['pv:/vera-ai/', 'Vera AI'],
  ['pv:/estudio-marca/', 'Estudio de Marca'], ['pv:/rayos-x/', 'Rayos X'], ['pv:/maquina-tiempo/', 'Máquina Tiempo'], ['pv:/asistente-ia/', 'Asistente'],
  ['pv:/soluciones/empresa/', 'Empresa'], ['pv:/marketing/', 'Marketing'],
  ['pv:/soluciones/ecommerce/', 'Ecommerce'], ['pv:/probador-virtual-ar/', 'Probador AR'],
];

function dayUTC(offset: number): string {
  const d = new Date(); d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}
function esc(s: string): string { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function pct(now: number, prev: number): string {
  if (!prev) return now ? '+100%' : '0%';
  const p = Math.round(((now - prev) / prev) * 100);
  return (p >= 0 ? '+' : '') + p + '%';
}
function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

async function build() {
  const y = dayUTC(-1);          // ayer (UTC)
  const prev = dayUTC(-2);       // anteayer (para tendencia)
  const keys: string[] = [`stat:pv:all:${y}`, `stat:pv:all:${prev}`];
  for (const [ev] of [...DEMOS, ...LEADS, ...PAGES]) keys.push(`stat:${ev}:${y}`);
  const data = statsEnabled ? await readMany(keys) : {};
  const g = (ev: string, day = y) => data[`stat:${ev}:${day}`] || 0;

  const visits = g('pv:all'); const visitsPrev = data[`stat:pv:all:${prev}`] || 0;
  const demosTotal = DEMOS.reduce((a, [ev]) => a + g(ev), 0);
  const leadsTotal = LEADS.reduce((a, [ev]) => a + g(ev), 0);
  const topDemo = DEMOS.map(([ev, l]) => [l, g(ev)] as [string, number]).sort((a, b) => b[1] - a[1])[0];
  const topPage = PAGES.map(([ev, l]) => [l, g(ev)] as [string, number]).sort((a, b) => b[1] - a[1])[0];

  // Conversaciones de ayer (filtradas por fecha UTC).
  const convos = await listConversations(200);
  const convY = convos.filter((c) => new Date(c.updated || c.ts).toISOString().slice(0, 10) === y);
  const hot = convY.filter((c) => c.hot);
  const hotList = hot.slice(0, 5).map((c) => {
    const hhmm = new Date(c.updated || c.ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const first = c.msgs.find((m) => m.role === 'user');
    return { hhmm, text: first ? first.content.slice(0, 90) : '(sin texto)' };
  });

  return { y, visits, visitsPrev, demosTotal, leadsTotal, topDemo, topPage, convCount: convY.length, hotCount: hot.length, hotList };
}

type Digest = Awaited<ReturnType<typeof build>>;

async function recommend(d: Digest): Promise<string[]> {
  const apiKey = import.meta.env.OPENROUTER_API_KEY;
  if (!apiKey) return [];
  const facts = `Visitas ayer: ${d.visits} (anteayer ${d.visitsPrev}). Usos de demos: ${d.demosTotal} (top: ${d.topDemo?.[0]} ${d.topDemo?.[1]}). Leads: ${d.leadsTotal}. Conversaciones del chat: ${d.convCount}, de ellas posibles clientes: ${d.hotCount}. Página más vista: ${d.topPage?.[0]} (${d.topPage?.[1]}).`;
  const res = await chatText({
    apiKey, title: 'Resumen diario', temperature: 0.5, maxTokens: 320,
    messages: [
      { role: 'system', content: 'Eres el analista de una agencia web/IA en Almería. A partir de los datos de ayer, da 2 o 3 recomendaciones MUY concretas y accionables para hoy (captar más clientes, mejorar el sitio o atender leads). Una línea cada una, empezando por "- ". Español de España, sin relleno.' },
      { role: 'user', content: facts },
    ],
  });
  if (!res.ok) return [];
  return res.text.split('\n').map((l) => l.replace(/^[-*•\d.\s]+/, '').trim()).filter(Boolean).slice(0, 3);
}

function renderHtml(d: Digest, recs: string[]): string {
  const fecha = new Date(d.y + 'T12:00:00Z').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  const kpi = (label: string, val: string | number, extra = '') =>
    `<td style="padding:14px;background:#0e1420;border-radius:12px;text-align:center;width:25%"><div style="font-size:26px;font-weight:800;color:#18e0ff">${val}</div><div style="font-size:11px;color:#8fa0b6;text-transform:uppercase;letter-spacing:.06em">${esc(label)}</div>${extra}</td>`;
  const hotRows = d.hotList.length
    ? d.hotList.map((h) => `<tr><td style="padding:6px 0;color:#ffb24d;font-weight:700;white-space:nowrap;vertical-align:top">${esc(h.hhmm)}</td><td style="padding:6px 0 6px 12px;color:#e8edf5">${esc(h.text)}</td></tr>`).join('')
    : `<tr><td style="padding:6px 0;color:#8fa0b6">Ayer no hubo conversaciones marcadas como posible cliente.</td></tr>`;
  const recsHtml = recs.length
    ? `<h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#c6ff3a;margin:24px 0 8px">La IA recomienda</h2><ul style="margin:0;padding-left:18px;color:#d7e0ec;font-size:14px;line-height:1.6">${recs.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`
    : '';
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;background:#05070d">
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:24px auto;padding:24px;background:#0b111c;border-radius:14px;color:#e8edf5">
    <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#FF8a4d;font-weight:800;margin:0">★ Platanito Rico · Resumen diario</p>
    <h1 style="font-size:20px;margin:4px 0 2px">Lo que pasó ayer</h1>
    <p style="font-size:13px;color:#8fa0b6;margin:0 0 18px;text-transform:capitalize">${esc(fecha)}</p>
    <table style="width:100%;border-collapse:separate;border-spacing:8px 0"><tr>
      ${kpi('Visitas', d.visits, `<div style="font-size:11px;color:#8ad753">${pct(d.visits, d.visitsPrev)}</div>`)}
      ${kpi('Usos de demos', d.demosTotal)}
      ${kpi('Conversaciones', d.convCount)}
      ${kpi('Posibles clientes', d.hotCount)}
    </tr></table>
    <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#7fe9ff;margin:24px 0 8px">🟠 Posibles clientes en el chat</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${hotRows}</table>
    <p style="font-size:13px;color:#aeb9c9;margin:18px 0 0">Demo estrella: <b style="color:#fff">${esc(d.topDemo?.[0] || '—')}</b> (${d.topDemo?.[1] || 0}) · Página top: <b style="color:#fff">${esc(d.topPage?.[0] || '—')}</b> (${d.topPage?.[1] || 0}) · Leads: <b style="color:#fff">${d.leadsTotal}</b>
    ${recsHtml}
    <p style="margin-top:26px;font-size:11px;color:#5b6b80;text-align:center">Revisa el detalle en <a href="https://platanitorico.com/conversaciones/" style="color:#18e0ff">/conversaciones</a> y <a href="https://platanitorico.com/stats/" style="color:#18e0ff">/stats</a></p>
  </div>
</body></html>`;
}

export const GET: APIRoute = async ({ request, url }) => {
  // Autorización: cron de Vercel (CRON_SECRET) o prueba manual (?k=STATS_KEY).
  const cronSecret = import.meta.env.CRON_SECRET;
  const statsKey = import.meta.env.STATS_KEY;
  const k = url.searchParams.get('k') || '';
  const bearer = request.headers.get('authorization') || '';
  const byCron = cronSecret ? bearer === `Bearer ${cronSecret}` : true; // si no hay secret, se asume cron
  const byKey = Boolean(statsKey && k === statsKey);
  if (!byCron && !byKey) return json({ error: 'No autorizado.' }, 401);

  if (!statsEnabled) return json({ error: 'Upstash no configurado.' }, 200);

  const d = await build();
  const recs = await recommend(d);
  const force = url.searchParams.get('force') === '1';
  const hayActividad = d.visits || d.demosTotal || d.convCount || d.leadsTotal;
  if (!hayActividad && !force) return json({ ok: true, skipped: 'sin actividad ayer', day: d.y });

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: true, emailed: false, reason: 'RESEND_API_KEY no configurada', summary: d });

  try {
    await new Resend(apiKey).emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `📊 Resumen de ayer · ${d.visits} visitas · ${d.hotCount} posibles clientes`,
      html: renderHtml(d, recs),
    });
  } catch (err) {
    console.error('[resumen-diario] Resend error:', err);
    return json({ ok: false, error: 'No se pudo enviar el email.' }, 502);
  }
  return json({ ok: true, emailed: true, day: d.y });
};
