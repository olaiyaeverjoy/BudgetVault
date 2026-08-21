<script setup>
import { ref } from 'vue'

const aiCoach = ref({
  style: 'Balanced',
  frequency: 'Weekly',
  focus: {
    spending: true,
    saving: true,
    budgeting: true,
    debt: false,
    vaultGoals: true,
    investing: false
  }
})
</script>

<template>
  <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card space-y-6">
    <!-- Coaching style -->
    <div>
      <div class="text-[12px] font-bold text-gray-900 mb-3">Coaching style</div>
      <div class="grid grid-cols-3 gap-2">
        <label
          v-for="style in ['Gentle', 'Balanced', 'Direct']"
          :key="style"
          class="cursor-pointer"
        >
          <input v-model="aiCoach.style" type="radio" :value="style" class="peer sr-only" />
          <div
            class="text-center border border-bvline rounded-xl py-3 text-[10px] font-bold peer-checked:border-[#168064] peer-checked:bg-[#edf8f3] peer-checked:text-[#168064]"
          >
            {{ style }}
          </div>
        </label>
      </div>
    </div>

    <!-- Focus areas -->
    <div>
      <div class="text-[12px] font-bold text-gray-900 mb-3">What should your coach focus on?</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <label
          v-for="(enabled, key) in aiCoach.focus"
          :key="key"
          class="flex items-center gap-2 border border-bvline rounded-xl p-3 cursor-pointer"
        >
          <input v-model="aiCoach.focus[key]" type="checkbox" class="accent-[#168064]" />
          <span class="text-[10px] capitalize">
            {{ key.replace(/([A-Z])/g, ' $1') }}
          </span>
        </label>
      </div>
    </div>

    <!-- Frequency -->
    <div>
      <div class="text-[12px] font-bold text-gray-900 mb-3">Coaching frequency</div>
      <select v-model="aiCoach.frequency" class="profile-input max-w-xs">
        <option>Daily</option>
        <option>Weekly</option>
        <option>Monthly</option>
        <option>Only when something needs attention</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.profile-input {
  @apply w-full rounded-[10px] border border-gray-200 bg-white px-3 py-2.5 text-[11px] text-gray-900 outline-none transition;
  @apply focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10;
}
</style>
