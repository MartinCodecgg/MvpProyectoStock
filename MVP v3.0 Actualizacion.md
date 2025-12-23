# DOCUMENTO COMPLEMENTARIO - NUEVOS FEATURES MVP v3.0

## INFORMACIÓN GENERAL

Este documento detalla los cambios y nuevas funcionalidades para la versión 3.0 del MVP. Incluye una nueva sección completa de Proveedores y modificaciones importantes a la sección de Reposición.

**Versión**: 3.0  
**Fecha**: Diciembre 2025  
**Nota importante**: Todos estos features son simulaciones sin lógica backend real. Los datos son estáticos y decorativos para demostración.

---

## CAMBIOS EN LA ESTRUCTURA DEL MENÚ LATERAL

### Orden Actualizado de Secciones

**Menú lateral (de arriba hacia abajo)**:

1. Logo + Nombre del negocio ("Mi Negocio" + logo PNG)
2. Caja
3. Gestión de Stock
4. **Proveedores** ← **NUEVA SECCIÓN**
5. Reposición (modificada)
6. Analíticas
7. Reportes (sin implementar)
8. Sincronización
9. Configuración

---

## NUEVA SECCIÓN: PROVEEDORES

### 1. INFORMACIÓN GENERAL

**Nombre de la sección**: Proveedores  
**Ícono**: 🤝  
**Ubicación**: Después de "Gestión de Stock" y antes de "Reposición"  
**Propósito**: Gestionar listas de precios de diferentes proveedores y comparar precios entre ellos para optimizar compras.

---

### 2. LAYOUT GENERAL DE LA SECCIÓN

```
┌─────────────────────────────────────────────────────────────────┐
│ PROVEEDORES                           [+ Agregar Proveedor]     │
├────────────────────────────────────────────────┬────────────────┤
│                                                │  LISTAS        │
│ Buscar producto:                               │ [Seleccionar   │
│ [____________________________] [Buscar]        │   todas]       │
│                                                │                │
│ (Área de resultados vacía inicialmente)        │ ☐ Ferretería   │
│                                                │   Central SA   │
│                                                │   [Act.] [🗑️] │
│                                                │   12/11/2025   │
│                                                │                │
│                                                │ ☐ Distribu-    │
│                                                │   idora Norte  │
│                                                │   [Act.] [🗑️] │
│                                                │   15/06/2025   │
│                                                │                │
│                                                │ (... 10 más)   │
│                                                │                │
└────────────────────────────────────────────────┴────────────────┘
```

**Distribución**:

- **Área principal**: 80% del ancho (izquierda)
- **Panel de listas**: 20% del ancho (derecha, fijo)

---

### 3. COMPONENTE: BOTÓN "AGREGAR PROVEEDOR"

#### 3.1 Ubicación y Diseño

**Ubicación**: Esquina superior derecha del header de la sección  
**Diseño**:

- Texto: "+ Agregar Proveedor"
- Color: Naranja `#f97316`
- Tamaño: Botón mediano/grande, destacado
- Ícono: + (más)

#### 3.2 Modal de Agregar Proveedor

**Estructura del modal**:

```
┌─────────────────────────────────────┐
│ AGREGAR PROVEEDOR              [X]  │
├─────────────────────────────────────┤
│                                     │
│ Nombre del proveedor:               │
│ [_____________________________]     │
│                                     │
│ Archivo de lista de precios:       │
│ [Seleccionar archivo...]            │
│                                     │
│ Formatos aceptados:                 │
│ Excel (.xlsx, .xls)                 │
│ PDF (.pdf)                          │
│ Imagen (.jpg, .png)                 │
│                                     │
│         [Cancelar]  [Agregar]       │
└─────────────────────────────────────┘
```

**Especificaciones técnicas**:

- Modal centrado en la pantalla
- Ancho: 400-500px
- Backdrop semi-transparente
- Botón cerrar (X) en esquina superior derecha

**Campos**:

1. **Input "Nombre del proveedor"**:
    
    - Campo de texto obligatorio
    - Placeholder: "Ej: Ferretería Central SA"
    - Validación: No vacío (simulada)
2. **Selector de archivo**:
    
    - Input type="file"
    - Accept: `.xlsx, .xls, .pdf, .jpg, .jpeg, .png`
    - Al seleccionar: Muestra nombre del archivo debajo
    - **Importante**: Es decorativo, el archivo no se procesa realmente
3. **Botones**:
    
    - **Cancelar**: Cierra el modal sin hacer nada
    - **Agregar**: Cierra el modal (no agrega realmente nada, es decorativo)

**Comportamiento**:

- Los campos se pueden llenar
- Al presionar "Agregar": Modal se cierra
- No se agrega ningún proveedor nuevo (las 12 listas son fijas y simuladas)

---

### 4. PANEL DERECHO: LISTA DE PROVEEDORES

#### 4.1 Estructura General

```
┌──────────────────────────────┐
│ LISTAS                       │
│ [Seleccionar todas]          │
│                              │
│ ☐ Ferretería Central SA      │
│   [Actualizar] [🗑️]          │
│   Últ. act: 12/11/2025       │
│                              │
│ ☐ Distribuidora del Norte    │
│   [Actualizar] [🗑️]          │
│   Últ. act: 15/06/2025       │ ← Naranja + negrita
│                              │
│ ☐ Materiales Rosario         │
│   [Actualizar] [🗑️]          │
│   Últ. act: 10/01/2025       │ ← Rojo + negrita
│                              │
│ (... continúa hasta 12)      │
└──────────────────────────────┘
```

