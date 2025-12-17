
# DOCUMENTO COMPLEMENTARIO - NUEVOS FEATURES MVP v2.0

## INFORMACIÓN GENERAL

Este documento detalla los nuevos features a agregar al MVP existente. Estos features complementan la especificación original y deben integrarse manteniendo la coherencia visual y funcional del sistema.

**Versión**: 2.0  
**Fecha**: Diciembre 2025  
**Nota importante**: Todos estos features son simulaciones sin lógica backend real. Los datos son estáticos y decorativos para demostración.

---

## CAMBIOS EN LA ESTRUCTURA GENERAL

### Actualización del Menú Lateral

**Orden de secciones (de arriba hacia abajo)**:

1. **Logo + Nombre del negocio** ("Mi Negocio" + logo PNG)
2. Caja
3. Gestión de Stock
4. Reposición
5. Analíticas (renombrar de "Dashboard")
6. Reportes (sin implementar)
7. Sincronización
8. Configuración

**Nota**: El item "Dashboard" debe renombrarse a "Analíticas" en toda la aplicación.

### Actualización del Header Superior

**Estructura de izquierda a derecha**:

```
[...espaciado...] [Admin] [PRO] [🔔 5] [🌓]
```

**Elementos**:

1. **Nombre de usuario**: "Admin" (texto normal)
2. **Badge PRO**: Insignia naranja junto al nombre
3. **Icono de notificaciones**: Campana con número de alertas
4. **Botón de tema**: Cambio entre claro/oscuro

**Espaciado**: El header debe mantener estos elementos alineados a la derecha con espaciado consistente entre cada uno.

---

## FEATURE 1: INSIGNIA DE USUARIO PRO

### Especificación Visual

**Ubicación**: Header superior, inmediatamente a la derecha del nombre "Admin"

**Diseño del badge**:

- Texto: "PRO" (mayúsculas, negrita)
- Color de fondo: Naranja `#f97316` (brand-orange)
- Color de texto: Blanco o negro (según contraste óptimo)
- Forma: Rectángulo con bordes redondeados (border-radius: 4-6px)
- Tamaño: Pequeño, proporcional al texto del nombre (aprox. 40x20px)
- Padding interno: 4px horizontal, 2px vertical

**Ejemplo visual**:

```
Admin [PRO]
      ▲
      Badge naranja, letras blancas en negrita
```

**Comportamiento**:

- Sin interactividad (no es clickeable)
- Sin tooltip/hover
- Siempre visible

---

## FEATURE 2: SISTEMA DE NOTIFICACIONES

### 2.1 Icono de Notificaciones en Header

**Ubicación**: Header superior, entre el badge PRO y el botón de tema

**Diseño del icono**:

- Icono: Campana 🔔 (usar ícono SVG o emoji)
- Badge numérico: Círculo rojo pequeño en esquina superior derecha del icono
- Número dentro del badge: "5" (cantidad total de alertas simuladas)
- Color del badge: Rojo `#ef4444` o similar
- Tamaño del badge: ~18x18px, fuente pequeña (10-11px)

**Comportamiento**:

- Al hacer click: Despliega panel dropdown de notificaciones
- Al hacer click fuera del panel: Se cierra el dropdown
- Cursor: pointer (indica que es clickeable)

### 2.2 Panel Dropdown de Notificaciones

**Estructura general**:

```
┌─────────────────────────────────────┐
│ NOTIFICACIONES              [X]     │
├─────────────────────────────────────┤
│ STOCK BAJO (2)                      │
│ • Martillo de goma 500g             │
│   Stock bajo (3 unidades)           │
│ • Destornillador plano              │
│   Stock bajo (5 unidades)           │
├─────────────────────────────────────┤
│ VENCIMIENTOS (2)                    │
│ • Pintura Látex blanco 20LTS        │
│   Vence en 10 días                  │
│ • Aguarrás mineral 5L               │
│   Vence en 15 días                  │
├─────────────────────────────────────┤
│ STOCK AGOTADO (1)                   │
│ • Cemento Portland 50kg             │
│   SIN STOCK                         │
└─────────────────────────────────────┘
```

**Especificaciones técnicas**:

**Posición**:

- Dropdown anclado al icono de notificaciones
- Se despliega hacia abajo y ligeramente a la izquierda
- Ancho: 350-400px
- Alto máximo: 500px con scroll interno si es necesario

**Header del panel**:

- Título: "NOTIFICACIONES" (mayúsculas, negrita)
- Botón cerrar (X) en esquina superior derecha
- Separador horizontal debajo del header

**Secciones (categorías)**:

1. **STOCK BAJO**
2. **VENCIMIENTOS**
3. **STOCK AGOTADO**

Cada sección incluye:

