/* Comprueba que los modelos de OpenRouter configurados siguen existiendo.
   El catálogo gratuito rota cada pocos meses y un modelo retirado no da error
   al desplegar: simplemente se cae de la cadena de reserva y las demos empiezan
   a dar 502 cuando los supervivientes están saturados. Esto lo caza antes.
   No necesita clave: el catálogo de OpenRouter es público. */
import { FREE_MODELS, VISION_MODELS } from '../lib/modelos-openrouter';

interface ModeloOR {
  id: string;
  context_length: number;
  architecture?: { input_modalities?: string[] };
}

const CATALOGO = 'https://openrouter.ai/api/v1/models';

async function catalogo(): Promise<Map<string, ModeloOR>> {
  const res = await fetch(CATALOGO);
  if (!res.ok) throw new Error(`El catálogo de OpenRouter respondió ${res.status}`);
  const { data } = (await res.json()) as { data: ModeloOR[] };
  return new Map(data.map((m) => [m.id, m]));
}

function revisar(
  lista: string[],
  nombre: string,
  modelos: Map<string, ModeloOR>,
  exigeVision: boolean,
): string[] {
  const fallos: string[] = [];
  console.log(`\n${nombre}`);
  for (const id of lista) {
    const m = modelos.get(id);
    if (!m) {
      console.log(`  ✗ ${id} — ya no está en el catálogo`);
      fallos.push(`${nombre}: ${id} ya no existe`);
      continue;
    }
    const conVision = (m.architecture?.input_modalities ?? []).includes('image');
    if (exigeVision && !conVision) {
      console.log(`  ✗ ${id} — existe pero no acepta imágenes`);
      fallos.push(`${nombre}: ${id} no acepta imágenes`);
      continue;
    }
    console.log(`  ✓ ${id}`);
  }
  /* Con uno solo no hay reserva si lo retiran. Más de dos tampoco interesa: el
     cupo gratuito es por cuenta, no por modelo (ver modelos-openrouter.ts). */
  const vivos = lista.length - fallos.length;
  if (vivos < 2) fallos.push(`${nombre}: solo queda ${vivos} modelo vivo, hacen falta 2`);
  return fallos;
}

const modelos = await catalogo();
const fallos = [
  ...revisar(FREE_MODELS, 'FREE_MODELS (texto)', modelos, false),
  ...revisar(VISION_MODELS, 'VISION_MODELS (visión)', modelos, true),
];

if (fallos.length) {
  console.error(`\n[modelos] ${fallos.length} problema(s):`);
  for (const f of fallos) console.error(`  - ${f}`);
  console.error('\nRepón la lista en src/lib/modelos-openrouter.ts con modelos del catálogo actual.');
  process.exit(1);
}
console.log('\n[modelos] Todos los modelos configurados siguen vivos.');
