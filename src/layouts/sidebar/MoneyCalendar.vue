<script setup>
import MainLayout from '@/layouts/MainLayout.vue'   // adjust path if needed
import PageHeader from '@/components/PageHeader.vue'
import BasePanel from '@/components/BasePanel.vue'

const days = [
  { d: 1 }, { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 },
  { d: 8 }, { d: 9, tag: 'Salary', variant: 'event' }, { d: 10 }, { d: 11 }, { d: 12 }, { d: 13, tag: 'Rent', variant: 'gold' }, { d: 14 },
  { d: 15 }, { d: 16 }, { d: 17, tag: 'Save', variant: 'event' }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 },
  { d: 22 }, { d: 23 }, { d: 24 }, { d: 25, tag: 'Salary', variant: 'event' }, { d: 26 }, { d: 27, tag: 'Power', variant: 'gold' }, { d: 28 },
  { d: 29 }, { d: 30 }, { d: 31 },
]

function cellClass(day) {
  if (day.variant === 'event') return 'border-[#b9dfd1] bg-[#f2faf7]'
  if (day.variant === 'gold') return 'border-[#f2d57b] bg-[#fffaf0]'
  return 'border-[#eceee9] bg-white'
}
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Intelligence"
        title="Money Calendar"
        subtitle="See your financial month before it happens."
      >
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              Month
            </button>
            <button
              class="border border-bvgreen bg-bvgreen text-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:bg-green-700 transition shadow-sm"
            >
              ＋ Add event
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- Calendar -->
      <BasePanel title="May 2026" meta="₦98,500 upcoming commitments">
        <div class="grid grid-cols-7 gap-1.5 sm:gap-2">
          <div
            v-for="day in days"
            :key="day.d"
            class="border rounded-[9px] min-h-[52px] sm:min-h-[64px] p-1.5 sm:p-2 text-[8px] sm:text-[9px] transition-colors"
            :class="cellClass(day)"
          >
            <b class="text-[10px] sm:text-[11px] block">{{ day.d }}</b>
            <div v-if="day.tag" class="mt-0.5 leading-tight font-medium">
              {{ day.tag }}
            </div>
          </div>
        </div>
      </BasePanel>

      <!-- Summary cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200">
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Money in</h3>
          <p class="text-[11.5px] text-bvmuted m-0 leading-relaxed">
            Salary and expected inflows.
          </p>
          <strong class="block text-[20px] sm:text-[22px] mt-3 text-[#168064]">
            ₦420,000
          </strong>
        </div>

        <div class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200">
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Money out</h3>
          <p class="text-[11.5px] text-bvmuted m-0 leading-relaxed">
            Planned commitments.
          </p>
          <strong class="block text-[20px] sm:text-[22px] mt-3 text-[#c76b18]">
            ₦98,500
          </strong>
        </div>

        <div class="bg-white border border-bvline rounded-[18px] p-4 sm:p-[18px] shadow-card hover:shadow-md transition-all duration-200">
          <h3 class="m-0 mb-1.5 text-[14.5px] font-bold text-gray-900">Protected</h3>
          <p class="text-[11.5px] text-bvmuted m-0 leading-relaxed">
            Vault allocations already reserved.
          </p>
          <strong class="block text-[20px] sm:text-[22px] mt-3">
            ₦84,000
          </strong>
        </div>
      </div>
    </div>
  </MainLayout>
</template>