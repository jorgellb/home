#!/usr/bin/env tsx
/* Mide las webs de clientes publicadas y guarda src/data/medidas.json.
   - Lighthouse móvil (rendimiento) con PageSpeed Insights. Clave opcional en
     la variable PSI_API_KEY; sin ella Google limita las peticiones.
   - Tiempo de respuesta: mediana de 3 peticiones hasta recibir cabeceras.
   Nunca rompe el build: si algo falla conserva la última medida.
   Uso: npm run medir                  mide siempre
        npm run medir -- --si-caduca   solo si la última medida tiene más de 12 h */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { proyectos } from '../data/proyectos';
import { caducada, fusionarMedidas, mediana, medidasSchema, puntuacionPsi, type Lectura, type Medidas } from '../data/medidas';

const RUTA = join(process.cwd(), 'src/data/medidas.json');
const LIMITE_TOTAL_MS = 90_000;
const LIMITE_URL_MS = 25_000;
const CONCURRENCIA = 3;

function leerAnterior(): Medidas | null {
  try {
    return medidasSchema.parse(JSON.parse(readFileSync(RUTA, 'utf8')));
  } catch {
    return null;
  }
}

async function conLimite<T>(ms: number, tarea: (senal: AbortSignal) => Promise<T>): Promise<T | null> {
  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), ms);
  try {
    return await tarea(control.signal);
  } catch {
    return null;
  } finally {
    clearTimeout(reloj);
  }
}

async function lighthouse(url: string, senal: AbortSignal): Promise<number | null> {
  const api = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  api.searchParams.set('url', url);
  api.searchParams.set('strategy', 'mobile');
  api.searchParams.set('category', 'performance');
  if (process.env.PSI_API_KEY) api.searchParams.set('key', process.env.PSI_API_KEY);
  const respuesta = await fetch(api, { signal: senal });
  if (!respuesta.ok) return null;
  return puntuacionPsi(await respuesta.json());
}

async function tiempoRespuesta(url: string, senal: AbortSignal): Promise<number | null> {
  const tiempos: number[] = [];
  for (let intento = 0; intento < 3; intento++) {
    const inicio = performance.now();
    const respuesta = await fetch(url, { signal: senal, headers: { 'user-agent': 'PlatanitoRico-Medidas/1.0' } });
    tiempos.push(Math.round(performance.now() - inicio));
    await respuesta.body?.cancel();
  }
  return mediana(tiempos);
}

async function medir(proyecto: { id: string; url: string }): Promise<Lectura> {
  const [puntuacion, ttfb] = await Promise.all([
    conLimite(LIMITE_URL_MS, (senal) => lighthouse(proyecto.url, senal)),
    conLimite(LIMITE_URL_MS, (senal) => tiempoRespuesta(proyecto.url, senal)),
  ]);
  return { id: proyecto.id, url: proyecto.url, lighthouse: puntuacion, ttfbMs: ttfb };
}

async function principal(): Promise<void> {
  const ahora = new Date();
  const anterior = leerAnterior();

  /* En un despliegue no se mide. Esto corre como `prebuild`, así que antes de
     compilar salía a pedir una decena de webs de clientes y la API de
     PageSpeed: red de terceros en la ruta crítica de cada despliegue, con
     hasta 90 s de presupuesto y todo lo que puede salir mal en la salida de
     red de una máquina de build.
     Además siempre se ejecutaba, aunque el argumento sea `--si-caduca`: el
     fichero versionado lleva `medidoEl: null` —y lo seguirá llevando, porque
     el diff de la remedición no se commitea nunca— así que `caducada()`
     devuelve true en todas las builds.
     Medir es una acción deliberada, no un efecto secundario de publicar:
     se hace en local con `npm run medir`, o forzando `--en-ci`. */
  const enCi = process.env.CI === '1' || process.env.CI === 'true' || Boolean(process.env.VERCEL);
  if (enCi && !process.argv.includes('--en-ci')) {
    console.log('[medir] Build en CI: no se mide, se usan las medidas del repositorio.');
    return;
  }

  if (process.argv.includes('--si-caduca') && !caducada(anterior, ahora)) {
    console.log(`[medir] Las medidas del ${anterior?.medidoEl} siguen vigentes; no se vuelve a medir.`);
    return;
  }

  const pendientes = [...proyectos];
  const lecturas: Lectura[] = [];
  const fin = Date.now() + LIMITE_TOTAL_MS;

  async function trabajador(): Promise<void> {
    while (Date.now() < fin) {
      const proyecto = pendientes.shift();
      if (!proyecto) return;
      lecturas.push(await medir(proyecto));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCIA }, trabajador));
  // Lo que no dio tiempo a medir entra sin lectura y conserva la medida anterior.
  for (const proyecto of pendientes) lecturas.push({ id: proyecto.id, url: proyecto.url, lighthouse: null, ttfbMs: null });

  const orden = new Map(proyectos.map((p, i) => [p.id, i]));
  lecturas.sort((a, b) => (orden.get(a.id) ?? 0) - (orden.get(b.id) ?? 0));

  writeFileSync(RUTA, JSON.stringify(fusionarMedidas(anterior, lecturas, ahora), null, 2) + '\n');
  const conPuntuacion = lecturas.filter((l) => l.lighthouse !== null).length;
  console.log(`[medir] ${conPuntuacion}/${lecturas.length} webs medidas con PageSpeed. Guardado en src/data/medidas.json.`);
}

principal().catch((error: unknown) => {
  console.warn('[medir] No se pudo medir; se mantienen las medidas anteriores.', error);
});
