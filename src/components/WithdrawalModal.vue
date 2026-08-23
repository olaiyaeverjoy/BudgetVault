<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  balance: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['withdraw', 'close'])

const amount = ref('')
const error = ref('')
const showConsentModal = ref(false)
const modalRef = ref(null)

const formattedAmount = computed(() => {
  const value = Number(amount.value || 0)

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(value)
})

const formattedBalance = computed(() => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(props.balance || 0)
})

/* -----------------------------
   Close withdrawal panel
----------------------------- */
const closeModal = () => {
  showConsentModal.value = false
  amount.value = ''
  error.value = ''

  emit('close')
}

const useMaxBalance = () => {
  if (props.balance <= 0) return
  amount.value = props.balance
  error.value = ''
}

/* -----------------------------
   Open consent popup
----------------------------- */
const openConsentModal = () => {
  error.value = ''
  const withdrawalAmount = Number(amount.value)

  if (!withdrawalAmount || withdrawalAmount <= 0) {
    error.value = 'Please enter a valid withdrawal amount.'
    return
  }
  if (withdrawalAmount > props.balance) {
    error.value = `Amount exceeds your available balance of ${formattedBalance.value}.`
    return
  }

  showConsentModal.value = true
}

/* -----------------------------
   Close consent popup
----------------------------- */
const closeConsentModal = () => {
  showConsentModal.value = false
}

/* -----------------------------
   Confirm withdrawal
----------------------------- */
const proceedToWithdraw = () => {
  const withdrawalAmount = Number(amount.value)

  if (!withdrawalAmount || withdrawalAmount <= 0 || withdrawalAmount > props.balance) {
    showConsentModal.value = false
    error.value = 'Please enter a valid withdrawal amount.'
    return
  }

  emit('withdraw', { amount: withdrawalAmount })
  closeModal()
}

/* -----------------------------
   Close when clicking outside
----------------------------- */
const handleClickOutside = (event) => {
  if (!modalRef.value) return

  if (!modalRef.value.contains(event.target) && !showConsentModal.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <!-- Withdrawal Panel -->
  <Transition name="dropdown">
    <div
      ref="modalRef"
      class="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-start justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 class="text-base font-bold text-gray-900">Withdraw Money</h2>
          <p class="mt-1 text-xs leading-5 text-gray-500">
            Enter the amount you would like to withdraw.
          </p>
        </div>

        <!-- Close -->
        <button
          type="button"
          aria-label="Close withdrawal"
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 active:scale-95"
          @click.stop="closeModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="space-y-5 px-5 py-5">
        <!-- Amount -->
        <div>
          <div class="mb-2 flex items-center justify-between gap-2">
            <label for="withdrawAmount" class="block text-sm font-semibold text-gray-800">
              Withdrawal Amount
            </label>

            <button
              type="button"
              :disabled="balance <= 0"
              class="text-xs font-bold text-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:text-gray-300"
              @click="useMaxBalance"
            >
              Use max
            </button>
          </div>

          <div class="relative">
            <span
              class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500"
            >
              ₦
            </span>

            <input
              id="withdrawAmount"
              v-model.number="amount"
              type="number"
              min="1"
              step="1000"
              inputmode="numeric"
              placeholder="0"
              class="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-8 pr-4 text-sm font-semibold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <div class="mt-2 flex items-center justify-between">
            <span class="text-xs text-gray-500">
              Available: <span class="font-semibold text-gray-700">{{ formattedBalance }}</span>
            </span>

            <span class="text-xs font-bold text-emerald-600">
              {{ formattedAmount }}
            </span>
          </div>
        </div>

        <!-- Information -->
        <div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div class="flex items-start gap-3">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l2.5 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

            <div>
              <p class="text-sm font-semibold text-gray-800">Review before withdrawing</p>

              <p class="mt-1 text-xs leading-5 text-gray-500">
                You will be asked to confirm this withdrawal before it is processed.
              </p>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600"
        >
          {{ error }}
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-100 bg-gray-50 px-5 py-4">
        <button
          type="button"
          :disabled="balance <= 0"
          class="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          @click="openConsentModal"
        >
          Withdraw
        </button>
      </div>
    </div>
  </Transition>

  <!-- =========================================
       PROFESSIONAL CONSENT MODAL
  ========================================== -->
  <Teleport to="body">
    <Transition name="consent">
      <div
        v-if="showConsentModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950/50 p-4 backdrop-blur-sm"
        @click.self="closeConsentModal"
      >
        <div
          class="w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="withdraw-title"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="px-6 pt-6">
            <div class="flex items-start justify-between">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </div>

              <button
                type="button"
                aria-label="Close confirmation"
                class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                @click="closeConsentModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <h3 id="withdraw-title" class="mt-5 text-xl font-bold tracking-tight text-gray-900">
              Confirm Withdrawal
            </h3>

            <p class="mt-2 text-sm leading-6 text-gray-500">
              Please review the withdrawal details below before continuing.
            </p>
          </div>

          <!-- Amount Card -->
          <div class="px-6 py-5">
            <div class="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <p class="text-xs font-medium uppercase tracking-wide text-emerald-700">
                Withdrawal Amount
              </p>

              <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {{ formattedAmount }}
              </p>

              <p class="mt-2 text-xs leading-5 text-gray-500">
                This amount will be submitted for withdrawal.
              </p>
            </div>

            <!-- Consent Notice -->
            <div class="mt-4 flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.5M12 16h.01M10.3 4.6 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0Z"
                />
              </svg>

              <p class="text-xs leading-5 text-amber-800">
                By proceeding, you confirm that you have reviewed the amount and want to continue
                with this withdrawal.
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-2 border-t border-gray-100 bg-gray-50 px-6 py-5">
            <button
              type="button"
              class="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md active:scale-[0.98]"
              @click="proceedToWithdraw"
            >
              Proceed to Withdraw
            </button>

            <button
              type="button"
              class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 active:scale-[0.98]"
              @click="closeConsentModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.consent-enter-active,
.consent-leave-active {
  transition: opacity 0.2s ease;
}

.consent-enter-active > div,
.consent-leave-active > div {
  transition: transform 0.2s ease;
}

.consent-enter-from,
.consent-leave-to {
  opacity: 0;
}

.consent-enter-from > div,
.consent-leave-to > div {
  transform: translateY(10px) scale(0.97);
}
</style>