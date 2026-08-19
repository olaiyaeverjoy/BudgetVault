<template>
  <div class="dash-sidebar">
    <ul class="dash-menu">

      <!-- ================= MAIN MENU ================= -->

      <li
        v-for="item in menuItems"
        :key="item.nav"
        :class="{ active: isActive(item) }"
        @click="navigateTo(item)"
      >
        <span class="icon-badge">
          <i :class="item.icon"></i>
        </span>

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>


      <!-- ================= ACCOUNT / SUPPORT ================= -->

      <template
        v-for="item in accountItems"
        :key="item.nav"
      >

        <li
          :class="{
            active: isActive(item),
            'support-open':
              item.nav === 'support' && supportOpen
          }"
          @click="navigateTo(item)"
        >

          <span class="icon-badge">
            <i :class="item.icon"></i>
          </span>

          <span class="menu-label">
            {{ item.label }}
          </span>

          <i
            v-if="item.nav === 'support'"
            class="mdi mdi-chevron-down support-chevron"
            :class="{ rotated: supportOpen }"
          ></i>

        </li>


        <!-- ================= SUPPORT SUBMENU ================= -->

        <transition name="submenu">

          <div
            v-if="
              item.nav === 'support' &&
              supportOpen
            "
            class="support-submenu"
          >

            <a
              href="https://wa.me/+2348084107354"
              target="_blank"
              rel="noopener"
              class="submenu-item"
            >

              <span class="submenu-icon wa-icon">
                <i class="mdi mdi-whatsapp"></i>
              </span>

              <span>
                WhatsApp
              </span>

            </a>


            <a
              href="mailto:support@getcredmate.co?subject=Support Request"
              class="submenu-item"
            >

              <span class="submenu-icon mail-icon">
                <i class="mdi mdi-email-outline"></i>
              </span>

              <span>
                Email
              </span>

            </a>

          </div>

        </transition>

      </template>


      <!-- ================= DIVIDER ================= -->

      <div class="menu-divider"></div>


      <!-- ================= SIGN OUT ================= -->

      <li
        class="sign-out-item"
        @click="signOut"
      >

        <span class="icon-badge">
          <i class="mdi mdi-logout-variant"></i>
        </span>

        <span class="menu-label">
          Sign Out
        </span>

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

const menuItems = [

  {
    nav: 'overview',
    label: 'Dashboard',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/dashboard',
  },

]


const accountItems = [

  {
    nav: 'support',
    label: 'Support',
    icon: 'mdi mdi-help-circle-outline',
  },

]


// =====================================================
// ACTIVE ROUTE
// =====================================================

const isActive = (item: any) => {

  if (item.to) {

    return (
      route.path === item.to ||
      route.path.startsWith(item.to + '/')
    )

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

    console.error(
      'Logout failed:',
      error
    )

  }

}

</script>


<style scoped>

/* =====================================================
   SIDEBAR
===================================================== */

.dash-sidebar {

  width: 260px;

  padding: 18px 18px 20px;

  background: #ffffff;

  border-radius: 18px;

  max-height: 100vh;

  overflow-y: auto;

}


/* =====================================================
   MENU
===================================================== */

.dash-menu {

  list-style: none;

  padding: 0;

  margin: 0;

}


/* =====================================================
   MENU ITEMS
===================================================== */

.dash-menu li {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 10px 12px;

  margin-bottom: 7px;

  border-radius: 12px;

  cursor: pointer;

  font-size: 14px;

  font-weight: 500;

  color: #6b7280;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  user-select: none;

}


/* Hover */

.dash-menu li:hover:not(.active) {

  background: #f0fdf4;

  color: #15803d;

}


/* =====================================================
   ACTIVE ITEM
===================================================== */

.dash-menu li.active {

  background: #f0fdf4;

  color: #16a34a;

  font-weight: 600;

}


.dash-menu li.active .icon-badge {

  background: #dcfce7;

}


.dash-menu li.active .icon-badge i {

  color: #16a34a;

}


/* =====================================================
   ICON
===================================================== */

