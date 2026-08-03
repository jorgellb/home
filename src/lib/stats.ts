/* Analítica propia, agregada y sin datos personales: contadores en Upstash
   (mismo store que el rate limiter). Si no está configurado, no hace nada.
   Solo guarda números (totales y por día), nunca IPs ni datos del usuario. */

import { upstashUrl, upstashToken } from './env';

const URL = upstashUrl();
const TOKEN = upstashToken();
export const statsEnabled = Boolean(URL && TOKEN);

async function cmd(c: (string | number)[]): Promise<{ result: unknown } | null> {
  if (!statsEnabled) return null;
  try {
    const res = await fetch(URL as string, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(c),
    });
    return res.ok ? res.json() : null;
  } catch { return null; }
}

function today(): string { return new Date().toISOString().slice(0, 10); }

/** Incrementa el contador total y el del día para un evento. Fire-and-forget seguro. */
export async function bump(event: string): Promise<void> {
  if (!statsEnabled) return;
  const e = event.replace(/[^a-z0-9:_/-]/gi, '').slice(0, 80);
  if (!e) return;
  await Promise.all([
    cmd(['INCR', `stat:${e}:total`]),
    cmd(['INCR', `stat:${e}:${today()}`]),
  ]).catch(() => { /* noop */ });
}

/** Lee varios contadores de una vez (para el panel). */
export async function readMany(keys: string[]): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  if (!statsEnabled || !keys.length) { keys.forEach((k) => (out[k] = 0)); return out; }
  const r = await cmd(['MGET', ...keys]);
  const arr = (r?.result as (string | null)[]) || [];
  keys.forEach((k, i) => (out[k] = Number(arr[i]) || 0));
  return out;
}

/** Suma los contadores diarios de los últimos N días para un evento. */
export function lastDays(n: number): string[] {
  const days: string[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
