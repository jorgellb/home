---
title: "Tecnologías JavaScript para Realidad Aumentada (AR) en la Web"
slug: "tecnologias-javascript-ar-web"
excerpt: "Three.js, WebXR, React Three Fiber, AR.js, Babylon.js y TensorFlow.js. La guía definitiva de las tecnologías JavaScript para construir experiencias de realidad aumentada directamente en el navegador — sin apps nativas, sin fricción y con el stack recomendado para 2026."
seo:
  title: "Tecnologías JavaScript para AR en la Web (2026)"
  description: "Guía de tecnologías JavaScript para realidad aumentada: Three.js, WebXR, AR.js, Babylon.js y TensorFlow.js. Comparativa y stack recomendado 2026."
  keywords:
    [
      "tecnologías JavaScript AR",
      "realidad aumentada web",
      "WebXR",
      "Three.js AR",
      "AR.js",
      "React Three Fiber",
      "Babylon.js",
      "TensorFlow.js AR",
      "AR en el navegador",
    ]
categories: ["Tecnología", "Desarrollo Web", "Estrategia Digital"]
tags:
  [
    "Realidad Aumentada",
    "WebXR",
    "Three.js",
    "AR.js",
    "React Three Fiber",
    "Babylon.js",
    "TensorFlow.js",
    "JavaScript",
    "WebGL",
  ]
author: "Platanito Rico"
draft: false
publishedAt: "2026-05-28"
lang: "es"
featuredImage: "/imagenes/tecnologias-javascript-ar-web.jpg"
featuredImageAlt: "Tecnologías JavaScript para construir aplicaciones de realidad aumentada en la web"
readingTime: 14
---