.icon-badge {

  width: 36px;

  height: 36px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  font-size: 18px;

  line-height: 1;

  background: #f7f9fc;

  transition: all 0.2s ease;

}


.icon-badge i {

  color: #6b7280;

  transition: color 0.2s ease;

}


/* Hover icon */

.dash-menu li:hover:not(.active) .icon-badge {

  background: #dcfce7;

}


.dash-menu li:hover:not(.active) .icon-badge i {

  color: #16a34a;

}


/* =====================================================
   SUPPORT CHEVRON
===================================================== */

.support-chevron {

  margin-left: auto;

  font-size: 18px;

  color: #9ca3af;

  transition:
    transform 0.25s ease,
    color 0.25s ease;

}


.support-chevron.rotated {

  transform: rotate(180deg);

}


.dash-menu li.support-open {

  background: #f0fdf4;

  color: #16a34a;

}


.dash-menu li.support-open .support-chevron {

  color: #16a34a;

}


/* =====================================================
   SUPPORT SUBMENU
===================================================== */

.support-submenu {

  display: flex;

  flex-direction: column;

  gap: 4px;

  margin: 4px 0 12px 20px;

  padding: 8px 10px 8px 12px;

  border-left: 2px solid #bbf7d0;

  background: #f7fdf9;

  border-radius: 0 10px 10px 0;

}


/* =====================================================
   SUBMENU ITEM
===================================================== */

.submenu-item {

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 9px 10px;

  border-radius: 8px;

  font-size: 13px;

  color: #6b7280;

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease;

}


.submenu-item:hover {

  background: #dcfce7;

  color: #15803d;

}


/* =====================================================
   SUBMENU ICON
===================================================== */

.submenu-icon {

  width: 28px;

  height: 28px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  color: white;

  font-size: 14px;

  flex-shrink: 0;

}


.wa-icon {

  background: #16a34a;

}


.mail-icon {

  background: #15803d;

}


/* =====================================================
   DIVIDER
===================================================== */

.menu-divider {

  height: 1px;

  background: #e5e7eb;

  margin: 12px 0;

}


/* =====================================================
   SIGN OUT
===================================================== */

.sign-out-item {

  color: #dc2626 !important;

}


.sign-out-item:hover {

  background: #fef2f2 !important;

  color: #b91c1c !important;

}


.sign-out-item .icon-badge {

  background: #fef2f2;

}


.sign-out-item .icon-badge i {

  color: #dc2626;

}


/* =====================================================
   TRANSITIONS
===================================================== */

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


/* =====================================================
   SCROLLBAR
===================================================== */

.dash-sidebar::-webkit-scrollbar {

  width: 5px;

}


.dash-sidebar::-webkit-scrollbar-track {

  background: transparent;

}


.dash-sidebar::-webkit-scrollbar-thumb {

  background: #d1d5db;

  border-radius: 3px;

}


.dash-sidebar::-webkit-scrollbar-thumb:hover {

  background: #9ca3af;

}

