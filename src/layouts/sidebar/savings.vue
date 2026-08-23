<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref, computed } from 'vue'
import { useSavingsStore } from '@/stores/SavingsStore.js'

const savingsStore = useSavingsStore()

/*
|--------------------------------------------------------------------------
| Existing User Accounts
|--------------------------------------------------------------------------
| Replace with your account store later if you already have one.
|--------------------------------------------------------------------------
*/

const userAccounts = ref([
  {
    id: 1,
    bankName: 'GTBank',
    maskedAccount: '•••• 4821'
  },
  {
    id: 2,
    bankName: 'Access Bank',
    maskedAccount: '•••• 1937'
  },
  {
    id: 3,
    bankName: 'Opay',
    maskedAccount: '•••• 7604'
  }
])

/*
|--------------------------------------------------------------------------
| Modal State
|--------------------------------------------------------------------------
*/

const addMoneyDialog = ref(false)
const withdrawDialog = ref(false)

const addAmount = ref(null)
const addNote = ref('')

const withdrawAmount = ref(null)
const withdrawNote = ref('')
const selectedAccount = ref(null)

const saving = ref(false)

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

const showFilter = ref(false)
const activeFilter = ref('all')

const filters = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Added',
    value: 'deposit'
  },
  {
    label: 'Withdrawals',
    value: 'withdrawal'
  }
]

/*
|--------------------------------------------------------------------------
| Snackbar
|--------------------------------------------------------------------------
*/

const snackbar = ref({
  show: false,
  message: ''
})

/*
|--------------------------------------------------------------------------
| Computed
|--------------------------------------------------------------------------
*/

const formattedSavings = computed(() =>
  formatCurrency(savingsStore.totalSavings)
)

const filteredTransactions = computed(() => {
  if (activeFilter.value === 'all') {
    return savingsStore.transactions
  }

  return savingsStore.transactions.filter(
    (transaction) => transaction.type === activeFilter.value
  )
})

/*
|--------------------------------------------------------------------------
| Formatting
|--------------------------------------------------------------------------
*/

function formatCurrency(value) {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value) || 0)
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(date))
}

/*
|--------------------------------------------------------------------------
| Add Money
|--------------------------------------------------------------------------
*/

function openAddMoney() {
  addAmount.value = null
  addNote.value = ''
  addMoneyDialog.value = true
}

function closeAddMoney() {
  addMoneyDialog.value = false
}

