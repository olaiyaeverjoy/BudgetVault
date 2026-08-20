<script setup>
import MainLayout from '@/layouts/MainLayout.vue'   // adjust path if needed
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/PageHeader.vue'
import Metric from '@/components/Metric.vue'
import BasePanel from '@/components/BasePanel.vue'
import Pill from '@/components/Pill.vue'

const app = useAppStore()
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Plan & Track"
        title="Bill Settlement"
        subtitle="See what is due, protect it, and settle on time."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              Manage billers
            </button>
            <button
              class="border border-bvgold bg-bvgold text-[#17382e] rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:brightness-95 transition shadow-sm"
              @click="app.showToast('Settlement flow opened')"
            >
              Settle selected
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric
          label="Due this month"
          value="₦98,500"
          valueClass="text-[#c76b18]"
        />
        <Metric
          label="Already settled"
          value="₦64,000"
          valueClass="text-[#168064]"
        />
        <Metric label="Next due" value="May 28" />
      </div>

      <!-- Upcoming bills -->
      <BasePanel title="Upcoming bills" meta="Auto reminders on">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Electricity</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">Due May 28 · Eko Disco</div>
          </div>
          <div class="flex items-center gap-2.5">
            <b class="text-[13px]">₦28,500</b>
            <Pill variant="gold">Due soon</Pill>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Internet</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">Due Jun 2 · Monthly</div>
          </div>
          <div class="flex items-center gap-2.5">
            <b class="text-[13px]">₦15,000</b>
            <Pill variant="green">Scheduled</Pill>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Rent</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">Due Jun 5 · Housing</div>
          </div>
          <div class="flex items-center gap-2.5">
            <b class="text-[13px]">₦55,000</b>
            <Pill variant="blue">Protected</Pill>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Water</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">Due Jun 9 · Utilities</div>
          </div>
          <div class="flex items-center gap-2.5">
            <b class="text-[13px]">₦8,500</b>
            <Pill variant="green">Reminder set</Pill>
          </div>
        </div>
      </BasePanel>
    </div>
  </MainLayout>
</template>