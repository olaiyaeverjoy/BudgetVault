<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'

const bars = [42, 48, 53, 61, 58, 66, 72, 69, 78, 83, 88, 94]
const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
</script>

<template>
  <MainLayout>
    <div class="w-full max-w-[1180px] mx-auto">
      <!-- PAGE HEADER -->
      <div class="mb-5">
        <div class="text-[11px] font-bold uppercase tracking-[0.12em] text-[#074033]/70 mb-1">
          Intelligence
        </div>

        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-[#1a2b34] m-0">Year-End Review</h1>

            <p class="text-sm text-[#68757d] mt-1 mb-0 max-w-xl">
              Turn a year's money activity into a clear story.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              class="border border-[#e4e2db] bg-white rounded-[11px] px-4 py-2.5 font-bold text-xs text-[#1a2b34] hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Export review
            </button>

            <button
              class="border border-[#e9bf2b] bg-[#e9bf2b] text-[#17382e] rounded-[11px] px-4 py-2.5 font-bold text-xs hover:brightness-95 transition-all w-full sm:w-auto"
            >
              Share summary
            </button>
          </div>
        </div>
      </div>

      <!-- HERO -->
      <div
        class="bg-gradient-to-br from-[#074033] via-[#0a5c48] to-[#0d7059] rounded-[20px] text-white p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-4"
      >
        <div class="flex-1">
          <div class="text-[11px] uppercase tracking-[0.12em] font-extrabold text-[#9cebd0]">
            2026 progress
          </div>

          <h2 class="m-0 mt-1 text-xl sm:text-2xl font-bold leading-tight">
            You built stronger money habits.
          </h2>

          <p class="text-[#bfe1d6] text-[13px] leading-relaxed mt-2 max-w-lg mb-0">
            Your spending is more visible, your savings are more intentional, and your upcoming
            commitments are easier to plan for.
          </p>
        </div>

        <div
          class="w-[92px] h-[92px] rounded-full border-[7px] border-[#e9bf2b] grid place-items-center text-[23px] font-black shrink-0 bg-white/5"
        >
          82
        </div>
      </div>

      <!-- METRICS -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        <div
          class="bg-white border border-[#e4e2db] rounded-2xl p-4 shadow-[0_4px_16px_rgba(24,35,44,0.04)]"
        >
          <div class="text-[11px] uppercase tracking-wider text-[#80888d] mb-1">Total saved</div>

          <div class="text-xl font-bold text-[#168064]">₦684,000</div>
        </div>

        <div
          class="bg-white border border-[#e4e2db] rounded-2xl p-4 shadow-[0_4px_16px_rgba(24,35,44,0.04)]"
        >
          <div class="text-[11px] uppercase tracking-wider text-[#80888d] mb-1">
            Goals completed
          </div>

          <div class="text-xl font-bold text-[#1a2b34]">5 / 7</div>
        </div>

        <div
          class="bg-white border border-[#e4e2db] rounded-2xl p-4 shadow-[0_4px_16px_rgba(24,35,44,0.04)]"
        >
          <div class="text-[11px] uppercase tracking-wider text-[#80888d] mb-1">
            Budget adherence
          </div>

          <div class="text-xl font-bold text-[#1a2b34]">82%</div>
        </div>
      </div>

      <!-- TWO COLUMNS -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
        <!-- Monthly savings -->
        <section
          class="bg-white border border-[#e4e2db] rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(24,35,44,0.04)]"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-[#1a2b34] m-0">Monthly savings trend</h3>

            <span class="text-[11px] text-[#80888d]"> Jan–Dec </span>
          </div>

          <div
            class="flex items-end gap-1.5 sm:gap-2 h-[160px] px-1 pt-4 border-b border-[#e4e2db]"
          >
            <div
              v-for="(h, i) in bars"
              :key="i"
              class="flex-1 bg-[#1a8064] rounded-t-md transition-all duration-300 hover:bg-[#0d7059]"
              :style="{ height: h + '%' }"
            ></div>
          </div>

          <div class="flex gap-1.5 sm:gap-2 mt-2">
            <span
              v-for="(l, i) in labels"
              :key="i"
              class="flex-1 text-center text-[10px] text-[#80888d]"
            >
              {{ l }}
            </span>
          </div>
        </section>

        <!-- Year in numbers -->
        <section
          class="bg-white border border-[#e4e2db] rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(24,35,44,0.04)]"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-[#1a2b34] m-0">Your year in numbers</h3>

            <span class="text-[11px] text-[#80888d]"> Highlights </span>
          </div>

          <div>
            <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
              <span class="text-xs text-[#80888d]"> Largest goal completed </span>

              <b class="text-sm text-[#1a2b34]"> ₦200,000 </b>
            </div>

            <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
              <span class="text-xs text-[#80888d]"> Best saving month </span>

              <b class="text-sm text-[#1a2b34]"> December </b>
            </div>

            <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
              <span class="text-xs text-[#80888d]"> Most common expense </span>

              <b class="text-sm text-[#1a2b34]"> Food </b>
            </div>

            <div class="flex justify-between items-center py-3">
              <span class="text-xs text-[#80888d]"> Bills settled on time </span>

              <b class="text-sm text-[#1a2b34]"> 96% </b>
            </div>
          </div>
        </section>
      </div>
    </div>
  </MainLayout>
</template>
