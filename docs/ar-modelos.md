# Modelos 3D para el probador virtual

Guía para quien prepara los `.glb` y para quien calibra un producto nuevo.
El motor vive en `src/components/ar/motor/` y el catálogo en
`src/components/ar/catalogo.ts`.

## Convenciones

| Cosa | Convención |
|---|---|
| Unidades | **Metros** al exportar. El motor reescala al tamaño de cada cabeza, pero un modelo en unidades coherentes evita sorpresas |
| Ejes | **Y arriba**, **+Z hacia el frente** (hacia la cámara, hacia la cara del cliente) |
| Origen del modelo | En el **punto de contacto**: puente nasal en gafas, centro de la copa en gorras y sombreros, enganche en pendientes |
| Triángulos | ≤ 15.000 por producto. Un accesorio no necesita más |
| Texturas | 1024 px como máximo, WebP o KTX2. Nada de 4K |
| Peso | **< 500 KB por modelo** comprimido con Draco o Meshopt |
| Materiales | PBR metallic-roughness estándar. **No** `KHR_materials_pbrSpecularGlossiness`: está retirado y three.js ya no lo pinta |
| Nombre | `categoria-nombre-variante.glb`, en minúsculas y sin acentos |

El motor mide la caja del modelo y lo escala al ancho craneal o facial, así que
un modelo mal escalado *funciona*, pero pierdes el control del tamaño real y no
puedes usar medidas físicas el día que las quieras.

## Informe de los modelos actuales

Medido el 18-09-2026 con three.js sobre los ficheros de `public/models/`.

| Modelo | Triángulos | Caja | Peso | Estado |
|---|---:|---|---:|---|
| `glasses.glb` | 13.396 | 0,151 × 0,058 × 0,161 m | 362 KB | **Correcto.** Escala real y orientación buena |
| `cap.glb` | 1.270 | **37,7 × 28,1 × 56,0 m** | 3,9 MB | **Rehacer.** Escala equivocada por ~300×, orientación invertida (se corrige con `orientacion: [0,180,0]`) y casi todo el peso son texturas |
| `hat.glb` | 5.086 | 0,127 × 0,069 × 0,130 m | 5,3 MB | **Rehacer.** Usa `KHR_materials_pbrSpecularGlossiness`, que three ya no soporta: por eso se ve como una mancha blanca sin material. Orientación invertida |
| `earrings.glb` | 3.192 | 0,349 × 0,232 × 0,328 m | 94 KB | **Revisar.** Escala equivocada (35 cm) aunque el peso está bien |

Prioridad: los dos de cabeza. Entre ambos suman **9,2 MB**, más que todo el
resto del sitio junto, y el sombrero además se ve sin material.

## Cómo se calibra un producto

1. Abre el probador con la herramienta: `/probador-virtual-ar/?arDebug=1`
   Para calibrar sin cámara, sobre una foto fija:
   `/probador-virtual-ar/?arDebug=1&arFoto=/ruta/a/tu/foto.png`
2. Activa **ver oclusores** si necesitas comprobar que el volumen de cabeza
   tapa lo que debe.
3. Mueve los controles: `escala`, `x`/`y`/`z` en centímetros y `rx`/`ry`/`rz`
   en grados. Los valores se guardan en el navegador mientras pruebas.
4. Pulsa **copiar configuración del SKU** y pega el JSON en `catalogo.ts`.

Dos campos distintos y no se deben mezclar:

- `orientacion`: arregla el **asset** (un GLB exportado mirando hacia atrás).
  Se aplica antes de medir la caja, así que no descoloca el anclaje.
- `calibracion`: **ajuste fino** de ese producto sobre la base de su categoría.

Si necesitas mover mucho un producto, el problema es el modelo: arréglalo en el
asset en vez de acumular offsets.

## Qué resuelve el motor y qué no

Resuelve: pose de cabeza en seis ejes, escala a partir de medidas faciales
estables, oclusión con la malla facial y un cráneo estimado, suavizado sin
retraso, pérdida y recuperación del seguimiento, y cambio de producto sin
reiniciar la cámara.

No resuelve (todavía): oclusión del pelo, prendas de cuerpo —necesitan
`PoseLandmarker` y segmentación, que es otro pipeline— y tallas reales, que
requieren medidas físicas del cliente. El probador es una **vista aproximada**,
y así se dice en la interfaz.
