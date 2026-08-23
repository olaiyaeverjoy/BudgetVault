<script setup>
import { ref, computed } from 'vue'

import MainLayout from '@/layouts/MainLayout.vue'
import { useAppStore } from '@/stores/app'
import { useBudgetStore } from '@/stores/budgets.js'

import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import BasePanel from '@/components/BasePanel.vue'
import BudgetListItem from '@/components/BudgetListItem.vue'
import EditBudgetmodal from '@/components/EditBudgetModal.vue'
import AddBudgetmodal from '@/components/AddBudgetModal.vue'
import BudgetDetailmodal from '@/components/BudgetDetailModal.vue'
import ViewAllBudgetsModal from '@/components/ViewAllBudgetsModal.vue'
import { useBudgetSettingsStore } from '@/stores/budgetSettings'
import BudgetDetailModal from '@/components/BudgetDetailModal.vue'
import AddBudgetModal from '@/components/AddBudgetModal.vue'



const budgetSettingsStore = useBudgetSettingsStore()
const app = useAppStore()
const budgetStore = useBudgetStore()

/* ----------------------------------------------------------------
  Edit Budget (overall) — unchanged dropdown
---------------------------------------------------------------- */
const editBudgetOpen = ref(false)

const handleBudgetSave = (settings) => {
  budgetSettingsStore.saveSettings(settings)

  app.showToast('Budget settings saved successfully')
}

/* ----------------------------------------------------------------
  Budgets come from the shared store — same data the dashboard
  reads/writes, so creating one on either page shows on both.
---------------------------------------------------------------- */
const incomePercent = computed(() => {
  if (!budgetSettingsStore.amount) return 0

  return Math.round(
    (budgetStore.totalAllocation / budgetSettingsStore.amount) * 100
  )
})

const previewBudgets = computed(() => budgetStore.budgets.slice(0, 4))
const hiddenBudgetCount = computed(() => Math.max(0, budgetStore.budgets.length - 4))

function formatNaira(n) {
  return `₦${Number(n || 0).toLocaleString()}`
}

/* ----------------------------------------------------------------
  Add Budget — popup modal
---------------------------------------------------------------- */
const showAddBudgetModal = ref(false)

function openAddBudgetModal() {
  showAddBudgetModal.value = true
}

function createBudget(payload) {
  const created = budgetStore.createBudget(payload)

  if (!created) {
    app.showToast('Enter a valid name and amount')
    return
  }

  app.showToast(`"${created.name}" budget created`)
  showAddBudgetModal.value = false
}

/* ----------------------------------------------------------------
  Budget detail — popup modal shown when a budget row is clicked
---------------------------------------------------------------- */
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

/* ----------------------------------------------------------------
  View all — popup modal listing every budget
---------------------------------------------------------------- */
const showViewAllModal = ref(false)

function openViewAll() {
  showViewAllModal.value = true
}

function handleViewAllAddBudget() {
  showViewAllModal.value = false
  openAddBudgetModal()
}
</script>

<template>
  <MainLayout>
    <div class="space-y-4 sm:space-y-5 lg:space-y-6 px-3 sm:px-4 lg:px-0">
      <!-- Header -->
      <PageHeader
        eyebrow="Plan & Track"
        title="Budget Planner"
        subtitle="Build a plan you can actually follow."
      >
        <template #actions>
          <div class="relative w-full sm:w-auto">
            <button
              type="button"
              @click.stop="editBudgetOpen = !editBudgetOpen"
              class="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
            >
              Edit Budget amount
            </button>

            <!-- Dropdown -->
            <EditBudgetmodal
  v-model="editBudgetOpen"
  :initial-budget="budgetSettingsStore.amount"
  :initial-schedule="budgetSettingsStore.schedule"
  :initial-auto-renew="budgetSettingsStore.autoRenew"
  @save="handleBudgetSave"
/>
          </div>

          <button
            type="button"
            @click="openAddBudgetModal"
            class="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
          >
            Add budget
          </button>
        </template>
      </PageHeader>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5">
        <StatCard
  label="withdrawn amount"
  :value="budgetSettingsStore.formattedAmount"
  meta="Confirmed"
/>
        <StatCard
          label="total allocation"
          :value="formatNaira(budgetStore.totalAllocation)"
          valueClass="text-bvorange"
          :meta="`${incomePercent}% of income`"
        />
      </div>

      <!-- Main content -->
      <div class="grid grid-cols-1 gap-4">
        <!-- Budgets — listed items, preview capped to 4, "View all" opens the popup -->
        <BasePanel>
          <template #head>
            <div class="min-w-0">
              <h2 class="m-0 text-[15px] sm:text-[17px] font-bold text-[#17241f] truncate">
                Budgets
              </h2>

              <p class="mt-0.5 text-[10px] text-bvmuted">Your budgets and planned allocations</p>
            </div>

            <button
              type="button"
              @click="openViewAll"
              class="shrink-0 border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2 transition-all duration-200 hover:translate-x-1 whitespace-nowrap"
            >
              View all →
            </button>
          </template>

          <div v-if="budgetStore.budgets.length" class="divide-y divide-[#eff0ed]">
            <BudgetListItem
              v-for="b in previewBudgets"
              :key="b.id"
              :budget="b"
              @select="openBudgetDetail"
            />
          </div>

          <!-- Empty state -->
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

          <!-- Shows only when there are more than 4 budgets -->
          <button
            v-if="hiddenBudgetCount > 0"
            type="button"
            @click="openViewAll"
            class="mt-3 w-full rounded-xl border border-dashed border-[#dce5e1] py-2.5 text-[11px] font-bold text-bvgreen2 transition hover:bg-[#f6faf8]"
          >
            +{{ hiddenBudgetCount }} more — view all →
          </button>
        </BasePanel>
      </div>
    </div>

    <!-- Add Budget popup -->
    <AddBudgetModal
  v-model="showAddBudgetModal"
  :total-budget="budgetSettingsStore.amount"
  @create="createBudget"
/>

    <!-- Budget detail popup -->
    <BudgetDetailModal
      v-model="showBudgetDetailModal"
      :budget="selectedBudget"
      @add-money="handleAddMoney"
    />

    <!-- View all budgets popup -->
    <ViewAllBudgetsModal
      v-model="showViewAllModal"
      @select="openBudgetDetail"
      @add-budget="handleViewAllAddBudget"
    />
  </MainLayout>
</template>