import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Une clases de Tailwind resolviendo conflictos (convención de shadcn/ui,
   la usan los componentes de Vengeance UI en src/components/ui). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
