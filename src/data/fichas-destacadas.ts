/* Fichas destacadas: combinaciones tecnología × municipio con contenido propio
 * escrito a mano, no generado a partir de los datos.
 *
 * Existen porque una landing de tecnología × municipio normal no se indexa: las
 * nueve de un mismo pueblo daban un 90 % de similitud entre sí y competían
 * contra la página de zona. Una ficha destacada se sale de esa regla porque
 * deja de ser una plantilla: trae informe propio, ejemplo trabajado y
 * decisiones de arquitectura que no salen de ninguna tabla.
 *
 * EL LISTÓN PARA AÑADIR UNA: que haya algo que contar que no esté ya en el hub
 * de la tecnología ni en la página de zona del municipio. Si al escribirla
 * sale el mismo texto con otro nombre, no es una ficha destacada: es la
 * plantilla de siempre y debe quedarse en noindex. Lo comprueba
 * `npm run audit:programadores`, que mide el HTML construido; si avisa por
 * encima del umbral, la ficha no está lista.
 *
 * Nada de lo que hay aquí afirma tener un cliente. Los ejemplos van marcados
 * como ejemplos y las cifras que aparecen en ellos son del propio ejemplo, no
 * resultados nuestros.
 */
import type { SlugTecnologia } from './tecnologias';

export interface PasoInforme {
  pregunta: string;
  porque: string;
  /** Qué mirar para responderla. Sin esto es una pregunta retórica. */
  comoSeMide: string;
}

export interface Decision {
  titulo: string;
  texto: string;
}

export interface FichaDestacada {
  tecnologia: SlugTecnologia;
  municipio: string;
  title: string;
  description: string;
  h1: string;
  entradilla: string[];
  /** El informe: la parte que se lleva puesta quien lee, la aplique con
   *  nosotros o por su cuenta. */
  informe: {
    titulo: string;
    lead: string;
    pasos: PasoInforme[];
    cierre: string;
  };
  /** Ejemplo trabajado. Va rotulado como ejemplo en la propia página: las
   *  cifras son del supuesto, no de un cliente. */
  ejemplo: {
    titulo: string;
    sector: string;
    situacion: string;
    pasos: { etiqueta: string; texto: string }[];
    resultado: string;
    aviso: string;
  };
  decisiones: Decision[];
  faq: { q: string; a: string }[];
}

