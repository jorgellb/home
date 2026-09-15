/* Tipos compartidos de los componentes «brutal tech». En .ts para poder
   importarlos desde páginas sin depender de exports de un .astro. */

export interface Tarifa {
  servicio: string;
  desde: string;
  nota: string;
  incluye: string[];
  href: string;
  cta: string;
  destacada?: boolean;
}
