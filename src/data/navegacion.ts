/* Navegación principal y catálogo de servicios del sitio.
   Una sola fuente para la cabecera, el pie, la home y los enlaces cruzados. */
import type { NombreEscena } from '../lib/escenas';

export interface ServicioNav {
  slug: string;
  nombre: string;
  href: string;
  /** Una línea: qué resuelve, no qué es. */
  resumen: string;
  escena: NombreEscena;
  grupo: 'web' | 'crecimiento' | 'empresa';
}

export const SERVICIOS: ServicioNav[] = [
  { slug: 'web', nombre: 'Diseño web', href: '/desarrollo-web/', resumen: 'Webs a medida que cargan rápido y traen contactos.', escena: 'web', grupo: 'web' },
  { slug: 'tienda', nombre: 'Tiendas online', href: '/soluciones/ecommerce/', resumen: 'Vende en internet sin pagar comisión por cada venta.', escena: 'tienda', grupo: 'web' },
  { slug: 'apps', nombre: 'Apps móviles', href: '/desarrollo-aplicaciones-moviles/', resumen: 'Aplicaciones para iOS y Android que la gente usa.', escena: 'apps', grupo: 'web' },
  { slug: 'programador', nombre: 'Programación a medida', href: '/programador-web/', resumen: 'Desarrollo sobre lo que ya tienes: WordPress, React, Python…', escena: 'programador', grupo: 'web' },
  { slug: 'marketing', nombre: 'Marketing y SEO', href: '/marketing/', resumen: 'Que te encuentren en Google y en los mapas.', escena: 'marketing', grupo: 'crecimiento' },
  { slug: 'grafico', nombre: 'Diseño gráfico', href: '/diseno-grafico/', resumen: 'Marca, logotipo y piezas que se recuerdan.', escena: 'grafico', grupo: 'crecimiento' },
  { slug: 'audiovisual', nombre: 'Vídeo y dron', href: '/audiovisual/', resumen: 'Vídeo, foto y dron para enseñar tu negocio.', escena: 'audiovisual', grupo: 'crecimiento' },
  { slug: 'informatica', nombre: 'Informática para empresas', href: '/informatica-empresas/', resumen: 'Equipos, redes y copias que no te dejan tirado.', escena: 'informatica', grupo: 'empresa' },
  { slug: 'ia', nombre: 'IA para empresas', href: '/ia-empresas/', resumen: 'Automatiza el trabajo repetitivo con criterio.', escena: 'ia', grupo: 'empresa' },
  { slug: 'soporte', nombre: 'Mantenimiento web', href: '/soporte/', resumen: 'Copias, seguridad y cambios sin esperas.', escena: 'soporte', grupo: 'empresa' },
];

export const GRUPOS: { id: ServicioNav['grupo']; nombre: string }[] = [
  { id: 'web', nombre: 'Construir' },
  { id: 'crecimiento', nombre: 'Crecer' },
  { id: 'empresa', nombre: 'Operar' },
];

export const servicio = (slug: string) => SERVICIOS.find((s) => s.slug === slug);

export const ENLACES_PRINCIPALES = [
  { nombre: 'Plan 360', href: '/plan-360/' },
  { nombre: 'Dónde trabajamos', href: '/diseno-web/' },
  { nombre: 'Blog', href: '/blog/' },
];

export const CONTACTO = {
  telefono: '+34 657 08 50 19',
  telefonoHref: 'tel:+34657085019',
  whatsapp: 'https://wa.me/34657085019',
  email: 'hola@platanitorico.com',
  direccion: 'Ctra. de Ronda, 82 · 04620 Vera (Almería)',
};