**Especificaciones**:

- Ancho: 20% del viewport
- Altura: 100% de la sección (sin scroll, máximo 12 proveedores)
- Fondo: Ligeramente diferente al fondo principal

#### 4.2 Botón "Seleccionar todas"

**Ubicación**: Arriba del listado de proveedores  
**Funcionalidad**:

- **Primera vez**: Marca todos los checkboxes
- **Segunda vez**: Desmarca todos los checkboxes (toggle)
- Texto cambia entre "Seleccionar todas" / "Deseleccionar todas"

**Diseño**:

- Botón pequeño/mediano
- Color: Secundario (gris/neutro)
- Ancho: 100% del panel (con padding)

#### 4.3 Items de Proveedor

**Estructura de cada item**:

```
┌──────────────────────────────┐
│ ☐ Nombre del Proveedor       │ ← Checkbox + nombre
│   [Actualizar] [🗑️]          │ ← Botones en misma línea
│   Últ. act: DD/MM/YYYY       │ ← Fecha (coloreada según antiguedad)
└──────────────────────────────┘
```

**Elementos**:

1. **Checkbox + Nombre**:
    
    - Checkbox tipo estándar HTML
    - Nombre del proveedor (texto semibold)
    - Click en cualquier parte del área selecciona/deselecciona
    - Estado inicial: Ninguno seleccionado
2. **Visual de selección**:
    
    - **No seleccionado**: Fondo normal, checkbox vacío
    - **Seleccionado**: Fondo con color destacado (ej: azul/naranja claro), checkbox marcado
3. **Botones de acción**:
    
    - **[Actualizar]**: Botón pequeño, texto del tamaño de la fuente normal, decorativo
    - **[🗑️]**: Botón pequeño con ícono de tacho de basura, decorativo
    - Ambos en la misma línea, espaciados
    - **Importante**: Ambos botones son decorativos, no tienen funcionalidad real
4. **Fecha de última actualización**:
    
    - Formato: DD/MM/YYYY
    - Tamaño de fuente: Más pequeño que el nombre (ej: 0.85rem)
    - Color según antiguedad:
        - **< 1 mes**: Color normal del texto, sin negrita
        - **1-6 meses**: Color naranja `#f97316`, negrita
        - **> 6 meses**: Color rojo `#ef4444`, negrita

**Orden de proveedores**: Alfabético

---

### 5. ÁREA PRINCIPAL: BUSCADOR Y RESULTADOS

#### 5.1 Estado Inicial (Sin Búsqueda)

Cuando no se ha realizado ninguna búsqueda:

```
┌─────────────────────────────────────────┐
│ Buscar producto:                         │
│ [_________________________] [Buscar]     │
│                                          │
│                                          │
│         (Área vacía)                     │
│                                          │
│                                          │
└─────────────────────────────────────────┘
```

**Comportamiento**:

- Campo de búsqueda visible
- Área de resultados vacía (sin mensaje)
- Botón "Buscar" habilitado

#### 5.2 Buscador

**Diseño**:

```
Buscar producto:
[________________________________]  [Buscar]
```

**Especificaciones**:

- Input de texto amplio (80% del área principal)
- Placeholder: "Ej: Cemento Portland, Pintura Latex, etc."
- Botón "Buscar" a la derecha del input

**Funcionalidad**:

- Usuario escribe nombre del producto
- Presiona "Buscar"
- **Validación**: Debe haber al menos 1 proveedor seleccionado
    - Si no hay seleccionados: No realiza búsqueda (botón no responde)
    - Si hay seleccionados: Muestra resultados

**Nota**: Para volver a buscar con diferentes proveedores seleccionados, el usuario debe presionar "Buscar" nuevamente.

#### 5.3 Tabla de Resultados

**Estructura**:

```
┌──────────────────┬──────────────────┬─────────────┬──────────┬───────────┐
│ Proveedor ▼      │ Producto ▼       │ Cód. Barras │ Precio ▲ │ Acciones  │
├──────────────────┼──────────────────┼─────────────┼──────────┼───────────┤
│ Ferretería Cent. │ Cemento 50kg     │ 7798123...  │ $11.500  │ [Editar]  │
│ Dist. Norte      │ Cemento 50kg     │ 7798123...  │ $12.200  │ [Editar]  │
│ Materiales SA    │ Cemento Portland │ 7798123...  │ $11.800  │ [Editar]  │
│ Proveedor 7      │ Cemento 50kg     │ 7798123...  │ $13.100  │ [Editar]  │
│ ...              │ ...              │ ...         │ ...      │ ...       │
├──────────────────┴──────────────────┴─────────────┴──────────┴───────────┤
│                          [Ver más]                                        │
└───────────────────────────────────────────────────────────────────────────┘
```

**Columnas**:

1. **Proveedor**:
    
    - Nombre del proveedor (puede estar abreviado si es largo)
    - Header clickeable con ícono ▼/▲ (decorativo, orden no cambia)
2. **Producto**:
    
    - Nombre del producto como aparece en la lista de ese proveedor
    - Pueden haber ligeras variaciones de nombre entre proveedores
    - Header clickeable con ícono ▼/▲ (decorativo)
