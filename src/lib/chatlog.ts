/* Persistencia de conversaciones del asistente IA en Upstash (mismo store que
   el rate limiter y las stats). Cada conversación se guarda como un único JSON
   con CADUCIDAD automática (RGPD: no se conserva indefinidamente) y un índice
   ordenado por fecha para listarlas en el panel privado. Si Upstash no está
   configurado, no hace nada. */

const URL = import.meta.env.UPSTASH_REDIS_REST_URL || import.meta.env.KV_REST_API_URL;
const TOKEN = import.meta.env.UPSTASH_REDIS_REST_TOKEN || import.meta.env.KV_REST_API_TOKEN;
export const chatlogEnabled = Boolean(URL && TOKEN);

/* Caducidad de las conversaciones (días). Configurable por entorno. */
const TTL_DAYS = Number(import.meta.env.CHATLOG_TTL_DAYS) || 90;
const TTL_SEC = Math.max(1, TTL_DAYS) * 86400;
const INDEX_KEY = 'chatlog:index';
const MAX_INDEX = 1000; // tope de conversaciones en el índice

const ID_RE = /^[a-z0-9_-]{6,40}$/i;

export interface StoredMsg { role: 'user' | 'assistant'; content: string }
export interface Conversation {
  cid: string;
  ts: number;
  updated: number;
  source: string;
  hot: boolean;
  msgs: StoredMsg[];
}

async function cmd(c: (string | number)[]): Promise<{ result: unknown } | null> {
  if (!chatlogEnabled) return null;
  try {
    const res = await fetch(URL as string, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(c),
    });
    return res.ok ? res.json() : null;
  } catch { return null; }
}

export function validCid(cid: string): boolean { return ID_RE.test(cid); }

/** Guarda (o actualiza) una conversación y la indexa por fecha. */
export async function saveConversation(conv: Conversation): Promise<void> {
  if (!chatlogEnabled || !validCid(conv.cid)) return;
  const key = `chatlog:${conv.cid}`;
  await Promise.all([
    cmd(['SET', key, JSON.stringify(conv), 'EX', TTL_SEC]),
    cmd(['ZADD', INDEX_KEY, conv.ts, conv.cid]),
  ]).catch(() => { /* noop */ });
  // Mantener el índice acotado: conserva solo las MAX_INDEX más recientes.
  await cmd(['ZREMRANGEBYRANK', INDEX_KEY, 0, -(MAX_INDEX + 1)]).catch(() => { /* noop */ });
}

/** Marca (atómico) que ya se avisó por email de esta conversación. Devuelve
 *  true solo la PRIMERA vez (para no enviar avisos duplicados por cada turno). */
export async function claimNotify(cid: string): Promise<boolean> {
  if (!chatlogEnabled || !validCid(cid)) return false;
  const r = await cmd(['SET', `chatlog:notified:${cid}`, '1', 'NX', 'EX', TTL_SEC]);
  return r?.result === 'OK';
}

/** Lista las conversaciones más recientes (para el panel privado). */
export async function listConversations(limit = 200): Promise<Conversation[]> {
  if (!chatlogEnabled) return [];
  const idx = await cmd(['ZREVRANGE', INDEX_KEY, 0, Math.max(0, limit - 1)]);
  const ids = (idx?.result as string[]) || [];
  if (!ids.length) return [];
  const keys = ids.map((id) => `chatlog:${id}`);
  const r = await cmd(['MGET', ...keys]);
  const arr = (r?.result as (string | null)[]) || [];
  const out: Conversation[] = [];
  for (const raw of arr) {
    if (!raw) continue;
    try { out.push(JSON.parse(raw) as Conversation); } catch { /* skip */ }
  }
  return out;
}
