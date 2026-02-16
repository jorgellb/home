# Platanito Rico - Agent Documentation

Este documento guía a asistentes IA en el trabajo con este proyecto.

## Quick Start

1. **Project Type**: Static site built with Astro + TAIA Core + Tailwind CSS
2. **Performance Target**: 100/100/100/100 Lighthouse
3. **SEO**: Complete with multi-language (es + en)
4. **Accessibility**: WCAG 2.1 AA compliant
5. **Validation**: Zod schemas (strict - build fails on invalid content)
6. **Typography**: Space Grotesk + Bebas Neue (Polyfly style)
7. **Colors**: Polyfly-inspired palette + Platanito Rico brand colors

## Content Structure

### Services (`src/content/services/`)
```yaml
---
id: "diseño-web"
slug: "diseño-web"
title: "Diseño Web a tu Medida"
description: "Webs profesionales que destacan"
shortDescription: "Más presencia y clientes online"
price:
  amount: 450
  currency: "EUR"
  period: "once"
features:
  - "Diseño UI/UX moderno"
  - "Responsive en todos los dispositivos"
  - "Optimizado para SEO"
seo:
  title: "Diseño Web Profesional en Almería"
  description: "Webs modernas y optimizadas para SEO"
  keywords: ["diseño web", "seo", "desarrollo web"]
faq:
  - question: "¿Cuánto tiempo tarda?"
    answer: "1-2 semanas según complejidad"
draft: false
order: 1
lang: "es"
---
```

### Blog Posts (`src/content/posts/`)
```yaml
---
id: "post-1"
slug: "como-mejorar-seo-2024"
title: "Cómo mejorar el SEO en 2024"
excerpt: "Consejos prácticos para optimizar el posicionamiento"
content: "..."
author: "Platanito Rico"
categories: ["SEO", "Marketing"]
tags: ["seo", "marketing digital", "web"]
seo:
  title: "Cómo mejorar el SEO en 2024 | Blog"
  description: "Consejos prácticos para SEO"
publishedAt: "2024-01-15"
draft: false
lang: "es"
---
```

## Validation

All content MUST pass Zod schema validation:

```bash
npm run validate:content
```

Build will FAIL if content is invalid (strict mode).

## Quality Gates

Before any commit or PR, run:

```bash
npm run test:all
```

This runs:
1. Type check
2. ESLint
3. Content validation (Zod)
4. Link checking
5. Build verification
6. Lighthouse CI

## Performance Targets

| Metric | Target | Max Allowable |
|--------|--------|---------------|
| Performance | 95-100 | 95 |
| Accessibility | 100 | 95 |
| Best Practices | 100 | 95 |
| SEO | 100 | 95 |
| LCP | < 0.8s | 2.5s |
| CLS | < 0.05 | 0.1 |
| TBT | < 200ms | 600ms |
| FCP | < 0.6s | 1.8s |

## Typography System