3. **Cód. Barras**:
    
    - Código EAN-13 (13 dígitos)
    - Puede mostrarse abreviado (ej: 7798123... primeros 7 dígitos + ...)
4. **Precio**:
    
    - Formato: $X.XXX,XX (pesos argentinos)
    - Header clickeable con ícono ▲ (indica orden ascendente actual)
5. **Acciones**:
    
    - Botón "Editar" (decorativo, sin funcionalidad)

**Orden de resultados**:

- **Por defecto**: Precio ascendente (más barato primero)
- **Simulación**: Los headers de columna tienen íconos de ordenamiento pero no cambian el orden realmente
- El orden siempre permanece por precio ascendente

**Limitación de resultados**:

- Muestra primeros 10 resultados
- Botón "Ver más" al final (siempre visible, decorativo)

**Nota sobre búsqueda**:

- La búsqueda debe ser flexible para encontrar variaciones del nombre
- Ejemplo: Buscar "Cemento" encuentra "Cemento Portland 50kg", "Cemento Bolsa 50kg", "Cemento 50kg"

---

### 6. DATOS SIMULADOS - SECCIÓN PROVEEDORES

#### 6.1 Lista de 12 Proveedores

```typescript
const proveedores = [
  {
    id: "prov001",
    nombre: "Ferretería Central SA",
    ultimaActualizacion: "12/11/2025", // < 1 mes
  },
  {
    id: "prov002",
    nombre: "Distribuidora del Norte",
    ultimaActualizacion: "15/06/2025", // 6 meses (naranja + negrita)
  },
  {
    id: "prov003",
    nombre: "Materiales Rosario",
    ultimaActualizacion: "10/01/2025", // > 6 meses (rojo + negrita)
  },
  {
    id: "prov004",
    nombre: "Corralón San Martín",
    ultimaActualizacion: "20/10/2025", // < 1 mes
  },
  {
    id: "prov005",
    nombre: "Proveedor Industrial SA",
    ultimaActualizacion: "05/03/2025", // > 6 meses (rojo + negrita)
  },
  {
    id: "prov006",
    nombre: "Casa López Ferretería",
    ultimaActualizacion: "28/09/2025", // 2-3 meses (naranja + negrita)
  },
  {
    id: "prov007",
    nombre: "Materiales del Sur",
    ultimaActualizacion: "18/11/2025", // < 1 mes
  },
  {
    id: "prov008",
    nombre: "Distribuidora La Plata",
    ultimaActualizacion: "12/08/2025", // 4 meses (naranja + negrita)
  },
  {
    id: "prov009",
    nombre: "Ferretería El Tornillo",
    ultimaActualizacion: "03/12/2025", // < 1 mes
  },
  {
    id: "prov010",
    nombre: "Materiales Express",
    ultimaActualizacion: "22/04/2025", // > 6 meses (rojo + negrita)
  },
  {
    id: "prov011",
    nombre: "Corralón Buenos Aires",
    ultimaActualizacion: "15/10/2025", // < 1 mes
  },
  {
    id: "prov012",
    nombre: "Distribuidora Belgrano",
    ultimaActualizacion: "30/07/2025", // 5 meses (naranja + negrita)
  }
];
```

#### 6.2 Productos por Proveedor

**Estructura general**:

- Cada proveedor tiene 6 productos
- Aproximadamente 15-20 productos "base" que se repiten en varios proveedores
- Nombres con ligeras variaciones entre proveedores (más realista)
- Precios varían entre 5-12% entre proveedores para el mismo producto

**Productos base comunes** (aparecen en múltiples proveedores con variaciones):

1. Cemento Portland 50kg
2. Hierro 8mm x 12m
3. Pintura Látex blanca 20L
4. Martillo de goma
5. Caño PVC 110mm x 6m
6. Cable unipolar 2.5mm
7. Destornillador plano
8. Tornillos autoperforantes (caja)
9. Llave térmica 2x40A
10. Adhesivo para cerámicos
11. Arena gruesa (bolsa 30kg)
12. Cinta aisladora
13. Llave inglesa
14. Pincel 2 pulgadas
15. Silicona transparente

**Ejemplo de datos simulados para 3 proveedores**:

```typescript
// Ferretería Central SA (prov001)
const productos_prov001 = [
  {
    id: "p001_001",
    nombre: "Cemento Portland 50kg",
    codigoBarras: "7798123456789",
    precio: 12000.00
  },
  {
    id: "p001_002",
    nombre: "Hierro construcción 8mm x 12m",
    codigoBarras: "7798234567890",
    precio: 8100.00
  },
  {
    id: "p001_003",
    nombre: "Pintura Látex interior blanca 20L",
    codigoBarras: "7798345678901",
    precio: 15000.00
  },
  {
    id: "p001_004",
    nombre: "Martillo goma 500g",
    codigoBarras: "7798456789012",
    precio: 5500.00
  },
  {
    id: "p001_005",
    nombre: "Caño PVC 110mm x 6 metros",
    codigoBarras: "7798567890123",
    precio: 5180.00
  },
  {
    id: "p001_006",
    nombre: "Cable eléctrico 2.5mm rollo 100m",
    codigoBarras: "7798678901234",
    precio: 75000.00
  }
];

// Distribuidora del Norte (prov002)
const productos_prov002 = [
  {
    id: "p002_001",
    nombre: "Cemento 50kg",
    codigoBarras: "7798123456789",
    precio: 11500.00 // 4% más barato
  },
  {
    id: "p002_002",
    nombre: "Hierro 8mm x 12m",
    codigoBarras: "7798234567890",
    precio: 8650.00 // 7% más caro
  },
  {
    id: "p002_003",
    nombre: "Látex blanco 20 litros",
    codigoBarras: "7798345678901",
    precio: 14200.00 // 5% más barato
  },
  {
    id: "p002_004",
    nombre: "Destornillador plano 6 pulgadas",
    codigoBarras: "7798789012345",
    precio: 2800.00
  },
  {
    id: "p002_005",
    nombre: "Llave térmica bipolar 40A",
    codigoBarras: "7798890123456",
    precio: 15000.00
  },
  {
    id: "p002_006",
    nombre: "Arena gruesa bolsa 30kg",
    codigoBarras: "7798901234567",
    precio: 3200.00
  }
];

// Materiales Rosario (prov003)
const productos_prov003 = [
  {
    id: "p003_001",
    nombre: "Cemento Portland Bolsa 50kg",
    codigoBarras: "7798123456789",
    precio: 11800.00 // Precio intermedio
  },
  {
    id: "p003_002",
    nombre: "Pintura Latex 20L blanca",
    codigoBarras: "7798345678901",
    precio: 15500.00 // Precio más alto
  },
  {
    id: "p003_003",
    nombre: "Martillo de goma 500g",
    codigoBarras: "7798456789012",
    precio: 4800.00 // Más barato
  },
  {
    id: "p003_004",
    nombre: "Caño PVC desagüe 110mm 6m",
    codigoBarras: "7798567890123",
    precio: 5450.00 // Más caro
  },
  {
    id: "p003_005",
    nombre: "Adhesivo cerámicos exterior 30kg",
    codigoBarras: "7798012345678",
    precio: 12000.00
  },
  {
    id: "p003_006",
    nombre: "Cinta aisladora 3M negra",
    codigoBarras: "7798123456780",
    precio: 1200.00
  }
];

// ... (continuar con los otros 9 proveedores)
```

**Nota**: Los productos comunes tienen el mismo código de barras aunque el nombre varíe ligeramente. Esto permite que la búsqueda los agrupe correctamente.

---

### 7. CASOS DE USO Y FLUJOS

#### 7.1 Flujo: Comparar Precios de un Producto

```
1. Usuario abre sección "Proveedores"
   ↓
2. Panel derecho muestra 12 proveedores (ninguno seleccionado)
   ↓
3. Usuario hace click en "Seleccionar todas"
   ↓
4. Los 12 checkboxes se marcan
   ↓
5. Usuario escribe "Cemento" en el buscador
   ↓
6. Usuario presiona "Buscar"
   ↓
7. Tabla muestra resultados ordenados por precio (ascendente):
   - Distribuidora del Norte: Cemento 50kg - $11.500
   - Materiales Rosario: Cemento Portland Bolsa 50kg - $11.800
   - Ferretería Central: Cemento Portland 50kg - $12.000
   - ... (hasta 10 resultados)
   ↓
8. Usuario ve claramente cuál proveedor tiene mejor precio
```

#### 7.2 Flujo: Buscar en Proveedores Específicos

```
1. Usuario abre sección "Proveedores"
   ↓
2. Usuario selecciona manualmente 3 proveedores específicos
   (ej: Ferretería Central, Casa López, Materiales del Sur)
   ↓
3. Usuario busca "Pintura Latex"
   ↓
4. Presiona "Buscar"
   ↓
5. Tabla muestra solo resultados de esos 3 proveedores
   ↓
6. Usuario deselecciona uno y presiona "Buscar" nuevamente
   ↓
7. Resultados se actualizan mostrando solo 2 proveedores
```

#### 7.3 Flujo: Intentar Buscar Sin Proveedores Seleccionados

```
1. Usuario abre sección "Proveedores"
   ↓
2. No selecciona ningún proveedor
   ↓
3. Escribe "Martillo" en el buscador
   ↓
4. Presiona "Buscar"
   ↓
5. No pasa nada (botón no responde)
   ↓
(El usuario debe seleccionar al menos un proveedor primero)
```

---

## MODIFICACIONES A LA SECCIÓN REPOSICIÓN

### 1. CAMBIOS CONCEPTUALES

**Enfoque anterior (v2.0)**:

- ❌ Recomendaciones basadas en volumen de ventas
- ❌ Predicción de días hasta agotamiento
- ❌ Cálculo de fechas estimadas de agotamiento

**Nuevo enfoque (v3.0)**:

- ✅ Recomendaciones basadas en stock actual
- ✅ Criterios prácticos y simples
- ✅ Integración con sección Proveedores para optimizar compras

### 2. NUEVO LAYOUT DE LA SECCIÓN

