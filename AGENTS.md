# Platanito Rico — guía para agentes

Web de Platanito Rico, estudio digital en Vera (Almería). Astro estático + funciones de Vercel solo para `/api/contact`.
Rediseño vigente desde noviembre de 2026: ver `docs/rediseno-2026-11.md`.

## Reglas que no se negocian

- **Sin precios.** Ningún importe en páginas, FAQ, meta descriptions ni JSON-LD (`price`, `priceRange`, `offers` con precio). Las preguntas de coste se responden con «propuesta cerrada por escrito tras una llamada». `npm run check:links` falla si aparece un «€» fuera del blog.
- **Sin chat ni agente IA**, sin demos ni paneles internos. Las rutas eliminadas tienen 301 en `vercel.json`.
- **Solo afirmaciones verificables.** Nada de cifras, testimonios, reseñas o certificaciones sin fuente. La única valoración publicada es la de Google en `src/data/negocio.ts` (`CIFRAS`). Una sola sede: Vera; el resto es cobertura.
- **Imágenes: ilustración isométrica SVG propia.** Fotos solo de trabajos reales (`public/imagenes/clientes`, `ejemplos`) y en el blog.
- **Sin JavaScript de terceros** y sin cookies.

## Sistema visual

- Estilos globales: `src/styles/sitio.css` (tokens en `:root`: `--fondo`, `--tinta`, `--verde`, `--platano`…, escala tipográfica `--t-*`, utilidades `.contenedor`, `.seccion`, `.prosa`, animaciones `iso-*`). Cada componente lleva su CSS con alcance.
- Tipografía: una sola familia variable, Plus Jakarta Sans (`@fontsource-variable/plus-jakarta-sans`), con respaldo de métricas ajustadas. Test: `src/styles/fuentes.test.ts`.
- Color: verde `#0E5B3A` para acciones y enlaces; amarillo plátano `#FFCF3F` solo como relleno, nunca como texto sobre claro.
- Tailwind solo existe para el cuerpo de los posts (`src/styles/articulo.css`, que escanea únicamente `src/content/posts`).

## Ilustraciones isométricas

- Motor: `src/lib/iso.ts` (clase `Escena`: `caja`, `losa`, `caraX/caraY`, `cilindro`, `esfera`, `ruta`, `grupo` con clase de animación). Se ejecuta en el build: el SVG sale estático.
- Escenas: `src/lib/escenas.ts` (`escena(nombre)`; `escenaPueblo(rasgos)` para municipios, con mar, sierra, invernaderos, mármol o castillo según `rasgosDe()` de `src/lib/pueblo.ts`).
- Componente: `src/components/sitio/Ilustracion.astro`. Las animaciones solo usan `transform`/`opacity`, respetan `prefers-reduced-motion` y se pausan fuera de pantalla.

## Arquitectura de páginas

- Layout único: `src/layouts/Sitio.astro` (SEO, OG, JSON-LD, cabecera, pie).
- Componentes: `src/components/sitio/` (Cabecera, Pie, Boton, Icono, Encabezado, Puntos, Guia, Pasos, Casos, Preguntas, Formulario, LlamadaFinal, Migas…).
- **Servicios**: contenido en `src/data/servicios/*.ts` (tipo `ContenidoServicio`) pintado por `PlantillaServicio.astro`. Para cambiar el texto de un servicio se edita su fichero de datos, no la página.
- **Servicio × municipio**: `PlantillaPueblo.astro` + `ContenidoPueblo`. Diseño web: `src/data/servicios/pueblo-web.ts` (texto nuevo de los 25 municipios indexables en `src/data/textos-pueblos.ts`; el resto hereda de `landings.ts`). Informática: `pueblo-it.ts`. Todo texto heredado pasa por `sinPrecios()`.
- Indexación de municipios: `src/data/pueblos-indexables.ts`. Clúster `/programador-web/`: lógica y compuertas en `src/data/tecnologias.ts`, `programador-gate.ts`, `sectores.ts`; sus componentes están en `src/components/programador/` y toman la paleta de `Marco.astro`.
- Navegación y catálogo de servicios: `src/data/navegacion.ts`.
- Formulario: `Formulario.astro` → `POST /api/contact/` (JSON con JS, redirección a `/success/` sin JS). Exige la casilla `privacidad`.

## Contenido del blog

Posts en `src/content/posts/*.md`, validados con Zod (`src/content.config.ts`). Enlaces a servicios por post en `src/data/enlaces-post.ts`.

## Comprobaciones

```bash
npm run check        # astro check + tsc
npm run test         # vitest (escenas, precios, fuentes, datos)
npm run build        # astro build
npm run check:links  # auditoría del HTML generado: enlaces, precios, H1, title, description, canonical
npm run lighthouse
```

Objetivo en móvil: Lighthouse 95+ en rendimiento y 100 en accesibilidad, buenas prácticas y SEO; LCP < 2,5 s, CLS < 0,05, TBT < 200 ms.

En Windows, ejecutar vitest desde la ruta con `C:` en mayúscula (con `c:` falla al cargar las suites).
