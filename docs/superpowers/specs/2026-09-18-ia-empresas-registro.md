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
