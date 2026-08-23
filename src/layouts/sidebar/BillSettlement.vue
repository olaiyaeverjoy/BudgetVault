<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useAppStore } from '@/stores/app'
import { useBudgetStore } from '@/stores/budgets'
import { useTransactionsStore } from '@/stores/transactions'

import PageHeader from '@/components/PageHeader.vue'
import Metric from '@/components/Metric.vue'
import BasePanel from '@/components/BasePanel.vue'
import Pill from '@/components/Pill.vue'

const app = useAppStore()
const budgetStore = useBudgetStore()
const transactionsStore = useTransactionsStore()
/* -----------------------------
   Settlement UI
----------------------------- */

const manageMode = ref(false)
const showConsentModal = ref(false)
const selectedBill = ref(null)

function toggleManageSettlement() {
  manageMode.value = !manageMode.value
}
function confirmSettlement() {
  if (!selectedBill.value) {
    return
  }

  const bill = selectedBill.value

  const result = budgetStore.settleBudget(bill.id)

  if (!result) {
    app.showToast('This bill is no longer eligible for settlement.')
    closeSettleConfirmation()
    return
  }

  transactionsStore.addTransaction({
    icon: '⚡',
    name: `${bill.name} settled`,
    subtitle: `Cycle ${bill.cycle} · Bill settlement`,
    amount: -result.settledAmount
  })

  app.showToast(`${bill.name} settled — new cycle started`)

  closeSettleConfirmation()
}
/* -----------------------------
   Upcoming Bills
----------------------------- */

/*
 * IMPORTANT:
 *
 * This is intentionally coming directly
 * from budgetStore.
 *
 * There is no separate upcomingBills array.
 */
const upcomingBills = computed(() => {
  return budgetStore.eligibleBills
})

/* -----------------------------
   Metrics
----------------------------- */

const totalDue = computed(() => {
  return upcomingBills.value.reduce((sum, bill) => sum + Number(bill.amount || 0), 0)
})

const totalSettled = computed(() => {
  return budgetStore.budgets.reduce((sum, bill) => {
    /*
     * We don't store a historical total yet,
     * so this remains based on settlement state.
     *
     * If you want lifetime settlement history,
     * I recommend adding a settlementHistory array
     * to the store.
     */
    return sum
  }, 0)
})

/* -----------------------------
   Settle Bill
----------------------------- */

function openSettleConfirmation(bill) {
  selectedBill.value = bill
  showConsentModal.value = true
}

function closeSettleConfirmation() {
  showConsentModal.value = false
  selectedBill.value = null
}

// function confirmSettlement() {
//   if (!selectedBill.value) {
//     return
//   }

//   const bill = selectedBill.value

//   const result = budgetStore.settleBudget(bill.id)

//   if (!result) {
//     app.showToast('This bill is no longer eligible for settlement.')

//     closeSettleConfirmation()
//     return
//   }

//   app.showToast(`${bill.name} settled — new cycle started`)

//   closeSettleConfirmation()
// }
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Plan & Track"
        title="Bill Settlement"
        subtitle="See what is due, protect it, and settle on time."
      >
        <template #actions>
          <div class="flex flex-col gap-2.5 sm:flex-row sm:w-auto w-full">
            <button
              type="button"
              class="border border-bvline bg-green-400 rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-900 transition"
              @click="toggleManageSettlement"
            >
              {{ manageMode ? 'Done' : 'Manage Settlement' }}
            </button>

            <button
              type="button"
              class="border border-bvgold bg-gold text-[#17382e] rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:brightness-95 transition shadow-sm"
              @click="showConsentModal = true"
            >
              Auto settle
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Metrics -->
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric
          label="Settlement Balance"
          :value="budgetStore.formatNaira(budgetStore.unsettledDebt)"
          valueClass="text-[#c76b18]"
        />

        <Metric label="Already settled" value="—" valueClass="text-[#168064]" />

        <Metric label="Bills ready" :value="String(upcomingBills.length)" />
      </div>

      <!-- Upcoming Bills -->
      <BasePanel title="Upcoming bills" meta="Only fully funded budgets appear here">
        <!-- Bills -->
        <div v-if="upcomingBills.length" class="divide-y divide-[#eff0ed]">
          <div
            v-for="bill in upcomingBills"
            :key="bill.id"
            class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <!-- Bill information -->
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <div class="truncate text-[12.5px] font-extrabold">
                  {{ bill.name }}
                </div>

                <Pill variant="green"> Fully funded </Pill>
              </div>

              <div class="mt-1 text-[10.5px] text-bvmuted">
                Cycle {{ bill.cycle }}

                <span v-if="bill.description"> · {{ bill.description }} </span>
              </div>
            </div>

            <!-- Amount + Action -->
            <div class="flex items-center gap-2.5">
              <b class="text-[13px]">
                {{ budgetStore.formatNaira(bill.amount) }}
              </b>

              <button
                v-if="manageMode"
                type="button"
                class="rounded-[9px] bg-[#17382e] px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#20513f]"
                @click="openSettleConfirmation(bill)"
              >
                Settle
              </button>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="py-10 text-center">
          <div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#f1f6f3] text-xl">
            ✓
          </div>

          <h3 class="mt-3 text-[13px] font-bold text-[#17241f]">No upcoming bills</h3>

          <p class="mx-auto mt-1 max-w-sm text-[11px] leading-5 text-bvmuted">
            No budgets are currently fully funded. Once a budget reaches its target amount, it will
            automatically appear here.
          </p>
        </div>
      </BasePanel>
    </div>

    <!-- Settlement Confirmation -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showConsentModal && selectedBill"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          @click.self="closeSettleConfirmation"
        >
          <div class="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div class="border-b border-gray-100 px-5 py-5">
              <div
                class="mb-4 grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-600"
              >
                ✓
              </div>

              <h3 class="text-[16px] font-extrabold text-[#17241f]">Confirm Settlement</h3>

              <p class="mt-2 text-[12px] leading-5 text-bvmuted">
                You are about to settle
                <strong class="text-[#17241f]">
                  {{ selectedBill.name }}
                </strong>
                for
                <strong class="text-[#17382e]">
                  {{ budgetStore.formatNaira(selectedBill.amount) }} </strong
                >.
              </p>
            </div>

            <div class="px-5 py-4">
              <div class="rounded-xl border border-amber-100 bg-amber-50 p-3.5">
                <p class="text-[11px] leading-5 text-amber-800">
                  Once settled, this budget will leave the current upcoming bills list and start a
                  new recurring cycle.
                </p>
              </div>
            </div>

            <div
              class="flex flex-col gap-2 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end"
            >
              <button
                type="button"
                class="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[12px] font-bold text-gray-700 hover:bg-gray-100"
                @click="closeSettleConfirmation"
              >
                Cancel
              </button>

              <button
                type="button"
                class="rounded-xl bg-[#17382e] px-4 py-2.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#20513f]"
                @click="confirmSettlement"
              >
                Confirm Settlement
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </MainLayout>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
