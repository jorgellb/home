---
title: "Astro vs Next.js vs SvelteKit en 2026: qué tecnología elegir"
slug: "astro-vs-nextjs-vs-sveltekit-2026"
excerpt: "Los tres frameworks pueden hacer webs rapidísimas. La diferencia está en cuánto JavaScript mandas al navegador, si tu proyecto es contenido o aplicación, y en cómo evitas que la web acabe pareciendo una plantilla más."
seo:
  title: "Astro vs Next.js vs SvelteKit 2026: cuál elegir"
  description: "Comparativa práctica de Astro 7, Next.js 16 y SvelteKit en 2026: arquitectura, rendimiento, SEO y cómo diseñar una web con identidad propia."
  keywords:
    [
      "Astro vs Next.js",
      "SvelteKit 2026",
      "framework web 2026",
      "islas Astro",
      "React Server Components",
      "design system",
      "Tailwind",
      "shadcn",
      "diseño web",
    ]
categories: ["Tecnología", "Desarrollo Web", "Diseño Web"]
tags: ["Astro", "Next.js", "SvelteKit", "Tailwind", "shadcn", "Design System", "Rendimiento"]
author: "Platanito Rico"
draft: false
publishedAt: "2026-09-17"
lang: "es"
featuredImage: "/imagenes/blog/astro-next-sveltekit-web-tecnologias.jpg"
featuredImageAlt: "Astro, Next.js y SvelteKit comparados: tecnologías para crear webs modernas en 2026"
---

Elegir entre **Astro, Next.js y SvelteKit** ya no consiste simplemente en preguntarse cuál es más rápido.

Los tres pueden producir webs extremadamente rápidas.

Los tres pueden hacer SSR.

Los tres pueden generar páginas estáticas.

Los tres pueden conectarse a un CMS, una base de datos, Stripe, Supabase o cualquier API.

Y los tres permiten construir interfaces visualmente espectaculares.

La diferencia real aparece cuando empezamos a preguntar:

* ¿Cuánto JavaScript queremos enviar al navegador?
* ¿Nuestra web es principalmente contenido o principalmente aplicación?
* ¿Tenemos muchas zonas interactivas?
* ¿Necesitamos autenticación y personalización por usuario?
* ¿Tenemos un dashboard complejo?
* ¿Queremos utilizar React?
* ¿Nos interesa reducir al máximo el código del frontend?
* ¿Quién va a mantener el proyecto dentro de dos años?
* ¿Qué ecosistema de componentes queremos utilizar?
* ¿Cómo evitamos que la web termine siendo otra colección de tarjetas redondeadas con gradientes violetas?

Este último punto es cada vez más importante.

La proliferación de generadores de interfaces, plantillas y componentes ha creado una nueva categoría visual: **la web técnicamente correcta pero completamente genérica**.

Cards.

Bordes `border-gray-200`.

`rounded-xl`.

Un badge encima del H1.

Un título con `text-5xl font-bold tracking-tight`.

Tres tarjetas en una grid.

Un gradiente azul-violeta.

Un botón principal negro.

Y probablemente algún efecto de glow detrás del hero.

Nada de eso está mal por separado. El problema aparece cuando absolutamente todos los productos utilizan la misma composición.

En esta guía vamos a separar dos decisiones que muchas veces se mezclan:

**1. La arquitectura tecnológica.**
Astro, Next.js o SvelteKit.

**2. La arquitectura visual.**
Tailwind, shadcn, Base UI, Radix, Bits UI, Skeleton, daisyUI, Motion, GSAP, CSS propio, design tokens y dirección artística.

Porque elegir Next.js no obliga a que tu aplicación parezca una startup de IA.

Y elegir Astro no significa construir únicamente blogs estáticos.

---

## Estado del ecosistema en 2026

Conviene empezar por algo importante: estamos comparando tecnologías que han evolucionado considerablemente.

En septiembre de 2026, Astro ya está en la rama **Astro 7.x**. Astro 7 sustituyó partes importantes de su toolchain por implementaciones basadas en Rust, adoptó Vite 8 y Rolldown, estabilizó route caching e introdujo Advanced Routing. Astro 7.3 se publicó el 3 de septiembre de 2026.

Next.js se encuentra en la generación **Next.js 16.x**; Next.js 16.3 se publicó el 3 de agosto de 2026. La generación 16 consolidó Turbopack, Cache Components, Partial Prerendering y `use cache`, además de integrar las novedades recientes de React.

SvelteKit sigue apoyándose en una filosofía diferente: Svelte compila gran parte del trabajo que otros frameworks realizan durante el runtime y SvelteKit añade routing, SSR, data loading, endpoints, adapters y comunicación cliente-servidor. Su ecosistema actual recomienda, entre otras cosas, las **remote functions** para comunicación tipada entre cliente y servidor.

Por tanto, comparar estos frameworks utilizando argumentos de 2022 o 2023 tiene poco sentido.

---

## Resumen rápido: Astro vs Next.js vs SvelteKit

| Criterio                       | Astro                                         | Next.js                             | SvelteKit                            |
| ------------------------------ | --------------------------------------------- | ----------------------------------- | ------------------------------------ |
| Filosofía                      | Content-first + Islands                       | React full-stack                    | Svelte full-stack                    |
| Lenguaje de UI principal       | `.astro` + opcional React/Svelte/Vue/etc.     | React                               | Svelte                               |
| JavaScript cliente por defecto | Muy poco                                      | Depende de Server/Client Components | Generalmente contenido               |
| SSR                            | Sí                                            | Sí                                  | Sí                                   |
| SSG                            | Excelente                                     | Excelente                           | Excelente                            |
| Aplicaciones full-stack        | Sí                                            | Excelente                           | Excelente                            |
| Webs de contenido              | Excelente                                     | Muy bueno                           | Excelente                            |
| Dashboards complejos           | Posible                                       | Excelente                           | Excelente                            |
| React ecosystem                | Mediante integración                          | Nativo                              | No                                   |
| Progressive enhancement        | Bueno                                         | Posible                             | Excelente                            |
| Multi-framework                | Sí                                            | No de forma nativa                  | No                                   |
| Curva conceptual               | Baja-media                                    | Media-alta                          | Media                                |
| Control de hidratación         | Muy explícito                                 | Server/Client boundary              | Compilación + hydration              |
| Ecosistema UI                  | Muy amplio gracias a integraciones            | Enorme                              | Amplio y creciendo                   |
| Ideal para                     | Marketing, contenido, commerce, documentación | SaaS, producto, plataformas React   | Apps rápidas, productos interactivos |
| Riesgo habitual                | Añadir demasiadas islas                       | Complejidad de caching/rendering    | Ecosistema menor que React           |
| Libertad visual                | Muy alta                                      | Muy alta                            | Muy alta                             |

