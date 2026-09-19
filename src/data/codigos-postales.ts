/* Código postal del núcleo principal de cada municipio Tier-1.
 *
 * PROCEDENCIA, porque estos datos hay que poder auditarlos: salen del conjunto
 * abierto `inigoflores/ds-codigos-postales-ine-es`, fichero
 * `codigos_postales_municipios_entidades.csv`, que relaciona código postal,
 * municipio del INE y núcleo de población. De los varios códigos que puede
 * tener un municipio se ha tomado el del núcleo que se llama como el municipio
 * y, cuando había más de uno, el menos compartido con otros municipios.
 *
 * Esa regla importa: coger simplemente el código más bajo daba Albox 04600,
 * que en realidad es el de Huércal-Overa. Con la regla del núcleo sale 04800,
 * que es el correcto.
 *
 * VALIDACIÓN: contrastado contra codigopostalde.es, una fuente independiente,
 * en ocho municipios (Vera, Garrucha, Albox, Purchena, Berja, Adra, Los
 * Gallardos y Almería): coinciden los ocho. Y Macael da 04867, el mismo código
 * que publica la competencia en su propia landing de Macael.
 *
 * Cuidado al ampliar: muchos municipios tienen varios códigos por sus
 * pedanías, y algunos códigos los comparten dos municipios. Si añades uno,
 * compruébalo contra una segunda fuente antes de publicarlo. Un código postal
 * equivocado en una página local es de los errores que más rápido detecta un
 * vecino, y cuesta la credibilidad de toda la página.
 *
 * Consultado el 19-09-2026.
 */
export const CODIGOS_POSTALES: Record<string, string> = {
  'adra': '04770',
  'albox': '04800',
  'almeria': '04001',
  'berja': '04760',
  'cantoria': '04850',
  'carboneras': '04140',
  'cuevas-del-almanzora': '04610',
  'el-ejido': '04700',
  'fines': '04869',
  'garrucha': '04630',
  'huercal-de-almeria': '04230',
  'huercal-overa': '04600',
  'los-gallardos': '04280',
  'macael': '04867',
  'mojacar': '04638',
  'nijar': '04100',
  'olula-del-rio': '04860',
  'pulpi': '04640',
  'purchena': '04870',
  'roquetas-de-mar': '04740',
  /* Núcleo de Pulpí con código propio. */
  'san-juan-de-los-terreros': '04648',
  'seron': '04890',
  'tabernas': '04200',
  'vera': '04620',
  'vicar': '04738',
};

/** Código postal del municipio, o null si no lo tenemos comprobado. Null es
 *  una respuesta válida: la página se escribe sin él antes que con uno dudoso. */
export const codigoPostalDe = (slug: string): string | null => CODIGOS_POSTALES[slug] ?? null;
