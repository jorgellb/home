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
