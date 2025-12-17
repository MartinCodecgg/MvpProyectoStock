<script lang="ts">
    import { productosStore } from "$lib/stores/products";
    import { agregarAlCarrito } from "$lib/stores/cart";
    import type { Producto } from "$lib/data/productos";
    import { fade } from "svelte/transition";

    let searchTerm = $state("");
    let resultados = $state<Producto[]>([]);

    function buscarProductos() {
        if (!searchTerm.trim()) {
            resultados = [];
            return;
        }

        const term = searchTerm.toLowerCase();
        resultados = $productosStore
            .filter(
                (p) =>
                    p.stock > 0 &&
                    (p.nombre.toLowerCase().includes(term) ||
                        p.codigoBarras.includes(term)),
            )
            .slice(0, 10);

        // Limpiar campo de búsqueda
        searchTerm = "";
    }

    function agregarProducto(producto: Producto) {
        agregarAlCarrito(producto);
        // Opcional: quitar del resultado después de agregar
        resultados = resultados.filter((p) => p.id !== producto.id);
    }

    function formatPrecio(precio: number): string {
        return `$${precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function handleKeyPress(e: KeyboardEvent) {
        if (e.key === "Enter") {
            buscarProductos();
        }
    }
</script>

<div class="space-y-4">
    <!-- Búsqueda -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex gap-3">
            <input
                type="text"
                bind:value={searchTerm}
                onkeypress={handleKeyPress}
                placeholder="Buscar por nombre o código de barras"
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
               focus:ring-2 focus:ring-brand-lime focus:border-transparent"
            />
            <button
                onclick={buscarProductos}
                class="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
                Buscar
            </button>
        </div>
    </div>

    <!-- Resultados o Logo de Fondo -->
    {#if resultados.length > 0}
        <div
            transition:fade={{ duration: 200 }}
            class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
        >
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">
                    Resultados ({resultados.length})
                </h3>
            </div>
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
                {#each resultados as producto}
                    <button
                        onclick={() => agregarProducto(producto)}
                        class="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                        <div class="flex justify-between items-center">
                            <div class="flex-1">
                                <p
                                    class="font-medium text-gray-900 dark:text-white"
                                >
                                    {producto.nombre}
                                </p>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    Stock: {producto.stock.toLocaleString(
                                        "es-AR",
                                    )} unidades
                                </p>
                            </div>
                            <p class="text-lg font-semibold text-brand-lime">
                                {formatPrecio(producto.precio)}
                            </p>
                        </div>
                    </button>
                {/each}
            </div>
        </div>
    {:else}
        <!-- Background Logo -->
        <div
            transition:fade={{ duration: 300 }}
            class="flex items-center justify-center py-32"
        >
            <img
                src="/logo-negocio.png"
                alt="Logo"
                class="w-48 h-48 opacity-20 dark:opacity-10"
            />
        </div>
    {/if}
</div>