export const FICHAS_DESTACADAS: FichaDestacada[] = [
  {
    tecnologia: 'python',
    municipio: 'vera',
    title: 'Programador Python en Vera: procesos de datos a medida | Platanito Rico',
    description:
      'Desarrollo Python en Vera: cuadrar reservas entre canales, cruzar cobros con '
      + 'facturas y sacar informes que hoy se montan a mano. Estudio en Vera.',
    h1: 'Desarrollo con Python en Vera',
    entradilla: [
      'El estudio está en Vera, así que esta es de las pocas páginas donde «damos servicio '
      + 'en la zona» no es una forma de hablar: es la calle de al lado. Y lo que se mueve '
      + 'aquí —alquiler vacacional, hostelería, comercio, construcción— comparte un problema '
      + 'que no se arregla con una web: el dato entra varias veces y nunca en el mismo sitio.',
      'Una recepción apunta la reserva en su sistema, el portal manda su confirmación por '
      + 'correo, el banco ingresa el cobro con otro concepto y a final de mes alguien cuadra '
      + 'las tres cosas a mano. Eso es exactamente lo que resuelve Python, y no requiere '
      + 'cambiar ninguno de los sistemas que ya usáis.',
    ],
    informe: {
      titulo: 'Antes de automatizar nada: el informe de seis preguntas',
      lead:
        'Este es el guion con el que empezamos cualquier encargo de datos, y sirve igual si '
        + 'lo aplicas por tu cuenta. La mitad de los procesos que llegan pidiendo '
        + 'automatización no la necesitan, y salir de esa conversación con un «no hace falta» '
        + 'vale más que un presupuesto.',
      pasos: [
        {
          pregunta: '¿Cuánto tiempo se va de verdad al mes?',
          porque:
            'Es la cifra que decide si merece la pena, y casi siempre se estima mal. Un '
            + 'proceso que parece media jornada suele ser dos horas, y uno que «se hace en un '
            + 'rato» resulta que se hace tres veces por semana.',
          comoSeMide:
            'Cronometrar dos veces reales, no recordar. Si son varias personas, cada una la suya.',
        },
        {
          pregunta: '¿Qué pasa cuando se hace mal?',
          porque:
            'Un descuadre que se detecta al día siguiente cuesta un rato. Uno que se detecta '
            + 'en la declaración cuesta otra cosa. El coste del error importa más que el del '
            + 'tiempo para decidir cuánto invertir.',
          comoSeMide:
            'Recordar el último fallo gordo y cuánto costó arreglarlo, incluido el tiempo de terceros.',
        },
        {
          pregunta: '¿El dato de origen es siempre igual?',
          porque:
            'Es la pregunta que más presupuestos rompe. Un fichero con la misma estructura '
            + 'cada vez es un proceso sencillo; uno donde el proveedor cambia las columnas '
            + 'cuando quiere es un proceso que hay que mantener.',
          comoSeMide:
            'Comparar el fichero de este mes con el de hace un año. Si no coinciden, ya está respondida.',
        },
        {
          pregunta: '¿Quién decide qué hacer con lo que no cuadra?',
          porque:
            'Ningún proceso automático cuadra el cien por cien. Si no hay nadie que revise '
            + 'las excepciones, el sistema acaba colando errores en silencio, que es peor que '
            + 'el trabajo manual que sustituyó.',
          comoSeMide:
            'Poner nombre y apellidos a esa persona. Si no hay nombre, el proceso no está listo.',
        },
        {
          pregunta: '¿Hace falta que corra solo o basta con lanzarlo?',
          porque:
            'Un proceso mensual que alguien ejecuta a mano no necesita servidor y cuesta una '
            + 'fracción. La automatización completa se paga en infraestructura y mantenimiento, '
            + 'y muchas veces no aporta nada sobre pulsar un botón.',
          comoSeMide:
            'Mirar la frecuencia real y si la persona que lo lanzaría está siempre disponible.',
        },
        {
          pregunta: '¿Qué pasa el día que esto falle?',
          porque:
            'Fallará: cambiará una contraseña, caerá un servicio o llegará un fichero vacío. '
            + 'La diferencia entre un proceso que aguanta años y uno que se abandona a los '
            + 'seis meses es si avisa cuando falla o se calla.',
          comoSeMide:
            'Decidir quién recibe el aviso y por qué vía antes de escribir una línea de código.',
        },
      ],
      cierre:
        'Si a la primera y la segunda respondes con cifras pequeñas, la respuesta honesta es '
        + 'que no automatices: sale más caro el desarrollo que el problema. Nos lo decimos a '
        + 'nosotros mismos con frecuencia.',
    },
    ejemplo: {
      titulo: 'Ejemplo trabajado: cuadrar reservas y cobros',
      sector: 'Alquiler vacacional · el sector con más peso en Vera',
      situacion:
        'Un gestor de apartamentos recibe reservas por dos portales y por teléfono, cobra por '
        + 'transferencia y por pasarela, y a final de mes cuadra a mano qué reserva '
        + 'corresponde a qué ingreso. Cada concepto bancario viene escrito de una forma '
        + 'distinta y ninguno lleva el número de reserva.',
      pasos: [
        {
          etiqueta: 'recoger',
          texto:
            'Se leen las tres fuentes: exportación de cada portal y extracto del banco. '
            + 'Ninguna cambia, no hay que tocar los sistemas que ya usa.',
        },
        {
          etiqueta: 'normalizar',
          texto:
            'Fechas, importes y nombres se dejan en el mismo formato. Es la parte aburrida y '
            + 'la que más trabajo ahorra después.',
        },
        {
          etiqueta: 'casar',
          texto:
            'Se empareja por importe y ventana de fechas, y cuando el concepto trae el '
            + 'apellido del huésped se usa también. Lo que casa con una sola posibilidad se da '
            + 'por bueno.',
        },
        {
          etiqueta: 'apartar',
          texto:
            'Lo que casa con dos o con ninguna se separa en una lista aparte, con el motivo '
            + 'escrito al lado. Esa lista es lo único que llega a una persona.',
        },
      ],
      resultado:
        'El trabajo deja de ser revisar todos los movimientos y pasa a ser mirar los que no '
        + 'cuadran. En un proceso así lo habitual es que se resuelva solo la mayoría y quede '
        + 'un resto corto para revisar, aunque la proporción depende de lo limpios que estén '
        + 'los datos de partida.',
      aviso:
        'Esto es un ejemplo de aplicación construido para explicar el método, no un proyecto '
        + 'entregado. Las cifras de un caso real dependen de sus datos, y no publicamos '
        + 'resultados que no podamos respaldar.',
    },
    decisiones: [
      {
        titulo: 'Dónde corre, y por qué casi nunca hace falta un servidor',
        texto:
          'Un proceso mensual se puede lanzar desde el ordenador de la oficina con un doble '
          + 'clic. Uno diario compensa ponerlo en un servidor pequeño, que cuesta unos pocos '
          + 'euros al mes. Montar infraestructura para algo que se ejecuta doce veces al año '
          + 'es gasto sin contrapartida, y conviene decirlo antes de presupuestarlo.',
      },
      {
        titulo: 'El dato de origen manda sobre todo lo demás',
        texto:
          'Si el fichero llega en PDF generado por un escáner, el proceso es otro y el '
          + 'presupuesto también. Por eso lo primero que pedimos es un fichero real de los '
          + 'que llegan, no una descripción de cómo son: entre lo que se cree que llega y lo '
          + 'que llega hay más distancia de la que parece.',
      },
      {
        titulo: 'Fallar en silencio es el peor modo de fallo',
        texto:
          'Un proceso que se cae y avisa se arregla esa mañana. Uno que se cae y no avisa se '
          + 'descubre semanas después, cuando ya hay decisiones tomadas con datos viejos. '
          + 'Todo lo que entregamos lleva registro de lo que hizo y aviso cuando no pudo.',
      },
      {
        titulo: 'El código es vuestro y se puede leer',
        texto:
          'Se entrega con el código comentado en castellano y con las instrucciones para '
          + 'ejecutarlo sin nosotros. Un proceso que solo sabe lanzar quien lo escribió es una '
          + 'dependencia, no una herramienta.',
      },
    ],
    faq: [
      {
        q: '¿Tenéis que tocar nuestro programa de gestión?',
        a: 'No, y es parte de la idea. El proceso lee lo que vuestros sistemas ya exportan y '
          + 'deja el resultado donde haga falta. Nada cambia dentro del programa que usáis a '
          + 'diario, que es donde están los riesgos de verdad.',
      },
      {
        q: '¿Cuánto tarda algo así?',
        a: 'Un proceso de cuadre como el del ejemplo suele ser cuestión de días, no de meses, '
          + 'siempre que los ficheros de origen estén disponibles desde el principio. Lo que '
          + 'alarga los plazos casi nunca es programar: es conseguir un fichero real de cada '
          + 'fuente.',
      },
      {
        q: 'Estáis en Vera, ¿eso cambia algo?',
        a: 'Para el desarrollo no: el código se trabaja igual en remoto. Para arrancar sí, '
          + 'porque la primera reunión con los ficheros delante rinde mucho más en persona que '
          + 'por videollamada, y aquí eso es cuestión de acercarse.',
      },
      {
        q: '¿Y si dentro de un año cambia el formato del fichero?',
        a: 'Se ajusta, y suele ser un trabajo corto si el proceso está bien escrito. Por eso '
          + 'importa que el código sea legible y esté comentado: el coste de mantener no lo '
          + 'marca la tecnología, lo marca lo fácil que sea entender lo que hay.',
      },
    ],
  },
];

export const fichaDestacada = (tecnologia: string, municipio: string): FichaDestacada | undefined =>
  FICHAS_DESTACADAS.find((f) => f.tecnologia === tecnologia && f.municipio === municipio);
