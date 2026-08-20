<script setup>
import { ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import StatCard from '../components/StatCard.vue'
import BasePanel from '../components/BasePanel.vue'
import ProgressTrack from '../components/ProgressTrack.vue'
import AddBudgetItemModal from '@/components/AddBudgetItemModal.vue'

const showNewVaultModal = ref(false)

const openNewVaultModal = () => {
  showNewVaultModal.value = true
}

const closeNewVaultModal = () => {
  showNewVaultModal.value = false
}
const showAddBudgetModal = ref(false)

const handleBudgetItemSave = (item) => {
  console.log('New budget item:', item)

  // You can add the item to your vault here
}

const openAddBudgetModal = () => {
  showNewVaultModal.value = false
  showAddBudgetModal.value = true
}

const showSettleBudget = ref(false)

const toggleSettleBudget = () => {
  showSettleBudget.value = !showSettleBudget.value
}

import { useRouter } from 'vue-router'

const router = useRouter()

const goToFinancialGPS = () => {
  router.push('/financialgps')
}
</script>

<template>
  <MainLayout>
    <div>
      <header class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <div class="text-[11px] uppercase tracking-[.12em] font-extrabold text-bvgreen2">
            Monday, May 11, 2026
          </div>
          <h1 class="mt-1 mb-[5px] text-[26px] md:text-[30px] tracking-tight font-bold">
            Good evening, Oladimeji.
          </h1>
          <div class="text-[13px] text-bvmuted">
            Here's your financial picture today. You have <b>20 days</b> left in your current budget
            cycle.
          </div>
        </div>
        <!-- Action buttons -->
        <div class="relative w-full md:w-auto">
          <!-- Buttons -->
          <div class="flex gap-[9px] w-full md:w-auto">
            <!-- New Vault -->
            <button
              type="button"
              @click="openNewVaultModal"
              class="border border-bvline bg-white rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none"
            >
              ✎ New Vault
            </button>

            <!-- Settle Budget -->
            <!-- Settle Budget -->
            <button
              type="button"
              @click="toggleSettleBudget"
              class="border border-bvgold bg-bvgold text-[#17382e] rounded-[11px] px-[14px] py-[10px] font-bold text-[12px] flex-1 md:flex-none"
            >
              ⚡ Settle Budget
            </button>
          </div>

          <!-- Settle Budget Overlay -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-2 scale-95"
          >
            <div
              v-if="showSettleBudget"
              class="absolute right-0 top-full mt-3 z-40 w-[320px] max-w-[calc(100vw-32px)] rounded-[15px] border border-[#edf0ee] bg-white p-[15px] shadow-xl"
            >
              <!-- Empty card -->
              <div class="min-h-[160px]"></div>
            </div>
          </Transition>
        </div>

        <!-- ========================= -->
        <!-- NEW VAULT MODAL -->
        <!-- ========================= -->

        <div
          v-if="showNewVaultModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          @click.self="closeNewVaultModal"
        >
          <div class="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
            <!-- Header -->
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

            <!-- Add Budget Item -->
            <button
              type="button"
              @click="showAddBudgetModal = true"
              class="w-full rounded-[11px] bg-[#111827] py-3 text-[13px] font-bold text-white hover:opacity-90"
            >
              + Add New Budget Item
            </button>

            <!-- Close -->
            <button
              type="button"
              @click="closeNewVaultModal"
              class="mt-3 w-full rounded-[11px] border border-bvline py-3 text-[13px] font-semibold text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- ========================= -->
        <!-- ADD BUDGET ITEM MODAL -->
        <!-- ========================= -->

        <AddBudgetItemModal
          v-model="showAddBudgetModal"
          currency="₦"
          @save="handleBudgetItemSave"
        />
      </header>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-[18px]">
        <StatCard label="Account Balance" value="₦850,000" meta="Next income in 8 days" />
        <StatCard label="withdrawn" value="₦650,000" valueClass="text-[#168064]">
          <template #meta
            ><span class="text-[#1b8a6a] font-bold">76%</span> of income planned</template
          >
        </StatCard>
        <StatCard
          label="Settled"
          value="₦286,400"
          valueClass="text-bvorange"
          meta="₦363,600 remaining"
        />
        <StatCard
          label="Savings"
          value="₦18,500"
          valueClass="text-[#168064]"
          meta="Today without affecting goals"
          :highlight="true"
        />
      </section>

      <!-- financial GPS -->

      <div class="grid grid-cols-1 xl:grid-cols-[1.45fr_.8fr] gap-[18px]">
        <div class="grid gap-[18px]">
          <div
            @click="goToFinancialGPS"
            class="group cursor-pointer rounded-[16px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            <BasePanel title="Financial GPS" meta="Cycle health · On track">
              <div class="grid grid-cols-1 sm:grid-cols-[145px_1fr] gap-[22px] items-center">
                <!-- Progress Circle -->
                <div
                  class="relative w-[138px] h-[138px] rounded-full mx-auto sm:mx-0 transition-transform duration-300 group-hover:scale-[1.03]"
                  style="background: conic-gradient(#1a8a69 0 71%, #e9eeeb 71% 100%)"
                >
                  <div
                    class="absolute inset-0 m-auto w-[104px] h-[104px] bg-white rounded-full grid place-items-center text-center"
                  >
                    <div>
                      <strong class="block text-[23px]">71%</strong>
                      <span class="text-[9px] text-bvmuted uppercase"> On track </span>
                    </div>
                  </div>
                </div>

                <!-- Content -->
                <div>
                  <div class="flex items-center justify-between gap-3">
                    <h3 class="m-0 mb-[5px] text-[19px]">Your plan is healthy.</h3>

                    <!-- Arrow -->
                    <span
                      class="text-[18px] text-bvmuted transition-all duration-300 group-hover:translate-x-1 group-hover:text-bvgreen2"
                    >
                      →
                    </span>
                  </div>

                  <p class="text-[12px] text-bvmuted leading-[1.55] mb-[13px]">
                    You are spending below your planned pace. Keeping today's spending under
                    <b>₦18,500</b> protects your savings and upcoming commitments.
                  </p>

                  <ProgressTrack :percent="71" color="#1a8a69" />

                  <div class="flex gap-[18px] mt-[11px] text-[10px] text-bvmuted">
                    <span> <b>₦286.4k</b> spent </span>

                    <span> <b>₦363.6k</b> remaining </span>
                  </div>
                </div>
              </div>
            </BasePanel>
          </div>

          <div
            class="group cursor-pointer rounded-[16px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            <BasePanel>
              <template #head>
                <h2 class="text-[17px] font-bold m-0">Smart Vaults</h2>

                <button
                  type="button"
                  @click.stop="showNewVaultModal = true"
                  class="bg-transparent border-0 text-bvgreen2 font-extrabold text-[11px] transition-all duration-200 hover:translate-x-1"
                >
                  Manage all →
                </button>
              </template>

              <!-- Smart Vault cards -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
                <!-- existing vault cards -->
              </div>
            </BasePanel>
          </div>

          <!-- =============================== -->
          <!-- CREATE NEW VAULT MODAL -->
          <!-- =============================== -->

          <div
            v-if="showNewVaultModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            @click.self="closeNewVaultModal"
          >
            <div class="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
              <!-- Header -->
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

              <!-- Add Budget Item -->
              <button
                type="button"
                @click="openAddBudgetModal"
                class="w-full rounded-[11px] bg-[#111827] py-3 text-[13px] font-bold text-white hover:opacity-90"
              >
                + Add New Budget Item
              </button>

              <!-- Cancel -->
              <button
                type="button"
                @click="closeNewVaultModal"
                class="mt-3 w-full rounded-[11px] border border-bvline py-3 text-[13px] font-semibold text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- =============================== -->
          <!-- ADD BUDGET ITEM MODAL -->
          <!-- =============================== -->

          <AddBudgetItemModal
            v-model="showAddBudgetModal"
            currency="₦"
            @save="handleBudgetItemSave"
          />

          <!-- AI COACH -->

          <section
            class="group bg-gray-100 text-white rounded-[22px] shadow-card p-[21px] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01]"
          >
            <div class="flex justify-between items-center mb-[17px]">
              <h2 class="text-white text-[17px] font-bold m-0">✦ AI Coach</h2>

              <span class="text-[#9bd6c4] text-[11px]"> Fresh insight </span>
            </div>

            <p class="text-[13px] leading-[1.6] text-[#d9eee8] m-0">
              <strong class="text-white">
                Your transport spending is 18% higher than your usual pace.
              </strong>
              You can still stay within budget if you keep the next two weeks below ₦21,000.
            </p>

            <div class="flex flex-wrap gap-2 mt-[15px]">
              <button
                type="button"
                class="border border-white/[.18] bg-white/[.08] text-white rounded-[10px] px-[11px] py-[9px] text-[10px] font-bold transition-all duration-200 hover:bg-white/[.16] hover:-translate-y-0.5 hover:shadow-md"
              >
                Ask Coach
              </button>

              <button
                type="button"
                class="border border-white/[.18] bg-white/[.08] text-white rounded-[10px] px-[11px] py-[9px] text-[10px] font-bold transition-all duration-200 hover:bg-white/[.16] hover:-translate-y-0.5 hover:shadow-md"
              >
                View forecast
              </button>

              <button
                type="button"
                class="border border-white/[.18] bg-white/[.08] text-white rounded-[10px] px-[11px] py-[9px] text-[10px] font-bold transition-all duration-200 hover:bg-white/[.16] hover:-translate-y-0.5 hover:shadow-md"
              >
                Why this changed?
              </button>
            </div>
          </section>

          <!-- recent history -->

          <div
            class="group rounded-[16px] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            <BasePanel>
              <template #head>
                <h2 class="text-[17px] font-bold m-0">Recent activity</h2>

                <button
                  type="button"
                  @click.stop
                  class="bg-transparent border-0 text-bvgreen2 font-extrabold text-[11px] transition-all duration-200 hover:translate-x-1"
                >
                  View all →
                </button>
              </template>

              <!-- Supermarket -->
              <div
                class="flex justify-between items-center py-3 border-b border-[#eff0ed] rounded-[10px] px-2 -mx-2 transition-all duration-200 hover:bg-gray-50 hover:px-3"
              >
                <div class="flex items-center gap-[10px]">
                  <div
                    class="w-8 h-8 rounded-[10px] bg-[#f1f5f3] grid place-items-center transition-transform duration-200 hover:scale-105"
                  >
                    🛒
                  </div>

                  <div>
                    <strong class="text-[11px] block"> Supermarket </strong>

                    <small class="text-[10px] text-bvmuted"> Today · Food & groceries </small>
                  </div>
                </div>

                <b class="text-[#bd5d18]"> −₦18,200 </b>
              </div>

              <!-- Fuel Station -->
              <div
                class="flex justify-between items-center py-3 border-b border-[#eff0ed] rounded-[10px] px-2 -mx-2 transition-all duration-200 hover:bg-gray-50 hover:px-3"
              >
                <div class="flex items-center gap-[10px]">
                  <div
                    class="w-8 h-8 rounded-[10px] bg-[#f1f5f3] grid place-items-center transition-transform duration-200 hover:scale-105"
                  >
                    ⛽
                  </div>

                  <div>
                    <strong class="text-[11px] block"> Fuel Station </strong>

                    <small class="text-[10px] text-bvmuted"> Yesterday · Transport </small>
                  </div>
                </div>

                <b class="text-[#bd5d18]"> −₦12,500 </b>
              </div>

              <!-- Salary -->
              <div
                class="flex justify-between items-center py-3 rounded-[10px] px-2 -mx-2 transition-all duration-200 hover:bg-gray-50 hover:px-3"
              >
                <div class="flex items-center gap-[10px]">
                  <div
                    class="w-8 h-8 rounded-[10px] bg-[#f1f5f3] grid place-items-center transition-transform duration-200 hover:scale-105"
                  >
                    ↗
                  </div>

                  <div>
                    <strong class="text-[11px] block"> Salary </strong>

                    <small class="text-[10px] text-bvmuted"> May 1 · Income </small>
                  </div>
                </div>

                <b class="text-[#188064]"> +₦850,000 </b>
              </div>
            </BasePanel>
          </div>
        </div>

        <!-- daily snapshop -->

        <div class="grid gap-[18px] content-start">
          <div
            class="group rounded-[16px] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            <BasePanel title="Daily Snapshot" meta="Today">
              <div class="grid grid-cols-2 gap-[10px]">
                <!-- Income -->
                <div
                  class="p-[13px] rounded-[14px] bg-[#f8faf9] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <small class="text-[9px] text-bvmuted uppercase"> Income </small>

                  <strong class="block text-[15px] mt-[5px]"> ₦850k </strong>

                  <p class="text-[10px] text-bvmuted mt-1">Monthly</p>
                </div>

                <!-- Spent -->
                <div
                  class="p-[13px] rounded-[14px] bg-[#f8faf9] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <small class="text-[9px] text-bvmuted uppercase"> Spent </small>

                  <strong class="block text-[15px] mt-[5px]"> ₦18.2k </strong>

                  <p class="text-[10px] text-bvmuted mt-1">Today</p>
                </div>

                <!-- Saved -->
                <div
                  class="p-[13px] rounded-[14px] bg-[#f8faf9] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <small class="text-[9px] text-bvmuted uppercase"> Saved </small>

                  <strong class="block text-[15px] mt-[5px]"> ₦42k </strong>

                  <p class="text-[10px] text-bvmuted mt-1">This cycle</p>
                </div>

                <!-- Safe Spend -->
                <div
                  class="p-[13px] rounded-[14px] bg-[#f8faf9] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <small class="text-[9px] text-bvmuted uppercase"> Safe spend </small>

                  <strong class="block text-[15px] mt-[5px]"> ₦18.5k </strong>

                  <p class="text-[10px] text-bvmuted mt-1">Today</p>
                </div>
              </div>
            </BasePanel>
          </div>

          <!-- budget plan -->

          <BasePanel>
            <template #head>
              <h2 class="text-[17px] font-bold m-0">Budget plan</h2>
              <button class="bg-transparent border-0 text-bvgreen2 font-extrabold text-[11px]">
                Adjust →
              </button>
            </template>
            <div class="flex justify-between py-3 border-b border-[#eff0ed]">
              <div>
                <span class="text-[11px] text-bvmuted">Needs</span>
                <div class="w-[130px]"><ProgressTrack :percent="78" height="6px" /></div>
              </div>
              <strong class="text-[12px]">₦312k / ₦400k</strong>
            </div>
            <div class="flex justify-between py-3 border-b border-[#eff0ed]">
              <div>
                <span class="text-[11px] text-bvmuted">Wants</span>
                <div class="w-[130px]"><ProgressTrack :percent="42" height="6px" /></div>
              </div>
              <strong class="text-[12px]">₦84k / ₦200k</strong>
            </div>
            <div class="flex justify-between py-3">
              <div>
                <span class="text-[11px] text-bvmuted">Savings</span>
                <div class="w-[130px]"><ProgressTrack :percent="58" height="6px" /></div>
              </div>
              <strong class="text-[12px]">₦174k / ₦300k</strong>
            </div>
          </BasePanel>

          <BasePanel>
            <template #head>
              <h2 class="text-[17px] font-bold m-0">Upcoming money</h2>
              <button class="bg-transparent border-0 text-bvgreen2 font-extrabold text-[11px]">
                Calendar →
              </button>
            </template>
            <div class="flex items-center gap-[14px]">
              <div
                class="w-[54px] h-[54px] rounded-[13px] bg-bvmint grid place-items-center text-center text-bvgreen2"
              >
                <div>
                  <small class="text-[8px] uppercase block">MAY</small><b class="text-[18px]">15</b>
                </div>
              </div>
              <div>
                <strong class="text-[12px]">Rent Vault allocation</strong>
                <p class="text-[10px] text-bvmuted mt-1">Scheduled · ₦100,000</p>
              </div>
            </div>
            <div class="h-px bg-[#eef0ed] my-[17px]" />
            <div class="flex items-center gap-[14px]">
              <div
                class="w-[54px] h-[54px] rounded-[13px] bg-bvmint grid place-items-center text-center text-bvgreen2"
              >
                <div>
                  <small class="text-[8px] uppercase block">MAY</small><b class="text-[18px]">20</b>
                </div>
              </div>
              <div>
                <strong class="text-[12px]">Electricity bill</strong>
                <p class="text-[10px] text-bvmuted mt-1">Due · estimated ₦32,000</p>
              </div>
            </div>
          </BasePanel>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