```
┌─────────────────────────────────────────────────────────┐
│ REPOSICIÓN                                              │
├─────────────────────────────────────────────────────────┤
│ Selecciona los productos que necesitas reponer según   │
│ diferentes criterios para generar tu pedido de forma   │
│ rápida y eficiente.                                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ┌────────────────────┐  ┌────────────────────┐         │
│ │ 🔴 Sin Stock       │  │ 🟡 Stock Bajo      │         │
│ │ 5 productos        │  │ 10 productos       │         │
│ │                    │  │                    │         │
│ │ [Ver productos]    │  │ [Ver productos]    │         │
│ └────────────────────┘  └────────────────────┘         │
│                                                          │
│ ┌────────────────────┐  ┌────────────────────┐         │
│ │ ⚠️ Crítico         │  │ 📅 Próx. Vencer    │         │
│ │ (0 + bajo)         │  │ 3 productos        │         │
│ │ 15 productos       │  │                    │         │
│ │ [Ver productos]    │  │ [Ver productos]    │         │
│ └────────────────────┘  └────────────────────┘         │
│                                                          │
│ ┌────────────────────┐                                  │
│ │ 🔄 Más Vendidos    │                                  │
│ │ Top productos      │                                  │
│ │ 8 productos        │                                  │
│ │ [Ver productos]    │                                  │
│ └────────────────────┘                                  │
└─────────────────────────────────────────────────────────┘
```

### 3. CARDS DE CRITERIOS

#### 3.1 Diseño de cada Card

```
┌────────────────────────┐
│ [Emoji] Nombre         │
│ Descripción breve      │
│ X productos            │
│                        │
│ [Ver productos]        │
└────────────────────────┘
```

**Especificaciones**:

- Ancho: Aproximadamente 250-300px
- Alto: 180-200px
- Grid: 2 columnas en desktop
- Bordes redondeados
- Sombra sutil
- Hover: Efecto de elevación

**Elementos**:

1. **Emoji/Ícono**: Grande, centrado arriba
2. **Nombre del criterio**: Texto destacado (semibold)
3. **Descripción**: Texto pequeño, color secundario
4. **Cantidad**: "X productos" en el criterio
5. **Botón**: "Ver productos" (color naranja o secundario)

#### 3.2 Criterios Disponibles

**1. 🔴 Sin Stock**

- Descripción: "Productos agotados"
- Cantidad simulada: 5 productos
- Filtra: stock = 0

**2. 🟡 Stock Bajo**

- Descripción: "Menos de 10 unidades"
- Cantidad simulada: 10 productos
- Filtra: stock < 10 y stock > 0

**3. ⚠️ Crítico**

- Descripción: "Sin stock + stock bajo"
- Cantidad simulada: 15 productos (5 + 10)
- Filtra: stock < 10 (incluye 0)

**4. 📅 Próximos a Vencer**

- Descripción: "Vencen en menos de 30 días"
- Cantidad simulada: 3 productos
- Filtra: productos con fecha de vencimiento < 30 días

**5. 🔄 Más Vendidos**

- Descripción: "Top productos frecuentes"
- Cantidad simulada: 8 productos
- Muestra: Productos más vendidos para evitar quiebres

---

### 4. VISTA DE LISTA DE PRODUCTOS

#### 4.1 Activación

Cuando el usuario hace click en "Ver productos" de cualquier criterio:

```
┌─────────────────────────────────────────────────────────┐
│ REPOSICIÓN > Sin Stock                    [← Volver]    │
├─────────────────────────────────────────────────────────┤
│ Selecciona los productos a incluir en el pedido:       │
│                                                          │
│ ☑ Seleccionar todos                                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ┌──────────────┬──────────┬──────────┬───────────────┐ │
│ │ [ ] Producto │ Stock    │ Cód.Barras│ Urgencia     │ │
│ ├──────────────┼──────────┼──────────┼───────────────┤ │
│ │ ☐ Cemento    │ 0 un.    │ 779812...│ 🔴 Crítico   │ │
│ │   Portland   │          │          │              │ │
│ │   50kg       │          │          │              │ │
│ ├──────────────┼──────────┼──────────┼───────────────┤ │
│ │ ☐ Martillo   │ 0 un.    │ 779845...│ 🔴 Crítico   │ │
│ │   goma 500g  │          │          │              │ │
│ ├──────────────┼──────────┼──────────┼───────────────┤ │
│ │ ...          │ ...      │ ...      │ ...          │ │
│ └──────────────┴──────────┴──────────┴───────────────┘ │
│                                                          │
│         [Generar Pedido]  [Pedido con Mejores Precios] │
└─────────────────────────────────────────────────────────┘
```

**Especificaciones**:

**Header**:

- Breadcrumb: "REPOSICIÓN > [Nombre del Criterio]"
- Botón "← Volver" para regresar a la vista de cards

**Checkbox "Seleccionar todos"**:

- Arriba de la tabla
- Marca/desmarca todos los productos de la lista
- Toggle (igual que en Proveedores)

**Tabla de productos**:

1. **Columna Checkbox**:
    
    - Permite seleccionar individualmente cada producto
    - Los productos seleccionados formarán parte del pedido
2. **Columna Producto**:
    
    - Nombre completo del producto
    - Puede ocupar 2-3 líneas si es necesario
3. **Columna Stock**:
    
    - Cantidad actual (formato: X unidades o X un.)
    - Para criterio "Sin Stock": Siempre muestra "0 un."
4. **Columna Cód. Barras**:
    
    - Código EAN-13 abreviado (primeros 6-7 dígitos + ...)
5. **Columna Urgencia**:
    
    - 🔴 **Crítico**: Stock = 0
    - 🟡 **Bajo**: Stock < 10 y > 0
    - (No se muestran productos con stock normal en esta sección)

**Botones de acción**:

