<template>
  <div class="w-full p-[18px_18px_20px] bg-[#074033]">
    <ul class="list-none p-0 m-0">
      <!-- ================= MAIN MENU ================= -->

      <li
        v-for="item in menuItems1"
        :key="item.nav"
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
            isActive(item)
              ? 'bg-white/20 text-white'
              : 'bg-white/10 text-white/70 group-hover:bg-white/15'
          ]"
        >
          <i :class="item.icon"></i>
        </span>

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>

      <!-- Section label -->
      <p class="mt-5 mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
        Plan & Track
      </p>

      <li
        v-for="item in menuItems2"
        :key="item.nav"
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

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>

      <!-- Section label -->
      <p class="mt-5 mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
        Intelligence
      </p>

      <li
        v-for="item in menuItems3"
        :key="item.nav"
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

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>

      <!-- Section label -->
      <p class="mt-5 mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
        Collaborations
      </p>

      <li
        v-for="item in menuItems4"
        :key="item.nav"
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

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>

      <!-- ================= ACCOUNT / SUPPORT ================= -->

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

          <span class="menu-label">
            {{ item.label }}
          </span>

          <i
            v-if="item.nav === 'support'"
            class="mdi mdi-chevron-down ml-auto text-lg text-white/50 transition-transform duration-250"
            :class="{ 'rotate-180 text-white': supportOpen }"
          ></i>
        </li>

        <!-- ================= SUPPORT SUBMENU ================= -->
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
              <span
                class="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm shrink-0 bg-[#25D366]"
              >
                <i class="mdi mdi-whatsapp"></i>
              </span>
              <span>WhatsApp</span>
            </a>

            <a
              href="mailto:support@getcredmate.co?subject=Support Request"
              class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-white/70 no-underline transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              <span
                class="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm shrink-0 bg-white/20"
              >
                <i class="mdi mdi-email-outline"></i>
              </span>
              <span>Email</span>
            </a>
          </div>
        </transition>
      </template>

      <!-- ================= DIVIDER ================= -->
      <div class="h-px bg-white/15 my-3"></div>

      <!-- ================= SIGN OUT ================= -->
      <li
        class="flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl cursor-pointer text-sm font-medium select-none transition-all duration-200 text-red-300 hover:bg-red-500/15 hover:text-red-200"
        @click="signOut"
      >
        <span
          class="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-lg leading-none bg-red-500/15 text-red-300"
        >
          <i class="mdi mdi-logout-variant"></i>
        </span>

        <span class="menu-label"> Sign Out </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()

const supportOpen = ref(false)

// =====================================================
// MENU CONFIGURATION
// =====================================================

const menuItems1 = [
  {
    nav: 'overview',
    label: 'Dashboard',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/dashboard'
  },
  {
    nav: 'overview',
    label: 'Banks & cards',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/banks&cards'
  }
]

const menuItems2 = [
  {
    nav: 'overview',
    label: 'smart vaults',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/smartvaults'
  },
  {
    nav: 'overview',
    label: 'Budget planner',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/budgetplanner'
  },
  {
    nav: 'overview',
    label: 'Expense Tracker',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/expensetracking'
  },
  {
    nav: 'overview',
    label: 'Bill settlement',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/billsettlement'
  },
  {
    nav: 'overview',
    label: 'Goals & Dreams',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/goals&dreams'
  }
]

const menuItems3 = [
  {
    nav: 'overview',
    label: 'notification',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/notifications'
  },
  {
    nav: 'overview',
    label: 'money calender',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/moneycalender'
  },
  {
    nav: 'overview',
    label: 'financial Gps',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/financialgps'
  },
  {
    nav: 'overview',
    label: 'subscriptions',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/subscriptions'
  },
  {
    nav: 'overview',
    label: 'money personality',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/moneypersonality'
  },
  {
    nav: 'overview',
    label: 'Ai coach',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/aicoach'
  },
  {
    nav: 'overview',
    label: 'year-end review',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/yearendreview'
  }
]

const menuItems4 = [
  {
    nav: 'overview',
    label: 'couple vault',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/couple'
  },
  {
    nav: 'overview',
    label: 'Business',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/business'
  },
  {
    nav: 'overview',
    label: 'student',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/students'
  }
]

const accountItems = [
  {
    nav: 'support',
    label: 'Support',
    icon: 'mdi mdi-help-circle-outline'
  }
]

// =====================================================
// ACTIVE ROUTE
// =====================================================

const isActive = (item: any) => {
  if (item.to) {
    return route.path === item.to || route.path.startsWith(item.to + '/')
  }
  return false
}

// =====================================================
// NAVIGATION
// =====================================================

const navigateTo = (item: any) => {
  if (item.nav === 'support') {
    supportOpen.value = !supportOpen.value
    return
  }

  if (item.to) {
    router.push(item.to)
  }
}

// =====================================================
// SIGN OUT
// =====================================================

const signOut = async () => {
  try {
    await authStore.logout()
    router.push({
      name: 'login'
    })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
/* Keep only the transition + scrollbar (Tailwind doesn’t cover these well) */
.submenu-enter-active,
.submenu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Optional nicer scrollbar */
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
