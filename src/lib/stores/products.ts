import { writable } from 'svelte/store';
import { productos, type Producto } from '$lib/data/productos';

// Store de productos
export const productosStore = writable<Producto[]>(productos);

// Función para actualizar productos desde foto
export function actualizarDesdeProductosFoto(nuevosProductos: Producto[]) {
  productosStore.set(nuevosProductos);
}
