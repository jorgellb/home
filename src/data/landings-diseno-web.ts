/* GENERADO a partir de las landings de pueblo hechas a mano (2026-09-14).
   Contenido propio de cada pueblo (textos, sectores, datos locales, bloques
   singulares, testimonios y FAQ) para la plantilla única de /diseno-web/.
   Se puede editar a mano: ya no se regenera. */

export interface Cabecera {
  h2: string;
  lead: string;
}

export interface LandingManual {
  slug: string;
  title: string;
  description: string;
  h1: string;
  heroLead: string;
  lugares: { name: string; sub: string; desc: string; dato: string }[];
  lugaresHead: Cabecera | null;
  datos: { k: string; v: string }[];
  datosHead: Cabecera | null;
  sectores: { nombre: string; stat: string; statLabel: string; desc: string; tags: string[] }[];
  sectoresHead: Cabecera | null;
  diferenciales: { title: string; desc: string }[];
  diferencialesHead: Cabecera | null;
  testimonios: { nombre: string; negocio: string; texto: string }[];
  testimoniosHead: Cabecera | null;
  faq: { q: string; a: string }[];
  faqHead: Cabecera | null;
  extras: { key: string; head: Cabecera | null; items: { t: string; d: string; meta?: string }[] }[];
  ctaHead: Cabecera | null;
}

