<script lang="ts">
    import { onMount } from "svelte";
    import { Chart, registerables } from "chart.js";
    import {
        analyticsVentasPorDia,
        analyticsTopProductos,
        analyticsDistribucionPagos,
        analyticsKPIs,
    } from "$lib/stores/analytics";
    import { theme } from "$lib/stores/theme";

    Chart.register(...registerables);

    let lineChartCanvas: HTMLCanvasElement;
    let barChartCanvas: HTMLCanvasElement;
    let pieChartCanvas: HTMLCanvasElement;

    let lineChart: Chart | null = null;
    let barChart: Chart | null = null;
    let pieChart: Chart | null = null;

    let selectedPeriod = $state("Este mes");

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(value);
    }

    function initCharts() {
        const isDark = $theme === "dark";
        const textColor = isDark ? "#d1d5db" : "#374151";
        const gridColor = isDark ? "#374151" : "#e5e7eb";

        // Destroy existing charts
        if (lineChart) lineChart.destroy();
        if (barChart) barChart.destroy();
        if (pieChart) pieChart.destroy();

        // Line Chart: Ventas por día
        lineChart = new Chart(lineChartCanvas, {
            type: "line",
            data: {
                labels: $analyticsVentasPorDia.map((v) => v.dia.toString()),
                datasets: [
                    {
                        label: "Ventas ($)",
                        data: $analyticsVentasPorDia.map((v) => v.monto),
                        borderColor: "#f97316",
                        backgroundColor: "rgba(249, 115, 22, 0.1)",
                        tension: 0.3,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: textColor },
                    },
                    title: {
                        display: true,
                        text: "Ventas por Día del Mes",
                        color: textColor,
                        font: { size: 16, weight: "bold" },
                    },
                },
                scales: {
                    y: {
                        ticks: { color: textColor },
                        grid: { color: gridColor },
                    },
                    x: {
                        ticks: { color: textColor },
                        grid: { color: gridColor },
                    },
                },
            },
        });

        // Bar Chart: Top 5 productos
        barChart = new Chart(barChartCanvas, {
            type: "bar",
            data: {
                labels: $analyticsTopProductos.map((p) => p.producto),
                datasets: [
                    {
                        label: "Cantidad vendida",
                        data: $analyticsTopProductos.map((p) => p.cantidad),
                        backgroundColor: [
                            "#f97316",
                            "#84cc16",
                            "#3b82f6",
                            "#8b5cf6",
                            "#ec4899",
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y",
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Top 5 Productos Más Vendidos",
                        color: textColor,
                        font: { size: 16, weight: "bold" },
                    },
                },
                scales: {
                    y: {
                        ticks: { color: textColor },
                        grid: { color: gridColor },
                    },
                    x: {
                        ticks: { color: textColor },
                        grid: { color: gridColor },
                    },
                },
            },
        });

        // Pie Chart: Distribución de pagos
        pieChart = new Chart(pieChartCanvas, {
            type: "pie",
            data: {
                labels: $analyticsDistribucionPagos.map((p) => p.metodo),
                datasets: [
                    {
                        data: $analyticsDistribucionPagos.map(
                            (p) => p.porcentaje,
                        ),
                        backgroundColor: [
                            "#f97316",
                            "#84cc16",
                            "#3b82f6",
                            "#8b5cf6",
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: textColor },
                        position: "bottom",
                    },
                    title: {
                        display: true,
                        text: "Distribución por Método de Pago",
                        color: textColor,
                        font: { size: 16, weight: "bold" },
                    },
                },
            },
        });
    }

    onMount(() => {
        initCharts();

        // Re-initialize charts when theme changes
        const unsubscribe = theme.subscribe(() => {
            setTimeout(() => initCharts(), 100);
        });

        return () => {
            unsubscribe();
            if (lineChart) lineChart.destroy();
            if (barChart) barChart.destroy();
            if (pieChart) pieChart.destroy();
        };
    });
</script>

<div class="space-y-6">
    <!-- Title and Period Selector -->
    <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            ANALÍTICAS
        </h2>
        <select
            bind:value={selectedPeriod}
            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300"
        >
            <option>Hoy</option>
            <option>Esta semana</option>
            <option>Este mes</option>
            <option>Último mes</option>
        </select>
    </div>

    <!-- Charts Section -->
    <div class="space-y-6">
        <!-- Line Chart -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
            <div class="h-80">
                <canvas bind:this={lineChartCanvas}></canvas>
            </div>
        </div>

        <!-- Bar Chart -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
            <div class="h-80">
                <canvas bind:this={barChartCanvas}></canvas>
            </div>
        </div>

        <!-- Pie Chart -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
            <div class="h-80">
                <canvas bind:this={pieChartCanvas}></canvas>
            </div>
        </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- KPI 1: Total Ganado Hoy -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Ganado Hoy
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency($analyticsKPIs.totalHoy)}
            </p>
            <p class="text-xs text-green-600 dark:text-green-400 mt-1">
                +12% vs ayer
            </p>
        </div>

        <!-- KPI 2: Total Ganado Este Mes -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Ganado Este Mes
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency($analyticsKPIs.totalMes)}
            </p>
            <p class="text-xs text-green-600 dark:text-green-400 mt-1">
                +8% vs mes anterior
            </p>
        </div>

        <!-- KPI 3: Producto Más Vendido -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Producto Más Vendido
            </p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">
                {$analyticsKPIs.productoMasVendido.nombre}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {$analyticsKPIs.productoMasVendido.cantidad} unidades
            </p>
        </div>

        <!-- KPI 4: Transacciones Hoy -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Transacciones Hoy
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {$analyticsKPIs.transaccionesHoy} ventas
            </p>
        </div>

        <!-- KPI 5: Ticket Promedio -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Ticket Promedio
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency($analyticsKPIs.ticketPromedio)}
            </p>
        </div>

        <!-- KPI 6: Salud del Negocio -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Salud del Negocio
            </p>
            <p class="text-lg font-bold text-green-600 dark:text-green-400">
                🟢 {$analyticsKPIs.saludNegocio.estado}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Ganancia neta: {$analyticsKPIs.saludNegocio.gananciaNeta}%
            </p>
        </div>

        <!-- KPI 7: Productos Menos Vendidos -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Productos Menos Vendidos
            </p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">
                {$analyticsKPIs.productoMenosVendido.nombre}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {$analyticsKPIs.productoMenosVendido.cantidad} unidades este mes
            </p>
        </div>

        <!-- KPI 8: Productos Sin Ganancia -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Productos Sin Ganancia
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {$analyticsKPIs.productosSinGanancia} productos
            </p>
            <button class="text-xs text-brand-orange hover:underline mt-1">
                [Ver listado]
            </button>
        </div>

        <!-- KPI 9: Comparativa Semanal -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Ventas Esta Semana
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency($analyticsKPIs.ventasSemana)}
            </p>
            <p class="text-xs text-green-600 dark:text-green-400 mt-1">
                +15% vs semana anterior
            </p>
        </div>

        <!-- KPI 10: Stock Crítico -->
        <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Stock Crítico
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {$analyticsKPIs.stockCritico} productos
            </p>
            <p class="text-xs text-red-600 dark:text-red-400 mt-1">
                Requieren atención
            </p>
        </div>
    </div>
</div>
