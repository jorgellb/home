// Lista completa de pueblos de la provincia de Almería
// Datos para SEO local: diseño web + pueblo

export interface Pueblo {
  slug: string;
  nombre: string;
  comarca: string;
  poblacion?: number;
  destacado?: boolean;
  descripcion: string;
  caracteristicas: string[];
}

export const comarcas = [
  'Almería Metropolitana',
  'Levante Almeriense',
  'Valle del Almanzora',
  'Los Filabres-Tabernas',
  'Poniente Almeriense',
  'Alpujarra Almeriense',
  'Alto Almanzora',
  'Los Vélez'
] as const;

export const pueblos: Pueblo[] = [
  // ALMERÍA METROPOLITANA
  { slug: 'almeria', nombre: 'Almería', comarca: 'Almería Metropolitana', poblacion: 199753, destacado: true, descripcion: 'Capital de la provincia, ciudad mediterránea con rica historia fenicia y árabe', caracteristicas: ['Alcazaba', 'Puerto comercial', 'Turismo', 'Universidad'] },
  { slug: 'roquetas-de-mar', nombre: 'Roquetas de Mar', comarca: 'Almería Metropolitana', poblacion: 97000, destacado: true, descripcion: 'Principal destino turístico de la Costa de Almería con playas de bandera azul', caracteristicas: ['Playas', 'Turismo', 'Agricultura', 'Golf'] },
  { slug: 'vicar', nombre: 'Vícar', comarca: 'Almería Metropolitana', poblacion: 26000, descripcion: 'Municipio en expansión con importante sector agrícola y comercial', caracteristicas: ['Agricultura', 'Comercio', 'Industria'] },
  { slug: 'huercal-de-almeria', nombre: 'Huércal de Almería', comarca: 'Almería Metropolitana', poblacion: 18000, descripcion: 'Municipio residencial conectado con la capital almeriense', caracteristicas: ['Residencial', 'Comercio', 'Servicios'] },
  { slug: 'nijar', nombre: 'Níjar', comarca: 'Almería Metropolitana', poblacion: 31000, destacado: true, descripcion: 'Parque Natural Cabo de Gata-Níjar, playas vírgenes y artesanía tradicional', caracteristicas: ['Cabo de Gata', 'Artesanía', 'Turismo rural', 'Playas vírgenes'] },
  { slug: 'pechina', nombre: 'Pechina', comarca: 'Almería Metropolitana', poblacion: 4000, descripcion: 'Antiguo asentamiento árabe con baños termales históricos', caracteristicas: ['Baños árabes', 'Historia', 'Agricultura'] },
  { slug: 'gador', nombre: 'Gádor', comarca: 'Almería Metropolitana', poblacion: 3200, descripcion: 'Pueblo de tradición agrícola en la vega del río Andarax', caracteristicas: ['Agricultura', 'Vega del Andarax', 'Tradición'] },
  { slug: 'rioja', nombre: 'Rioja', comarca: 'Almería Metropolitana', poblacion: 1200, descripcion: 'Pequeño municipio con encanto rural y tradiciones agrícolas', caracteristicas: ['Agricultura', 'Rural', 'Tradiciones'] },
  { slug: 'benahadux', nombre: 'Benahadux', comarca: 'Almería Metropolitana', poblacion: 5000, descripcion: 'Municipio residencial con buenas comunicaciones y servicios', caracteristicas: ['Residencial', 'Servicios', 'Comunicaciones'] },
  { slug: 'santa-fe-de-mondujar', nombre: 'Santa Fe de Mondújar', comarca: 'Almería Metropolitana', poblacion: 500, descripcion: 'Pequeño pueblo con yacimiento arqueológico de Los Millares', caracteristicas: ['Los Millares', 'Arqueología', 'Historia'] },
  
  // LEVANTE ALMERIENSE
  { slug: 'vera', nombre: 'Vera', comarca: 'Levante Almeriense', poblacion: 17000, destacado: true, descripcion: 'Ciudad histórica con playas naturistas y turismo de calidad', caracteristicas: ['Playas', 'Historia', 'Turismo', 'Gastronomía'] },
  { slug: 'mojacar', nombre: 'Mojácar', comarca: 'Levante Almeriense', poblacion: 8000, destacado: true, descripcion: 'Pueblo blanco emblemático, uno de los más bonitos de España', caracteristicas: ['Pueblo blanco', 'Turismo', 'Playas', 'Cultura'] },
  { slug: 'garrucha', nombre: 'Garrucha', comarca: 'Levante Almeriense', poblacion: 9000, descripcion: 'Puerto pesquero famoso por su gamba roja y tradición marinera', caracteristicas: ['Puerto pesquero', 'Gamba roja', 'Gastronomía', 'Playas'] },
  { slug: 'cuevas-del-almanzora', nombre: 'Cuevas del Almanzora', comarca: 'Levante Almeriense', poblacion: 15000, descripcion: 'Rica historia minera y castillo del Marqués de los Vélez', caracteristicas: ['Historia minera', 'Castillo', 'Playas', 'Cultura'] },
  { slug: 'pulpi', nombre: 'Pulpí', comarca: 'Levante Almeriense', poblacion: 10000, descripcion: 'Geoda gigante de Pulpí, maravilla geológica única en el mundo', caracteristicas: ['Geoda gigante', 'Minería', 'Playas', 'Turismo'] },
  { slug: 'huercal-overa', nombre: 'Huércal-Overa', comarca: 'Levante Almeriense', poblacion: 19000, destacado: true, descripcion: 'Centro comercial y de servicios del Levante Almeriense', caracteristicas: ['Comercio', 'Servicios', 'Agricultura', 'Ganadería'] },
  { slug: 'los-gallardos', nombre: 'Los Gallardos', comarca: 'Levante Almeriense', poblacion: 3500, descripcion: 'Municipio agrícola con comunidad internacional creciente', caracteristicas: ['Agricultura', 'Residencial', 'Internacional'] },
  { slug: 'turre', nombre: 'Turre', comarca: 'Levante Almeriense', poblacion: 4000, descripcion: 'Pueblo tradicional cerca de Mojácar con encanto rural', caracteristicas: ['Rural', 'Tradición', 'Sierra Cabrera'] },
  { slug: 'bedar', nombre: 'Bédar', comarca: 'Levante Almeriense', poblacion: 1000, descripcion: 'Pueblo de montaña con pasado minero y vistas espectaculares', caracteristicas: ['Minería histórica', 'Montaña', 'Vistas', 'Senderismo'] },
  { slug: 'antas', nombre: 'Antas', comarca: 'Levante Almeriense', poblacion: 4000, descripcion: 'Yacimiento arqueológico de El Argar, cuna de la cultura argárica', caracteristicas: ['El Argar', 'Arqueología', 'Agricultura', 'Historia'] },
  { slug: 'carboneras', nombre: 'Carboneras', comarca: 'Levante Almeriense', poblacion: 8000, descripcion: 'Playas del Parque Natural Cabo de Gata y tradición pesquera', caracteristicas: ['Cabo de Gata', 'Pesca', 'Playas vírgenes', 'Turismo'] },
  { slug: 'san-juan-de-los-terreros', nombre: 'San Juan de los Terreros', comarca: 'Levante Almeriense', poblacion: 2000, descripcion: 'Localidad costera con castillo y playas tranquilas', caracteristicas: ['Castillo', 'Playas', 'Turismo familiar'] },
  { slug: 'villaricos', nombre: 'Villaricos', comarca: 'Levante Almeriense', poblacion: 1500, descripcion: 'Pueblo costero con ruinas fenicias y puerto deportivo', caracteristicas: ['Historia fenicia', 'Puerto', 'Playas'] },
  
  // VALLE DEL ALMANZORA
  { slug: 'albox', nombre: 'Albox', comarca: 'Valle del Almanzora', poblacion: 12000, destacado: true, descripcion: 'Centro comercial del Valle del Almanzora con mercado tradicional', caracteristicas: ['Mercado', 'Comercio', 'Mármol', 'Servicios'] },
  { slug: 'zurgena', nombre: 'Zurgena', comarca: 'Valle del Almanzora', poblacion: 3500, descripcion: 'Pueblo tranquilo con comunidad internacional y buen clima', caracteristicas: ['Residencial', 'Internacional', 'Agricultura'] },
  { slug: 'arboleas', nombre: 'Arboleas', comarca: 'Valle del Almanzora', poblacion: 5000, descripcion: 'Municipio multicultural con importante comunidad británica', caracteristicas: ['Multicultural', 'Residencial', 'Servicios'] },
  { slug: 'partaloa', nombre: 'Partaloa', comarca: 'Valle del Almanzora', poblacion: 800, descripcion: 'Pequeño pueblo con tradición agrícola y ganadera', caracteristicas: ['Agricultura', 'Ganadería', 'Rural'] },
  { slug: 'cantoria', nombre: 'Cantoria', comarca: 'Valle del Almanzora', poblacion: 4000, descripcion: 'Conocido por su industria del mármol y canteras', caracteristicas: ['Mármol', 'Canteras', 'Industria'] },
  { slug: 'fines', nombre: 'Fines', comarca: 'Valle del Almanzora', poblacion: 2500, descripcion: 'Centro de la industria del mármol almeriense', caracteristicas: ['Mármol', 'Industria', 'Comercio'] },
  { slug: 'olula-del-rio', nombre: 'Olula del Río', comarca: 'Valle del Almanzora', poblacion: 7000, descripcion: 'Capital del mármol con importante actividad industrial', caracteristicas: ['Mármol', 'Industria', 'Ciudad del Mármol'] },
  { slug: 'macael', nombre: 'Macael', comarca: 'Valle del Almanzora', poblacion: 6000, destacado: true, descripcion: 'Mármol blanco Macael, usado en la Alhambra y monumentos mundiales', caracteristicas: ['Mármol blanco', 'Canteras', 'Historia', 'Industria'] },
  { slug: 'purchena', nombre: 'Purchena', comarca: 'Valle del Almanzora', poblacion: 2000, descripcion: 'Antiguo centro histórico del Valle del Almanzora', caracteristicas: ['Historia', 'Agricultura', 'Tradición'] },
  { slug: 'oria', nombre: 'Oria', comarca: 'Valle del Almanzora', poblacion: 2500, descripcion: 'Pueblo de montaña con castillo y tradiciones ancestrales', caracteristicas: ['Castillo', 'Montaña', 'Tradiciones'] },
  { slug: 'albanchez', nombre: 'Albánchez', comarca: 'Valle del Almanzora', poblacion: 800, descripcion: 'Pequeño pueblo con encanto rural y paisajes de montaña', caracteristicas: ['Rural', 'Montaña', 'Paisajes'] },
  { slug: 'lucar', nombre: 'Lúcar', comarca: 'Valle del Almanzora', poblacion: 1000, descripcion: 'Pueblo tradicional con arquitectura popular almeriense', caracteristicas: ['Arquitectura', 'Tradición', 'Rural'] },
  { slug: 'somontin', nombre: 'Somontín', comarca: 'Valle del Almanzora', poblacion: 500, descripcion: 'Pequeño municipio de montaña con aire puro y tranquilidad', caracteristicas: ['Montaña', 'Naturaleza', 'Tranquilidad'] },
  { slug: 'urracal', nombre: 'Urracal', comarca: 'Valle del Almanzora', poblacion: 400, descripcion: 'Uno de los pueblos más pequeños con encanto auténtico', caracteristicas: ['Auténtico', 'Rural', 'Tradición'] },
  { slug: 'lijar', nombre: 'Líjar', comarca: 'Valle del Almanzora', poblacion: 600, descripcion: 'Famoso por su declaración de guerra a Francia en 1883', caracteristicas: ['Historia curiosa', 'Rural', 'Tradición'] },
  { slug: 'chercos', nombre: 'Chercos', comarca: 'Valle del Almanzora', poblacion: 300, descripcion: 'Pueblo pequeño con tradición alfarera histórica', caracteristicas: ['Alfarería', 'Artesanía', 'Tradición'] },
  { slug: 'cobdar', nombre: 'Cóbdar', comarca: 'Valle del Almanzora', poblacion: 200, descripcion: 'Municipio de montaña con vistas al Valle del Almanzora', caracteristicas: ['Montaña', 'Vistas', 'Rural'] },
  { slug: 'seron', nombre: 'Serón', comarca: 'Valle del Almanzora', poblacion: 2500, destacado: true, descripcion: 'Jamón de Serón con denominación, castillo nazarí y naturaleza', caracteristicas: ['Jamón de Serón', 'Castillo', 'Gastronomía', 'Sierra de los Filabres'] },
  { slug: 'tijola', nombre: 'Tíjola', comarca: 'Valle del Almanzora', poblacion: 4000, descripcion: 'Centro de servicios del alto Almanzora con baños árabes', caracteristicas: ['Baños árabes', 'Servicios', 'Historia'] },
  { slug: 'sufli', nombre: 'Suflí', comarca: 'Valle del Almanzora', poblacion: 300, descripcion: 'Pequeño pueblo con tradición agrícola mediterránea', caracteristicas: ['Agricultura', 'Rural', 'Tradición'] },
  { slug: 'laroya', nombre: 'Laroya', comarca: 'Valle del Almanzora', poblacion: 200, descripcion: 'Municipio de montaña en la Sierra de los Filabres', caracteristicas: ['Sierra de los Filabres', 'Montaña', 'Naturaleza'] },
  { slug: 'bacares', nombre: 'Bacares', comarca: 'Valle del Almanzora', poblacion: 300, descripcion: 'Pueblo de montaña con minas de hierro históricas', caracteristicas: ['Minería', 'Montaña', 'Historia'] },
  { slug: 'bayarque', nombre: 'Bayarque', comarca: 'Valle del Almanzora', poblacion: 200, descripcion: 'Pequeño municipio rural con paisajes de sierra', caracteristicas: ['Rural', 'Sierra', 'Tranquilidad'] },
  
  // LOS FILABRES-TABERNAS
  { slug: 'tabernas', nombre: 'Tabernas', comarca: 'Los Filabres-Tabernas', poblacion: 4000, destacado: true, descripcion: 'Desierto de Tabernas, escenario de películas del oeste y Hollywood', caracteristicas: ['Desierto', 'Cine western', 'Mini Hollywood', 'Turismo'] },
  { slug: 'sorbas', nombre: 'Sorbas', comarca: 'Los Filabres-Tabernas', poblacion: 3000, descripcion: 'Cuevas de Sorbas y arquitectura colgante sobre el barranco', caracteristicas: ['Cuevas de yeso', 'Arquitectura', 'Espeleología', 'Alfar'] },
  { slug: 'uleila-del-campo', nombre: 'Uleila del Campo', comarca: 'Los Filabres-Tabernas', poblacion: 1000, descripcion: 'Pueblo agrícola con tradición de cultivo de cereal', caracteristicas: ['Agricultura', 'Cereal', 'Rural'] },
  { slug: 'lucainena-de-las-torres', nombre: 'Lucainena de las Torres', comarca: 'Los Filabres-Tabernas', poblacion: 600, descripcion: 'Uno de los pueblos más bonitos de España con vía verde', caracteristicas: ['Vía verde', 'Pueblo bonito', 'Minería', 'Turismo rural'] },
  { slug: 'tahal', nombre: 'Tahal', comarca: 'Los Filabres-Tabernas', poblacion: 400, descripcion: 'Pueblo de montaña en la Sierra de los Filabres', caracteristicas: ['Sierra de los Filabres', 'Montaña', 'Rural'] },
  { slug: 'alcudia-de-monteagud', nombre: 'Alcudia de Monteagud', comarca: 'Los Filabres-Tabernas', poblacion: 150, descripcion: 'Pequeño municipio con encanto rural auténtico', caracteristicas: ['Rural', 'Auténtico', 'Tranquilidad'] },
  { slug: 'benizalon', nombre: 'Benizalón', comarca: 'Los Filabres-Tabernas', poblacion: 300, descripcion: 'Pueblo tradicional con arquitectura popular', caracteristicas: ['Arquitectura', 'Tradición', 'Rural'] },
  { slug: 'benitagla', nombre: 'Benitagla', comarca: 'Los Filabres-Tabernas', poblacion: 100, descripcion: 'Uno de los municipios más pequeños de Almería', caracteristicas: ['Pequeño', 'Rural', 'Auténtico'] },
  { slug: 'senes', nombre: 'Senés', comarca: 'Los Filabres-Tabernas', poblacion: 300, descripcion: 'Pueblo de montaña con tradiciones agrícolas', caracteristicas: ['Montaña', 'Agricultura', 'Tradición'] },
  { slug: 'velefique', nombre: 'Velefique', comarca: 'Los Filabres-Tabernas', poblacion: 300, descripcion: 'Pueblo en la ladera de la Sierra de los Filabres', caracteristicas: ['Sierra', 'Montaña', 'Paisajes'] },
  { slug: 'castro-de-filabres', nombre: 'Castro de Filabres', comarca: 'Los Filabres-Tabernas', poblacion: 150, descripcion: 'Municipio de montaña con observatorio astronómico cercano', caracteristicas: ['Astronomía', 'Montaña', 'Cielos limpios'] },
  { slug: 'gergal', nombre: 'Gérgal', comarca: 'Los Filabres-Tabernas', poblacion: 1000, descripcion: 'Observatorio de Calar Alto y castillo renacentista', caracteristicas: ['Observatorio', 'Castillo', 'Astronomía', 'Ciencia'] },
  { slug: 'nacimiento', nombre: 'Nacimiento', comarca: 'Los Filabres-Tabernas', poblacion: 600, descripcion: 'Nacimiento del río Nacimiento en Sierra Nevada', caracteristicas: ['Río', 'Sierra Nevada', 'Naturaleza'] },
  { slug: 'las-tres-villas', nombre: 'Las Tres Villas', comarca: 'Los Filabres-Tabernas', poblacion: 700, descripcion: 'Unión de tres núcleos: Doña María, Ocaña y Escúchagranos', caracteristicas: ['Tres núcleos', 'Rural', 'Tradición'] },
  { slug: 'abla', nombre: 'Abla', comarca: 'Los Filabres-Tabernas', poblacion: 1500, descripcion: 'Antigua ciudad romana de Alba con restos arqueológicos', caracteristicas: ['Roma', 'Arqueología', 'Historia'] },
  { slug: 'abrucena', nombre: 'Abrucena', comarca: 'Los Filabres-Tabernas', poblacion: 1300, descripcion: 'Puerta de Sierra Nevada almeriense con paisajes de montaña', caracteristicas: ['Sierra Nevada', 'Montaña', 'Naturaleza'] },
  { slug: 'finana', nombre: 'Fiñana', comarca: 'Los Filabres-Tabernas', poblacion: 2500, descripcion: 'Castillo árabe y tradición agrícola de secano', caracteristicas: ['Castillo', 'Agricultura', 'Historia árabe'] },
  
  // PONIENTE ALMERIENSE
  { slug: 'el-ejido', nombre: 'El Ejido', comarca: 'Poniente Almeriense', poblacion: 85000, destacado: true, descripcion: 'Capital europea de la agricultura intensiva bajo plástico', caracteristicas: ['Agricultura intensiva', 'Invernaderos', 'Exportación', 'Comercio'] },
  { slug: 'adra', nombre: 'Adra', comarca: 'Poniente Almeriense', poblacion: 25000, destacado: true, descripcion: 'Ciudad fenicia con puerto pesquero y tradición conservera', caracteristicas: ['Puerto pesquero', 'Historia fenicia', 'Conservas', 'Playas'] },
  { slug: 'berja', nombre: 'Berja', comarca: 'Poniente Almeriense', poblacion: 15000, descripcion: 'Tradición vinícola, uva de mesa y patrimonio histórico', caracteristicas: ['Vino', 'Uva de mesa', 'Patrimonio', 'Agricultura'] },
  { slug: 'dalias', nombre: 'Dalías', comarca: 'Poniente Almeriense', poblacion: 4500, descripcion: 'Pueblo tradicional con arquitectura popular andaluza', caracteristicas: ['Arquitectura', 'Tradición', 'Agricultura'] },
  { slug: 'la-mojonera', nombre: 'La Mojonera', comarca: 'Poniente Almeriense', poblacion: 9000, descripcion: 'Municipio agrícola con importante sector de invernaderos', caracteristicas: ['Invernaderos', 'Agricultura', 'Comercio'] },
  { slug: 'felix', nombre: 'Félix', comarca: 'Poniente Almeriense', poblacion: 700, descripcion: 'Pueblo de montaña con vistas al mar y Sierra de Gádor', caracteristicas: ['Montaña', 'Vistas', 'Rural'] },
  { slug: 'enix', nombre: 'Enix', comarca: 'Poniente Almeriense', poblacion: 500, descripcion: 'Pequeño municipio de montaña con tradiciones agrícolas', caracteristicas: ['Montaña', 'Agricultura', 'Tradición'] },
  { slug: 'balanegra', nombre: 'Balanegra', comarca: 'Poniente Almeriense', poblacion: 3000, descripcion: 'Localidad costera con playas y tradición agrícola', caracteristicas: ['Playas', 'Agricultura', 'Costa'] },
  { slug: 'balerma', nombre: 'Balerma', comarca: 'Poniente Almeriense', poblacion: 4000, descripcion: 'Núcleo costero con playas y actividad pesquera', caracteristicas: ['Playas', 'Pesca', 'Turismo'] },
  
  // ALPUJARRA ALMERIENSE
  { slug: 'laujar-de-andarax', nombre: 'Láujar de Andarax', comarca: 'Alpujarra Almeriense', poblacion: 1800, destacado: true, descripcion: 'Capital de la Alpujarra almeriense con nacimiento del Andarax', caracteristicas: ['Alpujarra', 'Río Andarax', 'Vino', 'Turismo rural'] },
  { slug: 'fondon', nombre: 'Fondón', comarca: 'Alpujarra Almeriense', poblacion: 1000, descripcion: 'Pueblo alpujarreño con tradición vinícola', caracteristicas: ['Alpujarra', 'Vino', 'Tradición'] },
  { slug: 'padules', nombre: 'Padules', comarca: 'Alpujarra Almeriense', poblacion: 500, descripcion: 'Pueblo blanco con piscinas naturales y cascadas', caracteristicas: ['Piscinas naturales', 'Cascadas', 'Turismo rural'] },
  { slug: 'almocita', nombre: 'Almócita', comarca: 'Alpujarra Almeriense', poblacion: 200, descripcion: 'Pueblo ecológico pionero en sostenibilidad', caracteristicas: ['Ecológico', 'Sostenible', 'Rural'] },
  { slug: 'beires', nombre: 'Beires', comarca: 'Alpujarra Almeriense', poblacion: 150, descripcion: 'Pequeño pueblo con arquitectura alpujarreña tradicional', caracteristicas: ['Arquitectura', 'Alpujarra', 'Tradición'] },
  { slug: 'canjayar', nombre: 'Canjáyar', comarca: 'Alpujarra Almeriense', poblacion: 1500, descripcion: 'Centro de la Alpujarra con tradición vinícola', caracteristicas: ['Vino', 'Alpujarra', 'Comercio'] },
  { slug: 'ohanes', nombre: 'Ohanes', comarca: 'Alpujarra Almeriense', poblacion: 700, descripcion: 'Famoso por su uva de Ohanes, denominación histórica', caracteristicas: ['Uva de Ohanes', 'Viticultura', 'Historia'] },
  { slug: 'paterna-del-rio', nombre: 'Paterna del Río', comarca: 'Alpujarra Almeriense', poblacion: 400, descripcion: 'Pueblo de montaña con tradiciones alpujarreñas', caracteristicas: ['Alpujarra', 'Montaña', 'Tradición'] },
  { slug: 'bayarcal', nombre: 'Bayárcal', comarca: 'Alpujarra Almeriense', poblacion: 350, descripcion: 'Pueblo más alto de la provincia con nieve en invierno', caracteristicas: ['Montaña', 'Nieve', 'Altitud'] },
  { slug: 'alcolea', nombre: 'Alcolea', comarca: 'Alpujarra Almeriense', poblacion: 900, descripcion: 'Pueblo con arquitectura popular y tradición agrícola', caracteristicas: ['Arquitectura', 'Agricultura', 'Alpujarra'] },
  { slug: 'ragol', nombre: 'Rágol', comarca: 'Alpujarra Almeriense', poblacion: 400, descripcion: 'Pueblo tradicional en el valle del Andarax', caracteristicas: ['Valle del Andarax', 'Tradición', 'Rural'] },
  { slug: 'instincion', nombre: 'Instinción', comarca: 'Alpujarra Almeriense', poblacion: 500, descripcion: 'Pueblo con restos de castillo y tradición agrícola', caracteristicas: ['Castillo', 'Agricultura', 'Historia'] },
  { slug: 'illar', nombre: 'Íllar', comarca: 'Alpujarra Almeriense', poblacion: 400, descripcion: 'Pueblo del valle del Andarax con cultivos tradicionales', caracteristicas: ['Valle del Andarax', 'Agricultura', 'Tradición'] },
  { slug: 'bentarique', nombre: 'Bentarique', comarca: 'Alpujarra Almeriense', poblacion: 250, descripcion: 'Pequeño pueblo con encanto rural alpujarreño', caracteristicas: ['Alpujarra', 'Rural', 'Encanto'] },
  { slug: 'alhama-de-almeria', nombre: 'Alhama de Almería', comarca: 'Alpujarra Almeriense', poblacion: 4000, descripcion: 'Baños termales romanos y árabes, tradición balnearia', caracteristicas: ['Baños termales', 'Balneario', 'Historia', 'Salud'] },
  { slug: 'alhabia', nombre: 'Alhabia', comarca: 'Alpujarra Almeriense', poblacion: 800, descripcion: 'Pueblo con tradición de cultivo de uva de mesa', caracteristicas: ['Uva', 'Agricultura', 'Tradición'] },
  { slug: 'alsodux', nombre: 'Alsodux', comarca: 'Alpujarra Almeriense', poblacion: 150, descripcion: 'Municipio pequeño con paisajes de sierra', caracteristicas: ['Sierra', 'Paisajes', 'Rural'] },
  { slug: 'terque', nombre: 'Terque', comarca: 'Alpujarra Almeriense', poblacion: 400, descripcion: 'Museo etnográfico y tradición de uva de embarque', caracteristicas: ['Museo', 'Uva', 'Etnografía'] },
  { slug: 'santa-cruz-de-marchena', nombre: 'Santa Cruz de Marchena', comarca: 'Alpujarra Almeriense', poblacion: 200, descripcion: 'Pequeño pueblo con arquitectura tradicional', caracteristicas: ['Arquitectura', 'Tradición', 'Rural'] },
  { slug: 'huecija', nombre: 'Huécija', comarca: 'Alpujarra Almeriense', poblacion: 500, descripcion: 'Pueblo en el valle del Andarax con cultivos de uva', caracteristicas: ['Uva', 'Valle del Andarax', 'Agricultura'] },
  
  // LOS VÉLEZ
  { slug: 'velez-rubio', nombre: 'Vélez-Rubio', comarca: 'Los Vélez', poblacion: 7000, destacado: true, descripcion: 'Capital de la comarca con iglesia de la Encarnación barroca', caracteristicas: ['Barroco', 'Patrimonio', 'Comercio', 'Servicios'] },
  { slug: 'velez-blanco', nombre: 'Vélez-Blanco', comarca: 'Los Vélez', poblacion: 2000, destacado: true, descripcion: 'Castillo renacentista y Cueva de los Letreros con el Indalo', caracteristicas: ['Castillo', 'Indalo', 'Cueva de los Letreros', 'Patrimonio'] },
  { slug: 'maria', nombre: 'María', comarca: 'Los Vélez', poblacion: 1500, descripcion: 'Parque Natural Sierra de María-Los Vélez con bosques', caracteristicas: ['Parque Natural', 'Bosques', 'Senderismo', 'Naturaleza'] },
  { slug: 'chirivel', nombre: 'Chirivel', comarca: 'Los Vélez', poblacion: 2000, descripcion: 'Pueblo de altiplano con tradición agrícola y ganadera', caracteristicas: ['Altiplano', 'Agricultura', 'Ganadería'] },
  { slug: 'taberno', nombre: 'Taberno', comarca: 'Los Vélez', poblacion: 1000, descripcion: 'Pueblo tradicional con arquitectura popular', caracteristicas: ['Arquitectura', 'Tradición', 'Rural'] },
];

// Obtener pueblos por comarca
export function getPueblosByComarca(comarca: string): Pueblo[] {
  return pueblos.filter(p => p.comarca === comarca);
}

// Obtener pueblos destacados
export function getPueblosDestacados(): Pueblo[] {
  return pueblos.filter(p => p.destacado);
}

// Obtener pueblo por slug
export function getPuebloBySlug(slug: string): Pueblo | undefined {
  return pueblos.find(p => p.slug === slug);
}

// Obtener todos los slugs para generación estática
export function getAllPuebloSlugs(): string[] {
  return pueblos.map(p => p.slug);
}
