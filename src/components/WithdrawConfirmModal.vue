<script setup>
import { useBudgetStore } from '@/stores/budgets'

defineProps({
  modelValue: { type: Boolean, default: false },
  budget: { type: Object, default: null },
  amount: { type: Number, default: 0 }
})
const emit = defineEmits(['update:modelValue', 'confirm'])

const store = useBudgetStore()

function close() {
  emit('update:modelValue', false)
}
function proceed() {
  emit('confirm')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue && budget"
      class="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4"
      @click.self="close"
    >
      <div class="bg-white rounded-[14px] w-full max-w-md p-5 shadow-lg">
        <h3 class="text-[15px] font-extrabold mb-2">Confirm withdrawal</h3>
        <p class="text-[12.5px] text-bvmuted leading-relaxed mb-4">
          You are about to withdraw
          <strong class="text-[#17241f]">{{ store.formatNaira(amount) }}</strong>
          from "<strong class="text-[#17241f]">{{ budget.name }}</strong>". This amount
          will be deducted from the budget's saved balance and cannot be undone.
        </p>

        <div class="flex flex-col sm:flex-row gap-2.5 justify-end">
          <button
            class="border border-bvline rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-[#eff0ed] transition"
            @click="close"
          >
            Cancel
          </button>
          <button
            class="border border-bvgold bg-gold text-[#17382e] rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:brightness-95 transition shadow-sm"
            @click="proceed"
          >
            Proceed to Withdraw
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>