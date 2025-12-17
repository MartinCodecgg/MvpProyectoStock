<script lang="ts">
    import { margenes } from "$lib/stores/config";

    let showSaved = $state(false);

    function handleSave() {
        showSaved = true;
        setTimeout(() => {
            showSaved = false;
        }, 2000);
    }
</script>

<div class="space-y-6">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        CONFIGURACIÓN
    </h2>

    <!-- Subsections Menu -->
    <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
        <!-- Márgenes de Ganancia subsection (active) -->
        <div class="p-6">
            <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2"
            >
                CONFIGURACIÓN > MÁRGENES DE GANANCIA
            </h3>

            <p class="text-gray-600 dark:text-gray-400 mb-6">
                Configure los márgenes de ganancia para cada método de pago.
                Estos porcentajes se aplicarán automáticamente en las ventas.
            </p>

            <!-- Márgenes List -->
            <div class="space-y-3 mb-6">
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300"
                        >Efectivo:</span
                    >
                    <span class="font-semibold text-gray-900 dark:text-white">
                        {$margenes.efectivo}%
                    </span>
                </div>
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300"
                        >Transferencia:</span
                    >
                    <span class="font-semibold text-gray-900 dark:text-white">
                        {$margenes.transferencia}%
                    </span>
                </div>
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300">Débito:</span
                    >
                    <span class="font-semibold text-gray-900 dark:text-white">
                        {$margenes.debito}%
                    </span>
                </div>
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300"
                        >Crédito:</span
                    >
                    <span class="font-semibold text-gray-900 dark:text-white">
                        {$margenes.credito}%
                    </span>
                </div>
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300"
                        >QR/Mercado Pago:</span
                    >
                    <span class="font-semibold text-gray-900 dark:text-white">
                        {$margenes.qrMercadoPago}%
                    </span>
                </div>
            </div>

            <!-- Save Button -->
            <div class="flex items-center gap-4">
                <button
                    onclick={handleSave}
                    class="px-6 py-2 bg-brand-lime text-white rounded-lg hover:bg-lime-600 transition-colors"
                >
                    Guardar Cambios
                </button>
                {#if showSaved}
                    <span class="text-green-600 dark:text-green-400 text-sm">
                        ✓ Cambios guardados
                    </span>
                {/if}
            </div>
        </div>

        <!-- Other subsections (placeholder) -->
        <div class="border-t border-gray-200 dark:border-gray-700 p-6">
            <p class="text-gray-500 dark:text-gray-400 text-sm">
                <strong>Datos del Negocio:</strong> Sin implementar
            </p>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 p-6">
            <p class="text-gray-500 dark:text-gray-400 text-sm">
                <strong>Preferencias de Usuario:</strong> Sin implementar
            </p>
        </div>
    </div>
</div>
