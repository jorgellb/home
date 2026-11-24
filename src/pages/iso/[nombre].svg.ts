/* Escenas e iconos isométricos como ficheros SVG independientes (con su CSS
   de animación dentro). Se cargan como <img> diferida y se cachean entre
   páginas: el HTML no carga con ellos. */
import type { APIRoute } from 'astro';
import { escena, escenaIcono, ESCENAS, ICONOS_SERVICIO, type NombreEscena } from '../../lib/escenas';

export function getStaticPaths() {
  return [
    ...ESCENAS.map((nombre) => ({ params: { nombre } })),
    ...ICONOS_SERVICIO.map((n) => ({ params: { nombre: `mini-${n}` } })),
  ];
}

export const GET: APIRoute = ({ params }) => {
  const nombre = String(params.nombre);
  const { html } = nombre.startsWith('mini-')
    ? escenaIcono(nombre.slice(5), true)
    : escena(nombre as NombreEscena, { independiente: true });
  return new Response(html, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
