/* Hubs por sector: /programador-web/sectores/<slug>/
 *
 * Por qué existen, y por qué son la parte del clúster que sí se indexa entera.
 *
 * Las páginas por municipio fracasaron en la medición: de 633 palabras, 588
 * eran molde y 45 propias, porque «lo que necesita una empresa» apenas cambia
 * al cruzar el término municipal. Lo que SÍ cambia de verdad es el sector. Un
 * secadero de jamón con IGP, una alhóndiga y una cantera de mármol tienen
 * problemas de software que no se parecen en nada, y eso se puede escribir sin
 * repetirse y sin inventar.
 *
 * Cada hub de aquí lleva contenido propio y sustancial. Si alguien añade uno
 * nuevo copiando la estructura y cambiando cuatro palabras, habrá reproducido
 * exactamente el problema que estas páginas vinieron a resolver.
 *
 * LÍMITE QUE NO SE CRUZA: esto describe cómo funciona ese tipo de negocio y
 * qué software necesita —comprobable por cualquiera que lo conozca— y en
 * ningún caso afirma que tengamos un cliente ahí. No hay cifras de sector, ni
 * número de empresas, ni casos. Si algún día hay un proyecto real que contar,
 * se añade como caso y se dice de quién es.
 */
import type { SlugTecnologia } from './tecnologias';

export interface SectorHub {
  slug: string;
  nombre: string;
  /** Para breadcrumb y listados. */
  etiqueta: string;
  title: string;
  description: string;
  h1: string;
  /** Dos o tres párrafos propios. Es el grueso de lo que hace única la página. */
  entrada: string[];
  /** El problema concreto del sector, en sus términos. */
  problemas: { titulo: string; texto: string }[];
  /** Qué tecnología resuelve qué, aquí. El orden importa: primero la que más
   *  encargos trae en este sector. */
  tecnologias: { slug: SlugTecnologia; porque: string }[];
  /** Municipios donde este sector está documentado en nuestro dataset. Se
   *  enlazan sus landings de diseño web, que existen y están indexadas. */
  municipios: string[];
  faq: { q: string; a: string }[];
}

