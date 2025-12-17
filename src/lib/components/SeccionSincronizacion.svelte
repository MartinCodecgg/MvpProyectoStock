<script lang="ts">
    import BadgePro from "./BadgePro.svelte";
    import { syncStatus } from "$lib/stores/sync";

    let backupInProgress = $state(false);

    function handleBackup() {
        backupInProgress = true;
        setTimeout(() => {
            backupInProgress = false;
            alert("Backup completado exitosamente");
        }, 2000);
    }
</script>

<div class="space-y-6">
    <!-- Title with PRO badge -->
    <div class="flex items-center gap-3">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            SINCRONIZACIÓN
        </h2>
        <BadgePro />
    </div>

    <!-- Estado de Conexión Card -->
    <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ESTADO DE CONEXIÓN
        </h3>

        <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
                <p class="font-semibold text-gray-900 dark:text-white">
                    {$syncStatus.estado}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Última sincronización: {$syncStatus.ultimaSincronizacion}
                </p>
            </div>
        </div>
    </div>

    <!-- Backup de Datos Card -->
    <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            BACKUP DE DATOS
        </h3>

        <div class="space-y-2 text-gray-600 dark:text-gray-400 mb-4">
            <p>
                <span class="font-medium">Último backup:</span>
                {$syncStatus.ultimoBackup.fecha}
            </p>
            <p>
                <span class="font-medium">Tamaño:</span>
                {$syncStatus.ultimoBackup.tamaño}
            </p>
            <p class="flex items-center gap-2">
                <span class="font-medium">Estado:</span>
                <span class="text-green-600 dark:text-green-400">
                    ✓ {$syncStatus.ultimoBackup.estado}
                </span>
            </p>
        </div>

        <button
            onclick={handleBackup}
            disabled={backupInProgress}
            class="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {backupInProgress ? "Procesando..." : "Hacer Backup Manual"}
        </button>
    </div>
</div>
