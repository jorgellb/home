import type { ContenidoServicio } from './tipos';

export const grafico: ContenidoServicio = {
  ruta: '/diseno-grafico/',
  nombre: 'Diseño gráfico',
  tipo: 'Diseño gráfico e identidad corporativa',
  servicioContacto: 'grafico',
  escena: 'grafico',
  seo: {
    title: 'Diseño gráfico, logotipos y branding en Almería',
    description: 'Identidad corporativa, logotipos, packaging, rotulación y diseño editorial con criterio. Archivos editables para web e imprenta. Estudio en Vera (Almería).',
  },
  portada: {
    antetitulo: 'Diseño gráfico y branding',
    h1: 'Una marca que se reconoce <span class="subrayado">antes de leerla</span>',
    entradilla: 'Logotipos, identidad, packaging, rotulación y piezas impresas diseñadas como un sistema: igual de coherentes en una tarjeta, en una furgoneta o en Instagram.',
    puntos: [
      'Dos o tres rutas creativas para elegir',
      'Manual de uso con colores, tipografías y ejemplos',
      'Archivos editables y vectoriales, tuyos',
    ],
  },
  paraQuien: {
    titulo: 'Diseñamos para negocios que quieren parecer lo que son',
    perfiles: [
      { icono: 'restaurante', t: 'Hostelería', d: 'Identidad, carta, packaging para llevar y la señalética del local.' },
      { icono: 'hoja', t: 'Productores y cosmética', d: 'Etiquetas, cajas y envases que destacan en el lineal y cumplen la normativa.' },
      { icono: 'fabrica', t: 'Industria y B2B', d: 'Catálogos, fichas técnicas y presentaciones que ayudan a vender en ferias y visitas.' },
      { icono: 'casa', t: 'Inmobiliarias y reformas', d: 'Marca, dossiers, vallas y rotulación de vehículos y obras.' },
    ],
  },
  incluye: {
    titulo: 'Seis disciplinas, un mismo lenguaje',
    items: [
      { icono: 'estrella', t: 'Identidad corporativa', d: 'Logotipo, variantes, paleta, tipografías y manual de marca. También naming y rediseños.' },
      { icono: 'ubicacion', t: 'Señalética y exterior', d: 'Rotulación de vehículos, fachadas, rótulos y vallas, coordinados con el taller.' },
      { icono: 'documento', t: 'Editorial', d: 'Catálogos, revistas, dípticos y memorias maquetados para leerse bien.' },
      { icono: 'maletin', t: 'Papelería', d: 'Tarjetas, facturas, sobres, carpetas y kits de bienvenida.' },
      { icono: 'pantalla', t: 'Diseño digital', d: 'Creatividades para anuncios, banners, newsletters y plantillas de redes.' },
      { icono: 'capas', t: 'Packaging', d: 'Etiquetas, cajas y envases con troquel, preparados para la imprenta.' },
    ],
  },
  guia: {
    antetitulo: 'Antes de encargar un logo',
    titulo: 'Cinco pruebas que debe pasar cualquier logotipo',
    entradilla: 'Hazlas con el tuyo o con las propuestas que te presenten. Un buen logo no es el más bonito: es el que funciona en todas partes.',
    bloques: [
      { t: 'Se entiende a 16 píxeles', d: 'Míralo como icono de pestaña o foto de perfil. Si los detalles desaparecen, necesitas una versión reducida.' },
      { t: 'Funciona en una sola tinta', d: 'En negro sobre blanco y en blanco sobre negro, para sellos, grabados, bordados o un fax.' },
      { t: 'No depende de una moda', d: 'Degradados y efectos del año pasado envejecen rápido. La forma debe sostenerse sin ellos.' },
      { t: 'Se distingue de tu competencia', d: 'Ponlo junto a los logos de tres competidores. Si se confunde, no te diferencia.' },
      { t: 'Viene con instrucciones', d: 'Sin manual de uso, cada imprenta y cada diseñador lo aplicará a su manera y la marca se diluye.' },
    ],
  },
  pasos: {
    titulo: 'De cero a marca en dos o tres semanas',
    items: [
      { t: 'Briefing', d: 'Reunión para entender tu negocio, tu público y tu competencia. Sale una dirección creativa por escrito.', cuando: '1-2 días' },
      { t: 'Propuestas', d: 'Dos o tres rutas creativas aplicadas a ejemplos reales, con la explicación de cada una.', cuando: '1 semana' },
      { t: 'Refinamiento', d: 'Ajustamos color, tipografía y composición de la ruta elegida hasta aprobarla.', cuando: '3-5 días' },
      { t: 'Entrega', d: 'Archivos finales en todos los formatos y manual de uso de la marca.', cuando: '1 día' },
    ],
  },
  preguntas: [
    { q: '¿Cuánto tarda un logotipo?', a: '<p>Entre una y tres semanas según la complejidad y las rondas de revisión. Incluye investigación, dos o tres propuestas y el refinamiento de la elegida.</p>' },
    { q: '¿Qué incluye un manual de identidad?', a: '<p>Logotipo y variantes, paleta con códigos CMYK, RGB y HEX, tipografías, usos correctos e incorrectos, papelería básica y pautas para digital e impresión.</p>' },
    { q: '¿Os encargáis de la impresión?', a: '<p>Coordinamos con imprentas locales y nacionales: prueba de color, papeles, acabados como stamping o relieve y tiradas. Tú apruebas la prueba antes de imprimir.</p>' },
    { q: '¿Puedo modificar los archivos después?', a: '<p>Sí. Entregamos los editables (Illustrator, InDesign, Figma), vectoriales (SVG, PDF) y versiones listas para web (PNG, JPG).</p>' },
    { q: '¿Podéis renovar mi marca sin perder clientes?', a: '<p>Es de lo que más hacemos: analizamos qué reconoce tu cliente y qué conviene modernizar, para evolucionar la marca sin que deje de parecer tuya.</p>' },
    { q: '¿Trabajáis con empresas de fuera de Almería?', a: '<p>Sí, en remoto con toda España: videollamadas, revisiones en línea y entregas digitales.</p>' },
  ],
  relacionados: ['web', 'audiovisual', 'marketing'],
};
