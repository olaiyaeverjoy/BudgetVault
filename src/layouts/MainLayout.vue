<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './Sidebar.vue'
import NavBar from './NavBar.vue'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const route = useRoute()

const drawer = ref(false)
const supportOpen = ref(false)

// Keep drawer open on desktop, closed by default on mobile
onMounted(() => {
  drawer.value = mdAndUp.value
})

watch(mdAndUp, (val) => {
  drawer.value = val
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const closeSupport = () => {
  supportOpen.value = false
}
</script>

<template>
  <v-app class="app-root">
    <!-- Top App Bar -->
    <v-app-bar
      app
      elevation="0"
      height="64"
      class="app-bar px-3 sm:px-4 border-b border-gray-200/80"
    >
      <!-- Hamburger – only on mobile/tablet -->
      <v-app-bar-nav-icon
        class="!flex md:!hidden mr-1"
        @click="toggleDrawer"
      />

      <NavBar />
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="mdAndUp"
      :temporary="!mdAndUp"
      :width="280"
      class="side-bar"
      expand-on-hover
    >
      <Sidebar v-model:drawer="drawer" />
    </v-navigation-drawer>

    <!-- Main content -->
    <v-main class="main-content">
      <v-container fluid class="content-container">
        <slot />
      </v-container>
    </v-main>

    <!-- Support backdrop (if you still use the FAB elsewhere) -->
    <div
      v-if="supportOpen"
      class="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[1px]"
      @click="closeSupport"
    />
  </v-app>
</template>

<style scoped>
.app-root {
  background: #f7f5f0 !important;
}

.app-bar {
  background: #f7f5f0 !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04) !important;
}

.main-content {
  background: #f7f5f0;
  min-height: 100vh;
}

.content-container {
  background: transparent;
  padding: 16px !important;
}

@media (min-width: 640px) {
  .content-container {
    padding: 20px 24px !important;
  }
}

@media (min-width: 1024px) {
  .content-container {
    padding: 24px 32px !important;
  }
}

/* Sidebar styling */
.side-bar :deep(.v-navigation-drawer__content) {
  background: white;
  border-right: 1px solid #e5e7eb;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow-y: auto;
}

/* Shared utility classes used across the app */
:deep(.dashboard-card) {
  @apply bg-white rounded-3xl border border-[#eef2f7] shadow-[0_8px_30px_rgba(0,0,0,0.04)];
}

:deep(.primary-btn) {
  @apply !bg-green-600 !text-white hover:!bg-green-700;
}

/* Support FAB helpers (keep if used elsewhere) */
.support-fab-wrap {
  @apply fixed bottom-6 right-6 flex flex-col items-end gap-2.5 z-[9999];
}

.support-menu {
  @apply flex flex-col items-end gap-2;
}

.support-option {
  @apply flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-2 text-[13px] font-medium text-gray-900 no-underline shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-green-600;
}

.option-wa {
  @apply bg-[#25d366];
}

.option-mail {
  @apply bg-green-600;
}

.support-btn {
  @apply w-[52px] h-[52px] rounded-full bg-green-600 text-white border-none cursor-pointer shadow-[0_10px_30px_rgba(22,163,74,0.25)] transition-all duration-[250ms] ease-in-out hover:bg-green-700 hover:scale-110;
}

.support-btn.open {
  @apply rotate-45;
}

.fab-menu-enter-active,
.fab-menu-leave-active {
  @apply transition-all duration-200 ease-in-out;
}

.fab-menu-enter-from,
.fab-menu-leave-to {
  @apply opacity-0 translate-y-2.5;
}
</style>