export const landingsManuales: Record<string, LandingManual> = {
  "adra": {
    "slug": "adra",
    "title": "Diseño Web en Adra: Pesca, Agro y Turismo",
    "description": "Diseño web en Adra para restaurantes, empresas hortofrutícolas con web B2B multiidioma, apartamentos de playa y comercio local. Presupuesto en 24 h.",
    "h1": "Diseño web donde el mar y el invernadero se tocan",
    "heroLead": "Adra es puerto pesquero, cinturón hortofrutícola y playa familiar en el mismo término municipal. Tres economías, tres clientes distintos y tres partidos diferentes que jugar en Google. Con una web genérica no se gana ninguno.",
    "lugares": [
      {
        "name": "Puerto Pesquero",
        "sub": "LONJA ACTIVA A DIARIO",
        "desc": "Uno de los puertos pesqueros más activos del Mediterráneo andaluz. Cada madrugada la lonja subasta el pescado que llega a las mesas de toda la comarca: gamba, pescadilla, boquerón y marisco de bajura.",
        "dato": "Lonja diaria"
      },
      {
        "name": "Abdera Fenicia",
        "sub": "FUNDADA S. VIII a.C.",
        "desc": "Adra es una de las ciudades con más historia de Almería. La fenicia Abdera se fundó hace casi 3.000 años, lo que la convierte en uno de los asentamientos continuamente habitados más antiguos de la península.",
        "dato": "3.000 años"
      },
      {
        "name": "Mar de Invernaderos",
        "sub": "CINTURÓN DEL PONIENTE",
        "desc": "Adra forma parte del cinturón hortofrutícola que exporta a media Europa. Cooperativas y manipulados mueven producto a Alemania, Francia y Países Bajos durante toda la campaña.",
        "dato": "Export europea"
      },
      {
        "name": "Albuferas de Adra",
        "sub": "RESERVA NATURAL",
        "desc": "Dos lagunas litorales declaradas Reserva Natural y humedal de importancia internacional. Refugio de la malvasía cabeciblanca y punto de parada para aves migratorias entre Europa y África.",
        "dato": "Humedal protegido"
      }
    ],
    "lugaresHead": {
      "h2": "Cuatro cosas que solo tiene Adra",
      "lead": "Uno de los puertos pesqueros más activos del Mediterráneo andaluz. Cada madrugada la lonja subasta el pescado que llega a las mesas de toda la comarca: gamba, pescadilla, boquerón y marisco de bajura."
    },
    "datos": [
      {
        "k": "FUNDACIÓN",
        "v": "Abdera fenicia · s. VIII a.C."
      },
      {
        "k": "POBLACIÓN",
        "v": "25.000 hab · 2ª del Poniente"
      },
      {
        "k": "PUERTO",
        "v": "Pesquero activo · lonja diaria"
      },
      {
        "k": "NATURALEZA",
        "v": "Reserva de las Albuferas de Adra"
      },
      {
        "k": "ECONOMÍA",
        "v": "Pesca · Invernadero · Turismo"
      },
      {
        "k": "COBERTURA",
        "v": "Berja · Balanegra · Balerma · El Ejido"
      }
    ],
    "datosHead": null,
    "sectores": [
      {
        "nombre": "Pesca, Lonja y Restauración",
        "stat": "Diaria",
        "statLabel": "descarga en lonja",
        "desc": "El puerto de Adra descarga cada día pescado y marisco fresco que abastece a toda la comarca. Restaurantes, pescaderías y la propia lonja pueden posicionarse como destino gastronómico con carta digital, fotografía de producto y SEO para \"pescado fresco Adra\" y \"restaurante puerto Adra\".",
        "tags": [
          "SEO pescado fresco",
          "Carta digital",
          "Reservas de mesa",
          "Google Business"
        ]
      },
      {
        "nombre": "Agricultura Intensiva y Manipulado",
        "stat": "B2B",
        "statLabel": "export europea",
        "desc": "Adra forma parte del cinturón hortofrutícola del Poniente. Cooperativas, manipulados y empresas de suministro agrícola necesitan webs B2B con catálogo, certificaciones y multiidioma para vender a compradores europeos, igual que sus vecinos de El Ejido.",
        "tags": [
          "Web B2B agro",
          "Certificaciones",
          "Multiidioma export",
          "SEO internacional"
        ]
      },
      {
        "nombre": "Turismo de Costa y Alojamiento",
        "stat": "0%",
        "statLabel": "comisión directa",
        "desc": "Las playas de Adra y el paraje de las Albuferas atraen un turismo familiar tranquilo. Apartamentos, casas vacacionales y hostelería de playa que aparezcan bien en Google captan reservas directas sin depender de las plataformas.",
        "tags": [
          "Reservas directas",
          "SEO playa Adra",
          "Galería de fotos",
          "Apartamentos"
        ]
      },
      {
        "nombre": "Comercio Local y Hostelería",
        "stat": "25k",
        "statLabel": "habitantes",
        "desc": "Con 25.000 habitantes, Adra tiene un tejido comercial denso que compite con la oferta de El Ejido. Tiendas, bares y comercios de barrio con ficha de Google cuidada y web sencilla retienen al cliente que hoy se va a comprar fuera.",
        "tags": [
          "Ficha de Google",
          "Web de comercio",
          "Reseñas",
          "SEO local"
        ]
      },
      {
        "nombre": "Servicios Profesionales",
        "stat": "2ª",
        "statLabel": "ciudad del Poniente",
        "desc": "Gestorías, clínicas, asesorías y despachos de Adra atienden a pescadores, agricultores y familias de toda la franja costera. Una web con formulario, servicios claros y Google Maps optimizado capta al cliente que busca profesional cerca.",
        "tags": [
          "Captación de leads",
          "Google Maps",
          "Formularios",
          "SEO servicios"
        ]
      },
      {
        "nombre": "Náutica y Ocio Marítimo",
        "stat": "Puerto",
        "statLabel": "deportivo y pesquero",
        "desc": "El puerto no solo es pesca: amarres, mantenimiento de embarcaciones, escuelas náuticas y excursiones en barco son negocios con clientela de toda la costa granadina y almeriense que apenas compiten en Google.",
        "tags": [
          "Reserva de actividades",
          "SEO náutico",
          "Multiidioma",
          "Calendario online"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Seis mercados, seis estrategias distintas",
      "lead": "El puerto de Adra descarga cada día pescado y marisco fresco que abastece a toda la comarca. Restaurantes, pescaderías y la propia lonja pueden posicionarse como destino gastronómico con carta digital, fotografía de producto y SEO para \"pescado fresco Adra\" y \"restaurante puerto Adra\"."
    },
    "diferenciales": [
      {
        "title": "Tres economías en pocos kilómetros",
        "desc": "Pesca, agricultura bajo plástico y turismo de costa conviven en el mismo término municipal. Cada una juega un partido distinto en Google: la lonja compite por \"dónde comer pescado\", el agro por compradores europeos y los apartamentos por la reserva directa. Una web genérica no gana ninguno de los tres."
      },
      {
        "title": "Segunda ciudad del Poniente",
        "desc": "Con 25.000 habitantes, Adra es la segunda localidad de la comarca tras El Ejido. Es mercado suficiente para sostener comercio y servicios propios, pero muchos negocios pierden clientes que acaban comprando en El Ejido simplemente porque allí sí los encuentran en Google."
      },
      {
        "title": "Export que necesita multiidioma",
        "desc": "Las hortofrutícolas de Adra venden a Alemania, Francia y Países Bajos. Un comprador europeo que llega a una web solo en español y sin certificaciones visibles se va a la siguiente. El multiidioma no es un extra aquí: es la condición para competir."
      },
      {
        "title": "Una costa que casi nadie conoce",
        "desc": "Las playas de Adra y las Albuferas atraen turismo familiar tranquilo, muy por debajo de la saturación de Roquetas o Mojácar. Ese es justo el argumento de venta, y hoy apenas se cuenta: quien lo comunique bien capta al visitante que huye de la masificación."
      }
    ],
    "diferencialesHead": {
      "h2": "Por qué Adra no se parece a ningún otro pueblo",
      "lead": "Pesca, agricultura bajo plástico y turismo de costa conviven en el mismo término municipal. Cada una juega un partido distinto en Google: la lonja compite por \"dónde comer pescado\", el agro por compradores europeos y los apartamentos por la reserva directa. Una web genérica no gana ninguno de los tres."
    },
    "testimonios": [
      {
        "nombre": "Salvador Martín",
        "negocio": "Restaurante de pescado del puerto",
        "texto": "Vivíamos del cliente de toda la vida y poco más. Con la web, la carta y las fotos del pescado del día, ahora vienen a comer desde El Ejido y Berja. Aparecemos los primeros cuando buscan marisco en Adra."
      },
      {
        "nombre": "Inmaculada Ruiz",
        "negocio": "Apartamentos en primera línea",
        "texto": "Tenía los apartamentos solo en un portal con comisión. La web con reservas directas me ha traído familias que repiten cada verano y reservan sin intermediarios. Adra tiene playas preciosas que poca gente conoce."
      }
    ],
    "testimoniosHead": {
      "h2": "Lo cuentan mejor ellos",
      "lead": "Vivíamos del cliente de toda la vida y poco más. Con la web, la carta y las fotos del pescado del día, ahora vienen a comer desde El Ejido y Berja. Aparecemos los primeros cuando buscan marisco en Adra."
    },
    "faq": [
      {
        "q": "¿Hacéis webs para restaurantes y negocios de pescado en Adra?",
        "a": "Sí. Creamos webs con carta digital, fotografía de producto, reservas de mesa y SEO para \"pescado fresco Adra\", \"marisquería Adra\" y \"restaurante puerto\". Contamos la frescura del producto de la lonja, que es vuestro mejor argumento de venta."
      },
      {
        "q": "¿Trabajáis con empresas agrícolas y de manipulado de Adra?",
        "a": "Sí, igual que en El Ejido y el resto del Poniente. Hacemos webs B2B con catálogo de producto, certificaciones visibles y multiidioma (inglés, alemán, francés) para vender a compradores europeos. SEO internacional incluido."
      },
      {
        "q": "¿Cuánto cuesta una web para un negocio en Adra?",
        "a": "Una web corporativa o de restaurante desde 450€ con hosting gratuito. Web de apartamentos con reservas directas o portal B2B agro, según funcionalidades. Presupuesto cerrado en 24h, sin sorpresas."
      },
      {
        "q": "¿Podéis montar reservas directas para mis apartamentos?",
        "a": "Sí. Montamos motor de reserva propio con calendario, precios por temporada y pago online, para que dejes de pagar comisión en cada noche vendida. Los portales siguen siendo un canal más, pero la reserva directa pasa a ser la principal."
      },
      {
        "q": "¿Hacéis webs multiidioma para exportar a Europa?",
        "a": "Sí, y en el Poniente es casi obligatorio. Traducimos a inglés, alemán y francés con SEO específico en cada idioma, no con traductor automático, para que un comprador alemán te encuentre buscando en su idioma."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Adra?",
        "a": "Sí. Estamos en Vera y nos desplazamos al Poniente para reunirnos en tu negocio, tu almacén o el puerto. La primera consulta es gratuita y sin compromiso."
      },
      {
        "q": "¿En cuánto tiempo tengo la web lista?",
        "a": "Web corporativa o de restaurante: 1–2 semanas. Con reservas directas o catálogo B2B: 2–3 semanas. Con multiidioma completo y SEO internacional: 3–4 semanas."
      },
      {
        "q": "¿Ayudáis también con Google y las reseñas?",
        "a": "Sí. Configuramos y optimizamos tu ficha de Google Business Profile para Adra, te enseñamos a pedir reseñas sin resultar pesado y trabajamos el SEO local para que aparezcas en el mapa cuando alguien busca cerca."
      }
    ],
    "faqHead": {
      "h2": "Lo que nos preguntan siempre",
      "lead": "Sí. Creamos webs con carta digital, fotografía de producto, reservas de mesa y SEO para \"pescado fresco Adra\", \"marisquería Adra\" y \"restaurante puerto\". Contamos la frescura del producto de la lonja, que es vuestro mejor argumento de venta."
    },
    "extras": [],
    "ctaHead": null
  },
  "albox": {
    "slug": "albox",
    "title": "Diseño Web en Albox | SEO local bilingüe",
    "description": "Diseño web y SEO en Albox para comercio del Valle del Almanzora, mármol y comunidad británica. Webs bilingües ES/EN. Presupuesto gratis en 24h.",
    "h1": "Diseño web en Albox, el mercado del Valle",
    "heroLead": "12.000 habitantes, mercado tradicional cada martes desde 1850, capital comercial del Valle del Almanzora y puerta a la industria del mármol de Macael. SEO local + bilingüe ES/EN para captar la comunidad británica.",
    "lugares": [],
    "lugaresHead": null,
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "12.000 hab · capital del Valle"
      },
      {
        "k": "MERCADO",
        "v": "Cada martes desde 1850 · +200 puestos"
      },
      {
        "k": "COMARCA",
        "v": "Valle del Almanzora · 35 municipios"
      },
      {
        "k": "INDUSTRIA",
        "v": "Mármol Macael a 15 km · exportación"
      },
      {
        "k": "COMUNIDAD",
        "v": "~2.000 británicos residentes en el área"
      },
      {
        "k": "PATRIMONIO",
        "v": "Santuario del Saliente · barroco"
      }
    ],
    "datosHead": {
      "h2": "Por qué Albox pesa",
      "lead": "Datos reales del municipio. Cabeza comarcal, mercado histórico, cercanía a la industria del mármol y comunidad internacional activa."
    },
    "sectores": [
      {
        "nombre": "Comercio local y mercado",
        "stat": "12k",
        "statLabel": "habitantes",
        "desc": "Albox es el centro comercial del Valle, con su famoso mercado semanal. Creamos tiendas online para que tus productos lleguen a toda España, catálogos digitales y webs con reserva de pedidos.",
        "tags": [
          "Tienda online",
          "Catálogo digital",
          "Pasarela de pago",
          "Pedidos online"
        ]
      },
      {
        "nombre": "Industria del mármol y piedra",
        "stat": "B2B",
        "statLabel": "exportación mundial",
        "desc": "El Valle del Almanzora es referencia mundial en mármol. Webs corporativas para canteras, fábricas y distribuidores con catálogo técnico multiidioma y captación de leads internacionales.",
        "tags": [
          "Catálogo técnico",
          "Fichas de producto",
          "Multiidioma",
          "Leads internacionales"
        ]
      },
      {
        "nombre": "Servicios profesionales",
        "stat": "#1",
        "statLabel": "Google local",
        "desc": "Abogados, gestorías, aseguradoras, arquitectos e ingenieros de Albox. Webs que transmiten confianza con formularios cualificados, blog de autoridad y posicionamiento local.",
        "tags": [
          "Web corporativa",
          "Formularios inteligentes",
          "SEO local",
          "Blog profesional"
        ]
      },
      {
        "nombre": "Salud y bienestar",
        "stat": "24/7",
        "statLabel": "citas online",
        "desc": "Clínicas dentales, fisioterapeutas, psicólogos, farmacias, veterinarios y centros de estética en Albox. Citas online, RGPD sanitario y posicionamiento para captar pacientes de toda la comarca.",
        "tags": [
          "Citas online",
          "RGPD sanitario",
          "Ficha de servicios",
          "SEO salud"
        ]
      },
      {
        "nombre": "Hostelería y restauración",
        "stat": "x2",
        "statLabel": "reservas online",
        "desc": "Restaurantes, bares, cafeterías y alojamientos rurales. Carta digital QR, reservas online, integración Google Maps y fotografía profesional de platos.",
        "tags": [
          "Carta digital QR",
          "Reservas online",
          "Google Maps",
          "Fotos profesionales"
        ]
      },
      {
        "nombre": "Construcción e inmobiliarias",
        "stat": "+35%",
        "statLabel": "presupuestos",
        "desc": "Constructoras, reformas, electricistas, fontaneros e inmobiliarias de Albox. Portales con buscador de propiedades, portfolios de obras y SEO local + bilingüe para la comunidad británica.",
        "tags": [
          "Portfolio de obras",
          "Presupuestos online",
          "Portal propiedades",
          "SEO bilingüe"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios del Valle",
      "lead": "Seis sectores con su estrategia digital propia. Cada uno con SEO local, integración con su ecosistema y captación cualificada de toda la comarca + comunidad británica."
    },
    "diferenciales": [
      {
        "title": "Capital del Valle del Almanzora",
        "desc": "Con 12.000 habitantes, Albox es el centro de servicios, comercio y administración de toda la comarca. Tu web sirve a Olula, Macael, Cantoria, Fines, Arboleas y decenas de localidades."
      },
      {
        "title": "Mercado tradicional + digital",
        "desc": "El famoso mercado de los martes atrae visitantes cada semana. El mercado digital está abierto 24/7. Una web profesional extiende tu negocio más allá del día grande."
      },
      {
        "title": "Mármol Macael: escaparate mundial",
        "desc": "A 15 km, Macael exporta a 60+ países. Las empresas del sector necesitan webs multiidioma con catálogos técnicos a la altura del producto. Aquí lo hacemos a diario."
      },
      {
        "title": "Comunidad británica activa",
        "desc": "Albox y alrededores tienen ~2.000 británicos residentes. Negocios bilingües (estate agents, restaurantes, servicios) captan este mercado con una simple web ES/EN."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para apostar por el Valle",
      "lead": "La combinación única de Albox: tamaño, mercado tradicional, cercanía al mármol y comunidad británica residente."
    },
    "testimonios": [
      {
        "nombre": "José Antonio M.",
        "negocio": "Gestoría · Albox",
        "texto": "Mi gestoría no tenía web. Me hicieron una página profesional con SEO local y en pocas semanas ya aparecía para \"gestoría Albox\" en Google. Ahora recibo consultas de toda la comarca sin mover un dedo."
      },
      {
        "nombre": "Rafael G.",
        "negocio": "Empresa de mármol · Valle",
        "texto": "Necesitábamos una web con catálogo técnico en español e inglés. El resultado es profesional, rápido y nos ha abierto puertas con distribuidores de otros países."
      },
      {
        "nombre": "Paqui L.",
        "negocio": "Restaurante · Albox",
        "texto": "Mi restaurante estaba en Google Maps pero sin web. Ahora tenemos carta digital, reservas online y aparecemos los primeros cuando alguien busca \"dónde comer en Albox\". Un antes y un después."
      },
      {
        "nombre": "David H.",
        "negocio": "Inmobiliaria · Albox",
        "texto": "Como inmobiliaria, necesitábamos un portal bilingüe para captar compradores británicos y del norte de Europa. La web tiene buscador, fichas detalladas y genera leads cualificados cada semana."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Albox que ya venden online",
      "lead": "Necesitábamos una web con catálogo técnico en español e inglés. El resultado es profesional, rápido y nos ha abierto puertas con distribuidores de otros países."
    },
    "faq": [
      {
        "q": "¿Cuánto cuesta el diseño web en Albox?",
        "a": "Web profesional desde 500€. Incluye diseño personalizado, SEO técnico, hosting gratuito de por vida (para webs estáticas) y formación. Tiendas online desde 700€ según funcionalidades. Landing de una página desde 350€. Presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Por qué el hosting es gratuito en Albox?",
        "a": "Generación estática con Astro: webs ultrarrápidas servidas desde CDN global sin servidor ni base de datos. Vercel o Cloudflare Pages ofrecen hosting gratuito ilimitado. Tu negocio se ahorra 60–200€/año."
      },
      {
        "q": "¿Sois diseñadores web en Albox? ¿Hacéis reuniones presenciales?",
        "a": "Sí. Agencia local que trabaja habitualmente en Albox, Olula del Río, Macael, Cantoria y todo el Valle del Almanzora. Reuniones en tu negocio o videollamada. Primera consulta gratuita."
      },
      {
        "q": "¿Cuánto tarda la creación de una página web en Albox?",
        "a": "Web corporativa: 1–2 semanas. Tienda online: 2–4 semanas según complejidad. Metodología ágil: ves avances desde la primera semana. Si tienes urgencia, priorizamos."
      },
      {
        "q": "¿Mi web aparecerá en Google para búsquedas en Albox?",
        "a": "Sí. SEO técnico desde el código: velocidad óptima, datos estructurados, meta etiquetas, sitemap y contenido optimizado para keywords como \"diseño web Albox\", \"abogado Albox\" o \"restaurante Albox\". Configuramos también Google Business Profile."
      },
      {
        "q": "¿Hacéis webs bilingües para captar la comunidad británica?",
        "a": "Sí, especialidad. ES/EN con SEO en ambos idiomas (no traducción automática). Es un mercado que paga bien, busca todo online y que la competencia local muchas veces ignora. Ventaja inmediata para inmobiliarias, restaurantes, servicios y comercios."
      },
      {
        "q": "¿Hacéis tiendas online para comercios del mercado?",
        "a": "Sí. Tiendas online completas con catálogo, pasarela de pago segura (Stripe, Redsys, Bizum), gestión de stock, envíos automatizados y diseño responsive. Ideal para vender a toda España sin depender solo del día de mercado."
      },
      {
        "q": "¿Trabajáis con empresas del mármol de Macael?",
        "a": "Sí, frecuentemente. Webs corporativas multiidioma (ES/EN/IT) con catálogo técnico de materiales, fichas descargables PDF y formularios B2B para captar distribuidores internacionales."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en Albox",
      "lead": "Plazos, precios, hosting gratuito, SEO local, web bilingüe y mármol. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "mercado",
        "head": {
          "h2": "El mercado de los martes",
          "lead": "Desde 1850, cada martes Albox se llena de puestos que vienen de toda la comarca. +200 paradas y visitantes desde Lorca, Vera y la comunidad británica. Tu negocio digital puede vivir todos los días así."
        },
        "items": [
          {
            "t": "Montaje",
            "d": "Llegan los puestos · más de 200 paradas en su día grande",
            "meta": "07:00"
          },
          {
            "t": "Apertura",
            "d": "Apertura oficial al público · comienza el ajetreo",
            "meta": "09:00"
          },
          {
            "t": "Punto fuerte",
            "d": "Visitantes de toda la comarca + Lorca + británicos",
            "meta": "11:00"
          },
          {
            "t": "Compra final",
            "d": "Última hora · ofertas y mejores precios",
            "meta": "13:30"
          },
          {
            "t": "Desmontaje",
            "d": "Cierre · los puestos vuelven a sus pueblos",
            "meta": "14:30"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "almeria": {
    "slug": "almeria",
    "title": "Diseño Web en Almería | Agencia y SEO",
    "description": "Agencia de diseño web, SEO y e-commerce en Almería capital. Webs rápidas que posicionan en Google y convierten visitas en clientes. Presupuesto en 24h.",
    "h1": "Diseño web en Almería, la capital",
    "heroLead": "200.000 habitantes. La Alcazaba, la Catedral-fortaleza, Cabo de Gata, la Universidad, el puerto comercial y Almeriwood — 500+ películas rodadas aquí. El mercado más diverso y rentable para una web local en toda la provincia.",
    "lugares": [
      {
        "name": "La Alcazaba",
        "sub": "FORTALEZA ÁRABE",
        "desc": "Segunda fortaleza musulmana más grande de España tras la Alhambra. Siglos VIII–XV. 43.000 m² de muralla.",
        "dato": "43.000 m²"
      },
      {
        "name": "Catedral-Fortaleza",
        "sub": "CATÓLICA + DEFENSIVA",
        "desc": "Única catedral fortaleza de España. Renacentista del siglo XVI, construida para defender de incursiones berberiscas.",
        "dato": "Siglo XVI"
      },
      {
        "name": "Cabo de Gata",
        "sub": "1.er PARQUE MARÍTIMO",
        "desc": "Primer parque natural marítimo-terrestre de España. Volcán fósil, calas vírgenes, biodiversidad mediterránea única.",
        "dato": "45.000 ha"
      }
    ],
    "lugaresHead": {
      "h2": "Patrimonio, religión y naturaleza",
      "lead": "Almería no es un destino más. Tres iconos universales la sitúan en la conversación global: la Alcazaba, la Catedral-fortaleza única en España y Cabo de Gata, primer parque marítimo del país."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "200.000 hab · 1ª de la provincia"
      },
      {
        "k": "ALCAZABA",
        "v": "2ª fortaleza árabe de España"
      },
      {
        "k": "PUERTO",
        "v": "Comercial + cruceros + N. África"
      },
      {
        "k": "UNIVERSIDAD",
        "v": "UAL · 15.000 estudiantes"
      },
      {
        "k": "AEROPUERTO",
        "v": "Internacional · 1M pax/año"
      },
      {
        "k": "GASTRONOMÍA",
        "v": "Capital Española 2019 · tapas"
      }
    ],
    "datosHead": {
      "h2": "Por qué Almería pesa",
      "lead": "Datos reales que explican por qué la capital es el mercado digital más grande y diverso de toda la provincia de Almería."
    },
    "sectores": [
      {
        "nombre": "Hostelería y restauración",
        "stat": "QR · reservas",
        "statLabel": "",
        "desc": "Webs con carta digital, sistema de reservas online y SEO local para búsquedas tipo \"restaurante en Almería\" o \"tapas paseo marítimo\". Tu mejor camarero 24h.",
        "tags": [
          "Carta digital QR",
          "Reservas online",
          "SEO \"restaurante Almería\"",
          "Fotos pro de platos"
        ]
      },
      {
        "nombre": "Inmobiliarias",
        "stat": "Portal MLS",
        "statLabel": "",
        "desc": "Portales inmobiliarios con buscador de propiedades, fichas detalladas, galería y captación de leads cualificados en un mercado urbano en auge.",
        "tags": [
          "Portal propiedades",
          "Buscador avanzado",
          "Captación leads",
          "Integración MLS"
        ]
      },
      {
        "nombre": "Salud y bienestar",
        "stat": "Citas online",
        "statLabel": "",
        "desc": "Páginas web para clínicas dentales, centros médicos, fisioterapeutas y centros de estética. Sistema de citas online y cumplimiento RGPD sanitario.",
        "tags": [
          "Citas online",
          "Ficha médica digital",
          "RGPD sanitario",
          "SEO local salud"
        ]
      },
      {
        "nombre": "Comercio y retail",
        "stat": "E-commerce",
        "statLabel": "",
        "desc": "Tiendas online para comercios almerienses que quieren vender a toda España. Desde productos locales hasta moda, con pasarela segura y envíos automatizados.",
        "tags": [
          "E-commerce",
          "Pasarela de pago",
          "Gestión de stock",
          "Envíos automáticos"
        ]
      },
      {
        "nombre": "Servicios profesionales",
        "stat": "B2B corporate",
        "statLabel": "",
        "desc": "Webs corporativas para abogados, gestorías, arquitectos, ingenieros y consultoras almerienses. Diseño que transmite confianza con formularios cualificados.",
        "tags": [
          "Web corporativa",
          "Portfolio",
          "Formularios inteligentes",
          "Blog de autoridad"
        ]
      },
      {
        "nombre": "Turismo y cultura",
        "stat": "Multiidioma",
        "statLabel": "",
        "desc": "Almería es destino de cine, playa, naturaleza (Cabo de Gata) y patrimonio (Alcazaba). Webs para hoteles, casas rurales, empresas de actividades y guías turísticos.",
        "tags": [
          "Motor reservas",
          "Multiidioma ES/EN/FR/DE",
          "Galería 4K",
          "Booking integrado"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios para 200.000 personas",
      "lead": "Seis sectores con su estrategia digital propia. Almería capital tiene volumen suficiente para invertir en SEO local agresivo y captar tráfico todos los días del año."
    },
    "diferenciales": [
      {
        "title": "Capital de la provincia",
        "desc": "Almería concentra servicios, comercio, salud, educación y administración. El mercado más diverso de la provincia — y el que más recompensa una web bien posicionada en Google."
      },
      {
        "title": "Volumen de búsquedas alto",
        "desc": "Más de 200.000 habitantes y miles de búsquedas locales diarias en Google. SEO en Almería capital genera tráfico cualificado los 365 días del año, no solo en temporada."
      },
      {
        "title": "Almeriwood vivo",
        "desc": "Más de 500 películas y series rodadas aquí desde Lawrence de Arabia hasta Juego de Tronos. Equipos de cine, productoras y servicios al sector audiovisual buscan proveedores locales."
      },
      {
        "title": "Puerto + Universidad",
        "desc": "Hub logístico-portuario + 15.000 universitarios + Norte de África a 1h de barco. La audiencia internacional y la profesional ya están aquí — solo hay que captarla."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para apostar por la capital",
      "lead": "Lo que hace única a Almería como ciudad para invertir en marketing digital: tamaño, diversidad sectorial, sector audiovisual y conexiones internacionales."
    },
    "testimonios": [
      {
        "nombre": "María Bautista",
        "negocio": "Clínica dental · Almería capital",
        "texto": "Nos modernizaron toda la imagen digital. El tráfico local desde Google se ha disparado y los pacientes que llegan ya vienen convencidos."
      },
      {
        "nombre": "Carlos D.",
        "negocio": "Despacho de arquitectura · Almería",
        "texto": "La web nueva nos posiciona como referente del sector. Los proyectos entran más cualificados, presupuestos más altos y menos curiosos."
      },
      {
        "nombre": "Sofía R.",
        "negocio": "Boutique · Almería centro",
        "texto": "Pasamos de Instagram a tienda online y la facturación digital ya supera el 40% del total. Gestión muy sencilla y soporte impecable."
      },
      {
        "nombre": "Manuel G.",
        "negocio": "Restaurante · Paseo Marítimo",
        "texto": "La carta digital QR y las reservas online han cambiado el restaurante. Menos llamadas, más eficiencia y mucha mejor experiencia."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Almería que ya venden online",
      "lead": "La web nueva nos posiciona como referente del sector. Los proyectos entran más cualificados, presupuestos más altos y menos curiosos."
    },
    "faq": [
      {
        "q": "¿Cuánto cuesta una página web profesional en Almería?",
        "a": "Web corporativa profesional desde 500€ con diseño personalizado, SEO técnico, hosting gratuito y formación. Tiendas online con pasarela de pago desde 700€ según funcionalidades. Landing de una página desde 350€. Presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Por qué el hosting es gratuito en vuestras webs?",
        "a": "Generación estática con Astro: webs ultrarrápidas servidas desde CDN global sin servidor ni base de datos. Vercel o Cloudflare Pages ofrecen hosting gratuito ilimitado. Ahorras 60–200€/año en hosting para siempre."
      },
      {
        "q": "¿En cuánto tiempo tendré mi web lista?",
        "a": "Web corporativa estándar: 1–2 semanas. Proyectos complejos (tiendas online, reservas): 3–4 semanas. Metodología ágil: ves avances desde la primera semana."
      },
      {
        "q": "¿Mi web aparecerá en Google si os contrato?",
        "a": "Todas las webs se entregan optimizadas para SEO desde el código: velocidad óptima, datos estructurados (Schema.org), meta etiquetas, sitemap XML. Para keywords competitivas (dentista Almería, restaurante Almería) ofrecemos planes de SEO mensual."
      },
      {
        "q": "¿Hacéis webs para empresas del sector audiovisual y Almeriwood?",
        "a": "Sí, lo tratamos a diario. Webs corporativas para productoras, agencias de localización, alquiler de equipos, casting y servicios de rodaje. Multiidioma EN para captar productoras internacionales."
      },
      {
        "q": "¿Trabajáis con el sector turístico de Almería?",
        "a": "Sí. Hoteles del centro y paseo marítimo, casas rurales en Cabo de Gata, empresas de actividades, guías turísticos del entorno Alcazaba. Multiidioma + reservas directas + SEO turístico."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Almería capital?",
        "a": "Sí. Nos desplazamos sin coste a Almería capital. Nuestra sede está en Vera (1h en coche) pero conocemos perfectamente la capital. También videollamada si prefieres."
      },
      {
        "q": "¿Qué ventaja tiene una web estática frente a WordPress?",
        "a": "Carga <1s (vs 3–8s en WP), sin base de datos hackeable, sin actualizaciones de plugins, hosting gratuito y mejor rendimiento en Google. Para webs corporativas, portfolios y landings es la mejor opción técnica y económica."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en Almería",
      "lead": "Plazos, precios, hosting, SEO local agresivo, sector audiovisual y turismo. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "peliculas",
        "head": {
          "h2": "ALMERÍA se rodaron aquí",
          "lead": "Desde Lawrence de Arabia hasta Juego de Tronos. Más de 500 películas y series han elegido los paisajes de Almería: desierto de Tabernas, dunas, fortalezas y la costa virgen de Cabo de Gata."
        },
        "items": [
          {
            "t": "Lawrence de Arabia",
            "d": "Dunas y desiertos · 4 Óscars",
            "meta": "David Lean, 1962"
          },
          {
            "t": "El bueno, el feo y el malo",
            "d": "Tabernas · western spaghetti",
            "meta": "Sergio Leone, 1966"
          },
          {
            "t": "Patton",
            "d": "Cabo de Gata · escenas Túnez",
            "meta": "Franklin Schaffner, 1970"
          },
          {
            "t": "Conan el Bárbaro",
            "d": "Tabernas · paisajes salvajes",
            "meta": "John Milius, 1982"
          },
          {
            "t": "Indiana Jones y la Última Cruzada",
            "d": "Tabernas · desierto Hatay",
            "meta": "Steven Spielberg, 1989"
          },
          {
            "t": "Juego de Tronos",
            "d": "Sevilla + Cabo de Gata · Bahía Ágata",
            "meta": "HBO, 2015"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "cantoria": {
    "slug": "cantoria",
    "title": "Diseño Web en Cantoria: Canteras y Piedra",
    "description": "Agencia de diseño web en Cantoria. Webs para canteras, exportación de piedra natural y logística del mármol. Catálogo B2B y multiidioma.",
    "h1": "Diseño web para la cantera del mármol internacional",
    "heroLead": "Cantoria es el origen del mármol almeriense. De sus canteras sale la piedra que se exporta a 15+ países. Empresas extractoras, talleres de transformación y proveedores que necesitan una presencia digital a la altura de su proyección global.",
    "lugares": [
      {
        "name": "Canteras de Cantoria",
        "sub": "EXTRACCIÓN ★ EXPORTACIÓN",
        "desc": "Cantoria es el primer eslabón de la cadena del mármol almeriense. De sus canteras sale la piedra que se transforma en los talleres de la comarca y se exporta a mercados de toda Europa con calidad reconocida internacionalmente.",
        "dato": "#1 extracción"
      },
      {
        "name": "Exportación a Europa",
        "sub": "MERCADO INTERNACIONAL",
        "desc": "El mármol de Cantoria viaja a Italia, Polonia, Alemania, Francia y Reino Unido. Las empresas con web multiidioma y catálogo digital pueden captar compradores internacionales que buscan mármol almeriense de calidad contrastada.",
        "dato": "15+ países"
      },
      {
        "name": "Valle del Almanzora",
        "sub": "CUNA DEL MÁRMOL",
        "desc": "Cantoria se asienta en el corazón del Valle del Almanzora, la comarca que concentra la mayor industria del mármol de España. Su posición estratégica la convierte en nodo extractivo y logístico de primer orden.",
        "dato": "Eje marmolista"
      },
      {
        "name": "Oficio y Tradición",
        "sub": "SABER HACER HEREDADO",
        "desc": "El oficio de la piedra se ha transmitido durante generaciones en Cantoria. Canteros, cortadores y pulidores que combinan técnicas artesanales con tecnología de corte de última generación para competir en el mercado global.",
        "dato": "Tradición + tecnología"
      }
    ],
    "lugaresHead": {
      "h2": "Cuatro sellos de identidad de Cantoria",
      "lead": "Cantoria es el primer eslabón de la cadena del mármol almeriense. De sus canteras sale la piedra que se transforma en los talleres de la comarca y se exporta a mercados de toda Europa con calidad reconocida internacionalmente."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "4.000 hab · Valle del Almanzora"
      },
      {
        "k": "INDUSTRIA",
        "v": "Canteras · Mármol · Exportación"
      },
      {
        "k": "EXPORTACIÓN",
        "v": "Italia · Polonia · Alemania · +15 países"
      },
      {
        "k": "UBICACIÓN",
        "v": "Corazón del Valle del Almanzora"
      },
      {
        "k": "ICONO",
        "v": "Canteras de mármol · tradición centenaria"
      },
      {
        "k": "COBERTURA",
        "v": "B2B nacional e internacional · multiidioma"
      }
    ],
    "datosHead": {
      "h2": "El mármol que mueve el mundo nace en Cantoria",
      "lead": "Cantoria no es un pueblo del mármol más. Es el origen. Aquí están las canteras de las que sale la piedra que luego se transforma en los talleres de Fines, Macael y Olula del Río. El primer eslabón de la cadena que termina en edificios de toda Europa."
    },
    "sectores": [
      {
        "nombre": "Canteras y Extracción de Mármol",
        "stat": "#1",
        "statLabel": "exportación Europa",
        "desc": "Cantoria es la puerta de extracción del mármol almeriense. Sus canteras alimentan la transformación en Fines y Macael y exportan bloques a Italia, Polonia y Alemania. Una web B2B con catálogo de piedras y fichas técnicas en inglés abre mercados internacionales.",
        "tags": [
          "Catálogo B2B",
          "Multiidioma",
          "Fichas técnicas piedra",
          "Exportación Europa"
        ]
      },
      {
        "nombre": "Transformación y Talleres",
        "stat": "+15",
        "statLabel": "talleres activos",
        "desc": "Los talleres de Cantoria cortan, pulen y transforman bloques en piezas acabadas para construcción e interiorismo. Web con galería de proyectos, acabados y formulario de presupuesto atrae a arquitectos y decoradores de toda España.",
        "tags": [
          "Galería proyectos",
          "Acabados piedra",
          "Presupuesto online",
          "SEO construcción"
        ]
      },
      {
        "nombre": "Exportación y Comercio B2B",
        "stat": "🌍",
        "statLabel": "venta internacional",
        "desc": "Cantoria exporta mármol a más de 15 países. Una web multiidioma (inglés, alemán, italiano) con catálogo de productos, fichas técnicas descargables y sistema de pedidos B2B convierte visitantes internacionales en compradores.",
        "tags": [
          "Multiidioma",
          "Catálogo exportación",
          "Pedidos B2B",
          "Logística internacional"
        ]
      },
      {
        "nombre": "Construcción e Interiorismo",
        "stat": "+40",
        "statLabel": "años de tradición",
        "desc": "El mármol de Cantoria es la materia prima de instaladores, soladores y arquitectos de toda la comarca. Una web con portfolio de obras, testimoniales y SEO local los posiciona como referentes en su especialidad.",
        "tags": [
          "Portfolio obras",
          "SEO local",
          "Testimoniales",
          "Presupuesto online"
        ]
      },
      {
        "nombre": "Maquinaria y Suministros Industriales",
        "stat": "B2B",
        "statLabel": "sector marmolista",
        "desc": "El ecosistema del mármol en Cantoria incluye proveedores de herramientas, maquinaria de corte y consumibles. Empresas que aparezcan en Google para búsquedas del sector pueden multiplicar su clientela industrial.",
        "tags": [
          "Maquinaria mármol",
          "Proveedores marmolistas",
          "Herramientas corte",
          "Catálogo técnico"
        ]
      },
      {
        "nombre": "Comercio Local y Servicios",
        "stat": "4.000",
        "statLabel": "habitantes · Valle",
        "desc": "Cantoria tiene 4.000 habitantes y una actividad industrial que atrae profesionales de toda la comarca. Comercios, clínicas y servicios que aparezcan en Google Maps captan tanto a vecinos como a trabajadores del mármol.",
        "tags": [
          "Google Maps",
          "SEO local",
          "Ficha de negocio",
          "Comercio Almanzora"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Seis sectores para exportar tu presencia digital",
      "lead": "Cantoria es la puerta de extracción del mármol almeriense. Sus canteras alimentan la transformación en Fines y Macael y exportan bloques a Italia, Polonia y Alemania. Una web B2B con catálogo de piedras y fichas técnicas en inglés abre mercados internacionales."
    },
    "diferenciales": [
      {
        "title": "Primer eslabón del mármol almeriense",
        "desc": "Cantoria no es taller ni cantera decorativa — es el origen. Aquí se extrae la piedra que luego viaja a talleres de Fines, Macael y Olula. Ese valor de materia prima de calidad es lo que hay que comunicar en cada web del sector."
      },
      {
        "title": "Exportación a 15+ países",
        "desc": "El mármol de Cantoria cruza fronteras. Italia, el mayor mercado del mármol del mundo, compra piedra de Cantoria. Una web multiidioma con catálogo técnico y fichas de producto es la llave para abrir mercados internacionales."
      },
      {
        "title": "Eje logístico del Almanzora",
        "desc": "En el centro del valle, conectado con la A-334 y a 30 minutos de la autovía del Mediterráneo. Cualquier empresa de Cantoria con web bien posicionada capta clientes industriales de toda la comarca y del corredor hacia el puerto de Almería."
      },
      {
        "title": "Industria con proyección global",
        "desc": "El sector del mármol tiene una oportunidad digital enorme en los mercados internacionales. La mayoría de canteras aún no tienen web profesional en inglés. Quien se posiciona primero, capta la exportación."
      }
    ],
    "diferencialesHead": {
      "h2": "Por qué Cantoria marca la diferencia en el mármol global",
      "lead": "Cantoria no es taller ni cantera decorativa — es el origen. Aquí se extrae la piedra que luego viaja a talleres de Fines, Macael y Olula. Ese valor de materia prima de calidad es lo que hay que comunicar en cada web del sector."
    },
    "testimonios": [
      {
        "nombre": "Antonio Ruiz",
        "negocio": "Empresa marmolista · Exportación",
        "texto": "Exportamos mármol a Italia y Polonia pero nuestra web estaba en castellano básico. Platanito Rico nos hizo un catálogo online profesional con fichas técnicas en inglés. Los arquitectos europeos nos contactan directamente."
      },
      {
        "nombre": "Isabel García",
        "negocio": "Instaladora de suelos y revestimientos",
        "texto": "Trabajamos en toda la comarca instalando mármol. Antes solo me llegaba trabajo por contactos. La web con portfolio de mis obras me trae presupuestos de Almería ciudad y de la provincia. Calidad de cliente mucho mejor."
      },
      {
        "nombre": "Francisco Martínez",
        "negocio": "Suministros industriales para mármol",
        "texto": "Vendemos maquinaria de corte a talleres de toda España. La web B2B con catálogo técnico nos ha abierto clientes en Andalucía, Valencia y Madrid que antes no llegaban por el boca-oreja."
      }
    ],
    "testimoniosHead": {
      "h2": "Lo que dicen los que ya exportan con su web",
      "lead": "Trabajamos en toda la comarca instalando mármol. Antes solo me llegaba trabajo por contactos. La web con portfolio de mis obras me trae presupuestos de Almería ciudad y de la provincia. Calidad de cliente mucho mejor."
    },
    "faq": [
      {
        "q": "¿Cómo puede una empresa de mármol de Cantoria captar clientes internacionales con su web?",
        "a": "Con web en inglés (y opcionalmente alemán o italiano), catálogo de piedras con fichas técnicas, formulario de solicitud de muestras y SEO para términos como \"marble supplier Spain\" o \"Almeria marble\". Es un nicho con demanda internacional real."
      },
      {
        "q": "¿Cuánto cuesta una web con catálogo de productos para empresa de mármol?",
        "a": "Una web corporativa con catálogo de piedras, fichas técnicas y formulario B2B desde 500€. Con tienda online o versión en inglés añadida desde 700€. Landing de una página desde 350€. Hosting gratuito incluido siempre."
      },
      {
        "q": "¿Podéis hacer SEO para posicionar una marmolista de Cantoria en Google?",
        "a": "Sí, hacemos SEO específico para el sector del mármol: términos locales (\"marmolista Cantoria\", \"mármol Almanzora\") y términos de exportación en inglés. Resultados en 3-6 meses."
      },
      {
        "q": "¿Tenéis experiencia con empresas extractoras y canteras?",
        "a": "Sí, trabajamos con empresas del sector del mármol en toda la comarca del Almanzora. Entendemos el lenguaje técnico, los procesos de extracción y las necesidades B2B del sector. No somos una agencia genérica."
      },
      {
        "q": "¿Hacéis webs multiidioma para exportación?",
        "a": "Sí, es una de nuestras especialidades. Creamos webs en español + inglés + alemán/italiano con estructura SEO separada por idioma, URLs amigables y configuración de hreflang para que Google indexe correctamente cada versión."
      },
      {
        "q": "¿En cuánto tiempo tengo mi web de Cantoria lista?",
        "a": "Web corporativa con catálogo: 2–3 semanas. Con multiidioma y sistema B2B: 3–4 semanas. Siempre con entregas parciales para que veas el progreso."
      },
      {
        "q": "¿Ayudáis con fotografía de producto para piedra natural?",
        "a": "Sí, ofrecemos sesión de fotografía profesional para tus piedras y acabados. Una imagen de calidad multiplica el interés del comprador. También hacemos vídeo para mostrar vetas y texturas."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Cantoria?",
        "a": "Sí, estamos en Vera a 25 minutos de Cantoria. Podemos vernos en tu cantera, taller u oficina para entender mejor tu negocio. La primera consulta es gratuita."
      }
    ],
    "faqHead": {
      "h2": "Respuestas para la cantera de tus dudas",
      "lead": ""
    },
    "extras": [],
    "ctaHead": null
  },
  "carboneras": {
    "slug": "carboneras",
    "title": "Diseño Web en Carboneras | Cabo de Gata",
    "description": "Diseño web y SEO en Carboneras para alojamientos, restaurantes de pescado y turismo del Cabo de Gata. Reservas directas. Presupuesto en 24h.",
    "h1": "Diseño web para Carboneras y su costa salvaje",
    "heroLead": "La cara norte del Cabo de Gata: aguas cristalinas, acantilados volcánicos y pescado de lonja. Webs para alojamientos, restaurantes de la lonja y empresas de buceo y naturaleza — con alma marina y reservas directas.",
    "lugares": [
      {
        "name": "Playa de los Muertos",
        "sub": "LA MEJOR DE ALMERÍA",
        "desc": "Mil metros de cantos blancos y agua turquesa cristalina al pie de un acantilado. Sin un solo edificio, votada repetidamente entre las mejores playas vírgenes de España.",
        "dato": "TOP España"
      },
      {
        "name": "Faro de Mesa Roldán",
        "sub": "FARO + TORRE · PLATÓ",
        "desc": "Sobre una mesa volcánica, el faro de 1863 junto a una torre vigía del siglo XVI. Vistas de vértigo al Mediterráneo y escenario de cine y series internacionales.",
        "dato": "1863"
      },
      {
        "name": "Isla de San Andrés",
        "sub": "BUCEO · FONDOS VÍRGENES",
        "desc": "Islote volcánico frente al puerto, reserva de vida marina. Uno de los mejores puntos de buceo y snorkel del sureste, con praderas de posidonia protegida.",
        "dato": "Inmersión"
      }
    ],
    "lugaresHead": {
      "h2": "Playa de los Muertos",
      "lead": "Mil metros de cantos blancos y agua turquesa al pie de un acantilado de 100 metros. Sin un edificio, sin un chiringuito. Se baja a pie por un sendero — y por eso sigue siendo virgen. Votada una y otra vez entre las mejores playas de España."
    },
    "datos": [
      {
        "k": "PARQUE NATURAL",
        "v": "Cara norte del Cabo de Gata-Níjar"
      },
      {
        "k": "PLAYA MUERTOS",
        "v": "Top playas vírgenes de España"
      },
      {
        "k": "LITORAL",
        "v": "17 km de costa · calas y acantilados"
      },
      {
        "k": "PESCA",
        "v": "Lonja y flota artesanal activa"
      },
      {
        "k": "FARO",
        "v": "Mesa Roldán · 1863 · plató de cine"
      },
      {
        "k": "BUCEO",
        "v": "Isla de San Andrés · posidonia"
      }
    ],
    "datosHead": {
      "h2": "Por qué Carboneras enamora",
      "lead": "Datos que explican por qué Carboneras es el secreto mejor guardado del Cabo de Gata y un destino con marca propia para el turismo de calidad."
    },
    "sectores": [
      {
        "nombre": "Alojamiento y turismo del Parque",
        "stat": "#1",
        "statLabel": "reservas directas",
        "desc": "Carboneras es la puerta norte del Cabo de Gata: playas vírgenes sin la masificación de Roquetas o Mojácar. Casas, apartamentos y hostales que capten al turista que busca exclusividad y naturaleza con buena visibilidad online.",
        "tags": [
          "Motor reservas directo",
          "Galería de playas",
          "SEO \"Cabo de Gata\"",
          "Sin comisiones OTA"
        ]
      },
      {
        "nombre": "Restauración de pescado y lonja",
        "stat": "KM0",
        "statLabel": "de la lonja al plato",
        "desc": "El pescado y el marisco fresco de Carboneras tienen fama ganada. Restaurantes con carta de temporada y conexión directa con la lonja pueden posicionarse como destino gastronómico premium del Levante.",
        "tags": [
          "Carta digital QR",
          "SEO \"pescado fresco\"",
          "Reservas mesa",
          "Google Business"
        ]
      },
      {
        "nombre": "Buceo, kayak y naturaleza",
        "stat": "4.9★",
        "statLabel": "experiencias",
        "desc": "La Isla de San Andrés y las calas vírgenes generan una economía de experiencias: buceo, snorkel, kayak y rutas de senderismo. Empresas de actividades que necesitan reservas online y calendario de salidas.",
        "tags": [
          "Reservas actividades",
          "Calendario salidas",
          "Reseñas TripAdvisor",
          "Pago de señal"
        ]
      },
      {
        "nombre": "Apartamentos y alquiler vacacional",
        "stat": "+ocupación",
        "statLabel": "mayo–octubre",
        "desc": "Las playas de Carboneras son la alternativa exclusiva del Levante. Propietarios de apartamentos y casas de alquiler que quieren saturar la temporada captando al segmento que huye de la masificación.",
        "tags": [
          "Web de alquiler",
          "Reservas directas",
          "Galería inmersiva",
          "Multiidioma EN/FR"
        ]
      },
      {
        "nombre": "Pesca artesanal y producto del mar",
        "stat": "B2B",
        "statLabel": "venta directa",
        "desc": "Cofradías, pescaderías y pequeñas empresas pesqueras pueden vender producto y contar su historia: pesca sostenible, artesanal, de proximidad. Marca territorial con denominación de origen emocional.",
        "tags": [
          "E-commerce producto",
          "Marca territorial",
          "Storytelling pesca",
          "Reparto local"
        ]
      },
      {
        "nombre": "Comercio y servicios locales",
        "stat": "GMB",
        "statLabel": "visibilidad local",
        "desc": "Tiendas, talleres y servicios para los 8.000 habitantes y los segundos-residentes. Web rápida + Google Business para captar al vecino y al turista que pasa el verano.",
        "tags": [
          "Google Business",
          "SEO local",
          "Web rápida",
          "Contacto directo"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que viven del mar y el Parque",
      "lead": "Seis sectores con estrategia digital propia. Alojamiento, pescado de lonja, buceo, alquiler vacacional y producto del mar — cada uno con su web a medida."
    },
    "diferenciales": [
      {
        "title": "\"Playa de los Muertos\" busca sola",
        "desc": "Es una de las playas más buscadas de España en Google. \"Playa de los Muertos\", \"Carboneras Cabo de Gata\", \"playa virgen Almería\" son búsquedas con altísima intención y poca competencia digital bien hecha. Ahí tiene que aparecer tu negocio."
      },
      {
        "title": "Exclusividad frente a masificación",
        "desc": "Carboneras es la alternativa al turismo de masas. El visitante busca autenticidad, naturaleza y calma — y paga por ella. Tu web debe transmitir ese valor: fotografía de calas vírgenes, no folletos genéricos de \"sol y playa\"."
      },
      {
        "title": "Pescado de lonja como marca premium",
        "desc": "Pocos sitios pueden ofrecer pescado subastado por la tarde y servido por la noche. Esa frescura es un argumento de venta brutal que casi ningún restaurante cuenta bien online. Lo convertimos en tu mejor reclamo."
      },
      {
        "title": "Reservas directas, cero comisión",
        "desc": "Cada reserva por Airbnb o Booking se lleva el 15-20%. En un destino de temporada intensa (mayo-octubre), un motor propio + email marketing fideliza al cliente que vuelve cada verano y te ahorra miles de euros en comisiones."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para invertir en tu web",
      "lead": "Marca de playa imbatible + exclusividad + pescado premium + reservas directas. Carboneras es una de las mejores historias digitales del Levante."
    },
    "testimonios": [
      {
        "nombre": "Teresa Alarcón",
        "negocio": "Hostal familiar frente al mar",
        "texto": "Nuestro hostal en Carboneras tiene una ubicación increíble pero nadie nos encontraba. La web nueva con SEO para \"alojamiento Cabo de Gata\" nos llena los meses de mayo a octubre de visitantes que buscan playas vírgenes."
      },
      {
        "nombre": "Andrés López",
        "negocio": "Pescadería y restaurante de la lonja",
        "texto": "Vendemos el pescado más fresco del Levante pero solo lo sabían los locales. Ahora con Google Maps y la web, llegan familias de Granada y Murcia expresamente a comer aquí. El marisco habla por sí solo."
      },
      {
        "nombre": "Nuria Sánchez",
        "negocio": "Centro de buceo · Isla de San Andrés",
        "texto": "Antes gestionaba las inmersiones por teléfono y perdía reservas. Con la web nueva la gente reserva su bautismo de buceo online y paga la señal. He llenado todas las salidas del verano sin estrés."
      },
      {
        "nombre": "Paco Giménez",
        "negocio": "Apartamentos · Playa de Carboneras",
        "texto": "Dependía al 100% de Booking y me comían a comisiones. Ahora tengo web con reservas directas y clientes que repiten cada año y me escriben directamente. He recuperado el control de mi negocio."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Carboneras que venden directo",
      "lead": "Vendemos el pescado más fresco del Levante pero solo lo sabían los locales. Ahora con Google Maps y la web, llegan familias de Granada y Murcia expresamente a comer aquí. El marisco habla por sí solo."
    },
    "faq": [
      {
        "q": "¿Podéis hacer SEO para posicionar mi alojamiento en Carboneras dentro del Cabo de Gata?",
        "a": "Sí, hacemos SEO específico para alojamientos del Parque Natural. Términos como \"alojamiento Cabo de Gata\", \"casa Carboneras\", \"Playa de los Muertos dónde dormir\" y \"playa virgen Almería\" tienen alta demanda y poca competencia bien trabajada. Optimizamos contenido, Schema de alojamiento y Google Business."
      },
      {
        "q": "¿Cuánto cuesta una web para una casa de alquiler o apartamento en Carboneras?",
        "a": "Una web para alquiler vacacional desde 500€ con galería, reservas directas, hosting gratuito y SEO local. Sin comisiones de plataformas externas. Con motor de reservas avanzado, calendario y pagos online, desde 700€. Landing de una página desde 350€."
      },
      {
        "q": "¿Trabajáis con restaurantes de pescado y negocios de la lonja?",
        "a": "Sí, es uno de nuestros perfiles favoritos en Carboneras. Creamos webs con carta digital, fotografía de producto, reservas de mesa y SEO para \"pescado fresco Carboneras\" y \"restaurante lonja\". Contamos la historia de la pesca artesanal y la frescura del producto, que es vuestro mejor argumento."
      },
      {
        "q": "¿Hacéis webs para centros de buceo y empresas de actividades de naturaleza?",
        "a": "Sí. Integramos sistema de reservas con calendario de salidas, pago de señal online, gestión de plazas por inmersión o ruta, y conexión con tus reseñas. Ideal para buceo en la Isla de San Andrés, kayak, snorkel y senderismo por el Cabo."
      },
      {
        "q": "¿Por qué elegir reservas directas en vez de depender de Airbnb o Booking?",
        "a": "Porque cada reserva en una OTA te cuesta entre el 15% y el 20% de comisión y no te quedas los datos del cliente. Con un motor propio y email marketing fidelizas al visitante que vuelve cada verano, controlas tus precios y ahorras miles de euros al año. La web se paga sola en una temporada."
      },
      {
        "q": "¿Hacéis fotografía de las playas, el producto y el alojamiento?",
        "a": "Coordinamos sesión de fotografía profesional porque en este sector la imagen lo es casi todo. Una galería bien hecha de la Playa de los Muertos, de un plato de pescado o de tu apartamento frente al mar vende sola. Es nuestra recomendación para cualquier proyecto en Carboneras."
      },
      {
        "q": "¿En cuánto tiempo está lista mi web?",
        "a": "Web de alojamiento o restaurante: 1–2 semanas. Con motor de reservas avanzado o tienda de producto del mar: 2–3 semanas. Trabajamos en sprints y ves avances cada semana. Si llegas con la temporada encima, priorizamos para que estés online cuanto antes."
      },
      {
        "q": "¿Trabajáis también en el resto del Levante: Mojácar, Garrucha, Vera, Mesa Roldán?",
        "a": "Sí, cubrimos todo el Levante almeriense y el Cabo de Gata: Carboneras, Mojácar, Garrucha, Vera, Turre, Los Gallardos y los núcleos costeros. Trabajamos online y nos desplazamos para la sesión de fotos cuando el proyecto lo necesita."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en el puerto",
      "lead": "Alojamientos, restaurantes de lonja, buceo, reservas directas, plazos y precios. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "lonjaFlow",
        "head": {
          "h2": "De la lonja a la mesa, el mismo día",
          "lead": "Carboneras conserva una flota de pesca artesanal y su lonja. El pescado que se subasta por la tarde se sirve esa misma noche. Esa frescura es un argumento de venta brutal — y casi ningún restaurante lo cuenta bien online."
        },
        "items": [
          {
            "t": "La flota vuelve",
            "d": "Las barcas de pesca artesanal entran a puerto con la captura del día: pescado de roca, pulpo, gambas y morralla para el caldo.",
            "meta": "06:00"
          },
          {
            "t": "Subasta en la lonja",
            "d": "El pescado se subasta fresco \"a la baja\". Restauradores y pescaderías pujan por el mejor género del Levante almeriense.",
            "meta": "17:00"
          },
          {
            "t": "A la mesa",
            "d": "Esa misma noche, en los restaurantes del paseo, el pescado del día llega al plato. Frescura que ninguna gran ciudad puede igualar.",
            "meta": "21:00"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "cuevas-del-almanzora": {
    "slug": "cuevas-del-almanzora",
    "title": "Diseño Web en Cuevas del Almanzora",
    "description": "Diseño web y SEO en Cuevas del Almanzora para comercio, turismo del castillo y Villaricos. Webs para autónomos desde 350€. Presupuesto en 24h.",
    "h1": "Diseño web para Cuevas, castillo, plata y mar",
    "heroLead": "Una fortaleza renacentista, la sierra de la plata y la costa de Villaricos en un mismo municipio. Webs para el comercio del Levante interior, el turismo de patrimonio y los autónomos que mueven la comarca.",
    "lugares": [
      {
        "name": "Castillo del Marqués",
        "sub": "FORTALEZA RENACENTISTA",
        "desc": "La fortaleza-palacio del Marqués de los Vélez (siglo XVI) corona el pueblo. Alberga el museo arqueológico y de pintura — el corazón del turismo cultural de Cuevas.",
        "dato": "Siglo XVI"
      },
      {
        "name": "Sierra Almagrera",
        "sub": "LA SIERRA DE LA PLATA",
        "desc": "Las montañas de almagre rojo que dieron la mayor fiebre de la plata del XIX en España. Castilletes y chimeneas de fundición coronan aún un paisaje minero único.",
        "dato": "1838"
      },
      {
        "name": "Villaricos",
        "sub": "MAR + NECRÓPOLIS FENICIA",
        "desc": "La costa de Cuevas: playas tranquilas sobre la antigua Baria fenicia, con su necrópolis púnica. Sol, historia milenaria y un mar sin masificar.",
        "dato": "Baria"
      }
    ],
    "lugaresHead": {
      "h2": "El Castillo del Marqués de los Vélez",
      "lead": "La fortaleza-palacio del siglo XVI que corona el pueblo y guarda su memoria: hoy alberga el museo arqueológico y la pinacoteca. Es el imán del turismo cultural de Cuevas — y la imagen perfecta para una web con carácter."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "15.000 hab · centro del Levante interior"
      },
      {
        "k": "CASTILLO",
        "v": "Marqués de los Vélez · siglo XVI"
      },
      {
        "k": "SIERRA",
        "v": "Almagrera · fiebre de la plata del s. XIX"
      },
      {
        "k": "VILLARICOS",
        "v": "Yacimiento fenicio-púnico · Baria"
      },
      {
        "k": "GEOGRAFÍA",
        "v": "Castillo, minas, mar y valle en un municipio"
      },
      {
        "k": "CASAS-CUEVA",
        "v": "Arquitectura tradicional excavada"
      }
    ],
    "datosHead": {
      "h2": "Por qué Cuevas es especial",
      "lead": "Datos que explican por qué Cuevas es un centro de servicios de comarca con un patrimonio único — castillo, minas y mar — apenas explotado digitalmente."
    },
    "sectores": [
      {
        "nombre": "Comercio y servicios del Levante",
        "stat": "15k",
        "statLabel": "hab · centro comarcal",
        "desc": "Con 15.000 habitantes, Cuevas es un centro de servicios del Levante interior. Clínicas, abogados, talleres y comercios compiten por atraer clientes de Pulpí, Zurgena, Arboleas y los municipios vecinos. SEO de comarca para captarlos a todos.",
        "tags": [
          "SEO local comarca",
          "Google Business",
          "Captación vecinos",
          "Web rápida"
        ]
      },
      {
        "nombre": "Turismo y patrimonio histórico",
        "stat": "XVI",
        "statLabel": "castillo · museo",
        "desc": "El castillo, el museo arqueológico y las playas de Villaricos atraen un turismo cultural y de sol combinado. Guías, empresas de turismo y alojamientos pueden posicionarse para \"qué ver en Cuevas del Almanzora\" con contenido bien estructurado.",
        "tags": [
          "SEO \"qué ver Cuevas\"",
          "Turismo cultural",
          "Visitas castillo",
          "Rutas mineras"
        ]
      },
      {
        "nombre": "Hostelería y restauración",
        "stat": "QR",
        "statLabel": "carta digital",
        "desc": "La gastronomía de Cuevas combina tradición minera con productos del mar de Villaricos. Bares, restaurantes y cafeterías pueden captar comensales de toda la comarca y turistas del castillo con presencia digital actualizada.",
        "tags": [
          "Carta digital QR",
          "SEO gastronomía",
          "Menú del día",
          "Reservas online"
        ]
      },
      {
        "nombre": "Alojamiento y turismo costero",
        "stat": "★",
        "statLabel": "Villaricos · Palomares",
        "desc": "Villaricos y Palomares concentran la vida playera de Cuevas: una costa tranquila, alternativa al turismo masificado. Apartamentos, casas de alquiler y campings con reservas directas y multiidioma para el visitante europeo.",
        "tags": [
          "Reservas directas",
          "Galería de playas",
          "Multiidioma",
          "Sin comisiones OTA"
        ]
      },
      {
        "nombre": "Agricultura del valle del Almanzora",
        "stat": "km0",
        "statLabel": "cítricos y huerta",
        "desc": "El valle del Almanzora es tierra de cítricos, hortaliza y almendro. Cooperativas, fincas y productores que quieran vender producto, contar su historia o exportar necesitan web con catálogo y SEO de producto.",
        "tags": [
          "E-commerce producto",
          "Marca territorial",
          "Catálogo campaña",
          "Storytelling"
        ]
      },
      {
        "nombre": "Autónomos y micropymes",
        "stat": "90%",
        "statLabel": "de nuestros clientes",
        "desc": "La mayoría del tejido de Cuevas son autónomos y pequeñas empresas. Webs sencillas, rápidas y económicas con todo lo necesario para captar clientes en Google sin gastar de más. Opciones para cada presupuesto.",
        "tags": [
          "Web desde 350€",
          "Hosting gratis",
          "Google Business",
          "Diseño responsive"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que mueven la comarca",
      "lead": "Seis sectores con estrategia digital propia. Del comercio del Levante interior al alojamiento de Villaricos — y siempre con opciones para autónomos."
    },
    "diferenciales": [
      {
        "title": "Tres atractivos en un municipio",
        "desc": "Pocos pueblos ofrecen castillo renacentista, paisaje minero del siglo XIX y playas con historia fenicia. Cuevas tiene un relato turístico potentísimo — y casi nadie lo cuenta bien online. Ahí hay una oportunidad enorme de posicionamiento."
      },
      {
        "title": "El centro de servicios de la comarca",
        "desc": "Cuevas capta clientes de Pulpí, Zurgena, Arboleas y todo el Levante interior. Una web con SEO por área geográfica hace que tu clínica, despacho o comercio aparezca el primero cuando buscan en cualquiera de esos pueblos, no solo en Cuevas."
      },
      {
        "title": "Patrimonio sin explotar digitalmente",
        "desc": "El castillo, el museo y las rutas mineras de la Sierra Almagrera son un imán de turismo cultural que apenas tiene presencia digital seria. Guías, alojamientos y hostelería pueden adelantarse a la competencia y quedarse con ese tráfico."
      },
      {
        "title": "Hechos para autónomos y micropymes",
        "desc": "El 90% de nuestros clientes son autónomos y pequeñas empresas. Sabemos hacer webs serias y efectivas con presupuestos ajustados — desde 350€ con hosting gratuito. Sin letra pequeña y sin pagar por lo que no necesitas."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para invertir en tu web",
      "lead": "Triple atractivo + centro de comarca + patrimonio sin explotar + opciones para autónomos. Cuevas tiene un potencial digital que casi nadie aprovecha todavía."
    },
    "testimonios": [
      {
        "nombre": "Andrés Molina",
        "negocio": "Deportes y alquiler de bicis · Villaricos",
        "texto": "Alquilo bicis en Villaricos y nadie me encontraba en internet. Ahora aparezco cuando buscan \"alquiler bici Villaricos\" o \"actividades Cuevas del Almanzora\". El verano fue el mejor en años."
      },
      {
        "nombre": "Esperanza Ríos",
        "negocio": "Farmacia · Cuevas del Almanzora",
        "texto": "La farmacia la tenía mi familia desde hace décadas. Pedimos una web básica y optimización de Google Maps. Ahora nos llegan clientes de Pulpí y Zurgena porque salimos primero en la búsqueda."
      },
      {
        "nombre": "Manuel Cano",
        "negocio": "Restaurante · centro histórico",
        "texto": "Estamos al lado del castillo y vivíamos solo del cliente local. Con la web, la carta digital y las fotos, ahora reservan turistas que vienen a ver el museo. Llenamos los fines de semana todo el año."
      },
      {
        "nombre": "Lucía Hernández",
        "negocio": "Casa rural · valle del Almanzora",
        "texto": "Tenía la casa solo en un portal que se llevaba comisión de todo. Platanito Rico me hizo una web con reservas directas y galería. Ahora la mitad de mis reservas son directas y conozco a mis clientes."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Cuevas que ya están en Google",
      "lead": "La farmacia la tenía mi familia desde hace décadas. Pedimos una web básica y optimización de Google Maps. Ahora nos llegan clientes de Pulpí y Zurgena porque salimos primero en la búsqueda."
    },
    "faq": [
      {
        "q": "¿Cuánto cuesta una web para un comercio en Cuevas del Almanzora?",
        "a": "Una landing sencilla para comercio local desde 350€ con hosting gratuito, ficha de Google optimizada y diseño responsive. Web corporativa completa desde 500€ y tiendas online o webs de turismo con reservas desde 700€. Presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Podéis hacer SEO para que aparezca mi negocio en Cuevas y los pueblos vecinos?",
        "a": "Sí, hacemos SEO por área geográfica para que tu negocio aparezca en búsquedas de Cuevas del Almanzora, Pulpí, Zurgena, Arboleas y todo el Levante interior. Optimizamos Google Business para cubrir varios municipios y captar al cliente de toda la comarca."
      },
      {
        "q": "¿Trabajáis también con autónomos y no solo con empresas?",
        "a": "Claro. La mayoría de nuestros clientes son autónomos y micropymes. Tenemos opciones adaptadas a cada presupuesto y tamaño de negocio, con webs serias y efectivas desde 350€. Nunca te cobramos por funciones que no necesitas."
      },
      {
        "q": "¿Hacéis webs de turismo para el castillo, el museo o las rutas mineras?",
        "a": "Sí. Creamos webs de turismo cultural con SEO para \"qué ver en Cuevas del Almanzora\", \"Castillo del Marqués de los Vélez\" y \"Sierra Almagrera\". Para guías, empresas de visitas y alojamientos que quieren captar al turista de patrimonio, que apenas tiene competencia digital seria en la zona."
      },
      {
        "q": "¿Hacéis webs para alojamientos y restaurantes de Villaricos?",
        "a": "Por supuesto. Villaricos y Palomares tienen un turismo de costa tranquila con mucho potencial. Hacemos webs con motor de reservas directas (sin comisiones), galería de playas, carta digital para restaurantes y multiidioma para el visitante europeo."
      },
      {
        "q": "¿En cuánto tiempo está lista mi web?",
        "a": "Una web de comercio o autónomo: 1 semana. Web de turismo o alojamiento con reservas: 2–3 semanas. Tienda online: 2–4 semanas según catálogo. Trabajamos rápido y te enseñamos avances durante el proceso."
      },
      {
        "q": "¿Trabajáis con productores y cooperativas del valle del Almanzora?",
        "a": "Sí. El valle es tierra de cítricos, hortaliza y almendro. Hacemos webs con catálogo de producto, fichas, marca territorial y, si exportáis, multiidioma y SEO internacional. Convertimos un productor local en una marca que vende fuera."
      },
      {
        "q": "¿Mi negocio está en una pedanía o cerca de Cuevas, también trabajáis allí?",
        "a": "Sí, cubrimos todo el municipio y la comarca: Cuevas del Almanzora, Villaricos, Palomares, Guazamara, Los Lobos y el Levante interior. Trabajamos online y nos desplazamos para reuniones o sesiones de fotos cuando hace falta."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en la comarca",
      "lead": "Precios, SEO de comarca, autónomos, turismo del castillo, Villaricos, plazos y pedanías. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "mineriaTimeline",
        "head": {
          "h2": "La fiebre de la plata",
          "lead": "En 1838, el hallazgo de un filón de plata en el Barranco del Jaroso convirtió la Sierra Almagrera en el \"far west\" almeriense. Cientos de minas, fundiciones y miles de mineros hicieron de Cuevas una de las localidades más ricas de España."
        },
        "items": [
          {
            "t": "El Jaroso",
            "d": "Se descubre el gran filón de plata en el Barranco del Jaroso. Estalla la fiebre minera.",
            "meta": "1838"
          },
          {
            "t": "La fiebre",
            "d": "Cientos de minas y fundiciones, miles de mineros. Cuevas llega a ser una de las localidades más ricas de España.",
            "meta": "s.XIX"
          },
          {
            "t": "Patrimonio",
            "d": "Castilletes, chimeneas y galerías sobreviven como paisaje minero protegido y atractivo turístico.",
            "meta": "Hoy"
          }
        ]
      },
      {
        "key": "vestigios",
        "head": {
          "h2": "La fiebre de la plata",
          "lead": "En 1838, el hallazgo de un filón de plata en el Barranco del Jaroso convirtió la Sierra Almagrera en el \"far west\" almeriense. Cientos de minas, fundiciones y miles de mineros hicieron de Cuevas una de las localidades más ricas de España."
        },
        "items": [
          {
            "t": "CASTILLETES",
            "d": "Torres de extracción sobre los pozos mineros"
          },
          {
            "t": "CHIMENEAS",
            "d": "Las chimeneas de fundición que coronan la sierra"
          },
          {
            "t": "GALERÍAS",
            "d": "Kilómetros de túneles bajo el Barranco del Jaroso"
          },
          {
            "t": "EL ARTEAL",
            "d": "El gran complejo de desagüe y bombeo minero"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "el-ejido": {
    "slug": "el-ejido",
    "title": "Diseño Web en El Ejido | Agro y exportación",
    "description": "Diseño web B2B y multiidioma en El Ejido para cooperativas, alhóndigas y exportadoras de hortaliza. SEO internacional. Presupuesto en 24h.",
    "h1": "Diseño web para El Ejido, la huerta de Europa",
    "heroLead": "Capital europea de la agricultura bajo plástico: 30.000 hectáreas de invernaderos que se ven desde el espacio y alimentan a media Europa. Webs B2B multiidioma para cooperativas, alhóndigas, exportadoras y agro-tech — y para Almerimar.",
    "lugares": [
      {
        "name": "El invernadero",
        "sub": "LA FÁBRICA VERDE",
        "desc": "Bajo el plástico se cultiva los 365 días: tomate, pimiento, pepino, calabacín y sandía. Tecnología de riego, control climático y producción que abastece a media Europa en invierno.",
        "dato": "30.000+ ha"
      },
      {
        "name": "La alhóndiga",
        "sub": "SUBASTA Y COMERCIO",
        "desc": "El corazón del negocio: subastas donde la hortaliza cambia de manos cada tarde y sale rumbo a Alemania, Francia o Países Bajos. Logística que no perdona un minuto.",
        "dato": "B2B diario"
      },
      {
        "name": "Almerimar",
        "sub": "GOLF · NÁUTICA · PLAYA",
        "desc": "El otro El Ejido: puerto deportivo con cientos de amarres, campo de golf y playas de bandera azul. El destino residencial y turístico del Poniente, con mercado europeo propio.",
        "dato": "1.000+ amarres"
      }
    ],
    "lugaresHead": {
      "h2": "Lo que mueve a El Ejido",
      "lead": "El invernadero que produce, la alhóndiga que comercia y Almerimar que recibe a Europa. Tres economías en un mismo municipio — y tres estrategias digitales."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "85.000 hab · 1ª del Poniente"
      },
      {
        "k": "INVERNADEROS",
        "v": "30.000+ ha bajo plástico"
      },
      {
        "k": "DESDE EL ESPACIO",
        "v": "El \"Mar de Plástico\" se ve por satélite"
      },
      {
        "k": "EXPORTACIÓN",
        "v": "Hortaliza a 40+ países de Europa"
      },
      {
        "k": "CAMPAÑA",
        "v": "Producción los 365 días del año"
      },
      {
        "k": "ALMERIMAR",
        "v": "Puerto deportivo · golf · bandera azul"
      }
    ],
    "datosHead": {
      "h2": "El milagro del Poniente",
      "lead": "Datos que explican por qué El Ejido es el motor económico de Almería y uno de los mercados B2B más potentes — y peor atendidos digitalmente — de toda Andalucía."
    },
    "sectores": [
      {
        "nombre": "Cooperativas y alhóndigas",
        "stat": "B2B",
        "statLabel": "comercialización",
        "desc": "El motor de El Ejido. Cooperativas, SAT y alhóndigas necesitan webs corporativas serias: trazabilidad, certificaciones (GlobalG.A.P., GRASP), catálogo de productos por campaña y un portal para socios y compradores internacionales.",
        "tags": [
          "Portal de socios",
          "Catálogo por campaña",
          "Certificaciones",
          "Área compradores B2B"
        ]
      },
      {
        "nombre": "Empresas agro y suministros",
        "stat": "365",
        "statLabel": "días de campaña",
        "desc": "Semilleros, fertilizantes, plásticos, sistemas de riego, construcción de invernaderos y maquinaria. Empresas auxiliares que venden a miles de agricultores y necesitan catálogo técnico, fichas de producto y captación de leads.",
        "tags": [
          "Catálogo técnico",
          "Fichas de producto",
          "Captación de leads",
          "Distribuidores"
        ]
      },
      {
        "nombre": "Exportación e internacional",
        "stat": "40+",
        "statLabel": "países destino",
        "desc": "La hortaliza de El Ejido se come en toda Europa. Exportadoras y comercializadoras que necesitan web multiidioma (EN/DE/FR/NL), con fichas de calibre y producto, logística y un canal directo para el comprador extranjero.",
        "tags": [
          "Multiidioma EN/DE/FR/NL",
          "Fichas de calibre",
          "SEO internacional",
          "Contacto comprador"
        ]
      },
      {
        "nombre": "Agro-tech y control biológico",
        "stat": "I+D",
        "statLabel": "innovación verde",
        "desc": "El Ejido lidera el control biológico de plagas y la agricultura de precisión. Empresas de biocontrol, sensórica, hidroponía y software agro con un producto innovador que necesita una web a la altura para vender dentro y fuera.",
        "tags": [
          "Web de producto SaaS",
          "Demos y casos",
          "Captación B2B",
          "Inglés técnico"
        ]
      },
      {
        "nombre": "Almerimar: golf, náutica y turismo",
        "stat": "€€€",
        "statLabel": "mercado europeo",
        "desc": "El frente costero de El Ejido. Hoteles, apartamentos, restaurantes del puerto, golf y náutica con cliente residencial europeo. Reservas directas, multiidioma y SEO turístico para \"Almerimar golf\" y \"puerto deportivo\".",
        "tags": [
          "Motor de reservas",
          "Multiidioma",
          "SEO \"Almerimar\"",
          "Sin comisiones OTA"
        ]
      },
      {
        "nombre": "Comercio, hostelería y servicios",
        "stat": "85k",
        "statLabel": "habitantes",
        "desc": "Con 85.000 habitantes, El Ejido es una ciudad con vida comercial propia. Tiendas, clínicas, talleres, restaurantes y servicios que necesitan web rápida + Google Business para captar al vecino y a la población flotante.",
        "tags": [
          "Google Business",
          "SEO local",
          "Web rápida",
          "E-commerce"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que alimentan a Europa",
      "lead": "Seis sectores con estrategia digital propia. Del portal B2B de una cooperativa al motor de reservas de Almerimar — dominamos el agro y el turismo."
    },
    "diferenciales": [
      {
        "title": "El motor económico de Almería",
        "desc": "El Ejido no es un pueblo más: es la capital europea de la agricultura intensiva y genera miles de millones al año. Detrás de cada invernadero hay un negocio que necesita presencia digital profesional — y muy pocos la tienen bien hecha."
      },
      {
        "title": "Exportar exige multiidioma de verdad",
        "desc": "Si vendes a Alemania, Francia, Países Bajos o Reino Unido, una web solo en español te cierra la puerta. Webs ES/EN/DE/FR/NL con SEO real por idioma y fichas técnicas de producto son la diferencia entre el comprador que te encuentra y el que se va a la competencia."
      },
      {
        "title": "B2B serio necesita web seria",
        "desc": "Cooperativas, alhóndigas y empresas agro mueven contratos grandes. Una web amateur transmite desconfianza. Catálogo por campaña, certificaciones visibles, portal de socios y área de compradores proyectan la solvencia que tu cliente internacional espera."
      },
      {
        "title": "Almerimar: el El Ejido turístico",
        "desc": "Junto a la agro-industria, El Ejido tiene en Almerimar un destino de golf, náutica y residencial europeo. Dos mundos, dos estrategias digitales — y nosotros dominamos las dos: B2B agro y reservas turísticas multiidioma."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para invertir en tu web",
      "lead": "Motor económico + exportación + B2B exigente + Almerimar turístico. El Ejido es el mercado con más potencial digital sin explotar de Almería."
    },
    "testimonios": [
      {
        "nombre": "Francisco Maldonado",
        "negocio": "Cooperativa hortofrutícola",
        "texto": "Necesitábamos una web seria para presentarnos ante compradores de Alemania y Francia. Platanito Rico nos hizo un portal multiidioma con nuestro catálogo por campaña y las certificaciones bien visibles. Ahora los compradores nos toman en serio antes de la primera llamada."
      },
      {
        "nombre": "Heinrich Vogel",
        "negocio": "Importador alemán de hortaliza",
        "texto": "I work with several Almería exporters and most have terrible websites. This one finally built a proper German-language site with calibres, packaging and logistics info. It makes my job so much easier — I can check everything before I order."
      },
      {
        "nombre": "Rosa Martín",
        "negocio": "Empresa de riego y plásticos",
        "texto": "Vendemos suministros a cientos de agricultores. La web con catálogo técnico y fichas de producto nos ha quitado muchísimas llamadas repetitivas y nos llegan presupuestos por la web cada semana. Una inversión que se pagó sola."
      },
      {
        "nombre": "James Cooper",
        "negocio": "Apartamentos · Almerimar",
        "texto": "My apartments in Almerimar are rented mostly by British and German golfers. The new multilingual site with direct booking cut my Booking.com commissions massively. Brilliant work and very fast loading."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de El Ejido que venden a Europa",
      "lead": "I work with several Almería exporters and most have terrible websites. This one finally built a proper German-language site with calibres, packaging and logistics info. It makes my job so much easier — I can check everything before I order."
    },
    "faq": [
      {
        "q": "¿Hacéis webs B2B para cooperativas y alhóndigas de El Ejido?",
        "a": "Sí, es una de nuestras especialidades. Creamos portales corporativos serios con catálogo de producto por campaña, certificaciones visibles (GlobalG.A.P., GRASP, IFS), área privada de socios, sección para compradores internacionales y multiidioma. Proyectamos la solvencia que tu cliente europeo espera."
      },
      {
        "q": "¿Podéis hacer la web en alemán, francés, inglés y neerlandés para exportar?",
        "a": "Exactamente. Para empresas exportadoras hacemos webs multiidioma (ES/EN/DE/FR/NL) con hreflang, contenido localizado por idioma (no traducción automática) y SEO técnico en cada mercado. Cada versión posiciona en el Google del país del comprador."
      },
      {
        "q": "¿Cuánto cuesta una web para una empresa agro o exportadora en El Ejido?",
        "a": "Web corporativa agro desde 500€. Portal B2B con catálogo por campaña, multiidioma o tienda online desde 700€ según funcionalidades e idiomas. Landing de campaña desde 350€. Presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Trabajáis con empresas auxiliares: riego, plásticos, semilleros, fertilizantes?",
        "a": "Sí. Hacemos webs con catálogo técnico, fichas de producto detalladas, zona de descargas (fichas, certificados), captación de presupuestos y SEO para que los agricultores te encuentren cuando buscan suministros y maquinaria."
      },
      {
        "q": "¿Hacéis también webs turísticas para Almerimar (golf, apartamentos, restaurantes)?",
        "a": "Por supuesto. Almerimar tiene un mercado europeo de golf y náutica. Hacemos webs con motor de reservas directas, multiidioma (EN/DE para el cliente británico y alemán), galería y SEO para \"Almerimar golf\", \"apartamentos Almerimar\" y \"puerto deportivo\"."
      },
      {
        "q": "¿Hacéis webs de producto para empresas de agro-tech y control biológico?",
        "a": "Sí. El Ejido es referente en biocontrol y agricultura de precisión. Para empresas de producto o software agro hacemos webs tipo SaaS/producto: explicación clara de la tecnología, casos de éxito, demos, captación B2B e inglés técnico para vender fuera."
      },
      {
        "q": "¿En cuánto tiempo está lista mi web?",
        "a": "Web corporativa: 1–2 semanas. Portal B2B con catálogo y multiidioma: 3–5 semanas según volumen e idiomas. Web turística de Almerimar con reservas: 2–3 semanas. Trabajamos en sprints y ves avances cada semana."
      },
      {
        "q": "¿Trabajáis en todo el Poniente: Adra, Berja, Dalías, La Mojonera, Vícar?",
        "a": "Sí, cubrimos todo el Poniente almeriense y el cinturón agrícola: El Ejido, Adra, Berja, Dalías, La Mojonera, Vícar y los núcleos del mar de plástico. Trabajamos online y nos desplazamos para reuniones o sesiones de fotos cuando el proyecto lo requiere."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en el campo",
      "lead": "Webs B2B agro, multiidioma, catálogos técnicos, Almerimar, agro-tech, plazos y precios. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "mercados",
        "head": {
          "h2": "El Mar de Plástico",
          "lead": "30.000 hectáreas de invernaderos que forman una mancha blanca visible desde el espacio. En medio siglo, El Ejido pasó de tierra árida a ser la mayor concentración de agricultura intensiva de Europa. Cada nave de plástico es un negocio que vende a medio continente."
        },
        "items": [
          {
            "t": "Alemania",
            "d": "Alemania",
            "meta": "28% %"
          },
          {
            "t": "Francia",
            "d": "Francia",
            "meta": "18% %"
          },
          {
            "t": "Países Bajos",
            "d": "Países Bajos",
            "meta": "14% %"
          },
          {
            "t": "Reino Unido",
            "d": "Reino Unido",
            "meta": "12% %"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "fines": {
    "slug": "fines",
    "title": "Diseño Web en Fines: Industria y Mármol",
    "description": "Agencia de diseño web en Fines. Webs para talleres de mármol, construcción y servicios industriales. SEO local, catálogo de producto y presencia digital.",
    "h1": "Diseño web para la industria del mármol y la excavación",
    "heroLead": "Fines es el corazón industrial del Valle del Almanzora. Talleres de mármol, empresas de excavación y construcción que necesitan una presencia digital a la altura de su oficio. Como Excavaciones Tripiana.",
    "lugares": [
      {
        "name": "Mármol del Almanzora",
        "sub": "PIEDRA NATURAL",
        "desc": "Fines es el corazón de la industria transformadora del mármol almeriense. Talleres de corte, pulido y acabado que convierten bloques de piedra en encimeras, solería y piezas arquitectónicas para toda España.",
        "dato": "#1 piedra"
      },
      {
        "name": "Excavaciones Tripiana",
        "sub": "CLIENTE ★ CASO DE ÉXITO",
        "desc": "Excavaciones Tripiana, desde Fines, da servicio a toda Almería con maquinaria propia y más de 20 años de experiencia. Su web les ha multiplicado los clientes de toda la provincia con presupuesto online y zonificación.",
        "dato": "+20 años"
      },
      {
        "name": "Valle del Almanzora",
        "sub": "COMARCA PRODUCTIVA",
        "desc": "Fines se asienta en el corazón del Valle del Almanzora, la comarca más activa industrialmente de Almería. Su posición estratégica entre Albox, Olula del Río y Tíjola la convierte en nodo de servicios y logística.",
        "dato": "Eje industrial"
      },
      {
        "name": "Industria y Oficio",
        "sub": "TRADICIÓN + TECNOLOGÍA",
        "desc": "El oficio del mármol y la construcción pesada se ha transmitido durante generaciones en Fines. Hoy se combina con maquinaria moderna y presencia digital para competir en mercados nacionales e internacionales.",
        "dato": "Tradición viva"
      }
    ],
    "lugaresHead": {
      "h2": "Cuatro sellos de identidad de Fines",
      "lead": "Fines es el corazón de la industria transformadora del mármol almeriense. Talleres de corte, pulido y acabado que convierten bloques de piedra en encimeras, solería y piezas arquitectónicas para toda España."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "2.500 hab · Valle del Almanzora"
      },
      {
        "k": "INDUSTRIA",
        "v": "Mármol · Excavaciones · Construcción"
      },
      {
        "k": "TALLERES",
        "v": "10+ talleres de corte y transformación"
      },
      {
        "k": "UBICACIÓN",
        "v": "Eje Albox · Olula del Río · Tíjola"
      },
      {
        "k": "CLIENTE TOP",
        "v": "Excavaciones Tripiana · desde 2004"
      },
      {
        "k": "COBERTURA",
        "v": "Maquinaria propia · toda Almería"
      }
    ],
    "datosHead": {
      "h2": "El mármol no se extrae en Fines — se transforma",
      "lead": "Mientras Olula del Río exporta bloques y Macael es la cantera, Fines es el taller. Aquí está la industria transformadora: cortadoras de puente, pulidoras automáticas, acabados artesanales. Los talleres de Fines convierten la piedra bruta en encimeras, solería, escaleras y piezas arquitectónicas que terminan en reformas de toda España."
    },
    "sectores": [
      {
        "nombre": "Talleres de Mármol y Piedra Natural",
        "stat": "#1",
        "statLabel": "industria en Fines",
        "desc": "Los talleres de corte y transformación del mármol en Fines suministran a constructoras de toda España. Una web con catálogo de acabados, formatos y galería de trabajos permite presupuestar online y captar proyectos de arquitectura e interiorismo.",
        "tags": [
          "Catálogo de acabados",
          "Galería de trabajos",
          "Presupuesto online",
          "SEO \"mármol Fines\""
        ]
      },
      {
        "nombre": "Excavaciones y Movimiento de Tierras",
        "stat": "★",
        "statLabel": "cliente Tripiana",
        "desc": "Empresas como Excavaciones Tripiana demuestran que una web bien hecha genera clientes en toda la provincia. Maquinaria propia, zonificación por municipios y presupuesto online son la combinación ganadora para el sector de la excavación.",
        "tags": [
          "Presupuesto 24h",
          "Zonificación municipios",
          "Maquinaria propia",
          "Casos de éxito"
        ]
      },
      {
        "nombre": "Construcción y Reformas",
        "stat": "+80%",
        "statLabel": "proyectos por web",
        "desc": "Constructoras y reformistas de Fines pueden transmitir su experiencia en mármol y construcción tradicional con una web profesional. Portfolio de obras, testimoniales de clientes y SEO local para captar obras en todo el Valle del Almanzora.",
        "tags": [
          "Portfolio de obras",
          "SEO local",
          "Testimoniales",
          "Presupuesto online"
        ]
      },
      {
        "nombre": "Distribución y Proveedores",
        "stat": "B2B",
        "statLabel": "venta nacional",
        "desc": "Fines abastece de piedra natural a mercados de toda España. Distribuidores con web en español e inglés pueden expandir ventas a arquitectos, constructoras y particulares que buscan \"mármol Almería precio\" o \"encimeras de mármol\".",
        "tags": [
          "Multiidioma",
          "Pedidos B2B",
          "Catálogo técnico",
          "Envíos nacionales"
        ]
      },
      {
        "nombre": "Comercio y Servicios Locales",
        "stat": "24h",
        "statLabel": "atención al cliente",
        "desc": "Fines tiene 2.500 habitantes y una actividad industrial que atrae profesionales de toda la comarca. Comercios, clínicas, gestorías y servicios que aparezcan en Google Maps captan tanto a vecinos como a trabajadores del mármol.",
        "tags": [
          "Google Maps",
          "SEO local",
          "Ficha de negocio",
          "Pedidos online"
        ]
      },
      {
        "nombre": "Maquinaria y Alquiler de Equipos",
        "stat": "+20",
        "statLabel": "años de oficio",
        "desc": "El sector de la maquinaria de obra y movimiento de tierras necesita presencia digital para que contratistas y particulares encuentren servicios de alquiler con garantías. Web con flota visible, zonificación y presupuesto rápido.",
        "tags": [
          "Catálogo de maquinaria",
          "Zonas de cobertura",
          "Alquiler por horas",
          "Presupuesto rápido"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Seis sectores para construir tu presencia digital",
      "lead": "Los talleres de corte y transformación del mármol en Fines suministran a constructoras de toda España. Una web con catálogo de acabados, formatos y galería de trabajos permite presupuestar online y captar proyectos de arquitectura e interiorismo."
    },
    "diferenciales": [
      {
        "title": "Capital del mármol transformado",
        "desc": "Fines no es cantera — es taller. Aquí se corta, pule y transforma el mármol en piezas acabadas. Ese valor añadido industrial es lo que diferencia a sus empresas y lo que hay que comunicar en cada web."
      },
      {
        "title": "Excavaciones Tripiana, caso real",
        "desc": "Tenemos un cliente en Fines, Excavaciones Tripiana, que pasó de trabajar solo por recomendación a captar obras en toda la provincia con presupuesto online y web profesional. El caso lo cuentan ellos mejor que nosotros."
      },
      {
        "title": "Eje logístico del Almanzora",
        "desc": "En el centro del valle, a 5 min de Albox y Olula, a 30 de Huércal-Overa. Cualquier negocio con web bien posicionada capta clientes de toda la comarca y del corredor hacia el Levante y la costa."
      },
      {
        "title": "Industria con futuro digital",
        "desc": "El sector del mármol y la construcción tienen una oportunidad digital enorme. La mayoría de talleres y excavadoras aún no tienen web competitiva. Quien se mueve primero, capta el mercado."
      }
    ],
    "diferencialesHead": {
      "h2": "Por qué Fines marca la diferencia en el Almanzora",
      "lead": "Fines no es cantera — es taller. Aquí se corta, pule y transforma el mármol en piezas acabadas. Ese valor añadido industrial es lo que diferencia a sus empresas y lo que hay que comunicar en cada web."
    },
    "testimonios": [
      {
        "nombre": "Carlos Haro",
        "negocio": "Taller de corte de mármol",
        "texto": "Hacemos encimeras de cocina y baño para toda la provincia pero solo funcionábamos con recomendaciones. La web con galería de trabajos nos abre puertas con interioristas y arquitectos que nos encuentran en Google."
      },
      {
        "nombre": "Diego Tripiana",
        "negocio": "Excavaciones Tripiana · Fines",
        "texto": "Tripiana ha pasado de ser \"el excavador de Fines\" a dar servicio en toda la provincia. La web con presupuesto online y páginas por municipios nos ha traído clientes de Vera, Mojácar, Albox y Huércal-Overa. Multiplicamos las llamadas."
      },
      {
        "nombre": "Rafael Girona",
        "negocio": "Distribuidor de piedra natural",
        "texto": "Distribuimos mármol del Almanzora a constructoras de toda España. La web profesional nos da la imagen que necesitamos para cerrar contratos grandes. Ya no somos \"el taller de Fines\" — somos una empresa con presencia nacional."
      }
    ],
    "testimoniosHead": {
      "h2": "Lo que dicen los que ya construyen su futuro digital",
      "lead": "Tripiana ha pasado de ser \"el excavador de Fines\" a dar servicio en toda la provincia. La web con presupuesto online y páginas por municipios nos ha traído clientes de Vera, Mojácar, Albox y Huércal-Overa. Multiplicamos las llamadas."
    },
    "faq": [
      {
        "q": "¿Puede un taller de mármol de Fines vender sus productos a toda España con una web?",
        "a": "Sí, con catálogo de acabados y formatos, galería de trabajos reales y formulario de presupuesto. Los envíos de piezas cortadas a medida son habituales. SEO para \"encimera mármol Almería\" o \"solería mármol precio\" atrae clientes de toda España."
      },
      {
        "q": "¿Tenéis experiencia con empresas de excavación y movimiento de tierras?",
        "a": "Sí, Excavaciones Tripiana es cliente nuestro. Su web tiene presupuesto online, zonificación por municipios, galería de trabajos reales y catálogo de maquinaria. El resultado: clientes de toda la provincia que antes no llegaban."
      },
      {
        "q": "¿Cuánto cuesta una web con catálogo para taller de piedra natural?",
        "a": "Desde 500€ para web corporativa con galería de trabajos, catálogo de acabados, formulario de presupuesto y hosting gratuito. Con tienda online o catálogo interactivo desde 700€. Landing de una página desde 350€."
      },
      {
        "q": "¿Hacéis webs para empresas de excavaciones con presupuesto online?",
        "a": "Sí, es uno de nuestros servicios más demandados en la comarca. Web con motor de presupuesto rápido, páginas por municipio, galería de maquinaria y trabajos, y llamada a la acción directa. Desde 500€."
      },
      {
        "q": "¿Podéis hacer la web en inglés para captar clientes europeos?",
        "a": "Sí, añadimos versión en inglés para talleres de mármol que quieran captar arquitectos y promotoras de Europa. Términos como \"marble countertops Spain\" o \"natural stone supplier\" tienen demanda real en el sector."
      },
      {
        "q": "¿En cuánto tiempo tengo mi web de Fines lista?",
        "a": "Web corporativa: 1–2 semanas. Taller con catálogo de producto: 2–3 semanas. Excavaciones con presupuesto online y zonificación: 2–3 semanas."
      },
      {
        "q": "¿Ayudáis con el marketing digital para empresas industriales?",
        "a": "Sí, ofrecemos SEO local, Google Business Profile optimizado para sectores industriales, gestión de reseñas y contenido para redes. Posicionamos para keywords como \"excavaciones Almería precio\", \"mármol Fines\" o \"alquiler maquinaria Almanzora\"."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Fines?",
        "a": "Sí, estamos en Vera, a 20 minutos de Fines. Podemos vernos en tu negocio, taller u obra. También por videollamada. La primera consulta es gratuita."
      }
    ],
    "faqHead": {
      "h2": "Respuestas para la obra de tus dudas",
      "lead": ""
    },
    "extras": [],
    "ctaHead": null
  },
  "garrucha": {
    "slug": "garrucha",
    "title": "Diseño Web en Garrucha | Pesca y hostelería",
    "description": "Diseño web y SEO local en Garrucha para hostelería, pescado y comercio del puerto. Webs rápidas que captan clientes en Google. Presupuesto en 24h.",
    "h1": "Diseño web para el puerto pesquero de la Gamba Roja",
    "heroLead": "Garrucha es la capital española de la gamba roja. Su puerto, su lonja y su paseo marítimo concentran restaurantes, marisquerías y hoteles que viven del turismo gastronómico. Tu web tiene que estar a la altura.",
    "lugares": [],
    "lugaresHead": null,
    "datos": [
      {
        "k": "INAUGURADA",
        "v": "1985 · ampliada 2008"
      },
      {
        "k": "SUBASTA",
        "v": "L–V · 17:00–19:00 · al lonjero electrónico"
      },
      {
        "k": "ESPECIE TOP",
        "v": "Gamba roja (Aristeus antennatus)"
      },
      {
        "k": "PRECIO MÁXIMO",
        "v": "Hasta 200 €/kg en lonja"
      },
      {
        "k": "FLOTA",
        "v": "40+ embarcaciones · arrastre y artes menores"
      },
      {
        "k": "DENOMINACIÓN",
        "v": "IGP en trámite · Marca de Garantía"
      }
    ],
    "datosHead": {
      "h2": "La subasta de cada tarde",
      "lead": "La Lonja de Garrucha funciona al lonjero electrónico: el precio baja, no sube. El primero que pulsa, se lleva la caja. Restaurantes y distribuidores compiten en tiempo real cada tarde."
    },
    "sectores": [
      {
        "nombre": "Restaurantes y Marisquerías",
        "stat": "#1",
        "statLabel": "búsquedas \"gamba roja\"",
        "desc": "La gamba roja de Garrucha atrae comensales de toda España. Restaurantes y marisquerías del Puerto necesitan web con carta visual, sistema de reservas y SEO local para captar las miles de búsquedas mensuales de \"gamba roja Garrucha\".",
        "tags": [
          "Carta visual",
          "Reservas online",
          "SEO \"gamba roja\"",
          "Google Maps #1"
        ]
      },
      {
        "nombre": "Hoteles y apartamentos",
        "stat": "+40%",
        "statLabel": "reservas directas",
        "desc": "Hoteles y apartamentos del paseo marítimo: motor de reservas propio para eliminar comisiones del 15-20% de Booking y Airbnb. Multiidioma para captar turismo nacional e internacional.",
        "tags": [
          "Motor reservas propio",
          "Sin comisiones",
          "Multiidioma",
          "Galería pro"
        ]
      },
      {
        "nombre": "Comercio y náutica",
        "stat": "24/7",
        "statLabel": "tu tienda online",
        "desc": "Comercio tradicional, tiendas de pesca, talleres náuticos y servicios portuarios. Webs profesionales con e-commerce, catálogo y SEO local para Garrucha.",
        "tags": [
          "E-commerce",
          "Catálogo náutico",
          "SEO local",
          "Google Business"
        ]
      },
      {
        "nombre": "Servicios profesionales",
        "stat": "+60%",
        "statLabel": "leads cualificados",
        "desc": "Gestorías, clínicas, despachos y profesionales liberales que sirven a Garrucha, Vera y todo el Levante. Webs que transmiten autoridad y convierten.",
        "tags": [
          "Landing captación",
          "Formularios",
          "Google Business",
          "Trust building"
        ]
      },
      {
        "nombre": "Actividades náuticas",
        "stat": "x3",
        "statLabel": "reservas online",
        "desc": "Empresas de pesca deportiva, charters, paseos en barco, snorkel y excursiones. Webs con reservas online, calendario de actividades y galería 4K que vende sola.",
        "tags": [
          "Reservas calendario",
          "Galería 4K",
          "Multiidioma",
          "Pasarela pago"
        ]
      },
      {
        "nombre": "Productores y cooperativas",
        "stat": "B2B",
        "statLabel": "venta a HORECA",
        "desc": "Cofradías de pescadores, cooperativas y distribuidores. Plataformas B2B para hostelería con catálogo, fichas de producto, pedidos online y traceability.",
        "tags": [
          "B2B HORECA",
          "Catálogo trazable",
          "Pedidos online",
          "Lonja digital"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que viven del mar",
      "lead": "Seis sectores con su propia estrategia digital. Cada uno con SEO local, fotografía pro y sistemas de reserva o venta que eliminan comisiones."
    },
    "diferenciales": [
      {
        "title": "Producto estrella",
        "desc": "La gamba roja de Garrucha es la más cotizada de España. Más de 5.000 búsquedas mensuales en Google. Bien posicionado, captas turistas gastronómicos de toda la península."
      },
      {
        "title": "Puerto pesquero activo",
        "desc": "No es turismo de plástico — es un puerto pesquero real con flota, lonja diaria y oficios tradicionales. Esa autenticidad vende — y bien comunicada en la web, multiplica reservas."
      },
      {
        "title": "Paseo marítimo vivo",
        "desc": "Restauración, terrazas, comercio y hoteles concentrados en 1,5 km de paseo. Densidad de negocios alta — la competencia online aún es baja. Quien se mueve primero, gana."
      },
      {
        "title": "Levante consolidado",
        "desc": "A 5 min de Vera, 15 de Mojácar. Comarca con economía diversificada y demanda alta de servicios digitales todo el año, no solo en agosto."
      }
    ],
    "diferencialesHead": {
      "h2": "Lo que hace único este puerto",
      "lead": "Cuatro razones por las que tu web en Garrucha tiene un potencial enorme si se trabaja bien el SEO gastronómico y portuario."
    },
    "testimonios": [
      {
        "nombre": "Paco Rueda",
        "negocio": "Restaurante junto a la lonja",
        "texto": "Somos el restaurante de gamba roja más buscado en Google en Garrucha. Antes no aparecíamos. La web nueva con las fotos de nuestra cocina y el sistema de reservas lo cambió todo. Los fines de semana hay cola."
      },
      {
        "nombre": "Marina Torres",
        "negocio": "Apartamentos · primera línea",
        "texto": "Dependíamos de Airbnb para todo. Ahora con motor de reservas propio en la web, el 40% de los clientes reservan directo. Sin comisiones. Y los clientes directos repiten mucho más."
      },
      {
        "nombre": "Andrés Pérez",
        "negocio": "Marisquería del Puerto",
        "texto": "En agosto vendemos solo. El problema es de octubre a mayo. Con SEO de gamba roja y reservas online captamos turistas gastronómicos todo el año. Hemos triplicado los meses bajos."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Garrucha que ya venden online",
      "lead": "Dependíamos de Airbnb para todo. Ahora con motor de reservas propio en la web, el 40% de los clientes reservan directo. Sin comisiones. Y los clientes directos repiten mucho más."
    },
    "faq": [
      {
        "q": "¿Podéis hacer una web para mi restaurante en Garrucha que aparezca en búsquedas de \"gamba roja\"?",
        "a": "Sí, es una de nuestras especialidades. Trabajamos SEO específico para que tu restaurante aparezca primero en \"gamba roja Garrucha\", \"marisquería Garrucha\", \"restaurante pescado puerto Garrucha\" y búsquedas similares con miles de búsquedas/mes."
      },
      {
        "q": "¿Cuánto cuesta una web con reservas para hostelería en Garrucha?",
        "a": "Web corporativa con carta digital y formulario de reservas desde 500€. Con pasarela de pago para grupos o reservas con señal (tienda/reservas online) desde 700€. Landing de una página desde 350€. Hosting gratuito siempre y presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Garrucha?",
        "a": "Por supuesto. Nuestra sede está en Vera, a 5 min de Garrucha. Podemos citarnos en tu local, en el paseo marítimo o en nuestro estudio. Sin compromiso."
      },
      {
        "q": "¿Tenéis experiencia con marketing gastronómico y SEO local?",
        "a": "Sí. Llevamos años posicionando restaurantes, marisquerías y hoteles en Garrucha, Vera y Mojácar. SEO local + Google Business Profile + reseñas + multiidioma para captar turistas nacionales e internacionales."
      },
      {
        "q": "¿Podéis hacer la web multiidioma para turistas?",
        "a": "Sí. Para hoteles y restaurantes del puerto recomendamos al menos ES + EN. Si captas mucho turismo francés o alemán, añadimos esos idiomas. SEO optimizado en cada idioma — no traducción automática."
      },
      {
        "q": "¿En cuánto tiempo tengo lista mi web en Garrucha?",
        "a": "Web corporativa o restaurante: 1–2 semanas. Hotel con reservas o e-commerce: 2–4 semanas. Cumplimos plazos siempre que la información llegue a tiempo (te damos calendario)."
      },
      {
        "q": "¿Ofrecéis sistema de reservas directas para eliminar comisiones de Booking?",
        "a": "Sí. Integramos motores de reservas directas en tu web para que tus clientes reserven sin pasar por Booking ni TripAdvisor. Eliminas comisiones del 15–20% y tienes el control total de los datos de tus clientes."
      },
      {
        "q": "¿Trabajáis con cofradías y cooperativas de pescadores?",
        "a": "Sí. Desarrollamos plataformas B2B para venta a HORECA, catálogos trazables, pedidos online y \"lonja digital\" para distribuir la captura a restaurantes con pedido y entrega organizada."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en Garrucha",
      "lead": "Plazos, precios, SEO gastronómico, reservas directas y trabajo con cofradías. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "platos",
        "head": {
          "h2": "La Gamba Roja, joya de Garrucha",
          "lead": "Aristeus antennatus. Hasta 200 €/kg en lonja en sus mejores días. La pescan a más de 800 m de profundidad en el Mediterráneo y se subasta cada tarde en la Lonja del Puerto. Restaurantes de toda España vienen a comprarla aquí."
        },
        "items": [
          {
            "t": "Gamba Roja",
            "d": "A la plancha · con un poco de sal · cero adornos",
            "meta": "★★★★★"
          },
          {
            "t": "Arroz a Banda",
            "d": "Caldo de pescado, sofrito, arroz seco",
            "meta": "★★★★"
          },
          {
            "t": "Pulpo a la brasa",
            "d": "Tradición pescador · brasas y pimentón",
            "meta": "★★★★"
          },
          {
            "t": "Boquerones en vinagre",
            "d": "Aperitivo clásico · marinados en casa",
            "meta": "★★★★"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "huercal-overa": {
    "slug": "huercal-overa",
    "title": "Diseño Web en Huércal-Overa | Comercio",
    "description": "Diseño web y SEO en Huércal-Overa, capital comarcal del Levante. Webs para comercio, servicios y empresas que venden en toda la comarca. Desde 500€.",
    "h1": "Diseño web en Huércal-Overa, capital del Levante",
    "heroLead": "El hub comercial, sanitario y administrativo del norte de Almería. Aquí confluyen cuatro carreteras y vienen a comprar, hospitalizarse, tramitar y trabajar 100.000 personas del entorno. Tu web local captura toda esa demanda.",
    "lugares": [],
    "lugaresHead": null,
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "19.000 hab · 2.ª del Levante"
      },
      {
        "k": "PARTIDO JUD.",
        "v": "Cabecera judicial · 4 juzgados"
      },
      {
        "k": "HOSPITAL",
        "v": "La Inmaculada · 100k área"
      },
      {
        "k": "TRANSPORTE",
        "v": "Estación de tren · N-340A · A-7"
      },
      {
        "k": "ECONOMÍA",
        "v": "Comercio · agricultura · servicios"
      },
      {
        "k": "PATRIMONIO",
        "v": "Iglesia Asunción · Torre del Reloj"
      }
    ],
    "datosHead": {
      "h2": "Por qué Huércal-Overa importa",
      "lead": "Datos reales del municipio que explican su peso económico en la comarca. Aquí confluyen administración, sanidad, comercio y vega agrícola."
    },
    "sectores": [
      {
        "nombre": "Comercio y retail",
        "stat": "19k",
        "statLabel": "habitantes",
        "desc": "Huércal-Overa es el centro comercial del Levante. Tiendas online para vender a toda España, catálogos digitales, gestión de stock y pasarela segura — y SEO local que captura clientes de toda la comarca.",
        "tags": [
          "E-commerce",
          "Catálogo digital",
          "Pasarela de pago",
          "Gestión de stock"
        ]
      },
      {
        "nombre": "Agricultura y agroalimentación",
        "stat": "+60%",
        "statLabel": "agro de la zona",
        "desc": "Webs para cooperativas, empresas hortofrutícolas y productores locales. Presenta tu producto, genera leads de distribuidores y exporta con una imagen profesional. Multiidioma para mercados europeos.",
        "tags": [
          "Catálogo productos",
          "Fichas técnicas",
          "Multiidioma exportación",
          "Leads B2B"
        ]
      },
      {
        "nombre": "Servicios profesionales",
        "stat": "#1",
        "statLabel": "Google local",
        "desc": "Webs corporativas para abogados, gestorías, arquitectos, ingenieros y aseguradoras. Diseño que transmite confianza con formularios cualificados y SEO para captar de toda la comarca.",
        "tags": [
          "Web corporativa",
          "Formularios inteligentes",
          "SEO local",
          "Blog autoridad"
        ]
      },
      {
        "nombre": "Salud y bienestar",
        "stat": "24/7",
        "statLabel": "citas online",
        "desc": "Páginas web para clínicas, fisioterapeutas, psicólogos, veterinarios, ópticas. Citas online, RGPD sanitario y SEO para captar pacientes del área del Hospital La Inmaculada.",
        "tags": [
          "Citas online",
          "RGPD sanitario",
          "Ficha de servicios",
          "SEO salud"
        ]
      },
      {
        "nombre": "Hostelería y restauración",
        "stat": "x2",
        "statLabel": "reservas online",
        "desc": "Webs para restaurantes, bares, hoteles rurales y alojamientos. Carta digital QR, sistema de reservas, integración Google Maps y SEO local con peso.",
        "tags": [
          "Carta QR",
          "Reservas online",
          "Google Maps",
          "Fotos profesionales"
        ]
      },
      {
        "nombre": "Construcción e inmobiliarias",
        "stat": "+35%",
        "statLabel": "leads cualificados",
        "desc": "Portales inmobiliarios con buscador, fichas detalladas y galería. Webs para constructoras, reformas y promociones inmobiliarias en Huércal y toda la comarca.",
        "tags": [
          "Portal propiedades",
          "Buscador avanzado",
          "Galería inmersiva",
          "Captación leads"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios de una capital activa",
      "lead": "Seis sectores con su estrategia digital propia. Cada uno con SEO local, integración con su ecosistema y captación cualificada de toda la comarca."
    },
    "diferenciales": [
      {
        "title": "Hub comarcal natural",
        "desc": "Con 19.000 habitantes — segunda del Levante tras Vera. Vienen a comprar, a la sanidad, al juzgado, al banco. Tu web local capta también a los 100.000 habitantes del área de influencia."
      },
      {
        "title": "Economía diversificada",
        "desc": "No es un pueblo monosector. Tiene agricultura, comercio, sanidad, industria, servicios profesionales y construcción. Tu web compite en su nicho pero el municipio entero es próspero."
      },
      {
        "title": "Frontera con Murcia",
        "desc": "A 15 km de la línea con Murcia. Captas tráfico de Lorca, Pulpí y poblaciones del sur murciano que ya hacen sus compras y trámites en Huércal-Overa."
      },
      {
        "title": "Competencia digital baja",
        "desc": "A pesar de la actividad económica, muchos negocios siguen con web \"de los años 2000\" o sin web. Quien se profesionaliza online ahora tiene ventaja inmediata sobre la competencia."
      }
    ],
    "diferencialesHead": {
      "h2": "Las cuatro razones que ningún otro pueblo tiene",
      "lead": "La combinación única de Huércal-Overa: tamaño, mezcla de sectores, posición geográfica y aún competencia digital baja."
    },
    "testimonios": [
      {
        "nombre": "Antonio M.",
        "negocio": "Gestoría · Huércal-Overa",
        "texto": "Teníamos una web antigua que no nos traía clientes. Nos hicieron una nueva con SEO local y en dos meses estábamos en la primera página de Google para \"gestoría Huércal-Overa\". Las consultas se han triplicado."
      },
      {
        "nombre": "Carmen L.",
        "negocio": "Cooperativa agrícola · H-O",
        "texto": "Nuestra cooperativa necesitaba una web profesional para presentar productos a distribuidores europeos. Fichas de producto, multiidioma y formulario de contacto cualificado. Impecable."
      },
      {
        "nombre": "Dr. Francisco R.",
        "negocio": "Clínica dental · Huércal-Overa",
        "texto": "Abrí mi clínica y necesitaba sistema de citas online. Me la montaron en tiempo récord. Ahora más del 40% de las citas nuevas vienen por la web."
      },
      {
        "nombre": "María José P.",
        "negocio": "Tienda de moda · Huércal-Overa",
        "texto": "Mi tienda en el centro llevaba años sin presencia online. Ahora vendo a toda España y el coste de hosting es cero. No me lo podía creer al principio."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Huércal-Overa que ya venden online",
      "lead": "Nuestra cooperativa necesitaba una web profesional para presentar productos a distribuidores europeos. Fichas de producto, multiidioma y formulario de contacto cualificado. Impecable."
    },
    "faq": [
      {
        "q": "¿Cuánto cuesta una página web profesional en Huércal-Overa?",
        "a": "Web corporativa desde 500€. Incluye diseño personalizado, SEO técnico, hosting gratuito de por vida (para webs estáticas) y formación. Tiendas online desde 700€ según funcionalidades. Landing de una página desde 350€. Presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Por qué el hosting es gratuito en vuestras webs?",
        "a": "Generación estática con Astro: webs ultrarrápidas servidas desde CDN global sin servidor ni base de datos. Vercel o Cloudflare Pages ofrecen hosting gratuito ilimitado. Ahorras 60–200€/año."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Huércal-Overa?",
        "a": "Sí. Nuestra sede está en Vera, a 20 min de Huércal-Overa. Trabajamos habitualmente en H-O, Albox, Cuevas y toda la comarca. Podemos reunirnos en tu negocio o videollamada."
      },
      {
        "q": "¿Cuánto tarda en estar lista la web?",
        "a": "Web corporativa: 1–2 semanas. Tienda online: 2–4 semanas según complejidad. Metodología ágil: ves avances desde la primera semana y participas en cada decisión de diseño."
      },
      {
        "q": "¿Mi web aparecerá en Google para búsquedas de Huércal-Overa?",
        "a": "Sí. SEO técnico desde el código: velocidad óptima, datos estructurados, meta etiquetas, sitemap y contenido optimizado para keywords locales como \"abogado Huércal-Overa\" o \"clínica dental Huércal-Overa\"."
      },
      {
        "q": "¿Qué ventaja tiene una web estática frente a WordPress?",
        "a": "Carga <1s (vs 3–8s en WP), sin base de datos hackeable, sin actualizaciones de plugins, hosting gratuito y mejor rendimiento en Google. Para webs corporativas, portfolios y landings es la mejor opción."
      },
      {
        "q": "¿Podéis hacer webs para cooperativas agrícolas y agroalimentación?",
        "a": "Sí, lo hacemos a menudo. Webs multiidioma para captar distribuidores europeos, fichas de producto técnicas, calendario de campañas, certificaciones (BIO, IGP) y formularios cualificados B2B."
      },
      {
        "q": "¿También hacéis tiendas online y marketing digital?",
        "a": "Sí. Además de diseño web: tiendas online WooCommerce con pasarela, marketing digital (SEO, Google Ads, redes), producción audiovisual con dron 4K y mantenimiento web desde 39€/mes."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en Huércal",
      "lead": "Plazos, precios, hosting gratuito, SEO local y cooperativas agroalimentarias. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "conexiones",
        "head": {
          "h2": "Donde se cruzan cuatro caminos",
          "lead": "Huércal-Overa es el nudo logístico y comercial del norte de Almería. Cuatro carreteras convergen aquí trayendo cada día gente de Lorca, Albox, Cuevas y Vera. Tu web local capta todos esos clientes potenciales."
        },
        "items": [
          {
            "t": "Murcia (Lorca)",
            "d": "Frontera norte · paso N-340",
            "meta": "15 km"
          },
          {
            "t": "Cuevas del Almanzora",
            "d": "Costa Levante + Almanzora",
            "meta": "25 km"
          },
          {
            "t": "Vera · Garrucha",
            "d": "Costa Levante + sede Platanito",
            "meta": "20 km"
          },
          {
            "t": "Albox · Valle Almanzora",
            "d": "Valle del Almanzora",
            "meta": "12 km"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "la-mojonera": {
    "slug": "la-mojonera",
    "title": "Diseño Web en La Mojonera: Webs B2B Agro",
    "description": "Diseño web en La Mojonera para empresas del invernadero: catálogos B2B de riego, fitosanitarios y maquinaria, y comercio local. Presupuesto en 24 h.",
    "h1": "Aquí no se compra por marca. Se compra por ficha técnica",
    "heroLead": "La Mojonera vende el riego, el fitosanitario, la maquinaria y el embalaje de todo el Poniente. Un mercado B2B puro donde el cliente busca por especificación y compara plazos. Si tu catálogo no está en Google, no existes.",
    "lugares": [
      {
        "name": "Mar de Plástico",
        "sub": "CONCENTRACIÓN RÉCORD",
        "desc": "La Mojonera está en el corazón de una de las mayores concentraciones de invernaderos de España. Kilómetros de cubierta plástica que se ven desde el satélite y que alimentan a media Europa durante todo el invierno.",
        "dato": "Visible desde el espacio"
      },
      {
        "name": "Polo de Servicios",
        "sub": "EL TALLER DEL PONIENTE",
        "desc": "Aquí no solo se cultiva: se vende el fitosanitario, la semilla, el riego, la maquinaria y el embalaje. Una de las redes de proveedores al invernadero más densas del país, concentrada en pocos kilómetros.",
        "dato": "Red B2B densa"
      },
      {
        "name": "Cadena de Frío",
        "sub": "EXPORTACIÓN A EUROPA",
        "desc": "La hortaliza sale de La Mojonera y llega refrigerada a Alemania, Francia o Países Bajos en cuestión de horas. Logística de precisión donde un grado de más arruina la carga.",
        "dato": "Export refrigerada"
      },
      {
        "name": "Mercado Técnico",
        "sub": "SE COMPRA POR FICHA",
        "desc": "El comprador del Poniente no busca marcas: busca especificaciones. Caudal, dosis, material, medida, plazo. Quien publica esos datos gana la consulta; quien esconde el catálogo, la pierde.",
        "dato": "Compra por spec"
      }
    ],
    "lugaresHead": {
      "h2": "Cuatro cosas que definen La Mojonera",
      "lead": "La Mojonera está en el corazón de una de las mayores concentraciones de invernaderos de España. Kilómetros de cubierta plástica que se ven desde el satélite y que alimentan a media Europa durante todo el invierno."
    },
    "datos": [
      {
        "k": "ECONOMÍA",
        "v": "Polo de servicios al invernadero"
      },
      {
        "k": "B2B",
        "v": "Fitosanitarios · riego · maquinaria · embalaje"
      },
      {
        "k": "LOGÍSTICA",
        "v": "Exportación refrigerada a Europa"
      },
      {
        "k": "POBLACIÓN",
        "v": "9.000 habitantes"
      },
      {
        "k": "ICONO",
        "v": "Polígono Agrícola de La Mojonera"
      },
      {
        "k": "COBERTURA",
        "v": "El Ejido · Roquetas · Vícar · Adra"
      }
    ],
    "datosHead": null,
    "sectores": [
      {
        "nombre": "Suministro al Invernadero",
        "stat": "B2B",
        "statLabel": "catálogo técnico",
        "desc": "Fitosanitarios, semillas, sustratos y sistemas de riego. El agricultor busca por especificación, no por marca: quien tiene ficha de producto, dosis y compatibilidades publicadas es quien aparece cuando alguien busca \"sistema de riego invernadero\".",
        "tags": [
          "Catálogo técnico",
          "Ficha de producto",
          "Formulario de pedido",
          "SEO industrial"
        ]
      },
      {
        "nombre": "Maquinaria e Instalación",
        "stat": "24/7",
        "statLabel": "campaña viva",
        "desc": "Maquinaria, estructuras, automatismos y climatización de invernadero. Un cliente con una avería en plena campaña no llama al que conoce: llama al primero que encuentra con teléfono visible y servicio descrito. La web decide esa llamada.",
        "tags": [
          "Servicio urgente",
          "Google Maps",
          "Casos de instalación",
          "Contacto directo"
        ]
      },
      {
        "nombre": "Logística Refrigerada y Export",
        "stat": "UE",
        "statLabel": "destino europeo",
        "desc": "El Poniente exporta millones de toneladas al año. Transportistas y operadores de comercio exterior necesitan web profesional con rutas, certificaciones de cadena de frío y referencias, en varios idiomas, para cerrar contratos con exportadores.",
        "tags": [
          "Multiidioma",
          "Cadena de frío",
          "Rutas y flota",
          "Certificaciones"
        ]
      },
      {
        "nombre": "Embalaje y Manipulado",
        "stat": "Campaña",
        "statLabel": "picos de demanda",
        "desc": "Confección, envase, etiquetado y paletizado. Un comprador que necesita 40.000 barquetas la semana que viene no abre un catálogo en PDF de 2019: quiere formatos, medidas y plazos en la web y un formulario que responda hoy.",
        "tags": [
          "Catálogo de formatos",
          "Solicitud de muestra",
          "Plazos visibles",
          "B2B"
        ]
      },
      {
        "nombre": "Comercio y Servicios Locales",
        "stat": "9k",
        "statLabel": "habitantes",
        "desc": "La alta concentración de trabajadores agrícolas genera demanda constante de servicios cotidianos: comida, ropa, telefonía, envíos y reparaciones. Comercios con ficha de Google cuidada captan ese mercado sin gastar un euro en publicidad.",
        "tags": [
          "Ficha de Google",
          "Reseñas",
          "Web sencilla",
          "SEO local"
        ]
      },
      {
        "nombre": "Gestoría, Ingeniería y Técnicos",
        "stat": "Pro",
        "statLabel": "servicios al agro",
        "desc": "Gestorías agrícolas, ingenieros técnicos, asesores de PAC y peritos que trabajan para explotaciones de todo el Poniente. El agricultor busca a su gestoría en el móvil: quien está en el mapa con reseñas y servicios claros se lleva la consulta.",
        "tags": [
          "Captación de leads",
          "Servicios listados",
          "Google Maps",
          "Formularios"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Seis mercados, todos técnicos",
      "lead": "Fitosanitarios, semillas, sustratos y sistemas de riego. El agricultor busca por especificación, no por marca: quien tiene ficha de producto, dosis y compatibilidades publicadas es quien aparece cuando alguien busca \"sistema de riego invernadero\"."
    },
    "diferenciales": [
      {
        "title": "Un mercado que compra por especificación",
        "desc": "Esto no es comercio de escaparate. El agricultor y el exportador buscan caudal, dosis, medida y plazo de entrega. Una web bonita sin datos técnicos no vende nada aquí; una web fea con el catálogo completo y bien indexado, sí. Nosotros hacemos que sea completa y además esté bien hecha."
      },
      {
        "title": "La campaña no espera",
        "desc": "En plena temporada, una avería de riego o de climatización se resuelve en horas o se pierde la cosecha. El proveedor que aparece el primero en Google con teléfono visible y servicio descrito se lleva la llamada. Los demás se enteran al día siguiente."
      },
      {
        "title": "Vendes a Europa y tu web habla solo español",
        "desc": "Los compradores están en Alemania, Francia y Países Bajos. Llegan buscando en su idioma y aterrizan en una web que no entienden, sin certificaciones visibles. Se van a la siguiente. El multiidioma aquí no es un extra: es la puerta de entrada."
      },
      {
        "title": "Tus clientes ya no son solo de Almería",
        "desc": "La tecnología del invernadero almeriense se exporta a Murcia, Huelva, Marruecos y Latinoamérica. Una web B2B bien posicionada convierte un negocio comarcal en un proveedor con alcance nacional e internacional, sin abrir una sola delegación."
      }
    ],
    "diferencialesHead": {
      "h2": "Por qué vender aquí no se parece a vender en la costa",
      "lead": "Esto no es comercio de escaparate. El agricultor y el exportador buscan caudal, dosis, medida y plazo de entrega. Una web bonita sin datos técnicos no vende nada aquí; una web fea con el catálogo completo y bien indexado, sí. Nosotros hacemos que sea completa y además esté bien hecha."
    },
    "testimonios": [
      {
        "nombre": "Domingo Fernández",
        "negocio": "Empresa de sistemas de riego",
        "texto": "Tenemos clientes en todo el Poniente pero nos llegaban por referencias. La web con catálogo técnico nos abrió el mercado de Murcia y Huelva. Ahora tenemos comerciales en dos nuevas provincias."
      },
      {
        "nombre": "Milagros Vargas",
        "negocio": "Gestoría para agricultores",
        "texto": "La mayoría de los agricultores del Poniente buscan su gestoría en el móvil. Aparecer en Google Maps con buenas reseñas y web con los servicios listados nos triplicó los nuevos clientes en seis meses."
      }
    ],
    "testimoniosHead": {
      "h2": "Lo cuentan mejor ellos",
      "lead": "Tenemos clientes en todo el Poniente pero nos llegaban por referencias. La web con catálogo técnico nos abrió el mercado de Murcia y Huelva. Ahora tenemos comerciales en dos nuevas provincias."
    },
    "faq": [
      {
        "q": "¿Qué tipo de webs necesitan las empresas agrícolas de La Mojonera?",
        "a": "Empresas de fitosanitarios y maquinaria necesitan webs B2B con catálogo técnico, ficha de producto descargable y formulario de pedido. Logísticas necesitan web de presentación de servicio con contacto y referencias de clientes."
      },
      {
        "q": "¿Merece la pena el SEO para una empresa de servicios agrícolas en La Mojonera?",
        "a": "Absolutamente. Los agricultores del Poniente buscan proveedores en Google igual que cualquier comprador B2B. Posicionarse para \"maquinaria invernadero Almería\" o \"fitosanitarios Poniente\" trae consultas de calidad."
      },
      {
        "q": "¿Cuánto cuesta una web B2B para empresa agrícola de La Mojonera?",
        "a": "Desde 650€ para web de empresa con catálogo básico y formulario de contacto. Con catálogo técnico avanzado y área de clientes desde 900€. Hosting gratuito siempre."
      },
      {
        "q": "¿Podéis montar un catálogo con filtros por especificación técnica?",
        "a": "Sí, y es justo lo que más convierte en este sector. Filtros por caudal, medida, material, cultivo o formato, con ficha individual indexable para cada referencia. Así cada producto se posiciona por su cuenta y capta búsquedas muy concretas."
      },
      {
        "q": "¿Hacéis webs multiidioma para exportar a Europa?",
        "a": "Sí, con traducción real y SEO específico en cada idioma, no traductor automático. Inglés, alemán, francés y neerlandés son los habituales aquí. Un comprador alemán tiene que encontrarte buscando en alemán, no solo entenderte cuando ya ha llegado."
      },
      {
        "q": "¿Se puede integrar la web con mi ERP o mi programa de gestión?",
        "a": "Depende del sistema, pero en la mayoría de casos sí: sincronizamos catálogo, stock o tarifas para no duplicar trabajo. Lo valoramos en la primera reunión, viendo qué programa usas y qué exporta."
      },
      {
        "q": "¿Hacéis reuniones presenciales en La Mojonera?",
        "a": "Sí. Estamos en Vera y nos desplazamos al Poniente para reunirnos en tu nave, tu oficina o el polígono. La primera consulta es gratuita y sin compromiso."
      },
      {
        "q": "¿En cuánto tiempo tengo la web lista?",
        "a": "Web de empresa con servicios: 1–2 semanas. Con catálogo técnico y fichas de producto: 2–3 semanas. Con multiidioma completo e integración de catálogo: 3–5 semanas."
      }
    ],
    "faqHead": {
      "h2": "Lo que nos preguntan siempre",
      "lead": "Empresas de fitosanitarios y maquinaria necesitan webs B2B con catálogo técnico, ficha de producto descargable y formulario de pedido. Logísticas necesitan web de presentación de servicio con contacto y referencias de clientes."
    },
    "extras": [],
    "ctaHead": null
  },
  "los-gallardos": {
    "slug": "los-gallardos",
    "title": "Diseño Web en Los Gallardos | Bilingüe",
    "description": "Diseño web bilingüe ES/EN y SEO en Los Gallardos para inmobiliarias, golf y servicios a expats. Capta al cliente británico. Presupuesto en 24h.",
    "h1": "Diseño web para Los Gallardos, en dos idiomas",
    "heroLead": "Golf, sol y una gran comunidad británica. Webs bilingües español/inglés para inmobiliarias, estate agents, restaurantes y servicios — porque aquí el cliente que paga bien lo busca todo en Google en inglés.",
    "lugares": [
      {
        "name": "Golf Valle del Este",
        "sub": "CAMPO + RESORT",
        "desc": "El campo de golf que mueve a Los Gallardos: jugadores nacionales e internacionales todo el año, turismo deportivo de alto poder adquisitivo y un resort que demanda servicios alrededor.",
        "dato": "18 hoyos"
      },
      {
        "name": "Comunidad británica",
        "sub": "EXPATS · BILINGÜE",
        "desc": "Una de las mayores concentraciones de residentes británicos del Levante. Un mercado que paga bien, que lo busca todo en Google en inglés y que la competencia local no sabe atender.",
        "dato": "EN + ES"
      },
      {
        "name": "Cítricos del valle",
        "sub": "NARANJA Y LIMÓN",
        "desc": "El valle de Los Gallardos es tierra de naranjos y limoneros. Producto de proximidad y fincas que pueden vender, exportar o abrir sus puertas al agroturismo con la web adecuada.",
        "dato": "km 0"
      }
    ],
    "lugaresHead": {
      "h2": "Golf Valle del Este",
      "lead": "Un campo de golf que juega los 365 días y atrae a jugadores de toda Europa. Alrededor, un resort y una economía de servicios — alojamiento, restauración, alquileres, clases — que vive del turista deportivo que reserva online y en inglés."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "3.500 hab · municipio multicultural"
      },
      {
        "k": "COMUNIDAD UK",
        "v": "De las mayores del Levante almeriense"
      },
      {
        "k": "GOLF",
        "v": "Valle del Este · campo + resort"
      },
      {
        "k": "CÍTRICOS",
        "v": "Naranja y limón del valle"
      },
      {
        "k": "BILINGÜE",
        "v": "Negocios y servicios en ES + EN"
      },
      {
        "k": "UBICACIÓN",
        "v": "A 15 min de Mojácar, Vera y la costa"
      }
    ],
    "datosHead": {
      "h2": "Por qué Los Gallardos es una mina",
      "lead": "Datos que explican por qué Los Gallardos es uno de los mercados más rentables y peor atendidos digitalmente del Levante para quien sabe trabajar en dos idiomas."
    },
    "sectores": [
      {
        "nombre": "Inmobiliarias y estate agents",
        "stat": "£/€",
        "statLabel": "compradores UK",
        "desc": "Los Gallardos tiene una de las mayores comunidades británicas del Levante. Inmobiliarias y estate agents con web en inglés capturan un mercado que paga bien y que lo busca todo en Google antes de llamar. Portal de propiedades, fichas y captación de leads.",
        "tags": [
          "Web EN/ES + hreflang",
          "Portal de propiedades",
          "Captación de leads",
          "Buscador avanzado"
        ]
      },
      {
        "nombre": "Golf y turismo activo",
        "stat": "365",
        "statLabel": "días de juego",
        "desc": "El Golf Valle del Este atrae jugadores nacionales e internacionales todo el año. Alquiler de equipos, clases, reservas de green fee y alojamientos cercanos pueden captar este turismo deportivo de alto poder adquisitivo con web y reservas online.",
        "tags": [
          "SEO \"golf Almería\"",
          "Reservas green fee",
          "Paquetes golf+hotel",
          "Multiidioma"
        ]
      },
      {
        "nombre": "Hostelería internacional",
        "stat": "EN/ES",
        "statLabel": "doble carta",
        "desc": "La comunidad residente demanda restaurantes, pubs y bares con ambiente internacional. Negocios bilingües que aparezcan en Google en inglés y español (\"English bar Los Gallardos\") tienen doble ventaja competitiva sobre el resto.",
        "tags": [
          "Carta digital EN/ES",
          "Google Business bilingüe",
          "SEO \"English bar\"",
          "Reservas online"
        ]
      },
      {
        "nombre": "Reformas, construcción y hogar",
        "stat": "B2C",
        "statLabel": "servicios a expats",
        "desc": "Los residentes europeos demandan reformas, construcción, piscinas, jardinería y servicios del hogar — y los buscan en inglés. Un negocio bilingüe que aparezca primero en Google se lleva un mercado que la competencia ignora por completo.",
        "tags": [
          "Web en inglés",
          "SEO servicios EN",
          "Galería de obras",
          "Presupuesto online"
        ]
      },
      {
        "nombre": "Cítricos y agroturismo",
        "stat": "km0",
        "statLabel": "naranja y limón",
        "desc": "Las fincas de cítricos del valle pueden vender producto de proximidad, montar venta online de cajas o abrir al agroturismo. Marca de territorio, storytelling y, si exportan, multiidioma y SEO internacional.",
        "tags": [
          "Venta de cajas online",
          "Marca de territorio",
          "Agroturismo",
          "Multiidioma export"
        ]
      },
      {
        "nombre": "Salud, bienestar y profesionales",
        "stat": "pro",
        "statLabel": "a residentes UE",
        "desc": "Clínicas, fisioterapia, dentistas, gestorías y asesorías fiscales que atienden a la comunidad internacional. Cita online, web bilingüe y RGPD para captar al residente europeo que busca profesionales que hablen su idioma.",
        "tags": [
          "Cita online",
          "Web bilingüe",
          "RGPD",
          "Asesoría fiscal EN"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que hablan dos idiomas",
      "lead": "Seis sectores con estrategia digital propia. Del portal inmobiliario para británicos al restaurante con doble carta — todos con SEO en inglés y español."
    },
    "diferenciales": [
      {
        "title": "Un mercado expat que paga bien",
        "desc": "La comunidad británica de Los Gallardos tiene poder adquisitivo y una costumbre clarísima: lo busca todo en Google en inglés antes de llamar a nadie. Si tu web no está en inglés, para ese cliente no existes. Es el mercado más rentable de la zona y el peor atendido."
      },
      {
        "title": "Bilingüe = el doble de mercado",
        "desc": "Una web en español + inglés con hreflang y traducción profesional (no automática) te abre a dos públicos a la vez. La competencia local solo va a por el cliente español. Tú vas a por los dos — y te quedas con el británico que nadie más sabe atender."
      },
      {
        "title": "Golf todo el año, cliente premium",
        "desc": "El Golf Valle del Este trae jugadores con dinero los 365 días. Alojamientos, restauración, alquileres y servicios que sepan captar a ese turista deportivo internacional con web y reservas en inglés tienen una mina sin explotar al lado de casa."
      },
      {
        "title": "La competencia ni lo intenta",
        "desc": "La mayoría de negocios de Los Gallardos no tienen web, y los que la tienen casi nunca está en inglés. Posicionarte bien en ES y EN aquí es relativamente fácil y muy rentable: poca competencia, demanda alta y un cliente que valora encontrarte."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para invertir en tu web",
      "lead": "Mercado expat premium + bilingüe = doble público + golf todo el año + competencia dormida. Los Gallardos es de los sitios donde una buena web rinde más rápido."
    },
    "testimonios": [
      {
        "nombre": "Jane & Peter Thompson",
        "negocio": "Estate agency · Los Gallardos",
        "texto": "We needed a website in English and Spanish to reach both markets. Platanito Rico understood exactly what we needed. Our property listings now rank on Google and we get qualified enquiries every week."
      },
      {
        "nombre": "Javier Morales",
        "negocio": "Bar-restaurante · Los Gallardos",
        "texto": "Mi bar tiene mitad de clientes ingleses. Hicimos la web bilingüe con Platanito Rico y ahora aparecemos cuando los guiris buscan \"English bar Los Gallardos\". El negocio ha cambiado mucho."
      },
      {
        "nombre": "David Wright",
        "negocio": "Property maintenance · expats",
        "texto": "Most of my clients are British homeowners who need pool and garden maintenance. The bilingual website put me at the top of Google for \"pool maintenance Los Gallardos\". I am now booked weeks ahead — best investment I made."
      },
      {
        "nombre": "Carmen Vargas",
        "negocio": "Gestoría y asesoría fiscal",
        "texto": "Atiendo a muchos residentes británicos con su fiscalidad en España. La web en inglés y español me ha traído clientes nuevos cada mes que antes se iban a gestorías de la capital. Justo el mercado que buscaba."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios bilingües que ya ganan",
      "lead": "Mi bar tiene mitad de clientes ingleses. Hicimos la web bilingüe con Platanito Rico y ahora aparecemos cuando los guiris buscan \"English bar Los Gallardos\". El negocio ha cambiado mucho."
    },
    "faq": [
      {
        "q": "¿Hacéis webs en inglés para negocios que atienden a residentes británicos en Los Gallardos?",
        "a": "Sí, es nuestra especialidad en la zona. Hacemos webs bilingües (español e inglés) con hreflang, traducción profesional (no automática) y SEO en ambos idiomas. Nuestros clientes en zonas con comunidad internacional ven resultados muy rápidos al cubrir un mercado que la competencia local ignora."
      },
      {
        "q": "¿Podéis hacer una web para una estate agency o inmobiliaria en Los Gallardos?",
        "a": "Sí, creamos portales inmobiliarios bilingües con fichas de propiedades, galería de fotos, buscador por características (precio, dormitorios, zona), captación de leads e integración con tu CRM. Optimizados para compradores internacionales que buscan \"property for sale Los Gallardos\" y \"villas Almería\"."
      },
      {
        "q": "¿Cuánto cuesta una web bilingüe para un negocio en Los Gallardos?",
        "a": "Una web corporativa bilingüe ES/EN desde 500€. Incluye traducción profesional, hreflang para SEO internacional, diseño responsive y hosting gratuito. Portales inmobiliarios o webs con reservas y pagos desde 700€. Landing de una página desde 350€. Presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Trabajáis con negocios del Golf Valle del Este?",
        "a": "Sí. Para el sector golf hacemos webs con reservas de green fee, paquetes golf+hotel, alquiler de equipos y clases, multiidioma para el jugador internacional y SEO para \"golf Almería\" y \"Valle del Este golf\". Captamos un turista deportivo de alto poder adquisitivo que reserva online."
      },
      {
        "q": "¿Hacéis webs para restaurantes y pubs con clientela inglesa?",
        "a": "Por supuesto. Carta digital QR en inglés y español, Google Business bilingüe, fotografía de producto y SEO para búsquedas como \"English bar Los Gallardos\", \"Sunday roast\" o \"restaurante internacional\". Captas al residente y al turista británico que busca ambiente conocido."
      },
      {
        "q": "¿Y para reformas, piscinas, jardinería y servicios del hogar?",
        "a": "Sí, es un sector con muchísima demanda entre los residentes europeos. Web en inglés con galería de trabajos, zona de servicios, formulario de presupuesto y SEO para \"pool maintenance\", \"reformas\" y \"gardening Los Gallardos\". Apareces primero donde la competencia no llega."
      },
      {
        "q": "¿En cuánto tiempo está lista mi web?",
        "a": "Una web corporativa o de servicios bilingüe: 1–2 semanas. Portal inmobiliario con buscador y fichas: 3–5 semanas. Web de golf o restauración con reservas: 2–3 semanas. Trabajamos en sprints y ves avances cada semana."
      },
      {
        "q": "¿Trabajáis en los pueblos de alrededor: Turre, Bédar, Antas, Mojácar?",
        "a": "Sí, cubrimos todo el Levante almeriense y las zonas con comunidad internacional: Los Gallardos, Turre, Bédar, Antas, Mojácar, Vera y alrededores. Trabajamos online y nos desplazamos para reuniones o sesiones de fotos cuando el proyecto lo requiere."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan aquí",
      "lead": "Webs en inglés, inmobiliarias, golf, restaurantes, servicios, plazos y precios. Si no está aquí, escríbenos."
    },
    "extras": [],
    "ctaHead": null
  },
  "macael": {
    "slug": "macael",
    "title": "Diseño Web en Macael: Mármol y Canteras",
    "description": "Agencia de diseño web en Macael. Webs para marmolistas, canteras y exportación de piedra natural. Catálogo B2B, SEO industrial y multiidioma.",
    "h1": "Diseño web para el mármol más blanco del mundo",
    "heroLead": "Macael es la capital mundial del mármol blanco. Su piedra adorna la Alhambra y monumentos de 60 países. Empresas marmolistas, exportadores y proveedores que necesitan una web a la altura de su prestigio internacional.",
    "lugares": [
      {
        "name": "Mármol Blanco Macael",
        "sub": "PIEDRA DE LA ALHAMBRA",
        "desc": "El mármol blanco de Macael adorna la Alhambra de Granada, el Palacio Real de Madrid y monumentos en más de 60 países. Su blancura, pureza y vetas sutiles lo convierten en el mármol más codiciado del Mediterráneo.",
        "dato": "60+ países"
      },
      {
        "name": "Canteras Milenarias",
        "sub": "DESDE LA ÉPOCA ROMANA",
        "desc": "Las canteras de Macael llevan en explotación más de 2.000 años. Los romanos ya extraían este mármol para sus construcciones. Hoy la tecnología de corte se combina con una tradición milenaria.",
        "dato": "+2.000 años"
      },
      {
        "name": "Exportación Global",
        "sub": "A 60+ PAÍSES",
        "desc": "Desde Macael se exporta mármol a Arabia Saudí, Emiratos Árabes, China, Estados Unidos, Italia y toda Europa. La marca \"Mármol Macael\" es un sello de calidad reconocido internacionalmente.",
        "dato": "Exportación top"
      },
      {
        "name": "Museo del Mármol",
        "sub": "PATRIMONIO INDUSTRIAL",
        "desc": "El Museo del Mármol de Macael es el único en España dedicado a la piedra natural. Recoge la historia de la extracción, herramientas tradicionales y piezas emblemáticas realizadas con mármol de Macael.",
        "dato": "Museo único"
      }
    ],
    "lugaresHead": {
      "h2": "Cuatro pilares del mármol que mueve el mundo",
      "lead": "El mármol blanco de Macael adorna la Alhambra de Granada, el Palacio Real de Madrid y monumentos en más de 60 países. Su blancura, pureza y vetas sutiles lo convierten en el mármol más codiciado del Mediterráneo."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "6.000 hab · Capital del mármol"
      },
      {
        "k": "EXPORTACIÓN",
        "v": "A más de 60 países"
      },
      {
        "k": "MATERIAL",
        "v": "Mármol Blanco Macael · Pureza superior"
      },
      {
        "k": "PRODUCCIÓN",
        "v": "500.000+ m²/año de piedra"
      },
      {
        "k": "HISTORIA",
        "v": "Canteras desde época romana"
      },
      {
        "k": "MONUMENTOS",
        "v": "Alhambra · Palacio Real · La Meca"
      }
    ],
    "datosHead": {
      "h2": "El mármol blanco que vestía la Alhambra hoy viaja a 60 países",
      "lead": "El Mármol Blanco Macael no es una piedra cualquiera. Es el material que eligieron los nazaríes para la Alhambra, los Austrias para el Palacio Real de Madrid y que hoy se exporta a Arabia Saudí, Emiratos, China y Estados Unidos. Su blancura, su pureza y su capacidad de transmitir luz lo convierten en el mármol más codiciado del Mediterráneo."
    },
    "sectores": [
      {
        "nombre": "Marmolistas y Exportación",
        "stat": "60+",
        "statLabel": "países",
        "desc": "Macael es sinónimo de mármol blanco en el mundo. Empresas marmolistas necesitan webs en inglés, italiano, árabe y francés para llegar a constructores, arquitectos y distribuidores de Oriente Medio, Europa y América. Cada idioma es un mercado abierto.",
        "tags": [
          "Catálogo multiidioma",
          "Exportación mundial",
          "Fichas técnicas",
          "Formulario B2B"
        ]
      },
      {
        "nombre": "Proveedores Industriales",
        "stat": "B2B",
        "statLabel": "venta técnica",
        "desc": "El ecosistema industrial de Macael incluye proveedores de maquinaria de corte, abrasivos, herramientas diamantadas y productos químicos para la piedra. Webs técnicas con catálogo descargable y solicitud de cotización que funciona como canal de venta.",
        "tags": [
          "Catálogo técnico",
          "PDF descargable",
          "Cotización online",
          "SEO industrial"
        ]
      },
      {
        "nombre": "Turismo Industrial",
        "stat": "★",
        "statLabel": "ruta del mármol",
        "desc": "Las canteras de Macael atraen a profesionales y curiosos de todo el mundo. Museo del Mármol, rutas guiadas a canteras y visitas a fábricas. Web bilingüe con reservas y contenidos.",
        "tags": [
          "Visitas a canteras",
          "Museo del Mármol",
          "Reservas online",
          "Multiidioma"
        ]
      },
      {
        "nombre": "Arquitectura e Interiorismo",
        "stat": "#1",
        "statLabel": "mármol premium",
        "desc": "El mármol blanco de Macael es el material preferido de arquitectos e interioristas de lujo. Estudios que trabajen con este material pueden posicionarse globalmente con portfolio de proyectos y contenido aspiracional.",
        "tags": [
          "Portfolio premium",
          "Proyectos de lujo",
          "SEO internacional",
          "Catálogo de piedras"
        ]
      },
      {
        "nombre": "Transporte y Logística",
        "stat": "24/7",
        "statLabel": "envíos globales",
        "desc": "El mármol de Macael viaja a más de 60 países. Empresas de transporte especializado en piedra natural, logística portuaria y embalaje para exportación necesitan web profesional.",
        "tags": [
          "Logística mármol",
          "Envíos internacionales",
          "Seguro de carga",
          "Gestión aduanas"
        ]
      },
      {
        "nombre": "Comercio y Servicios",
        "stat": "6K",
        "statLabel": "habitantes",
        "desc": "Macael tiene 6.000 habitantes y una actividad económica que atrae a profesionales de toda la comarca. Comercios, clínicas, gestorías y servicios locales que aparezcan en Google Maps captan el flujo constante de la industria.",
        "tags": [
          "Google Maps",
          "SEO local",
          "Ficha de negocio",
          "Servicios profesionales"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Seis sectores para exportar tu presencia digital",
      "lead": "Macael es sinónimo de mármol blanco en el mundo. Empresas marmolistas necesitan webs en inglés, italiano, árabe y francés para llegar a constructores, arquitectos y distribuidores de Oriente Medio, Europa y América. Cada idioma es un mercado abierto."
    },
    "diferenciales": [
      {
        "title": "El mármol más puro del Mediterráneo",
        "desc": "El mármol blanco de Macael tiene una pureza y homogeneidad que pocas piedras en el mundo igualan. No es solo mármol — es un material con denominación de origen, historia milenaria y prestigio global."
      },
      {
        "title": "Exportación a 60+ países",
        "desc": "Macael no vende solo en España. Sus empresas compiten en Arabia Saudí, Emiratos, China, EE.UU. y Europa. Una web multiidioma bien hecha es la herramienta de venta más importante para cualquier exportador."
      },
      {
        "title": "Conocimiento técnico milenario",
        "desc": "Llevamos 2.000 años trabajando esta piedra. Ese conocimiento se traduce en calidad y acabados que otras regiones no pueden igualar. La web debe transmitir esa autoridad."
      },
      {
        "title": "Marca global desde un pueblo",
        "desc": "\"Mármol Macael\" es una marca reconocida en los cinco continentes. Desde un pueblo de 6.000 habitantes se compite con los grandes del sector mundial. La presencia digital es el altavoz."
      }
    ],
    "diferencialesHead": {
      "h2": "Por qué Macael es único en el mundo de la piedra",
      "lead": "El mármol blanco de Macael tiene una pureza y homogeneidad que pocas piedras en el mundo igualan. No es solo mármol — es un material con denominación de origen, historia milenaria y prestigio global."
    },
    "testimonios": [
      {
        "nombre": "Jesús Rodríguez",
        "negocio": "Empresa exportadora de mármol",
        "texto": "Platanito Rico nos hizo una web en cuatro idiomas con catálogo de materiales y fichas técnicas descargables. Recibimos consultas de proyectos desde Arabia Saudí y Emiratos Árabes. El retorno ha sido brutal."
      },
      {
        "nombre": "Inmaculada Pérez",
        "negocio": "Proveedor de maquinaria para piedra",
        "texto": "Nuestros clientes son empresas de toda España y Portugal. La web nueva con formulario de cotización ha multiplicado por tres los presupuestos que recibimos cada mes."
      },
      {
        "nombre": "Ángel Martos",
        "negocio": "Taller de corte y acabado",
        "texto": "Trabajamos el mármol blanco Macael para proyectos de interiorismo de lujo. El portfolio online con fotos de nuestros trabajos nos ha abierto las puertas de estudios de arquitectura de Madrid y Barcelona."
      }
    ],
    "testimoniosHead": {
      "h2": "Lo que dicen los que exportan su marca al mundo",
      "lead": "Nuestros clientes son empresas de toda España y Portugal. La web nueva con formulario de cotización ha multiplicado por tres los presupuestos que recibimos cada mes."
    },
    "faq": [
      {
        "q": "¿Podéis hacer webs para empresas de mármol con catálogo en varios idiomas?",
        "a": "Sí, es nuestra especialidad en Macael. Hacemos catálogos en español, inglés, italiano y árabe, con fichas técnicas descargables y formularios de cotización para distribuidores internacionales."
      },
      {
        "q": "¿Cómo posiciona una empresa de mármol de Macael en Google internacional?",
        "a": "Con SEO técnico en el idioma del mercado objetivo, contenido sobre el mármol blanco Macael y sus aplicaciones, y backlinks en publicaciones del sector de la piedra natural."
      },
      {
        "q": "¿Cuánto cuesta una web para una empresa marmolista de Macael?",
        "a": "Desde 500€ para web corporativa con catálogo B2B en dos idiomas. Con tienda online o configurador de materiales desde 700€. Landing de una página desde 350€. Hosting gratuito incluido."
      },
      {
        "q": "¿Hacéis fotografía profesional de producto para catálogos de mármol?",
        "a": "Sí, tenemos equipo de fotografía industrial para captar la textura, el brillo y las vetas del mármol. Fotos de alta resolución para web y catálogo."
      },
      {
        "q": "¿Podéis hacer una web en árabe para exportar a Oriente Medio?",
        "a": "Sí, trabajamos con traductores nativos para árabe. El mármol blanco Macael tiene demanda enorme en Dubái, Arabia Saudí y Qatar."
      },
      {
        "q": "¿En cuánto tiempo tengo mi web de Macael lista?",
        "a": "Web corporativa: 1–2 semanas. Catálogo B2B multiidioma: 2–4 semanas. Tienda online con configurador: 3–5 semanas."
      },
      {
        "q": "¿Ayudáis con marketing digital para empresas de mármol?",
        "a": "Sí, ofrecemos SEO multidioma, Google Business Profile, redes sociales para sector industrial y campañas B2B para distribuidores."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Macael?",
        "a": "Sí, estamos en Vera, a 25 minutos de Macael. Nos vemos en tus oficinas, la cantera o el taller. Primera consulta gratuita."
      }
    ],
    "faqHead": {
      "h2": "Respuestas para el mármol de tus dudas",
      "lead": ""
    },
    "extras": [],
    "ctaHead": null
  },
  "mojacar": {
    "slug": "mojacar",
    "title": "Diseño Web en Mojácar: Turismo y Hostelería",
    "description": "Diseño web multiidioma y SEO en Mojácar para turismo, hostelería e inmobiliarias. Motor de reservas y captación internacional. Presupuesto en 24h.",
    "h1": "Diseño web para el Pueblo Blanco y la Playa",
    "heroLead": "Webs multiidioma (ES · EN · DE · FR) para captar turistas de Reino Unido, Alemania, Francia y Bélgica. Reservas directas sin comisiones de Booking ni Airbnb. Tu sitio, tu marca, tu dinero.",
    "lugares": [],
    "lugaresHead": null,
    "datos": [],
    "datosHead": null,
    "sectores": [
      {
        "nombre": "Hoteles y alojamientos",
        "stat": "70%",
        "statLabel": "turismo busca online",
        "desc": "Motor de reservas directo, galería inmersiva, multiidioma (ES/EN/FR/DE) y SEO internacional para captar turistas que buscan \"hotel in Mojácar\" sin pagar comisiones del 15–20%.",
        "tags": [
          "Motor de reservas",
          "Multiidioma nativo",
          "Galería inmersiva",
          "SEO internacional"
        ]
      },
      {
        "nombre": "Restaurantes y chiringuitos",
        "stat": "#1",
        "statLabel": "en Google Maps",
        "desc": "Carta digital QR multiidioma, sistema de reservas, integración con Google Maps y SEO local para que turistas y residentes te encuentren al buscar \"where to eat in Mojácar\".",
        "tags": [
          "Carta digital QR",
          "Reservas online",
          "Google Maps",
          "Menú multiidioma"
        ]
      },
      {
        "nombre": "Alquiler vacacional",
        "stat": "0%",
        "statLabel": "comisiones propias",
        "desc": "Plataforma propia con calendario de disponibilidad, pasarela de pago segura, galería 360° y multiidioma. Deja de depender de Airbnb y sus comisiones del 15–20%.",
        "tags": [
          "Calendario disponibilidad",
          "Pago seguro",
          "Galería 360°",
          "Sin comisiones"
        ]
      },
      {
        "nombre": "Inmobiliarias",
        "stat": "+40%",
        "statLabel": "leads cualificados",
        "desc": "Portal con buscador avanzado, fichas detalladas multiidioma y captación de leads de compradores internacionales de UK, Alemania, Bélgica y Francia.",
        "tags": [
          "Portal propiedades",
          "Buscador avanzado",
          "Leads internacionales",
          "Fichas multiidioma"
        ]
      },
      {
        "nombre": "Comercios y boutiques",
        "stat": "24/7",
        "statLabel": "tu tienda nunca cierra",
        "desc": "E-commerce para vender artesanía, moda y productos locales a toda España y Europa. Catálogo visual atractivo, gestión de stock y envíos automatizados.",
        "tags": [
          "E-commerce",
          "Pasarela de pago",
          "Gestión de stock",
          "Envíos automáticos"
        ]
      },
      {
        "nombre": "Actividades y ocio",
        "stat": "x3",
        "statLabel": "más reservas online",
        "desc": "Webs para empresas de kayak, buceo, rutas, spa y excursiones en Mojácar. Con reservas online multiidioma, calendario de actividades y reviews integradas.",
        "tags": [
          "Reservas online",
          "Calendario actividades",
          "Reviews integradas",
          "Multiidioma"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que brillan en Mojácar",
      "lead": "Seis sectores con estrategias específicas para captar turismo internacional y cliente local. Cada uno con su SEO, su sistema de reservas y su multiidioma."
    },
    "diferenciales": [
      {
        "title": "Turismo internacional",
        "desc": "Mojácar recibe visitantes de UK, Alemania, Francia y Bélgica. Tu web necesita estar en su idioma para convertir. No vale traducción automática: cada versión debe estar optimizada para SEO en ese idioma."
      },
      {
        "title": "Estacionalidad inteligente",
        "desc": "El SEO local trabaja 365 días. Cuando llega la temporada, tu web ya está posicionada y capturando reservas. Los primeros puestos en Google no se improvisan en junio."
      },
      {
        "title": "Pueblo + Playa = 2 mercados",
        "desc": "Mojácar Pueblo atrae cultura, gastronomía y boutiques. Mojácar Playa atrae turismo de sol, ocio y deportes acuáticos. Tu web debe hablarle a ambos públicos."
      },
      {
        "title": "Competencia feroz online",
        "desc": "Booking, Airbnb y TripAdvisor dominan las búsquedas. Una web propia con SEO local, reservas directas y marca diferenciada te devuelve el control y elimina comisiones."
      }
    ],
    "diferencialesHead": {
      "h2": "Lo que hace único a este pueblo",
      "lead": "Cuatro razones por las que tu web en Mojácar necesita una estrategia diferente a cualquier otro destino turístico."
    },
    "testimonios": [
      {
        "nombre": "Luis S.",
        "negocio": "Restaurante · Mojácar Playa",
        "texto": "Nuestro restaurante necesitaba carta digital y reservas online en varios idiomas. Nos hicieron una web espectacular y gracias al SEO local captamos reservas todo el año, incluso en temporada baja."
      },
      {
        "nombre": "Marta F.",
        "negocio": "Boutique · Mojácar Pueblo",
        "texto": "Tengo una boutique y quería vender online a toda España. Platanito Rico desarrolló mi e-commerce con un diseño que capta la esencia de la tienda. Las ventas online ya son el 30% de mi facturación."
      },
      {
        "nombre": "Tomás R.",
        "negocio": "Hotel · Mojácar",
        "texto": "Desde que lanzaron la nueva web hemos duplicado las reservas directas y reducido la dependencia de Booking al 40%. El multiidioma inglés-alemán fue clave para captar turistas del norte de Europa."
      },
      {
        "nombre": "Isabel G.",
        "negocio": "Alquiler vacacional · Mojácar",
        "texto": "Como agencia de alquiler vacacional, necesitábamos una plataforma rápida y visual con multiidioma. La presencia en búsquedas desde Reino Unido ha mejorado un 300%."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Mojácar que ya venden online",
      "lead": "Tengo una boutique y quería vender online a toda España. Platanito Rico desarrolló mi e-commerce con un diseño que capta la esencia de la tienda. Las ventas online ya son el 30% de mi facturación."
    },
    "faq": [
      {
        "q": "¿Cuánto cuesta una web para un negocio en Mojácar?",
        "a": "Web corporativa desde 500€ con hosting gratuito incluido. Landing de una página desde 350€ y tiendas online o plataformas de reservas multiidioma desde 700€ según funcionalidades. Presupuesto personalizado y gratuito, sin compromiso."
      },
      {
        "q": "¿Hacéis webs multiidioma para el turismo de Mojácar?",
        "a": "Sí, es una de nuestras especialidades. UK, Alemania, Francia y Bélgica. Cambio de idioma nativo (no traducción automática) y SEO optimizado por idioma para aparecer en búsquedas como \"hotels in Mojácar\" o \"Ferienwohnung Mojácar\"."
      },
      {
        "q": "¿Podéis hacer un sistema de reservas directas para mi hotel?",
        "a": "Sí. Integramos motores de reservas directas para que tus clientes reserven sin pasar por Booking o TripAdvisor. Elimina comisiones del 15–20% y te da el control total sobre los datos de tus clientes."
      },
      {
        "q": "¿Cuánto tarda en estar lista la web?",
        "a": "Web corporativa: 1–2 semanas. Tienda online o plataforma de reservas multiidioma: 2–4 semanas. Si necesitas algo urgente para temporada, podemos priorizar."
      },
      {
        "q": "¿Hacéis SEO local para posicionar en Mojácar?",
        "a": "Sí. Optimizamos Google Business Profile, estructuramos contenido con keywords locales (\"restaurante Mojácar Playa\", \"inmobiliaria Mojácar\") y trabajamos el SEO técnico para que cargue en <1s."
      },
      {
        "q": "¿Trabajáis Mojácar Pueblo y Mojácar Playa por igual?",
        "a": "Sí. Cada zona tiene su público: Mojácar Pueblo es cultura, gastronomía boutique y residentes; Mojácar Playa es turismo de sol, ocio y deportes acuáticos. Adaptamos la estrategia SEO a cada núcleo."
      },
      {
        "q": "¿Qué es el hosting gratuito para webs estáticas?",
        "a": "Las webs sin base de datos (corporativas, portfolios, landings) pueden alojarse gratis en Vercel o Cloudflare Pages. Más rápidas, más seguras, sin hosting mensual. Solo pagas el dominio (10–15€/año)."
      },
      {
        "q": "¿Puedo gestionar el contenido yo mismo?",
        "a": "Sí. Te entregamos un panel intuitivo y te formamos para actualizar textos, imágenes, productos y contenido en todos los idiomas sin programar."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en Mojácar",
      "lead": "Plazos, precios, multiidioma, reservas directas y SEO local. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "idiomas",
        "head": {
          "h2": "Cuatro idiomas, cuatro mercados",
          "lead": "En Mojácar viven y veranean turistas de toda Europa. Una web monolingüe pierde el 60% de su público. Esto es lo que cubrimos en cada proyecto turístico."
        },
        "items": [
          {
            "t": "Español",
            "d": "«hotel Mojácar»",
            "meta": "Nacional · residentes"
          },
          {
            "t": "English",
            "d": "«hotels in Mojácar»",
            "meta": "Reino Unido · Irlanda"
          },
          {
            "t": "Deutsch",
            "d": "«Mojácar Unterkunft»",
            "meta": "Alemania · Austria"
          },
          {
            "t": "Français",
            "d": "«location Mojácar»",
            "meta": "Francia · Bélgica"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "nijar": {
    "slug": "nijar",
    "title": "Diseño Web en Níjar | Cabo de Gata",
    "description": "Diseño web y SEO en Níjar y el Cabo de Gata para casas rurales, artesanía y turismo. Reservas directas y tienda online. Presupuesto en 24h.",
    "h1": "Diseño web para Níjar y el Cabo de Gata",
    "heroLead": "El parque natural más salvaje del Mediterráneo: calas vírgenes, desierto volcánico y artesanía con siglos de historia. Webs para casas rurales, talleres de jarapas y cerámica, y empresas de naturaleza — con alma y reservas directas.",
    "lugares": [
      {
        "name": "Los Genoveses",
        "sub": "PLAYA VIRGEN · 1 KM",
        "desc": "Bahía de arena dorada sin un solo edificio, dunas y un palmeral histórico. Una de las playas vírgenes más bellas del Mediterráneo, dentro del Parque Natural.",
        "dato": "1 km virgen"
      },
      {
        "name": "Salinas + flamencos",
        "sub": "RESERVA DE AVES",
        "desc": "Las antiguas salinas de Cabo de Gata son humedal protegido: flamencos, cigüeñuelas y más de 80 especies que paran en su ruta migratoria entre Europa y África.",
        "dato": "80+ aves"
      },
      {
        "name": "Faro de Cabo de Gata",
        "sub": "ACANTILADO VOLCÁNICO",
        "desc": "Sobre el Arrecife de las Sirenas, roca volcánica milenaria que cae a un mar turquesa. El faro más emblemático del sureste, vigía del cabo desde 1863.",
        "dato": "1863"
      }
    ],
    "lugaresHead": {
      "h2": "50 km de costa sin un solo ladrillo",
      "lead": "El Cabo de Gata-Níjar fue el primer parque natural marítimo-terrestre de Andalucía y es Reserva de la Biosfera de la UNESCO. Calas vírgenes, dunas, arrecifes y un desierto que ha sido plató de más de 200 películas. Tu negocio vive de este imán — tu web tiene que estar a su altura."
    },
    "datos": [
      {
        "k": "PARQUE NATURAL",
        "v": "38.000 ha · 1.er marítimo-terrestre de Andalucía"
      },
      {
        "k": "BIOSFERA",
        "v": "Reserva de la Biosfera UNESCO"
      },
      {
        "k": "COSTA VIRGEN",
        "v": "50 km de litoral protegido sin urbanizar"
      },
      {
        "k": "MUNICIPIO",
        "v": "601 km² · el 2.º más extenso de España"
      },
      {
        "k": "ARTESANÍA",
        "v": "Jarapas y cerámica desde el siglo XVIII"
      },
      {
        "k": "CINE",
        "v": "+200 rodajes · desierto y calas únicos"
      }
    ],
    "datosHead": {
      "h2": "Por qué Níjar es irrepetible",
      "lead": "Datos que explican por qué el Cabo de Gata es un destino con marca propia y por qué la artesanía de Níjar tiene mercado mucho más allá de Almería."
    },
    "sectores": [
      {
        "nombre": "Alojamiento y turismo rural",
        "stat": "#1",
        "statLabel": "reservas directas",
        "desc": "El Parque Natural Cabo de Gata atrae un turismo de calidad que busca autenticidad. Casas rurales, cortijos y hoteles boutique necesitan webs que transmitan la magia del lugar y permitan reservar directamente sin intermediarios.",
        "tags": [
          "Motor reservas directo",
          "Galería de naturaleza",
          "SEO \"Cabo de Gata\"",
          "Multiidioma EN/FR/DE"
        ]
      },
      {
        "nombre": "Artesanía y tiendas locales",
        "stat": "UE",
        "statLabel": "envíos a Europa",
        "desc": "Las jarapas, cerámicas y esparto de Níjar son únicos en el mundo. Los artesanos locales pueden vender a toda Europa con una tienda online bien diseñada. La demanda existe — falta la visibilidad digital.",
        "tags": [
          "Tienda online",
          "Envíos UE",
          "Historia del producto",
          "SEO \"jarapas Níjar\""
        ]
      },
      {
        "nombre": "Actividades y deportes naturales",
        "stat": "4.9★",
        "statLabel": "experiencias",
        "desc": "Senderismo, kayak, snorkel y rutas en bici por el Cabo de Gata generan una economía de experiencias. Empresas de actividades necesitan web con sistema de reservas, calendario de disponibilidad y reseñas.",
        "tags": [
          "Reservas de actividades",
          "Calendario online",
          "Reseñas TripAdvisor",
          "Pago seguro"
        ]
      },
      {
        "nombre": "Restauración km0 y pescado",
        "stat": "QR",
        "statLabel": "carta digital",
        "desc": "Chiringuitos de cala, restaurantes de pescado fresco y cocina de producto. El turista del Cabo busca \"dónde comer en San José\" antes de llegar — hay que estar en Google Maps con buena ficha.",
        "tags": [
          "Carta digital QR",
          "Reservas mesa",
          "Google Business",
          "SEO \"comer San José\""
        ]
      },
      {
        "nombre": "Agricultura ecológica y km0",
        "stat": "BIO",
        "statLabel": "producto premium",
        "desc": "Tomate de Níjar, AOVE ecológico y huerta del Parque. Marcas territoriales con denominación que pueden vender online a tiendas gourmet y consumidor final de toda España.",
        "tags": [
          "E-commerce gourmet",
          "Marca territorial",
          "Suscripción cajas",
          "Storytelling producto"
        ]
      },
      {
        "nombre": "Salud rural y servicios",
        "stat": "GMB",
        "statLabel": "visibilidad local",
        "desc": "Veterinarios, clínicas, talleres y servicios para los núcleos dispersos del municipio (Campohermoso, San Isidro, San José). Web rápida + Google Business para captar al residente y al segundo-residente.",
        "tags": [
          "Google Business",
          "SEO local",
          "Multinúcleo",
          "Cita / contacto directo"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que viven del Parque",
      "lead": "Seis sectores con estrategia digital propia. Turismo rural, artesanía, naturaleza, gastronomía km0 y producto ecológico — cada uno con su web a medida."
    },
    "diferenciales": [
      {
        "title": "Marca \"Cabo de Gata\" que vende sola",
        "desc": "Pocas zonas de España tienen un imán turístico tan potente. \"Cabo de Gata\", \"Playa de los Genoveses\", \"San José\" son búsquedas con intención de compra altísima. Tu web tiene que aparecer ahí — y casi ninguna competencia lo hace bien."
      },
      {
        "title": "Turismo de calidad, no de masas",
        "desc": "El visitante del Parque busca autenticidad y paga por ella: casa rural con encanto, experiencia, producto local. No compite por precio. Tu web debe transmitir alma — fotografía de naturaleza, historia, sostenibilidad — no ser un folleto genérico."
      },
      {
        "title": "Artesanía con mercado internacional",
        "desc": "Las jarapas y la cerámica de Níjar tienen demanda en toda Europa. Una tienda online bien hecha convierte a un artesano local en exportador. Fichas con la historia del oficio, envíos UE y SEO específico cambian el negocio."
      },
      {
        "title": "Reservas directas, cero comisión OTA",
        "desc": "Cada reserva por Airbnb o Booking te cuesta 15-20%. En alojamientos del Cabo, donde el cliente repite y recomienda, un motor propio + email construye una clientela fiel que vuelve cada año sin intermediarios."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para invertir en tu web",
      "lead": "Marca turística imbatible + turismo de calidad + artesanía exportable + reservas directas. El Cabo de Gata es la mejor historia digital de Almería."
    },
    "testimonios": [
      {
        "nombre": "Lola Jiménez",
        "negocio": "Casa rural · Cabo de Gata",
        "texto": "Teníamos el cortijo más bonito de la zona y aun así dependíamos de Airbnb para todo. Platanito Rico nos hizo una web preciosa con reservas directas. Ahora tenemos clientela fija que vuelve cada año y nos recomienda."
      },
      {
        "nombre": "Pepe García",
        "negocio": "Taller de cerámica artesanal",
        "texto": "Vendía solo en el mercadillo y a turistas de paso. Con la tienda online vendo a toda España y he tenido pedidos de Francia y Alemania. Las jarapas de Níjar tienen mercado fuera — solo faltaba la web."
      },
      {
        "nombre": "Marta Ruiz",
        "negocio": "Empresa de kayak · San José",
        "texto": "Antes cogía reservas por WhatsApp y era un caos. Ahora la gente reserva su ruta de kayak online, paga la señal y ve el calendario en tiempo real. Lleno las salidas y trabajo mucho menos en gestión."
      },
      {
        "nombre": "Antonio Mira",
        "negocio": "AOVE ecológico · Níjar",
        "texto": "Producimos un aceite ecológico de la zona y solo lo vendíamos a granel. La tienda online con la historia de la finca nos ha abierto el mercado gourmet — ahora vendemos cajas a Madrid y Barcelona."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Níjar que venden directo",
      "lead": "Vendía solo en el mercadillo y a turistas de paso. Con la tienda online vendo a toda España y he tenido pedidos de Francia y Alemania. Las jarapas de Níjar tienen mercado fuera — solo faltaba la web."
    },
    "faq": [
      {
        "q": "¿Podéis hacer una web para mi casa rural dentro del Parque Natural Cabo de Gata?",
        "a": "Sí, es uno de nuestros perfiles favoritos. Creamos webs para alojamientos rurales en el Cabo de Gata con galería inmersiva de naturaleza, motor de reservas directo (sin comisiones), multiidioma y SEO para términos como \"casa rural Cabo de Gata\", \"alojamiento Níjar\" y \"dónde dormir San José\"."
      },
      {
        "q": "¿Cómo puedo vender mis artesanías de Níjar por internet?",
        "a": "Creamos tiendas online optimizadas para artesanía local: fichas de producto con la historia y el proceso artesanal, fotografía cuidada, pasarela de pago segura, gestión de envíos nacionales y a la UE, y SEO para búsquedas específicas (\"jarapas Níjar\", \"cerámica de Níjar\"). Convertimos tu taller en una marca que exporta."
      },
      {
        "q": "¿El hosting gratuito funciona también para una tienda online con muchos productos?",
        "a": "Sí. Para tiendas usamos tecnología headless con CMS sin servidor, que mantiene la velocidad y el hosting gratuito para catálogos de hasta varios centenares de productos. Si necesitas miles de referencias, lo dimensionamos sin sorpresas en el presupuesto."
      },
      {
        "q": "¿Hacéis webs para empresas de actividades (kayak, senderismo, snorkel) del Cabo?",
        "a": "Sí. Integramos sistema de reservas con calendario de disponibilidad en tiempo real, pago de señal online, gestión de plazas por salida y conexión con tus reseñas de TripAdvisor/Google. Reduces el caos de WhatsApp y llenas más salidas."
      },
      {
        "q": "¿Cuánto cuesta una web para un negocio en Níjar o el Cabo de Gata?",
        "a": "Web corporativa o de casa rural desde 500€ con hosting gratuito. Tienda online de artesanía o gourmet y alojamientos con motor de reservas desde 700€ según catálogo. Landing de una página desde 350€. Presupuesto cerrado, sin sorpresas, y te explicamos cada partida."
      },
      {
        "q": "¿Trabajáis en los núcleos del municipio: San José, Las Negras, Rodalquilar, San Isidro?",
        "a": "Sí, todo el municipio de Níjar y el Parque Natural: San José, Las Negras, Rodalquilar, La Isleta del Moro, Agua Amarga, Campohermoso y San Isidro. Trabajamos online y nos desplazamos para la sesión de fotos cuando el proyecto lo necesita."
      },
      {
        "q": "¿Podéis posicionar mi alojamiento por encima de Airbnb y Booking en Google?",
        "a": "En las búsquedas de marca y long-tail, sí: con SEO técnico, contenido propio sobre tu cortijo y el entorno, Schema de alojamiento y una web rapidísima, apareces en orgánico cuando alguien busca tu casa o \"casa rural con encanto Cabo de Gata\", captando reservas que no pasan por la OTA."
      },
      {
        "q": "¿Hacéis fotografía de producto y de naturaleza para la web?",
        "a": "Coordinamos sesión de fotografía profesional (producto artesano, alojamiento, paisaje del Parque) porque en este sector la imagen lo es casi todo. Una galería bien hecha del Cabo de Gata vende sola — es nuestra recomendación para cualquier proyecto de la zona."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en el Cabo",
      "lead": "Casas rurales, tiendas de artesanía, actividades, núcleos del Parque, plazos y precios. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "oficios",
        "head": {
          "h2": "La artesanía de Níjar, de su taller a toda Europa",
          "lead": "Jarapas tejidas en telar, loza vidriada y esparto trenzado. Oficios que el mundo entero quiere — y que con una tienda online bien hecha dejan de venderse solo en el mercadillo para exportar a Francia, Alemania o Japón."
        },
        "items": [
          {
            "t": "Jarapas",
            "d": "Alfombras y mantas tejidas en telar con tiras de tela reciclada. Colores vivos en franjas — patrimonio textil de Níjar desde el siglo XVIII.",
            "meta": "TELAR"
          },
          {
            "t": "Cerámica",
            "d": "La loza vidriada de Níjar: verdes, azules y melados sobre barro, con motivos geométricos y vegetales. Reconocible en el mundo entero.",
            "meta": "BARRO"
          },
          {
            "t": "Esparto",
            "d": "Trenzado tradicional del esparto de la sierra: cestas, capazos, alpargatas y suela. El oficio más antiguo del sureste árido.",
            "meta": "FIBRA"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "olula-del-rio": {
    "slug": "olula-del-rio",
    "title": "Diseño Web en Olula del Río: Mármol",
    "description": "Agencia de diseño web en Olula del Río. Webs para exportación de mármol blanco, SEO internacional y catálogo multiidioma. Presupuesto en 24h.",
    "h1": "Diseño web para la capital del mármol mundial",
    "heroLead": "Olula del Río es la capital mundial del mármol blanco. Su piedra viaja a más de 80 países y adorna palacios, hoteles de lujo y monumentos en los 5 continentes. Empresas exportadoras, estudios de arquitectura y servicios que necesitan una presencia digital a escala global.",
    "lugares": [
      {
        "name": "Capital del Mármol Blanco",
        "sub": "EXPORTACIÓN ★ 80+ PAÍSES",
        "desc": "Olula del Río es el epicentro mundial del mármol blanco. Su piedra ha ornamentado palacios en Oriente Medio, hoteles de lujo en Dubái y aeropuertos en Asia. Una industria centenaria con proyección global inigualable.",
        "dato": "#1 mundial"
      },
      {
        "name": "Museo del Mármol",
        "sub": "PATRIMONIO ★ CULTURA",
        "desc": "El Museo del Mármol de Olula del Río es el único en España dedicado a la piedra natural. Un recorrido por la historia de la extracción, la transformación y el arte del mármol almeriense.",
        "dato": "Museo único"
      },
      {
        "name": "80 Países Exportación",
        "sub": "PRESENCIA ★ GLOBAL",
        "desc": "De Olula a los 5 continentes. El mármol blanco viaja a más de 80 países con una red de distribuidores y clientes internacionales que confían en la calidad de la piedra almeriense.",
        "dato": "80+ países"
      },
      {
        "name": "Industria Centenaria",
        "sub": "TRADICIÓN ★ 100+ AÑOS",
        "desc": "Más de 100 años de industria marmolera que han pasado de generación en generación. Canteros, cortadores y empresarios que combinan el saber hacer heredado con tecnología de vanguardia.",
        "dato": "+100 años"
      }
    ],
    "lugaresHead": {
      "h2": "Cuatro sellos de identidad de Olula del Río",
      "lead": "Olula del Río es el epicentro mundial del mármol blanco. Su piedra ha ornamentado palacios en Oriente Medio, hoteles de lujo en Dubái y aeropuertos en Asia. Una industria centenaria con proyección global inigualable."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "7.000 hab · Valle del Almanzora"
      },
      {
        "k": "INDUSTRIA",
        "v": "Mármol blanco · Exportación global"
      },
      {
        "k": "EXPORTACIÓN",
        "v": "80+ países · 5 continentes"
      },
      {
        "k": "MUSEO",
        "v": "Museo del Mármol · único en España"
      },
      {
        "k": "ICONO",
        "v": "Mármol blanco · palacios · hoteles de lujo"
      },
      {
        "k": "COBERTURA",
        "v": "B2B global · web multiidioma · premium"
      }
    ],
    "datosHead": {
      "h2": "El mármol que viste el mundo nace en Olula",
      "lead": "Olula del Río no es solo la capital del mármol almeriense — es la capital mundial del mármol blanco. Su piedra, de una pureza y calidad reconocidas internacionalmente, ha sido seleccionada para los proyectos arquitectónicos más exigentes del planeta."
    },
    "sectores": [
      {
        "nombre": "Exportación de Mármol Blanco",
        "stat": "80+",
        "statLabel": "países destino",
        "desc": "Olula del Río exporta mármol blanco a los 5 continentes. Palacios en Oriente Medio, hoteles en Dubái, aeropuertos en China. Una web multiidioma con catálogo técnico premium es la tarjeta de presentación internacional que toda marmolista global necesita.",
        "tags": [
          "Multiidioma",
          "Catálogo técnico",
          "Exportación 80+ países",
          "SEO internacional"
        ]
      },
      {
        "nombre": "Museo del Mármol y Turismo",
        "stat": "★",
        "statLabel": "patrimonio marmolero",
        "desc": "El Museo del Mármol de Olula del Río es único en España. Una web turística que promocione el museo, las rutas del mármol y la historia de la piedra puede atraer visitantes culturales de toda Europa.",
        "tags": [
          "Museo del Mármol",
          "Rutas culturales",
          "Turismo industrial",
          "Historia viva"
        ]
      },
      {
        "nombre": "Arquitectura e Interiorismo",
        "stat": "#1",
        "statLabel": "mármol para proyectos",
        "desc": "El mármol blanco de Olula adorna monumentos históricos y edificios emblemáticos. Estudios de arquitectura e interiorismo con portfolio online en varios idiomas captan proyectos internacionales de alto nivel.",
        "tags": [
          "Portfolio premium",
          "Proyectos internacionales",
          "Arquitectura mármol",
          "Interiorismo lujo"
        ]
      },
      {
        "nombre": "Distribución y Logística",
        "stat": "B2B",
        "statLabel": "venta a distribuidores",
        "desc": "Distribuidores de mármol de Olula sirven a constructores y marmolistas de toda España y Europa. Web con sistema de pedidos, catálogo de existencias y precios B2B agiliza la relación comercial.",
        "tags": [
          "Pedidos B2B",
          "Stock online",
          "Distribución",
          "Precios mayoristas"
        ]
      },
      {
        "nombre": "Servicios Profesionales",
        "stat": "7.000",
        "statLabel": "habitantes · comarca",
        "desc": "Con 7.000 habitantes y un polo industrial de primer nivel, Olula tiene una economía de servicios vibrante. Clínicas, asesorías y comercios que aparezcan en Google Maps captan a vecinos y profesionales del mármol.",
        "tags": [
          "Google Maps",
          "SEO local",
          "Ficha negocio",
          "Captación comarca"
        ]
      },
      {
        "nombre": "Maquinaria y Suministros",
        "stat": "+20",
        "statLabel": "proveedores activos",
        "desc": "El ecosistema del mármol en Olula incluye proveedores de maquinaria de corte, herramientas diamantadas y consumibles. Empresas con catálogo técnico web captan marmolistas de toda la provincia.",
        "tags": [
          "Maquinaria corte",
          "Herramientas diamante",
          "Catálogo técnico",
          "Suministros industriales"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Seis sectores para exportar tu presencia global",
      "lead": "Olula del Río exporta mármol blanco a los 5 continentes. Palacios en Oriente Medio, hoteles en Dubái, aeropuertos en China. Una web multiidioma con catálogo técnico premium es la tarjeta de presentación internacional que toda marmolista global necesita."
    },
    "diferenciales": [
      {
        "title": "Capital mundial del mármol blanco",
        "desc": "Olula del Río no es un pueblo marmolero más — es la capital mundial del mármol blanco. Su piedra está en edificios emblemáticos de los 5 continentes. Ese prestigio global es el activo digital más valioso que hay que comunicar."
      },
      {
        "title": "Exportación a 80+ países",
        "desc": "China, Emiratos Árabes, Arabia Saudí, México, Estados Unidos, Japón... El mármol de Olula llega a todo el mundo. Una web multiidioma con presencia en inglés, árabe y chino multiplica las oportunidades de negocio internacional."
      },
      {
        "title": "Museo del Mármol, único en España",
        "desc": "El Museo del Mármol es un activo turístico y cultural de primer orden. Una web que integre museo + empresas + turismo crea un ecosistema digital que posiciona a Olula como destino industrial y cultural."
      },
      {
        "title": "Industria centenaria con futuro digital",
        "desc": "Más de 100 años de tradición marmolera. El relevo generacional está combinando el oficio heredado con las herramientas digitales. Las empresas que lideren esta transformación captarán el mercado global de la próxima década."
      }
    ],
    "diferencialesHead": {
      "h2": "Por qué Olula del Río marca la diferencia en el mármol global",
      "lead": "Olula del Río no es un pueblo marmolero más — es la capital mundial del mármol blanco. Su piedra está en edificios emblemáticos de los 5 continentes. Ese prestigio global es el activo digital más valioso que hay que comunicar."
    },
    "testimonios": [
      {
        "nombre": "Rafael Martínez",
        "negocio": "Empresa exportadora de mármol blanco",
        "texto": "Exportamos a China, México y Arabia pero nuestra web era básica en español. Platanito Rico nos hizo una web en inglés y árabe con catálogo técnico. Los distribuidores internacionales nos contactan directamente ahora."
      },
      {
        "nombre": "Pilar Ruiz",
        "negocio": "Estudio de interiorismo",
        "texto": "Mi estudio en Olula trabaja con mármol exclusivo que la mayoría desconoce. La web con portfolio de proyectos me ha traído clientes de Madrid, Barcelona y hasta de Portugal que buscan \"interiorismo mármol Almería\"."
      },
      {
        "nombre": "José Miguel Haro",
        "negocio": "Distribuidor de maquinaria para mármol",
        "texto": "Vendemos maquinaria de corte a marmolistas de toda España. La web B2B con catálogo técnico y precios nos ha abierto clientes en Andalucía, Valencia y Cataluña que antes no llegaban."
      }
    ],
    "testimoniosHead": {
      "h2": "Lo que dicen los que ya exportan con su web",
      "lead": "Mi estudio en Olula trabaja con mármol exclusivo que la mayoría desconoce. La web con portfolio de proyectos me ha traído clientes de Madrid, Barcelona y hasta de Portugal que buscan \"interiorismo mármol Almería\"."
    },
    "faq": [
      {
        "q": "¿Cuánto cuesta una web multiidioma para empresa de mármol en Olula del Río?",
        "a": "Una web corporativa en español + inglés desde 500€. Con más idiomas (árabe o chino, con caracteres correctos y SEO específico) o catálogo/tienda online, desde 700€. Para empresas exportadoras, la inversión se amortiza con un solo pedido internacional."
      },
      {
        "q": "¿Podéis hacer SEO en inglés para \"marble supplier Spain\" y términos similares?",
        "a": "Sí, hacemos SEO técnico en inglés para empresas del sector marmolero. Olula tiene reputación mundial — aprovecharla digitalmente es la siguiente frontera natural para estas empresas."
      },
      {
        "q": "¿Podéis hacer una web con catálogo técnico de piedras para exportación?",
        "a": "Sí, creamos catálogos digitales con fichas técnicas: tipo de piedra, formato, acabados, resistencia, colores y descarga de DXF o PDF. Ideal para arquitectos y distribuidores internacionales."
      },
      {
        "q": "¿Tenéis experiencia con empresas exportadoras de mármol?",
        "a": "Sí, trabajamos con empresas del mármol de toda la comarca del Almanzora. Entendemos el lenguaje técnico, los procesos de exportación y las necesidades B2B del sector a nivel global."
      },
      {
        "q": "¿Podéis hacer una web para el Museo del Mármol o turismo industrial?",
        "a": "Sí, creamos webs turísticas con rutas del mármol, historia de la cantera, galería de piezas emblemáticas y sistema de reservas para visitas guiadas. Ideal para promocionar el patrimonio marmolero."
      },
      {
        "q": "¿En cuánto tiempo tengo mi web de Olula del Río lista?",
        "a": "Web corporativa con catálogo: 2–3 semanas. Con multiidioma y sistema B2B: 3–4 semanas. Con catálogo técnico interactivo y SEO global: 4–5 semanas."
      },
      {
        "q": "¿Ayudáis con fotografía profesional de producto para piedra natural?",
        "a": "Sí, ofrecemos sesión de fotografía profesional para tus mármoles y acabados. Una imagen de calidad premium multiplica el interés del comprador internacional."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Olula del Río?",
        "a": "Sí, estamos en Vera a 20 minutos de Olula. Podemos reunirnos en tu empresa, nave o taller para entender mejor tu negocio. La primera consulta es gratuita."
      }
    ],
    "faqHead": {
      "h2": "Respuestas para el mármol de tus dudas",
      "lead": ""
    },
    "extras": [],
    "ctaHead": null
  },
  "pulpi": {
    "slug": "pulpi",
    "title": "Diseño Web en Pulpí | Geoda y turismo",
    "description": "Diseño web con reservas y SEO en Pulpí para la Geoda Gigante, San Juan de los Terreros y comercio. Web multiidioma. Presupuesto en 24h.",
    "h1": "Diseño web para Pulpí y su geoda gigante",
    "heroLead": "La maravilla geológica más grande del mundo: una cueva tapizada de cristales transparentes que asombra a visitantes de todo el planeta. Webs con reservas online y multiidioma para la geoda, Terreros y el comercio local.",
    "lugares": [
      {
        "name": "La Geoda Gigante",
        "sub": "LA MAYOR DEL MUNDO",
        "desc": "Una cavidad de 8 metros tapizada de cristales de yeso transparentes de hasta 2 metros. Única en el mundo por su tamaño y pureza — se visita descendiendo a la Mina Rica.",
        "dato": "8 m"
      },
      {
        "name": "Castillo de Terreros",
        "sub": "FORTALEZA SOBRE EL MAR",
        "desc": "El castillo de San Juan de los Terreros (siglo XVIII) vigila la costa desde su promontorio. Bajo él, playas de arena dorada y aguas tranquilas, lejos de la masificación.",
        "dato": "S. XVIII"
      },
      {
        "name": "Islas de Terreros",
        "sub": "ISLOTES VOLCÁNICOS",
        "desc": "La Isla Negra y la Isla de Terreros emergen frente a la costa: pequeños volcanes en el mar, fondos cristalinos para snorkel y kayak y un atardecer de postal.",
        "dato": "Volcánicas"
      }
    ],
    "lugaresHead": {
      "h2": "La Geoda Gigante",
      "lead": "En lo profundo de la Mina Rica, una burbuja de roca de ocho metros está completamente tapizada de cristales de yeso transparentes de hasta dos metros. Es la geoda más grande del mundo que se puede visitar — una rareza geológica que asombra al planeta entero."
    },
    "datos": [
      {
        "k": "LA GEODA",
        "v": "La mayor del mundo visitable · 8 m"
      },
      {
        "k": "CRISTALES",
        "v": "Yeso selenita transparente · hasta 2 m"
      },
      {
        "k": "MINA RICA",
        "v": "Descubierta en 1999 · Sierra del Aguilón"
      },
      {
        "k": "TERREROS",
        "v": "Castillo s. XVIII · islas · playas"
      },
      {
        "k": "FRONTERA",
        "v": "Murcia y Águilas a 15 minutos"
      },
      {
        "k": "AGRICULTURA",
        "v": "Campo de Pulpí · lechuga y brócoli"
      }
    ],
    "datosHead": {
      "h2": "Por qué Pulpí brilla",
      "lead": "Datos que explican por qué Pulpí tiene un imán turístico único en el mundo y una costa tranquila con muchísimo potencial digital sin explotar."
    },
    "sectores": [
      {
        "nombre": "Turismo de la Geoda y naturaleza",
        "stat": "#1",
        "statLabel": "imán internacional",
        "desc": "La Geoda de Pulpí es un atractivo geológico de primer orden mundial. Empresas de visitas guiadas, hoteles y servicios turísticos tienen una oportunidad única de posicionarse en Google para búsquedas internacionales con muy poca competencia.",
        "tags": [
          "Reservas de visitas",
          "SEO \"Geoda Pulpí\"",
          "Multiidioma EN",
          "Pago online"
        ]
      },
      {
        "nombre": "Alojamiento y hostelería costera",
        "stat": "mar",
        "statLabel": "San Juan Terreros",
        "desc": "San Juan de los Terreros concentra la vida playera de Pulpí. Apartamentos y restaurantes frente al mar pueden captar el turismo familiar de calidad que busca una alternativa menos masificada que Águilas o Roquetas.",
        "tags": [
          "Motor de reservas",
          "Galería de playas",
          "Restaurante marino",
          "Sin comisiones OTA"
        ]
      },
      {
        "nombre": "Visitas guiadas y experiencias",
        "stat": "4.9★",
        "statLabel": "tours y actividades",
        "desc": "Geoda, buceo en las islas, kayak, snorkel y rutas. Empresas de experiencias que necesitan calendario de salidas en tiempo real, pago de señal y gestión de plazas para no perder ninguna reserva.",
        "tags": [
          "Calendario salidas",
          "Pago de señal",
          "Gestión de plazas",
          "Reseñas TripAdvisor"
        ]
      },
      {
        "nombre": "Comercio y servicios de frontera",
        "stat": "ES/MU",
        "statLabel": "Almería + Murcia",
        "desc": "El núcleo de Pulpí sirve a los municipios fronterizos con Murcia. Estar bien posicionado en Google Maps capta clientes de ambos lados de la frontera provincial — Águilas está a un paso.",
        "tags": [
          "SEO frontera Murcia",
          "Google Business",
          "Captación comarca",
          "Web rápida"
        ]
      },
      {
        "nombre": "Agricultura del Campo de Pulpí",
        "stat": "km0",
        "statLabel": "lechuga y brócoli",
        "desc": "Pulpí es una gran potencia agrícola: lechuga, brócoli y hortaliza de exportación. Cooperativas y productores que quieran vender, exportar o construir marca necesitan web con catálogo, multiidioma y SEO de producto.",
        "tags": [
          "Catálogo producto",
          "Multiidioma export",
          "Marca territorial",
          "Fichas técnicas"
        ]
      },
      {
        "nombre": "Restauración y comercio local",
        "stat": "QR",
        "statLabel": "carta digital",
        "desc": "Bares, restaurantes y comercios que sirven al vecino y al turista de la geoda y la playa. Carta digital, fotografía de producto y presencia en Google para captar al que busca dónde comer en Pulpí o Terreros.",
        "tags": [
          "Carta digital QR",
          "SEO local",
          "Reservas mesa",
          "Fotografía"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que viven del cristal y el mar",
      "lead": "Seis sectores con estrategia digital propia. Del tour de la geoda al apartamento de Terreros, pasando por el comercio de frontera y el campo."
    },
    "diferenciales": [
      {
        "title": "Un imán único en el mundo",
        "desc": "No hay otra geoda visitable de este tamaño en el planeta. \"Geoda de Pulpí\" y \"Giant Geode\" son búsquedas con demanda internacional creciente y casi sin competencia digital seria. Quien se posicione bien ahora se queda con ese tráfico durante años."
      },
      {
        "title": "Plazas limitadas = reservas online",
        "desc": "La geoda solo se visita con cita previa y grupos reducidos. Sin un sistema de reservas en la web, pierdes al turista que decide sobre la marcha o que reserva de madrugada desde otro país. La web vende mientras duermes."
      },
      {
        "title": "Turismo internacional = multiidioma",
        "desc": "El visitante de la geoda viene de toda Europa. Una web en inglés con SEO para \"Giant Geode Pulpí tour\" y contenido localizado convierte la curiosidad mundial por esta maravilla en reservas reales para tu negocio."
      },
      {
        "title": "Dos destinos en uno: cristal y mar",
        "desc": "Pulpí combina la geoda con San Juan de los Terreros: castillo, islas y playas tranquilas. Quien viene a ver el cristal se queda a dormir y a comer junto al mar. Tu web puede capturar las dos motivaciones a la vez."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para invertir en tu web",
      "lead": "Imán único + reservas online + turismo internacional + doble destino. Pulpí tiene una de las oportunidades digitales más claras de toda Almería."
    },
    "testimonios": [
      {
        "nombre": "Cristóbal Navarro",
        "negocio": "Visitas guiadas a la Geoda",
        "texto": "La geoda trae turistas solos, pero necesitábamos web para que nos reservaran las visitas privadas directamente. Ahora somos la primera opción que aparece y tenemos grupos internacionales cada semana."
      },
      {
        "nombre": "Dolores Pérez",
        "negocio": "Restaurante · San Juan de los Terreros",
        "texto": "Estamos en una zona preciosa pero poco conocida. La web con SEO nos puso en el mapa para familias que buscan playas tranquilas con buen restaurante. El verano nos cambió la vida."
      },
      {
        "nombre": "Emily Watson",
        "negocio": "Touring agency · UK",
        "texto": "We bring small groups to see the Giant Geode and needed an English booking site. The team built a fast, clear multilingual page with live availability. Our UK and German bookings have doubled since."
      },
      {
        "nombre": "Paco Segura",
        "negocio": "Apartamentos · Terreros",
        "texto": "Tenía los apartamentos solo en plataformas con comisión. Ahora con la web y reservas directas me escriben familias que vienen a la geoda y se quedan toda la semana. He recuperado el control y el margen."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Pulpí que ya reservan online",
      "lead": "Estamos en una zona preciosa pero poco conocida. La web con SEO nos puso en el mapa para familias que buscan playas tranquilas con buen restaurante. El verano nos cambió la vida."
    },
    "faq": [
      {
        "q": "¿Podéis hacer una web en inglés para turistas que visitan la Geoda de Pulpí?",
        "a": "Sí, hacemos webs multiidioma para atraer turismo internacional a la geoda y San Juan de los Terreros. Incluimos SEO en inglés para búsquedas como \"Giant Geode Pulpí tour\", contenido localizado y hreflang. El visitante de la geoda es internacional — tu web debe hablar su idioma."
      },
      {
        "q": "¿Integráis un sistema de reservas para las visitas guiadas a la geoda?",
        "a": "Sí, es clave para este negocio. Integramos motor de reservas con calendario de plazas en tiempo real, venta de entradas, pago online seguro y confirmación automática. Como la geoda tiene aforo limitado y cita previa, una web que reserva 24/7 capta al turista de cualquier país y a cualquier hora."
      },
      {
        "q": "¿Cuánto cuesta una web para alojamiento vacacional en San Juan de los Terreros?",
        "a": "Una web para apartamentos o casa vacacional desde 500€ con galería, hosting gratuito y SEO local. Con motor de reservas avanzado, calendario y pagos online (tienda/reservas), desde 700€. Landing de una página desde 350€. Presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Cuánto tarda en posicionarse un negocio turístico de Pulpí en Google?",
        "a": "Para términos como \"visitas geoda Pulpí\" o \"apartamentos San Juan de los Terreros\", entre 6 y 12 semanas con trabajo SEO continuo. La competencia es baja y los resultados, rápidos. En inglés (\"Giant Geode tour\") la oportunidad es aún mayor por la poca competencia."
      },
      {
        "q": "¿Hacéis webs para empresas de buceo, kayak y actividades en las islas de Terreros?",
        "a": "Sí. Integramos calendario de salidas, pago de señal online, gestión de plazas por actividad y conexión con tus reseñas. Ideal para buceo y snorkel en la Isla Negra, kayak y rutas. Reduces el caos del teléfono y llenas más salidas."
      },
      {
        "q": "¿Trabajáis con restaurantes y comercios de Pulpí pueblo, no solo de la costa?",
        "a": "Por supuesto. El núcleo de Pulpí tiene comercio activo que sirve a la comarca y a la frontera con Murcia. Hacemos webs rápidas con carta digital, SEO local y Google Business optimizado para captar al vecino y al turista que pasa."
      },
      {
        "q": "¿Trabajáis con cooperativas y productores del Campo de Pulpí?",
        "a": "Sí. Pulpí es potencia en lechuga, brócoli y hortaliza de exportación. Hacemos webs B2B con catálogo de producto, fichas técnicas, marca territorial y multiidioma para vender y exportar. Convertimos a un productor local en una marca que vende fuera."
      },
      {
        "q": "¿En cuánto tiempo está lista mi web?",
        "a": "Web de comercio o restaurante: 1–2 semanas. Web turística con reservas o venta de entradas: 2–3 semanas. Multiidioma y catálogo agro: 3–4 semanas. Trabajamos en sprints y ves avances cada semana. Si llegas con la temporada encima, priorizamos."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en Pulpí",
      "lead": "Reservas, multiidioma, Terreros, actividades, agro, plazos y precios. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "reservaPasos",
        "head": {
          "h2": "La geoda se llena. Que reserven en tu web",
          "lead": "La visita es guiada, con aforo limitado y cita previa. El turista que no puede reservar online se va a otra cosa. Una web con motor de reservas en inglés y español vende entradas 24 horas, desde cualquier país."
        },
        "items": [
          {
            "t": "Plazas limitadas",
            "d": "La geoda se visita en grupos reducidos con cita previa. Sin reserva online, pierdes al visitante que decide a última hora.",
            "meta": "Paso 01"
          },
          {
            "t": "Reserva 24/7",
            "d": "Tu web vende entradas y visitas guiadas a cualquier hora, desde cualquier país, mientras tú descansas. Pago seguro y confirmación automática.",
            "meta": "Paso 02"
          },
          {
            "t": "En su idioma",
            "d": "El turista de la geoda es internacional. Web en inglés y SEO para \"Giant Geode Pulpí tour\" capta al visitante extranjero antes de que llegue.",
            "meta": "Paso 03"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "purchena": {
    "slug": "purchena",
    "title": "Diseño Web en Purchena: Comercio y Turismo",
    "description": "Diseño web en Purchena para talleres, comercio, hostelería y turismo cultural del Valle del Almanzora. SEO local y presupuesto online en 24 h.",
    "h1": "Diseño web para la comarca del Alto Almanzora",
    "heroLead": "Purchena es el centro histórico y comercial del Alto Almanzora. Talleres mecánicos, servicios profesionales, comercio local y turismo cultural que necesitan una presencia digital a la altura de su comarca. Como Taller El Piñón.",
    "lugares": [
      {
        "name": "Taller El Piñón",
        "sub": "CLIENTE ★ CASO DE ÉXITO",
        "desc": "Taller Mecánico el Piñón, desde Purchena, da servicio a toda la comarca alta con más de 20 años de experiencia en mecánica general, electricidad, chapa y pintura. Su web les ha multiplicado los clientes del valle con presupuesto online y diagnóstico gratuito.",
        "dato": "★ 4.9 / 500+"
      },
      {
        "name": "Casco Histórico",
        "sub": "PATRIMONIO DEL ALMANZORA",
        "desc": "Purchena conserva uno de los centros históricos más interesantes del valle, con calles empedradas y plazas porticadas. Un destino de turismo cultural que crece cada año.",
        "dato": "Ruta monumental"
      },
      {
        "name": "Alto Almanzora",
        "sub": "CAPITAL DE COMARCA",
        "desc": "Purchena es el centro de servicios del Alto Almanzora. Su posición estratégica entre Tíjola, Serón y la Sierra de las Estancias la convierte en el nodo comercial de la comarca alta.",
        "dato": "Hub comarcal"
      },
      {
        "name": "Mercado y Tradición",
        "sub": "MARTES · DÍA DE MERCADO",
        "desc": "El mercado semanal de los martes es la cita comercial de toda la comarca. Agricultores, artesanos y comerciantes convierten Purchena en el epicentro del valle cada semana.",
        "dato": "Tradición viva"
      }
    ],
    "lugaresHead": {
      "h2": "Cuatro sellos de identidad de Purchena",
      "lead": "Taller Mecánico el Piñón, desde Purchena, da servicio a toda la comarca alta con más de 20 años de experiencia en mecánica general, electricidad, chapa y pintura. Su web les ha multiplicado los clientes del valle con presupuesto online y diagnóstico gratuito."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "2.000 hab · Valle del Almanzora"
      },
      {
        "k": "COMARCA",
        "v": "Alto Almanzora · Hub de servicios"
      },
      {
        "k": "CLIENTE TOP",
        "v": "Taller El Piñón · +20 años"
      },
      {
        "k": "SECTOR CLAVE",
        "v": "Automoción · Turismo · Servicios"
      },
      {
        "k": "ICONO",
        "v": "Casco histórico · Mercado tradicional"
      },
      {
        "k": "COBERTURA",
        "v": "Tíjola · Serón · Bacares · Laroya · +"
      }
    ],
    "datosHead": {
      "h2": "Donde la historia se encuentra con el oficio",
      "lead": "Purchena no es un pueblo de paso. Es destino: su casco histórico, uno de los mejor conservados del Almanzora, y su mercado de los martes, que sigue siendo el corazón comercial de la comarca alta."
    },
    "sectores": [
      {
        "nombre": "Talleres Mecánicos y Automoción",
        "stat": "★",
        "statLabel": "cliente El Piñón",
        "desc": "Purchena es punto de paso para toda la comarca alta. Los talleres mecánicos como El Piñón atienden a conductores de Tíjola, Serón, Bacares y Laroya. Una web con servicios, presupuesto online y SEO local capta clientes de todo el valle.",
        "tags": [
          "Servicios mecánicos",
          "Presupuesto online",
          "SEO local",
          "Caso El Piñón"
        ]
      },
      {
        "nombre": "Turismo Cultural e Histórico",
        "stat": "#1",
        "statLabel": "casco monumental",
        "desc": "El casco histórico de Purchena es uno de los mejor conservados del Almanzora. Una web turística con rutas, alojamientos y experiencias puede convertir la riqueza arquitectónica en destino de fin de semana.",
        "tags": [
          "Rutas históricas",
          "Turismo interior",
          "Patrimonio",
          "Guía local"
        ]
      },
      {
        "nombre": "Servicios Profesionales",
        "stat": "Hub",
        "statLabel": "comarca alta",
        "desc": "Purchena ejerce de capital de servicios para el Alto Almanzora: médicos, abogados, gestorías y comercios que aparezcan en Google Maps captan clientes de 20 municipios del entorno. SEO local multiplaza.",
        "tags": [
          "Google Maps",
          "SEO local",
          "Captación comarca",
          "Multiubicación"
        ]
      },
      {
        "nombre": "Hostelería y Gastronomía",
        "stat": "Mercado",
        "statLabel": "tradición semanal",
        "desc": "El mercado de los martes es el corazón comercial de Purchena. Bares, restaurantes y casas rurales con web, carta digital y ficha de Google optimizada atraen a visitantes y vecinos de la comarca.",
        "tags": [
          "Carta digital",
          "Google Maps",
          "Reservas online",
          "Tapas"
        ]
      },
      {
        "nombre": "Comercio Local y Agroalimentación",
        "stat": "Valle",
        "statLabel": "producto km 0",
        "desc": "Purchena es puerta de entrada a la Sierra de las Estancias. Comercios de productos locales, almazaras y bodegas pueden vender online con una tienda que comunique origen y calidad.",
        "tags": [
          "E-commerce",
          "Producto local",
          "Almanzora",
          "Envíos nacionales"
        ]
      },
      {
        "nombre": "Agricultura y Explotaciones",
        "stat": "20+",
        "statLabel": "fincas activas",
        "desc": "El olivar y la agricultura de secano son el pulso económico de la comarca alta. Cooperativas y explotaciones con web corporativa y catálogo de productos acceden a distribuidores y mercados.",
        "tags": [
          "Catálogo agrícola",
          "Venta B2B",
          "SEO rural",
          "Cooperativas"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Seis sectores para construir tu presencia digital",
      "lead": "Purchena es punto de paso para toda la comarca alta. Los talleres mecánicos como El Piñón atienden a conductores de Tíjola, Serón, Bacares y Laroya. Una web con servicios, presupuesto online y SEO local capta clientes de todo el valle."
    },
    "diferenciales": [
      {
        "title": "Capital del Alto Almanzora",
        "desc": "Purchena no es un pueblo más del valle — es el centro de servicios de la comarca alta. Médicos, abogados, talleres y comercios que se posicionan bien en Google captan clientes de un radio de 20 km con decenas de aldeas y municipios."
      },
      {
        "title": "Taller El Piñón, caso real",
        "desc": "Un taller mecánico de Purchena que pasó del boca-oreja a captar clientes de toda la comarca con presupuesto online, servicios visibles y SEO local. El caso lo cuentan mejor en su web: tallerelpinon.com."
      },
      {
        "title": "Casco histórico + mercado vivo",
        "desc": "Turismo cultural de interior + mercado semanal activo. Purchena une tradición y oportunidad digital. Una web bien hecha para hostelería o turismo atrae visitantes de Almería capital, la costa y provincias vecinas."
      },
      {
        "title": "Mecánica y oficio con futuro",
        "desc": "El sector de la automoción tiene una oportunidad digital enorme. La mayoría de talleres aún no tienen web competitiva. Quien se mueve primero, capta el mercado de la comarca alta."
      }
    ],
    "diferencialesHead": {
      "h2": "Por qué Purchena marca la diferencia en el Almanzora",
      "lead": "Purchena no es un pueblo más del valle — es el centro de servicios de la comarca alta. Médicos, abogados, talleres y comercios que se posicionan bien en Google captan clientes de un radio de 20 km con decenas de aldeas y municipios."
    },
    "testimonios": [
      {
        "nombre": "Antonio Piñón",
        "negocio": "Taller El Piñón · Purchena",
        "texto": "Pasamos de ser el taller de confianza del pueblo a dar servicio a clientes de toda la comarca alta. La web con presupuesto online y páginas por municipio nos ha traído conductores de Tíjola, Serón, Laroya y hasta de Huércal-Overa. Ahora entran solos."
      },
      {
        "nombre": "María Espinosa",
        "negocio": "Bar con cocina tradicional",
        "texto": "El mercado de los martes trae gente pero los otros días estaba muy parado. Desde que tenemos la carta digital y el perfil de Google bien actualizado, nos llegan familias de toda la comarca que salen a comer fuera del fin de semana."
      },
      {
        "nombre": "José Antonio Ruiz",
        "negocio": "Gestoría y asesoría fiscal",
        "texto": "Atendemos a autónomos y agricultores de Tíjola, Serón y Bacares. La web con formulario online y Google Maps optimizado nos ha traído clientes que antes iban a Huércal-Overa. Ahora somos su gestoría de referencia en la comarca alta."
      }
    ],
    "testimoniosHead": {
      "h2": "Lo que dicen los que ya confían en el taller digital",
      "lead": "El mercado de los martes trae gente pero los otros días estaba muy parado. Desde que tenemos la carta digital y el perfil de Google bien actualizado, nos llegan familias de toda la comarca que salen a comer fuera del fin de semana."
    },
    "faq": [
      {
        "q": "¿Puede un taller mecánico de Purchena captar clientes de toda la comarca con una web?",
        "a": "Sí, con SEO local por municipio, páginas específicas para cada servicio y un sistema de presupuesto online. Taller El Piñón lo hace y recibe clientes de Tíjola, Serón, Bacares y Laroya gracias a su presencia digital bien trabajada."
      },
      {
        "q": "¿Tenéis experiencia con talleres mecánicos y automoción?",
        "a": "Sí, Taller Mecánico el Piñón es cliente nuestro. Su web tiene secciones detalladas por servicio, presupuesto online, testimonios reales y un diseño que transmite la confianza y el oficio de más de 20 años de experiencia en Purchena."
      },
      {
        "q": "¿Cuánto cuesta una web para un taller mecánico o servicio profesional en Purchena?",
        "a": "Desde 500€ para web corporativa con servicios, formulario de presupuesto y hosting gratuito. Con sistema de presupuesto online completo, tienda o SEO por municipios desde 700€. Landing de una página desde 350€."
      },
      {
        "q": "¿Hacéis webs para hostelería con carta digital y reservas?",
        "a": "Sí, es de lo más demandado en la comarca. Web con carta digital interactiva, enlace directo a Google Maps para reseñas, sistema de reservas y SEO local para \"restaurante en Purchena\" o \"comer en el Almanzora\"."
      },
      {
        "q": "¿Hacéis reuniones presenciales en Purchena?",
        "a": "Sí, estamos en Vera a 30 minutos de Purchena. Nos desplazamos al Alto Almanzora para reunirnos en tu taller, comercio u oficina. La primera consulta es gratuita."
      },
      {
        "q": "¿En cuánto tiempo tengo la web lista?",
        "a": "Web corporativa: 1–2 semanas. Con catálogo de servicios o productos: 2–3 semanas. Con presupuesto online y SEO multi-municipio: 2–3 semanas."
      },
      {
        "q": "¿Ayudáis con el marketing digital para negocios de la comarca?",
        "a": "Sí, ofrecemos SEO local, Google Business Profile optimizado, gestión de reseñas, contenido para redes sociales y campañas de Google Ads para captar clientes en el Alto Almanzora y la provincia."
      },
      {
        "q": "¿Puedo vender productos locales de Purchena online?",
        "a": "Sí, montamos tiendas online para productos agroalimentarios, artesanía y comercio local. Con pasarela de pago, gestión de envíos y SEO para \"productos del Almanzora\" o \"aceite de la sierra\"."
      }
    ],
    "faqHead": {
      "h2": "Respuestas para la mecánica de tus dudas",
      "lead": ""
    },
    "extras": [],
    "ctaHead": null
  },
  "roquetas-de-mar": {
    "slug": "roquetas-de-mar",
    "title": "Diseño Web en Roquetas de Mar | Turismo",
    "description": "Diseño web multiidioma y SEO en Roquetas de Mar para hoteles, restaurantes y apartamentos. Reservas directas sin comisiones. Presupuesto en 24h.",
    "h1": "Diseño web para Roquetas, capital turística",
    "heroLead": "97.000 habitantes, costa de bandera azul y 3+ millones de turistas al año. Webs multiidioma ES/EN/DE/FR con motor de reservas directo — porque el 15-20% que pagas a Booking es tu margen.",
    "lugares": [
      {
        "name": "Las Salinas",
        "sub": "PLAYA + FLAMENCOS",
        "desc": "7 km de playa con bandera azul · humedal RAMSAR · más de 100 especies de aves migratorias entre flamencos, garzas y cigüeñuelas.",
        "dato": "7 km"
      },
      {
        "name": "Castillo Santa Ana",
        "sub": "FORTALEZA DEL SIGLO XVIII",
        "desc": "Construido en 1764 para defender la costa de piratas berberiscos. Hoy símbolo cultural y vista emblemática del puerto pesquero.",
        "dato": "1764"
      },
      {
        "name": "Faro y puerto",
        "sub": "NÁUTICA + ACUICULTURA",
        "desc": "Puerto deportivo + pesquero · acuicultura de dorada y lubina de referencia europea. Centro náutico para vela, kayak y pesca deportiva.",
        "dato": "500+ amarres"
      }
    ],
    "lugaresHead": {
      "h2": "Lo que hace única a Roquetas",
      "lead": "No es un destino \"playa y ya\". Roquetas combina naturaleza protegida, patrimonio defensivo y un puerto pesquero/acuicultor de primer nivel europeo."
    },
    "datos": [
      {
        "k": "POBLACIÓN",
        "v": "97.000 hab · 2ª de la provincia"
      },
      {
        "k": "TURISTAS",
        "v": "3.000.000+ visitantes/año"
      },
      {
        "k": "COSTA",
        "v": "15 km playa · 7 banderas azules"
      },
      {
        "k": "PLAZAS HOTEL",
        "v": "~25.000 plazas hoteleras"
      },
      {
        "k": "GOLF",
        "v": "2 campos premium · 36 hoyos"
      },
      {
        "k": "ACUICULTURA",
        "v": "Top exportador dorada/lubina"
      }
    ],
    "datosHead": {
      "h2": "Por qué Roquetas factura",
      "lead": "Datos reales que explican por qué Roquetas es el mercado más rentable de la costa para negocios turísticos, hosteleros e inmobiliarios."
    },
    "sectores": [
      {
        "nombre": "Hoteles y alojamiento",
        "stat": "3M+",
        "statLabel": "turistas/año",
        "desc": "Roquetas acoge más de 3 millones de turistas al año. Hoteles, apartamentos y bungalows necesitan webs con motor de reservas propio para reducir comisiones de Booking y Airbnb, y captar el turista europeo que busca directamente.",
        "tags": [
          "Motor reservas propio",
          "Multiidioma EN/DE/FR",
          "Sin comisiones OTA",
          "Galería inmersiva 4K"
        ]
      },
      {
        "nombre": "Restauración y chiringuitos",
        "stat": "#1",
        "statLabel": "Google Maps",
        "desc": "La primera playa de Almería tiene una oferta gastronómica enorme. Restaurantes de mariscos, chiringuitos y bares de tapas compiten por aparecer en Google Maps cuando el turista busca \"dónde comer en Roquetas\".",
        "tags": [
          "Carta digital QR",
          "Reservas online",
          "SEO \"restaurante Roquetas\"",
          "Google Business optimizado"
        ]
      },
      {
        "nombre": "Inmobiliarias y alquileres",
        "stat": "+40%",
        "statLabel": "leads internacionales",
        "desc": "El mercado inmobiliario de Roquetas es uno de los más activos de Almería, con fuerte demanda internacional. Portales con fichas de propiedades, buscador avanzado y captación de leads desde Google.",
        "tags": [
          "Portal de propiedades",
          "Captación leads",
          "Multiidioma",
          "Buscador avanzado"
        ]
      },
      {
        "nombre": "Golf y actividades náuticas",
        "stat": "5 ★",
        "statLabel": "campos premium",
        "desc": "Playa Serena Golf · Alborán Golf · escuela de vela · pesca deportiva. Webs para reservas, equipamiento, clases y paquetes golf+hotel.",
        "tags": [
          "Reservas tee time",
          "Paquetes golf+hotel",
          "Multiidioma",
          "Calendario actividades"
        ]
      },
      {
        "nombre": "Comercio y retail vacacional",
        "stat": "24/7",
        "statLabel": "venta online",
        "desc": "Tiendas de moda, complementos, souvenirs y productos locales. E-commerce para vender a turistas tras la estancia y a residentes europeos durante el invierno.",
        "tags": [
          "E-commerce",
          "Pasarela de pago",
          "Envíos UE",
          "Gestión stock"
        ]
      },
      {
        "nombre": "Salud y bienestar resort",
        "stat": "B2B+B2C",
        "statLabel": "turistas + locales",
        "desc": "Clínicas dentales, fisioterapia, dermatología y centros de estética con cliente nacional + turista internacional. Citas online y multiidioma.",
        "tags": [
          "Citas online",
          "Multiidioma",
          "RGPD sanitario",
          "Paquetes wellness"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que viven del verano · todo el año",
      "lead": "Seis sectores con estrategia digital específica. Cada uno con multiidioma, motor de reservas, SEO turístico y captación internacional."
    },
    "diferenciales": [
      {
        "title": "Capital turística de la Costa",
        "desc": "Con 97.000 habitantes residentes que se multiplican en temporada, Roquetas es la 2ª ciudad de Almería y el principal destino de sol y playa de la provincia. El volumen de búsquedas en Google es enorme."
      },
      {
        "title": "Turismo internacional masivo",
        "desc": "UK, Alemania, Francia, Bélgica, Holanda. Tu web monolingüe pierde el 55% de tu mercado. Webs ES/EN/DE/FR con SEO real en cada idioma (no traducción automática) son la diferencia entre llenar o no."
      },
      {
        "title": "Reservas directas vs OTAs",
        "desc": "Las comisiones del 15-20% de Booking y Airbnb son veneno. Cada reserva directa son 50€-200€ que se quedan en tu bolsillo. Un motor propio en la web + email marketing devuelve fidelización y márgenes."
      },
      {
        "title": "Bandera Azul + acuicultura premium",
        "desc": "7 banderas azules + costa preparada + acuicultura líder europea + golf premium. Roquetas no es \"una playa más\" — es un destino completo. Tu web debe contar esa historia bien."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para invertir en la costa",
      "lead": "Tamaño + turismo internacional + tecnología de reservas directas + diversidad de sectores. Roquetas es la oportunidad digital más grande de Almería."
    },
    "testimonios": [
      {
        "nombre": "Enrique Pastor",
        "negocio": "Hotel · 1ª línea playa",
        "texto": "Llevábamos años dependiendo de Booking al 100%. Platanito Rico nos hizo una web con motor de reservas propio y en 6 meses ya el 30% de nuestras reservas son directas. El ahorro en comisiones paga con creces la inversión."
      },
      {
        "nombre": "Rosa Fernández",
        "negocio": "Restaurante mariscos · Roquetas",
        "texto": "Somos el restaurante más buscado de Roquetas para mariscos en Google. Antes no aparecíamos ni en la tercera página. Ahora tenemos la ficha perfecta y la web carga en medio segundo. Los clientes nos encuentran solos."
      },
      {
        "nombre": "Hans Müller",
        "negocio": "Apartamentos · Las Marinas",
        "texto": "Mis clientes son 90% alemanes. Necesitábamos web en alemán optimizada para Google.de. Nos hicieron una página rapidísima y posicionada — ahora recibo emails directos de Hamburgo y Berlín sin pagar comisión."
      },
      {
        "nombre": "Sarah Williams",
        "negocio": "Estate agent · Roquetas",
        "texto": "As a British estate agent in Roquetas, I needed a bilingual portal that works for British buyers AND Spanish sellers. The team got it perfectly — listings, search, contact forms in both languages. Excellent work."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Roquetas que venden directo",
      "lead": "Somos el restaurante más buscado de Roquetas para mariscos en Google. Antes no aparecíamos ni en la tercera página. Ahora tenemos la ficha perfecta y la web carga en medio segundo. Los clientes nos encuentran solos."
    },
    "faq": [
      {
        "q": "¿Hacéis webs multiidioma para captar turismo internacional en Roquetas?",
        "a": "Sí, es nuestra especialidad. Webs en español + inglés + alemán + francés con hreflang, contenido localizado (no traducción automática), SEO técnico por idioma y schema apropiado. Cada versión es nativa y optimizada para Google del país (.com /.co.uk /.de /.fr)."
      },
      {
        "q": "¿Podéis integrar un motor de reservas para evitar comisiones de Booking?",
        "a": "Exactamente. Integramos motores de reservas directas (Smoobu, Lodgify, Beds24, o soluciones propias) que permiten a tus clientes reservar sin intermediarios. Te ahorras el 15-20% de comisión + el control total de los datos de tus huéspedes para fidelización."
      },
      {
        "q": "¿Cuánto cuesta una web para un hotel o apartamento en Roquetas?",
        "a": "Web corporativa profesional desde 500€ con hosting gratuito. Hoteles y apartamentos con motor de reservas multiidioma, o tiendas online, desde 700€ según funcionalidades. Landing de una página desde 350€. Presupuesto cerrado, sin sorpresas."
      },
      {
        "q": "¿Hacéis webs para restaurantes de Roquetas?",
        "a": "Sí. Carta digital QR (escaneable desde la mesa) multiidioma, sistema de reservas online, integración con Google Maps y Google Business, fotografía profesional de platos y SEO local para \"restaurante Roquetas\", \"marisquería Roquetas\" y similares."
      },
      {
        "q": "¿En cuánto tiempo tengo lista mi web en Roquetas?",
        "a": "Web corporativa: 1–2 semanas. Web hotelera con motor de reservas + 4 idiomas: 3–4 semanas. Portal inmobiliario multiidioma con MLS: 4–6 semanas. Trabajamos en sprints — ves avances cada semana."
      },
      {
        "q": "¿Hacéis SEO local para posicionar en búsquedas tipo \"hotel Roquetas\" o \"apartamento Roquetas\"?",
        "a": "Sí, especialidad. Optimizamos Google Business Profile en 4 idiomas, estructuramos contenido con keywords por nacionalidad (\"apartamento Roquetas vacaciones\" vs \"Roquetas Ferienwohnung\") y trabajamos schema HotelRoom + HotelStandard para resultados enriquecidos."
      },
      {
        "q": "¿Trabajáis con inmobiliarias y estate agents que atienden compradores británicos/alemanes?",
        "a": "Sí, frecuentemente. Portales bilingües con buscador avanzado, fichas de propiedad detalladas con galería, captura de leads, integración con MLS y CRM (HubSpot, Pipedrive). Hacemos también web en alemán específicamente para Inmaculadia ZIL/German buyers."
      },
      {
        "q": "¿Ofrecéis paquetes golf+hotel y reservas náuticas?",
        "a": "Sí. Para hoteles con paquetes golf integramos calendario de tee time, paquetes combinados (hotel+green fee+transfer), reservas para escuela de vela, pesca deportiva y actividades náuticas. Todo gestionable por ti desde un panel."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en la costa",
      "lead": "Multiidioma, motor de reservas, comisiones OTA, plazos, SEO turístico y precios. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "mercados",
        "head": {
          "h2": "Cuatro idiomas, 4 nacionalidades de turistas",
          "lead": "Los 3 millones de turistas de Roquetas no hablan todos español. Tu web monolingüe pierde el 55% de tu mercado. Esto cubrimos por idioma."
        },
        "items": [
          {
            "t": "Nacional",
            "d": "«hotel Roquetas»",
            "meta": "45% %"
          },
          {
            "t": "Reino Unido",
            "d": "«hotels Roquetas Mar»",
            "meta": "20% %"
          },
          {
            "t": "Alemania · Austria",
            "d": "«Roquetas de Mar Hotel»",
            "meta": "18% %"
          },
          {
            "t": "Francia · Bélgica",
            "d": "«hôtel Roquetas de Mar»",
            "meta": "12% %"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "san-juan-de-los-terreros": {
    "slug": "san-juan-de-los-terreros",
    "title": "Diseño Web en San Juan de los Terreros",
    "description": "Diseño web y SEO en San Juan de los Terreros para apartamentos, chiringuitos y turismo familiar. Reservas directas, desde 350€. Presupuesto en 24h.",
    "h1": "Diseño web para San Juan de los Terreros",
    "heroLead": "Castillo, calma y mar de cristal. Webs para apartamentos, chiringuitos y turismo familiar que llenan toda la temporada — no solo agosto — con reservas directas y fotografía que enamora.",
    "lugares": [
      {
        "name": "El Castillo",
        "sub": "VIGÍA DEL MEDITERRÁNEO",
        "desc": "La fortaleza costera que corona el pueblo desde su promontorio. Un monumento poco conocido con un potencial turístico enorme — la imagen perfecta para una web con carácter.",
        "dato": "Histórico"
      },
      {
        "name": "Playas familiares",
        "sub": "ARENA DORADA · AGUA LIMPIA",
        "desc": "Calas y playas de arena dorada y aguas cristalinas, tranquilas y poco masificadas. El \"secreto mejor guardado del Levante\" para familias que buscan calma de verdad.",
        "dato": "Bandera azul"
      },
      {
        "name": "Islas volcánicas",
        "sub": "ISLA NEGRA · SNORKEL",
        "desc": "Frente a la costa emergen los islotes volcánicos de Terreros, reserva de vida marina. Fondos cristalinos perfectos para snorkel, kayak y un atardecer de postal.",
        "dato": "Volcánicas"
      }
    ],
    "lugaresHead": {
      "h2": "El Castillo que vigila el mar",
      "lead": "Sobre su promontorio, la fortaleza costera da nombre y carácter al pueblo. Un monumento poco conocido con un potencial turístico enorme — y la imagen perfecta para que tu web transmita historia, mar y autenticidad."
    },
    "datos": [
      {
        "k": "EL SECRETO",
        "v": "El mejor guardado del Levante"
      },
      {
        "k": "CASTILLO",
        "v": "Fortaleza vigía del Mediterráneo"
      },
      {
        "k": "PLAYAS",
        "v": "Arena dorada · aguas cristalinas"
      },
      {
        "k": "ISLAS",
        "v": "Islotes volcánicos · Isla Negra"
      },
      {
        "k": "FAMILIAR",
        "v": "Calma · sin masificación"
      },
      {
        "k": "FRONTERA",
        "v": "Águilas, Lorca y Murcia a un paso"
      }
    ],
    "datosHead": {
      "h2": "Por qué San Juan enamora",
      "lead": "Datos que explican por qué San Juan de los Terreros es el secreto mejor guardado del Levante y un mercado turístico con muchísimo potencial digital sin explotar."
    },
    "sectores": [
      {
        "nombre": "Apartamentos y casas vacacionales",
        "stat": "sin %",
        "statLabel": "comisión OTA",
        "desc": "San Juan es el secreto mejor guardado del Levante: aguas limpias, arena dorada y tranquilidad. Apartamentos y casas que aparezcan bien en Google pueden saturar su ocupación con familias de Murcia, Lorca y Castilla — y con reservas directas, sin comisiones.",
        "tags": [
          "Motor de reservas",
          "Galería inmersiva",
          "SEO \"apartamento Terreros\"",
          "Sin comisiones OTA"
        ]
      },
      {
        "nombre": "Chiringuitos y bares de playa",
        "stat": "QR",
        "statLabel": "carta digital",
        "desc": "Los chiringuitos y restaurantes frente al mar tienen una temporada corta pero intensa. Carta digital, ficha de Google Maps con fotos y horario hacen que los clientes vengan expresamente desde Águilas y Lorca en lugar de encontrarte por casualidad.",
        "tags": [
          "Carta digital QR",
          "Google Maps + fotos",
          "SEO \"chiringuito playa\"",
          "Reservas mesa"
        ]
      },
      {
        "nombre": "Turismo histórico — el castillo",
        "stat": "★",
        "statLabel": "qué ver",
        "desc": "El castillo de San Juan es un monumento con potencial turístico que apenas tiene presencia digital. Empresas de visitas, guías y alojamientos pueden posicionarse para \"qué ver en San Juan de los Terreros\" y combinar cultura con playa.",
        "tags": [
          "SEO \"qué ver Terreros\"",
          "Turismo cultural",
          "Rutas combinadas",
          "Contenido local"
        ]
      },
      {
        "nombre": "Restauración y marisco",
        "stat": "km0",
        "statLabel": "pescado fresco",
        "desc": "Restaurantes de pescado y marisco de la zona con cliente familiar y de temporada. Una web con buena fotografía de producto, reservas y SEO gastronómico capta al turista que busca \"dónde comer en Terreros\" antes de llegar.",
        "tags": [
          "Fotografía de producto",
          "Reservas online",
          "SEO gastronómico",
          "Menús y eventos"
        ]
      },
      {
        "nombre": "Actividades náuticas y naturaleza",
        "stat": "4.9★",
        "statLabel": "experiencias",
        "desc": "Snorkel y kayak en las islas, paddle surf, rutas y alquiler de material. Empresas de experiencias que necesitan calendario de salidas, pago de señal y reseñas para llenar plazas en los meses fuertes.",
        "tags": [
          "Reservas de actividad",
          "Calendario salidas",
          "Pago de señal",
          "Reseñas TripAdvisor"
        ]
      },
      {
        "nombre": "Comercio y servicios de temporada",
        "stat": "350€",
        "statLabel": "desde",
        "desc": "Tiendas, supermercados, alquileres y servicios que viven del visitante estival y del segundo-residente. Webs sencillas y económicas con Google Business optimizado para captar a quien pasa el verano en San Juan.",
        "tags": [
          "Web desde 350€",
          "Google Business",
          "SEO local",
          "Hosting gratis"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que viven del verano",
      "lead": "Seis sectores con estrategia digital propia. Del apartamento familiar al chiringuito de playa, pasando por el castillo y las actividades náuticas."
    },
    "diferenciales": [
      {
        "title": "La temporada no es solo agosto",
        "desc": "Aquí está el dinero que se escapa: junio y septiembre. Un apartamento o chiringuito que solo se llena en agosto deja la mitad de la temporada vacía. Con web + SEO local, las familias te encuentran y reservan también en los meses flojos. Es ocupación pura que hoy pierdes."
      },
      {
        "title": "El secreto mejor guardado vende",
        "desc": "\"Playa tranquila, sin masificación, agua cristalina\" es exactamente lo que media España busca y no encuentra. San Juan lo tiene — pero si no estás en Google, no existes. Posicionar esa promesa te trae al cliente que huye de Roquetas y Águilas."
      },
      {
        "title": "Competencia baja, resultados rápidos",
        "desc": "Muy pocos negocios de San Juan tienen web, y casi ninguno la tiene bien hecha. Posicionarse para \"apartamento San Juan de los Terreros\" o \"chiringuito playa\" es relativamente fácil y rápido. Llegas el primero a un mercado que casi nadie trabaja."
      },
      {
        "title": "Inversión que dura años",
        "desc": "Una web de temporada hecha este año trabaja para ti las próximas 5–10 temporadas. El coste por cliente que te trae es mínimo y se amortiza el primer verano. Para un negocio estacional es la mejor inversión posible."
      }
    ],
    "diferencialesHead": {
      "h2": "Cuatro razones para invertir en tu web",
      "lead": "Temporada que se alarga + posicionamiento de \"playa tranquila\" + competencia baja + inversión que dura años. San Juan rinde rápido para quien llega primero."
    },
    "testimonios": [
      {
        "nombre": "Patricia Cuenca",
        "negocio": "Apartamentos vacacionales",
        "texto": "Tenía los apartamentos llenos en agosto y vacíos el resto del año. Con la web y el SEO local, junio y septiembre también están ocupados. San Juan es una joya que los turistas no conocen — hasta que te buscan en Google."
      },
      {
        "nombre": "Carlos Egea",
        "negocio": "Chiringuito de temporada",
        "texto": "Solo abría junio a septiembre y la gente me encontraba por casualidad. Ahora la ficha de Google Maps con fotos y horario hace que vengan expresamente desde Águilas y Lorca. La temporada ya no es solo agosto."
      },
      {
        "nombre": "Marga Soler",
        "negocio": "Casa rural · familias",
        "texto": "Buscaba un público familiar que valorase la tranquilidad. La web con galería y la promesa de \"playa sin masificación\" me trae justo a esas familias, que repiten cada verano y me recomiendan. He dejado de depender de los portales."
      },
      {
        "nombre": "Tomás Ríos",
        "negocio": "Restaurante de pescado",
        "texto": "En temporada baja estábamos muertos. Con la carta digital, las fotos de los platos y el SEO, ahora vienen a comer arroces los fines de semana de primavera y otoño. La web nos ha alargado el año entero."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de San Juan que llenan el año",
      "lead": "Solo abría junio a septiembre y la gente me encontraba por casualidad. Ahora la ficha de Google Maps con fotos y horario hace que vengan expresamente desde Águilas y Lorca. La temporada ya no es solo agosto."
    },
    "faq": [
      {
        "q": "¿Cómo puede mi alojamiento en San Juan de los Terreros aparecer en Google?",
        "a": "Con una web optimizada + ficha de Google Business completa + SEO para términos como \"apartamento San Juan de los Terreros\", \"playa tranquila Almería\" y \"casa vacacional Terreros\". La competencia es baja y posicionarse es rápido: en pocas semanas empiezas a recibir consultas directas de familias."
      },
      {
        "q": "¿Vale la pena invertir en web para un negocio de temporada en San Juan?",
        "a": "Mucho. La web es una inversión permanente: la haces este año y trabaja para ti durante toda la temporada los próximos 5–10 años. El coste por cliente que te trae es mínimo y, sobre todo, te llena junio y septiembre — los meses que hoy pierdes y donde está el margen real."
      },
      {
        "q": "¿Cuánto cuesta la web más sencilla para un chiringuito o apartamento?",
        "a": "Desde 350€ para un negocio de temporada: diseño limpio, galería de fotos, localización en Google Maps y formulario de contacto, con hosting gratuito incluido. Si quieres motor de reservas directas o carta digital QR, lo ampliamos según necesites con presupuesto cerrado."
      },
      {
        "q": "¿Podéis ponerme un sistema de reservas para evitar comisiones de Booking y Airbnb?",
        "a": "Sí. Integramos motor de reservas directas con calendario, para que las familias reserven contigo sin intermediarios. Te ahorras el 15–20% de comisión de las plataformas y te quedas los datos del cliente para que vuelva cada verano. La web se paga sola en una temporada."
      },
      {
        "q": "¿Hacéis las fotos de la playa, el alojamiento y los platos?",
        "a": "Coordinamos sesión de fotografía profesional porque un destino de playa se elige con los ojos. Una galería bien hecha del agua cristalina, tu apartamento o un buen arroz vende sola. Es nuestra recomendación para cualquier negocio turístico de San Juan."
      },
      {
        "q": "¿Trabajáis el turismo del castillo y las visitas culturales?",
        "a": "Sí. El castillo y las islas son atractivos con poca presencia digital. Hacemos webs y SEO para \"qué ver en San Juan de los Terreros\" y rutas que combinan cultura, playa y naturaleza, para guías, alojamientos y empresas de actividades que quieran captar a ese visitante."
      },
      {
        "q": "¿En cuánto tiempo está lista mi web antes de la temporada?",
        "a": "Una web de temporada sencilla: 1 semana. Con motor de reservas o carta digital: 2–3 semanas. Si nos lo pides con margen antes del verano, la tienes lista y posicionando a tiempo para captar las reservas de junio en adelante."
      },
      {
        "q": "¿Trabajáis también en Pulpí, Águilas y el resto del Levante?",
        "a": "Sí. San Juan de los Terreros pertenece a Pulpí, y cubrimos todo el Levante almeriense y la zona fronteriza con Murcia: Pulpí, Villaricos, Cuevas del Almanzora, Vera y la costa de Águilas. Trabajamos online y nos desplazamos para la sesión de fotos cuando hace falta."
      }
    ],
    "faqHead": {
      "h2": "Lo que más preguntan en la playa",
      "lead": "Aparecer en Google, negocios de temporada, reservas, fotos, el castillo, plazos y precios. Si no está aquí, escríbenos."
    },
    "extras": [
      {
        "key": "ocupacion",
        "head": {
          "h2": "Tu temporada no es agosto. Es de junio a septiembre",
          "lead": "Agosto se llena solo. El dinero que se te escapa está en junio y septiembre — meses con sol, sin masificación y con familias buscando playa tranquila. Si tu web trabaja, esos meses también se llenan."
        },
        "items": [
          {
            "t": "MAY",
            "d": "De 14 a 46"
          },
          {
            "t": "JUN",
            "d": "De 28 a 78"
          },
          {
            "t": "JUL",
            "d": "De 68 a 94"
          },
          {
            "t": "AGO",
            "d": "De 100 a 100"
          },
          {
            "t": "SEP",
            "d": "De 34 a 84"
          },
          {
            "t": "OCT",
            "d": "De 12 a 42"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "seron": {
    "slug": "seron",
    "title": "Diseño Web en Serón: Jamón y Turismo Rural",
    "description": "Diseño web en Serón para secaderos de jamón, casas rurales, restaurantes y comercio de la Sierra de los Filabres. SEO local, multiidioma y hosting gratis.",
    "h1": "Diseño web para el Jamón de Serón, el castillo y la sierra",
    "heroLead": "Webs para secaderos con IGP, casas rurales en los Filabres, restaurantes de migas y guiso de trigo, y comercio local. El Valle del Almanzora es tu mercado. Nosotros te ponemos en el mapa.",
    "lugares": [],
    "lugaresHead": null,
    "datos": [],
    "datosHead": null,
    "sectores": [
      {
        "nombre": "Secaderos y Jamón IGP",
        "stat": "IGP",
        "statLabel": "Jamón de Serón",
        "desc": "Serón es el único jamón andaluz autorizado para exportar a China, EE.UU. y México. Secaderos artesanales que necesitan web con historia de origen, procesos de curación, venta online y posicionamiento en búsquedas de jamón de calidad premium.",
        "tags": [
          "IGP Jamón de Serón",
          "Venta online gourmet",
          "Historia del secadero",
          "Exportación internacional"
        ]
      },
      {
        "nombre": "Turismo Rural y Casas Rurales",
        "stat": "+40%",
        "statLabel": "reservas directas",
        "desc": "Casas rurales en la Sierra de los Filabres, alojamientos con encanto y posadas. Motor de reservas propio para eliminar comisiones, galería de paisajes de montaña y posicionamiento en búsquedas de turismo rural en Almería.",
        "tags": [
          "Motor reservas propio",
          "Galería Sierra Filabres",
          "Sin comisiones",
          "SEO turismo rural"
        ]
      },
      {
        "nombre": "Restauración y Gastronomía",
        "stat": "#1",
        "statLabel": "\"migas Serón\"",
        "desc": "Restaurantes, bares y mesones que sirven migas, guiso de trigo y carnes de la sierra. Webs con carta digital, reservas online y SEO gastronómico para captar visitantes que buscan \"dónde comer en Serón\" o \"migas Serón\".",
        "tags": [
          "Carta digital",
          "Reservas online",
          "SEO gastronómico",
          "Migas y guiso"
        ]
      },
      {
        "nombre": "Comercio Local",
        "stat": "24/7",
        "statLabel": "tu tienda abierta",
        "desc": "Comercios de alimentación, artesanía y productos locales de Serón. Tiendas online para vender fuera del municipio: jamón, embutidos, miel, vino y conservas con envío a toda España.",
        "tags": [
          "E-commerce productos locales",
          "Pasarela de pago",
          "Envíos España",
          "Jamón online"
        ]
      },
      {
        "nombre": "Turismo Activo y Naturaleza",
        "stat": "x3",
        "statLabel": "más visitas",
        "desc": "Empresas de senderismo, rutas por Las Menas, observación astronómica en el Planetario de Serón y el nuevo Camino de los Engrasadores con pasarelas y tirolinas. Webs con booking online y multiidioma.",
        "tags": [
          "Camino Engrasadores",
          "Planetario Serón",
          "Senderismo Filabres",
          "Booking online"
        ]
      },
      {
        "nombre": "Servicios Profesionales",
        "stat": "+50%",
        "statLabel": "leads cualificados",
        "desc": "Clínicas, despachos, gestorías y profesionales que sirven a Serón y el Valle del Almanzora. Webs que transmiten confianza, aparecen en Google Maps y convierten visitas en clientes de toda la comarca.",
        "tags": [
          "Landing captación",
          "Google Business",
          "SEO Valle Almanzora",
          "Hosting gratuito"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Negocios que saben a sierra",
      "lead": "Seis sectores con estrategia digital propia. Desde el secadero de jamón IGP hasta la casa rural con vistas a los Filabres. Cada uno con su SEO local y su sistema de venta o reserva."
    },
    "diferenciales": [
      {
        "title": "Jamón de Serón IGP",
        "desc": "El único jamón andaluz con Indicación Geográfica Protegida. Autorizado para exportar a China, EE.UU. y México. 5.000+ búsquedas/mes. Un producto estrella que atrae visitantes y clientes de toda España al municipio."
      },
      {
        "title": "Castillo y patrimonio",
        "desc": "Castillo nazarí del siglo XIII, calles empedradas de origen andalusí, Iglesia de la Anunciación del XVIII. Historia viva que posiciona a Serón como destino cultural del interior de Almería."
      },
      {
        "title": "Sierra de los Filabres",
        "desc": "Rutas de senderismo, poblado minero de Las Menas, el nuevo Camino de los Engrasadores con pasarelas y tirolinas, y el Planetario con observatorio astronómico. Una oferta de naturaleza única en la provincia."
      },
      {
        "title": "Valle del Almanzora",
        "desc": "Serón es la puerta de entrada al alto Almanzora. Tíjola, Suflí, Laroya, Bacares, Alcóntar. Una comarca con economía diversificada y demanda creciente de servicios digitales."
      }
    ],
    "diferencialesHead": {
      "h2": "Un pueblo con sello propio",
      "lead": "Cuatro razones por las que Serón necesita una estrategia digital diferente a cualquier otro pueblo de Almería."
    },
    "testimonios": [
      {
        "nombre": "Antonio Carrillo",
        "negocio": "Secadero artesanal · Serón",
        "texto": "Somos la tercera generación de jamoneros en Serón. La web nos ha abierto mercados que antes eran impensables. Hemos empezado a vender online a Madrid, Barcelona y hasta nos han contactado de una tienda gourmet en Tokio."
      },
      {
        "nombre": "Carmen López",
        "negocio": "Casa rural · Sierra de los Filabres",
        "texto": "Dependía de Booking para todo. Desde que tenemos la web con motor de reservas propio, el 50% de los huéspedes reservan directo. Sin comisiones. Y los que reservan directo repiten mucho más."
      },
      {
        "nombre": "Miguel Ángel Ruiz",
        "negocio": "Restaurante · Plaza Nueva",
        "texto": "Nuestras migas y nuestro guiso de trigo eran el secreto mejor guardado de Serón. Con la web nueva, la carta digital y el SEO local, ahora nos buscan y nos encuentran. Los fines de semana tenemos lleno."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Serón que ya venden más",
      "lead": "Dependía de Booking para todo. Desde que tenemos la web con motor de reservas propio, el 50% de los huéspedes reservan directo. Sin comisiones. Y los que reservan directo repiten mucho más."
    },
    "faq": [
      {
        "q": "¿Cuánto cuesta una página web para un negocio en Serón?",
        "a": "Web corporativa profesional desde 500€, perfecta para secaderos, casas rurales y restaurantes de Serón. Tienda online gourmet o motor de reservas con pagos desde 700€. Landing de una página desde 350€. Presupuesto gratuito, sin compromiso."
      },
      {
        "q": "¿Hacéis tiendas online para vender Jamón de Serón fuera del municipio?",
        "a": "Sí, es una de nuestras especialidades. Creamos e-commerce con pasarela de pago, gestión de stock, descripciones con historia del producto y envíos a toda España. Ayudamos a que el Jamón de Serón llegue a cualquier mesa del país."
      },
      {
        "q": "¿Podéis hacer SEO para \"Jamón de Serón\", \"casa rural Serón\" o \"migas Serón\"?",
        "a": "Sí, trabajamos SEO específico para palabras clave del municipio. Posicionamos tu web en búsquedas como \"comprar jamón Serón online\", \"casa rural Sierra Filabres\", \"restaurante Serón\" y \"turismo rural Almería interior\"."
      },
      {
        "q": "¿Trabajáis con secaderos y productores de la IGP Jamón de Serón?",
        "a": "Sí. Desarrollamos webs para secaderos inscritos en el Consejo Regulador de la IGP, con tienda online, trazabilidad del producto, historia del proceso de curación y posicionamiento en mercados nacionales e internacionales."
      },
      {
        "q": "¿Hacéis webs multiidioma para turismo rural internacional?",
        "a": "Sí. Serón recibe visitantes de toda Europa que buscan turismo de naturaleza, senderismo y astroturismo. Webs con ES/EN/FR/DE optimizadas para captar ese público internacional que busca \"rural accommodation Almería\"."
      },
      {
        "q": "¿En cuánto tiempo tengo lista mi web en Serón?",
        "a": "Web corporativa o restaurante: 1–2 semanas. Tienda online gourmet o casa rural con reservas: 2–4 semanas. Te damos calendario y cumplimos plazos."
      },
      {
        "q": "¿Podéis ayudarme a aparecer en Google Maps cuando buscan \"secadero Serón\"?",
        "a": "Sí. Optimizamos tu ficha de Google Business Profile con fotos, horarios, productos y reseñas. Es la herramienta más potente para captar clientes locales y de paso que visitan Serón."
      },
      {
        "q": "¿Venís a Serón para conocer el negocio o todo es online?",
        "a": "Preferimos visitarte. Serón está a 45 min de nuestra sede en Vera. Quedamos en tu secadero, tu casa rural o tu restaurante, tomamos un café y diseñamos la estrategia viendo el negocio en persona."
      }
    ],
    "faqHead": {
      "h2": "Lo que más nos preguntan en Serón",
      "lead": "Precios, plazos, IGP Jamón de Serón, SEO local, casas rurales y multiidioma para turismo internacional."
    },
    "extras": [],
    "ctaHead": {
      "h2": "¿Empezamos tu web en Serón?",
      "lead": "Cuéntanos tu proyecto en Serón —secadero, casa rural, restaurante o comercio— y te enviamos presupuesto detallado en 24h. Hosting gratuito, SEO local y soporte en el Valle del Almanzora."
    }
  },
  "tabernas": {
    "slug": "tabernas",
    "title": "Diseño Web en Tabernas: Turismo y Desierto",
    "description": "Diseño web en Tabernas para parques del oeste, alojamientos rurales con astroturismo, restaurantes y comercio local. Reservas directas y SEO turístico.",
    "h1": "Diseño web para el desierto del spaghetti western",
    "heroLead": "Tabernas es el único desierto de Europa y el Hollywood almeriense. Sus badlands han sido escenario de más de 150 películas y sus cielos tienen certificación Starlight. Tu web tiene que estar a la altura del paisaje.",
    "lugares": [
      {
        "name": "Desierto",
        "sub": "ÚNICO EN EUROPA",
        "desc": "280 km² de badlands, cárcavas y ramblas que forman el único desierto del continente. Un paisaje lunar que no existe en ningún otro lugar de Europa.",
        "dato": "280 km²"
      },
      {
        "name": "Spaghetti Western",
        "sub": "HOLLYWOOD EN ALMERÍA",
        "desc": "Más de 150 películas desde 1964. Clint Eastwood, Sean Connery, Harrison Ford y Brad Pitt han rodado aquí. Tabernas es la meca del cine de aventuras europeo.",
        "dato": "+150 films"
      },
      {
        "name": "Reserva Starlight",
        "sub": "ASTRONOMÍA ★ UNESCO",
        "desc": "Cielos despejados 300+ noches al año, contaminación lumínica casi nula. Certificación Starlight. Observación astronómica de clase mundial en pleno desierto.",
        "dato": "300+ noches"
      },
      {
        "name": "Mini Hollywood",
        "sub": "PARQUE DEL OESTE",
        "desc": "El parque western más famoso de España. Diligencias, duelos al sol, salón y cantina. Miles de visitantes cada fin de semana reviven el Lejano Oeste en Almería.",
        "dato": "195K+ vis/año"
      }
    ],
    "lugaresHead": {
      "h2": "Cuatro señas de identidad de Tabernas",
      "lead": "280 km² de badlands, cárcavas y ramblas que forman el único desierto del continente. Un paisaje lunar que no existe en ningún otro lugar de Europa."
    },
    "datos": [
      {
        "k": "EXTENSIÓN",
        "v": "280 km² · Paraje Natural"
      },
      {
        "k": "CLIMA",
        "v": "Árido · 300+ días sol/año"
      },
      {
        "k": "TEMP. MÁX.",
        "v": "Hasta 50 °C en superficie"
      },
      {
        "k": "PRECIPITACIÓN",
        "v": "< 200 mm · clima subdesértico"
      },
      {
        "k": "PROTECCIÓN",
        "v": "ZEPA · LIC · Reserva Natural"
      },
      {
        "k": "FLORA",
        "v": "Especies endémicas de estepa"
      }
    ],
    "datosHead": {
      "h2": "El único desierto de Europa está en Almería",
      "lead": "El Desierto de Tabernas es una rareza geológica: un paisaje semiárido de badlands, cárcavas y ramblas que no existe en ningún otro lugar del continente europeo. Declarado Paraje Natural en 1989, sus 280 km² albergan un ecosistema único adaptado a la aridez extrema."
    },
    "sectores": [
      {
        "nombre": "Parques Temáticos del Oeste",
        "stat": "3",
        "statLabel": "parques del oeste",
        "desc": "Mini Hollywood, Texas Hollywood y Fort Bravo atraen a miles de turistas cada año. Estos parques necesitan webs multiidioma con venta de entradas online, calendario de espectáculos y galerías inmersivas que capturen la magia del western desde el primer clic.",
        "tags": [
          "Venta entradas online",
          "Multiidioma",
          "Calendario espectáculos",
          "SEO \"Mini Hollywood\""
        ]
      },
      {
        "nombre": "Astroturismo Starlight",
        "stat": "★",
        "statLabel": "Reserva Starlight",
        "desc": "El Desierto de Tabernas es uno de los mejores cielos de Europa para observar estrellas. Empresas de astroturismo, alojamientos con cúpulas astronómicas y guías especializadas necesitan webs que vendan la experiencia de mirar al cosmos.",
        "tags": [
          "Reservas observatorio",
          "Astroturismo",
          "Starlight Reserve",
          "Calendario lunar"
        ]
      },
      {
        "nombre": "Alojamiento Rural y Glamping",
        "stat": "+60%",
        "statLabel": "demanda en crecimiento",
        "desc": "Casas rurales, hoteles boutique con vistas al desierto y glamping temático western. El turista que visita Tabernas busca alojamiento con personalidad. Motor de reservas directas para eliminar comisiones de Booking.",
        "tags": [
          "Motor reservas propio",
          "Glamping temático",
          "Experiencias únicas",
          "Multiidioma"
        ]
      },
      {
        "nombre": "Restauración del Desierto",
        "stat": "#1",
        "statLabel": "cocina almeriense",
        "desc": "Bares, restaurantes y ventas en la carretera de los parques del oeste. Cocina tradicional almeriense para los miles de visitantes que recorren la ruta del spaghetti western diariamente.",
        "tags": [
          "Carta digital QR",
          "Reservas online",
          "SEO \"comer Tabernas\"",
          "Google Business"
        ]
      },
      {
        "nombre": "Turismo de Cine y Rodajes",
        "stat": "+150",
        "statLabel": "películas desde 1964",
        "desc": "Desde \"Por un puñado de dólares\" hasta \"La Peste\" y \"Juego de Tronos\". Rutas cinéfilas guiadas, visita a sets de rodaje y contenido para amantes del cine western.",
        "tags": [
          "Rutas de cine",
          "Visitas a sets",
          "Paquetes cinéfilos",
          "Galería de rodajes"
        ]
      },
      {
        "nombre": "Comercio y Artesanía Western",
        "stat": "24/7",
        "statLabel": "tienda online",
        "desc": "Merchandising de los parques, artesanía almeriense, souvenirs western y productos gastronómicos locales. E-commerce para vender todo el año, no solo en temporada turística.",
        "tags": [
          "E-commerce",
          "Merchandising",
          "Envíos nacionales",
          "Producto local"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Seis sectores para llegar más lejos que el horizonte",
      "lead": "Mini Hollywood, Texas Hollywood y Fort Bravo atraen a miles de turistas cada año. Estos parques necesitan webs multiidioma con venta de entradas online, calendario de espectáculos y galerías inmersivas que capturen la magia del western desde el primer clic."
    },
    "diferenciales": [
      {
        "title": "Único desierto de Europa",
        "desc": "No hay otro lugar igual en el continente. 280 km² de badlands que atraen viajeros de todo el mundo. Una rareza geográfica que vende sola — si la web sabe contarlo."
      },
      {
        "title": "Hollywood en Almería",
        "desc": "+150 películas desde Clint Eastwood hasta Juego de Tronos. El cine ha puesto Tabernas en el mapa global. La historia cinematográfica bien contada atrae fans, curiosos y peregrinos del spaghetti western."
      },
      {
        "title": "Cielo Starlight certificado",
        "desc": "Uno de los mejores firmamentos de Europa. Certificación Starlight de la UNESCO. 300+ noches despejadas. El astroturismo crece un 30% anual y Tabernas es el mejor sitio de España para practicarlo."
      },
      {
        "title": "Autenticidad extrema",
        "desc": "No es un parque temático de Disney — es un desierto real con ecosistema propio, clima extremo y paisajes que parecen de otro planeta. Esa verdad geológica es el lujo que venden los negocios locales."
      }
    ],
    "diferencialesHead": {
      "h2": "Por qué Tabernas no es como ningún otro sitio",
      "lead": "No hay otro lugar igual en el continente. 280 km² de badlands que atraen viajeros de todo el mundo. Una rareza geográfica que vende sola — si la web sabe contarlo."
    },
    "testimonios": [
      {
        "nombre": "José Luis Romero",
        "negocio": "Parque temático del oeste",
        "texto": "Con la web nueva en cuatro idiomas, las reservas de entradas online subieron un 70%. Los turistas alemanes y franceses buscan \"Mini Hollywood\" desde casa y compran antes de viajar. El sistema de preventa nos cambió el negocio por completo."
      },
      {
        "nombre": "Carmen Flores",
        "negocio": "Alojamiento rural con observatorio",
        "texto": "Montamos un telescopio en el jardín y con la web de astroturismo atraemos aficionados de toda Europa. Las noches de observación guiada se llenan. Nunca habíamos tenido clientes en noviembre hasta que empezamos."
      },
      {
        "nombre": "Juan Castaño",
        "negocio": "Restaurante carretera de los parques",
        "texto": "Estamos en la ruta de los parques del oeste pero nadie paraba. Desde que optimizamos Google Maps y la web con reseñas, hemos multiplicado por tres los clientes de temporada baja."
      }
    ],
    "testimoniosHead": {
      "h2": "Lo que dicen los que ya están en el desierto digital",
      "lead": "Montamos un telescopio en el jardín y con la web de astroturismo atraemos aficionados de toda Europa. Las noches de observación guiada se llenan. Nunca habíamos tenido clientes en noviembre hasta que empezamos."
    },
    "faq": [
      {
        "q": "¿Podéis hacer una web multiidioma para mi negocio en Tabernas?",
        "a": "Sí, trabajamos ES, EN, DE y FR. El turismo de Tabernas es eminentemente internacional — alemanes y británicos son los perfiles más frecuentes en los parques y alojamientos. SEO real en cada idioma, nada de traducción automática."
      },
      {
        "q": "¿Cuánto cuesta una web con venta de entradas online para un parque temático?",
        "a": "Web corporativa para restaurante, alojamiento rural o negocio turístico desde 500€. Con venta de entradas online, motor de reservas con pagos o multiidioma (tienda online), desde 700€. Landing de una página desde 350€. Hosting gratuito siempre."
      },
      {
        "q": "¿Hacéis fotografía profesional del desierto para la web?",
        "a": "Sí, tenemos equipo para fotografía de paisaje, atardeceres en el desierto, astrofotografía y contenido visual impactante. El desierto de Tabernas es un escenario espectacular y hay que aprovecharlo al máximo."
      },
      {
        "q": "¿Tenéis experiencia con astroturismo y observaciones astronómicas?",
        "a": "Sí, hemos trabajado con alojamientos que ofrecen experiencias de astroturismo. Integramos calendario de fases lunares, reserva de noches de observación y descripción del equipamiento astronómico disponible."
      },
      {
        "q": "¿Qué hago si mi negocio está en la carretera de los parques del oeste?",
        "a": "Optimizamos tu presencia para captar el tráfico de visitantes que va a Mini Hollywood, Texas Hollywood y Fort Bravo. Google Business Profile + web con contenido local. Hay mucho tráfico pasante que se puede capturar."
      },
      {
        "q": "¿En cuánto tiempo tengo mi web de Tabernas lista?",
        "a": "Web corporativa: 1–2 semanas. Parque temático con entradas online: 2–4 semanas. Astroturismo con calendario astronómico: 2–3 semanas. Alojamiento con motor de reservas: 2–4 semanas."
      },
      {
        "q": "¿Ayudáis con marketing digital para mi negocio en Tabernas?",
        "a": "Sí, ofrecemos SEO local, Google Business Profile, gestión de reseñas y contenido para redes. Posicionamos para keywords como \"Mini Hollywood entradas\", \"Desierto de Tabernas visitas\", \"astroturismo Almería\" y \"hotel desierto\"."
      },
      {
        "q": "¿Hacéis webs para empresas de rodajes y localizaciones?",
        "a": "Sí, desarrollamos plataformas para film commissions con catálogo de sets, galería de fotos de producción, información técnica de accesos y permisos, y formulario de solicitud de rodaje."
      }
    ],
    "faqHead": {
      "h2": "Respuestas para el desierto de dudas",
      "lead": ""
    },
    "extras": [
      {
        "key": "platos",
        "head": {
          "h2": "El Hollywood almeriense donde el cine se hizo polvo",
          "lead": "En 1964 Sergio Leone llegó a Tabernas buscando un desierto para rodar \"Por un puñado de dólares\". Desde entonces, más de 150 producciones han pisado sus badlands. Clint Eastwood, Sean Connery, Harrison Ford, Brad Pitt, Natalie Portman y Anthony Hopkins han trabajado aquí. Tabernas es el decorado natural más versátil de Europa."
        },
        "items": [
          {
            "t": "Migas del Desierto",
            "d": "Harina, ajo, pimientos y torreznos — receta de pastores y labrantíos",
            "meta": "★★★★"
          },
          {
            "t": "Cordero Segureño",
            "d": "Lechal asado al horno de leña con hierbas aromáticas de la sierra",
            "meta": "★★★★★"
          },
          {
            "t": "Trigo con conejo",
            "d": "Guiso tradicional con trigo, conejo, caracoles y garbanzos de la tierra",
            "meta": "★★★★"
          },
          {
            "t": "Vinos D.O. Almería",
            "d": "Vinos ecológicos de uva cultivada en el desierto — autenticidad líquida",
            "meta": "★★★★"
          }
        ]
      }
    ],
    "ctaHead": null
  },
  "vera": {
    "slug": "vera",
    "title": "Diseño Web en Vera | Tu agencia local",
    "description": "Agencia de diseño web y SEO en Vera (nuestra sede), Vera Playa y Puerto Rey. Webs rápidas, tiendas online y marketing local. Presupuesto en 24h.",
    "h1": "Diseño web en Vera, Vera Playa y Puerto Rey",
    "heroLead": "Tres mercados en un solo municipio: ciudad histórica, playa naturista de referencia europea y urbanización de lujo. Webs para inmobiliarias, hostelería, comercio y turismo internacional. Aquí tenemos nuestro estudio.",
    "lugares": [
      {
        "name": "Vera Pueblo",
        "sub": "CIUDAD HISTÓRICA",
        "desc": "Comercio · servicios · residentes",
        "dato": "5.500 hab."
      },
      {
        "name": "Vera Playa",
        "sub": "COSTA NATURISTA",
        "desc": "Turismo internacional · inmobiliarias",
        "dato": "8.500 hab."
      },
      {
        "name": "Puerto Rey",
        "sub": "URBANIZACIÓN LUJO",
        "desc": "Hostelería premium · residencial",
        "dato": "3.000 hab."
      }
    ],
    "lugaresHead": {
      "h2": "Tres mercados, una sola web",
      "lead": "Cada núcleo de Vera tiene su propio público, su estrategia SEO y su arquitectura visual. Una web profesional los integra todos sin diluir el mensaje en ninguno."
    },
    "datos": [],
    "datosHead": null,
    "sectores": [
      {
        "nombre": "Inmobiliarias y Alquiler Vacacional",
        "stat": "+180% leads",
        "statLabel": "",
        "desc": "Vera Playa y Puerto Rey concentran la mayor demanda inmobiliaria del Levante. Portales de propiedades con búsqueda avanzada, galería profesional, integración con portales nacionales y captación de clientes británicos y alemanes.",
        "tags": [
          "Portales inmobiliarios",
          "Multiidioma EN/DE",
          "Integración Idealista",
          "Reservas directas"
        ]
      },
      {
        "nombre": "Hostelería y Restauración",
        "stat": "+95% reservas",
        "statLabel": "",
        "desc": "Restaurantes frente al mar, chiringuitos y hoteles boutique. Webs con carta digital, reservas online y galería de platos que atrae a turistas internacionales y residentes locales.",
        "tags": [
          "Reservas online",
          "Carta digital",
          "Google Hotel Ads",
          "Tripadvisor"
        ]
      },
      {
        "nombre": "Comercio y Tiendas Online",
        "stat": "Venta 24h",
        "statLabel": "",
        "desc": "Comercios de Vera ciudad con presencia en todo el municipio. Tiendas online rápidas, catálogos con stock en tiempo real y estrategia de captación local con Google Shopping.",
        "tags": [
          "E-commerce Astro",
          "Google Shopping",
          "Pasarela de pago",
          "Gestión stock"
        ]
      },
      {
        "nombre": "Turismo y Actividades",
        "stat": "Visibilidad",
        "statLabel": "",
        "desc": "Vera cuenta con una de las playas naturistas más grandes de Europa. Actividades náuticas, surf, buceo, rutas culturales y ecoturismo en el Parque Natural de la Sierra de Almagro.",
        "tags": [
          "Booking widget",
          "Multiidioma",
          "SEO turístico",
          "Galería 4K"
        ]
      },
      {
        "nombre": "Servicios Profesionales",
        "stat": "+60% contactos",
        "statLabel": "",
        "desc": "Clínicas, despachos, gestorías y profesionales liberales que sirven a Vera y toda la comarca. Webs que transmiten autoridad y convierten visitas en consultas cualificadas.",
        "tags": [
          "Landing de captación",
          "Formularios cualificados",
          "Google Business",
          "SEO local"
        ]
      },
      {
        "nombre": "Construcción e Industria",
        "stat": "Presencia",
        "statLabel": "",
        "desc": "Constructoras, reformas y empresas industriales del Levante. Portfolios de obras, memorias de calidad y generación de presupuestos online para diferenciarse en un sector competitivo.",
        "tags": [
          "Portfolio de obras",
          "Presupuestador online",
          "SEO local",
          "Certificaciones"
        ]
      }
    ],
    "sectoresHead": {
      "h2": "Para quién diseñamos en Vera",
      "lead": "Seis sectores que ya están vendiendo más online en Vera, Vera Playa y Puerto Rey. Cada uno con su estrategia SEO y su sistema técnico."
    },
    "diferenciales": [
      {
        "title": "Vera Playa + Puerto Rey",
        "desc": "El municipio más completo del Levante: ciudad histórica, playa naturista de referencia europea y urbanización de lujo. Tres mercados, tres estrategias SEO en una sola web."
      },
      {
        "title": "Turismo internacional",
        "desc": "Residentes y turistas de Reino Unido, Alemania, Holanda y Escandinavia. Webs multiidioma que posicionan en Google.co.uk y Google.de para captar clientes extranjeros."
      },
      {
        "title": "Economía diversificada",
        "desc": "Con 17.000 habitantes y tres núcleos diferenciados, Vera combina turismo costero, servicios urbanos y agroindustria. El potencial digital es enorme y la competencia aún baja."
      },
      {
        "title": "Capital del Levante",
        "desc": "Vera es cabecera de comarca y centro de servicios de Garrucha, Palomares y Antas. Una web bien posicionada en Vera capta clientes de todo el territorio comarcal."
      }
    ],
    "diferencialesHead": {
      "h2": "El municipio más completo del Levante",
      "lead": "Tres mercados, tres audiencias, tres estrategias SEO en una sola web. Vera ofrece un potencial digital enorme y una competencia aún baja."
    },
    "testimonios": [
      {
        "nombre": "Javier Ruiz",
        "negocio": "Inmobiliaria Vera Playa",
        "texto": "Necesitábamos captar clientes de Madrid y del Reino Unido. Nos hicieron un portal inmobiliario impecable con SEO internacional. Ahora recibimos leads diarios de compradores extranjeros."
      },
      {
        "nombre": "Elena Soto",
        "negocio": "Restaurante Puerto Rey",
        "texto": "Tengo un restaurante frente al mar y desde que pusimos la web con reservas online, gestionamos todo mucho mejor y la ocupación ha subido notablemente en temporada media."
      },
      {
        "nombre": "Antonio Gómez",
        "negocio": "Hotel Boutique Vera",
        "texto": "Entendieron la esencia de nuestro hotel en Vera Pueblo. Las fotos brillan, la navegación es rápida y las reservas directas han aumentado. El ROI fue inmediato."
      },
      {
        "nombre": "Laura Navarro",
        "negocio": "Clínica Dental Vera",
        "texto": "Nos modernizaron toda la imagen digital. El tráfico local desde Google se ha disparado y los pacientes que llegan ya vienen convencidos por lo que ven en la web."
      }
    ],
    "testimoniosHead": {
      "h2": "Negocios de Vera que ya venden más",
      "lead": "Tengo un restaurante frente al mar y desde que pusimos la web con reservas online, gestionamos todo mucho mejor y la ocupación ha subido notablemente en temporada media."
    },
    "faq": [
      {
        "q": "¿Cuánto cuesta una página web para un negocio en Vera?",
        "a": "Web corporativa profesional desde 500€, ideal para comercios, hostelería e inmobiliarias de Vera. Tiendas online y portales con reservas o pasarela de pago desde 700€. Landing de una página desde 350€. Siempre presupuesto cerrado y gratuito, sin compromiso."
      },
      {
        "q": "¿Hacéis webs para negocios en Vera Playa y Puerto Rey?",
        "a": "Sí, trabajamos en todo el término municipal de Vera: ciudad, Vera Playa y Puerto Rey. Adaptamos la estrategia SEO a la audiencia de cada núcleo — local, turista nacional o turista internacional."
      },
      {
        "q": "¿Podéis hacer la web en inglés y alemán para captar turistas?",
        "a": "Absolutamente. Especializamos webs multiidioma para inmobiliarias, hoteles y restaurantes de Vera Playa que quieren captar clientes de Reino Unido, Irlanda, Alemania y países escandinavos. Incluimos hreflang y SEO en cada idioma."
      },
      {
        "q": "¿Puedo visitar vuestro estudio en Vera?",
        "a": "Por supuesto, nuestra sede está en Ctra. de Ronda 82, Vera. L–V de 9:00 a 19:00. Si vives o trabajas en el Levante, pásate a tomar un café y hablamos de tu proyecto en persona. Sin compromiso."
      },
      {
        "q": "¿En cuánto tiempo tendré mi web lista en Vera?",
        "a": "Web corporativa estándar: 1–2 semanas. Portales inmobiliarios o tiendas online con catálogo amplio: 3–4 semanas. Te mantenemos informado en cada fase."
      },
      {
        "q": "¿Hacéis SEO local para posicionar en \"diseño web Vera\" o \"restaurante Vera Playa\"?",
        "a": "Sí, es nuestra especialidad. Optimizamos tu Google Business Profile y la arquitectura SEO para posicionarte en \"dentista Vera\", \"inmobiliaria Puerto Rey\" o \"hotel Vera Playa\"."
      },
      {
        "q": "¿Podéis integrar reservas para mi hotel o restaurante en Puerto Rey?",
        "a": "Sí. Integramos sistemas de reservas (Booking widget, sistemas propios) para que gestiones todo desde un panel sencillo sin depender de comisiones de terceros."
      },
      {
        "q": "¿Trabajáis solo en Vera o también en municipios cercanos?",
        "a": "Trabajamos en toda la comarca del Levante Almeriense: Garrucha, Mojácar, Huércal-Overa, Antas, Cuevas del Almanzora y más. Si tienes negocio en la zona, estamos cerca."
      }
    ],
    "faqHead": {
      "h2": "Lo que más nos preguntan en Vera",
      "lead": "Plazos, precios, hosting, multiidioma para turistas internacionales, visita al estudio y SEO local. Si no está aquí, escríbenos."
    },
    "extras": [],
    "ctaHead": null
  }
};
