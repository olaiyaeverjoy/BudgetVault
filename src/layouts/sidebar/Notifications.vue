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
        eyebrow="Intelligence"
        title="Notifications"
        subtitle="The things you should know, when they matter."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
              @click="app.showToast('All notifications marked as read')"
            >
              Mark all read
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric label="Unread" value="4" valueClass="text-[#c76b18]" />
        <Metric label="Action needed" value="2" />
        <Metric label="Reminders" value="6" />
      </div>

      <!-- Notifications list -->
      <BasePanel title="Today" meta="4 unread">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Electricity bill due soon</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">₦28,500 due in 3 days.</div>
          </div>
          <Pill variant="gold">Action</Pill>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Your savings goal is on track</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">Emergency Fund reached 72%.</div>
          </div>
          <Pill variant="green">Good</Pill>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Large transaction detected</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">₦18,400 at Shoprite.</div>
          </div>
          <Pill variant="red">Review</Pill>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 gap-2">
          <div>
            <div class="text-[12.5px] font-extrabold">Weekly budget check-in</div>
            <div class="text-[10.5px] text-bvmuted mt-0.5">You have ₦31,800 safe to spend.</div>
          </div>
          <Pill variant="blue">Insight</Pill>
        </div>
      </BasePanel>
    </div>
  </MainLayout>
</template>