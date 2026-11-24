import type { ContenidoServicio } from './tipos';

export const tienda: ContenidoServicio = {
  ruta: '/soluciones/ecommerce/',
  nombre: 'Tiendas online',
  tipo: 'Desarrollo de tiendas online',
  servicioContacto: 'tienda',
  escena: 'tienda',
  migas: [{ nombre: 'Tiendas online' }],
  seo: {
    title: 'Tienda online en Almería: WooCommerce sin comisión por venta',
    description: 'Creamos tu tienda online con WooCommerce: sin comisión por venta, con Stripe, Bizum, Redsys y PayPal, envíos configurados y lista para VERIFACTU. Tienda 100 % tuya.',
  },
  portada: {
    antetitulo: 'Tiendas online',
    h1: 'Vende por internet sin <span class="subrayado">regalar margen</span> en cada venta',
    entradilla: 'Montamos tiendas con WooCommerce: sin cuota de plataforma ni comisión por pedido, con los pagos y los envíos que usan tus clientes y preparada para crecer contigo.',
    puntos: [
      'Sin comisión por venta: solo pagas lo que cobra cada pasarela',
      'Bizum, tarjeta, Redsys, PayPal y transferencia',
      'La tienda, los datos y los clientes son tuyos',
    ],
  },
  paraQuien: {
    titulo: 'Para quien ya vende y quiere hacerlo también en internet',
    perfiles: [
      { icono: 'tienda', t: 'Comercio local', d: 'Llevas años vendiendo en tienda física y quieres llegar a clientes de fuera sin abrir otro local.' },
      { icono: 'hoja', t: 'Productores', d: 'Aceite, vino, conservas o artesanía: vende directo al cliente final y quédate con el margen del intermediario.' },
      { icono: 'maletin', t: 'Venta a profesionales', d: 'Catálogo con precios por cliente, pedidos mínimos y facturación para distribuidores y tiendas.' },
    ],
  },
  incluye: {
    titulo: 'Una tienda lista para recibir el primer pedido',
    items: [
      { icono: 'carrito', t: 'Catálogo y fichas', d: 'Categorías, variantes de talla o color, stock y fichas de producto pensadas para resolver dudas antes de comprar.' },
      { icono: 'llave', t: 'Pagos configurados', d: 'Stripe con Apple Pay y Google Pay, Bizum, TPV de tu banco con Redsys, PayPal, transferencia o contra reembolso.' },
      { icono: 'ruta', t: 'Envíos automáticos', d: 'Correos, SEUR, GLS o MRW, recogida en tienda y envío gratis a partir del importe que decidas. Etiquetas y seguimiento.' },
      { icono: 'documento', t: 'Facturación', d: 'Facturas automáticas y preparada para VERIFACTU, la facturación verificable que exige Hacienda.' },
      { icono: 'grafica', t: 'Recuperar ventas', d: 'Recordatorios de carrito abandonado, productos relacionados, cupones y opiniones de clientes.' },
      { icono: 'buscar', t: 'SEO de producto', d: 'URLs limpias, datos estructurados de producto y alta en Google Merchant Center para salir en Shopping.' },
      { icono: 'movil', t: 'Gestión desde el móvil', d: 'Ves y preparas pedidos desde la app de WooCommerce, estés donde estés.' },
      { icono: 'usuario', t: 'Formación', d: 'Te enseñamos a subir productos, gestionar pedidos y crear ofertas. Con manual para consultar después.' },
    ],
  },
  guia: {
    antetitulo: 'Antes de abrir tu tienda',
    titulo: 'Lo que nadie te cuenta sobre vender online',
    entradilla: 'La plataforma importa menos de lo que parece. Esto es lo que decide si una tienda vende.',
    bloques: [
      { t: 'Calcula el margen con todo dentro', d: 'Precio de venta menos coste, envío, embalaje, comisión de la pasarela y devoluciones. Si no sale rentable en una hoja de cálculo, no saldrá en la tienda.' },
      { t: 'Las fotos venden más que el diseño', d: 'Fondo limpio, varias vistas, una foto en uso y el tamaño a la vista. Una ficha sin buenas fotos no convierte por bonita que sea la web.' },
      { t: 'El envío es parte del producto', d: 'Gastos claros desde la ficha, plazo realista y devoluciones sencillas. Es la causa más habitual de carritos abandonados.' },
      { t: 'Bizum no es un extra', d: 'En España muchos compradores lo prefieren a la tarjeta. Ofrecerlo desde el primer día quita fricción en el móvil.' },
      { t: 'Una tienda no se llena sola', d: 'Abrirla es el principio. Necesita Google Shopping, redes, email o anuncios. Planifica cómo vas a llevar visitas antes de lanzar.' },
    ],
  },
  comparativa: {
    titulo: 'WooCommerce o Shopify: una comparación honesta',
    entradilla: 'Shopify es más sencillo para validar una idea en una semana. Para un negocio que quiere quedarse, esto es lo que cambia.',
    columnas: ['WooCommerce', 'Shopify'],
    filas: [
      { aspecto: 'Comisión por venta', nosotros: 'Ninguna de la plataforma', otros: 'Comisión si no usas su pasarela' },
      { aspecto: 'Cuota mensual', nosotros: 'Solo el alojamiento', otros: 'Cuota de plan cada mes, más apps' },
      { aspecto: 'Propiedad', nosotros: 'Tienda y datos en tu servidor', otros: 'En los servidores de Shopify' },
      { aspecto: 'Pasarelas españolas', nosotros: 'Redsys, Bizum y cualquier banco', otros: 'Más limitado' },
      { aspecto: 'Personalización', nosotros: 'Total', otros: 'Dentro de lo que permite el tema' },
      { aspecto: 'Empezar', nosotros: 'Necesita configuración (la hacemos)', otros: 'Más fácil para empezar solo' },
    ],
  },
  pasos: {
    titulo: 'De la idea al primer pedido',
    items: [
      { t: 'Estrategia', d: 'Productos, márgenes, público y competencia. Decidimos qué vender primero y cómo.', cuando: 'Semana 1' },
      { t: 'Diseño', d: 'Portada, ficha de producto y proceso de compra. Lo apruebas antes de programar.', cuando: 'Semana 2' },
      { t: 'Montaje y catálogo', d: 'Pagos, envíos, impuestos y carga de productos. Te enseñamos a hacerlo tú.', cuando: 'Semanas 3-5' },
      { t: 'Apertura', d: 'Pruebas de compra reales, Search Console, Merchant Center y lanzamiento.', cuando: 'Semana 6' },
    ],
  },
  casos: ['oveja-bohemia', 'ysy'],
  enlaces: {
    titulo: 'Para seguir leyendo',
    items: [
      { nombre: 'Guía de VERIFACTU', href: '/blog/facturacion-verifactu-2027-guia-completa/', d: 'Qué cambia en la facturación y cuándo' },
      { nombre: 'Guía legal de tu web', href: '/blog/guia-legal-web-lopd-lssi-2026/', d: 'RGPD, LSSI y condiciones de venta' },
      { nombre: 'Marketing para tu tienda', href: '/marketing/', d: 'Google Shopping, anuncios y SEO' },
    ],
  },
  preguntas: [
    { q: '¿Por qué WooCommerce y no Shopify o PrestaShop?', a: '<p>Porque la tienda es tuya, no paga comisión de plataforma por venta y se adapta a pasarelas españolas como Redsys o Bizum. Shopify es más sencillo para empezar solo; PrestaShop es más pesado de mantener. Si tu caso encaja mejor en otra plataforma, te lo diremos.</p>' },
    { q: '¿Cuánto tarda en estar lista?', a: '<p>Entre tres y diez semanas según el número de productos y funciones. Lo que más influye es tener listo el catálogo: fotos, textos y precios.</p>' },
    { q: '¿Necesito saber WordPress?', a: '<p>No. En una sesión de formación aprendes a subir productos, ver pedidos, hacer facturas y crear ofertas, y te dejamos un manual.</p>' },
    { q: '¿Qué comisiones voy a pagar?', a: '<p>Solo las de la pasarela que use cada cliente (Stripe, tu banco con Redsys, PayPal…). Nosotros no cobramos nada por venta y WooCommerce tampoco.</p>' },
    { q: '¿Puedo pasar mi tienda actual a WooCommerce?', a: '<p>Sí. Importamos productos, clientes y pedidos desde Shopify, PrestaShop, Amazon o una hoja de Excel, y configuramos redirecciones para no perder posicionamiento.</p>' },
    { q: '¿Está preparada para VERIFACTU?', a: '<p>Sí: instalamos y configuramos un sistema de facturación compatible. Te explicamos los plazos en nuestra <a href="/blog/facturacion-verifactu-2027-guia-completa/">guía de VERIFACTU</a>.</p>' },
  ],
  relacionados: ['marketing', 'grafico', 'soporte'],
};
