# Rediseño «Almería de cine» + Sistemas IT + Plan 360

> **Actualización 2026-09-14 18:23: dirección visual sustituida.** El usuario descarta la estética «de cine» (§3) y elige **«brutal tech»**. Las decisiones de negocio, SEO y arquitectura (§2 salvo la fila visual, §4–§7) siguen vigentes. Ver §10.

Fecha: 2026-09-14 · Rama: `feat/rediseno-cine` · Estado: aprobado por el usuario («aplica todo lo que hemos hablado»).

## 1. Objetivo

Que platanitorico.com sea la web de agencia de Almería que mejor posiciona, con la estética más original y la que más presupuestos genera. Conversión principal: **pedir presupuesto**.

## 2. Decisiones cerradas

| Tema | Decisión |
|---|---|
| Dirección visual | «Almería de cine»: Tabernas y la costa como plató. Franjas de cine, grano de película, gradación cálida de desierto y tipografía de cartel |
| Portada | Opción A «Cartel de estreno» + debajo la «Cartelera» de la opción C con los packs |
| Vídeo | «Cala cristal dron 4k» (YouTube `ttqdeAl5Wzo`, canal propio). Bucle de 8 s autoalojado (AV1 WebM + H.264 MP4 + póster) y botón «Ver la película completa» que abre YouTube (`youtube-nocookie`, ya permitido en CSP) |
| Precios en home | 3 sesiones: Web desde 500 €, Tienda online desde 700 €, **Plan 360 400 € + IVA/mes** (pase especial) |
| Encabezados | 1 solo `<h1>` por página con la búsqueda principal + 1 `<h2>` gancho justo debajo. Cada sección con H2 que incluye palabra clave |
| Nuevo servicio | Sistemas IT: mantenimiento informático, redes e infraestructuras, ordenadores de todo tipo (instalación y mantenimiento) |
| Arquitectura IT | Opción A: hub + 5 páginas de servicio + `/plan-360/` + landings IT por pueblo de la zona de cobertura |
| Plan 360 | 400 € + IVA/mes · hasta 10 puestos + 1 servidor/NAS + red + web · puesto extra 25 €/mes · sin permanencia y sin alta |
| Cobertura IT presencial | Levante y Almanzora, visita in situ el mismo día |
| SEO rápido | Se integra en el rediseño (no se publica suelto) |

## 3. Sistema visual

- **Paleta** (tokens `--cine-*` en `global.css`): noche `#0B0A08`, hueso `#F3EAD8`, sol `#FF5A1F` (texto sobre claro: `#AE3F13`, AA), ámbar `#FFB36B`, mar `#0E6E74`, polvo `#C9A77C`.
- **Tipografía**: Anton (titulares de cartel, mayúsculas) · Instrument Serif itálica (subtítulos «de guion») · JetBrains Mono (créditos, metadatos y códigos de tiempo) · DM Sans (texto). Todas autoalojadas con @fontsource.
- **Recursos gráficos**: franjas de cine (`.cine-bars`), grano SVG en overlay (`.cine-grain`, desactivable con `prefers-reduced-motion`) y rótulos tipo créditos.
- **Accesibilidad**: contraste AA, el vídeo no tiene audio, se pausa con `prefers-reduced-motion` y tiene botón de pausa (WCAG 2.2.2).
- **Rendimiento**: el póster es el LCP (precargado, AVIF/JPEG). El vídeo carga después del primer pintado y en móvil usa 720p. Sin JS de YouTube hasta que el usuario hace clic.

## 4. Home: estructura y encabezados

Title: `Agencia de Diseño Web en Almería | Platanito Rico` (49). Description ≤160.

| # | Sección | Encabezado |
|---|---|---|
| 0 | Hero «Cartel de estreno» | **H1**: Diseño web en Almería · **H2 gancho**: Webs, sistemas informáticos y vídeo con dron que hacen vender a tu empresa |
| 1 | Cartelera (packs) | H2: Precios de páginas web en Almería: elige tu sesión |
| 2 | Servicios | H2: Diseño web, sistemas IT y vídeo aéreo bajo el mismo techo |
| 3 | Plan 360 destacado | H2: Plan 360: tu web y tu informática por 400 € al mes |
| 4 | Por qué nosotros | H2: Por qué somos la agencia web del Levante almeriense |
| 5 | Proceso | H2: Cómo hacemos tu página web en 4 semanas |
| 6 | Portfolio | H2: Páginas web que hemos hecho en Almería |
| 7 | Opiniones | H2: Opiniones de clientes: 4,9 sobre 5 |
| 8 | Cobertura | H2: Diseño web e informática en toda la provincia de Almería |
| 9 | Blog | H2: Guías de diseño web y tecnología para negocios |
| 10 | FAQ | H2: Preguntas frecuentes sobre precios de páginas web |
| 11 | Contacto | H2: Pide presupuesto sin compromiso |

