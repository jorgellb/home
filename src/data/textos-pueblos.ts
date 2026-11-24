/* Texto propio de cada municipio escrito para el rediseño de 2026-11.
   Sustituye a la entradilla y al bloque local heredados. Solo hechos que ya
   están en el resto de datos del repositorio (comarca, sectores, lugares,
   coordenadas): nada de cifras inventadas ni testimonios. Sin precios. */

export interface TextoPueblo {
  h1?: string;
  description?: string;
  entradilla: string;
  tituloLocal?: string;
  local: string[];
  puntos?: string[];
  preguntas?: { q: string; a: string }[];
}

export const TEXTOS_PUEBLOS: Record<string, TextoPueblo> = {
  'almeria': {
    description: 'Diseño web en Almería capital para clínicas, hostelería, despachos y comercio: webs rápidas, SEO local y fichas de Google que traen clientes de verdad.',
    entradilla: 'En la capital conviven el cliente de barrio y el visitante de la Alcazaba o del Cabo de Gata, y todos buscan primero en el móvil. Tu web tiene que explicar rápido qué haces, dónde estás y cómo reservar o llamar.',
    tituloLocal: 'Una web para una ciudad con muchos públicos',
    local: [
      'Almería es la capital y la ciudad más grande de la provincia, y eso se nota en quién te busca. Hay vecinos que quieren un dentista, una gestoría o un restaurante cerca de casa; estudiantes de la universidad; visitantes que llegan por la Alcazaba, el puerto o el Cabo de Gata y buscan en otro idioma; y empresas que necesitan un proveedor local. Cada grupo teclea cosas distintas y llega desde sitios distintos, así que una sola página genérica rara vez los atiende bien a todos.',
      'En la práctica, una web en Almería capital funciona mejor con una página propia por servicio y, si atiendes varias zonas, una por zona, en lugar de un único bloque de texto. Si recibes turismo, conviene una versión en inglés como mínimo y reservas o contacto directo a la vista. La ficha de Google Business Profile debe coincidir con la web en horarios, categorías y dirección, y todo tiene que cargar rápido en el móvil, que es desde donde se busca en la calle.',
      'Trabajamos desde Vera, a unos 69 km de Almería en línea recta. Para arrancar el proyecto, conocer el negocio y recoger el material que haga falta nos desplazamos a la capital; el diseño, el desarrollo y los ajustes posteriores se llevan en remoto, con videollamada cuando convenga. No tenemos oficina en Almería: tenemos una, en Vera, y cobertura en toda la provincia.',
    ],
    puntos: [
      'Una página por servicio para que cada búsqueda aterrice bien',
      'Versión en inglés para el visitante de Alcazaba y Cabo de Gata',
      'Ficha de Google alineada con la web y rápida en el móvil',
    ],
    preguntas: [
      { q: '¿Conviene una web distinta para cada zona de la ciudad?', a: 'Solo si prestas servicio de forma distinta en cada una, por ejemplo con desplazamientos o varias sedes. Si tienes un local único, es mejor reforzar una buena página por servicio y mantener la ficha de Google al día. Lo vemos contigo al analizar cómo te buscan tus clientes antes de decidir la estructura.' },
      { q: '¿Hacéis webs para negocios que viven del turismo en la capital?', a: 'Sí. En Almería el visitante llega atraído por la Alcazaba, el puerto o el Cabo de Gata, y a menudo busca en inglés. Preparamos la web con versión en otros idiomas, horarios y ubicación claros y un modo directo de reservar o contactar, sin depender solo de plataformas externas.' },
    ],
  },
  'roquetas-de-mar': {
    description: 'Diseño web en Roquetas de Mar para hoteles, apartamentos y restaurantes: webs multiidioma con reservas directas y SEO local para el turista de la costa.',
    entradilla: 'Roquetas de Mar vive del turismo de costa, con playas de bandera azul y visitantes europeos. Una buena web aquí habla varios idiomas, deja reservar sin intermediarios y aparece en Google Maps cuando alguien busca dónde dormir o comer.',
    tituloLocal: 'Llegar al turista antes de que pise la playa',
    local: [
      'Si tu negocio está en Roquetas, buena parte de tus clientes todavía no han llegado cuando te buscan. Planean desde fuera, a menudo desde otro país, y escriben en su idioma: dónde dormir, dónde comer, qué apartamento alquilar cerca de la playa. Después está el residente, que necesita servicios durante todo el año, y el comprador extranjero de vivienda. La temporada marca el ritmo: hay épocas de mucha búsqueda y otras en las que la web tiene que seguir trabajando por ti.',
      'Eso se traduce en decisiones concretas. Hoteles y apartamentos necesitan un motor de reservas propio para depender menos de las comisiones de las plataformas, con una página por tipo de alojamiento y galería rápida. Restaurantes y chiringuitos, carta digital y una ficha de Google cuidada, porque compiten en Google Maps. Y si tu cliente es británico, alemán o francés, cada idioma merece contenido real y hreflang correcto, no una traducción automática pegada. En el móvil, cada segundo de carga cuenta.',
      'Roquetas está a unos 83 km de Vera en línea recta. Cuando el proyecto lo pide, nos acercamos para conocer el negocio y tomar el material; el resto del trabajo, desde el diseño hasta las revisiones, lo hacemos en remoto, que además encaja bien con los horarios de la hostelería. No tenemos oficina en la costa: la sede es una, en Vera.',
    ],
    puntos: [
      'Motor de reservas propio para depender menos de Booking',
      'Contenido real en inglés, alemán y francés, no traducido a máquina',
      'Cartas y fichas de Google pensadas para el turista que busca en móvil',
    ],
    preguntas: [
      { q: '¿Qué idiomas conviene tener en una web de Roquetas?', a: 'Depende de quién te reserva. Español e inglés suelen ser la base; alemán y francés se añaden si tus huéspedes llegan de esos países. Mejor pocos idiomas bien trabajados, con textos propios y etiquetas hreflang, que muchos traducidos a máquina. Lo decidimos mirando de dónde vienen tus reservas actuales.' },
      { q: '¿Puedo seguir en Booking y tener reservas directas?', a: 'Sí, no es una cosa o la otra. Las plataformas te dan visibilidad, mientras la web propia capta al cliente que ya te conoce o que te busca por nombre. Integramos un sistema de reservas en tu web para que esas reservas entren directamente y tú conserves los datos de contacto del huésped.' },
    ],
  },
  'el-ejido': {
    description: 'Diseño web en El Ejido para cooperativas, empresas auxiliares del agro y comercio local: webs B2B multiidioma, catálogos y SEO para vender dentro y fuera.',
    entradilla: 'El Ejido es agricultura intensiva bajo plástico y exportación, pero también una ciudad con comercio propio y la zona turística de Almerimar. Tu web debe ser seria para el comprador B2B y rápida para el vecino que busca cerca.',
    tituloLocal: 'Dos clientes: el comprador de fuera y el vecino',
    local: [
      'En El Ejido conviven clientes que casi no se parecen. Por un lado, el comprador profesional: distribuidores de otros países que evalúan a una cooperativa, una exportadora o un proveedor de insumos antes de pedir nada, y lo hacen en su idioma. Por otro, el vecino de la localidad más poblada del Poniente, que busca taller, clínica o restaurante en el móvil. Y en Almerimar aparece un tercero: el residente y visitante europeo de golf, puerto deportivo y playa. Tres búsquedas distintas, tres webs que no deberían parecerse.',
      'Para el lado agro, lo útil es un catálogo claro por producto o campaña, certificaciones visibles, fichas técnicas descargables y un formulario pensado para el comprador, con versiones en inglés, alemán, francés o neerlandés según tu mercado. Para el comercio local, una web ligera con la ficha de Google Business trabajada y una página por servicio. Para Almerimar, reservas directas y contenido en varios idiomas. Mezclarlo todo en una sola web suele salir mal: mejor separar audiencias.',
      'Estamos en Vera, a unos 97 km en línea recta de El Ejido, así que lo planteamos con honestidad: nos desplazamos para la reunión inicial y para ver tus instalaciones si hace falta, y el resto se hace en remoto, con videollamadas y entregas por fases. No hay oficina del estudio en El Ejido; la sede es una, en Vera.',
    ],
    puntos: [
      'Catálogos y fichas pensados para el comprador profesional',
      'Webs en inglés, alemán, francés o neerlandés con SEO por idioma',
      'Una mirada para el agro y otra para Almerimar y el comercio',
    ],
    preguntas: [
      { q: '¿Una cooperativa necesita una web en varios idiomas?', a: 'Si vendes fuera de España, sí: el comprador te busca y te compara en su idioma. Preparamos las versiones que tu mercado pide, con textos revisados, hreflang y SEO por idioma, junto a certificaciones y catálogo visibles. Si hoy solo vendes en España, puede empezar con español e inglés y crecer después.' },
      { q: '¿Se puede separar la web del agro de la de Almerimar?', a: 'Sí, y suele ser lo más sensato cuando el público es distinto. Puedes tener una web corporativa B2B y otra turística, o secciones bien diferenciadas dentro de un mismo sitio, con navegación, idiomas y mensajes propios. Lo definimos según cómo te llegan hoy los clientes y qué quieres que hagan al entrar.' },
    ],
  },
  'nijar': {
    description: 'Diseño web en Níjar y Cabo de Gata para casas rurales, artesanía y actividades: reservas directas, tienda online y SEO para el turismo de naturaleza.',
    entradilla: 'En Níjar se vende naturaleza y oficio: el visitante del Parque Natural de Cabo de Gata y el comprador de jarapas o cerámica. La web debe transmitir el lugar, hablar otros idiomas y permitir reservar o comprar sin intermediarios.',
    tituloLocal: 'Vender a quien visita el Cabo de Gata',
    local: [
      'Quien busca «casa rural Cabo de Gata» o «Playa de los Genoveses» suele planificar el viaje con tiempo, comparando alojamientos y experiencias, en español y en otros idiomas. En Níjar eso se mezcla con un cliente muy distinto: el comprador de artesanía, que pregunta por jarapas, cerámica o esparto y puede estar en cualquier punto de España o de Europa. Y está el residente de los núcleos del municipio, como San José o Campohermoso, que busca servicios cerca de casa.',
      'Para alojamientos, lo que funciona es una web que enseñe el lugar con fotografía propia, resuelva dudas antes de la reserva y permita reservar directamente. Para empresas de actividades, calendario de disponibilidad y reservas por actividad. Para talleres y artesanos, una tienda con fichas que cuenten el oficio y el proceso, envíos claros y textos pensados para búsquedas concretas como «jarapas Níjar». Y para todos, una ficha de Google bien cuidada, porque el visitante busca desde el móvil, a menudo ya en ruta.',
      'Níjar nos queda a unos 41 km de Vera en línea recta, así que visitar el taller, el alojamiento o el negocio para conocerlo de primera mano es sencillo. Después el trabajo continúa en remoto: tú nos envías fotos y textos, nosotros montamos la web y la vas validando por fases. No tenemos oficina en el Cabo de Gata; la sede es una, en Vera.',
    ],
    puntos: [
      'Reservas directas para alojamientos y actividades del Parque',
      'Tienda online que cuenta el oficio de la jarapa y la cerámica',
      'SEO para búsquedas como «casa rural Cabo de Gata»',
    ],
    preguntas: [
      { q: '¿Puedo vender mi artesanía fuera de Níjar solo con una web?', a: 'Sí, si la tienda está bien planteada: fichas con la historia y el proceso de cada pieza, buena fotografía, pasarela de pago segura y condiciones de envío claras. Además trabajamos las búsquedas concretas de tu producto. No hace falta un catálogo enorme para empezar: puedes partir de las piezas que mejor se venden y ampliar.' },
      { q: '¿La web de mi casa rural tiene que estar en varios idiomas?', a: 'Si recibes visitantes extranjeros, conviene al menos una versión en inglés, y en francés o alemán si ya te llegan de allí. Con textos escritos para cada idioma, no traducidos a máquina, y con hreflang para que Google muestre la versión adecuada. Empezamos por los idiomas de tus huéspedes actuales.' },
    ],
  },
  'vicar': {
    description: 'Diseño web en Vícar para empresas agrícolas, comercios y servicios del polígono La Redonda y las urbanizaciones: SEO local y webs B2B pensadas para vender.',
    entradilla: 'Vícar combina invernadero, polígono industrial y urbanizaciones nuevas junto a la capital. La web de tu negocio debe servir tanto al agricultor que exporta como al vecino que busca un servicio cerca y lo elige en Google Maps.',
    tituloLocal: 'Del invernadero al vecino de la urbanización nueva',
    local: [
      'Vícar crece pegado a Almería capital y en poco espacio conviven el agricultor que exporta, el polígono de La Redonda y las promociones residenciales. Eso da tres perfiles de cliente. El profesional del agro, que compara proveedores y compradores de su sector, a veces desde fuera. El vecino que teclea «electricista» o «taller» junto al nombre del pueblo en el móvil. Y el comprador de vivienda que viene de la capital y estudia las promociones antes de pedir visita.',
      'Cada perfil pide algo diferente. Cooperativas y proveedores agrícolas: catálogo, certificaciones, formulario B2B y versión en inglés. Talleres, fontaneros, electricistas y comercios: una web sencilla y rápida con una página por servicio, teléfono visible y, sobre todo, una ficha de Google Maps trabajada y con reseñas. Promotoras: galería de proyectos, planos y un buen formulario de contacto. No hace falta una web enorme; hace falta que cada búsqueda llegue a la página adecuada.',
      'Vícar queda a unos 79 km de Vera en línea recta. Nos desplazamos para la primera reunión y para conocer tu negocio o tu nave; el diseño, la puesta en marcha y los cambios posteriores se resuelven en remoto, sin que tengas que parar tu jornada. No tenemos oficina en Vícar ni en la capital: la sede es una, en Vera.',
    ],
    puntos: [
      'Ficha de Google Maps y SEO para búsquedas «cerca de mí»',
      'Webs B2B con catálogo y certificaciones para empresas agrícolas',
      'Galería de proyectos y planos para promotoras de la zona',
    ],
    preguntas: [
      { q: '¿Qué importa más para un taller o servicio en Vícar, la web o Google Maps?', a: 'Las dos cosas, pero por orden: primero una ficha de Google bien completada, con categoría, servicios, horarios y reseñas; después una web ligera que confirme lo que ofreces y dé un teléfono o formulario claro. La ficha te hace visible en la búsqueda local; la web convence y recoge la consulta.' },
      { q: '¿Podéis hacer una web en inglés para una empresa agrícola?', a: 'Sí. Una web B2B en español e inglés, con catálogo de productos, certificaciones visibles y un formulario pensado para distribuidores. Si exportas a países concretos, se puede sumar otro idioma. Cada versión se escribe y se revisa por separado para que el comprador extranjero encuentre información útil, no un texto traducido sin más.' },
    ],
  },
  'adra': {
    description: 'Diseño web en Adra para restaurantes de pescado, empresas hortofrutícolas, apartamentos de playa y comercio local: webs claras que aparecen en Google.',
    entradilla: 'Adra tiene puerto pesquero, invernaderos y playas en el mismo municipio. Una buena web aquí no intenta contarlo todo: elige a quién habla, ya sea el comensal, el comprador europeo o el turista, y se lo pone fácil.',
    tituloLocal: 'Tres economías, tres formas de aparecer en Google',
    local: [
      'En Adra, el cliente depende de a qué te dediques. Quien quiere comer pescado busca «dónde comer en Adra» o «pescado fresco» en el móvil, muchas veces ya cerca del puerto. El comprador de hortalizas es profesional, está en otro país y quiere ver producto, certificaciones y datos de contacto. El turista de playa y de las Albuferas busca apartamento y un plan tranquilo, con tiempo. Y el vecino de la segunda localidad del Poniente decide si compra o contrata en Adra o se va a El Ejido.',
      'Por eso la web se diseña según el público. Un restaurante o una pescadería ganan con carta digital, buenas fotos del producto, reserva de mesa y ficha de Google actualizada. Una empresa hortofrutícola, con catálogo, certificaciones a la vista y versiones en inglés, alemán o francés. Un apartamento, con galería, calendario y reserva directa. Y el comercio de barrio o el despacho profesional, con una web sencilla y una ficha que confirme dirección y horario. Lo que une a todos es que cargue rápido en el móvil.',
      'Adra queda a unos 114 km de Vera en línea recta, así que no vamos a diario. Lo organizamos así: una visita para conocer el negocio y recoger lo que haga falta, sea el local, la nave o el alojamiento, y después trabajo en remoto con videollamadas y revisiones por fases. Es lo único que cambia respecto a un negocio de Vera; la oficina del estudio es una, y está en Vera.',
    ],
    puntos: [
      'Carta digital y reservas para restaurantes del puerto',
      'Webs B2B multiidioma para hortofrutícolas con certificaciones',
      'Reserva directa para apartamentos de playa y Albuferas',
    ],
    preguntas: [
      { q: '¿Cómo se destaca un restaurante de pescado de Adra en Google?', a: 'Con una ficha de Google completa y al día, fotos reales de lo que sirves, carta digital y una web con reserva de mesa. Trabajamos también los textos para búsquedas como «pescado fresco Adra» o «restaurante puerto Adra». La frescura del producto es tu mejor argumento; la web solo tiene que contarlo bien.' },
      { q: '¿Puede una empresa de Adra competir por compradores europeos?', a: 'Sí, si la web transmite lo mismo que cualquier exportadora seria: catálogo claro, certificaciones visibles, idiomas del comprador y contacto directo. Adra forma parte del mismo cinturón hortofrutícola del Poniente que El Ejido, así que el comprador compara en igualdad de condiciones. Lo que marca la diferencia es que tu web esté a la altura.' },
    ],
  },
  'huercal-de-almeria': {
    description: 'Diseño web en Huércal de Almería para clínicas, comercios y profesionales: webs rápidas y SEO local para quien busca cerca de casa y decide desde el móvil.',
    entradilla: 'Huércal de Almería es un municipio residencial pegado a la capital por la A-7, con población joven que busca servicios de proximidad desde el móvil. Tu web tiene que ganar esa búsqueda local y facilitar la cita.',
    tituloLocal: 'Ser el elegido por quien busca cerca de casa',
    local: [
      'Huércal es un municipio donde la gente vive y consume sin querer entrar en Almería para todo. Esa persona, de perfil joven y poder adquisitivo medio-alto, busca un dentista, un fisioterapeuta, una gestoría o un sitio para comer añadiendo «Huércal de Almería» o «cerca de mí», y se queda con lo primero que le inspira confianza en el móvil. Quien atiende al pueblo compite menos contra la ciudad que contra la comodidad: si no te encuentra, se va a la capital.',
      'Para un negocio de aquí eso se traduce en una ficha de Google Business trabajada, con categorías y servicios correctos, reseñas gestionadas y fotos reales, y una web que no estorbe: carga rápida, una página por servicio, teléfono y botón de cita visibles. En clínicas, además, la información de privacidad y de datos de salud debe estar bien resuelta. Para gestorías, abogados o inmobiliarias, una web corporativa clara y formularios que filtren la consulta ahorran tiempo a ambas partes.',
      'Huércal está a unos 63 km de Vera en línea recta. Nos desplazamos para la primera reunión y para ver tu local; después el diseño, los ajustes y las mejoras se hacen en remoto, sin que tengas que cerrar la consulta ni dejar el mostrador. No hay oficina del estudio en Huércal ni en Almería: es una, en Vera. Y si prefieres empezar por videollamada, también vale.',
    ],
    puntos: [
      'Ficha de Google Business trabajada para búsquedas «cerca de mí»',
      'Cita online y datos de salud bien resueltos para clínicas',
      'Webs ligeras con una página por servicio y contacto visible',
    ],
    preguntas: [
      { q: '¿Qué debe tener la web de una clínica en Huércal de Almería?', a: 'Servicios explicados en páginas propias, equipo y ubicación claros, botón de cita visible en el móvil, información de privacidad correcta para datos de salud y una ficha de Google coherente con la web. Priorizamos que el paciente sepa qué hacer en pocos segundos, sin promesas que no puedas respaldar.' },
      { q: '¿Me sirve una web si mis clientes son solo del municipio?', a: 'Sí, precisamente por eso. Cuando alguien busca «fisioterapeuta Huércal de Almería» quiere confirmar que estás cerca, qué haces y cómo contactar. Una web ligera con tu ficha de Google al día resuelve eso y te diferencia de quien solo tiene una página en redes sociales o un número suelto.' },
    ],
  },
  'berja': {
    description: 'Diseño web en Berja para bodegas de moscatel, enoturismo, patrimonio y productores de la Sierra de Gádor: tienda online, reservas de catas y SEO local.',
    entradilla: 'Berja es la capital de la Sierra de Gádor, con uva moscatel, vino dulce DO Málaga-Almería y la romana Vergium. Tu web debe contar ese origen con claridad y permitir reservar una cata o comprar sin intermediarios.',
    tituloLocal: 'Contar el moscatel y la sierra a quien viene de fuera',
    local: [
      'Lo que Berja tiene de singular, la uva moscatel, el vino dulce de denominación Málaga-Almería, el casco histórico y la antigua Vergium, es justo lo que un viajero cultural busca antes de decidir una escapada de interior. Ese cliente investiga: lee, compara bodegas, busca «enoturismo Almería» o «vino moscatel Berja» y reserva si encuentra información clara. A su lado está el consumidor que compra vino, almendra o aceite desde otra ciudad y el vecino que busca servicios cerca.',
      'Para una bodega eso significa una web que explique el origen de la uva y del vino, con una página por producto, tienda online y reserva de visitas y catas con calendario. Para alojamientos, restaurantes y rutas culturales, contenido que sitúe al visitante en la sierra y sus puntos de interés. Para productores de almendra o aceite, venta directa al consumidor con fichas que cuenten el oficio. En todos los casos, fotos propias y velocidad en el móvil pesan más que los efectos.',
      'Berja queda a unos 103 km de Vera en línea recta, así que concentramos los desplazamientos donde aportan: una visita para conocer la bodega, el alojamiento o el campo y recoger fotografías y textos sobre el terreno. El diseño, la tienda y los cambios posteriores se trabajan en remoto. No tenemos oficina en el Poniente; el estudio es uno, y está en Vera.',
    ],
    puntos: [
      'Reserva de visitas y catas con calendario para bodegas',
      'Tienda online para vino, almendra y aceite de la sierra',
      'Contenido que sitúa Vergium y la Sierra de Gádor para el viajero',
    ],
    preguntas: [
      { q: '¿Cómo se vende vino moscatel por internet desde una bodega pequeña?', a: 'Con una tienda sencilla: fichas por vino que cuenten uva, origen y maridajes, buenas fotos, envío claro y pasarela de pago segura. Conviene revisar con tu asesor los requisitos de la venta de alcohol a distancia; lo técnico lo resolvemos nosotros. Se puede empezar con pocas referencias y ampliar después.' },
      { q: '¿Merece la pena una web de enoturismo en un municipio de interior?', a: 'Sí, porque el visitante de interior planifica y compara antes de ir. Si una bodega o un alojamiento de Berja explica bien la visita, el entorno y cómo reservar, tiene ventaja frente a quienes solo salen en plataformas. Además, una web propia te permite contar Vergium, el casco histórico y la sierra como parte de la experiencia.' },
    ],
  },
  'vera': {
    description: 'Diseño web en Vera hecho en el propio estudio: webs para inmobiliarias, hostelería y comercio de Vera pueblo, Vera Playa y Puerto Rey, en varios idiomas.',
    entradilla: 'Vera junta casco histórico, playa y urbanización en un mismo municipio, y cada zona busca de forma distinta. Tu web tiene que separar bien esos públicos, hablar varios idiomas y cargar rápido en el móvil.',
    tituloLocal: 'Tres núcleos, tres clientes distintos',
    local: [
      'Vera no es un único mercado. En el casco, tu cliente es el vecino que busca un servicio o una tienda cerca. En Vera Playa, el visitante y el residente extranjero que llegan desde Reino Unido, Alemania, Holanda o Escandinavia y buscan en su idioma. En Puerto Rey, una hostelería y una zona residencial de perfil más alto. A eso se suma que Vera es cabecera de comarca y centro de servicios de Garrucha, Palomares y Antas, así que también te busca gente de fuera del municipio.',
      'Para una web de Vera, eso significa decisiones concretas. Una página propia por cada servicio y por cada zona donde trabajas, en lugar de una portada que intenta decirlo todo. Versiones en inglés y alemán escritas para quien busca en ese idioma, no traducidas al vuelo. Solicitud de presupuesto o reserva a un toque en el móvil, una ficha de Google Business Profile que coincida con la web y, si vendes online, un catálogo ordenado por categorías.',
      'Aquí tenemos el estudio, en la Ctra. de Ronda 82, así que las reuniones son presenciales y puedes pasar a ver cómo trabajamos. Ya hemos hecho webs de negocios de Vera: la de la Clínica Dental Koral, con SEO y varios idiomas, y la tienda online de Oveja Bohemia. El desarrollo lo hacemos desde el estudio, y si tu equipo también necesita soporte informático presencial, lo cubrimos en Vera con un técnico muy cerca.',
    ],
    puntos: [
      'Una página por zona: casco, Vera Playa y Puerto Rey',
      'Idiomas escritos para quien busca en Vera, no traducidos',
      'Estudio en Vera: reunión presencial sin desplazarte',
    ],
    preguntas: [
      { q: '¿Conviene una página distinta para Vera Playa y para el casco?', a: 'Si tus clientes o tus servicios cambian de una zona a otra, sí. Una página por zona deja claro dónde trabajas y permite escribir para el residente del casco y para el visitante de la playa, cada uno con sus palabras de búsqueda y, si hace falta, su idioma.' },
      { q: '¿Puedo pasar por el estudio para ver cómo trabajáis?', a: 'Sí, el estudio está en Vera, en la Ctra. de Ronda 82. Lo mejor es avisar antes para reservar un hueco. Así puedes ver ejemplos reales, contarnos tu negocio cara a cara y decidir qué necesitas antes de empezar nada.' },
    ],
  },

  'cuevas-del-almanzora': {
    description: 'Diseño web en Cuevas del Almanzora para comercios, servicios, turismo de patrimonio y alojamientos de Villaricos. Webs rápidas con SEO local desde Vera.',
    entradilla: 'Cuevas es centro de servicios del Levante interior y, a la vez, castillo, museo y playas de Villaricos. Tu web debe captar al cliente de los pueblos vecinos y al visitante que busca qué ver o dónde comer.',
    tituloLocal: 'Comercio de comarca, castillo y Villaricos',
    local: [
      'Quien te busca en Cuevas del Almanzora cae en dos grupos. Por un lado, clientes de la propia comarca: Cuevas atrae a gente de Pulpí, Zurgena o Arboleas que viene a una clínica, un despacho, un taller o un comercio. Por otro, el visitante que llega por el Castillo del Marqués de los Vélez, el museo arqueológico o las playas de Villaricos y escribe en Google cosas como «qué ver en Cuevas del Almanzora» o «dónde comer en Villaricos».',
      'De ahí salen las páginas que tu web necesita. Si eres comercio o servicio, una página por cada servicio y mención clara de las zonas desde las que te llegan clientes, con la ficha de Google Maps al día. Si eres alojamiento, bar o restaurante, contenido sobre el castillo, el museo y Villaricos que explique cómo llegar y qué hay cerca, carta digital y forma directa de reservar. Todo ligero, porque la mayoría te visitará desde el móvil.',
      'Trabajamos desde Vera, en la misma comarca del Levante Almeriense, y para arrancar un proyecto o cerrar una entrega nos desplazamos a Cuevas. El diseño y el desarrollo se hacen en remoto, sin que pierdas tiempo. Si tu empresa, ya sea un almacén hortofrutícola, una oficina o un alojamiento, necesita además soporte informático presencial, también damos servicio en Cuevas, Villaricos y Palomares.',
    ],
    puntos: [
      'Páginas por servicio y por pueblo desde el que te buscan',
      'Contenido de castillo, museo y Villaricos para el visitante',
      'Soporte informático presencial en Cuevas y Villaricos',
    ],
    preguntas: [
      { q: 'Mi negocio está en Villaricos, ¿merece la pena una web aparte de la ficha de Google?', a: 'Sí. La ficha te saca en el mapa, pero la web te deja explicar qué ofreces, enseñar fotos propias, mostrar la carta o los horarios y recibir reservas sin intermediarios. Las dos se refuerzan: la ficha lleva a la web y la web da confianza.' },
      { q: '¿Cómo consigo que mi comercio de Cuevas aparezca también en los pueblos de alrededor?', a: 'Con páginas escritas para cada zona desde la que te llegan clientes, datos coherentes en la web y en Google Business Profile, y una web rápida en el móvil. No es magia: es dejar claro dónde trabajas y a quién atiendes.' },
    ],
  },

  'pulpi': {
    description: 'Diseño web en Pulpí para turismo de la Geoda, alojamientos, comercio y servicios: webs multiidioma con reservas online y SEO local desde Vera.',
    entradilla: 'En Pulpí conviven la Geoda, que atrae visitantes de fuera, y el comercio y el campo de siempre. Tu web debe reservar visitas en varios idiomas y, a la vez, servir al cliente local que te busca en el móvil.',
    tituloLocal: 'La Geoda, la costa y el pueblo',
    local: [
      'Pulpí tiene clientes muy distintos. El turista internacional que llega por la Geoda gigante y busca en inglés, a menudo antes de viajar. La familia que se queda en San Juan de los Terreros, a menudo desde Murcia o más lejos. Y el vecino del casco y de los municipios cercanos, incluida la frontera con Murcia, que busca comercio y servicios. Además está el Campo de Pulpí, con su agricultura de exportación, que pide una presencia más sobria y profesional.',
      'La Geoda se visita en grupos reducidos y con cita previa, así que una web para turismo en Pulpí necesita calendario de reservas, confirmación clara y un inglés bien escrito, además del español. Para alojamientos y restaurantes de la costa, páginas de zona y reservas directas. Para el comercio del pueblo, fichas de Google al día y una web que cargue al instante. Y para la parte agrícola, una web de catálogo clara que inspire confianza a un comprador profesional.',
      'Trabajamos desde Vera, a unos 21 km en línea recta de Pulpí. Para arrancar el proyecto o cerrar la entrega nos desplazamos; el resto del trabajo se hace en remoto. No tenemos oficina en Pulpí: tenemos una, en Vera, y cobertura en la comarca. Si en plena campaña necesitas también soporte informático presencial en naves u oficinas, está cubierto en Pulpí.',
    ],
    puntos: [
      'Reservas de visitas con inglés bien escrito para la Geoda',
      'Alojamientos de la costa con reserva directa en su web',
      'Web de catálogo clara para el campo y la exportación',
    ],
    preguntas: [
      { q: '¿Una web de visitas a la Geoda tiene que estar en inglés?', a: 'Si quieres atender al visitante internacional, sí, y escrita para quien busca en ese idioma, no traducida automáticamente. Conviene que la reserva, la confirmación y las condiciones de la visita también estén en inglés, porque es donde mucha gente abandona.' },
      { q: 'Tengo un apartamento en San Juan de los Terreros, ¿qué debe tener mi web?', a: 'Fotos propias, descripción de la zona, calendario o formulario de reserva directa, ubicación en el mapa y versión en los idiomas de tus huéspedes. Una ficha de Google Business Profile coherente con la web ayuda a que te encuentren en la zona.' },
    ],
  },

  'garrucha': {
    description: 'Diseño web en Garrucha para restaurantes, marisquerías, alojamientos y servicios del puerto: carta visual, reservas directas y SEO local, a 10 km de Vera.',
    entradilla: 'Garrucha vive del puerto, la lonja y el paseo, donde la gamba roja atrae a quien viene a comer. Tu web debe enseñar la carta con buenas fotos, permitir reservar y aparecer cuando alguien busca dónde comer allí.',
    tituloLocal: 'Del puerto a la mesa: cómo te busca el cliente',
    local: [
      'El cliente de Garrucha es sobre todo quien viaja a comer. La gamba roja, la lonja y el paseo marítimo atraen turismo gastronómico de varios puntos de la península, y también a andaluces y madrileños que repiten con alojamiento en la zona. Busca en el móvil, con frases como «restaurante de pescado en Garrucha» o «gamba roja Garrucha», y decide en minutos mirando fotos y carta. Luego está el negocio local del puerto: talleres náuticos, tiendas y servicios que trabajan todo el año.',
      'Para un restaurante o marisquería, eso se traduce en una carta con fotos buenas y no un PDF, un sistema de reservas simple, la ficha de Google Maps con horarios exactos y una página que cuente de dónde viene el producto. Para hoteles y apartamentos, reserva directa en la propia web para depender menos de comisiones. Para servicios del puerto, páginas por servicio, teléfono visible y presupuesto fácil de pedir desde el móvil.',
      'Estamos a unos 10 km en línea recta, en Vera, así que quedamos contigo en tu local o en el paseo cuando haga falta; el diseño y el desarrollo se hacen en remoto. No tenemos oficina en Garrucha, sino una en Vera. Si tu restaurante, tu tienda o tus apartamentos necesitan también soporte informático presencial, como wifi o TPV, damos servicio en Garrucha.',
    ],
    puntos: [
      'Carta con fotos propias y reservas desde el móvil',
      'Reserva directa para apartamentos y hoteles del paseo',
      'A unos 10 km de Vera: reuniones en tu local',
    ],
    preguntas: [
      { q: '¿Por qué mi restaurante de Garrucha no sale cuando buscan gamba roja?', a: 'Suele faltar una página que hable de ello con claridad: qué ofreces, de dónde viene el producto, dónde estás y cómo reservar. Con la ficha de Google bien rellena y una web con ese contenido, tu local tiene muchas más opciones de aparecer en esas búsquedas.' },
      { q: '¿Puede mi web en Garrucha trabajar también en temporada baja?', a: 'Sí. Menús del día, eventos de grupos, celebraciones y páginas pensadas para el cliente de la comarca mantienen la web útil fuera del verano. Lo que importa es que la información esté actualizada y que reservar sea fácil todo el año.' },
    ],
  },

  'mojacar': {
    description: 'Diseño web en Mojácar para hoteles, restaurantes y alquiler vacacional: webs en español, inglés, alemán y francés con reservas directas y SEO local.',
    entradilla: 'Mojácar recibe a visitantes de varios países y tiene dos mundos, el pueblo y la playa. Tu web debe hablar el idioma de cada huésped y dejarle reservar sin pasar por un intermediario.',
    tituloLocal: 'Pueblo, playa y cuatro idiomas',
    local: [
      'En Mojácar compiten dos públicos. El del pueblo busca cultura, gastronomía y tiendas con encanto. El de la playa, sol, ocio y deportes acuáticos. A ellos se suman turistas y residentes del Reino Unido, Alemania, Francia y Bélgica, que planean y reservan desde casa en su idioma. Además la actividad se concentra en temporada, y justo en esos meses Booking, Airbnb y TripAdvisor copan los primeros resultados de Google.',
      'Una web para un negocio de Mojácar debe asumirlo desde el diseño. Versiones en español, inglés, alemán y francés, con textos escritos para cada mercado, no traducción automática. Páginas diferenciadas para pueblo y playa si ofreces cosas distintas. Reserva directa en tu propia web para depender menos de las plataformas, ficha de Google Business Profile completa y una web veloz en móvil. El posicionamiento se trabaja todo el año, para que en temporada ya esté en marcha.',
      'Trabajamos desde Vera, a unos 13 km en línea recta de Mojácar, y nos desplazamos cuando la reunión lo pide. El resto, diseño y desarrollo, se hace en remoto. No tenemos oficina en Mojácar: tenemos una, en Vera. Si tu hotel, tus apartamentos o tu restaurante necesitan también soporte informático presencial, como wifi, equipos de recepción o copias de seguridad, damos servicio en Mojácar.',
    ],
    puntos: [
      'Textos en ES, EN, DE y FR escritos para cada mercado',
      'Reserva directa para depender menos de Booking y Airbnb',
      'Contenido distinto para Mojácar pueblo y Mojácar playa',
    ],
    preguntas: [
      { q: '¿Basta con traducir mi web al inglés para atraer turistas en Mojácar?', a: 'No siempre. Cada mercado busca con palabras distintas y espera cosas distintas, por eso conviene escribir cada versión para ese público y ajustar el SEO a su idioma. Una traducción literal se lee rara y suele posicionar peor.' },
      { q: '¿Puedo quitar comisiones si alquilo apartamentos en Mojácar?', a: 'Puedes reducir la dependencia con reservas directas desde tu web, donde cuentas con tu propia marca y tus condiciones. Seguir en las plataformas puede tener sentido; lo habitual es que convivan con una web propia que fidelice al huésped que repite.' },
    ],
  },

  'carboneras': {
    description: 'Diseño web en Carboneras para alojamientos, restaurantes de lonja y empresas de buceo y naturaleza del Cabo de Gata. Reservas directas y SEO local desde Vera.',
    entradilla: 'Carboneras es la cara norte del Cabo de Gata: playas sin edificios, lonja y buceo. Tu web debe transmitir esa calma y esa frescura, y ser la forma más fácil de reservar.',
    tituloLocal: 'Parque natural, lonja y reservas directas',
    local: [
      'Quien busca algo en Carboneras suele querer escapar de las playas masificadas. Llega por el Parque Natural de Cabo de Gata-Níjar, por la Playa de los Muertos, por el senderismo, el buceo en la Isla de San Andrés o por comer pescado de la lonja. Es un visitante que valora la autenticidad y que, antes de venir, compara alojamientos y restaurantes en el móvil. La actividad se concentra de mayo a octubre, así que la web tiene que estar a punto antes.',
      'Eso condiciona la web de un negocio de Carboneras. Alojamientos y casas de alquiler necesitan fotografía real, descripción de los alrededores y reserva directa con calendario. Restaurantes de pescado, una carta que cuente el producto de la lonja y la ficha de Google Maps al día. Centros de buceo, kayak y senderismo, páginas por actividad con duración, nivel y forma de contacto. Y todo con versión en inglés si recibes visitantes extranjeros.',
      'Trabajamos desde Vera, a unos 28 km en línea recta de Carboneras. No tenemos oficina en Carboneras: tenemos una, en Vera, y cobertura en el Levante almeriense. Para empezar un proyecto o cerrar una entrega nos desplazamos; el diseño y el desarrollo se hacen en remoto, sin que tengas que parar tu negocio. Es una forma cómoda de dejarlo todo listo antes de que empiece la temporada alta.',
    ],
    puntos: [
      'Fotografía real del parque, no folletos de sol y playa',
      'Reserva directa con calendario para alojamientos',
      'Páginas por actividad para buceo, kayak y senderismo',
    ],
    preguntas: [
      { q: '¿Qué páginas necesita un centro de buceo o de actividades en Carboneras?', a: 'Una por actividad, con duración, nivel, qué incluye y cómo reservar, además de una página de dónde estás y cómo llegar. Si vendes a extranjeros, esas páginas conviene tenerlas también en inglés, con fotos reales de tus salidas.' },
      { q: '¿Cómo cuento en la web que mi restaurante trabaja con pescado de lonja?', a: 'Con una página que explique el origen, una carta que cambie según el género del día y fotos propias. Mejor demostrarlo que decirlo: menciona la lonja, enseña el producto y mantén los horarios al día en Google.' },
    ],
  },

  'san-juan-de-los-terreros': {
    description: 'Diseño web en San Juan de los Terreros para apartamentos, chiringuitos y turismo familiar: reservas directas, ficha de Google y SEO local fuera de agosto.',
    entradilla: 'San Juan de los Terreros es una localidad costera tranquila, de playas familiares y castillo, con temporada corta e intensa. Tu web debe llenar también los meses flojos y convertir la búsqueda en reserva.',
    tituloLocal: 'Una temporada corta que hay que alargar',
    local: [
      'San Juan de los Terreros es una localidad costera del municipio de Pulpí, con castillo, playas de arena dorada, islotes volcánicos y un ambiente familiar. Quien llega suele ser una familia de Murcia, de Castilla o de la propia provincia que busca algo tranquilo, con Águilas y Lorca a un paso. Chiringuitos, restaurantes y apartamentos trabajan una temporada corta pero intensa, y agosto se llena casi solo.',
      'Para un negocio de aquí, la web debe empujar los meses de alrededor. Un apartamento necesita fotos reales, calendario de disponibilidad, contacto directo y una página que explique la zona y qué hacer cerca. Un chiringuito o restaurante, carta digital, horarios actualizados y ficha de Google Maps cuidada, porque mucha gente decide con la ubicación en la mano. Si ofreces actividades o visitas, una página por oferta. Y versión en inglés si recibes a extranjeros.',
      'Trabajamos desde Vera, a unos 26 km en línea recta de San Juan de los Terreros. No tenemos oficina aquí: tenemos una, en Vera, y damos servicio en la provincia. Para arrancar o cerrar un proyecto nos desplazamos, y el resto se hace en remoto. Es un plan cómodo para un negocio de temporada: podemos dejarlo todo listo antes de que empiece, sin que tengas que cerrar un día.',
    ],
    puntos: [
      'Reserva directa y calendario para apartamentos de temporada',
      'Carta digital y ficha de Maps para chiringuitos y bares',
      'Contenido del castillo y la zona para quien busca calma',
    ],
    preguntas: [
      { q: '¿Cómo preparo la web de mi chiringuito antes de que empiece la temporada?', a: 'Lo primero es tener la ficha de Google con horarios y fotos, y una carta digital clara. Después, una web sencilla con ubicación, contacto y novedades. Conviene terminarlo semanas antes de abrir, para que ya esté indexada cuando empiecen las búsquedas.' },
      { q: '¿San Juan de los Terreros y Pulpí tienen que ir en la misma web?', a: 'Depende de tu negocio. Si recibes al turista de la costa, la web debe hablar de San Juan de los Terreros y de la zona. Si también atiendes a clientes del pueblo de Pulpí, conviene una página para cada uno, claramente separadas.' },
    ],
  },

  'los-gallardos': {
    description: 'Diseño web en Los Gallardos para inmobiliarias, hostelería, golf y servicios: webs bilingües español e inglés con SEO en ambos idiomas, a 10 km de Vera.',
    entradilla: 'Los Gallardos tiene una nutrida comunidad británica y golf. Aquí la web debe estar bien escrita en inglés y en español, porque el cliente suele buscarlo todo en Google en su idioma antes de llamar.',
    tituloLocal: 'Un municipio donde se busca en inglés',
    local: [
      'El cliente típico de Los Gallardos no es solo el vecino que habla español. Hay una comunidad británica residente nutrida y un turismo de golf ligado al Club de Golf Valle del Este. Para estas personas, Google es la primera parada: buscan una estate agency, un restaurante con ambiente, una empresa de reformas o un servicio legal en inglés, y descartan lo que no encuentran. El municipio también tiene cítricos, y con ellos fincas y productores de proximidad.',
      'Cuando tu clientela cambia de idioma, la web debe hacerlo bien. Una versión en español y otra en inglés, con traducción cuidada y hreflang para que cada buscador vea su versión. Una inmobiliaria necesita fichas de propiedades con galería, filtros y formulario de contacto en ambos idiomas. Un bar o restaurante, carta en EN/ES y ficha de Google bilingüe. Un negocio de servicios, páginas por servicio con teléfono visible, pensadas para móvil, porque así llegan casi todos.',
      'Trabajamos desde Vera, a unos 10 km en línea recta de Los Gallardos, y nos desplazamos para empezar o cerrar un proyecto. El diseño y el desarrollo se hacen en remoto, así que no tienes que dejar tu negocio. No tenemos oficina en Los Gallardos: tenemos una, en Vera. Lo que hacemos por ti es la web, su posicionamiento en los dos idiomas y su mantenimiento, con una persona al otro lado del teléfono.',
    ],
    puntos: [
      'Web bilingüe ES/EN con hreflang y textos cuidados',
      'Fichas de propiedades en dos idiomas para inmobiliarias',
      'Google Business Profile bilingüe para bares y restaurantes',
    ],
    preguntas: [
      { q: '¿Es mejor una web bilingüe o dos webs separadas para Los Gallardos?', a: 'Normalmente una sola web con dos versiones, cada una en su idioma y bien señalizada para Google, es más fácil de mantener. Así compartes diseño y datos y cada cliente ve el contenido en el idioma que busca, sin duplicar trabajo.' },
      { q: '¿Una traducción automática me sirve para atender a clientes británicos?', a: 'Rara vez. Los textos automáticos suenan raros, cometen errores con términos del sector y generan desconfianza justo en quien decide si te llama. Conviene un inglés escrito o revisado a mano, sobre todo en servicios legales, inmobiliarios y de reformas.' },
    ],
  },

  'huercal-overa': {
    description: 'Diseño web en Huércal-Overa para comercios, servicios profesionales, empresas B2B y agroalimentación: webs rápidas con SEO local y soporte desde Vera.',
    entradilla: 'Huércal-Overa es el centro de comercio y servicios de su entorno, con clientes que vienen de otros municipios. Tu web debe ser la que te encuentre quien viene a comprar, a tramitar o a buscar proveedor.',
    tituloLocal: 'Comercio, servicios y empresas de comarca',
    local: [
      'Huércal-Overa funciona como cabecera de su entorno. Con unos 19.000 habitantes, es comercio, servicios y agricultura, además de ganadería, y mucha gente de municipios cercanos viene a hacer compras o gestiones. Eso significa que tu cliente no siempre vive en Huércal-Overa: puede venir de la frontera con Murcia, del Almanzora o de la costa. Y no todos son particulares; también hay empresas que buscan proveedor: construcción, metal, transporte, agroalimentación.',
      'Una web de Huércal-Overa tiene que cubrir los dos casos. Para comercio y servicios locales: páginas por servicio, horarios, ubicación, ficha de Google Maps cuidada y teléfono visible. Para empresas que venden a otras empresas: catálogo o página de capacidades, fichas de producto o servicio, formulario de solicitud de presupuesto y textos que generen confianza ante un comprador profesional. En ambos casos, rápida en el móvil y bien estructurada para que Google la entienda.',
      'Trabajamos desde Vera, a unos 17 km en línea recta de Huércal-Overa, y nos desplazamos cuando hace falta. Ya hemos hecho una web B2B con SEO local para Metales del Sureste, una empresa del municipio. No tenemos oficina en Huércal-Overa, sino una en Vera. Si tu asesoría, clínica o empresa necesita además soporte informático presencial, también damos servicio en Huércal-Overa.',
    ],
    puntos: [
      'Webs B2B con catálogo y solicitud de presupuesto',
      'Páginas por servicio para comercio y profesionales',
      'Caso real en el municipio: Metales del Sureste',
    ],
    preguntas: [
      { q: '¿Qué debe tener la web de una empresa B2B de Huércal-Overa?', a: 'Una explicación clara de qué haces y para quién, páginas por producto o servicio, ejemplos reales de trabajo, datos de contacto visibles y un formulario de presupuesto. El comprador profesional compara rápido y se queda con quien le resulta más fácil de entender.' },
      { q: 'Mi clínica o asesoría de Huércal-Overa recibe clientes de otros pueblos, ¿cómo lo refleja la web?', a: 'Con una página por cada servicio y una mención clara de las zonas a las que atiendes, además de la ubicación exacta y cómo llegar. Así Google entiende tu radio de trabajo y el cliente de fuera sabe que también es para él.' },
    ],
  },
  'albox': {
    description: 'Diseño web en Albox para comercios, talleres, gestorías y negocios del Valle del Almanzora, con SEO local y versión en inglés cuando hace falta.',
    entradilla: 'Albox atiende cada día a medio Valle del Almanzora, y su comunidad británica también busca en inglés. Una buena web aquí tiene que aparecer en Google Maps, cargar rápido en el móvil y hablar los dos idiomas.',
    tituloLocal: 'Una web para el comercio que sirve a todo el Valle',
    local: [
      'Albox es la cabeza comercial del Valle del Almanzora, con unos 12.000 habitantes y un mercado tradicional los martes. Quien entra en tu negocio no es solo el vecino de la calle de al lado: vienen clientes de los pueblos de alrededor, profesionales que trabajan con el mármol de Macael y residentes extranjeros, entre ellos la comunidad británica. Casi todos buscan lo mismo en el móvil antes de moverse: «qué hay abierto», «quién me lo arregla», «dónde puedo comprar».',
      'Eso se traduce en tareas concretas. Tu ficha de Google Business Profile tiene que estar completa y con horarios al día, porque es la primera página que ve mucha gente. La web debe cargar rápido con datos móviles, mostrar teléfono y ubicación sin buscarlos, y tener una versión en inglés bien escrita, no traducida a medias, si parte de tu clientela es británica. Si vendes producto, un catálogo o una tienda sencilla te permite llegar más allá del día de mercado.',
      'Trabajamos desde Vera, y Albox queda a unos 27 km en línea recta, así que podemos reunirnos contigo en persona cuando convenga y llevar el resto por videollamada. Además de la web, damos soporte informático presencial en Albox: si en tu comercio, taller o gestoría falla un equipo o la red, la misma persona que cuida tu web puede acercarse a verlo.',
    ],
    puntos: [
      'Versión en inglés pensada para la comunidad británica',
      'Ficha de Google lista para las búsquedas de toda la comarca',
      'Soporte informático presencial en Albox si algo falla',
    ],
    preguntas: [
      { q: '¿Merece la pena tener la web en español e inglés en Albox?', a: 'Si entre tus clientes hay residentes británicos, sí. Una versión en inglés bien redactada te permite aparecer cuando buscan en su idioma y les da confianza para llamarte. Si tu clientela es solo local, empezamos en español y añadimos el inglés cuando lo necesites.' },
      { q: '¿Puede mi comercio de Albox vender más allá del día de mercado?', a: 'Sí. Un catálogo online o una tienda sencilla mantiene el negocio abierto toda la semana y te hace visible para quien vive fuera de Albox. Primero vemos qué productos tienen sentido para vender a distancia y cuáles se venden mejor en persona.' },
    ],
  },
  'olula-del-rio': {
    description: 'Diseño web en Olula del Río para empresas del mármol, estudios de interiorismo y comercio local: catálogo técnico, varios idiomas y SEO internacional.',
    entradilla: 'Olula del Río vende piedra a más de 80 países, así que su web empresarial no puede ser un folleto en español. Necesita catálogo técnico, idiomas y un formulario que un comprador extranjero entienda a la primera.',
    tituloLocal: 'La web de una empresa que vende a otros países',
    local: [
      'En Olula del Río el mármol marca el ritmo de la economía local. Las empresas exportadoras no esperan a que alguien pase por la puerta: sus compradores son distribuidores, arquitectos y constructoras que buscan proveedor desde otro país y otro idioma, y comparan varias webs antes de escribir. Junto a ellas hay estudios de interiorismo que enseñan proyectos con este material, y el comercio y los servicios que atienden a los vecinos y a quienes trabajan en la industria.',
      'Para una marmolera, eso significa un catálogo con fichas técnicas claras (tipo de piedra, formatos, acabados), descargas en PDF, versiones en inglés y, según el mercado, en otros idiomas, y un formulario de solicitud de cotización pensado para compradores B2B. Para un estudio de interiorismo, un portfolio que cargue rápido y se vea bien en pantallas grandes y en móvil. Y para el comercio local, algo más sencillo: ficha de Google completa y la web al servicio de quien busca cerca.',
      'Estamos en Vera, a unos 37 km de Olula del Río en línea recta, y trabajamos con empresas de la zona combinando reuniones en persona con videollamadas. Si tu equipo trabaja en nave y oficina, también ofrecemos soporte informático presencial en Olula: la web y los equipos que la alimentan, con un mismo interlocutor, sin tener que explicar tu negocio a dos empresas distintas.',
    ],
    puntos: [
      'Catálogo técnico con fichas y descargas para compradores B2B',
      'Versiones en varios idiomas escritas para cada mercado',
      'Soporte informático presencial para naves y oficinas de Olula',
    ],
    preguntas: [
      { q: '¿Qué debe tener la web de una empresa de mármol que exporta?', a: 'Un catálogo con fichas técnicas, descargas en PDF, formulario de cotización y versiones en los idiomas de tus mercados. También cuenta el posicionamiento en esos idiomas: de nada sirve estar traducida si el comprador extranjero no te encuentra buscando en el suyo.' },
      { q: '¿Puede un estudio de interiorismo de Olula captar proyectos de fuera?', a: 'Sí, si el portfolio se ve bien y se entiende en más de un idioma. Mostramos cada proyecto con fotos, materiales y contexto, y la web se posiciona por lo que haces, no solo por dónde estás. Así te encuentra quien busca ese tipo de trabajo.' },
    ],
  },
  'macael': {
    description: 'Diseño web en Macael para marmolistas, proveedores de maquinaria y turismo industrial: catálogo B2B, fichas técnicas y versiones en varios idiomas.',
    entradilla: 'En Macael la web de una empresa de piedra natural se parece más a un catálogo técnico que a una página de presentación. Quien la visita es un comprador profesional que compara proveedores en inglés, italiano o árabe.',
    tituloLocal: 'Webs B2B para la piedra natural de Macael',
    local: [
      'El mármol blanco de Macael se conoce lejos del Almanzora, y las empresas del municipio exportan a más de 60 países. Quien las busca suele ser un arquitecto, un constructor o un distribuidor que necesita datos concretos antes de pedir una muestra. Alrededor de los marmolistas hay proveedores de maquinaria de corte, abrasivos y herramientas, que venden de empresa a empresa, y un turismo industrial ligado a las canteras y al museo del mármol.',
      'En la práctica, la web tiene que funcionar como una ficha de producto: referencias de piedra, formatos y acabados, documentación descargable y un formulario de cotización que pida lo que necesitas saber para responder. Las versiones en otros idiomas deben estar redactadas para esos mercados y posicionadas con las búsquedas que usa el comprador, no solo traducidas. Para proveedores de maquinaria, un catálogo técnico bien ordenado ahorra llamadas. Para el turismo de canteras, reservas y contenido bilingüe.',
      'Desde nuestra oficina de Vera, Macael queda a unos 39 km en línea recta. Lo habitual es empezar con una reunión para entender tu catálogo y tus mercados, y continuar por videollamada y correo, que a una empresa exportadora le encaja mejor con el calendario de pedidos. Si hace falta algo más, nos desplazamos. Lo importante es que el catálogo salga bien explicado desde el primer día.',
    ],
    puntos: [
      'Fichas de material y formatos descargables para arquitectos',
      'Formulario de cotización B2B que filtra bien las consultas',
      'Contenido bilingüe para las visitas a canteras y museo',
    ],
    preguntas: [
      { q: '¿En qué idiomas conviene tener la web de una marmolista de Macael?', a: 'Depende de dónde vendas. Inglés casi siempre, y después los idiomas de tus compradores habituales. Preferimos hacer pocos idiomas bien, con SEO propio en cada uno, que muchos traducidos a medias que no atraen a nadie.' },
      { q: '¿Una empresa de maquinaria para piedra necesita web técnica?', a: 'Sí, porque su cliente compara especificaciones antes de llamar. Un catálogo claro, con fichas y descargas, responde las dudas habituales y deja el contacto comercial para cuando el comprador ya está decidido. Te llegan menos consultas vagas y más presupuestos reales.' },
    ],
  },
  'cantoria': {
    description: 'Diseño web en Cantoria para canteras, talleres de piedra y empresas de construcción: catálogo de mármol, fichas técnicas y ventas B2B nacionales y europeas.',
    entradilla: 'Cantoria es el primer eslabón de la cadena del mármol almeriense. Tu web tiene que explicar bien la piedra y los formatos que ofreces, y servir igual a un arquitecto de Madrid que a un comprador europeo.',
    tituloLocal: 'De la cantera al comprador: tu web en cada paso',
    local: [
      'Las empresas de Cantoria están en la parte de la industria donde se extrae y se trabaja la piedra. Quienes las buscan son arquitectos, decoradores, constructoras y distribuidores, tanto de España como de Europa, y a menudo ya saben qué material quieren: necesitan encontrar quién lo tiene, en qué formatos y con qué acabados. Junto a las canteras hay instaladores y soladores de la comarca, y proveedores de herramientas y maquinaria para el sector.',
      'Eso pide una web que enseñe la piedra: catálogo por variedades, fichas técnicas, fotos de obra y un formulario para pedir muestras o presupuesto. Si exportas, una versión en inglés que use los términos que teclea un comprador extranjero marca la diferencia. Los instaladores y talleres ganan mucho con una galería de trabajos que cargue rápido en el móvil, porque muchos clientes la miran desde la obra. Y la ficha de Google, con tu zona de servicio bien definida, trae llamadas de la comarca.',
      'Cantoria es de los pueblos más próximos a nuestra oficina de Vera: unos 14 km en línea recta. Eso hace fácil reunirnos en persona para ver tu catálogo, tus fotos y tu forma de vender, y seguir después a distancia. Trabajamos contigo, con tus materiales reales, para que la web describa lo que de verdad ofreces, sin textos genéricos que valdrían para cualquier empresa.',
    ],
    puntos: [
      'Catálogo por variedades de piedra con fichas técnicas',
      'Galería de obras rápida en móvil para instaladores y talleres',
      'A unos 14 km de nuestra oficina de Vera: reuniones sin prisas',
    ],
    preguntas: [
      { q: '¿Una cantera necesita una web si ya vende por contactos?', a: 'Te sirve para que te encuentre quien no te conoce: arquitectos y constructoras que buscan el material en Google. Los contactos de siempre seguirán llamándote; la web añade clientes nuevos y te da una carta de presentación seria cuando alguien pregunta por ti.' },
      { q: '¿Cómo se posiciona una empresa de piedra de Cantoria en Google?', a: 'Combinando búsquedas locales, como mármol en el Almanzora, con las de exportación en inglés. Cada variedad de piedra tiene su página y su ficha, y la ficha de Google confirma tu ubicación. Es un trabajo gradual, sin promesas de plazos exactos.' },
    ],
  },
  'purchena': {
    description: 'Diseño web en Purchena para talleres, servicios profesionales, hostelería y turismo cultural del Alto Almanzora, con SEO local para toda la comarca.',
    entradilla: 'Desde Purchena se atiende a buena parte del Alto Almanzora: pueblos pequeños que miran aquí cuando necesitan taller, gestoría o un sitio donde comer. Tu web debe mostrarlo sin rodeos y salir en Google Maps.',
    tituloLocal: 'Ser el negocio al que acude toda la comarca alta',
    local: [
      'Purchena no es grande, pero funciona como centro de servicios de la comarca alta. Con su casco histórico y su mercado tradicional, atrae a gente de municipios vecinos como Tíjola, Serón, Bacares o Laroya. Quien busca un taller, una gestoría, un médico o dónde comer en la zona suele hacerlo desde el móvil y por cercanía, escribiendo el servicio y a veces el pueblo. A eso se suma el visitante que recorre el interior por el patrimonio.',
      'Para un negocio de aquí, lo importante es aparecer en esas búsquedas de ámbito comarcal, no solo en las de Purchena. Eso se consigue con una ficha de Google cuidada, una web que diga claramente qué haces y a qué pueblos atiendes, y teléfono, horario y cómo llegar visibles de entrada. En hostelería, una carta digital al día; en turismo, contenido sobre el casco histórico y las rutas cercanas; en servicios profesionales, un formulario de consulta sencillo.',
      'Conocemos bien Purchena porque tenemos un cliente allí: Taller El Piñón, un taller con más de 20 años de servicio, cuya web hicimos en 2026. Vera queda a unos 42 km en línea recta y nos desplazamos al Alto Almanzora para reunirnos en persona; si prefieres, lo llevamos todo por videollamada. Tú decides cómo te viene mejor, y no hace falta que dejes el negocio para hacerlo.',
    ],
    puntos: [
      'SEO local pensado para Tíjola, Serón, Bacares y Laroya',
      'Experiencia real en el pueblo con Taller El Piñón',
      'Reuniones en Purchena o por videollamada, como prefieras',
    ],
    preguntas: [
      { q: '¿Cómo hago que un negocio de Purchena salga en búsquedas de los pueblos de al lado?', a: 'Con una ficha de Google que defina tu zona de servicio y una web que nombre los pueblos a los que atiendes, con páginas útiles y no listas de palabras. Así apareces cuando alguien de la comarca alta busca tu servicio sin escribir Purchena.' },
      { q: '¿Qué le sirve más a un bar o restaurante de Purchena?', a: 'Una carta digital al día, horarios correctos en Google y fotos reales del local y de los platos. Para quien viene de paso o de otro pueblo, es lo que decide si entra. No hace falta una web complicada: hace falta que la información sea fiable.' },
    ],
  },
  'fines': {
    description: 'Diseño web en Fines para talleres de mármol, excavaciones y construcción: galería de trabajos, catálogo de acabados y presupuesto online con SEO local.',
    entradilla: 'En Fines se corta y se transforma la piedra, y se mueve tierra con maquinaria propia. Tu web debe enseñar el trabajo hecho, indicar a qué zonas llegas y facilitar que un cliente pida presupuesto en un par de pasos.',
    tituloLocal: 'Enseñar el taller y la maquinaria en la web',
    local: [
      'Fines tiene un perfil muy de oficio: talleres de corte y transformación del mármol, que abastecen proyectos de construcción por toda España, y empresas de obra y movimiento de tierras. Sus clientes son constructoras, reformistas, interioristas y particulares que encargan una encimera o una solería. Casi nunca eligen por una web bonita: eligen a quien les demuestra, con fotos y datos claros, que puede hacer el trabajo, y ven antes varios resultados en Google.',
      'Por eso la web de un taller debe llevar una galería de trabajos con buenas fotos, un catálogo de acabados y formatos y un formulario de presupuesto que pida medidas y material. Para una empresa de excavaciones, lo útil es describir la maquinaria, los servicios y los municipios a los que llegas. En ambos casos conviene que la web se vea bien en el móvil: el cliente suele mirarla en plena reforma o desde el campo.',
      'Tenemos experiencia directa con una empresa de Fines: Excavaciones Tripiana, con más de 20 años y maquinaria propia, cuya web hicimos en 2026. Vera está a unos 36 km en línea recta, así que podemos pasar por tu taller para ver el trabajo en su sitio, y después seguimos por videollamada. Con las fotos de tus trabajos y la lista de tus servicios reales construimos la web, no con imágenes de catálogo.',
    ],
    puntos: [
      'Galería de trabajos y catálogo de acabados para talleres',
      'Zonas de servicio claras para empresas de excavación',
      'Proyecto real en Fines: Excavaciones Tripiana',
    ],
    preguntas: [
      { q: '¿Qué debe mostrar la web de un taller de mármol de Fines?', a: 'Trabajos terminados con buenas fotos, los acabados y formatos que ofreces y una forma fácil de pedir presupuesto con medidas y material. Con eso, un interiorista o una constructora puede valorarte sin llamar, y cuando llama, ya sabe lo que quiere.' },
      { q: '¿Cómo puede una empresa de movimiento de tierras captar obra por internet?', a: 'Describiendo qué maquinaria tienes, qué trabajos haces y en qué municipios operas, y facilitando el presupuesto desde el móvil. Quien necesita una máquina busca por servicio y zona, así que conviene que la web y la ficha de Google lo digan claro.' },
    ],
  },
  'seron': {
    description: 'Diseño web en Serón para secaderos de jamón, casas rurales, restaurantes y turismo activo de la Sierra de los Filabres, con reservas directas y SEO local.',
    entradilla: 'Serón tiene un producto conocido, el jamón, y un entorno de sierra y castillo que trae visitantes. Tu web debe vender el producto fuera del pueblo y convertir la visita en reserva, comida o pedido.',
    tituloLocal: 'Jamón, sierra y castillo: una web para cada negocio',
    local: [
      'Serón ofrece dos tipos de cliente muy distintos. Por un lado, quien compra su jamón, que puede estar en cualquier punto de España y llega buscando por el nombre del producto o de la denominación. Por otro, el visitante que viene a la Sierra de los Filabres: senderistas, familias en casas rurales, gente que sube al castillo y busca después dónde comer. Hay además un comercio local que sirve a los vecinos y al resto del Valle del Almanzora.',
      'Para los secaderos y comercios de producto local, lo que funciona es una tienda sencilla con fotos buenas, la historia del producto y envíos claros. Una casa rural o un alojamiento se beneficia de un sistema de reservas directas, para no depender solo de intermediarios, y de fotos de la sierra y los alrededores. Los restaurantes necesitan carta digital y ficha de Google al día, y las empresas de turismo activo, información de rutas y reserva online. Con visitantes extranjeros, un idioma más ayuda.',
      'Serón queda a unos 56 km de nuestra oficina de Vera en línea recta, así que preferimos organizar bien las visitas: una reunión en persona al principio para conocer el negocio, y el resto del trabajo por videollamada y correo, sin que eso le reste cercanía. Con las fotos y los datos de tu producto, la web se hace a tu medida.',
    ],
    puntos: [
      'Tienda online para jamón y productos locales con envío',
      'Reservas directas para casas rurales de los Filabres',
      'Carta digital y ficha de Google para restaurantes del pueblo',
    ],
    preguntas: [
      { q: '¿Puede un secadero de Serón vender jamón online?', a: 'Sí, con una tienda que cuente el origen, el proceso de curación y los formatos disponibles, con pasarela de pago y condiciones de envío claras. El comprador de producto gourmet quiere saber de dónde viene lo que paga, así que la historia pesa tanto como el precio.' },
      { q: '¿Cómo capta una casa rural de los Filabres reservas sin intermediarios?', a: 'Con una web propia con calendario y reserva directa, buenas fotos y contenido sobre rutas y qué hacer en Serón. Los portales siguen sirviendo para darte a conocer, pero la web es el sitio al que llevas al cliente cuando ya te conoce.' },
    ],
  },
  'tabernas': {
    description: 'Diseño web en Tabernas para parques del oeste, alojamientos rurales, astroturismo y restaurantes: reservas directas, varios idiomas y SEO turístico.',
    entradilla: 'Tabernas vive de quien viene de fuera: el visitante llega por el desierto y el cine western y decide en el móvil dónde dormir, comer y qué reservar. Tu web tiene que ganarle esa decisión, en su idioma.',
    tituloLocal: 'Del desierto a la reserva: lo que decide el visitante',
    local: [
      'La clientela de Tabernas es sobre todo turista. Llega por el desierto, por el cine del oeste y por la fama de sus parques, y a menudo prepara la visita desde otro país. Busca en el móvil dónde alojarse, qué ver, dónde comer y cómo reservar, y compara. Fuera del turismo, el comercio y los servicios del municipio atienden a los vecinos, pero el flujo que mueve más negocios es el del visitante.',
      'Eso condiciona la web. Necesita varios idiomas, empezando por el inglés, y reservas o venta de entradas que funcionen sin llamadas. Un alojamiento rural o un glamping gana si tiene motor de reserva propio, para depender menos de comisiones. Un restaurante cercano a las rutas del oeste necesita carta digital y ficha de Google con horarios exactos. Las empresas de astroturismo y de rutas, calendario y reserva clara. Y todo debe cargar rápido en el móvil, que es donde decide el turista.',
      'Vera está a unos 49 km de Tabernas en línea recta. Podemos acercarnos para conocer el negocio y después trabajamos por videollamada. Nuestra oficina es una sola, en Vera; desde ahí cubrimos el territorio y adaptamos la manera de trabajar al ritmo de cada negocio, también si el tuyo vive de temporadas. Si tienes el negocio en marcha, adaptamos los plazos para no molestarte en los días de más visitas.',
    ],
    puntos: [
      'Reservas y entradas online, sin depender del teléfono',
      'Web en varios idiomas para el visitante internacional',
      'Carga ligera pensada para el turista que decide desde el móvil',
    ],
    preguntas: [
      { q: '¿Qué idiomas necesita la web de un alojamiento en Tabernas?', a: 'Español e inglés como base, y un tercer idioma si tus reservas vienen de un país concreto. Lo importante es que los textos estén escritos para cada público y que la reserva se pueda hacer sin salir de la web ni llamar.' },
      { q: '¿Una web propia compite con los portales de reservas?', a: 'No los sustituye, pero te permite recibir reservas directas de quien ya te conoce o te busca por nombre, sin pagar comisión por cada una. Los portales traen visibilidad; la web aprovecha esa visibilidad y se queda con la relación con el cliente.' },
    ],
  },
};
