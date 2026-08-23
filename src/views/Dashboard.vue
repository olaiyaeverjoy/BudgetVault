<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import StatCard from '@/components/StatCard.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import BudgetListItem from '@/components/BudgetListItem.vue'
import AddBudgetModal from '@/components/AddBudgetModal.vue'
import BudgetDetailModal from '@/components/BudgetDetailModal.vue'
import WithdrawalModal from '@/components/WithdrawalModal.vue'
import TransactionHistoryCard from '@/components/TransactionHistoryCard.vue'
import { useAppStore } from '@/stores/app'
import { useBudgetStore } from '@/stores/budgets'
import { useSavingsStore } from '@/stores/SavingsStore'
import { useBudgetSettingsStore } from '@/stores/budgetSettings'
import { useTransactionsStore } from '@/stores/transactions'
import { useGoalsStore } from '@/stores/goals'
// import { useTransactionsStore } from '@/stores/transactions'

const app = useAppStore()
const router = useRouter()
const budgetStore = useBudgetStore()
const savingsStore = useSavingsStore()
const budgetSettingsStore = useBudgetSettingsStore()
const transactionsStore = useTransactionsStore()
const goalsStore = useGoalsStore()
// const transactionsStore = useTransactionsStore()

const goToFinancialGPS = () => router.push('/financialgps')
const goToAiCoach = () => router.push('/aicoach')
const goToBudgetPlanner = () => router.push('/budgetplanner')

function handleFilter() {
  // TODO: wire up your filter UI here
}

function settleFromDashboard(bill) {
  const result = budgetStore.settleBudget(bill.id)
  if (!result) return

  transactionsStore.addTransaction({
    icon: '⚡',
    name: `${bill.name} settled`,
    subtitle: `Cycle ${bill.cycle} · Bill settlement`,
    amount: -result.settledAmount
  })

  app.showToast(`${bill.name} settled — new cycle started`)
}
/* ---------------- Withdrawal ---------------- */

const showWithdrawalModal = ref(false)

const withdrawalPercent = computed(() => {
  const budget = budgetSettingsStore.amount
  const withdrawn = budgetSettingsStore.withdrawn
  if (!budget) return 0
  return Math.round((withdrawn / budget) * 100)
})

const toggleWithdrawal = () => {
  showWithdrawalModal.value = !showWithdrawalModal.value
}

const closeWithdrawalModal = () => {
  showWithdrawalModal.value = false
}

const handleWithdrawal = ({ amount }) => {
  const success = budgetSettingsStore.recordWithdrawal(amount)

  if (!success) {
    app.showToast('Withdrawal failed — amount exceeds available balance')
    return
  }

  app.showToast(`${budgetStore.formatNaira(amount)} withdrawal requested successfully`)
  showWithdrawalModal.value = false
}

/* ---------------- Settle Budget ---------------- */
const showSettleBudget = ref(false)
const toggleSettleBudget = () => {
  showSettleBudget.value = !showSettleBudget.value
}

// function settleFromDashboard(bill) {
//   const result = budgetStore.settleBudget(bill.id)
//   if (!result) return
//   app.showToast(`${bill.name} settled — new cycle started`)
// }

/* ---------------- Budgets preview list ---------------- */
const visibleBudgets = computed(() => budgetStore.budgets.slice(0, 4))
const hiddenBudgetCount = computed(() => Math.max(0, budgetStore.budgets.length - 4))

const showAddBudgetModal = ref(false)
function openAddBudgetModal() {
  showAddBudgetModal.value = true
}

function createBudget(payload) {
  const budget = budgetStore.createBudget(payload)
  if (!budget) {
    app.showToast('Enter a valid budget name and amount')
    return
  }
  app.showToast(`"${budget.name}" budget created`)
  showAddBudgetModal.value = false
}

const showBudgetDetailModal = ref(false)
const selectedBudget = ref(null)

function openBudgetDetail(b) {
  selectedBudget.value = b
  showBudgetDetailModal.value = true
}

function handleAddMoney(id, amt) {
  const b = budgetStore.addMoney(id, amt)
  if (!b) return
  app.showToast(`₦${amt.toLocaleString()} added to "${b.name}"`)
}

/* ---------------- Upcoming settlements preview ---------------- */
const visibleUpcomingBills = computed(() => budgetStore.eligibleBills.slice(0, 4))
const hiddenUpcomingBillCount = computed(() => Math.max(0, budgetStore.eligibleBills.length - 4))

