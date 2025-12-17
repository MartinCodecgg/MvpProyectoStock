import { writable, derived } from 'svelte/store';
import type { Producto } from '$lib/data/productos';

// Item en el carrito
export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

// Store del carrito
export const cart = writable<CartItem[]>([]);

// Agregar producto al carrito
export function agregarAlCarrito(producto: Producto) {
  cart.update(items => {
    const existing = items.find(item => item.id === producto.id);
    if (existing) {
      return items.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    }
    return [...items, {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    }];
  });
}

// Actualizar cantidad
export function actualizarCantidad(id: string, cantidad: number) {
  if (cantidad <= 0) {
    eliminarDelCarrito(id);
    return;
  }
  cart.update(items =>
    items.map(item =>
      item.id === id ? { ...item, cantidad } : item
    )
  );
}

// Eliminar del carrito
export function eliminarDelCarrito(id: string) {
  cart.update(items => items.filter(item => item.id !== id));
}

// Limpiar carrito
export function limpiarCarrito() {
  cart.set([]);
}

// Calcular subtotal
export const subtotal = derived(cart, $cart =>
  $cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
);

// Total (sin descuentos para el MVP)
export const total = derived(subtotal, $subtotal => $subtotal);
