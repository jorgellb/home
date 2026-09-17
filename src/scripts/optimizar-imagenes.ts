#!/usr/bin/env tsx
/* Genera versiones ligeras (AVIF y WebP) de las imágenes que pesan en el LCP.
   Los originales se conservan como respaldo y como último recurso del
   <picture>.
   - Capturas de webs de clientes: en el carrusel se pintan a 340 px de ancho,
     así que 680 px basta para pantallas de doble densidad.
   - Imagen destacada de cada post: es el LCP del artículo y ocupa el panel
     lateral de la cabecera (o el ancho del móvil): 800 px.
   Uso: npm run optimizar:imagenes [-- --forzar] */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const PUBLICO = join(process.cwd(), 'public');
const CLIENTES = join(PUBLICO, 'imagenes/clientes');
const POSTS = join(process.cwd(), 'src/content/posts');
const forzar = process.argv.includes('--forzar');

interface Tarea {
  origen: string;
  ancho: number;
}

function capturasClientes(): Tarea[] {
  return readdirSync(CLIENTES)
    .filter((f) => /\.jpe?g$/i.test(f))
    .map((f) => ({ origen: join(CLIENTES, f), ancho: 680 }));
}

/* Rutas de featuredImage en el frontmatter de los posts (solo las locales). */
function destacadasPosts(): Tarea[] {
  return readdirSync(POSTS)
    .filter((f) => f.endsWith('.md'))
    .flatMap((f) => {
      const ruta = readFileSync(join(POSTS, f), 'utf8').match(/^featuredImage:\s*"?(\/[^"\n]+\.(?:jpe?g|png))"?\s*$/m)?.[1];
      return ruta ? [{ origen: join(PUBLICO, ruta), ancho: 800 }] : [];
    })
    .filter((t) => existsSync(t.origen));
}

async function principal(): Promise<void> {
  const tareas = [...capturasClientes(), ...destacadasPosts()];
  let generadas = 0;
  let saltadas = 0;

  for (const { origen, ancho } of tareas) {
    const { dir, name } = parse(origen);

    for (const formato of ['avif', 'webp'] as const) {
      const destino = join(dir, `${name}-${ancho}.${formato}`);
      if (!forzar && existsSync(destino) && statSync(destino).mtimeMs >= statSync(origen).mtimeMs) {
        saltadas++;
        continue;
      }
      const imagen = sharp(origen).resize({ width: ancho, withoutEnlargement: true });
      await (formato === 'avif' ? imagen.avif({ quality: 55 }) : imagen.webp({ quality: 72 })).toFile(destino);
      const antes = Math.round(statSync(origen).size / 1024);
      const despues = Math.round(statSync(destino).size / 1024);
      console.log(`[imagenes] ${name}.${formato}: ${antes} KB → ${despues} KB`);
      generadas++;
    }
  }

  console.log(`[imagenes] ${generadas} generadas, ${saltadas} ya estaban al día, sobre ${tareas.length} originales.`);
}

principal().catch((error: unknown) => {
  console.error('[imagenes] No se pudieron generar las versiones ligeras:', error);
  process.exitCode = 1;
});
