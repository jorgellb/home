/* Proyectos publicados. El campo `result` recoge datos publicados por el
   propio cliente en su web, no métricas nuestras: así no afirmamos nada que
   no puedan respaldar ellos. El orden importa: la portada mide y enseña los
   cuatro primeros. */

export interface Proyecto {
  id: string;
  /** Municipio del cliente, comprobado en el aviso legal o el schema de SU
   *  propia web, no deducido. Sin comprobar, se deja fuera: es lo que permite
   *  que una landing local cite el caso sin afirmar nada que no se sostenga. */
  municipio?: string;
  cliente: string;
  sector: string;
  result: string;
  tags: string[];
  year: string;
  url: string;
  image: string;
}

export const proyectos: Proyecto[] = [
  { id: 'juan-alcaraz', cliente: 'Juan Alcaraz', sector: 'Web · Audiovisual', result: '+25 selecciones · 6 premios', tags: ['Astro', 'Vimeo', 'Portfolio'], year: '2026', url: 'https://juanalcaraz.es/', image: '/imagenes/clientes/juan.jpg' },
  { id: 'taller-el-pinon', municipio: 'purchena', cliente: 'Taller El Piñón', sector: 'Web · Automoción', result: '+20 años de servicio', tags: ['Astro', 'SEO Local', 'Automoción'], year: '2026', url: 'https://tallerelpinon.com/', image: '/imagenes/clientes/taller.jpg' },
  { id: 'excavaciones-tripiana', municipio: 'fines', cliente: 'Excavaciones Tripiana', sector: 'Web · Mov. de tierras', result: '+20 años · maquinaria propia', tags: ['Astro', 'SEO Local', 'Obra civil'], year: '2026', url: 'https://excavacionestripiana.com/', image: '/imagenes/clientes/tripiana.jpg' },
  { id: 'clinica-koral', municipio: 'vera', cliente: 'Clínica Dental Koral', sector: 'Web · SEO', result: '+220% leads orgánicos', tags: ['Astro', 'SEO', 'Multiidioma'], year: '2024', url: 'https://clinicadentalkoral.es/', image: '/imagenes/clientes/clinica-dental-koral.jpg' },
  { id: 'murcia-production', cliente: 'Murcia Production Service', sector: 'Web · Corporativa', result: '#1 keyword sector', tags: ['Producción', 'Cine', 'AV'], year: '2025', url: 'https://murciaproductionservice.com/', image: '/imagenes/clientes/murcia-production-services.jpg' },
  { id: 'actualidad-almanzora', cliente: 'Actualidad Almanzora', sector: 'Portal Noticias', result: '+45k visitas/mes', tags: ['Noticias', 'Radio', 'Podcast'], year: '2023', url: 'https://www.actualidadalmanzora.es/', image: '/imagenes/clientes/actualidad-almanzora.jpg' },
  { id: 'oveja-bohemia', municipio: 'vera', cliente: 'Oveja Bohemia', sector: 'E-commerce', result: '+180% ventas', tags: ['WooCommerce', 'E-com', 'Branding'], year: '2024', url: 'https://ovejabohemia.com/', image: '/imagenes/clientes/oveja-bohemia.jpg' },
  { id: 'ysy', cliente: 'YSY Style Up', sector: 'Web · Diseño', result: 'Lighthouse 100', tags: ['Elementor', 'SEO', 'Moda'], year: '2024', url: 'https://ysy.es/', image: '/imagenes/clientes/ysy.es.jpg' },
  { id: 'metales-sureste', municipio: 'huercal-overa', cliente: 'Metales del Sureste', sector: 'Web · B2B', result: '+12 leads/mes', tags: ['Astro', 'SEO Local', 'B2B'], year: '2023', url: 'https://metalesdelsureste.com/', image: '/imagenes/clientes/metalesdelsureste.com.jpg' },
];
