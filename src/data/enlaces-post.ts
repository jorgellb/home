/* Enlazado interno del blog hacia las páginas de servicio.
   Cada artículo apunta a lo que resuelve el problema del que habla: sin esto
   los posts solo enlazaban al formulario de contacto y su relevancia temática
   no llegaba a ninguna página de negocio. */
export interface EnlacePost {
  href: string;
  label: string;
  sub: string;
}

export const enlacesPorPost: Record<string, EnlacePost[]> = {
  'cuando-redisenar-pagina-web-10-senales-claras': [
    { href: '/desarrollo-web/', label: 'Diseño y desarrollo web', sub: 'Rehacemos la web con Core Web Vitals en verde' },
    { href: '/soporte/', label: 'Mantenimiento web', sub: 'Para que no vuelva a quedarse atrás' },
    { href: '/diseno-web/', label: 'Diseño web por municipio', sub: '97 localidades de Almería' },
  ],
  'hosting-web-2026-guia-brutal': [
    { href: '/desarrollo-web/', label: 'Webs estáticas con hosting incluido', sub: 'Astro sobre CDN, sin cuota anual' },
    { href: '/soporte/', label: 'Mantenimiento y copias', sub: 'Backups verificados y soporte humano' },
    { href: '/plan-360/', label: 'Plan 360', sub: 'Web, soporte e informática en una cuota' },
  ],
  'guia-legal-web-lopd-lssi-2026': [
    { href: '/desarrollo-web/', label: 'Webs con los textos legales al día', sub: 'Aviso, cookies y formularios conformes' },
    { href: '/soporte/', label: 'Mantenimiento web', sub: 'Revisión legal y técnica cada mes' },
    { href: '/informatica-empresas/ciberseguridad/', label: 'Ciberseguridad para empresas', sub: 'Copias, antivirus y control de accesos' },
  ],
  'facturacion-verifactu-2027-guia-completa': [
    { href: '/soluciones/ecommerce/', label: 'Tiendas online con VERIFACTU', sub: 'WooCommerce listo para facturar' },
    { href: '/informatica-empresas/', label: 'Sistemas IT para empresas', sub: 'Equipos, servidores y software de gestión' },
    { href: '/plan-360/', label: 'Plan 360', sub: 'Web e informática con una sola factura' },
  ],
  'tormenta-perfecta-regulatoria-cumplir-o-arriesgarse': [
    { href: '/informatica-empresas/ciberseguridad/', label: 'Ciberseguridad gestionada', sub: 'NIS2, RGPD y copias que se restauran' },
    { href: '/informatica-empresas/servidores-copias-seguridad/', label: 'Servidores y copias', sub: 'Copia 3-2-1 con restauración probada' },
    { href: '/soporte/', label: 'Mantenimiento web', sub: 'Actualizaciones y auditoría mensual' },
  ],
  'marketing-clinicas-dentales': [
    { href: '/marketing/', label: 'Marketing y SEO', sub: 'Captación medible, sin humo' },
    { href: '/marketing/auditoria/', label: 'Auditoría gratuita', sub: 'Te decimos dónde se escapa el dinero' },
    { href: '/soluciones/empresa/', label: 'Webs corporativas', sub: 'Para clínicas y empresas con varias sedes' },
  ],
  'experiencias-inmersivas-3d-webxr': [
    { href: '/laboratorio-ia/', label: 'Laboratorio de IA', sub: 'Doce demos que puedes probar' },
    { href: '/probador-virtual-ar/', label: 'Probador virtual AR', sub: 'Producto sobre el cliente, sin instalar nada' },
    { href: '/soluciones/ecommerce/', label: 'Tiendas online', sub: 'Catálogo, pasarela y 3D donde suma' },
  ],
  'tecnologias-javascript-ar-web': [
    { href: '/probador-virtual-ar/', label: 'Probador virtual AR', sub: 'La demo de este artículo, funcionando' },
    { href: '/soluciones/ecommerce/', label: 'Tiendas online', sub: 'Donde esto se convierte en ventas' },
    { href: '/ia-empresas/', label: 'IA para empresas', sub: 'Lo mismo, dentro de tu operación' },
  ],
  'web3-descentralizada-mas-alla-del-hype': [
    { href: '/ia-empresas/', label: 'IA para empresas', sub: 'Lo que sí funciona hoy, en producción' },
    { href: '/desarrollo-web/', label: 'Desarrollo web', sub: 'Tecnología elegida por criterio, no por moda' },
    { href: '/soluciones/empresa/', label: 'Proyectos corporativos', sub: 'Integraciones con lo que ya usas' },
  ],
  'astro-vs-nextjs-vs-sveltekit-2026': [
    { href: '/desarrollo-web/', label: 'Diseño y desarrollo web', sub: 'Astro, Next o WordPress según el caso' },
    { href: '/soluciones/ecommerce/', label: 'Tiendas online', sub: 'Catálogo rápido y checkout sin fricción' },
    { href: '/plan-360/', label: 'Plan 360', sub: 'Web, soporte e informática en una cuota' },
  ],
};
