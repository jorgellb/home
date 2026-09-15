/* Línea de negocio Sistemas IT: servicios, Plan 360 y zona de cobertura
   presencial. Las páginas de /informatica-empresas/ y /plan-360/ se generan a
   partir de estos datos, así que el copy vive en un solo sitio.

   SEO: `title` va sin la marca (BaseLayout añade « | Platanito Rico», 17
   caracteres) y debe quedarse en ≤43; `description` entre 120 y 160. */

export interface Faq {
  q: string;
  a: string;
}

export interface Bloque {
  t: string;
  d: string;
}

export type IconoIT = 'helpdesk' | 'red' | 'servidor' | 'equipo' | 'escudo';

export interface ServicioIT {
  slug: string;
  nav: string;
  icon: IconoIT;
  title: string;
  description: string;
  h1: string;
  h2: string;
  resumen: string;
  intro: string;
  dolores: string[];
  incluye: Bloque[];
  paraQuien: string[];
  faq: Faq[];
}

export const HUB_IT = '/informatica-empresas/';

export const serviciosIT: ServicioIT[] = [
  {
    slug: 'mantenimiento-informatico',
    nav: 'Mantenimiento informático',
    icon: 'helpdesk',
    title: 'Mantenimiento Informático para Empresas',
    description: 'Mantenimiento informático preventivo y correctivo para empresas del Levante y el Almanzora. Helpdesk remoto y técnico in situ el mismo día, sin permanencia.',
    h1: 'Mantenimiento informático preventivo para empresas',
    h2: 'Helpdesk remoto y técnico in situ el mismo día en Vera, Huércal-Overa y Albox',
    resumen: 'Revisiones preventivas, helpdesk remoto y visita el mismo día cuando algo falla.',
    intro: 'Un ordenador que no arranca a primera hora cuesta dinero: facturas que no salen, clientes esperando y empleados parados. Nuestro equipo de sistemas revisa tus equipos cada mes, resuelve las incidencias en remoto en minutos y, cuando hace falta, se presenta en tu empresa el mismo día.',
    dolores: [
      'Equipos lentos que nadie revisa hasta que se rompen',
      'Actualizaciones de Windows que paran la oficina en plena jornada',
      'Depender del conocido que «sabe de ordenadores»',
      'No saber qué equipos, licencias ni contraseñas tiene la empresa',
    ],
    incluye: [
      { t: 'Preventivo mensual', d: 'Revisamos equipos, discos, actualizaciones, antivirus y copias. Detectamos el fallo antes de que te pare.' },
      { t: 'Helpdesk remoto', d: 'Llamas, escribes por WhatsApp o abres una incidencia y un técnico se conecta a tu equipo en minutos.' },
      { t: 'Visita el mismo día', d: 'Si no se puede resolver en remoto, vamos a tu empresa el mismo día en el Levante y el Almanzora.' },
      { t: 'Inventario y contraseñas', d: 'Registro de equipos, garantías, licencias y accesos, entregado a ti y actualizado cada mes.' },
      { t: 'Altas y bajas de empleados', d: 'Preparamos el puesto de quien entra y cerramos los accesos de quien se va, el mismo día.' },
      { t: 'Informe mensual', d: 'Qué hemos hecho, qué riesgos vemos y qué conviene renovar, explicado sin tecnicismos.' },
    ],
    paraQuien: ['Gestorías y asesorías', 'Clínicas, dentistas y centros de estética', 'Hoteles, apartamentos y restaurantes', 'Comercios, talleres y distribuidoras'],
    faq: [
      { q: '¿Cuánto cuesta el mantenimiento informático de una empresa?', a: 'Depende del número de puestos y servidores. Para una pyme de hasta 10 puestos, el Plan 360 incluye mantenimiento informático, red y web por 400 € + IVA al mes. Si solo necesitas una parte, te preparamos un presupuesto cerrado a medida.' },
      { q: '¿Qué zonas cubrís con visita presencial?', a: 'Vamos in situ el mismo día en el Levante y el Almanzora: Vera, Garrucha, Mojácar, Turre, Antas, Cuevas del Almanzora, Pulpí, Huércal-Overa, Albox y Olula del Río. En el resto de la provincia damos soporte remoto y visitas programadas.' },
      { q: '¿Hay permanencia?', a: 'No. El mantenimiento es mes a mes. Si te vas, te entregamos el inventario, las contraseñas y la documentación de tu red.' },
      { q: '¿Trabajáis con Mac y con Windows?', a: 'Sí. Mantenemos Windows, macOS y Linux, además de impresoras, TPV, NAS y dispositivos de red.' },
    ],
  },
  {
    slug: 'redes-wifi',
    nav: 'Redes y wifi',
    icon: 'red',
    title: 'Instalación de Redes y Wifi para Empresas',
    description: 'Cableado estructurado, racks, wifi profesional y firewall para oficinas, hoteles y naves en Almería. Estudio de cobertura y red separada para clientes.',
    h1: 'Instalación de redes y wifi profesional para empresas',
    h2: 'Cableado estructurado, racks y firewall que no se caen en plena jornada',
    resumen: 'Cableado, racks, wifi profesional y firewall para oficinas, hoteles y naves.',
    intro: 'La mitad de las «averías» de una oficina son la red: un router de operadora saturado, un wifi que no llega a la última mesa o un cable pisado bajo la silla. Diseñamos e instalamos redes profesionales, con cobertura medida, una red separada para clientes y un firewall que sabe quién entra.',
    dolores: [
      'Wifi que se corta en la terraza, las habitaciones o el almacén',
      'Clientes conectados a la misma red que tus ordenadores y tu TPV',
      'Un armario lleno de cables que nadie se atreve a tocar',
      'Cámaras, impresoras y datáfonos que pierden la conexión',
    ],
    incluye: [
      { t: 'Estudio de cobertura', d: 'Medimos la señal en tu local antes de instalar, para poner los puntos de acceso donde hacen falta.' },
      { t: 'Cableado estructurado', d: 'Tomas de red certificadas, canalización ordenada y rack etiquetado que cualquier técnico entiende.' },
      { t: 'Wifi profesional', d: 'Puntos de acceso gestionados con itinerancia entre salas, ideales para hoteles, restaurantes y naves.' },
      { t: 'Red de invitados separada', d: 'Tus clientes navegan sin ver tus ordenadores, tu TPV ni tus cámaras.' },
      { t: 'Firewall y VPN', d: 'Controlamos qué entra y sale de tu red y damos acceso seguro a quien teletrabaja.' },
      { t: 'Línea de respaldo', d: 'Si se cae la fibra, la oficina sigue trabajando con una línea móvil de respaldo automática.' },
    ],
    paraQuien: ['Hoteles, apartamentos turísticos y campings', 'Oficinas y despachos', 'Naves, almacenes y cooperativas', 'Restaurantes y comercios con TPV'],
    faq: [
      { q: '¿Cuánto cuesta instalar una red wifi profesional?', a: 'Depende de los metros, las paredes y el número de puntos de acceso. Tras el estudio de cobertura te damos un presupuesto cerrado, con material y mano de obra desglosados.' },
      { q: '¿Podéis aprovechar el cableado que ya tengo?', a: 'Sí, si está en buen estado. Lo revisamos, lo etiquetamos y solo cambiamos lo que falla o limita la velocidad.' },
      { q: '¿El mantenimiento de la red entra en el Plan 360?', a: 'Sí. El Plan 360 incluye la red de la oficina: vigilancia, actualizaciones del firewall y resolución de incidencias.' },
    ],
  },
  {
    slug: 'servidores-copias-seguridad',
    nav: 'Servidores y copias',
    icon: 'servidor',
    title: 'Servidores, NAS y Copias de Seguridad',
    description: 'Servidores, NAS y copias de seguridad 3-2-1 para empresas de Almería. Copias verificadas cada mes, nube cifrada y plan de recuperación ante ransomware.',
    h1: 'Servidores, NAS y copias de seguridad para empresas',
    h2: 'Que un disco roto o un ransomware no paren tu negocio ni un día',
    resumen: 'NAS, servidores y copias 3-2-1 verificadas, en local y en la nube cifrada.',
    intro: 'Casi todas las empresas «tienen copias» hasta el día en que intentan recuperar una. Montamos tu servidor o NAS, configuramos copias automáticas con la regla 3-2-1 y, lo más importante, comprobamos cada mes que se pueden restaurar.',
    dolores: [
      'Copias en un disco USB siempre enchufado, que el ransomware cifra también',
      'Nadie ha probado nunca a restaurar una copia',
      'Carpetas compartidas sin permisos: todo el mundo ve todo',
      'Un servidor antiguo del que depende la facturación',
    ],
    incluye: [
      { t: 'Regla 3-2-1', d: 'Tres copias, en dos soportes distintos y una fuera de la oficina, en la nube cifrada.' },
      { t: 'Pruebas de restauración', d: 'Cada mes recuperamos archivos de prueba para demostrar que la copia funciona.' },
      { t: 'NAS y servidores', d: 'Instalamos y mantenemos NAS y servidores Windows o Linux, con discos en espejo y avisos de fallo.' },
      { t: 'Copias inmutables', d: 'Copias que ni un ransomware ni un empleado pueden borrar durante su periodo de retención.' },
      { t: 'Correo y nube', d: 'También copiamos Microsoft 365 y Google Workspace, que no vienen protegidos por defecto.' },
      { t: 'Plan de recuperación', d: 'Un documento claro con qué hacer y en cuánto tiempo volvéis a trabajar si algo falla.' },
    ],
    paraQuien: ['Gestorías, asesorías y despachos', 'Clínicas con historias clínicas', 'Empresas con ERP o programa de facturación', 'Estudios de arquitectura e ingeniería'],
    faq: [
      { q: '¿Qué es la regla 3-2-1 de copias de seguridad?', a: 'Tener tres copias de tus datos, en dos tipos de soporte diferentes y una de ellas fuera de la oficina. Es el mínimo para sobrevivir a un robo, un incendio o un ransomware.' },
      { q: '¿Mis datos en la nube cumplen el RGPD?', a: 'Sí. Usamos almacenamiento cifrado en centros de datos de la Unión Europea y firmamos contigo el contrato de encargado del tratamiento.' },
      { q: '¿Qué pasa si nos entra un ransomware?', a: 'Aislamos los equipos afectados, los limpiamos y restauramos desde la última copia inmutable. Con copias verificadas, la empresa vuelve a trabajar en horas, no en semanas.' },
    ],
  },
  {
    slug: 'ordenadores-equipos',
    nav: 'Ordenadores y equipos',
    icon: 'equipo',
    title: 'Ordenadores para Empresas: Venta y Montaje',
    description: 'Venta, instalación y reparación de ordenadores para empresas en Almería: PCs, portátiles, Mac, TPV e impresoras configurados y listos para trabajar.',
    h1: 'Venta, instalación y reparación de ordenadores para empresas',
    h2: 'PCs, portátiles, Mac, TPV e impresoras configurados y listos para trabajar',
    resumen: 'PCs, portátiles, Mac, TPV e impresoras: asesoría, instalación y reparación.',
    intro: 'Comprar el ordenador es lo fácil; lo caro es la mañana perdida configurándolo. Te asesoramos sobre qué equipo necesita cada puesto, lo preparamos con tus programas, correo y copias, y lo dejamos funcionando en tu mesa. Si algo se rompe, lo reparamos o te dejamos un equipo de sustitución.',
    dolores: [
      'Ordenadores comprados en oferta que se quedan cortos al año',
      'Cada equipo configurado de una manera distinta',
      'Impresoras y TPV que dejan de funcionar tras una actualización',
      'Equipos viejos con datos de clientes que nadie borra',
    ],
    incluye: [
      { t: 'Asesoría de compra', d: 'Te recomendamos el equipo justo para cada puesto, sin pagar potencia que no vas a usar.' },
      { t: 'Puesta en marcha', d: 'Instalamos sistema, programas, correo, impresoras, antivirus y copias. Llega a la mesa listo para trabajar.' },
      { t: 'Todo tipo de equipos', d: 'Sobremesa, portátiles, Mac, estaciones de trabajo, TPV, impresoras, escáneres y periféricos.' },
      { t: 'Reparación y ampliaciones', d: 'Diagnóstico, cambio a SSD, ampliación de memoria y reparación de hardware.' },
      { t: 'Equipo de sustitución', d: 'Si la reparación tarda, te dejamos un equipo para que el puesto no se quede parado.' },
      { t: 'Borrado seguro y reciclaje', d: 'Borramos los datos de los equipos que retiras y los llevamos a un gestor autorizado.' },
    ],
    paraQuien: ['Oficinas que renuevan equipos', 'Negocios que abren o se amplían', 'Comercios y restaurantes con TPV', 'Autónomos que necesitan un portátil fiable'],
    faq: [
      { q: '¿Vendéis los ordenadores o solo los instaláis?', a: 'Las dos cosas. Podemos suministrarte el equipo con factura y garantía, o configurar e instalar el que tú compres.' },
      { q: '¿Reparáis ordenadores de particulares?', a: 'Nuestro servicio está pensado para empresas y autónomos, que necesitan el equipo funcionando cuanto antes.' },
      { q: '¿Cuánto tarda la puesta en marcha de un equipo nuevo?', a: 'Normalmente lo entregamos configurado en 24–48 horas desde que llega el material.' },
    ],
  },
  {
    slug: 'ciberseguridad',
    nav: 'Ciberseguridad',
    icon: 'escudo',
    title: 'Ciberseguridad para Pymes en Almería',
    description: 'Ciberseguridad para pymes en Almería: antivirus gestionado, correo protegido, doble factor, formación contra el phishing y RGPD sin tecnicismos.',
    h1: 'Ciberseguridad para pymes en Almería',
    h2: 'Antivirus gestionado, Microsoft 365 seguro y RGPD sin tecnicismos',
    resumen: 'Antivirus gestionado, correo protegido, doble factor y formación antiphishing.',
    intro: 'A los ciberdelincuentes no les importa que tu empresa sea pequeña: les importa que sea fácil. Un correo falso, una contraseña repetida o un equipo sin actualizar bastan. Cerramos esas puertas con herramientas profesionales y enseñamos a tu equipo a detectar un engaño.',
    dolores: [
      'Facturas falsas y correos que suplantan a proveedores',
      'La misma contraseña para todo, apuntada en un pósit',
      'Antivirus gratuitos que nadie revisa',
      'Dudas sobre qué exige el RGPD a tu empresa',
    ],
    incluye: [
      { t: 'Antivirus y EDR gestionado', d: 'Protección avanzada en cada equipo, vigilada por nosotros: si salta una alerta, actuamos.' },
      { t: 'Correo protegido', d: 'Filtros contra phishing y suplantación, y configuración SPF, DKIM y DMARC de tu dominio.' },
      { t: 'Doble factor y contraseñas', d: 'Activamos el doble factor en correo y aplicaciones e implantamos un gestor de contraseñas.' },
      { t: 'Microsoft 365 seguro', d: 'Revisamos permisos, accesos y reglas sospechosas en tu Microsoft 365 o Google Workspace.' },
      { t: 'Formación antiphishing', d: 'Una sesión práctica para tu equipo con ejemplos reales de engaños.' },
      { t: 'RGPD práctico', d: 'Medidas técnicas, control de accesos y documentación para cumplir sin papeleo absurdo.' },
    ],
    paraQuien: ['Empresas que manejan datos de clientes', 'Clínicas y centros sanitarios', 'Inmobiliarias y gestorías', 'Comercios con tienda online'],
    faq: [
      { q: '¿Una pyme pequeña necesita ciberseguridad?', a: 'Sí. La mayoría de los ataques son automáticos y buscan empresas con poca protección. Un antivirus gestionado, el doble factor y copias verificadas evitan la mayoría de los problemas.' },
      { q: '¿Qué hago si he recibido un correo sospechoso?', a: 'No hagas clic ni respondas. Reenvíanoslo y lo analizamos. Si ya has hecho clic, llámanos cuanto antes para cambiar contraseñas y revisar el equipo.' },
      { q: '¿La ciberseguridad está incluida en el Plan 360?', a: 'Sí: el antivirus/EDR gestionado, las actualizaciones y las copias verificadas forman parte del Plan 360.' },
    ],
  },
];

