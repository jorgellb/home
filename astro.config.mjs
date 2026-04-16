// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://platanitorico.com',
  base: '/',

  server: {
    host: '0.0.0.0',
    port: 4321,
  },

  compressHTML: true,
  output: 'static',

  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      // NOTA: No usar customPages — con build.format:'directory' Astro ya genera
      // las URLs con trailing slash. customPages sin slash crea duplicados.
      filter: (page) => {
        const path = new URL(page).pathname;

        // Excluir páginas que no deben indexarse
        const excludedPaths = ['/robots.txt', '/404', '/404.html', '/success/', '/musica/', '/soluciones/agencia'];
        if (excludedPaths.some(ep => path.startsWith(ep.replace(/\/$/, '')))) return false;

        // Todas las páginas /diseno-web/ se indexan (contenido único por pueblo)
        return true;
      },
      serialize: (item) => {
        const url = item.url;
        const path = new URL(url).pathname;

        // Homepage - máxima prioridad
        if (path === '/') {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: '2026-04-16' };
        }

        // Listado de blog
        if (path === '/blog/') {
          return { ...item, changefreq: 'weekly', priority: 0.8, lastmod: '2026-04-16' };
        }

        // Artículos de blog individuales
        if (path.startsWith('/blog/')) {
          return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: '2025-06-01' };
        }

        // Servicios principales
        if (path.match(/^\/(desarrollo-web|audiovisual|marketing|diseno-grafico|soporte)\/$/)) {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod: '2026-04-16' };
        }

        // Contacto
        if (path === '/contacto/') {
          return { ...item, changefreq: 'monthly', priority: 0.6, lastmod: '2026-04-16' };
        }

        // Soluciones
        if (path.includes('/soluciones/')) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: '2026-04-16' };
        }

        // Páginas de diseño web por localidad — contenido único por pueblo
        if (path.includes('/diseno-web/')) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: '2026-04-16' };
        }

        // Páginas legales - prioridad mínima
        if (path.match(/^\/(aviso-legal|privacidad|cookies|terminos-condiciones)\/$/)) {
          return { ...item, changefreq: 'yearly', priority: 0.3, lastmod: '2023-09-01' };
        }

        // Resto de páginas - prioridad media
        return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: '2026-04-16' };
      },
    }),
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ['gsap'],
            lenis: ['lenis'],
          },
        },
      },
    },
  },

  adapter: netlify(),
});