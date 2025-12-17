<script lang="ts">
    import {
        cart,
        subtotal,
        total,
        actualizarCantidad,
        eliminarDelCarrito,
        limpiarCarrito,
    } from "$lib/stores/cart";
    import CuadroPago from "./CuadroPago.svelte";

    let metodoPago = $state("efectivo");
    let mostrarCuadroPago = $state(false);

    function formatPrecio(precio: number): string {
        return `$${precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function incrementar(id: string, cantidadActual: number) {
        actualizarCantidad(id, cantidadActual + 1);
    }

    function decrementar(id: string, cantidadActual: number) {
        if (cantidadActual > 1) {
            actualizarCantidad(id, cantidadActual - 1);
        }
    }

    function handleCantidadInput(id: string, e: Event) {
        const input = e.target as HTMLInputElement;
        const valor = parseInt(input.value) || 1;
        actualizarCantidad(id, valor);
    }

    function handleCobrar() {
        mostrarCuadroPago = true;
    }

    function cerrarCuadroPago() {
        mostrarCuadroPago = false;
    }

    function confirmarPago() {
        limpiarCarrito();
        mostrarCuadroPago = false;
    }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow h-full flex flex-col">
    <!-- Header -->
    <div
        class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
    >
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            Carrito de Compras
        </h2>
        {#if $cart.length > 0}
            <button
                onclick={limpiarCarrito}
                class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
                Limpiar Carrito
            </button>
        {/if}
    </div>

    <!-- Items -->
    <div class="flex-1 overflow-auto p-4 space-y-3">
        {#if $cart.length === 0}
            <div class="text-center py-12">
                <p class="text-gray-500 dark:text-gray-400">
                    El carrito está vacío
                </p>
            </div>
        {:else}
            {#each $cart as item}
                <div
                    class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3"
                >
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <p
                                class="font-medium text-gray-900 dark:text-white"
                            >
                                {item.nombre}
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-300">
                                {formatPrecio(item.precio)}
                            </p>
                        </div>
                        <button
                            onclick={() => eliminarDelCarrito(item.id)}
                            class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            aria-label="Eliminar"
                        >
                            🗑️
                        </button>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <button
                                onclick={() =>
                                    decrementar(item.id, item.cantidad)}
                                class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600
                       text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={item.cantidad}
                                oninput={(e) => handleCantidadInput(item.id, e)}
                                min="1"
                                class="w-16 text-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            <button
                                onclick={() =>
                                    incrementar(item.id, item.cantidad)}
                                class="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600
                       text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                                +
                            </button>
                        </div>
                        <p class="font-semibold text-gray-900 dark:text-white">
                            {formatPrecio(item.precio * item.cantidad)}
                        </p>
                    </div>
                </div>
            {/each}
        {/if}
    </div>

    <!-- Footer -->
    {#if $cart.length > 0}
        <div
            class="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4"
        >
            <!-- Totales -->
            <div class="space-y-2">
                <div
                    class="flex justify-between text-gray-700 dark:text-gray-300"
                >
                    <span>Subtotal:</span>
                    <span>{formatPrecio($subtotal)}</span>
                </div>
                <div
                    class="flex justify-between text-gray-700 dark:text-gray-300"
                >
                    <span>Descuento/Recargo:</span>
                    <span>$0,00</span>
                </div>
                <div
                    class="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700"
                >
                    <span>Total:</span>
                    <span>{formatPrecio($total)}</span>
                </div>
            </div>

            <!-- Método de pago -->
            <select
                bind:value={metodoPago}
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
                <option value="efectivo">Efectivo</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
                <option value="transferencia">Transferencia</option>
            </select>

            <!-- Botón Cobrar -->
            <button
                onclick={handleCobrar}
                class="w-full py-3 bg-brand-lime text-white rounded-lg hover:bg-lime-600 transition-colors font-bold text-lg"
            >
                Cobrar
            </button>
        </div>
    {/if}
</div>

<!-- Modal de Pago -->
{#if mostrarCuadroPago}
    <CuadroPago
        total={$total}
        onCerrar={cerrarCuadroPago}
        onConfirmar={confirmarPago}
    />
{/if}
