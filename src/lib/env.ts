/* Lectura de variables de entorno en RUNTIME.

   OJO con `import.meta.env.FOO`: Vite lo sustituye por su valor DURANTE EL BUILD,
   así que el secreto queda incrustado como literal en el bundle de la función.
   Eso trae dos problemas en Vercel:
     1. Cambiar la variable en el panel no surte efecto hasta redesplegar.
     2. Si la variable falta al construir, la expresión vale `undefined` y esbuild
        elimina por dead-code la rama que la usa: la función se despliega sin el
        código que envía el email o llama al modelo, y solo queda el `console.error`.

   En producción leemos por tanto de `process.env`, que se evalúa cuando la
   función se ejecuta. Pero `astro dev` NO vuelca el fichero `.env` a
   `process.env` (solo a `import.meta.env`), así que mantenemos un mapa de
   respaldo detrás de `import.meta.env.DEV`: en el build de producción esa
   condición es `false` y esbuild elimina el objeto entero, de modo que ningún
   secreto llega al bundle. No sustituyas este mapa por una referencia suelta a
   `import.meta.env`: Vite la reemplaza por un objeto con TODO el entorno. */

const DEV_ENV: Record<string, string | undefined> = import.meta.env.DEV
  ? {
      RESEND_API_KEY: import.meta.env.RESEND_API_KEY,
      OPENROUTER_API_KEY: import.meta.env.OPENROUTER_API_KEY,
      OPENROUTER_MODEL: import.meta.env.OPENROUTER_MODEL,
      STATS_KEY: import.meta.env.STATS_KEY,
      CRON_SECRET: import.meta.env.CRON_SECRET,
      CHATLOG_TTL_DAYS: import.meta.env.CHATLOG_TTL_DAYS,
      UPSTASH_REDIS_REST_URL: import.meta.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
      KV_REST_API_URL: import.meta.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: import.meta.env.KV_REST_API_TOKEN,
    }
  : {};

/** Devuelve la variable, o undefined si no está definida o está vacía. */
export function envVar(name: string): string | undefined {
  const runtime = typeof process !== 'undefined' && process.env ? process.env[name] : undefined;
  const value = runtime ?? DEV_ENV[name];
  return value && String(value).trim() ? String(value) : undefined;
}

/** Primera variable definida de la lista (para alias como Upstash / Vercel KV). */
export function envVarAny(...names: string[]): string | undefined {
  for (const n of names) {
    const v = envVar(n);
    if (v) return v;
  }
  return undefined;
}

/* ── Accesos con nombre, para no repetir literales por el código ── */
export const resendApiKey = () => envVar('RESEND_API_KEY');
export const openrouterApiKey = () => envVar('OPENROUTER_API_KEY');
export const openrouterModel = () => envVar('OPENROUTER_MODEL');
export const statsKey = () => envVar('STATS_KEY');
export const cronSecret = () => envVar('CRON_SECRET');

export const upstashUrl = () => envVarAny('UPSTASH_REDIS_REST_URL', 'KV_REST_API_URL');
export const upstashToken = () => envVarAny('UPSTASH_REDIS_REST_TOKEN', 'KV_REST_API_TOKEN');
export const chatlogTtlDays = () => Number(envVar('CHATLOG_TTL_DAYS')) || 90;