- Título de categoría: Texto en mayúsculas, semibold
- Contador entre paréntesis: ej. "(2)"
- Separador horizontal después de cada sección

**Formato de cada notificación**:

_Stock Bajo_:

```
• [Nombre del producto]
  Stock bajo ([cantidad] unidades)
```

_Vencimientos_:

```
• [Nombre del producto]
  Vence en [X] días
```

_Stock Agotado_ (énfasis visual mayor):

```
• [Nombre del producto]
  SIN STOCK (texto en rojo o con mayor énfasis)
```

**Notificaciones simuladas específicas**:

```typescript
const notificaciones = [
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
```

**Orden de notificaciones**:

1. Primero: Stock Agotado (más crítico)
2. Segundo: Vencimientos
3. Tercero: Stock Bajo

**Comportamiento al hacer click en una notificación**:

- Por ahora: Solo muestra la información (sin navegación)
- Futuro: Debería navegar a ese producto en Gestión de Stock

**Estilos**:

- Fondo: Blanco (modo claro) / Gris oscuro (modo oscuro)
- Sombra: Box-shadow suave para dar profundidad
- Bordes redondeados: 8-12px
- Texto "SIN STOCK": Color rojo `#ef4444`, negrita

---

## FEATURE 3: SECCIÓN SINCRONIZACIÓN (PRO)

### 3.1 Nueva Sección en Menú Lateral

**Nombre**: "Sincronización"  
**Ícono**: Símbolo de nube o sync (🔄, ☁️, o SVG)  
**Posición**: Entre "Reportes" y "Configuración"  
**Badge PRO**: Incluir insignia "PRO" pequeña junto al nombre de la sección

### 3.2 Contenido de la Sección

**Layout general**:

```
┌────────────────────────────────────────────┐
│ SINCRONIZACIÓN [PRO]                       │
├────────────────────────────────────────────┤
│                                            │
│ ┌────────────────────────────────────────┐│
│ │ ESTADO DE CONEXIÓN                     ││
│ │                                        ││
│ │ ● Conectado                            ││
│ │ Última sincronización: Hace 5 minutos  ││
│ └────────────────────────────────────────┘│
│                                            │
│ ┌────────────────────────────────────────┐│
│ │ BACKUP DE DATOS                        ││
│ │                                        ││
│ │ Último backup: 16/12/2025 14:30       ││
│ │ Tamaño: 2.4 MB                         ││
│ │ Estado: ✓ Exitoso                      ││
│ │                                        ││
│ │ [Hacer Backup Manual]                  ││
│ └────────────────────────────────────────┘│
└────────────────────────────────────────────┘
```

**Especificaciones detalladas**:

#### Card 1: Estado de Conexión

**Elementos**:

- Título: "ESTADO DE CONEXIÓN"
- Indicador visual: Círculo verde ● (color: `#22c55e`)
- Texto de estado: "Conectado"
- Línea adicional: "Última sincronización: Hace 5 minutos"

**Estilos**:

- Card con borde o sombra sutil
- Padding generoso
- Indicador y texto alineados horizontalmente
- Fuente del estado en semibold

**Datos simulados**:

- Estado: Siempre "Conectado"
- Tiempo: Alternar aleatoriamente entre "Hace 5 minutos", "Hace 12 minutos", "Hace 1 hora"

#### Card 2: Backup de Datos

**Elementos**:

- Título: "BACKUP DE DATOS"
- Fecha del último backup: Formato DD/MM/YYYY HH:MM
- Tamaño: En MB
- Estado: Con ícono de check ✓ y texto "Exitoso"
- Botón: "Hacer Backup Manual" (decorativo, no funcional)

**Datos simulados**:

```typescript
{
  ultimoBackup: "16/12/2025 14:30",
  tamaño: "2.4 MB",
  estado: "Exitoso"
}
```

**Botón "Hacer Backup Manual"**:

- Color: Naranja `#f97316` o secundario
- Estado: Habilitado visualmente pero sin funcionalidad
- Al hacer click: Puede mostrar un spinner breve y luego "Backup completado" (simulado)

**Nota importante**: Esta sección debe tener visible la insignia PRO tanto en el menú lateral como en el título de la sección para indicar que es una funcionalidad premium.

---

## FEATURE 4: SECCIÓN REPOSICIÓN

### 4.1 Nueva Sección en Menú Lateral

**Nombre**: "Reposición"  
**Ícono**: Carrito de compras, flecha circular, o caja (📦, 🔄, 🛒)  
**Posición**: Entre "Gestión de Stock" y "Analíticas"

### 4.2 Contenido de la Sección

**Layout general**:

