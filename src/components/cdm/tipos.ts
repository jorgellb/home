/* Tipos de los componentes del centro de mando. Viven en .ts y no en los
   .astro para que tsc y los scripts puedan importarlos sin compilar Astro. */

export interface Enlace {
  href: string;
  label: string;
}

export interface LineaRegistro {
  hora: string;
  texto: string;
  estado?: 'ok' | 'aviso';
}

export interface Cifra {
  etiqueta: string;
  valor: number;
  prefijo?: string;
  sufijo?: string;
}

export interface TarifaCdm {
  servicio: string;
  desde: string;
  nota: string;
  incluye: string[];
  href: string;
  cta: string;
  destacada?: boolean;
}
