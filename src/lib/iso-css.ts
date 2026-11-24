/* CSS de animación de las ilustraciones. Va DENTRO de cada SVG independiente
   (src/pages/iso/), así las escenas se sirven como imagen cacheable y diferida
   sin depender del CSS de la página. Solo transform, opacity y offset-distance. */

export const ISO_CSS = String.raw`/* ── Ilustración isométrica ────────────────────────────────────────
   Solo transform, opacity y offset-distance: compuestas en GPU, sin layout
   ni paint. Cada grupo admite --retraso y --dur desde el SVG. */

.iso {
  overflow: visible;
}
.iso g[class^='iso-'],
.iso .iso-onda {
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
.iso-paquete {
  offset-rotate: 0deg;
  offset-distance: 0%;
}

@media (prefers-reduced-motion: no-preference) {
  .iso-flota {
    animation: iso-flota var(--dur, 6s) ease-in-out infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-sube {
    animation: iso-sube 1.1s cubic-bezier(0.2, 0.9, 0.3, 1.25) both;
    animation-delay: calc(var(--retraso, 0s) + 0.2s);
  }
  .iso-crece {
    animation: iso-crece var(--dur, 4s) cubic-bezier(0.5, 0, 0.3, 1) infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-pulso {
    transform-origin: 50% 50%;
    animation: iso-pulso var(--dur, 2.8s) ease-in-out infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-parpadeo {
    animation: iso-parpadeo var(--dur, 1.6s) steps(2, jump-none) infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-balanceo {
    animation: iso-balanceo var(--dur, 7s) ease-in-out infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-gira {
    transform-origin: 50% 50%;
    animation: iso-gira var(--dur, 0.6s) linear infinite;
  }
  .iso-desplaza {
    animation: iso-desplaza var(--dur, 9s) cubic-bezier(0.6, 0, 0.3, 1) infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-aparece {
    transform-origin: 50% 100%;
    animation: iso-aparece var(--dur, 6s) cubic-bezier(0.2, 0.9, 0.3, 1.3) infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-ola {
    animation: iso-ola var(--dur, 5s) ease-in-out infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-traza {
    stroke-dasharray: 6 8;
    animation: iso-traza 1.2s linear infinite;
  }
  .iso-onda {
    transform-origin: 50% 50%;
    animation: iso-onda 2.4s ease-out infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-paquete {
    animation-name: iso-paquete;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  
}
@media (prefers-reduced-motion: reduce) {
  .iso-paquete,
  .iso-onda {
    display: none;
  }
}

@keyframes iso-flota {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-9px);
  }
}
@keyframes iso-sube {
  from {
    transform: scaleY(0.2);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}
@keyframes iso-crece {
  0%,
  12% {
    transform: scaleY(0.35);
  }
  45%,
  85% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.35);
  }
}
@keyframes iso-pulso {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.75;
  }
}
@keyframes iso-parpadeo {
  50% {
    opacity: 0.25;
  }
}
@keyframes iso-balanceo {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(2.5deg);
  }
}
@keyframes iso-gira {
  to {
    transform: rotate(360deg);
  }
}
@keyframes iso-desplaza {
  0%,
  18% {
    transform: translateY(0);
  }
  45%,
  68% {
    transform: translateY(-34%);
  }
  92%,
  100% {
    transform: translateY(0);
  }
}
@keyframes iso-aparece {
  0%,
  8% {
    transform: scale(0.4) translateY(6px);
    opacity: 0;
  }
  16%,
  70% {
    transform: none;
    opacity: 1;
  }
  80%,
  100% {
    transform: translateY(-6px);
    opacity: 0;
  }
}
@keyframes iso-ola {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(8px);
  }
}
@keyframes iso-traza {
  to {
    stroke-dashoffset: -28;
  }
}
@keyframes iso-onda {
  from {
    transform: scale(0.3);
    opacity: 0.9;
  }
  to {
    transform: scale(1.6);
    opacity: 0;
  }
}
@keyframes iso-paquete {
  from {
    offset-distance: 0%;
  }
  to {
    offset-distance: 100%;
  }
}


.iso-viaja {
  transform-box: view-box !important;
  transform-origin: 0 0 !important;
  offset-rotate: 0deg;
}
@media (prefers-reduced-motion: no-preference) {
  .iso-viaja {
    animation: iso-paquete var(--dur, 12s) linear infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-deriva {
    animation: iso-deriva var(--dur, 30s) linear infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-salta {
    transform-origin: 50% 100%;
    animation: iso-salta var(--dur, 4s) cubic-bezier(0.3, 0, 0.3, 1) infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-latido {
    transform-origin: 50% 50%;
    animation: iso-latido var(--dur, 3s) ease-in-out infinite;
    animation-delay: var(--retraso, 0s);
  }
  .iso-traza-lenta {
    stroke-dasharray: 4 10;
    animation: iso-traza 2.4s linear infinite;
  }
}
@media (prefers-reduced-motion: reduce) {
  .iso-viaja {
    offset-distance: 30%;
  }
}
@keyframes iso-deriva {
  from { transform: translate(-60px, 0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  to { transform: translate(60px, 0); opacity: 0; }
}
@keyframes iso-salta {
  0%, 60%, 100% { transform: translateY(0) scale(1); }
  70% { transform: translateY(-14px) scale(1.06); }
  80% { transform: translateY(0) scale(0.97, 1.03); }
}
@keyframes iso-latido {
  0%, 100% { transform: scale(1); opacity: .9; }
  50% { transform: scale(1.25); opacity: .5; }
}
`;
