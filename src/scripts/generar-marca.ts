/* Genera los ficheros de marca a partir de src/lib/marca.ts:
   public/favicon.svg (también es el logo de la cabecera y el pie),
   public/favicon.ico y public/imagenes/icon.png.
   Uso: npx tsx src/scripts/generar-marca.ts */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { marcaSvg } from '../lib/marca';

const raiz = new URL('../../public/', import.meta.url);

writeFileSync(new URL('favicon.svg', raiz), marcaSvg({ margen: 0 }));

/* Icono de app y de publisher: fondo claro a sangre (iOS redondea por su cuenta). */
await sharp(Buffer.from(marcaSvg({ lado: 512, fondo: '#FAFAF7', margen: 0.16, radio: 0 })))
  .png()
  .toFile(new URL('imagenes/icon.png', raiz).pathname.slice(1));

/* favicon.ico con un PNG de 32×32 dentro (formato ICO con PNG embebido). */
const png = await sharp(Buffer.from(marcaSvg({ lado: 32, margen: 0.02 }))).png().toBuffer();
const cabecera = Buffer.alloc(22);
cabecera.writeUInt16LE(0, 0);
cabecera.writeUInt16LE(1, 2);
cabecera.writeUInt16LE(1, 4);
cabecera.writeUInt8(32, 6);
cabecera.writeUInt8(32, 7);
cabecera.writeUInt8(0, 8);
cabecera.writeUInt8(0, 9);
cabecera.writeUInt16LE(1, 10);
cabecera.writeUInt16LE(32, 12);
cabecera.writeUInt32LE(png.length, 14);
cabecera.writeUInt32LE(22, 18);
writeFileSync(new URL('favicon.ico', raiz), Buffer.concat([cabecera, png]));

console.log('Marca generada: favicon.svg, favicon.ico e imagenes/icon.png');
