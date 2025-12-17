<script lang="ts">
    interface Props {
        total: number;
        onCerrar: () => void;
        onConfirmar: () => void;
    }

    let { total, onCerrar, onConfirmar }: Props = $props();

    let montoPagado = $state<number | string>("");
    let vuelto = $state(0);

    function calcularVuelto() {
        const monto =
            typeof montoPagado === "string"
                ? parseFloat(montoPagado)
                : montoPagado;
        if (!isNaN(monto) && monto > 0) {
            vuelto = monto - total;
        } else {
            vuelto = 0;
        }
    }

    function handleMontoPagadoInput(e: Event) {
        const input = e.target as HTMLInputElement;
        montoPagado = input.value;
        calcularVuelto();
    }

    function handleGenerarFactura() {
        window.open("/factura-ejemplo.pdf", "_blank");
        onConfirmar();
    }

    function formatPrecio(precio: number): string {
        return `$${precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
</script>

<!-- Overlay -->
<div
    class="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onclick={onCerrar}
    onkeydown={(e) => e.key === "Escape" && onCerrar()}
    role="button"
    tabindex="0"
    aria-label="Cerrar modal"
>
    <!-- Modal -->
    <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <h2
            class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
        >
            Procesando Pago
        </h2>

        <!-- Cantidad a cobrar -->
        <div class="mb-6">
            <label
                for="cantidad-cobrar"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                Cantidad a cobrar:
            </label>
            <div
                id="cantidad-cobrar"
                class="text-3xl font-bold text-gray-900 dark:text-white"
            >
                {formatPrecio(total)}
            </div>
        </div>

        <!-- Monto pagado -->
        <div class="mb-6">
            <label
                for="monto-pagado"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                Monto pagado:
            </label>
            <input
                id="monto-pagado"
                type="number"
                value={montoPagado}
                oninput={handleMontoPagadoInput}
                step="0.01"
                min="0"
                placeholder="0.00"
                class="w-full px-4 py-3 text-xl border border-gray-300 dark:border-gray-600 rounded-lg
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
               focus:ring-2 focus:ring-brand-lime focus:border-transparent"
            />
        </div>

        <!-- Vuelto -->
        <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label
                for="vuelto"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
                Vuelto:
            </label>
            <div
                id="vuelto"
                class="text-2xl font-bold"
                class:text-green-600={vuelto >= 0}
                class:text-red-600={vuelto < 0}
            >
                {formatPrecio(vuelto)}
            </div>
        </div>

        <!-- Botones -->
        <div class="flex gap-3">
            <button
                onclick={onCerrar}
                class="flex-1 px-4 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 font-medium transition-colors"
            >
                Cancelar
            </button>
            <button
                onclick={handleGenerarFactura}
                class="flex-1 px-4 py-3 bg-brand-lime text-white rounded-lg hover:bg-lime-600 font-bold transition-colors"
            >
                Generar Factura
            </button>
        </div>
    </div>
</div>
