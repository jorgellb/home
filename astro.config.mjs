// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

import { PUEBLOS_INDEXABLES } from './src/data/pueblos-indexables.ts';
import { evaluar } from './src/data/programador-gate.ts';

/** @typedef {import('@astrojs/sitemap').SitemapItem} SitemapItem */

// Fecha de build para el lastmod del sitemap (refleja el último despliegue
// en lugar de una constante obsoleta).
const BUILD_DATE = new Date().toISOString().slice(0, 10);

export default defineConfig({
  site: 'https://platanitorico.com',
  base: '/',

  server: {
    host: '0.0.0.0',
    port: 4321,
  },

  compressHTML: true,
  // 'static' por defecto: páginas prerenderizadas. Las rutas /api/* marcadas con
  // `export const prerender = false` se ejecutan como Vercel Functions (Node).
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
    imageService: false,
  }),

  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  integrations: [sitemap({
    // NOTA: No usar customPages — con build.format:'directory' Astro ya genera
    // las URLs con trailing slash. customPages sin slash crea duplicados.
    filter: (page) => {
      const path = new URL(page).pathname;

      // Excluir páginas que no deben indexarse (noindex o redirecciones)
      const excludedPaths = [
        '/robots.txt', '/404', '/404.html', '/success/', '/stats', '/conversaciones', '/radar',
        '/soluciones/agencia',
        '/aviso-legal/', '/privacidad/', '/cookies/', '/terminos-condiciones/'
      ];
      if (excludedPaths.some(ep => path.startsWith(ep.replace(/\/$/, '')))) return false;

      // Landings de pueblos: solo el Tier 1 (lista blanca) entra al sitemap.
      // El resto se genera con noindex, así que tampoco debe aparecer aquí.
      // El hub /diseno-web/ (sin slug) no coincide y se mantiene.
      const puebloMatch = path.match(/^\/diseno-web\/([^/]+)\/?$/);
      if (puebloMatch) return PUEBLOS_INDEXABLES.has(puebloMatch[1]);

      // Locales de /programador-web/: manda el control de calidad, la misma
      // función que decide el meta robots de la página. Si alguna vez las dos
      // decisiones se separan, el sitemap acabaría anunciando noindex.
      const progMatch = path.match(/^\/programador-web\/([^/]+)\/([^/]+)\/?$/);
      if (progMatch) {
        // El slug viene de una URL, así que aquí es un string cualquiera:
        // `evaluar` ya devuelve 'draft' si la tecnología no existe.
        return evaluar(
          /** @type {import('./src/data/tecnologias.ts').SlugTecnologia} */ (progMatch[1]),
          progMatch[2],
        ).estado === 'index';
      }

      return true;
    },
    /**
     * @param {SitemapItem} item
     * @returns {SitemapItem}
     */
    serialize(item) {
      const path = new URL(item.url).pathname;

      // Homepage - máxima prioridad
      if (path === '/') {
        return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 1.0, lastmod: BUILD_DATE };
      }

      // Listado de blog
      if (path === '/blog/') {
        return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.8, lastmod: BUILD_DATE };
      }

      // Artículos de blog individuales
      if (path.startsWith('/blog/')) {
        return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.7, lastmod: BUILD_DATE };
      }

      // Servicios principales
      if (path.match(/^\/(desarrollo-web|audiovisual|marketing|diseno-grafico|soporte)\/$/)) {
        return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.9, lastmod: BUILD_DATE };
      }

      // Contacto
      if (path === '/contacto/') {
        return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.6, lastmod: BUILD_DATE };
      }

      // Soluciones
      if (path.includes('/soluciones/')) {
        return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8, lastmod: BUILD_DATE };
      }

      // Sistemas IT (hub, servicios y landings por pueblo) y Plan 360
      if (path.startsWith('/informatica-empresas/') || path === '/plan-360/') {
        return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.9, lastmod: BUILD_DATE };
      }

      // Páginas de diseño web por localidad — contenido único por pueblo
      if (path.includes('/diseno-web/')) {
        return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.9, lastmod: BUILD_DATE };
      }

      // Páginas legales - prioridad mínima
      if (path.match(/^\/(aviso-legal|privacidad|cookies|terminos-condiciones)\/$/)) {
        return { ...item, changefreq: ChangeFreqEnum.YEARLY, priority: 0.3, lastmod: '2023-09-01' };
      }

      // Resto de páginas - prioridad media
      return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.7, lastmod: BUILD_DATE };
    },
  }), react()],

  prefetch: {
    prefetchAll: true,
    // 'hover' en lugar de 'viewport': se precarga cuando hay intención de clic
    // (ratón encima o toque), no al cargar la página. En la home eso evitaba
    // descargar /contacto/, /plan-360/ y /cookies/ de entrada.
    defaultStrategy: 'hover',
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      // Tailwind v4 entra por el plugin de Vite: no hay PostCSS en el proyecto.
      // Con un objeto inline, Vite deja de buscar postcss.config.* hacia arriba
      // y el build no depende de ficheros fuera del repo.
      postcss: {},
    },
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
    },
    ssr: {
      noExternal: [],
    },
  },
});