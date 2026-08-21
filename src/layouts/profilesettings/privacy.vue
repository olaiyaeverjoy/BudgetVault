<script setup>
// no reactive data needed for now
</script>

<template>
  <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
    <div
      v-for="(item, index) in [
        ['Privacy settings', 'Manage account privacy controls.'],
        ['Data sharing', 'Control how your information is used.'],
        ['Download my data', 'Download a copy of your Budget Vault data.'],
        ['Export transactions', 'Export your transaction history.']
      ]"
      :key="item[0]"
      class="flex items-center justify-between gap-4 py-4"
      :class="index < 3 ? 'border-b border-[#eff0ed]' : ''"
    >
      <div>
        <div class="text-[12px] font-bold text-gray-900">
          {{ item[0] }}
        </div>
        <div class="text-[10px] text-gray-500 mt-1 leading-relaxed">
          {{ item[1] }}
        </div>
      </div>

      <button class="outline-button">
        {{ item[0].includes('Download') || item[0].includes('Export') ? 'Export' : 'Open' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.outline-button {
  @apply shrink-0 px-3 py-2 rounded-[9px] border border-gray-200 bg-white text-[10px] font-bold text-gray-700 transition;
  @apply hover:bg-gray-50 hover:border-gray-300;
}
</style>