```
┌────────────────────────────────────────────┐
│ REPOSICIÓN                                 │
├────────────────────────────────────────────┤
│ Basado en el volumen de ventas y análisis │
│ predictivo, se recomienda reponer los      │
│ siguientes productos para evitar quiebre   │
│ de stock.                                  │
├────────────────────────────────────────────┤
│                                            │
│ [Card Producto 1]  [Card Producto 2]      │
│                                            │
│ [Card Producto 3]  [Card Producto 4]      │
│                                            │
│ [Card Producto 5]  [Card Producto 6]      │
│                                            │
│ [...más cards en grid]                    │
└────────────────────────────────────────────┘
```

**Mensaje introductorio**: Mostrar UNA SOLA VEZ arriba, aplicable a todos los productos:

```
"Basado en el volumen de ventas y análisis predictivo, 
se recomienda reponer los siguientes productos para 
evitar quiebre de stock."
```

### 4.3 Diseño de Cards de Recomendación

**Layout de cada card**:

```
┌─────────────────────────────────┐
│ 🔴 URGENTE                      │ (indicador de urgencia)
│                                 │
│ Cemento Portland 50kg           │ (nombre producto)
│                                 │
│ Stock actual: 45 unidades       │
│ Días hasta agotamiento: 8 días  │
│ Cantidad recomendada: 200 un.   │
│ Precio de reposición: $2.400.000│
│ Vencimiento: No aplica          │
│                                 │
│ [Ver Detalles]                  │ (botón decorativo)
└─────────────────────────────────┘
```

**Especificaciones técnicas**:

**Grid de cards**:

- 2 columnas en desktop
- 1 columna en móvil (aunque el MVP no es responsive, considerar para futuro)
- Gap entre cards: 20-24px
- Total de cards: 10 productos

**Indicador de urgencia** (en header del card):

```
🔴 URGENTE     - Agotamiento en < 7 días (rojo)
🟡 MEDIO       - Agotamiento en 7-14 días (amarillo/naranja)
🟢 NORMAL      - Agotamiento en > 14 días (verde)
```

**Información por card**:

1. **Nombre del producto**: Texto destacado, semibold
2. **Stock actual**: [cantidad] unidades
3. **Días hasta agotamiento**: [X] días
4. **Cantidad recomendada**: [cantidad] unidades
5. **Precio de reposición**: Total estimado (cantidad × precio proveedor)
6. **Vencimiento**:
    - Si aplica: "Vencimiento: [fecha]" o "Vence en [X] meses"
    - Si no aplica: "Vencimiento: No aplica" (o simplemente omitir la línea)

**Botón "Ver Detalles"**:

- Decorativo, sin funcionalidad
- Color secundario
- Al hacer click: No hace nada (o puede mostrar modal con la misma info ampliada)

### 4.4 Datos Simulados (10 productos)

```typescript
const recomendaciones = [
  {
    nombre: "Cemento Portland 50kg",
    stockActual: 45,
    diasHastaAgotamiento: 8,
    cantidadRecomendada: 200,
    precioReposicion: 2400000, // $12.000 x 200
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
```

**Cálculo de precio de reposición**:

- Precio del proveedor (aprox. 70-80% del precio de venta) × cantidad recomendada
- Mostrar formato: $X.XXX.XXX,XX

---

## FEATURE 5: SECCIÓN ANALÍTICAS (Renombrado de Dashboard)

### 5.1 Actualización de Nombre

**Cambios necesarios**:

- Renombrar sección "Dashboard" a "Analíticas" en el menú lateral
- Actualizar ícono si es necesario (📊, 📈)
- Mantener misma posición en el menú

### 5.2 Contenido de la Sección

**Layout general**:

```
┌────────────────────────────────────────────┐
│ ANALÍTICAS                                 │
├────────────────────────────────────────────┤
│ [Selector: Hoy | Esta semana | Este mes ▼]│
├────────────────────────────────────────────┤
│                                            │
│ [Gráfico 1: Ventas por día del mes]       │
│                                            │
│ [Gráfico 2: Top productos vendidos]       │
│                                            │
│ [Gráfico 3: Distribución por categoría]   │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ [Card] [Card] [Card] [Card] [Card]        │
│ [Card] [Card] [Card] [Card] [Card]        │
│                                            │
└────────────────────────────────────────────┘
```

**Orden de elementos**:

1. Selector de período (decorativo)
2. Gráficos (todos juntos)
3. Cards con KPIs (todas juntas debajo)

### 5.3 Selector de Período

**Diseño**:

- Dropdown/select con opciones: "Hoy", "Esta semana", "Este mes", "Último mes"
- Valor por defecto: "Este mes"
- **Funcionalidad**: Decorativo, no cambia los datos mostrados
- Ubicación: Esquina superior derecha de la sección, antes de los gráficos

### 5.4 Gráficos

