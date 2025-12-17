<script lang="ts">
    import { productosFoto } from "$lib/data/productosFoto";
    import {
        productosStore,
        actualizarDesdeProductosFoto,
    } from "$lib/stores/products";
    import type { ProductoFoto } from "$lib/data/productosFoto";

    interface Props {
        onCerrar: () => void;
    }

    let { onCerrar }: Props = $props();

    let archivoSeleccionado = $state<File | null>(null);
    let productosDetectados = $state<ProductoFoto[]>([]);
    let mostrarVista = $state<"subir" | "procesando" | "previa">("subir");

    function handleFileChange(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            archivoSeleccionado = input.files[0];
        }
    }

    function procesarFoto() {
        if (!archivoSeleccionado) {
            alert("Por favor selecciona una imagen primero");
            return;
        }

        // Mostrar estado de procesamiento
        mostrarVista = "procesando";

        // Simular procesamiento con IA (2.5 segundos)
        setTimeout(() => {
            productosDetectados = productosFoto;
            mostrarVista = "previa";
        }, 2500);
    }

    function confirmarActualizacion() {
        // Actualizar productos en el store
        const productosActualizados = [...$productosStore];

        productosFoto.forEach((productoFoto) => {
            const index = productosActualizados.findIndex(
                (p) => p.id === productoFoto.id,
            );

            if (index !== -1) {
                // Actualizar existente
                productosActualizados[index] = {
                    ...productosActualizados[index],
                    stock:
                        productosActualizados[index].stock +
                        productoFoto.cantidad,
                    precio: productoFoto.precio,
                };
            } else {
                // Agregar nuevo
                productosActualizados.push({
                    id: productoFoto.id,
                    nombre: productoFoto.nombre,
                    codigoBarras: productoFoto.codigoBarras,
                    precio: productoFoto.precio,
                    stock: productoFoto.cantidad,
                });
            }
        });

        actualizarDesdeProductosFoto(productosActualizados);
        alert(
            `Se actualizaron ${productosFoto.length} productos correctamente`,
        );
        onCerrar();
    }

    function formatPrecio(precio: number): string {
        return `$${precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function formatCantidad(cantidad: number): string {
        return cantidad.toLocaleString("es-AR");
    }
</script>

<!-- Overlay -->
<div
    class="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onclick={onCerrar}
    onkeydown={(e) => e.key === "Escape" && onCerrar()}
    role="button"
    tabindex="0"
    aria-label="Cerrar modal"
>
    <!-- Modal -->
    <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Actualizar Stock por Foto
            </h2>
        </div>

        <div class="flex-1 overflow-auto p-6">
            {#if mostrarVista === "subir"}
                <!-- Vista de subir archivo -->
                <div class="space-y-6">
                    <div
                        class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center"
                    >
                        <div class="space-y-4">
                            <div class="text-6xl">📷</div>
                            <div>
                                <p
                                    class="text-lg font-medium text-gray-900 dark:text-white mb-2"
                                >
                                    Selecciona una foto de productos
                                </p>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    JPG, PNG hasta 10MB
                                </p>
                            </div>
                            <label for="file-upload" class="cursor-pointer">
                                <span
                                    class="inline-block px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                >
                                    Seleccionar Archivo
                                </span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onchange={handleFileChange}
                                    class="hidden"
                                />
                            </label>
                            {#if archivoSeleccionado}
                                <p
                                    class="text-sm text-gray-600 dark:text-gray-300 mt-4"
                                >
                                    Archivo seleccionado: <strong
                                        >{archivoSeleccionado.name}</strong
                                    >
                                </p>
                            {/if}
                        </div>
                    </div>
                </div>
            {:else if mostrarVista === "procesando"}
                <!-- Vista de procesamiento -->
                <div
                    class="flex flex-col items-center justify-center py-16 space-y-6"
                >
                    <!-- Spinner -->
                    <div class="relative w-24 h-24">
                        <div
                            class="absolute inset-0 border-8 border-gray-200 dark:border-gray-700 rounded-full"
                        ></div>
                        <div
                            class="absolute inset-0 border-8 border-brand-orange border-t-transparent rounded-full animate-spin"
                        ></div>
                    </div>

                    <!-- Mensajes -->
                    <div class="text-center space-y-2">
                        <p
                            class="text-xl font-semibold text-gray-900 dark:text-white"
                        >
                            Procesando imagen con IA...
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Detectando productos automáticamente
                        </p>
                    </div>
                </div>
            {:else}
                <!-- Vista previa de productos detectados -->
                <div class="space-y-4">
                    <div
                        class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
                    >
                        <p class="text-sm text-green-800 dark:text-green-200">
                            Se detectaron <strong
                                >{productosDetectados.length} productos</strong
                            > en la imagen
                        </p>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead
                                class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
                            >
                                <tr>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase"
                                    >
                                        Nombre
                                    </th>
                                    <th
                                        class="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase"
                                    >
                                        Cantidad
                                    </th>
                                    <th
                                        class="px-4 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase"
                                    >
                                        Precio
                                    </th>
                                    <th
                                        class="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase"
                                    >
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                class="divide-y divide-gray-200 dark:divide-gray-700"
                            >
                                {#each productosDetectados as producto}
                                    <tr
                                        class="hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td
                                            class="px-4 py-3 text-sm text-gray-900 dark:text-white"
                                        >
                                            {producto.nombre}
                                        </td>
                                        <td
                                            class="px-4 py-3 text-sm text-right text-gray-900 dark:text-white"
                                        >
                                            +{formatCantidad(producto.cantidad)}
                                        </td>
                                        <td
                                            class="px-4 py-3 text-sm text-right text-gray-900 dark:text-white"
                                        >
                                            {formatPrecio(producto.precio)}
                                        </td>
                                        <td class="px-4 py-3 text-center">
                                            {#if producto.esNuevo}
                                                <span
                                                    class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded"
                                                >
                                                    Nuevo
                                                </span>
                                            {:else}
                                                <span
                                                    class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                                                >
                                                    Actualización
                                                </span>
                                            {/if}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Footer -->
        <div
            class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between"
        >
            <button
                onclick={onCerrar}
                disabled={mostrarVista === "procesando"}
                class="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Cancelar
            </button>

            {#if mostrarVista === "subir"}
                <button
                    onclick={procesarFoto}
                    disabled={!archivoSeleccionado}
                    class="px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed font-bold transition-colors"
                >
                    Procesar Foto
                </button>
            {:else if mostrarVista === "previa"}
                <button
                    onclick={confirmarActualizacion}
                    class="px-6 py-3 bg-brand-lime text-white rounded-lg hover:bg-lime-600 font-bold transition-colors"
                >
                    Confirmar Actualización
                </button>
            {/if}
        </div>
    </div>
</div>
