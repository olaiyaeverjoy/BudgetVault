<script setup>
import { computed, ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

const editingBudget = ref(false)

const user = ref({
  name: 'Oladimeji Emmanuel',
  email: 'oladimeji@example.com',
  phone: '+234 801 234 5678',
  memberSince: 'May 2026',
  status: 'Account active'
})

const personal = ref({
  firstName: 'Oladimeji',
  lastName: 'Emmanuel',
  email: 'oladimeji@example.com',
  phone: '+234 801 234 5678',
  dob: '',
  country: 'Nigeria',
  currency: 'NGN — Nigerian Naira',
  timezone: 'Africa/Lagos'
})

const budget = ref({
  monthly: 650000,
  cycleType: 'Monthly',
  renewDay: '1st',
  withdrawalWindow: '1-7',
  autoRenew: true
})

const spending = ref({
  dailyReminders: true,
  categoryAlerts: true,
  categoryThreshold: 80,
  overspending: true,
  lowBalance: true,
  lowBalanceThreshold: 50000
})

const vaults = ref([
  {
    name: 'Rent',
    amount: 100000,
    goal: 300000,
    icon: 'mdi-home-outline',
    color: '#168064',
    auto: true
  },
  {
    name: 'Emergency',
    amount: 85000,
    goal: 500000,
    icon: 'mdi-shield-check-outline',
    color: '#4f79ff',
    auto: true
  },
  {
    name: 'Travel',
    amount: 42000,
    goal: 200000,
    icon: 'mdi-airplane-outline',
    color: '#d28a22',
    auto: false
  }
])

const personality = ref({
  name: 'The Steady Builder',
  type: 'Builder',
  desc: 'You prefer visible progress, protected commitments, and practical goals over risky financial decisions.',
  traits: [
    { label: 'Planning', value: 88, level: 'Strong' },
    { label: 'Consistency', value: 74, level: 'Growing' },
    { label: 'Impulse control', value: 46, level: 'Watch' }
  ]
})

const vaultAutomation = ref({
  autoCreateRecurring: true,
  notifications: true,
  contributionFrequency: 'Monthly'
})

const aiCoach = ref({
  style: 'Balanced',
  frequency: 'Weekly',
  focus: {
    spending: true,
    saving: true,
    budgeting: true,
    debt: false,
    vaultGoals: true,
    investing: false
  }
})

const security = ref({
  passwordLastChanged: 24,
  twoFA: true,
  sessions: [
    {
      device: 'Chrome on Windows',
      location: 'Lagos',
      current: true
    },
    {
      device: 'Mobile app',
      location: 'Lagos',
      current: false
    }
  ]
})

const subscription = ref({
  plan: 'Free',
  nextBilling: '—',
  price: '₦0 / month'
})

const connectedAccounts = ref([
  {
    bank: 'Access Bank',
    last4: '4821',
    synced: 'Today',
    status: 'Connected'
  }
])

const countryOptions = ['Nigeria', 'Ghana', 'United Kingdom', 'United States']

const currencyOptions = [
  'NGN — Nigerian Naira',
  'GHS — Ghanaian Cedi',
  'GBP — British Pound',
  'USD — US Dollar'
]

const tzOptions = ['Africa/Lagos', 'Africa/Accra', 'Europe/London', 'America/New_York']

const totalStored = computed(() => vaults.value.reduce((sum, vault) => sum + vault.amount, 0))

const totalGoal = computed(() => vaults.value.reduce((sum, vault) => sum + vault.goal, 0))

const vaultPct = computed(() => {
  if (!totalGoal.value) return 0
  return Math.min(100, Math.round((totalStored.value / totalGoal.value) * 100))
})

const ngn = (amount) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount)

const saveBudget = () => {
  editingBudget.value = false
  // Save to Supabase here
}

