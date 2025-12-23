<script lang="ts">
    import {
        proveedores,
        proveedoresSeleccionados,
        resultadosBusqueda,
        buscarProductos,
        getDateAgeCategory,
    } from "$lib/stores/proveedores";
    import AgregarProveedorModal from "./AgregarProveedorModal.svelte";

    let showAgregarModal = $state(false);
    let searchQuery = $state("");
    let allSelected = $state(false);

    // Get sorted providers (alphabetically)
    let sortedProveedores = $derived(
        [...$proveedores].sort((a, b) => a.nombre.localeCompare(b.nombre)),
    );

    function toggleSelectAll() {
        if (allSelected) {
            proveedoresSeleccionados.set([]);
        } else {
            proveedoresSeleccionados.set($proveedores.map((p) => p.id));
        }
        allSelected = !allSelected;
    }

    function toggleProveedor(id: string) {
        proveedoresSeleccionados.update((selected) => {
            if (selected.includes(id)) {
                return selected.filter((s) => s !== id);
            } else {
                return [...selected, id];
            }
        });
        // Update allSelected state
        allSelected = $proveedoresSeleccionados.length === $proveedores.length;
    }

    function handleBuscar() {
        if ($proveedoresSeleccionados.length === 0) return;
        if (!searchQuery.trim()) return;

        const resultados = buscarProductos(
            searchQuery,
            $proveedoresSeleccionados,
        );
        resultadosBusqueda.set(resultados);
    }

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
        }).format(value);
    }

    function getDateColorClass(dateStr: string): string {
        const category = getDateAgeCategory(dateStr);
        switch (category) {
            case "recent":
                return "text-gray-600 dark:text-gray-400";
            case "medium":
                return "text-orange-500 font-semibold";
            case "old":
                return "text-red-500 font-semibold";
        }
    }

    function truncateBarcode(code: string): string {
        return code.slice(0, 7) + "...";
    }
</script>

<div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            PROVEEDORES
        </h2>
        <button
            onclick={() => (showAgregarModal = true)}
            class="px-4 py-2.5 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 font-medium"
        >
            <span class="text-lg">+</span>
            Agregar Proveedor
        </button>
    </div>

    <!-- Main Content -->
    <div class="flex gap-6 flex-1 min-h-0">
        <!-- Left Panel: Search and Results (80%) -->
        <div class="flex-1 flex flex-col min-w-0" style="flex-basis: 80%;">
            <!-- Search Bar -->
            <div class="mb-4">
                <label
                    for="buscar-producto"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                    Buscar producto:
                </label>
                <div class="flex gap-3">
                    <input
                        type="text"
                        id="buscar-producto"
                        bind:value={searchQuery}
                        placeholder="Ej: Cemento Portland, Pintura Latex, etc."
                        onkeydown={(e) => e.key === "Enter" && handleBuscar()}
                        class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                    />
                    <button
                        onclick={handleBuscar}
                        disabled={$proveedoresSeleccionados.length === 0}
                        class="px-6 py-2.5 bg-brand-lime text-white rounded-lg hover:bg-lime-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Buscar
                    </button>
                </div>
                {#if $proveedoresSeleccionados.length === 0}
                    <p class="text-xs text-orange-500 mt-1">
                        Selecciona al menos un proveedor para buscar
                    </p>
                {/if}
            </div>

            <!-- Results Table -->
            <div
                class="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
                {#if $resultadosBusqueda.length > 0}
                    <div class="overflow-auto h-full">
                        <table class="w-full">
                            <thead
                                class="bg-gray-50 dark:bg-gray-700 sticky top-0"
                            >
                                <tr>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        Proveedor ▼
                                    </th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        Producto ▼
                                    </th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                                    >
                                        Cód. Barras
                                    </th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        Precio ▲
                                    </th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                                    >
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                class="divide-y divide-gray-200 dark:divide-gray-700"
                            >
                                {#each $resultadosBusqueda.slice(0, 10) as resultado}
                                    <tr
                                        class="hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td
                                            class="px-4 py-3 text-sm text-gray-900 dark:text-white"
                                        >
                                            {resultado.proveedor.length > 20
                                                ? resultado.proveedor.slice(
                                                      0,
                                                      18,
                                                  ) + "..."
                                                : resultado.proveedor}
                                        </td>
                                        <td
                                            class="px-4 py-3 text-sm text-gray-900 dark:text-white"
                                        >
                                            {resultado.producto}
                                        </td>
                                        <td
                                            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 font-mono"
                                        >
                                            {truncateBarcode(
                                                resultado.codigoBarras,
                                            )}
                                        </td>
                                        <td
                                            class="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white"
                                        >
                                            {formatCurrency(resultado.precio)}
                                        </td>
                                        <td class="px-4 py-3">
                                            <button
                                                class="text-sm text-brand-lime hover:underline"
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                        {#if $resultadosBusqueda.length > 10}
                            <div
                                class="p-4 text-center border-t border-gray-200 dark:border-gray-700"
                            >
                                <button
                                    class="text-brand-lime hover:underline font-medium"
                                >
                                    Ver más
                                </button>
                            </div>
                        {/if}
                    </div>
                {:else}
                    <div
                        class="flex items-center justify-center h-full text-gray-400 dark:text-gray-500"
                    >
                        <p class="text-center">
                            {searchQuery
                                ? "No se encontraron resultados"
                                : "Selecciona proveedores y busca un producto"}
                        </p>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Right Panel: Provider List (20%) -->
        <div
            class="w-72 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col"
        >
            <!-- Panel Header -->
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3
                    class="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase mb-3"
                >
                    LISTAS
                </h3>
                <button
                    onclick={toggleSelectAll}
                    class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                    {allSelected ? "Deseleccionar todas" : "Seleccionar todas"}
                </button>
            </div>

            <!-- Provider List -->
            <div class="flex-1 overflow-y-auto p-2">
                {#each sortedProveedores as proveedor}
                    {@const isSelected = $proveedoresSeleccionados.includes(
                        proveedor.id,
                    )}
                    <div
                        class="p-3 rounded-lg mb-2 cursor-pointer transition-colors {isSelected
                            ? 'bg-brand-lime/20 border border-brand-lime'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent'}"
                        onclick={() => toggleProveedor(proveedor.id)}
                        role="button"
                        tabindex="0"
                        onkeydown={(e) =>
                            e.key === "Enter" && toggleProveedor(proveedor.id)}
                    >
                        <!-- Checkbox + Name -->
                        <div class="flex items-center gap-2 mb-1">
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onchange={() => toggleProveedor(proveedor.id)}
                                onclick={(e) => e.stopPropagation()}
                                class="w-4 h-4 text-brand-lime rounded focus:ring-brand-lime"
                            />
                            <span
                                class="text-sm font-semibold text-gray-900 dark:text-white truncate"
                            >
                                {proveedor.nombre}
                            </span>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-2 ml-6 mb-1">
                            <button
                                onclick={(e) => e.stopPropagation()}
                                class="text-xs text-gray-500 dark:text-gray-400 hover:text-brand-lime"
                            >
                                Actualizar
                            </button>
                            <button
                                onclick={(e) => e.stopPropagation()}
                                class="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500"
                            >
                                🗑️
                            </button>
                        </div>

                        <!-- Date -->
                        <p
                            class="text-xs ml-6 {getDateColorClass(
                                proveedor.ultimaActualizacion,
                            )}"
                        >
                            Últ. act: {proveedor.ultimaActualizacion}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<AgregarProveedorModal bind:show={showAgregarModal} />
