<script setup>
import { ref } from 'vue'

const spending = ref({
  dailyReminders: true,
  categoryAlerts: true,
  categoryThreshold: 80,
  overspending: true,
  lowBalance: true,
  lowBalanceThreshold: 50000
})

const ngn = (amount) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount)
</script>

<template>
  <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
    <!-- Daily reminders -->
    <div class="flex items-center justify-between gap-4 py-4 border-b border-[#eff0ed]">
      <div>
        <div class="text-[12px] font-bold text-gray-900">Daily spending reminders</div>
        <div class="text-[10px] text-gray-500 mt-1">
          Notify me when I'm approaching my daily safe-spend limit.
        </div>
      </div>
      <label class="relative inline-flex cursor-pointer">
        <input v-model="spending.dailyReminders" type="checkbox" class="sr-only peer" />
        <div
          class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
        ></div>
      </label>
    </div>

    <!-- Category alerts -->
    <div class="py-4 border-b border-[#eff0ed]">
      <div class="flex items-center justify-between gap-4">
        <div>
          <div class="text-[12px] font-bold text-gray-900">Category alerts</div>
          <div class="text-[10px] text-gray-500 mt-1">
            Alert me when a category reaches {{ spending.categoryThreshold }}%.
          </div>
        </div>
        <label class="relative inline-flex cursor-pointer">
          <input v-model="spending.categoryAlerts" type="checkbox" class="sr-only peer" />
          <div
            class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
          ></div>
        </label>
      </div>

      <div v-if="spending.categoryAlerts" class="mt-4">
        <input
          v-model.number="spending.categoryThreshold"
          type="range"
          min="50"
          max="100"
          step="5"
          class="w-full accent-[#168064]"
        />
        <div class="flex justify-between text-[10px] text-bvmuted mt-1">
          <span>50%</span>
          <strong class="text-bvgreen2">{{ spending.categoryThreshold }}%</strong>
          <span>100%</span>
        </div>
      </div>
    </div>

    <!-- Overspending -->
    <div class="flex items-center justify-between gap-4 py-4 border-b border-[#eff0ed]">
      <div>
        <div class="text-[12px] font-bold text-gray-900">Overspending alerts</div>
        <div class="text-[10px] text-gray-500 mt-1">Alert me when I exceed a budget category.</div>
      </div>
      <label class="relative inline-flex cursor-pointer">
        <input v-model="spending.overspending" type="checkbox" class="sr-only peer" />
        <div
          class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
        ></div>
      </label>
    </div>

    <!-- Low balance -->
    <div class="py-4">
      <div class="flex items-center justify-between gap-4">
        <div>
          <div class="text-[12px] font-bold text-gray-900">Low balance alerts</div>
          <div class="text-[10px] text-gray-500 mt-1">
            Alert me when my available balance drops below {{ ngn(spending.lowBalanceThreshold) }}.
          </div>
        </div>
        <label class="relative inline-flex cursor-pointer">
          <input v-model="spending.lowBalance" type="checkbox" class="sr-only peer" />
          <div
            class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
          ></div>
        </label>
      </div>

      <div v-if="spending.lowBalance" class="mt-4 max-w-[250px]">
        <label class="profile-label">Balance threshold</label>
        <input v-model.number="spending.lowBalanceThreshold" type="number" class="profile-input" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-label {
  @apply block text-[10px] font-bold text-gray-700 mb-1.5;
}
.profile-input {
  @apply w-full rounded-[10px] border border-gray-200 bg-white px-3 py-2.5 text-[11px] text-gray-900 outline-none transition;
  @apply focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10;
}
</style>