La tabla resume el terreno, pero todavía no explica realmente las diferencias.

Vamos a hacerlo.

---

## 1. Astro: HTML primero, JavaScript cuando realmente hace falta

La idea fundamental de Astro sigue siendo extraordinariamente sencilla:

> La mayor parte de una web no necesita convertirse en una aplicación JavaScript.

Astro popularizó la arquitectura de **islas**.

Una página puede estar formada casi completamente por HTML generado en servidor y tener únicamente pequeñas zonas interactivas que se hidratan en el navegador.

Por ejemplo:

```text
┌─────────────────────────────────────┐
│ Header                    [isla JS] │
├─────────────────────────────────────┤
│                                     │
│ Hero                     HTML       │
│                                     │
├─────────────────────────────────────┤
│ Features                 HTML       │
├─────────────────────────────────────┤
│ Calculator              [isla JS]   │
├─────────────────────────────────────┤
│ Testimonials             HTML       │
├─────────────────────────────────────┤
│ Newsletter form         [isla JS]   │
└─────────────────────────────────────┘
```

Los componentes Astro generan HTML sin runtime cliente por defecto. Solo los componentes marcados mediante directivas como `client:*` necesitan ejecutar JavaScript en el navegador. Astro también permite **Server Islands** mediante `server:defer`, separando contenido dinámico del render principal.

Ese modelo tiene una consecuencia arquitectónica muy interesante:

**la interactividad es opt-in.**

En muchas arquitecturas SPA ocurre prácticamente lo contrario: primero creamos una aplicación JavaScript y después intentamos reducir cuánto JavaScript ejecutamos.

Astro comienza desde HTML.

### Astro no significa "solo páginas estáticas"

Es probablemente uno de los malentendidos más habituales.

Astro puede trabajar con:

* SSR;
* rutas dinámicas;
* APIs;
* middleware;
* sesiones;
* autenticación;
* bases de datos;
* formularios;
* e-commerce;
* personalización;
* contenido remoto;
* componentes React;
* componentes Svelte;
* componentes Vue;
* componentes Solid.

Una característica especialmente potente es precisamente que cada isla puede utilizar un framework distinto.

Astro documenta soporte para componentes React, Preact, Svelte, Vue y Solid y permite incluso mezclarlos dentro del mismo proyecto.

Eso no significa que debamos convertir nuestro proyecto en un zoológico de frameworks.

Normalmente elegiríamos uno.

Pero permite algo muy interesante:

```text
Astro
├── layout y contenido → Astro
├── buscador → React
├── calculadora → Svelte
├── gráfico → React
└── contenido → Markdown / MDX / CMS
```

También convierte Astro en una excelente vía de migración desde proyectos React existentes.

### Astro y contenido

Aquí Astro tiene uno de sus mayores puntos fuertes.

Sus **Content Collections** permiten organizar contenido estructurado, validarlo, tiparlo y consumirlo desde archivos locales o fuentes remotas.

Desde Astro 5 existe Content Layer API; generaciones posteriores han seguido ampliando esa arquitectura.

Esto hace que proyectos como:

* blogs;
* revistas;
* documentación;
* portfolios;
* webs corporativas;
* landing pages;
* catálogos;
* directorios;
* páginas SEO;
* sitios con miles de artículos;

encajen de forma especialmente natural.

### Cuándo elegiría Astro

Astro es especialmente interesante cuando la frase que mejor describe nuestro proyecto es:

> "Tenemos una web con algunas aplicaciones dentro."

Y no:

> "Tenemos una aplicación que además contiene páginas."

Ejemplos:

```text
✓ Web corporativa
✓ Blog
✓ Portal editorial
✓ Documentación
✓ Landing pages
✓ Portfolio
✓ Directorio
✓ Comparador
✓ Sitio SEO
✓ E-commerce principalmente orientado a catálogo
✓ Página de producto
✓ Marketplace donde gran parte del contenido es público
✓ Web con calculadoras o widgets aislados
```

### Cuándo Astro empieza a ser menos natural

Imaginemos una interfaz formada por:

```text
dashboard
├── sidebar interactivo
├── filtros persistentes
├── tablas editables
├── drag & drop
├── realtime
├── command palette
├── múltiples modales
├── optimistic updates
├── editor complejo
└── estado compartido entre prácticamente toda la UI
```

Podemos hacerlo con Astro.

Pero cuando casi toda la página se convierte en una isla interactiva, empezamos a neutralizar una de las principales ventajas conceptuales de Astro.

En ese tipo de producto Next.js o SvelteKit probablemente resulten más naturales.

---

## 2. Next.js: el ecosistema React llevado al servidor

Next.js juega otro partido.

Mientras Astro parte de HTML y añade interactividad selectivamente, Next.js es esencialmente un **framework full-stack para React**.

La documentación actual sigue definiéndolo precisamente así.

Con App Router, las páginas y layouts son Server Components por defecto. Cuando necesitamos estado, eventos o APIs del navegador utilizamos Client Components.

Conceptualmente:

```text
Next.js page

Server Component
│
├── Header
│
├── Product information
│
├── Reviews
│
└── Client Component
    ├── quantity selector
    ├── add to cart
    └── wishlist
```

Es importante entender esto porque Next.js moderno ya no debería interpretarse simplemente como:

> React pero renderizado en servidor.

La frontera entre servidor y cliente forma parte de la arquitectura del componente.

### Server Components y Client Components

Un Server Component puede encargarse de:

* consultar base de datos;
* obtener datos privados;
* acceder a servicios internos;
* generar HTML;
* evitar enviar determinado código al cliente.

