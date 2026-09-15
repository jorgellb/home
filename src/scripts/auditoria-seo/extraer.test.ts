import { describe, it, expect } from 'vitest';
import { compararConBase, extraerSeo, textoPlano, type FichaSeo } from './extraer';

const html = `<!DOCTYPE html><html><head>
<title>Diseño web en Mojácar | Platanito Rico</title>
<meta name="description" content="Webs para hoteles &amp; restaurantes">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://platanitorico.com/diseno-web/mojacar/">
<script type="application/ld+json">{"@type":"Service"}</script>
<script type="application/ld+json">[{"@type":"FAQPage"},{"@type":["Organization","LocalBusiness"]}]</script>
</head><body>
<aside><h2>Menú</h2></aside>
<main><h1 class="x">Diseño web <span>en Mojácar</span></h1><h2>Hoteles que venden</h2>
<div class="cdm-panel" data-panel="demo"><span data-panel-etiqueta="demo">demo</span></div>
<div data-panel="demo"></div>
<div data-panel="real"><span data-panel-etiqueta="real">real</span></div></main>
</body></html>`;

describe('textoPlano', () => {
  it('quita etiquetas, decodifica entidades y colapsa espacios', () => {
    expect(textoPlano(' a&nbsp;&amp;<b>b</b>\n c ')).toBe('a & b c');
  });
});

describe('extraerSeo', () => {
  const ficha = extraerSeo(html);

  it('lee título, descripción, robots y canonical', () => {
    expect(ficha.title).toBe('Diseño web en Mojácar | Platanito Rico');
    expect(ficha.description).toBe('Webs para hoteles & restaurantes');
    expect(ficha.robots).toBe('index, follow');
    expect(ficha.canonical).toBe('https://platanitorico.com/diseno-web/mojacar/');
  });

  it('normaliza el texto de los H1', () => {
    expect(ficha.h1).toEqual(['Diseño web en Mojácar']);
  });

  it('toma el primer H2 dentro de main, no el del menú', () => {
    expect(ficha.h2Primero).toBe('Hoteles que venden');
    expect(extraerSeo('<aside><h2>Menú</h2></aside>').h2Primero).toBeNull();
  });

  it('ordena los tipos JSON-LD, incluidos los que vienen en arrays', () => {
    expect(ficha.jsonLdTipos).toEqual(['FAQPage', 'LocalBusiness', 'Organization', 'Service']);
  });

  it('cuenta paneles demo y etiquetas demo por separado', () => {
    expect(ficha.panelesDemo).toBe(2);
    expect(ficha.etiquetasDemo).toBe(1);
  });
});

describe('compararConBase', () => {
  const base: FichaSeo = {
    title: 'Home', description: 'Desc', canonical: 'https://platanitorico.com/', robots: 'index, follow',
    h1: ['Diseño web en Almería'], h2Primero: 'Gancho', jsonLdTipos: ['FAQPage'], panelesDemo: 0, etiquetasDemo: 0,
  };

  it('no devuelve errores si nada cambia', () => {
    expect(compararConBase({ '/': base }, { '/': { ...base } })).toEqual([]);
  });

  it('avisa si desaparece una página o cambia un campo fijo', () => {
    const errores = compararConBase({ '/': base, '/a/': base }, { '/': { ...base, title: 'Otro', h1: ['Otro H1'] } });
    expect(errores).toContain('/a/: la página ha desaparecido');
    expect(errores.some((e) => e.startsWith('/: title cambió'))).toBe(true);
    expect(errores.some((e) => e.startsWith('/: H1 cambió'))).toBe(true);
  });

  it('exige un H1 en páginas indexables que en la base tenían uno', () => {
    const errores = compararConBase({ '/': base }, { '/': { ...base, h1: [] } });
    expect(errores).toContain('/: tiene 0 H1 y debe tener 1');
  });

  it('no exige H1 a páginas noindex', () => {
    const noindex = { ...base, robots: 'noindex, nofollow', h1: [] };
    expect(compararConBase({ '/x/': noindex }, { '/x/': noindex })).toEqual([]);
  });

  it('marca paneles demo sin etiqueta', () => {
    const errores = compararConBase({ '/': base }, { '/': { ...base, panelesDemo: 2, etiquetasDemo: 1 } });
    expect(errores).toContain('/: 1 panel(es) demo sin etiqueta «demo»');
  });
});
