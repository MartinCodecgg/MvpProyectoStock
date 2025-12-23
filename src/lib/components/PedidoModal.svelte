<script lang="ts">
    import type { ProductoReposicion } from "$lib/stores/reposicionData";

    interface Props {
        show?: boolean;
        productos?: ProductoReposicion[];
        criterioNombre?: string;
    }

    let {
        show = $bindable(false),
        productos = [],
        criterioNombre = "",
    }: Props = $props();

    function handleCerrar() {
        show = false;
    }

    function getToday(): string {
        const today = new Date();
        return `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;
    }
</script>

{#if show}
    <!-- Backdrop -->
    <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onclick={handleCerrar}
        role="presentation"
    ></div>

    <!-- Modal -->
    <div
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 w-[650px] max-w-[90vw] max-h-[80vh] flex flex-col"
    >
        <!-- Header -->
        <div
            class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                PEDIDO DE REPOSICIÓN
            </h2>
            <button
                onclick={handleCerrar}
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
            >
                ✕
            </button>
        </div>

        <!-- Info -->
        <div class="px-6 py-3 bg-gray-50 dark:bg-gray-750">
            <p class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">Criterio:</span>
                {criterioNombre}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">Fecha:</span>
                {getToday()}
            </p>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-auto p-6">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
                <h3 class="font-semibold text-gray-900 dark:text-white">
                    PRODUCTOS SELECCIONADOS
                </h3>

                {#each productos as producto, i}
                    <div
                        class="pb-3 {i < productos.length - 1
                            ? 'border-b border-gray-200 dark:border-gray-600'
                            : ''}"
                    >
                        <p class="font-medium text-gray-900 dark:text-white">
                            {i + 1}. {producto.nombre}
                        </p>
                        <p
                            class="text-sm text-gray-500 dark:text-gray-400 ml-4"
                        >
                            Código: {producto.codigoBarras}
                        </p>
                        <p
                            class="text-sm text-gray-500 dark:text-gray-400 ml-4"
                        >
                            Stock actual: {producto.stock} unidades
                        </p>
                    </div>
                {/each}

                <div class="pt-3 border-t border-gray-300 dark:border-gray-500">
                    <p
                        class="font-semibold text-gray-900 dark:text-white text-right"
                    >
                        Total: {productos.length} productos
                    </p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div
            class="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700"
        >
            <button
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
                Exportar PDF
            </button>
            <button
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
                Imprimir
            </button>
            <button
                onclick={handleCerrar}
                class="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
                Cerrar
            </button>
        </div>
    </div>
{/if}
