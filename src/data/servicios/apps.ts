import type { ContenidoServicio } from './tipos';

export const apps: ContenidoServicio = {
  ruta: '/desarrollo-aplicaciones-moviles/',
  nombre: 'Apps móviles',
  tipo: 'Desarrollo de aplicaciones móviles',
  servicioContacto: 'apps',
  escena: 'apps',
  migas: [{ nombre: 'Aplicaciones móviles' }],
  seo: {
    title: 'Desarrollo de aplicaciones móviles en Almería',
    description: 'Apps para equipos de campo que trabajan sin cobertura, apps para clientes y aplicaciones web instalables. Con el servidor y la publicación en tiendas incluidos.',
  },
  portada: {
    antetitulo: 'Aplicaciones móviles',
    h1: 'Apps para gente <span class="subrayado">que se mueve</span>',
    entradilla: 'La primera pregunta no es con qué se programa, sino si hace falta una app. Muchas veces basta con una web instalable. Cuando de verdad hace falta (cámara, avisos o trabajar sin cobertura), la hacemos.',
    puntos: [
      'Una sola app para Android y iPhone',
      'Funciona sin cobertura y sincroniza después',
      'Cuentas de las tiendas a nombre de tu empresa',
    ],
  },
  paraQuien: {
    titulo: 'Cómo nos llegan los encargos',
    entradilla: 'Descritos por lo que hace hoy tu equipo, no por la tecnología que querrías.',
    perfiles: [
      { icono: 'documento', t: '«Los partes van en papel»', d: 'El equipo de campo apunta y alguien lo pasa después. Una app que funcione sin cobertura hace que el dato entre una sola vez.' },
      { icono: 'usuario', t: '«Quiero que mis clientes lo vean en el móvil»', d: 'Primero valoramos una web instalable: sin tiendas, sin revisiones y con actualizaciones al momento.' },
      { icono: 'llave', t: '«Tenemos una app que nadie mantiene»', d: 'Revisamos si compensa actualizarla o rehacerla. Las tiendas retiran las apps que no se adaptan a sus nuevos requisitos.' },
    ],
  },
  incluye: {
    titulo: 'Lo que desarrollamos',
    items: [
      { icono: 'ruta', t: 'Apps de trabajo de campo', d: 'Partes, inspecciones, fotos y firmas desde el móvil, también donde no hay cobertura.' },
      { icono: 'globo', t: 'Aplicaciones web instalables', d: 'Se instalan desde el navegador, sin pasar por las tiendas, y se actualizan al momento.' },
      { icono: 'movil', t: 'Apps para clientes', d: 'Consulta de pedidos, citas, avisos y gestiones desde su teléfono.' },
      { icono: 'servidor', t: 'Servidor y API', d: 'La parte que no se ve: datos, usuarios, permisos y conexión con tus sistemas.' },
      { icono: 'check', t: 'Publicación', d: 'Subida a App Store y Google Play, con las cuentas a nombre de tu empresa.' },
      { icono: 'capas', t: 'Mantenimiento', d: 'Adaptación a nuevas versiones de Android e iOS y a los requisitos de las tiendas.' },
    ],
  },
  guia: {
    antetitulo: 'Antes de encargar una app',
    titulo: '¿App o web instalable? Cuatro preguntas para decidir',
    entradilla: 'Una app publicada es un compromiso que no acaba el día de la entrega. Por eso empezamos por aquí.',
    bloques: [
      { t: '¿Necesita la cámara o sensores del teléfono?', d: 'Escanear códigos, hacer fotos con datos o usar el GPS en segundo plano suelen pedir app nativa.' },
      { t: '¿Tiene que funcionar sin cobertura?', d: 'En cantera, invernadero o en el barco. Una web instalable puede guardar datos, pero una app lo hace con más fiabilidad.' },
      { t: '¿Necesitas enviar avisos?', d: 'Las notificaciones funcionan en ambas, pero en iPhone son más fiables desde una app.' },
      { t: '¿Quién la va a mantener?', d: 'Las tiendas cambian requisitos cada año. Si nadie la va a actualizar, una web instalable te ahorra problemas.' },
    ],
  },
  preguntas: [
    { q: '¿Necesito una app o me vale una web?', a: '<p>Si no hace falta cámara, avisos ni trabajar sin cobertura, normalmente vale una web instalable: te ahorras el proceso de las tiendas y se actualiza al momento.</p>' },
    { q: '¿Hay que hacer dos apps, una para Android y otra para iPhone?', a: '<p>No necesariamente. Hacemos una sola que funciona en ambos, salvo que necesites funciones muy específicas de un sistema.</p>' },
    { q: '¿Quién publica la app en las tiendas?', a: '<p>Nosotros, pero las cuentas de desarrollador van a nombre de tu empresa. Así la app es tuya y no depende de nadie.</p>' },
    { q: '¿Se conecta con mi programa de gestión?', a: '<p>Normalmente sí, a través de su API o de una base de datos intermedia. Lo revisamos antes de presupuestar.</p>' },
  ],
  enlaces: {
    titulo: 'Tecnologías relacionadas',
    items: [
      { nombre: 'Desarrollo con React', href: '/programador-web/react/', d: 'Interfaces y aplicaciones web' },
      { nombre: 'Desarrollo con Node.js', href: '/programador-web/nodejs/', d: 'Servidores y API' },
      { nombre: 'Programador web en Almería', href: '/programador-web/', d: 'El resto de tecnologías' },
    ],
  },
  relacionados: ['programador', 'web', 'ia'],
};
