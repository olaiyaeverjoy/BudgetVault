<script setup>
import ProgressTrack from '@/components/ProgressTrack.vue'
import { useBudgetStore } from '@/stores/budgets'

const props = defineProps({
  budget: { type: Object, required: true },
  showDelete: { type: Boolean, default: false }
})
defineEmits(['select', 'delete'])

const store = useBudgetStore()
</script>

<template>
  <div class="flex items-center gap-1.5">
    <button
      type="button"
      @click="$emit('select', budget)"
      class="min-w-0 flex-1 flex items-center justify-between gap-3 py-3.5 text-left transition hover:bg-[#fafcfb] rounded-lg px-1 -mx-1"
    >
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <span class="text-[12.5px] font-bold text-[#26352f] truncate">
            {{ budget.name }}
          </span>
          <span
            v-if="store.isEligible(budget)"
            class="shrink-0 text-[9.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5"
          >
            Ready to settle
          </span>
        </div>
        <p v-if="budget.description" class="mt-0.5 text-[10.5px] text-bvmuted truncate">
          {{ budget.description }}
        </p>
      </div>

      <div class="w-[110px] xs:w-[130px] sm:w-[150px] shrink-0 text-right">
        <div class="flex items-baseline justify-end gap-1">
          <b class="text-[12px] text-[#26352f]">{{ store.formatNaira(budget.moneyAdded) }}</b>
          <span class="text-[9.5px] text-bvmuted">/ {{ store.formatNaira(budget.amount) }}</span>
        </div>
        <div class="mt-1.5">
          <ProgressTrack :percent="store.progress(budget)" height="5px" />
        </div>
      </div>
    </button>

    <button
      v-if="showDelete"
      type="button"
      @click.stop="$emit('delete', budget)"
      class="shrink-0 grid h-8 w-8 place-items-center rounded-lg text-bvmuted transition hover:bg-red-50 hover:text-red-600"
      title="Delete budget"
    >
      <i class="mdi mdi-delete-outline text-[17px]"></i>
    </button>
  </div>
</template>