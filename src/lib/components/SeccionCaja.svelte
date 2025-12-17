<script lang="ts">
    import BusquedaProductos from "$lib/components/BusquedaProductos.svelte";
    import CarritoCompras from "$lib/components/CarritoCompras.svelte";
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
    <!-- Búsqueda y Resultados (2/3) -->
    <div class="lg:col-span-2">
        <BusquedaProductos />
    </div>

    <!-- Carrito (1/3) -->
    <div class="lg:col-span-1">
        <CarritoCompras />
    </div>
</div>
