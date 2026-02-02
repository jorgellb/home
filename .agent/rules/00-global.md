# Platanito Rico - Global Rules

## Code Standards

### Style
- **StandardJS**: No semicolons, 2 spaces indentation, single quotes
- **Tailwind CSS**: Use utility classes, avoid custom CSS when possible
- **TypeScript**: Strict mode, explicit types for exports
- **Language**: All code, comments, and variables in English
- **Naming**: camelCase for variables/functions, PascalCase for components/types

### File Organization
```
src/
├── components/          # Reusable UI components
│   ├── taia/           # TAIA Core components
│   ├── ui/             # UI components (buttons, cards)
│   ├── sections/        # Page sections (hero, services, etc.)
│   ├── layout/          # Layouts (header, footer)
│   └── video/          # Video components (youtube, vimeo, instagram)
├── layouts/             # Page layouts
│   ├── BaseLayout.astro  # Base HTML layout
│   ├── PageLayout.astro  # Page layout
│   └── CollectionLayout.astro  # Collection/list layout
├── schemas/             # Zod validation schemas
├── pages/               # Astro pages
├── styles/              # CSS files
│   ├── global.css       # Tailwind imports + custom styles
│   ├── critical.css     # Critical CSS (inline in HTML)
│   ├── animations.css   # GSAP animations
│   └── premium-interactions.css  # Premium micro-interactions
├── scripts/             # CLI tools (validate, link-checker, lighthouse)
└── content/             # Content collections (services, testimonials, posts, pricing)
```

### Commit Messages
Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code change
- `test`: Tests
- `chore`: Maintenance

Examples:
- `feat(seo): add hreflang support`
- `fix(service): correct price validation`
- `docs(readme): update installation`
- `style(tailwind): fix indentation`
- `refactor(layout): simplify structure`
- `test(schemas): add validation tests`
- `chore(deps): update tailwindcss`

## Quality Gates

All changes must pass:
```bash
npm run test:all
```

This runs:
1. `npm run check` - Type check
2. `npm run lint` - ESLint
3. `npm run validate:content` - Zod content validation
4. `npm run check:links` - Link checker
5. `npm run build` - Build verification
6. `npm run lighthouse` - Lighthouse CI

## Pull Request Policy

1. **Never push directly to main**
2. Create feature branch from main
3. Open PR with description and checklist
4. Wait for CI checks to pass
5. Request review for significant changes

PR must:
- Pass all quality gates
- Maintain 95-100/100/100 Lighthouse scores
- Follow accessibility guidelines (WCAG 2.1 AA)
- Include tests for new features
- Update documentation

## Design Guidelines

### Typography
- **Primary Font**: Space Grotesk (body, headings)
  - Font weights: 200-700 (variable)
  - Usage: Body text, UI elements, headings
- **Secondary Font**: Bebas Neue (display headings only)
  - Font weight: 400 only
  - Usage: Display headings, labels, accent text
- **Line heights**: 1 for headings, 1.5 for body text

### Colors
- **Primary background**: yellow-50 (#FFFBE8) - warm cream
- **Primary text**: dark-600 (#262626) - near black
- **CTA buttons**: yellow-500 (#FFF055) with black text
- **Success elements**: nature-400 (#8AD753) - vibrant green
- **Cards**: blue-300 (#A3D7FF) or green-200 (#D4E6BC) - soft greens/blues

### Layout
- **Section padding**: py-16 (64px) - moderate whitespace
- **Container max-width**: 6xl (1152px)
- **Grid gaps**: gap-6 (24px)
- **Mobile-first design**

### Interactions
- **Arrow movement**: translateX(4px) on hover
- **Scale effects**: scale(1.05) on hover (700ms duration)
- **Button shadows**: animate on hover/active
- **Nav underline**: scaleX animation on hover
- **All transitions**: 300-700ms, ease timing

## No Overengineering

- Start simple, add complexity only when needed
- Prefer composition over inheritance
- Avoid premature abstraction
- Document non-obvious decisions in code comments
- Use Tailwind CSS utilities (no custom CSS unless necessary)
- Minimal JavaScript (GSAP only when needed)
- Static by default

## Performance Requirements

- **Lighthouse Performance**: 95-100
- **Lighthouse Accessibility**: 100
- **Lighthouse Best Practices**: 100
- **Lighthouse SEO**: 100
- **LCP**: < 0.8s
- **CLS**: < 0.05
- **TBT**: < 200ms
- **FCP**: < 0.6s

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Skip link present (first focusable element)
- ARIA labels on all interactive elements
- Color contrast 4.5:1 minimum
- Touch targets 44x44 minimum
- Keyboard navigation complete
- Focus indicators visible
- Alt text on all images
- Proper heading hierarchy (1 h1, proper h2-h3-h4)
- Reduced motion support

## SEO Requirements

- Unique titles (30-60 characters)
- Unique descriptions (120-160 characters)
- Canonical URLs (absolute)
- Hreflang for multi-language (es + en)
- Structured data (JSON-LD) for all pages
- Sitemap.xml generated automatically
- Robots.txt configured
- Internal linking with descriptive anchor text
- Image SEO (descriptive filenames, alt text)

## Content Validation

- All content must pass Zod schema validation
- Build fails on invalid content (strict mode)
- Use existing content files as templates
- Validate with `npm run validate:content`

## Testing Requirements

- All components must have tests
- Test coverage minimum 80%
- E2E tests for critical user flows
- Accessibility tests with axe-core
- Performance tests with Lighthouse CI
- Zod schema validation tests

## Dependencies

- Minimize external dependencies
- Prefer built-in APIs over libraries
- Any new dependency requires justification
- Keep bundle size minimal (< 200KB gzipped)
- Use Tailwind CSS (optimizes automatically)

## Documentation

- AGENTS.md - Agent documentation
- .agent/rules/ - Repository rules
- docs/ - Technical documentation
- README.md - Project overview
- Update documentation when changing architecture or APIs