async function addMoney() {
  const amount = Number(addAmount.value)

  if (!amount || amount <= 0) {
    return
  }

  saving.value = true

  try {
    const success = savingsStore.addMoney(
      amount,
      addNote.value.trim() || 'Money added'
    )

    if (!success) {
      return
    }

    closeAddMoney()

    showSnackbar('Money successfully added to your savings.')
  } finally {
    saving.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Withdraw Money
|--------------------------------------------------------------------------
*/

function openWithdraw() {
  withdrawAmount.value = null
  withdrawNote.value = ''
  selectedAccount.value = null

  withdrawDialog.value = true
}

function closeWithdraw() {
  withdrawDialog.value = false
}

async function withdrawMoney() {
  const amount = Number(withdrawAmount.value)

  if (
    !selectedAccount.value ||
    !amount ||
    amount <= 0 ||
    amount > savingsStore.totalSavings
  ) {
    return
  }

  saving.value = true

  try {
    const success = savingsStore.withdrawMoney(
      amount,
      selectedAccount.value,
      withdrawNote.value.trim() || 'Money withdrawn'
    )

    if (!success) {
      return
    }

    closeWithdraw()

    showSnackbar('Withdrawal successfully processed.')
  } finally {
    saving.value = false
  }
}

/*
|--------------------------------------------------------------------------
| Snackbar
|--------------------------------------------------------------------------
*/

function showSnackbar(message) {
  snackbar.value = {
    show: true,
    message
  }

  setTimeout(() => {
    snackbar.value.show = false
  }, 3000)
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-[#f7f5f0] px-4 py-6 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">

        <!-- ====================================================== -->
        <!-- PAGE HEADER -->
        <!-- ====================================================== -->

        <div class="mb-8">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Savings
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Manage your savings and track your savings activity.
          </p>
        </div>

        <!-- ====================================================== -->
        <!-- TOP SECTION -->
        <!-- ====================================================== -->

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">

          <!-- ==================================================== -->
          <!-- TOTAL SAVINGS -->
          <!-- ==================================================== -->

          <div
            class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:col-span-7"
          >
            <div class="p-6 sm:p-8">

              <!-- Header -->

              <div class="flex items-center justify-between">
                <div class="flex items-center">

                  <!-- BudgetVault Logo -->

                  <div
                    class="flex h-20 w-20 shrink-0 items-center justify-center"
                  >
                    <img
                      src="@/assets/budgetlogo.png"
                      alt="BudgetVault Logo"
                      class="h-20 w-auto object-contain"
                    />
                  </div>

                  <!-- Savings Text -->

                  <div class="-ml-1">
                    <p class="text-sm font-medium text-gray-500">
                      Total Savings
                    </p>

                    <p class="mt-1 text-sm text-gray-400">
                      Current savings balance
                    </p>
                  </div>
                </div>

                <!-- Menu Button -->

                <button
                  type="button"
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f5f0] text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Savings options"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12h.01M12 12h.01M18 12h.01"
                    />
                  </svg>
                </button>
              </div>

              <!-- Balance -->

              <div class="mt-8">
                <p
                  class="text-4xl font-extrabold tracking-tight text-green-900 sm:text-5xl"
                >
                  <span
                    class="mr-1 text-3xl font-semibold text-gray-400"
                  >
                    ₦
                  </span>

                  {{ formattedSavings }}
                </p>
              </div>

              <!-- Actions -->

              <div class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <!-- Add Money -->

                <button
                  type="button"
                  @click="openAddMoney"
                  class="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f7f5f0] px-5 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 active:scale-[0.98]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>

                  Add Money
                </button>

                <!-- Withdraw -->

                <button
                  type="button"
                  @click="openWithdraw"
                  :disabled="savingsStore.totalSavings <= 0"
                  class="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f7f5f0] px-5 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 19L19 5M19 5h-6M19 5v6"
                    />
                  </svg>

                  Withdraw Money
                </button>

              </div>
            </div>
          </div>

          <!-- ==================================================== -->
          <!-- SAVINGS ACTIVITY -->
          <!-- ==================================================== -->

          <div
            class="rounded-3xl border border-gray-200 bg-white shadow-sm lg:col-span-5"
          >
            <div class="p-6 sm:p-8">

              <!-- Activity Header -->

              <div class="mb-7 flex items-center gap-4">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f5f0]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 3v18h18"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 16l4-4 3 3 5-7"
                    />
                  </svg>
                </div>

                <div>
                  <h2 class="text-base font-bold text-gray-900">
                    Savings Activity
                  </h2>

                  <p class="mt-0.5 text-xs text-gray-400">
                    Your savings movement
                  </p>
                </div>
              </div>

              <!-- Money Added -->

              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-400">
                    Money Added
                  </p>

                  <p class="mt-1 text-base font-bold text-gray-900">
                    ₦{{ formatCurrency(savingsStore.totalAdded) }}
                  </p>
                </div>

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600"
                >
                  ↓
                </div>
              </div>

              <div class="my-5 border-t border-gray-100"></div>

              <!-- Money Withdrawn -->

              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-400">
                    Money Withdrawn
                  </p>

                  <p class="mt-1 text-base font-bold text-gray-900">
                    ₦{{ formatCurrency(savingsStore.totalWithdrawn) }}
                  </p>
                </div>

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600"
                >
                  ↑
                </div>
              </div>

              <div class="my-5 border-t border-gray-100"></div>

              <!-- Transactions -->

              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-400">
                    Transactions
                  </p>

                  <p class="mt-1 text-base font-bold text-gray-900">
                    {{ savingsStore.transactions.length }}
                  </p>
                </div>

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f5f0] text-gray-700"
                >
                  ↕
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ====================================================== -->
        <!-- TRANSACTION HISTORY -->
        <!-- ====================================================== -->

        <div
          class="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
        >

          <!-- History Header -->

          <div
            class="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-lg font-bold text-gray-900">
                Savings Transaction History
              </h2>

              <p class="mt-1 text-xs text-gray-400">
                All deposits and withdrawals from your savings.
              </p>
            </div>

            <button
              type="button"
              @click="showFilter = !showFilter"
              class="flex h-10 items-center justify-center gap-2 self-start rounded-xl bg-[#f7f5f0] px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 4h18M6 10h12M10 16h4M12 22v-6"
                />
              </svg>

              Filter
            </button>
          </div>

          <!-- Filters -->

          <div
            v-if="showFilter"
            class="border-b border-gray-100 bg-[#f7f5f0]/50 px-6 py-4"
          >
            <div class="flex flex-wrap gap-2">

              <button
                v-for="filter in filters"
                :key="filter.value"
                type="button"
                @click="activeFilter = filter.value"
                class="rounded-lg px-4 py-2 text-sm font-medium transition"
                :class="
                  activeFilter === filter.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                "
              >
                {{ filter.label }}
              </button>

            </div>
          </div>

          <!-- Empty State -->

          <div
            v-if="filteredTransactions.length === 0"
            class="flex min-h-[280px] flex-col items-center justify-center px-6 text-center"
          >
            <div
              class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f7f5f0]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 10h18M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
            </div>

            <h3 class="text-sm font-bold text-gray-900">
              No savings transactions yet
            </h3>

            <p class="mt-2 max-w-sm text-sm text-gray-400">
              Your savings deposits and withdrawals will appear here.
            </p>
          </div>

          <!-- Transactions -->

          <div v-else>
            <div
              v-for="transaction in filteredTransactions"
              :key="transaction.id"
              class="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-5 transition last:border-b-0 hover:bg-gray-50"
            >

              <!-- Transaction Details -->

              <div class="flex min-w-0 items-center gap-4">

                <!-- Icon -->

                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  :class="
                    transaction.type === 'deposit'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-red-600'
                  "
                >

                  <!-- Deposit -->

                  <svg
                    v-if="transaction.type === 'deposit'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 19V5m0 0l-6 6m6-6l6 6"
                    />
                  </svg>

                  <!-- Withdrawal -->

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 5v14m0 0l6-6m-6 6l-6-6"
                    />
                  </svg>

                </div>

                <!-- Details -->

                <div class="min-w-0">
                  <p
                    class="truncate text-sm font-semibold text-gray-900"
                  >
                    {{ transaction.description }}
                  </p>

                  <p class="mt-1 text-xs text-gray-400">
                    {{ formatDate(transaction.date) }}
                  </p>

                  <p
                    v-if="transaction.method"
                    class="mt-0.5 truncate text-xs text-gray-400"
                  >
                    {{ transaction.method }}
                  </p>
                </div>

              </div>

              <!-- Amount -->

              <p
                class="shrink-0 text-sm font-bold"
                :class="
                  transaction.type === 'deposit'
                    ? 'text-green-600'
                    : 'text-red-600'
                "
              >
                {{ transaction.type === 'deposit' ? '+' : '-' }}
                ₦{{ formatCurrency(transaction.amount) }}
              </p>

            </div>
          </div>

        </div>
      </div>

      <!-- ====================================================== -->
      <!-- ADD MONEY MODAL -->
      <!-- ====================================================== -->

      <Transition name="modal">
        <div
          v-if="addMoneyDialog"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          @click.self="closeAddMoney"
        >
          <div
            class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >

            <!-- Header -->

            <div class="flex items-center justify-between p-6">

              <div class="flex items-center gap-3">

                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f5f0]"
                >
                  <span class="text-xl font-semibold text-gray-700">
                    +
                  </span>
                </div>

                <div>
                  <h2 class="text-lg font-bold text-gray-900">
                    Add Money
                  </h2>

                  <p class="mt-0.5 text-xs text-gray-400">
                    Add money to your savings
                  </p>
                </div>

              </div>

              <button
                type="button"
                @click="closeAddMoney"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#f7f5f0] hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>

            </div>

            <div class="border-t border-gray-100"></div>

            <!-- Form -->

            <div class="space-y-5 p-6">

              <!-- Amount -->

              <div>
                <label
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>

                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400"
                  >
                    ₦
                  </span>

                  <input
                    v-model.number="addAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    class="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>
              </div>

              <!-- Note -->

              <div>
                <label
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Note
                  <span class="font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  v-model="addNote"
                  rows="3"
                  placeholder="Add a note..."
                  class="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                ></textarea>
              </div>

            </div>

            <!-- Footer -->

            <div
              class="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 p-6"
            >
              <button
                type="button"
                @click="closeAddMoney"
                class="rounded-xl px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                @click="addMoney"
                :disabled="
                  !addAmount ||
                  Number(addAmount) <= 0 ||
                  saving
                "
                class="rounded-xl bg-[#f7f5f0] px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {{ saving ? 'Adding...' : 'Add Money' }}
              </button>
            </div>

          </div>
        </div>
      </Transition>

      <!-- ====================================================== -->
      <!-- WITHDRAW MONEY MODAL -->
      <!-- ====================================================== -->

      <Transition name="modal">
        <div
          v-if="withdrawDialog"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          @click.self="closeWithdraw"
        >
          <div
            class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >

            <!-- Header -->

            <div class="flex items-center justify-between p-6">

              <div class="flex items-center gap-3">

                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f5f0]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 19L19 5m0 0h-6m6 0v6"
                    />
                  </svg>
                </div>

                <div>
                  <h2 class="text-lg font-bold text-gray-900">
                    Withdraw Money
                  </h2>

                  <p class="mt-0.5 text-xs text-gray-400">
                    Withdraw from your savings
                  </p>
                </div>

              </div>

              <button
                type="button"
                @click="closeWithdraw"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#f7f5f0] hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>

            </div>

            <div class="border-t border-gray-100"></div>

            <!-- Form -->

            <div class="space-y-5 p-6">

              <!-- Available Balance -->

              <div
                class="rounded-2xl border border-gray-100 bg-[#f7f5f0] p-4"
              >
                <p class="text-xs font-medium text-gray-500">
                  Available Savings
                </p>

                <p class="mt-1 text-2xl font-bold text-gray-900">
                  ₦{{ formattedSavings }}
                </p>
              </div>

              <!-- Withdrawal Method -->

              <div>
                <label
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Withdrawal Method
                </label>

                <select
                  v-model="selectedAccount"
                  class="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                >
                  <option :value="null" disabled>
                    Select bank or account
                  </option>

                  <option
                    v-for="account in userAccounts"
                    :key="account.id"
                    :value="account"
                  >
                    {{ account.bankName }}
                    {{ account.maskedAccount }}
                  </option>
                </select>
              </div>

              <!-- Amount -->

              <div>
                <label
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>

                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400"
                  >
                    ₦
                  </span>

                  <input
                    v-model.number="withdrawAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    :max="savingsStore.totalSavings"
                    placeholder="0.00"
                    class="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>
              </div>

              <!-- Note -->

              <div>
                <label
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Note
                  <span class="font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  v-model="withdrawNote"
                  rows="3"
                  placeholder="Add a note..."
                  class="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                ></textarea>
              </div>

              <!-- Error -->

              <div
                v-if="Number(withdrawAmount) > savingsStore.totalSavings"
                class="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                Withdrawal amount cannot exceed your available savings.
              </div>

            </div>

            <!-- Footer -->

            <div
              class="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 p-6"
            >
              <button
                type="button"
                @click="closeWithdraw"
                class="rounded-xl px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                @click="withdrawMoney"
                :disabled="
                  !selectedAccount ||
                  !withdrawAmount ||
                  Number(withdrawAmount) <= 0 ||
                  Number(withdrawAmount) > savingsStore.totalSavings ||
                  saving
                "
                class="rounded-xl bg-[#f7f5f0] px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {{ saving ? 'Processing...' : 'Withdraw Money' }}
              </button>
            </div>

          </div>
        </div>
      </Transition>

      <!-- ====================================================== -->
      <!-- SNACKBAR -->
      <!-- ====================================================== -->

      <Transition name="toast">
        <div
          v-if="snackbar.show"
          class="fixed bottom-6 right-6 z-[60] max-w-sm rounded-2xl bg-gray-900 px-5 py-4 text-sm font-medium text-white shadow-xl"
        >
          <div class="flex items-center gap-3">

            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-sm"
            >
              ✓
            </div>

            {{ snackbar.message }}

          </div>
        </div>
      </Transition>

    </div>
  </MainLayout>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.96) translateY(8px);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>