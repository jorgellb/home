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
    },
  },
  {
    id: 'maquinaria',
    patron: /maquinaria|suministros industriales|proveedores industriales|alquiler de equipos/i,
    necesidades: {
      wordpress: 'catálogo de máquinas con despiece y recambios localizables',
      react: 'control de qué equipo está alquilado, a quién y hasta cuándo',
      nodejs: 'avisos automáticos de mantenimiento y revisiones por equipo',
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
    },
  },
  {
    id: 'agro-cooperativa',
    patron: /cooperativ|alh[óo]ndiga|productores y cooperativas/i,
    necesidades: {
      nodejs: 'integrar la subasta con las liquidaciones a cada socio',
      react: 'ver precios y entradas del día sin esperar al cierre',
      nextjs: 'un área privada donde cada socio consulte lo suyo',
    },
  },
  {
    id: 'agro-producto',
    patron: /agricultura ecol[óo]gica|km0|c[íi]tricos|agroturismo|explotaciones|productos del campo|agroalimentaci[óo]n|agricultura y|agricultura del/i,
    necesidades: {
      wordpress: 'venta directa con envío y control de campañas de temporada',
      astro: 'una web de producto que cargue rápido y se actualice en cosecha',
      javascript: 'calculadora de pedido por caja, peso o superficie',
    },
  },
  {
    id: 'pesca',
    patron: /pesca|lonja|marisquer[íi]a|producto del mar|restauraci[óo]n de pescado/i,
    necesidades: {
      wordpress: 'carta que cambia con lo que ha entrado hoy en la lonja',
      nodejs: 'pasar la subasta de lonja al sistema de venta sin teclearla',
      apps: 'registrar capturas a bordo y sincronizar en puerto',
    },
  },
  {
    id: 'jamon-igp',
    patron: /secader|jam[óo]n|igp/i,
    necesidades: {
      wordpress: 'tienda con envío refrigerado y la trazabilidad de cada pieza',
      nodejs: 'seguimiento de curación por lote y control de la certificación',
      react: 'panel de bodega: qué hay colgado, desde cuándo y qué sale esta semana',
    },
  },
  {
    id: 'bodega',
    patron: /bodega|enoturismo|moscatel/i,
    necesidades: {
      wordpress: 'venta de botella con control de añada y reserva de visita',
      javascript: 'reserva de cata con aforo por franja horaria',
      astro: 'una web de bodega que cargue rápido y se vea en varios idiomas',
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
    },
  },
  {
    id: 'restauracion',
    patron: /restaurant|chiringuito|hosteler[íi]a|gastronom[íi]a|bares de playa|restauraci[óo]n/i,
    necesidades: {
      wordpress: 'carta que se edita sin llamar a nadie y reserva de mesa',
      javascript: 'reserva con aforo por turno incrustada en la web actual',
      astro: 'una web que cargue al instante en el móvil de quien busca cerca',
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
    },
  },
  {
    id: 'patrimonio',
    patron: /museo|patrimonio|turismo cultural|hist[óo]rico|turismo industrial|el castillo|artesan[íi]a/i,
    necesidades: {
      astro: 'una web de contenido que cargue rápido y se lea en varios idiomas',
      wordpress: 'agenda de visitas y contenido que edita el propio equipo',
      javascript: 'un recorrido o mapa interactivo incrustado en la web actual',
    },
  },
  {
    id: 'comercio',
    patron: /comercio|retail|tienda|boutique|mercado/i,
    necesidades: {
      wordpress: 'vender online sobre la web que ya tienen, no empezar de cero',
      nodejs: 'que el stock de la tienda física y el de la online sean el mismo',
      javascript: 'configurador de producto con opciones que dependen entre sí',
    },
  },
  {
    id: 'construccion',
    patron: /construcci[óo]n|reforma|excavacion|movimiento de tierras|obra|hogar/i,
    necesidades: {
      javascript: 'un presupuestador en la web con sus propias tarifas',
      apps: 'partes de obra con fotos desde el tajo, sin papel',
      wordpress: 'catálogo de trabajos hechos que se actualiza sin tocar el código',
    },
  },
  {
    id: 'salud',
    patron: /salud|cl[íi]nica|bienestar|dental|fisio/i,
    necesidades: {
      wordpress: 'cita previa conectada con la agenda que ya usan',
      nextjs: 'área privada donde cada paciente vea lo suyo',
      react: 'agenda de varios profesionales en una sola pantalla',
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
    },
  },
];

/** Familia a la que pertenece un sector documentado, o null si no encaja en
 *  ninguna. Null es una respuesta legítima: significa que sobre ese sector no
 *  tenemos nada concreto que decir todavía. */
export function familiaDe(sector: string): FamiliaSector | null {
  return FAMILIAS.find((f) => f.patron.test(sector)) ?? null;
}
