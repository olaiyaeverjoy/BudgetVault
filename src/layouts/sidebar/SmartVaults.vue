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

const selectedVault = ref(null)

const openVault = (vault) => {
  selectedVault.value = vault
}

const closeVault = () => {
  selectedVault.value = null
}

const emergencyFundVault = {
  name: 'Emergency Fund',

  description: 'Keep a protected buffer for unexpected costs.',

  balance: 144000,

  target: 200000,

  percent: 72,

  transactions: [
    {
      id: 1,
      title: 'Monthly contribution',
      date: '21 Aug 2026',
      amount: 30000,
      type: 'credit'
    },
    {
      id: 2,
      title: 'Monthly contribution',
      date: '01 Aug 2026',
      amount: 30000,
      type: 'credit'
    },
    {
      id: 3,
      title: 'Emergency withdrawal',
      date: '18 Jul 2026',
      amount: -10000,
      type: 'debit'
    }
  ]
}

const monthlySavingsVault = {
  name: 'Monthly Savings',

  description: 'Automatic allocation toward your monthly savings target.',

  balance: 58000,

  target: 100000,

  percent: 58,

  transactions: [
    {
      id: 1,
      title: 'Monthly allocation',
      date: '21 Aug 2026',
      amount: 20000,
      type: 'credit'
    },
    {
      id: 2,
      title: 'Monthly allocation',
      date: '01 Aug 2026',
      amount: 20000,
      type: 'credit'
    },
    {
      id: 3,
      title: 'Monthly allocation',
      date: '01 Jul 2026',
      amount: 18000,
      type: 'credit'
    }
  ]
}

