<script lang="ts">
    import {
        notifications,
        type Notification,
    } from "$lib/stores/notifications";
    import { slide, fade } from "svelte/transition";

    let {
        isOpen = $bindable(false),
        onClose,
    }: { isOpen?: boolean; onClose: () => void } = $props();

    // Group notifications by category
    let groupedNotifications = $derived.by(() => {
        const groups: Record<string, Notification[]> = {};
        $notifications.forEach((notif) => {
            if (!groups[notif.categoria]) {
                groups[notif.categoria] = [];
            }
            groups[notif.categoria].push(notif);
        });
        return groups;
    });

    // Order: STOCK AGOTADO, VENCIMIENTOS, STOCK BAJO
    const categoryOrder = ["STOCK AGOTADO", "VENCIMIENTOS", "STOCK BAJO"];
</script>

{#if isOpen}
    <div
        transition:fade={{ duration: 200 }}
        class="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-[500px] overflow-y-auto"
    >
        <!-- Header -->
        <div
            class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
            <h3 class="font-bold text-gray-900 dark:text-white">
                NOTIFICACIONES
            </h3>
            <button
                onclick={onClose}
                aria-label="Cerrar notificaciones"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>

        <!-- Notifications by category -->
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
            {#each categoryOrder as category}
                {#if groupedNotifications[category]}
                    <div class="p-4">
                        <h4
                            class="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2"
                        >
                            {category}
                            <span class="text-gray-500"
                                >({groupedNotifications[category].length})</span
                            >
                        </h4>
                        <ul class="space-y-2">
                            {#each groupedNotifications[category] as notif}
                                <li class="text-sm">
                                    <div class="flex items-start">
                                        <span class="mr-2">•</span>
                                        <div class="flex-1">
                                            <p
                                                class="font-medium text-gray-900 dark:text-white"
                                            >
                                                {notif.producto}
                                            </p>
                                            <p
                                                class="text-gray-600 dark:text-gray-400"
                                                class:text-red-600={notif.urgencia ===
                                                    "critica"}
                                                class:dark:text-red-400={notif.urgencia ===
                                                    "critica"}
                                                class:font-bold={notif.urgencia ===
                                                    "critica"}
                                            >
                                                {notif.mensaje}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}
