# SEO Rules - Platanito Rico

## Required SEO Fields for Every Page

| Field | Requirements |
|-------|--------------|
| Title | 30-60 characters, unique per page |
| Description | 120-160 characters, compelling |
| Canonical URL | Absolute URL, self-referencing |
| Language | BCP 47 code (es, en, etc.) |

## Title Format

```
{Page Title} | Platanito Rico
```

Examples:
- `Diseño Web a tu Medida | Platanito Rico`
- `Servicios de Desarrollo Web | Platanito Rico`
- `Cómo mejorar el SEO en 2024 | Blog`

## Meta Description

- Describe content accurately
- Include primary keyword naturally
- End with call to action when appropriate
- Never duplicate across pages
- Length: 120-160 characters

## Canonical URLs

Always use absolute URLs:
```html
<link rel="canonical" href="https://platanitorico.com/servicios/diseno-web/" />
```

Rules:
- Self-referencing canonicals for unique pages
- Point duplicates to main version
- Include trailing slash consistently
- For multi-language: `https://platanitorico.com/es/` (Spanish default)
- English version: `https://platanitorico.com/en/`

## Hreflang (Multi-language: es + en)

For each page with language alternatives:
```html
<!-- Spanish version -->
<link rel="alternate" hreflang="es" href="https://platanitorico.com/servicios/diseno-web/" />
<link rel="alternate" hreflang="en" href="https://platanitorico.com/en/services/web-design/" />
<link rel="alternate" hreflang="x-default" href="https://platanitorico.com/es/servicios/diseno-web/" />

<!-- English version -->
<link rel="alternate" hreflang="es" href="https://platanitorico.com/es/servicios/diseno-web/" />
<link rel="alternate" hreflang="en" href="https://platanitorico.com/en/services/web-design/" />
<link rel="alternate" hreflang="x-default" href="https://platanitorico.com/es/servicios/diseno-web/" />
```

## Structured Data (JSON-LD)

Required schemas for Platanito Rico:

### Organization (homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Platanito Rico",
  "url": "https://platanitorico.com",
  "logo": "https://platanitorico.com/logo.png",
  "description": "Agencia digital full-service: diseño web, producción audiovisual, marketing digital y SEO en Almería",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34657085019",
    "contactType": "customer service",
    "availableLanguage": ["es", "en"],
    "areaServed": "ES"
  },
  "sameAs": [
    "https://facebook.com/platanitorico",
    "https://linkedin.com/company/platanitorico",
    "https://instagram.com/platanitorico"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ctra de Ronda, 82",
    "addressLocality": "Vera",
    "addressRegion": "Almería",
    "postalCode": "04620",
    "addressCountry": "ES"
  }
}
```

### WebPage (all pages)
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Meta description",
  "url": "https://platanitorico.com/page/",
  "inLanguage": "es",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Platanito Rico",
    "url": "https://platanitorico.com"
  }
}
```

### Service (each service page)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Diseño Web a tu Medida",
  "description": "Webs profesionales que destacan. Más presencia y más clientes online.",
  "provider": {
    "@type": "Organization",
    "name": "Platanito Rico",
    "url": "https://platanitorico.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "450",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  },
  "areaServed": "ES",
  "availableLanguage": ["es", "en"]
}
```

### Article (blog posts)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post Title",
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "author": {
    "@type": "Person",
    "name": "Platanito Rico"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Platanito Rico",
    "logo": {
      "@type": "ImageObject",
      "url": "https://platanitorico.com/logo.png"
    }
  },
  "image": "https://platanitorico.com/blog/post-image.jpg",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://platanitorico.com/blog/post-slug"
  }
}
```

### FAQPage (FAQ section)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿En cuánto tiempo tendré la web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Entre 1 y 2 semanas desde que recibimos todo el contenido."
      }
    },
    {
      "@type": "Question",
      "name": "What is typical delivery time for a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Between 1 and 2 weeks after we receive all content."
      }
    }
  ]
}
```

## Heading Structure

Every page must have:
- Exactly ONE `<h1>` (the main page title)
- Proper hierarchy (h2, h3, h4 - no skipping)
- Descriptive headings (not "Section 1")
- Keywords included naturally

### Example Hierarchy
```html
<h1>Platanito Rico - Agencia Digital Full-Service</h1>

<h2>Nuestros Servicios</h2>
  <h3>Diseño Web a tu Medida</h3>
  <h3>Producción Audiovisual</h3>
  <h3>Canciones Personalizadas</h3>

<h2>Proceso de Trabajo</h2>
  <h3>1. Contacto y diagnóstico</h3>
  <h3>2. Contenido</h3>
  <h3>3. Ejecución</h3>
```

## Image SEO

All images must have:
- Descriptive `alt` text (not "image1" or "photo")
- Explicit `width` and `height` (to prevent CLS)
- Descriptive filenames (not `IMG_001.jpg`)
- Optimized formats (WebP/AVIF with fallback)
- Responsive with srcset

### Good Example
```html
<img 
  src="/images/servicios/diseno-web-profesional.webp"
  srcset="/images/servicios/diseno-web-400.webp 400w, 
          /images/servicios/diseno-web-800.webp 800w, 
          /images/servicios/diseno-web-1200.webp 1200w"
  sizes="(max-width: 600px) 100vw, 800px"
  width="800"
  height="600"
  alt="Diseño web profesional en Almería"
  loading="lazy"
  decoding="async"
