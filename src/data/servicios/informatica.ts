/* Contenido de /informatica-empresas/ (hub) y de sus cinco servicios,
   construido a partir de src/data/servicios-it.ts. */
import type { ContenidoServicio, Punto } from './tipos';
import type { NombreIcono } from '../../components/sitio/iconos';
import { serviciosIT, pueblosIT, plan360, HUB_IT, type ServicioIT } from '../servicios-it';

const ICONO_IT: Record<ServicioIT['icon'], NombreIcono> = {
  helpdesk: 'conversacion',
  red: 'globo',
  servidor: 'servidor',
  equipo: 'pantalla',
  escudo: 'escudo',
};
const ICONOS_INCLUYE: NombreIcono[] = ['check', 'reloj', 'ruta', 'llave', 'usuario', 'documento'];
const ICONOS_PERFIL: NombreIcono[] = ['maletin', 'salud', 'sol', 'tienda'];

const coberturaTexto = pueblosIT.map((p) => p.nombre).join(', ');

const pasos = [
  { t: 'Auditoría inicial', d: 'Visitamos tu empresa y revisamos equipos, red, copias y seguridad.', cuando: 'Semana 1' },
  { t: 'Propuesta cerrada', d: 'Qué urge, qué puede esperar y qué cuesta cada cosa, por escrito y sin tecnicismos.', cuando: '2-3 días' },
  { t: 'Puesta a punto', d: 'Lo crítico primero: copias que no funcionan, equipos sin proteger y redes mal configuradas.', cuando: '1-2 semanas' },
  { t: 'Mantenimiento', d: 'Preventivo mensual, helpdesk remoto y visita el mismo día cuando hace falta.', cuando: 'Continuo' },
];

const guiaBase = {
  antetitulo: 'Revísalo hoy',
  titulo: 'Cinco preguntas que deberías poder responder sobre tu informática',
  entradilla: 'Si alguna te deja dudando, tu empresa depende de la suerte más de lo que crees.',
  bloques: [
    { t: '¿Cuándo se comprobó por última vez que las copias se pueden restaurar?', d: 'Una copia que nunca se ha restaurado es una esperanza, no una copia. La regla 3-2-1: tres copias, dos soportes, una fuera de la oficina.' },
    { t: '¿Quién tiene las contraseñas del router, el correo y el dominio?', d: 'Si la respuesta es «el informático de antes» o «no lo sé», cualquier incidencia se convierte en una emergencia.' },
    { t: '¿Tiene doble factor el correo de la empresa?', d: 'Es la medida más barata y eficaz contra el robo de cuentas. Sin ella, una contraseña filtrada basta para entrar.' },
    { t: '¿Qué pasa si mañana no arranca el ordenador de facturación?', d: 'Cuánto tardarías en volver a facturar y desde dónde. Ese tiempo es lo que cuesta no tener un plan.' },
    { t: '¿Tus clientes usan la misma wifi que tus equipos?', d: 'La red de invitados debe ir separada. Si no, cualquiera en la sala de espera está en tu red de trabajo.' },
  ],
};

const enlacesCobertura = {
  titulo: 'Técnico in situ el mismo día en',
  items: pueblosIT.map((p) => ({ nombre: `Informático en ${p.nombre}`, href: `${HUB_IT}${p.slug}/`, d: p.comarca })),
};