export function getServicioIT(slug: string): ServicioIT | undefined {
  return serviciosIT.find((s) => s.slug === slug);
}

/* ─── Plan 360 ─────────────────────────────────────────────────────────── */

export const plan360 = {
  href: '/plan-360/',
  title: 'Plan 360: Web + Informática por 400 €/mes',
  description: 'Plan 360 para pymes de Almería: web profesional, mantenimiento informático, red, copias y ciberseguridad por 400 € + IVA al mes. Sin permanencia ni alta.',
  h1: 'Plan 360: web y mantenimiento informático por 400 € al mes',
  h2: 'Tu departamento de tecnología completo, sin contratarlo y sin permanencia',
  precio: 400,
  puestos: 10,
  precioPuestoExtra: 25,
  incluye: [
    { t: 'Web profesional incluida', d: 'Diseño a medida, hosting, SSL, correo y mantenimiento de tu web. Cambios de contenido cuando los necesites.' },
    { t: 'Hasta 10 puestos + servidor', d: 'Ordenadores, portátiles, 1 servidor o NAS y la red de tu oficina, cubiertos por la cuota.' },
    { t: 'Preventivo mensual in situ', d: 'Un técnico revisa tus equipos, la red y las copias en tu empresa una vez al mes.' },
    { t: 'Helpdesk remoto ilimitado', d: 'Todas las incidencias que necesites en horario laboral, por teléfono, WhatsApp o correo.' },
    { t: 'Visita el mismo día', d: 'En el Levante y el Almanzora, si algo no se puede resolver en remoto, vamos el mismo día.' },
    { t: 'Copias 3-2-1 verificadas', d: 'Copia local y en la nube cifrada, con prueba de restauración cada mes.' },
    { t: 'Antivirus/EDR y parches', d: 'Protección gestionada y actualizaciones de sistema controladas, fuera del horario de trabajo.' },
    { t: 'Inventario e informe mensual', d: 'Equipos, licencias, garantías y riesgos, en un informe que se entiende.' },
    { t: 'Compras e instalaciones', d: 'Te asesoramos en la compra de equipos y los instalamos sin coste de mano de obra.' },
  ] satisfies Bloque[],
  noIncluye: [
    'Material y licencias: equipos, Microsoft 365 o programas de terceros se facturan aparte.',
    'Proyectos nuevos, como una instalación de red completa o una migración grande, con presupuesto propio.',
    'Visitas fuera de la zona de cobertura presencial (en el resto de la provincia, soporte remoto).',
  ],
  comparativa: [
    { concepto: 'Técnico de sistemas en plantilla', coste: 'Desde unos 2.000 €/mes', nota: 'Sueldo y Seguridad Social, y no se encarga de tu web.' },
    { concepto: 'Llamar a un técnico cuando algo falla', coste: 'Imprevisible', nota: 'Cada visita se paga y el problema suele volver.' },
    { concepto: 'Plan 360', coste: '400 € + IVA/mes', nota: 'Web, informática, red, copias y ciberseguridad, con visita el mismo día.', destacado: true },
  ],
  salida: 'Sin permanencia y sin cuota de alta. Tu web, tu dominio y tus datos están a tu nombre desde el primer día: si te das de baja, te lo entregamos todo exportado y documentado.',
  faq: [
    { q: '¿Qué incluye exactamente el Plan 360?', a: 'Tu web profesional con hosting y mantenimiento, el mantenimiento informático de hasta 10 puestos y 1 servidor o NAS, la red de la oficina, copias de seguridad verificadas, antivirus gestionado, helpdesk remoto ilimitado y visita el mismo día en el Levante y el Almanzora.' },
    { q: '¿Tiene permanencia o cuota de alta?', a: 'No. Pagas 400 € + IVA al mes y puedes darte de baja cuando quieras. La web, el dominio y los datos son tuyos desde el primer día.' },
    { q: '¿Y si tengo más de 10 puestos?', a: 'Cada puesto adicional cuesta 25 € + IVA al mes. Para empresas grandes o con varias sedes preparamos un plan a medida.' },
    { q: '¿Ya tengo web, puedo contratar el Plan 360?', a: 'Sí. Revisamos tu web actual: si está en buen estado la mantenemos, y si conviene rehacerla, la nueva va incluida en el plan.' },
    { q: '¿Qué zonas cubre la visita el mismo día?', a: 'Vera, Garrucha, Mojácar, Turre, Antas, Cuevas del Almanzora, Pulpí, Huércal-Overa, Albox y Olula del Río. En el resto de la provincia de Almería damos soporte remoto y visitas programadas.' },
    { q: '¿Cuánto tardáis en poner el plan en marcha?', a: 'Hacemos una auditoría inicial de equipos, red y copias en la primera semana, y a partir de ahí el plan funciona desde el primer día.' },
  ] satisfies Faq[],
};

