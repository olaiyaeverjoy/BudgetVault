<script setup>
import MainLayout from '@/layouts/MainLayout.vue'   // adjust path if needed
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'

const app = useAppStore()
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Plan & Track"
        title="Expense Tracking"
        subtitle="Know where every naira went."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              Filter
            </button>
            <button
              class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-green-700 transition shadow-sm"
              @click="app.showToast('Expense form opened')"
            >
              ＋ Add expense
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        <StatCard
          label="Spent this month"
          value="₦132,400"
          valueClass="text-bvorange"
          meta="31% of income"
        />
        <StatCard label="Transactions" value="48" meta="This month" />
        <StatCard label="Largest category" value="Food" meta="₦42,800" />
        <StatCard
          label="Compared to plan"
          value="−₦8,600"
          valueClass="text-[#168064]"
          meta="Under budget"
        />
      </div>

      <!-- Content -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <!-- Recent transactions -->
        <BasePanel title="Recent transactions" meta="48 total">
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div>
              <div class="text-[12.5px] font-extrabold">Shoprite</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Food · Today, 6:14 PM</div>
            </div>
            <b class="text-[13px] text-[#bd5d18]">−₦18,400</b>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div>
              <div class="text-[12.5px] font-extrabold">Uber</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Transport · Today, 3:02 PM</div>
            </div>
            <b class="text-[13px] text-[#bd5d18]">−₦4,800</b>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div>
              <div class="text-[12.5px] font-extrabold">Netflix</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Subscriptions · Yesterday</div>
            </div>
            <b class="text-[13px] text-[#bd5d18]">−₦5,000</b>
          </div>

          <div class="flex justify-between items-center py-3">
            <div>
              <div class="text-[12.5px] font-extrabold">Salary</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Income · Yesterday</div>
            </div>
            <b class="text-[13px] text-[#188064]">+₦420,000</b>
          </div>
        </BasePanel>

        <!-- Category pulse -->
        <BasePanel title="Category pulse" meta="May">
          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-[12px] text-bvmuted">Food</span>
                <b class="text-[13px]">₦42,800</b>
              </div>
              <ProgressTrack :percent="72" />
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-[12px] text-bvmuted">Transport</span>
                <b class="text-[13px]">₦24,300</b>
              </div>
              <ProgressTrack :percent="51" />
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-[12px] text-bvmuted">Shopping</span>
                <b class="text-[13px]">₦18,600</b>
              </div>
              <ProgressTrack :percent="39" />
            </div>
          </div>
        </BasePanel>
      </div>
    </div>
  </MainLayout>
</template>