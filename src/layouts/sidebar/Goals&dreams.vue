<script setup>
import { ref, reactive, computed, watch } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useAppStore } from '@/stores/app'
import { useGoalsStore } from '@/stores/goals'
import { useTransactionsStore } from '@/stores/transactions'
import PageHeader from '@/components/PageHeader.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import Pill from '@/components/Pill.vue'

const app = useAppStore()
const goalsStore = useGoalsStore()
const transactionsStore = useTransactionsStore()

/* Shared via Pinia so Dashboard can read the same data */
const goals = goalsStore.goals

/* ----------------------------------------------------------------
  Color accents — cycles through a small palette so each goal card
  gets a distinct left-border + icon color, keyed by its index so
  the color stays stable even as goals are added/removed.
---------------------------------------------------------------- */
const accentPalette = [
  { bar: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-700', ring: 'ring-emerald-100' },
  { bar: 'bg-sky-500', chip: 'bg-sky-50 text-sky-700', ring: 'ring-sky-100' },
  { bar: 'bg-amber-500', chip: 'bg-amber-50 text-amber-700', ring: 'ring-amber-100' },
  { bar: 'bg-violet-500', chip: 'bg-violet-50 text-violet-700', ring: 'ring-violet-100' },
  { bar: 'bg-rose-500', chip: 'bg-rose-50 text-rose-700', ring: 'ring-rose-100' },
  { bar: 'bg-teal-500', chip: 'bg-teal-50 text-teal-700', ring: 'ring-teal-100' },
]

function accentFor(goal) {
  const index = goals.findIndex((g) => g.id === goal.id)
  return accentPalette[index % accentPalette.length]
}

function initialsFor(goal) {
  return goal.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function percentOf(goal) {
  if (!goal.target) return 0
  return Math.min(100, Math.round((goal.saved / goal.target) * 100))
}

function formatNaira(value) {
  return '₦' + Number(value || 0).toLocaleString('en-NG')
}

/* ---------------- Goals list — capped preview + "see all" popup ---------------- */
const visibleGoals = computed(() => goals.slice(0, 6))
const hiddenGoalCount = computed(() => Math.max(0, goals.length - 6))

const showAllGoalsModal = ref(false)

function openAllGoalsModal() {
  showAllGoalsModal.value = true
}

function closeAllGoalsModal() {
  showAllGoalsModal.value = false
}

function openGoalDetailFromAll(goal) {
  closeAllGoalsModal()
  openGoalDetail(goal)
}

/* ---------------- New goal modal ---------------- */
const showNewGoalModal = ref(false)
const newGoal = reactive({
  name: '',
  amount: '',
  description: '',
  timeframe: '',
})

function openNewGoalModal() {
  newGoal.name = ''
  newGoal.amount = ''
  newGoal.description = ''
  newGoal.timeframe = ''
  showNewGoalModal.value = true
}

function closeNewGoalModal() {
  showNewGoalModal.value = false
}

function createGoal() {
  const goal = goalsStore.createGoal({
    name: newGoal.name,
    amount: newGoal.amount,
    description: newGoal.description,
    timeframe: newGoal.timeframe
  })

  if (!goal) {
    app.showToast('Please fill in goal name and budget amount')
    return
  }

  app.showToast('New goal created')
  closeNewGoalModal()
}

/* ---------------- Goal detail modal ---------------- */
const selectedGoal = ref(null)

// Amount typed into the "Add money" field inside the detail modal —
// replaces window.prompt() entirely.
const addMoneyAmount = ref('')

function openGoalDetail(goal) {
  selectedGoal.value = goal
  addMoneyAmount.value = ''
}

function closeGoalDetail() {
  selectedGoal.value = null
  addMoneyAmount.value = ''
}

// Reset the field any time the selected goal changes, so leftover
// text from a previous goal never carries over.
watch(selectedGoal, () => {
  addMoneyAmount.value = ''
})

const addMoneyAmountNumber = computed(() => Number(addMoneyAmount.value))

const canAddMoney = computed(() => {
  if (!selectedGoal.value || selectedGoal.value.locked) return false
  return addMoneyAmount.value !== '' && addMoneyAmountNumber.value > 0
})

function confirmAddMoney() {
  const goal = selectedGoal.value
  if (!goal || !canAddMoney.value) return

  const amount = addMoneyAmountNumber.value
  const updated = goalsStore.addMoney(goal.id, amount)
  if (!updated) return

  transactionsStore.addTransaction({
    icon: '🎯',
    name: `Added to "${goal.name}"`,
    subtitle: 'Goal contribution',
    amount: -amount
  })

  app.showToast(`${formatNaira(amount)} added to ${goal.name}`)
  addMoneyAmount.value = ''
}

function toggleLockGoal(goal) {
  const updated = goalsStore.toggleLock(goal.id)
  if (!updated) return
  app.showToast(updated.locked ? `${goal.name} locked` : `${goal.name} unlocked`)
}
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Plan & Track"
        title="Goals & Dreams"
        subtitle="Turn the things you want into visible progress."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvgreen bg-green-600 text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-green-700 transition shadow-sm"
              @click="openNewGoalModal"
            >
              ＋ New goal
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Goals — listed items in a single card -->
      <BasePanel>
        <template #head>
          <div class="min-w-0">
            <h2 class="m-0 text-[15px] sm:text-[17px] font-bold text-[#17241f] truncate">
              Goals
            </h2>
            <p class="mt-0.5 text-[10px] text-bvmuted">Your goals and their progress</p>
          </div>

          <button
            v-if="hiddenGoalCount > 0"
            type="button"
            @click="openAllGoalsModal"
            class="shrink-0 border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2 transition-all duration-200 hover:translate-x-1 whitespace-nowrap"
          >
            See all goals →
          </button>
        </template>

        <div v-if="goals.length" class="flex flex-col gap-2.5">
          <button
            v-for="goal in visibleGoals"
            :key="goal.id"
            type="button"
            @click="openGoalDetail(goal)"
            class="group relative w-full overflow-hidden rounded-[13px] border border-[#e9edea] bg-white pl-4 pr-3.5 py-3.5 text-left transition hover:border-[#d7e2dc] hover:shadow-sm"
          >
            <!-- Color accent bar -->
            <span
              class="absolute left-0 top-0 h-full w-[4px]"
              :class="accentFor(goal).bar"
            />

            <div class="flex items-center justify-between gap-3">
              <div class="flex min-w-0 flex-1 items-center gap-3">
                <!-- Icon chip -->
                <div
                  class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[11px] font-bold ring-4"
                  :class="[accentFor(goal).chip, accentFor(goal).ring]"
                >
                  {{ initialsFor(goal) }}
                </div>

                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-[12.5px] font-bold text-[#26352f] truncate">
                      {{ goal.name }}
                    </span>
                    <span
                      v-if="goal.locked"
                      class="shrink-0 text-[9.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5"
                    >
                      🔒 Locked
                    </span>
                  </div>
                  <p class="mt-0.5 text-[10.5px] text-bvmuted truncate">
                    {{ goal.description }}
                  </p>
                </div>
              </div>

              <div class="w-[110px] xs:w-[130px] sm:w-[150px] shrink-0 text-right">
                <div class="flex items-baseline justify-end gap-1">
                  <b class="text-[12px] text-[#26352f]">{{ formatNaira(goal.saved) }}</b>
                  <span class="text-[9.5px] text-bvmuted">/ {{ formatNaira(goal.target) }}</span>
                </div>
                <div class="mt-1.5">
                  <ProgressTrack :percent="percentOf(goal)" height="5px" />
                </div>
              </div>
            </div>
          </button>
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="rounded-[13px] border border-dashed border-[#dce5e1] bg-[#fafcfb] p-6 text-center"
        >
          <div class="text-[12px] font-bold text-[#26352f]">No goals yet</div>
          <p class="mt-1 text-[10px] leading-4 text-bvmuted">
            Create your first goal to start tracking it here.
          </p>
          <button
            type="button"
            @click="openNewGoalModal"
            class="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-[11px] font-bold text-white transition hover:bg-emerald-700"
          >
            New goal
          </button>
        </div>

        <!-- Shows only when there are more than 6 goals -->
        <button
          v-if="hiddenGoalCount > 0"
          type="button"
          @click="openAllGoalsModal"
          class="mt-3 w-full rounded-xl border border-dashed border-[#dce5e1] py-2.5 text-[11px] font-bold text-bvgreen2 transition hover:bg-[#f6faf8]"
        >
          +{{ hiddenGoalCount }} more — see all goals →
        </button>
      </BasePanel>

      <!-- Timeline + Habits -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <!-- Goal timeline -->
        <BasePanel title="Goal timeline" meta="2026">
          <div class="relative ml-2 pl-5">
            <div class="absolute left-0 top-1 bottom-1 w-[2px] bg-[#dfe7e3]" />

            <div class="relative pb-5">
              <div class="absolute -left-[22px] top-[4px] w-2.5 h-2.5 rounded-full bg-[#168064] border-[3px] border-[#e5f4ee]" />
              <b class="text-[12.5px]">Emergency Fund reaches 75%</b>
              <p class="text-[11px] text-bvmuted mt-1 leading-relaxed">
                Expected in 2 weeks at your current savings pace.
              </p>
            </div>

            <div class="relative pb-5">
              <div class="absolute -left-[22px] top-[4px] w-2.5 h-2.5 rounded-full bg-[#168064] border-[3px] border-[#e5f4ee]" />
              <b class="text-[12.5px]">Laptop fund reaches ₦200,000</b>
              <p class="text-[11px] text-bvmuted mt-1 leading-relaxed">
                Expected in August if you maintain monthly contributions.
              </p>
            </div>

            <div class="relative">
              <div class="absolute -left-[22px] top-[4px] w-2.5 h-2.5 rounded-full bg-[#168064] border-[3px] border-[#e5f4ee]" />
              <b class="text-[12.5px]">Trip fund review</b>
              <p class="text-[11px] text-bvmuted mt-1 leading-relaxed">
                Review in September before increasing travel allocation.
              </p>
            </div>
          </div>
        </BasePanel>

        <!-- Goal habits -->
        <BasePanel title="Goal habits" meta="Coach">
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <span class="text-[12px] text-bvmuted">Automatic contributions</span>
            <Pill variant="green">3 active</Pill>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <span class="text-[12px] text-bvmuted">Goals on track</span>
            <Pill variant="green">2 of 3</Pill>
          </div>
          <div class="flex justify-between items-center py-3">
            <span class="text-[12px] text-bvmuted">Needs attention</span>
            <Pill variant="gold">1</Pill>
          </div>
        </BasePanel>
      </div>
    </div>

    <!-- ===================== New Goal Modal ===================== -->
    <Transition name="fade">
      <div
        v-if="showNewGoalModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 mt-10"
        @click.self="closeNewGoalModal"
      >
        <div class="bg-white rounded-[18px] shadow-xl w-full max-w-md p-5 sm:p-6 animate-[slideUp_.15s_ease]">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-[16px] font-bold text-gray-900 m-0">Create a new goal</h2>
            <button
              class="text-bvmuted hover:text-gray-700 text-[18px] leading-none"
              @click="closeNewGoalModal"
            >
              ✕
            </button>
          </div>

          <div class="space-y-3.5">
            <div>
              <label class="block text-[11.5px] font-semibold text-gray-700 mb-1">
                Goal / Dream name
              </label>
              <input
                v-model="newGoal.name"
                type="text"
                placeholder="e.g. New Car, Wedding, Rent"
                class="w-full border border-bvline rounded-[10px] px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
              />
            </div>

            <div>
              <label class="block text-[11.5px] font-semibold text-gray-700 mb-1">
                Goal budget amount
              </label>
              <input
                v-model="newGoal.amount"
                type="number"
                min="0"
                placeholder="e.g. 300000"
                class="w-full border border-bvline rounded-[10px] px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
              />
            </div>

            <div>
              <label class="block text-[11.5px] font-semibold text-gray-700 mb-1">
                Goal & budget description
              </label>
              <textarea
                v-model="newGoal.description"
                rows="3"
                placeholder="What is this goal for and how will you fund it?"
                class="w-full border border-bvline rounded-[10px] px-3 py-2.5 text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
              />
            </div>

            <div>
              <label class="block text-[11.5px] font-semibold text-gray-700 mb-1">
                Time frame for goal withdrawal
              </label>
              <input
                v-model="newGoal.timeframe"
                type="text"
                placeholder="e.g. 6 months, December 2026"
                class="w-full border border-bvline rounded-[10px] px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
              />
            </div>
          </div>

          <div class="flex gap-2.5 mt-5">
            <button
              class="flex-1 border border-bvline rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] hover:bg-gray-50 transition"
              @click="closeNewGoalModal"
            >
              Cancel
            </button>
            <button
              class="flex-1 bg-green-600 text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] hover:bg-green-700 transition shadow-sm"
              @click="createGoal"
            >
              Create goal
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===================== See All Goals Modal ===================== -->
    <Transition name="fade">
      <div
        v-if="showAllGoalsModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        @click.self="closeAllGoalsModal"
      >
        <div
          class="flex w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[85vh] flex-col overflow-hidden rounded-[18px] bg-white shadow-xl animate-[slideUp_.15s_ease]"
        >
          <!-- Header -->
          <div class="flex shrink-0 items-center justify-between border-b border-[#eff0ed] px-5 pb-3 pt-5">
            <div>
              <h2 class="text-[16px] font-bold text-gray-900 m-0">All goals</h2>
              <p class="mt-0.5 text-[10.5px] text-bvmuted">
                {{ goals.length }} goal{{ goals.length === 1 ? '' : 's' }} total
              </p>
            </div>
            <button
              class="text-bvmuted hover:text-gray-700 text-[18px] leading-none"
              @click="closeAllGoalsModal"
            >
              ✕
            </button>
          </div>

          <!-- List -->
          <div class="flex-1 overflow-y-auto px-5 py-3">
            <div v-if="goals.length" class="flex flex-col gap-2.5">
              <button
                v-for="goal in goals"
                :key="goal.id"
                type="button"
                @click="openGoalDetailFromAll(goal)"
                class="group relative w-full overflow-hidden rounded-[13px] border border-[#e9edea] bg-white pl-4 pr-3.5 py-3.5 text-left transition hover:border-[#d7e2dc] hover:shadow-sm"
              >
                <span
                  class="absolute left-0 top-0 h-full w-[4px]"
                  :class="accentFor(goal).bar"
                />

                <div class="flex items-center justify-between gap-3">
                  <div class="flex min-w-0 flex-1 items-center gap-3">
                    <div
                      class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[11px] font-bold ring-4"
                      :class="[accentFor(goal).chip, accentFor(goal).ring]"
                    >
                      {{ initialsFor(goal) }}
                    </div>

                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-[12.5px] font-bold text-[#26352f] truncate">
                          {{ goal.name }}
                        </span>
                        <span
                          v-if="goal.locked"
                          class="shrink-0 text-[9.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5"
                        >
                          🔒 Locked
                        </span>
                      </div>
                      <p class="mt-0.5 text-[10.5px] text-bvmuted truncate">
                        {{ goal.description }}
                      </p>
                    </div>
                  </div>

                  <div class="w-[110px] xs:w-[130px] sm:w-[150px] shrink-0 text-right">
                    <div class="flex items-baseline justify-end gap-1">
                      <b class="text-[12px] text-[#26352f]">{{ formatNaira(goal.saved) }}</b>
                      <span class="text-[9.5px] text-bvmuted">/ {{ formatNaira(goal.target) }}</span>
                    </div>
                    <div class="mt-1.5">
                      <ProgressTrack :percent="percentOf(goal)" height="5px" />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div v-else class="py-10 text-center">
              <div class="text-[12px] font-bold text-[#26352f]">No goals yet</div>
              <p class="mt-1 text-[10px] leading-4 text-bvmuted">
                Create your first goal to see it here.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="shrink-0 border-t border-[#eff0ed] px-5 py-4">
            <button
              type="button"
              @click="closeAllGoalsModal(); openNewGoalModal()"
              class="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              ＋ New goal
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===================== Goal Detail Modal ===================== -->
    <Transition name="fade">
      <div
        v-if="selectedGoal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        @click.self="closeGoalDetail"
      >
        <div class="bg-white rounded-[18px] shadow-xl w-full max-w-sm p-5 sm:p-6 animate-[slideUp_.15s_ease]">
          <div class="flex items-start justify-between mb-3">
            <h2 class="text-[16px] font-bold text-gray-900 m-0">{{ selectedGoal.name }}</h2>
            <button
              class="text-bvmuted hover:text-gray-700 text-[18px] leading-none"
              @click="closeGoalDetail"
            >
              ✕
            </button>
          </div>

          <p class="text-[12px] text-bvmuted leading-relaxed mb-4">
            {{ selectedGoal.description }}
          </p>

          <strong class="text-[24px] block mb-2">{{ formatNaira(selectedGoal.saved) }}</strong>
          <ProgressTrack :percent="percentOf(selectedGoal)" />
          <div class="text-[11px] text-bvmuted mt-2 mb-4">
            {{ percentOf(selectedGoal) }}% of {{ formatNaira(selectedGoal.target) }}
          </div>

          <div class="flex justify-between items-center py-2 border-t border-[#eff0ed] text-[12px]">
            <span class="text-bvmuted">Time frame</span>
            <span class="font-semibold text-gray-900">{{ selectedGoal.timeframe }}</span>
          </div>
          <div class="flex justify-between items-center py-2 border-t border-b border-[#eff0ed] text-[12px] mb-4">
            <span class="text-bvmuted">Status</span>
            <Pill :variant="selectedGoal.locked ? 'gold' : 'green'">
              {{ selectedGoal.locked ? 'Locked' : 'Active' }}
            </Pill>
          </div>

          <!-- Add money — inline amount input, replaces window.prompt() -->
          <div v-if="!selectedGoal.locked">
            <label class="block text-[11.5px] font-semibold text-gray-700 mb-1">
              Add money (₦)
            </label>
            <div class="flex gap-2">
              <input
                v-model="addMoneyAmount"
                type="number"
                min="0"
                placeholder="e.g. 5000"
                class="w-full border border-bvline rounded-[10px] px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
                @keyup.enter="confirmAddMoney"
              />
              <button
                type="button"
                :disabled="!canAddMoney"
                @click="confirmAddMoney"
                class="shrink-0 rounded-[10px] bg-green-600 px-4 py-2.5 text-[12.5px] font-bold text-white transition hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>

          <div class="flex gap-2.5 mt-5">
            <button
              v-if="selectedGoal.locked"
              class="flex-1 border border-bvline rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] hover:bg-gray-50 transition"
              @click="toggleLockGoal(selectedGoal)"
            >
              🔓 Unlock goal
            </button>
            <button
              v-else
              class="flex-1 border border-bvline rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] hover:bg-gray-50 transition"
              @click="toggleLockGoal(selectedGoal)"
            >
              🔒 Lock goal
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </MainLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>