/* ---------------- Budget plan (Needs / Wants / Savings) ---------------- */

// Needs: combined progress across every budget in Budget Planner
const needsPercent = computed(() => {
  if (!budgetStore.totalBudgetTarget) return 0
  return Math.min(
    100,
    Math.round((budgetStore.totalAllocation / budgetStore.totalBudgetTarget) * 100)
  )
})

// Wants: combined progress across every goal in Goals & Dreams
const wantsPercent = computed(() => goalsStore.percent)

// Savings: how much of what's been added is still sitting in savings
const savingsPercent = computed(() => {
  if (!savingsStore.totalAdded) return 0
  return Math.min(100, Math.round((savingsStore.totalSavings / savingsStore.totalAdded) * 100))
})

// const handleWithdrawal = ({ amount }) => {
//   const success = budgetSettingsStore.recordWithdrawal(amount)

//   if (!success) {
//     app.showToast('Withdrawal failed — amount exceeds available balance')
//     return
//   }

//   transactionsStore.addTransaction({
//     icon: '💸',
//     name: 'Withdrawal',
//     subtitle: 'Budget withdrawal',
//     amount: -amount
//   })

//   app.showToast(`${budgetStore.formatNaira(amount)} withdrawal requested successfully`)
//   showWithdrawalModal.value = false
// }

// function handleAddMoney(id, amt) {
//   const b = budgetStore.addMoney(id, amt)
//   if (!b) return

//   transactionsStore.addTransaction({
//     icon: '💰',
//     name: `Added to "${b.name}"`,
//     subtitle: 'Budget contribution',
//     amount: -amt
//   })

//   app.showToast(`₦${amt.toLocaleString()} added to "${b.name}"`)
// }
</script>

