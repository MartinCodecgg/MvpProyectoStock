import { writable } from 'svelte/store';

export interface ProductoReposicion {
  id: string;
  nombre: string;
  codigoBarras: string;
  stock: number;
  urgencia: 'CRÍTICO' | 'BAJO' | 'MEDIO' | 'ALTO';
  fechaVencimiento?: string;
  ventasMensuales?: number;
}

// Sin Stock - 5 productos
export const productosSinStock: ProductoReposicion[] = [
  {
    id: "prod003",
    nombre: "Cemento Portland 50kg",
    codigoBarras: "7798123456789",
    stock: 0,
    urgencia: "CRÍTICO"
  },
  {
    id: "prod015",
    nombre: "Martillo de goma 500g",
    codigoBarras: "7798456789012",
    stock: 0,
    urgencia: "CRÍTICO"
  },
  {
    id: "prod028",
    nombre: "Destornillador plano 6 pulgadas",
    codigoBarras: "7798789012345",
    stock: 0,
    urgencia: "CRÍTICO"
  },
  {
    id: "prod042",
    nombre: "Llave térmica 2x40A",
    codigoBarras: "7798890123456",
    stock: 0,
    urgencia: "CRÍTICO"
  },
  {
    id: "prod050",
    nombre: "Cinta aisladora 3M negra",
    codigoBarras: "7798123456780",
    stock: 0,
    urgencia: "CRÍTICO"
  }
];

// Stock Bajo - 10 productos
export const productosStockBajo: ProductoReposicion[] = [
  {
    id: "prod007",
    nombre: "Pintura Látex blanca 20L",
    codigoBarras: "7798345678901",
    stock: 3,
    urgencia: "BAJO"
  },
  {
    id: "prod012",
    nombre: "Hierro 8mm x 12m",
    codigoBarras: "7798234567890",
    stock: 5,
    urgencia: "BAJO"
  },
  {
    id: "prod019",
    nombre: "Caño PVC 110mm x 6m",
    codigoBarras: "7798567890123",
    stock: 8,
    urgencia: "BAJO"
  },
  {
    id: "prod024",
    nombre: "Cable unipolar 2.5mm x 100m",
    codigoBarras: "7798678901234",
    stock: 2,
    urgencia: "BAJO"
  },
  {
    id: "prod031",
    nombre: "Arena gruesa bolsa 30kg",
    codigoBarras: "7798901234567",
    stock: 9,
    urgencia: "BAJO"
  },
  {
    id: "prod036",
    nombre: "Adhesivo cerámicos 30kg",
    codigoBarras: "7798012345678",
    stock: 6,
    urgencia: "BAJO"
  },
  {
    id: "prod041",
    nombre: "Pincel 2 pulgadas",
    codigoBarras: "7798234567891",
    stock: 4,
    urgencia: "BAJO"
  },
  {
    id: "prod045",
    nombre: "Silicona transparente 280ml",
    codigoBarras: "7798345678902",
    stock: 7,
    urgencia: "BAJO"
  },
  {
    id: "prod048",
    nombre: "Llave inglesa 12 pulgadas",
    codigoBarras: "7798456789013",
    stock: 3,
    urgencia: "BAJO"
  },
  {
    id: "prod049",
    nombre: "Taladro percutor 650W",
    codigoBarras: "7798567890124",
    stock: 1,
    urgencia: "BAJO"
  }
];

// Próximos a Vencer - 3 productos
export const productosProximosVencer: ProductoReposicion[] = [
  {
    id: "prod007",
    nombre: "Pintura Látex blanca 20L",
    codigoBarras: "7798345678901",
    stock: 3,
    fechaVencimiento: "15/01/2026",
    urgencia: "ALTO"
  },
  {
    id: "prod036",
    nombre: "Adhesivo cerámicos 30kg",
    codigoBarras: "7798012345678",
    stock: 6,
    fechaVencimiento: "08/01/2026",
    urgencia: "ALTO"
  },
  {
    id: "prod045",
    nombre: "Silicona transparente 280ml",
    codigoBarras: "7798345678902",
    stock: 7,
    fechaVencimiento: "22/01/2026",
    urgencia: "MEDIO"
  }
];

