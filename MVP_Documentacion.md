
# Especificación Técnica - MVP Sistema de Gestión de Stock para Ferreterías

## 1. INFORMACIÓN GENERAL

### 1.1 Descripción del Proyecto

Sistema de gestión de stock especializado para ferreterías con funcionalidad innovadora de actualización de inventario mediante fotografías procesadas por IA.

### 1.2 Alcance del MVP

Este MVP es una versión simplificada para validación de mercado que simula funcionalidades sin implementación real de backend, bases de datos ni procesamiento de IA. Todos los datos son simulados y las funcionalidades críticas están implementadas solo en frontend.

### 1.3 Objetivos del MVP

- Demostrar el flujo completo de punto de venta (POS)
- Mostrar la funcionalidad innovadora de actualización por fotografía
- Simular el dashboard móvil para propietarios
- Validar la propuesta de valor en el mercado

---

## 2. ARQUITECTURA DEL PROYECTO

### 2.1 Estructura de Proyectos

Se desarrollarán DOS proyectos completamente independientes:

1. **mvp-web**: Aplicación web de escritorio (punto de venta + gestión de stock)
2. **mvp-mobile**: Aplicación móvil (dashboard de propietario)

### 2.2 Stack Tecnológico

#### App Web (mvp-web)

- **Frontend**: HTML5, Tailwind CSS, TypeScript, Svelte 5
- **Entorno**: Node.js (solo para desarrollo con Vite)
- **No incluye**: Backend, base de datos, APIs reales

#### App Móvil (mvp-mobile)

- **Frontend**: HTML5, Tailwind CSS, TypeScript, Svelte 5
- **Entorno**: Node.js (solo para desarrollo con Vite)
- **No incluye**: Backend, base de datos, APIs reales

### 2.3 Estructura de Carpetas Recomendada

```
mvp-web/
├── src/
│   ├── lib/
│   │   ├── components/     # Componentes Svelte reutilizables
│   │   ├── stores/         # Svelte stores para estado global
│   │   ├── utils/          # Funciones auxiliares
│   │   └── data/           # Datos simulados (productos, ventas, etc)
│   ├── routes/             # Páginas principales (si se usa SvelteKit)
│   ├── assets/             # Imágenes, iconos, PDFs
│   └── app.css             # Estilos globales Tailwind
├── package.json
└── vite.config.ts

mvp-mobile/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── utils/
│   │   └── data/
│   ├── assets/
│   └── app.css
├── package.json
└── vite.config.ts
```

---

## 3. ESPECIFICACIONES APP WEB (mvp-web)

### 3.1 Características Generales

#### 3.1.1 Responsividad

- **Solo optimizado para desktop**
- No requiere diseño responsive para móviles o tablets

#### 3.1.2 Tema Visual

- **Dos modos**: Claro y Oscuro
- **Botón de cambio de tema**: Esquina superior derecha
- **Colores principales**:
    - Botones importantes (ej: "Cobrar"): Verde lima `#84cc16` (Tailwind lime-500)
    - Detalles y acentos: Naranja `#f97316` (Tailwind orange-500)
    - Fondo oscuro: Gris oscuro `#1a1a1a`
    - Fondo claro: Blanco `#ffffff`
- **Tipografía**: Fuente por defecto del sistema
- **Estilo**: Moderno pero profesional, evitar estética "gamer" o excesivamente llamativa

#### 3.1.3 Navegación

- **Menú lateral izquierdo** con logo/nombre del negocio arriba
- **Nombre del negocio**: "Mi Negocio" (solo texto, sin logo)
- **Usuario**: Mostrar "Admin" cerca del botón de tema (esquina superior derecha)
- **Secciones del menú** (de arriba hacia abajo):
    1. Caja (implementada con funcionalidad completa)
    2. Gestión de Stock (implementada con funcionalidad completa)
    3. Dashboard (visible pero sin funcionalidad)
    4. Reportes (visible pero sin funcionalidad)
    5. Configuración (visible pero sin funcionalidad)
- **Iconos**: Usar emojis o íconos SVG/PNG simples para cada sección
- **Comportamiento**: Al iniciar la app, ir directamente a la sección "Caja" (sin pantalla de login)

---

### 3.2 SECCIÓN: CAJA (Punto de Venta)

#### 3.2.1 Layout General

