import { useMemo, useState } from 'react';
import styles from './Herramientas.module.css';

/* Calculadora de captación y ROAS.
   Todo el cálculo ocurre en el navegador y es aritmética pura: no llama a
   ningún modelo ni promete resultados. Es una SIMULACIÓN a partir de los
   supuestos que introduce el usuario, y así se etiqueta en la interfaz. */

const SECTORES = [
  'Inmobiliaria', 'Clínica / Estética', 'Restaurante / Hostelería',
  'Reformas / Construcción', 'Despacho profesional', 'Ecommerce',
  'Hotel / Alojamiento', 'Taller / Automoción', 'Academia / Formación',
  'Agricultura / Agroindustria', 'Otro',
];

/* Tasas de cierre orientativas por sector, como valor de partida editable.
   Son puntos de arranque razonables para que el usuario no empiece en blanco,
   NO promedios de mercado medidos: el usuario debe ajustarlos a su realidad. */
const CIERRE_SUGERIDO: Record<string, number> = {
  'Inmobiliaria': 15,
  'Clínica / Estética': 35,
  'Restaurante / Hostelería': 50,
  'Reformas / Construcción': 20,
  'Despacho profesional': 30,
  'Ecommerce': 2,
  'Hotel / Alojamiento': 25,
  'Taller / Automoción': 40,
  'Academia / Formación': 25,
  'Agricultura / Agroindustria': 20,
  'Otro': 25,
};

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const num = (n: number) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(n);

