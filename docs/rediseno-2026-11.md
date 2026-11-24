# Rediseño completo — noviembre 2026

Rama: `rediseno/claro-isometrico`. Sustituye al diseño «centro de mando» (oscuro, naranja + lima).

## Decisiones

| Tema | Decisión |
|---|---|
| Estilo | Claro, limpio, con ilustración isométrica SVG animada como protagonista |
| Imágenes | Solo SVG propio. Fotos únicamente en casos reales y en el blog |
| Precios | Fuera de toda la web (páginas, FAQ, JSON-LD `offers`, meta descriptions) |
| Agente IA | Fuera: widget de chat, asistente de voz y sus APIs |
| Demos y paneles | Fuera: laboratorio IA, mapa neuronal, ficha ecommerce, probador AR, radar, stats, conversaciones, recursos de marketing, calculadora ROI |
| Pueblos | Una plantilla por servicio alimentada con datos + texto propio de cada pueblo. Mismas URLs |
| SEO | URLs que se conservan, 301 para todo lo eliminado |

## Sistema visual

- **Color**: fondo `#FAFAF7`, superficie `#FFFFFF`, tinta `#14160F`. Acción en verde profundo `#0E5B3A` (contraste AA sobre blanco). Amarillo plátano `#FFCF3F` solo como relleno, nunca como texto. Tonos de ilustración: cielo, menta, arena, coral.
- **Tipografía**: una sola familia variable, Plus Jakarta Sans (200–800), autoalojada y con un único archivo precargado. Escala fluida con `clamp()`.
- **Isométricos**: se generan en el build con `src/lib/iso.ts` (proyección isométrica de cajas y planos), así que no hay JS en el cliente. La animación es CSS y solo toca `transform` y `opacity`, y se desactiva con `prefers-reduced-motion`.
- **Iconos**: set propio en SVG isométrico (`src/components/iso/Icono.astro`).
- **Interacción**: sin React en las páginas públicas. FAQ con `<details>` y menú con CSS + un script mínimo.

## Objetivos de Core Web Vitals

LCP < 1,8 s en móvil, CLS < 0,05 e INP < 150 ms. Sin JS de terceros. Una sola fuente. Los hero son SVG inline, sin imagen LCP.

## Fases

1. Sistema de diseño: tokens, tipografía, layout, cabecera, pie, primitivas y librería isométrica.
2. Limpieza: borrar el agente, las demos y los paneles; quitar precios; redirecciones 301.
3. Home.
4. Páginas de servicio.
5. Plantillas pueblo × servicio: diseño web (99 municipios), informática, programador web.
6. Blog, contacto, legales y 404.
7. Auditoría: Lighthouse, enlaces, tests y validación de contenido.

## Estado (24-11-2026)

Hecho en la rama `rediseno/claro-isometrico`:

- Sistema visual nuevo (tokens, Plus Jakarta Sans, iconos propios, motor isométrico y 14 escenas + variantes por municipio).
- Home, 13 páginas de servicio, contacto, auditoría, blog (índice y artículo), legales, 404 y agradecimiento.
- Plantilla única pueblo × servicio: 98 municipios de diseño web (25 indexables con texto nuevo) y 10 de informática.
- Clúster `/programador-web/` (230 páginas) pasado a la paleta clara conservando su lógica.
- Eliminados: chat y asistente de voz, laboratorio y demos IA, probador AR, radar, stats, conversaciones, recursos de marketing, banner de cookies, React, GSAP, Three.js y ~58 MB de recursos.
- Precios fuera de todo el sitio, vigilado por `npm run check:links`.

Pendiente de decidir por el negocio:

- Confirmar dirección legal (aviso legal y privacidad dicen Alborada 3, Vera Playa; la ficha comercial, Ctra. de Ronda 82) y la ubicación UE del hosting que cita la política de privacidad.
- Confirmar el horario de atención para publicarlo.
- Confirmar el registro como operador de drones (la página audiovisual habla de permisos y seguro, sin citar certificaciones).
