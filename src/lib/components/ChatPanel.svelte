<script lang="ts">
    import { chatOpen } from "$lib/stores/chat";
    import { fade, fly } from "svelte/transition";

    function closeChat() {
        chatOpen.set(false);
    }
</script>

{#if $chatOpen}
    <div
        transition:fly={{ y: 50, duration: 300 }}
        class="fixed bottom-24 right-6 w-[20vw] min-w-[300px] h-[50vh] min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col overflow-hidden"
    >
        <!-- Header -->
        <div
            class="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4 flex items-center justify-between"
        >
            <h3 class="font-bold text-lg">Jarvis</h3>
            <button
                onclick={closeChat}
                aria-label="Cerrar chat"
                class="hover:bg-white/20 rounded-full p-1 transition-colors"
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

        <!-- Messages Area with Background -->
        <div
            class="flex-1 relative p-4 overflow-y-auto bg-gradient-to-b from-blue-50/30 to-cyan-50/30 dark:from-gray-900/30 dark:to-gray-800/30"
        >
            <!-- Jarvis hologram background image -->
            <div
                class="absolute inset-0 flex items-center justify-center opacity-15 dark:opacity-5 pointer-events-none"
            >
                <div class="text-9xl">🤖</div>
            </div>

            <!-- Welcome message -->
            <div class="relative z-10 flex justify-start mb-4">
                <div
                    class="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm"
                >
                    <p class="text-gray-800 dark:text-white">Buenas tardes,</p>
                    <p class="text-gray-800 dark:text-white">Admin</p>
                </div>
            </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-gray-200 dark:border-gray-700 p-4">
            <div
                class="flex gap-2 items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2"
            >
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    class="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
                    disabled
                />
                <button
                    class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                    aria-label="Enviar mensaje"
                    disabled
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
{/if}
