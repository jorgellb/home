import type { ContenidoServicio } from './tipos';
import type { NombreIcono } from '../../components/sitio/iconos';
import { plan360, pueblosIT, HUB_IT } from '../servicios-it';

const ICONOS: NombreIcono[] = ['pantalla', 'servidor', 'calendario', 'conversacion', 'ruta', 'capas', 'escudo', 'documento', 'carrito'];

export const plan360Contenido: ContenidoServicio = {
  ruta: plan360.href,
  nombre: 'Plan 360',
  tipo: 'Web y mantenimiento informático para pymes',
  servicioContacto: 'plan-360',
  escena: 'soporte',
  seo: { title: plan360.title, description: plan360.description },
  portada: {
    antetitulo: 'Plan 360 · web + informática',
    h1: 'Tu web y tu informática, <span class="subrayado">en una sola cuota</span>',
    entradilla: `${plan360.h2}. Para pymes de hasta ${plan360.puestos} puestos en el Levante y el Almanzora: una persona responsable, una factura y nada de sorpresas.`,
    puntos: ['Web profesional incluida y mantenida', `Hasta ${plan360.puestos} puestos, servidor y red cubiertos`, 'Sin permanencia ni cuota de alta'],
  },
  paraQuien: {
    titulo: 'Para quién tiene sentido',
    perfiles: [
      { icono: 'maletin', t: 'Pymes sin informático', d: 'Dependes de los ordenadores todo el día pero no tienes a nadie que se ocupe de ellos.' },
      { icono: 'equipo', t: 'Equipos de 3 a 10 personas', d: `El plan está pensado para oficinas de hasta ${plan360.puestos} puestos con un servidor o NAS.` },
      { icono: 'ubicacion', t: 'Empresas del Levante y el Almanzora', d: `Visita el mismo día en ${pueblosIT.map((p) => p.nombre).join(', ')}.` },
    ],
  },
  incluye: {
    titulo: 'Qué incluye',
    entradilla: 'Todo lo que hace funcionar la parte tecnológica de tu empresa, cubierto por la misma cuota.',
    items: plan360.incluye.map((b, i) => ({ icono: ICONOS[i] ?? 'check', t: b.t, d: b.d })),
  },
  guia: {
    antetitulo: 'Sin letra pequeña',
    titulo: 'Lo que no incluye, dicho antes',
    entradilla: plan360.salida,
    bloques: [
      { t: 'Material y licencias', d: 'Equipos, Microsoft 365 o programas de terceros se facturan aparte. Te asesoramos en la compra y los instalamos sin coste de mano de obra.' },
      { t: 'Proyectos nuevos', d: 'Una instalación de red completa o una migración grande llevan su propio presupuesto, cerrado antes de empezar.' },
      { t: 'Visitas fuera de zona', d: 'Fuera del Levante y el Almanzora damos soporte remoto y visitas programadas.' },
    ],
  },
  comparativa: {
    titulo: 'Las alternativas, comparadas',
    columnas: ['Plan 360', 'Técnico en plantilla'],
    filas: [
      { aspecto: 'Coste', nosotros: 'Cuota fija mensual', otros: 'Sueldo completo y Seguridad Social' },
      { aspecto: 'Web', nosotros: 'Incluida y mantenida', otros: 'No suele encargarse' },
      { aspecto: 'Vacaciones y bajas', nosotros: 'Siempre hay alguien', otros: 'Sin cobertura' },
      { aspecto: 'Copias verificadas', nosotros: 'Prueba de restauración cada mes', otros: 'Depende de la persona' },
      { aspecto: 'Llamar cuando algo falla', nosotros: 'Ya incluido', otros: 'Cada visita se paga y el problema vuelve' },
    ],
  },
  pasos: {
    titulo: 'Cómo se pone en marcha',
    items: [
      { t: 'Auditoría', d: 'Revisamos equipos, red, copias y web en la primera semana.', cuando: 'Semana 1' },
      { t: 'Puesta a punto', d: 'Arreglamos lo urgente: copias, seguridad y equipos desprotegidos.', cuando: 'Semana 2' },
      { t: 'Web', d: 'Mantenemos la que tienes o, si conviene, la rehacemos dentro del plan.', cuando: 'En paralelo' },
      { t: 'Cada mes', d: 'Preventivo in situ, helpdesk ilimitado e informe mensual.', cuando: 'Continuo' },
    ],
  },
  preguntas: plan360.faq.map((f) => ({ q: f.q, a: `<p>${f.a}</p>` })),
  enlaces: {
    titulo: 'Más detalle',
    items: [
      { nombre: 'Informática para empresas', href: HUB_IT, d: 'Los cinco servicios IT por separado' },
      { nombre: 'Diseño web', href: '/desarrollo-web/', d: 'Cómo hacemos las webs' },
      { nombre: 'Mantenimiento web', href: '/soporte/', d: 'Si solo necesitas la parte web' },
    ],
  },
  relacionados: ['informatica', 'web', 'soporte'],
  llamada: { titulo: '¿Encaja el Plan 360 en tu empresa?', texto: 'Cuéntanos cuántos puestos tenéis y qué usáis. Te decimos si el plan tiene sentido o si te conviene contratar solo una parte.' },
};
