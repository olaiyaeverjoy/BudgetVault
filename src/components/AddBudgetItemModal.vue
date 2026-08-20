<script setup>
import { reactive, ref, computed } from 'vue'


const props = defineProps({
  modelValue: { type: Boolean, default: false },
  currency: { type: String, default: '₦' }
})

const emit = defineEmits(['update:modelValue', 'save'])

// Popular budget item categories with icons — user just taps one that fits
const iconOptions = [
  { icon: '🏠', label: 'Rent' },
  { icon: '🍎', label: 'Food' },
  { icon: '🚗', label: 'Transport' },
  { icon: '💡', label: 'Utilities' },
  { icon: '🛍️', label: 'Shopping' },
  { icon: '🎬', label: 'Entertainment' },
  { icon: '🏥', label: 'Health' },
  { icon: '📚', label: 'Education' },
  { icon: '💰', label: 'Savings' },
  { icon: '💳', label: 'Debt' },
  { icon: '📱', label: 'Subscriptions' },
  { icon: '✈️', label: 'Travel' },
  { icon: '🎁', label: 'Gifts' },
  { icon: '📦', label: 'Other' }
]

const popularBanks = [
  'Access Bank', 'GTBank', 'Zenith Bank', 'First Bank', 'UBA',
  'Kuda', 'Opay', 'Moniepoint', 'Palmpay', 'Fidelity Bank', 'Union Bank'
]

const form = reactive({
  itemName: '',
  icon: '',
  amount: null,
  accountNumber: '',
  bankName: ''
})

const errors = ref({})

const isValid = computed(() => {
  return form.itemName.trim().length > 0 && form.icon && Number(form.amount) > 0
})

function selectIcon(icon) {
  form.icon = icon
}

function resetForm() {
  form.itemName = ''
  form.icon = ''
  form.amount = null
  form.accountNumber = ''
  form.bankName = ''
  errors.value = {}
}

function close() {
  emit('update:modelValue', false)
  resetForm()
}

function handleSave() {
  errors.value = {}
  if (!form.itemName.trim()) errors.value.itemName = 'Give this item a name'
  if (!form.icon) errors.value.icon = 'Pick an icon'
  if (!(Number(form.amount) > 0)) errors.value.amount = 'Enter a valid amount'

  if (Object.keys(errors.value).length) return

  emit('save', {
    id: Date.now(),
    itemName: form.itemName.trim(),
    icon: form.icon,
    amount: Number(form.amount),
    accountNumber: form.accountNumber.trim() || null,
    bankName: form.bankName.trim() || null
  })

  close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40 px-0 md:px-4"
        @click.self="close"
      >
        <Transition name="slide-up" appear>
          <div
            v-if="modelValue"
            role="dialog"
            aria-modal="true"
            aria-label="Add budget item"
            class="w-full md:w-[420px] max-h-[90vh] overflow-y-auto bg-white rounded-t-[20px] md:rounded-[16px] px-5 py-6"
          >
            <!-- Header -->
            <div class="flex items-center justify-between mb-5">
              <h2 class="font-bold text-[16px]">Add Budget Item</h2>
              <button
                type="button"
                class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
                @click="close"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <!-- Item name -->
            <div class="mb-4">
              <label class="block font-bold text-[12px] mb-2" for="item-name">Item</label>
              <input
                id="item-name"
                v-model="form.itemName"
                type="text"
                placeholder="e.g. School fees"
                class="w-full border border-bvline rounded-[11px] px-[14px] py-[10px] text-[13px] outline-none focus:border-black"
              />
              <p v-if="errors.itemName" class="text-red-500 text-[11px] mt-1">{{ errors.itemName }}</p>
            </div>

            <!-- Icon picker -->
            <div class="mb-4">
              <label class="block font-bold text-[12px] mb-2">Choose an icon</label>
              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="opt in iconOptions"
                  :key="opt.label"
                  type="button"
                  :title="opt.label"
                  @click="selectIcon(opt.icon)"
                  :class="[
                    'flex flex-col items-center justify-center gap-1 rounded-[11px] border py-2 text-[18px] transition-colors',
                    form.icon === opt.icon
                      ? 'border-black bg-gray-50'
                      : 'border-bvline hover:bg-gray-50'
                  ]"
                >
                  <span>{{ opt.icon }}</span>
                  <span class="text-[9px] font-medium text-gray-500">{{ opt.label }}</span>
                </button>
              </div>
              <p v-if="errors.icon" class="text-red-500 text-[11px] mt-1">{{ errors.icon }}</p>
            </div>

            <!-- Amount -->
            <div class="mb-4">
              <label class="block font-bold text-[12px] mb-2" for="amount">Amount required</label>
              <div class="flex items-center border border-bvline rounded-[11px] px-[14px] py-[10px] focus-within:border-black">
                <span class="text-[13px] text-gray-400 mr-1">{{ currency }}</span>
                <input
                  id="amount"
                  v-model="form.amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full text-[13px] outline-none"
                />
              </div>
              <p v-if="errors.amount" class="text-red-500 text-[11px] mt-1">{{ errors.amount }}</p>
            </div>

            <!-- Optional settlement details -->
            <div class="mb-2">
              <p class="font-bold text-[12px] mb-2">
                Settlement details <span class="font-normal text-gray-400">(optional)</span>
              </p>
              <div class="grid grid-cols-2 gap-2">
                <input
                  v-model="form.accountNumber"
                  type="text"
                  inputmode="numeric"
                  maxlength="10"
                  placeholder="Account number"
                  class="w-full border border-bvline rounded-[11px] px-[14px] py-[10px] text-[13px] outline-none focus:border-black"
                />
                <input
                  v-model="form.bankName"
                  type="text"
                  list="popular-banks"
                  placeholder="Bank"
                  class="w-full border border-bvline rounded-[11px] px-[14px] py-[10px] text-[13px] outline-none focus:border-black"
                />
                <datalist id="popular-banks">
                  <option v-for="bank in popularBanks" :key="bank" :value="bank" />
                </datalist>
              </div>
              <p class="text-[11px] text-gray-400 mt-1">
                Add this only if the item needs to be paid out to someone directly.
              </p>
            </div>

            <!-- Save -->
            <button
              type="button"
              :disabled="!isValid"
              @click="handleSave"
              class="w-full mt-4 rounded-[11px] px-[14px] py-[12px] font-bold text-[13px] text-white transition-colors bg-black disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save Item
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(24px);
  opacity: 0;
}
</style>