Un Client Component entra cuando necesitamos:

* `onClick`;
* `onChange`;
* estado local;
* efectos;
* `window`;
* `localStorage`;
* APIs del navegador.

La separación puede resultar muy potente.

También introduce más decisiones.

En proyectos grandes hay que saber exactamente dónde colocar las fronteras.

### Next.js 16 y Cache Components

Uno de los cambios relevantes de la generación actual es **Cache Components**.

Permite combinar dentro de una misma ruta:

* contenido estático;
* contenido cacheado;
* contenido dinámico.

La idea es generar un shell inicial rápido y resolver algunas partes dinámicas posteriormente utilizando Suspense y streaming.

Next.js denomina este modelo Partial Prerendering dentro de Cache Components. También permite utilizar `use cache`, `cacheLife`, `cacheTag`, `revalidateTag` y `updateTag` para controlar el comportamiento.

Podemos imaginarlo así:

```text
PRODUCT PAGE
─────────────────────────────────────

[STATIC / CACHED]
Header
Product title
Images
Description
SEO content

[DYNAMIC]
Current stock

[DYNAMIC]
User-specific price

[DYNAMIC]
Shopping cart

[CACHED]
Related products
```

Eso permite que una aplicación tenga comportamiento dinámico sin convertir toda la página en una respuesta completamente dinámica.

### La mayor ventaja de Next.js: React

Paradójicamente, una de las mayores ventajas de Next.js no es Next.js.

Es React.

El ecosistema React sigue siendo enorme.

Encontraremos soluciones maduras para:

* componentes;
* tablas;
* gráficas;
* editores;
* drag and drop;
* mapas;
* calendarios;
* autenticación;
* formularios;
* visualización de datos;
* animación;
* three.js;
* React Three Fiber;
* herramientas de IA;
* SDKs SaaS;
* integraciones enterprise.

Y cuando aparece una librería frontend nueva, es muy probable que tenga soporte para React desde el principio.

### Cuándo elegiría Next.js

Especialmente cuando el producto se describe como:

> "Una aplicación web completa."

Ejemplos:

```text
✓ SaaS
✓ Dashboard
✓ Plataforma B2B
✓ Marketplace complejo
✓ Aplicación de IA
✓ Workspace colaborativo
✓ CMS
✓ Backoffice
✓ Aplicación multiusuario
✓ App con muchos estados interactivos
✓ Producto basado en React
```

También elegiría Next.js cuando el equipo ya domina React.

La experiencia previa del equipo suele importar más que una diferencia teórica de unos kilobytes.

### El coste de Next.js: más decisiones arquitectónicas

Next.js ofrece muchas capacidades.

Eso también significa que hay más cosas que comprender:

```text
Server Components
Client Components
Suspense
streaming
cache
use cache
revalidation
route handlers
server functions
layouts
loading states
parallel routes
intercepting routes
runtime
deployment
```

No es necesariamente malo.

Es el coste de disponer de una arquitectura más amplia.

Pero para una web corporativa con veinte páginas puede ser considerablemente más framework del necesario.

---

## 3. SvelteKit: full-stack con una capa de frontend extraordinariamente ligera

SvelteKit ocupa una posición particularmente interesante entre Astro y Next.js.

Svelte adopta una filosofía diferente a React.

En lugar de depender tanto de una librería que ejecuta abstracciones en tiempo de ejecución, Svelte desplaza mucho trabajo al **compilador**.

El resultado suele ser código de componente muy directo.

Por ejemplo:

```svelte
<script>
	let count = $state(0);
</script>

<button onclick={() => count++}>
	Clicks: {count}
</button>
```

No necesitamos trabajar necesariamente con el mismo modelo mental que React.

### SvelteKit como framework

SvelteKit añade a Svelte:

```text
routing
layouts
SSR
SSG
API routes
server logic
forms
data loading
authentication patterns
deployment adapters
error handling
streaming
prerendering
```

Una página SvelteKit se renderiza por defecto en servidor para la primera petición y posteriormente puede funcionar interactivamente en el navegador.

### Progressive enhancement: una ventaja importante de SvelteKit

SvelteKit presta bastante atención a que funcionalidades fundamentales sigan teniendo una base web tradicional.

Un formulario puede funcionar mediante HTML y servidor incluso antes de añadir mejora JavaScript.

Después podemos añadir `use:enhance`.

La documentación recomienda las Form Actions como mecanismo principal para enviar datos al servidor y permite mejorarlas progresivamente.

Esto produce arquitecturas sorprendentemente robustas.

### Remote Functions

El ecosistema actual de SvelteKit también incorpora **remote functions** como mecanismo de comunicación tipada cliente-servidor.

Existen diferentes modalidades como:

```text
query
form
command
prerender
```

Las funciones se pueden llamar desde la aplicación pero se ejecutan en servidor.

Esto acerca SvelteKit a una experiencia full-stack extremadamente integrada sin obligarnos a convertir cada interacción en una API REST convencional.

### Cuándo elegiría SvelteKit

Cuando quiero construir:

```text
✓ SaaS
✓ Dashboard
✓ Producto interactivo
✓ Aplicación CRUD
✓ Herramienta interna
✓ Web de contenido
✓ Plataforma educativa
✓ Ecommerce
✓ Aplicaciones realtime
✓ PWA
```

pero prefiero el modelo mental y la sintaxis de Svelte.

SvelteKit tiene una propiedad interesante:

puede sentirse tan cómodo construyendo una pequeña web como una aplicación bastante compleja.

---

## Comparativa arquitectónica profunda

