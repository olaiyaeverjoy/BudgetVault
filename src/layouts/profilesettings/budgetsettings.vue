<script setup>
import { ref } from 'vue'

const editingBudget = ref(false)

const budget = ref({
  monthly: 650000,
  cycleType: 'Monthly',
  renewDay: '1st',
  withdrawalWindow: '1-7',
  autoRenew: true
})

const ngn = (amount) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount)

const saveBudget = () => {
  editingBudget.value = false
}
</script>

<template>
  <div class="space-y-4">
    <!-- Budget amount -->
    <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="text-[9px] uppercase tracking-[.14em] font-extrabold text-bvmuted">
            Default budget
          </div>
          <div class="text-[28px] font-black text-bvgreen2 mt-1">
            {{ ngn(budget.monthly) }}
          </div>
          <div class="text-[11px] text-bvmuted mt-1">Your current monthly budgeting amount</div>
        </div>
        <button
          @click="editingBudget = !editingBudget"
          class="px-3.5 py-2 rounded-[10px] border border-bvline text-[11px] font-bold hover:bg-gray-50 transition"
        >
          {{ editingBudget ? 'Close editor' : 'Edit budget' }}
        </button>
      </div>

      <div v-if="editingBudget" class="mt-5 pt-5 border-t border-[#eff0ed]">
        <label class="profile-label">How much would you like to budget?</label>
        <div class="flex flex-col sm:flex-row gap-2">
          <input
            v-model.number="budget.monthly"
            type="number"
            min="0"
            class="profile-input max-w-sm"
          />
          <button
            @click="saveBudget"
            class="px-4 py-2.5 rounded-[10px] bg-[#17382e] text-white text-[11px] font-bold"
          >
            Save budget
          </button>
        </div>
      </div>
    </div>

    <!-- Budget cycle -->
    <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
      <div class="flex items-start gap-3 mb-5">
        <div class="w-9 h-9 rounded-xl bg-[#eaf5f0] text-bvgreen2 grid place-items-center">
          <i class="mdi mdi-calendar-refresh-outline"></i>
        </div>
        <div>
          <div class="font-bold text-[13px]">Budget cycle</div>
          <div class="text-[11px] text-bvmuted mt-0.5">
            Your budget renews automatically according to these settings.
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="profile-label">Budget frequency</label>
          <select v-model="budget.cycleType" class="profile-input">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Bi-weekly</option>
          </select>
        </div>
        <div>
          <label class="profile-label">Renewal date</label>
          <select v-model="budget.renewDay" class="profile-input">
            <option>1st</option>
            <option>7th</option>
            <option>15th</option>
            <option>Last day</option>
          </select>
        </div>
      </div>

      <div class="mt-5 pt-4 border-t border-[#eff0ed] flex items-center justify-between gap-4">
        <div>
          <div class="text-[12px] font-bold">Automatic budget renewal</div>
          <div class="text-[10.5px] text-bvmuted mt-0.5">
            Automatically create the next budget cycle.
          </div>
        </div>
        <label class="relative inline-flex cursor-pointer">
          <input v-model="budget.autoRenew" type="checkbox" class="sr-only peer" />
          <div
            class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
          ></div>
        </label>
      </div>
    </div>

    <!-- Withdrawal window -->
    <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
      <div class="text-[9px] uppercase tracking-[.14em] font-extrabold text-bvmuted mb-1">
        Budget withdrawal window
      </div>
      <p class="text-[11px] text-bvmuted mb-4">
        Choose when your budget can be withdrawn from your account after each monthly cycle begins.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <label
          v-for="window in [
            { value: '1-7', label: '1–7 days' },
            { value: '7-12', label: '7–12 days' },
            { value: 'custom', label: 'Custom' }
          ]"
          :key="window.value"
          class="cursor-pointer"
        >
          <input
            v-model="budget.withdrawalWindow"
            type="radio"
            :value="window.value"
            class="peer sr-only"
          />
          <div
            class="rounded-xl border border-bvline p-3 text-center text-[11px] font-bold peer-checked:border-[#168064] peer-checked:bg-[#edf8f3] peer-checked:text-[#168064] transition"
          >
            {{ window.label }}
          </div>
        </label>
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
