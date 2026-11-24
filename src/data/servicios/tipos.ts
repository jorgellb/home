/* Contrato de contenido de una página de servicio. Cada servicio vive en un
   fichero de src/data/servicios/ y se pinta con PlantillaServicio.astro. */
import type { NombreEscena } from '../../lib/escenas';
import type { NombreIcono } from '../../components/sitio/iconos';

export interface Punto {
  icono?: NombreIcono;
  t: string;
  d: string;
}

export interface ContenidoServicio {
  ruta: string;
  seo: { title: string; description: string };
  /** Nombre corto para la miga de pan y el JSON-LD Service. */
  nombre: string;
  /** Tipo de servicio para schema.org (serviceType). */
  tipo: string;
  /** Valor del parámetro ?servicio= del formulario de contacto. */
  servicioContacto: string;
  escena: NombreEscena;
  migas?: { nombre: string; href?: string }[];

  portada: {
    antetitulo: string;
    /** Admite <span class="subrayado">…</span>. */
    h1: string;
    entradilla: string;
    puntos: string[];
  };

  /** Para quién es: perfiles de cliente con su situación. */
  paraQuien?: { titulo: string; entradilla?: string; perfiles: Punto[] };

  /** Qué incluye el servicio. */
  incluye: { titulo: string; entradilla?: string; items: Punto[] };

  /** Bloque de valor: guía, criterio o explicación que sirve aunque no nos contraten. */
  guia?: { antetitulo?: string; titulo: string; entradilla?: string; bloques: { t: string; d: string }[] };

  /** Comparativa honesta frente a la alternativa habitual. */
  comparativa?: { titulo: string; entradilla?: string; columnas: [string, string]; filas: { aspecto: string; nosotros: string; otros: string }[] };

  pasos?: { titulo?: string; items: { t: string; d: string; cuando?: string }[] };

  /** Ids de src/data/proyectos.ts. */
  casos?: string[];

  preguntas: { q: string; a: string }[];

  /** Slugs de src/data/navegacion.ts SERVICIOS. */
  relacionados?: string[];

  /** Enlaces extra (subpáginas, guías, zonas). */
  enlaces?: { titulo: string; items: { nombre: string; href: string; d?: string }[] };

  llamada?: { titulo?: string; texto?: string };
}