<template>
  <MainLayout>
    <div class="mx-auto w-full max-w-[1600px]">
      <!-- ========================================================= -->
      <!-- PAGE HEADER -->
      <!-- ========================================================= -->
      <header class="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-bvgreen2">
            Monday, May 11, 2026
          </div>

          <h1 class="text-[26px] font-bold tracking-[-0.025em] text-[#14231e] sm:text-[30px]">
            Good evening, Oladimeji.
          </h1>

          <p class="mt-1.5 max-w-[620px] text-[13px] leading-5 text-bvmuted">
            Here's your financial picture today. You have
            <strong class="font-bold text-[#25352f]">20 days</strong>
            left in your current budget cycle.
          </p>
        </div>

        <!-- Actions — Withdrawal stacked above Settle Budget -->
        <div class="flex w-full flex-col gap-2.5 sm:w-auto">
          <!-- Withdrawal -->
          <div class="relative w-full sm:w-auto">
            <button
              type="button"
              @click="toggleWithdrawal"
              class="flex w-full items-center justify-center gap-2 rounded-[11px] bg-gold px-4 py-2.5 text-[12px] font-bold text-[#17382e] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-auto"
            >
              <span class="text-[13px]">💸</span>
              Withdrawal
            </button>

            <WithdrawalModal
              v-if="showWithdrawalModal"
              :balance="budgetSettingsStore.remainingBalance"
              @close="closeWithdrawalModal"
              @withdraw="handleWithdrawal"
            />
          </div>

          <!-- Settle Budget -->
          <div class="relative w-full sm:w-auto">
            <button
              type="button"
              @click="toggleSettleBudget"
              class="flex w-full items-center justify-center gap-2 rounded-[11px] bg-gold px-4 py-2.5 text-[12px] font-bold text-[#17382e] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-auto"
            >
              <span class="text-[13px]">⚡</span>
              Settle Budget
            </button>

            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 -translate-y-2 scale-95"
            >
              <div
                v-if="showSettleBudget"
                class="absolute right-0 top-full z-40 mt-3 w-[320px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[16px] border border-[#e8ece9] bg-white shadow-2xl"
              >
                <div class="border-b border-[#edf0ee] px-4 py-3.5">
                  <div class="text-[13px] font-bold text-[#17241f]">Settle budget</div>
                  <div class="mt-0.5 text-[11px] text-bvmuted">
                    Bills that are fully funded and ready to settle.
                  </div>
                </div>

                <div class="max-h-[320px] space-y-2.5 overflow-y-auto p-3">
                  <div
                    v-for="bill in budgetStore.eligibleBills"
                    :key="bill.id"
                    class="rounded-[12px] bg-[#f7faf8] p-3.5"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <div class="min-w-0">
                        <div class="text-[12px] font-bold text-[#17241f] truncate">
                          {{ bill.name }}
                        </div>
                        <div class="mt-0.5 text-[10px] text-bvmuted">Cycle {{ bill.cycle }}</div>
                      </div>
                      <strong class="shrink-0 text-[13px] text-[#17382e]">
                        {{ budgetStore.formatNaira(bill.amount) }}
                      </strong>
                    </div>

                    <button
                      type="button"
                      @click="settleFromDashboard(bill)"
                      class="mt-2.5 w-full rounded-[10px] bg-[#17382e] py-2 text-[11px] font-bold text-white transition hover:bg-[#20513f]"
                    >
                      Settle
                    </button>
                  </div>

                  <p
                    v-if="!budgetStore.eligibleBills.length"
                    class="py-4 text-center text-[11px] text-bvmuted"
                  >
                    No bills are fully funded yet.
                  </p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- ========================================================= -->
      <!-- SUMMARY CARDS -->
      <!-- ========================================================= -->
      <section class="mb-[18px] grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Account Balance" value="₦850,000" meta="Next income in 8 days" />

        <StatCard
          label="Withdrawn"
          :value="budgetSettingsStore.formattedWithdrawn"
          valueClass="text-[#168064]"
        >
          <template #meta>
            <span class="font-bold text-[#1b8a6a]">{{ withdrawalPercent }}%</span>
            of budget withdrawn
          </template>
        </StatCard>

        <StatCard
          label="Unsettled Debt"
          :value="budgetStore.formatNaira(budgetStore.unsettledDebt)"
          valueClass="text-bvorange"
          :meta="`${budgetStore.formatNaira(budgetStore.unsettledDebt)} remaining`"
        />

        <StatCard
          label="Savings"
          :value="savingsStore.formatNaira(savingsStore.totalSavings)"
          valueClass="text-[#168064]"
          meta="Current savings balance"
          :highlight="true"
        />
      </section>

      <!-- ========================================================= -->
      <!-- MAIN DASHBOARD GRID -->
      <!-- ========================================================= -->
      <div class="grid grid-cols-1 gap-[18px] xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,.8fr)]">
        <!-- LEFT COLUMN -->
        <div class="grid content-start gap-[18px]">
          <!-- Financial GPS -->
          <div @click="goToFinancialGPS" class="group cursor-pointer">
            <BasePanel title="Financial GPS" meta="Cycle health · On track">
              <div class="grid grid-cols-1 items-center gap-6 sm:grid-cols-[145px_minmax(0,1fr)]">
                <div
                  class="relative mx-auto h-[138px] w-[138px] shrink-0 rounded-full transition-transform duration-300 group-hover:scale-[1.03]"
                  style="background: conic-gradient(#1a8a69 0 71%, #e9eeeb 71% 100%)"
                >
                  <div
                    class="absolute inset-0 m-auto grid h-[104px] w-[104px] place-items-center rounded-full bg-white text-center"
                  >
                    <div>
                      <strong class="block text-[23px] font-bold"> 71% </strong>
                      <span class="text-[9px] font-bold uppercase tracking-wide text-bvmuted">
                        On track
                      </span>
                    </div>
                  </div>
                </div>

                <div class="min-w-0">
                  <div class="flex items-center justify-between gap-4">
                    <h3 class="text-[18px] font-bold text-[#17241f]">Your plan is healthy.</h3>
                    <span
                      class="text-[18px] text-bvmuted transition-all duration-200 group-hover:translate-x-1 group-hover:text-bvgreen2"
                    >
                      →
                    </span>
                  </div>

                  <p class="mt-1.5 text-[12px] leading-[1.6] text-bvmuted">
                    You are spending below your planned pace. Keeping today's spending under
                    <strong class="text-[#26352f]">₦18,500</strong>
                    protects your savings and upcoming commitments.
                  </p>

                  <div class="mt-4">
                    <ProgressTrack :percent="71" color="#1a8a69" />
                  </div>

                  <div class="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-bvmuted">
                    <span><b class="text-[#26352f]">₦286.4k</b> spent</span>
                    <span><b class="text-[#26352f]">₦363.6k</b> remaining</span>
                  </div>
                </div>
              </div>
            </BasePanel>
          </div>

          <!-- Budgets -->
          <BasePanel>
            <template #head>
              <div class="min-w-0">
                <h2 class="m-0 text-[15px] sm:text-[17px] font-bold text-[#17241f] truncate">
                  Budgets
                </h2>
                <p class="mt-0.5 text-[10px] text-bvmuted">Your budgets and planned allocations</p>
              </div>

              <div class="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  @click="openAddBudgetModal"
                  class="border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2 transition hover:translate-x-0.5"
                >
                  + Add
                </button>
                <button
                  type="button"
                  @click="goToBudgetPlanner"
                  class="border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2 transition-all duration-200 hover:translate-x-1 whitespace-nowrap"
                >
                  View all →
                </button>
              </div>
            </template>

            <div v-if="budgetStore.budgets.length" class="divide-y divide-[#eff0ed]">
              <BudgetListItem
                v-for="b in visibleBudgets"
                :key="b.id"
                :budget="b"
                @select="openBudgetDetail"
              />
            </div>

            <div
              v-else
              class="rounded-[13px] border border-dashed border-[#dce5e1] bg-[#fafcfb] p-6 text-center"
            >
              <div class="text-[12px] font-bold text-[#26352f]">No budgets yet</div>
              <p class="mt-1 text-[10px] leading-4 text-bvmuted">
                Create your first budget to start tracking it here.
              </p>
              <button
                type="button"
                @click="openAddBudgetModal"
                class="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-[11px] font-bold text-white transition hover:bg-emerald-700"
              >
                Add budget
              </button>
            </div>

            <button
              v-if="hiddenBudgetCount > 0"
              type="button"
              @click="goToBudgetPlanner"
              class="mt-3 w-full rounded-xl border border-dashed border-[#dce5e1] py-2.5 text-[11px] font-bold text-bvgreen2 transition hover:bg-[#f6faf8]"
            >
              +{{ hiddenBudgetCount }} more — view all in Budget Planner →
            </button>
          </BasePanel>

          <!-- AI Coach -->
          <section
            @click="goToAiCoach"
            class="group bg-[#074033] text-white rounded-[22px] shadow-card p-[21px] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01]"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9bd6c4]">
                  Personal insight
                </div>
                <h2 class="mt-1 text-[17px] font-bold">✦ AI Coach</h2>
              </div>
              <span
                class="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-[#bde7da]"
              >
                Fresh insight
              </span>
            </div>

            <p class="mt-4 text-[12px] leading-[1.65] text-[#d9eee8]">
              <strong class="text-white">
                Your transport spending is 18% higher than your usual pace.
              </strong>
              You can still stay within budget if you keep the next two weeks below ₦21,000.
            </p>

            <div class="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded-[9px] border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-white/15"
              >
                Ask Coach
              </button>
              <button
                type="button"
                class="rounded-[9px] border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-white/15"
              >
                View forecast
              </button>
              <button
                type="button"
                class="rounded-[9px] border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-white/15"
              >
                Why this changed?
              </button>
            </div>
          </section>

          <!-- Transaction History -->
          <TransactionHistoryCard :transactions="transactionsStore.transactions" @filter="handleFilter" />
        </div>

        <!-- RIGHT COLUMN -->
        <div class="grid content-start gap-[18px]">
          <BasePanel title="Daily Snapshot" meta="Today">
            <div class="grid grid-cols-2 gap-2.5">
              <div
                class="rounded-[13px] bg-[#f7faf8] p-3.5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <small class="text-[9px] font-bold uppercase tracking-wide text-bvmuted">
                  Income
                </small>
                <strong class="mt-1 block text-[15px]"> ₦850k </strong>
                <p class="mt-1 text-[10px] text-bvmuted">Monthly</p>
              </div>
              <div
                class="rounded-[13px] bg-[#f7faf8] p-3.5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <small class="text-[9px] font-bold uppercase tracking-wide text-bvmuted">
                  Spent
                </small>
                <strong class="mt-1 block text-[15px]"> ₦18.2k </strong>
                <p class="mt-1 text-[10px] text-bvmuted">Today</p>
              </div>
              <div
                class="rounded-[13px] bg-[#f7faf8] p-3.5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <small class="text-[9px] font-bold uppercase tracking-wide text-bvmuted">
                  Saved
                </small>
                <strong class="mt-1 block text-[15px]"> ₦42k </strong>
                <p class="mt-1 text-[10px] text-bvmuted">This cycle</p>
              </div>
              <div
                class="rounded-[13px] bg-[#f7faf8] p-3.5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <small class="text-[9px] font-bold uppercase tracking-wide text-bvmuted">
                  Safe spend
                </small>
                <strong class="mt-1 block text-[15px]"> ₦18.5k </strong>
                <p class="mt-1 text-[10px] text-bvmuted">Today</p>
              </div>
            </div>
          </BasePanel>

          <!-- Budget plan -->
          <BasePanel>
            <template #head>
              <div>
                <h2 class="m-0 text-[17px] font-bold">Budget plan</h2>
                <p class="mt-0.5 text-[10px] text-bvmuted">Current allocation</p>
              </div>
              <button
                type="button"
                class="border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2"
              >
                Adjust →
              </button>
            </template>

            <div class="border-b border-[#eff0ed] py-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <span class="text-[11px] text-bvmuted"> Needs </span>
                  <div class="mt-1 w-[130px]">
                    <ProgressTrack :percent="needsPercent" height="6px" />
                  </div>
                </div>
                <strong class="text-[11px]">
                  {{ budgetStore.formatNaira(budgetStore.totalAllocation) }} /
                  {{ budgetStore.formatNaira(budgetStore.totalBudgetTarget) }}
                </strong>
              </div>
            </div>

            <div class="border-b border-[#eff0ed] py-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <span class="text-[11px] text-bvmuted"> Wants </span>
                  <div class="mt-1 w-[130px]">
                    <ProgressTrack :percent="wantsPercent" height="6px" />
                  </div>
                </div>
                <strong class="text-[11px]">
                  {{ goalsStore.formatNaira(goalsStore.totalSaved) }} /
                  {{ goalsStore.formatNaira(goalsStore.totalTarget) }}
                </strong>
              </div>
            </div>

            <div class="py-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <span class="text-[11px] text-bvmuted"> Savings </span>
                  <div class="mt-1 w-[130px]">
                    <ProgressTrack :percent="savingsPercent" height="6px" />
                  </div>
                </div>
                <strong class="text-[11px]">
                  {{ savingsStore.formatNaira(savingsStore.totalSavings) }}
                </strong>
              </div>
            </div>
          </BasePanel>

          <!-- Upcoming settlements -->
          <BasePanel>
            <template #head>
              <div>
                <h2 class="m-0 text-[17px] font-bold">Upcoming settlements</h2>
                <p class="mt-0.5 text-[10px] text-bvmuted">What's coming next</p>
              </div>
              <button
                type="button"
                @click="goToBudgetPlanner"
                class="border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2"
              >
                Settlement→
              </button>
            </template>

            <div v-if="visibleUpcomingBills.length" class="divide-y divide-[#eff0ed]">
              <div
                v-for="bill in visibleUpcomingBills"
                :key="bill.id"
                class="flex items-center justify-between gap-3 py-3"
              >
                <div class="min-w-0">
                  <div class="truncate text-[12px] font-bold text-[#17241f]">
                    {{ bill.name }}
                  </div>
                  <div class="mt-0.5 text-[10px] text-bvmuted">Cycle {{ bill.cycle }}</div>
                </div>
                <strong class="shrink-0 text-[12px] text-[#17382e]">
                  {{ budgetStore.formatNaira(bill.amount) }}
                </strong>
              </div>
            </div>

            <div v-else class="py-6 text-center text-[11px] text-bvmuted">
              No bills are fully funded yet.
            </div>

            <button
              v-if="hiddenUpcomingBillCount > 0"
              type="button"
              @click="goToBudgetPlanner"
              class="mt-3 w-full rounded-xl border border-dashed border-[#dce5e1] py-2.5 text-[11px] font-bold text-bvgreen2 transition hover:bg-[#f6faf8]"
            >
              +{{ hiddenUpcomingBillCount }} more — view all in Budget Planner →
            </button>
          </BasePanel>
        </div>
      </div>
    </div>

    <AddBudgetModal
      v-model="showAddBudgetModal"
      :total-budget="budgetSettingsStore.amount"
      @create="createBudget"
    />

    <BudgetDetailModal
      v-model="showBudgetDetailModal"
      :budget="selectedBudget"
      @add-money="handleAddMoney"
    />
  </MainLayout>
</template>