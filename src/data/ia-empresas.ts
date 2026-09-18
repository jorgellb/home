/* Contenido de /ia-empresas/. Vive aparte de la página porque el copy se revisa
   con el cliente y porque el selector de departamento lo consume tal cual. */

export interface Departamento {
  id: string;
  nombre: string;
  casos: string[];
  /* Mini-flujo del caso más representativo: entrada → herramienta → salida. */
  flujo: [string, string, string];
}

export const departamentos: Departamento[] = [
  {
    id: 'ventas', nombre: 'Ventas',
    casos: ['Calificar los leads que entran', 'Investigar la empresa que pregunta', 'Preparar la propuesta', 'Seguimiento que no se cae', 'Actualizar el CRM solo', 'Resumir llamadas y reuniones', 'Avisar de oportunidades paradas'],
    flujo: ['Petición del cliente', 'CRM + tarifas', 'Propuesta lista para revisar'],
  },
  {
    id: 'atencion', nombre: 'Atención',
    casos: ['Responder en web, WhatsApp, correo y teléfono', 'Estado de pedidos', 'Reservas y citas', 'Preguntas frecuentes con datos reales', 'Pasar a una persona cuando toca', 'Clasificar y enrutar tickets'],
    flujo: ['Mensaje del cliente', 'Pedidos + reservas', 'Respuesta con el dato real'],
  },
  {
    id: 'administracion', nombre: 'Administración',
    casos: ['Leer facturas, albaranes y pedidos', 'Extraer los datos de un PDF', 'Meterlos en el ERP', 'Clasificar documentación', 'Cotejar contra pedido y contrato', 'Preparar remesas y recordatorios'],
    flujo: ['Documento recibido', 'ERP + reglas', 'Datos registrados y cotejados'],
  },
  {
    id: 'operaciones', nombre: 'Operaciones',
    casos: ['Seguimiento de incidencias', 'Órdenes de trabajo', 'Partes y documentación', 'Informes periódicos', 'Avisos entre aplicaciones', 'Control de plazos'],
    flujo: ['Parte o incidencia', 'Planificación + histórico', 'Informe y aviso al responsable'],
  },
  {
    id: 'marketing', nombre: 'Marketing',
    casos: ['Fichas de producto y catálogo', 'Contenido con la voz de la marca', 'Traducciones y versiones', 'SEO de catálogo', 'Briefings a partir de datos', 'Análisis de resultados'],
    flujo: ['Foto o ficha en bruto', 'Catálogo + guía de marca', 'Ficha publicable en 4 idiomas'],
  },
  {
    id: 'direccion', nombre: 'Dirección',
    casos: ['Preguntar a tus datos en lenguaje normal', 'Informe ejecutivo semanal', 'Detección de desviaciones', 'Resumen de incidencias', 'Seguimiento de KPIs', 'Preparación de reuniones'],
    flujo: ['Pregunta de negocio', 'Ventas + compras + incidencias', 'Respuesta con la fuente del dato'],
  },
];

export interface Solucion { titulo: string; texto: string; chips?: string[]; href?: string; enlace?: string }

export const soluciones: Solucion[] = [
  { titulo: 'Inteligencia documental', texto: 'Lee facturas, albaranes, pedidos y contratos; extrae los datos, los valida contra tus reglas, clasifica el documento y lo mete donde vaya.' },
  { titulo: 'Copiloto de conocimiento', texto: 'Responde preguntas sobre tus procedimientos, tarifas, contratos y documentación, citando de dónde ha sacado cada dato.' },
  { titulo: 'Atención al cliente', texto: 'Atiende en web, WhatsApp, correo y voz; consulta el estado real de un pedido o una reserva y pasa a una persona cuando hace falta.', href: '/asistente-ia/', enlace: 'Probar el asistente' },
  { titulo: 'Voz', texto: 'Coge el teléfono cuando no hay nadie: reservas, citas, consultas y recados, con la información registrada donde la buscáis.', href: '/asistente-voz/', enlace: 'Hablar con la IA' },
  { titulo: 'Agente comercial', texto: 'Enriquece el lead, prioriza, prepara la propuesta, agenda el seguimiento y avisa de lo que lleva días parado.' },
  { titulo: 'Analista de datos', texto: 'Preguntas en lenguaje normal sobre tus propios datos: qué cliente ha bajado, qué producto deja menos margen, qué pasó esta semana.' },
  { titulo: 'Contenido gobernado', texto: 'Producción sujeta a tu marca, tus datos de producto, tus plantillas y un flujo de aprobación. No es escribir con un chat.' },
  { titulo: 'Aplicaciones a medida', texto: 'Cuando el proceso no cabe en ninguna herramienta del mercado, construimos la aplicación alrededor del proceso.' },
];

