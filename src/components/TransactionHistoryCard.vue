<script setup>
defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filter'])
</script>

<template>
  <div class="w-full rounded-[15px] border border-[#edf0ee] bg-white p-[15px] shadow-sm">
    <div class="flex items-center justify-between">
      <h2 class="text-[15px] font-bold text-gray-900">Transaction History</h2>

      <button
        type="button"
        @click="emit('filter')"
        class="rounded-[10px] bg-[#111827] px-[12px] py-[8px] text-[11px] font-bold text-white hover:opacity-90"
      >
        Filter
      </button>
    </div>

    <div v-if="transactions.length" class="mt-3 divide-y divide-[#eff0ed]">
      <div
        v-for="tx in transactions"
        :key="tx.id"
        class="flex items-center justify-between gap-4 px-2 py-3 transition hover:bg-[#fafcfb]"
      >
        <div class="flex min-w-0 items-center gap-3">
          <div class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#f1f5f3] text-[15px]">
            {{ tx.icon }}
          </div>
          <div class="min-w-0">
            <strong class="block text-[11px]">{{ tx.name }}</strong>
            <small class="text-[10px] text-bvmuted">{{ tx.subtitle }}</small>
          </div>
        </div>

        <b
          class="shrink-0 text-[11px]"
          :class="tx.amount < 0 ? 'text-[#bd5d18]' : 'text-[#188064]'"
        >
          {{ tx.amount < 0 ? '−' : '+' }}₦{{ Math.abs(tx.amount).toLocaleString() }}
        </b>
      </div>
    </div>

    <div v-else class="flex min-h-[140px] items-center justify-center">
      <div class="text-center">
        <div class="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-lg"></div>
        <p class="text-[13px] font-semibold text-gray-700">No history yet</p>
        <p class="mt-1 text-[11px] text-gray-400">start using BudgetVault to see transaction history</p>
      </div>
    </div>
  </div>
</template>