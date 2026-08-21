<script setup>
import { ref, computed } from 'vue'

const vaults = ref([
  {
    name: 'Rent',
    amount: 100000,
    goal: 300000,
    icon: 'mdi-home-outline',
    color: '#168064',
    auto: true
  },
  {
    name: 'Emergency',
    amount: 85000,
    goal: 500000,
    icon: 'mdi-shield-check-outline',
    color: '#4f79ff',
    auto: true
  },
  {
    name: 'Travel',
    amount: 42000,
    goal: 200000,
    icon: 'mdi-airplane-outline',
    color: '#d28a22',
    auto: false
  }
])

const vaultAutomation = ref({
  autoCreateRecurring: true,
  notifications: true,
  contributionFrequency: 'Monthly'
})

const totalStored = computed(() => vaults.value.reduce((sum, vault) => sum + vault.amount, 0))
const totalGoal = computed(() => vaults.value.reduce((sum, vault) => sum + vault.goal, 0))
const vaultPct = computed(() => {
  if (!totalGoal.value) return 0
  return Math.min(100, Math.round((totalStored.value / totalGoal.value) * 100))
})

const ngn = (amount) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount)

const addVault = () => {
  // placeholder
}
</script>

<template>
  <div class="space-y-4">
    <!-- Overview cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="bg-white border border-bvline rounded-[18px] p-4 shadow-card">
        <div class="text-[9px] uppercase tracking-[.13em] text-bvmuted font-bold">Total stored</div>
        <div class="text-[20px] font-black text-bvgreen2 mt-1">{{ ngn(totalStored) }}</div>
        <div class="text-[10px] text-bvmuted mt-1">Across all vaults</div>
      </div>
      <div class="bg-white border border-bvline rounded-[18px] p-4 shadow-card">
        <div class="text-[9px] uppercase tracking-[.13em] text-bvmuted font-bold">Total target</div>
        <div class="text-[20px] font-black text-gray-900 mt-1">{{ ngn(totalGoal) }}</div>
        <div class="text-[10px] text-bvmuted mt-1">Current vault goals</div>
      </div>
      <div class="bg-[#17382e] text-white rounded-[18px] p-4 shadow-card">
        <div class="text-[9px] uppercase tracking-[.13em] text-white/45 font-bold">
          Overall progress
        </div>
        <div class="text-[20px] font-black mt-1">{{ vaultPct }}%</div>
        <div class="text-[10px] text-white/55 mt-1">Progress toward goals</div>
      </div>
    </div>

    <!-- Vault list -->
    <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-[14px] font-bold">Your vaults</h3>
          <p class="text-[10px] text-bvmuted mt-0.5">
            Each vault tracks progress toward a specific goal.
          </p>
        </div>
        <button
          @click="addVault"
          class="px-3 py-2 rounded-[10px] bg-[#17382e] text-white text-[10px] font-bold"
        >
          + Add vault
        </button>
      </div>

      <div
        v-for="(vault, index) in vaults"
        :key="vault.name"
        class="py-4"
        :class="index < vaults.length - 1 ? 'border-b border-[#eff0ed]' : ''"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl grid place-items-center shrink-0"
            :style="{ background: vault.color + '15' }"
          >
            <i class="mdi text-[19px]" :class="vault.icon" :style="{ color: vault.color }"></i>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex justify-between gap-3">
              <div>
                <div class="text-[12px] font-bold">{{ vault.name }}</div>
                <div class="text-[10px] text-bvmuted mt-0.5">
                  {{ ngn(vault.amount) }} of {{ ngn(vault.goal) }}
                </div>
              </div>
              <strong class="text-[11px]" :style="{ color: vault.color }">
                {{ Math.min(100, Math.round((vault.amount / vault.goal) * 100)) }}%
              </strong>
            </div>

            <div class="h-1.5 bg-[#edf1ef] rounded-full mt-2 overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :style="{
                  width: `${Math.min(100, (vault.amount / vault.goal) * 100)}%`,
                  background: vault.color
                }"
              ></div>
            </div>
          </div>

          <label class="relative inline-flex cursor-pointer shrink-0">
            <input v-model="vault.auto" type="checkbox" class="sr-only peer" />
            <div
              class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
            ></div>
          </label>
        </div>
      </div>

      <div class="mt-4 p-3 rounded-xl bg-[#f7faf8] flex gap-3">
        <i class="mdi mdi-information-outline text-bvgreen2"></i>
        <p class="text-[10px] text-bvmuted">
          Auto-contribution moves your selected amount into a vault according to your chosen
          contribution schedule.
        </p>
      </div>
    </div>

    <!-- Automation -->
    <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
      <div class="text-[9px] uppercase tracking-[.14em] font-extrabold text-bvmuted mb-3">
        Vault automation
      </div>

      <div class="flex items-center justify-between gap-4 py-4 border-b border-[#eff0ed]">
        <div>
          <div class="text-[12px] font-bold text-gray-900">Auto-create recurring vaults</div>
          <div class="text-[10px] text-gray-500 mt-1">
            Automatically create recurring vault goals.
          </div>
        </div>
        <label class="relative inline-flex cursor-pointer">
          <input
            v-model="vaultAutomation.autoCreateRecurring"
            type="checkbox"
            class="sr-only peer"
          />
          <div
            class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
          ></div>
        </label>
      </div>

      <div class="flex items-center justify-between gap-4 py-4 border-b border-[#eff0ed]">
        <div>
          <div class="text-[12px] font-bold text-gray-900">Vault notifications</div>
          <div class="text-[10px] text-gray-500 mt-1">
            Notify me about contributions and goal progress.
          </div>
        </div>
        <label class="relative inline-flex cursor-pointer">
          <input v-model="vaultAutomation.notifications" type="checkbox" class="sr-only peer" />
          <div
            class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
          ></div>
        </label>
      </div>

      <div class="pt-4">
        <label class="profile-label">Contribution frequency</label>
        <select v-model="vaultAutomation.contributionFrequency" class="profile-input max-w-xs">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Quarterly</option>
        </select>
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
