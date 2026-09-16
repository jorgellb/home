#!/usr/bin/env tsx
/* Genera versiones ligeras (AVIF y WebP) de las capturas de webs de clientes.
   Los JPEG originales se conservan como respaldo y como último recurso del
   <picture>. En el carrusel se pintan a 340 px de ancho, así que 680 px basta
   para pantallas de doble densidad.
   Uso: npm run optimizar:imagenes [-- --forzar] */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const CARPETA = join(process.cwd(), 'public/imagenes/clientes');
const ANCHO = 680;
const forzar = process.argv.includes('--forzar');

async function principal(): Promise<void> {
  const originales = readdirSync(CARPETA).filter((f) => /\.jpe?g$/i.test(f));
  let generadas = 0;
  let saltadas = 0;

  for (const archivo of originales) {
    const origen = join(CARPETA, archivo);
    const { name } = parse(archivo);

    for (const formato of ['avif', 'webp'] as const) {
      const destino = join(CARPETA, `${name}-${ANCHO}.${formato}`);
      if (!forzar && existsSync(destino) && statSync(destino).mtimeMs >= statSync(origen).mtimeMs) {
        saltadas++;
        continue;
      }
      const imagen = sharp(origen).resize({ width: ANCHO, withoutEnlargement: true });
      await (formato === 'avif' ? imagen.avif({ quality: 55 }) : imagen.webp({ quality: 72 })).toFile(destino);
      const antes = Math.round(statSync(origen).size / 1024);
      const despues = Math.round(statSync(destino).size / 1024);
      console.log(`[imagenes] ${name}.${formato}: ${antes} KB → ${despues} KB`);
      generadas++;
    }
  }

  console.log(`[imagenes] ${generadas} generadas, ${saltadas} ya estaban al día, sobre ${originales.length} originales.`);
}

principal().catch((error: unknown) => {
  console.error('[imagenes] No se pudieron generar las versiones ligeras:', error);
  process.exitCode = 1;
});
