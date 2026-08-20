<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/authStore'

// ===== Layout =====
const { mdAndUp } = useDisplay()
const route = useRoute()
const router = useRouter()
const drawer = ref(false)
const supportOpen = ref(false)

onMounted(() => {
  drawer.value = mdAndUp.value
})

watch(mdAndUp, (val) => {
  drawer.value = val
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

// ===== Year-End data =====
const bars = [42, 48, 53, 61, 58, 66, 72, 69, 78, 83, 88, 94]
const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

// ===== Sidebar Logic =====
const authStore = useAuthStore()

const menuItems1 = [
  { nav: 'overview', label: 'Dashboard', icon: 'mdi mdi-view-dashboard-outline', to: '/dashboard' },
  { nav: 'overview', label: 'Banks & cards', icon: 'mdi mdi-view-dashboard-outline', to: '/banks&cards' },
]

const menuItems2 = [
  { nav: 'overview', label: 'smart vaults', icon: 'mdi mdi-view-dashboard-outline', to: '/smartvaults' },
  { nav: 'overview', label: 'Budget planner', icon: 'mdi mdi-view-dashboard-outline', to: '/budgetplanner' },
  { nav: 'overview', label: 'Expense Tracker', icon: 'mdi mdi-view-dashboard-outline', to: '/expensetracking' },
  { nav: 'overview', label: 'Bill settlement', icon: 'mdi mdi-view-dashboard-outline', to: '/billsettlement' },
  { nav: 'overview', label: 'Goals & Dreams', icon: 'mdi mdi-view-dashboard-outline', to: '/goals&dreams' },
]

const menuItems3 = [
  { nav: 'overview', label: 'notification', icon: 'mdi mdi-view-dashboard-outline', to: '/notifications' },
  { nav: 'overview', label: 'moneey calender', icon: 'mdi mdi-view-dashboard-outline', to: '/moneycalender' },
  { nav: 'overview', label: 'financial Gps', icon: 'mdi mdi-view-dashboard-outline', to: '/financialgps' },
  { nav: 'overview', label: 'subscriptions', icon: 'mdi mdi-view-dashboard-outline', to: '/subscriptions' },
  { nav: 'overview', label: 'money personality', icon: 'mdi mdi-view-dashboard-outline', to: '/moneypersonality' },
  { nav: 'overview', label: 'Ai coach', icon: 'mdi mdi-view-dashboard-outline', to: '/aicoach' },
  { nav: 'overview', label: 'year-end review', icon: 'mdi mdi-view-dashboard-outline', to: '/yearendreview' },
]

const menuItems4 = [
  { nav: 'overview', label: 'couple vault', icon: 'mdi mdi-view-dashboard-outline', to: '/couple' },
  { nav: 'overview', label: 'Business', icon: 'mdi mdi-view-dashboard-outline', to: '/business' },
  { nav: 'overview', label: 'student', icon: 'mdi mdi-view-dashboard-outline', to: '/students' },
]

const accountItems = [
  { nav: 'support', label: 'Support', icon: 'mdi mdi-help-circle-outline' },
]

const isActive = (item: any) => {
  if (item.to) {
    return route.path === item.to || route.path.startsWith(item.to + '/')
  }
  return false
}

const navigateTo = (item: any) => {
  if (item.nav === 'support') {
    supportOpen.value = !supportOpen.value
    return
  }
  if (item.to) {
    router.push(item.to)
  }
}

const signOut = async () => {
  try {
    await authStore.logout()
    router.push({ name: 'login' })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <v-app class="!bg-[#f7f5f0]">
    <!-- ========== TOP BAR ========== -->
    <v-app-bar
      app
      elevation="0"
      height="64"
      class="!bg-[#f7f5f0] px-3 sm:px-4 border-b border-gray-200/80 !shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <v-app-bar-nav-icon
        class="!flex md:!hidden mr-1"
        @click="toggleDrawer"
      />
      <div class="text-lg font-semibold text-[#074033]">
        BudgetVault
      </div>
    </v-app-bar>

    <!-- ========== SIDEBAR ========== -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="mdAndUp"
      :temporary="!mdAndUp"
      :width="280"
      class="!bg-[#074033]"
    >
      <div class="w-full p-[18px_18px_20px] bg-[#074033] max-h-screen overflow-y-auto scrollbar-thin">
        <ul class="list-none p-0 m-0">

          <li
            v-for="item in menuItems1"
            :key="item.nav + item.label"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl cursor-pointer text-sm font-medium select-none transition-all duration-200',
              isActive(item)
                ? 'bg-white/15 text-white font-semibold'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
            @click="navigateTo(item)"
          >
            <span
              :class="[
                'w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg leading-none transition-all duration-200',
                isActive(item) ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
              ]"
            >
              <i :class="item.icon"></i>
            </span>
            <span>{{ item.label }}</span>
          </li>

          <p class="mt-5 mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Plan & Track
          </p>

          <li
            v-for="item in menuItems2"
            :key="item.nav + item.label"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl cursor-pointer text-sm font-medium select-none transition-all duration-200',
              isActive(item)
                ? 'bg-white/15 text-white font-semibold'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
            @click="navigateTo(item)"
          >
            <span
              :class="[
                'w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg leading-none transition-all duration-200',
                isActive(item) ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
              ]"
            >
              <i :class="item.icon"></i>
            </span>
            <span>{{ item.label }}</span>
          </li>

          <p class="mt-5 mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Intelligence
          </p>

          <li
            v-for="item in menuItems3"
            :key="item.nav + item.label"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl cursor-pointer text-sm font-medium select-none transition-all duration-200',
              isActive(item)
                ? 'bg-white/15 text-white font-semibold'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
            @click="navigateTo(item)"
          >
            <span
              :class="[
                'w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg leading-none transition-all duration-200',
                isActive(item) ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
              ]"
            >
              <i :class="item.icon"></i>
            </span>
            <span>{{ item.label }}</span>
          </li>

          <p class="mt-5 mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Collaborations
          </p>

          <li
            v-for="item in menuItems4"
            :key="item.nav + item.label"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl cursor-pointer text-sm font-medium select-none transition-all duration-200',
              isActive(item)
                ? 'bg-white/15 text-white font-semibold'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
            @click="navigateTo(item)"
          >
            <span
              :class="[
                'w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg leading-none transition-all duration-200',
                isActive(item) ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
              ]"
            >
              <i :class="item.icon"></i>
            </span>
            <span>{{ item.label }}</span>
          </li>

          <template v-for="item in accountItems" :key="item.nav">
            <li
              :class="[
                'flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl cursor-pointer text-sm font-medium select-none transition-all duration-200',
                isActive(item) || (item.nav === 'support' && supportOpen)
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              ]"
              @click="navigateTo(item)"
            >
              <span
                :class="[
                  'w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg leading-none transition-all duration-200',
                  isActive(item) || (item.nav === 'support' && supportOpen)
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-white/70'
                ]"
              >
                <i :class="item.icon"></i>
              </span>
              <span>{{ item.label }}</span>
              <i
                v-if="item.nav === 'support'"
                class="mdi mdi-chevron-down ml-auto text-lg text-white/50 transition-transform duration-250"
                :class="{ 'rotate-180 text-white': supportOpen }"
              ></i>
            </li>

            <transition name="submenu">
              <div
                v-if="item.nav === 'support' && supportOpen"
                class="flex flex-col gap-1 ml-5 mt-1 mb-3 py-2 px-3 border-l-2 border-white/20 bg-white/5 rounded-r-[10px]"
              >
                <a
                  href="https://wa.me/+2348084107354"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-white/70 no-underline transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  <span class="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm shrink-0 bg-[#25D366]">
                    <i class="mdi mdi-whatsapp"></i>
                  </span>
                  <span>WhatsApp</span>
                </a>
                <a
                  href="mailto:support@getcredmate.co?subject=Support Request"
                  class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-white/70 no-underline transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  <span class="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm shrink-0 bg-white/20">
                    <i class="mdi mdi-email-outline"></i>
                  </span>
                  <span>Email</span>
                </a>
              </div>
            </transition>
          </template>

          <div class="h-px bg-white/15 my-3"></div>

          <li
            class="flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl cursor-pointer text-sm font-medium select-none transition-all duration-200 text-red-300 hover:bg-red-500/15 hover:text-red-200"
            @click="signOut"
          >
            <span class="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg leading-none bg-red-500/15 text-red-300">
              <i class="mdi mdi-logout-variant"></i>
            </span>
            <span>Sign Out</span>
          </li>
        </ul>
      </div>
    </v-navigation-drawer>

    <!-- ========== MAIN CONTENT ========== -->
    <v-main class="!bg-[#f7f5f0] min-h-screen">
      <v-container fluid class="!bg-transparent !p-4 sm:!px-6 sm:!py-5 lg:!px-8 lg:!py-6">
        <div class="w-full max-w-[1180px] mx-auto">

          <!-- PAGE HEADER -->
          <div class="mb-5">
            <div class="text-[11px] font-bold uppercase tracking-[0.12em] text-[#074033]/70 mb-1">
              Intelligence
            </div>
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 class="text-2xl sm:text-3xl font-bold text-[#1a2b34] m-0">
                  Year-End Review
                </h1>
                <p class="text-sm text-[#68757d] mt-1 mb-0 max-w-xl">
                  Turn a year's money activity into a clear story.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button class="border border-[#e4e2db] bg-white rounded-[11px] px-4 py-2.5 font-bold text-xs text-[#1a2b34] hover:bg-gray-50 transition-colors w-full sm:w-auto">
                  Export review
                </button>
                <button class="border border-[#e9bf2b] bg-[#e9bf2b] text-[#17382e] rounded-[11px] px-4 py-2.5 font-bold text-xs hover:brightness-95 transition-all w-full sm:w-auto">
                  Share summary
                </button>
              </div>
            </div>
          </div>

          <!-- HERO / SCORE CARD -->
          <div class="bg-gradient-to-br from-[#074033] via-[#0a5c48] to-[#0d7059] rounded-[20px] text-white p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-4">
            <div class="flex-1">
              <div class="text-[11px] uppercase tracking-[0.12em] font-extrabold text-[#9cebd0]">
                2026 progress
              </div>
              <h2 class="m-0 mt-1 text-xl sm:text-2xl font-bold leading-tight">
                You built stronger money habits.
              </h2>
              <p class="text-[#bfe1d6] text-[13px] leading-relaxed mt-2 max-w-lg mb-0">
                Your spending is more visible, your savings are more intentional, and your upcoming commitments are easier to plan for.
              </p>
            </div>
            <div class="w-[92px] h-[92px] rounded-full border-[7px] border-[#e9bf2b] grid place-items-center text-[23px] font-black shrink-0 bg-white/5">
              82
            </div>
          </div>

          <!-- METRICS -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
            <div class="bg-white border border-[#e4e2db] rounded-2xl p-4 shadow-[0_4px_16px_rgba(24,35,44,0.04)]">
              <div class="text-[11px] uppercase tracking-wider text-[#80888d] mb-1">Total saved</div>
              <div class="text-xl font-bold text-[#168064]">₦684,000</div>
            </div>
            <div class="bg-white border border-[#e4e2db] rounded-2xl p-4 shadow-[0_4px_16px_rgba(24,35,44,0.04)]">
              <div class="text-[11px] uppercase tracking-wider text-[#80888d] mb-1">Goals completed</div>
              <div class="text-xl font-bold text-[#1a2b34]">5 / 7</div>
            </div>
            <div class="bg-white border border-[#e4e2db] rounded-2xl p-4 shadow-[0_4px_16px_rgba(24,35,44,0.04)]">
              <div class="text-[11px] uppercase tracking-wider text-[#80888d] mb-1">Budget adherence</div>
              <div class="text-xl font-bold text-[#1a2b34]">82%</div>
            </div>
          </div>

          <!-- TWO COLUMN SECTION -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-3.5">

            <!-- Monthly savings trend -->
            <section class="bg-white border border-[#e4e2db] rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(24,35,44,0.04)]">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-bold text-[#1a2b34] m-0">Monthly savings trend</h3>
                <span class="text-[11px] text-[#80888d]">Jan–Dec</span>
              </div>

              <div class="flex items-end gap-1.5 sm:gap-2 h-[160px] px-1 pt-4 border-b border-[#e4e2db]">
                <div
                  v-for="(h, i) in bars"
                  :key="i"
                  class="flex-1 bg-[#1a8064] rounded-t-md transition-all duration-300 hover:bg-[#0d7059]"
                  :style="{ height: h + '%' }"
                ></div>
              </div>
              <div class="flex gap-1.5 sm:gap-2 mt-2">
                <span
                  v-for="(l, i) in labels"
                  :key="i"
                  class="flex-1 text-center text-[10px] text-[#80888d]"
                >
                  {{ l }}
                </span>
              </div>
            </section>

            <!-- Year in numbers -->
            <section class="bg-white border border-[#e4e2db] rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(24,35,44,0.04)]">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-bold text-[#1a2b34] m-0">Your year in numbers</h3>
                <span class="text-[11px] text-[#80888d]">Highlights</span>
              </div>

              <div class="space-y-0">
                <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
                  <span class="text-xs text-[#80888d]">Largest goal completed</span>
                  <b class="text-sm text-[#1a2b34]">₦200,000</b>
                </div>
                <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
                  <span class="text-xs text-[#80888d]">Best saving month</span>
                  <b class="text-sm text-[#1a2b34]">December</b>
                </div>
                <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
                  <span class="text-xs text-[#80888d]">Most common expense</span>
                  <b class="text-sm text-[#1a2b34]">Food</b>
                </div>
                <div class="flex justify-between items-center py-3">
                  <span class="text-xs text-[#80888d]">Bills settled on time</span>
                  <b class="text-sm text-[#1a2b34]">96%</b>
                </div>
              </div>
            </section>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Tiny bits Tailwind can't handle cleanly */
.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.scrollbar-thin::-webkit-scrollbar {
  width: 5px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}
</style>