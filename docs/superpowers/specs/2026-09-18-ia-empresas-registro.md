# IA para empresas — registro de decisiones

Proyecto: reposicionar el área de IA (hoy `/laboratorio-ia/`) para vender
sistemas de IA generativa a empresas. Trabajo por fases; este fichero solo
guarda las decisiones cerradas, para que ninguna fase contradiga a la anterior.

## Fase 0 — Auditoría (cerrada a falta de confirmar hipótesis)

1. El producto pasa a ser **sistemas de IA que ejecutan trabajo dentro de la
   empresa**; el laboratorio se conserva como **prueba de capacidad**.
2. Eje de posicionamiento: «IA que trabaja dentro de tu empresa», con el matiz
   diferencial del **control humano en el punto de decisión**.
3. Orden de los pilares de mensaje: ejecuta trabajo → dentro de tus sistemas →
   bajo control.
4. La ventaja competitiva que articula la página es la **presencia física** en
   las empresas vía Sistemas IT y Plan 360 (ver el proceso en su sitio).
5. Se conservan: las 12 demos, la infraestructura (OpenRouter con cadena de
   fallback, rate limit, SSE, chatlog, stats, Resend), la instrumentación de
   leads y el sistema visual «centro de mando» con su convención real/demo.
6. Se elimina la afirmación «100 % en tu navegador»: 9 de 12 demos pasan por
   servidor y modelos externos. La página explicará qué corre dónde.
7. CTA primario = **analizar un proceso** (entrada de bajo riesgo). El
   formulario inicial pide solo empresa, persona, contacto y proceso.
8. Ninguna cifra sin fuente; sin caso real se rotula «Ejemplo de aplicación» y
   las estimaciones se identifican como tales.
9. Dirección artística: ingeniería y diagramas de proceso. Prohibido: cerebros,
   partículas, violetas, bento genérico, tarjetas idénticas.
10. Rendimiento y accesibilidad (Lighthouse ≥95, AA, foco visible, reduced
    motion) son requisito del entregable, no un extra.

### Hipótesis abiertas (a confirmar por el cliente)

- H1: no hay proyectos de IA entregados que se puedan citar con nombre.
- H2: falta `OPENROUTER_API_KEY` en producción; las demos con modelo no responden.
- H3: no hay DPA firmados con proveedores de modelos ni inferencia propia.
- H4: el objetivo es proyecto + cuota recurrente (AI Ops).

## Decisiones del cliente (18-09-2026)

11. El laboratorio se queda con **cuatro demos**: probador virtual AR
    (protagonista), ficha de producto desde foto, agente por chat y agente por
    voz. El resto de páginas de demo (`/vera-ai/`, `/estudio-marca/`,
    `/rayos-x/`, `/maquina-tiempo/`, `/configurador-3d/`, `/sonido-marca/`) se
    eliminan **a la vez que se lanza la página nueva**, con 301 a la página
    temática más cercana.
12. Mapa Neuronal y Estrategia de Marketing **se quedan** donde están, dentro
    de `/soluciones/empresa/` y `/marketing/`: no son páginas de demo.
13. No se inventan proyectos entregados ni clientes. Mientras no haya casos
    reales, la prueba son: las demos funcionando, la infraestructura propia y
    ejemplos rotulados como «Ejemplo de aplicación».

## Spike del probador AR (18-09-2026)

Pregunta: ¿puede el probador quedar a la altura del protagonismo que se le
quiere dar? **Sí, pero cambiando el núcleo de render, no ajustando números.**

Diagnóstico del código actual (`src/components/ar/VirtualTryOn.tsx`):

- Cámara **ortográfica en píxeles**: sin perspectiva, cualquier modelo rígido
  se lee como pegatina.
- Posición por puntos 2D (ojos, ceja) y escala por distancia entre ojos: el
  accesorio no tiene tamaño físico ni se apoya en el cráneo, que no se estima.
- Oclusor = esfera aproximada, y el accesorio se **empuja delante** de ella
  (`OCC_FORWARD`): por diseño, nada puede quedar detrás de la cabeza. De ahí
  que las patillas no entren en la oreja.
- La matriz 4×4 de MediaPipe ya se pide y solo se usa para sacar dos ángulos.

Lo que se validó en el spike (`src/pages/ar-spike.astro`, desechable):

1. `PerspectiveCamera` (fov 63°) + la matriz facial aplicada a un nodo cabeza
   en centímetros: la malla canónica cae **exactamente** sobre la cara real.
2. Oclusión con la **malla canónica indexada** (vértice i = landmark i; hay que
   parsear el OBJ a mano porque OBJLoader la desindexa) más un **cráneo
   elipsoidal** estimado desde las sienes: las patillas se meten detrás de la
   cara y el sombrero se apoya y se recorta contra la cabeza.
3. Colocación por **anclaje de caja** (cara frontal de la montura sobre el
   puente nasal; borde inferior del sombrero hundido en el cráneo), no por
   centro geométrico.

Pendiente para producción: metadatos por modelo (tamaño real y punto de
anclaje), modelos de sombrero/gorra decentes y comprimidos (hoy 5,4 MB y
4 MB), filtro temporal tipo One Euro en vídeo en lugar de `lerp`, y opcional
segmentación de pelo. El spike debe borrarse antes de fusionar.
