<script lang="ts">
    import { notificationCount } from "$lib/stores/notifications";

    let open = $state(false);

    let { onToggle }: { onToggle: (isOpen: boolean) => void } = $props();

    function togglePanel() {
        open = !open;
        onToggle(open);
    }
</script>

<button
    onclick={togglePanel}
    class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
>
    <!-- Bell Icon -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
    </svg>

    <!-- Badge -->
    {#if $notificationCount > 0}
        <span
            class="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
        >
            {$notificationCount}
        </span>
    {/if}
</button>
