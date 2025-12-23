import { writable } from 'svelte/store';

// Interface definitions
export interface ProductoProveedor {
  id: string;
  nombre: string;
  codigoBarras: string;
  precio: number;
}

export interface Proveedor {
  id: string;
  nombre: string;
  ultimaActualizacion: string;
  productos: ProductoProveedor[];
}

// 12 Proveedores simulados
const proveedoresData: Proveedor[] = [
  {
    id: "prov001",
    nombre: "Ferretería Central SA",
    ultimaActualizacion: "12/11/2025",
    productos: [
      { id: "p001_001", nombre: "Cemento Portland 50kg", codigoBarras: "7798123456789", precio: 12000.00 },
      { id: "p001_002", nombre: "Hierro construcción 8mm x 12m", codigoBarras: "7798234567890", precio: 8100.00 },
      { id: "p001_003", nombre: "Pintura Látex interior blanca 20L", codigoBarras: "7798345678901", precio: 15000.00 },
      { id: "p001_004", nombre: "Martillo goma 500g", codigoBarras: "7798456789012", precio: 5500.00 },
      { id: "p001_005", nombre: "Caño PVC 110mm x 6 metros", codigoBarras: "7798567890123", precio: 5180.00 },
      { id: "p001_006", nombre: "Cable eléctrico 2.5mm rollo 100m", codigoBarras: "7798678901234", precio: 75000.00 }
    ]
  },
  {
    id: "prov002",
    nombre: "Distribuidora del Norte",
    ultimaActualizacion: "15/06/2025",
    productos: [
      { id: "p002_001", nombre: "Cemento 50kg", codigoBarras: "7798123456789", precio: 11500.00 },
      { id: "p002_002", nombre: "Hierro 8mm x 12m", codigoBarras: "7798234567890", precio: 8650.00 },
      { id: "p002_003", nombre: "Látex blanco 20 litros", codigoBarras: "7798345678901", precio: 14200.00 },
      { id: "p002_004", nombre: "Destornillador plano 6 pulgadas", codigoBarras: "7798789012345", precio: 2800.00 },
      { id: "p002_005", nombre: "Llave térmica bipolar 40A", codigoBarras: "7798890123456", precio: 15000.00 },
      { id: "p002_006", nombre: "Arena gruesa bolsa 30kg", codigoBarras: "7798901234567", precio: 3200.00 }
    ]
  },
  {
    id: "prov003",
    nombre: "Materiales Rosario",
    ultimaActualizacion: "10/01/2025",
    productos: [
      { id: "p003_001", nombre: "Cemento Portland Bolsa 50kg", codigoBarras: "7798123456789", precio: 11800.00 },
      { id: "p003_002", nombre: "Pintura Latex 20L blanca", codigoBarras: "7798345678901", precio: 15500.00 },
      { id: "p003_003", nombre: "Martillo de goma 500g", codigoBarras: "7798456789012", precio: 4800.00 },
      { id: "p003_004", nombre: "Caño PVC desagüe 110mm 6m", codigoBarras: "7798567890123", precio: 5450.00 },
      { id: "p003_005", nombre: "Adhesivo cerámicos exterior 30kg", codigoBarras: "7798012345678", precio: 12000.00 },
      { id: "p003_006", nombre: "Cinta aisladora 3M negra", codigoBarras: "7798123456780", precio: 1200.00 }
    ]
  },
  {
    id: "prov004",
    nombre: "Corralón San Martín",
    ultimaActualizacion: "20/10/2025",
    productos: [
      { id: "p004_001", nombre: "Cemento Portland 50kg", codigoBarras: "7798123456789", precio: 12200.00 },
      { id: "p004_002", nombre: "Hierro 8mm barra 12m", codigoBarras: "7798234567890", precio: 7950.00 },
      { id: "p004_003", nombre: "Caño PVC 110mm x 6m", codigoBarras: "7798567890123", precio: 4980.00 },
      { id: "p004_004", nombre: "Tornillos autoperforantes caja", codigoBarras: "7798234567891", precio: 2500.00 },
      { id: "p004_005", nombre: "Silicona transparente 280ml", codigoBarras: "7798345678902", precio: 1800.00 },
      { id: "p004_006", nombre: "Llave inglesa 12\"", codigoBarras: "7798456789013", precio: 8500.00 }
    ]
  },
  {
    id: "prov005",
    nombre: "Proveedor Industrial SA",
    ultimaActualizacion: "05/03/2025",
    productos: [
      { id: "p005_001", nombre: "Cemento 50kg bolsa", codigoBarras: "7798123456789", precio: 11200.00 },
      { id: "p005_002", nombre: "Cable unipolar 2.5mm 100m", codigoBarras: "7798678901234", precio: 72000.00 },
      { id: "p005_003", nombre: "Llave térmica 2x40A", codigoBarras: "7798890123456", precio: 14500.00 },
      { id: "p005_004", nombre: "Cinta aisladora negra", codigoBarras: "7798123456780", precio: 950.00 },
      { id: "p005_005", nombre: "Pincel 2 pulgadas", codigoBarras: "7798234567891", precio: 1100.00 },
      { id: "p005_006", nombre: "Destornillador plano 6\"", codigoBarras: "7798789012345", precio: 2650.00 }
    ]
  },
  {
    id: "prov006",
    nombre: "Casa López Ferretería",
    ultimaActualizacion: "28/09/2025",
    productos: [
      { id: "p006_001", nombre: "Martillo goma profesional 500g", codigoBarras: "7798456789012", precio: 5200.00 },
      { id: "p006_002", nombre: "Destornillador plano grande", codigoBarras: "7798789012345", precio: 2950.00 },
      { id: "p006_003", nombre: "Tornillos autoperforantes x100", codigoBarras: "7798234567891", precio: 2200.00 },
      { id: "p006_004", nombre: "Silicona transparente tubo", codigoBarras: "7798345678902", precio: 1650.00 },
      { id: "p006_005", nombre: "Llave inglesa 12 pulgadas", codigoBarras: "7798456789013", precio: 7800.00 },
      { id: "p006_006", nombre: "Pincel profesional 2\"", codigoBarras: "7798234567891", precio: 1350.00 }
    ]
  },
  {
    id: "prov007",
    nombre: "Materiales del Sur",
    ultimaActualizacion: "18/11/2025",
    productos: [
      { id: "p007_001", nombre: "Cemento Portland 50kg", codigoBarras: "7798123456789", precio: 11650.00 },
      { id: "p007_002", nombre: "Hierro construcción 8mm 12m", codigoBarras: "7798234567890", precio: 8300.00 },
      { id: "p007_003", nombre: "Pintura Látex blanca 20L", codigoBarras: "7798345678901", precio: 14800.00 },
      { id: "p007_004", nombre: "Arena gruesa 30kg", codigoBarras: "7798901234567", precio: 2950.00 },
      { id: "p007_005", nombre: "Adhesivo cerámicos 30kg", codigoBarras: "7798012345678", precio: 11500.00 },
      { id: "p007_006", nombre: "Cable 2.5mm rollo 100m", codigoBarras: "7798678901234", precio: 73500.00 }
    ]
  },
  {
    id: "prov008",
    nombre: "Distribuidora La Plata",
    ultimaActualizacion: "12/08/2025",
    productos: [
      { id: "p008_001", nombre: "Cemento 50kg", codigoBarras: "7798123456789", precio: 12100.00 },
      { id: "p008_002", nombre: "Caño PVC 110mm 6m", codigoBarras: "7798567890123", precio: 5100.00 },
      { id: "p008_003", nombre: "Llave térmica 40A bipolar", codigoBarras: "7798890123456", precio: 15200.00 },
      { id: "p008_004", nombre: "Cinta aisladora", codigoBarras: "7798123456780", precio: 1050.00 },
      { id: "p008_005", nombre: "Martillo de goma 500g", codigoBarras: "7798456789012", precio: 5350.00 },
      { id: "p008_006", nombre: "Arena gruesa bolsa", codigoBarras: "7798901234567", precio: 3100.00 }
    ]
  },
  {
    id: "prov009",
    nombre: "Ferretería El Tornillo",
    ultimaActualizacion: "03/12/2025",
    productos: [
      { id: "p009_001", nombre: "Tornillos autoperforantes caja x100", codigoBarras: "7798234567891", precio: 2100.00 },
      { id: "p009_002", nombre: "Destornillador plano 6 pulgadas", codigoBarras: "7798789012345", precio: 2550.00 },
      { id: "p009_003", nombre: "Llave inglesa 12\"", codigoBarras: "7798456789013", precio: 8200.00 },
      { id: "p009_004", nombre: "Silicona transparente 280ml", codigoBarras: "7798345678902", precio: 1750.00 },
      { id: "p009_005", nombre: "Pincel 2\"", codigoBarras: "7798234567891", precio: 1250.00 },
      { id: "p009_006", nombre: "Martillo goma 500g", codigoBarras: "7798456789012", precio: 5100.00 }
    ]
  },
  {
    id: "prov010",
    nombre: "Materiales Express",
    ultimaActualizacion: "22/04/2025",
    productos: [
      { id: "p010_001", nombre: "Cemento Portland bolsa 50kg", codigoBarras: "7798123456789", precio: 11350.00 },
      { id: "p010_002", nombre: "Hierro 8mm x 12m", codigoBarras: "7798234567890", precio: 8450.00 },
      { id: "p010_003", nombre: "Pintura Látex 20L", codigoBarras: "7798345678901", precio: 14600.00 },
      { id: "p010_004", nombre: "Caño PVC 110mm x 6m", codigoBarras: "7798567890123", precio: 5280.00 },
      { id: "p010_005", nombre: "Adhesivo para cerámicos 30kg", codigoBarras: "7798012345678", precio: 11800.00 },
      { id: "p010_006", nombre: "Cable unipolar 2.5mm 100m", codigoBarras: "7798678901234", precio: 74000.00 }
    ]
  },
  {
    id: "prov011",
    nombre: "Corralón Buenos Aires",
    ultimaActualizacion: "15/10/2025",
    productos: [
      { id: "p011_001", nombre: "Cemento 50kg", codigoBarras: "7798123456789", precio: 11900.00 },
      { id: "p011_002", nombre: "Hierro 8mm barra 12m", codigoBarras: "7798234567890", precio: 8200.00 },
      { id: "p011_003", nombre: "Arena gruesa bolsa 30kg", codigoBarras: "7798901234567", precio: 2850.00 },
      { id: "p011_004", nombre: "Caño PVC desagüe 110mm 6m", codigoBarras: "7798567890123", precio: 5050.00 },
      { id: "p011_005", nombre: "Llave térmica 2x40A", codigoBarras: "7798890123456", precio: 14800.00 },
      { id: "p011_006", nombre: "Cinta aisladora negra", codigoBarras: "7798123456780", precio: 1100.00 }
    ]
  },
  {
    id: "prov012",
    nombre: "Distribuidora Belgrano",
    ultimaActualizacion: "30/07/2025",
    productos: [
      { id: "p012_001", nombre: "Cemento Portland 50kg", codigoBarras: "7798123456789", precio: 11700.00 },
      { id: "p012_002", nombre: "Pintura Látex blanca 20L", codigoBarras: "7798345678901", precio: 14400.00 },
      { id: "p012_003", nombre: "Martillo goma 500g", codigoBarras: "7798456789012", precio: 5050.00 },
      { id: "p012_004", nombre: "Destornillador plano 6\"", codigoBarras: "7798789012345", precio: 2700.00 },
      { id: "p012_005", nombre: "Adhesivo cerámicos 30kg", codigoBarras: "7798012345678", precio: 11200.00 },
      { id: "p012_006", nombre: "Silicona transparente", codigoBarras: "7798345678902", precio: 1700.00 }
    ]
  }
];

