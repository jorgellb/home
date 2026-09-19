/* Qué necesita cada sector real de la provincia, por tecnología.
 *
 * Sustituye a la tabla anterior, que aplastaba los 119 sectores documentados
 * en siete categorías genéricas con expresiones regulares. El resultado era
 * que «restaurantes y marisquerías» de Garrucha y «hostelería» de Albox
 * acababan diciendo la misma frase, y por eso las páginas locales salían
 * idénticas entre sí: el problema no era la falta de materia, era que la
 * estábamos triturando antes de usarla.
 *
 * Aquí las familias son las de verdad. Un secadero de jamón con IGP, una
 * alhóndiga y una cantera de mármol no tienen el mismo problema de software
 * ni de lejos, y eso es justo lo que hace que sus páginas puedan ser
 * distintas sin inventar nada.
 *
 * REGLA AL AMPLIAR: una familia nueva entra solo si su necesidad no se puede
 * escribir ya con otra. Si al redactarla sale la misma frase que una
 * existente, no es una familia nueva: es la misma con otro nombre, y
 * añadirla devuelve el problema que este fichero resuelve.
 *
 * Y nada de lo de aquí afirma que tengamos un cliente en ese sector. Describe
 * lo que ese tipo de negocio necesita, que es verificable por cualquiera que
 * lo conozca, no una cartera de clientes.
 */
import type { SlugTecnologia } from './tecnologias';

export interface FamiliaSector {
  id: string;
  /* Cómo se reconoce en los sectores documentados de cada municipio. */
  patron: RegExp;
  /* Qué resuelve cada tecnología PARA ESTE SECTOR. Si una tecnología no
     aparece, es que para este sector no tiene un encargo propio que contar, y
     entonces no se finge uno. */
  necesidades: Partial<Record<SlugTecnologia, string>>;
  /* La objeción real de quien trabaja en este sector, en sus palabras. Es lo
     que convierte una FAQ genérica en una que reconoce a quien la lee: el
     marmolista no pregunta lo mismo que el hotelero. `{m}` se sustituye por el
     municipio. */
  objecion?: { q: string; a: string };
}