| Área                      | Astro                    | Next.js                             | SvelteKit                     |
| ------------------------- | ------------------------ | ----------------------------------- | ----------------------------- |
| Modelo fundamental        | Islands                  | React Server/Client Components      | Svelte compilado + SSR        |
| HTML por defecto          | Sí                       | Server rendering según arquitectura | SSR por defecto               |
| Hidratación               | Selectiva por componente | Client Components                   | Aplicación Svelte hidratada   |
| Control de JS cliente     | Extremadamente explícito | Muy alto si se diseña correctamente | Generalmente eficiente        |
| Server rendering          | Sí                       | Sí                                  | Sí                            |
| Streaming                 | Sí según arquitectura    | Muy integrado                       | Sí                            |
| Prerender                 | Excelente                | Excelente                           | Excelente                     |
| Contenido dinámico        | Server Islands/SSR       | RSC + Suspense + Cache Components   | SSR/load/remote functions     |
| Backend integrado         | Sí                       | Muy completo                        | Muy completo                  |
| API endpoints             | Sí                       | Route Handlers                      | `+server`                     |
| Mutaciones                | Actions/server logic     | Server Functions/Actions            | Form Actions/Remote Functions |
| Content-first             | Excelente                | Bueno                               | Muy bueno                     |
| App-first                 | Bueno                    | Excelente                           | Excelente                     |
| Multi-framework           | Excelente                | React                               | Svelte                        |
| Framework runtime cliente | Solo islas               | React donde corresponda             | Svelte                        |
| Complejidad conceptual    | Baja-media               | Media-alta                          | Media                         |

---

## Comparativa por tipo de proyecto

| Proyecto                     | Astro | Next.js | SvelteKit |
| ---------------------------- | ----: | ------: | --------: |
| Blog                         | ★★★★★ |   ★★★★☆ |     ★★★★★ |
| Revista digital              | ★★★★★ |   ★★★★☆ |     ★★★★☆ |
| Portfolio                    | ★★★★★ |   ★★★★☆ |     ★★★★☆ |
| Web corporativa              | ★★★★★ |   ★★★★☆ |     ★★★★☆ |
| Landing SaaS                 | ★★★★★ |   ★★★★★ |     ★★★★★ |
| Documentación                | ★★★★★ |   ★★★★★ |     ★★★★☆ |
| Ecommerce catálogo           | ★★★★★ |   ★★★★★ |     ★★★★★ |
| Ecommerce altamente dinámico | ★★★★☆ |   ★★★★★ |     ★★★★★ |
| SaaS                         | ★★★★☆ |   ★★★★★ |     ★★★★★ |
| Dashboard                    | ★★★☆☆ |   ★★★★★ |     ★★★★★ |
| Backoffice                   | ★★★☆☆ |   ★★★★★ |     ★★★★★ |
| Aplicación colaborativa      | ★★★☆☆ |   ★★★★★ |     ★★★★★ |
| Aplicación IA                | ★★★★☆ |   ★★★★★ |     ★★★★★ |
| Web SEO masiva               | ★★★★★ |   ★★★★★ |     ★★★★☆ |
| Web principalmente estática  | ★★★★★ |   ★★★★☆ |     ★★★★☆ |

Estas estrellas no representan un benchmark absoluto. Indican principalmente cuánto encaja cada arquitectura con el tipo de producto.

---

## ¿Cuál es más rápido?

La respuesta correcta es:

**depende muchísimo más de lo que construyamos que del nombre del framework.**

Podemos construir una web Astro lenta.

Podemos construir una web Next.js extremadamente rápida.

Podemos construir una aplicación SvelteKit pesada.

Una comparación seria necesita distinguir:

```text
TTFB
FCP
LCP
INP
CLS
JS transferido
JS ejecutado
imágenes
fuentes
queries
cache
CDN
third-party scripts
hydration
```

### Astro y performance

Astro tiene una ventaja estructural muy clara en páginas predominantemente estáticas:

**por defecto no necesita enviar JavaScript para componentes que no lo necesitan.**

Ese comportamiento está documentado explícitamente en su arquitectura de islas.

Por eso resulta difícil cometer accidentalmente algunos tipos de sobrehidratación.

### Next.js y performance

Next.js puede producir aplicaciones extraordinariamente rápidas, pero exige disciplina arquitectónica.

La frontera:

```text
"use client"
```

es importante.

Si convertimos componentes demasiado altos en el árbol en Client Components podemos terminar enviando más JavaScript de lo necesario.

En cambio, una arquitectura bien diseñada con Server Components, caching, Suspense y streaming puede funcionar extremadamente bien.

Next.js 16.3 ha seguido mejorando navegación, partial prefetching y rendimiento del entorno de desarrollo.

### SvelteKit y performance

Svelte tiene una ventaja conceptual distinta:

el compilador puede generar código específico para nuestros componentes.

No estamos necesariamente enviando una capa de runtime con el mismo modelo que una aplicación React equivalente.

En interfaces muy interactivas esto puede ser atractivo porque conseguimos reactividad con relativamente poca ceremonia.

---

## SEO

Los tres son perfectamente válidos para SEO.

No elegiría uno exclusivamente porque "Google indexa mejor X".

Lo relevante es poder producir correctamente:

```text
HTML inicial
titles
meta descriptions
canonical
structured data
Open Graph
sitemap
robots
hreflang
URLs estables
performance
contenido semántico
```

Los tres frameworks permiten hacerlo.

Astro simplemente hace especialmente natural el modelo content-first.

---

## ¿Y el hosting?

Los tres permiten desplegar en diferentes plataformas.

SvelteKit dispone de adapters para Node, Cloudflare, Netlify, Vercel, static y otros entornos; varios aparecen directamente en el catálogo oficial del ecosistema.

Astro soporta distintos runtimes y Astro 7 ha seguido ampliando sus capacidades de caching y routing.

Next.js también ha avanzado en portabilidad; Next.js 16.2 estabilizó su Adapter API.

Por tanto, tampoco reduciría la decisión exclusivamente a Vercel vs Cloudflare.

---

## Entonces, ¿qué elegir?

Una regla bastante útil es esta:

| Si tu proyecto se parece a...                 | Empezaría evaluando...      |
| --------------------------------------------- | --------------------------- |
| Contenido con algunas zonas interactivas      | Astro                       |
| Aplicación React full-stack                   | Next.js                     |
| Aplicación interactiva sin necesidad de React | SvelteKit                   |
| Portal editorial                              | Astro                       |
| SaaS B2B                                      | Next.js / SvelteKit         |
| Dashboard complejo                            | Next.js / SvelteKit         |
| Marketing + blog + docs                       | Astro                       |
| Marketplace                                   | Next.js / SvelteKit         |
| Ecommerce content-heavy                       | Astro / Next.js / SvelteKit |
| Equipo experto en React                       | Next.js                     |
| Equipo experto en Svelte                      | SvelteKit                   |
| Migración progresiva desde varios frameworks  | Astro                       |