### Primary Font - Space Grotesk
```css
--font-space-grotesk: 'Space Grotesk', sans-serif;
font-family: var(--font-space-grotesk);
```
- Font weights: 200-700 (variable)
- Usage: Body text, UI elements, headings
- Google Fonts: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@200;300;400;500;600;700&display=swap`

### Secondary Font - Bebas Neue
```css
--font-bebas-neue: 'Bebas Neue', sans-serif;
font-family: var(--font-bebas-neue);
```
- Font weight: 400 only
- Usage: Display headings, labels, accent text
- Google Fonts: `https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap`

### Font Sizes
- H1: 72px (4.5rem) / line-height 1
- H2: 60px (3.75rem) / line-height 1
- H3: 48px (3rem) / line-height 1.2
- Body: 16px (1rem) / line-height 1.5
- Small: 14px (0.875rem) / line-height 1.25

## Color Palette (Polyfly-Inspired)

### Primary Colors
```css
--color-background: #FFFBE8;      /* yellow-50 - warm cream */
--color-text: #262626;             /* dark-600 - near black */
--color-cta: #FFF055;              /* yellow-500 - bright yellow */
--color-success: #8AD753;          /* nature-400 - vibrant green */
```

### Card Colors
```css
--color-card-primary: #A3D7FF;     /* blue-300 - light blue */
--color-card-secondary: #D4E6BC;   /* green-200 - soft green */
```

### Brand Colors (Platanito Rico - TO BE PROVIDED)
```css
--color-brand-primary: #3b82f6;     /* Example: Blue */
--color-brand-secondary: #1e40af;   /* Example: Darker blue */
--color-brand-accent: #f59e0b;     /* Example: Orange */
```

## Layout System

### Container Sizes
- Mobile: 100% width
- Tablet (md): max-width 4xl (56rem/896px)
- Desktop (lg): max-width 6xl (72rem/1152px)
- XL (xl): max-width 7xl (80rem/1280px)

### Spacing Patterns
- Gap-2: 0.5rem (8px)
- Gap-4: 1rem (16px) - most common
- Gap-6: 1.5rem (24px)
- Gap-8: 2rem (32px)
- Padding-y: py-4 (1rem) to py-16 (4rem/64px)

### Section Spacing
- Small: py-8 (2rem/32px)
- Medium: py-12 (3rem/48px)
- Large: py-16 (4rem/64px) - most common

## Premium Micro-Interactions

### Arrow Movement
```css
.group:hover .arrow-icon {
  transform: translateX(4px);
}
```

### Scale Effects
```css
.premium-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Button Shadow Animation
```css
.premium-button:hover {
  transform: translate(-0.05em, -0.05em);
  box-shadow: 0.15em 0.15em;
}
```

### Navigation Underline
```css
.nav-link::after {
  transform: translateX(-50%) scaleX(0);
}
.nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}
```

## Components TAIA

- `SeoHead` - Meta tags completos + JSON-LD + Hreflang
- `ResponsiveImage` - Imágenes optimizadas con srcset
- `SmartLink` - Links inteligentes con prefetch
- `SectionShell` - Layout consistente
- `SkipLink` - Navegación de salto
- `FocusOutlines` - Estilos de foco

## Modifying Content

1. Edit markdown files in `src/content/`
2. Zod schemas auto-validate on build
3. Build fails if content doesn't match schema
4. Use existing content files as templates

## Skills del Agente

Use these specialized skills:

- `skill_project_intake` - Recopilar requisitos
- `skill_brand_and_copy` - Marca y mensajería
- `skill_seo_strategy` - Estrategia SEO
- `skill_ux_review` - Auditoría UX y accesibilidad
- `skill_performance_audit` - Pruebas de Lighthouse
- `skill_cms_schema_generator` - Configuración de CMS
- `skill_pr_workflow` - Estándares de Pull Request

## Documentation

- `docs/SEO_RAILS.md` - Guías completas de SEO
- `docs/PERFORMANCE_RAILS.md` - Optimización de rendimiento
- `docs/CONTENT_RAILS.md` - Estructura de contenido
- `docs/TAIA_SYSTEM.md` - Arquitectura del sistema
- `.agent/rules/` - Reglas del repositorio

## Contact

Para preguntas sobre este codebase, refer to:
- Technical Documentation: `docs/`
- Schema Reference: `src/schemas/`
- Component Examples: `src/components/taia/`
- TAIA Core Reference: `vendor/taia-core/`

## Design System

This project uses a premium design system inspired by **Polyfly.com**:
- Typography: Space Grotesk + Bebas Neue
- Colors: Warm cream backgrounds, vibrant yellows, soft greens/blues
- Layout: Moderate whitespace (64px section padding)
- Interactions: Smooth micro-interactions (translateX, scale, shadow animations)
- Components: Rounded corners (pill buttons, rounded-2xl cards)
- Performance: Tailwind CSS optimized for 95-100/100/100 Lighthouse
