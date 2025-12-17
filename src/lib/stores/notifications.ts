import { writable } from 'svelte/store';

export interface Notification {
  categoria: string;
  producto: string;
  mensaje: string;
  urgencia: 'critica' | 'alta' | 'media';
}

const notificacionesData: Notification[] = [
  // STOCK BAJO
  {
    categoria: "STOCK BAJO",
    producto: "Martillo de goma 500g",
    mensaje: "Stock bajo (3 unidades)",
    urgencia: "media"
  },
  {
    categoria: "STOCK BAJO",
    producto: "Destornillador plano",
    mensaje: "Stock bajo (5 unidades)",
    urgencia: "media"
  },
  // VENCIMIENTOS
  {
    categoria: "VENCIMIENTOS",
    producto: "Pintura Látex blanco 20LTS",
    mensaje: "Vence en 10 días",
    urgencia: "alta"
  },
  {
    categoria: "VENCIMIENTOS",
    producto: "Aguarrás mineral 5L",
    mensaje: "Vence en 15 días",
    urgencia: "media"
  },
  // STOCK AGOTADO
  {
    categoria: "STOCK AGOTADO",
    producto: "Cemento Portland 50kg",
    mensaje: "SIN STOCK",
    urgencia: "critica"
  }
];

export const notifications = writable(notificacionesData);
export const notificationCount = writable(5);
