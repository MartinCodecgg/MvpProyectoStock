import type { Producto } from './productos';

// Productos detectados en una foto simulada (30+ productos)
// Mezcla de productos nuevos y actualizaciones de existentes
export interface ProductoFoto extends Producto {
  cantidad: number; // Cantidad a agregar al stock
  esNuevo: boolean;
}

export const productosFoto: ProductoFoto[] = [
  // Productos nuevos
  { id: 'prod051', nombre: 'Taladro percutor 650W', codigoBarras: '7798111222333', precio: 35000.00, stock: 0, cantidad: 10, esNuevo: true },
  { id: 'prod052', nombre: 'Amoladora 4 1/2" 850W', codigoBarras: '7798111222334', precio: 28000.00, stock: 0, cantidad: 8, esNuevo: true },
  { id: 'prod053', nombre: 'Sierra circular 7 1/4"', codigoBarras: '7798111222335', precio: 42000.00, stock: 0, cantidad: 5, esNuevo: true },
  { id: 'prod054', nombre: 'Soldadora inverter 200A', codigoBarras: '7798111222336', precio: 85000.00, stock: 0, cantidad: 3, esNuevo: true },
  { id: 'prod055', nombre: 'Escalera tijera aluminio 5 esc', codigoBarras: '7798111222337', precio: 38000.00, stock: 0, cantidad: 6, esNuevo: true },
  { id: 'prod056', nombre: 'Manguera jardín 1/2" x 30m', codigoBarras: '7798111222338', precio: 8500.00, stock: 0, cantidad: 15, esNuevo: true },
  { id: 'prod057', nombre: 'Bomba sumergible 1/2HP', codigoBarras: '7798111222339', precio: 52000.00, stock: 0, cantidad: 4, esNuevo: true },
  { id: 'prod058', nombre: 'Tanque agua 1000L', codigoBarras: '7798111222340', precio: 95000.00, stock: 0, cantidad: 2, esNuevo: true },
  { id: 'prod059', nombre: 'Cerradura exterior doble paleta', codigoBarras: '7798111222341', precio: 12500.00, stock: 0, cantidad: 12, esNuevo: true },
  { id: 'prod060', nombre: 'Candado seguridad 50mm', codigoBarras: '7798111222342', precio: 4200.00, stock: 0, cantidad: 20, esNuevo: true },
  { id: 'prod061', nombre: 'Bisagra puerta 3" cromada x par', codigoBarras: '7798111222343', precio: 2800.00, stock: 0, cantidad: 25, esNuevo: true },
  { id: 'prod062', nombre: 'Silicona neutra transparente', codigoBarras: '7798111222344', precio: 3500.00, stock: 0, cantidad: 18, esNuevo: true },
  { id: 'prod063', nombre: 'Disco corte metal 4 1/2"', codigoBarras: '7798111222345', precio: 1200.00, stock: 0, cantidad: 50, esNuevo: true },

  // Actualizaciones de productos existentes
  { id: 'prod011', nombre: 'Cemento Portland 50kg', codigoBarras: '7798123456799', precio: 12500.00, stock: 2500, cantidad: 500, esNuevo: false },
  { id: 'prod013', nombre: 'Arena fina x bolsa', codigoBarras: '7798123456801', precio: 3000.00, stock: 3200, cantidad: 400, esNuevo: false },
  { id: 'prod014', nombre: 'Ladrillo común', codigoBarras: '7798123456802', precio: 360.00, stock: 15000, cantidad: 2000, esNuevo: false },
  { id: 'prod016', nombre: 'Hierro 8mm x 12m', codigoBarras: '7798123456804', precio: 9200.00, stock: 450, cantidad: 100, esNuevo: false },
  { id: 'prod017', nombre: 'Hierro 12mm x 12m', codigoBarras: '7798123456805', precio: 19000.00, stock: 280, cantidad: 50, esNuevo: false },
  { id: 'prod021', nombre: 'Pintura látex interior 20L', codigoBarras: '7798123456809', precio: 29000.00, stock: 120, cantidad: 30, esNuevo: false },
  { id: 'prod022', nombre: 'Pintura látex exterior 20L', codigoBarras: '7798123456810', precio: 33000.00, stock: 95, cantidad: 25, esNuevo: false },
  { id: 'prod025', nombre: 'Rodillo espuma 23cm', codigoBarras: '7798123456813', precio: 1900.00, stock: 250, cantidad: 60, esNuevo: false },
  { id: 'prod031', nombre: 'Cable 2.5mm x metro', codigoBarras: '7798123456819', precio: 900.00, stock: 5000, cantidad: 1000, esNuevo: false },
  { id: 'prod032', nombre: 'Cable 4mm x metro', codigoBarras: '7798123456820', precio: 1400.00, stock: 3500, cantidad: 800, esNuevo: false },
  { id: 'prod033', nombre: 'Enchufe con tierra', codigoBarras: '7798123456821', precio: 1050.00, stock: 450, cantidad: 80, esNuevo: false },
  { id: 'prod034', nombre: 'Llave de luz simple', codigoBarras: '7798123456822', precio: 1250.00, stock: 520, cantidad: 100, esNuevo: false },
  { id: 'prod036', nombre: 'Llave térmica 16A', codigoBarras: '7798123456824', precio: 4000.00, stock: 185, cantidad: 40, esNuevo: false },
  { id: 'prod041', nombre: 'Caño PVC 110mm x 6m', codigoBarras: '7798123456829', precio: 8800.00, stock: 340, cantidad: 70, esNuevo: false },
  { id: 'prod042', nombre: 'Caño PVC 63mm x 6m', codigoBarras: '7798123456830', precio: 5400.00, stock: 480, cantidad: 90, esNuevo: false },
  { id: 'prod043', nombre: 'Codo PVC 110mm 90°', codigoBarras: '7798123456831', precio: 1000.00, stock: 650, cantidad: 120, esNuevo: false },
  { id: 'prod049', nombre: 'Tornillos autoperforantes x 100u', codigoBarras: '7798123456837', precio: 1250.00, stock: 850, cantidad: 150, esNuevo: false },
  { id: 'prod050', nombre: 'Clavos 2" x kg', codigoBarras: '7798123456838', precio: 2900.00, stock: 1200, cantidad: 200, esNuevo: false },
];