export const informaticaHub: ContenidoServicio = {
  ruta: HUB_IT,
  nombre: 'Informática para empresas',
  tipo: 'Mantenimiento informático',
  servicioContacto: 'informatica',
  escena: 'informatica',
  seo: {
    title: 'Mantenimiento informático para empresas en Almería',
    description: 'Redes, servidores, copias, ordenadores y ciberseguridad para empresas de Almería, con técnico in situ el mismo día en el Levante y el Almanzora. Sin permanencia.',
  },
  portada: {
    antetitulo: 'Informática para empresas',
    h1: 'Tu departamento de informática, <span class="subrayado">sin contratarlo</span>',
    entradilla: 'Nos ocupamos de lo que hace funcionar tu oficina: ordenadores, red, servidores, copias y seguridad. Un solo interlocutor, helpdesk remoto y técnico en tu puerta el mismo día en el Levante y el Almanzora.',
    puntos: ['Visita el mismo día en 10 municipios', 'Copias de seguridad verificadas cada mes', 'Sin permanencia: mes a mes'],
  },
  paraQuien: {
    titulo: 'Empresas con las que trabajamos',
    perfiles: [
      { icono: 'maletin', t: 'Gestorías y despachos', d: 'Datos de clientes que no se pueden perder, plazos que no esperan y programas de gestión que tienen que funcionar.' },
      { icono: 'salud', t: 'Clínicas', d: 'Historias clínicas protegidas, citas que no se caen y equipos de recepción siempre listos.' },
      { icono: 'sol', t: 'Hoteles y hostelería', d: 'Wifi para clientes que llega a todas partes, TPV fiables y reservas a salvo en plena temporada.' },
      { icono: 'fabrica', t: 'Industria y almacenes', d: 'Redes que cubren naves, equipos que aguantan el polvo y copias de la facturación.' },
    ],
  },
  incluye: {
    titulo: 'Cinco servicios, un solo responsable',
    items: serviciosIT.map((s) => ({ icono: ICONO_IT[s.icon], t: s.nav, d: `${s.resumen} <a href="${HUB_IT}${s.slug}/">Ver más</a>` })),
  },
  guia: guiaBase,
  pasos: { titulo: 'Cómo empezamos a cuidar tu informática', items: pasos },
  enlaces: enlacesCobertura,
  preguntas: [
    ...serviciosIT[0].faq.slice(0, 3),
    serviciosIT[2].faq[2],
    serviciosIT[4].faq[0],
  ].map((f) => ({ q: f.q, a: `<p>${f.a}</p>` })),
  relacionados: ['soporte', 'ia', 'web'],
  llamada: { titulo: 'Pide una auditoría inicial de tu informática', texto: `Visitamos tu empresa, revisamos equipos, red, copias y seguridad, y te decimos qué urge y qué puede esperar. Visita presencial en ${coberturaTexto}.` },
};

export function contenidoServicioIT(s: ServicioIT): ContenidoServicio {
  const perfiles: Punto[] = s.paraQuien.map((p, i) => ({ icono: ICONOS_PERFIL[i] ?? 'maletin', t: p, d: s.dolores[i] ? `Lo que solemos encontrar: ${s.dolores[i].charAt(0).toLowerCase()}${s.dolores[i].slice(1)}.` : '' }));
  return {
    ruta: `${HUB_IT}${s.slug}/`,
    nombre: s.nav,
    tipo: s.nav,
    servicioContacto: 'informatica',
    escena: 'informatica',
    migas: [{ nombre: 'Informática para empresas', href: HUB_IT }, { nombre: s.nav }],
    seo: { title: `${s.title} en Almería`, description: s.description },
    portada: {
      antetitulo: `Informática para empresas · ${s.nav}`,
      h1: s.h1,
      entradilla: s.intro,
      puntos: [s.h2, 'Sin permanencia: mes a mes'],
    },
    paraQuien: { titulo: 'Para quién es y qué solemos encontrar', perfiles },
    incluye: {
      titulo: `${s.nav}: qué incluye`,
      items: s.incluye.map((b, i) => ({ icono: ICONOS_INCLUYE[i] ?? 'check', t: b.t, d: b.d })),
    },
    guia: guiaBase,
    pasos: { titulo: 'Cómo empezamos', items: pasos },
    enlaces: {
      titulo: 'Otros servicios informáticos',
      items: [
        ...serviciosIT.filter((x) => x.slug !== s.slug).map((x) => ({ nombre: x.nav, href: `${HUB_IT}${x.slug}/`, d: x.resumen })),
        { nombre: 'Plan 360', href: plan360.href, d: 'Web e informática en una sola cuota' },
      ],
    },
    preguntas: s.faq.map((f) => ({ q: f.q, a: `<p>${f.a}</p>` })),
    relacionados: ['soporte', 'ia', 'web'],
  };
}
