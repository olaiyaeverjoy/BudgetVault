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
        eyebrow="Plan & Track"
        title="Goals & Dreams"
        subtitle="Turn the things you want into visible progress."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              Explore goals
            </button>
            <button
              class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-green-700 transition shadow-sm"
              @click="app.showToast('New goal created')"
            >
              ＋ New goal
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Goal Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <!-- Emergency Fund -->
        <div class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200">
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Emergency Fund</h3>
          <p class="text-[11.5px] text-bvmuted m-0 leading-relaxed">
            Safety buffer for the unexpected.
          </p>
          <strong class="text-[22px] block mt-4 mb-2">₦144,000</strong>
          <ProgressTrack :percent="72" />
          <div class="text-[11px] text-bvmuted mt-2">72% of ₦200,000</div>
        </div>

        <!-- New Laptop -->
        <div class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200">
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">New Laptop</h3>
          <p class="text-[11.5px] text-bvmuted m-0 leading-relaxed">
            Save toward a productive upgrade.
          </p>
          <strong class="text-[22px] block mt-4 mb-2">₦180,000</strong>
          <ProgressTrack :percent="60" />
          <div class="text-[11px] text-bvmuted mt-2">60% of ₦300,000</div>
        </div>

        <!-- December Trip -->
        <div class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200">
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">December Trip</h3>
          <p class="text-[11.5px] text-bvmuted m-0 leading-relaxed">
            Make travel a planned expense, not a surprise.
          </p>
          <strong class="text-[22px] block mt-4 mb-2">₦90,000</strong>
          <ProgressTrack :percent="36" />
          <div class="text-[11px] text-bvmuted mt-2">36% of ₦250,000</div>
        </div>
      </div>

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
  </MainLayout>
</template>