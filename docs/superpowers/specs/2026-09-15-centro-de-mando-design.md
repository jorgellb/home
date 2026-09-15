# Rediseño «Centro de mando» — diseño

Fecha: 2026-09-15 · Rama: `feat/centro-de-mando` · Punto de restauración: `feat/rediseno-cine` (commit `0380d43`)

Sustituye la dirección visual de `2026-09-14-rediseno-almeria-de-cine-design.md` (§1-10) y de la home Vengeance UI. Las decisiones de negocio de ese documento siguen vigentes: Sistemas IT, Plan 360 a 400 € + IVA al mes, conversión a presupuesto, 1 H1 + 1 H2 gancho.

## 1. Decisiones del usuario

| Fecha | Decisión |
|---|---|
| 15-09 09:50 | Dirección «Centro de mando»: toda la web como panel de control en vivo. |
| 15-09 09:55 | Datos «reales + demo marcada»: lo medible se mide de verdad; lo del Plan 360 es demo con etiqueta. |
| 15-09 10:06 | Páginas de contenido en variante B, «consola con lectura cómoda». |
| 15-09 10:15 | Las 23 landings de pueblo hechas a mano se retocan una a una (no plantilla común). |
| 15-09 10:15 | Commit y push del estado anterior antes de empezar. |

Boceto aprobado: `.superpowers/brainstorm/170386-1789458954/content/centro-de-mando.html`.

## 2. Objetivo y criterios de éxito

La web de agencia más reconocible de Almería, sin perder posicionamiento ni conversión.

- Mismas URLs, títulos, descripciones, H1, H2 gancho y JSON-LD que hoy. El sitemap no cambia.
- Lighthouse móvil: rendimiento ≥ 95, accesibilidad ≥ 95, SEO 100 en home, una landing a mano, `/plan-360/` y un post.
- HTML de la home ≤ 180 KB (hoy ~241 KB) y menos JS de islas que la home actual (se mide al empezar la fase 1).
- Ninguna ilustración SVG hecha a mano desaparece (test automático, §7).
- Contraste AA en todo texto; `prefers-reduced-motion` respetado; foco visible.

## 3. Sistema visual

### 3.1 Tokens (`src/styles/global.css`, bloque `@theme static`)

| Token | Valor | Uso |
|---|---|---|
| `--color-cdm-suelo` | `#070B10` | Fondo de página y retícula |
| `--color-cdm-panel` | `#0C131A` | Paneles |
| `--color-cdm-panel-2` | `#111B24` | Paneles anidados, tierra del mapa |
| `--color-cdm-regla` | `#1C2A36` | Líneas de retícula y separadores |
| `--color-cdm-regla-2` | `#26394A` | Bordes de panel |
| `--color-cdm-texto` | `#E6EDF2` | Texto principal |
| `--color-cdm-tenue` | `#8494A2` | Texto secundario (6,3:1 sobre suelo) |
| `--color-cdm-senal` | `#FF5A00` | Acción principal, sede, señal activa |
| `--color-cdm-ok` | `#D6FF44` | Solo estados «ok» y etiqueta «real» |

Los tokens `--color-plano-*` se mantienen mientras queden páginas sin migrar y se eliminan al cerrar la fase 4.

### 3.2 Tipografía

- Titulares: Bricolage Grotesque variable con `font-stretch: 82%` (eje de anchura), peso 700-760, interlineado 0,92-0,95, tracking −0,02 em. Importar `wdth.css` en lugar del índice.
- Lectura: DM Sans 17-18 px, interlineado 1,6, columna ≤ 68 ch.
- Telemetría: JetBrains Mono solo en datos (coordenadas, horas, registros, etiquetas real/demo). Nunca en párrafos.
- Instrument Serif se mantiene hasta cerrar la fase 4, porque la usa `.heading-editorial` en páginas sin migrar.
- Corrección previa (hallada al planificar): fontsource registra las familias como `'Bricolage Grotesque Variable'`, `'DM Sans Variable'` y `'JetBrains Mono Variable'`, pero las variables `--font-*` pedían los nombres sin «Variable». Hasta hoy la web se veía con fuentes del sistema. Se corrige en la fase 1 con un test.