## 5. H1 + H2 gancho por página

| URL | H1 | H2 gancho |
|---|---|---|
| `/desarrollo-web/` | Diseño y desarrollo web en Almería | Webs rápidas que aparecen en Google y convierten visitas en presupuestos |
| `/informatica-empresas/` | Mantenimiento informático para empresas en Almería | Tu departamento IT en el Levante y el Almanzora, con visita el mismo día |
| `/informatica-empresas/mantenimiento-informatico/` | Mantenimiento informático preventivo para empresas | Helpdesk remoto y técnico in situ el mismo día en Vera, Huércal-Overa y Albox |
| `/informatica-empresas/redes-wifi/` | Instalación de redes y wifi profesional para empresas | Cableado estructurado, racks y firewall que no se caen en plena jornada |
| `/informatica-empresas/servidores-copias-seguridad/` | Servidores, NAS y copias de seguridad para empresas | Que un disco roto o un ransomware no paren tu negocio ni un día |
| `/informatica-empresas/ordenadores-equipos/` | Venta, instalación y reparación de ordenadores para empresas | PCs, portátiles, Mac, TPV e impresoras configurados y listos para trabajar |
| `/informatica-empresas/ciberseguridad/` | Ciberseguridad para pymes en Almería | Antivirus gestionado, Microsoft 365 seguro y RGPD sin tecnicismos |
| `/plan-360/` | Plan 360: web y mantenimiento informático por 400 € al mes | Tu departamento de tecnología completo, sin contratarlo y sin permanencia |
| `/informatica-empresas/{pueblo}/` | Mantenimiento informático en {Pueblo} | Técnico en tu empresa de {Pueblo} el mismo día |
| `/diseno-web/{pueblo}/` | Diseño web en {Pueblo} | Páginas web que traen clientes a negocios de {Pueblo} |
| `/audiovisual/` | Vídeo con dron y producción audiovisual en Almería | Tomas aéreas 4K que hacen que tu negocio se vea de cine |
| `/marketing/` | Agencia de marketing digital y SEO en Almería | Medimos clientes, no visitas |
| `/diseno-grafico/` | Diseño gráfico y branding en Almería | Una identidad que se reconoce antes de leer el nombre |
| `/soporte/` | Mantenimiento web en Almería | Tu web segura, rápida y vigilada 24/7 desde 39 €/mes |
| `/contacto/` | Pide presupuesto para tu web o tu informática | Respuesta en menos de 24 horas y sin compromiso |

## 6. Sistemas IT

### 6.1 Rutas
- `/informatica-empresas/`: hub con los servicios, Plan 360, cobertura, proceso y FAQ.
- Las 5 páginas de servicio del apartado 5. Todas comparten un componente de plantilla y los datos van en `src/data/servicios-it.ts`.
- `/plan-360/`: página de venta.
- Landings IT por pueblo, **solo en la zona de cobertura**: Vera, Cuevas del Almanzora, Garrucha, Mojácar, Pulpí, Huércal-Overa, Albox, Olula del Río, Turre y Antas. Salen de una ruta dinámica con datos.

### 6.2 Plan 360: contenido
Incluye:
- Web profesional (diseño, hosting, SSL, mantenimiento)
- Hasta 10 puestos + 1 servidor/NAS + la red de la oficina
- Preventivo mensual in situ
- Helpdesk remoto ilimitado en horario laboral
- Visita el mismo día en Levante/Almanzora
- Backup 3-2-1 verificado cada mes
- Antivirus/EDR gestionado y parches
- Inventario e informe mensual
- Asesoría de compras e instalación de equipos nuevos

Condiciones:
- Puesto extra: 25 €/mes.
- Sin permanencia y sin alta.
- Material y licencias aparte.
- **Condición de salida propuesta**: la web es del cliente desde el primer día (dominio y contenidos a su nombre). Al darse de baja se le entrega exportada y deja de incluir hosting y mantenimiento. Así lo de «sin permanencia» es creíble y no hay letra pequeña.

