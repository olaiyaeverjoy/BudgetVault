<script setup>
import { ref } from 'vue'

const supportOpen = ref(false)
</script>

<template>
  <div class="relative">
    <!-- Contact Button -->
    <button
      type="button"
      class="mr-7 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#FFF3C4] text-[#D4A72C] shadow-sm transition-all duration-200 hover:bg-[#D4A72C] hover:text-white"
      @click.stop="supportOpen = !supportOpen"
      aria-label="Contact"
      :aria-expanded="supportOpen"
    >
      <i class="mdi mdi-phone-outline text-[20px]"></i>
    </button>

    <!-- DROPDOWN -->
    <div
      v-if="supportOpen"
      class="absolute right-7 top-12 z-[9999] w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl"
    >
      <!-- Header -->
      <div class="px-3 py-2">
        <p class="text-[12px] font-bold text-gray-900">Contact us</p>

        <p class="mt-1 text-[10px] leading-relaxed text-gray-500">
          Need help? Get in touch with our team.
        </p>
      </div>

      <div class="my-1 border-t border-gray-100"></div>

      <!-- WhatsApp -->
      <a
        href="https://wa.me/2348084107354"
        target="_blank"
        rel="noopener noreferrer"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 no-underline transition-colors hover:bg-[#FFF8DF]"
        @click="supportOpen = false"
      >
        <span
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white"
        >
          <i class="mdi mdi-whatsapp text-[18px]"></i>
        </span>

        <div>
          <p class="text-[11px] font-bold text-gray-800">WhatsApp</p>

          <p class="text-[9px] text-gray-500">Chat with support</p>
        </div>
      </a>

      <!-- Email -->
      <a
        href="mailto:support@getcredmate.co?subject=Support Request"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 no-underline transition-colors hover:bg-gray-50"
        @click="supportOpen = false"
      >
        <span
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600"
        >
          <i class="mdi mdi-email-outline text-[18px]"></i>
        </span>

        <div>
          <p class="text-[11px] font-bold text-gray-800">Email</p>

          <p class="text-[9px] text-gray-500">Send us an email</p>
        </div>
      </a>

      <!-- Phone -->
      <a
        href="tel:+2348084107354"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 no-underline transition-colors hover:bg-gray-50"
        @click="supportOpen = false"
      >
        <span
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF3C4] text-[#D4A72C]"
        >
          <i class="mdi mdi-phone-outline text-[18px]"></i>
        </span>

        <div>
          <p class="text-[11px] font-bold text-gray-800">Call us</p>

          <p class="text-[9px] text-gray-500">+234 808 410 7354</p>
        </div>
      </a>
    </div>
  </div>
</template>
