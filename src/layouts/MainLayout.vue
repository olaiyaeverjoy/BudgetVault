<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './Sidebar.vue'
import NavBar from './NavBar.vue'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const route = useRoute()
const router = useRouter()

const drawer = ref(false)
const supportOpen = ref(false)

onMounted(() => {
  drawer.value = mdAndUp.value
})

watchEffect(() => {
  drawer.value = mdAndUp.value
})

const toggleSupport = () => {
  supportOpen.value = !supportOpen.value
}

const closeSupport = () => {
  supportOpen.value = false
}

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <v-app>
    <v-app-bar app elevation="0" class="px-3">
      <!-- Menu button: mobile/tablet only, toggles the drawer -->
      <v-app-bar-nav-icon class="d-flex d-md-none" @click="toggleDrawer" />

      <NavBar />
    </v-app-bar>

    <!-- Sidebar drawer: permanent on desktop, toggleable overlay on mobile/tablet -->
    <v-navigation-drawer
      left
      :permanent="$vuetify.display.mdAndUp"
      app
      :temporary="$vuetify.display.mdAndDown"
      v-model="drawer"
      expand-on-hover
      class="side-bar hidden md:block"
    >
      <Sidebar v-model:drawer="drawer" />
    </v-navigation-drawer>

    <!-- <v-main class="mt-4 page-wrapper bg-plue-50">
      <v-container fluid class="page-wrapper bg-blue-50">
        <slot />
      </v-container>
    </v-main> -->

    <v-main class="layout-main">
      <v-container fluid class="layout-container">
        <slot />
      </v-container>
    </v-main>

    <!-- Backdrop to close menu when clicking outside -->
    <div v-if="supportOpen" class="support-backdrop" @click="closeSupport" />
  </v-app>
</template>

<style scoped>
/* ==========================================
   APP BACKGROUND
========================================== */

:deep(.v-application) {
  background: #f7f9fc !important;
}

.layout-main {
  background: #f7f9fc;
  min-height: 100vh;
}

.layout-container {
  background: transparent;
  padding: 24px;
}

/* ==========================================
   APP BAR
========================================== */

:deep(.v-app-bar) {
  background: #ffffff !important;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04) !important;
}

/* ==========================================
   SIDEBAR
========================================== */

.side-bar {
  overflow: hidden !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

.side-bar :deep(.v-navigation-drawer__content) {
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow-y: auto;
}

.side-bar.v-navigation-drawer {
  background: transparent !important;
  border: none !important;
}

/* ==========================================
   CARDS
========================================== */

:deep(.dashboard-card) {
  background: white;
  border-radius: 24px;
  border: 1px solid #eef2f7;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
}

/* ==========================================
   BUTTONS
========================================== */

:deep(.primary-btn) {
  background: #16a34a !important;
  color: white !important;
}

:deep(.primary-btn:hover) {
  background: #15803d !important;
}

/* ==========================================
   SUPPORT FAB
========================================== */

.support-fab-wrap {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  z-index: 9999;
}

.support-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.support-option {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: #111827;
  text-decoration: none;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.support-option:hover {
  transform: translateY(-2px);
  border-color: #16a34a;
}

.option-wa {
  background: #25d366;
}

.option-mail {
  background: #16a34a;
}

.support-btn {
  width: 52px;
  height: 52px;
  border-radius: 9999px;
  background: #16a34a;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(22, 163, 74, 0.25);
  transition: all 0.25s ease;
}

.support-btn:hover {
  background: #15803d;
  transform: scale(1.08);
}

.support-btn.open {
  transform: rotate(45deg);
}

.support-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
}

/* ==========================================
   TRANSITIONS
========================================== */

.fab-menu-enter-active,
.fab-menu-leave-active {
  transition: all 0.2s ease;
}

.fab-menu-enter-from,
.fab-menu-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>