export const sectores: { sector: string; proceso: string }[] = [
  { sector: 'Agroalimentario', proceso: 'Albaranes de entrada de género a datos, cotejo con el pedido y aviso de desviaciones de peso o calibre.' },
  { sector: 'Industria', proceso: 'Petición de oferta, escandallo con la tarifa vigente y propuesta preparada para revisar.' },
  { sector: 'Construcción', proceso: 'Partes de obra en foto y voz convertidos en informe y actualización de la planificación.' },
  { sector: 'Distribución', proceso: 'Pedidos que entran por correo y WhatsApp, volcados al ERP con comprobación de stock.' },
  { sector: 'Turismo y alojamiento', proceso: 'Consultas de huéspedes en cuatro idiomas, con el estado real de la reserva y paso a recepción.' },
  { sector: 'Hostelería', proceso: 'Reservas por teléfono fuera de horario, confirmadas y registradas.' },
  { sector: 'Ecommerce', proceso: 'Foto de producto a ficha completa con SEO y traducciones, y probador virtual en la ficha.' },
  { sector: 'Clínicas', proceso: 'Citas, recordatorios y preguntas frecuentes, con derivación a recepción cuando hay duda.' },
  { sector: 'Despachos profesionales', proceso: 'Clasificación de documentación de clientes y extracción de datos para la gestión.' },
  { sector: 'Inmobiliario', proceso: 'Lead entrante cualificado, ficha del inmueble generada y visita agendada.' },
  { sector: 'Servicios B2B', proceso: 'Propuesta a partir del histórico del cliente y seguimiento que no se cae.' },
];

export const metodo = [
  { n: '01', etapa: 'Descubrir', hace: 'Entrevistas y observación del proceso, los datos y las herramientas.', recibe: 'Mapa de oportunidades', dura: '1-2 semanas' },
  { n: '02', etapa: 'Priorizar', hace: 'Impacto, viabilidad, riesgo, volumen y coste.', recibe: 'Lista priorizada con estimación', dura: 'Incluido' },
  { n: '03', etapa: 'Piloto', hace: 'Un proceso concreto, alcance cerrado, datos reales.', recibe: 'Sistema funcionando y criterio medido', dura: '2-4 semanas' },
  { n: '04', etapa: 'Integrar', hace: 'Conexión con tus herramientas y permisos definitivos.', recibe: 'Integraciones documentadas', dura: 'Según sistemas' },
  { n: '05', etapa: 'Evaluar', hace: 'Pruebas con casos tuyos: calidad, errores y seguridad.', recibe: 'Informe de evaluación', dura: 'Incluido' },
  { n: '06', etapa: 'Producción', hace: 'Despliegue con controles, avisos y formación.', recibe: 'Sistema en uso y equipo formado', dura: '1-2 semanas' },
  { n: '07', etapa: 'Optimizar', hace: 'Uso, calidad, coste y resultados; ajustes y nuevos flujos.', recibe: 'Revisión periódica', dura: 'Continuo' },
];

