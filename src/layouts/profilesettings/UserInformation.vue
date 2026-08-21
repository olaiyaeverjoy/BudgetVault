<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'Oladimeji Emmanuel',
  email: 'oladimeji@example.com',
  phone: '+234 801 234 5678',
  memberSince: 'May 2026',
  status: 'Account active'
})

const personal = ref({
  firstName: 'Oladimeji',
  lastName: 'Emmanuel',
  email: 'oladimeji@example.com',
  phone: '+234 801 234 5678',
  dob: '',
  country: 'Nigeria',
  currency: 'NGN — Nigerian Naira',
  timezone: 'Africa/Lagos'
})

const countryOptions = ['Nigeria', 'Ghana', 'United Kingdom', 'United States']
const currencyOptions = [
  'NGN — Nigerian Naira',
  'GHS — Ghanaian Cedi',
  'GBP — British Pound',
  'USD — US Dollar'
]
const tzOptions = ['Africa/Lagos', 'Africa/Accra', 'Europe/London', 'America/New_York']
</script>

<template>
  <div class="space-y-6">
    <!-- Overview Card -->
    <div class="relative overflow-hidden rounded-[20px] bg-[#17382e] text-white p-6">
      <div class="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-[#f4bf08]/10"></div>
      <div class="absolute right-10 bottom-[-80px] w-48 h-48 rounded-full bg-[#168064]/20"></div>

      <div class="relative flex flex-col sm:flex-row sm:items-center gap-5">
        <div
          class="w-[78px] h-[78px] shrink-0 rounded-full bg-[#f4bf08] text-[#17382e] grid place-items-center"
        >
          <span class="text-[22px] font-black">OE</span>
        </div>

        <div class="flex-1">
          <div class="text-[9px] uppercase tracking-[.16em] text-white/45 mb-1">
            Member since {{ user.memberSince }}
          </div>
          <h2 class="text-[22px] sm:text-[25px] font-bold">
            {{ user.name }}
          </h2>
          <div class="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-5 text-[11px] text-white/60">
            <span class="flex items-center gap-1.5">
              <i class="mdi mdi-email-outline"></i>
              {{ user.email }}
            </span>
            <span class="flex items-center gap-1.5">
              <i class="mdi mdi-phone-outline"></i>
              {{ user.phone }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:items-end gap-3">
          <span class="flex items-center gap-2 text-[10px] font-bold text-[#9bd6c4]">
            <span class="w-2 h-2 rounded-full bg-[#59c39a]"></span>
            {{ user.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Personal Information Form -->
    <div class="bg-white border border-bvline rounded-[18px] p-5 shadow-card">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="profile-label">First name</label>
          <input v-model="personal.firstName" type="text" class="profile-input" />
        </div>
        <div>
          <label class="profile-label">Last name</label>
          <input v-model="personal.lastName" type="text" class="profile-input" />
        </div>
        <div>
          <label class="profile-label">Email address</label>
          <input v-model="personal.email" type="email" class="profile-input" />
        </div>
        <div>
          <label class="profile-label">Phone number</label>
          <input v-model="personal.phone" type="tel" class="profile-input" />
        </div>
        <div>
          <label class="profile-label">Date of birth</label>
          <input v-model="personal.dob" type="date" class="profile-input" />
        </div>
        <div>
          <label class="profile-label">Country</label>
          <select v-model="personal.country" class="profile-input">
            <option v-for="country in countryOptions" :key="country">
              {{ country }}
            </option>
          </select>
        </div>
        <div>
          <label class="profile-label">Default currency</label>
          <select v-model="personal.currency" class="profile-input">
            <option v-for="currency in currencyOptions" :key="currency">
              {{ currency }}
            </option>
          </select>
        </div>
        <div>
          <label class="profile-label">Time zone</label>
          <select v-model="personal.timezone" class="profile-input">
            <option v-for="timezone in tzOptions" :key="timezone">
              {{ timezone }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-4 p-3 rounded-xl bg-[#f7faf8] text-[11px] text-bvmuted">
        Your currency and time zone determine how amounts, dates and budget cycles are displayed
        throughout Budget Vault.
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
