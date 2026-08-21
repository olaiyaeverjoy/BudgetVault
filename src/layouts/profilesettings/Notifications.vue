<script setup>
import { ref } from 'vue'

const notifications = ref({
  budgetCycle: true,
  vaultProgress: true,
  spendingAlerts: true,
  aiCoach: true
})
</script>

<template>
  <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
    <div
      v-for="(item, index) in [
        {
          key: 'budgetCycle',
          title: 'Budget cycle reminders',
          desc: 'Remind me when a new budget cycle is about to begin.'
        },
        {
          key: 'vaultProgress',
          title: 'Vault progress',
          desc: 'Notify me when I reach important vault milestones.'
        },
        {
          key: 'spendingAlerts',
          title: 'Spending alerts',
          desc: 'Notify me when my spending needs attention.'
        },
        {
          key: 'aiCoach',
          title: 'AI Coach insights',
          desc: 'Send useful financial insights and recommendations.'
        }
      ]"
      :key="item.key"
      class="flex items-center justify-between gap-4 py-4"
      :class="index < 3 ? 'border-b border-[#eff0ed]' : ''"
    >
      <div>
        <div class="text-[12px] font-bold text-gray-900">{{ item.title }}</div>
        <div class="text-[10px] text-gray-500 mt-1 leading-relaxed">{{ item.desc }}</div>
      </div>

      <label class="relative inline-flex cursor-pointer">
        <input v-model="notifications[item.key]" type="checkbox" class="sr-only peer" />
        <div
          class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
        ></div>
      </label>
    </div>
  </div>
</template>
