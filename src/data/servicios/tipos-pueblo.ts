/* Contrato de una landing «servicio × municipio». La pinta PlantillaPueblo.astro
   y la usan diseño web, informática y programación a medida. */
import type { Punto } from './tipos';
import type { RasgosPueblo } from '../../lib/escenas';

export interface ContenidoPueblo {
  ruta: string;
  seo: { title: string; description: string };
  noindex?: boolean;
  servicio: { nombre: string; href: string; contacto: string };
  pueblo: { slug: string; nombre: string; comarca: string; cp?: string | null; km?: number | null; rasgos: RasgosPueblo };
  migas: { nombre: string; href?: string }[];

  portada: { antetitulo: string; h1: string; entradilla: string; puntos: string[] };

  /** Cifras y datos locales verificables (población, CP, distancia…). */
  datos?: { k: string; v: string }[];

  /** Texto propio del municipio: lo que lo hace distinto. */
  local?: { titulo: string; parrafos: string[] };

  /** Sectores del municipio y qué necesita cada uno. */
  sectores?: { titulo: string; entradilla?: string; items: (Punto & { etiquetas?: string[] })[] };

  /** Lugares, oficios, mercados… bloques singulares del municipio. */
  singulares?: { titulo: string; entradilla?: string; items: { t: string; d: string; meta?: string }[] }[];

  /** Qué hacemos (genérico del servicio, adaptado al municipio). */
  incluye?: { titulo: string; entradilla?: string; items: Punto[] };

  pasos?: { titulo: string; items: { t: string; d: string; cuando?: string }[] };

  casos?: string[];

  preguntas: { q: string; a: string }[];

  /** Otros servicios en este municipio y municipios cercanos. */
  enlaces?: { titulo: string; items: { nombre: string; href: string; d?: string }[] }[];

  llamada?: { titulo?: string; texto?: string };

  jsonLdExtra?: Record<string, unknown>[];
}
