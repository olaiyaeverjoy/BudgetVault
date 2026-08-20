<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { useVaultStore } from '@/stores/vaultStore'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  currency: { type: String, default: '₦' },
  // Pass an existing vault row to open the modal in edit mode.
  // Leave null/undefined for the normal "create" flow.
  editingVault: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'save'])

const vaultStore = useVaultStore()

const isEditMode = computed(() => !!props.editingVault)

// Vault categories with icons — user just taps one that fits
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
  vaultName: '',
  icon: '',
  amount: null,       // raw numeric value — what actually gets saved
  accountNumber: '',
  bankName: ''
})

const amountDisplay = ref('')  // formatted text shown in the input, e.g. "50,000"

const errors = ref({})
const submitting = ref(false)
const submitError = ref('')

const isValid = computed(() => {
  return form.vaultName.trim().length > 0 && form.icon && Number(form.amount) > 0
})

function selectIcon(icon) {
  form.icon = icon
}

// Strips everything but digits/decimal point, keeps at most one decimal
// point and two decimal places, and comma-formats the integer part —
// all while the user is still typing (no rounding, no premature commit).
function formatAmountInput(raw) {
  let cleaned = raw.replace(/[^0-9.]/g, '')

  const firstDot = cleaned.indexOf('.')
  if (firstDot !== -1) {
    cleaned =
      cleaned.slice(0, firstDot + 1) +
      cleaned.slice(firstDot + 1).replace(/\./g, '').slice(0, 2)
  }

  const [intPart, decPart] = cleaned.split('.')
  const withCommas = intPart ? Number(intPart).toLocaleString('en-US') : ''

  return decPart !== undefined ? `${withCommas}.${decPart}` : withCommas
}

function onAmountInput(event) {
  const raw = event.target.value
  amountDisplay.value = formatAmountInput(raw)
  const numeric = amountDisplay.value.replace(/,/g, '')
  form.amount = numeric && numeric !== '.' ? Number(numeric) : null
}

function resetForm() {
  form.vaultName = ''
  form.icon = ''
  form.amount = null
  form.accountNumber = ''
  form.bankName = ''
  amountDisplay.value = ''
  errors.value = {}
  submitError.value = ''
}

function prefillFromVault(vault) {
  form.vaultName = vault.title || ''
  form.icon = vault.icon || ''
  form.amount = Number(vault.target) || null
  form.accountNumber = vault.payee_account_number || ''
  form.bankName = vault.payee_bank || ''
  amountDisplay.value = form.amount ? formatAmountInput(String(form.amount)) : ''
  errors.value = {}
  submitError.value = ''
}

// Re-sync the form whenever the modal opens, based on whether we're
// editing an existing vault or creating a new one.
watch(
  () => [props.modelValue, props.editingVault],
  ([open, vault]) => {
    if (!open) return
    if (vault) {
      prefillFromVault(vault)
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// User-triggered close (✕ button, backdrop click) — blocked mid-save so
// an in-flight request isn't abandoned.
function close() {
  if (submitting.value) return
  emit('update:modelValue', false)
  resetForm()
}

// Programmatic close after a successful save — must NOT check
// `submitting`, since submitting is still true at the point this runs
// (the `finally` block hasn't reset it yet).
function finishAndClose() {
  emit('update:modelValue', false)
  resetForm()
}

async function handleSave() {
  errors.value = {}
  submitError.value = ''

  if (!form.vaultName.trim()) errors.value.vaultName = 'Give this vault a name'
  if (!form.icon) errors.value.icon = 'Pick an icon'
  if (!(Number(form.amount) > 0)) errors.value.amount = 'Enter a valid amount'

  if (Object.keys(errors.value).length) return

  submitting.value = true
  try {
    let result
    if (isEditMode.value) {
      result = await vaultStore.updateVault(props.editingVault.id, {
        title: form.vaultName.trim(),
        icon: form.icon,
        target: Number(form.amount),
        payee_name: form.vaultName.trim(),
        payee_account_number: form.accountNumber.trim() || null,
        payee_bank: form.bankName.trim() || null
      })
    } else {
      result = await vaultStore.createVault({
        itemName: form.vaultName.trim(),
        icon: form.icon,
        amount: Number(form.amount),
        accountNumber: form.accountNumber.trim() || null,
        bankName: form.bankName.trim() || null
      })
    }

    emit('save', result)
    finishAndClose()
  } catch (err) {
    submitError.value = err.message || 'Could not save this vault. Try again.'
  } finally {
    submitting.value = false
  }
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
            aria-label="Vault details"
            class="w-full md:w-[420px] max-h-[90vh] overflow-y-auto bg-white rounded-t-[20px] md:rounded-[16px] px-5 py-6"
          >
            <!-- Header -->
            <div class="flex items-center justify-between mb-5">
              <h2 class="font-bold text-[16px]">
                {{ isEditMode ? 'Edit Vault' : 'New Vault' }}
              </h2>
              <button
                type="button"
                class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
                @click="close"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <!-- Vault name -->
            <div class="mb-4">
              <label class="block font-bold text-[12px] mb-2" for="vault-name">Vault name</label>
              <input
                id="vault-name"
                v-model="form.vaultName"
                type="text"
                placeholder="e.g. School fees"
                class="w-full border border-bvline rounded-[11px] px-[14px] py-[10px] text-[13px] outline-none focus:border-black"
              />
              <p v-if="errors.vaultName" class="text-red-500 text-[11px] mt-1">{{ errors.vaultName }}</p>
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
                  :aria-pressed="form.icon === opt.icon"
                  @click="selectIcon(opt.icon)"
                  :class="[
                    'relative flex flex-col items-center justify-center gap-1 rounded-[11px] border-2 py-2 text-[18px] transition-all duration-150',
                    form.icon === opt.icon
                      ? 'border-black bg-black text-white shadow-md scale-[1.04]'
                      : 'border-bvline text-current hover:border-gray-400 hover:bg-gray-50'
                  ]"
                >
                  <span
                    v-if="form.icon === opt.icon"
                    class="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] leading-none shadow"
                  >
                    ✓
                  </span>
                  <span>{{ opt.icon }}</span>
                  <span
                    :class="[
                      'text-[9px] font-semibold',
                      form.icon === opt.icon ? 'text-white' : 'text-gray-500'
                    ]"
                  >
                    {{ opt.label }}
                  </span>
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
                  :value="amountDisplay"
                  @input="onAmountInput"
                  type="text"
                  inputmode="decimal"
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
                Add this only if the vault needs to be paid out to someone directly.
              </p>
            </div>

            <p v-if="submitError" class="text-red-500 text-[11px] mb-2">{{ submitError }}</p>

            <!-- Save -->
            <button
              type="button"
              :disabled="!isValid || submitting"
              @click="handleSave"
              class="w-full mt-4 rounded-[11px] px-[14px] py-[12px] font-bold text-[13px] text-white transition-colors bg-black disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Saving…' : isEditMode ? 'Save Changes' : 'Create Vault' }}
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