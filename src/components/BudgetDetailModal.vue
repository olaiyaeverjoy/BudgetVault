<script setup>
import { ref, computed, watch } from 'vue'
import ProgressTrack from '@/components/ProgressTrack.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  budget: { type: Object, default: null }
})
const emit = defineEmits(['update:modelValue', 'add-money'])

const addAmount = ref(null)

// Safe fallbacks — never read props.budget.xxx directly in the template
const savedAmount = computed(() => Number(props.budget?.moneyAdded || 0))
const targetAmount = computed(() => Number(props.budget?.amount || 0))

const percent = computed(() => {
  if (!targetAmount.value) return 0
  return Math.min(100, Math.round((savedAmount.value / targetAmount.value) * 100))
})

function close() {
  emit('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
  if (!val) addAmount.value = null
})

function handleAddMoney() {
  if (!addAmount.value || !props.budget) return
  emit('add-money', props.budget.id, Number(addAmount.value))
  addAmount.value = null
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue && budget"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      @click.self="close"
    >
      <div class="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <div class="flex items-center justify-between mb-1">
          <h3 class="text-[15px] font-bold text-[#17241f]">{{ budget.name }}</h3>
          <button type="button" @click="close" class="text-bvmuted hover:text-[#17241f] text-lg leading-none">&times;</button>
        </div>

        <p v-if="budget.description" class="text-[11px] text-bvmuted mb-4">{{ budget.description }}</p>

        <div class="flex items-baseline justify-between mb-1">
          <span class="text-[11px] text-bvmuted">Saved</span>
          <span class="text-[13px] font-extrabold text-[#17241f]">
            ₦{{ savedAmount.toLocaleString() }}
            <span class="text-bvmuted font-normal">/ ₦{{ targetAmount.toLocaleString() }}</span>
          </span>
        </div>

        <ProgressTrack :percent="percent" height="8px" />
        <div class="text-right text-[10.5px] font-bold text-bvgreen2 mt-1">{{ percent }}% complete</div>

        <div class="mt-4">
          <label class="text-[11px] font-bold text-[#26352f]">Add money (₦)</label>
          <div class="mt-1 flex gap-2">
            <input
              v-model.number="addAmount"
              type="number"
              min="0"
              placeholder="0"
              class="w-full rounded-lg border border-bvline px-3 py-2 text-[12.5px] outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              :disabled="!addAmount"
              @click="handleAddMoney"
              class="shrink-0 rounded-lg bg-emerald-600 px-3 py-2 text-[12px] font-bold text-white transition hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add money
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>