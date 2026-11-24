import type { ContenidoServicio, Punto } from './tipos';
import type { NombreIcono } from '../../components/sitio/iconos';
import { departamentos, soluciones, metodo, faqIA } from '../ia-empresas';

const ICONOS_DEPTO: Record<string, NombreIcono> = {
  ventas: 'grafica',
  atencion: 'conversacion',
  administracion: 'documento',
  operaciones: 'ruta',
  marketing: 'estrella',
  direccion: 'maletin',
};
const ICONOS_SOLUCION: NombreIcono[] = ['documento', 'buscar', 'conversacion', 'telefono', 'maletin', 'grafica', 'pincel', 'codigo'];

const perfiles: Punto[] = departamentos.map((d) => ({
  icono: ICONOS_DEPTO[d.id] ?? 'chispa',
  t: d.nombre,
  d: d.casos.slice(0, 4).join(', ').replace(/^./, (c) => c.toUpperCase()) + '.',
}));

export const ia: ContenidoServicio = {
  ruta: '/ia-empresas/',
  nombre: 'IA para empresas',
  tipo: 'Inteligencia artificial aplicada a procesos de empresa',
  servicioContacto: 'ia',
  escena: 'ia',
  seo: {
    title: 'IA para empresas: agentes y automatización de procesos',
    description: 'Diseñamos agentes y automatizaciones de IA conectados con tu CRM, tu ERP y tus documentos para atender clientes, procesar papeles y preparar propuestas, con aprobación humana.',
  },
  portada: {
    antetitulo: 'IA para empresas',
    h1: 'IA que trabaja <span class="subrayado">dentro</span> de tu empresa',
    entradilla: 'Diseñamos agentes y automatizaciones conectados con tus datos y tus herramientas para atender clientes, procesar documentos y preparar propuestas. Una persona sigue aprobando lo que importa.',
    puntos: [
      'Empezamos por un piloto con un criterio de éxito acordado',
      'Se conecta con tu CRM, tu ERP y tus documentos',
      'Los datos y la documentación son tuyos',
    ],
  },
  paraQuien: {
    titulo: '¿Dónde se te va más tiempo?',
    entradilla: 'Tus datos ya existen. El problema es el trabajo que hay entre ellos: copiar, pegar, reenviar y acordarse. Estos son los departamentos donde más se nota.',
    perfiles,
  },
  incluye: {
    titulo: 'Sistemas con un trabajo asignado',
    entradilla: 'No vendemos «IA». Construimos piezas que hacen una tarea concreta, con acceso solo a lo que necesitan y con registro de todo lo que hacen.',
    items: soluciones.map((s, i) => ({ icono: ICONOS_SOLUCION[i] ?? 'chispa', t: s.titulo, d: s.texto })),
  },
  guia: {
    antetitulo: 'Antes de automatizar nada',
    titulo: 'Cómo saber si un proceso merece la pena',
    entradilla: 'La mayoría de las empresas tiene dos o tres procesos que cumplen estas condiciones. Ahí es donde se empieza.',
    bloques: [
      { t: 'Se repite muchas veces a la semana', d: 'Lo que pasa una vez al mes rara vez compensa. Busca lo que alguien hace a diario copiando de un sitio a otro.' },
      { t: 'Sigue unas reglas reconocibles', d: 'Si una persona nueva puede aprenderlo con un manual, un sistema también. Si depende del olfato de alguien, no.' },
      { t: 'Los datos ya existen en algún sitio', d: 'Correos, PDF, ERP o CRM. La IA trabaja con lo que hay; no inventa lo que falta.' },
      { t: 'Equivocarse se puede detectar', d: 'Hay forma de comprobar el resultado contra tus datos, o una persona lo revisa antes de que salga.' },
      { t: 'Lo importante sigue en manos humanas', d: 'Lo que sale a un cliente, mueve dinero o es difícil de deshacer pasa por una aprobación. Siempre.' },
    ],
  },
  comparativa: {
    titulo: 'Un sistema propio frente a un chat genérico',
    columnas: ['Sistema a medida', 'Chat de IA genérico'],
    filas: [
      { aspecto: 'Datos', nosotros: 'Consulta tus datos reales con permisos', otros: 'Solo lo que le pegues en la conversación' },
      { aspecto: 'Acciones', nosotros: 'Registra en el ERP, envía, agenda', otros: 'Te devuelve texto para que lo copies' },
      { aspecto: 'Control', nosotros: 'Aprobación humana y registro de todo', otros: 'Depende de quién lo use' },
      { aspecto: 'Errores', nosotros: 'Se para y avisa si falta información', otros: 'Puede inventar una respuesta' },
      { aspecto: 'Modelo', nosotros: 'Intercambiable por tarea', otros: 'El del proveedor' },
    ],
  },
  pasos: {
    titulo: 'Empezamos pequeño, medimos y crecemos',
    items: metodo.slice(0, 4).map((m) => ({ t: m.etapa, d: `${m.hace} Recibes: ${m.recibe.toLowerCase()}.`, cuando: m.dura })),
  },
  preguntas: faqIA.map((f) => ({ q: f.q, a: `<p>${f.a}</p>` })),
  enlaces: {
    titulo: 'Relacionado',
    items: [
      { nombre: 'Integración de IA en tu software', href: '/programador-web/genai/', d: 'Si ya tienes un sistema y quieres añadirle un modelo' },
      { nombre: 'Informática para empresas', href: '/informatica-empresas/', d: 'Redes, equipos y seguridad donde todo esto se apoya' },
      { nombre: 'Plan 360', href: '/plan-360/', d: 'Web e informática en un solo servicio' },
    ],
  },
  relacionados: ['informatica', 'programador', 'apps'],
  llamada: {
    titulo: 'Encuentra el primer proceso que merece la pena automatizar',
    texto: 'Cuéntanos una tarea repetitiva. Te diremos qué parte puede automatizarse y cuál debería seguir en manos de una persona. O que no merece la pena, que también pasa.',
  },
};
