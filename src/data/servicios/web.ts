import type { ContenidoServicio } from './tipos';

export const web: ContenidoServicio = {
  ruta: '/desarrollo-web/',
  nombre: 'Diseño web',
  tipo: 'Diseño y desarrollo web',
  servicioContacto: 'web',
  escena: 'web',
  seo: {
    title: 'Diseño y desarrollo web en Almería',
    description: 'Webs a medida que cargan rápido, salen en Google y convierten visitas en llamadas. Código y dominio a tu nombre, sin permanencia. Estudio en Vera (Almería).',
  },
  portada: {
    antetitulo: 'Diseño y desarrollo web',
    h1: 'Una web que trabaja para tu negocio, <span class="subrayado">no al revés</span>',
    entradilla: 'Diseñamos y programamos webs a medida para negocios de Almería: rápidas en el móvil, claras para tus clientes y preparadas para posicionar en Google desde el primer día.',
    puntos: [
      'Diseño a medida, sin plantillas compradas',
      'Pensada para cargar en menos de 2,5 s en un móvil',
      'Código, dominio y contenidos a tu nombre',
    ],
  },
  paraQuien: {
    titulo: 'Cada negocio necesita que su web haga una cosa distinta',
    entradilla: 'Antes de diseñar nada decidimos qué tiene que pasar cuando alguien entra: que llame, que reserve, que pida presupuesto o que compre.',
    perfiles: [
      { icono: 'restaurante', t: 'Hostelería y turismo', d: 'Reservas directas sin pagar comisión a portales, carta actualizada y la web en los idiomas de tus clientes.' },
      { icono: 'casa', t: 'Inmobiliarias y reformas', d: 'Fichas de inmuebles o de obras con buenas fotos, filtros que funcionan y formularios que llegan al móvil.' },
      { icono: 'salud', t: 'Clínicas y despachos', d: 'Confianza a primera vista: equipo, especialidades, opiniones y cita previa en dos toques.' },
      { icono: 'fabrica', t: 'Industria y agricultura', d: 'Catálogos técnicos, fichas para distribuidores y versiones en inglés, francés o alemán para exportar.' },
    ],
  },
  incluye: {
    titulo: 'Todo lo necesario para que la web funcione desde el primer día',
    entradilla: 'No entregamos una web y desaparecemos: la dejamos medida, posicionada y en tus manos.',
    items: [
      { icono: 'pincel', t: 'Diseño a medida', d: 'Partimos de tu negocio, no de una plantilla. Ves y apruebas el diseño antes de que escribamos una línea de código.' },
      { icono: 'movil', t: 'Primero el móvil', d: 'Más de la mitad de tus visitas llegan desde un teléfono. Diseñamos para esa pantalla y después la adaptamos al ordenador.' },
      { icono: 'rayo', t: 'Velocidad real', d: 'Imágenes ligeras, código mínimo y alojamiento en red global. El objetivo es pasar las Core Web Vitals de Google en verde.' },
      { icono: 'buscar', t: 'SEO técnico de base', d: 'Estructura de títulos, datos estructurados, sitemap, Search Console y una página por cada servicio que ofreces.' },
      { icono: 'documento', t: 'Textos que venden', d: 'Te ayudamos a escribir qué haces, para quién y por qué elegirte. Sin relleno: frases que responden lo que tu cliente pregunta.' },
      { icono: 'escudo', t: 'Legal y accesible', d: 'Aviso legal, privacidad, cookies y formularios conformes al RGPD y la LSSI, con criterios de accesibilidad WCAG.' },
      { icono: 'grafica', t: 'Medición', d: 'Sabes cuántas llamadas, formularios y WhatsApp te llegan desde la web, para decidir con datos.' },
      { icono: 'llave', t: 'Todo es tuyo', d: 'Dominio a tu nombre, acceso completo y el código entregado. Si un día te vas, te lo llevas todo.' },
    ],
  },
  guia: {
    antetitulo: 'Antes de pedir presupuesto',
    titulo: 'Cinco preguntas que deberías hacer a cualquier diseñador web',
    entradilla: 'Valen para nosotros y para cualquiera. Las respuestas te dicen más que el portafolio.',
    bloques: [
      { t: '¿A nombre de quién estará el dominio?', d: 'Debe ser el tuyo. Si el dominio está a nombre de la agencia, cambiar de proveedor se convierte en una negociación.' },
      { t: '¿Qué pasa si quiero irme?', d: 'La respuesta buena es «te entregamos todo». Desconfía de permanencias largas o de webs que solo funcionan en el servidor del proveedor.' },
      { t: '¿Cuánto tarda en cargar en un móvil?', d: 'Pide que te enseñen un trabajo suyo en <a href="https://pagespeed.web.dev/" rel="noopener" target="_blank">PageSpeed Insights</a>. Si el LCP pasa de 2,5 segundos, Google ya lo considera lento.' },
      { t: '¿Quién escribe los textos?', d: 'Una web bonita con textos genéricos no convierte. Pregunta si te ayudan a escribirlos o si te tocará a ti rellenar huecos.' },
      { t: '¿Qué cuesta mantenerla cada año?', d: 'Dominio, alojamiento, licencias y actualizaciones. Que te lo digan por escrito antes de empezar evita sorpresas el segundo año.' },
    ],
  },
  comparativa: {
    titulo: 'Web a medida o plantilla: qué cambia de verdad',
    entradilla: 'Una plantilla puede servir para empezar. Estas son las diferencias que notarás con el tiempo.',
    columnas: ['Web a medida', 'Plantilla genérica'],
    filas: [
      { aspecto: 'Velocidad en móvil', nosotros: 'Solo el código que tu web necesita', otros: 'Carga funciones que nunca usarás' },
      { aspecto: 'Diseño', nosotros: 'Pensado para tu negocio y tu cliente', otros: 'El mismo que miles de webs' },
      { aspecto: 'Posicionamiento', nosotros: 'Una página por servicio y por zona', otros: 'Lo que permita la plantilla' },
      { aspecto: 'Seguridad', nosotros: 'Pocas piezas, pocas puertas abiertas', otros: 'Depende de plugins de terceros' },
      { aspecto: 'Propiedad', nosotros: 'Código y dominio a tu nombre', otros: 'A veces ligada a la plataforma' },
    ],
  },
  pasos: {
    titulo: 'De la primera llamada a la web publicada',
    items: [
      { t: 'Análisis', d: 'Entendemos tu negocio, tu competencia y qué tiene que conseguir la web. Te lo devolvemos por escrito.', cuando: '2-3 días' },
      { t: 'Diseño', d: 'Prototipo navegable de las páginas clave. Lo revisas, lo ajustamos y lo apruebas.', cuando: '1 semana' },
      { t: 'Desarrollo', d: 'Programamos y cargamos contenidos en un entorno de pruebas donde ves el avance.', cuando: '1-2 semanas' },
      { t: 'Lanzamiento', d: 'Publicamos, configuramos Search Console y tu ficha de Google y te enseñamos a usarla.', cuando: '1-2 días' },
    ],
  },
  casos: ['clinica-koral', 'taller-el-pinon', 'excavaciones-tripiana', 'metales-sureste', 'juan-alcaraz', 'murcia-production'],
  enlaces: {
    titulo: 'Más sobre diseño web',
    items: [
      { nombre: 'Gestión de puerto deportivo', href: 'https://puerto.platanitorico.com/', d: 'Demo real: amarres, área de cliente y panel de capitanía' },
      { nombre: 'Tiendas online', href: '/soluciones/ecommerce/', d: 'Si además quieres vender por internet' },
      { nombre: 'Diseño web por municipio', href: '/diseno-web/', d: 'Lo que hacemos en tu pueblo' },
      { nombre: 'Astro, Next.js o SvelteKit', href: '/blog/astro-vs-nextjs-vs-sveltekit-2026/', d: 'Qué tecnología elegir en 2026' },
      { nombre: 'Guía honesta de hosting', href: '/blog/hosting-web-2026-guia-brutal/', d: 'Dónde alojar tu web y por qué' },
      { nombre: '10 señales de que toca rediseñar', href: '/blog/cuando-redisenar-pagina-web-10-senales-claras/', d: 'Para saber si la tuya ya no da más' },
    ],
  },
  preguntas: [
    { q: '¿Cuánto cuesta una web a medida?', a: '<p>Depende de cuántas páginas tenga, de si vende online y de qué tenga que conectar. Tras una llamada de media hora te enviamos una propuesta cerrada por escrito, con plazo y entregables, sin compromiso.</p>' },
    { q: '¿Cuánto tarda?', a: '<p>Una landing, una semana. Una web corporativa, entre dos y cuatro. Una tienda o una aplicación a medida, más. El plazo concreto va en la propuesta.</p>' },
    { q: '¿Puedo cambiar los textos yo?', a: '<p>Sí. Según el proyecto montamos un panel sencillo para editar textos, fotos y entradas del blog, y te enseñamos a usarlo. Si prefieres no tocarlo, lo hacemos nosotros con el <a href="/soporte/">mantenimiento</a>.</p>' },
    { q: '¿Usáis WordPress?', a: '<p>Cuando tiene sentido, sí: por ejemplo, si vas a publicar mucho o ya lo conoces. Para webs de servicios solemos usar Astro, que genera páginas estáticas: más rápidas, más seguras y más baratas de alojar.</p>' },
    { q: '¿La web estará optimizada para Google?', a: '<p>Sale con el SEO técnico resuelto: estructura, velocidad, datos estructurados, sitemap y Search Console. El posicionamiento sostenido depende además del contenido y de tu ficha de Google, y en eso te ayudamos con <a href="/marketing/">marketing y SEO</a>.</p>' },
    { q: '¿Y si ya tengo web?', a: '<p>La revisamos primero. A veces basta con arreglar velocidad, textos y estructura; otras conviene rehacerla. Te decimos qué opción te compensa y por qué.</p>' },
  ],
  relacionados: ['tienda', 'marketing', 'soporte'],
};
