// Tipo de producto
export interface Producto {
  id: string;
  nombre: string;
  codigoBarras: string;
  precio: number;
  stock: number;
}

// Catálogo de 50 productos simulados para ferretería
export const productos: Producto[] = [
  // Herramientas manuales
  { id: 'prod001', nombre: 'Martillo de goma 500g', codigoBarras: '7798123456789', precio: 5500.00, stock: 150 },
  { id: 'prod002', nombre: 'Destornillador plano 6"', codigoBarras: '7798123456790', precio: 2300.00, stock: 200 },
  { id: 'prod003', nombre: 'Destornillador phillips 6"', codigoBarras: '7798123456791', precio: 2400.00, stock: 180 },
  { id: 'prod004', nombre: 'Pinza de electricista 8"', codigoBarras: '7798123456792', precio: 4800.00, stock: 90 },
  { id: 'prod005', nombre: 'Alicate universal 7"', codigoBarras: '7798123456793', precio: 3900.00, stock: 120 },
  { id: 'prod006', nombre: 'Llave inglesa 10"', codigoBarras: '7798123456794', precio: 6500.00, stock: 75 },
  { id: 'prod007', nombre: 'Martillo de orejas 500g', codigoBarras: '7798123456795', precio: 6200.00, stock: 100 },
  { id: 'prod008', nombre: 'Sierra de arco con hoja', codigoBarras: '7798123456796', precio: 4500.00, stock: 60 },
  { id: 'prod009', nombre: 'Juego de llaves allen', codigoBarras: '7798123456797', precio: 3200.00, stock: 85 },
  { id: 'prod010', nombre: 'Cinta métrica 5m', codigoBarras: '7798123456798', precio: 2800.00, stock: 140 },

  // Materiales de construcción
  { id: 'prod011', nombre: 'Cemento Portland 50kg', codigoBarras: '7798123456799', precio: 12000.00, stock: 2500 },
  { id: 'prod012', nombre: 'Cal hidratada 25kg', codigoBarras: '7798123456800', precio: 4500.00, stock: 1800 },
  { id: 'prod013', nombre: 'Arena fina x bolsa', codigoBarras: '7798123456801', precio: 2800.00, stock: 3200 },
  { id: 'prod014', nombre: 'Ladrillo común', codigoBarras: '7798123456802', precio: 350.00, stock: 15000 },
  { id: 'prod015', nombre: 'Ladrillo hueco 8cm', codigoBarras: '7798123456803', precio: 280.00, stock: 12000 },
  { id: 'prod016', nombre: 'Hierro 8mm x 12m', codigoBarras: '7798123456804', precio: 8900.00, stock: 450 },
  { id: 'prod017', nombre: 'Hierro 12mm x 12m', codigoBarras: '7798123456805', precio: 18500.00, stock: 280 },
  { id: 'prod018', nombre: 'Pegamento cerámico 30kg', codigoBarras: '7798123456806', precio: 9800.00, stock: 320 },
  { id: 'prod019', nombre: 'Yeso x 25kg', codigoBarras: '7798123456807', precio: 5200.00, stock: 890 },
  { id: 'prod020', nombre: 'Membrana asfáltica 40kg', codigoBarras: '7798123456808', precio: 45000.00, stock: 85 },

  // Pinturas y accesorios
  { id: 'prod021', nombre: 'Pintura látex interior 20L', codigoBarras: '7798123456809', precio: 28000.00, stock: 120 },
  { id: 'prod022', nombre: 'Pintura látex exterior 20L', codigoBarras: '7798123456810', precio: 32000.00, stock: 95 },
  { id: 'prod023', nombre: 'Esmalte sintético blanco 1L', codigoBarras: '7798123456811', precio: 6800.00, stock: 200 },
  { id: 'prod024', nombre: 'Esmalte sintético negro 1L', codigoBarras: '7798123456812', precio: 6800.00, stock: 150 },
  { id: 'prod025', nombre: 'Rodillo espuma 23cm', codigoBarras: '7798123456813', precio: 1800.00, stock: 250 },
  { id: 'prod026', nombre: 'Pincel 2"', codigoBarras: '7798123456814', precio: 1200.00, stock: 300 },
  { id: 'prod027', nombre: 'Pincel 4"', codigoBarras: '7798123456815', precio: 2100.00, stock: 220 },
  { id: 'prod028', nombre: 'Aguarrás mineral 1L', codigoBarras: '7798123456816', precio: 2500.00, stock: 180 },
  { id: 'prod029', nombre: 'Diluyente sintético 1L', codigoBarras: '7798123456817', precio: 2800.00, stock: 160 },
  { id: 'prod030', nombre: 'Enduido plástico interior 30kg', codigoBarras: '7798123456818', precio: 11500.00, stock: 140 },

  // Material eléctrico
  { id: 'prod031', nombre: 'Cable 2.5mm x metro', codigoBarras: '7798123456819', precio: 850.00, stock: 5000 },
  { id: 'prod032', nombre: 'Cable 4mm x metro', codigoBarras: '7798123456820', precio: 1350.00, stock: 3500 },
  { id: 'prod033', nombre: 'Enchufe con tierra', codigoBarras: '7798123456821', precio: 980.00, stock: 450 },
  { id: 'prod034', nombre: 'Llave de luz simple', codigoBarras: '7798123456822', precio: 1200.00, stock: 520 },
  { id: 'prod035', nombre: 'Llave térmica 10A', codigoBarras: '7798123456823', precio: 3500.00, stock: 0 },
  { id: 'prod036', nombre: 'Llave térmica 16A', codigoBarras: '7798123456824', precio: 3800.00, stock: 185 },
  { id: 'prod037', nombre: 'Caja de luz embutir', codigoBarras: '7798123456825', precio: 890.00, stock: 380 },
  { id: 'prod038', nombre: 'Cinta aisladora', codigoBarras: '7798123456826', precio: 650.00, stock: 420 },
  { id: 'prod039', nombre: 'Caño corrugado 3/4 x metro', codigoBarras: '7798123456827', precio: 580.00, stock: 2800 },
  { id: 'prod040', nombre: 'Tubo fluorescente LED 18W', codigoBarras: '7798123456828', precio: 4200.00, stock: 210 },

  // Plomería
  { id: 'prod041', nombre: 'Caño PVC 110mm x 6m', codigoBarras: '7798123456829', precio: 8500.00, stock: 340 },
  { id: 'prod042', nombre: 'Caño PVC 63mm x 6m', codigoBarras: '7798123456830', precio: 5200.00, stock: 480 },
  { id: 'prod043', nombre: 'Codo PVC 110mm 90°', codigoBarras: '7798123456831', precio: 980.00, stock: 650 },
  { id: 'prod044', nombre: 'Canilla monocomando cocina', codigoBarras: '7798123456832', precio: 12500.00, stock: 45 },
  { id: 'prod045', nombre: 'Canilla monocomando baño', codigoBarras: '7798123456833', precio: 18000.00, stock: 38 },
  { id: 'prod046', nombre: 'Cinta teflón', codigoBarras: '7798123456834', precio: 450.00, stock: 580 },
  { id: 'prod047', nombre: 'Unión PVC 110mm', codigoBarras: '7798123456835', precio: 650.00, stock: 420 },
  { id: 'prod048', nombre: 'Sifón pileta cocina', codigoBarras: '7798123456836', precio: 3200.00, stock: 95 },

  // Ferretería general
  { id: 'prod049', nombre: 'Tornillos autoperforantes x 100u', codigoBarras: '7798123456837', precio: 1200.00, stock: 850 },
  { id: 'prod050', nombre: 'Clavos 2" x kg', codigoBarras: '7798123456838', precio: 2800.00, stock: 1200 },
];
