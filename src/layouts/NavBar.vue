<template>

  <header
    class="
      w-full
      bg-white
      border-b
      border-gray-100
      px-6
      py-4
      flex
      items-center
    "
  >

    <!-- LEFT SPACER -->

    <div class="flex-1"></div>


    <!-- RIGHT SECTION -->

    <div
      class="
        flex
        justify-end
        items-center
        flex-1
        gap-3
      "
    >

      <!-- MOBILE SUPPORT -->

      <div class="sm:hidden">

        <button
          ref="supportBtnRef"
          class="
            w-9
            h-9
            rounded-full
            bg-[#16a34a]
            text-white
            flex
            items-center
            justify-center
            shadow-sm
          "
          :class="{
            'rotate-45': supportOpen
          }"
          style="transition: transform 0.2s ease"
          @click.stop="toggleSupport"
          aria-label="Contact support"
        >

          <v-icon size="16">

            {{
              supportOpen
                ? 'mdi-close'
                : 'mdi-chat-processing'
            }}

          </v-icon>

        </button>

      </div>


      <!-- USER -->

      <router-link
        to="/profile"
        class="flex"
      >

        <div
          class="
            flex
            items-center
            gap-3
            cursor-pointer
          "
        >

          <!-- USER AVATAR -->

          <div
            class="
              w-9
              h-9
              rounded-full
              bg-[#16a34a]
              text-white
              flex
              items-center
              justify-center
              font-bold
              text-xs
              shadow-sm
            "
          >

            {{ initials }}

          </div>

        </div>

      </router-link>

    </div>

  </header>


  <!-- =====================================================
       SUPPORT DROPDOWN
  ====================================================== -->

  <Teleport to="body">

    <div
      v-if="supportOpen"
      class="support-nav-backdrop sm:hidden"
      @click="closeSupport"
    />


    <transition name="fab-menu">

      <div
        v-if="supportOpen"
        class="support-menu-dropdown sm:hidden"
        :style="dropdownStyle"
      >

        <!-- WHATSAPP -->

        <a
          href="https://wa.me/+2348084107354"
          target="_blank"
          rel="noopener"
          class="support-option"
          @click="closeSupport"
        >

          <span
            class="option-icon option-wa"
          >

            <v-icon size="16">
              mdi-whatsapp
            </v-icon>

          </span>

          WhatsApp

        </a>


        <!-- EMAIL -->

        <a
          href="mailto:support@getcredmate.co?subject=Support Request"
          class="support-option"
          @click="closeSupport"
        >

          <span
            class="option-icon option-mail"
          >

            <v-icon size="16">
              mdi-email-outline
            </v-icon>

          </span>

          Email support

        </a>

      </div>

    </transition>

  </Teleport>

</template>


<script setup>

import {
  ref,
  nextTick
} from 'vue'

import {
  useRouter
} from 'vue-router'


const router = useRouter()


// =====================================================
// PROPS
// =====================================================

const props = defineProps({
  drawer: Boolean
})


const emit = defineEmits([
  'update:drawer'
])


const toggleDrawer = () => {

  emit(
    'update:drawer',
    !props.drawer
  )

}


// =====================================================
// USER
// =====================================================

const initials = ref('U')


// =====================================================
// SUPPORT
// =====================================================

const supportOpen = ref(false)

const supportBtnRef = ref(null)

const dropdownStyle = ref({})


const toggleSupport = async () => {

  supportOpen.value =
    !supportOpen.value


  if (supportOpen.value) {

    await nextTick()

    const rect =
      supportBtnRef.value.getBoundingClientRect()


    dropdownStyle.value = {

      top:
        `${rect.bottom + 8}px`,

      right:
        `${window.innerWidth - rect.right}px`

    }

  }

}


const closeSupport = () => {

  supportOpen.value = false

}

</script>


<style scoped>

/* =====================================================
   SUPPORT DROPDOWN
===================================================== */

.support-menu-dropdown {

  position: fixed;

  display: flex;

  flex-direction: column;

  gap: 8px;

  z-index: 100000;

}


/* =====================================================
   SUPPORT OPTION
===================================================== */

.support-option {

  display: flex;

  align-items: center;

  gap: 8px;

  background: #ffffff;

  border: 1px solid #e5e7eb;

  border-radius: 999px;

  padding: 8px 14px 8px 8px;

  font-size: 13px;

  font-weight: 600;

  color: #374151;

  cursor: pointer;

  white-space: nowrap;

  text-decoration: none;

  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.08);

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

}


.support-option:hover {

  transform: translateX(-2px);

  border-color: #bbf7d0;

  color: #16a34a;

  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.1);

}


/* =====================================================
   SUPPORT ICON
===================================================== */

.option-icon {

  width: 28px;

  height: 28px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  color: white;

  flex-shrink: 0;

}


.option-wa {

  background: #16a34a;

}


.option-mail {

  background: #15803d;

}


/* =====================================================
   BACKDROP
===================================================== */

.support-nav-backdrop {

  position: fixed;

  inset: 0;

  z-index: 99999;

}


/* =====================================================
   ANIMATION
===================================================== */

.fab-menu-enter-active,
.fab-menu-leave-active {

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

}


.fab-menu-enter-from,
.fab-menu-leave-to {

  opacity: 0;

  transform: translateY(-6px);

}

</style>