/* Medidas reales de las webs de clientes (Lighthouse móvil vía PageSpeed
   Insights y tiempo de respuesta). Las genera src/scripts/medir-webs.ts; la
   web solo las lee. Regla: si una medida falla se conserva la anterior con su
   fecha, y si nunca hubo medida se enseña «sin medida». */
import { z } from 'zod';

export const webMedidaSchema = z.object({
  id: z.string(),
  url: z.url(),
  lighthouse: z.number().int().min(0).max(100).nullable(),
  ttfbMs: z.number().int().nonnegative().nullable(),
  medidoEl: z.iso.datetime().nullable(),
});

export const medidasSchema = z.object({
  medidoEl: z.iso.datetime().nullable(),
  webs: z.array(webMedidaSchema),
});

export type WebMedida = z.infer<typeof webMedidaSchema>;
export type Medidas = z.infer<typeof medidasSchema>;

export interface Lectura {
  id: string;
  url: string;
  lighthouse: number | null;
  ttfbMs: number | null;
}

export function puntuacionPsi(respuesta: unknown): number | null {
  const score = (respuesta as { lighthouseResult?: { categories?: { performance?: { score?: unknown } } } } | null)
    ?.lighthouseResult?.categories?.performance?.score;
  return typeof score === 'number' && score >= 0 && score <= 1 ? Math.round(score * 100) : null;
}

export function mediana(valores: number[]): number | null {
  if (valores.length === 0) return null;
  const ordenados = [...valores].sort((a, b) => a - b);
  const medio = Math.floor(ordenados.length / 2);
  return ordenados.length % 2 ? ordenados[medio] : Math.round((ordenados[medio - 1] + ordenados[medio]) / 2);
}

export function fusionarMedidas(anterior: Medidas | null, lecturas: Lectura[], ahora: Date): Medidas {
  const iso = ahora.toISOString();
  const previas = new Map((anterior?.webs ?? []).map((w) => [w.id, w]));

  const webs = lecturas.map((lectura) => {
    const previa = previas.get(lectura.id);
    const nueva = lectura.lighthouse !== null;
    return {
      id: lectura.id,
      url: lectura.url,
      lighthouse: nueva ? lectura.lighthouse : previa?.lighthouse ?? null,
      ttfbMs: lectura.ttfbMs ?? previa?.ttfbMs ?? null,
      medidoEl: nueva ? iso : previa?.medidoEl ?? null,
    };
  });

  const algunaNueva = lecturas.some((l) => l.lighthouse !== null);
  return { medidoEl: algunaNueva ? iso : anterior?.medidoEl ?? null, webs };
}

export function caducada(medidas: Medidas | null, ahora: Date, horas = 12): boolean {
  if (!medidas?.medidoEl) return true;
  return ahora.getTime() - new Date(medidas.medidoEl).getTime() > horas * 3_600_000;
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function fechaCorta(iso: string | null): string | null {
  if (!iso) return null;
  const partes = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'numeric' }).formatToParts(new Date(iso));
  const dia = partes.find((p) => p.type === 'day')?.value;
  const mes = Number(partes.find((p) => p.type === 'month')?.value);
  return dia && mes ? `${dia} ${MESES[mes - 1]}` : null;
}