// Store for providers
export const proveedores = writable<Proveedor[]>(proveedoresData);

// Store for selected provider IDs
export const proveedoresSeleccionados = writable<string[]>([]);

// Store for search results
export interface ResultadoBusqueda {
  proveedor: string;
  proveedorId: string;
  producto: string;
  codigoBarras: string;
  precio: number;
}

export const resultadosBusqueda = writable<ResultadoBusqueda[]>([]);

// Helper function to get date age category
export function getDateAgeCategory(dateStr: string): 'recent' | 'medium' | 'old' {
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const now = new Date();
  const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
  
  if (diffMonths < 1) return 'recent';
  if (diffMonths <= 6) return 'medium';
  return 'old';
}

// Helper function to search products in selected providers
export function buscarProductos(query: string, proveedoresIds: string[]): ResultadoBusqueda[] {
  const resultados: ResultadoBusqueda[] = [];
  const queryLower = query.toLowerCase();
  
  proveedoresData.forEach(proveedor => {
    if (proveedoresIds.includes(proveedor.id)) {
      proveedor.productos.forEach(producto => {
        if (producto.nombre.toLowerCase().includes(queryLower)) {
          resultados.push({
            proveedor: proveedor.nombre,
            proveedorId: proveedor.id,
            producto: producto.nombre,
            codigoBarras: producto.codigoBarras,
            precio: producto.precio
          });
        }
      });
    }
  });
  
  // Sort by price ascending
  return resultados.sort((a, b) => a.precio - b.precio);
}

// Helper to find best price for a product by barcode
export function encontrarMejorPrecio(codigoBarras: string): { proveedor: string; precio: number; segundoPrecio: number | null } | null {
  const coincidencias: { proveedor: string; precio: number }[] = [];
  
  proveedoresData.forEach(proveedor => {
    const producto = proveedor.productos.find(p => p.codigoBarras === codigoBarras);
    if (producto) {
      coincidencias.push({
        proveedor: proveedor.nombre,
        precio: producto.precio
      });
    }
  });
  
  if (coincidencias.length === 0) return null;
  
  coincidencias.sort((a, b) => a.precio - b.precio);
  
  return {
    proveedor: coincidencias[0].proveedor,
    precio: coincidencias[0].precio,
    segundoPrecio: coincidencias.length > 1 ? coincidencias[1].precio : null
  };
}