</style>
<template>
  <div class="dash-sidebar">
    <ul class="dash-menu">

      <!-- ================= MAIN MENU ================= -->

      <li
        v-for="item in menuItems1"
        :key="item.nav"
        :class="{ active: isActive(item) }"
        @click="navigateTo(item)"
      >
        <span class="icon-badge">
          <i :class="item.icon"></i>
        </span>

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>

      <p>plain and track</p>

      <li
        v-for="item in menuItems2"
        :key="item.nav"
        :class="{ active: isActive(item) }"
        @click="navigateTo(item)"
      >
        <span class="icon-badge">
          <i :class="item.icon"></i>
        </span>

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>

       <p>intelligence</p>

      <li
        v-for="item in menuItems3"
        :key="item.nav"
        :class="{ active: isActive(item) }"
        @click="navigateTo(item)"
      >
        <span class="icon-badge">
          <i :class="item.icon"></i>
        </span>

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>

      <p>collaborations</p>

      <li
        v-for="item in menuItems4"
        :key="item.nav"
        :class="{ active: isActive(item) }"
        @click="navigateTo(item)"
      >
        <span class="icon-badge">
          <i :class="item.icon"></i>
        </span>

        <span class="menu-label">
          {{ item.label }}
        </span>
      </li>



      <!-- ================= ACCOUNT / SUPPORT ================= -->

      <template
        v-for="item in accountItems"
        :key="item.nav"
      >

        <li
          :class="{
            active: isActive(item),
            'support-open':
              item.nav === 'support' && supportOpen
          }"
          @click="navigateTo(item)"
        >

          <span class="icon-badge">
            <i :class="item.icon"></i>
          </span>

          <span class="menu-label">
            {{ item.label }}
          </span>

          <i
            v-if="item.nav === 'support'"
            class="mdi mdi-chevron-down support-chevron"
            :class="{ rotated: supportOpen }"
          ></i>

        </li>


        <!-- ================= SUPPORT SUBMENU ================= -->

        <transition name="submenu">

          <div
            v-if="
              item.nav === 'support' &&
              supportOpen
            "
            class="support-submenu"
          >

            <a
              href="https://wa.me/+2348084107354"
              target="_blank"
              rel="noopener"
              class="submenu-item"
            >

              <span class="submenu-icon wa-icon">
                <i class="mdi mdi-whatsapp"></i>
              </span>

              <span>
                WhatsApp
              </span>

            </a>


            <a
              href="mailto:support@getcredmate.co?subject=Support Request"
              class="submenu-item"
            >

              <span class="submenu-icon mail-icon">
                <i class="mdi mdi-email-outline"></i>
              </span>

              <span>
                Email
              </span>

            </a>

          </div>

        </transition>

      </template>


      <!-- ================= DIVIDER ================= -->

      <div class="menu-divider"></div>


      <!-- ================= SIGN OUT ================= -->

      <li
        class="sign-out-item"
        @click="signOut"
      >

        <span class="icon-badge">
          <i class="mdi mdi-logout-variant"></i>
        </span>

        <span class="menu-label">
          Sign Out
        </span>

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
    to: '/dashboard',
  },
  {
    nav: 'overview',
    label: 'Banks & cards',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/banks&cards',
  },
  
]

const menuItems2 = [
  {
    nav: 'overview',
    label: 'smart vaults',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/smartvaults',
  },
  {
    nav: 'overview',
    label: 'Budget planner',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/budgetplanner',
  },
  {
    nav: 'overview',
    label: 'Expense Tracker',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/expensetracker',
  },
  {
    nav: 'overview',
    label: 'Bill settlement',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/billsettlement',
  },
  {
    nav: 'overview',
    label: 'Goals & Dreams',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/goals&dreams',
  },

]

const menuItems3 = [
  {
    nav: 'overview',
    label: 'notification',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/smartvaults',
  },
  {
    nav: 'overview',
    label: 'moneey callender',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/budgetplanner',
  },
  {
    nav: 'overview',
    label: 'financial Gps',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/expensetracker',
  },
  {
    nav: 'overview',
    label: 'subscription',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/billsettlement',
  },
  {
    nav: 'overview',
    label: 'money personality',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/goals&dreams',
  },
  {
    nav: 'overview',
    label: 'Ai coach',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/goals&dreams',
  },
  {
    nav: 'overview',
    label: 'year-end review',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/goals&dreams',
  },

]

const menuItems4 = [
  {
    nav: 'overview',
    label: 'couple vault',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/smartvaults',
  },
  {
    nav: 'overview',
    label: 'Business vault',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/budgetplanner',
  },
  {
    nav: 'overview',
    label: 'student',
    icon: 'mdi mdi-view-dashboard-outline',
    to: '/expensetracker',
  },

]


const accountItems = [

  {
    nav: 'support',
    label: 'Support',
    icon: 'mdi mdi-help-circle-outline',
  },

]


// =====================================================
// ACTIVE ROUTE
// =====================================================

const isActive = (item: any) => {

  if (item.to) {

    return (
      route.path === item.to ||
      route.path.startsWith(item.to + '/')
    )

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

    console.error(
      'Logout failed:',
      error
    )

  }

}

</script>


<style scoped>

/* =====================================================
   SIDEBAR
===================================================== */