### 3.3 Reglas de lenguaje visual

1. Marco sólido = dato real medido. Marco discontinuo + etiqueta «demo» = simulación. No hay excepciones.
2. Lima solo significa «ok/verificado». Naranja solo significa «acción» o «sede».
3. Un único momento de arranque por visita: el escáner recorre la consola y los paneles se encienden (≤ 2,2 s). Se marca en `sessionStorage` para no repetirlo al navegar. Después solo se mueven el radar y el registro demo.
4. El H1, el H2 y los botones son visibles desde el primer pintado (sin `opacity: 0` inicial) para no retrasar el LCP. El arranque solo afecta a paneles secundarios.
5. Con `prefers-reduced-motion: reduce` no hay escáner, barrido, parpadeo ni cuenta: todo aparece en su estado final.
6. Las ilustraciones SVG a mano conservan sus colores sobre fondo claro dentro de un marco de postal.

## 4. Componentes (`src/components/cdm/`)

Todos son `.astro` sin hidratación salvo que se indique.

| Componente | Responsabilidad | Interfaz |
|---|---|---|
| `Consola.astro` | Sección oscura con retícula y viñeta; opcional escáner de arranque | `escaner?: boolean`, `as?: 'section'\|'div'`, slot |
| `Panel.astro` | Marco con cabecera y etiqueta | `titulo`, `tipo: 'real'\|'demo'\|'neutro'`, `nota?`, slot |
| `BarraEstado.astro` | Cabecera global: marca P★, menú, hora de Vera, «técnicos disponibles», botón Presupuesto; menú hamburguesa < 1280 px. se implementa directamente dentro de `layout/Header.astro` (sin archivo aparte), así cambia en todas las páginas a la vez | `currentPath` |
| `RadarCobertura.astro` | Mapa SVG del Levante y Almanzora con costa, anillos desde Vera, barrido CSS y pueblos | `pueblos` de `src/data/cobertura.ts`, `destacado?: slug` |
| `WebsMedidas.astro` | Lista de webs de clientes con Lighthouse, barra y fecha de medida | lee `src/data/medidas.json` |
| `RegistroDemo.astro` | Registro animado del Plan 360, siempre `tipo="demo"` | `lineas: {hora, texto, estado?}[]` |
| `Telemetria.astro` | Franja de cifras con contador | `cifras: {valor, prefijo?, sufijo?, etiqueta}[]` (contador propio en un script pequeño, sin React; el HTML trae el valor final) |
| `IndiceLateral.astro` | Raíl de secciones con progreso de lectura y coordenadas; script pequeño con `IntersectionObserver` | `secciones: {id, etiqueta}[]`, `coordenadas?` |
| `Postal.astro` | Marco para ilustraciones a mano con pie | `pie?`, `nota?`, slot |
| `Boton.astro` | Botón primario/línea con foco visible | `href`, `variante: 'senal'\|'linea'` |

Se conservan y reestilizan: `animated-footer` (footer ASCII), `faq-accordion`, `perspective-carousel`, `testimonials-card`.
Se eliminan al terminar la fase en que dejan de usarse: `animated-rays`, `morph-text`, `radial-glow-button`, `corner-button`, `glow-border-card`, `research-bento-grid`, `spotlight-navbar`, `border-beam`, `flip-fade-text`, `stats-counter`, `vg/*`, `brutal/*`, `it/*`, y las dependencias `gsap`, `lucide-react` si nada las usa.

## 5. Datos

### 5.1 Medidas reales (`src/scripts/medir-webs.ts`, con `tsx` como el resto de scripts del repo)

