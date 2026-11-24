import type { ContenidoServicio } from './tipos';

export const emprendedor: ContenidoServicio = {
  ruta: '/soluciones/emprendedor/',
  nombre: 'Web para emprendedores',
  tipo: 'Diseño web para emprendedores y autónomos',
  servicioContacto: 'web',
  escena: 'proceso',
  migas: [{ nombre: 'Web para emprendedores' }],
  seo: {
    title: 'Diseño web para emprendedores y autónomos en Almería',
    description: 'Lanza tu negocio en internet en unas dos semanas: web, dominio, correo profesional, SEO y formación en un solo paso. Plazo cerrado y sin permanencia.',
  },
  portada: {
    antetitulo: 'Para emprendedores y autónomos',
    h1: 'De la idea a tener web <span class="subrayado">en unas dos semanas</span>',
    entradilla: 'Una reunión de una hora y después solo tienes que aprobar. Nos ocupamos de la web, el dominio, el correo, Google y de enseñarte a llevarlo, para que tú te dediques a tu negocio.',
    puntos: ['Web, dominio, correo y ficha de Google de una vez', 'Plazo cerrado por escrito antes de empezar', 'Sin permanencia y todo a tu nombre'],
  },
  paraQuien: {
    titulo: 'Sabemos lo que estás pensando',
    perfiles: [
      { icono: 'reloj', t: '«No tengo tiempo»', d: 'Una reunión de una hora para entender tu negocio. Después, solo revisar y aprobar.' },
      { icono: 'ruta', t: '«No sé por dónde empezar»', d: 'Te damos una hoja de ruta de dos semanas, sin tecnicismos, con qué pasa cada día.' },
      { icono: 'buscar', t: '«Quiero validar primero»', d: 'Empezamos con una página y un formulario en una semana. Si funciona, crecemos desde ahí.' },
      { icono: 'llave', t: '«Me da miedo atarme»', d: 'Precio cerrado, sin permanencia y con el dominio y el código a tu nombre desde el primer día.' },
    ],
  },
  incluye: {
    titulo: 'Todo lo que necesitas para abrir en internet',
    items: [
      { icono: 'pincel', t: 'Web a medida', d: 'Las páginas esenciales: inicio, servicios, sobre ti y contacto. Diseñada para el móvil.' },
      { icono: 'globo', t: 'Dominio y alojamiento', d: 'Tu dominio .com o .es y un alojamiento rápido con certificado SSL.' },
      { icono: 'email', t: 'Correo profesional', d: 'tu@tunegocio.com, que da más confianza que una dirección gratuita.' },
      { icono: 'ubicacion', t: 'Ficha de Google', d: 'Alta y optimización de tu perfil de empresa para salir en el mapa.' },
      { icono: 'buscar', t: 'SEO de base', d: 'Sitemap, datos estructurados, Search Console y Analytics configurados.' },
      { icono: 'documento', t: 'Textos legales', d: 'Aviso legal, privacidad y cookies adaptados a tu actividad.' },
      { icono: 'conversacion', t: 'Formulario y WhatsApp', d: 'Que contactarte sea cuestión de un toque.' },
      { icono: 'usuario', t: 'Formación', d: 'Una sesión para que sepas cambiar textos y fotos tú mismo, y un manual.' },
    ],
  },
  guia: {
    antetitulo: 'Tu lista antes de lanzar',
    titulo: 'Ocho cosas que tener listas el día que abras',
    entradilla: 'Úsala aunque montes la web por tu cuenta. Son las que más se olvidan.',
    bloques: [
      { t: 'Alta en Hacienda y Seguridad Social', d: 'Antes de facturar. Si tienes dudas, consulta con una gestoría: es lo primero.' },
      { t: 'Dominio a tu nombre', d: 'Regístralo tú o exige que quien lo registre lo ponga a tu nombre.' },
      { t: 'Correo con tu dominio', d: 'Las direcciones gratuitas restan confianza en un presupuesto.' },
      { t: 'Perfil de empresa en Google', d: 'Gratis y decisivo para que te encuentren en tu zona.' },
      { t: 'Una frase que explique qué haces', d: 'Para quién y en qué te diferencias. Si no cabe en una línea, aún no está clara.' },
      { t: 'Fotos propias', d: 'Aunque sean con el móvil y buena luz. Las de banco de imágenes no generan confianza.' },
      { t: 'Textos legales', d: 'Aviso legal, privacidad y cookies. Son obligatorios desde el primer día.' },
      { t: 'Cómo vas a medir', d: 'Cuántos te contactan y por dónde. Sin ese dato, no sabrás qué funciona.' },
    ],
  },
  comparativa: {
    titulo: 'Hacerlo tú o encargarlo',
    entradilla: 'Montarla tú con Wix o similares es posible. La diferencia no está en la herramienta, sino en el tiempo y en el resultado.',
    columnas: ['Con nosotros', 'Hacerlo tú'],
    filas: [
      { aspecto: 'Tu tiempo', nosotros: 'Una reunión y aprobar', otros: 'Muchas horas de aprendizaje y pruebas' },
      { aspecto: 'Textos', nosotros: 'Te ayudamos a escribirlos', otros: 'Los escribes tú' },
      { aspecto: 'SEO y Google', nosotros: 'Configurado desde el principio', otros: 'Lo que sepas hacer' },
      { aspecto: 'Plataforma', nosotros: 'Sin cuota de plataforma', otros: 'Cuota mensual mientras exista la web' },
      { aspecto: 'Si te quieres ir', nosotros: 'Te llevas todo', otros: 'La web suele quedarse en la plataforma' },
    ],
  },
  pasos: {
    titulo: 'Dos semanas, paso a paso',
    items: [
      { t: 'Reunión', d: 'Una hora para entender tu negocio, tu cliente y qué tiene que conseguir la web.', cuando: 'Día 1' },
      { t: 'Diseño', d: 'Te enseñamos la propuesta de diseño y la ajustamos contigo.', cuando: 'Días 3-6' },
      { t: 'Desarrollo', d: 'Montamos la web, el correo, el dominio y la ficha de Google.', cuando: 'Días 7-12' },
      { t: 'Lanzamiento', d: 'Publicamos y te formamos para que la puedas llevar tú.', cuando: 'Día 14' },
    ],
  },
  casos: ['taller-el-pinon', 'juan-alcaraz', 'excavaciones-tripiana'],
  preguntas: [
    { q: '¿De verdad está en dos semanas?', a: '<p>Una web de presentación, sí, siempre que nos lleguen a tiempo los textos, las fotos y las aprobaciones. Si quieres validar antes, una página con formulario puede estar en una semana.</p>' },
    { q: '¿Cuánto cuesta?', a: '<p>Depende de cuántas páginas y funciones necesites. Tras la primera reunión te damos un precio cerrado por escrito, sin extras escondidos. Si lo necesitas, se puede pagar en dos partes: al empezar y al publicar.</p>' },
    { q: '¿Necesito tener logotipo?', a: '<p>No es imprescindible para empezar. Si no lo tienes, podemos <a href="/diseno-grafico/">diseñar tu identidad</a> a la vez que la web.</p>' },
    { q: '¿Podré cambiar cosas yo?', a: '<p>Sí. Te formamos para cambiar textos y fotos y te dejamos un manual. Si prefieres no tocarla, existe el <a href="/soporte/">mantenimiento</a>.</p>' },
    { q: '¿Y si mi negocio cambia en unos meses?', a: '<p>Es lo normal al empezar. La web se diseña para crecer: añadir servicios, un blog o una tienda más adelante no obliga a rehacerla.</p>' },
  ],
  relacionados: ['grafico', 'marketing', 'soporte'],
};

