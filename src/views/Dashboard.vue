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

        <!-- Actions -->
        <div class="relative flex w-full gap-2.5 sm:w-auto">
          <button
            type="button"
            @click="openNewVaultModal"
            class="flex flex-1 items-center justify-center gap-2 rounded-[11px] border border-bvline bg-white px-4 py-2.5 text-[12px] font-bold text-[#26352f] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cfd8d4] hover:shadow-md sm:flex-none"
          >
            <span class="text-[14px]">＋</span>
            New Vault
          </button>

          <button
            type="button"
            @click="toggleSettleBudget"
            class="flex flex-1 items-center justify-center gap-2 rounded-[11px] bg-bvgold px-4 py-2.5 text-[12px] font-bold text-[#17382e] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-none"
          >
            <span class="text-[13px]">⚡</span>
            Settle Budget
          </button>

          <!-- Settle Budget Dropdown -->
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
                  Review your current budget before settling.
                </div>
              </div>

              <div class="p-4">
                <div class="rounded-[12px] bg-[#f7faf8] p-3.5">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] text-bvmuted"> Remaining </span>

                    <strong class="text-[13px] text-[#17382e]"> ₦363,600 </strong>
                  </div>

                  <div class="mt-2.5">
                    <ProgressTrack :percent="71" />
                  </div>

                  <p class="mt-2 text-[10px] leading-4 text-bvmuted">
                    You're currently on track with this budget cycle.
                  </p>
                </div>

                <button
                  type="button"
                  class="mt-3 w-full rounded-[10px] bg-[#17382e] py-2.5 text-[11px] font-bold text-white transition hover:bg-[#20513f]"
                >
                  Review & Settle
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </header>

      <!-- ========================================================= -->
      <!-- SUMMARY CARDS -->
      <!-- ========================================================= -->
      <section class="mb-[18px] grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Account Balance" value="₦850,000" meta="Next income in 8 days" />

        <StatCard label="Withdrawn" value="₦650,000" valueClass="text-[#168064]">
          <template #meta>
            <span class="font-bold text-[#1b8a6a]">76%</span>
            of income planned
          </template>
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

      <!-- ========================================================= -->
      <!-- MAIN DASHBOARD GRID -->
      <!-- ========================================================= -->
      <div class="grid grid-cols-1 gap-[18px] xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,.8fr)]">
        <!-- ======================================================= -->
        <!-- LEFT COLUMN -->
        <!-- ======================================================= -->
        <div class="grid content-start gap-[18px]">
          <!-- Financial GPS -->
          <div @click="goToFinancialGPS" class="group cursor-pointer">
            <BasePanel title="Financial GPS" meta="Cycle health · On track">
              <div class="grid grid-cols-1 items-center gap-6 sm:grid-cols-[145px_minmax(0,1fr)]">
                <!-- Progress -->
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

                <!-- Content -->
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
                    <span>
                      <b class="text-[#26352f]">₦286.4k</b>
                      spent
                    </span>

                    <span>
                      <b class="text-[#26352f]">₦363.6k</b>
                      remaining
                    </span>
                  </div>
                </div>
              </div>
            </BasePanel>
          </div>

          <!-- Smart Vaults -->
          <BasePanel>
            <template #head>
              <div>
                <h2 class="m-0 text-[17px] font-bold text-[#17241f]">Smart Vaults</h2>

                <p class="mt-0.5 text-[10px] text-bvmuted">Your goals and planned allocations</p>
              </div>

              <button
                type="button"
                @click.stop="showNewVaultModal = true"
                class="border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2 transition-all duration-200 hover:translate-x-1"
              >
                Manage all →
              </button>
            </template>

            <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
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

                <p class="mt-1 text-[10px] leading-4 text-bvmuted">
                  Create a new savings or spending goal.
                </p>
              </div>
            </div>
          </BasePanel>

          <!-- AI Coach -->
          <section
            class="rounded-[20px] bg-[#17382e] p-5 text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
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

          <!-- Recent Activity -->
          <BasePanel>
            <template #head>
              <div>
                <h2 class="m-0 text-[17px] font-bold">Recent activity</h2>

                <p class="mt-0.5 text-[10px] text-bvmuted">Your latest transactions</p>
              </div>

              <button
                type="button"
                @click.stop
                class="border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2 transition hover:translate-x-1"
              >
                View all →
              </button>
            </template>

            <!-- Supermarket -->
            <div
              class="flex items-center justify-between gap-4 rounded-[10px] border-b border-[#eff0ed] px-2 py-3 transition hover:bg-[#fafcfb]"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div
                  class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#f1f5f3] text-[15px]"
                >
                  🛒
                </div>

                <div class="min-w-0">
                  <strong class="block text-[11px]"> Supermarket </strong>

                  <small class="text-[10px] text-bvmuted"> Today · Food & groceries </small>
                </div>
              </div>

              <b class="shrink-0 text-[11px] text-[#bd5d18]"> −₦18,200 </b>
            </div>

            <!-- Fuel -->
            <div
              class="flex items-center justify-between gap-4 rounded-[10px] border-b border-[#eff0ed] px-2 py-3 transition hover:bg-[#fafcfb]"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div
                  class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#f1f5f3] text-[15px]"
                >
                  ⛽
                </div>

                <div class="min-w-0">
                  <strong class="block text-[11px]"> Fuel Station </strong>

                  <small class="text-[10px] text-bvmuted"> Yesterday · Transport </small>
                </div>
              </div>

              <b class="shrink-0 text-[11px] text-[#bd5d18]"> −₦12,500 </b>
            </div>

            <!-- Salary -->
            <div
              class="flex items-center justify-between gap-4 rounded-[10px] px-2 py-3 transition hover:bg-[#fafcfb]"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div
                  class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#f1f5f3] text-[15px] text-bvgreen2"
                >
                  ↗
                </div>

                <div class="min-w-0">
                  <strong class="block text-[11px]"> Salary </strong>

                  <small class="text-[10px] text-bvmuted"> May 1 · Income </small>
                </div>
              </div>

              <b class="shrink-0 text-[11px] text-[#188064]"> +₦850,000 </b>
            </div>
          </BasePanel>
        </div>

        <!-- ======================================================= -->
        <!-- RIGHT COLUMN -->
        <!-- ======================================================= -->
        <div class="grid content-start gap-[18px]">
          <!-- Daily Snapshot -->
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

          <!-- Budget Plan -->
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

            <!-- Needs -->
            <div class="border-b border-[#eff0ed] py-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <span class="text-[11px] text-bvmuted"> Needs </span>

                  <div class="mt-1 w-[130px]">
                    <ProgressTrack :percent="78" height="6px" />
                  </div>
                </div>

                <strong class="text-[11px]"> ₦312k / ₦400k </strong>
              </div>
            </div>

            <!-- Wants -->
            <div class="border-b border-[#eff0ed] py-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <span class="text-[11px] text-bvmuted"> Wants </span>

                  <div class="mt-1 w-[130px]">
                    <ProgressTrack :percent="42" height="6px" />
                  </div>
                </div>

                <strong class="text-[11px]"> ₦84k / ₦200k </strong>
              </div>
            </div>

            <!-- Savings -->
            <div class="py-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <span class="text-[11px] text-bvmuted"> Savings </span>

                  <div class="mt-1 w-[130px]">
                    <ProgressTrack :percent="58" height="6px" />
                  </div>
                </div>

                <strong class="text-[11px]"> ₦174k / ₦300k </strong>
              </div>
            </div>
          </BasePanel>

          <!-- Upcoming Money -->
          <BasePanel>
            <template #head>
              <div>
                <h2 class="m-0 text-[17px] font-bold">Upcoming money</h2>

                <p class="mt-0.5 text-[10px] text-bvmuted">What's coming next</p>
              </div>

              <button
                type="button"
                class="border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2"
              >
                Calendar →
              </button>
            </template>

            <!-- Rent -->
            <div class="flex items-center gap-3.5">
              <div
                class="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[13px] bg-bvmint text-center text-bvgreen2"
              >
                <div>
                  <small class="block text-[8px] font-bold uppercase"> MAY </small>

                  <b class="text-[18px]"> 15 </b>
                </div>
              </div>

              <div class="min-w-0">
                <strong class="block text-[12px]"> Rent Vault allocation </strong>

                <p class="mt-1 text-[10px] text-bvmuted">Scheduled · ₦100,000</p>
              </div>
            </div>

            <div class="my-4 h-px bg-[#eef0ed]" />

            <!-- Electricity -->
            <div class="flex items-center gap-3.5">
              <div
                class="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[13px] bg-bvmint text-center text-bvgreen2"
              >
                <div>
                  <small class="block text-[8px] font-bold uppercase"> MAY </small>

                  <b class="text-[18px]"> 20 </b>
                </div>
              </div>

              <div class="min-w-0">
                <strong class="block text-[12px]"> Electricity bill </strong>

                <p class="mt-1 text-[10px] text-bvmuted">Due · estimated ₦32,000</p>
              </div>
            </div>
          </BasePanel>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- CREATE NEW VAULT MODAL -->
      <!-- ONLY ONE INSTANCE -->
      <!-- ========================================================= -->
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showNewVaultModal"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-[#07130f]/50 px-4 backdrop-blur-[2px]"
          @click.self="closeNewVaultModal"
        >
          <Transition
            appear
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-3 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
          >
            <div
              v-if="showNewVaultModal"
              class="w-full max-w-[420px] overflow-hidden rounded-[20px] border border-[#e8ece9] bg-white shadow-2xl"
            >
              <!-- Modal Header -->
              <div class="border-b border-[#edf0ee] px-5 py-4.5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div
                      class="mb-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-bvgreen2"
                    >
                      Smart Vaults
                    </div>

                    <h2 class="text-[18px] font-bold text-[#17241f]">Create New Vault</h2>

                    <p class="mt-1 text-[11px] leading-4 text-bvmuted">
                      Create a vault to organize your budget and financial goals.
                    </p>
                  </div>

                  <button
                    type="button"
                    @click="closeNewVaultModal"
                    class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f3f6f4] text-[13px] text-gray-500 transition hover:bg-[#e9eeeb] hover:text-gray-800"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <!-- Modal Body -->
              <div class="p-5">
                <button
                  type="button"
                  @click="openAddBudgetModal"
                  class="flex w-full items-center justify-center gap-2 rounded-[11px] bg-[#17382e] py-3 text-[12px] font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20513f] hover:shadow-md"
                >
                  <span class="text-[15px]">＋</span>
                  Add New Budget Item
                </button>

                <button
                  type="button"
                  @click="closeNewVaultModal"
                  class="mt-2.5 w-full rounded-[11px] border border-bvline bg-white py-3 text-[12px] font-semibold text-gray-600 transition hover:bg-[#f8faf9]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>

      <!-- ========================================================= -->
      <!-- ADD BUDGET ITEM MODAL -->
      <!-- ONLY ONE INSTANCE -->
      <!-- ========================================================= -->
      <AddBudgetItemModal v-model="showAddBudgetModal" currency="₦" @save="handleBudgetItemSave" />
    </div>
  </MainLayout>
</template>