export const FAMILIAS: FamiliaSector[] = [
  {
    id: 'marmol-cantera',
    patron: /cantera|extracci[óo]n de m[áa]rmol/i,
    necesidades: {
      wordpress: 'fichas por bloque y lote, con la ficha técnica descargable',
      nodejs: 'conectar el control de producción con el programa de gestión',
      react: 'un panel de existencias por bloque, calidad y destino',
      apps: 'partes de arranque a pie de cantera, sin depender de la cobertura',

      python: 'cuadrar partes de arranque con lo que llega a báscula',
    },
    objecion: {
      q: 'Ya voy desbordado en la cantera, ¿una web no me dará más papeleo?',
      a: 'Al contrario, si se plantea bien. El trabajo que ahorra es el de contestar veinte veces a la misma pregunta: qué materiales hay, en qué acabados y con qué plazos. La web responde eso sola y a ti te llega la consulta que merece una llamada.',
    },
  },
  {
    id: 'marmol-taller',
    patron: /marmolist|taller(es)? de m[áa]rmol|transformaci[óo]n y taller|industria del m[áa]rmol|piedra natural/i,
    necesidades: {
      wordpress: 'catálogo de acabados con su ficha técnica y fotografías del material real',
      javascript: 'una calculadora de metros, despiece y material para presupuestar en la web',
      react: 'seguimiento de encargos entre corte, pulido y expedición',
      astro: 'un catálogo pesado de piezas que cargue sin esperas desde fuera',

      python: 'sacar el despiece y el desperdicio de cada pedido en un informe',
    },
    objecion: {
      q: 'Cada pieza es distinta, ¿cómo se enseña eso en una web?',
      a: 'Con la ficha pensada para piedra natural y no para artículos idénticos: acabado, formato, documentación técnica y fotografía del lote concreto cuando hace falta. Quien compra piedra sabe que el tono cambia entre partidas y quiere ver la suya, no una foto de catálogo.',
    },
  },
  {
    id: 'marmol-exportacion',
    patron: /exportaci[óo]n|comercio b2b|distribuci[óo]n y proveedor|distribuci[óo]n y log[íi]stica/i,
    necesidades: {
      nextjs: 'una extranet donde cada distribuidor vea sus precios y sus pedidos',
      wordpress: 'catálogo B2B con precios por cliente y acceso restringido',
      nodejs: 'sincronizar pedidos y stock con el ERP sin pasar nada a mano',
      astro: 'una web en varios idiomas que cargue bien desde otros países',

      python: 'convertir las tarifas y pedidos que llegan en formatos distintos',
      genai: 'traducir y adaptar fichas técnicas a cada mercado, con revisión',
    },
    objecion: {
      q: 'Vendemos fuera y cada cliente tiene su precio, ¿eso se puede poner online?',
      a: 'Sí, con acceso por cliente: entra, ve su tarifa y hace el pedido sin llamar. La tarifa pública se queda fuera, que es lo que suele frenar a las empresas del sector a la hora de dar el paso.',
    },
  },
  {
    id: 'maquinaria',
    patron: /maquinaria|suministros industriales|proveedores industriales|alquiler de equipos/i,
    necesidades: {
      wordpress: 'catálogo de máquinas con despiece y recambios localizables',
      react: 'control de qué equipo está alquilado, a quién y hasta cuándo',
      nodejs: 'avisos automáticos de mantenimiento y revisiones por equipo',

      python: 'informe de horas y mantenimientos por equipo',
    },
    objecion: {
      q: 'Tenemos máquinas alquiladas por ahí fuera, ¿se puede controlar desde una pantalla?',
      a: 'Sí: qué equipo está fuera, con quién y hasta cuándo, más los avisos de revisión. Es de las cosas que más se notan porque hoy suele vivir en la cabeza de una persona.',
    },
  },
  {
    id: 'agro-invernadero',
    patron: /invernader|agr[íi]colas|agricultura intensiva|manipulado|agro y suministros|agro-tech|control biol[óo]gico/i,
    necesidades: {
      nodejs: 'que campo, almacén y facturación dejen de pasarse datos a mano',
      apps: 'partes de campo que funcionan sin cobertura y vuelcan al volver',
      react: 'trazabilidad por partida y lote en una sola pantalla',
      nextjs: 'zona privada para comerciales y clientes con sus liquidaciones',

      python: 'cuadrar partes de campo, entradas de almacén y facturación',
      genai: 'leer albaranes y partes escritos a mano y sacar los datos',
    },
    objecion: {
      q: 'En el campo no hay cobertura, ¿de qué me sirve una aplicación?',
      a: 'De bastante, si guarda en el propio móvil y sincroniza al volver. Dar por hecha la cobertura en invernadero es dar por hecho que la aplicación no se va a usar, así que se diseña contando con que no la habrá.',
    },
  },
  {
    id: 'agro-cooperativa',
    patron: /cooperativ|alh[óo]ndiga|productores y cooperativas/i,
    necesidades: {
      nodejs: 'integrar la subasta con las liquidaciones a cada socio',
      react: 'ver precios y entradas del día sin esperar al cierre',
      nextjs: 'un área privada donde cada socio consulte lo suyo',

      python: 'liquidaciones por socio a partir de las entradas del día',
      genai: 'clasificar y resumir las incidencias que llegan por correo',
    },
    objecion: {
      q: 'Los socios llaman todo el día para preguntar lo suyo, ¿eso tiene arreglo?',
      a: 'Con un área privada donde cada uno consulte sus entradas y sus liquidaciones. No quita el teléfono, pero quita las llamadas que solo sirven para repetir un dato que ya está en el sistema.',
    },
  },
  {
    id: 'agro-producto',
    patron: /agricultura ecol[óo]gica|km0|c[íi]tricos|agroturismo|explotaciones|productos del campo|agroalimentaci[óo]n|agricultura y|agricultura del/i,
    necesidades: {
      wordpress: 'venta directa con envío y control de campañas de temporada',
      astro: 'una web de producto que cargue rápido y se actualice en cosecha',
      javascript: 'calculadora de pedido por caja, peso o superficie',

      python: 'informes de campaña con lo vendido, por variedad y calibre',
    },
    objecion: {
      q: 'Vendemos por campaña, ¿no se queda la web desfasada el resto del año?',
      a: 'Se monta para que el catálogo siga la campaña: lo que no hay se retira solo y vuelve cuando toca. Una web de producto agrícola que enseña en enero lo de agosto hace más daño que bien.',
    },
  },
  {
    id: 'pesca',
    patron: /pesca|lonja|marisquer[íi]a|producto del mar|restauraci[óo]n de pescado/i,
    necesidades: {
      wordpress: 'carta que cambia con lo que ha entrado hoy en la lonja',
      nodejs: 'pasar la subasta de lonja al sistema de venta sin teclearla',
      apps: 'registrar capturas a bordo y sincronizar en puerto',

      python: 'pasar lo adjudicado en lonja a un formato que entre en el sistema',
    },
    objecion: {
      q: 'El género cambia cada día según la lonja, ¿cómo lo refleja una web?',
      a: 'Con una carta que se edita desde el móvil en dos minutos. Si cuesta más que eso no se actualiza y a la semana el sistema deja de servir, así que ese es el listón de diseño.',
    },
  },
  {
    id: 'jamon-igp',
    patron: /secader|jam[óo]n|igp/i,
    necesidades: {
      wordpress: 'tienda con envío refrigerado y la trazabilidad de cada pieza',
      nodejs: 'seguimiento de curación por lote y control de la certificación',
      react: 'panel de bodega: qué hay colgado, desde cuándo y qué sale esta semana',

      python: 'control de curación por lote con avisos de fecha',
      genai: 'redactar las fichas de producto para tienda a partir de los datos',
    },
    objecion: {
      q: 'Vendemos producto que hay que enviar en frío, ¿eso complica la tienda?',
      a: 'Añade logística, no complejidad técnica: transportista con frío, ventanas de envío y avisos al cliente. La trazabilidad de la pieza, que ya lleváis por la IGP, es lo que además da confianza en la ficha.',
    },
  },
  {
    id: 'bodega',
    patron: /bodega|enoturismo|moscatel/i,
    necesidades: {
      wordpress: 'venta de botella con control de añada y reserva de visita',
      javascript: 'reserva de cata con aforo por franja horaria',
      astro: 'una web de bodega que cargue rápido y se vea en varios idiomas',

      genai: 'redactar notas de cata y textos de añada partiendo de vuestras fichas',
    },
    objecion: {
      q: 'Hacemos visitas con aforo limitado, ¿se puede reservar desde la web?',
      a: 'Sí, por franja horaria y con las plazas que quedan a la vista. Es lo mismo que ya se lleva en una libreta, pero sin dobles reservas ni llamadas para confirmar.',
    },
  },
  {
    id: 'alojamiento',
    patron: /hotel|alojamiento|apartamento|casas vacacionales|alquiler vacacional|glamping|casas rurales|turismo rural/i,
    necesidades: {
      nextjs: 'reserva directa propia, sin dejarse la comisión en los portales',
      nodejs: 'sincronizar disponibilidad con los portales sin dobles reservas',
      wordpress: 'motor de reservas y versiones en los idiomas de sus clientes',
      react: 'panel de ocupación para ver de un vistazo qué queda libre',

      genai: 'responder las preguntas repetidas de huéspedes con vuestras normas',
      python: 'informe de ocupación cruzando los canales de venta',
    },
    objecion: {
      q: 'Las reservas me entran por los portales, ¿merece la pena tener la mía?',
      a: 'Los portales traen clientes que no te conocen y eso no se sustituye. La reserva directa sirve para quedarte con quien ya te buscaba por tu nombre y hoy entra por el portal de todas formas, pagando comisión.',
    },
  },
  {
    id: 'restauracion',
    patron: /restaurant|chiringuito|hosteler[íi]a|gastronom[íi]a|bares de playa|restauraci[óo]n/i,
    necesidades: {
      wordpress: 'carta que se edita sin llamar a nadie y reserva de mesa',
      javascript: 'reserva con aforo por turno incrustada en la web actual',
      astro: 'una web que cargue al instante en el móvil de quien busca cerca',

      genai: 'traducir la carta a varios idiomas manteniendo los nombres de plato',
    },
    objecion: {
      q: 'Cambio la carta a menudo, ¿voy a tener que llamar cada vez?',
      a: 'No, y si hay que llamar es que está mal montado. Se deja para que se edite desde el móvil entre servicio y servicio, que es el único momento en que de verdad se va a hacer.',
    },
  },
  {
    id: 'inmobiliaria',
    patron: /inmobiliaria|estate agent|alquiler|vivienda/i,
    necesidades: {
      react: 'buscador con filtros combinados sobre toda la cartera',
      nodejs: 'sincronizar la cartera con los portales sin republicar a mano',
      nextjs: 'fichas públicas que Google lea y zona privada para propietarios',
      wordpress: 'fichas de inmueble conectadas con el gestor de cartera',

      genai: 'redactar descripciones de inmueble a partir de sus datos reales',
      python: 'cruzar la cartera con lo publicado en portales y detectar diferencias',
    },
    objecion: {
      q: 'Publicamos la cartera en cuatro portales a mano, ¿se puede automatizar?',
      a: 'Si vuestro gestor permite exportar o tiene API, sí: se publica una vez y llega a todos, web propia incluida. Lo primero es comprobar qué ofrece, porque no todos dejan hacerlo en los dos sentidos.',
    },
  },
  {
    id: 'experiencia',
    patron: /actividades|visitas guiadas|astroturismo|geoda|parques tem[áa]ticos|turismo de cine|rodajes|buceo|kayak|n[áa]utica|golf|turismo activo|deportes naturales|experiencias|turismo de la/i,
    necesidades: {
      javascript: 'reserva por franja horaria con las plazas que quedan',
      nextjs: 'venta de entradas con pago y control de aforo',
      nodejs: 'cuadrar horarios, guías y material sin hojas de cálculo',
      apps: 'lista de participantes y partes de actividad desde el móvil',

      python: 'cuadrar reservas, guías y material en un solo informe',
    },
    objecion: {
      q: 'Las plazas las llevo por WhatsApp, ¿eso se puede ordenar?',
      a: 'Con reserva por franja y aforo a la vista. El día de la salida dejas de contar cabezas y de perseguir confirmaciones, que es donde se va el tiempo de verdad.',
    },
  },
  {
    id: 'patrimonio',
    patron: /museo|patrimonio|turismo cultural|hist[óo]rico|turismo industrial|el castillo|artesan[íi]a/i,
    necesidades: {
      astro: 'una web de contenido que cargue rápido y se lea en varios idiomas',
      wordpress: 'agenda de visitas y contenido que edita el propio equipo',
      javascript: 'un recorrido o mapa interactivo incrustado en la web actual',

      genai: 'preparar textos de sala en varios idiomas a partir del material propio',
    },
    objecion: {
      q: 'Recibimos visitantes de fuera, ¿hay que traducir toda la web?',
      a: 'Conviene, pero con cada idioma en su propia dirección. Una web que traduce con un botón sobre la marcha no se encuentra en el idioma traducido, que es justo lo que se buscaba.',
    },
  },
  {
    id: 'comercio',
    patron: /comercio|retail|tienda|boutique|mercado/i,
    necesidades: {
      wordpress: 'vender online sobre la web que ya tienen, no empezar de cero',
      nodejs: 'que el stock de la tienda física y el de la online sean el mismo',
      javascript: 'configurador de producto con opciones que dependen entre sí',

      python: 'cuadrar el stock de tienda física y online y sacar las diferencias',
      genai: 'generar descripciones de producto a partir de la ficha del proveedor',
    },
    objecion: {
      q: 'Tengo tienda física, ¿no me va a descuadrar el stock vender online?',
      a: 'Solo si son dos inventarios distintos. Se conecta para que sea el mismo, y entonces vender online deja de ser un riesgo de sobreventa y pasa a ser otro mostrador.',
    },
  },
  {
    id: 'construccion',
    patron: /construcci[óo]n|reforma|excavacion|movimiento de tierras|obra|hogar/i,
    necesidades: {
      javascript: 'un presupuestador en la web con sus propias tarifas',
      apps: 'partes de obra con fotos desde el tajo, sin papel',
      wordpress: 'catálogo de trabajos hechos que se actualiza sin tocar el código',

      python: 'sacar mediciones y certificaciones de los partes de obra',
    },
    objecion: {
      q: 'Me piden presupuesto por teléfono y se me va la mañana, ¿hay alternativa?',
      a: 'Una calculadora en la web con vuestras propias tarifas. No cierra el precio, pero filtra: quien llama después ya sabe por dónde va la cosa y la conversación empieza más adelante.',
    },
  },
  {
    id: 'salud',
    patron: /salud|cl[íi]nica|bienestar|dental|fisio/i,
    necesidades: {
      wordpress: 'cita previa conectada con la agenda que ya usan',
      nextjs: 'área privada donde cada paciente vea lo suyo',
      react: 'agenda de varios profesionales en una sola pantalla',

      genai: 'resumir y clasificar las consultas que entran por formulario',
    },
    objecion: {
      q: 'Las citas las llevamos por teléfono, ¿pasar a cita online es un lío?',
      a: 'Depende de con qué agenda trabajéis. Si permite conectarse, la cita online se suma sin cambiaros la forma de trabajar; si no, conviene saberlo antes de prometer nada.',
    },
  },
  {
    id: 'servicios',
    patron: /servicios profesionales|aut[óo]nomos|micropyme|talleres mec[áa]nicos|automoci[óo]n|transporte|log[íi]stica|arquitectura|interiorismo|servicios locales|servicios de|servicios del/i,
    necesidades: {
      javascript: 'una calculadora o formulario que filtre antes de que llamen',
      nodejs: 'automatizar lo que hoy se copia de un programa a otro',
      react: 'un panel para dejar de llevar el control en hojas de cálculo',
      astro: 'una web ligera, rápida y fácil de mantener al día',

      python: 'automatizar el informe que hoy se monta copiando de varios sitios',
      genai: 'buscar dentro de vuestros propios documentos y contratos',
    },
    objecion: {
      q: 'Llevo el control en hojas de cálculo, ¿cuándo toca dar el salto?',
      a: 'Cuando la hoja ya la tocan varias personas, o cuando hace falta saber quién cambió qué. Hasta ahí, la hoja suele ser la herramienta correcta y cambiarla es gastar por gastar.',
    },
  },
];

/** Familia a la que pertenece un sector documentado, o null si no encaja en
 *  ninguna. Null es una respuesta legítima: significa que sobre ese sector no
 *  tenemos nada concreto que decir todavía. */
export function familiaDe(sector: string): FamiliaSector | null {
  return FAMILIAS.find((f) => f.patron.test(sector)) ?? null;
}
