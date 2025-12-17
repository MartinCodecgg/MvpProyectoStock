import { writable } from 'svelte/store';

export interface Recommendation {
  nombre: string;
  stockActual: number;
  diasHastaAgotamiento: number;
  cantidadRecomendada: number;
  precioReposicion: number;
  urgencia: 'URGENTE' | 'MEDIO' | 'NORMAL';
  tieneVencimiento: boolean;
  vencimiento?: string;
}

const recomendacionesData: Recommendation[] = [
  {
    nombre: "Cemento Portland 50kg",
    stockActual: 45,
    diasHastaAgotamiento: 8,
    cantidadRecomendada: 200,
    precioReposicion: 2400000,
    urgencia: "URGENTE",
    tieneVencimiento: false
  },
  {
    nombre: "Pintura Látex interior 20L",
    stockActual: 12,
    diasHastaAgotamiento: 5,
    cantidadRecomendada: 50,
    precioReposicion: 750000,
    urgencia: "URGENTE",
    tieneVencimiento: true,
    vencimiento: "6 meses"
  },
  {
    nombre: "Hierro 8mm x 12m",
    stockActual: 150,
    diasHastaAgotamiento: 10,
    cantidadRecomendada: 300,
    precioReposicion: 2430000,
    urgencia: "MEDIO",
    tieneVencimiento: false
  },
  {
    nombre: "Caño PVC 110mm x 6m",
    stockActual: 35,
    diasHastaAgotamiento: 12,
    cantidadRecomendada: 100,
    precioReposicion: 518000,
    urgencia: "MEDIO",
    tieneVencimiento: false
  },
  {
    nombre: "Cable unipolar 2.5mm x 100m",
    stockActual: 8,
    diasHastaAgotamiento: 6,
    cantidadRecomendada: 25,
    precioReposicion: 1875000,
    urgencia: "URGENTE",
    tieneVencimiento: false
  },
  {
    nombre: "Llave térmica 2x40A",
    stockActual: 45,
    diasHastaAgotamiento: 18,
    cantidadRecomendada: 60,
    precioReposicion: 900000,
    urgencia: "NORMAL",
    tieneVencimiento: false
  },
  {
    nombre: "Adhesivo para cerámicos 30kg",
    stockActual: 22,
    diasHastaAgotamiento: 9,
    cantidadRecomendada: 80,
    precioReposicion: 960000,
    urgencia: "MEDIO",
    tieneVencimiento: true,
    vencimiento: "8 meses"
  },
  {
    nombre: "Martillo de goma 500g",
    stockActual: 3,
    diasHastaAgotamiento: 4,
    cantidadRecomendada: 30,
    precioReposicion: 165000,
    urgencia: "URGENTE",
    tieneVencimiento: false
  },
  {
    nombre: "Tornillos autoperforantes 8x1 (caja x1000)",
    stockActual: 18,
    diasHastaAgotamiento: 11,
    cantidadRecomendada: 50,
    precioReposicion: 425000,
    urgencia: "MEDIO",
    tieneVencimiento: false
  },
  {
    nombre: "Silicona transparente 280ml",
    stockActual: 28,
    diasHastaAgotamiento: 15,
    cantidadRecomendada: 72,
    precioReposicion: 432000,
    urgencia: "NORMAL",
    tieneVencimiento: true,
    vencimiento: "12 meses"
  }
];

export const recommendations = writable(recomendacionesData);