const schoolFamilyVault = {
  name: 'School / Family',

  description:
    'A protected fund for a known upcoming commitment.',

  balance: 84000,

  target: 100000,

  percent: 84,

  transactions: [
    {
      id: 1,
      title: 'Monthly contribution',
      date: '21 Aug 2026',
      amount: 25000,
      type: 'credit'
    },
    {
      id: 2,
      title: 'Family allocation',
      date: '01 Aug 2026',
      amount: 30000,
      type: 'credit'
    },
    {
      id: 3,
      title: 'School contribution',
      date: '01 Jul 2026',
      amount: 29000,
      type: 'credit'
    }
  ]
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
        <Metric label="Total vaults amount" value="₦286,000" valueClass="text-[#168064]" />
        <Metric label="Active vaults" value="3" />
        <!-- <Metric label="" value="Jun 1" /> -->
      </div>

      <!-- Vault Cards -->
      <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"> -->
      <!-- Emergency Fund -->
      <!-- <div
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
        </div> -->

      <!-- Monthly Savings -->
      <!-- <div
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
        </div> -->

      <!-- School / Family -->
      <!-- <div
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
        </div> -->
      <!-- </div> -->

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
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <!-- Emergency Fund -->
              <!-- Vault Card -->
              <div
                class="cursor-pointer rounded-[18px] border border-bvline bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-[18px]"
                @click="openVault"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Emergency Fund</h3>

                    <p class="m-0 mb-3 text-[11.5px] leading-relaxed text-bvmuted">
                      Keep a protected buffer for unexpected costs.
                    </p>
                  </div>

                  <div
                    class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gray-50 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <ProgressTrack :percent="72" />

                <div class="flex items-center justify-between pt-3">
                  <span class="text-[11px] text-bvmuted"> ₦144,000 of ₦200,000 </span>

                  <Pill variant="green">72%</Pill>
                </div>
              </div>
              <!-- 
modal -->

              <!-- Compact Vault Modal -->
              <Transition
                enter-active-class="transition duration-200 ease-out"
                leave-active-class="transition duration-150 ease-in"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="selectedVault"
                  class="fixed inset-0 z-[999] flex items-center justify-center bg-black/45 p-3 backdrop-blur-[2px]"
                  @click.self="closeVault"
                >
                  <div
                    class="w-full max-w-[360px] overflow-hidden rounded-[16px] bg-white shadow-2xl"
                    @click.stop
                  >
                    <!-- Header -->
                    <div
                      class="flex items-center justify-between border-b border-bvline px-3.5 py-2.5"
                    >
                      <div class="min-w-0">
                        <p
                          class="m-0 text-[7px] font-bold uppercase tracking-[0.12em] text-bvmuted"
                        >
                          Vault
                        </p>

                        <h2 class="mt-0.5 truncate text-[13px] font-extrabold text-gray-900">
                          {{ selectedVault.name }}
                        </h2>
                      </div>

                      <button
                        type="button"
                        class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                        @click="closeVault"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <!-- Body -->
                    <div class="p-3">
                      <!-- Balance -->
                      <div class="rounded-[12px] bg-[#17382e] p-3 text-white">
                        <div class="flex items-center justify-between">
                          <div>
                            <p class="m-0 text-[7px] uppercase tracking-[0.1em] text-white/50">
                              Current balance
                            </p>

                            <h3 class="mt-0.5 text-[18px] font-extrabold">
                              ₦{{ selectedVault.balance.toLocaleString() }}
                            </h3>
                          </div>

                          <div
                            class="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-xs"
                          >
                            🛡️
                          </div>
                        </div>

                        <!-- Progress -->
                        <div class="mt-2.5">
                          <div class="mb-1 flex justify-between">
                            <span class="text-[7px] text-white/50"> Progress </span>

                            <span class="text-[7px] font-bold"> {{ selectedVault.percent }}% </span>
                          </div>

                          <div class="h-1 overflow-hidden rounded-full bg-white/10">
                            <div
                              class="h-full rounded-full bg-[#9bd6c4]"
                              :style="{ width: `${selectedVault.percent}%` }"
                            />
                          </div>
                        </div>

                        <!-- Target / Remaining -->
                        <div class="mt-2.5 grid grid-cols-2 gap-2 border-t border-white/10 pt-2.5">
                          <div>
                            <p class="m-0 text-[7px] text-white/40">Target</p>

                            <p class="mt-0.5 text-[9px] font-bold">
                              ₦{{ selectedVault.target.toLocaleString() }}
                            </p>
                          </div>

                          <div>
                            <p class="m-0 text-[7px] text-white/40">Remaining</p>

                            <p class="mt-0.5 text-[9px] font-bold text-[#9bd6c4]">
                              ₦{{ (selectedVault.target - selectedVault.balance).toLocaleString() }}
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- Transactions -->
                      <div class="mt-3">
                        <div class="mb-2 flex items-center justify-between">
                          <h3 class="m-0 text-[10px] font-bold text-gray-900">
                            Transaction history
                          </h3>

                          <span class="text-[7px] text-bvmuted"> Recent </span>
                        </div>

                        <!-- Fixed small transaction area -->
                        <div class="max-h-[130px] space-y-1 overflow-y-auto pr-0.5">
                          <div
                            v-for="transaction in selectedVault.transactions"
                            :key="transaction.id"
                            class="flex items-center justify-between rounded-[9px] border border-bvline px-2 py-1.5"
                          >
                            <div class="flex min-w-0 items-center gap-2">
                              <div
                                class="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                                :class="
                                  transaction.type === 'credit'
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-red-50 text-red-500'
                                "
                              >
                                <span class="text-[9px] font-bold">
                                  {{ transaction.type === 'credit' ? '↑' : '↓' }}
                                </span>
                              </div>

                              <div class="min-w-0">
                                <p class="truncate text-[8px] font-bold text-gray-900">
                                  {{ transaction.title }}
                                </p>

                                <p class="text-[7px] text-bvmuted">
                                  {{ transaction.date }}
                                </p>
                              </div>
                            </div>

                            <span
                              class="ml-2 text-[8px] font-bold"
                              :class="
                                transaction.type === 'credit' ? 'text-green-600' : 'text-red-500'
                              "
                            >
                              {{ transaction.amount > 0 ? '+' : '-' }}₦{{
                                Math.abs(transaction.amount).toLocaleString()
                              }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Actions -->
                      <div class="mt-2.5 grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          class="rounded-[8px] border border-bvline px-2 py-1.5 text-[8px] font-bold text-gray-700 hover:bg-gray-50"
                        >
                          Add Money
                        </button>

                        <button
                          type="button"
                          class="rounded-[8px] bg-bvgreen2 px-2 py-1.5 text-[8px] font-bold text-white hover:brightness-95"
                        >
                          Manage Vault
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Monthly Savings -->
              <!-- Monthly Savings Vault -->
              <div
                class="cursor-pointer rounded-[18px] border border-bvline bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-[18px]"
                @click="openVault(monthlySavingsVault)"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">
                      Monthly Savings
                    </h3>

                    <p class="m-0 mb-3 text-[11.5px] leading-relaxed text-bvmuted">
                      Automatic allocation toward your monthly savings target.
                    </p>
                  </div>

                  <!-- Arrow -->
                  <div
                    class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gray-50 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <ProgressTrack :percent="58" />

                <div class="flex items-center justify-between pt-3">
                  <span class="text-[11px] text-bvmuted"> ₦58,000 of ₦100,000 </span>

                  <Pill variant="gold"> 58% </Pill>
                </div>
              </div>

              <!-- School / Family -->
              <!-- School / Family Vault -->
              <div
                class="cursor-pointer rounded-[18px] border border-bvline bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-[18px]"
                @click="openVault(schoolFamilyVault)"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">
                      School / Family
                    </h3>

                    <p class="m-0 mb-3 text-[11.5px] leading-relaxed text-bvmuted">
                      A protected fund for a known upcoming commitment.
                    </p>
                  </div>

                  <!-- Arrow -->
                  <div
                    class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gray-50 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <ProgressTrack :percent="84" />

                <div class="flex items-center justify-between pt-3">
                  <span class="text-[11px] text-bvmuted"> ₦84,000 of ₦100,000 </span>

                  <Pill variant="blue"> 84% </Pill>
                </div>
              </div>
            </div>
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
