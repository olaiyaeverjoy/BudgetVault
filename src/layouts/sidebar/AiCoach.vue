<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAppStore } from '@/stores/app'
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

// ===== AI Coach =====
const app = useAppStore()
const inputText = ref('')
const messagesBox = ref(null)

function ask(q: string) {
  app.coachAsk(q)
}

function send() {
  const q = inputText.value.trim()
  if (!q) return
  inputText.value = ''
  ask(q)
}

watch(
  () => app.aiMessages.length,
  async () => {
    await nextTick()
    if (messagesBox.value) {
      (messagesBox.value as HTMLElement).scrollTop = (messagesBox.value as HTMLElement).scrollHeight
    }
  }
)

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

          <!-- MAIN MENU -->
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

          <!-- ACCOUNT / SUPPORT -->
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

          <!-- SIGN OUT -->
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

          <!-- HERO -->
          <div class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#074033] via-[#0a5c48] to-[#0d7059] text-white p-6 sm:p-8 mb-5">
            <div class="relative z-10">
              <div class="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-[#9cebd0] mb-2.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[#9cebd0] shadow-[0_0_0_3px_rgba(156,235,208,0.25)]"></span>
                AI Coach
              </div>

              <h1 class="text-[1.55rem] sm:text-[1.9rem] font-bold leading-tight mb-3 max-w-xl">
                Your money, explained<br class="hidden sm:block" />
                in plain language.
              </h1>

              <p class="text-[13px] leading-relaxed text-[#c9e6dc] mb-4 max-w-xl">
                Ask BudgetVault about your spending, budget, savings goals or upcoming commitments.
                Your coach helps you understand what’s happening and what you could do next.
              </p>

              <div class="flex flex-wrap gap-2">
                <button
                  class="bg-white/10 border border-white/20 text-white rounded-full px-3.5 py-2 text-xs font-medium hover:bg-white/18 hover:border-white/35 transition-all duration-150"
                  @click="ask('How am I doing this month?')"
                >
                  How am I doing?
                </button>
                <button
                  class="bg-white/10 border border-white/20 text-white rounded-full px-3.5 py-2 text-xs font-medium hover:bg-white/18 hover:border-white/35 transition-all duration-150"
                  @click="ask('Where am I spending too much?')"
                >
                  Find overspending
                </button>
                <button
                  class="bg-white/10 border border-white/20 text-white rounded-full px-3.5 py-2 text-xs font-medium hover:bg-white/18 hover:border-white/35 transition-all duration-150"
                  @click="ask('Can I afford my next goal?')"
                >
                  Check a goal
                </button>
                <button
                  class="bg-white/10 border border-white/20 text-white rounded-full px-3.5 py-2 text-xs font-medium hover:bg-white/18 hover:border-white/35 transition-all duration-150"
                  @click="ask('Help me plan next month')"
                >
                  Plan next month
                </button>
              </div>
            </div>
          </div>

          <!-- MAIN GRID -->
          <div class="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-3.5 mb-3.5">

            <!-- Chat Panel -->
            <section class="bg-white border border-[#e4e2db] rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(24,35,44,0.04)] flex flex-col min-h-[440px]">
              <h3 class="text-sm font-bold text-[#1a2b34] m-0 mb-3.5">Talk to your coach</h3>

              <div ref="messagesBox" class="flex-1 min-h-[280px] max-h-[400px] overflow-y-auto flex flex-col gap-3 py-1">
                <div
                  v-for="(m, i) in app.aiMessages"
                  :key="i"
                  class="flex gap-2.5"
                  :class="m.role === 'user' ? 'justify-end' : ''"
                >
                  <div
                    v-if="m.role === 'coach'"
                    class="w-[34px] h-[34px] rounded-[10px] bg-[#dff7ee] text-[#074033] font-extrabold grid place-items-center shrink-0 text-[15px]"
                  >
                    ✦
                  </div>
                  <div
                    class="max-w-[85%] rounded-[14px] px-3.5 py-2.5 text-[13px] leading-relaxed"
                    :class="m.role === 'user'
                      ? 'bg-[#074033] text-white'
                      : 'bg-[#f3f6f4] text-[#30404a]'"
                  >
                    {{ m.text }}
                  </div>
                </div>
              </div>

              <div class="flex gap-2 border-t border-[#eceae4] pt-3.5 mt-auto">
                <input
                  v-model="inputText"
                  type="text"
                  placeholder="e.g. Can I save ₦100,000 this month?"
                  class="flex-1 border border-[#deddd6] rounded-[11px] px-3.5 py-2.5 text-[13px] outline-none bg-[#fafaf8] focus:border-[#074033] focus:bg-white transition-colors"
                  @keydown.enter="send"
                />
                <button
                  class="bg-[#074033] text-white border-0 rounded-[11px] px-4.5 py-0 text-[13px] font-bold hover:bg-[#0a5c48] transition-colors"
                  @click="send"
                >
                  Ask
                </button>
              </div>

              <p class="text-[11px] text-[#8b918f] leading-relaxed mt-3 mb-0">
                Coach suggestions are educational guidance based on information in your BudgetVault.
                They are not financial, investment or lending advice.
              </p>
            </section>

            <!-- Insights Panel -->
            <section class="bg-white border border-[#e4e2db] rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(24,35,44,0.04)]">
              <h3 class="text-sm font-bold text-[#1a2b34] m-0 mb-3.5">What your money is saying</h3>

              <div class="flex flex-col gap-2.5">
                <div class="bg-[#f2faf7] border border-[#d8eee6] rounded-xl p-3.5">
                  <div class="text-[13px] font-semibold text-[#1a2b34] mb-1">You're on track with savings</div>
                  <p class="text-xs text-[#68757d] leading-relaxed m-0">
                    You've saved ₦18,000 this month. Keeping your current pace could put you around ₦216,000 ahead over a full year.
                  </p>
                </div>
                <div class="bg-[#f2faf7] border border-[#d8eee6] rounded-xl p-3.5">
                  <div class="text-[13px] font-semibold text-[#1a2b34] mb-1">Your flexible spending needs attention</div>
                  <p class="text-xs text-[#68757d] leading-relaxed m-0">
                    Food, transport and small purchases are taking a larger share of your available money than your planned budget.
                  </p>
                </div>
                <div class="bg-[#f2faf7] border border-[#d8eee6] rounded-xl p-3.5">
                  <div class="text-[13px] font-semibold text-[#1a2b34] mb-1">One upcoming commitment</div>
                  <p class="text-xs text-[#68757d] leading-relaxed m-0">
                    Your next major planned payment is close enough that the coach recommends protecting that amount before discretionary spending.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2.5 mt-3.5">
                <div class="bg-[#f8f7f3] border border-[#e9e7e0] rounded-xl p-3">
                  <span class="block text-[11px] uppercase tracking-wider text-[#80888d] mb-1">Budget health</span>
                  <span class="text-lg font-bold text-[#074033]">Good</span>
                </div>
                <div class="bg-[#f8f7f3] border border-[#e9e7e0] rounded-xl p-3">
                  <span class="block text-[11px] uppercase tracking-wider text-[#80888d] mb-1">Savings pace</span>
                  <span class="text-lg font-bold text-[#1a2b34]">15%</span>
                </div>
              </div>
            </section>
          </div>

          <!-- Suggestions -->
          <section class="bg-white border border-[#e4e2db] rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(24,35,44,0.04)] mb-2">
            <h3 class="text-sm font-bold text-[#1a2b34] m-0 mb-3.5">Start with a question</h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                class="bg-[#f8f8f5] border border-[#e7e6df] rounded-[13px] p-3.5 text-left hover:bg-[#f2faf7] hover:border-[#b8ddd0] transition-all duration-150"
                @click="ask('Break down my spending this month')"
              >
                <strong class="block text-[13px] text-[#1a2b34] mb-1">Break down my spending</strong>
                <span class="text-xs text-[#7b858c] leading-snug">See the categories shaping your month.</span>
              </button>
              <button
                class="bg-[#f8f8f5] border border-[#e7e6df] rounded-[13px] p-3.5 text-left hover:bg-[#f2faf7] hover:border-[#b8ddd0] transition-all duration-150"
                @click="ask('Give me a realistic savings plan')"
              >
                <strong class="block text-[13px] text-[#1a2b34] mb-1">Create a realistic savings plan</strong>
                <span class="text-xs text-[#7b858c] leading-snug">Turn your current income and commitments into a practical target.</span>
              </button>
              <button
                class="bg-[#f8f8f5] border border-[#e7e6df] rounded-[13px] p-3.5 text-left hover:bg-[#f2faf7] hover:border-[#b8ddd0] transition-all duration-150"
                @click="ask('What should I cut first?')"
              >
                <strong class="block text-[13px] text-[#1a2b34] mb-1">What should I cut first?</strong>
                <span class="text-xs text-[#7b858c] leading-snug">Find flexible areas before touching essentials.</span>
              </button>
              <button
                class="bg-[#f8f8f5] border border-[#e7e6df] rounded-[13px] p-3.5 text-left hover:bg-[#f2faf7] hover:border-[#b8ddd0] transition-all duration-150"
                @click="ask('Explain my budget simply')"
              >
                <strong class="block text-[13px] text-[#1a2b34] mb-1">Explain my budget simply</strong>
                <span class="text-xs text-[#7b858c] leading-snug">Get a plain-language explanation of your setup.</span>
              </button>
            </div>
          </section>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Only keep the tiny bits Tailwind can't easily handle */
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