<script lang="ts">
    import type { ProductoReposicion } from "$lib/stores/reposicionData";
    import { encontrarMejorPrecio } from "$lib/stores/proveedores";

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

    // Computed optimized data
    let datosOptimizados = $derived(
        productos.map((producto) => {
            const mejor = encontrarMejorPrecio(producto.codigoBarras);
            return {
                ...producto,
                mejorProveedor: mejor?.proveedor || null,
                mejorPrecio: mejor?.precio || null,
                segundoPrecio: mejor?.segundoPrecio || null,
            };
        }),
    );

    // Calculate total savings
    let ahorroTotal = $derived(
        datosOptimizados.reduce((acc, item) => {
            if (item.mejorPrecio && item.segundoPrecio) {
                return acc + (item.segundoPrecio - item.mejorPrecio);
            }
            return acc;
        }, 0),
    );

    // Group by provider
    let resumenProveedores = $derived(() => {
        const resumen: Record<string, number> = {};
        datosOptimizados.forEach((item) => {
            if (item.mejorProveedor) {
                resumen[item.mejorProveedor] =
                    (resumen[item.mejorProveedor] || 0) + 1;
            }
        });
        return Object.entries(resumen).sort((a, b) => b[1] - a[1]);
    });

    function handleCerrar() {
        show = false;
    }

    function getToday(): string {
        const today = new Date();
        return `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;
    }

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
        }).format(value);
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
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 w-[700px] max-w-[90vw] max-h-[85vh] flex flex-col"
    >
        <!-- Header -->
        <div
            class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                PEDIDO OPTIMIZADO POR PRECIO
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
            {#if ahorroTotal > 0}
                <p
                    class="text-sm text-green-600 dark:text-green-400 font-medium"
                >
                    Ahorro estimado: {formatCurrency(ahorroTotal)}
                </p>
            {/if}
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-auto p-6">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
                <h3 class="font-semibold text-gray-900 dark:text-white">
                    PRODUCTOS CON MEJOR PROVEEDOR
                </h3>

                {#each datosOptimizados as producto, i}
                    <div
                        class="pb-3 {i < datosOptimizados.length - 1
                            ? 'border-b border-gray-200 dark:border-gray-600'
                            : ''}"
                    >
                        <p class="font-medium text-gray-900 dark:text-white">
                            {i + 1}. {producto.nombre}
                        </p>
                        {#if producto.mejorProveedor}
                            <p
                                class="text-sm text-brand-lime ml-4 flex items-center gap-1"
                            >
                                <span>💰</span> Mejor precio: {producto.mejorProveedor}
                            </p>
                            <p
                                class="text-sm text-gray-700 dark:text-gray-300 ml-4"
                            >
                                Precio: {formatCurrency(producto.mejorPrecio!)}
                            </p>
                            {#if producto.segundoPrecio}
                                <p
                                    class="text-xs text-gray-500 dark:text-gray-400 ml-4"
                                >
                                    (vs {formatCurrency(producto.segundoPrecio)}
                                    en otro proveedor)
                                </p>
                            {:else}
                                <p
                                    class="text-xs text-gray-500 dark:text-gray-400 ml-4"
                                >
                                    (sin comparación disponible)
                                </p>
                            {/if}
                        {:else}
                            <p
                                class="text-sm text-orange-500 ml-4 flex items-center gap-1"
                            >
                                <span>⚠️</span> No disponible en proveedores actuales
                            </p>
                        {/if}
                    </div>
                {/each}

                <div
                    class="pt-3 border-t border-gray-300 dark:border-gray-500 space-y-2"
                >
                    <p class="font-semibold text-gray-900 dark:text-white">
                        Total: {productos.length} productos
                    </p>

                    {#if resumenProveedores().length > 0}
                        <div class="mt-3">
                            <p
                                class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
                            >
                                RESUMEN POR PROVEEDOR:
                            </p>
                            {#each resumenProveedores() as [proveedor, cantidad]}
                                <p
                                    class="text-sm text-gray-600 dark:text-gray-400"
                                >
                                    • {proveedor}: {cantidad} producto{cantidad >
                                    1
                                        ? "s"
                                        : ""}
                                </p>
                            {/each}
                        </div>
                    {/if}
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
                class="px-4 py-2 bg-brand-lime text-white rounded-lg hover:bg-lime-600 transition-colors"
            >
                Cerrar
            </button>
        </div>
    </div>
{/if}
