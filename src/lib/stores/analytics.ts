import { writable } from 'svelte/store';

export interface VentaPorDia {
  dia: number;
  monto: number;
}

export interface ProductoTop {
  producto: string;
  cantidad: number;
}

export interface MetodoPago {
  metodo: string;
  porcentaje: number;
  monto: number;
}

export interface KPIs {
  totalHoy: number;
  totalMes: number;
  productoMasVendido: { nombre: string; cantidad: number };
  transaccionesHoy: number;
  ticketPromedio: number;
  saludNegocio: { estado: string; gananciaNeta: number };
  productoMenosVendido: { nombre: string; cantidad: number };
  productosSinGanancia: number;
  ventasSemana: number;
  stockCritico: number;
}

// Ventas por día del mes (30 días)
const ventasPorDia: VentaPorDia[] = [
  { dia: 1, monto: 85000 },
  { dia: 2, monto: 92000 },
  { dia: 3, monto: 78000 },
  { dia: 4, monto: 105000 },
  { dia: 5, monto: 98000 },
  { dia: 6, monto: 112000 },
  { dia: 7, monto: 95000 },
  { dia: 8, monto: 88000 },
  { dia: 9, monto: 101000 },
  { dia: 10, monto: 118000 },
  { dia: 11, monto: 89000 },
  { dia: 12, monto: 96000 },
  { dia: 13, monto: 103000 },
  { dia: 14, monto: 91000 },
  { dia: 15, monto: 107000 },
  { dia: 16, monto: 125000 },
  { dia: 17, monto: 99000 },
  { dia: 18, monto: 86000 },
  { dia: 19, monto: 94000 },
  { dia: 20, monto: 110000 },
  { dia: 21, monto: 102000 },
  { dia: 22, monto: 97000 },
  { dia: 23, monto: 115000 },
  { dia: 24, monto: 93000 },
  { dia: 25, monto: 88000 },
  { dia: 26, monto: 104000 },
  { dia: 27, monto: 98000 },
  { dia: 28, monto: 112000 },
  { dia: 29, monto: 106000 },
  { dia: 30, monto: 95000 }
];

// Top 5 productos más vendidos
const topProductos: ProductoTop[] = [
  { producto: "Cemento Portland 50kg", cantidad: 1250 },
  { producto: "Hierro 8mm x 12m", cantidad: 890 },
  { producto: "Pintura látex 20L", cantidad: 450 },
  { producto: "Martillo de goma", cantidad: 320 },
  { producto: "Caño PVC 110mm", cantidad: 280 }
];

// Distribución por método de pago
const distribucionPagos: MetodoPago[] = [
  { metodo: "Efectivo", porcentaje: 45, monto: 2870000 },
  { metodo: "Transferencia", porcentaje: 30, monto: 1914000 },
  { metodo: "Débito", porcentaje: 15, monto: 957000 },
  { metodo: "Crédito", porcentaje: 10, monto: 638000 }
];

// KPIs
const kpis: KPIs = {
  totalHoy: 125000.00,
  totalMes: 3450000.00,
  productoMasVendido: { nombre: "Cemento Portland 50kg", cantidad: 1250 },
  transaccionesHoy: 47,
  ticketPromedio: 2659.57,
  saludNegocio: { estado: "Rentable", gananciaNeta: 18 },
  productoMenosVendido: { nombre: "Taladro percutor", cantidad: 5 },
  productosSinGanancia: 3,
  ventasSemana: 875000.00,
  stockCritico: 12
};

export const analyticsVentasPorDia = writable(ventasPorDia);
export const analyticsTopProductos = writable(topProductos);
export const analyticsDistribucionPagos = writable(distribucionPagos);
export const analyticsKPIs = writable(kpis);