1. **[Generar Pedido]**:
    
    - Color: Naranja `#f97316`
    - Ubicación: Abajo a la izquierda/centro
    - Genera lista de productos seleccionados (ver sección 4.2)
2. **[Pedido con Mejores Precios]**:
    
    - Color: Verde lima `#84cc16`
    - Ubicación: Junto a "Generar Pedido"
    - Genera lista optimizada con mejores proveedores (ver sección 4.3)

---

#### 4.2 Funcionalidad: Generar Pedido

**Flujo**:

```
1. Usuario selecciona productos con checkboxes
   ↓
2. Presiona "Generar Pedido"
   ↓
3. Se muestra modal/vista con lista generada
```

**Modal de Pedido Generado**:

```
┌─────────────────────────────────────────────────────────┐
│ PEDIDO DE REPOSICIÓN                               [X]  │
├─────────────────────────────────────────────────────────┤
│ Criterio: Sin Stock                                     │
│ Fecha: 20/12/2025                                       │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ PRODUCTOS SELECCIONADOS                             │ │
│ │                                                     │ │
│ │ 1. Cemento Portland 50kg                            │ │
│ │    Código: 7798123456789                            │ │
│ │    Stock actual: 0 unidades                         │ │
│ │                                                     │ │
│ │ 2. Martillo de goma 500g                            │ │
│ │    Código: 7798456789012                            │ │
│ │    Stock actual: 0 unidades                         │ │
│ │                                                     │ │
│ │ 3. Destornillador plano 6"                          │ │
│ │    Código: 7798789012345                            │ │
│ │    Stock actual: 0 unidades                         │ │
│ │                                                     │ │
│ │ ────────────────────────────────                    │ │
│ │ Total: 3 productos                                  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│              [Exportar PDF]  [Imprimir]  [Cerrar]      │
└─────────────────────────────────────────────────────────┘
```

**Especificaciones**:

- Modal centrado, tamaño mediano/grande (600-700px ancho)
- Lista simple de productos seleccionados
- Información mínima por producto (nombre, código, stock actual)

**Botones**:

1. **[Exportar PDF]**: Decorativo, no genera PDF real
2. **[Imprimir]**: Decorativo, no imprime realmente
3. **[Cerrar]**: Cierra el modal

---

#### 4.3 Funcionalidad: Pedido con Mejores Precios

**Concepto**: Genera un pedido optimizado indicando a qué proveedor comprarle cada producto según el mejor precio.

**Flujo**:

```
1. Usuario selecciona productos con checkboxes
   ↓
2. Presiona "Pedido con Mejores Precios"
   ↓
3. Sistema busca cada producto en TODOS los proveedores
   ↓
4. Identifica el proveedor con menor precio por producto
   ↓
5. Muestra modal con lista optimizada
```

**Modal de Pedido Optimizado**:

```
┌─────────────────────────────────────────────────────────┐
│ PEDIDO OPTIMIZADO POR PRECIO                       [X]  │
├─────────────────────────────────────────────────────────┤
│ Criterio: Sin Stock                                     │
│ Fecha: 20/12/2025                                       │
│ Ahorro estimado: $8.500                                 │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ PRODUCTOS CON MEJOR PROVEEDOR                       │ │
│ │                                                     │ │
│ │ 1. Cemento Portland 50kg                            │ │
│ │    💰 Mejor precio: Distribuidora del Norte        │ │
│ │    Precio: $11.500                                  │ │
│ │    (vs $12.000 en Ferretería Central)              │ │
│ │                                                     │ │
│ │ 2. Martillo de goma 500g                            │ │
│ │    💰 Mejor precio: Materiales Rosario             │ │
│ │    Precio: $4.800                                   │ │
│ │    (vs $5.500 en Ferretería Central)              │ │
│ │                                                     │ │
│ │ 3. Destornillador plano 6"                          │ │
│ │    💰 Mejor precio: Distribuidora del Norte        │ │
│ │    Precio: $2.800                                   │ │
│ │    (sin comparación disponible)                     │ │
│ │                                                     │ │
│ │ ────────────────────────────────────────            │ │
│ │ Total: 3 productos                                  │ │
│ │                                                     │ │
│ │ RESUMEN POR PROVEEDOR:                              │ │
│ │ • Distribuidora del Norte: 2 productos              │ │
│ │ • Materiales Rosario: 1 producto                    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│        [Exportar PDF]  [Imprimir]  [Cerrar]            │
└─────────────────────────────────────────────────────────┘
```

**Especificaciones**:

**Información por producto**:

1. Nombre del producto
2. Ícono 💰 + "Mejor precio: [Nombre Proveedor]"
3. Precio del mejor proveedor
4. Comparación con otro proveedor (opcional, si aplica)

**Cálculo de ahorro**:

- Compara precio más bajo vs precio más alto encontrado
- Suma el ahorro total estimado
- Muestra en el header del modal

**Resumen por proveedor**:

- Agrupa productos por proveedor
- Cuenta cuántos productos se comprarían a cada uno
- Facilita hacer pedidos separados

**Caso especial**:

- Si un producto solo existe en 1 proveedor: Muestra "(sin comparación disponible)"
- Si un producto no existe en ningún proveedor: Muestra "⚠️ No disponible en proveedores"

**Botones**: Iguales que en "Generar Pedido" (Exportar, Imprimir, Cerrar - todos decorativos)

