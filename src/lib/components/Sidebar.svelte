<script lang="ts">
    import BadgePro from "./BadgePro.svelte";

    interface Props {
        currentSection?: string;
    }

    let { currentSection = $bindable("caja") }: Props = $props();

    type Section = {
        id: string;
        name: string;
        icon: string;
        enabled: boolean;
        isPro?: boolean;
    };

    const sections: Section[] = [
        { id: "caja", name: "Caja", icon: "🏪", enabled: true },
        { id: "stock", name: "Gestión de Stock", icon: "📦", enabled: true },
        { id: "proveedores", name: "Proveedores", icon: "🤝", enabled: true },
        { id: "reposicion", name: "Reposición", icon: "🔄", enabled: true },
        { id: "analiticas", name: "Analíticas", icon: "📊", enabled: true },
        {
            id: "sincronizacion",
            name: "Sincronización",
            icon: "☁️",
            enabled: true,
            isPro: true,
        },
        {
            id: "configuracion",
            name: "Configuración",
            icon: "⚙️",
            enabled: true,
        },
    ];

    function selectSection(id: string, enabled: boolean) {
        if (enabled) {
            currentSection = id;
        } else {
            alert("Esta funcionalidad estará disponible próximamente");
        }
    }
</script>

<aside
    class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
>
    <!-- Logo/Nombre -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
            <img src="/logo-negocio.png" alt="Logo" class="w-10 h-10" />
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                Mi Negocio
            </h1>
        </div>
    </div>

    <!-- Menu -->
    <nav class="flex-1 p-4">
        <ul class="space-y-2">
            {#each sections as section}
                <li>
                    <button
                        onclick={() =>
                            selectSection(section.id, section.enabled)}
                        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
              {currentSection === section.id
                            ? 'bg-brand-lime text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}"
                    >
                        <span class="text-2xl">{section.icon}</span>
                        <span class="font-medium flex-1">{section.name}</span>
                        {#if section.isPro}
                            <div class="scale-75">
                                <BadgePro />
                            </div>
                        {/if}
                    </button>
                </li>
            {/each}
        </ul>
    </nav>
</aside>
