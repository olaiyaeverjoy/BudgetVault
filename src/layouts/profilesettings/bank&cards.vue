<script setup>
import { ref } from 'vue'

const connectedAccounts = ref([
  {
    bank: 'Access Bank',
    last4: '1234',
    synced: '2 days ago',
    status: 'Connected'
  },
  {
    bank: 'GTBank',
    last4: '5678',
    synced: '1 week ago',
    status: 'Connected'
  }
])
</script>

<template>
  <div class="space-y-5">
    <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
      <!-- Connected accounts list -->
      <div
        v-for="(account, index) in connectedAccounts"
        :key="account.last4"
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        :class="index < connectedAccounts.length - 1 ? 'pb-5 mb-5 border-b border-[#eff0ed]' : ''"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#eaf5f0] grid place-items-center">
            <i class="mdi mdi-bank-outline text-bvgreen2 text-[19px]"></i>
          </div>
          <div>
            <div class="text-[12px] font-bold">
              {{ account.bank }}
            </div>
            <div class="text-[10px] text-bvmuted">
              •••• {{ account.last4 }} · Synced {{ account.synced }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-2 py-1 rounded-full bg-[#eaf6f0] text-bvgreen2 text-[9px] font-bold">
            {{ account.status }}
          </span>
          <button class="outline-button">Refresh</button>
          <button class="text-[10px] font-bold text-red-600">Disconnect</button>
        </div>
      </div>

      <!-- Connect button -->
      <button
        class="mt-5 px-4 py-2.5 rounded-[10px] bg-[#edf8f3] text-bvgreen2 text-[11px] font-bold"
      >
        + Connect account
      </button>

      <p class="text-[10px] text-bvmuted mt-4">
        Budget Vault does not store your banking credentials. Connections are handled through secure
        bank authorization.
      </p>
    </div>
  </div>
</template>

<style scoped>
.outline-button {
  @apply shrink-0 px-3 py-2 rounded-[9px] border border-gray-200 bg-white text-[10px] font-bold text-gray-700 transition;
  @apply hover:bg-gray-50 hover:border-gray-300;
}
</style>