```
┌─────────────────────────────────────────────────────────┐
│ [Logo/Nombre]              Admin [🌓]                   │
├──────┬──────────────────────────────────────────────────┤
│      │                                                   │
│ [🏪] │  BÚSQUEDA Y RESULTADOS                           │
│ Caja │                                                   │
│      │                                                   │
│ [📦] │                                                   │
│Stock │  ┌──────────────────────────────────────┐        │
│      │  │  CARRITO DE COMPRAS                  │        │
│ [📊] │  │                                       │        │
│Dashb │  │  [Limpiar Carrito]                   │        │
│      │  │                                       │        │
│ [📈] │  │  Items...                             │        │
│Repor │  │                                       │        │
│      │  │  Subtotal: $XXX                      │        │
│ [⚙️] │  │  Total: $XXX                          │        │
│Confi │  │                                       │        │
│      │  │  [Método Pago ▼]                     │        │
│      │  │                                       │        │
│      │  │  [Cobrar]                             │        │
│      │  └──────────────────────────────────────┘        │
└──────┴──────────────────────────────────────────────────┘
```

**Nota de diseño**: El layout exacto de la sección central (búsqueda/resultados) y el panel derecho (carrito) debe seguir principios de diseño modernos de aplicaciones POS. Tomar como referencia el diseño de la imagen proporcionada pero con un estilo más contemporáneo.

#### 3.2.2 Componente: Búsqueda de Productos

**Ubicación**: Parte superior central de la pantalla

**Elementos**:

- Input de texto para búsqueda (placeholder: "Buscar por nombre o código de barras")
- Botón "Buscar" junto al input
- Área de resultados debajo del input

**Funcionalidad**:

1. Usuario escribe nombre del producto O código de barras (ambos en el mismo input)
2. Usuario presiona botón "Buscar"
3. El input se limpia automáticamente
4. Aparecen hasta 10 resultados coincidentes debajo
5. Productos con stock 0 NO se muestran en los resultados
6. Click en un resultado agrega el producto al carrito (panel derecho)

**Formato de resultados**:

- Mostrar máximo 10 productos
- Cada resultado muestra:
    - Nombre del producto
    - Precio (formato: $X.XXX,XX)
    - Stock disponible (formato: X.XXX unidades)
- Los resultados deben ser clickeables para agregar al carrito

#### 3.2.3 Componente: Carrito de Compras

**Ubicación**: Panel derecho de la pantalla

**Header del carrito**:

- Título: "Carrito de Compras" (o similar)
- Botón "Limpiar Carrito" (elimina todos los productos del carrito)

**Lista de productos en el carrito**: Cada item muestra:

- Nombre del producto
- Precio unitario (formato: $X.XXX,XX)
- Cantidad:
    - Botón "-" (disminuir cantidad)
    - Input numérico editable (muestra cantidad actual)
    - Botón "+" (aumentar cantidad)
    - **Nota**: Los botones +/- actualizan el valor del input
- Botón "Eliminar" (ícono de tacho de basura o X)
- Subtotal del item (cantidad × precio unitario)

**Footer del carrito**:

- Subtotal: Suma de todos los items
- Descuento/Recargo: $0,00 (campo decorativo, siempre en 0)
- **Total**: Monto final a cobrar (destacado visualmente)

**Select de método de pago**:

- Opciones: Efectivo, Débito, Crédito, Transferencia
- **Importante**: Este select es solo decorativo, no afecta ninguna funcionalidad ni cálculo

**Botón "Cobrar"**:

- Color: Verde lima `#84cc16`
- Estado: Siempre visible (no se deshabilita aunque el carrito esté vacío)
- Al hacer click: Muestra el cuadro de pago (ver siguiente sección)

#### 3.2.4 Componente: Cuadro de Pago

**Cuándo aparece**: Después de presionar el botón "Cobrar"

**Ubicación**: Puede ser un modal centrado o un panel que reemplaza/se superpone al carrito

**Elementos del cuadro**:

```
┌──────────────────────────────────┐
│  PROCESANDO PAGO                 │
├──────────────────────────────────┤
│  Cantidad a cobrar: $ 122,50     │
│                                   │
│  Monto pagado:                   │
│  [ __________ ]                  │
│                                   │
│  Vuelto: $ XX,XX                 │
│                                   │
│  [Generar Factura]               │
└──────────────────────────────────┘
```

**Funcionalidad**:

1. Muestra el total a cobrar (readonly)
2. Input para "Monto pagado" (usuario ingresa cuánto pagó el cliente)
3. Al escribir en "Monto pagado", se calcula automáticamente el vuelto
4. Fórmula: `Vuelto = Monto pagado - Total a cobrar`
5. Aparece botón "Generar Factura"
6. Al presionar "Generar Factura":
    - Se genera/muestra un PDF con la factura (ver sección 3.2.5)
    - Se cierra el cuadro de pago
    - Se limpia el carrito automáticamente
    - El usuario vuelve a la vista normal de Caja

**Nota**: No aparece mensaje de "Venta realizada con éxito" ni notificaciones adicionales

#### 3.2.5 Generación de Factura (Simulada)

**Implementación**:

- Tener un archivo PDF pre-generado en la carpeta `assets/`
- Al presionar "Generar Factura", abrir ese PDF
- **Método**: El que sea más fácil de implementar (nueva pestaña, descarga, iframe, etc.)

**Contenido del PDF simulado**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        MI NEGOCIO
    Calle Falsa 123, CABA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Factura #1234
Fecha: 06/12/2025

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1x Martillo de goma      $ 5.500,00
2x Cemento 50kg          $ 12.000,00
1x Destornillador plano  $ 2.300,00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal:               $ 19.800,00
Descuento:              $      0,00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                  $ 19.800,00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Método de pago: Efectivo
Pagó con: $ 20.000,00
Vuelto: $ 200,00

¡Gracias por su compra!
```

**Formato de precios**: $ adelante, separador de miles con punto, decimales con coma (ej: $1.500,00)

---

### 3.3 SECCIÓN: GESTIÓN DE STOCK

#### 3.3.1 Layout General

```
┌────────────────────────────────────────────────┐
│  GESTIÓN DE STOCK                              │
├────────────────────────────────────────────────┤
│  [🔍 Buscar producto...]                       │
├────────────────────────────────────────────────┤
│  TABLA DE PRODUCTOS                            │
│  ┌────────┬────────────┬──────────┬──────────┐│
│  │ Nombre │ Cantidad   │ Precio   │ Acciones ││
│  ├────────┼────────────┼──────────┼──────────┤│
│  │Martillo│    150     │ $5.500,00│ [Editar] ││
│  │Cemento │  2.300     │$12.000,00│ [Editar] ││
│  │  ...   │    ...     │   ...    │   ...    ││
│  └────────┴────────────┴──────────┴──────────┘│
├────────────────────────────────────────────────┤
│  ACTUALIZAR STOCK                              │
│  [Excel] [PDF] [📷 Foto]                       │
└────────────────────────────────────────────────┘
```

#### 3.3.2 Componente: Buscador

**Ubicación**: Parte superior de la sección

**Funcionalidad**:

- Input de texto para filtrar productos en la tabla
- Búsqueda en tiempo real (mientras escribe)
- Busca coincidencias en el nombre del producto

#### 3.3.3 Componente: Tabla de Productos

**Datos a mostrar**: Aproximadamente 50 productos simulados

**Columnas**:

1. **Nombre** (texto)
2. **Cantidad** (número con separador de miles, ej: 1.500)
3. **Precio** (formato: $X.XXX,XX)
4. **Acciones**: Botón "Editar" (visible pero sin funcionalidad - decorativo)

**Características**:

- Mostrar todos los productos de una vez (sin paginación)
- Scroll vertical si la tabla es muy larga
- Productos con stock 0 se muestran normalmente (sin estilo diferente)
- Los precios y cantidades varían entre productos
- Incluir al menos un producto con stock 0

#### 3.3.4 Componente: Botones de Actualización

**Ubicación**: Parte inferior de la sección (footer)

**Botones**:

1. **Actualizar por Excel** (deshabilitado, gris)
2. **Actualizar por PDF** (deshabilitado, gris)
3. **Actualizar por Foto** (habilitado, funcional)

**Botón "Actualizar por Foto"**:

- Color: Naranja `#f97316` o destacado con ícono de cámara
- Al hacer click: Abre el explorador de archivos del sistema operativo (Windows)
- Acepta: Imágenes (jpg, jpeg, png)
- Al seleccionar una imagen: Se almacena en una variable/state pero NO se procesa inmediatamente

**Importante**: La foto no se procesa automáticamente al subirla. Se procesa cuando el usuario presiona un botón "Procesar" o "Actualizar" que aparece después de seleccionar la imagen.

#### 3.3.5 Funcionalidad: Actualización por Foto (Simulada)

**Flujo completo**:

1. Usuario presiona "Actualizar por Foto"
2. Se abre explorador de archivos (input type="file")
3. Usuario selecciona una imagen
4. La imagen se guarda en memoria (variable/state) pero no se muestra
5. Aparece un botón "Procesar Foto" o similar
6. Usuario presiona "Procesar Foto"
7. Se muestra una **Vista Previa de Actualización** (modal o panel)

**Vista Previa de Actualización**:

```
┌────────────────────────────────────────────────┐
│  PRODUCTOS DETECTADOS EN LA FOTO              │
├────────────────────────────────────────────────┤
│  Se detectaron 30 productos                    │
│                                                 │
│  ┌────────┬─────────┬──────────┬─────────────┐│
│  │ Nombre │Cantidad │  Precio  │Cód. Barras  ││
│  ├────────┼─────────┼──────────┼─────────────┤│
│  │Martillo│   50    │ $5.500,00│7798123456789││
│  │ nuevo  │         │          │             ││
│  ├────────┼─────────┼──────────┼─────────────┤│
│  │Cemento │  100    │$12.000,00│7798987654321││
│  │        │         │          │             ││
│  │  ...   │   ...   │   ...    │    ...      ││
│  └────────┴─────────┴──────────┴─────────────┘│
│                                                 │
│           [Cancelar]  [Confirmar]              │
└────────────────────────────────────────────────┘
```