---

## La segunda decisión: cómo construir una UI moderna

Aquí comienza otra conversación completamente diferente.

El framework no crea la identidad visual.

Podemos utilizar Astro y hacer algo completamente genérico.

Podemos utilizar Next.js y crear una interfaz editorial extraordinariamente personal.

Podemos usar SvelteKit y construir algo brutalista, minimalista, neoindustrial o inspirado en interfaces de escritorio.

La identidad aparece en el **design system**, no en el meta-framework.

### Las capas de una UI moderna

Una arquitectura visual madura puede imaginarse así:

```text
┌────────────────────────────────────────┐
│ Dirección artística                    │
│ lenguaje, ritmo, composición           │
├────────────────────────────────────────┤
│ Design tokens                          │
│ color, espacio, radius, typography     │
├────────────────────────────────────────┤
│ Component system                       │
│ Button, Dialog, Select, Card...        │
├────────────────────────────────────────┤
│ Headless primitives                    │
│ accessibility + interactions           │
├────────────────────────────────────────┤
│ CSS / Tailwind                         │
├────────────────────────────────────────┤
│ Browser                                │
└────────────────────────────────────────┘
```

El error habitual consiste en empezar directamente por:

```text
npx shadcn add button
```

y esperar que aparezca una identidad de producto.

No aparecerá.

Un component library resuelve componentes.

No resuelve dirección artística.

### Tailwind CSS

Tailwind continúa siendo una de las opciones más cómodas para las tres tecnologías.

Tailwind v4 funciona escaneando nuestros templates y genera CSS estático sin runtime. Sus guías oficiales incluyen Next.js y SvelteKit y funciona igualmente bien con Astro.

Pero Tailwind tampoco es un design system.

Esto:

```html
<div class="rounded-xl border bg-white p-6 shadow-sm">
```

no define una identidad.

Solo define una caja.

---

## Principales opciones UI para Next.js

El ecosistema React ofrece probablemente el abanico más grande.

| Sistema          | Tipo                    | Libertad visual | Velocidad inicial | Mejor para                |
| ---------------- | ----------------------- | --------------: | ----------------: | ------------------------- |
| shadcn/ui        | Código copiado/editable |           ★★★★★ |             ★★★★★ | Productos custom          |
| Base UI          | Headless                |           ★★★★★ |             ★★★☆☆ | Design systems            |
| Radix Primitives | Headless                |           ★★★★★ |             ★★★☆☆ | Design systems            |
| React Aria       | Headless/accessibility  |           ★★★★★ |             ★★★☆☆ | Apps accesibles complejas |
| Mantine          | Component library       |           ★★★☆☆ |             ★★★★★ | Dashboards y apps         |
| Chakra UI        | Component library       |           ★★★★☆ |             ★★★★★ | SaaS                      |
| Material UI      | Component library       |           ★★★☆☆ |             ★★★★★ | Enterprise                |
| Ark UI           | Headless                |           ★★★★★ |             ★★★☆☆ | Sistemas custom           |
| daisyUI          | Tailwind components     |           ★★★☆☆ |             ★★★★★ | Prototipos/productos      |
| CSS propio       | Custom                  |           ★★★★★ |             ★★☆☆☆ | Identidad fuerte          |

### shadcn/ui

Shadcn cambió bastante la forma en que construimos interfaces React.

La clave es que **no funciona como una librería tradicional**.

El código del componente termina dentro de nuestro proyecto y podemos modificarlo. Esa filosofía sigue formando parte explícita del proyecto.

En 2026 hay otro detalle especialmente interesante.

El propio proyecto introdujo nuevos estilos porque demasiadas aplicaciones terminaban teniendo una apariencia excesivamente parecida.

Entre las variantes introducidas encontramos:

```text
Vega
Nova
Maia
Lyra
Mira
```

También permite cambiar base component library, tipografía, iconos, spacing y otros aspectos mediante su configuración. Desde julio de 2026, Base UI es la base predeterminada para proyectos nuevos, aunque Radix sigue soportado.

Esto es muy relevante.

**Shadcn no es el problema.**

El problema es instalar shadcn y no modificar nada.

### Base UI

Base UI proporciona componentes React headless.

Eso significa:

```text
comportamiento         ✓
accesibilidad          ✓
interacciones          ✓
estilo visual          tú
```

Su propia documentación recomienda shadcn cuando buscamos componentes preestilizados construidos encima de una base headless.

Es una solución excelente cuando queremos diseñar una identidad realmente personalizada.

### Radix UI

Radix Primitives continúa siendo otra base excelente.

Sus componentes son accesibles, sin estilo y específicamente orientados a construir design systems.

Por ejemplo:

```text
Dialog
Dropdown
Popover
Select
Slider
Tooltip
Accordion
Tabs
Context Menu
```

Nosotros decidimos completamente cómo se ven.

### Mantine

Mantine se encuentra en el otro extremo.

Tiene una enorme colección de componentes preparados:

```text
forms
dates
charts
notifications
modals
spotlight
carousel
dropzone
rich text
code highlighting
```

Mantiene guías específicas para Next.js App Router.

Es magnífico cuando queremos velocidad de producto por encima de una dirección visual completamente artesanal.

### Material UI

Material UI sigue siendo una opción lógica especialmente para:

```text
enterprise
backoffice
herramientas internas
productos B2B
interfaces densas
```

Dispone de integración específica con Next.js App Router.

No suele ser mi primera opción para una landing con una identidad editorial muy diferenciada.

Pero eso es una cuestión de objetivo visual, no de calidad técnica.

### Chakra UI

Chakra también dispone de integración documentada con Next.js 15 y 16.

Tiene sentido si queremos:

* API consistente;
* theming;
* componentes preparados;
* accesibilidad;
* rapidez.

---

## Principales opciones UI para SvelteKit

El ecosistema Svelte ya tiene bastantes alternativas maduras.

El propio catálogo oficial de Svelte destaca actualmente, entre otras:

* shadcn-svelte;
* Bits UI;
* Skeleton;
* Flowbite Svelte;
* Ark UI;
* daisyUI;
* Svelte Material UI;
* Carbon Components Svelte;
* Melt UI.

Una comparación práctica:

| Sistema         | Filosofía          | Libertad visual | Componentes preparados |
| --------------- | ------------------ | --------------: | ---------------------: |
| Bits UI         | Headless           |           ★★★★★ |                  ★★☆☆☆ |
| shadcn-svelte   | Copy/paste         |           ★★★★★ |                  ★★★★★ |
| Skeleton        | Design system      |           ★★★★☆ |                  ★★★★★ |
| Ark UI          | Headless           |           ★★★★★ |                  ★★★☆☆ |
| Melt            | Low level headless |           ★★★★★ |                  ★★☆☆☆ |
| Flowbite Svelte | Component library  |           ★★★☆☆ |                  ★★★★★ |
| daisyUI         | Tailwind classes   |           ★★★☆☆ |                  ★★★★★ |
| Carbon          | Enterprise system  |           ★★☆☆☆ |                  ★★★★★ |
| CSS propio      | Custom             |           ★★★★★ |                  ★☆☆☆☆ |

### Bits UI

Bits UI probablemente sea una de las opciones más interesantes para una UI Svelte realmente personalizada.

Es una colección de componentes headless para Svelte con foco en:

* accesibilidad;
* experiencia de desarrollo;
* flexibilidad;
* control completo sobre estilos.

La mayoría de componentes no tienen estilo visual por defecto.

Eso es exactamente lo que queremos cuando no queremos que nuestra web parezca una plantilla.

### shadcn-svelte

Shadcn-svelte lleva la filosofía de shadcn al ecosistema Svelte y utiliza Bits UI + Tailwind.

Es importante señalar que es un proyecto comunitario y no el proyecto oficial de shadcn para React. Su propia documentación lo identifica explícitamente como un port comunitario.

Aun así, es una solución extremadamente interesante.

Porque nuevamente obtenemos el código.

No una caja negra.

### Ark UI

Ark UI soporta Svelte 5 además de React y otros frameworks.

Se presenta como una librería headless y dispone de componentes para construir design systems personalizados.

### Flowbite Svelte

Flowbite Svelte utiliza componentes Svelte nativos sobre Tailwind y ofrece gran cantidad de elementos ya construidos:

```text
navbar
dropdown
modal
sidebar
forms
tables
cards
tabs
etc.
```

Su documentación ofrece configuración específica con SvelteKit y Tailwind.

Muy práctico.

Menos apropiado si buscamos una dirección visual completamente singular sin modificar bastante los defaults.

### daisyUI

daisyUI sigue siendo posiblemente una de las formas más rápidas de obtener componentes sobre Tailwind.

Su documentación dispone de instalación específica para SvelteKit.

Lo utilizaría cuando:

```text
velocidad > singularidad visual
```

o cuando vayamos a modificar posteriormente el sistema.

---

## ¿Y Astro?

Astro tiene una propiedad especial.

No estamos obligados a elegir una única familia de componentes.

Podemos utilizar:

```text
Astro + Tailwind
Astro + CSS
Astro + React + shadcn
Astro + React + Base UI
Astro + Svelte + Bits UI
Astro + Svelte + shadcn-svelte
Astro + daisyUI
Astro + Preline
```

Shadcn dispone actualmente de un template oficial para Astro que configura React + Tailwind y permite instalar sus componentes mediante CLI.

Preline, por su parte, adopta un modelo basado en DOM y Tailwind que puede utilizarse en múltiples stacks, incluyendo Astro y Svelte.

Esta flexibilidad convierte Astro en una especie de shell especialmente interesante para webs visuales con widgets interactivos.

### Comparativa global de ecosistemas UI

| UI                       | Next.js  | SvelteKit | Astro             |
| ------------------------ | -------- | --------- | ----------------- |
| Tailwind                 | ✅        | ✅         | ✅                 |
| CSS Modules              | ✅        | —         | —                 |
| CSS scoped               | —        | ✅         | ✅                 |
| shadcn/ui                | ✅ nativo | —         | ✅ vía React       |
| shadcn-svelte            | —        | ✅         | ✅ vía Svelte      |
| Base UI                  | ✅        | —         | ✅ vía React       |
| Radix UI                 | ✅        | —         | ✅ vía React       |
| Bits UI                  | —        | ✅         | ✅ vía Svelte      |
| Ark UI                   | ✅        | ✅         | ✅ vía integración |
| Skeleton                 | —        | ✅         | ✅ vía Svelte      |
| Flowbite Svelte          | —        | ✅         | ✅ vía Svelte      |
| daisyUI                  | ✅        | ✅         | ✅                 |
| Mantine                  | ✅        | —         | ✅ vía React       |
| Chakra                   | ✅        | —         | ✅ vía React       |
| Material UI              | ✅        | —         | ✅ vía React       |
| Preline                  | ✅        | ✅         | ✅                 |
| CSS completamente custom | ✅        | ✅         | ✅                 |

---

## El problema de las webs que "parecen hechas con IA"

Aquí llegamos probablemente a la parte más importante del artículo.

La IA no tiene realmente un estilo visual único.

Lo que vemos es una convergencia producida por:

```text
datasets similares
+
templates similares
+
Tailwind
+
shadcn defaults
+
prompts similares
+
landing pages de startups
```

Y termina produciendo algo reconocible:

```text
┌────────────────────────────────────────┐
│              [New AI ✨]              │
│                                        │
│     Build the future with AI           │
│      Faster. Smarter. Better.          │
│                                        │
│      [Get started] [Learn more]        │
│                                        │
│    ○   ○   ○   ○   ○ logos            │
├────────────────────────────────────────┤
│  [card]      [card]      [card]        │
├────────────────────────────────────────┤
│        Big centered CTA                │
└────────────────────────────────────────┘
```

Visualmente limpio.

Perfectamente usable.

Completamente intercambiable con otras diez mil webs.

### Anti-pattern 1: el exceso de cards

Una card tiene sentido cuando representa una unidad conceptual independiente.

No cuando absolutamente todo necesita una caja.