export default function CalculadoraCaptacion() {
  const [sector, setSector] = useState('Inmobiliaria');
  const [ticket, setTicket] = useState(3000);
  const [clientes, setClientes] = useState(10);
  const [cierre, setCierre] = useState(15);
  const [convLanding, setConvLanding] = useState(3);
  const [presupuesto, setPresupuesto] = useState(1200);
  const [margen, setMargen] = useState(40);

  function cambiarSector(s: string) {
    setSector(s);
    const sugerido = CIERRE_SUGERIDO[s];
    if (sugerido) setCierre(sugerido);
  }

  const r = useMemo(() => {
    const tasaCierre = Math.max(cierre, 0.1) / 100;
    const tasaLanding = Math.max(convLanding, 0.1) / 100;
    const margenBruto = Math.max(margen, 1) / 100;

    const leads = Math.ceil(clientes / tasaCierre);
    const visitas = Math.ceil(leads / tasaLanding);
    const facturacion = clientes * ticket;
    const beneficioBruto = facturacion * margenBruto;

    const cpl = presupuesto / Math.max(leads, 1);
    const cac = presupuesto / Math.max(clientes, 1);
    const roas = presupuesto > 0 ? facturacion / presupuesto : 0;
    // A partir de qué ROAS la campaña deja de perder dinero, dado el margen.
    const roasEquilibrio = 1 / margenBruto;
    // Lo máximo que puedes pagar por cliente sin perder dinero.
    const cacMaximo = ticket * margenBruto;

    const viable = roas >= roasEquilibrio;
    const holgura = cacMaximo > 0 ? (cacMaximo - cac) / cacMaximo : 0;

    let nivel: 'ok' | 'warn' | 'bad' = 'bad';
    if (viable && holgura > 0.35) nivel = 'ok';
    else if (viable) nivel = 'warn';

    return {
      leads, visitas, facturacion, beneficioBruto,
      cpl, cac, roas, roasEquilibrio, cacMaximo, viable, nivel,
    };
  }, [ticket, clientes, cierre, convLanding, presupuesto, margen]);

  const verdictClass =
    r.nivel === 'ok' ? styles['verdict--ok'] : r.nivel === 'warn' ? styles['verdict--warn'] : styles['verdict--bad'];

  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <p className={styles.kicker}>Simulador · sin registro</p>
        <h2 className={styles.title}>¿Cuánto necesitas invertir para conseguir esos clientes?</h2>
        <p className={styles.sub}>
          Cambia los números y mira cómo se mueve la cuenta. Todo se calcula en tu
          navegador: no enviamos ni guardamos nada de lo que escribas aquí.
        </p>
      </header>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cc-sector">Sector</label>
          <select id="cc-sector" className={styles.select} value={sector} onChange={(e) => cambiarSector(e.target.value)}>
            {SECTORES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className={styles.hint}>Ajusta la tasa de cierre a un valor de partida habitual del sector.</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cc-ticket">Ticket medio por cliente</label>
          <input id="cc-ticket" className={styles.input} type="number" min={1} step={50}
            value={ticket} onChange={(e) => setTicket(Math.max(1, Number(e.target.value) || 0))} />
          <span className={styles.hint}>Lo que factura de media un cliente nuevo, IVA aparte.</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cc-clientes">Clientes nuevos al mes que quieres</label>
          <input id="cc-clientes" className={styles.input} type="number" min={1} step={1}
            value={clientes} onChange={(e) => setClientes(Math.max(1, Number(e.target.value) || 0))} />
          <span className={styles.hint}>Sé realista con lo que puedes atender: un lead sin atender es dinero tirado.</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cc-cierre">Tasa de cierre comercial</label>
          <div className={styles.rangeRow}>
            <input id="cc-cierre" className={styles.range} type="range" min={1} max={80} step={1}
              value={cierre} onChange={(e) => setCierre(Number(e.target.value))} />
            <span className={styles.rangeVal}>{cierre}%</span>
          </div>
          <span className={styles.hint}>De cada 100 oportunidades, cuántas acaban comprando.</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cc-landing">Conversión de la web o landing</label>
          <div className={styles.rangeRow}>
            <input id="cc-landing" className={styles.range} type="range" min={0.5} max={20} step={0.5}
              value={convLanding} onChange={(e) => setConvLanding(Number(e.target.value))} />
            <span className={styles.rangeVal}>{convLanding}%</span>
          </div>
          <span className={styles.hint}>De cada 100 visitas, cuántas dejan sus datos o llaman.</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cc-presupuesto">Inversión publicitaria al mes</label>
          <input id="cc-presupuesto" className={styles.input} type="number" min={0} step={50}
            value={presupuesto} onChange={(e) => setPresupuesto(Math.max(0, Number(e.target.value) || 0))} />
          <span className={styles.hint}>Solo lo que va a Google o Meta, sin honorarios de gestión.</span>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cc-margen">Margen bruto</label>
          <div className={styles.rangeRow}>
            <input id="cc-margen" className={styles.range} type="range" min={5} max={95} step={1}
              value={margen} onChange={(e) => setMargen(Number(e.target.value))} />
            <span className={styles.rangeVal}>{margen}%</span>
          </div>
          <span className={styles.hint}>Lo que te queda de cada venta antes de gastos fijos. Marca el límite real.</span>
        </div>
      </div>

      <div className={styles.results}>
        <ul className={styles.kpis}>
          <li className={`${styles.kpi} ${styles['kpi--cyan']}`}>
            <span className={styles.kpiV}>{num(r.leads)}</span>
            <span className={styles.kpiL}>Oportunidades/mes</span>
          </li>
          <li className={`${styles.kpi} ${styles['kpi--cyan']}`}>
            <span className={styles.kpiV}>{num(r.visitas)}</span>
            <span className={styles.kpiL}>Visitas necesarias</span>
          </li>
          <li className={`${styles.kpi} ${styles['kpi--amber']}`}>
            <span className={styles.kpiV}>{eur(r.cpl)}</span>
            <span className={styles.kpiL}>Coste por lead</span>
          </li>
          <li className={`${styles.kpi} ${r.viable ? styles['kpi--lime'] : styles['kpi--red']}`}>
            <span className={styles.kpiV}>{r.roas.toFixed(1)}x</span>
            <span className={styles.kpiL}>ROAS resultante</span>
          </li>
        </ul>

        <div className={`${styles.verdict} ${verdictClass}`}>
          {r.nivel === 'ok' && (
            <>
              <b>Los números cuadran.</b> Para {num(clientes)} clientes al mes con un cierre
              del {cierre}% necesitas unas <b>{num(r.leads)} oportunidades</b>, que a tu
              conversión del {convLanding}% salen de <b>{num(r.visitas)} visitas</b>.
              Pagarías {eur(r.cac)} por cliente cuando puedes permitirte hasta {eur(r.cacMaximo)}:
              hay margen para escalar.
            </>
          )}
          {r.nivel === 'warn' && (
            <>
              <b>Sale, pero justo.</b> Tu coste por cliente ({eur(r.cac)}) se acerca al máximo
              que aguanta tu margen ({eur(r.cacMaximo)}). Cualquier subida de CPC o una mala
              racha de cierre te mete en pérdidas. Antes de aumentar presupuesto conviene
              trabajar la conversión de la landing o la cualificación del lead.
            </>
          )}
          {r.nivel === 'bad' && (
            <>
              <b>Con estos supuestos, pierdes dinero.</b> Necesitas un ROAS de al menos{' '}
              <b>{r.roasEquilibrio.toFixed(1)}x</b> para cubrir costes con un margen del {margen}%,
              y estos números dan {r.roas.toFixed(1)}x. Las salidas son subir el ticket medio,
              mejorar el cierre, mejorar la conversión de la web o bajar el coste por lead
              — no simplemente invertir más.
            </>
          )}
        </div>

        <ul className={styles.breakdown}>
          <li><span>Facturación potencial</span><span>{eur(r.facturacion)}/mes</span></li>
          <li><span>Beneficio bruto estimado</span><span>{eur(r.beneficioBruto)}/mes</span></li>
          <li><span>Coste de adquisición por cliente (CAC)</span><span>{eur(r.cac)}</span></li>
          <li><span>CAC máximo que aguanta tu margen</span><span>{eur(r.cacMaximo)}</span></li>
          <li><span>ROAS de equilibrio</span><span>{r.roasEquilibrio.toFixed(1)}x</span></li>
        </ul>

        <p className={styles.disclaimer}>
          Esto es una <b>simulación aritmética</b> a partir de los datos que has introducido,
          no una previsión ni una garantía de resultados. No contempla estacionalidad,
          competencia, calidad de la oferta ni capacidad comercial. Sirve para ordenar la
          conversación sobre presupuesto, no para decidir una inversión por sí sola.
        </p>

        <div className={styles.actions}>
          <a href="/contacto/" className={`${styles.btn} ${styles.btnPrimary}`}>
            Revisar estos números contigo
          </a>
          <a href="/marketing/recursos/test-marketing/" className={`${styles.btn} ${styles.btnGhost}`}>
            Test de madurez digital
          </a>
        </div>
      </div>
    </div>
  );
}