**Datos simulados a mostrar**: 30+ productos (pueden ser productos nuevos o actualizaciones de existentes)

**Indicadores**:

- Mostrar visualmente cuáles son productos **nuevos** vs **actualizaciones**
- Badge o texto "nuevo" junto al nombre del producto si es nuevo
- Badge o texto "actualizar" si es una actualización de stock/precio

**Botones**:

- **Cancelar**: Cierra la vista previa, descarta todo, no modifica nada
- **Confirmar**:
    - Cierra la vista previa
    - Actualiza la tabla de stock con los nuevos datos
    - NO muestra mensaje de éxito
    - Mantiene el scroll en la posición actual o va arriba (lo que sea más fácil de implementar)

---

### 3.4 DATOS SIMULADOS - APP WEB

#### 3.4.1 Catálogo de Productos (50 productos aprox.)

**Categorías de productos de ferretería**:

- Herramientas manuales (martillos, destornilladores, pinzas, llaves)
- Materiales de construcción (cemento, arena, cal, ladrillos, hierros)
- Pinturas y accesorios (látex, esmalte, rodillos, pinceles, aguarrás)
- Material eléctrico (cables, enchufes, llaves térmicas, cajas, cintas)
- Plomería (caños, codos, uniones, canillas, cinta teflón)
- Ferretería general (tornillos, clavos, bulones, tuercas, arandelas, tarugos)

**Formato de cada producto**:

```typescript
{
  id: string,
  nombre: string,
  codigoBarras: string, // EAN-13 (13 dígitos)
  precio: number, // en pesos argentinos
  stock: number, // cantidad en unidades
}
```

**Ejemplo**:

```typescript
{
  id: "prod001",
  nombre: "Martillo de goma 500g",
  codigoBarras: "7798123456789",
  precio: 5500.00,
  stock: 150
}
```

**Requisitos**:

- Precios variados: desde $100 hasta $50.000
- Stock variado: desde 0 hasta varios miles
- Al menos 1 producto con stock en 0
- Nombres descriptivos y realistas
- Códigos EAN-13 válidos (13 dígitos numéricos)

#### 3.4.2 Datos para Factura PDF

Crear un PDF estático con datos de ejemplo siguiendo el formato especificado en la sección 3.2.5.

#### 3.4.3 Datos para Foto Simulada (30+ productos)

Crear un array de 30-40 productos que simulan haber sido detectados en una foto de factura de proveedor. Mezclar productos nuevos y actualizaciones.

**Ejemplo**:

```typescript
[
  {
    id: "prod051", // ID nuevo = producto nuevo
    nombre: "Taladro percutor 650W",
    codigoBarras: "7798111222333",
    precio: 35000.00,
    cantidad: 10,
    esNuevo: true
  },
  {
    id: "prod003", // ID existente = actualización
    nombre: "Cemento portland 50kg",
    codigoBarras: "7798123456780",
    precio: 12500.00, // precio actualizado
    cantidad: 200, // cantidad a sumar al stock
    esNuevo: false
  },
  // ... más productos
]
```

---

### 3.5 CONFIGURACIÓN DEL PROYECTO - mvp-web

#### 3.5.1 package.json

```json
{
  "name": "mvp-web",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^4.0.0",
    "@tsconfig/svelte": "^5.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "svelte": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.8"
  }
}
```

#### 3.5.2 Tailwind Config

