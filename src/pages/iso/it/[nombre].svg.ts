/* Escenas de informática para empresas como SVG independientes. */
import type { APIRoute } from 'astro';
import { escenaIT, ESCENAS_IT, type NombreEscenaIT } from '../../../lib/escenas-it';

export function getStaticPaths() {
  return Object.keys(ESCENAS_IT).map((nombre) => ({ params: { nombre } }));
}

export const GET: APIRoute = ({ params }) => {
  const { html } = escenaIT(params.nombre as NombreEscenaIT, true);
  return new Response(html, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
