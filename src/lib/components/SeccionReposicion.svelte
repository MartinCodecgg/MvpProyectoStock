<script lang="ts">
    import { recommendations } from "$lib/stores/recommendations";

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(value);
    }

    function getUrgencyColor(urgencia: string): string {
        switch (urgencia) {
            case "URGENTE":
                return "text-red-600 dark:text-red-400";
            case "MEDIO":
                return "text-yellow-600 dark:text-yellow-400";
            case "NORMAL":
                return "text-green-600 dark:text-green-400";
            default:
                return "text-gray-600 dark:text-gray-400";
        }
    }

    function getUrgencyIcon(urgencia: string): string {
        switch (urgencia) {
            case "URGENTE":
                return "🔴";
            case "MEDIO":
                return "🟡";
            case "NORMAL":
                return "🟢";
            default:
                return "⚪";
        }
    }
</script>

<div class="space-y-6">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">REPOSICIÓN</h2>

    <!-- Description -->
    <p class="text-gray-600 dark:text-gray-400 max-w-3xl">
        Basado en el volumen de ventas y análisis predictivo, se recomienda
        reponer los siguientes productos para evitar quiebre de stock.
    </p>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each $recommendations as rec}
            <div
                class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
                <!-- Header with urgency -->
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-xl">{getUrgencyIcon(rec.urgencia)}</span>
                    <span
                        class="font-bold text-sm uppercase {getUrgencyColor(
                            rec.urgencia,
                        )}"
                    >
                        {rec.urgencia}
                    </span>
                </div>

                <!-- Product Name -->
                <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                >
                    {rec.nombre}
                </h3>

                <!-- Details -->
                <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        <span class="font-medium">Stock actual:</span>
                        {rec.stockActual.toLocaleString("es-AR")} unidades
                    </p>
                    <p>
                        <span class="font-medium">Días hasta agotamiento:</span>
                        {rec.diasHastaAgotamiento} días
                    </p>
                    <p>
                        <span class="font-medium">Cantidad recomendada:</span>
                        {rec.cantidadRecomendada.toLocaleString("es-AR")} unidades
                    </p>
                    <p>
                        <span class="font-medium">Precio de reposición:</span>
                        {formatCurrency(rec.precioReposicion)}
                    </p>
                    {#if rec.tieneVencimiento}
                        <p>
                            <span class="font-medium">Vencimiento:</span>
                            {rec.vencimiento || "No especificado"}
                        </p>
                    {:else}
                        <p>
                            <span class="font-medium">Vencimiento:</span> No aplica
                        </p>
                    {/if}
                </div>

                <!-- Button -->
                <button
                    class="mt-4 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    Ver Detalles
                </button>
            </div>
        {/each}
    </div>
</div>
