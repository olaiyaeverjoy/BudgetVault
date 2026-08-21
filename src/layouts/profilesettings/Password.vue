<script setup>
import { ref } from 'vue'

const security = ref({
  passwordLastChanged: 24,
  twoFA: true,
  sessions: [
    { device: 'Chrome on Windows', location: 'Lagos', current: true },
    { device: 'Mobile app', location: 'Lagos', current: false }
  ]
})
</script>

<template>
  <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
    <!-- Password -->
    <div class="flex items-center justify-between gap-4 py-4 border-b border-[#eff0ed]">
      <div>
        <div class="text-[12px] font-bold text-gray-900">Password</div>
        <div class="text-[10px] text-gray-500 mt-1">
          Last changed {{ security.passwordLastChanged }} days ago.
        </div>
      </div>
      <button class="outline-button">Change password</button>
    </div>

    <!-- 2FA -->
    <div class="flex items-center justify-between gap-4 py-4 border-b border-[#eff0ed]">
      <div>
        <div class="text-[12px] font-bold text-gray-900">Two-factor authentication</div>
        <div class="text-[10px] text-gray-500 mt-1">
          Add an additional layer of protection to your account.
        </div>
      </div>
      <label class="relative inline-flex cursor-pointer">
        <input v-model="security.twoFA" type="checkbox" class="sr-only peer" />
        <div
          class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
        ></div>
      </label>
    </div>

    <!-- Active sessions -->
    <div class="pt-4">
      <div class="flex items-center justify-between mb-3">
        <div>
          <div class="text-[12px] font-bold text-gray-900">Active sessions</div>
          <div class="text-[10px] text-gray-500 mt-0.5">
            Devices currently signed into your account.
          </div>
        </div>
        <button class="text-[10px] font-bold text-red-600">Sign out all</button>
      </div>

      <div
        v-for="session in security.sessions"
        :key="session.device"
        class="flex items-center justify-between py-3 border-t border-[#eff0ed]"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#f4f6f4] grid place-items-center">
            <i class="mdi mdi-devices text-bvmuted"></i>
          </div>
          <div>
            <div class="text-[11px] font-bold">{{ session.device }}</div>
            <div class="text-[9px] text-bvmuted">{{ session.location }}</div>
          </div>
          <span
            v-if="session.current"
            class="text-[8px] px-2 py-1 rounded-full bg-[#eaf6f0] text-bvgreen2 font-bold"
          >
            This device
          </span>
        </div>
        <button class="text-[10px] font-bold text-bvmuted">Manage</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outline-button {
  @apply shrink-0 px-3 py-2 rounded-[9px] border border-gray-200 bg-white text-[10px] font-bold text-gray-700 transition;
  @apply hover:bg-gray-50 hover:border-gray-300;
}
</style>
