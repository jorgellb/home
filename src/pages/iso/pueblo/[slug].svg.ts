/* Ilustración de cada municipio como SVG independiente. */
import type { APIRoute } from 'astro';
import { escenaPueblo } from '../../../lib/escenas';
import { rasgosDe } from '../../../lib/pueblo';
import { pueblos } from '../../../data/pueblos-almeria';

export function getStaticPaths() {
  return pueblos.map((p) => ({ params: { slug: p.slug }, props: { p } }));
}

export const GET: APIRoute = ({ props }) => {
  const { html } = escenaPueblo(rasgosDe(props.p), undefined, true);
  return new Response(html, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
