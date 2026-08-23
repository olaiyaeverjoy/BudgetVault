<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  budget: { type: Object, default: null }
})
const emit = defineEmits(['update:modelValue', 'confirm'])

function close() {
  emit('update:modelValue', false)
}
function confirm() {
  emit('confirm')
  close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue && budget"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      @click.self="close"
    >
      <div class="bg-white rounded-[14px] w-full max-w-md p-5 shadow-lg">
        <h3 class="text-[15px] font-extrabold mb-2">Delete "{{ budget.name }}"?</h3>
        <p class="text-[12.5px] text-bvmuted leading-relaxed mb-4">
          This permanently removes this budget, including its saved progress. If it was
          eligible for settlement, it will also disappear from Bill Settlement and the
          Dashboard's Settle Budget list, and it will not come back through the recurring
          cycle. This can't be undone.
        </p>

        <div class="flex flex-col sm:flex-row gap-2.5 justify-end">
          <button
            class="border border-bvline rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-[#eff0ed] transition"
            @click="close"
          >
            Cancel
          </button>
          <button
            class="border border-red-600 bg-red-600 text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-red-700 transition shadow-sm"
            @click="confirm"
          >
            Delete budget
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>