<script setup>
import { ref } from 'vue'

const subscription = ref({
  plan: 'Free',
  nextBilling: '—',
  price: '₦0 / month'
})
</script>

<template>
  <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="text-[9px] uppercase tracking-[.14em] font-extrabold text-bvmuted">
          Current plan
        </div>
        <div class="text-[21px] font-black text-bvgreen2 mt-1">
          {{ subscription.plan }}
        </div>
        <div class="text-[10px] text-bvmuted mt-1">
          {{ subscription.price }} · Next billing {{ subscription.nextBilling }}
        </div>
      </div>
      <button class="outline-button">Manage plan</button>
    </div>
  </div>
</template>

<style scoped>
.outline-button {
  @apply shrink-0 px-3 py-2 rounded-[9px] border border-gray-200 bg-white text-[10px] font-bold text-gray-700 transition;
  @apply hover:bg-gray-50 hover:border-gray-300;
}
</style>
