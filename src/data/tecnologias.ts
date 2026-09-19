/* Taxonomía de tecnologías para el clúster /programador-web/.
 *
 * La diferencia entre estas páginas y las de /diseno-web/ no es la palabra
 * clave: es el momento del cliente. En diseño web alguien NO TIENE web y
 * quiere una. Aquí alguien YA TIENE algo —una web, un ERP, una hoja de
 * cálculo, una app a medio hacer— y necesita que se modifique, se integre o
 * se construya encima. Si una página de este clúster se pudiera reescribir
 * como "te hacemos una web bonita", está mal enfocada y no debe indexarse.
 *
 * Cada tecnología existe aquí solo si resuelve una situación que las otras no
 * resuelven. Ese es el filtro para añadir una nueva (Laravel, Vue, Python…):
 * no "¿la conocemos?", sino "¿qué encargo llega redactado así y no encaja en
 * ninguna de las que ya hay?".
 */

export type SlugTecnologia =
  | 'wordpress'
  | 'react'
  | 'nodejs'
  | 'astro'
  | 'nextjs'
  | 'javascript'
  | 'python'
  | 'genai'
  | 'apps';

/** Bloques de contenido disponibles. Cada tecnología elige los suyos y en su
 *  orden: forzar la misma secuencia en las siete es lo que convierte un clúster
 *  en una granja de páginas. */
export type Bloque =
  | 'intro'
  | 'situaciones'
  | 'servicios'
  | 'integraciones'
  | 'migraciones'
  | 'rendimiento'
  | 'arquitectura'
  | 'proceso'
  | 'cobertura'
  | 'relacionadas'
  | 'faq'
  | 'cta';

export interface Servicio {
  titulo: string;
  descripcion: string;
}

export interface Situacion {
  /** Cómo llega el encargo, en las palabras del cliente. */
  encargo: string;
  /** Qué se hace. Sin promesas de resultado. */
  respuesta: string;
}

export interface Tecnologia {
  slug: SlugTecnologia;
  /** Nombre tal cual se escribe en prosa. */
  nombre: string;
  /** Para el breadcrumb y los listados. */
  etiqueta: string;
  /** Una frase que distingue esta tecnología de sus hermanas. Se usa en los
   *  listados del pilar y en los bloques de tecnologías relacionadas. */
  distintivo: string;
  /** La intención de búsqueda que cubre, en una frase. Es el criterio contra
   *  el que el control de canibalización compara las páginas. */
  intencion: string;
  /** Con qué NO se debe confundir. Lo comprueba `audit:programadores`. */
  noEs: string[];
  title: string;
  description: string;
  h1: string;
  entradilla: string;
  situaciones: Situacion[];
  servicios: Servicio[];
  faq: { q: string; a: string }[];
  /** Tecnologías hermanas con relación real, no por parecido de nombre. */
  relacionadas: SlugTecnologia[];
  /** Orden de bloques del hub. */
  bloques: Bloque[];
  /** Servicios ya existentes en la web con los que enlaza. Se valida que la
   *  URL exista antes de pintar el enlace. */
  serviciosWeb: string[];
}