- Entrada: la lista de proyectos con URL de `src/pages/index.astro`, movida a `src/data/proyectos.ts` para compartirla.
- Por cada URL: PageSpeed Insights v5, estrategia móvil, categoría rendimiento (clave opcional `PSI_API_KEY`); y tiempo hasta el primer byte con `fetch` (3 intentos, mediana).
- Salida `src/data/medidas.json`, validada con Zod: `{ medidoEl: ISO|null, webs: [{ id, url, lighthouse: number|null, ttfbMs: number|null, medidoEl: ISO|null }] }`.
- Se ejecuta en `prebuild` con `--si-caduca`: solo vuelve a medir si la última medida tiene más de 12 h. Límite total 90 s; timeout por URL 25 s.
- El panel de la portada muestra las cuatro primeras webs de `proyectos.ts` en su orden, no las de mejor nota. Por debajo de 90 la cifra no va en lima.
- Si una web falla, conserva su último valor y fecha. Si no hay ningún valor, el panel muestra «sin medida disponible» y no se pinta la cifra. Nunca se escriben valores inventados.
- El JSON se versiona para que un build sin red siga funcionando.
- El panel muestra «medido el 15 sep» a partir de `medidoEl`.

### 5.2 Cobertura (`src/data/cobertura.ts`)

- Pueblos con `slug`, `nombre`, `lat`, `lon`, `zona: 'levante'|'almanzora'`, `sede?: true`. Reutiliza `pueblosIT` para no duplicar nombres.
- `proyectar(lat, lon, caja)` → `{x, y}` en el `viewBox`; función pura con tests.
- Costa como polilínea en coordenadas reales, proyectada con la misma función.

### 5.3 Cifras de negocio

Reseñas (4,9 / 87), años, webs entregadas y tiempo de respuesta viven en `src/data/negocio.ts` con un comentario de origen. Pendiente de confirmar por el usuario: «+50 webs entregadas».

## 6. Páginas

### 6.1 Home (fase 1)

Mismo orden de secciones y mismos textos que hoy; cambia la presentación.

1. Consola de portada: prompt de sector, H1 «Diseño web en Almería» con cursor, frase rotatoria en CSS, H2, botones, línea de confianza; a la derecha `RadarCobertura`, `WebsMedidas`, `RegistroDemo`; debajo `Telemetria`.
2. Servicios como módulos de consola.
3. Precios: tres paneles (Página web 500 €, Tienda online 700 €, Plan 360 400 €/mes con `RegistroDemo` resumido).
4. Proyectos: carrusel reestilizado; cada web con su Lighthouse medido. La franja «99/100 Lighthouse medio, < 1 s, 100 % clientes que repiten» no tiene respaldo y se sustituye por esas medidas reales.
5. Tecnologías: la órbita actual con sus logos SVG, en paleta de consola.
6. Testimonios, pueblos, FAQ (JSON-LD FAQPage intacto), contacto.

Móvil: el radar va debajo de los botones con alto reducido; los paneles de medidas y demo se apilan; la telemetría pasa a 2 × 2.

### 6.2 Plantilla de lectura (variante B)

`src/layouts/LecturaLayout.astro`: `BarraEstado` + cabecera de consola con ruta, H1, entradilla y datos + cuerpo en dos columnas (`IndiceLateral` 180 px + columna de lectura ≤ 68 ch) + footer. Por debajo de 1024 px el índice se vuelve una barra de progreso fina bajo la cabecera.

### 6.3 Landings de pueblo hechas a mano (fase 2)

Los 23 `.astro` se mantienen y se retocan uno a uno con este protocolo:

1. Contar sus SVG (se guarda en el test antes de tocar nada).
2. Envolver el cuerpo con la estructura de `LecturaLayout` (índice lateral con las secciones reales de la página). La cabecera ya llega cambiada desde la fase 1.
3. Remapear en su `<style>` los colores de papel y tinta a tokens `cdm` (fondos → suelo/panel, texto → texto/tenue, bordes → regla-2, sombras duras → borde), sin tocar los `fill`/`stroke` de las ilustraciones.
4. Colocar cada ilustración grande (viewBox ≥ 80) dentro de `Postal`, con su fondo claro original.
5. Captura escritorio y móvil; revisar contraste; siguiente página.

