<script lang="ts">
    import { productosStore } from "$lib/stores/products";
    import ModalActualizarFoto from "./ModalActualizarFoto.svelte";

    let searchTerm = $state("");
    let mostrarModalFoto = $state(false);

    // Productos filtrados
    let productosFiltrados = $derived(
        searchTerm.trim() === ""
            ? $productosStore
            : $productosStore.filter((p) =>
                  p.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
              ),
    );

    function formatPrecio(precio: number): string {
        return `$${precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function formatCantidad(cantidad: number): string {
        return cantidad.toLocaleString("es-AR");
    }

    function handleActualizarExcel() {
        alert("Funcionalidad de actualización por Excel próximamente");
    }

    function handleActualizarPDF() {
        alert("Funcionalidad de actualización por PDF próximamente");
    }

    function handleActualizarFoto() {
        mostrarModalFoto = true;
    }

    function handleEditar() {
        alert("Funcionalidad de edición próximamente");
    }

    function cerrarModalFoto() {
        mostrarModalFoto = false;
    }
</script>

<!-- Contenedor principal -->
<div class="space-y-6 pb-24">
    <!-- Buscador -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <input
            type="text"
            bind:value={searchTerm}
            placeholder="🔍 Buscar producto..."
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
             focus:ring-2 focus:ring-brand-lime focus:border-transparent"
        />
    </div>

    <!-- Tabla de Productos -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead
                    class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
                >
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Nombre
                        </th>
                        <th
                            class="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Cantidad
                        </th>
                        <th
                            class="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Precio
                        </th>
                        <th
                            class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    {#each productosFiltrados as producto}
                        <tr
                            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td
                                class="px-6 py-4 text-sm text-gray-900 dark:text-white"
                            >
                                {producto.nombre}
                            </td>
                            <td
                                class="px-6 py-4 text-sm text-right text-gray-900 dark:text-white"
                            >
                                {formatCantidad(producto.stock)}
                            </td>
                            <td
                                class="px-6 py-4 text-sm text-right text-gray-900 dark:text-white font-medium"
                            >
                                {formatPrecio(producto.precio)}
                            </td>
                            <td class="px-6 py-4 text-center">
                                <button
                                    onclick={handleEditar}
                                    class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        {#if productosFiltrados.length === 0}
            <div class="text-center py-12">
                <p class="text-gray-500 dark:text-gray-400">
                    No se encontraron productos
                </p>
            </div>
        {/if}
    </div>
</div>

<!-- Botones de Actualización Flotantes (fixed, centrado en área de contenido) -->
<!-- Sidebar = 256px, entonces left = 256px + ((100vw - 256px) / 2) para centrar en el área restante -->
<div
    class="fixed bottom-6 left-[calc(256px+((100vw-256px)/2))] -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700 z-10"
>
    <h3
        class="text-sm text-center font-semibold text-gray-900 dark:text-white mb-3"
    >
        Actualizar Stock
    </h3>
    <div class="flex flex-row gap-2">
        <button
            onclick={handleActualizarExcel}
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
            📄 Excel
        </button>
        <button
            onclick={handleActualizarPDF}
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
            📑 PDF
        </button>
        <button
            onclick={handleActualizarFoto}
            class="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
            📷 Foto
        </button>
    </div>
</div>

<!-- Modal de Actualizar por Foto -->
{#if mostrarModalFoto}
    <ModalActualizarFoto onCerrar={cerrarModalFoto} />
{/if}