export const TECNOLOGIAS: Record<SlugTecnologia, Tecnologia> = {
  wordpress: {
    slug: 'wordpress',
    nombre: 'WordPress',
    etiqueta: 'WordPress',
    distintivo: 'trabajar sobre una web que ya existe',
    intencion:
      'Tiene una web WordPress funcionando y necesita cambiarla, ampliarla, '
      + 'integrarla con otro sistema o arreglar algo que se ha roto.',
    noEs: ['crear una web desde cero', 'diseño gráfico', 'una aplicación'],
    title: 'Programador WordPress en Almería | Platanito Rico',
    description:
      'Desarrollo sobre WordPress: plugins a medida, WooCommerce, integraciones con '
      + 'facturación o ERP, migraciones y arreglos de webs heredadas. Provincia de Almería.',
    h1: 'Programador WordPress en Almería',
    entradilla:
      'La mayoría de los encargos de WordPress no son webs nuevas. Son webs que llevan '
      + 'años funcionando y a las que hay que añadir algo, conectarlas con el programa de '
      + 'facturación o rescatarlas de un plugin que dejó de mantenerse.',
    situaciones: [
      {
        encargo: 'Necesito que la web haga algo que ningún plugin hace.',
        respuesta:
          'Se desarrolla un plugin propio en vez de encadenar cinco de terceros. Queda '
          + 'aislado del tema, se puede desactivar sin romper nada y no depende de que '
          + 'un desarrollador externo siga manteniéndolo.',
      },
      {
        encargo: 'Los pedidos de la tienda los copiamos a mano al programa de facturación.',
        respuesta:
          'Se conecta WooCommerce con el sistema de gestión mediante su API, con registro '
          + 'de lo que se sincroniza y qué hacer cuando falla.',
      },
      {
        encargo: 'La web la hizo alguien que ya no está y nadie se atreve a tocarla.',
        respuesta:
          'Primero se levanta una copia idéntica donde probar, se documenta qué hace cada '
          + 'pieza y se actualiza por partes. Sin tocar la web en producción a ciegas.',
      },
      {
        encargo: 'Va lenta y el hosting dice que es culpa de la web.',
        respuesta:
          'Se mide antes de tocar: consultas a base de datos, plugins que cargan en todas '
          + 'las páginas, imágenes sin optimizar. Se corrige lo que sale en la medición.',
      },
    ],
    servicios: [
      { titulo: 'Plugins a medida', descripcion: 'Funcionalidad propia, aislada del tema y actualizable.' },
      { titulo: 'WooCommerce', descripcion: 'Métodos de envío y pago, precios por cliente, catálogos B2B.' },
      { titulo: 'Integraciones', descripcion: 'Facturación, ERP, CRM, pasarelas y servicios externos por API.' },
      { titulo: 'Migraciones', descripcion: 'Cambio de hosting o de dominio conservando URLs y posiciones.' },
      { titulo: 'Rendimiento', descripcion: 'Diagnóstico medido de carga, consultas y recursos.' },
      { titulo: 'Rescate de webs heredadas', descripcion: 'Actualizar lo que nadie se atreve a tocar, con copia y marcha atrás.' },
    ],
    faq: [
      {
        q: '¿Puedes trabajar sobre una web WordPress que ya está hecha?',
        a: 'Sí, es la mayoría del trabajo. Se empieza levantando una copia donde probar los '
          + 'cambios, para que la web en producción no se entere hasta que todo funcione.',
      },
      {
        q: '¿Desarrolláis plugins propios o usáis los de siempre?',
        a: 'Si existe un plugin conocido y bien mantenido que hace exactamente lo que hace '
          + 'falta, se usa. Se programa a medida cuando la alternativa es encadenar varios '
          + 'plugins para conseguir algo que ninguno hace del todo.',
      },
      {
        q: '¿Podéis conectar WooCommerce con nuestro programa de gestión?',
        a: 'Si el programa tiene API o permite importar y exportar ficheros, sí. Lo primero '
          + 'es ver qué ofrece; algunos programas antiguos solo dejan una de las dos vías, y '
          + 'eso cambia cómo se plantea la sincronización.',
      },
      {
        q: '¿Qué pasa si la web se rompe durante el desarrollo?',
        a: 'El trabajo no se hace sobre la web en producción. Se hace en una copia y se '
          + 'publica cuando está comprobado, con copia de seguridad previa para volver atrás.',
      },
    ],
    relacionadas: ['javascript', 'astro'],
    bloques: ['intro', 'situaciones', 'servicios', 'integraciones', 'migraciones', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/soporte/', '/desarrollo-web/'],
  },

  react: {
    slug: 'react',
    nombre: 'React',
    etiqueta: 'React',
    distintivo: 'interfaces de aplicación, no páginas',
    intencion:
      'Necesita una interfaz con la que se trabaja —un panel, un buscador, un '
      + 'formulario complejo— y no una página que se lee.',
    noEs: ['una web corporativa', 'una tienda estándar', 'el backend'],
    title: 'Desarrollador React en Almería | Platanito Rico',
    description:
      'Interfaces con React: paneles de gestión, buscadores, formularios complejos y '
      + 'visualización de datos. También sobre proyectos React ya empezados.',
    h1: 'Desarrollo con React en Almería',
    entradilla:
      'React tiene sentido cuando la pantalla no se lee, se usa: hay estado que cambia, '
      + 'filtros que se combinan, datos que se actualizan sin recargar. Para una página '
      + 'que solo se lee, React sobra y penaliza la carga.',
    situaciones: [
      {
        encargo: 'Llevamos el control en una hoja de cálculo compartida y ya no da más de sí.',
        respuesta:
          'Se convierte en una aplicación con usuarios, permisos y un historial de quién '
          + 'cambió qué. La hoja se puede importar para no empezar de cero.',
      },
      {
        encargo: 'Tenemos un catálogo enorme y el buscador de la web no sirve.',
        respuesta:
          'Se construye una interfaz de búsqueda y filtrado que responde mientras se '
          + 'escribe, con los filtros reflejados en la URL para poder compartir resultados.',
      },
      {
        encargo: 'Hay un proyecto React empezado por otro equipo y está parado.',
        respuesta:
          'Se revisa el estado real del código y las dependencias antes de prometer plazos. '
          + 'A veces continuar sale a cuenta y a veces no, y conviene saberlo antes.',
      },
    ],
    servicios: [
      { titulo: 'Paneles de gestión', descripcion: 'Altas, bajas, permisos por rol e historial de cambios.' },
      { titulo: 'Buscadores y filtros', descripcion: 'Respuesta inmediata sobre catálogos grandes.' },
      { titulo: 'Formularios complejos', descripcion: 'Pasos, validación y guardado parcial.' },
      { titulo: 'Visualización de datos', descripcion: 'Gráficas y tablas sobre datos que ya se tienen.' },
      { titulo: 'Continuar proyectos', descripcion: 'Revisión previa del código antes de comprometer plazos.' },
    ],
    faq: [
      {
        q: '¿React es adecuado para un panel de gestión interno?',
        a: 'Es uno de los casos donde encaja mejor: mucha interacción, estado que cambia y '
          + 'pocos usuarios simultáneos. No hace falta que sea público ni que posicione.',
      },
      {
        q: '¿Podéis retomar una aplicación React que empezó otro equipo?',
        a: 'Sí, empezando por revisar el código y las dependencias. Esa revisión se entrega '
          + 'aunque luego no se continúe: sirve para decidir con criterio.',
      },
      {
        q: '¿React hace que la web cargue más lento?',
        a: 'Puede, si se usa donde no hace falta. Para contenido que solo se lee conviene '
          + 'más un sitio estático; React se reserva para las pantallas que de verdad se manejan.',
      },
    ],
    relacionadas: ['nextjs', 'javascript'],
    bloques: ['intro', 'situaciones', 'servicios', 'arquitectura', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/desarrollo-web/'],
  },

  nodejs: {
    slug: 'nodejs',
    nombre: 'Node.js',
    etiqueta: 'Node.js',
    distintivo: 'que dos sistemas se hablen sin que nadie copie datos a mano',
    intencion:
      'Tiene sistemas que no se comunican y alguien está haciendo de puente a '
      + 'mano, o necesita un servicio que corra solo.',
    noEs: ['una pantalla', 'una web', 'diseño'],
    title: 'Programador Node.js en Almería | Platanito Rico',
    description:
      'Backend con Node.js: APIs, integraciones entre programas, automatizaciones y '
      + 'procesos programados. Para empresas de la provincia de Almería.',
    h1: 'Desarrollo backend con Node.js en Almería',
    entradilla:
      'Casi ningún encargo de Node.js empieza hablando de Node.js. Empieza con alguien '
      + 'que dedica dos horas al día a pasar datos de un sitio a otro, o con un programa '
      + 'que no se entiende con otro.',
    situaciones: [
      {
        encargo: 'Alguien copia cada mañana los pedidos de un sistema a otro.',
        respuesta:
          'Se automatiza la sincronización, con registro de lo que pasa y aviso cuando algo '
          + 'falla, para que el error se vea en vez de descubrirse semanas después.',
      },
      {
        encargo: 'Necesitamos que nuestro programa se conecte con el de un proveedor.',
        respuesta:
          'Se desarrolla la integración contra su API. Si no tiene, se busca la vía que sí '
          + 'ofrezca: ficheros, correo o base de datos.',
      },
      {
        encargo: 'Queremos una API para que nuestra app o nuestros clientes consulten datos.',
        respuesta:
          'Se construye la API con autenticación, control de uso y documentación, pensando '
          + 'desde el principio en que va a cambiar con el tiempo.',
      },
    ],
    servicios: [
      { titulo: 'APIs', descripcion: 'REST documentadas, con autenticación y control de uso.' },
      { titulo: 'Integraciones', descripcion: 'Entre programas de gestión, tiendas y servicios externos.' },
      { titulo: 'Automatizaciones', descripcion: 'Tareas repetitivas que pasan a ejecutarse solas.' },
      { titulo: 'Procesos programados', descripcion: 'Informes, sincronizaciones y avisos a su hora.' },
      { titulo: 'Backend para apps', descripcion: 'La parte que no se ve de una aplicación móvil o web.' },
    ],
    faq: [
      {
        q: '¿Podéis integrar nuestro programa de gestión si es antiguo?',
        a: 'Depende de lo que permita. Muchos programas antiguos no tienen API pero sí '
          + 'exportan ficheros o dejan leer su base de datos. Lo primero es comprobar qué '
          + 'vías ofrece, porque eso condiciona todo lo demás.',
      },
      {
        q: '¿Qué pasa si la integración falla un día?',
        a: 'Se diseña contando con que va a fallar: reintentos, registro de lo ocurrido y '
          + 'aviso. Una integración silenciosa que falla es peor que no tenerla.',
      },
      {
        q: '¿Node.js o PHP para un backend nuevo?',
        a: 'Si el equipo ya mantiene PHP, cambiar por cambiar no compensa. Node.js encaja '
          + 'bien cuando hay mucha espera a servicios externos o el frontend ya es JavaScript.',
      },
    ],
    relacionadas: ['javascript', 'nextjs', 'apps'],
    bloques: ['intro', 'situaciones', 'servicios', 'integraciones', 'arquitectura', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/informatica-empresas/', '/ia-empresas/'],
  },

  astro: {
    slug: 'astro',
    nombre: 'Astro',
    etiqueta: 'Astro',
    distintivo: 'quitar JavaScript de donde no hace falta',
    intencion:
      'Tiene un sitio de contenido que va lento o depende de demasiadas piezas, '
      + 'y quiere que cargue rápido sin rehacer el contenido.',
    noEs: ['una aplicación con usuarios', 'un panel', 'un backend'],
    title: 'Programador Astro en Almería | Platanito Rico',
    description:
      'Desarrollo con Astro: sitios de contenido rápidos, migraciones desde WordPress y '
      + 'mejora de Core Web Vitals. Con medición antes y después.',
    h1: 'Desarrollo con Astro en Almería',
    entradilla:
      'Astro es útil cuando un sitio envía al navegador mucho más JavaScript del que su '
      + 'contenido necesita. No es más rápido por definición: lo es porque no manda lo que '
      + 'no hace falta. En una aplicación con mucha interacción, esa ventaja desaparece.',
    situaciones: [
      {
        encargo: 'La web tarda en cargar y hemos probado todos los plugins de caché.',
        respuesta:
          'Se mide qué envía realmente la página. Si la mayor parte es JavaScript que no se '
          + 'usa, la caché no lo va a arreglar y conviene cambiar el planteamiento.',
      },
      {
        encargo: 'Queremos salir de WordPress sin perder el posicionamiento.',
        respuesta:
          'Se migra conservando las URLs, o con redirecciones 301 una a una cuando haya que '
          + 'cambiarlas. El contenido se traslada, no se reescribe.',
      },
      {
        encargo: 'Publicamos a menudo y no queremos depender de un servidor.',
        respuesta:
          'El sitio se genera estático y se publica en una red de distribución. Sin servidor '
          + 'que mantener ni actualizar, y con un panel para editar el contenido si hace falta.',
      },
    ],
    servicios: [
      { titulo: 'Sitios de contenido', descripcion: 'Corporativos, blogs y catálogos que cargan rápido.' },
      { titulo: 'Migraciones', descripcion: 'Desde WordPress u otro gestor, conservando URLs.' },
      { titulo: 'Core Web Vitals', descripcion: 'Medición antes, trabajo y medición después.' },
      { titulo: 'Islas interactivas', descripcion: 'Solo las partes que de verdad necesitan JavaScript.' },
      { titulo: 'Contenido editable', descripcion: 'Panel para publicar sin tocar el código.' },
    ],
    faq: [
      {
        q: '¿Astro siempre es más rápido que WordPress?',
        a: 'No. Es más rápido cuando el sitio manda JavaScript que no usa, que es el caso '
          + 'común. Un WordPress bien hecho y ligero puede ir perfectamente; la diferencia '
          + 'se ve midiendo, no discutiendo.',
      },
      {
        q: '¿Puedo seguir editando el contenido yo?',
        a: 'Sí. Se puede conectar un gestor de contenidos para publicar sin tocar código. '
          + 'Lo que cambia es que la web se genera al publicar, no en cada visita.',
      },
      {
        q: '¿Qué pasa con el SEO al migrar?',
        a: 'Se mantienen las URLs siempre que se pueda y, cuando no, se redirige cada una a '
          + 'su equivalente. Perder posiciones en una migración casi siempre es por URLs mal '
          + 'redirigidas, no por la tecnología.',
      },
    ],
    relacionadas: ['javascript', 'wordpress'],
    bloques: ['intro', 'situaciones', 'servicios', 'rendimiento', 'migraciones', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/desarrollo-web/', '/marketing/auditoria/'],
  },

  nextjs: {
    slug: 'nextjs',
    nombre: 'Next.js',
    etiqueta: 'Next.js',
    distintivo: 'aplicación y web en el mismo proyecto',
    intencion:
      'Necesita una aplicación React que además tenga parte pública que '
      + 'posicione, o zona privada con backend propio.',
    noEs: ['solo la interfaz', 'un sitio de contenido sin usuarios'],
    title: 'Desarrollador Next.js en Almería | Platanito Rico',
    description:
      'Aplicaciones con Next.js: zonas privadas, plataformas con backend propio y webs '
      + 'React que necesitan posicionar. Desarrollo para empresas de Almería.',
    h1: 'Desarrollo con Next.js en Almería',
    entradilla:
      'Next.js aparece cuando un proyecto necesita las dos mitades: pantallas de aplicación '
      + 'y páginas públicas que Google entienda, sin montar dos proyectos separados que '
      + 'luego haya que mantener por duplicado.',
    situaciones: [
      {
        encargo: 'Queremos una zona privada para clientes dentro de la web.',
        respuesta:
          'Se plantea con acceso por usuario y contenido propio de cada uno, manteniendo '
          + 'pública e indexable la parte que debe serlo.',
      },
      {
        encargo: 'Tenemos una aplicación React que no la ve Google.',
        respuesta:
          'Se pasa el renderizado al servidor para las partes públicas. La aplicación sigue '
          + 'funcionando igual para quien ya ha entrado.',
      },
      {
        encargo: 'Queremos lanzar un producto con suscripciones.',
        respuesta:
          'Aplicación, pagos y zona de cliente en un mismo proyecto, con la parte comercial '
          + 'preparada para posicionar.',
      },
    ],
    servicios: [
      { titulo: 'Zonas privadas', descripcion: 'Acceso por usuario, permisos y contenido propio.' },
      { titulo: 'Renderizado en servidor', descripcion: 'Para que la parte pública sea indexable.' },
      { titulo: 'Plataformas con suscripción', descripcion: 'Pagos recurrentes y zona de cliente.' },
      { titulo: 'API integrada', descripcion: 'Backend en el mismo proyecto cuando compensa.' },
      { titulo: 'Comercio headless', descripcion: 'Tienda con frontal propio sobre un catálogo externo.' },
    ],
    faq: [
      {
        q: '¿Cuál es la diferencia entre React y Next.js para mi proyecto?',
        a: 'React es la parte que se ve y necesita algo alrededor. Next.js ya trae ese '
          + 'alrededor: rutas, renderizado en servidor y backend. Si el proyecto es un panel '
          + 'interno, React basta; si necesita páginas públicas que posicionen, Next.js ahorra trabajo.',
      },
      {
        q: '¿Next.js vale para una web corporativa normal?',
        a: 'Se puede, pero suele ser más de lo necesario. Para un sitio de contenido sin '
          + 'usuarios, una web estática es más simple y más barata de mantener.',
      },
      {
        q: '¿Dónde se aloja una aplicación Next.js?',
        a: 'En plataformas pensadas para ello o en un servidor propio. La elección cambia el '
          + 'coste mensual, así que se decide antes de empezar y no al final.',
      },
    ],
    relacionadas: ['react', 'nodejs'],
    bloques: ['intro', 'situaciones', 'servicios', 'arquitectura', 'rendimiento', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/desarrollo-web/', '/soluciones/ecommerce/'],
  },

  javascript: {
    slug: 'javascript',
    nombre: 'JavaScript',
    etiqueta: 'JavaScript',
    distintivo: 'una pieza concreta dentro de algo que ya funciona',
    intencion:
      'Tiene una web y necesita que haga una cosa concreta que hoy no hace, sin '
      + 'rehacerla ni cambiar de tecnología.',
    noEs: ['rehacer la web', 'una aplicación completa', 'el backend'],
    title: 'Programador JavaScript en Almería | Platanito Rico',
    description:
      'Desarrollo JavaScript a medida: calculadoras, configuradores, integraciones en webs '
      + 'existentes y mantenimiento de código heredado. Sin rehacer lo que ya funciona.',
    h1: 'Programador JavaScript en Almería',
    entradilla:
      'No todo encargo justifica un framework. A veces lo que hace falta es una pieza que '
      + 'funcione dentro de lo que ya hay: un presupuestador, un configurador, un mapa que '
      + 'filtra. Montar React para eso añade mantenimiento sin añadir valor.',
    situaciones: [
      {
        encargo: 'Queremos que el cliente calcule el precio en la web antes de llamar.',
        respuesta:
          'Se desarrolla la calculadora con las reglas del negocio, para que se pueda '
          + 'incrustar en la web actual sea cual sea su tecnología.',
      },
      {
        encargo: 'Necesitamos un configurador de producto con opciones que dependen entre sí.',
        respuesta:
          'Se implementan las combinaciones válidas y el precio resultante, con la lógica '
          + 'en un sitio donde se pueda cambiar sin tocar el diseño.',
      },
      {
        encargo: 'Hay un script antiguo que nadie entiende y falla a veces.',
        respuesta:
          'Se lee, se documenta y se corrige lo que falla, o se reescribe si sale más a '
          + 'cuenta. La decisión se toma después de mirarlo, no antes.',
      },
    ],
    servicios: [
      { titulo: 'Calculadoras y presupuestadores', descripcion: 'Con las reglas reales del negocio.' },
      { titulo: 'Configuradores de producto', descripcion: 'Opciones dependientes y precio en vivo.' },
      { titulo: 'Mapas y filtros', descripcion: 'Sobre datos propios, incrustables en cualquier web.' },
      { titulo: 'Integraciones en el navegador', descripcion: 'Con servicios externos desde la web actual.' },
      { titulo: 'Código heredado', descripcion: 'Entender, documentar y arreglar lo que ya hay.' },
    ],
    faq: [
      {
        q: '¿Podéis añadir una funcionalidad sin rehacer nuestra web?',
        a: 'Sí, es el caso habitual. La pieza se desarrolla para funcionar dentro de la web '
          + 'actual, sea WordPress, un gestor a medida o HTML plano.',
      },
      {
        q: '¿Por qué JavaScript y no React para esto?',
        a: 'Porque para una pieza aislada un framework añade peso y mantenimiento sin '
          + 'aportar nada. React compensa cuando hay muchas pantallas y estado compartido.',
      },
      {
        q: '¿Podéis arreglar un script que hizo otra persona?',
        a: 'Sí. Se empieza leyéndolo y documentando qué hace, porque en código heredado la '
          + 'mitad del trabajo es entender por qué está escrito así.',
      },
    ],
    relacionadas: ['wordpress', 'react', 'astro'],
    bloques: ['intro', 'situaciones', 'servicios', 'integraciones', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/desarrollo-web/', '/soporte/'],
  },

  python: {
    slug: 'python',
    nombre: 'Python',
    etiqueta: 'Python',
    distintivo: 'trabajar con datos que hoy se procesan a mano',
    intencion:
      'Tiene datos en ficheros, hojas o sistemas distintos y alguien dedica horas '
      + 'a limpiarlos, cruzarlos o sacar un informe.',
    noEs: ['una web', 'una pantalla', 'conectar dos programas en tiempo real'],
    title: 'Programador Python en Almería | Platanito Rico',
    description:
      'Desarrollo con Python: procesos de datos, informes automáticos, extracción desde '
      + 'sistemas cerrados y scripts que sustituyen horas de trabajo manual.',
    h1: 'Programador Python en Almería',
    entradilla:
      'Python aparece cuando el problema es el dato: un fichero del banco que hay que '
      + 'cuadrar, un listado del proveedor en un formato imposible, un informe que alguien '
      + 'monta cada lunes copiando de tres sitios. No hace falta una aplicación para eso; '
      + 'hace falta un proceso que lo haga solo.',
    situaciones: [
      {
        encargo: 'Cada mes alguien cuadra a mano un fichero del banco con nuestras facturas.',
        respuesta:
          'Se automatiza el cotejo, dejando aparte lo que no cuadra para revisarlo. El '
          + 'trabajo pasa de leer todo a mirar solo las excepciones.',
      },
      {
        encargo: 'El proveedor nos manda un listado en un formato que no podemos importar.',
        respuesta:
          'Se convierte a lo que vuestro sistema espera, incluso si llega en PDF o en una '
          + 'hoja con el formato cambiado cada vez.',
      },
      {
        encargo: 'Sacamos el informe del lunes copiando de tres programas distintos.',
        respuesta:
          'Se programa para que se genere solo y llegue por correo a su hora, con los '
          + 'mismos números pero sin la mañana perdida.',
      },
      {
        encargo: 'Tenemos años de datos y nadie sabe qué dicen.',
        respuesta:
          'Se preparan y se analizan para responder preguntas concretas. Antes de hablar '
          + 'de predecir nada, conviene saber qué hay.',
      },
    ],
    servicios: [
      { titulo: 'Procesos de datos', descripcion: 'Limpiar, cruzar y transformar lo que hoy se hace a mano.' },
      { titulo: 'Informes automáticos', descripcion: 'Generados y enviados a su hora, sin intervención.' },
      { titulo: 'Lectura de documentos', descripcion: 'Extraer datos de PDF, facturas y listados.' },
      { titulo: 'Extracción de sistemas cerrados', descripcion: 'Sacar lo vuestro de programas sin API.' },
      { titulo: 'Análisis', descripcion: 'Responder preguntas concretas con los datos que ya hay.' },
    ],
    faq: [
      {
        q: '¿Python o una macro de Excel?',
        a: 'Si la macro funciona y la entiende alguien de la casa, se queda. Python compensa '
          + 'cuando el proceso toca varios ficheros o sistemas, tarda demasiado, o la macro '
          + 'ya la mantiene una sola persona y nadie más se atreve a tocarla.',
      },
      {
        q: '¿Podéis sacar datos de un programa que no tiene API?',
        a: 'Casi siempre hay una vía: un informe que exporta, una base de datos que se puede '
          + 'leer, o un fichero que genera. Lo primero es mirar qué ofrece antes de dar nada '
          + 'por imposible.',
      },
      {
        q: '¿Dónde se ejecuta eso, hace falta un servidor?',
        a: 'Depende de la frecuencia. Un proceso mensual puede correr en un ordenador de la '
          + 'oficina; uno diario compensa ponerlo en un servidor pequeño con aviso si falla.',
      },
    ],
    relacionadas: ['nodejs', 'genai'],
    bloques: ['intro', 'situaciones', 'servicios', 'integraciones', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/ia-empresas/', '/informatica-empresas/'],
  },

  genai: {
    slug: 'genai',
    nombre: 'IA generativa',
    etiqueta: 'IA generativa',
    distintivo: 'meter un modelo dentro de lo que ya tienes',
    intencion:
      'Tiene un sistema o una web funcionando y quiere añadirle un modelo de '
      + 'lenguaje: que responda sobre sus documentos, redacte o clasifique.',
    /* Distinción deliberada con /ia-empresas/, que vende sistemas de IA al
       negocio: allí se decide QUÉ automatizar y cuánto ahorra; aquí ya hay
       código y la pregunta es cómo se integra el modelo. Si esta página
       empieza a hablar de departamentos y retorno, está invadiendo la otra. */
    noEs: ['elegir qué automatizar en la empresa', 'un agente llave en mano', 'calcular el retorno'],
    title: 'Integración de IA generativa en tu software | Platanito Rico',
    description:
      'Desarrollo con modelos de lenguaje sobre sistemas que ya existen: búsqueda sobre '
      + 'vuestros documentos, clasificación automática y asistentes integrados.',
    h1: 'Integrar IA generativa en lo que ya tienes',
    entradilla:
      'Esta página es la parte técnica: ya hay un sistema y la pregunta es cómo se le mete '
      + 'un modelo dentro. Si lo que buscas es decidir qué conviene automatizar en tu '
      + 'empresa y cuánto ahorra, la sección de IA para empresas responde mejor a eso.',
    situaciones: [
      {
        encargo: 'Tenemos cientos de documentos y nadie encuentra nada.',
        respuesta:
          'Se monta búsqueda sobre esos documentos: se pregunta en lenguaje normal y la '
          + 'respuesta cita de dónde sale, para poder comprobarla.',
      },
      {
        encargo: 'Clasificamos correos y pedidos a mano, uno por uno.',
        respuesta:
          'El modelo propone la clasificación y una persona confirma lo dudoso. Con revisión '
          + 'humana donde importa, no automático a ciegas.',
      },
      {
        encargo: 'Probamos un asistente y contestaba cosas que no son ciertas.',
        respuesta:
          'Casi siempre es que responde de memoria en vez de con vuestros datos. Se ata a '
          + 'las fuentes y se le obliga a decir que no sabe cuando no sabe.',
      },
    ],
    servicios: [
      { titulo: 'Búsqueda sobre documentos', descripcion: 'Preguntar en lenguaje normal, con la fuente citada.' },
      { titulo: 'Clasificación asistida', descripcion: 'El modelo propone, una persona confirma.' },
      { titulo: 'Asistentes integrados', descripcion: 'Dentro de vuestra web o vuestro sistema.' },
      { titulo: 'Extracción de datos', descripcion: 'De facturas, albaranes y documentos sin formato fijo.' },
      { titulo: 'Control de coste', descripcion: 'Límites, caché y registro de lo que se gasta.' },
    ],
    faq: [
      {
        q: '¿En qué se diferencia esto de vuestra sección de IA para empresas?',
        a: 'En el punto de partida. Allí se decide qué conviene automatizar en la empresa y '
          + 'cuánto ahorra. Aquí ya hay un sistema funcionando y lo que se hace es meterle '
          + 'el modelo dentro. Si no tienes claro cuál te toca, empieza por la otra.',
      },
      {
        q: '¿Se pueden usar nuestros documentos sin que salgan fuera?',
        a: 'Se puede trabajar con modelos que se ejecutan en vuestra infraestructura, aunque '
          + 'cuesta más en servidor. Con modelos de terceros hay que mirar qué contrato '
          + 'ofrecen sobre retención de datos y decidirlo con los ojos abiertos.',
      },
      {
        q: '¿Cuánto cuesta mantener esto funcionando?',
        a: 'Depende del uso y del modelo, y varía mucho. Se instrumenta desde el principio '
          + 'para ver el gasto real y poder ponerle tope: un sistema de IA sin medición de '
          + 'coste es una factura esperando a sorprender.',
      },
      {
        q: '¿Y si el modelo se equivoca?',
        a: 'Se parte de que se va a equivocar. Por eso se ata a fuentes que se citan, se deja '
          + 'revisión humana donde el error cuesta dinero y se registra qué contestó para '
          + 'poder revisarlo.',
      },
    ],
    relacionadas: ['python', 'nodejs'],
    bloques: ['intro', 'situaciones', 'servicios', 'arquitectura', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/ia-empresas/', '/laboratorio-ia/'],
  },

  apps: {
    slug: 'apps',
    nombre: 'aplicaciones móviles',
    etiqueta: 'Aplicaciones móviles',
    distintivo: 'que funcione en el móvil de alguien que se mueve',
    intencion:
      'Necesita que su equipo o sus clientes usen algo desde el móvil, con o sin '
      + 'cobertura, y publicado o instalable.',
    noEs: ['una web que se ve bien en el móvil', 'un panel de escritorio'],
    title: 'Desarrollo de aplicaciones móviles en Almería | Platanito Rico',
    description:
      'Aplicaciones móviles para empresas: trabajo de campo, apps para clientes y '
      + 'aplicaciones web instalables. Con el backend y la publicación incluidos.',
    h1: 'Desarrollo de aplicaciones móviles en Almería',
    entradilla:
      'La primera pregunta no es con qué se programa, es si hace falta una app. Muchos '
      + 'encargos se resuelven con una web instalable, sin tiendas ni revisiones. Cuando sí '
      + 'hace falta —cámara, avisos, trabajo sin cobertura—, se plantea como app.',
    situaciones: [
      {
        encargo: 'El equipo de campo apunta los partes en papel y luego alguien los pasa.',
        respuesta:
          'Una aplicación que funcione sin cobertura y sincronice al volver. El papel '
          + 'desaparece de en medio y el dato entra una sola vez.',
      },
      {
        encargo: 'Queremos que nuestros clientes consulten sus datos desde el móvil.',
        respuesta:
          'Se valora primero una aplicación web instalable: sin tiendas, sin revisiones y '
          + 'con actualizaciones inmediatas. Si hace falta más, se va a app nativa.',
      },
      {
        encargo: 'Tenemos una app publicada que ya nadie mantiene.',
        respuesta:
          'Se revisa si compensa actualizarla o rehacerla. Las tiendas retiran las que '
          + 'llevan tiempo sin adaptarse a los requisitos nuevos.',
      },
    ],
    servicios: [
      { titulo: 'Apps de trabajo de campo', descripcion: 'Funcionan sin cobertura y sincronizan después.' },
      { titulo: 'Aplicaciones web instalables', descripcion: 'Sin pasar por las tiendas, actualización inmediata.' },
      { titulo: 'Apps para clientes', descripcion: 'Consulta de datos, avisos y gestiones.' },
      { titulo: 'Backend y API', descripcion: 'La parte de servidor que la app necesita.' },
      { titulo: 'Publicación y mantenimiento', descripcion: 'Subida a las tiendas y adaptación a sus requisitos.' },
    ],
    faq: [
      {
        q: '¿Necesito una app o me vale una web?',
        a: 'Si no hace falta cámara, avisos ni trabajar sin cobertura, normalmente vale una '
          + 'web instalable: se evita el proceso de las tiendas y se actualiza al momento.',
      },
      {
        q: '¿Hay que hacer dos apps, una para Android y otra para iPhone?',
        a: 'No necesariamente. Se puede desarrollar una sola que funcione en ambos, salvo '
          + 'que el proyecto necesite funciones muy específicas de un sistema.',
      },
      {
        q: '¿Quién publica la app en las tiendas?',
        a: 'Lo hacemos nosotros, pero las cuentas de desarrollador deben estar a nombre de '
          + 'la empresa. Así la app es suya y no depende de nadie.',
      },
    ],
    relacionadas: ['nodejs', 'react'],
    bloques: ['intro', 'situaciones', 'servicios', 'arquitectura', 'proceso', 'cobertura', 'relacionadas', 'faq', 'cta'],
    serviciosWeb: ['/desarrollo-web/', '/ia-empresas/'],
  },
};

export const ORDEN_TECNOLOGIAS: SlugTecnologia[] = [
  'wordpress', 'astro', 'react', 'nextjs', 'nodejs', 'python', 'genai', 'javascript', 'apps',
];

export const listaTecnologias = (): Tecnologia[] => ORDEN_TECNOLOGIAS.map((s) => TECNOLOGIAS[s]);

/** `apps` cuelga de su propia raíz: su intención no es "programador web". */
export function rutaTecnologia(slug: SlugTecnologia): string {
  return slug === 'apps' ? '/desarrollo-aplicaciones-moviles/' : `/programador-web/${slug}/`;
}

export function rutaLocal(slug: SlugTecnologia, municipio: string): string {
  return slug === 'apps'
    ? `/desarrollo-aplicaciones-moviles/${municipio}/`
    : `/programador-web/${slug}/${municipio}/`;
}
