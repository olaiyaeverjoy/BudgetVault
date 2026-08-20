<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { useAppStore } from '@/stores/app.js'
import { useRouter } from 'vue-router'

const app = useAppStore()
const router = useRouter()
const statusItems = [
  { label: 'Bank connection', value: 'Not linked' },
  { label: 'Ownership', value: 'Pending' },
  { label: 'Auto savings', value: 'Off' },
  { label: 'Transaction sync', value: 'Waiting' }
]

const connectWemaBank = () => {
  router.push('/kyc')
}
</script>

<template>
  <MainLayout>
    <div class="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
      <!-- Back button -->
      <button
        type="button"
        @click="app.show('dashboard')"
        class="mb-5 inline-flex h-9 items-center rounded-full border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        ← Dashboard
      </button>

      <!-- Header -->
      <header class="mb-6">
        <div>
          <div class="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#167456]">
            Bank &amp; Cards
          </div>

          <h1
            class="mt-1 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-[26px]"
          >
            Connect your money to your plan.
          </h1>

          <!-- <p
            class="mt-1.5 max-w-xl text-[13px] leading-relaxed text-gray-500"
          >
            Wema Bank is the primary connection in this demo. Other banks can
            enter the wider connection flow.
          </p> -->
        </div>
      </header>

      <!-- Main cards -->
      <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
        <!-- ================================= -->
        <!-- LEFT: WEMA BANK -->
        <!-- ================================= -->
        <section
          class="w-full rounded-[20px] border border-[#eef2f7] bg-white p-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-[22px] lg:flex-[3]"
        >
          <!-- Panel heading -->
          <div class="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 class="text-base font-bold text-gray-900">Wema Bank</h2>

              <span class="text-xs text-gray-500"> Primary bank connection </span>
            </div>

            <span
              class="shrink-0 rounded-md bg-[#dff7ed] px-2.5 py-1 text-[10px] font-bold text-[#167456]"
            >
              Preferred
            </span>
          </div>

          <!-- Bank Card -->
          <!-- Wema / ALAT inspired bank card -->
          <div
            class="relative min-h-[220px] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#071f3d] via-[#073b5c] to-[#00a86b] p-5 text-white shadow-lg sm:min-h-[230px] sm:p-6"
          >
            <!-- Decorative background elements -->
            <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#00c878]/20"></div>

            <div
              class="absolute -bottom-20 -left-12 h-44 w-44 rounded-full border-[25px] border-white/5"
            ></div>

            <div
              class="absolute right-10 bottom-8 h-24 w-24 rounded-full border border-white/10"
            ></div>

            <!-- Card content -->
            <div class="relative z-10">
              <!-- Top section -->
              <div class="flex items-start justify-between gap-3">
                <!-- Wema / ALAT branding -->
                <div class="flex items-center gap-3">
                  <!-- Logo -->
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm"
                  >
                    <span class="text-xl font-black italic tracking-tight text-[#00a86b]"> W </span>
                  </div>

                  <div>
                    <div class="text-sm font-bold tracking-wide">Wema Bank</div>

                    <div class="text-[9px] font-medium uppercase tracking-[0.18em] text-white/60">
                      ALAT
                    </div>
                  </div>
                </div>

                <!-- Contactless -->
                <div class="flex items-center gap-1 text-white/70">
                  <span class="rotate-90 text-lg"> ))) </span>
                </div>
              </div>

              <!-- Chip -->
              <div class="mt-7 flex items-center justify-between">
                <div
                  class="relative h-9 w-12 overflow-hidden rounded-md border border-[#d4b65b]/60 bg-gradient-to-br from-[#f5df91] via-[#c7a94b] to-[#ead276]"
                >
                  <div class="absolute left-1/2 top-0 h-full w-px bg-[#8f7937]/50"></div>

                  <div class="absolute left-0 top-1/2 h-px w-full bg-[#8f7937]/50"></div>

                  <div
                    class="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8f7937]/60"
                  ></div>
                </div>

                <span
                  class="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-medium text-[#d8fff0]"
                >
                  ● Ready to connect
                </span>
              </div>

              <!-- Card number -->
              <div class="mt-5">
                <div class="text-[18px] font-medium tracking-[3px] text-white sm:text-[19px]">
                  •••• •••• •••• 4821
                </div>
              </div>

              <!-- Bottom -->
              <div class="mt-4 flex items-end justify-between">
                <!-- Cardholder -->
                <div>
                  <div class="text-[8px] uppercase tracking-[0.15em] text-white/50">Account</div>

                  <div class="mt-1 text-[11px] font-semibold tracking-wide">BUDGETVAULT USER</div>
                </div>

                <!-- Balance -->
                <div class="text-right">
                  <div class="text-[8px] uppercase tracking-[0.15em] text-white/50">
                    Available balance
                  </div>

                  <div class="mt-1 text-sm font-extrabold tracking-tight text-[#d9fff0]">
                    ₦420,000.00
                  </div>
                </div>
              </div>
            </div>

            <!-- ALAT-inspired green accent -->
            <div
              class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#00a86b] via-[#00d084] to-[#00a86b]"
            ></div>
          </div>
          <!-- Status -->
          <div class="mt-4 grid gap-2">
            <div
              v-for="item in statusItems"
              :key="item.label"
              class="flex items-center justify-between gap-3 rounded-[13px] border border-[#edf0ee] bg-[#f8faf9] px-3.5 py-3 text-xs text-[#56645f]"
            >
              <span>
                {{ item.label }}
              </span>

              <span
                class="shrink-0 rounded-md bg-[#dff7ed] px-2 py-1 text-[10px] font-bold text-[#167456]"
              >
                {{ item.value }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              @click="connectWemaBank"
              class="h-10 w-full rounded-[11px] bg-[#167456] px-4 text-xs font-bold text-white transition hover:bg-[#125f47] sm:w-auto"
            >
              Connect Wema Bank
            </button>

            <button
              type="button"
              @click="app.demoConnect('Wema debit card')"
              class="h-10 w-full rounded-[11px] border border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              Link Wema card
            </button>
          </div>
        </section>

        <!-- ================================= -->
        <!-- RIGHT: WHY CONNECT -->
        <!-- ================================= -->
        <section
          class="w-full rounded-[20px] border border-[#eef2f7] bg-white p-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-[22px] lg:flex-[2]"
        >
          <h3 class="mb-1 text-base font-bold text-gray-900">Why connect?</h3>

          <p class="text-xs leading-[1.55] text-gray-500">
            Connect your bank so BudgetVault can bring your financial picture together and support
            planning, safe-to-spend, savings and automation workflows.
          </p>

          <!-- Debit Card -->
          <div
            class="mt-4 rounded-2xl bg-gradient-to-br from-[#142b27] to-[#0a5140] p-5 text-white"
          >
            <!-- Chip -->
            <div class="mb-[18px] h-[26px] w-[38px] rounded-md bg-[#d8ba43]"></div>

            <!-- Card number -->
            <div class="text-sm tracking-[3px] sm:text-[15px]">•••• •••• •••• 4821</div>

            <!-- Card details -->
            <div class="mt-5 flex justify-between gap-4">
              <div>
                <div class="text-[8px] uppercase tracking-wider text-[#a8c6be]">Cardholder</div>

                <div class="mt-0.5 text-[11px]">DEMO USER</div>
              </div>

              <div class="text-right">
                <div class="text-[8px] uppercase tracking-wider text-[#a8c6be]">Valid thru</div>

                <div class="mt-0.5 text-[11px]">••/••</div>
              </div>
            </div>
          </div>

          <!-- Link card button -->
          <button
            type="button"
            @click="app.demoConnect('Wema debit card')"
            class="mt-3 h-10 w-full rounded-[11px] border border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
          >
            Add / link Wema card
          </button>

          <!-- Other bank -->
          <div class="mt-4 rounded-[14px] border border-[#f4e8bd] bg-[#fffaf0] p-4">
            <strong class="text-xs text-gray-900"> Bank with another institution? </strong>

            <p class="my-1.5 text-[11px] leading-[1.45] text-gray-500">
              Keep Wema as the primary experience and use this CTA for the broader supported-bank
              connection flow.
            </p>

            <button
              type="button"
              @click="window.alert('Demo: open supported banks selector')"
              class="h-10 rounded-[11px] border border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Connect another bank →
            </button>
          </div>
        </section>
      </div>
    </div>
  </MainLayout>
</template>
