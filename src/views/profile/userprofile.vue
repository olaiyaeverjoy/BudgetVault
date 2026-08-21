<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

// Settings components – make sure the actual filenames match these imports
import UserInformation from '@/layouts/profilesettings/UserInformation.vue'
import Privacy from '@/layouts/profilesettings/privacy.vue'
import PersonalitySettings from '@/layouts/profilesettings/PersonalitySettings.vue'
import Password from '@/layouts/profilesettings/Password.vue'
import Notifications from '@/layouts/profilesettings/Notifications.vue'
import BankCards from '@/layouts/profilesettings/bank&cards.vue'
import BudgetSettings from '@/layouts/profilesettings/budgetsettings.vue'
import AiCoach from '@/layouts/profilesettings/AiCoach.vue'
import VaultSettings from '@/layouts/profilesettings/VaultSettings.vue'
import SpendingSettings from '@/layouts/profilesettings/SpendingSettings.vue'
import Pricing from '@/layouts/profilesettings/Pricing.vue'

const activeSetting = ref(null)

const settingsItems = [
  {
    id: 'user',
    label: 'User Information',
    icon: 'mdi-account-outline',
    description: 'Manage your personal information.'
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: 'mdi-lock-outline',
    description: 'Control your privacy and data preferences.'
  },
  {
    id: 'personality',
    label: 'Money Personality',
    icon: 'mdi-account-star-outline',
    description: 'Understand your financial personality.'
  },
  {
    id: 'password',
    label: 'Password & Security',
    icon: 'mdi-lock-reset',
    description: 'Update your account password and security.'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'mdi-bell-outline',
    description: 'Manage your notification preferences.'
  },
  {
    id: 'bank',
    label: 'Bank & Cards',
    icon: 'mdi-bank-outline',
    description: 'Manage your connected accounts and cards.'
  },
  {
    id: 'budget',
    label: 'Budget Settings',
    icon: 'mdi-wallet-outline',
    description: 'Configure your budgeting preferences.'
  },
  {
    id: 'coach',
    label: 'AI Coach',
    icon: 'mdi-robot-outline',
    description: 'Personalise your financial AI coach.'
  },
  {
    id: 'vault',
    label: 'Vault Settings',
    icon: 'mdi-safe-square-outline',
    description: 'Manage your Smart Vault preferences.'
  },
  {
    id: 'spending',
    label: 'Spending Settings',
    icon: 'mdi-chart-donut',
    description: 'Configure your spending preferences.'
  },
  {
    id: 'pricing',
    label: 'Subscription',
    icon: 'mdi-credit-card-outline',
    description: 'View your plan and pricing options.'
  }
]

// Map id → component (this is the safe way)
const componentMap = {
  user: UserInformation,
  privacy: Privacy,
  personality: PersonalitySettings,
  password: Password,
  notifications: Notifications,
  bank: BankCards,
  budget: BudgetSettings,
  coach: AiCoach,
  vault: VaultSettings,
  spending: SpendingSettings,
  pricing: Pricing
}

const currentComponent = computed(() => {
  return activeSetting.value ? componentMap[activeSetting.value.id] : null
})

const openSetting = (item) => {
  activeSetting.value = item
}

const closeSetting = () => {
  activeSetting.value = null
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-[#f7f8f6]">
      <main class="flex-1">
        <div class="max-w-[1050px] mx-auto px-4 sm:px-6 lg:px-10 py-7 lg:py-10">
          <!-- PAGE HEADER -->
          <div class="mb-8">
            <div class="text-[10px] uppercase tracking-[.16em] font-extrabold text-bvgreen2 mb-2">
              Account settings
            </div>

            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 class="text-[28px] sm:text-[32px] font-bold tracking-tight text-gray-900">
                  General settings
                </h1>
                <p class="text-[13px] text-bvmuted mt-1 max-w-xl">
                  Manage your personal details, budget behaviour, vaults, notifications and
                  financial preferences.
                </p>
              </div>

              <button
                class="px-4 py-2.5 rounded-[11px] bg-[#17382e] text-white text-[12px] font-bold hover:bg-[#215344] transition"
              >
                Save changes
              </button>
            </div>
          </div>

          <!-- SETTINGS LIST -->
          <div
            class="bg-white border border-bvline rounded-[18px] shadow-card overflow-hidden mb-8"
          >
            <button
              v-for="item in settingsItems"
              :key="item.id"
              type="button"
              @click="openSetting(item)"
              class="group flex w-full items-center gap-3 border-b border-gray-100 px-5 py-3.5 text-left transition-all duration-200 last:border-b-0 hover:bg-[#FFF9E6]"
            >
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF3C4] text-[#D4A72C] transition-all duration-200 group-hover:bg-[#D4A72C] group-hover:text-white"
              >
                <i :class="['mdi', item.icon, 'text-[18px]']"></i>
              </span>

              <span class="flex-1">
                <span
                  class="block text-[12px] font-semibold text-gray-700 group-hover:text-[#D4A72C] transition-colors"
                >
                  {{ item.label }}
                </span>
                <span class="block text-[10px] text-gray-400 mt-0.5">
                  {{ item.description }}
                </span>
              </span>

              <i
                class="mdi mdi-chevron-right text-[18px] text-gray-300 group-hover:translate-x-1 group-hover:text-[#D4A72C] transition-all"
              ></i>
            </button>
          </div>

          <!-- ========== SAFE MODAL ========== -->
          <Teleport to="body">
            <transition name="modal">
              <div
                v-if="activeSetting"
                key="settings-modal"
                class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
                @click.self="closeSetting"
              >
                <div
                  class="relative w-full max-w-[560px] max-h-[85vh] overflow-y-auto rounded-[22px] border border-gray-200 bg-white shadow-2xl"
                  @click.stop
                >
                  <!-- Header -->
                  <div
                    class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3C4] text-[#D4A72C]"
                      >
                        <i :class="['mdi', activeSetting.icon, 'text-[20px]']"></i>
                      </div>
                      <div>
                        <h2 class="text-[15px] font-bold text-gray-900">
                          {{ activeSetting.label }}
                        </h2>
                        <p class="text-[10px] text-gray-500">
                          {{ activeSetting.description }}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      @click="closeSetting"
                      class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                    >
                      <i class="mdi mdi-close text-[20px]"></i>
                    </button>
                  </div>

                  <!-- Content – single dynamic component with key -->
                  <div class="p-5">
                    <component :is="currentComponent" :key="activeSetting.id" />
                  </div>
                </div>
              </div>
            </transition>
          </Teleport>

          <!-- DANGER ZONE -->
          <section class="mb-16">
            <div class="bg-red-50 border border-red-200 rounded-[18px] p-5 sm:p-6">
              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-red-200"
              >
                <div>
                  <div class="text-[12px] font-bold">Export account data</div>
                  <div class="text-[10px] text-gray-500 mt-1">
                    Download a copy of your Budget Vault information.
                  </div>
                </div>
                <button
                  class="px-3.5 py-2 rounded-[10px] border border-red-200 text-red-600 text-[10px] font-bold bg-white"
                >
                  Export
                </button>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5">
                <div>
                  <div class="text-[12px] font-bold text-red-600">Delete account</div>
                  <div class="text-[10px] text-gray-500 mt-1">
                    Permanently delete your account and financial data.
                  </div>
                </div>
                <button
                  class="px-3.5 py-2 rounded-[10px] bg-red-600 text-white text-[10px] font-bold"
                >
                  Delete account
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </MainLayout>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
