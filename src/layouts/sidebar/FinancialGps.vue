<script setup>
import MainLayout from '@/layouts/MainLayout.vue'   // adjust path if needed
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/PageHeader.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import Pill from '@/components/Pill.vue'

const app = useAppStore()
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Intelligence"
        title="Financial GPS"
        subtitle="Know where you are, where you're going, and what to adjust."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              Change destination
            </button>
            <button
              class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-green-700 transition shadow-sm"
            >
              Run check-in
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Map + Guidance -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <!-- Financial route map -->
        <BasePanel title="Your financial route" meta="May 2026">
          <div
            class="relative h-[240px] sm:h-[280px] rounded-[18px] border border-[#dfe5e1] overflow-hidden"
            style="background:radial-gradient(circle at 25% 28%,rgba(22,128,100,.18) 0 2px,transparent 3px),radial-gradient(circle at 65% 38%,rgba(79,121,255,.2) 0 3px,transparent 4px),radial-gradient(circle at 47% 70%,rgba(244,191,8,.28) 0 3px,transparent 4px),linear-gradient(135deg,#eef4f0,#f9f7ef)"
          >
            <div class="absolute inset-[18%_9%] border-2 border-dashed border-[#b9ccc3] rounded-[40%_55%_35%_50%] -rotate-[8deg]" />
            <div class="absolute left-[12%] sm:left-[18%] top-[24%] sm:top-[27%] px-2.5 py-1.5 rounded-[9px] bg-white border border-[#dfe5e1] shadow text-[8px] sm:text-[9px] font-extrabold">
              You · Budget health
            </div>
            <div class="absolute left-[52%] sm:left-[58%] top-[28%] sm:top-[32%] px-2.5 py-1.5 rounded-[9px] bg-white border border-[#dfe5e1] shadow text-[8px] sm:text-[9px] font-extrabold">
              Goal · ₦200k
            </div>
            <div class="absolute left-[34%] sm:left-[40%] top-[62%] sm:top-[66%] px-2.5 py-1.5 rounded-[9px] bg-white border border-[#dfe5e1] shadow text-[8px] sm:text-[9px] font-extrabold">
              Bill · May 28
            </div>
          </div>
        </BasePanel>

        <!-- Route guidance -->
        <BasePanel title="Route guidance" meta="3 moves">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
            <div>
              <div class="text-[12.5px] font-extrabold">Protect the next bill</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Keep ₦28,500 untouched.</div>
            </div>
            <Pill variant="gold">Now</Pill>
          </div>

          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2">
            <div>
              <div class="text-[12.5px] font-extrabold">Hold weekly spend</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Stay below ₦35,000.</div>
            </div>
            <Pill variant="blue">This week</Pill>
          </div>

          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 gap-2">
            <div>
              <div class="text-[12.5px] font-extrabold">Top up emergency fund</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">₦20,000 gets you closer.</div>
            </div>
            <Pill variant="green">Next</Pill>
          </div>
        </BasePanel>
      </div>

      <!-- Progress -->
      <BasePanel title="Progress toward your destination" meta="71%">
        <ProgressTrack :percent="71" />
        <div class="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            class="border border-bvline bg-white rounded-[10px] px-3 py-2.5 font-bold text-[11px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            @click="app.showToast('Route recalculated')"
          >
            Recalculate
          </button>
          <button
            class="border border-bvline bg-white rounded-[10px] px-3 py-2.5 font-bold text-[11px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            @click="app.showToast('Goal details opened')"
          >
            View destination
          </button>
        </div>
      </BasePanel>
    </div>
  </MainLayout>
</template>