// Más Vendidos - 8 productos
export const productosMasVendidos: ProductoReposicion[] = [
  {
    id: "prod003",
    nombre: "Cemento Portland 50kg",
    codigoBarras: "7798123456789",
    stock: 0,
    ventasMensuales: 250,
    urgencia: "CRÍTICO"
  },
  {
    id: "prod012",
    nombre: "Hierro 8mm x 12m",
    codigoBarras: "7798234567890",
    stock: 5,
    ventasMensuales: 180,
    urgencia: "BAJO"
  },
  {
    id: "prod007",
    nombre: "Pintura Látex blanca 20L",
    codigoBarras: "7798345678901",
    stock: 3,
    ventasMensuales: 120,
    urgencia: "BAJO"
  },
  {
    id: "prod019",
    nombre: "Caño PVC 110mm x 6m",
    codigoBarras: "7798567890123",
    stock: 8,
    ventasMensuales: 95,
    urgencia: "BAJO"
  },
  {
    id: "prod015",
    nombre: "Martillo de goma 500g",
    codigoBarras: "7798456789012",
    stock: 0,
    ventasMensuales: 85,
    urgencia: "CRÍTICO"
  },
  {
    id: "prod024",
    nombre: "Cable unipolar 2.5mm x 100m",
    codigoBarras: "7798678901234",
    stock: 2,
    ventasMensuales: 75,
    urgencia: "BAJO"
  },
  {
    id: "prod031",
    nombre: "Arena gruesa bolsa 30kg",
    codigoBarras: "7798901234567",
    stock: 9,
    ventasMensuales: 65,
    urgencia: "BAJO"
  },
  {
    id: "prod041",
    nombre: "Pincel 2 pulgadas",
    codigoBarras: "7798234567891",
    stock: 4,
    ventasMensuales: 60,
    urgencia: "BAJO"
  }
];

// Crítico = Sin Stock + Stock Bajo
export const productosCriticos: ProductoReposicion[] = [
  ...productosSinStock,
  ...productosStockBajo
];

// Criterios disponibles
export type CriterioType = 'sinStock' | 'stockBajo' | 'critico' | 'proximosVencer' | 'masVendidos';

export interface Criterio {
  id: CriterioType;
  nombre: string;
  emoji: string;
  descripcion: string;
  cantidad: number;
}

export const criterios: Criterio[] = [
  { id: 'sinStock', nombre: 'Sin Stock', emoji: '🔴', descripcion: 'Productos agotados', cantidad: 5 },
  { id: 'stockBajo', nombre: 'Stock Bajo', emoji: '🟡', descripcion: 'Menos de 10 unidades', cantidad: 10 },
  { id: 'critico', nombre: 'Crítico', emoji: '⚠️', descripcion: 'Sin stock + stock bajo', cantidad: 15 },
  { id: 'proximosVencer', nombre: 'Próx. Vencer', emoji: '📅', descripcion: 'Vencen en menos de 30 días', cantidad: 3 },
  { id: 'masVendidos', nombre: 'Más Vendidos', emoji: '🔄', descripcion: 'Top productos frecuentes', cantidad: 8 }
];

// Helper to get products by criteria
export function getProductosByCriterio(criterioId: CriterioType): ProductoReposicion[] {
  switch (criterioId) {
    case 'sinStock': return productosSinStock;
    case 'stockBajo': return productosStockBajo;
    case 'critico': return productosCriticos;
    case 'proximosVencer': return productosProximosVencer;
    case 'masVendidos': return productosMasVendidos;
    default: return [];
  }
}

// Store for current view state
export const criterioActual = writable<CriterioType | null>(null);
export const productosSeleccionadosReposicion = writable<string[]>([]);
