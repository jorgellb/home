/* Bento de precios (Vengeance UI «research-bento-grid») adaptado al Plan 360.
   Va en un envoltorio propio porque los logos son componentes React y Astro no
   puede pasarlos como props a una isla. */
import ResearchBentoGrid, { type ResearchBentoBrand } from '@/components/ui/research-bento-grid';
import { SiAstro, SiCloudflare, SiVercel, SiWoocommerce, SiWordpress } from 'react-icons/si';

const BRANDS: readonly ResearchBentoBrand[] = [
  { name: 'Astro', icon: SiAstro },
  { name: 'WordPress', icon: SiWordpress },
  { name: 'WooCommerce', icon: SiWoocommerce },
  { name: 'Cloudflare', icon: SiCloudflare },
  { name: 'Vercel', icon: SiVercel },
];

export default function PlanBento() {
  return (
    <ResearchBentoGrid
      className="h-full bg-transparent p-0 sm:p-0 dark:bg-transparent"
      monthlyPrice={400}
      previousPrice={2000}
      currency="EUR"
      locale="es-ES"
      brands={BRANDS}
      defaultSelectedBrand={0}
      userLabel="Tú"
      collaboratorLabel="Platanito"
      copy={{
        showcaseTitle: 'Un solo equipo para tu web y tu informática',
        showcaseDescription: 'Diseño, desarrollo, hosting, redes y equipos, con las mismas herramientas que usan las empresas que funcionan.',
        pricingTitle: <>Departamento IT completo.<br />Cuota fija al mes.</>,
        pricingDescription: 'Un técnico en plantilla cuesta desde unos 2.000 € al mes. El Plan 360 cubre tu web, hasta 10 puestos, servidor y red por 400 € + IVA.',
        pauseTitle: <>Sin permanencia.<br />Tú decides cada mes.</>,
        activeDescription: 'Mes a mes y sin cuota de alta. Si te vas, te lo entregamos todo documentado.',
        pausedDescription: 'Tu web, tu dominio y tus datos siguen siendo tuyos aunque pares el plan.',
      }}
    />
  );
}
