<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  initialBudget: {
    type: Number,
    default: 0
  },
  initialSchedule: {
    type: String,
    default: '1-7'
  },
  initialAutoRenew: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

const amount = ref(props.initialBudget)
const schedule = ref(props.initialSchedule)
const autoRenew = ref(props.initialAutoRenew)
const error = ref('')
const dropdownRef = ref(null)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      amount.value = props.initialBudget
      schedule.value = props.initialSchedule
      autoRenew.value = props.initialAutoRenew
      error.value = ''
    }
  }
)

const formattedAmount = computed(() => {
  if (!amount.value) return '₦0'

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount.value)
})

const closeModal = () => {
  isOpen.value = false
  error.value = ''
}

const saveBudgetSettings = () => {
  error.value = ''

  if (!amount.value || amount.value <= 0) {
    error.value = 'Please enter a valid budget amount.'
    return
  }

  emit('save', {
    amount: Number(amount.value),
    schedule: schedule.value,
    autoRenew: autoRenew.value
  })

  closeModal()
}

// Close only when clicking truly outside
const handleClickOutside = (e) => {
  if (!isOpen.value) return
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    closeModal()
  }
}

onMounted(() => {
  // Use capture so it works reliably
  document.addEventListener('click', handleClickOutside, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside, true)
})
</script>

<template>
  <Transition name="dropdown">
    <div
      v-if="isOpen"
      ref="dropdownRef"
      class="absolute right-0 top-full z-50 mt-2 w-[min(100vw-1.5rem,22rem)] origin-top-right overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl sm:w-96"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-start justify-between gap-2 border-b border-gray-100 px-3 py-3">
        <div class="min-w-0">
          <h2 class="text-base font-bold text-gray-900">Edit Budget</h2>
          <p class="mt-0.5 text-xs text-gray-500">Update your monthly budget settings.</p>
        </div>

        <button
          type="button"
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          @click="closeModal"
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="max-h-[70vh] space-y-4 overflow-y-auto px-3 py-4">
        <!-- Budget Amount -->
        <div>
          <label for="budgetAmount" class="mb-1.5 block text-sm font-semibold text-gray-800">
            Monthly Budget Amount
          </label>

          <div class="relative">
            <span
              class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500"
            >
              ₦
            </span>

            <input
              id="budgetAmount"
              v-model.number="amount"
              type="number"
              min="1"
              step="1000"
              inputmode="numeric"
              placeholder="Enter budget amount"
              class="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-8 pr-3 text-sm font-semibold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <div class="mt-1.5 flex flex-col gap-0.5 xs:flex-row xs:items-center xs:justify-between">
            <p class="text-xs text-gray-500">Amount set aside each month.</p>
            <span class="text-xs font-semibold text-emerald-600">
              {{ formattedAmount }}
            </span>
          </div>
        </div>

        <!-- Withdrawal Schedule -->
        <div>
          <div class="mb-2">
            <h3 class="text-sm font-semibold text-gray-800">Withdrawal Schedule</h3>
            <p class="mt-0.5 text-xs text-gray-500">
              When the monthly budget should be withdrawn.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-2.5 xs:grid-cols-2">
            <!-- 1–7 -->
            <label class="relative cursor-pointer">
              <input v-model="schedule" type="radio" value="1-7" class="peer sr-only" />
              <div
                class="rounded-xl border border-gray-200 bg-white p-3 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:ring-2 peer-checked:ring-emerald-500/10 hover:border-gray-300"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-gray-900">1–7 days</p>
                    <p class="mt-0.5 text-xs leading-4 text-gray-500">
                      Beginning of each month
                    </p>
                  </div>
                  <div
                    class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300 peer-checked:border-emerald-500"
                  >
                    <div
                      v-if="schedule === '1-7'"
                      class="h-2 w-2 rounded-full bg-emerald-500"
                    ></div>
                  </div>
                </div>
              </div>
            </label>

            <!-- 7–12 -->
            <label class="relative cursor-pointer">
              <input v-model="schedule" type="radio" value="7-12" class="peer sr-only" />
              <div
                class="rounded-xl border border-gray-200 bg-white p-3 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:ring-2 peer-checked:ring-emerald-500/10 hover:border-gray-300"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-gray-900">7–12 days</p>
                    <p class="mt-0.5 text-xs leading-4 text-gray-500">
                      First half of the month
                    </p>
                  </div>
                  <div
                    class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300"
                  >
                    <div
                      v-if="schedule === '7-12'"
                      class="h-2 w-2 rounded-full bg-emerald-500"
                    ></div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Auto Renewal -->
        <div
          class="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
        >
          <div class="min-w-0">
            <h3 class="text-sm font-semibold text-gray-900">Auto-Renewal</h3>
            <p class="mt-0.5 text-xs leading-4 text-gray-500">
              Automatically renew this budget every month.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            :aria-checked="autoRenew"
            class="relative h-5 w-9 shrink-0 rounded-full transition-colors"
            :class="autoRenew ? 'bg-emerald-500' : 'bg-gray-300'"
            @click="autoRenew = !autoRenew"
          >
            <span
              class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
              :class="autoRenew ? 'translate-x-4' : 'translate-x-0.5'"
            ></span>
          </button>
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600"
        >
          {{ error }}
        </div>
      </div>

      <!-- Footer -->
      <div class="flex flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50 px-3 py-3 sm:flex-row sm:justify-end sm:gap-2">
        <button
          type="button"
          class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
          @click="closeModal"
        >
          Cancel
        </button>

        <button
          type="button"
          class="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
          @click="saveBudgetSettings"
        >
          Save
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>