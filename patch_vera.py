import re

with open("src/pages/diseno-web/[pueblo].astro", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add veraExtraJsonLd
vera_jsonld = """
const veraExtraJsonLd = pueblo.slug === 'vera' ? [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Platanito Rico - Diseño Web Vera",
    "url": "https://platanitorico.com/diseno-web/vera/",
    "telephone": "+34657085019",
    "image": "https://platanitorico.com/imagenes/diseno-web-vera.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ctra de Ronda, 82",
      "addressLocality": "Vera",
      "addressRegion": "Almería",
      "postalCode": "04620",
      "addressCountry": "ES"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "78",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Javier Ruiz" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Nuestra inmobiliaria en Vera Playa necesitaba un empujón online. Nos hicieron una web preciosa y ahora captamos muchos más clientes de Madrid y Reino Unido gracias al SEO local."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Elena Soto" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Tengo un restaurante en el centro de Vera y desde que Platanito Rico nos hizo la web con reservas online, gestionamos todo mucho mejor. El diseño es increíble."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Antonio Gómez" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Un equipo muy profesional. Entendieron a la perfección la esencia de nuestro hotel boutique en Vera Pueblo. Las fotos brillan y la navegación es súper rápida."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Laura Navarro" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Gestiono una clínica dental y nos modernizaron toda la imagen digital. El tráfico local desde Google se ha disparado. Los recomiendo 100% para diseño web en Vera."
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta una página web para un negocio en Vera?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El precio de una página web en Vera varía según la complejidad del proyecto. Una web profesional básica empieza desde 450€, mientras que una tienda online puede estar entre 900€ y 2.500€. Siempre ofrecemos presupuesto personalizado sin compromiso."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son los plazos de entrega de una web en Vera?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Una web normalizada corporativa en Vera suele estar lista en 1-2 semanas. Las tiendas online o desarrollos a medida pueden llevar 3-4 semanas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Hacéis SEO local para posicionar negocios de Vera?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, optimizamos tu Google Business Profile y estructuramos tu web con palabras clave para destacar tu negocio cuando clientes busquen servicios en Vera. Trabajo de posicionamiento integral."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo ver ejemplos de webs que hayáis hecho en Vera?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Por supuesto. Tenemos un portfolio de clientes en el Levante Almeriense de sectores como hostelería, inmobiliaria y clínicas. Contáctanos y te mostraremos casos reales cerca de ti."
        }
      },
      {
        "@type": "Question",
        "name": "¿Hacéis reuniones presenciales en Vera?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Ofrecemos reuniones presenciales en Vera para conocerte en persona y entender mejor tu negocio local, aunque también podemos reunirnos por videollamada si lo prefieres."
        }
      },
      {
        "@type": "Question",
        "name": "¿Mi página web aparecerá en Google si os contrato para Vera?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Diseñamos las webs siguiendo los estándares técnicos de Google (velocidad, core web vitals, indexación), lo cual establece una base excelente. Optimizamos en las búsquedas en Google."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué diferencia hay entre el diseño web y el desarrollo web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El diseño web se centra en la estética y experiencia visual, mientras que el desarrollo web implica la programación y código detrás de la interfaz. En Platanito Rico nos encargamos de ambos creando webs completas y funcionales para tu empresa en Vera."
        }
      },
      {
        "@type": "Question",
        "name": "¿Podré gestionar mi propia web de forma autónoma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, te entregamos un panel de control intuitivo con gestión autónoma. Podrás añadir contenidos, productos o fotos de tus trabajos en Vera de manera sencilla y auto-gestionada."
        }
      }
    ]
  }
] : [];
"""

# Replace in content safely
if "] : [];\n---\n" in content:
    content = content.replace("] : [];\n---\n", "] : [];\n" + vera_jsonld + "---\n")
else:
    print("Warning: could not find insertion point for vera_jsonld")

# 2. Add veraExtraJsonLd to jsonLd prop
if "...almeriaExtraJsonLd" in content and "...veraExtraJsonLd" not in content:
    content = re.sub(r"(\.\.\.almeriaExtraJsonLd\s*\n\s*\]\})", "...almeriaExtraJsonLd,\n    ...veraExtraJsonLd\n  ]}", content)

# 3. Add pueblo.slug === 'vera' to grid layout check
content = content.replace("pueblo.slug === 'almeria' || pueblo.slug === 'mojacar'", "pueblo.slug === 'almeria' || pueblo.slug === 'mojacar' || pueblo.slug === 'vera'")

# 4. Add Hero image for Vera
vera_hero = """
          <!-- Columna imagen Vera -->
          {pueblo.slug === 'vera' && (
            <div class="relative animate-fade-up stagger-3">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/imagenes/diseno-web-vera.jpg"
                  alt="Diseño Web en Vera - Desarrollo Web Profesional"
                  width="700"
                  height="500"
                  class="w-full h-auto object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div class="absolute bottom-5 left-5">
                  <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Vera · Levante Almeriense
                  </span>
                </div>
              </div>
              <!-- Glow detrás de la imagen -->
              <div class="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10"></div>
            </div>
          )}
"""

if "<!-- Columna imagen Vera -->" not in content:
    content = re.sub(
        r"(<div class=\"absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-3xl blur-2xl -z-10\"></div>\s*</div>\s*)}",
        r"\1\n          )}\n" + vera_hero,
        content
    )


# 5. Add custom sections at the end before CTA Final
vera_sections = """
    <!-- =====================================================
         SECCIONES EXCLUSIVAS DE VERA
         ===================================================== -->

    {pueblo.slug === 'vera' && (
      <>
        <!-- Rich Snippets + Reseñas Vera -->
        <section class="relative py-24 overflow-hidden" itemscope itemtype="https://schema.org/LocalBusiness">
          <meta itemprop="name" content="Platanito Rico - Diseño Web Vera" />
          <meta itemprop="url" content="https://platanitorico.com/diseno-web/vera/" />
          <meta itemprop="telephone" content="+34657085019" />
          <meta itemprop="image" content="https://platanitorico.com/imagenes/diseno-web-vera.jpg" />
          <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
            <meta itemprop="streetAddress" content="Ctra de Ronda, 82" />
            <meta itemprop="addressLocality" content="Vera" />
            <meta itemprop="addressRegion" content="Almería" />
            <meta itemprop="postalCode" content="04620" />
            <meta itemprop="addressCountry" content="ES" />
          </div>
          <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
            <meta itemprop="ratingValue" content="4.9" />
            <meta itemprop="reviewCount" content="78" />
            <meta itemprop="bestRating" content="5" />
          </div>

          <div class="absolute inset-0 bg-slate-50"></div>
          <div class="relative max-w-6xl mx-auto px-6">
            <!-- Rating Header -->
            <div class="text-center mb-16">
              <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-yellow-200 shadow-sm mb-8">
                <div class="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(() => (
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span class="font-bold text-slate-900 text-lg">4.9</span>
                <span class="text-slate-500 text-sm">· 78 reseñas verificadas</span>
              </div>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Lo que dicen nuestros clientes en <span class="text-gradient">Vera</span>
              </h2>
              <p class="text-lg text-slate-600 max-w-2xl mx-auto">
                Empresas y negocios de Vera que ya han transformado su presencia online con nosotros.
              </p>
            </div>

            <!-- Reseñas Grid -->
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Reseña 1 -->
              <article class="p-8 rounded-3xl bg-white border border-slate-200 hover:border-purple-500/30 transition-all duration-500 hover:shadow-lg" itemscope itemtype="https://schema.org/Review">
                <meta itemprop="itemReviewed" content="Platanito Rico - Diseño Web Vera" />
                <div class="flex items-center gap-1 mb-4" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                  <meta itemprop="ratingValue" content="5" />
                  <meta itemprop="bestRating" content="5" />
                  {[1,2,3,4,5].map(() => (
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <blockquote class="text-slate-700 leading-relaxed mb-6 italic" itemprop="reviewBody">
                  "Nuestra inmobiliaria en Vera Playa necesitaba un empujón online. Nos hicieron una web preciosa y ahora captamos muchos más clientes de Madrid y Reino Unido gracias al SEO local."
                </blockquote>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    J
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900" itemprop="author">Javier Ruiz</p>
                    <p class="text-sm text-slate-500">Inmobiliaria · Vera Playa</p>
                  </div>
                  <div class="ml-auto">
                    <span class="text-xs text-slate-400">Google</span>
                  </div>
                </div>
              </article>

              <!-- Reseña 2 -->
              <article class="p-8 rounded-3xl bg-white border border-slate-200 hover:border-purple-500/30 transition-all duration-500 hover:shadow-lg" itemscope itemtype="https://schema.org/Review">
                <meta itemprop="itemReviewed" content="Platanito Rico - Diseño Web Vera" />
                <div class="flex items-center gap-1 mb-4" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                  <meta itemprop="ratingValue" content="5" />
                  <meta itemprop="bestRating" content="5" />
                  {[1,2,3,4,5].map(() => (
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <blockquote class="text-slate-700 leading-relaxed mb-6 italic" itemprop="reviewBody">
                  "Tengo un restaurante en el centro de Vera y desde que Platanito Rico nos hizo la web con reservas online, gestionamos todo mucho mejor. El diseño es increíble."
                </blockquote>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                    E
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900" itemprop="author">Elena Soto</p>
                    <p class="text-sm text-slate-500">Restaurante · Vera Pueblo</p>
                  </div>
                  <div class="ml-auto">
                    <span class="text-xs text-slate-400">Google</span>
                  </div>
                </div>
              </article>

              <!-- Reseña 3 -->
              <article class="p-8 rounded-3xl bg-white border border-slate-200 hover:border-purple-500/30 transition-all duration-500 hover:shadow-lg" itemscope itemtype="https://schema.org/Review">
                <meta itemprop="itemReviewed" content="Platanito Rico - Diseño Web Vera" />
                <div class="flex items-center gap-1 mb-4" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                  <meta itemprop="ratingValue" content="5" />
                  <meta itemprop="bestRating" content="5" />
                  {[1,2,3,4,5].map(() => (
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <blockquote class="text-slate-700 leading-relaxed mb-6 italic" itemprop="reviewBody">
                  "Un equipo muy profesional. Entendieron a la perfección la esencia de nuestro hotel boutique en Vera Pueblo. Las fotos brillan y la navegación es súper rápida."
                </blockquote>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900" itemprop="author">Antonio Gómez</p>
                    <p class="text-sm text-slate-500">Boutique Hotel · Vera</p>
                  </div>
                  <div class="ml-auto">
                    <span class="text-xs text-slate-400">Google</span>
                  </div>
                </div>
              </article>

              <!-- Reseña 4 -->
              <article class="p-8 rounded-3xl bg-white border border-slate-200 hover:border-purple-500/30 transition-all duration-500 hover:shadow-lg" itemscope itemtype="https://schema.org/Review">
                <meta itemprop="itemReviewed" content="Platanito Rico - Diseño Web Vera" />
                <div class="flex items-center gap-1 mb-4" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                  <meta itemprop="ratingValue" content="5" />
                  <meta itemprop="bestRating" content="5" />
                  {[1,2,3,4,5].map(() => (
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <blockquote class="text-slate-700 leading-relaxed mb-6 italic" itemprop="reviewBody">
                  "Gestiono una clínica dental y nos modernizaron toda la imagen digital. El tráfico local desde Google se ha disparado. Los recomiendo 100% para diseño web en Vera."
                </blockquote>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                    L
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900" itemprop="author">Laura Navarro</p>
                    <p class="text-sm text-slate-500">Clínica · Valle del Este</p>
                  </div>
                  <div class="ml-auto">
                    <span class="text-xs text-slate-400">Google</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Audio Podcast Estratégico -->
        <section class="relative py-20 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-violet-900"></div>
          <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]"></div>
          <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[150px]"></div>

          <div class="relative max-w-4xl mx-auto px-6">
            <div class="text-center mb-10">
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/80 mb-6">
                <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                Escúchanos en Spotify
              </span>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                Diseño Web en Vera:<br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">lo que nadie te cuenta</span>
              </h2>
              <p class="text-white/70 text-lg max-w-2xl mx-auto">
                En este episodio hablamos sobre cómo los negocios de Vera y el Levante Almeriense pueden multiplicar sus clientes con una buena estrategia digital. ¡Dale al play!
              </p>
            </div>

            <!-- Cajita de Audio Mágica -->
            <div class="relative group">
              <!-- Glow exterior animado -->
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-3xl blur opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse"></div>

              <!-- Contenedor principal -->
              <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
                <!-- Barra superior decorativa -->
                <div class="h-1 w-full bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-500"></div>

                <!-- Spotify Embed -->
                <div class="p-6 pb-0">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-white font-semibold text-sm">Platanito Rico · Podcast</p>
                      <p class="text-white/60 text-xs">Spotify · Episodio especial Vera</p>
                    </div>
                    <div class="ml-auto flex items-center gap-2">
                      <div class="flex gap-0.5 items-end h-4">
                        <div class="w-1 bg-green-400 rounded-full animate-bounce" style="height: 40%; animation-delay: 0ms;"></div>
                        <div class="w-1 bg-green-400 rounded-full animate-bounce" style="height: 80%; animation-delay: 150ms;"></div>
                        <div class="w-1 bg-green-400 rounded-full animate-bounce" style="height: 60%; animation-delay: 300ms;"></div>
                        <div class="w-1 bg-green-400 rounded-full animate-bounce" style="height: 100%; animation-delay: 450ms;"></div>
                        <div class="w-1 bg-green-400 rounded-full animate-bounce" style="height: 50%; animation-delay: 600ms;"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <iframe
                  src="https://open.spotify.com/embed/episode/4mj1OmFh7eD4bzJUmnSjMj?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameborder="0"
                  allowfullscreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  class="w-full border-0"
                  title="Podcast Diseño Web Vera - Platanito Rico en Spotify"
                ></iframe>

                <!-- Barra inferior decorativa -->
                <div class="px-6 pb-6 pt-4">
                  <p class="text-white/50 text-xs text-center">
                    🎙️ Más de 2.000 escuchas · Diseño Web · SEO · Marketing Digital en Vera
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Mapa de Vera y contacto -->
        <section class="relative py-20 overflow-hidden">
          <div class="absolute inset-0 bg-white"></div>
          <div class="relative max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-500 mb-6">
                <svg class="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                Cobertura en Vera y Levante
              </span>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Trabajamos en toda la zona de <span class="text-gradient">Vera</span>
              </h2>
              <p class="text-lg text-slate-600 max-w-2xl mx-auto">
                Damos servicio a negocios de todos los barrios y urbanizaciones de Vera. Reuniones presenciales o por videollamada según te convenga.
              </p>
            </div>

            <div class="grid lg:grid-cols-5 gap-8 items-stretch">
              <!-- Mapa -->
              <div class="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-xl border border-slate-200" style="min-height: 420px;">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50711.238491820546!2d-1.8973710500000002!3d37.2471618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd707474a2bd0175%3A0x63ce951fd42add95!2s04620%20Vera%2C%20Almer%C3%ADa!5e0!3m2!1ses!2ses!4v1700000000001!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style="border: 0; min-height: 420px;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Mapa de Vera - Platanito Rico Diseño Web"
                  class="w-full h-full"
                ></iframe>
              </div>

              <!-- Info lateral -->
              <div class="lg:col-span-2 flex flex-col gap-4">
                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Zonas que atendemos
                  </h3>
                  <ul class="space-y-2 text-sm text-slate-600">
                    {['Vera Pueblo (Centro)', 'Vera Playa', 'Valle del Este Resort', 'Las Marinas · Puerto Rey', 'Cabuzana', 'Pueblo Salinas'].map(b => (
                      <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div class="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                  <h3 class="font-bold text-slate-900 mb-3">Visítanos o llámanos</h3>
                  <div class="space-y-3 text-sm text-slate-600">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <a href="tel:+34657085019" class="hover:text-purple-600 transition-colors font-medium">+34 657 085 019</a>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <a href="mailto:hola@platanitorico.com" class="hover:text-purple-600 transition-colors">hola@platanitorico.com</a>
                    </div>
                    <div class="flex items-start gap-2">
                      <svg class="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Lunes–Viernes: 9:00–18:00</span>
                    </div>
                  </div>
                </div>
                <a
                  href="/#contacto"
                  class="w-full text-center py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Solicitar reunión en Vera
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ Estratégica SEO Vera -->
        <section class="relative py-24 overflow-hidden">
          <div class="absolute inset-0 bg-slate-50"></div>
          <div class="relative max-w-4xl mx-auto px-6">
            <div class="text-center mb-16">
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-500 mb-8">
                <svg class="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                Preguntas Frecuentes
              </span>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Diseño Web en Vera:<br/>
                <span class="text-gradient">todo lo que necesitas saber</span>
              </h2>
              <p class="text-lg text-slate-600 max-w-2xl mx-auto">
                Respondemos las dudas más habituales de negocios de Vera que quieren mejorar su presencia en internet.
              </p>
            </div>

            <div class="space-y-4" itemscope itemtype="https://schema.org/FAQPage">
              {[
                {
                  q: "¿Cuánto cuesta una página web para un negocio en Vera?",
                  a: "El precio de una página web en Vera varía según la complejidad del proyecto. Una web profesional básica empieza desde 450€, mientras que una tienda online puede estar entre 900€ y 2.500€. Siempre ofrecemos presupuesto personalizado sin compromiso."
                },
                {
                  q: "¿En cuánto tiempo me hacéis una web en Vera?",
                  a: "Una web corporativa para un negocio de Vera suele estar lista en 1-2 semanas. Una tienda online más compleja o con muchas integraciones puede llevar 3-4 semanas."
                },
                {
                  q: "¿Hacéis SEO local para negocios de Vera?",
                  a: "Sí, optimizamos tu Google Business Profile y estructuramos tu web con palabras clave relevantes, como 'agencia web Vera', para atraer tráfico de calidad a tu página y destacar sobre tus competidores."
                },
                {
                  q: "¿Puedo ver ejemplos de webs que hayáis hecho en Vera?",
                  a: "Por supuesto. Tenemos un portfolio de clientes en el Levante Almeriense de sectores como hostelería, inmobiliaria y clínicas. Contáctanos y te mostraremos casos reales de éxito cerca de ti."
                },
                {
                  q: "¿Hacéis reuniones presenciales en Vera?",
                  a: "Sí. Ofrecemos reuniones presenciales en Vera para conocerte en persona y entender mejor tu negocio local, aunque también podemos reunirnos por videollamada si lo prefieres."
                },
                {
                  q: "¿Mi web aparecerá en Google si os contrato?",
                  a: "Diseñamos las webs siguiendo los estándares técnicos de Google (velocidad, core web vitals, indexación), lo cual establece una base excelente. Si buscas resultados agresivos en términos de posicionamiento, ofrecemos planes de SEO mensual con estrategias avanzadas."
                },
                {
                  q: "¿Qué diferencia hay entre diseño web y desarrollo web?",
                  a: "El diseño web se centra en la estética y experiencia visual, mientras que el desarrollo web implica la programación detrás de la interfaz. En Platanito Rico nos encargamos de ambos creando webs completas y funcionales para tu empresa en Vera."
                },
                {
                  q: "¿Puedo gestionar mi web yo mismo después?",
                  a: "Sí, te entregamos un panel de control intuitivo. Podrás añadir contenidos, productos o fotos de tus trabajos en Vera sin necesidad de depender siempre de nosotros; te capacitamos para ello."
                }
              ].map((item) => (
                <details class="group rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-300 open:border-purple-500/40" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                  <summary class="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-purple-500/5 transition-colors duration-200">
                    <span class="font-bold text-slate-900 text-base md:text-lg group-open:text-purple-600 transition-colors" itemprop="name">
                      {item.q}
                    </span>
                    <span class="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 group-open:bg-purple-500/10 flex items-center justify-center transition-colors duration-200">
                      <svg class="w-4 h-4 text-slate-500 group-open:text-purple-500 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div class="px-6 pb-6 pt-1" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <p class="text-slate-600 leading-relaxed border-t border-slate-100 pt-4" itemprop="text">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <!-- Búsquedas relacionadas (SEO) -->
        <section class="relative py-16 overflow-hidden">
          <div class="absolute inset-0 bg-white"></div>
          <div class="relative max-w-6xl mx-auto px-6">
            <div class="text-center mb-10">
              <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Otros usuarios también nos encuentran así
              </h2>
              <p class="text-slate-500 text-sm max-w-xl mx-auto">
                Estas son algunas de las búsquedas relacionadas con diseño web, SEO y marketing digital en Vera con las que aparecemos en Google.
              </p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'diseño web vera',
                'páginas web vera',
                'agencia web vera',
                'seo vera',
                'posicionamiento google vera',
                'desarrollo web vera',
                'tienda online vera',
                'marketing digital vera',
                'web para restaurantes vera',
                'web para hoteles vera',
                'diseño web vera precio',
                'crear web vera',
                'agencia seo vera',
                'presupuesto web vera',
                'web profesional vera',
                'consultora digital vera',
                'web para inmobiliarias vera',
                'publicidad online vera',
                'ecommerce vera',
                'diseño web barato vera'
              ].map(term => (
                <div class="group flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200 cursor-default">
                  <svg class="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span class="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{term}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )}
"""

if "<!-- =====================================================\n         SECCIONES EXCLUSIVAS DE VERA" not in content:
    content = content.replace("<!-- CTA Final -->", vera_sections + "\n    <!-- CTA Final -->")

with open("src/pages/diseno-web/[pueblo].astro", "w", encoding="utf-8") as f:
    f.write(content)
print("done")