Configurar Tailwind con los colores personalizados del proyecto:

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-lime': '#84cc16',
        'brand-orange': '#f97316',
        'dark-bg': '#1a1a1a',
      }
    }
  },
  plugins: []
}
```

#### 3.5.3 Consideraciones Técnicas

- Usar Svelte 5 con runes ($state, $derived, $effect)
- Crear stores para estado global (carrito, productos, tema)
- Componentes reutilizables para elementos comunes
- Datos simulados en archivos separados en `src/lib/data/`
- No usar localStorage ni APIs externas
- Toda la lógica en el frontend

---

## 4. ESPECIFICACIONES APP MÓVIL (mvp-mobile)

### 4.1 Características Generales

#### 4.1.1 Responsividad

- **Solo optimizado para móviles** (viewport típico: 360-430px de ancho)
- No requiere adaptación para desktop o tablet

#### 4.1.2 Tema Visual

- Mismos colores que la app web
- Dos modos: Claro y Oscuro
- Botón de cambio de tema en esquina superior derecha

#### 4.1.3 Navegación

- **Una sola página** scrolleable
- Sin navegación entre secciones
- Todo el contenido visible al hacer scroll

---

### 4.2 Estructura de la Página

```
┌─────────────────────────┐
│ Mi Negocio         [🌓] │ ← Header
├─────────────────────────┤
│ [Actualizar Datos]      │ ← Botón actualizar
├─────────────────────────┤
│                         │
│ RESUMEN POR SUCURSAL   │ ← Título sección
│                         │
│ ┌─────────────────────┐│
│ │   SUCURSAL 1        ││
│ │                     ││
│ │ Ventas del día:     ││
│ │ $ 125.000,00        ││
│ │                     ││
│ │ Ventas del mes:     ││
│ │ $ 3.450.000,00      ││
│ └─────────────────────┘│
│                         │
│ ┌─────────────────────┐│
│ │   SUCURSAL 2        ││
│ │                     ││
│ │ Ventas del día:     ││
│ │ $ 98.500,00         ││
│ │                     ││
│ │ Ventas del mes:     ││
│ │ $ 2.890.000,00      ││
│ └─────────────────────┘│
│                         │
├─────────────────────────┤
│                         │
│ RESUMEN TOTAL          │ ← Título destacado
│                         │
│ ┌─────────────────────┐│
│ │   TODAS LAS         ││
│ │   SUCURSALES        ││
│ │                     ││
│ │ Ventas del día:     ││
│ │ $ 223.500,00        ││
│ │                     ││
│ │ Ventas del mes:     ││
│ │ $ 6.340.000,00      ││
│ └─────────────────────┘│
│                         │
├─────────────────────────┤
│                         │
│ COMPARATIVA VENTAS     │
│                         │
│   [Gráfico de Torta]   │
│                         │
├─────────────────────────┤
│                         │
│ TOP 5 PRODUCTOS        │
│ MÁS VENDIDOS           │
│                         │
│ 1. Cemento 50kg        │
│    Cantidad: 1.250 un. │
│    Total: $ 850.000    │
│                         │
│ 2. Hierro 8mm x 12m    │
│    Cantidad: 890 un.   │
│    Total: $ 720.500    │
│                         │
│ 3. ...                 │
│                         │
└─────────────────────────┘
```

---

### 4.3 Componentes Detallados

#### 4.3.1 Header

**Elementos**:

- Logo/Nombre del negocio: "Mi Negocio" (izquierda)
- Botón cambio de tema (derecha)

**Estilos**:

- Fondo contrastante según tema
- Texto destacado
- Altura fija, siempre visible (sticky)

#### 4.3.2 Botón "Actualizar Datos"

**Ubicación**: Justo debajo del header

**Funcionalidad**:

1. Al presionar: Muestra pantalla de carga por 2 segundos
2. Después de 2 segundos: Muestra los datos simulados

**Pantalla de carga**:

- Implementar lo más fácil: spinner, skeleton, barra de progreso, etc.
- Texto: "Cargando datos..." o similar
- Duración: Exactamente 2 segundos

**Nota**: Los datos también se cargan automáticamente al abrir la app por primera vez (con la misma animación de carga).

#### 4.3.3 Sección: Resumen por Sucursal

**Título**: "RESUMEN POR SUCURSAL"

**Cards de sucursales**:

- Dos cards separadas (Sucursal 1 y Sucursal 2)
- Cada card muestra:
    - Nombre de la sucursal (título destacado)
    - Ventas del día (monto en $)
    - Ventas del mes (monto en $)

**Formato de montos**: $XXX.XXX,XX ($ adelante, separador de miles, dos decimales)

**Diseño**:

- Cards con bordes o sombras sutiles
- Fondo ligeramente diferente al fondo general
- Espaciado generoso entre cards

#### 4.3.4 Sección: Resumen Total

**Título**: "RESUMEN TOTAL" (más destacado que "Resumen por Sucursal")

**Card de resumen total**:

- Una sola card más grande/destacada que las individuales
- Título: "TODAS LAS SUCURSALES"
- Muestra:
    - Ventas del día (suma de ambas sucursales)
    - Ventas del mes (suma de ambas sucursales)

**Cálculos**:

```
Ventas del día total = Sucursal 1 día + Sucursal 2 día
Ventas del mes total = Sucursal 1 mes + Sucursal 2 mes
```

#### 4.3.5 Gráfico de Comparativa de Ventas

**Título**: "COMPARATIVA VENTAS" o similar

**Tipo de gráfico**: Gráfico de torta (pie chart)

**Datos a mostrar**: Comparación de ventas totales del mes entre Sucursal 1 y Sucursal 2

**Ejemplo**:

```
Sucursal 1: $ 3.450.000 (54.4%)
Sucursal 2: $ 2.890.000 (45.6%)
```

**Colores**:

- Usar colores del tema (naranja y lima, o variaciones)
- Incluir leyenda con los montos y porcentajes

**Implementación**:

- Usar una librería de gráficos ligera compatible con Svelte
- Debe ser visualmente clara y fácil de interpretar para usuarios no técnicos
- Responsive para diferentes tamaños de pantalla móvil

#### 4.3.6 Top 5 Productos Más Vendidos

**Título**: "TOP 5 PRODUCTOS MÁS VENDIDOS"

**Formato de lista**:

```
1. [Nombre del producto]
   Cantidad: XXX unidades
   Total generado: $ XXX.XXX,XX