<style>
/* ════════ AR POST · maquetación brutalista (namespace .arp-) ════════ */
.article-body :where(.arp-root, .arp-stats, .arp-why, .arp-tech, .arp-matrix, .arp-comp, .arp-stack, .arp-callout) { font-family: var(--font-display, sans-serif); }
.arp-eyebrow {
  display:inline-flex; align-items:center; gap:.5rem;
  font-family: var(--font-mono, monospace); font-size:.66rem; font-weight:800;
  letter-spacing:.22em; text-transform:uppercase; color: var(--brutal-accent-ink, #AE3F13);
  margin: 2.5rem 0 .25rem;
}
.arp-eyebrow::before { content:'★'; }

/* —— Banda de estadísticas (oscura, rejilla neón) —— */
.arp-stats {
  margin: 2rem 0 2.5rem; padding: 1.75rem 1.5rem;
  background: #0B0E14; color: #FFFCF6;
  border: 2.5px solid var(--brutal-ink, #0E0D0B);
  box-shadow: 7px 7px 0 var(--brutal-ink, #0E0D0B);
  position: relative; overflow: hidden;
  display:grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem 1rem;
}
@media (min-width:560px){ .arp-stats{ grid-template-columns: repeat(4,1fr); } }
.arp-stats::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background-image: linear-gradient(#00E5FF22 1px, transparent 1px), linear-gradient(90deg,#00E5FF22 1px, transparent 1px);
  background-size: 22px 22px; mask-image: radial-gradient(circle at 80% 0%, #000 0%, transparent 70%);
}
.arp-stat { position:relative; z-index:1; }
.arp-stat b { display:block; font-size: clamp(1.7rem,5vw,2.4rem); font-weight:800; line-height:1; letter-spacing:-.03em; color:#D6FF44; }
.arp-stat span { display:block; margin-top:.35rem; font-family:var(--font-mono,monospace); font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; color:#9fb0c0; }

/* —— Grid de beneficios —— */
.arp-why { list-style:none; padding:0; margin:1.5rem 0 2rem; display:grid; grid-template-columns:1fr; gap: .9rem; }
@media (min-width:560px){ .arp-why{ grid-template-columns: 1fr 1fr; } }
.arp-why li {
  display:grid; grid-template-columns: 42px 1fr; gap:.85rem; align-items:start;
  background: var(--brutal-card, #FFF); border:2px solid var(--brutal-ink,#0E0D0B);
  box-shadow: 4px 4px 0 var(--brutal-ink,#0E0D0B); padding: .95rem 1rem;
}
.arp-why svg { width:42px; height:42px; color: var(--brutal-accent-ink,#AE3F13); }
.arp-why b { font-size:.95rem; font-weight:800; letter-spacing:-.01em; }
.arp-why p { margin:.15rem 0 0; font-size:.82rem; line-height:1.4; color: var(--brutal-text-secondary,#4a453f); font-family:var(--font-display,sans-serif); }

/* —— Tarjeta de tecnología —— */
.arp-tech {
  --c: #00B8D9;
  position: relative; margin: 1.25rem 0; padding: 1.4rem 1.4rem 1.3rem;
  background: var(--brutal-card,#FFF); color: var(--brutal-ink,#0E0D0B);
  border: 2.5px solid var(--brutal-ink,#0E0D0B); box-shadow: 6px 6px 0 var(--brutal-ink,#0E0D0B);
  overflow:hidden;
}
.arp-tech::before { content:''; position:absolute; top:0; left:0; right:0; height:6px; background:var(--c); }
.arp-tech__head { display:flex; align-items:center; gap:1rem; }
.arp-tech__emblem {
  width:60px; height:60px; flex:none; display:inline-flex; align-items:center; justify-content:center;
  background:#0B0E14; border:2.5px solid var(--brutal-ink,#0E0D0B); color:var(--c);
}
.arp-tech__emblem svg { width:38px; height:38px; }
.arp-tech__ttl { margin:0; font-size:1.3rem; font-weight:800; letter-spacing:-.02em; line-height:1; }
.arp-tech__role { display:block; margin-top:.3rem; font-family:var(--font-mono,monospace); font-size:.58rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:var(--c); }
.arp-tech__c { font-size:.5rem; }
.arp-tech p { margin:.9rem 0 0; font-size:.88rem; line-height:1.55; font-family:var(--font-display,sans-serif); color: var(--brutal-text-secondary,#4a453f); }
.arp-tech ul { list-style:none; padding:0; margin:.85rem 0 0; display:grid; gap:.45rem; }
.arp-tech ul li { display:grid; grid-template-columns:16px 1fr; gap:.5rem; font-size:.82rem; line-height:1.35; align-items:start; }
.arp-tech ul li svg { width:16px; height:16px; margin-top:.12rem; color:var(--c); flex:none; }
.arp-tech__chips { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:1rem; }
.arp-tech__chips span {
  font-family:var(--font-mono,monospace); font-size:.58rem; font-weight:700; letter-spacing:.06em;
  padding:.28rem .5rem; border:1.5px solid var(--brutal-ink,#0E0D0B); background: var(--brutal-bg-alt,#F0E9D7);
}

/* —— Matriz comparativa —— */
.arp-matrix { margin:1.5rem 0; border:2.5px solid var(--brutal-ink,#0E0D0B); box-shadow:6px 6px 0 var(--brutal-ink,#0E0D0B); overflow-x:auto; }
.arp-matrix table { width:100%; border-collapse:collapse; min-width:540px; font-family:var(--font-display,sans-serif); }
.arp-matrix th, .arp-matrix td { padding:.7rem .8rem; text-align:left; border-bottom:1.5px solid rgba(14,13,11,.12); border-right:1.5px solid rgba(14,13,11,.12); font-size:.8rem; }
.arp-matrix thead th { background: var(--brutal-ink,#0E0D0B); color:#D6FF44; font-family:var(--font-mono,monospace); font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; }
.arp-matrix tbody th { font-weight:800; background: var(--brutal-bg-alt,#F0E9D7); }
.arp-matrix tbody tr:hover td { background: #D6FF4422; }
.arp-matrix td:last-child, .arp-matrix th:last-child { border-right:0; }
.arp-yes { color:#0A8F4A; font-weight:800; }
.arp-no  { color:#C0392B; font-weight:800; }

/* —— Tecnologías complementarias —— */
.arp-comp { list-style:none; padding:0; margin:1.5rem 0; display:grid; grid-template-columns:1fr; gap:1px; background:var(--brutal-ink,#0E0D0B); border:2.5px solid var(--brutal-ink,#0E0D0B); }
@media (min-width:560px){ .arp-comp{ grid-template-columns:1fr 1fr; } }
.arp-comp li { background:var(--brutal-card,#FFF); padding:.85rem 1rem; display:flex; align-items:baseline; gap:.6rem; }
.arp-comp b { font-family:var(--font-mono,monospace); font-size:.85rem; min-width:84px; color:var(--brutal-ink,#0E0D0B); }
.arp-comp span { font-size:.8rem; color: var(--brutal-text-secondary,#4a453f); font-family:var(--font-display,sans-serif); }

/* —— Stack recomendado (capas) —— */
.arp-stack {
  margin:1.75rem 0; padding:1.75rem 1.4rem; background:#0B0E14; color:#FFFCF6;
  border:2.5px solid var(--brutal-ink,#0E0D0B); box-shadow:7px 7px 0 var(--brutal-ink,#0E0D0B);
}
.arp-stack__h { font-family:var(--font-mono,monospace); font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; color:#9fb0c0; margin:0 0 1rem; }
.arp-layer {
  display:flex; align-items:center; gap:.8rem; margin:.5rem 0; padding:.7rem .9rem;
  border:2px solid; background:#11161f;
}
.arp-layer b { font-size:.95rem; font-weight:800; letter-spacing:-.01em; }
.arp-layer small { display:block; font-family:var(--font-mono,monospace); font-size:.56rem; letter-spacing:.08em; text-transform:uppercase; opacity:.7; margin-top:.1rem; }
.arp-layer span { margin-left:auto; font-family:var(--font-mono,monospace); font-size:.62rem; padding:.2rem .45rem; border:1.5px solid currentColor; white-space:nowrap; }

/* —— Callout —— */
.arp-callout {
  margin:1.75rem 0; padding:1.25rem 1.35rem; background:var(--brutal-lime,#D6FF44); color:var(--brutal-ink,#0E0D0B);
  border:2.5px solid var(--brutal-ink,#0E0D0B); box-shadow:5px 5px 0 var(--brutal-ink,#0E0D0B);
}
.arp-callout b { display:block; font-size:1.05rem; font-weight:800; margin-bottom:.3rem; }
.arp-callout p { margin:0; font-size:.9rem; line-height:1.5; font-family:var(--font-display,sans-serif); }
</style>

La realidad aumentada ha dejado de ser ciencia ficción. Lo que hace una década requería hardware caro y aplicaciones nativas pesadas, hoy se ejecuta **directamente en el navegador** del móvil que ya llevas en el bolsillo. ¿La clave de ese salto? **JavaScript y las tecnologías web modernas**, que han reducido drásticamente los costes de desarrollo, mejorado la accesibilidad y abierto la puerta a que cualquier negocio ofrezca experiencias inmersivas sin pedirle al usuario que se instale nada.

En esta guía analizamos —con criterio y sin humo— las **principales tecnologías JavaScript para construir aplicaciones y utilidades de realidad aumentada**, cuándo conviene cada una y cuál es el stack que recomendamos para proyectos de 2026.

<div class="arp-stats">
  <div class="arp-stat"><b>0</b><span>Apps que instalar</span></div>
  <div class="arp-stat"><b>100%</b><span>En el navegador</span></div>
  <div class="arp-stat"><b>7</b><span>Tecnologías clave</span></div>
  <div class="arp-stat"><b>2026</b><span>Stack recomendado</span></div>
</div>

<span class="arp-eyebrow">El contexto</span>

## ¿Por qué utilizar JavaScript para proyectos AR?

JavaScript se ha convertido en uno de los lenguajes más utilizados para crear experiencias inmersivas, y no por moda, sino por razones de negocio muy concretas. La **AR web** (también llamada *WebAR*) elimina la mayor barrera de adopción que existe: la descarga. El usuario abre un enlace y la experiencia arranca.

<ul class="arp-why">
  <li>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>
    <div><b>Multiplataforma</b><p>Una sola base de código que funciona en iOS, Android y escritorio. Sin duplicar equipos ni presupuestos.</p></div>
  </li>
  <li>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
    <div><b>Desarrollo más rápido</b><p>Iteración ágil frente al ciclo de las apps nativas. Prototipos en días, no en meses.</p></div>
  </li>
  <li>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7H6a3 3 0 000 6h3M15 7h3a3 3 0 010 6h-3M8 10h8"/></svg>
    <div><b>APIs web modernas</b><p>Integración directa con cámara, sensores, geolocalización, pagos y todo el ecosistema del navegador.</p></div>
  </li>
  <li>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="1.5"/><path d="M3 8h18M7 21h10"/></svg>
    <div><b>Cero instalación</b><p>La experiencia AR se ejecuta desde un enlace. Menos fricción = más conversión.</p></div>
  </li>
  <li>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/><circle cx="12" cy="12" r="3"/></svg>
    <div><b>Ecosistema enorme</b><p>Miles de librerías, frameworks y ejemplos. Comunidad gigantesca y soluciones probadas.</p></div>
  </li>
</ul>

<span class="arp-eyebrow">Las 7 tecnologías clave</span>

## El arsenal: motores, estándares y frameworks

No existe «la mejor» tecnología de AR web: existe **la adecuada para tu proyecto**. Estas son las siete piezas que dominan el panorama, desde el motor gráfico de bajo nivel hasta los frameworks de alto nivel y la capa de inteligencia artificial.

<article class="arp-tech" style="--c:#2BB0A8">
  <div class="arp-tech__head">
    <span class="arp-tech__emblem"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M24 6L42 38H6L24 6z"/><path d="M24 6v32M24 38L6 38M24 38l18 0M24 22l-9 16M24 22l9 16M24 22L6 38M24 22l18 16"/></svg></span>
    <div><h3 class="arp-tech__ttl">Three.js</h3><span class="arp-tech__role">Motor gráfico 3D · WebGL</span></div>
  </div>
  <p>El estándar de facto para gráficos 3D en el navegador y el motor sobre el que se construyen multitud de experiencias AR. Renderiza modelos complejos, animaciones fluidas e iluminación avanzada, e integra objetos virtuales sobre el mundo real.</p>
  <ul>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Renderizado de modelos 3D y materiales PBR</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Animaciones e iluminación dinámica</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Compatible con WebGL y WebXR</li>
  </ul>
  <div class="arp-tech__chips"><span>Gran comunidad</span><span>Docs excelentes</span><span>Miles de ejemplos</span></div>
</article>

<article class="arp-tech" style="--c:#00B8D9">
  <div class="arp-tech__head">
    <span class="arp-tech__emblem"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20a4 4 0 014-4h28a4 4 0 014 4v6a4 4 0 01-4 4h-8l-4 4-4-4h-8a4 4 0 01-4-4v-6z"/><circle cx="17" cy="23" r="3"/><circle cx="31" cy="23" r="3"/></svg></span>
    <div><h3 class="arp-tech__ttl">WebXR</h3><span class="arp-tech__role">El estándar AR/VR del navegador</span></div>
  </div>
  <p>La API oficial del navegador para acceder a realidad aumentada y virtual. No es un motor gráfico: es el puente entre tu web y los sensores del dispositivo. Detecta superficies, ancla objetos en el espacio real y accede al seguimiento de movimiento sin apps nativas.</p>
  <ul>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Detección de superficies (hit-test)</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Posicionamiento espacial y anclajes</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Seguimiento de movimiento en tiempo real</li>
  </ul>
  <div class="arp-tech__chips"><span>Estándar W3C</span><span>Sin apps</span><span>AR + VR</span></div>
</article>

<article class="arp-tech" style="--c:#61DAFB">
  <div class="arp-tech__head">
    <span class="arp-tech__emblem"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="24" cy="24" r="3.5"/><ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/></svg></span>
    <div><h3 class="arp-tech__ttl">React Three Fiber</h3><span class="arp-tech__role">Three.js, pero con React</span></div>
  </div>
  <p>Combina la potencia de Three.js con el modelo declarativo de React. Es la elección natural para aplicaciones empresariales y productos SaaS que necesitan interfaces complejas, componentes reutilizables y gestión de estado avanzada junto a la escena 3D.</p>
  <ul>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Componentes 3D reutilizables y declarativos</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Integración con el ecosistema React</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Gestión de estado y APIs externas</li>
  </ul>
  <div class="arp-tech__chips"><span>Visualizadores de producto</span><span>Configuradores 3D</span><span>Simuladores</span></div>
</article>

<article class="arp-tech" style="--c:#EF2D5E">
  <div class="arp-tech__head">
    <span class="arp-tech__emblem"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14l-8 10 8 10M32 14l8 10-8 10"/><path d="M27 12l-6 24"/></svg></span>
    <div><h3 class="arp-tech__ttl">A-Frame</h3><span class="arp-tech__role">AR declarativa con sintaxis HTML</span></div>
  </div>
  <p>La opción perfecta para equipos que quieren resultados rápidos. Su sintaxis basada en etiquetas HTML reduce drásticamente la curva de aprendizaje: puedes montar una escena AR con unas pocas líneas, ideal para prototipos, educación y pruebas de concepto.</p>
  <ul>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Curva de aprendizaje muy reducida</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Prototipado rápido sobre WebXR</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Ecosistema de componentes listos</li>
  </ul>
  <div class="arp-tech__chips"><span>Educativo</span><span>Demostraciones</span><span>Pruebas de concepto</span></div>
</article>

<article class="arp-tech" style="--c:#FF6B35">
  <div class="arp-tech__head">
    <span class="arp-tech__emblem"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16V12a2 2 0 012-2h4M32 10h4a2 2 0 012 2v4M38 32v4a2 2 0 01-2 2h-4M16 38h-4a2 2 0 01-2-2v-4"/><rect x="19" y="19" width="10" height="10"/></svg></span>
    <div><h3 class="arp-tech__ttl">AR.js</h3><span class="arp-tech__role">AR por marcadores, ultraligera</span></div>
  </div>
  <p>Una de las soluciones más populares para AR basada en marcadores e imágenes. Su gran virtud es el peso: implementaciones ligerísimas que funcionan en móviles modestos, perfectas cuando la prioridad es el alcance y la velocidad de carga.</p>
  <ul>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Reconocimiento de imágenes y marcadores</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Accesible desde cualquier móvil</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Implementaciones ligeras y rápidas</li>
  </ul>
  <div class="arp-tech__chips"><span>Catálogos interactivos</span><span>Tarjetas inteligentes</span><span>Folletos aumentados</span></div>
</article>

<article class="arp-tech" style="--c:#BB4AE0">
  <div class="arp-tech__head">
    <span class="arp-tech__emblem"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="24" cy="24" r="13"/><ellipse cx="24" cy="24" rx="20" ry="7" transform="rotate(-25 24 24)"/><circle cx="40" cy="17" r="2.5" fill="currentColor" stroke="none"/></svg></span>
    <div><h3 class="arp-tech__ttl">Babylon.js</h3><span class="arp-tech__role">Motor 3D con baterías incluidas</span></div>
  </div>
  <p>La gran alternativa a Three.js. Donde Three.js es minimalista, Babylon.js viene «todo incluido»: sistema de físicas avanzado, editor visual, herramientas integradas y un rendimiento excelente. Muy atractivo para proyectos empresariales y simuladores complejos.</p>
  <ul>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Motor de físicas integrado</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Editor visual y herramientas propias</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Rendimiento de nivel producción</li>
  </ul>
  <div class="arp-tech__chips"><span>Proyectos empresariales</span><span>Simuladores</span><span>Físicas realistas</span></div>
</article>

<article class="arp-tech" style="--c:#FF9A1F">
  <div class="arp-tech__head">
    <span class="arp-tech__emblem"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10" cy="14" r="3"/><circle cx="10" cy="34" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="38" cy="14" r="3"/><circle cx="38" cy="34" r="3"/><path d="M13 14l8 8M13 34l8-8M27 24l8-8M27 24l8 8"/></svg></span>
    <div><h3 class="arp-tech__ttl">TensorFlow.js</h3><span class="arp-tech__role">La capa de IA para AR inteligente</span></div>
  </div>
  <p>Añade inteligencia artificial directamente en el navegador. Es lo que convierte una experiencia AR «decorativa» en una verdaderamente inteligente: reconocimiento facial, detección de objetos, seguimiento corporal y clasificación de imágenes en tiempo real, sin enviar datos a un servidor.</p>
  <ul>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Reconocimiento facial y de objetos</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Seguimiento corporal en tiempo real</li>
    <li><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l3.5 3.5L14 4"/></svg>Inferencia en el dispositivo (privacidad)</li>
  </ul>
  <div class="arp-tech__chips"><span>Salud</span><span>Comercio</span><span>Formación</span></div>
</article>

<span class="arp-eyebrow">De un vistazo</span>

## Comparativa: qué elegir y cuándo

Para decidir rápido, esta es la radiografía de las herramientas según su naturaleza, dificultad y caso de uso ideal:

<div class="arp-matrix">
<table>
<thead>
<tr><th>Tecnología</th><th>Tipo</th><th>Curva</th><th>WebXR</th><th>Ideal para</th></tr>
</thead>
<tbody>
<tr><th>Three.js</th><td>Motor 3D</td><td>Media</td><td class="arp-yes">Sí</td><td>Base de casi cualquier experiencia 3D/AR</td></tr>
<tr><th>WebXR</th><td>API estándar</td><td>Media</td><td class="arp-yes">Nativo</td><td>Anclaje espacial real en el navegador</td></tr>
<tr><th>R3F</th><td>Framework</td><td>Media-alta</td><td class="arp-yes">Sí</td><td>Apps y SaaS con React</td></tr>
<tr><th>A-Frame</th><td>Framework</td><td>Baja</td><td class="arp-yes">Sí</td><td>Prototipos y educación</td></tr>
<tr><th>AR.js</th><td>Librería</td><td>Baja</td><td class="arp-no">Parcial</td><td>AR por marcadores, máximo alcance</td></tr>
<tr><th>Babylon.js</th><td>Motor 3D</td><td>Media</td><td class="arp-yes">Sí</td><td>Simuladores y físicas avanzadas</td></tr>
<tr><th>TensorFlow.js</th><td>IA / ML</td><td>Alta</td><td class="arp-no">N/A</td><td>Visión por computador en AR</td></tr>
</tbody>
</table>
</div>

<div class="arp-callout">
  <b>Regla práctica</b>
  <p>Si necesitas <strong>anclar objetos en el mundo real</strong>, parte de WebXR + Three.js. Si buscas <strong>velocidad y alcance</strong> con marcadores, AR.js. Si construyes un <strong>producto serio con interfaz</strong>, React Three Fiber. Y si quieres que la AR <strong>entienda lo que ve</strong>, suma TensorFlow.js.</p>
</div>

<span class="arp-eyebrow">El equipo de apoyo</span>

## Tecnologías complementarias

Una experiencia AR profesional rara vez vive sola: se apoya en un ecosistema de herramientas que aportan interfaz, escalabilidad, seguridad y datos.

<ul class="arp-comp">
  <li><b>React</b><span>Interfaces de usuario</span></li>
  <li><b>Next.js</b><span>Aplicaciones web escalables</span></li>
  <li><b>TypeScript</b><span>Código más seguro y mantenible</span></li>
  <li><b>Vite</b><span>Desarrollo y compilación rápida</span></li>
  <li><b>Node.js</b><span>Backend y APIs</span></li>
  <li><b>WebRTC</b><span>Vídeo en tiempo real</span></li>
  <li><b>OpenCV.js</b><span>Visión artificial</span></li>
  <li><b>WebGPU</b><span>Gráficos de nueva generación</span></li>
</ul>

<span class="arp-eyebrow">La receta</span>

## Stack recomendado para 2026

Para la mayoría de proyectos de realidad aumentada modernos, esta combinación ofrece el mejor equilibrio entre potencia, mantenibilidad y experiencia de desarrollo. De la base al acabado:

<div class="arp-stack">
  <p class="arp-stack__h">// stack-ar.config — de la cámara a la interfaz</p>
  <div class="arp-layer" style="border-color:#FF9A1F;color:#FF9A1F"><div><b>TensorFlow.js</b><small>Capa de IA · opcional</small></div><span>Visión</span></div>
  <div class="arp-layer" style="border-color:#00B8D9;color:#00B8D9"><div><b>WebXR</b><small>Anclaje y sensores</small></div><span>Espacial</span></div>
  <div class="arp-layer" style="border-color:#2BB0A8;color:#2BB0A8"><div><b>Three.js</b><small>Motor gráfico</small></div><span>Render</span></div>
  <div class="arp-layer" style="border-color:#61DAFB;color:#61DAFB"><div><b>React Three Fiber</b><small>Escena declarativa</small></div><span>3D + UI</span></div>
  <div class="arp-layer" style="border-color:#FFFFFF;color:#FFFFFF"><div><b>React + TypeScript</b><small>Interfaz y seguridad de tipos</small></div><span>App</span></div>
  <div class="arp-layer" style="border-color:#D6FF44;color:#D6FF44"><div><b>Node.js</b><small>Backend y APIs</small></div><span>Datos</span></div>
</div>

Con este stack puedes desarrollar desde **configuradores de producto** y **probadores virtuales** hasta **aplicaciones industriales** con seguimiento espacial y reconocimiento de objetos. Es flexible: si tu proyecto no necesita IA, prescindes de TensorFlow.js; si es un prototipo, puedes sustituir React Three Fiber por A-Frame y salir a producción en una fracción del tiempo.

<span class="arp-eyebrow">Cierre</span>

## Conclusión

El ecosistema JavaScript ofrece hoy herramientas extraordinariamente potentes para construir realidad aumentada. **Three.js, WebXR, React Three Fiber y AR.js** permiten crear experiencias inmersivas accesibles desde cualquier navegador moderno, reduciendo costes y acelerando el lanzamiento. La AR ya no es un experimento de laboratorio: es un canal real de **conversión, formación y diferenciación** para las empresas que se atreven a usarlo bien.

A medida que crecen los dispositivos compatibles y madura WebXR, dominar estas tecnologías se convierte en una ventaja competitiva tangible. En **Platanito Rico** diseñamos y desarrollamos experiencias web a medida —incluidas las inmersivas— pensadas para que tu negocio destaque. Si tienes una idea de AR entre manos, hablemos: la traducimos en algo que tus clientes puedan tocar (casi) con las manos.