export const SECTOR_HUBS: SectorHub[] = [
  {
    slug: 'marmol',
    nombre: 'el mármol',
    etiqueta: 'Mármol y piedra natural',
    title: 'Software para empresas de mármol en Almería | Platanito Rico',
    description:
      'Desarrollo para canteras, talleres y exportadores de mármol: catálogos técnicos, '
      + 'extranet de distribuidores, control de producción y calculadoras de despiece.',
    h1: 'Desarrollo para empresas de mármol',
    entrada: [
      'La comarca del mármol concentra en pocos kilómetros toda la cadena: canteras que '
      + 'arrancan bloque, talleres que lo transforman, proveedores de maquinaria y '
      + 'exportadores que venden fuera. Cada eslabón tiene un problema informático '
      + 'distinto, y casi ninguno se parece al de una tienda online al uso.',
      'El producto es la dificultad. Una pieza de piedra natural no es una referencia con '
      + 'stock: es un bloque con su veta, su tono y su lote, y dos piezas del mismo '
      + 'material no son intercambiables. Eso rompe cualquier catálogo pensado para vender '
      + 'artículos idénticos, y es la razón por la que tantas empresas del sector acaban '
      + 'llevando el catálogo real en un PDF que alguien actualiza a mano.',
    ],
    problemas: [
      {
        titulo: 'El catálogo vive en un PDF',
        texto:
          'Se manda por correo, se queda desactualizado y nadie sabe cuál es la última '
          + 'versión. Lo que hace falta es que cada material tenga su ficha con acabados, '
          + 'formatos y su documentación técnica descargable, y que se actualice sin '
          + 'rehacer el documento entero.',
      },
      {
        titulo: 'Cada distribuidor tiene su precio',
        texto:
          'Enseñar tarifa pública no sirve cuando el precio depende del acuerdo con cada '
          + 'cliente y del volumen. Se resuelve con acceso por cliente: entra, ve sus '
          + 'precios y hace el pedido sin llamar.',
      },
      {
        titulo: 'Producción y gestión no se hablan',
        texto:
          'Lo que sale del taller se vuelve a teclear en el programa de facturación. '
          + 'Cada vez que se teclea dos veces, hay una oportunidad de que no cuadre.',
      },
      {
        titulo: 'Presupuestar lleva media mañana',
        texto:
          'Metros, despiece, cantos, desperdicio. Es un cálculo con reglas fijas que se '
          + 'puede poner en la web para que el cliente llegue con una cifra aproximada en '
          + 'la cabeza y la conversación empiece más adelante.',
      },
    ],
    tecnologias: [
      { slug: 'wordpress', porque: 'catálogo de materiales con ficha técnica sobre la web que ya tienen' },
      { slug: 'nextjs', porque: 'extranet de distribuidores con precio por cliente' },
      { slug: 'nodejs', porque: 'conectar producción, almacén y facturación' },
      { slug: 'javascript', porque: 'calculadora de metros y despiece incrustada en la web actual' },
      { slug: 'astro', porque: 'catálogo pesado que cargue rápido desde otros países' },
    ],
    municipios: ['macael', 'cantoria', 'olula-del-rio', 'fines', 'albox'],
    faq: [
      {
        q: '¿Se puede enseñar el material real y no una foto de catálogo?',
        a: 'Sí, y suele ser la diferencia. Se monta la ficha para que admita fotografía del '
          + 'lote concreto además de la imagen genérica del material. Quien compra piedra '
          + 'sabe que el tono cambia entre partidas y quiere ver la suya.',
      },
      {
        q: '¿Podéis conectar con nuestro programa de gestión aunque sea antiguo?',
        a: 'Depende de lo que permita. Muchos programas del sector no tienen API pero sí '
          + 'exportan ficheros o dejan leer su base de datos. Lo primero es comprobar qué '
          + 'vías ofrece, porque eso condiciona todo lo demás.',
      },
      {
        q: '¿Hace falta rehacer la web para tener catálogo B2B?',
        a: 'No necesariamente. Si la web actual está en WordPress y se mantiene, el área de '
          + 'distribuidores se puede montar encima. Rehacer solo compensa cuando lo que hay '
          + 'ya da problemas por su cuenta.',
      },
    ],
  },

  {
    slug: 'agricultura',
    nombre: 'la agricultura intensiva',
    etiqueta: 'Agricultura y cooperativas',
    title: 'Software para empresas agrícolas y cooperativas en Almería | Platanito Rico',
    description:
      'Desarrollo para invernaderos, cooperativas y alhóndigas: integración entre campo, '
      + 'almacén y facturación, trazabilidad por partida y partes sin cobertura.',
    h1: 'Desarrollo para el sector agrícola',
    entrada: [
      'En el campo almeriense el dato nace lejos del ordenador: en el invernadero, en el '
      + 'muelle de entrada, en la báscula. El recorrido desde ahí hasta la factura es '
      + 'donde se pierde tiempo y donde aparecen los descuadres, porque suele estar hecho '
      + 'de papel, hojas de cálculo y alguien que los pasa a limpio.',
      'A eso se suma la trazabilidad, que ya no es opcional: hay que poder decir de qué '
      + 'partida salió cada palé y con qué tratamientos. Cuando esa información vive en '
      + 'cuadernos distintos, responder a una auditoría cuesta días en vez de minutos.',
    ],
    problemas: [
      {
        titulo: 'Los partes llegan en papel',
        texto:
          'Alguien los pasa por la tarde, con el margen de error que eso tiene. Una '
          + 'aplicación que funcione sin cobertura y sincronice al volver quita el paso '
          + 'intermedio y el dato entra una sola vez.',
      },
      {
        titulo: 'Campo, almacén y facturación no se hablan',
        texto:
          'Tres sistemas y una persona haciendo de puente cada mañana. Se integra para que '
          + 'lo que entra por un lado aparezca en el otro, con registro de lo que pasa y '
          + 'aviso cuando algo falla.',
      },
      {
        titulo: 'La trazabilidad se reconstruye a mano',
        texto:
          'Saber qué partida fue a qué cliente debería ser una consulta, no una tarde de '
          + 'archivo. Se resuelve guardando la relación desde el principio, no '
          + 'reconstruyéndola después.',
      },
      {
        titulo: 'Los socios llaman para saber lo suyo',
        texto:
          'Liquidaciones, entradas, precios. Un área privada donde cada uno consulte sus '
          + 'datos quita llamadas y evita que la misma información se mande veinte veces.',
      },
    ],
    tecnologias: [
      { slug: 'nodejs', porque: 'integrar campo, almacén y facturación sin teclear dos veces' },
      { slug: 'apps', porque: 'partes que funcionan sin cobertura y sincronizan al volver' },
      { slug: 'react', porque: 'trazabilidad por partida y lote en una sola pantalla' },
      { slug: 'nextjs', porque: 'área privada para socios y comerciales' },
      { slug: 'wordpress', porque: 'catálogo B2B con precios por cliente para exportación' },
    ],
    municipios: ['el-ejido', 'vicar', 'adra', 'nijar', 'cuevas-del-almanzora'],
    faq: [
      {
        q: '¿La aplicación de campo funciona sin cobertura?',
        a: 'Se diseña para eso. Guarda en el propio móvil y sincroniza cuando vuelve a '
          + 'haber señal. En invernadero y en finca dar por hecha la cobertura es dar por '
          + 'hecho que la aplicación no se va a usar.',
      },
      {
        q: '¿Se puede integrar con el ERP que ya tenemos?',
        a: 'Si tiene API, directamente. Si no, por los ficheros que exporte o leyendo su '
          + 'base de datos. Antes de presupuestar se comprueba qué vías ofrece, porque '
          + 'cambia bastante el planteamiento.',
      },
      {
        q: '¿Esto sustituye a nuestro programa de gestión?',
        a: 'Normalmente no, y no suele interesar. Lo habitual es dejar el programa donde '
          + 'está y construir alrededor lo que le falta, que es más barato y menos '
          + 'arriesgado que cambiar el sistema con el que factura la empresa.',
      },
    ],
  },

  {
    slug: 'turismo',
    nombre: 'el turismo y el alojamiento',
    etiqueta: 'Turismo y alojamiento',
    title: 'Desarrollo web para hoteles, apartamentos y turismo en Almería | Platanito Rico',
    description:
      'Reserva directa sin comisión, sincronización con portales, venta de actividades por '
      + 'franja horaria y webs multiidioma que cargan rápido.',
    h1: 'Desarrollo para turismo y alojamiento',
    entrada: [
      'El problema del alojamiento en la costa no es tener web: es que la reserva entra por '
      + 'el portal y se lleva su comisión. Montar reserva directa propia no consiste en '
      + 'poner un formulario, sino en que la disponibilidad esté sincronizada para que '
      + 'nadie venda dos veces la misma noche.',
      'Y hay un segundo frente, el de las experiencias: rutas, visitas, actividades '
      + 'náuticas, observación astronómica. Ahí lo que se vende es una franja horaria con '
      + 'plazas limitadas, que es un problema distinto al de la habitación y se resuelve '
      + 'con otras piezas.',
    ],
    problemas: [
      {
        titulo: 'La comisión del portal',
        texto:
          'Cada reserva que entra por un intermediario deja un porcentaje por el camino. La '
          + 'reserva directa no elimina los portales —siguen trayendo clientes nuevos— pero '
          + 'sí recupera al que ya te conoce y buscaba tu nombre.',
      },
      {
        titulo: 'Sobreventa por descuadre de calendarios',
        texto:
          'Dos canales, un mismo apartamento y ninguna sincronización. Se conecta la '
          + 'disponibilidad para que al confirmar en un sitio se bloquee en el resto.',
      },
      {
        titulo: 'La web no está en el idioma del cliente',
        texto:
          'Buena parte de la demanda llega de fuera. No basta con traducir: hay que servir '
          + 'cada versión en su URL para que se encuentre en cada idioma.',
      },
      {
        titulo: 'Las actividades se apuntan por WhatsApp',
        texto:
          'Plazas, horarios y pagos en una conversación. Se pasa a un sistema con aforo por '
          + 'franja, para dejar de contar cabezas a mano el día de la salida.',
      },
    ],
    tecnologias: [
      { slug: 'nextjs', porque: 'reserva directa propia con pago y zona de cliente' },
      { slug: 'nodejs', porque: 'sincronizar disponibilidad con los portales' },
      { slug: 'astro', porque: 'web multiidioma que cargue rápido con mala conexión' },
      { slug: 'javascript', porque: 'reserva por franja horaria sobre la web actual' },
      { slug: 'wordpress', porque: 'motor de reservas sobre la web que ya tienen' },
    ],
    municipios: ['mojacar', 'roquetas-de-mar', 'vera', 'carboneras', 'san-juan-de-los-terreros', 'tabernas'],
    faq: [
      {
        q: '¿La reserva directa sustituye a los portales?',
        a: 'No, y plantearlo así suele salir mal. Los portales traen clientes que no te '
          + 'conocen. La reserva directa sirve para quedarte con el que ya te buscaba por '
          + 'tu nombre y hoy entra por el portal de todos modos.',
      },
      {
        q: '¿Cómo se evita vender dos veces la misma noche?',
        a: 'Con sincronización de disponibilidad entre los canales. Es la parte que de '
          + 'verdad importa y la que más veces se deja para el final; conviene resolverla '
          + 'antes de abrir la reserva directa, no después.',
      },
      {
        q: '¿Merece la pena tener la web en varios idiomas?',
        a: 'Si una parte de tus clientes llega de fuera, sí, pero hecho de forma que cada '
          + 'idioma tenga su dirección propia. Una web que traduce sobre la marcha con un '
          + 'botón no se posiciona en el idioma traducido.',
      },
    ],
  },

  {
    slug: 'pesca',
    nombre: 'la pesca y la lonja',
    etiqueta: 'Pesca y producto del mar',
    title: 'Software para pesca, lonja y restauración de producto en Almería | Platanito Rico',
    description:
      'Desarrollo para el sector pesquero: carta que cambia con la lonja, paso de la subasta '
      + 'al sistema de venta y registro de capturas desde el barco.',
    h1: 'Desarrollo para pesca y producto del mar',
    entrada: [
      'Lo que distingue a este sector de cualquier otro comercio es que el catálogo cambia '
      + 'cada día y no lo decide el vendedor. Lo decide lo que ha entrado en la lonja esa '
      + 'mañana. Un sistema pensado para un catálogo estable no sirve: aquí el producto de '
      + 'hoy puede no existir mañana y el precio se fija en subasta.',
      'Eso afecta a toda la cadena, del barco al restaurante. Y como el dato nace en el '
      + 'muelle y a bordo, cualquier solución que dé por hecha una oficina con ordenador '
      + 'se queda a medias.',
    ],
    problemas: [
      {
        titulo: 'La carta no se corresponde con lo que hay',
        texto:
          'Se imprime una carta fija y luego el camarero explica qué no hay. Una carta que '
          + 'se edita en dos minutos desde el móvil, y que se puede consultar por QR, evita '
          + 'esa conversación cada servicio.',
      },
      {
        titulo: 'La subasta se teclea otra vez',
        texto:
          'Lo adjudicado en lonja se vuelve a introducir en el sistema de venta. Es el '
          + 'clásico paso manual que se puede automatizar en cuanto la lonja permita '
          + 'exportar lo suyo de alguna forma.',
      },
      {
        titulo: 'Las capturas se apuntan en papel',
        texto:
          'A bordo no hay cobertura. Una aplicación que guarde en el propio dispositivo y '
          + 'sincronice al llegar a puerto resuelve el registro sin depender de la señal.',
      },
    ],
    tecnologias: [
      { slug: 'wordpress', porque: 'carta que cambia con lo que ha entrado hoy' },
      { slug: 'nodejs', porque: 'pasar la subasta al sistema de venta sin teclearla' },
      { slug: 'apps', porque: 'registrar capturas a bordo y sincronizar en puerto' },
      { slug: 'javascript', porque: 'disponibilidad del día incrustada en la web actual' },
    ],
    municipios: ['garrucha', 'carboneras', 'adra'],
    faq: [
      {
        q: '¿Se puede cambiar la carta a diario sin llamar a nadie?',
        a: 'Sí, ese es el objetivo. Se monta para que se edite desde el móvil en un par de '
          + 'minutos, porque si cuesta más que eso no se actualiza y el sistema deja de '
          + 'servir a la semana.',
      },
      {
        q: '¿Podéis conectar con el sistema de la lonja?',
        a: 'Depende de lo que permita cada lonja. Antes de prometer nada hay que ver si '
          + 'ofrece alguna vía de exportación; si no la hay, se busca el punto siguiente de '
          + 'la cadena donde el dato ya esté en formato manejable.',
      },
    ],
  },

  {
    slug: 'inmobiliaria',
    nombre: 'la inmobiliaria de costa',
    etiqueta: 'Inmobiliaria',
    title: 'Desarrollo web para inmobiliarias en Almería | Platanito Rico',
    description:
      'Buscadores con filtros sobre toda la cartera, sincronización con portales sin '
      + 'republicar a mano y fichas que Google indexa.',
    h1: 'Desarrollo para inmobiliarias',
    entrada: [
      'Una inmobiliaria de costa trabaja con dos públicos que no se comportan igual: el '
      + 'comprador de la zona y el de fuera, que busca en otro idioma, compara a distancia '
      + 'y quiere ver mucho antes de moverse. La web tiene que servir a los dos sin '
      + 'convertirse en dos webs.',
      'El cuello de botella suele ser la cartera. Está en un gestor, se publica en varios '
      + 'portales y alguien la mantiene al día en todos. Cada inmueble que cambia de precio '
      + 'o se vende obliga a repetir el mismo trabajo en cuatro sitios.',
    ],
    problemas: [
      {
        titulo: 'La cartera se publica a mano en cada portal',
        texto:
          'Mismo inmueble, cuatro formularios. Se sincroniza desde el gestor para que se '
          + 'publique una vez y llegue a todas partes, incluida la web propia.',
      },
      {
        titulo: 'El buscador no filtra como busca la gente',
        texto:
          'Nadie busca «tres habitaciones» a secas: busca zona, precio, piscina y a cuánto '
          + 'está del mar, todo a la vez. Eso necesita una interfaz que responda mientras se '
          + 'escribe y que refleje los filtros en la dirección, para poder mandarla por correo.',
      },
      {
        titulo: 'Las fichas no aparecen en Google',
        texto:
          'Si el buscador carga los inmuebles después de abrir la página, sus fichas pueden '
          + 'no llegar a indexarse. Se resuelve sirviendo la ficha ya montada desde el '
          + 'servidor, sin renunciar al buscador dinámico.',
      },
      {
        titulo: 'El propietario llama para saber cómo va lo suyo',
        texto:
          'Visitas, interesados, estado. Una zona privada donde cada propietario lo consulte '
          + 'quita llamadas y da una imagen de control que se nota.',
      },
    ],
    tecnologias: [
      { slug: 'react', porque: 'buscador con filtros combinados sobre toda la cartera' },
      { slug: 'nextjs', porque: 'fichas indexables y zona privada de propietarios' },
      { slug: 'nodejs', porque: 'sincronizar la cartera con los portales' },
      { slug: 'wordpress', porque: 'fichas conectadas con el gestor de cartera' },
    ],
    municipios: ['mojacar', 'los-gallardos', 'vera', 'roquetas-de-mar', 'almeria'],
    faq: [
      {
        q: '¿Podéis conectar con nuestro CRM inmobiliario?',
        a: 'Si tiene API o permite exportar, sí. La mayoría de los CRM del sector ofrecen '
          + 'alguna vía, aunque no siempre la misma en los dos sentidos, y eso conviene '
          + 'saberlo antes de decidir qué sistema manda sobre cada dato.',
      },
      {
        q: '¿Las fichas de inmueble se posicionan en Google?',
        a: 'Solo si se sirven ya montadas desde el servidor. Un buscador que carga los '
          + 'inmuebles después de abrir la página funciona muy bien para quien navega y '
          + 'puede dejar las fichas fuera del índice.',
      },
      {
        q: '¿Se puede tener la web en inglés sin duplicar el trabajo?',
        a: 'Sí, con la cartera en un solo sitio y las versiones de idioma generadas a partir '
          + 'de ella. Lo que se traduce una sola vez son los textos fijos; los datos del '
          + 'inmueble son los mismos en las dos versiones.',
      },
    ],
  },
];

export const hubDeSector = (slug: string): SectorHub | undefined =>
  SECTOR_HUBS.find((s) => s.slug === slug);
