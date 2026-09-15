import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  // Las reglas van dentro del grupo de su User-agent; Sitemap es independiente
  // de los grupos y se deja al final.
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://platanitorico.com/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
