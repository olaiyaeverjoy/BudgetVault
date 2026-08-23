<script setup>
import BudgetListItem from '@/components/BudgetListItem.vue'
import { useBudgetStore } from '@/stores/budgets'

defineProps({
  modelValue: { type: Boolean, default: false },
  showDelete: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'select', 'add-budget', 'delete'])

const store = useBudgetStore()

function close() {
  emit('update:modelValue', false)
}
function handleSelect(budget) {
  emit('select', budget)
  close()
}
function handleDelete(budget) {
  emit('delete', budget)
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      @click.self="close"
    >
      <div
        class="flex w-[calc(100%-1.5rem)] max-h-[85vh] max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl
               sm:w-[calc(100%-2rem)] sm:max-w-lg md:max-w-xl"
      >
        <div class="flex shrink-0 items-center justify-between border-b border-[#eff0ed] px-5 pb-3 pt-5">
          <div>
            <h3 class="text-[15px] font-bold text-[#17241f]">All budgets</h3>
            <p class="mt-0.5 text-[10.5px] text-bvmuted">
              {{ store.budgets.length }} budget{{ store.budgets.length === 1 ? '' : 's' }} total
            </p>
          </div>
          <button type="button" @click="close" class="text-lg leading-none text-bvmuted hover:text-[#17241f]">
            &times;
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-5">
          <div v-if="store.budgets.length" class="divide-y divide-[#eff0ed]">
            <BudgetListItem
              v-for="b in store.budgets"
              :key="b.id"
              :budget="b"
              :show-delete="showDelete"
              @select="handleSelect"
              @delete="handleDelete"
            />
          </div>

          <div v-else class="py-10 text-center">
            <div class="text-[12px] font-bold text-[#26352f]">No budgets yet</div>
            <p class="mt-1 text-[10px] leading-4 text-bvmuted">
              Create your first budget to see it here.
            </p>
          </div>
        </div>

        <div class="shrink-0 border-t border-[#eff0ed] px-5 py-4">
          <button
            type="button"
            @click="emit('add-budget')"
            class="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Add budget
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>