<script setup>
import { ref } from 'vue'

const personality = ref({
  name: 'The Steady Builder',
  type: 'Builder',
  desc: 'You prefer visible progress, protected commitments, and practical goals over risky financial decisions.',
  traits: [
    { label: 'Planning', value: 88, level: 'Strong' },
    { label: 'Consistency', value: 74, level: 'Growing' },
    { label: 'Impulse control', value: 46, level: 'Watch' }
  ]
})
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
    <!-- Personality Card -->
    <div class="bg-white border border-bvline rounded-[18px] shadow-card p-6 text-center">
      <div
        class="relative w-[145px] h-[145px] rounded-full mx-auto"
        style="
          background: conic-gradient(
            #168064 0 34%,
            #f4bf08 34% 58%,
            #4f79ff 58% 82%,
            #d84f83 82% 100%
          );
        "
      >
        <div class="absolute inset-[12px] rounded-full bg-white grid place-items-center">
          <div>
            <div class="text-[17px] font-black text-[#17382e]">
              {{ personality.type }}
            </div>
            <div class="text-[8px] uppercase tracking-[.12em] text-bvmuted mt-1">Personality</div>
          </div>
        </div>
      </div>

      <h3 class="text-[19px] font-bold mt-5">
        {{ personality.name }}
      </h3>

      <p class="text-[12px] text-bvmuted leading-relaxed max-w-sm mx-auto mt-2">
        {{ personality.desc }}
      </p>

      <button class="mt-5 text-[11px] font-extrabold text-bvgreen2 hover:translate-x-1 transition">
        Retake assessment →
      </button>
    </div>

    <!-- Money Signals -->
    <div class="bg-white border border-bvline rounded-[18px] shadow-card p-5">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-[15px] font-bold">Your money signals</h3>
        <span class="text-[9px] uppercase tracking-wider text-bvmuted">Current</span>
      </div>

      <div
        v-for="(trait, index) in personality.traits"
        :key="trait.label"
        class="py-4"
        :class="index < personality.traits.length - 1 ? 'border-b border-[#eff0ed]' : ''"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] font-bold">
            {{ trait.label }}
          </span>
          <span
            class="text-[10px] font-bold"
            :class="trait.level === 'Watch' ? 'text-[#bd5d18]' : 'text-bvgreen2'"
          >
            {{ trait.level }}
          </span>
        </div>

        <div class="h-1.5 rounded-full bg-[#edf1ef] overflow-hidden">
          <div
            class="h-full rounded-full"
            :class="trait.level === 'Watch' ? 'bg-[#bd5d18]' : 'bg-[#168064]'"
            :style="{ width: `${trait.value}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