/* ─── Zona de cobertura presencial ─────────────────────────────────────── */

export interface PuebloIT {
  slug: string;
  nombre: string;
  comarca: 'Levante Almeriense' | 'Valle del Almanzora';
  intro: string;
  sectores: string[];
}

export const pueblosIT: PuebloIT[] = [
  {
    slug: 'vera',
    nombre: 'Vera',
    comarca: 'Levante Almeriense',
    intro: 'Vera es nuestra base: desde aquí salimos cada mañana. Damos servicio a gestorías, inmobiliarias de Vera Playa, hoteles y comercios del centro, con un técnico en la puerta en cuestión de minutos.',
    sectores: ['Inmobiliarias y alquiler turístico de Vera Playa', 'Hoteles y restauración', 'Gestorías y comercios del centro'],
  },
  {
    slug: 'garrucha',
    nombre: 'Garrucha',
    comarca: 'Levante Almeriense',
    intro: 'En Garrucha trabajamos con negocios que viven del puerto y del paseo: restaurantes, lonja, náutica y apartamentos. Wifi que llega a la terraza, TPV que no se caen en agosto y copias de la facturación.',
    sectores: ['Restaurantes y terrazas del paseo', 'Empresas del puerto y la lonja', 'Apartamentos y alquiler vacacional'],
  },
  {
    slug: 'mojacar',
    nombre: 'Mojácar',
    comarca: 'Levante Almeriense',
    intro: 'Mojácar multiplica su actividad en temporada y la tecnología tiene que aguantar el ritmo. Instalamos wifi profesional en hoteles y apartamentos, mantenemos los equipos de recepción y protegemos las reservas.',
    sectores: ['Hoteles y apartamentos turísticos', 'Restaurantes y beach clubs', 'Inmobiliarias con clientes internacionales'],
  },
  {
    slug: 'turre',
    nombre: 'Turre',
    comarca: 'Levante Almeriense',
    intro: 'Turre reúne empresas de construcción y servicios que trabajan en todo el Levante. Mantenemos sus oficinas, sus redes y los portátiles que van y vienen de obra.',
    sectores: ['Construcción y reformas', 'Servicios a residentes', 'Comercio local'],
  },
  {
    slug: 'antas',
    nombre: 'Antas',
    comarca: 'Levante Almeriense',
    intro: 'En Antas damos soporte a empresas agrícolas, talleres y comercios del municipio, con redes que cubren almacenes y naves y copias de seguridad de la gestión.',
    sectores: ['Explotaciones agrícolas y almacenes', 'Industria y talleres', 'Comercio y servicios'],
  },
  {
    slug: 'cuevas-del-almanzora',
    nombre: 'Cuevas del Almanzora',
    comarca: 'Levante Almeriense',
    intro: 'De Cuevas a Villaricos y Palomares, el municipio mezcla agricultura intensiva, logística y turismo de costa. Montamos redes en almacenes hortofrutícolas y mantenemos oficinas y alojamientos.',
    sectores: ['Almacenes hortofrutícolas y cooperativas', 'Logística y transporte', 'Turismo en Villaricos y Palomares'],
  },
  {
    slug: 'pulpi',
    nombre: 'Pulpí',
    comarca: 'Levante Almeriense',
    intro: 'Pulpí crece con la agricultura, la logística y el turismo que atrae la Geoda. Instalamos redes en naves y oficinas de campo y mantenemos los equipos que no pueden fallar en plena campaña.',
    sectores: ['Agricultura y exportación', 'Logística y naves', 'Turismo de la Geoda y San Juan de los Terreros'],
  },
  {
    slug: 'huercal-overa',
    nombre: 'Huércal-Overa',
    comarca: 'Valle del Almanzora',
    intro: 'Huércal-Overa es el centro comercial y de servicios del Almanzora bajo. Damos soporte a asesorías, clínicas, concesionarios y empresas de transporte y ganadería de la comarca.',
    sectores: ['Asesorías y clínicas', 'Transporte y ganadería', 'Comercio comarcal'],
  },
  {
    slug: 'albox',
    nombre: 'Albox',
    comarca: 'Valle del Almanzora',
    intro: 'Albox es uno de los grandes núcleos comerciales del Almanzora. Mantenemos equipos y redes de comercios, talleres, gestorías y empresas que venden en toda la provincia.',
    sectores: ['Comercio y distribución', 'Talleres y concesionarios', 'Gestorías y servicios profesionales'],
  },
  {
    slug: 'olula-del-rio',
    nombre: 'Olula del Río',
    comarca: 'Valle del Almanzora',
    intro: 'Olula del Río forma, junto a Macael, el corazón del mármol. Instalamos redes en naves y oficinas de empresas de la piedra y mantenemos sus equipos de diseño y gestión.',
    sectores: ['Empresas del mármol y la piedra', 'Naves e industria', 'Comercio y servicios'],
  },
];

export function getPuebloIT(slug: string): PuebloIT | undefined {
  return pueblosIT.find((p) => p.slug === slug);
}
