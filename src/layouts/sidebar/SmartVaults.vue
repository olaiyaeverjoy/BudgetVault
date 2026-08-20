<script setup>
import { ref } from 'vue'
import AddBudgetItemModal from '@/components/AddBudgetItemModal.vue'

import MainLayout from '@/layouts/MainLayout.vue' // adjust path if needed
import PageHeader from '@/components/PageHeader.vue'
import Metric from '@/components/Metric.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import Pill from '@/components/Pill.vue'

const showNewVaultModal = ref(false)

const closeNewVaultModal = () => {
  showNewVaultModal.value = false
}

const openAddBudgetModal = () => {
  showNewVaultModal.value = false
  showAddBudgetModal.value = true
}
const showAddBudgetModal = ref(false)

const handleBudgetItemSave = (item) => {
  console.log('New budget item:', item)
}
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
              @click="showNewVaultModal = true"
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              ＋ New vault
            </button>
            <!-- <button
              class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-green-700 transition shadow-sm"
            >
              Auto-allocate
            </button> -->
          </div>
          <div
            v-if="showNewVaultModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            @click.self="closeNewVaultModal"
          >
            <div class="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <h2 class="text-[18px] font-bold text-gray-900">Create New Vault</h2>

                  <p class="text-[12px] text-gray-500 mt-1">
                    Create a vault to organize your budget.
                  </p>
                </div>

                <button
                  type="button"
                  @click="closeNewVaultModal"
                  class="h-8 w-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <button
                type="button"
                @click="openAddBudgetModal"
                class="w-full rounded-[11px] bg-[#111827] py-3 text-[13px] font-bold text-white hover:opacity-90"
              >
                + Add New Budget Item
              </button>

              <button
                type="button"
                @click="closeNewVaultModal"
                class="mt-3 w-full rounded-[11px] border border-bvline py-3 text-[13px] font-semibold text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
          <AddBudgetItemModal
            v-model="showAddBudgetModal"
            currency="₦"
            @save="handleBudgetItemSave"
          />
        </template>
      </PageHeader>

      <!-- Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric label="Total vaults amount" value="₦0" valueClass="text-[#168064]" />
        <Metric label="Active vaults" value="3" />
        <!-- <Metric label="" value="Jun 1" /> -->
      </div>

      <!-- Vault Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <!-- Emergency Fund -->
        <div
          class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200"
        >
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Emergency Fund</h3>
          <p class="text-[11.5px] text-bvmuted leading-relaxed m-0 mb-3">
            Keep a protected buffer for unexpected costs.
          </p>
          <ProgressTrack :percent="72" />
          <div class="flex justify-between items-center pt-3">
            <span class="text-[11px] text-bvmuted">₦144,000 of ₦200,000</span>
            <Pill variant="green">72%</Pill>
          </div>
        </div>

        <!-- Monthly Savings -->
        <div
          class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200"
        >
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Monthly Savings</h3>
          <p class="text-[11.5px] text-bvmuted leading-relaxed m-0 mb-3">
            Automatic allocation toward your monthly savings target.
          </p>
          <ProgressTrack :percent="58" />
          <div class="flex justify-between items-center pt-3">
            <span class="text-[11px] text-bvmuted">₦58,000 of ₦100,000</span>
            <Pill variant="gold">58%</Pill>
          </div>
        </div>

        <!-- School / Family -->
        <div
          class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200"
        >
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">School / Family</h3>
          <p class="text-[11.5px] text-bvmuted leading-relaxed m-0 mb-3">
            A protected fund for a known upcoming commitment.
          </p>
          <ProgressTrack :percent="84" />
          <div class="flex justify-between items-center pt-3">
            <span class="text-[11px] text-bvmuted">₦84,000 of ₦100,000</span>
            <Pill variant="blue">84%</Pill>
          </div>
        </div>
      </div>

      <div class="w-full rounded-[15px] border border-[#edf0ee] bg-white p-[15px] shadow-sm">
        <!-- Card Header -->
        <div class="flex items-center justify-between">
          <h2 class="text-[15px] font-bold text-gray-900">Smart Vault</h2>

          <button
            type="button"
            @click="showNewVaultModal = true"
            class="rounded-[10px] bg-[#111827] px-[12px] py-[8px] text-[11px] font-bold text-white hover:opacity-90"
          >
            + New vault
          </button>
        </div>

        <!-- Empty Card Content -->
        <div class="flex min-h-[140px] items-center justify-center">
          <div class="text-center">
            <div
              class="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-lg"
            >
              💰
            </div>

            <p class="text-[13px] font-semibold text-gray-700">No budgets yet</p>

            <p class="mt-1 text-[11px] text-gray-400">Create your first budget to start saving.</p>
          </div>
        </div>
      </div>

      <!-- Activity + Rules -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BasePanel title="Vault activity" meta="Today">
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div>
              <div class="text-[12.5px] font-extrabold">Emergency Fund</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Auto-allocation</div>
            </div>
            <b class="text-[13px] text-emerald-700">+₦20,000</b>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div>
              <div class="text-[12.5px] font-extrabold">Monthly Savings</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Manual deposit</div>
            </div>
            <b class="text-[13px] text-emerald-700">+₦10,000</b>
          </div>
          <div class="flex justify-between items-center py-3">
            <div>
              <div class="text-[12.5px] font-extrabold">School / Family</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Reserved for upcoming bill</div>
            </div>
            <Pill variant="green">Protected</Pill>
          </div>
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
            <span class="text-[12px] text-bvmuted">Release before due date</span>
            <Pill variant="gold">Review</Pill>
          </div>
        </BasePanel>
      </div>
    </div>
  </MainLayout>
</template>