#### Gráfico 1: Ventas por Día del Mes (Líneas)

**Tipo**: Line chart  
**Datos**: Ventas diarias del mes actual (días 1-30)  
**Ejes**:

- X: Días del mes (1, 2, 3, ..., 30)
- Y: Monto en pesos ($)

**Datos simulados**:

```typescript
const ventasPorDia = [
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
  // ... continuar hasta día 30
  // Generar variación realista entre $75.000 y $125.000
];
```

**Colores**: Línea en naranja `#f97316` o lima `#84cc16`

#### Gráfico 2: Top 5 Productos Más Vendidos (Barras horizontales)

**Tipo**: Horizontal bar chart  
**Datos**: Los 5 productos más vendidos con cantidad

**Datos simulados**:

```typescript
const topProductos = [
  { producto: "Cemento Portland 50kg", cantidad: 1250 },
  { producto: "Hierro 8mm x 12m", cantidad: 890 },
  { producto: "Pintura látex 20L", cantidad: 450 },
  { producto: "Martillo de goma", cantidad: 320 },
  { producto: "Caño PVC 110mm", cantidad: 280 }
];
```

**Colores**: Gradiente o colores alternados del tema

#### Gráfico 3: Distribución por Método de Pago (Torta)

**Tipo**: Pie chart  
**Datos**: Porcentaje de ventas por método de pago

**Datos simulados**:

```typescript
const distribucionPagos = [
  { metodo: "Efectivo", porcentaje: 45, monto: 2870000 },
  { metodo: "Transferencia", porcentaje: 30, monto: 1914000 },
  { metodo: "Débito", porcentaje: 15, monto: 957000 },
  { metodo: "Crédito", porcentaje: 10, monto: 638000 }
];
```

**Colores**: Usar paleta del tema (lima, naranja, grises)

### 5.5 Cards de KPIs (Métricas Clave)

**Grid de cards**:

- 5 cards por fila (ajustar según espacio)
- Total: 10 cards

**Lista de KPIs**:

1. **Total Ganado Hoy**
    
    ```
    Total Ganado Hoy
    $ 125.000,00
    +12% vs ayer
    ```
    
2. **Total Ganado Este Mes**
    
    ```
    Total Ganado Este Mes
    $ 3.450.000,00
    +8% vs mes anterior
    ```
    
3. **Producto Más Vendido**
    
    ```
    Producto Más Vendido
    Cemento Portland 50kg
    1.250 unidades
    ```
    
4. **Cantidad de Ventas**
    
    ```
    Transacciones Hoy
    47 ventas
    ```
    
5. **Ticket Promedio**
    
    ```
    Ticket Promedio
    $ 2.659,57
    ```
    
6. **Salud del Negocio**
    
    ```
    Salud del Negocio
    🟢 Rentable
    Ganancia neta: 18%
    ```
    
    - Indicadores: 🟢 Rentable | 🟡 Punto de equilibrio | 🔴 Pérdida
7. **Productos Menos Vendidos**
    
    ```
    Productos Menos Vendidos
    Taladro percutor
    5 unidades este mes
    ```
    
8. **Productos Sin Ganancia**
    
    ```
    Productos Sin Ganancia
    3 productos
    [Ver listado]
    ```
    
9. **Comparativa Semanal**
    
    ```
    Ventas Esta Semana
    $ 875.000,00
    +15% vs semana anterior
    ```
    
10. **Stock Crítico**
    
    ```
    Stock Crítico
    12 productos
    Requieren atención
    ```
    

**Diseño de cada card**:

- Título en parte superior (más pequeño)
- Valor principal destacado (grande, bold)
- Línea adicional con contexto o comparativa
- Fondo con sombra sutil
- Bordes redondeados

**Datos simulados para todas las cards**:

```typescript
const kpis = {
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
```

---

## FEATURE 6: LOGO DEL NEGOCIO

### Especificación

**Ubicación**: Menú lateral, parte superior, inmediatamente a la izquierda del texto "Mi Negocio"

**Diseño**:

```
┌─────────────────────────┐
│ [🏪] Mi Negocio         │
│                         │
│ [🏪] Caja               │
│ [📦] Gestión de Stock   │
│ ...                     │
└─────────────────────────┘
```

**Especificaciones técnicas**:

- Tipo: Imagen PNG (usar placeholder o icono de ferretería)
- Tamaño: Igual al tamaño de los iconos de las secciones del menú (aprox. 24x24px o 32x32px)
- Alineación: Horizontal con el texto "Mi Negocio"
- Espaciado: 8-12px entre logo y texto

**Archivo**:

- Nombre sugerido: `logo-negocio.png`
- Ubicación: `/src/assets/logo-negocio.png`
- Alternativa: Usar un ícono placeholder tipo 🏪, 🛠️, 🔨

