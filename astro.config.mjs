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
      filter: (page) => {
        // Excluir páginas que no deben estar en el sitemap
        const excludedPages = ['/robots.txt', '/404', '/404.html'];
        return !excludedPages.includes(page);
      },
      customPages: [
        // Asegurar que todas las páginas principales estén incluidas
        'https://platanitorico.com/',
        'https://platanitorico.com/desarrollo-web',
        'https://platanitorico.com/audiovisual',
        'https://platanitorico.com/marketing',
        'https://platanitorico.com/diseno-grafico',
        'https://platanitorico.com/soporte',
        'https://platanitorico.com/contacto',
        'https://platanitorico.com/soluciones/emprendedor',
        'https://platanitorico.com/soluciones/empresa',
        'https://platanitorico.com/soluciones/ecommerce',
      ],
      serialize: (item) => {
        const url = item.url;

        // Homepage - máxima prioridad
        if (url === 'https://platanitorico.com/') {
          return {
            ...item,
            changefreq: 'weekly',
            priority: 1.0,
          };
        }

        // Servicios principales - alta prioridad
        if (url.match(/\/(desarrollo-web|audiovisual|marketing|diseno-grafico|soporte|contacto)$/)) {
          return {
            ...item,
            changefreq: 'weekly',
            priority: 0.9,
          };
        }

        // Páginas de soluciones - alta prioridad
        if (url.includes('/soluciones/')) {
          return {
            ...item,
            changefreq: 'monthly',
            priority: 0.85,
          };
        }

        // Pueblos destacados - prioridad media-alta
        const pueblosDestacados = [
          'almeria', 'roquetas-de-mar', 'el-ejido', 'nijar', 'vera',
          'mojacar', 'huercal-overa', 'adra', 'tabernas', 'velez-rubio',
          'velez-blanco', 'albox', 'macael', 'laujar-de-andarax', 'seron'
        ];

        if (url.includes('/diseno-web/')) {
          const slug = url.split('/diseno-web/')[1]?.replace('/', '');
          const isDestacado = pueblosDestacados.includes(slug);

          return {
            ...item,
            changefreq: 'monthly',
            priority: isDestacado ? 0.8 : 0.6,
          };
        }

        // Páginas legales - baja prioridad
        if (url.match(/\/(aviso-legal|privacidad|cookies|terminos-condiciones)$/)) {
          return {
            ...item,
            changefreq: 'yearly',
            priority: 0.3,
          };
        }

        // Resto de páginas - prioridad media
        return {
          ...item,
          changefreq: 'monthly',
          priority: 0.7,
        };
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