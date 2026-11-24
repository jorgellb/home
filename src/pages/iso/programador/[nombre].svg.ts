/* Escenas del clúster de programación: integración, tecnologías y sectores. */
import type { APIRoute } from 'astro';
import { escenaIntegracion, escenaTecnologia, escenaSector, escenaPython, TECNOLOGIAS_ISO, SECTORES_ISO } from '../../../lib/escenas-programador';

export function getStaticPaths() {
  return [
    { params: { nombre: 'integracion' } },
    { params: { nombre: 'python' } },
    ...TECNOLOGIAS_ISO.map((t) => ({ params: { nombre: `tec-${t}` } })),
    ...SECTORES_ISO.map((s) => ({ params: { nombre: `sector-${s}` } })),
  ];
}

export const GET: APIRoute = ({ params }) => {
  const n = String(params.nombre);
  const { html } = n === 'integracion'
    ? escenaIntegracion(true)
    : n === 'python'
      ? escenaPython(true)
    : n.startsWith('tec-')
      ? escenaTecnologia(n.slice(4), true)
      : escenaSector(n.slice(7), true);
  return new Response(html, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