**Comportamiento**:

- Sin interactividad
- Siempre visible

---

## FEATURE 7: CONFIGURACIÓN DE MÁRGENES DE GANANCIA

### 7.1 Nueva Sección: Configuración

**Ubicación**: Última sección en el menú lateral  
**Ícono**: Engranaje ⚙️ o similar

### 7.2 Subsecciones dentro de Configuración

**Lista de subsecciones**:

1. Márgenes de Ganancia ✅ (implementada)
2. Datos del Negocio (visible pero sin implementar)
3. Preferencias de Usuario (visible pero sin implementar)

### 7.3 Subsección: Márgenes de Ganancia

**Layout**:

```
┌────────────────────────────────────────────┐
│ CONFIGURACIÓN > MÁRGENES DE GANANCIA      │
├────────────────────────────────────────────┤
│                                            │
│ Configure los márgenes de ganancia para   │
│ cada método de pago. Estos porcentajes se │
│ aplicarán automáticamente en las ventas.  │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ Efectivo:        0%                        │
│ Transferencia:   10%                       │
│ Débito:          3%                        │
│ Crédito:         15%                       │
│ QR/Mercado Pago: 8%                        │
│                                            │
│ [Guardar Cambios]                          │
│                                            │
└────────────────────────────────────────────┘
```

**Especificaciones**:

**Texto introductorio**:

```
"Configure los márgenes de ganancia para cada método de pago. 
Estos porcentajes se aplicarán automáticamente en las ventas."
```

**Lista de métodos de pago con porcentajes**:

```typescript
const margenes = {
  efectivo: 0,
  transferencia: 10,
  debito: 3,
  credito: 15,
  qrMercadoPago: 8
};
```

**Formato de cada línea**:

```
[Método de pago]:  [XX]%
```

- Alineación: Método a la izquierda, porcentaje a la derecha
- Espaciado generoso entre líneas
- **Sin campos editables**: Solo mostrar los valores de forma estática

**Botón "Guardar Cambios"**:

- Color: Naranja `#f97316` o verde lima `#84cc16`
- Estado: Visible pero sin funcionalidad real
- Al hacer click: Puede mostrar mensaje temporal "Cambios guardados" (simulado)
- Ubicación: Debajo de la lista de márgenes, centrado o alineado a la derecha

**Funcionalidad**:

- **Importante**: Esta configuración NO afecta los cálculos en la sección Caja
- Es solo visual y decorativa para demostración del MVP
- Los porcentajes mostrados son estáticos y no modificables

---

## FEATURE 8: CHAT CON ASISTENTE IA (JARVIS)

### 8.1 Botón Flotante

**Ubicación**: Esquina inferior derecha de la pantalla

**Diseño del botón**:

- Forma: Círculo
- Tamaño: 60x60px
- Color de fondo: Degradado azul/cyan (colores tipo Jarvis/IA)
- Ícono: Imagen de Jarvis o ícono representativo de IA
- Sombra: Box-shadow pronunciada para dar sensación de flotación
- Posición fija (fixed) en la pantalla

**Comportamiento**:

- Hover: Efecto de escala ligera (scale: 1.05)
- Click: Abre el panel de chat
- Cursor: pointer

### 8.2 Panel de Chat

**Diseño general**:

```
                    ┌─────────────────────┐
                    │ Jarvis         [X]  │
                    ├─────────────────────┤
                    │                     │
                    │   [Imagen Jarvis    │
                    │    de fondo]        │
                    │                     │
                    │  ┌──────────────┐   │
                    │  │Buenas tardes,│   │
                    │  │Admin         │   │
                    │  └──────────────┘   │
                    │                     │
                    ├─────────────────────┤
                    │ [Escribe mensaje...] │
                    └─────────────────────┘
```

**Especificaciones técnicas**:

**Dimensiones**:

- Ancho: 20% del viewport width
- Alto: 50% del viewport height
- Mínimo sugerido: 300px ancho × 400px alto

**Posición**:

- Esquina inferior derecha
- Margen desde los bordes: 20px (tanto derecha como abajo)
- Posición: fixed

**Header del chat**:

- Texto: "Jarvis"
- Botón cerrar (X) en esquina superior derecha
- Altura: 50-60px
- Fondo: Degradado azul oscuro/cyan

**Área de mensajes**:

- Fondo: Imagen de Jarvis (tipo holograma, semi-transparente)
- Los mensajes se muestran ENCIMA de la imagen de fondo
- Padding: 16-20px

**Mensaje inicial**:

```
┌──────────────────┐
│ Buenas tardes,   │
│ Admin            │
└──────────────────┘
```

