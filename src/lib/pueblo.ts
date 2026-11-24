/* Utilidades de las landings por municipio. */
import type { RasgosPueblo } from './escenas';

/* ── Sin precios ──────────────────────────────────────────────────────
   La web no publica precios. Los datos de los pueblos se escribieron cuando
   sí los había: aquí se quitan al pintar, frase a frase, para que ningún
   importe llegue al HTML. El test de src/lib/pueblo.test.ts lo vigila. */

const IMPORTE = /(\d[\d.,]*\s?(€|euros?\b|eur\b)|€\s?\d)/i;
const PROMESA_DUDOSA = /\s*de por vida/gi;

/** Quita las frases que contienen un importe. */
export function sinPrecios(texto: string): string {
  if (!IMPORTE.test(texto)) return texto.replace(PROMESA_DUDOSA, '');
  // Los puntos de miles («1.400») no separan frases: se protegen al dividir.
  const protegido = texto.replace(/(\d)\.(\d)/g, '$1․$2');
  const frases = protegido.match(/[^.!?]+[.!?]*\s*/g) ?? [protegido];
  return frases
    .filter((f) => !IMPORTE.test(f.replace(/․/g, '.')))
    .join('')
    .replace(/․/g, '.')
    .replace(PROMESA_DUDOSA, '')
    .trim();
}

const PREGUNTA_PRECIO = /(cu[aá]nto (cuesta|vale|cobr)|precio|tarifa|presupuesto)/i;

/** Respuesta estándar cuando la original solo hablaba de dinero. */
export const RESPUESTA_PRECIO =
  'Depende de lo que necesites que haga la web: no es lo mismo una página para que te llamen que una tienda o un sistema de reservas. Tras una llamada de media hora te enviamos una propuesta cerrada por escrito, con plazo y lo que incluye, sin compromiso.';

export function preguntasSinPrecios(faq: { q: string; a: string }[]): { q: string; a: string }[] {
  return faq
    .map((f) => {
      const a = sinPrecios(f.a);
      if (PREGUNTA_PRECIO.test(f.q) || a.length < 40) return { q: f.q, a: RESPUESTA_PRECIO };
      return { q: sinPrecios(f.q), a };
    })
    // Varias preguntas de precio quedarían con la misma respuesta: una basta.
    .filter((f, i, todas) => f.a !== RESPUESTA_PRECIO || todas.findIndex((x) => x.a === RESPUESTA_PRECIO) === i);
}

/* ── Rasgos para la ilustración ─────────────────────────────────────── */

export function semilla(slug: string): number {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 2147483647;
  return h || 1;
}

const MAR = /(playa|puerto|costa|cabo|mar\b|marítim|pesca|lonja|náutic|litoral|bahía|calas?)/i;
const SIERRA = /(sierra|monta|senderismo|filabres|alpujarra|vélez|velez|nevada|pico|cumbre|valle)/i;
const INVERNADERO = /(invernader|hortofrut|agricultura intensiva|poniente|cooperativa)/i;
const MARMOL = /(mármol|marmol|cantera|piedra natural)/i;
const CASTILLO = /(castillo|alcazaba|fortaleza|torre vigía|murall)/i;

export function rasgosDe(p: { slug: string; comarca: string; descripcion?: string; caracteristicas?: string[]; sectorPrincipal?: string; lugarIconico?: string }): RasgosPueblo {
  const texto = [p.comarca, p.descripcion, p.sectorPrincipal, p.lugarIconico, ...(p.caracteristicas ?? [])].filter(Boolean).join(' ');
  return {
    mar: MAR.test(texto),
    sierra: SIERRA.test(texto) && !MAR.test(texto),
    invernaderos: INVERNADERO.test(texto) || p.comarca === 'Poniente Almeriense',
    marmol: MARMOL.test(texto),
    castillo: CASTILLO.test(texto),
    semilla: semilla(p.slug),
  };
}