---

### 5. DATOS SIMULADOS - REPOSICIÓN

#### 5.1 Productos por Criterio

**Criterio: Sin Stock (5 productos)**:

```typescript
const sinStock = [
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
```

**Criterio: Stock Bajo (10 productos)**:

```typescript
const stockBajo = [
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
```

**Criterio: Próximos a Vencer (3 productos)**:

```typescript
const proximosVencer = [
  {
    id: "prod007",
    nombre: "Pintura Látex blanca 20L",
    codigoBarras: "7798345678901",
    stock: 3,
    fechaVencimiento: "15/01/2026", // 26 días
    urgencia: "ALTO"
  },
  {
    id: "prod036",
    nombre: "Adhesivo cerámicos 30kg",
    codigoBarras: "7798012345678",
    stock: 6,
    fechaVencimiento: "08/01/2026", // 19 días
    urgencia: "ALTO"
  },
  {
    id: "prod045",
    nombre: "Silicona transparente 280ml",
    codigoBarras: "7798345678902",
    stock: 7,
    fechaVencimiento: "22/01/2026", // 33 días (límite)
    urgencia: "MEDIO"
  }
];
```

**Criterio: Más Vendidos (8 productos)**:

```typescript
const masVendidos = [
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
```

**Criterio: Crítico** = Sin Stock + Stock Bajo (15 productos total)

---

### 6. INTEGRACIÓN ENTRE SECCIONES

#### 6.1 Flujo Completo: De Reposición a Proveedores

```
REPOSICIÓN:
1. Usuario selecciona criterio "Sin Stock"
   ↓
2. Ve lista de 5 productos sin stock
   ↓
3. Selecciona 3 productos con checkboxes
   ↓
4. Presiona "Pedido con Mejores Precios"
   ↓
5. Sistema consulta precios de esos 3 productos en TODOS los proveedores
   ↓
6. Muestra modal con:
   - Cemento → Mejor precio en "Distribuidora del Norte" ($11.500)
   - Martillo → Mejor precio en "Materiales Rosario" ($4.800)
   - Destornillador → Mejor precio en "Distribuidora del Norte" ($2.800)
   ↓
7. Resumen: 2 productos de "Dist. del Norte", 1 de "Materiales Rosario"
   ↓
8. Usuario tiene clara su estrategia de compra optimizada
```

#### 6.2 Lógica de Búsqueda de Mejor Precio

**Algoritmo simulado**:

```typescript
function encontrarMejorProveedor(producto) {
  // 1. Buscar producto en todos los proveedores (por código de barras)
  const coincidencias = buscarEnTodosProveedores(producto.codigoBarras);
  
  // 2. Si no hay coincidencias exactas, buscar por nombre similar
  if (coincidencias.length === 0) {
    coincidencias = buscarPorNombre(producto.nombre);
  }
  
  // 3. Ordenar por precio ascendente
  coincidencias.sort((a, b) => a.precio - b.precio);
  
  // 4. Retornar el más barato
  return {
    mejorProveedor: coincidencias[0].proveedor,
    mejorPrecio: coincidencias[0].precio,
    segundoMejorPrecio: coincidencias[1]?.precio || null,
    disponibleEn: coincidencias.length
  };
}
```

**Casos especiales**:

- **Producto en 1 solo proveedor**: Muestra ese único proveedor sin comparación
- **Producto en 0 proveedores**: Muestra "⚠️ No disponible en proveedores actuales"
- **Múltiples proveedores con mismo precio**: Muestra el primero alfabéticamente

---

### 7. COMPONENTES NUEVOS A CREAR

#### 7.1 Para Sección Proveedores

**Componentes reutilizables**:

- `ProveedorListItem.svelte`: Item del panel derecho con checkbox, botones y fecha
- `ProveedoresTable.svelte`: Tabla de resultados de búsqueda
- `AgregarProveedorModal.svelte`: Modal para agregar proveedor
- `ProveedorCard.svelte`: Card alternativo si se quiere vista de cards

**Componentes de página**:

- `Proveedores.svelte`: Página principal con layout completo

#### 7.2 Para Sección Reposición (Modificada)

**Componentes reutilizables**:

- `CriterioCard.svelte`: Card de criterio con emoji, descripción y botón
- `ProductosReposicionTable.svelte`: Tabla con checkboxes de productos
- `PedidoModal.svelte`: Modal de pedido generado
- `PedidoOptimizadoModal.svelte`: Modal de pedido con mejores precios

**Componentes de página**:

- `Reposicion.svelte`: Página principal (actualizada)
- `ReposicionLista.svelte`: Vista de lista de productos por criterio

---

### 8. STORES ADICIONALES NECESARIOS

```typescript
// src/lib/stores/proveedores.ts
import { writable } from 'svelte/store';

interface Proveedor {
  id: string;
  nombre: string;
  ultimaActualizacion: string;
  productos: Producto[];
  seleccionado: boolean;
}

export const proveedores = writable<Proveedor[]>([...proveedoresSimulados]);
export const proveedoresSeleccionados = writable<string[]>([]);
export const resultadosBusqueda = writable<ProductoConProveedor[]>([]);
```

