<script lang="ts">
    import {
        criterios,
        getProductosByCriterio,
        criterioActual,
        productosSeleccionadosReposicion,
        type CriterioType,
        type ProductoReposicion,
    } from "$lib/stores/reposicionData";
    import PedidoModal from "./PedidoModal.svelte";
    import PedidoOptimizadoModal from "./PedidoOptimizadoModal.svelte";

    let vistaActual = $state<"cards" | "lista">("cards");
    let criterioSeleccionado = $state<CriterioType | null>(null);
    let productosLista = $state<ProductoReposicion[]>([]);
    let allSelected = $state(false);
    let showPedidoModal = $state(false);
    let showPedidoOptimizadoModal = $state(false);

    function verProductos(criterioId: CriterioType) {
        criterioSeleccionado = criterioId;
        productosLista = getProductosByCriterio(criterioId);
        productosSeleccionadosReposicion.set([]);
        allSelected = false;
        vistaActual = "lista";
    }

    function volver() {
        vistaActual = "cards";
        criterioSeleccionado = null;
        productosLista = [];
        productosSeleccionadosReposicion.set([]);
        allSelected = false;
    }

    function toggleSelectAll() {
        if (allSelected) {
            productosSeleccionadosReposicion.set([]);
        } else {
            productosSeleccionadosReposicion.set(
                productosLista.map((p) => p.id),
            );
        }
        allSelected = !allSelected;
    }

    function toggleProducto(id: string) {
        productosSeleccionadosReposicion.update((selected) => {
            if (selected.includes(id)) {
                return selected.filter((s) => s !== id);
            } else {
                return [...selected, id];
            }
        });
        allSelected =
            $productosSeleccionadosReposicion.length === productosLista.length;
    }

    function getUrgencyIcon(urgencia: string): string {
        switch (urgencia) {
            case "CRÍTICO":
                return "🔴";
            case "BAJO":
                return "🟡";
            case "ALTO":
                return "🟠";
            case "MEDIO":
                return "🟡";
            default:
                return "⚪";
        }
    }

    function getCriterioNombre(id: CriterioType | null): string {
        return criterios.find((c) => c.id === id)?.nombre || "";
    }

    function getProductosSeleccionados(): ProductoReposicion[] {
        return productosLista.filter((p) =>
            $productosSeleccionadosReposicion.includes(p.id),
        );
    }

    function truncateBarcode(code: string): string {
        return code.slice(0, 7) + "...";
    }
</script>

<div class="space-y-6">
    {#if vistaActual === "cards"}
        <!-- Cards View -->
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            REPOSICIÓN
        </h2>

        <p class="text-gray-600 dark:text-gray-400 max-w-3xl">
            Selecciona los productos que necesitas reponer según diferentes
            criterios para generar tu pedido de forma rápida y eficiente.
        </p>

        <!-- Criteria Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each criterios as criterio}
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                >
                    <!-- Emoji -->
                    <div class="text-4xl mb-4">{criterio.emoji}</div>

                    <!-- Name -->
                    <h3
                        class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                    >
                        {criterio.nombre}
                    </h3>

                    <!-- Description -->
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {criterio.descripcion}
                    </p>

                    <!-- Count -->
                    <p
                        class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
                    >
                        {criterio.cantidad} productos
                    </p>

                    <!-- Button -->
                    <button
                        onclick={() => verProductos(criterio.id)}
                        class="w-full px-4 py-2.5 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                        Ver productos
                    </button>
                </div>
            {/each}
        </div>
    {:else}
        <!-- List View -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    REPOSICIÓN
                </h2>
                <span class="text-gray-400 dark:text-gray-500 mx-1">›</span>
                <span class="text-lg font-semibold text-brand-lime">
                    {getCriterioNombre(criterioSeleccionado)}
                </span>
            </div>
            <button
                onclick={volver}
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
                ← Volver
            </button>
        </div>

        <p class="text-gray-600 dark:text-gray-400 mb-4">
            Selecciona los productos a incluir en el pedido:
        </p>

        <!-- Select All -->
        <div class="mb-4">
            <label class="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={allSelected}
                    onchange={toggleSelectAll}
                    class="w-4 h-4 text-brand-lime rounded focus:ring-brand-lime"
                />
                <span
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Seleccionar todos
                </span>
            </label>
        </div>

        <!-- Products Table -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
            <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th
                            class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-12"
                        >
                        </th>
                        <th
                            class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Producto
                        </th>
                        <th
                            class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Stock
                        </th>
                        <th
                            class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Cód. Barras
                        </th>
                        <th
                            class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                        >
                            Urgencia
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    {#each productosLista as producto}
                        {@const isSelected =
                            $productosSeleccionadosReposicion.includes(
                                producto.id,
                            )}
                        <tr
                            class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer {isSelected
                                ? 'bg-brand-lime/10'
                                : ''}"
                            onclick={() => toggleProducto(producto.id)}
                        >
                            <td class="px-4 py-3">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onchange={() => toggleProducto(producto.id)}
                                    onclick={(e) => e.stopPropagation()}
                                    class="w-4 h-4 text-brand-lime rounded focus:ring-brand-lime"
                                />
                            </td>
                            <td
                                class="px-4 py-3 text-sm text-gray-900 dark:text-white"
                            >
                                {producto.nombre}
                            </td>
                            <td
                                class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400"
                            >
                                {producto.stock} un.
                            </td>
                            <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 font-mono"
                            >
                                {truncateBarcode(producto.codigoBarras)}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                <span class="flex items-center gap-1">
                                    <span
                                        >{getUrgencyIcon(
                                            producto.urgencia,
                                        )}</span
                                    >
                                    <span
                                        class={producto.urgencia === "CRÍTICO"
                                            ? "text-red-600 dark:text-red-400"
                                            : producto.urgencia === "ALTO"
                                              ? "text-orange-600 dark:text-orange-400"
                                              : "text-yellow-600 dark:text-yellow-400"}
                                    >
                                        {producto.urgencia}
                                    </span>
                                </span>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-6">
            <button
                onclick={() => (showPedidoModal = true)}
                disabled={$productosSeleccionadosReposicion.length === 0}
                class="px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Generar Pedido
            </button>
            <button
                onclick={() => (showPedidoOptimizadoModal = true)}
                disabled={$productosSeleccionadosReposicion.length === 0}
                class="px-6 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Pedido con Mejores Precios
            </button>
        </div>
    {/if}
</div>

<!-- Modals -->
<PedidoModal
    bind:show={showPedidoModal}
    productos={getProductosSeleccionados()}
    criterioNombre={getCriterioNombre(criterioSeleccionado)}
/>

<PedidoOptimizadoModal
    bind:show={showPedidoOptimizadoModal}
    productos={getProductosSeleccionados()}
    criterioNombre={getCriterioNombre(criterioSeleccionado)}
/>