- Burbuja de mensaje del lado izquierdo (mensaje del asistente)
- Fondo de burbuja: Blanco semi-transparente o azul claro
- Texto: Oscuro, legible sobre el fondo

**Input de mensaje**:

- Placeholder: "Escribe un mensaje..."
- Ubicación: Parte inferior del panel
- Altura: 40-50px
- Con ícono de enviar (➤ o similar) a la derecha
- **Importante**: El input existe pero no es funcional (no procesa ni envía mensajes)

**Imagen de fondo (Jarvis)**:

- Usar imagen tipo holograma azul/cyan
- Opacidad reducida (0.1-0.2) para no interferir con la legibilidad
- Centrada en el área de mensajes
- Sugerencia: Buscar "jarvis hologram" o usar placeholder similar

**Comportamiento**:

- Al abrir: Se muestra automáticamente el mensaje de bienvenida
- No hay más mensajes ni respuestas
- El input no procesa texto ni envía mensajes
- Botón cerrar (X): Cierra el panel y vuelve al botón flotante

**Estilos adicionales**:

- Bordes redondeados: 12-16px
- Sombra: Box-shadow pronunciada
- Animación de apertura: Slide-in desde abajo o fade-in

---

## FEATURE ADICIONAL 1: LOGO DE FONDO EN SECCIÓN CAJA

### Especificación

**Cuándo se muestra**: En la sección Caja, cuando NO hay resultados de búsqueda activos

**Diseño**:

```
┌────────────────────────────────────────────┐
│ CAJA                                       │
├────────────────────────────────────────────┤
│ [Buscar producto...]  [Buscar]            │
├────────────────────────────────────────────┤
│                                            │
│                                            │
│              [Logo del                     │
│               Negocio]                     │
│                                            │
│                                            │
└────────────────────────────────────────────┘
```

**Ubicación**:

- Centro exacto del área de resultados de búsqueda
- Cuando el campo de búsqueda está vacío o no hay resultados

**Especificaciones**:

- Imagen: Logo del negocio (misma imagen PNG del menú lateral)
- Tamaño: Grande, aprox. 150-200px
- Opacidad: Reducida (0.1-0.15) para efecto watermark/fondo
- Posición: Absolutamente centrado (horizontal y verticalmente)
- Z-index: Detrás de cualquier contenido que aparezca

**Comportamiento**:

- Cuando aparecen resultados de búsqueda: El logo desaparece (fade out)
- Cuando se limpia la búsqueda: El logo vuelve a aparecer (fade in)

**Alternativa**: Si no se puede usar la misma imagen PNG, usar un ícono de ferretería grande y semi-transparente

---

## FEATURE ADICIONAL 2: INSIGNIAS PRO EN SECCIONES

### Especificación General

**Objetivo**: Marcar visualmente las funcionalidades que son exclusivas del plan PRO

**Secciones que deben tener insignia PRO**:

1. Sincronización (menú lateral + título de sección)
2. Cualquier otra funcionalidad que se defina como PRO en el futuro

### Diseño de la Insignia

**En el menú lateral**:

```
[ícono] Sincronización [PRO]
                       ▲
                    Badge pequeño
```

**Especificaciones**:

- Tamaño: Más pequeño que el badge del header (aprox. 30x16px)
- Color de fondo: Naranja `#f97316`
- Texto: "PRO" en mayúsculas, negrita, blanco
- Ubicación: A la derecha del nombre de la sección
- Bordes redondeados: 3-4px

**En el título de la sección**:

```
SINCRONIZACIÓN [PRO]
                ▲
          Badge normal
```

**Especificaciones**:

- Mismo tamaño que el badge del header
- Mismo estilo (naranja, texto blanco, negrita)
- Ubicación: Junto al título, alineado verticalmente

**Comportamiento**:

- Sin interactividad
- Siempre visible en las secciones PRO
- Ayuda a diferenciar features gratuitos vs premium en demos

---

## RESUMEN DE CAMBIOS EN LA ESTRUCTURA

### Menú Lateral Actualizado (orden de arriba hacia abajo)

```
┌───────────────────────────┐
│ [🏪] Mi Negocio           │ ← Logo + nombre
├───────────────────────────┤
│ [🏪] Caja                 │
│ [📦] Gestión de Stock     │
│ [🔄] Reposición           │
│ [📊] Analíticas           │ ← Renombrado
│ [📈] Reportes             │ (sin implementar)
│ [☁️] Sincronización [PRO] │ ← Nueva sección
│ [⚙️] Configuración        │ ← Nueva sección
└───────────────────────────┘
```

### Header Superior Actualizado

```
[...espaciado...] [Admin] [PRO] [🔔 5] [🌓]
                   ▲      ▲      ▲      ▲
                   │      │      │      └─ Tema
                   │      │      └─────── Notificaciones
                   │      └──────────── Badge PRO
                   └────────────────── Usuario
```

