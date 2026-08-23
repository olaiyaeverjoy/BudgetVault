<script setup>
import { ref, computed, watch } from 'vue'
import ProgressTrack from '@/components/ProgressTrack.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  totalBudget: { type: Number, default: 0 }
})
const emit = defineEmits(['update:modelValue', 'create'])

const name = ref('')
const amount = ref(null)
const description = ref('')

const percent = computed(() => {
  if (!props.totalBudget || !amount.value) return 0
  return Math.min(100, Math.round((amount.value / props.totalBudget) * 100))
})

function close() {
  emit('update:modelValue', false)
}

function reset() {
  name.value = ''
  amount.value = null
  description.value = ''
}

watch(() => props.modelValue, (val) => {
  if (!val) reset()
})

function handleCreate() {
  if (!name.value || !amount.value) return
  emit('create', {
    name: name.value,
    amount: Number(amount.value),
    description: description.value
  })
  reset()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      @click.self="close"
    >
      <div class="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-[15px] font-bold text-[#17241f]">Add Budget</h3>
          <button type="button" @click="close" class="text-bvmuted hover:text-[#17241f] text-lg leading-none">&times;</button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-[11px] font-bold text-[#26352f]">Budget name</label>
            <input
              v-model="name"
              type="text"
              placeholder="e.g. Rent, Groceries"
              class="mt-1 w-full rounded-lg border border-bvline px-3 py-2 text-[12.5px] outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-[11px] font-bold text-[#26352f]">Fixed amount (₦)</label>
            <input
              v-model.number="amount"
              type="number"
              min="0"
              placeholder="0"
              class="mt-1 w-full rounded-lg border border-bvline px-3 py-2 text-[12.5px] outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-[11px] font-bold text-[#26352f]">Description</label>
            <textarea
              v-model="description"
              rows="2"
              placeholder="What is this budget for?"
              class="mt-1 w-full rounded-lg border border-bvline px-3 py-2 text-[12.5px] outline-none focus:border-emerald-500 resize-none"
            ></textarea>
          </div>

          <div>
            <div class="flex items-center justify-between text-[10.5px] text-bvmuted mb-1">
              <span>Share of total budget</span>
              <span class="font-bold text-[#26352f]">{{ percent }}%</span>
            </div>
            <ProgressTrack :percent="percent" height="6px" />
          </div>
        </div>

        <button
          type="button"
          :disabled="!name || !amount"
          @click="handleCreate"
          class="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Create budget
        </button>
      </div>
    </div>
  </Teleport>
</template>