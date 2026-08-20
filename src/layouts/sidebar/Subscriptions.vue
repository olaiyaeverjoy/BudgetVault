<script setup>
import MainLayout from '@/layouts/MainLayout.vue'   // adjust path if needed
import PageHeader from '@/components/PageHeader.vue'
import Metric from '@/components/Metric.vue'
import BasePanel from '@/components/BasePanel.vue'
import Pill from '@/components/Pill.vue'
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Intelligence"
        title="Subscriptions"
        subtitle="See the recurring charges quietly shaping your month."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              Find duplicates
            </button>
            <button
              class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-green-700 transition shadow-sm"
            >
              ＋ Add subscription
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric
          label="Monthly recurring"
          value="₦23,900"
          valueClass="text-[#c76b18]"
        />
        <Metric label="Active services" value="7" />
        <Metric
          label="Potential savings"
          value="₦7,500"
          valueClass="text-[#168064]"
        />
      </div>

      <!-- Recurring payments -->
      <BasePanel title="Recurring payments" meta="Next 30 days">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Netflix</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">Entertainment · Renews May 30</div>
          </div>
          <div class="flex items-center gap-2.5">
            <b class="text-[13px]">₦5,000</b>
            <Pill variant="green">Active</Pill>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Google One</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">Storage · Renews Jun 2</div>
          </div>
          <div class="flex items-center gap-2.5">
            <b class="text-[13px]">₦3,500</b>
            <Pill variant="green">Active</Pill>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Spotify</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">Music · Renews Jun 4</div>
          </div>
          <div class="flex items-center gap-2.5">
            <b class="text-[13px]">₦3,500</b>
            <Pill variant="blue">Active</Pill>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Unused service</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">No activity detected for 45 days.</div>
          </div>
          <div class="flex items-center gap-2.5">
            <b class="text-[13px]">₦7,500</b>
            <Pill variant="red">Review</Pill>
          </div>
        </div>
      </BasePanel>
    </div>
  </MainLayout>
</template>