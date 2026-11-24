import type { ContenidoServicio } from './tipos';

export const soporte: ContenidoServicio = {
  ruta: '/soporte/',
  nombre: 'Mantenimiento web',
  tipo: 'Mantenimiento y soporte web',
  servicioContacto: 'soporte',
  escena: 'soporte',
  seo: {
    title: 'Mantenimiento web en Almería: WordPress, WooCommerce y PrestaShop',
    description: 'Actualizaciones, copias diarias, seguridad, velocidad y cambios en tu web, con soporte de personas reales. WordPress, WooCommerce, PrestaShop y Astro. Sin permanencia.',
  },
  portada: {
    antetitulo: 'Mantenimiento web',
    h1: 'Tu web al día, segura y rápida, <span class="subrayado">sin que tengas que pensar en ella</span>',
    entradilla: 'Nos ocupamos de actualizaciones, copias, seguridad y cambios para que tu web siga funcionando como el primer día. Y si algo falla, contestamos nosotros, no un robot.',
    puntos: [
      'Copias de seguridad diarias fuera de tu servidor',
      'Horas de cambios al mes incluidas',
      'Sin permanencia: cancelas cuando quieras',
    ],
  },
  paraQuien: {
    titulo: 'Tres niveles según lo que dependa de tu web',
    entradilla: 'Todos incluyen alojamiento, correo profesional, certificado SSL, copias diarias y vigilancia continua.',
    perfiles: [
      { icono: 'documento', t: 'Básico', d: 'Para webs corporativas y blogs. Actualizaciones de seguridad, copias diarias y 5 horas de cambios al mes, con soporte por email.' },
      { icono: 'maletin', t: 'Pro', d: 'Para empresas que viven de su web. 20 horas de cambios, mejora de velocidad, revisión SEO técnica mensual, soporte telefónico e informe mensual.' },
      { icono: 'carrito', t: 'Tienda', d: 'Para WooCommerce y PrestaShop. Todo lo del Pro, alojamiento optimizado para comercio, gestión del catálogo y soporte prioritario.' },
    ],
  },
  incluye: {
    titulo: 'Mantenimiento de verdad, no un hosting con otra etiqueta',
    items: [
      { icono: 'escudo', t: 'Seguridad', d: 'Análisis de malware, cortafuegos de aplicación, filtro antispam y parches críticos aplicados en menos de 24 horas.' },
      { icono: 'capas', t: 'Actualizaciones sin sustos', d: 'Núcleo, plugins, temas y PHP al día. Probamos antes de actualizar para que nada se rompa.' },
      { icono: 'servidor', t: 'Copias verificadas', d: 'Copias diarias cifradas en un servidor independiente dentro de la UE, con 30 días de historial.' },
      { icono: 'rayo', t: 'Velocidad', d: 'Caché, base de datos limpia, imágenes comprimidas y seguimiento de las Core Web Vitals.' },
      { icono: 'reloj', t: 'Vigilancia continua', d: 'Si la web se cae, nos enteramos nosotros antes que tus clientes y actuamos.' },
      { icono: 'conversacion', t: 'Soporte humano', d: 'Email, teléfono y WhatsApp con los mismos programadores que conocen tu web. Respuesta media en menos de 4 horas.' },
    ],
  },
  guia: {
    antetitulo: 'Revísalo hoy',
    titulo: 'Cinco señales de que tu web necesita mantenimiento ya',
    entradilla: 'Si reconoces dos o más, tu web corre un riesgo real de caerse, perder posiciones o ser atacada.',
    bloques: [
      { t: 'No sabes cuándo se hizo la última copia', d: 'Ni dónde está guardada. Si el servidor falla mañana, ¿qué recuperarías?' },
      { t: 'El panel te avisa de actualizaciones pendientes', d: 'Cada plugin sin actualizar es una puerta abierta conocida por quien busca webs vulnerables.' },
      { t: 'Tarda más de 3 segundos en cargar en el móvil', d: 'Google lo penaliza y tus visitas se van antes de verla. Compruébalo en PageSpeed Insights.' },
      { t: 'Los formularios llevan tiempo sin llegar', d: 'Pasa más de lo que parece: un cambio en el servidor de correo y los contactos se pierden en silencio.' },
      { t: 'Nadie sabe la contraseña del hosting', d: 'Si la única persona con acceso ya no está, cualquier problema se convierte en una emergencia.' },
    ],
  },
  pasos: {
    titulo: 'Cómo activamos tu mantenimiento',
    items: [
      { t: 'Diagnóstico gratuito', d: 'Revisamos seguridad, velocidad y actualizaciones pendientes. Recibes un informe de estado.', cuando: '1 día' },
      { t: 'Plan', d: 'Te proponemos el nivel adecuado y las acciones prioritarias.', cuando: '1-2 días' },
      { t: 'Activación', d: 'Configuramos copias, seguridad y vigilancia. Desde aquí, tu web está cubierta.', cuando: '1-2 días' },
      { t: 'Cada mes', d: 'Actualizaciones semanales, cambios que pidas e informe mensual.', cuando: 'Continuo' },
    ],
  },
  preguntas: [
    { q: '¿Todas las webs necesitan mantenimiento?', a: '<p>Sí. Una web es software y el software envejece: aparecen fallos de seguridad, cambian los navegadores y las versiones de PHP. Las tiendas online, todavía más.</p>' },
    { q: '¿Qué pasa si mi web se cae o la hackean?', a: '<p>La restauramos desde la última copia limpia y cerramos la vía de entrada. Con copias diarias fuera de tu servidor, el peor caso es perder unas horas.</p>' },
    { q: '¿Qué cambios puedo pedir?', a: '<p>Textos, imágenes, secciones nuevas, artículos del blog o ajustes de diseño. Cada nivel incluye unas horas al mes; si un cambio es grande, te lo presupuestamos aparte antes de hacerlo.</p>' },
    { q: '¿Qué plataformas mantenéis?', a: '<p>WordPress, WooCommerce y PrestaShop, además de webs estáticas con Astro. También revisamos Joomla, Drupal y desarrollos a medida.</p>' },
    { q: '¿Hay permanencia?', a: '<p>No. Cancelas cuando quieras y te entregamos todos los accesos y la última copia.</p>' },
    { q: '¿En qué se diferencia de un hosting barato?', a: '<p>El hosting te da espacio en un servidor. El mantenimiento añade actualizaciones, copias, seguridad, velocidad, vigilancia y alguien que responde cuando algo pasa.</p>' },
  ],
  relacionados: ['web', 'informatica', 'tienda'],
  enlaces: {
    titulo: 'Para seguir leyendo',
    items: [
      { nombre: 'Plan 360', href: '/plan-360/', d: 'Web e informática de tu empresa en un solo servicio' },
      { nombre: 'Guía honesta de hosting', href: '/blog/hosting-web-2026-guia-brutal/', d: 'Dónde alojar tu web y por qué' },
      { nombre: 'Guía legal de tu web', href: '/blog/guia-legal-web-lopd-lssi-2026/', d: 'RGPD, LSSI y cookies sin sustos' },
    ],
  },
};