```typescript
// src/lib/stores/reposicion.ts (actualizado)
import { writable } from 'svelte/store';

interface ProductoReposicion {
  id: string;
  nombre: string;
  codigoBarras: string;
  stock: number;
  urgencia: 'CRÍTICO' | 'BAJO' | 'MEDIO' | 'ALTO';
  fechaVencimiento?: string;
  ventasMensuales?: number;
}

export const criterioActual = writable<string | null>(null);
export const productosSeleccionados = writable<string[]>([]);
export const pedidoGenerado = writable<any | null>(null);
```

---

## 9. CHECKLIST DE IMPLEMENTACIÓN v3.0

### Features Principales

**Sección Proveedores**:

- [ ] Botón "Agregar Proveedor" funcional (modal decorativo)
- [ ] Panel derecho con 12 proveedores simulados
- [ ] Checkbox de selección por proveedor
- [ ] Botón "Seleccionar todas" con toggle
- [ ] Fecha de última actualización con colores según antigüedad
- [ ] Botones "Actualizar" y "Eliminar" decorativos en cada proveedor
- [ ] Buscador de productos funcional
- [ ] Tabla de resultados ordenada por precio
- [ ] Headers de tabla con íconos de ordenamiento (decorativos)
- [ ] Botón "Ver más" decorativo
- [ ] Validación: no buscar sin proveedores seleccionados

**Sección Reposición (Modificada)**:

- [ ] Eliminar toda referencia a predicción y volumen de ventas
- [ ] 5 cards de criterios con nuevo diseño
- [ ] Vista de lista con tabla y checkboxes
- [ ] Checkbox "Seleccionar todos" funcional
- [ ] Botón "Generar Pedido" con modal
- [ ] Botón "Pedido con Mejores Precios" con modal optimizado
- [ ] Modal con resumen por proveedor
- [ ] Cálculo de ahorro estimado (simulado)
- [ ] Botones Exportar/Imprimir decorativos
- [ ] Botón "Volver" a vista de cards

### Datos Simulados

**Proveedores**:

- [ ] 12 proveedores con nombres realistas
- [ ] 6 productos por proveedor (72 productos total)
- [ ] 15-20 productos base que se repiten con variaciones de nombre
- [ ] Precios con variación 5-12% entre proveedores
- [ ] Fechas de actualización distribuidas (4 recientes, 4 medias, 4 antiguas)
- [ ] Códigos EAN-13 iguales para productos equivalentes

**Reposición**:

- [ ] 5 productos sin stock
- [ ] 10 productos con stock bajo
- [ ] 3 productos próximos a vencer
- [ ] 8 productos más vendidos
- [ ] 15 productos criterio "Crítico" (combinación)

### Integración

- [ ] Lógica para buscar productos en proveedores seleccionados
- [ ] Lógica para encontrar mejor precio por producto
- [ ] Modal de pedido optimizado con comparación de precios
- [ ] Resumen por proveedor en modal optimizado

### Testing Visual

- [ ] Verificar colores de fechas en panel de proveedores
- [ ] Verificar ordenamiento de resultados por precio
- [ ] Verificar selección/deselección de proveedores
- [ ] Verificar toggle de "Seleccionar todas"
- [ ] Verificar cards de criterios en Reposición
- [ ] Verificar modales de pedidos
- [ ] Verificar coherencia visual entre secciones

---

## 10. NOTAS FINALES PARA EL AGENTE

### 10.1 Prioridades de Implementación

**Alta prioridad** (implementar primero):

1. Sección Proveedores - estructura básica
2. Panel derecho con proveedores simulados
3. Buscador y tabla de resultados
4. Modificar Reposición - eliminar predicciones
5. Cards de criterios en Reposición

**Media prioridad**: 6. Vista de lista en Reposición 7. Modal "Generar Pedido" 8. Modal "Pedido Optimizado" 9. Integración entre secciones

**Baja prioridad** (detalles): 10. Animaciones y transiciones 11. Modales decorativos (Agregar Proveedor) 12. Botones decorativos (Exportar, Imprimir)

### 10.2 Coherencia con Versiones Anteriores

**Mantener**:

- Paleta de colores (lima, naranja, gris oscuro)
- Sistema de temas claro/oscuro
- Estilo de componentes existentes
- Estructura de datos de productos (50 productos base)
- Formato de precios y números

**Integrar armoniosamente**:

- Nueva sección debe tener mismo estilo visual
- Modales deben ser consistentes con otros modales existentes
- Tablas deben seguir mismo diseño que tabla de Stock

### 10.3 Restricciones Importantes

**NO implementar**:

- Backend real o APIs
- Procesamiento real de archivos Excel/PDF
- Guardado real de proveedores nuevos
- Exportación real a PDF
- Impresión real
- Funcionalidad en botones "Actualizar" y "Eliminar"

**SÍ implementar** (funcionalidades reales):

- Selección de proveedores con checkboxes
- Búsqueda en proveedores seleccionados
- Ordenamiento de resultados por precio
- Selección de productos en Reposición
- Generación de pedidos (vista en modales)
- Toggle de "Seleccionar todas"

---

## FIN DEL DOCUMENTO v3.0

Este documento complementa las versiones anteriores (v1.0 y v2.0) y debe usarse en conjunto con ellas. Contiene todas las especificaciones para implementar la nueva sección Proveedores y las modificaciones a Reposición.

**Versión**: 3.0  
**Fecha**: Diciembre 2025  
**Tiempo estimado adicional**: 2-3 días sobre el MVP v2.0