2. [Nombre del producto]
   Cantidad: XXX unidades
   Total generado: $ XXX.XXX,XX

[...continúa hasta 5]
```

**Datos a mostrar por producto**:

1. Posición en el ranking (1-5)
2. Nombre del producto
3. Cantidad vendida (con separador de miles)
4. Monto total generado por ese producto

**Diseño**:

- Lista ordenada numéricamente
- Espaciado claro entre items
- El #1 puede tener un estilo ligeramente más destacado
- Usar íconos o medallas para el top 3 (opcional)

---

### 4.4 DATOS SIMULADOS - APP MÓVIL

#### 4.4.1 Datos de Sucursales

```typescript
// Sucursal 1
{
  nombre: "Sucursal 1",
  ventasDia: 125000.00,
  ventasMes: 3450000.00
}

// Sucursal 2
{
  nombre: "Sucursal 2",
  ventasDia: 98500.00,
  ventasMes: 2890000.00
}

// Total calculado
{
  ventasDia: 223500.00,
  ventasMes: 6340000.00
}
```

#### 4.4.2 Top 5 Productos

```typescript
[
  {
    posicion: 1,
    nombre: "Cemento Portland 50kg",
    cantidadVendida: 1250,
    totalGenerado: 850000.00
  },
  {
    posicion: 2,
    nombre: "Hierro 8mm x 12m",
    cantidadVendida: 890,
    totalGenerado: 720500.00
  },
  {
    posicion: 3,
    nombre: "Pintura látex interior 20L",
    cantidadVendida: 450,
    totalGenerado: 680000.00
  },
  {
    posicion: 4,
    nombre: "Martillo de goma 500g",
    cantidadVendida: 320,
    totalGenerado: 175000.00
  },
  {
    posicion: 5,
    nombre: "Caño PVC 110mm x 6m",
    cantidadVendida: 280,
    totalGenerado: 145000.00
  }
]
```

---

### 4.5 CONFIGURACIÓN DEL PROYECTO - mvp-mobile

#### 4.5.1 package.json

```json
{
  "name": "mvp-mobile",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview --host"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^4.0.0",
    "@tsconfig/svelte": "^5.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "svelte": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.8"
  },
  "dependencies": {
    "chart.js": "^4.4.0",
    "svelte-chartjs": "^3.1.5"
  }
}
```

**Nota**: El flag `--host` en el script dev permite acceder desde otros dispositivos en la red local (necesario para probar en móvil).

#### 4.5.2 Tailwind Config

Mismo que mvp-web:

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-lime': '#84cc16',
        'brand-orange': '#f97316',
        'dark-bg': '#1a1a1a',
      }
    }
  },
  plugins: []
}
```

#### 4.5.3 Viewport Meta Tag

Asegurarse de incluir en el HTML principal:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 5. GUÍAS DE IMPLEMENTACIÓN

### 5.1 Gestión de Estado

#### 5.1.1 App Web

**Stores necesarios**:

1. **themeStore**: Maneja tema claro/oscuro

```typescript
// src/lib/stores/theme.ts
import { writable } from 'svelte/store';

export const theme = writable<'light' | 'dark'>('light');
```

2. **cartStore**: Maneja el carrito de compras

```typescript
// src/lib/stores/cart.ts
import { writable } from 'svelte/store';

interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

export const cart = writable<CartItem[]>([]);
```

3. **productsStore**: Catálogo de productos

```typescript
// src/lib/stores/products.ts
import { writable } from 'svelte/store';
import { productosIniciales } from '$lib/data/productos';

export const products = writable(productosIniciales);
```

#### 5.1.2 App Móvil

**Stores necesarios**:

1. **themeStore**: Igual que la app web
    
2. **dataStore**: Datos del dashboard
    

```typescript
// src/lib/stores/data.ts
import { writable } from 'svelte/store';

interface DashboardData {
  sucursales: Sucursal[];
  topProductos: TopProducto[];
}

export const dashboardData = writable<DashboardData | null>(null);
export const isLoading = writable(false);
```

