/**
 * GSAP Animations - Platanito Rico (Optimized Edition)
 * Scroll-triggered animations simplificadas para mejor rendimiento y UX
 * Usa GSAP + ScrollTrigger de forma conservadora
 */

// Wait for DOM and GSAP to be ready
function initAnimations() {
  // Bail if GSAP not loaded or mobile with reduced motion preference
  if (typeof gsap === 'undefined') return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // ==========================================
  // CONFIGURATION
  // ==========================================
  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion || isMobile) {
    // Show all elements immediately - no animations
    document.querySelectorAll('.gsap-reveal, .gsap-fade-up, .gsap-fade-left, .gsap-fade-right, .gsap-scale-in').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  
  // ==========================================
  // HERO ANIMATIONS - Solo entrada inicial
  // ==========================================
  function animateHero() {
    const hero = document.querySelector('#hero');
    if (!hero) return;
    
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    // Badge - animación simple
    const badge = hero.querySelector('.badge-premium');
    if (badge) {
      tl.fromTo(badge, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.1
      );
    }
    
    // Main heading
    const heading = hero.querySelector('h1');
    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.2
      );
    }
    
    // Subtitle
    const subtitle = hero.querySelector('p.text-xl, p.text-lg, p.text-zinc');
    if (subtitle) {
      tl.fromTo(subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.4
      );
    }
    
    // CTA Buttons
    const ctaContainer = hero.querySelector('.flex.flex-col, .flex.sm\\:flex-row');
    if (ctaContainer) {
      const buttons = ctaContainer.querySelectorAll('a, button');
      tl.fromTo(buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        0.5
      );
    }
    
    // Stats - solo fade in
    const stats = hero.querySelectorAll('.grid > div, .flex > div');
    if (stats.length) {
      tl.fromTo(stats,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.05 },
        0.7
      );
    }
  }
  
  // ==========================================
  // SCROLL-TRIGGERED SECTION ANIMATIONS - Simplificadas
  // ==========================================
  function animateSections() {
    // Solo animar headers de sección (badge, title)
    document.querySelectorAll('section:not(#hero)').forEach(section => {
      const badge = section.querySelector('.badge-premium, .inline-flex.items-center');
      const heading = section.querySelector('h2');
      
      if (heading || badge) {
        gsap.fromTo([badge, heading].filter(Boolean),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true // Solo ejecutar una vez
            }
          }
        );
      }
    });
  }
  
  // ==========================================
  // CARDS STAGGER - Solo servicios y portfolio
  // ==========================================
  function animateCards() {
    // Services cards
    const servicesSection = document.querySelector('#servicios, [id*="service"]');
    if (servicesSection) {
      const cards = servicesSection.querySelectorAll('.gradient-border-card, article, .card');
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: servicesSection.querySelector('.grid') || servicesSection,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      }
    }
    
    // Portfolio cards
    const portfolioSection = document.querySelector('#portfolio, [id*="portfolio"]');
    if (portfolioSection) {
      const cards = portfolioSection.querySelectorAll('article');
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: portfolioSection.querySelector('.grid') || portfolioSection,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      }
    }
  }
  
  // ==========================================
  // COUNTER ANIMATION - Solo si existen
  // ==========================================
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number, [data-counter]');
    
    counters.forEach(counter => {
      const text = counter.textContent.trim();
      const match = text.match(/(\d+)/);
      if (!match) return;
      
      const target = parseInt(match[1]);
      const suffix = text.replace(match[1], '');
      
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: target,
            duration: 1,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.round(obj.value) + suffix;
            }
          });
        }
      });
    });
  }
  
  // ==========================================
  // REMOVE CSS ANIMATION CLASSES
  // ==========================================
  function removeCSSAnimations() {
    // Remove CSS animations since GSAP handles them
    document.querySelectorAll('.animate-fade-up, .animate-fade-in, .animate-scale-in, .animate-float').forEach(el => {
      el.classList.remove('animate-fade-up', 'animate-fade-in', 'animate-scale-in', 'animate-float');
      el.classList.remove('stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6');
      el.style.opacity = '';
      el.style.transform = '';
    });
  }
  
  // ==========================================
  // KILL ALL SCROLLTRIGGERS (cleanup)
  // ==========================================
  function cleanup() {
    // Limpieza si es necesario
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
  
  // ==========================================
  // INITIALIZE ALL
  // ==========================================
  removeCSSAnimations();
  animateHero();
  animateSections();
  animateCards();
  initCounters();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
