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
    <!-- TOP BAR -->
    <v-app-bar
      app
      elevation="0"
      height="64"
      class="app-bar px-3 sm:px-4 border-b border-gray-200/80"
    >
      <v-app-bar-nav-icon class="!flex md:!hidden mr-1" @click="toggleDrawer" />

      <NavBar />
    </v-app-bar>

    <!-- SIDEBAR -->
    <v-navigation-drawer v-model="drawer" app :permanent="mdAndUp" :width="280" class="side-bar">
      <Sidebar />
    </v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main class="main-content">
      <v-container fluid class="content-container">
        <slot />
      </v-container>
    </v-main>

    <!-- SUPPORT BACKDROP -->
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

/* SIDEBAR */
.side-bar {
  background: #074033 !important;
}

/* .side-bar :deep(.v-navigation-drawer__content) {
  background: #074033 !important;
  border-right: none;
  box-shadow: none;
  overflow-y: auto;
} */
</style>