.dash-sidebar {

  width: 260px;

  padding: 18px 18px 20px;

  background: #ffffff;

  border-radius: 18px;

  max-height: 100vh;

  overflow-y: auto;

}


/* =====================================================
   MENU
===================================================== */

.dash-menu {

  list-style: none;

  padding: 0;

  margin: 0;

}


/* =====================================================
   MENU ITEMS
===================================================== */

.dash-menu li {

  display: flex;

  align-items: center;

  gap: 12px;

  padding: 10px 12px;

  margin-bottom: 7px;

  border-radius: 12px;

  cursor: pointer;

  font-size: 14px;

  font-weight: 500;

  color: #6b7280;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  user-select: none;

}


/* Hover */

.dash-menu li:hover:not(.active) {

  background: #f0fdf4;

  color: #15803d;

}


/* =====================================================
   ACTIVE ITEM
===================================================== */

.dash-menu li.active {

  background: #f0fdf4;

  color: #16a34a;

  font-weight: 600;

}


.dash-menu li.active .icon-badge {

  background: #dcfce7;

}


.dash-menu li.active .icon-badge i {

  color: #16a34a;

}


/* =====================================================
   ICON
===================================================== */

.icon-badge {

  width: 36px;

  height: 36px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  font-size: 18px;

  line-height: 1;

  background: #f7f9fc;

  transition: all 0.2s ease;

}


.icon-badge i {

  color: #6b7280;

  transition: color 0.2s ease;

}


/* Hover icon */

.dash-menu li:hover:not(.active) .icon-badge {

  background: #dcfce7;

}


.dash-menu li:hover:not(.active) .icon-badge i {

  color: #16a34a;

}


/* =====================================================
   SUPPORT CHEVRON
===================================================== */

.support-chevron {

  margin-left: auto;

  font-size: 18px;

  color: #9ca3af;

  transition:
    transform 0.25s ease,
    color 0.25s ease;

}


.support-chevron.rotated {

  transform: rotate(180deg);

}


.dash-menu li.support-open {

  background: #f0fdf4;

  color: #16a34a;

}


.dash-menu li.support-open .support-chevron {

  color: #16a34a;

}


/* =====================================================
   SUPPORT SUBMENU
===================================================== */

.support-submenu {

  display: flex;

  flex-direction: column;

  gap: 4px;

  margin: 4px 0 12px 20px;

  padding: 8px 10px 8px 12px;

  border-left: 2px solid #bbf7d0;

  background: #f7fdf9;

  border-radius: 0 10px 10px 0;

}


/* =====================================================
   SUBMENU ITEM
===================================================== */

.submenu-item {

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 9px 10px;

  border-radius: 8px;

  font-size: 13px;

  color: #6b7280;

  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease;

}


.submenu-item:hover {

  background: #dcfce7;

  color: #15803d;

}


/* =====================================================
   SUBMENU ICON
===================================================== */

.submenu-icon {

  width: 28px;

  height: 28px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  color: white;

  font-size: 14px;

  flex-shrink: 0;

}


.wa-icon {

  background: #16a34a;

}


.mail-icon {

  background: #15803d;

}


/* =====================================================
   DIVIDER
===================================================== */

.menu-divider {

  height: 1px;

  background: #e5e7eb;

  margin: 12px 0;

}


/* =====================================================
   SIGN OUT
===================================================== */

.sign-out-item {

  color: #dc2626 !important;

}


.sign-out-item:hover {

  background: #fef2f2 !important;

  color: #b91c1c !important;

}


.sign-out-item .icon-badge {

  background: #fef2f2;

}


.sign-out-item .icon-badge i {

  color: #dc2626;

}


/* =====================================================
   TRANSITIONS
===================================================== */

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


/* =====================================================
   SCROLLBAR
===================================================== */

.dash-sidebar::-webkit-scrollbar {

  width: 5px;

}


.dash-sidebar::-webkit-scrollbar-track {

  background: transparent;

}


.dash-sidebar::-webkit-scrollbar-thumb {

  background: #d1d5db;

  border-radius: 3px;

}


.dash-sidebar::-webkit-scrollbar-thumb:hover {

  background: #9ca3af;

}

</style>