Mal:

```text
[card]
  heading
  text
[/card]

[card]
  heading
  text
[/card]

[card]
  heading
  text
[/card]
```

Mejor:

```text
01 ───────────────
Heading

Texto que forma parte directamente
de la composición.

                  02 ───────────────
                  Heading

                  Texto.
```

No todo necesita:

```css
border
background
border-radius
box-shadow
```

### Anti-pattern 2: `rounded-xl` universal

Uno de los indicadores visuales más frecuentes de interfaces actuales generadas desde templates es utilizar el mismo radio en absolutamente todo:

```text
buttons      12px
cards        12px
images       12px
modals       12px
inputs       12px
badges       12px
```

Un sistema más elaborado tendría jerarquías:

```css
--radius-control: 6px;
--radius-panel: 10px;
--radius-media: 2px;
--radius-pill: 999px;
```

O incluso una identidad completamente cuadrada:

```css
--radius: 0px;
```

La geometría también comunica marca.

### Anti-pattern 3: demasiados gradientes

Un glow azul-violeta puede ser bonito.

El problema es cuando aparece porque el prompt decía:

> Make it modern.

Dirección artística significa que podemos decidir conscientemente:

```text
sin gradientes
sin sombras
sin glassmorphism
sin blur
```

y seguir teniendo una interfaz contemporánea.

### Anti-pattern 4: el Bento Grid automático

Los Bento Grids funcionan.

Precisamente por eso aparecen en todas partes.

Utilizarlos no es un error.

Utilizarlos sin una razón de contenido sí puede serlo.

No deberíamos diseñar:

```text
cuadrado
cuadrado grande
rectángulo
cuadrado
```

y después preguntarnos qué información metemos dentro.

Primero estructura de información.

Después composición.

### Anti-pattern 5: todo centrado

Muchísimas landing pages generadas automáticamente utilizan:

```css
text-align: center;
max-width: 700px;
margin-inline: auto;
```

en casi todas las secciones.

Una web inmediatamente empieza a sentirse más editorial cuando introducimos:

```text
asimetría
alineación izquierda
columnas
tensión entre espacios
elementos fuera de grid
texto vertical
números grandes
caption lateral
```

### Anti-pattern 6: tipografía genérica

Cambiar Inter por otra sans geométrica no crea automáticamente personalidad.

Necesitamos diseñar un **sistema tipográfico**.

Por ejemplo:

```text
DISPLAY
64 / 62
serif editorial

H1
48 / 48
sans grotesk

BODY
17 / 27
humanist sans

LABEL
11 / 14
uppercase
letter-spacing: .12em

DATA
13 / 16
monospace
```

Eso ya genera lenguaje visual.

---

## Cómo crear una web que tenga identidad

El proceso debería empezar antes de escribir componentes.

Definamos primero una **dirección artística**.

Por ejemplo:

### Dirección 1: Editorial minimalista

Inspiración conceptual:

```text
revista
arquitectura
fotografía
moda
publishing
```

Características:

```text
grandes márgenes
tipografía protagonista
serif + sans
pocos bordes
fotografías grandes
mucho blanco
asimetría
numeración editorial
```

Stack excelente:

```text
Astro
Tailwind o CSS
View Transitions
poco JavaScript
```

Ideal para:

```text
agencias
arquitectura
portfolio
publicaciones
marcas premium
```

### Dirección 2: Neo-industrial

Características:

```text
bordes finos
radius 0-4px
monospace
numeración
grid visible
contraste alto
iconografía técnica
espacios densos
```

Tokens:

```css
--radius: 2px;
--border: 1px;
--space-section: 112px;
--font-ui: "ABC Diatype";
--font-data: "IBM Plex Mono";
```

Funciona extraordinariamente bien para:

```text
developer tools
infraestructura
cybersecurity
AI engineering
hardware
fintech
```

### Dirección 3: Producto suave

Características:

```text
radius moderado
fondos ligeramente cálidos
tipografía humanista
sombras casi invisibles
microanimación
ilustraciones propias
```

No:

```text
gradient explosion
glassmorphism en todo
```

Sí:

```text
detalles táctiles
transiciones pequeñas
jerarquía clara
componentes agradables
```

Ideal para SaaS consumer.

### Dirección 4: Data-dense

Piensa más en:

```text
Linear
Bloomberg
terminal
Figma panels
developer tools
```

que en una landing page.

Características:

```text
espaciado compacto
12-14px UI
tablas
command palette
sidebars
keyboard shortcuts
split views
context menus
density controls
```

Stack lógico:

```text
Next.js + Base UI/shadcn
```

o:

```text
SvelteKit + Bits UI
```

### Dirección 5: Luxury editorial

Reglas:

```text
menos componentes
más tipografía
fotografía excelente
motion lento
espacio
paleta pequeña
```

Un diseño premium normalmente necesita eliminar cosas, no añadirlas.

---

## Diseñar primero los tokens

Antes de crear cincuenta componentes, deberíamos establecer algo parecido a:

```css
:root {
  --background: #f4f2ed;
  --foreground: #11110f;

  --surface: #ebe8e1;
  --surface-elevated: #faf9f6;

  --muted: #77736b;
  --border: #d5d0c7;

  --accent: #ff4d00;

  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;

  --space-xs: 0.375rem;
  --space-sm: 0.75rem;
  --space-md: 1.25rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
}
```

Observa una cosa:

No hay veinte colores.

No hay siete gradientes.

No hay quince radios.

La restricción genera coherencia.

### El spacing es más importante de lo que parece

Una interfaz genérica suele utilizar:

```text
16
24
32
48
```

de forma casi automática.

Una dirección más editorial puede utilizar una escala deliberada:

```text
4
8
12
20
32
52
84
136
```

No porque esos números sean mágicos.

Sino porque generan ritmo.

### Tipografía variable

Otra forma de crear personalidad sin llenar la web de elementos gráficos es aprovechar fuentes variables.

Podemos variar:

```text
weight
width
optical size
slant
```

y construir títulos con mucha más identidad.

Una buena tipografía puede hacer más por una homepage que cincuenta componentes.

### Iconos: otro indicador de identidad

No mezcles aleatoriamente:

