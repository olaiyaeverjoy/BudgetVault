<script setup>
import MainLayout from '@/layouts/MainLayout.vue' // adjust path if needed
import PageHeader from '@/components/PageHeader.vue'
import BasePanel from '@/components/BasePanel.vue'
import Pill from '@/components/Pill.vue'
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Intelligence"
        title="Money Personality"
        subtitle="A simple picture of how you tend to make money decisions."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              Retake assessment
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Personality + Signals -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <!-- Personality card -->
        <div
          class="bg-white border border-bvline rounded-[18px] shadow-card p-5 sm:p-[18px] text-center"
        >
          <div
            class="relative w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] rounded-full mx-auto"
            style="
              background: conic-gradient(
                #168064 0 34%,
                #f4bf08 34% 58%,
                #4f79ff 58% 82%,
                #d84f83 82% 100%
              );
            "
          >
            <div
              class="absolute inset-0 m-auto w-[104px] h-[104px] sm:w-[112px] sm:h-[112px] bg-white rounded-full grid place-items-center"
            >
              <span class="text-[17px] sm:text-[18px] font-black text-[#17382e]">Builder</span>
            </div>
          </div>
          <h2 class="mt-4 mb-2 text-[19px] sm:text-[20px] font-bold text-gray-900">
            The Steady Builder
          </h2>
          <p class="text-[13px] text-bvmuted leading-relaxed max-w-sm mx-auto">
            You prefer progress you can see, protected commitments, and practical goals over risky
            jumps.
          </p>
        </div>

        <!-- Money signals -->
        <BasePanel title="Your money signals" meta="Current">
          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2"
          >
            <div>
              <div class="text-[12.5px] font-extrabold">Planning</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">You usually plan before spending.</div>
            </div>
            <Pill variant="green">Strong</Pill>
          </div>

          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-[#eff0ed] gap-2"
          >
            <div>
              <div class="text-[12.5px] font-extrabold">Consistency</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Your saving habit is improving.</div>
            </div>
            <Pill variant="green">Growing</Pill>
          </div>

          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 gap-2">
            <div>
              <div class="text-[12.5px] font-extrabold">Impulse control</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">Small purchases can add up.</div>
            </div>
            <Pill variant="gold">Watch</Pill>
          </div>
        </BasePanel>
      </div>

      <!-- Insights -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div
          class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200"
        >
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Best strength</h3>
          <p class="text-[12px] text-bvmuted m-0 leading-relaxed">
            Protecting important commitments before flexible spending.
          </p>
        </div>

        <div
          class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200"
        >
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Watch-out</h3>
          <p class="text-[12px] text-bvmuted m-0 leading-relaxed">
            Convenience spending when the month feels comfortable.
          </p>
        </div>

        <div
          class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200"
        >
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Coach suggestion</h3>
          <p class="text-[12px] text-bvmuted m-0 leading-relaxed">
            Use weekly limits so good intentions become repeatable behaviour.
          </p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