export const empresa: ContenidoServicio = {
  ruta: '/soluciones/empresa/',
  nombre: 'Web para empresas',
  tipo: 'Diseño web corporativo',
  servicioContacto: 'web',
  escena: 'web',
  migas: [{ nombre: 'Web para empresas' }],
  seo: {
    title: 'Diseño web corporativo para empresas en Almería',
    description: 'Webs corporativas con auditoría técnica previa, accesibilidad, RGPD, varios idiomas e integración con tu CRM o ERP. Presupuesto cerrado y pago por hitos.',
  },
  portada: {
    antetitulo: 'Para empresas',
    h1: 'Una web corporativa a la altura <span class="subrayado">de tu empresa</span>',
    entradilla: 'Empezamos por una auditoría técnica gratuita de lo que tienes. Después diseñamos y construimos con aprobaciones por fases, presupuesto cerrado y la documentación que pida tu dirección.',
    puntos: ['Auditoría técnica gratuita antes de proponer nada', 'Accesibilidad, RGPD y seguridad desde el diseño', 'Integración con tu CRM, ERP o reservas'],
  },
  paraQuien: {
    titulo: 'Para empresas donde la web no puede fallar',
    perfiles: [
      { icono: 'maletin', t: 'Despachos y consultoras', d: 'Autoridad, especialidades claras y formularios que filtran consultas.' },
      { icono: 'fabrica', t: 'Industria y distribución', d: 'Catálogos técnicos, áreas de cliente y versiones para exportar.' },
      { icono: 'salud', t: 'Sanidad', d: 'Confianza, cita previa y textos legales que cumplen con datos sensibles.' },
      { icono: 'sol', t: 'Turismo y hoteles', d: 'Reservas directas, varios idiomas y conexión con tu motor de reservas.' },
    ],
  },
  incluye: {
    titulo: 'Seis pilares de una web corporativa sólida',
    items: [
      { icono: 'rayo', t: 'Rendimiento', d: 'Core Web Vitals en verde, SEO técnico y estructura pensada para posicionar.' },
      { icono: 'pincel', t: 'Diseño e identidad', d: 'Tu marca aplicada con criterio: tipografía, color, fotografía y tono.' },
      { icono: 'capas', t: 'Arquitectura', d: 'Contenidos ordenados para que cada visitante encuentre lo suyo en dos clics.' },
      { icono: 'codigo', t: 'Integraciones', d: 'CRM, ERP, email marketing o reservas: casi todo lo que tiene API se puede conectar.' },
      { icono: 'escudo', t: 'Seguridad y legal', d: 'RGPD, cabeceras de seguridad, SSL, copias y accesibilidad WCAG 2.2 AA.' },
      { icono: 'globo', t: 'Varios idiomas', d: 'Versiones traducidas con su propio SEO para cada mercado.' },
    ],
  },
  guia: {
    antetitulo: 'Auditoría técnica gratuita',
    titulo: 'Lo que revisamos de tu web actual antes de proponer nada',
    entradilla: 'Recibes un informe y una llamada para explicártelo. Sin compromiso: si tu web no necesita rehacerse, te lo diremos.',
    bloques: [
      { t: 'Rendimiento', d: 'Core Web Vitals, peso de imágenes y recursos, y tiempos de carga reales en móvil.' },
      { t: 'SEO técnico', d: 'Indexación, datos estructurados, metaetiquetas, enlaces rotos y estado en Search Console.' },
      { t: 'Accesibilidad', d: 'Contraste, uso con teclado y estructura semántica según WCAG 2.2.' },
      { t: 'Cumplimiento', d: 'Cookies, políticas, aviso legal, SSL y cabeceras de seguridad.' },
      { t: 'Conversión', d: 'Si los formularios funcionan y si queda claro qué hacer en cada página.' },
    ],
  },
  pasos: {
    titulo: 'Fases con aprobación en cada una',
    items: [
      { t: 'Briefing y auditoría', d: 'Objetivos, públicos e indicadores, y el estado técnico de la web actual.', cuando: 'Semana 1' },
      { t: 'Arquitectura', d: 'Mapa de contenidos y esquemas de página para aprobar antes de diseñar.', cuando: 'Semana 2' },
      { t: 'Diseño', d: 'Diseños de las páginas clave con dos rondas de revisión.', cuando: 'Semanas 3-4' },
      { t: 'Desarrollo y lanzamiento', d: 'Entorno de pruebas, integraciones, contenidos, formación y publicación.', cuando: 'Semanas 4-8' },
    ],
  },
  casos: ['metales-sureste', 'murcia-production', 'clinica-koral'],
  preguntas: [
    { q: '¿Qué tecnología usáis?', a: '<p>La que mejor encaja: WordPress si vais a publicar mucho o necesitáis un panel conocido; Astro para webs rápidas y seguras con poco mantenimiento. Lo justificamos en la propuesta.</p>' },
    { q: '¿Trabajáis con procesos corporativos?', a: '<p>Sí: varios interlocutores (dirección, marketing, legal, IT), aprobación documentada en cada fase, acuerdo de confidencialidad si lo necesitáis y facturación por hitos.</p>' },
    { q: '¿Con qué CRM o ERP podéis integrar?', a: '<p>Hemos trabajado con HubSpot, Pipedrive, Zoho, Holded y A3, entre otros. Si vuestra herramienta tiene API, casi siempre se puede conectar. Lo confirmamos en la auditoría.</p>' },
    { q: '¿Es un presupuesto cerrado?', a: '<p>Sí. Precio fijo por escrito antes de empezar. Lo que se salga del alcance se presupuesta aparte y solo se hace con vuestra aprobación.</p>' },
    { q: '¿Cuánto tarda?', a: '<p>Entre cuatro y catorce semanas según el tamaño, los idiomas y las integraciones. Lo que más influye es la rapidez de las aprobaciones internas; os damos un calendario desde el principio.</p>' },
  ],
  relacionados: ['marketing', 'informatica', 'soporte'],
};
