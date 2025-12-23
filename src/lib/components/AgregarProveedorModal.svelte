<script lang="ts">
    let { show = $bindable(false) }: { show?: boolean } = $props();
    let nombreProveedor = $state("");
    let archivoSeleccionado = $state<string | null>(null);

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            archivoSeleccionado = input.files[0].name;
        }
    }

    function handleAgregar() {
        // Decorativo - no agrega realmente
        show = false;
        nombreProveedor = "";
        archivoSeleccionado = null;
    }

    function handleCancelar() {
        show = false;
        nombreProveedor = "";
        archivoSeleccionado = null;
    }
</script>

{#if show}
    <!-- Backdrop -->
    <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onclick={handleCancelar}
        role="presentation"
    ></div>

    <!-- Modal -->
    <div
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 w-[450px] max-w-[90vw]"
    >
        <!-- Header -->
        <div
            class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                AGREGAR PROVEEDOR
            </h2>
            <button
                onclick={handleCancelar}
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
            >
                ✕
            </button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-5">
            <!-- Nombre del proveedor -->
            <div>
                <label
                    for="nombre-proveedor"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                    Nombre del proveedor:
                </label>
                <input
                    type="text"
                    id="nombre-proveedor"
                    bind:value={nombreProveedor}
                    placeholder="Ej: Ferretería Central SA"
                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
            </div>

            <!-- Archivo -->
            <div>
                <label
                    for="archivo-lista"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                    Archivo de lista de precios:
                </label>
                <label
                    for="archivo-lista"
                    class="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-brand-orange transition-colors"
                >
                    <span class="text-gray-600 dark:text-gray-400">
                        {archivoSeleccionado || "Seleccionar archivo..."}
                    </span>
                    <input
                        type="file"
                        id="archivo-lista"
                        accept=".xlsx,.xls,.pdf,.jpg,.jpeg,.png"
                        onchange={handleFileChange}
                        class="hidden"
                    />
                </label>
                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Formatos aceptados: Excel (.xlsx, .xls), PDF (.pdf), Imagen
                    (.jpg, .png)
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div
            class="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700"
        >
            <button
                onclick={handleCancelar}
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
                Cancelar
            </button>
            <button
                onclick={handleAgregar}
                class="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
                Agregar
            </button>
        </div>
    </div>
{/if}
