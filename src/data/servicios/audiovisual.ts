import type { ContenidoServicio } from './tipos';

export const audiovisual: ContenidoServicio = {
  ruta: '/audiovisual/',
  nombre: 'Vídeo y dron',
  tipo: 'Producción audiovisual y grabación con dron',
  servicioContacto: 'audiovisual',
  escena: 'audiovisual',
  seo: {
    title: 'Productora audiovisual y vídeo con dron en Almería',
    description: 'Vídeo corporativo, reels, fotografía aérea con dron 4K y tours virtuales 360° en toda la provincia de Almería. Permisos de vuelo gestionados y derechos para ti.',
  },
  portada: {
    antetitulo: 'Vídeo, foto y dron',
    h1: 'Enseña tu negocio <span class="subrayado">como se ve desde fuera</span>',
    entradilla: 'Grabamos vídeo corporativo, reels, producto y tomas aéreas con dron en toda la provincia de Almería, y lo entregamos listo para tu web, tus redes o la televisión.',
    puntos: [
      'Dron DJI Mavic 3 Pro con cámara Hasselblad: 4K y 5.1K',
      'Permisos de vuelo y seguro de responsabilidad civil gestionados',
      'Música con licencia comercial y todos los derechos para ti',
    ],
  },
  paraQuien: {
    titulo: 'Quién nos llama para grabar',
    perfiles: [
      { icono: 'casa', t: 'Inmobiliarias', d: 'Tomas aéreas de la parcela y el entorno, y tours 360° que filtran visitas antes de enseñar la casa.' },
      { icono: 'sol', t: 'Hoteles y hostelería', d: 'Vídeos para la web y reels que muestran la experiencia, no solo las habitaciones.' },
      { icono: 'fabrica', t: 'Construcción e industria', d: 'Seguimiento de obra, inspecciones visuales y documentación de proyectos desde el aire.' },
      { icono: 'hoja', t: 'Agricultura', d: 'Vistas de explotaciones, invernaderos y cultivos para presentaciones, ferias y clientes.' },
    ],
  },
  incluye: {
    titulo: 'Lo que grabamos',
    items: [
      { icono: 'camara', t: 'Vídeo corporativo', d: 'Dron y cámaras en tierra, guion, edición, color y música. Entregado en horizontal, vertical y cuadrado.' },
      { icono: 'rayo', t: 'Reels y vertical', d: 'Piezas cortas en 9:16 con subtítulos y ritmo pensado para que no se salten.' },
      { icono: 'globo', t: 'Tours virtuales 360°', d: 'Recorridos interactivos con puntos de información, integrables en tu web y compatibles con gafas VR.' },
      { icono: 'capas', t: 'Tomas aéreas', d: 'Planos de recurso en 4K o 5.1K para tu propio montaje, con corrección de color y entrega exprés.' },
      { icono: 'estrella', t: 'Vídeo de producto', d: 'Iluminación, slider motorizado y grafismo para enseñar el producto en detalle.' },
      { icono: 'chispa', t: 'Animación', d: 'Logotipos animados y vídeos explicativos en 2D o 3D con locución.' },
    ],
  },
  guia: {
    antetitulo: 'Antes de grabar',
    titulo: 'Cinco claves para que un vídeo de empresa funcione',
    entradilla: 'La cámara es lo de menos. Esto es lo que decide si alguien lo ve hasta el final.',
    bloques: [
      { t: 'Los tres primeros segundos deciden', d: 'Empieza por lo más llamativo, no por el logo. En redes, si no engancha al principio, nadie llega al final.' },
      { t: 'Piensa en vertical desde el rodaje', d: 'Si el vídeo va a Instagram o TikTok, hay que encuadrarlo para 9:16 al grabar, no recortarlo después.' },
      { t: 'El sonido importa más que la imagen', d: 'Se perdona una toma regular; un audio malo hace que se cierre el vídeo. Y subtitula: muchos lo ven sin sonido.' },
      { t: 'Graba para varios usos', d: 'De un rodaje bien planificado salen la pieza principal, varios reels y fotos para la web.' },
      { t: 'La luz manda la agenda', d: 'Las primeras y últimas horas del día dan la mejor imagen, sobre todo con dron. Planifica con la previsión a mano.' },
    ],
  },
  pasos: {
    titulo: 'Cuatro fases, de la idea al vídeo',
    items: [
      { t: 'Briefing creativo', d: 'Qué contar, a quién y dónde se va a ver. Sale el concepto y el estilo visual.', cuando: '1 día' },
      { t: 'Planificación', d: 'Localizaciones, permisos de vuelo, ventana de luz y previsión del tiempo.', cuando: '2-4 días' },
      { t: 'Rodaje', d: 'Dron y equipo en tierra. Si el tiempo no acompaña, reprogramamos sin coste.', cuando: '1-2 días' },
      { t: 'Postproducción', d: 'Edición, color, sonido y versiones para cada formato.', cuando: '1-2 semanas' },
    ],
  },
  casos: ['juan-alcaraz', 'murcia-production'],
  preguntas: [
    { q: '¿Hacen falta permisos para volar?', a: '<p>Depende de la zona y del tipo de vuelo. Nos encargamos nosotros de comprobarlo y tramitarlo, con seguro de responsabilidad civil. Tú no tienes que gestionar nada.</p>' },
    { q: '¿Se puede volar en cualquier sitio de Almería?', a: '<p>En casi toda la provincia. Hay restricciones cerca de aeropuertos, zonas militares y espacios naturales protegidos; lo valoramos caso por caso y, si hace falta, pedimos autorización.</p>' },
    { q: '¿Cuánto tarda la entrega?', a: '<p>Tomas aéreas sueltas, en 48 horas. Un vídeo corporativo completo, una o dos semanas. Un spot con preproducción, dos o tres. El plazo concreto va en la propuesta.</p>' },
    { q: '¿Puedo usar el vídeo donde quiera?', a: '<p>Sí. Entregamos versiones para web, redes y televisión, con música licenciada para uso comercial y todos los derechos de uso para ti.</p>' },
    { q: '¿Y si hace mal tiempo el día del rodaje?', a: '<p>Lo reprogramamos sin coste. Vigilamos la previsión los días anteriores y dejamos fechas alternativas acordadas.</p>' },
    { q: '¿Grabáis fuera de Almería?', a: '<p>Sí, en Andalucía y el resto de España. El desplazamiento se incluye en la propuesta.</p>' },
  ],
  relacionados: ['marketing', 'web', 'grafico'],
};