```text
Lucide
Heroicons
Phosphor
Material
SVGs de distintas fuentes
```

Elige una familia.

Y decide:

```text
stroke
tamaño
peso
bounding box
alineación óptica
```

Incluso un sistema tan pequeño como:

```text
16px → controles
20px → acciones
24px → navegación
32px → features
```

mejora mucho la coherencia.

---

## Motion sin convertir la web en un parque de atracciones

Una interfaz moderna no necesita que cada elemento haga:

```text
opacity 0 → 1
translateY 20 → 0
delay +100ms
```

cuando hacemos scroll.

Eso también empieza a parecer extremadamente genérico.

Utilicemos motion para explicar cambios.

Por ejemplo:

```text
estado A → estado B
lista → detalle
thumbnail → imagen grande
menú cerrado → menú abierto
fila → editor
```

No simplemente porque podemos animar algo.

### View Transitions

En 2026 la View Transition API es especialmente interesante.

Permite transiciones entre estados dentro de una página y también entre documentos. MDN la clasifica actualmente como disponible ampliamente en navegadores recientes para varias de sus capacidades principales.

Esto nos permite construir experiencias muy pulidas sin introducir necesariamente una gigantesca librería de animación.

### Motion

Para React, Motion —anteriormente Framer Motion— continúa siendo una de las soluciones más completas para:

```text
layout animation
gestures
springs
scroll animation
AnimatePresence
microinteractions
```

Su API actual se importa mediante:

```js
import { motion } from "motion/react";
```

y está orientada específicamente a React.

Muy apropiado con Next.js o con islas React dentro de Astro.

### GSAP

Cuando necesitamos animación realmente compleja:

```text
scroll storytelling
timelines
SVG
secuencias
pinned sections
interacciones cinematográficas
```

GSAP continúa siendo una herramienta extraordinaria.

Además, es framework-agnostic.

Puede utilizarse con Astro, Next.js o SvelteKit.

### Qué animaría y qué no

| Interacción          | Técnica recomendada      |
| -------------------- | ------------------------ |
| Hover sencillo       | CSS                      |
| Button press         | CSS                      |
| Accordion            | CSS / primitive          |
| Cambio de layout     | View Transition / Motion |
| Modal                | CSS / Motion             |
| Shared element       | View Transition          |
| Gestos complejos     | Motion                   |
| Storytelling scroll  | GSAP                     |
| Hero cinematográfico | GSAP / WebGL             |
| Skeleton loading     | CSS                      |
| Loading spinner      | CSS                      |

No instalemos una librería de 50 funciones para cambiar una opacidad.

---

## La regla de las tres capas

Una forma muy práctica de evitar interfaces genéricas es diseñar cada página en tres escalas.

### Macro

La composición completa.

```text
grid
sections
ritmo vertical
asimetría
anchuras
espacios
```

### Meso

Los patrones de contenido.

```text
feature
testimonial
pricing
timeline
comparison
article
```

### Micro

Los controles.

```text
button
input
badge
tooltip
icon
separator
```

Las interfaces generadas automáticamente suelen estar bastante bien en micro.

Pero casi todas fallan en macro.

Un Button bonito no salva una composición aburrida.

### No diseñes componentes aislados: diseña relaciones

Por ejemplo, una feature no tiene por qué ser una card.

Podría ser:

```text
01                          Search
────────────────────────────────────────

                            Instant results
                            across your entire
                            workspace.

                            ⌘ K
```

Eso inmediatamente crea una composición diferente.

### Introduce motivos gráficos propios

Otra técnica muy potente.

Elige uno o dos elementos recurrentes:

```text
línea horizontal
número de sección
bracket
esquina cortada
cursor
pixel
flecha
coordinate marker
retícula
subrayado
```

Y repítelos estratégicamente.

Eso crea una firma visual.

### Ejemplo de sistema visual propio

Imaginemos una startup de infraestructura.

En vez del típico:

```text
dark background
purple glow
gradient cards
```

podemos definir:

```text
Background        #ECEBE6
Text              #101010
Accent            #FF3D00
Border            #B9B8B2

Radius            2px
Border width      1px

Display           grotesk condensed
Body              neutral sans
Data              monospace

Grid              12 columns
Section number    11px mono
Icons             line 1.5px
```

Ahora toda decisión posterior puede evaluarse contra ese lenguaje.

### Componentes que conviene tener en un design system

Un sistema maduro podría tener:

```text
Button
IconButton
Link
Input
Textarea
Select
Checkbox
Radio
Switch
Slider
Combobox

Dialog
Drawer
Popover
Tooltip
Dropdown
ContextMenu
CommandPalette

Tabs
Accordion
Breadcrumb
Pagination
NavigationMenu

Badge
Avatar
Status
Progress
Skeleton
Toast

Table
DataTable
Card
Panel
Stat
ChartContainer

Container
Stack
Cluster
Grid
Divider
Spacer
```

Pero nuevamente:

**el componente no debería definir la dirección artística.**

La dirección artística debería definir el componente.

---

## Qué stack visual elegiría con cada framework

### Con Astro

Para una web editorial o de marketing:

```text
Astro
+
Tailwind 4
+
CSS variables
+
Astro components
+
View Transitions
+
GSAP solamente en experiencias concretas
```

Para una web Astro con elementos React:

```text
Astro
+
Tailwind
+
React islands
+
shadcn/Base UI
+
Motion
```

Para máxima personalidad:

```text
Astro
+
CSS propio
+
custom components
+
mínimo JavaScript
```

### Con Next.js

Para un SaaS:

```text
Next.js
+
Tailwind
+
shadcn/ui
+
Base UI
+
Motion
```

Pero modificaría desde el primer día:

```text
typography
radius
spacing
colors
component density
buttons
cards
navigation
```

No esperaría a tener cincuenta pantallas.

### Con SvelteKit

Para una aplicación de producto:

```text
SvelteKit
+
Tailwind
+
Bits UI
+
componentes propios
```

o:

```text
SvelteKit
+
shadcn-svelte
+
tokens completamente personalizados
```

Bits UI es especialmente atractivo si el objetivo es mantener la accesibilidad y el comportamiento pero crear desde cero la capa visual.
