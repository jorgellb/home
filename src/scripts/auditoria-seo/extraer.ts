/* Auditoría SEO del rediseño: saca de cada HTML generado los datos que no
   deben cambiar y los compara con la línea base. Sin dependencias: el HTML
   que genera Astro es regular y basta con expresiones regulares. */

export interface FichaSeo {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  h1: string[];
  h2Primero: string | null;
  jsonLdTipos: string[];
  panelesDemo: number;
  etiquetasDemo: number;
}

export type MapaSeo = Record<string, FichaSeo>;

const ENTIDADES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&nbsp;': ' ',
};

export function textoPlano(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, (m) => ENTIDADES[m] ?? m)
    .replace(/\s+/g, ' ')
    .trim();
}

function atributo(etiqueta: string, nombre: string): string {
  const m = etiqueta.match(new RegExp(`\\s${nombre}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return textoPlano(m?.[1] ?? m?.[2] ?? m?.[3] ?? '');
}

function tiposJsonLd(html: string): string[] {
  const bloques = [...html.matchAll(/<script[^>]*type=["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)];
  return bloques
    .flatMap((m) => {
      try {
        const datos: unknown = JSON.parse(m[1]);
        return (Array.isArray(datos) ? datos : [datos]).flatMap((d) => [(d as { '@type'?: unknown })?.['@type']].flat());
      } catch {
        return ['JSON-LD inválido'];
      }
    })
    .filter((t): t is string => typeof t === 'string')
    .sort();
}

export function extraerSeo(html: string): FichaSeo {
  const metaDescripcion = html.match(/<meta[^>]*\sname=["']?description["']?[^>]*>/i)?.[0] ?? '';
  const metaRobots = html.match(/<meta[^>]*\sname=["']?robots["']?[^>]*>/i)?.[0] ?? '';
  const enlaceCanonical = html.match(/<link[^>]*\srel=["']?canonical["']?[^>]*>/i)?.[0] ?? '';
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? '';
  const h2 = main.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);

  return {
    title: textoPlano(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? ''),
    description: atributo(metaDescripcion, 'content'),
    canonical: atributo(enlaceCanonical, 'href'),
    robots: atributo(metaRobots, 'content'),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => textoPlano(m[1])),
    h2Primero: h2 ? textoPlano(h2[1]) : null,
    jsonLdTipos: tiposJsonLd(html),
    panelesDemo: (html.match(/data-panel=["']?demo\b/g) ?? []).length,
    etiquetasDemo: (html.match(/data-panel-etiqueta=["']?demo\b/g) ?? []).length,
  };
}

const CAMPOS_FIJOS = ['title', 'description', 'canonical', 'robots', 'h2Primero'] as const;

export function compararConBase(base: MapaSeo, actual: MapaSeo): string[] {
  const errores: string[] = [];

  for (const [ruta, antes] of Object.entries(base)) {
    const ahora = actual[ruta];
    if (!ahora) {
      errores.push(`${ruta}: la página ha desaparecido`);
      continue;
    }
    for (const campo of CAMPOS_FIJOS) {
      if (ahora[campo] !== antes[campo]) errores.push(`${ruta}: ${campo} cambió de «${antes[campo]}» a «${ahora[campo]}»`);
    }
    if (ahora.h1.join(' | ') !== antes.h1.join(' | ')) {
      errores.push(`${ruta}: H1 cambió de «${antes.h1.join(' | ')}» a «${ahora.h1.join(' | ')}»`);
    }
    if (ahora.jsonLdTipos.join(',') !== antes.jsonLdTipos.join(',')) {
      errores.push(`${ruta}: JSON-LD cambió de [${antes.jsonLdTipos.join(', ')}] a [${ahora.jsonLdTipos.join(', ')}]`);
    }
  }

  for (const [ruta, ahora] of Object.entries(actual)) {
    const indexable = !/noindex/i.test(ahora.robots);
    const teniaUnH1 = (base[ruta]?.h1.length ?? 1) === 1;
    if (indexable && teniaUnH1 && ahora.h1.length !== 1) errores.push(`${ruta}: tiene ${ahora.h1.length} H1 y debe tener 1`);
    if (ahora.panelesDemo !== ahora.etiquetasDemo) {
      errores.push(`${ruta}: ${ahora.panelesDemo - ahora.etiquetasDemo} panel(es) demo sin etiqueta «demo»`);
    }
  }

  return errores;
}