export const servicios = [
  { id: 'audit', nombre: 'AI Opportunity Audit', quien: 'No sabes por dónde empezar', hace: 'Entrevistas, mapa de procesos, datos y herramientas; priorización.', recibe: 'Informe con oportunidades priorizadas, arquitectura propuesta y hoja de ruta.', precio: 'desde —' },
  { id: 'piloto', nombre: 'Piloto', quien: 'Ya sabes qué proceso duele', hace: 'Un proceso, alcance cerrado, datos reales.', recibe: 'Sistema funcionando y medición frente al criterio acordado.', precio: 'desde —' },
  { id: 'sistema', nombre: 'Sistema', quien: 'El piloto funcionó', hace: 'Integraciones, interfaces, permisos, pruebas y formación.', recibe: 'Sistema en producción, documentado y con tu equipo formado.', precio: 'a medida' },
  { id: 'ops', nombre: 'AI Ops', quien: 'Ya tienes algo en producción', hace: 'Monitorización, evaluación, mejora y nuevos flujos.', recibe: 'Revisión periódica, informes de uso y coste, soporte.', precio: 'cuota mensual', recurrente: true },
];

export const faqIA = [
  { q: '¿La IA verá todos mis datos?', a: 'No. Cada sistema accede solo a lo que su tarea necesita, con credenciales propias que puedes revocar. El alcance se define por escrito antes de conectar nada.' },
  { q: '¿Dónde se almacena la información?', a: 'Los datos originales se quedan donde están. La lógica y el registro viven en nuestro servidor, y al proveedor del modelo solo va el texto necesario para resolver cada paso. Qué proveedor, con qué condiciones y qué sale de tu red se decide y se documenta en el diagnóstico.' },
  { q: '¿Puede conectarse con nuestro ERP?', a: 'Depende del ERP y de su versión. Miramos primero si tiene API; si no, trabajamos por fichero o base de datos. Lo confirmamos en el diagnóstico antes de comprometer nada.' },
  { q: '¿Puede equivocarse?', a: 'Sí, como cualquier sistema y como cualquier persona. Por eso hay validaciones contra tus datos, puntos de aprobación y registro de todo. Lo que no hacemos es dejar que improvise cuando le falta información: ahí se para y avisa.' },
  { q: '¿Qué tareas deberían requerir aprobación humana?', a: 'Las que salen a un cliente, las que mueven dinero y las que son difíciles de deshacer. El resto se puede automatizar del todo cuando el sistema lleva tiempo demostrando que acierta.' },
  { q: '¿Podemos empezar con un piloto?', a: 'Es lo que recomendamos: un proceso, alcance cerrado y un criterio de éxito acordado antes de empezar. Si no se cumple, no seguimos.' },
  { q: '¿Podemos usar distintos modelos de IA?', a: 'Sí. Nuestros sistemas eligen el modelo por tarea y cambian de proveedor sin rehacer el proyecto; es como funcionan las demos que puedes probar aquí mismo.' },
  { q: '¿Nos quedamos encerrados con vosotros?', a: 'Los datos son tuyos, la documentación se entrega y los modelos son intercambiables. Lo que sí necesita continuidad es el mantenimiento, igual que cualquier sistema en producción.' },
  { q: '¿Cuánto tarda un proyecto?', a: 'Un piloto suele estar funcionando en semanas, no en meses. La implantación completa depende de cuántos sistemas haya que tocar y de quién tenga que dar los permisos.' },
  { q: '¿Cómo medimos si funciona?', a: 'Con el criterio que se acuerda antes de empezar: tiempo del proceso, errores, volumen atendido o lo que aplique. Se mide antes y después.' },
  { q: '¿Qué mantenimiento necesita?', a: 'Los modelos cambian, tus procesos cambian y los costes se mueven. AI Ops se encarga de vigilarlo, evaluarlo y ajustarlo.' },
  { q: '¿Qué pasa con el RGPD y el AI Act?', a: 'Los tratamos como criterios de diseño: minimizar datos, documentar decisiones, mantener control humano y registrar lo que hace el sistema. No vendemos certificaciones ni asesoría legal: trabajamos con lo que tu asesoría necesite justificar.' },
];