Schema: `Service` + `Offer` (`price` 400, `priceCurrency` EUR, `UnitPriceSpecification` mensual, IVA no incluido) + `FAQPage` + `BreadcrumbList`.

### 6.3 Integración
- **Cabecera**: nuevo enlace «Sistemas IT» (`/informatica-empresas/`). La numeración se reordena.
- **Footer**: columna de servicios con Sistemas IT y Plan 360.
- **Formulario de contacto**: opciones «Sistemas IT» y «Plan 360» en el campo Servicio. Admite `?servicio=` para precargarlo desde los CTAs de los packs.
- **Home**: tarjeta de servicio IT, Plan 360 en la cartelera y un bloque propio.
- **JSON-LD de la home**: `OfferCatalog` con los servicios IT y el Plan 360.

## 7. SEO transversal (va con el rediseño)
- `BaseLayout`: no añade el sufijo `| Platanito Rico` si el título ya contiene la marca. Arregla las 11 páginas duplicadas.
- Títulos ≤60 y descripciones ≤160 en todas las páginas indexables, empezando por las landings de pueblo (Purchena, Adra, La Mojonera, Serón, Tabernas…).
- `robots.txt`: agrupar los `Disallow` bajo su `User-agent`.
- Sitemap: incluir las nuevas rutas IT con prioridad 0.9.
- Enlazado interno: los pueblos con landing web y landing IT se enlazan entre sí.

## 8. Fases de implementación
1. ✅ **Sistema visual + home + vídeo** (tokens, Anton, componentes de cine, hero, cartelera, H1/H2, nav/footer, formulario).
2. ✅ **Sistemas IT**: datos, hub, 5 páginas, `/plan-360/`, landings IT por pueblo, sitemap y schema.
3. ✅ **SEO transversal**: fix de sufijo, títulos/descripciones largos, robots.txt. Límite real del título: 43 caracteres + « | Platanito Rico» (17).
4. **Plantilla única de landings de diseño web por pueblo** (refactor de las 24 páginas a mano).
5. **Servicios, soluciones, blog y Lab IA** con el nuevo sistema visual.

Cada fase termina con `npm run check`, `npm test`, `npm run lint`, `npm run build`, revisión de títulos y H1 sobre `dist/` y capturas desktop y móvil.

## 9. Pendiente de confirmar por el usuario
- Cifras que se contradicen en la home: «200+ proyectos» frente a «50+ webs entregadas». Hay que dar una cifra real.
- La condición de salida del Plan 360 (apartado 6.2).

## 10. Sistema visual v2 «brutal tech» (sustituye a §3)

Base: concepto A «Plano técnico» + ticker del concepto B en Sistemas IT + panel split-flap del concepto C en tarifas (mockups en `.superpowers/brainstorm/*/content/brutal-tech.html`).

- **Paleta** (`--color-plano-*`): papel `#F5F1EA`, papel 2 `#EDE8DE`, tinta `#0E0D0B`, naranja `#FF5A00` (texto AA `#AE3F13`), lima `#D6FF44`, grafito `#6B655E`, cianotipo `#2447E0` (solo cotas y coordenadas).
- **Tipografía**: Bricolage Grotesque variable (titulares y texto) + JetBrains Mono (datos). Sin serif itálica ni palabras sueltas en otro color.
- **Recurso memorable**: la web como juego de láminas técnicas con cajetín de plano.
- **Movimiento**: una sola secuencia de carga en el hero (retícula que se traza → láser que corta el H1 → módulos que aterrizan con sombra dura). El resto responde al usuario (cruceta con coordenadas que sigue al puntero, el dron recupera el color al pasar el ratón) o se activa una vez al entrar en pantalla (tablero de fichas). Todo desactivado con `prefers-reduced-motion`.
- **Componentes**: `src/components/brutal/BlueprintHero.astro` (full/compact), `Tarifas.astro` (tablero split-flap accesible como `<table>` + fichas), `Ticker.astro`. Los bloques de `src/components/it/` mantienen su API y cambian de estilo.
- **Fases v2**: (a) tokens + componentes + home; (b) Sistemas IT y Plan 360; (c) plantilla única de las 24 landings de pueblo con su contenido propio; (d) limpieza de los componentes y tokens «cine» y de la fuente Anton; (e) resto de páginas.
