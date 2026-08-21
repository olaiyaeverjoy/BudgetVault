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
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()

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
    label: 'smart vault',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/smart'
  },
  {
    nav: 'overview',
    label: 'Budget planner',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/budgetplanner'
  },
  {
    nav: 'overview',
    label: 'Goals & Dreams',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/goals&dreams'
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
    label: 'money calender',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/moneycalender'
  },
  {
    nav: 'overview',
    label: 'Transaction History',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/transactionhistory'
  }
]

const menuItems3 = [
  // {
  //   nav: 'overview',
  //   label: 'notification',
  //   icon: 'mdi mdi-view-dashboard-outline',
  //   to: '/notifications'
  // },

  // {
  //   nav: 'overview',
  //   label: 'financial Gps',
  //   icon: 'mdi mdi-view-dashboard-outline',
  //   to: '/financialgps'
  // },
  // {
  //   nav: 'overview',
  //   label: 'subscriptions',
  //   icon: 'mdi mdi-view-dashboard-outline',
  //   to: '/subscriptions'
  // },
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
