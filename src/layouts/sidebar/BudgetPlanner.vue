<script setup>
import { ref } from 'vue'

import MainLayout from '@/layouts/MainLayout.vue'
import { useAppStore } from '@/stores/app'

import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import Metric from '@/components/Metric.vue'
// import EditBudgetmodal from '../components/EditBudgetmodal.vue'
import EditBudgetmodal from '@/components/EditBudgetmodal.vue'

const app = useAppStore()

// Edit Budget modal
const editBudgetOpen = ref(false)

// Add Budget modal
const showNewVaultModal = ref(false)

// Budget settings
const budget = ref({
  amount: 650000,
  schedule: '1-7',
  autoRenew: true
})

// Save budget settings
const handleBudgetSave = (settings) => {
  budget.value = settings

  console.log('Budget settings:', settings)

  app.showToast('Budget settings saved successfully')
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
              :initial-budget="budget.amount"
              :initial-schedule="budget.schedule"
              :initial-auto-renew="budget.autoRenew"
              @save="handleBudgetSave"
            />
          </div>
          <button
            type="button"
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
          :value="`₦${budget.amount.toLocaleString()}`"
          meta="Confirmed"
        />

        <StatCard
          label="total allocation"
          value="₦270,000"
          valueClass="text-bvorange"
          meta="47% of income"
        />

        <!-- <StatCard label="Savings" value="₦84,000" valueClass="text-[#168064]" meta="20% target" />

        <StatCard label="Flex money" value="₦0,000" meta="₦0,000 weekly" :highlight="true" /> -->
      </div>

      <!-- Main content -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4">
        <!-- Budgets -->
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
              @click="showNewVaultModal = true"
              class="shrink-0 border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2 transition-all duration-200 hover:translate-x-1 whitespace-nowrap"
            >
              Add Budget →
            </button>
          </template>

          <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            <!-- Existing vault cards go here -->

            <div
              class="rounded-[13px] border border-dashed border-[#dce5e1] bg-[#fafcfb] p-4 transition hover:border-[#bfd5cd] hover:bg-[#f6faf8]"
            >
              <div
                class="mb-3 grid h-9 w-9 place-items-center rounded-[10px] bg-bvmint text-[15px] text-bvgreen2"
              >
                +
              </div>

              <div class="text-[12px] font-bold text-[#26352f]">Add a vault</div>

              <p class="mt-1 text-[10px] leading-4 text-bvmuted">Create a new budget.</p>
            </div>
          </div>
        </BasePanel>

        <!-- Monthly allocation -->
        <BasePanel title="Monthly allocation" meta="May 2026">
          <div class="flex justify-between items-center gap-3 py-3 border-b border-[#eff0ed]">
            <div class="min-w-0">
              <div class="text-[12px] sm:text-[12.5px] font-extrabold truncate">
                Housing & utilities
              </div>

              <div class="text-[10px] sm:text-[10.5px] text-bvmuted mt-0.5">Essential</div>
            </div>

            <div class="text-right shrink-0">
              <b class="text-[12.5px] sm:text-[13px]"> ₦120,000 </b>

              <div class="w-[90px] xs:w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="76" height="6px" />
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center gap-3 py-3 border-b border-[#eff0ed]">
            <div class="min-w-0">
              <div class="text-[12px] sm:text-[12.5px] font-extrabold truncate">Food</div>

              <div class="text-[10px] sm:text-[10.5px] text-bvmuted mt-0.5">Essential</div>
            </div>

            <div class="text-right shrink-0">
              <b class="text-[12.5px] sm:text-[13px]"> ₦46,000 </b>

              <div class="w-[90px] xs:w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="58" height="6px" />
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center gap-3 py-3 border-b border-[#eff0ed]">
            <div class="min-w-0">
              <div class="text-[12px] sm:text-[12.5px] font-extrabold truncate">Transport</div>

              <div class="text-[10px] sm:text-[10.5px] text-bvmuted mt-0.5">Essential</div>
            </div>

            <div class="text-right shrink-0">
              <b class="text-[12.5px] sm:text-[13px]"> ₦30,000 </b>

              <div class="w-[90px] xs:w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="43" height="6px" />
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center gap-3 py-3">
            <div class="min-w-0">
              <div class="text-[12px] sm:text-[12.5px] font-extrabold truncate">Savings</div>

              <div class="text-[10px] sm:text-[10.5px] text-bvmuted mt-0.5">Protected</div>
            </div>

            <div class="text-right shrink-0">
              <b class="text-[12.5px] sm:text-[13px]"> ₦84,000 </b>

              <div class="w-[90px] xs:w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="70" height="6px" />
              </div>
            </div>
          </div>
        </BasePanel>

        <!-- Weekly guardrails -->
        <BasePanel title="Weekly guardrails" meta="Next 7 days">
          <Metric label="Safe to spend" value="₦31,800" valueClass="text-[#168064]" />

          <div class="flex flex-col xs:flex-row gap-2 mt-4">
            <button
              type="button"
              class="border border-bvline bg-white rounded-[10px] px-3 py-2.5 font-bold text-[11px] w-full xs:w-auto hover:border-green-600 hover:bg-green-50 transition"
              @click="app.showToast('Weekly limit updated')"
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
  </MainLayout>
</template>
