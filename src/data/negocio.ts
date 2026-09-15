/* Datos fijos del negocio reutilizados en el JSON-LD de varias páginas. */

export const SITE = 'https://platanitorico.com';

export const PROVEEDOR = {
  '@type': 'ProfessionalService',
  'name': 'Platanito Rico',
  'url': SITE,
  'telephone': '+34657085019',
  'email': 'hola@platanitorico.com',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Ctra de Ronda, 82',
    'addressLocality': 'Vera',
    'addressRegion': 'Almería',
    'postalCode': '04620',
    'addressCountry': 'ES',
  },
};

/* Cifras que la web enseña como datos. Origen: ficha de Google del estudio
   (valoración y reseñas, las mismas que el JSON-LD de la home), registro de
   proyectos entregados y año de alta (2018). Si cambian, se cambian aquí. */
export const CIFRAS = {
  valoracion: 4.9,
  numResenas: 87,
  anioFundacion: 2018,
  // Pendiente de confirmar por el usuario (15-09-2026).
  websEntregadas: 50,
  respuestaHoras: 4,
} as const;

export function aniosEnAlmeria(hoy: Date = new Date()): number {
  return hoy.getFullYear() - CIFRAS.anioFundacion;
}