/>
```

### Bad Example
```html
<img src="/images/IMG_001.jpg" alt="imagen" />
```

## Internal Linking

- Use descriptive anchor text (not "click here", "read more")
- Link to related content
- Ensure no orphan pages
- Run link checker before deploy: `npm run check:links`

### Good Examples
```html
<a href="/servicios/diseno-web/">Diseño web profesional</a>
<a href="/proceso/trabajo/">Ver nuestro proceso de trabajo</a>
<a href="/blog/como-mejorar-seo-2024/">Cómo mejorar el SEO en 2024</a>
```

### Bad Examples
```html
<a href="/servicios/diseno-web/">Haz clic aquí</a>
<a href="/proceso/trabajo/">Más información</a>
<a href="/blog/como-mejorar-seo-2024/">Leer más</a>
```

## Indexing Control

| Page Type | Index? |
|-----------|--------|
| Main content (Spanish) | Yes |
| Main content (English) | Yes |
| Blog posts | Yes |
| Services | Yes |
| Case studies | Yes |
| Search results | No |
| Filter pages | No |
| Draft/preview content | No |
| Thank you pages | No |
| Login/admin | No |
| 404 page | No |

Use `noindex: true` in frontmatter for pages that shouldn't be indexed.

## Sitemap

Auto-generated sitemap must include:
- All indexable pages (Spanish + English)
- All blog posts
- All service pages
- Last modification date
- Change frequency (monthly for static, weekly for blog)
- Priority (1.0 for home, 0.8 for main pages, 0.7 for services, 0.6 for posts)

Exclude:
- noindex pages
- Drafts
- Admin pages
- API routes
- Thank you pages

## Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://platanitorico.com/sitemap-index.xml

Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
Disallow: /.netlify/
Disallow: /functions/
Disallow: /*.json$
```

## Open Graph Tags

Required OG tags for all pages:
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://platanitorico.com/page/" />
<meta property="og:title" content="Page Title | Platanito Rico" />
<meta property="og:description" content="Page description" />
<meta property="og:image" content="https://platanitorico.com/og-image.jpg" />
<meta property="og:locale" content="es_ES" />
```

## Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://platanitorico.com/page/" />
<meta name="twitter:title" content="Page Title | Platanito Rico" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://platanitorico.com/twitter-image.jpg" />
```

## Keywords Strategy

### Primary Keywords (Spanish)
- agencia digital almería
- diseño web profesional
- producción audiovisual
- marketing digital seo
- canciones personalizadas
- cartelería profesional
- mantenimiento web
- gestión redes sociales
- hosting dominios

### Secondary Keywords
- desarrollo web almería
- seo almería
- marketing online
- contenido digital
- web corporativa
- tienda online
- diseño ui/ux

### English Keywords (for /en/ pages)
- web design almeria
- digital marketing agency
- audiovisual production
- seo optimization
- website development
- ui/ux design
- social media marketing

## URL Structure

### Spanish (default: /)
```
/                                   # Home (Spanish)
/servicios/                         # Services
/servicios/diseno-web/               # Service detail
/servicios/audiovisual/               # Service detail
/servicios/canciones/                # Service detail
/servicios/marketing-seo/            # Service detail
/servicios/carteleria/               # Service detail
/servicios/mantenimiento/             # Service detail
/servicios/redes-sociales/           # Service detail
/servicios/hosting/                  # Service detail
/servicios/plugins/                   # Service detail
/portfolio/                         # Portfolio
/testimonios/                       # Testimonials
/precios/                           # Pricing
/proceso/                            # Process
/faq/                                # FAQ
/contacto/                           # Contact
/blog/                               # Blog
/blog/como-mejorar-seo-2024/       # Blog post
```

### English
```
/en/                                 # Home (English)
/en/services/                         # Services
/en/services/web-design/              # Service detail
/en/services/audiovisual/              # Service detail
/en/services/music-composition/         # Service detail
/en/services/digital-marketing-seo/    # Service detail
/en/services/signage/                 # Service detail
/en/services/web-maintenance/         # Service detail
/en/services/social-media/            # Service detail
/en/services-hosting/                 # Service detail
/en/services/plugins/                 # Service detail
/en/portfolio/                        # Portfolio
/en/testimonials/                     # Testimonials
/en/pricing/                         # Pricing
/en/process/                          # Process
/en/faq/                              # FAQ
/en/contact/                          # Contact
/en/blog/                            # Blog
/en/blog/how-to-improve-seo-2024/    # Blog post
```

## Meta Description Templates

### Services
```
Diseño web profesional en Almería. Webs modernas, optimizadas para SEO y diseñadas a medida para tu negocio.
```

### Blog Posts
```
Descubre cómo [topic]. [Benefit]. Guía completa con consejos prácticos y estrategias probadas para [result].
```

### Home
```
Platanito Rico - Agencia digital full-service en Almería. Diseño web, producción audiovisual, marketing digital y SEO para maximizar tu presencia online.
```

## Checklist Before Deploy

- [ ] All pages have unique titles (30-60 chars)
- [ ] All pages have unique descriptions (120-160 chars)
- [ ] Canonical URLs are correct (absolute URLs)
- [ ] Hreflang tags are correct (es + en + x-default)
- [ ] Sitemap is valid and complete
- [ ] Robots.txt allows search engines
- [ ] Structured data validates (Google Rich Results Test)
- [ ] No broken internal links (run `npm run check:links`)
- [ ] All images have descriptive alt text
- [ ] All images have explicit width/height
- [ ] Heading structure is correct (1 h1)
- [ ] Color contrast 4.5:1 minimum
- [ ] Touch targets 44x44 minimum
- [ ] Skip link is present
- [ ] Focus indicators are visible
- [ ] Keyboard navigation is complete
- [ ] Content passes Zod schema validation
- [ ] Noindex on appropriate pages only
- [ ] Internal links use descriptive anchor text
- [ ] Keywords included naturally in headings
- [ ] Open Graph tags are present
- [ ] Twitter Card tags are present
- [ ] JSON-LD schemas are valid
