/* Contenido de /informatica-empresas/<pueblo>/ (zona de visita presencial). */
import type { ContenidoPueblo } from './tipos-pueblo';
import type { NombreIcono } from '../../components/sitio/iconos';
import { pueblosIT, serviciosIT, plan360, HUB_IT, type PuebloIT } from '../servicios-it';
import { pueblos } from '../pueblos-almeria';
import { esPuebloIndexable } from '../pueblos-indexables';
import { territorioDe, BASE } from '../territorio';
import { codigoPostalDe } from '../codigos-postales';
import { rasgosDe } from '../../lib/pueblo';

const ICONOS_IT: Record<string, NombreIcono> = { helpdesk: 'conversacion', red: 'globo', servidor: 'servidor', equipo: 'pantalla', escudo: 'escudo' };
const ICONOS_SECTOR: NombreIcono[] = ['maletin', 'sol', 'tienda'];

export function contenidoITPueblo(pit: PuebloIT): ContenidoPueblo {
  const n = pit.nombre;
  const p = pueblos.find((x) => x.slug === pit.slug);
  const t = territorioDe(pit.slug);
  const cp = codigoPostalDe(pit.slug);
  const enBase = pit.slug === BASE.slug;

  const datos = [
    { k: 'Comarca', v: pit.comarca },
    ...(cp ? [{ k: 'Código postal', v: cp }] : []),
    { k: 'Desde nuestro estudio', v: enBase ? 'Aquí mismo' : t?.kmDesdeBase != null ? `${t.kmDesdeBase} km de Vera` : 'Levante y Almanzora' },
    { k: 'Visita presencial', v: 'El mismo día' },
  ];

  return {
    ruta: `${HUB_IT}${pit.slug}/`,
    seo: {
      title: `Mantenimiento informático en ${n}`,
      description: `Mantenimiento informático para empresas de ${n}: técnico in situ el mismo día, helpdesk remoto, redes wifi, servidores, copias y ciberseguridad. Sin permanencia.`,
    },
    servicio: { nombre: 'Informática para empresas', href: HUB_IT, contacto: 'informatica' },
    pueblo: {
      slug: pit.slug,
      nombre: n,
      comarca: pit.comarca,
      cp,
      km: t?.kmDesdeBase ?? null,
      rasgos: p ? rasgosDe(p) : { semilla: 3 },
    },
    migas: [{ nombre: 'Informática para empresas', href: HUB_IT }, { nombre: n }],
    portada: {
      antetitulo: `Informática para empresas · ${pit.comarca}`,
      h1: `Mantenimiento informático en ${n}`,
      entradilla: pit.intro,
      puntos: ['Técnico en tu empresa el mismo día', 'Helpdesk remoto por teléfono, WhatsApp o correo', 'Copias de seguridad verificadas cada mes'],
    },
    datos,
    sectores: {
      titulo: `Empresas de ${n} a las que damos soporte`,
      items: pit.sectores.map((s, i) => ({ icono: ICONOS_SECTOR[i] ?? 'maletin', t: s, d: 'Equipos, red, copias y seguridad adaptados a cómo trabaja este tipo de negocio.' })),
    },
    incluye: {
      titulo: `Servicios informáticos para empresas de ${n}`,
      items: serviciosIT.map((s) => ({ icono: ICONOS_IT[s.icon] ?? 'servidor', t: s.nav, d: `${s.resumen} <a href="${HUB_IT}${s.slug}/">Ver más</a>` })),
    },
    pasos: {
      titulo: 'Cómo empezamos',
      items: [
        { t: 'Auditoría inicial', d: `Visitamos tu empresa en ${n} y revisamos equipos, red, copias y seguridad.`, cuando: 'Semana 1' },
        { t: 'Propuesta cerrada', d: 'Qué urge y qué puede esperar, por escrito y sin tecnicismos.', cuando: '2-3 días' },
        { t: 'Puesta a punto', d: 'Lo crítico primero: copias, equipos sin proteger y redes mal configuradas.', cuando: '1-2 semanas' },
        { t: 'Mantenimiento', d: 'Preventivo mensual, helpdesk remoto y visita el mismo día.', cuando: 'Continuo' },
      ],
    },
    preguntas: [
      { q: `¿Tenéis técnico informático en ${n}?`, a: `<p>Sí. ${n} está dentro de nuestra zona de visita presencial: si una incidencia no se puede resolver en remoto, un técnico va a tu empresa el mismo día.</p>` },
      { q: `¿Cuánto cuesta el mantenimiento para una empresa de ${n}?`, a: '<p>Depende del número de puestos, servidores y de lo que necesites. Tras una auditoría inicial recibes una propuesta cerrada por escrito. Para pymes de hasta 10 puestos existe el <a href="/plan-360/">Plan 360</a>, que junta informática y web en una cuota fija.</p>' },
      { q: '¿Instaláis redes wifi y cableado en locales y naves?', a: '<p>Sí: estudio de cobertura, cableado estructurado, wifi profesional con red separada para clientes y cortafuegos.</p>' },
      { q: '¿Hay permanencia?', a: '<p>No. Es mes a mes. Si te vas, te entregamos el inventario, las contraseñas y la documentación de tu red.</p>' },
    ],
    enlaces: [
      {
        titulo: `Más servicios en ${n}`,
        items: [
          ...(esPuebloIndexable(pit.slug) ? [{ nombre: `Diseño web en ${n}`, href: `/diseno-web/${pit.slug}/`, d: 'Webs a medida para negocios de la zona' }] : []),
          { nombre: 'Plan 360', href: plan360.href, d: 'Web e informática en una sola cuota' },
          { nombre: 'Mantenimiento web', href: '/soporte/', d: 'Copias, seguridad y cambios en tu web' },
        ],
      },
      {
        titulo: 'También vamos in situ a',
        items: pueblosIT.filter((x) => x.slug !== pit.slug).map((x) => ({ nombre: `Informático en ${x.nombre}`, href: `${HUB_IT}${x.slug}/` })),
      },
    ],
    llamada: { titulo: `Pide una auditoría de tu informática en ${n}`, texto: 'Revisamos equipos, red, copias y seguridad en tu empresa y te decimos qué urge y qué puede esperar. Sin compromiso.' },
  };
}
