<script setup>
import { ref, computed, onMounted } from 'vue'

import MainLayout from '@/layouts/MainLayout.vue'
import { useAppStore } from '@/stores/app'
import { useBudgetStore } from '@/stores/budgetStore'
import { useVaultStore } from '@/stores/vaultStore'

import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import Metric from '@/components/Metric.vue'
import EditBudget from '@/components/EditBudget.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const app = useAppStore()
const budgetStore = useBudgetStore()
const vaultStore = useVaultStore()

// ============================================
// Edit Budget dropdown
// ============================================
const editBudgetOpen = ref(false)

const handleBudgetSave = () => {
  // budgetStore.saveSettings already patched state — settings below
  // are computed straight from the store, so nothing to do here.
  app.showToast('Budget settings saved successfully')
}

// ============================================
// Vault modal (shared with the Smart Vaults page —
// same table, same store, changes reflect on both)
// ============================================
const showVaultModal = ref(false)
const editingVault = ref(null)

const openNewVaultModal = () => {
  editingVault.value = null
  showVaultModal.value = true
}

const openEditVault = (vault) => {
  editingVault.value = vault
  showVaultModal.value = true
}

const handleVaultSave = () => {
  editingVault.value = null
  app.showToast('Budget item saved')
}

const showDeleteDialog = ref(false)
const vaultPendingDelete = ref(null)
const deleting = ref(false)
const deleteError = ref('')

function confirmDeleteVault(vault) {
  vaultPendingDelete.value = vault
  deleteError.value = ''
  showDeleteDialog.value = true
}

async function handleDeleteConfirmed() {
  if (!vaultPendingDelete.value) return
  deleting.value = true
  deleteError.value = ''
  try {
    await vaultStore.deleteVault(vaultPendingDelete.value.id)
    showDeleteDialog.value = false
    vaultPendingDelete.value = null
    app.showToast('Budget item removed')
  } catch (err) {
    deleteError.value = err.message || 'Could not delete this item.'
  } finally {
    deleting.value = false
  }
}

// ============================================
// Derived numbers — all computed from live data,
// nothing hardcoded.
// ============================================
const formatCurrency = (amount) =>
  '₦' + Number(amount || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })

const totalAllocationPercent = computed(() => {
  const income = budgetStore.monthlyIncome
  if (!income) return 0
  return Math.round((vaultStore.totalTarget / income) * 100)
})

const overallFundedPercent = computed(() => {
  if (!vaultStore.totalTarget) return 0
  return Math.round((vaultStore.totalProtected / vaultStore.totalTarget) * 100)
})

// What's left of income once every vault's target is set aside
const flexMoney = computed(() =>
  Math.max(budgetStore.monthlyIncome - vaultStore.totalTarget, 0)
)

const flexMoneyWeekly = computed(() => Math.round(flexMoney.value / 4.345))

onMounted(() => {
  if (!budgetStore.initialized) budgetStore.fetchSettings()
  else budgetStore.subscribeToChanges()

  if (!vaultStore.initialized) vaultStore.fetchVaults()
  else vaultStore.subscribeToChanges()
})
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
            <EditBudget
              v-model="editBudgetOpen"
              :initial-budget="budgetStore.monthlyIncome"
              :initial-schedule="budgetStore.schedule"
              :initial-auto-renew="budgetStore.autoRenew"
              @save="handleBudgetSave"
            />
          </div>
        </template>
      </PageHeader>

      <!-- Stats (live) -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5">
        <StatCard
          label="budget amount"
          :value="formatCurrency(budgetStore.monthlyIncome)"
          meta="Confirmed"
        />

        <StatCard
          label="total allocation"
          :value="formatCurrency(vaultStore.totalTarget)"
          valueClass="text-bvorange"
          :meta="`${totalAllocationPercent}% of income`"
        />

        <StatCard
          label="Savings"
          :value="formatCurrency(vaultStore.totalProtected)"
          valueClass="text-[#168064]"
          :meta="`${overallFundedPercent}% funded`"
        />

        <StatCard
          label="Flex money"
          :value="formatCurrency(flexMoney)"
          :meta="`${formatCurrency(flexMoneyWeekly)} weekly`"
          :highlight="true"
        />
      </div>

      <!-- Main content -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4">
        <!-- Monthly allocation -->
        <BasePanel title="Monthly allocation" meta="This cycle">
          <div
            v-for="vault in vaultStore.vaults"
            :key="'alloc-' + vault.id"
            class="flex justify-between items-center gap-3 py-3 border-b border-[#eff0ed] last:border-b-0"
          >
            <div class="min-w-0">
              <div class="text-[12px] sm:text-[12.5px] font-extrabold truncate">
                {{ vault.title }}
              </div>

              <div class="text-[10px] sm:text-[10.5px] text-bvmuted mt-0.5">
                {{ vault.status === 'completed' ? 'Fully funded' : 'In progress' }}
              </div>
            </div>

            <div class="text-right shrink-0">
              <b class="text-[12.5px] sm:text-[13px]">{{ formatCurrency(vault.target) }}</b>

              <div class="w-[90px] xs:w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="vault.progress" height="6px" />
              </div>
            </div>
          </div>

          <p v-if="!vaultStore.vaults.length" class="text-[12px] text-bvmuted py-3 text-center">
            No allocations yet — add a budget to see it here.
          </p>
        </BasePanel>

        <!-- Weekly guardrails -->
        <BasePanel title="Weekly guardrails" meta="Next 7 days">
          <Metric label="Safe to spend" :value="formatCurrency(flexMoneyWeekly)" valueClass="text-[#168064]" />

          <div class="flex flex-col xs:flex-row gap-2 mt-4">
            <button
              type="button"
              class="border border-bvline bg-white rounded-[10px] px-3 py-2.5 font-bold text-[11px] w-full xs:w-auto hover:border-green-600 hover:bg-green-50 transition"
              @click="editBudgetOpen = true"
            >
              Set weekly limit
            </button>

            <button
              type="button"
              class="border border-bvline bg-white rounded-[10px] px-3 py-2.5 font-bold text-[11px] w-full xs:w-auto hover:border-green-600 hover:bg-green-50 transition"
              @click="app.showToast('Budget copied to next month')"
            >
              Copy next month
            </button>
          </div>

          <p class="text-[12px] sm:text-[12.5px] text-bvmuted mt-4 leading-relaxed">
            The planner protects fixed commitments first, then gives you a clear weekly number for
            flexible spending.
          </p>
        </BasePanel>
      </div>
    </div>

    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete this budget item?"
      :message="
        deleteError ||
        `“${vaultPendingDelete?.title}” and its progress will be permanently removed. This can't be undone.`
      "
      confirm-text="Delete"
      cancel-text="Keep it"
      color="error"
      icon="mdi-trash-can-outline"
      :loading="deleting"
      @confirm="handleDeleteConfirmed"
    />
  </MainLayout>
</template>