Orden: las de más tráfico primero (Vera, Mojácar, Garrucha, Almería, Huércal-Overa, Albox), después el resto. Revisión del usuario tras las dos primeras.

La plantilla dinámica `diseno-web/[pueblo].astro` (pueblos sin página propia) y el hub `/diseno-web/` pasan a `LecturaLayout` con `RadarCobertura` destacando el pueblo.

### 6.4 Sistemas IT y Plan 360 (fase 3)

Hub, 5 servicios y 10 pueblos IT sobre `LecturaLayout`. `/plan-360/` abre con una consola donde el `RegistroDemo` es la pieza central, la comparativa en paneles y las condiciones de salida visibles.

### 6.5 Resto (fase 4)

Desarrollo web, audiovisual, marketing (+ auditoría, recursos), diseño gráfico, estudio de marca, soporte, soluciones (4), contacto, blog y posts, Lab IA y sus demos (asistente IA, voz, configurador 3D, conversaciones, máquina del tiempo, probador AR, radar, rayos X, sonido de marca, Vera AI), stats, success, legales y 404. Las demos del Lab IA solo cambian su marco (cabecera, fondo, paneles), no su lógica.

## 7. Pruebas

- Siempre: `npm run build`, `npx astro check`, `npm run lint`, `npm test`.
- Tests nuevos (Vitest):
  - `proyectar()` sitúa Vera, Garrucha y Carboneras en su orden correcto y dentro del `viewBox`.
  - Lector de `medidas.json`: esquema válido, valores nulos no se pintan, fecha formateada.
  - `svg-landings.test`: recuento de `<svg` por landing a mano ≥ al guardado antes de la fase 2.
  - `npm run audit:seo` (`src/scripts/auditoria-seo.ts`) sobre `dist/client`: compara con una línea base guardada antes de tocar nada (URLs, título, descripción, canonical, robots, H1, primer H2 dentro de `<main>`, tipos JSON-LD); exige 1 H1 en páginas indexables, que cada panel demo lleve su etiqueta, HTML de la home ≤ 180 KB y no más JS de islas que la base.
- Visual: capturas Playwright 1440 px y 390 px de cada plantilla al cerrar cada fase.
- Lighthouse local sobre el build estático al cerrar cada fase (umbrales §2).

## 8. Fases y revisiones

| Fase | Entrega | Revisión del usuario |
|---|---|---|
| 1 | Tokens, fuentes, componentes `cdm`, `BarraEstado`, footer, home, script de medidas | Home en local |
| 2 | `LecturaLayout`, 23 landings a mano, plantilla dinámica, hub diseño web | Tras Vera y Mojácar, y al final |
| 3 | Sistemas IT (16 páginas) y Plan 360 | Al final |
| 4 | Resto de páginas, limpieza de componentes, tokens y dependencias | Al final |

Commit al cerrar cada fase; push solo si el usuario lo pide.

## 9. Riesgos

- **Frialdad para clientes no técnicos:** mitigada con la variante B, textos en lenguaje llano y las postales a mano en color.
- **23 CSS distintos en las landings:** trabajo largo; el protocolo §6.3 y el test de SVG evitan regresiones.
- **PageSpeed Insights sin clave limita peticiones:** hay respaldo con el último JSON y un límite de tiempo en `prebuild`.
- **Animación de arranque frente a LCP/CLS:** regla §3.3.4; los paneles reservan su alto.
- **Quality Gates de GitHub (Lighthouse en CI):** se ejecuta Lighthouse local antes de cada commit de fase.

## 10. Fuera de alcance

WebGL o 3D, textos SEO nuevos, cambios de precios o de condiciones del Plan 360, nuevas páginas.
