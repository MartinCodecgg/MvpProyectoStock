import { writable } from 'svelte/store';

export interface Margenes {
  efectivo: number;
  transferencia: number;
  debito: number;
  credito: number;
  qrMercadoPago: number;
}

const margenesData: Margenes = {
  efectivo: 0,
  transferencia: 10,
  debito: 3,
  credito: 15,
  qrMercadoPago: 8
};

export const margenes = writable(margenesData);
