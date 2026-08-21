<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AddVault from '@/components/AddVault.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

import MainLayout from '@/layouts/MainLayout.vue' // adjust path if needed
import PageHeader from '@/components/PageHeader.vue'
import Metric from '@/components/Metric.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import Pill from '@/components/Pill.vue'

import { useVaultStore } from '@/stores/vaultStore'

const vaultStore = useVaultStore()

const showVaultModal = ref(false)
const editingVault = ref(null) // non-null while the modal is in "edit" mode

const openNewVaultModal = () => {
  editingVault.value = null // ensure we're in "create" mode
  showVaultModal.value = true
}

const openEditVault = (vault) => {
  editingVault.value = vault
  showVaultModal.value = true
}

const handleVaultSave = () => {
  // Nothing to do here — vaultStore.createVault/updateVault already
  // patched state, and the vaults grid below re-renders reactively.
  editingVault.value = null
}

// Vault card colour -> Pill variant. category_vaults.color is one of
// VAULT_COLORS in vaultStore.js; extend both together if you add more.
const colorToVariant = (color) => {
  const map = { emerald: 'green', gold: 'gold', blue: 'blue', purple: 'blue', rose: 'gold' }
  return map[color] || 'green'
}

const formatCurrency = (amount) =>
  '₦' + Number(amount || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })

const showDeleteDialog = ref(false)
const vaultPendingDelete = ref(null) // the vault object queued for deletion
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
  } catch (err) {
    deleteError.value = err.message || 'Could not delete vault.'
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  if (!vaultStore.initialized) {
    vaultStore.fetchVaults()
  } else {
    // Already loaded from a previous visit — just make sure realtime is live
    vaultStore.subscribeToChanges()
  }
})

onUnmounted(() => {
  // Keep the subscription alive across route changes within the app;
  // only tear it down if you want a hard reset per-visit. If you'd
  // rather resubscribe fresh every time this page mounts, uncomment:
  // vaultStore.unsubscribe()
})
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Plan & Track"
        title="Smart Vaults"
        subtitle="Give every naira a job before it disappears."
      >
        <template #actions>
          <div class="flex flex-col xs:flex-row gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              @click="openNewVaultModal"
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              ＋ New vault
            </button>
          </div>
          <AddVault
            v-model="showVaultModal"
            :editing-vault="editingVault"
            currency="₦"
            @save="handleVaultSave"
          />
        </template>
      </PageHeader>

      <!-- Metrics (live from Supabase) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric
          label="Total vault balance"
          :value="formatCurrency(vaultStore.totalProtected)"
          valueClass="text-[#168064]"
        />
        <Metric label="Active vaults" :value="String(vaultStore.activeVaultsCount)" />
        <Metric label="Completed" :value="String(vaultStore.completedVaultsCount)" />
      </div>

      <!-- Loading -->
      <div v-if="vaultStore.loading" class="text-center py-10 text-[13px] text-bvmuted">
        Loading your vaults…
      </div>

      <!-- Error -->
      <div
        v-else-if="vaultStore.error"
        class="rounded-[15px] border border-red-200 bg-red-50 p-4 text-[12.5px] text-red-600"
      >
        {{ vaultStore.error }}
      </div>

      <!-- Vault Cards -->
      <div
        v-else-if="vaultStore.vaults.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
      >
        <div
          v-for="vault in vaultStore.vaults"
          :key="vault.id"
          class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200"
        >
          <div class="flex items-start justify-between mb-1.5 gap-2">
            <h3 class="m-0 text-[14.5px] font-bold text-gray-900">
              {{ vault.icon }} {{ vault.title }}
            </h3>
            <div class="flex items-center gap-1 shrink-0">
              <button
                type="button"
                @click="openEditVault(vault)"
                class="h-7 w-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors text-[13px]"
                aria-label="Edit vault"
                title="Edit vault"
              >
                ✏️
              </button>
              <button
                type="button"
                @click="confirmDeleteVault(vault)"
                class="h-7 w-7 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-[13px]"
                aria-label="Delete vault"
                title="Delete vault"
              >
                🗑️
              </button>
            </div>
          </div>
          <p class="text-[11.5px] text-bvmuted leading-relaxed m-0 mb-3">
            {{ vault.payee_bank ? `Settles to ${vault.payee_bank}` : 'Protected vault.' }}
          </p>
          <ProgressTrack :percent="vault.progress" />
          <div class="flex justify-between items-center pt-3">
            <span class="text-[11px] text-bvmuted">
              {{ formatCurrency(vault.current) }} of {{ formatCurrency(vault.target) }}
            </span>
            <Pill :variant="colorToVariant(vault.color)">{{ vault.progress }}%</Pill>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="w-full rounded-[15px] border border-[#edf0ee] bg-white p-[15px] shadow-sm">
        <div class="flex items-center justify-between">
          <h2 class="text-[15px] font-bold text-gray-900">Smart Vault</h2>
          <button
            type="button"
            @click="openNewVaultModal"
            class="rounded-[10px] bg-[#111827] px-[12px] py-[8px] text-[11px] font-bold text-white hover:opacity-90"
          >
            + New vault
          </button>
        </div>

        <div class="flex min-h-[140px] items-center justify-center">
          <div class="text-center">
            <div
              class="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-lg"
            >
              💰
            </div>
            <p class="text-[13px] font-semibold text-gray-700">No vaults yet</p>
            <p class="mt-1 text-[11px] text-gray-400">Create your first vault to start saving.</p>
          </div>
        </div>
      </div>

      <!-- Activity + Rules -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BasePanel title="Vault activity" meta="Today">
          <div
            v-for="vault in vaultStore.vaults.slice(0, 3)"
            :key="'activity-' + vault.id"
            class="flex justify-between items-center py-3 border-b border-[#eff0ed] last:border-b-0"
          >
            <div>
              <div class="text-[12.5px] font-extrabold">{{ vault.title }}</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">
                {{ vault.status === 'completed' ? 'Fully funded' : 'In progress' }}
              </div>
            </div>
            <b class="text-[13px] text-emerald-700">{{ formatCurrency(vault.current) }}</b>
          </div>
          <p v-if="!vaultStore.vaults.length" class="text-[12px] text-bvmuted py-3">
            No activity yet.
          </p>
        </BasePanel>

        <BasePanel title="Vault rules" meta="Smart">
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <span class="text-[12px] text-bvmuted">Protect essentials first</span>
            <Pill variant="green">On</Pill>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <span class="text-[12px] text-bvmuted">Auto-save after income</span>
            <Pill variant="green">On</Pill>
          </div>
          <div class="flex justify-between items-center py-3">
            <span class="text-[12px] text-bvmuted">Release on due date</span>
            <Pill variant="gold">Review</Pill>
          </div>
        </BasePanel>
      </div>
    </div>

    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete this vault?"
      :message="
        deleteError ||
        `“${vaultPendingDelete?.title}” and its progress will be permanently removed. This can't be undone.`
      "
      confirm-text="Delete vault"
      cancel-text="Keep it"
      color="error"
      icon="mdi-trash-can-outline"
      :loading="deleting"
      @confirm="handleDeleteConfirmed"
    />
  </MainLayout>
</template>
