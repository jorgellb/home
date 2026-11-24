/* Presentación de cada comarca en el hub /diseno-web/. Texto propio, sin cifras sin fuente. */

export const COMARCAS_INFO: Record<string, { intro: string; sectores: string[] }> = {
  "Almería Metropolitana": {
    intro: "El motor económico de la provincia: la capital, su puerto y el gran polo turístico de Roquetas de Mar concentran el grueso del comercio, la hostelería y los servicios profesionales. Aquí la competencia digital es máxima, y una web rápida con SEO local bien trabajado marca la diferencia entre aparecer o desaparecer ante miles de clientes que buscan cada día.",
    sectores: ["Turismo", "Comercio", "Servicios", "Puerto"],
  },
  "Levante Almeriense": {
    intro: "La costa turística por excelencia: Mojácar, Vera, Garrucha y Pulpí viven del turismo, la hostelería y el residente extranjero, con una demanda multilingüe y muy estacional. Captar reservas, vender segunda residencia o llenar un restaurante aquí exige una web que posicione en varios idiomas y convierta al visitante en cliente antes de que llegue.",
    sectores: ["Turismo costero", "Hostelería", "Residencial", "Náutica"],
  },
  "Valle del Almanzora": {
    intro: "El gran corredor industrial del interior: Macael y Olula del Río trabajan el mármol blanco para clientes de dentro y fuera de España, mientras Albox concentra el comercio que abastece a toda la comarca. Un tejido de pymes industriales y comerciales con clientes nacionales e internacionales, donde una web profesional y multilingüe es una herramienta de venta directa, no un simple escaparate.",
    sectores: ["Mármol", "Industria", "Comercio", "Exportación"],
  },
  "Los Filabres-Tabernas": {
    intro: "Tierra de cine y cielos infinitos: el desierto de Tabernas, único de Europa, atrae rodajes y turismo, mientras los Filabres guardan el Observatorio de Calar Alto y un naciente turismo de naturaleza y astronomía. Negocios singulares con un público de nicho —turismo activo, experiencias, productos de origen— que solo encuentran a su cliente si destacan online.",
    sectores: ["Cine y turismo", "Astronomía", "Energía solar", "Naturaleza"],
  },
  "Poniente Almeriense": {
    intro: "La huerta de Europa: El Ejido, Vícar y La Mojonera concentran el mayor mar de invernaderos del mundo, un sector hortofrutícola que mueve miles de millones y exporta a todo el continente. Conviven la agroindustria exportadora y un denso tejido comercial; ambos necesitan webs corporativas serias, multilingües y orientadas a captar distribuidores y clientes.",
    sectores: ["Agricultura intensiva", "Exportación", "Agroindustria", "Comercio"],
  },
  "Alpujarra Almeriense": {
    intro: "La Almería verde y auténtica: el valle del Andarax y las laderas de Sierra Nevada ofrecen vino, aceite, frutos secos y un turismo rural en alza que huye de la masificación. Pequeños productores y casas rurales con productos de identidad única que, bien contados en una web, alcanzan al consumidor gourmet y al viajero consciente de toda España.",
    sectores: ["Turismo rural", "Vino y aceite", "Agroalimentario", "Naturaleza"],
  },
  "Alto Almanzora": {
    intro: "El nacimiento del Almanzora, entre sierras: Serón y Tíjola lideran una comarca de gastronomía con sello —el jamón de Serón es marca reconocida—, naturaleza de montaña y patrimonio. Productos agroalimentarios de calidad y turismo de interior que encuentran su mejor mercado cuando una tienda online y un buen SEO los sacan de la comarca.",
    sectores: ["Agroalimentario", "Jamón de Serón", "Turismo de interior", "Patrimonio"],
  },
  "Los Vélez": {
    intro: "El norte monumental: Vélez-Blanco y Vélez-Rubio custodian castillos renacentistas, el Parque Natural de Sierra María y el arte rupestre que dio origen al Indalo, símbolo de Almería. Una comarca de turismo cultural, naturaleza y agroalimentario de altura cuyo gran reto es la visibilidad: estar en internet es estar en el mapa del viajero.",
    sectores: ["Turismo cultural", "Naturaleza", "Patrimonio", "Agroalimentario"],
  },
};
