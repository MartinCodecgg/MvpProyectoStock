<script lang="ts">
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Header from "$lib/components/Header.svelte";
	import SeccionCaja from "$lib/components/SeccionCaja.svelte";
	import SeccionStock from "$lib/components/SeccionStock.svelte";
	import SeccionProveedores from "$lib/components/SeccionProveedores.svelte";
	import SeccionReposicion from "$lib/components/SeccionReposicion.svelte";
	import SeccionAnaliticas from "$lib/components/SeccionAnaliticas.svelte";
	import SeccionSincronizacion from "$lib/components/SeccionSincronizacion.svelte";
	import SeccionConfiguracion from "$lib/components/SeccionConfiguracion.svelte";
	import ChatButton from "$lib/components/ChatButton.svelte";
	import ChatPanel from "$lib/components/ChatPanel.svelte";
	import { theme } from "$lib/stores/theme";
	import { onMount } from "svelte";
	import type { Component } from "svelte";

	// Mapa de secciones → componente
	const sections: Record<string, Component> = {
		caja: SeccionCaja,
		stock: SeccionStock,
		proveedores: SeccionProveedores,
		reposicion: SeccionReposicion,
		analiticas: SeccionAnaliticas,
		sincronizacion: SeccionSincronizacion,
		configuracion: SeccionConfiguracion,
	};

	let currentSection = $state("caja");
	let mainElement: HTMLElement;

	// Componente actual basado en la sección seleccionada
	let CurrentComponent = $derived(sections[currentSection]);
	//Se usa derived porque CurrentComponent es un componente que depende de currentSection

	// Subscribe to theme changes and update DOM
	onMount(() => {
		const unsubscribe = theme.subscribe((currentTheme) => {
			if (currentTheme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		});

		return unsubscribe;
	});

	// Reset scroll when section changes
	$effect(() => {
		currentSection;
		if (mainElement) {
			mainElement.scrollTop = 0;
		}
	});
</script>

<div class="flex h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden">
	<!-- Sidebar -->
	<Sidebar bind:currentSection />

	<!-- Main Content -->
	<div class="flex-1 flex flex-col overflow-hidden">
		<!-- Header -->
		<Header />

		<!-- Content Area - Render dinámico -->
		<main class="flex-1 overflow-auto p-6" bind:this={mainElement}>
			{#if CurrentComponent}
				<CurrentComponent />
			{:else}
				<div class="text-center py-12">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						{currentSection}
					</h2>
					<p class="text-gray-600 dark:text-gray-300">
						Sección no implementada
					</p>
				</div>
			{/if}
		</main>
	</div>

	<!-- Chat Jarvis -->
	<ChatButton />
	<ChatPanel />
</div>
