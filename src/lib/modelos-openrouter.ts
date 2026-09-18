/* Modelos gratuitos capaces y multilingües (verificados en la API de OpenRouter).
   Se prueban en orden hasta que uno responda.
   Solo DOS por lista, y es a propósito: el tramo gratuito se limita por cuenta
   y por día (50 peticiones), así que cada modelo de reserva que se prueba gasta
   cupo del mismo bote. Una cadena larga no aguanta más, se agota antes. Añadir
   un tercero se paga en demos que otro visitante ya no podrá hacer.
   El catálogo gratuito rota cada pocos meses y los modelos retirados no avisan.
   `npm run audit:modelos` comprueba contra el catálogo que siguen vivos;
   conviene pasarlo antes de publicar.
   NOTA (18-09-2026): se repusieron cuatro de los ocho modelos, que habían
   desaparecido del catálogo (llama-3.3-70b, qwen3-next-80b, nemotron-nano-12b-vl
   y nex-n2-pro).
   NOTA (16-09-2026): `openai/gpt-oss-120b:free` se retiró de la cadena. Escribe
   en canales (analysis/commentary/final) y varios proveedores de OpenRouter
   sirven el canal de análisis como contenido normal: el visitante veía el
   razonamiento del modelo y las instrucciones internas. */
export const FREE_MODELS = [
  'deepseek/deepseek-v4-flash-0731:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
];

/* Modelos gratuitos con VISIÓN (aceptan imágenes), para análisis multimodal. */
export const VISION_MODELS = [
  'google/gemma-4-31b-it:free',
  'qwen/qwen3.8-27b:free',
];
