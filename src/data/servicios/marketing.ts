import type { ContenidoServicio } from './tipos';

export const marketing: ContenidoServicio = {
  ruta: '/marketing/',
  nombre: 'Marketing y SEO',
  tipo: 'Marketing digital y SEO',
  servicioContacto: 'marketing',
  escena: 'marketing',
  seo: {
    title: 'Agencia de marketing digital y SEO en Almería',
    description: 'SEO local, Google Ads, Meta Ads y email medidos en clientes, no en visitas. Cuentas a tu nombre, sin permanencia y con auditoría gratuita para empezar.',
  },
  portada: {
    antetitulo: 'Marketing digital y SEO',
    h1: 'Medimos clientes, <span class="subrayado">no visitas</span>',
    entradilla: 'SEO, Google Ads, Meta Ads y email para negocios de Almería. Todo medido hasta la venta, con las cuentas a tu nombre y sin informes de ochenta diapositivas.',
    puntos: [
      'Empezamos con una auditoría gratuita de lo que ya tienes',
      'Cuentas de Google, Meta y Analytics a tu nombre',
      'Sin permanencia: te quedas si funciona',
    ],
  },
  paraQuien: {
    titulo: 'Encajamos si puedes atender a los clientes que lleguen',
    entradilla: 'No somos para todo el mundo, y preferimos decirlo antes. Trabajamos bien con negocios que:',
    perfiles: [
      { icono: 'equipo', t: 'Tienen capacidad', d: 'Pueden atender más clientes. Traer sesenta contactos cuando solo puedes atender veinte es quemar dinero.' },
      { icono: 'grafica', t: 'Quieren medir', d: 'Comparten datos de ventas aunque incomoden. Sin ese dato no se puede optimizar hacia lo que importa.' },
      { icono: 'calendario', t: 'Entienden el ritmo', d: 'Saben que el primer mes se aprende y que el SEO tarda meses. No buscan milagros en dos semanas.' },
    ],
  },
  incluye: {
    titulo: 'Cuatro palancas, una sola estrategia',
    entradilla: 'No hace falta activarlas todas. Empezamos por la que antes te pueda traer clientes y sumamos el resto cuando haya datos.',
    items: [
      { icono: 'buscar', t: 'SEO y SEO local', d: 'Auditoría técnica, palabras clave, contenidos, ficha de Google Business y reseñas. Para aparecer en búsquedas y en el mapa.' },
      { icono: 'rayo', t: 'Google y Meta Ads', d: 'Búsqueda, Shopping, Instagram y Facebook, con conversiones bien medidas, exclusiones y remarketing.' },
      { icono: 'conversacion', t: 'Redes sociales', d: 'Estrategia, calendario y piezas que tienen un objetivo, no solo publicar por publicar.' },
      { icono: 'email', t: 'Email y automatización', d: 'Bienvenida, carrito abandonado y reactivación de clientes. El canal más rentable que casi nadie usa bien.' },
      { icono: 'grafica', t: 'Medición de verdad', d: 'Formularios, llamadas, WhatsApp, reservas y ventas cerradas. Un panel abierto, no un PDF a final de mes.' },
      { icono: 'documento', t: 'Todo documentado', d: 'Qué cambiamos, por qué y cómo deshacerlo. La inversión en anuncios siempre a la vista, sin margen escondido.' },
    ],
  },
  guia: {
    antetitulo: 'Lo que vemos en casi todas las auditorías',
    titulo: 'Siete fugas por las que se escapa tu inversión',
    entradilla: 'Revisa si te pasa alguna. Arreglarlas no cuesta más presupuesto y suele mejorar los resultados más que cualquier campaña nueva.',
    bloques: [
      { t: 'Conversiones duplicadas o mal configuradas', d: 'Las campañas optimizan hacia un dato falso. Es el error más caro y el más común.' },
      { t: 'Todo el tráfico va a la portada', d: 'Cada anuncio debería llevar a una página que responda exactamente a lo que se buscó.' },
      { t: 'Campañas sin palabras negativas', d: 'Pagas por búsquedas de gente que nunca iba a comprarte: «gratis», «curso», «empleo»…' },
      { t: 'Formularios que fallan en el móvil', d: 'Rellena el tuyo desde un teléfono. Si cuesta, una parte de tus contactos se queda por el camino.' },
      { t: 'Contactos que nadie registra', d: 'Llegan al correo o al WhatsApp y se pierden. Sin registro no sabes qué canal trae ventas.' },
      { t: 'Responder al día siguiente', d: 'La probabilidad de cerrar cae en picado tras la primera hora. Aquí se pierde la mayoría de las oportunidades.' },
      { t: 'Datos distintos en Google, web y directorios', d: 'Nombre, dirección y teléfono deben coincidir en todas partes. Si no, el SEO local se resiente.' },
    ],
  },
  comparativa: {
    titulo: '¿SEO o Google Ads? Depende de si puedes esperar',
    entradilla: 'Lo habitual es empezar con anuncios para facturar mientras el SEO madura, y después equilibrar.',
    columnas: ['SEO', 'Google Ads'],
    filas: [
      { aspecto: 'Primeros resultados', nosotros: 'Meses', otros: 'Días' },
      { aspecto: 'Si dejas de invertir', nosotros: 'El tráfico se mantiene un tiempo', otros: 'Se apaga al momento' },
      { aspecto: 'Coste por visita', nosotros: 'Baja con el tiempo', otros: 'Se mantiene o sube' },
      { aspecto: 'Control del volumen', nosotros: 'Poco', otros: 'Total' },
      { aspecto: 'Cuándo elegirlo', nosotros: 'Puedes esperar y quieres un activo propio', otros: 'Necesitas clientes este mes' },
    ],
  },
  pasos: {
    titulo: 'Cómo trabajamos tu marketing',
    items: [
      { t: 'Auditoría gratuita', d: 'Revisamos web, campañas, SEO y competencia. Diagnóstico por escrito con lo que funciona y lo que no.', cuando: '48 h' },
      { t: 'Estrategia', d: 'Plan adaptado a tu negocio y tus márgenes: qué canal primero, qué medir y qué esperar cada mes.', cuando: '1 semana' },
      { t: 'Ejecución', d: 'Campañas, SEO y contenidos con revisión semanal de términos, pujas y creatividades.', cuando: 'Continuo' },
      { t: 'Revisión mensual', d: 'Informe y reunión: qué ha pasado, por qué y qué decidimos para el mes siguiente.', cuando: 'Cada mes' },
    ],
  },
  casos: ['clinica-koral', 'metales-sureste', 'actualidad-almanzora'],
  enlaces: {
    titulo: 'Para empezar',
    items: [
      { nombre: 'Auditoría gratuita', href: '/marketing/auditoria/', d: 'Revisamos tu web y tu marketing en 48 horas' },
      { nombre: 'Marketing para clínicas dentales', href: '/blog/marketing-clinicas-dentales/', d: 'Un caso práctico por sector' },
      { nombre: 'Diseño web', href: '/desarrollo-web/', d: 'Si la web es el cuello de botella' },
    ],
  },
  preguntas: [
    { q: '¿Cuándo se ven resultados?', a: '<p>Con anuncios, desde la primera semana. Con SEO, los primeros movimientos llegan entre los dos y los cuatro meses y los resultados sólidos a partir del sexto. No garantizamos posiciones ni ventas: garantizamos cómo trabajamos.</p>' },
    { q: '¿Cuánto tengo que invertir en publicidad?', a: '<p>Depende de tu sector y tu zona: una campaña local en Almería necesita bastante menos que una tienda que vende a toda España. Lo calculamos contigo a partir de tu margen y del coste por cliente que te puedes permitir.</p>' },
    { q: '¿Puedo ver qué se hace con mi dinero?', a: '<p>Sí. Las cuentas son tuyas y tienes un panel abierto con inversión, contactos y coste por cliente de cada canal. La inversión en anuncios la pagas directamente a Google o Meta.</p>' },
    { q: '¿Hay permanencia?', a: '<p>No. Si te vas, te quedas con las cuentas, el histórico y todo lo que hemos creado.</p>' },
    { q: '¿Qué diferencia hay entre SEO y SEM?', a: '<p>El SEO trabaja los resultados orgánicos: tarda, pero dura. El SEM son anuncios de pago: inmediato, pero se apaga cuando dejas de pagar. Lo normal es combinarlos.</p>' },
    { q: '¿Cómo sé si mi marketing actual funciona?', a: '<p>Pide la <a href="/marketing/auditoria/">auditoría gratuita</a>: te decimos qué funciona, qué no y dónde se está yendo el dinero.</p>' },
  ],
  relacionados: ['web', 'grafico', 'audiovisual'],
  llamada: { titulo: 'Empieza con una auditoría gratuita de tu marketing', texto: 'Revisamos tu web, tus campañas y tu ficha de Google y te enviamos un diagnóstico por escrito en 48 horas. Sin compromiso.' },
};
