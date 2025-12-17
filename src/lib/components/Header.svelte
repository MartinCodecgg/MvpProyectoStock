<script lang="ts">
    import ThemeToggle from "./ThemeToggle.svelte";
    import BadgePro from "./BadgePro.svelte";
    import NotificationIcon from "./NotificationIcon.svelte";
    import NotificationPanel from "./NotificationPanel.svelte";

    let notificationPanelOpen = $state(false);

    function handleNotificationToggle(isOpen: boolean) {
        notificationPanelOpen = isOpen;
    }

    function closeNotificationPanel() {
        notificationPanelOpen = false;
    }

    // Close panel when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (
            notificationPanelOpen &&
            !target.closest(".notification-container")
        ) {
            notificationPanelOpen = false;
        }
    }
</script>

<svelte:window onclick={handleClickOutside} />

<header
    class="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6 gap-4"
>
    <!-- Username -->
    <span class="text-gray-700 dark:text-gray-300 font-medium">Admin</span>

    <!-- PRO Badge -->
    <BadgePro />

    <!-- Notifications -->
    <div class="relative notification-container">
        <NotificationIcon onToggle={handleNotificationToggle} />
        <NotificationPanel
            isOpen={notificationPanelOpen}
            onClose={closeNotificationPanel}
        />
    </div>

    <!-- Theme Toggle -->
    <ThemeToggle />
</header>