---

### 5.2 Componentes Reutilizables Sugeridos

#### 5.2.1 App Web

- `Button.svelte`: Botón genérico con variantes (primary, secondary, danger)
- `Input.svelte`: Input de texto genérico
- `Card.svelte`: Card contenedor genérico
- `Modal.svelte`: Modal base reutilizable
- `ThemeToggle.svelte`: Botón de cambio de tema
- `SidebarItem.svelte`: Item del menú lateral
- `ProductRow.svelte`: Fila de producto en tabla
- `CartItem.svelte`: Item en el carrito

#### 5.2.2 App Móvil

- `Card.svelte`: Card contenedor genérico
- `ThemeToggle.svelte`: Botón de cambio de tema
- `SucursalCard.svelte`: Card de sucursal
- `TopProductItem.svelte`: Item del top 5
- `LoadingSpinner.svelte`: Indicador de carga
- `PieChart.svelte`: Wrapper del gráfico de torta

---

### 5.3 Flujos de Usuario Completos

#### 5.3.1 App Web - Flujo de Venta

```
1. Usuario abre la app
   ↓
2. Está en sección "Caja" por defecto
   ↓
3. Busca producto escribiendo nombre/código
   ↓
4. Presiona "Buscar"
   ↓
5. Aparecen resultados (máx 10)
   ↓
6. Click en producto → se agrega al carrito (cantidad: 1)
   ↓
7. Ajusta cantidad con +/- o input directo
   ↓
8. Repite pasos 3-7 para más productos
   ↓
9. Revisa total en el carrito
   ↓
10. (Opcional) Selecciona método de pago (decorativo)
   ↓
11. Presiona "Cobrar"
    ↓
12. Aparece cuadro de pago
    ↓
13. Ingresa monto pagado por el cliente
    ↓
14. Sistema calcula y muestra vuelto
    ↓
15. Presiona "Generar Factura"
    ↓
16. Se abre/descarga PDF de factura
    ↓
17. Carrito se limpia automáticamente
    ↓
18. Vuelve a la vista normal de caja
```

#### 5.3.2 App Web - Flujo de Actualización por Foto

```
1. Usuario navega a "Gestión de Stock"
   ↓
2. Presiona botón "Actualizar por Foto"
   ↓
3. Se abre explorador de archivos
   ↓
4. Selecciona una imagen
   ↓
5. Aparece botón "Procesar Foto"
   ↓
6. Presiona "Procesar Foto"
   ↓
7. Se muestra vista previa con 30+ productos detectados
   ↓
8. Usuario revisa los productos
   ↓
9. Presiona "Confirmar"
   ↓
10. Vista previa se cierra
    ↓
11. Tabla de stock se actualiza con nuevos datos
```

#### 5.3.3 App Móvil - Flujo Principal

```
1. Usuario abre la app
   ↓
2. Aparece pantalla de carga (2 seg)
   ↓
3. Se muestran todos los datos del dashboard
   ↓
4. Usuario hace scroll para ver todo
   ↓
5. (Opcional) Presiona "Actualizar Datos"
   ↓
6. Vuelve a aparecer carga (2 seg)
   ↓
7. Datos se "actualizan" (en realidad son los mismos)
   ↓
8. (Opcional) Cambia tema con botón superior derecho
```

---

## 6. CONSIDERACIONES FINALES

### 6.1 Prioridades de Desarrollo

**Orden sugerido para mvp-web**:

1. Setup del proyecto (Vite + Svelte + Tailwind)
2. Layout base con menú lateral y header
3. Sistema de temas (claro/oscuro)
4. Datos simulados (productos.ts)
5. Sección Caja - búsqueda y resultados
6. Sección Caja - carrito de compras
7. Sección Caja - flujo de pago y factura
8. Sección Gestión de Stock - tabla
9. Sección Gestión de Stock - actualización por foto
10. Polish y ajustes visuales

**Orden sugerido para mvp-mobile**:

1. Setup del proyecto
2. Layout base y header
3. Sistema de temas
4. Datos simulados
5. Pantalla de carga
6. Cards de sucursales
7. Gráfico de torta
8. Top 5 productos
9. Polish y ajustes visuales

### 6.2 Limitaciones Conocidas del MVP

**Lo que NO se implementa en este MVP**:

- Backend real (Node.js, Express, MySQL)
- Base de datos
- Procesamiento real de imágenes con IA
- Autenticación de usuarios
- Comunicación entre computadoras (cliente-servidor)
- Backups automáticos
- Integración con Stripe
- Reportes reales
- Sistema de roles (admin/cajero)
- Persistencia de datos (todo en memoria)
- Multi-sucursal real

**Razones**:

