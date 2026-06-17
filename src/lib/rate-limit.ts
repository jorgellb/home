/* Rate limiter compartido para los endpoints de Vera.
   Usa Upstash Redis (REST) si está configurado → límite global real entre
   instancias de la función. Si no, cae a un limitador en memoria (best-effort).
   Sin dependencias: la API REST de Upstash se llama con fetch. */

const UPSTASH_URL = import.meta.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = import.meta.env.UPSTASH_REDIS_REST_TOKEN;
const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

export function clientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

async function upstash(cmd: (string | number)[]): Promise<{ result: unknown }> {
  const res = await fetch(UPSTASH_URL as string, {
    method: 'POST',
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!res.ok) throw new Error(`upstash ${res.status}`);
  return res.json();
}

/* Fallback en memoria (sliding window). Solo fiable dentro de una instancia. */
const mem = new Map<string, number[]>();
function memLimit(key: string, max: number, windowSec: number) {
  const now = Date.now();
  const winMs = windowSec * 1000;
  const arr = (mem.get(key) || []).filter((t) => now - t < winMs);
  if (arr.length >= max) {
    return { ok: false, retryAfter: Math.ceil((winMs - (now - arr[0])) / 1000) };
  }
  arr.push(now);
  mem.set(key, arr);
  if (mem.size > 5000) mem.clear();
  return { ok: true, retryAfter: 0 };
}

/**
 * Comprueba y consume una unidad del límite para `key`.
 * @returns ok=false si se ha superado, con retryAfter (segundos).
 */
export async function rateLimit(
  key: string,
  max: number,
  windowSec: number,
): Promise<{ ok: boolean; retryAfter: number }> {
  if (useUpstash) {
    try {
      const k = `rl:${key}`;
      const incr = await upstash(['INCR', k]);
      const count = Number(incr.result);
      if (count === 1) await upstash(['EXPIRE', k, windowSec]);
      if (count > max) {
        let ttl = windowSec;
        try {
          const t = await upstash(['TTL', k]);
          if (Number(t.result) > 0) ttl = Number(t.result);
        } catch { /* usar windowSec */ }
        return { ok: false, retryAfter: ttl };
      }
      return { ok: true, retryAfter: 0 };
    } catch (err) {
      console.error('[rate-limit] Upstash falló, uso memoria:', err);
    }
  }
  return memLimit(key, max, windowSec);
}