### Nuevas Pantallas/Secciones

1. **Reposición**: 10 cards con recomendaciones de compra
2. **Analíticas**: 3 gráficos + 10 cards de KPIs
3. **Sincronización**: Estado de conexión + backup
4. **Configuración**: Subsección de márgenes de ganancia

### Nuevos Componentes Flotantes

1. **Panel de notificaciones**: Dropdown desde header
2. **Chat Jarvis**: Botón flotante + panel de chat

---

## DATOS SIMULADOS ADICIONALES

### Notificaciones (ya especificadas en Feature 2)

Ver sección 2.2 para el array completo de notificaciones simuladas.

### Recomendaciones de Reposición (ya especificadas en Feature 4)

Ver sección 4.4 para el array completo de 10 productos recomendados.

### KPIs para Analíticas (ya especificadas en Feature 5)

Ver sección 5.5 para el objeto completo de KPIs.

### Datos de Sincronización

```typescript
const sincronizacion = {
  estado: "Conectado",
  ultimaSincronizacion: "Hace 5 minutos", // alternar con "Hace 12 minutos", "Hace 1 hora"
  ultimoBackup: {
    fecha: "16/12/2025 14:30",
    tamaño: "2.4 MB",
    estado: "Exitoso"
  }
};
```

### Márgenes de Ganancia

```typescript
const margenes = {
  efectivo: 0,
  transferencia: 10,
  debito: 3,
  credito: 15,
  qrMercadoPago: 8
};
```

---

## GUÍA DE IMPLEMENTACIÓN SUGERIDA

### Orden de Desarrollo Recomendado

**Prioridad Alta (implementar primero)**:

1. Actualizar header con badge PRO y notificaciones
2. Agregar logo del negocio en menú lateral
3. Renombrar Dashboard a Analíticas
4. Implementar panel de notificaciones (Feature 2)
5. Crear sección Reposición (Feature 4)

**Prioridad Media**: 6. Crear sección Analíticas completa con gráficos (Feature 5) 7. Crear sección Sincronización (Feature 3) 8. Crear sección Configuración con márgenes (Feature 7)

**Prioridad Baja (últimos detalles)**: 9. Implementar chat Jarvis (Feature 8) 10. Agregar logo de fondo en Caja (Feature Adicional 1) 11. Agregar insignias PRO en secciones (Feature Adicional 2)

### Componentes Nuevos a Crear

**Componentes reutilizables**:

- `BadgePro.svelte`: Badge naranja con texto "PRO"
- `NotificationIcon.svelte`: Icono de campana con badge numérico
- `NotificationPanel.svelte`: Panel dropdown de notificaciones
- `RecommendationCard.svelte`: Card de recomendación de reposición
- `KpiCard.svelte`: Card de métrica/KPI
- `ChartWrapper.svelte`: Wrapper para gráficos con Chart.js
- `ChatButton.svelte`: Botón flotante del chat
- `ChatPanel.svelte`: Panel del chat con Jarvis

**Nuevas páginas/secciones**:

- `Reposicion.svelte`
- `Analiticas.svelte` (actualizar desde Dashboard)
- `Sincronizacion.svelte`
- `Configuracion.svelte`

### Stores Adicionales Necesarios

```typescript
// src/lib/stores/notifications.ts
import { writable } from 'svelte/store';
export const notifications = writable([...notificaciones simuladas]);
export const notificationCount = writable(5);

// src/lib/stores/recommendations.ts
import { writable } from 'svelte/store';
export const recommendations = writable([...recomendaciones simuladas]);

// src/lib/stores/analytics.ts
import { writable } from 'svelte/store';
export const analyticsData = writable({...datos de KPIs y gráficos});

// src/lib/stores/sync.ts
import { writable } from 'svelte/store';
export const syncStatus = writable({...datos de sincronización});

// src/lib/stores/chat.ts
import { writable } from 'svelte/store';
export const chatOpen = writable(false);
```

---

## CONSIDERACIONES TÉCNICAS ADICIONALES

### Librerías para Gráficos

Usar **Chart.js** con el wrapper **svelte-chartjs**:

```bash
npm install chart.js svelte-chartjs
```

Alternativamente, si Svelte 5 tiene issues de compatibilidad, usar Chart.js directamente sin wrapper.

### Imágenes y Assets Necesarios

**Nuevos assets a incluir**:

1. `logo-negocio.png` - Logo del negocio (ícono de ferretería)
2. `jarvis-hologram.png` - Imagen de fondo para el chat (tipo holograma)

**Ubicación**: `/src/assets/` o `/public/assets/`

### Animaciones y Transiciones

**Elementos con animaciones**:

- Panel de notificaciones: Slide-down + fade-in
- Chat panel: Slide-up + fade-in
- Logo de fondo en Caja: Fade-in / fade-out
- Cards de reposición: Hover con scale ligero

**Implementación**: Usar transitions de Svelte o Tailwind's transition utilities

### Responsive (recordatorio)

Aunque el MVP no requiere responsive design, considerar:

- El chat debe adaptarse mínimamente para no romper en pantallas más pequeñas
- Las secciones con grids (reposición, analíticas) pueden ajustarse con CSS Grid auto-fit

---

## CHECKLIST DE IMPLEMENTACIÓN v2.0

### Features Principales

- [ ] Badge PRO en header junto al nombre de usuario
- [ ] Icono de notificaciones en header con badge numérico
- [ ] Panel dropdown de notificaciones con 5 alertas simuladas
- [ ] Logo del negocio en menú lateral
- [ ] Sección "Dashboard" renombrada a "Analíticas"
- [ ] Nueva sección "Reposición" con 10 cards de recomendaciones
- [ ] Nueva sección "Analíticas" con 3 gráficos y 10 KPIs
- [ ] Nueva sección "Sincronización" (PRO) con estado y backup
- [ ] Nueva sección "Configuración" con subsección de márgenes
- [ ] Chat flotante "Jarvis" con botón y panel
- [ ] Logo de fondo en sección Caja (cuando no hay resultados)
- [ ] Insignias PRO en secciones premium

### Datos Simulados

- [ ] 5 notificaciones (2 stock bajo, 2 vencimientos, 1 stock agotado)
- [ ] 10 productos para recomendaciones de reposición
- [ ] Datos de KPIs para analíticas (10 métricas)
- [ ] Datos para 3 gráficos (ventas diarias, top productos, distribución pagos)
- [ ] Datos de estado de sincronización y backup
- [ ] Márgenes de ganancia para 5 métodos de pago

### Componentes Nuevos

- [ ] `BadgePro.svelte`
- [ ] `NotificationIcon.svelte`
- [ ] `NotificationPanel.svelte`
- [ ] `RecommendationCard.svelte`
- [ ] `KpiCard.svelte`
- [ ] `ChartWrapper.svelte` (o integración directa de Chart.js)
- [ ] `ChatButton.svelte`
- [ ] `ChatPanel.svelte`

### Stores Nuevos

- [ ] `notifications.ts`
- [ ] `recommendations.ts`
- [ ] `analytics.ts`
- [ ] `sync.ts`
- [ ] `chat.ts`

### Assets

- [ ] Logo del negocio (PNG)
- [ ] Imagen de Jarvis para chat (PNG)

### Testing Visual

- [ ] Verificar colores en modo claro y oscuro
- [ ] Verificar alineación de elementos en header
- [ ] Verificar orden correcto del menú lateral
- [ ] Verificar que todas las insignias PRO sean visibles
- [ ] Verificar que los gráficos se rendericen correctamente
- [ ] Verificar que el chat se posicione correctamente

---

## NOTAS FINALES PARA EL AGENTE DE IA

### Libertades Creativas Permitidas

El agente puede decidir sobre:

- Implementación exacta de los gráficos (librería específica)
- Micro-animaciones y transiciones
- Tonos exactos de colores secundarios (mientras mantenga el esquema principal)
- Detalles de spacing y padding (mientras mantenga proporciones)
- Uso de SVG vs emoji vs PNG para iconos pequeños

### Restricciones Absolutas

El agente NO debe:

- Cambiar el orden especificado del menú lateral
- Cambiar los colores principales (lima, naranja)
- Implementar funcionalidad real en features simulados
- Agregar features no especificados
- Modificar los datos simulados específicos (cantidades, nombres, valores)

### Coherencia con v1.0

**Mantener**:

- Misma paleta de colores
- Mismo estilo de tipografía
- Mismo sistema de tema claro/oscuro
- Misma estructura de datos (productos existentes)
- Mismo comportamiento de secciones ya implementadas (Caja, Gestión de Stock)

**Integrar armoniosamente**:

- Los nuevos elementos del header deben alinearse bien con el botón de tema existente
- Las nuevas secciones deben tener el mismo estilo visual que las existentes
- Los nuevos datos simulados deben ser coherentes con los productos existentes

---

## FIN DEL DOCUMENTO COMPLEMENTARIO v2.0

Este documento contiene todas las especificaciones necesarias para implementar los nuevos features del MVP sin ambigüedades. Debe usarse en conjunto con el documento de especificaciones v1.0 original.

**Contacto para dudas**: Si algún detalle no está claro, priorizar coherencia visual y simplicidad de implementación.

**Tiempo estimado de implementación**: 1-2 días adicionales sobre el MVP v1.0 existente.