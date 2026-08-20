<script setup>
import MainLayout from '@/layouts/MainLayout.vue'   // adjust path if needed
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import Metric from '@/components/Metric.vue'

const app = useAppStore()
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Plan & Track"
        title="Budget Planner"
        subtitle="Build a plan you can actually follow."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              Edit budget
            </button>
            <button
              class="border border-bvgold bg-bvgold text-[#17382e] rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:brightness-95 transition shadow-sm"
            >
              ✨ Generate plan
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        <StatCard label="Monthly income" value="₦420,000" meta="Confirmed" />
        <StatCard label="Essentials" value="₦196,000" valueClass="text-bvorange" meta="47% of income" />
        <StatCard label="Savings" value="₦84,000" valueClass="text-[#168064]" meta="20% target" />
        <StatCard label="Flexible" value="₦140,000" meta="₦35,000 weekly" :highlight="true" />
      </div>

      <!-- Main content -->
      <div class="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-4">
        <!-- Monthly allocation -->
        <BasePanel title="Monthly allocation" meta="May 2026">
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div>
              <div class="text-[12.5px] font-extrabold">Housing & utilities</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Essential</div>
            </div>
            <div class="text-right">
              <b class="text-[13px]">₦120,000</b>
              <div class="w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="76" height="6px" />
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div>
              <div class="text-[12.5px] font-extrabold">Food</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Essential</div>
            </div>
            <div class="text-right">
              <b class="text-[13px]">₦46,000</b>
              <div class="w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="58" height="6px" />
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <div>
              <div class="text-[12.5px] font-extrabold">Transport</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Essential</div>
            </div>
            <div class="text-right">
              <b class="text-[13px]">₦30,000</b>
              <div class="w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="43" height="6px" />
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center py-3">
            <div>
              <div class="text-[12.5px] font-extrabold">Savings</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Protected</div>
            </div>
            <div class="text-right">
              <b class="text-[13px]">₦84,000</b>
              <div class="w-[110px] sm:w-[130px] mt-1">
                <ProgressTrack :percent="70" height="6px" />
              </div>
            </div>
          </div>
        </BasePanel>

        <!-- Weekly guardrails -->
        <BasePanel title="Weekly guardrails" meta="Next 7 days">
          <Metric label="Safe to spend" value="₦31,800" valueClass="text-[#168064]" />

          <div class="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              class="border border-bvline bg-white rounded-[10px] px-3 py-2.5 font-bold text-[11px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
              @click="app.showToast('Weekly limit updated')"
            >
              Set weekly limit
            </button>
            <button
              class="border border-bvline bg-white rounded-[10px] px-3 py-2.5 font-bold text-[11px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
              @click="app.showToast('Budget copied to next month')"
            >
              Copy next month
            </button>
          </div>

          <p class="text-[12.5px] text-bvmuted mt-4 leading-relaxed">
            The planner protects fixed commitments first, then gives you a clear weekly number for flexible spending.
          </p>
        </BasePanel>
      </div>
    </div>
  </MainLayout>
</template>