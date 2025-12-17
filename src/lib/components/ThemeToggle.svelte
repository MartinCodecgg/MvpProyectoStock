<script lang="ts">
    import { theme, toggleTheme } from "$lib/stores/theme";
</script>

<button
    onclick={toggleTheme}
    class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    aria-label="Cambiar tema"
>
    {#if $theme === "light"}
        <span class="text-2xl">🌙</span>
    {:else}
        <span class="text-2xl">☀️</span>
    {/if}
</button>
