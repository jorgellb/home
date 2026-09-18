/* Capa territorial del clúster /programador-web/.
 *
 * No duplica el dataset de municipios: lo lee y deriva de él lo que las
 * páginas necesitan (comarca, vecinos, distancia a la base). Todo lo que sale
 * de aquí es verificable —viene de las coordenadas y de la comarca ya
 * registradas— o no sale.
 *
 * Lo que NO hay aquí y no debe añadirse: número de empresas, volumen de
 * búsqueda, sectores predominantes inventados, oficinas. La empresa tiene una
 * sola sede, en Vera; el resto es cobertura y así se dice.
 */
import { pueblos, type Pueblo } from './pueblos-almeria';
import { esPuebloIndexable } from './pueblos-indexables';

/** Sede real de la empresa. Coincide con la dirección del JSON-LD. */
export const BASE = { slug: 'vera', nombre: 'Vera', coords: [-1.8973, 37.2471] as [number, number] };

export interface MunicipioTerritorio {
  slug: string;
  nombre: string;
  comarca: string;
  /** Kilómetros en línea recta desde Vera. `null` si falta la coordenada: es
   *  preferible no decir nada a decir una distancia inventada. */
  kmDesdeBase: number | null;
  /** Municipios vecinos ya indexables, los más cercanos primero. */
  vecinos: string[];
  /** ¿Existe `/diseno-web/<slug>/` indexable con la que cruzar enlaces? */
  tieneDisenoWeb: boolean;
}

/** Distancia en km sobre la esfera. Suficiente para decir "a unos 40 km". */
function distanciaKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const rad = (g: number) => (g * Math.PI) / 180;
  const dLat = rad(b[1] - a[1]);
  const dLon = rad(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* Se calcula una vez: son 97 municipios y las páginas lo piden muchas veces. */
const cache = new Map<string, MunicipioTerritorio>();

function conCoords(p: Pueblo): p is Pueblo & { coords: [number, number] } {
  return Array.isArray(p.coords);
}

/** Vecinos con los que enlazar: misma comarca, indexables y cercanos.
 *  Nunca todos los municipios, y nunca los `noindex`, que no transmiten nada. */
function calcularVecinos(pueblo: Pueblo, maximo: number): string[] {
  const candidatos = pueblos.filter(
    (p) => p.slug !== pueblo.slug && esPuebloIndexable(p.slug),
  );
  const mismaComarca = candidatos.filter((p) => p.comarca === pueblo.comarca);
  /* Si la comarca se queda corta —hay comarcas con un solo indexable— se
     completa con los más cercanos de fuera, que comercialmente siguen siendo
     la zona de trabajo real. */
  const resto = candidatos.filter((p) => p.comarca !== pueblo.comarca);
  const ordenar = (lista: Pueblo[]) => {
    if (!conCoords(pueblo)) return lista;
    return [...lista].sort((a, b) => {
      const da = conCoords(a) ? distanciaKm(pueblo.coords, a.coords) : Infinity;
      const db = conCoords(b) ? distanciaKm(pueblo.coords, b.coords) : Infinity;
      return da - db;
    });
  };
  return [...ordenar(mismaComarca), ...ordenar(resto)].slice(0, maximo).map((p) => p.slug);
}

export function territorioDe(slug: string, maximoVecinos = 4): MunicipioTerritorio | null {
  const clave = `${slug}:${maximoVecinos}`;
  const guardado = cache.get(clave);
  if (guardado) return guardado;

  const pueblo = pueblos.find((p) => p.slug === slug);
  if (!pueblo) return null;

  const t: MunicipioTerritorio = {
    slug: pueblo.slug,
    nombre: pueblo.nombre,
    comarca: pueblo.comarca,
    kmDesdeBase: conCoords(pueblo) ? Math.round(distanciaKm(BASE.coords, pueblo.coords)) : null,
    vecinos: calcularVecinos(pueblo, maximoVecinos),
    tieneDisenoWeb: esPuebloIndexable(pueblo.slug),
  };
  cache.set(clave, t);
  return t;
}

/** Cómo se describe la cobertura sin fingir una oficina. La sede está en Vera
 *  y el resto es desplazamiento o trabajo en remoto; eso es lo que se dice. */
export function frasesCobertura(t: MunicipioTerritorio): string[] {
  if (t.slug === BASE.slug) {
    return [
      `El estudio está en ${BASE.nombre}, así que aquí las reuniones son presenciales sin más trámite.`,
      'El desarrollo se trabaja en remoto igualmente: el código no necesita que nadie se desplace.',
    ];
  }
  const frases: string[] = [];
  if (t.kmDesdeBase !== null) {
    frases.push(
      /* En línea recta, dicho tal cual: por carretera siempre es más, y dar el
         número a secas induce a pensar en tiempo de viaje. */
      `Trabajamos desde ${BASE.nombre}, a unos ${t.kmDesdeBase} km en línea recta de `
      + `${t.nombre}. Para arrancar un proyecto o cerrar una entrega nos desplazamos; el `
      + 'resto del trabajo no lo necesita.',
    );
  } else {
    frases.push(
      `Trabajamos desde ${BASE.nombre} y damos servicio a empresas de ${t.nombre}. `
      + 'Nos desplazamos cuando la reunión lo pide.',
    );
  }
  frases.push(
    `${t.nombre} está en ${t.comarca}, donde ya damos servicio a otros municipios. `
    + 'No tenemos oficina en cada pueblo: tenemos una, en Vera, y cobertura en la provincia.',
  );
  return frases;
}

/** Municipios Tier-1 ordenados por cercanía a la base. Para los listados de
 *  los hubs, donde hay que elegir un puñado y no volcarlos todos. */
export function municipiosIndexables(): MunicipioTerritorio[] {
  return pueblos
    .filter((p) => esPuebloIndexable(p.slug))
    .map((p) => territorioDe(p.slug))
    .filter((t): t is MunicipioTerritorio => t !== null)
    .sort((a, b) => (a.kmDesdeBase ?? 9999) - (b.kmDesdeBase ?? 9999));
}