- Validar la idea de negocio rápidamente
- Mostrar a potenciales clientes el concepto
- Testear usabilidad y flujos
- Mínima inversión de tiempo y recursos

### 6.3 Siguiente Fase (Post-MVP)

Si el MVP tiene éxito, los siguientes pasos serían:

1. Implementar backend real con Node.js y Express
2. Conectar base de datos MySQL
3. Desarrollar el procesamiento de imágenes con IA (ej: OpenAI Vision, Google Vision)
4. Crear sistema de autenticación
5. Implementar comunicación cliente-servidor local
6. Desarrollar app con Tauri para distribución
7. Crear la página web con PHP y Stripe
8. Implementar sistema de backups
9. Crear dashboard real con datos en tiempo real

### 6.4 Métricas de Éxito del MVP

El MVP se considerará exitoso si logra:

- Demostrar el valor de la actualización por foto
- Convencer a 5-10 ferreterías de probar el sistema completo
- Validar que el flujo de caja es intuitivo
- Confirmar que el dashboard móvil es útil para propietarios
- Obtener feedback claro sobre qué mejorar

---

## 7. CHECKLIST DE ENTREGA

### 7.1 mvp-web

- [ ] Proyecto configurado con Vite + Svelte 5 + Tailwind
- [ ] Sistema de temas funcionando (claro/oscuro)
- [ ] Menú lateral con todas las secciones visibles
- [ ] Sección Caja completamente funcional
    - [ ] Búsqueda de productos
    - [ ] Agregar al carrito
    - [ ] Modificar cantidades
    - [ ] Eliminar del carrito
    - [ ] Cálculo de totales
    - [ ] Flujo de pago con cálculo de vuelto
    - [ ] Generación de factura PDF
- [ ] Sección Gestión de Stock completamente funcional
    - [ ] Tabla con 50 productos
    - [ ] Buscador funcional
    - [ ] Botones de actualización (Excel/PDF deshabilitados)
    - [ ] Actualización por foto con vista previa
    - [ ] Actualización de tabla después de confirmar
- [ ] 50 productos simulados realistas
- [ ] 30+ productos simulados para foto
- [ ] PDF de factura pre-generado
- [ ] Código limpio y organizado

### 7.2 mvp-mobile

- [ ] Proyecto configurado con Vite + Svelte 5 + Tailwind
- [ ] Sistema de temas funcionando (claro/oscuro)
- [ ] Header con nombre y botón de tema
- [ ] Botón "Actualizar Datos" funcional
- [ ] Pantalla de carga (2 segundos)
- [ ] Cards de Sucursal 1 y Sucursal 2
- [ ] Card de Resumen Total
- [ ] Gráfico de torta comparativo
- [ ] Top 5 productos más vendidos
- [ ] Datos simulados realistas
- [ ] Optimizado para móvil (360-430px)
- [ ] Código limpio y organizado

---

## 8. NOTAS ADICIONALES PARA EL AGENTE DE IA

### 8.1 Libertades Creativas Permitidas

El agente puede tomar decisiones sobre:

- Librerías específicas de gráficos (mientras sean ligeras y compatibles)
- Animaciones y transiciones sutiles
- Micro-interacciones que mejoren UX
- Organización exacta de archivos (mientras sea mantenible)
- Nombres de variables y funciones
- Detalles de implementación técnica no especificados

### 8.2 Restricciones Absolutas

El agente NO debe:

- Agregar funcionalidades no especificadas
- Usar backend o bases de datos
- Implementar autenticación real
- Conectar APIs externas (excepto librerías de gráficos)
- Sobre-complicar el código
- Agregar dependencias pesadas innecesarias

### 8.3 Filosofía del Diseño

- **Claridad sobre creatividad**: La UI debe ser clara y funcional primero
- **Moderno pero profesional**: No usar estéticas extremas o infantiles
- **Rápido sobre perfecto**: Priorizar funcionalidad sobre perfección visual
- **Simple sobre complejo**: Evitar over-engineering

### 8.4 Formato de Entrega Esperado

Cada proyecto debe incluir:

```
mvp-web/ (o mvp-mobile/)
├── src/
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md (con instrucciones de instalación y ejecución)
```

**Instrucciones en README.md**:

```markdown
# MVP Web (o Mobile)

## Instalación
npm install

## Desarrollo
npm run dev

## Build
npm run build
```

---

## FIN DE LA ESPECIFICACIÓN

Este documento contiene toda la información necesaria para desarrollar ambos MVPs sin ambigüedades. Cualquier detalle no especificado queda a criterio del desarrollador siempre que se mantengan las restricciones y filosofía mencionadas.

**Versión**: 1.0  
**Fecha**: Diciembre 2025  
**Autor**: Especificación para desarrollo de MVP Sistema de Gestión de Stock