const addVault = () => {
  // Open your Add Vault modal here
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-[#f7f8f6]">
      <!-- CONTENT -->
      <main class="flex-1">
        <div class="max-w-[1050px] mx-auto px-4 sm:px-6 lg:px-10 py-7 lg:py-10">
          <!-- PAGE HEADER -->
          <div class="mb-8">
            <div class="text-[10px] uppercase tracking-[.16em] font-extrabold text-bvgreen2 mb-2">
              Account settings
            </div>

            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 class="text-[28px] sm:text-[32px] font-bold tracking-tight text-gray-900">
                  Your profile
                </h1>

                <p class="text-[13px] text-bvmuted mt-1 max-w-xl">
                  Manage your personal details, budget behaviour, vaults, notifications and
                  financial preferences.
                </p>
              </div>

              <button
                class="px-4 py-2.5 rounded-[11px] bg-[#17382e] text-white text-[12px] font-bold hover:bg-[#215344] transition"
              >
                Save changes
              </button>
            </div>
          </div>

          <!-- 01 OVERVIEW -->
          <section id="overview" class="scroll-mt-24 mb-10">
            <div class="relative overflow-hidden rounded-[20px] bg-[#17382e] text-white p-6 sm:p-8">
              <div class="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-[#f4bf08]/10"></div>

              <div
                class="absolute right-10 bottom-[-80px] w-48 h-48 rounded-full bg-[#168064]/20"
              ></div>

              <div class="relative flex flex-col sm:flex-row sm:items-center gap-5">
                <!-- Avatar -->
                <div
                  class="w-[78px] h-[78px] shrink-0 rounded-full bg-[#f4bf08] text-[#17382e] grid place-items-center"
                >
                  <span class="text-[22px] font-black"> OE </span>
                </div>

                <div class="flex-1">
                  <div class="text-[9px] uppercase tracking-[.16em] text-white/45 mb-1">
                    Member since {{ user.memberSince }}
                  </div>

                  <h2 class="text-[25px] sm:text-[28px] font-bold">
                    {{ user.name }}
                  </h2>

                  <div
                    class="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-5 text-[11px] text-white/60"
                  >
                    <span class="flex items-center gap-1.5">
                      <i class="mdi mdi-email-outline"></i>
                      {{ user.email }}
                    </span>

                    <span class="flex items-center gap-1.5">
                      <i class="mdi mdi-phone-outline"></i>
                      {{ user.phone }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-col sm:items-end gap-3">
                  <span class="flex items-center gap-2 text-[10px] font-bold text-[#9bd6c4]">
                    <span class="w-2 h-2 rounded-full bg-[#59c39a]"></span>
                    {{ user.status }}
                  </span>

                  <button
                    class="px-3.5 py-2 rounded-[10px] border border-white/15 bg-white/[.06] text-white text-[11px] font-bold hover:bg-white/10 transition"
                  >
                    Edit profile
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- 02 PERSONAL -->
          <section id="personal" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="02"
              title="Personal information"
              description="Basic information used to personalise your Budget Vault experience."
            />

            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="profile-label">First name</label>
                  <input v-model="personal.firstName" type="text" class="profile-input" />
                </div>

                <div>
                  <label class="profile-label">Last name</label>
                  <input v-model="personal.lastName" type="text" class="profile-input" />
                </div>

                <div>
                  <label class="profile-label">Email address</label>
                  <input v-model="personal.email" type="email" class="profile-input" />
                </div>

                <div>
                  <label class="profile-label">Phone number</label>
                  <input v-model="personal.phone" type="tel" class="profile-input" />
                </div>

                <div>
                  <label class="profile-label">Date of birth</label>
                  <input v-model="personal.dob" type="date" class="profile-input" />
                </div>

                <div>
                  <label class="profile-label">Country</label>
                  <select v-model="personal.country" class="profile-input">
                    <option v-for="country in countryOptions" :key="country">
                      {{ country }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="profile-label">Default currency</label>
                  <select v-model="personal.currency" class="profile-input">
                    <option v-for="currency in currencyOptions" :key="currency">
                      {{ currency }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="profile-label">Time zone</label>
                  <select v-model="personal.timezone" class="profile-input">
                    <option v-for="timezone in tzOptions" :key="timezone">
                      {{ timezone }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mt-4 p-3 rounded-xl bg-[#f7faf8] text-[11px] text-bvmuted">
                Your currency and time zone determine how amounts, dates and budget cycles are
                displayed throughout Budget Vault.
              </div>
            </div>
          </section>

          <!-- 03 BUDGET -->
          <section id="budget" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="03"
              title="Budget preferences"
              description="Control how much you budget and how your monthly budget behaves."
            />

            <!-- Budget amount -->
            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card mb-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-[9px] uppercase tracking-[.14em] font-extrabold text-bvmuted">
                    Default budget
                  </div>

                  <div class="text-[28px] font-black text-bvgreen2 mt-1">
                    {{ ngn(budget.monthly) }}
                  </div>

                  <div class="text-[11px] text-bvmuted mt-1">
                    Your current monthly budgeting amount
                  </div>
                </div>

                <button
                  @click="editingBudget = !editingBudget"
                  class="px-3.5 py-2 rounded-[10px] border border-bvline text-[11px] font-bold hover:bg-gray-50 transition"
                >
                  {{ editingBudget ? 'Close editor' : 'Edit budget' }}
                </button>
              </div>

              <div v-if="editingBudget" class="mt-5 pt-5 border-t border-[#eff0ed]">
                <label class="profile-label"> How much would you like to budget? </label>

                <div class="flex flex-col sm:flex-row gap-2">
                  <input
                    v-model.number="budget.monthly"
                    type="number"
                    min="0"
                    class="profile-input max-w-sm"
                  />

                  <button
                    @click="saveBudget"
                    class="px-4 py-2.5 rounded-[10px] bg-[#17382e] text-white text-[11px] font-bold"
                  >
                    Save budget
                  </button>
                </div>
              </div>
            </div>

            <!-- Budget cycle -->
            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card mb-4">
              <div class="flex items-start gap-3 mb-5">
                <div class="w-9 h-9 rounded-xl bg-[#eaf5f0] text-bvgreen2 grid place-items-center">
                  <i class="mdi mdi-calendar-refresh-outline"></i>
                </div>

                <div>
                  <div class="font-bold text-[13px]">Budget cycle</div>

                  <div class="text-[11px] text-bvmuted mt-0.5">
                    Your budget renews automatically according to these settings.
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="profile-label"> Budget frequency </label>

                  <select v-model="budget.cycleType" class="profile-input">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                  </select>
                </div>

                <div>
                  <label class="profile-label"> Renewal date </label>

                  <select v-model="budget.renewDay" class="profile-input">
                    <option>1st</option>
                    <option>7th</option>
                    <option>15th</option>
                    <option>Last day</option>
                  </select>
                </div>
              </div>

              <!-- Auto renew -->
              <div
                class="mt-5 pt-4 border-t border-[#eff0ed] flex items-center justify-between gap-4"
              >
                <div>
                  <div class="text-[12px] font-bold">Automatic budget renewal</div>

                  <div class="text-[10.5px] text-bvmuted mt-0.5">
                    Automatically create the next budget cycle.
                  </div>
                </div>

                <label class="relative inline-flex cursor-pointer">
                  <input v-model="budget.autoRenew" type="checkbox" class="sr-only peer" />

                  <div
                    class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#168064] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"
                  ></div>
                </label>
              </div>
            </div>

            <!-- Withdrawal -->
            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div class="text-[9px] uppercase tracking-[.14em] font-extrabold text-bvmuted mb-1">
                Budget withdrawal window
              </div>

              <p class="text-[11px] text-bvmuted mb-4">
                Choose when your budget can be withdrawn from your account after each monthly cycle
                begins.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label
                  v-for="window in [
                    { value: '1-7', label: '1–7 days' },
                    { value: '7-12', label: '7–12 days' },
                    { value: 'custom', label: 'Custom' }
                  ]"
                  :key="window.value"
                  class="cursor-pointer"
                >
                  <input
                    v-model="budget.withdrawalWindow"
                    type="radio"
                    :value="window.value"
                    class="peer sr-only"
                  />

                  <div
                    class="rounded-xl border border-bvline p-3 text-center text-[11px] font-bold peer-checked:border-[#168064] peer-checked:bg-[#edf8f3] peer-checked:text-[#168064] transition"
                  >
                    {{ window.label }}
                  </div>
                </label>
              </div>
            </div>
          </section>

          <!-- 04 SPENDING -->
          <section id="spending" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="04"
              title="Spending preferences"
              description="Decide how Budget Vault should keep you informed about your spending."
            />

            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <!-- Reminder -->
              <div class="setting-row">
                <div>
                  <div class="setting-title">Daily spending reminders</div>
                  <div class="setting-description">
                    Notify me when I'm approaching my daily safe-spend limit.
                  </div>
                </div>

                <Toggle v-model="spending.dailyReminders" />
              </div>

              <!-- Category -->
              <div class="setting-row block">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="setting-title">Category alerts</div>
                    <div class="setting-description">
                      Alert me when a category reaches
                      {{ spending.categoryThreshold }}%.
                    </div>
                  </div>

                  <Toggle v-model="spending.categoryAlerts" />
                </div>

                <div v-if="spending.categoryAlerts" class="mt-4">
                  <input
                    v-model.number="spending.categoryThreshold"
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    class="w-full accent-[#168064]"
                  />

                  <div class="flex justify-between text-[10px] text-bvmuted mt-1">
                    <span>50%</span>
                    <strong class="text-bvgreen2"> {{ spending.categoryThreshold }}% </strong>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <!-- Overspending -->
              <div class="setting-row">
                <div>
                  <div class="setting-title">Overspending alerts</div>
                  <div class="setting-description">Alert me when I exceed a budget category.</div>
                </div>

                <Toggle v-model="spending.overspending" />
              </div>

              <!-- Low balance -->
              <div class="setting-row block border-b-0">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="setting-title">Low balance alerts</div>
                    <div class="setting-description">
                      Alert me when my available balance drops below
                      {{ ngn(spending.lowBalanceThreshold) }}.
                    </div>
                  </div>

                  <Toggle v-model="spending.lowBalance" />
                </div>

                <div v-if="spending.lowBalance" class="mt-4 max-w-[250px]">
                  <label class="profile-label"> Balance threshold </label>

                  <input
                    v-model.number="spending.lowBalanceThreshold"
                    type="number"
                    class="profile-input"
                  />
                </div>
              </div>
            </div>
          </section>

          <!-- 05 VAULTS -->
          <section id="vaults" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="05"
              title="Smart Vaults"
              description="Manage your savings goals and automate contributions."
            />

            <!-- Vault overview -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div class="bg-white border border-bvline rounded-[18px] p-4 shadow-card">
                <div class="text-[9px] uppercase tracking-[.13em] text-bvmuted font-bold">
                  Total stored
                </div>

                <div class="text-[20px] font-black text-bvgreen2 mt-1">
                  {{ ngn(totalStored) }}
                </div>

                <div class="text-[10px] text-bvmuted mt-1">Across all vaults</div>
              </div>

              <div class="bg-white border border-bvline rounded-[18px] p-4 shadow-card">
                <div class="text-[9px] uppercase tracking-[.13em] text-bvmuted font-bold">
                  Total target
                </div>

                <div class="text-[20px] font-black text-gray-900 mt-1">
                  {{ ngn(totalGoal) }}
                </div>

                <div class="text-[10px] text-bvmuted mt-1">Current vault goals</div>
              </div>

              <div class="bg-[#17382e] text-white rounded-[18px] p-4 shadow-card">
                <div class="text-[9px] uppercase tracking-[.13em] text-white/45 font-bold">
                  Overall progress
                </div>

                <div class="text-[20px] font-black mt-1">{{ vaultPct }}%</div>

                <div class="text-[10px] text-white/55 mt-1">Progress toward goals</div>
              </div>
            </div>

            <!-- Vault list -->
            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-[14px] font-bold">Your vaults</h3>

                  <p class="text-[10px] text-bvmuted mt-0.5">
                    Each vault tracks progress toward a specific goal.
                  </p>
                </div>

                <button
                  @click="addVault"
                  class="px-3 py-2 rounded-[10px] bg-[#17382e] text-white text-[10px] font-bold"
                >
                  + Add vault
                </button>
              </div>

              <div
                v-for="(vault, index) in vaults"
                :key="vault.name"
                class="py-4"
                :class="index < vaults.length - 1 ? 'border-b border-[#eff0ed]' : ''"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl grid place-items-center shrink-0"
                    :style="{ background: vault.color + '15' }"
                  >
                    <i
                      class="mdi text-[19px]"
                      :class="vault.icon"
                      :style="{ color: vault.color }"
                    ></i>
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between gap-3">
                      <div>
                        <div class="text-[12px] font-bold">
                          {{ vault.name }}
                        </div>

                        <div class="text-[10px] text-bvmuted mt-0.5">
                          {{ ngn(vault.amount) }} of
                          {{ ngn(vault.goal) }}
                        </div>
                      </div>

                      <strong class="text-[11px]" :style="{ color: vault.color }">
                        {{ Math.min(100, Math.round((vault.amount / vault.goal) * 100)) }}%
                      </strong>
                    </div>

                    <!-- Progress -->
                    <div class="h-1.5 bg-[#edf1ef] rounded-full mt-2 overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all"
                        :style="{
                          width: `${Math.min(100, (vault.amount / vault.goal) * 100)}%`,
                          background: vault.color
                        }"
                      ></div>
                    </div>
                  </div>

                  <Toggle v-model="vault.auto" />
                </div>
              </div>

              <div class="mt-4 p-3 rounded-xl bg-[#f7faf8] flex gap-3">
                <i class="mdi mdi-information-outline text-bvgreen2"></i>

                <p class="text-[10px] text-bvmuted">
                  Auto-contribution moves your selected amount into a vault according to your chosen
                  contribution schedule.
                </p>
              </div>
            </div>

            <!-- Automation -->
            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card mt-4">
              <div class="text-[9px] uppercase tracking-[.14em] font-extrabold text-bvmuted mb-3">
                Vault automation
              </div>

              <div class="setting-row">
                <div>
                  <div class="setting-title">Auto-create recurring vaults</div>
                  <div class="setting-description">Automatically create recurring vault goals.</div>
                </div>

                <Toggle v-model="vaultAutomation.autoCreateRecurring" />
              </div>

              <div class="setting-row">
                <div>
                  <div class="setting-title">Vault notifications</div>
                  <div class="setting-description">
                    Notify me about contributions and goal progress.
                  </div>
                </div>

                <Toggle v-model="vaultAutomation.notifications" />
              </div>

              <div class="pt-4">
                <label class="profile-label"> Contribution frequency </label>

                <select
                  v-model="vaultAutomation.contributionFrequency"
                  class="profile-input max-w-xs"
                >
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>
            </div>
          </section>

          <!-- 06 PERSONALITY -->
          <section id="personality" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="06"
              title="Money personality"
              description="Understand how your natural financial behaviour shapes your decisions."
            />

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <!-- Personality -->
              <div class="bg-white border border-bvline rounded-[18px] shadow-card p-6 text-center">
                <div
                  class="relative w-[145px] h-[145px] rounded-full mx-auto"
                  style="
                    background: conic-gradient(
                      #168064 0 34%,
                      #f4bf08 34% 58%,
                      #4f79ff 58% 82%,
                      #d84f83 82% 100%
                    );
                  "
                >
                  <div class="absolute inset-[12px] rounded-full bg-white grid place-items-center">
                    <div>
                      <div class="text-[17px] font-black text-[#17382e]">
                        {{ personality.type }}
                      </div>

                      <div class="text-[8px] uppercase tracking-[.12em] text-bvmuted mt-1">
                        Personality
                      </div>
                    </div>
                  </div>
                </div>

                <h3 class="text-[19px] font-bold mt-5">
                  {{ personality.name }}
                </h3>

                <p class="text-[12px] text-bvmuted leading-relaxed max-w-sm mx-auto mt-2">
                  {{ personality.desc }}
                </p>

                <button
                  class="mt-5 text-[11px] font-extrabold text-bvgreen2 hover:translate-x-1 transition"
                >
                  Retake assessment →
                </button>
              </div>

              <!-- Signals -->
              <div class="bg-white border border-bvline rounded-[18px] shadow-card p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-[15px] font-bold">Your money signals</h3>

                  <span class="text-[9px] uppercase tracking-wider text-bvmuted"> Current </span>
                </div>

                <div
                  v-for="(trait, index) in personality.traits"
                  :key="trait.label"
                  class="py-4"
                  :class="index < personality.traits.length - 1 ? 'border-b border-[#eff0ed]' : ''"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[12px] font-bold">
                      {{ trait.label }}
                    </span>

                    <span
                      class="text-[10px] font-bold"
                      :class="trait.level === 'Watch' ? 'text-[#bd5d18]' : 'text-bvgreen2'"
                    >
                      {{ trait.level }}
                    </span>
                  </div>

                  <div class="h-1.5 rounded-full bg-[#edf1ef] overflow-hidden">
                    <div
                      class="h-full rounded-full"
                      :class="trait.level === 'Watch' ? 'bg-[#bd5d18]' : 'bg-[#168064]'"
                      :style="{ width: `${trait.value}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 07 NOTIFICATIONS -->
          <section id="notifications" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="07"
              title="Notifications"
              description="Choose what Budget Vault should notify you about."
            />

            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div
                v-for="item in [
                  [
                    'Budget cycle reminders',
                    'Remind me when a new budget cycle is about to begin.'
                  ],
                  ['Vault progress', 'Notify me when I reach important vault milestones.'],
                  ['Spending alerts', 'Notify me when my spending needs attention.'],
                  ['AI Coach insights', 'Send useful financial insights and recommendations.']
                ]"
                :key="item[0]"
                class="setting-row"
              >
                <div>
                  <div class="setting-title">
                    {{ item[0] }}
                  </div>

                  <div class="setting-description">
                    {{ item[1] }}
                  </div>
                </div>

                <Toggle :model-value="true" />
              </div>
            </div>
          </section>

          <!-- 08 SECURITY -->
          <section id="security" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="08"
              title="Security"
              description="Protect your account and financial information."
            />

            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div class="setting-row">
                <div>
                  <div class="setting-title">Password</div>

                  <div class="setting-description">
                    Last changed {{ security.passwordLastChanged }} days ago.
                  </div>
                </div>

                <button class="outline-button">Change password</button>
              </div>

              <div class="setting-row">
                <div>
                  <div class="setting-title">Two-factor authentication</div>

                  <div class="setting-description">
                    Add an additional layer of protection to your account.
                  </div>
                </div>

                <Toggle v-model="security.twoFA" />
              </div>

              <div class="pt-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <div class="setting-title">Active sessions</div>

                    <div class="setting-description">
                      Devices currently signed into your account.
                    </div>
                  </div>

                  <button class="text-[10px] font-bold text-red-600">Sign out all</button>
                </div>

                <div
                  v-for="session in security.sessions"
                  :key="session.device"
                  class="flex items-center justify-between py-3 border-t border-[#eff0ed]"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#f4f6f4] grid place-items-center">
                      <i class="mdi mdi-devices text-bvmuted"></i>
                    </div>

                    <div>
                      <div class="text-[11px] font-bold">
                        {{ session.device }}
                      </div>

                      <div class="text-[9px] text-bvmuted">
                        {{ session.location }}
                      </div>
                    </div>

                    <span
                      v-if="session.current"
                      class="text-[8px] px-2 py-1 rounded-full bg-[#eaf6f0] text-bvgreen2 font-bold"
                    >
                      This device
                    </span>
                  </div>

                  <button class="text-[10px] font-bold text-bvmuted">Manage</button>
                </div>
              </div>
            </div>
          </section>

          <!-- 09 CONNECTED -->
          <section id="connected" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="09"
              title="Connected accounts"
              description="Manage the bank accounts connected to Budget Vault."
            />

            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div
                v-for="account in connectedAccounts"
                :key="account.last4"
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-[#eaf5f0] grid place-items-center">
                    <i class="mdi mdi-bank-outline text-bvgreen2 text-[19px]"></i>
                  </div>

                  <div>
                    <div class="text-[12px] font-bold">
                      {{ account.bank }}
                    </div>

                    <div class="text-[10px] text-bvmuted">
                      •••• {{ account.last4 }} · Synced {{ account.synced }}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span
                    class="px-2 py-1 rounded-full bg-[#eaf6f0] text-bvgreen2 text-[9px] font-bold"
                  >
                    {{ account.status }}
                  </span>

                  <button class="outline-button">Refresh</button>

                  <button class="text-[10px] font-bold text-red-600">Disconnect</button>
                </div>
              </div>

              <button
                class="mt-5 px-4 py-2.5 rounded-[10px] bg-[#edf8f3] text-bvgreen2 text-[11px] font-bold"
              >
                + Connect account
              </button>

              <p class="text-[10px] text-bvmuted mt-4">
                Budget Vault does not store your banking credentials. Connections are handled
                through secure bank authorization.
              </p>
            </div>
          </section>

          <!-- 10 AI COACH -->
          <section id="coach" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="10"
              title="AI Coach"
              description="Personalise how Budget Vault's financial coach works with you."
            />

            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div class="mb-6">
                <div class="setting-title mb-3">Coaching style</div>

                <div class="grid grid-cols-3 gap-2">
                  <label
                    v-for="style in ['Gentle', 'Balanced', 'Direct']"
                    :key="style"
                    class="cursor-pointer"
                  >
                    <input
                      v-model="aiCoach.style"
                      type="radio"
                      :value="style"
                      class="peer sr-only"
                    />

                    <div
                      class="text-center border border-bvline rounded-xl py-3 text-[10px] font-bold peer-checked:border-[#168064] peer-checked:bg-[#edf8f3] peer-checked:text-[#168064]"
                    >
                      {{ style }}
                    </div>
                  </label>
                </div>
              </div>

              <div class="mb-6">
                <div class="setting-title mb-3">What should your coach focus on?</div>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <label
                    v-for="(enabled, key) in aiCoach.focus"
                    :key="key"
                    class="flex items-center gap-2 border border-bvline rounded-xl p-3 cursor-pointer"
                  >
                    <input v-model="aiCoach.focus[key]" type="checkbox" class="accent-[#168064]" />

                    <span class="text-[10px] capitalize">
                      {{ key.replace(/([A-Z])/g, ' $1') }}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <div class="setting-title mb-3">Coaching frequency</div>

                <select v-model="aiCoach.frequency" class="profile-input max-w-xs">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Only when something needs attention</option>
                </select>
              </div>
            </div>
          </section>

          <!-- 11 PRIVACY -->
          <section id="privacy" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="11"
              title="Privacy & data"
              description="Control your data and how Budget Vault uses it."
            />

            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div
                v-for="item in [
                  ['Privacy settings', 'Manage account privacy controls.'],
                  ['Data sharing', 'Control how your information is used.'],
                  ['Download my data', 'Download a copy of your Budget Vault data.'],
                  ['Export transactions', 'Export your transaction history.']
                ]"
                :key="item[0]"
                class="setting-row"
              >
                <div>
                  <div class="setting-title">
                    {{ item[0] }}
                  </div>

                  <div class="setting-description">
                    {{ item[1] }}
                  </div>
                </div>

                <button class="outline-button">
                  {{
                    item[0].includes('Download') || item[0].includes('Export') ? 'Export' : 'Open'
                  }}
                </button>
              </div>
            </div>
          </section>

          <!-- 12 PLAN -->
          <section id="plan" class="scroll-mt-24 mb-10">
            <SectionHeading
              number="12"
              title="Subscription"
              description="Manage your Budget Vault plan and billing."
            />

            <div class="bg-white border border-bvline rounded-[18px] p-5 sm:p-6 shadow-card">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-[9px] uppercase tracking-[.14em] font-extrabold text-bvmuted">
                    Current plan
                  </div>

                  <div class="text-[21px] font-black text-bvgreen2 mt-1">
                    {{ subscription.plan }}
                  </div>

                  <div class="text-[10px] text-bvmuted mt-1">
                    {{ subscription.price }}
                    · Next billing {{ subscription.nextBilling }}
                  </div>
                </div>

                <button class="outline-button">Manage plan</button>
              </div>
            </div>
          </section>

          <!-- 13 DANGER -->
          <section id="danger" class="scroll-mt-24 mb-16">
            <SectionHeading
              number="13"
              title="Danger zone"
              description="Permanent account actions."
              danger
            />

            <div class="bg-red-50 border border-red-200 rounded-[18px] p-5 sm:p-6">
              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-red-200"
              >
                <div>
                  <div class="text-[12px] font-bold">Export account data</div>

                  <div class="text-[10px] text-gray-500 mt-1">
                    Download a copy of your Budget Vault information.
                  </div>
                </div>

                <button
                  class="px-3.5 py-2 rounded-[10px] border border-red-200 text-red-600 text-[10px] font-bold bg-white"
                >
                  Export
                </button>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5">
                <div>
                  <div class="text-[12px] font-bold text-red-600">Delete account</div>

                  <div class="text-[10px] text-gray-500 mt-1">
                    Permanently delete your account and financial data.
                  </div>
                </div>

                <button
                  class="px-3.5 py-2 rounded-[10px] bg-red-600 text-white text-[10px] font-bold"
                >
                  Delete account
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </MainLayout>
</template>

<style scoped>
.profile-label {
  @apply block text-[10px] font-bold text-gray-700 mb-1.5;
}

.profile-input {
  @apply w-full rounded-[10px] border border-gray-200 bg-white px-3 py-2.5 text-[11px] text-gray-900 outline-none transition;
  @apply focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10;
}

.setting-row {
  @apply flex items-center justify-between gap-4 py-4 border-b border-gray-200;
}

.setting-title {
  @apply text-[12px] font-bold text-gray-900;
}

.setting-description {
  @apply text-[10px] text-gray-500 mt-1 leading-relaxed;
}

.outline-button {
  @apply shrink-0 px-3 py-2 rounded-[9px] border border-gray-200 bg-white text-[10px] font-bold text-gray-700 transition;
  @apply hover:bg-gray-50 hover:border-gray-300;
}
</style>
