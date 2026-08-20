<template>
  <!-- FIXED TOP HEADER -->
  <header class="fixed top-0 left-0 right-0 z-50 h-[58px] bg-white border-b border-[#dcefdd]">
    <div class="h-full flex items-center justify-between px-4 sm:px-6">
    

      <!-- SKIP -->
      <p class="text-lg sm:text-sm text-[#5c6b5e] m-2">
        <router-link to="/dashboard" class="font-semibold text-[#2E7D32] hover:underline">
          Go back
        </router-link>
      </p>
    </div>
  </header>

  <div class="flex mx-auto my-auto justify-center min-h-screen bg-[#f4faf4] pt-[58px]">
    

    <!-- MAIN CARD -->
    <div class="flex mt-8 items-center justify-center px-4 sm:px-6 py-10">
      <div class="w-full max-w-[400px] bg-white rounded-[22px] border border-[#dcefdd] overflow-hidden shadow-lg">
        <!-- STICKY HEADER WITH GRADIENT -->
        <div class="sticky top-0 z-20 bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] px-8 py-6 text-white">
          <div class="mb-5">
            <h1 class="text-xl font-bold mb-1">{{ stepHeaderTitles[step - 1] }}</h1>
            <p class="text-sm text-white/80">{{ stepHeaderDescriptions[step - 1] }}</p>
          </div>

          <!-- SEGMENTED BAR STEPPER -->
          <div class="flex items-center gap-2">
            <div
              v-for="n in totalSteps"
              :key="n"
              class="h-1.5 flex-1 rounded-full transition-all duration-300"
              :class="n <= step ? 'bg-white' : 'bg-white/25'"
            />
          </div>
        </div>

        <!-- FORM CONTENT -->
        <div class="px-8 py-8">
          <!-- STEP 1: CONSENT -->
          <div v-if="step === 1">
            <div class="mb-8">
              <span class="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Step 1 of {{ totalSteps }}</span>
              <h2 class="text-xl font-semibold text-[#0f1a12] mt-3 mb-2">Connect your bank</h2>
              <p class="text-sm text-[#5c6b5e] leading-relaxed">
                This links an existing bank account for spend tracking. It doesn't move any money
                or create a Vault.
              </p>
            </div>

            <div class="mb-4 p-4 rounded-[10px] border border-[#bfe3c1] bg-[#eef8ef]">
              <div class="space-y-2.5 text-sm text-[#28422c] leading-relaxed">
                <p class="flex items-start gap-2"><i class="mdi mdi-check text-[#2E7D32] mt-0.5"></i> Verifies your identity with your BVN and NIN, each confirmed by a one-time code</p>
                
              </div>
            </div>

            <div
              class="check-card mb-3"
              :class="consentIdentity && 'check-active'"
              @click="consentIdentity = !consentIdentity"
            >
              <div class="check-box"><i v-if="consentIdentity" class="mdi mdi-check text-white text-xs"></i></div>
              <p class="text-sm text-[#28422c] leading-relaxed">
                I agree to verify my identity using my BVN and NIN to link my bank account.
              </p>
            </div>
            <div
              class="check-card mb-6"
              :class="consentData && 'check-active'"
              @click="consentData = !consentData"
            >
              <div class="check-box"><i v-if="consentData" class="mdi mdi-check text-white text-xs"></i></div>
              <p class="text-sm text-[#28422c] leading-relaxed">
                I authorize BudgetVault to access my account balance and transaction history for
                budgeting purposes only.
              </p>
            </div>

            <button
              class="btn-full w-full"
              :disabled="!(consentIdentity && consentData)"
              :class="{ 'btn-disabled': !(consentIdentity && consentData) }"
              @click="step = 2"
            >
              Continue to Phone
              <i class="mdi mdi-arrow-right text-base ml-1"></i>
            </button>
          </div>

          <!-- STEP 2: PHONE VERIFICATION -->
          <div v-if="step === 2">
            <div class="mb-8">
              <span class="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Step 2 of {{ totalSteps }}</span>
              <h2 class="text-xl font-semibold text-[#0f1a12] mt-3 mb-2">Verify your phone number</h2>
              <p class="text-sm text-[#5c6b5e] leading-relaxed">We'll send a one-time code to confirm it's you.</p>
            </div>

            <div class="mb-4">
              <label class="block text-xs font-bold text-[#5c6b5e] uppercase tracking-wider mb-2">Phone Number</label>
              <input
                v-model="phone.value"
                placeholder="8012345678"
                class="form-field"
                inputmode="numeric"
                maxlength="11"
                :disabled="phone.verified"
                @input="phone.value = phone.value.replace(/\D/g, '').slice(0, 11)"
              />
              <p class="text-xs text-[#9fb3a1] mt-1">Used for account verification</p>
            </div>

            <otp-panel
              phase-key="phone"
              :phase="phone"
              context="phone number"
              @send="sendOtp(phone)"
              @autofill="autofillOtp(phone)"
              @verify="verifyOtp(phone)"
              @set-ref="(i, el) => setOtpRef('phone', i, el)"
              @nav="onOtpKeydown"
              @paste="onOtpPaste"
            />

            <!-- BEFORE: -->
<div class="flex gap-3 mt-6">
  <button class="btn-ghost flex-1" @click="step = 1">← Back</button>
  <button
    class="btn-full flex-1"
    :disabled="!phone.verified"
    :class="{ 'btn-disabled': !phone.verified }"
    @click="step = 3"
  >
    Continue →
  </button>
</div>


          </div>

          <!-- STEP 3: BVN VERIFICATION -->
          <div v-if="step === 3">
            <!-- INPUT SUB-STATE -->
            <template v-if="bvnSubState === 'input'">
              <div class="mb-8">
                <span class="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Step 3 of {{ totalSteps }}</span>
                <h2 class="text-xl font-semibold text-[#0f1a12] mt-3 mb-2">Verify your BVN</h2>
                <p class="text-sm text-[#5c6b5e] leading-relaxed">
                  Your BVN is used only to verify your identity and is never stored in full.
                </p>
              </div>

              <div class="mb-4">
                <label class="block text-xs font-bold text-[#5c6b5e] uppercase tracking-wider mb-2">
                  Bank Verification Number (BVN)
                </label>
                <input
                  v-model="bvn.value"
                  placeholder="Enter 11-digit BVN"
                  class="form-field text-center text-lg tracking-widest font-semibold"
                  inputmode="numeric"
                  maxlength="11"
                  @input="bvn.value = bvn.value.replace(/\D/g, '').slice(0, 11)"
                />
                <p v-if="bvn.value && bvn.value.length < 11" class="text-red-500 text-xs mt-1">
                  BVN must be 11 digits ({{ bvn.value.length }}/11)
                </p>
              </div>

              <div class="mb-4 p-4 rounded-[10px] border border-[#bfe3c1] bg-[#eef8ef]">
                <div class="flex items-start gap-3 text-sm text-[#28422c] leading-relaxed">
                  <i class="mdi mdi-lock-outline text-base"></i>
                  Your BVN is encrypted and only used for identity checks. We never share it with
                  third parties.
                </div>
              </div>

              <button
                class="btn-full w-full"
                :disabled="bvn.value.length !== 11 || bvnLookupLoading"
                :class="{ 'btn-disabled': bvn.value.length !== 11 || bvnLookupLoading }"
                @click="lookupBvn"
              >
                <span v-if="bvnLookupLoading" class="flex items-center justify-center gap-2">
                  <span class="animate-spin">⏳</span> Looking up...
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  Verify BVN <i class="mdi mdi-arrow-right text-base"></i>
                </span>
              </button>
            </template>

            <!-- CONFIRM SUB-STATE -->
            <template v-if="bvnSubState === 'confirm'">
              <h2 class="text-xl font-semibold text-[#0f1a12] mb-2">Confirm your identity</h2>
              <p class="text-sm text-[#5c6b5e] mb-6 leading-relaxed">
                We found this name linked to your BVN. Confirm it's correct before proceeding.
              </p>

              <div class="mb-6 flex items-center gap-4 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] px-5 py-4 text-white">
                <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-base font-extrabold flex-shrink-0">
                  {{ bvnInitials }}
                </div>
                <div>
                  <p class="text-xs text-white/60 uppercase tracking-wide mb-1">Name on BVN record</p>
                  <p class="text-base font-extrabold">{{ bvnName }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  class="flex items-center justify-center gap-2 rounded-md border-2 border-[#4CAF50] bg-[#eef8ef] text-[#2E7D32] font-bold text-sm py-3 hover:bg-[#e0f2e1] transition"
                  @click="bvnSubState = 'liveness'"
                >
                  <i class="mdi mdi-check text-lg"></i> Yes, that's me
                </button>
                <button
                  class="flex items-center justify-center gap-2 rounded-md border-2 border-red-500 bg-red-50 text-red-600 font-bold text-sm py-3 hover:bg-red-100 transition"
                  @click="confirmBvnNo"
                >
                  <i class="mdi mdi-close text-lg"></i> Not me
                </button>
              </div>
            </template>

            <!-- LIVENESS SUB-STATE (simulated) -->
            <template v-if="bvnSubState === 'liveness'">
              <h2 class="text-xl font-semibold text-[#0f1a12] mb-2">Quick face check</h2>
              <p class="text-sm text-[#5c6b5e] mb-6 leading-relaxed">
                In production this opens your camera for a liveness check. This demo simulates it.
              </p>
              <div class="mb-6 flex flex-col items-center gap-4 rounded-xl border border-[#bfe3c1] bg-[#eef8ef] px-6 py-10">
                <i class="mdi mdi-face-recognition text-[#2E7D32] text-5xl"></i>
                <button class="btn-full" :disabled="livenessLoading" @click="simulateLiveness">
                  <span v-if="livenessLoading" class="flex items-center gap-2"><span class="animate-spin">⏳</span> Scanning...</span>
                  <span v-else>Simulate Face Scan</span>
                </button>
              </div>
            </template>

            <!-- VERIFIED SUB-STATE -->
            <template v-if="bvnSubState === 'verified'">
              <h2 class="text-xl font-semibold text-[#0f1a12] mb-1">✓ Identity verified</h2>
              <p class="text-sm text-[#5c6b5e] mb-6 leading-relaxed">
                Your identity has been confirmed. Now let's verify your NIN.
              </p>

              <div class="mb-6 flex items-center gap-4 rounded-xl border border-[#bfe3c1] bg-[#eef8ef] px-4 py-3">
                <div class="w-12 h-12 rounded-[10px] bg-[#dcf1dd] flex items-center justify-center flex-shrink-0">
                  <i class="mdi mdi-fingerprint text-[#2E7D32] text-2xl"></i>
                </div>
                <div>
                  <p class="text-xs text-[#5c6b5e] uppercase tracking-wide mb-1">Your BVN on record</p>
                  <p class="text-base font-bold text-[#0f1a12] tracking-wide">{{ maskedBvn }}</p>
                </div>
                <span class="ml-auto rounded-full bg-green-100 text-green-700 text-xs font-bold px-3 py-1 whitespace-nowrap">✓ Verified</span>
              </div>

              <div class="flex gap-3">
                <button class="btn-ghost flex-1" @click="bvnSubState = 'input'">← Back</button>
                <button class="btn-full flex-1" @click="step = 4">
                  Verify NIN <i class="mdi mdi-arrow-right text-base ml-1"></i>
                </button>
              </div>
            </template>
          </div>

          <!-- STEP 4: NIN VERIFICATION -->
          <div v-if="step === 4">
            <div class="mb-8">
              <span class="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Step 4 of {{ totalSteps }}</span>
              <h2 class="text-xl font-semibold text-[#0f1a12] mt-3 mb-2">Verify your NIN</h2>
              <p class="text-sm text-[#5c6b5e] leading-relaxed">
                Your NIN unlocks full account linking beyond the basic tier.
              </p>
            </div>

            <div class="mb-4">
              <label class="block text-xs font-bold text-[#5c6b5e] uppercase tracking-wider mb-2">
                National Identification Number (NIN)
              </label>
              <input
                v-model="nin.value"
                placeholder="Enter 11-digit NIN"
                class="form-field text-center text-lg tracking-widest font-semibold"
                inputmode="numeric"
                maxlength="11"
                :disabled="nin.verified"
                @input="nin.value = nin.value.replace(/\D/g, '').slice(0, 11)"
              />
            </div>

     
           
            <div class="flex gap-3 mt-6">
              <button class="btn-ghost flex-1" @click="bvnSubState = 'verified'; step = 3">← Back</button>
              <button
                class="btn-full flex-1"
                :disabled="!nin.verified"
                :class="{ 'btn-disabled': !nin.verified }"
                @click="step = 5"
              >
                Continue to Bank Link →
              </button>
            </div>
          </div>

          <!-- STEP 5: BANK LINK -->
          <div v-if="step === 5">
            <div class="mb-8">
              <span class="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Step 5 of {{ totalSteps }}</span>
              <h2 class="text-xl font-semibold text-[#0f1a12] mt-3 mb-2">Connect your bank</h2>
              <p class="text-sm text-[#5c6b5e] leading-relaxed">
                Identity confirmed. Now we open a secure, read-only connection to your bank.
              </p>
            </div>

            <div v-if="linkState === 'idle'">
              <div class="mb-6 p-4 rounded-[10px] border border-[#bfe3c1] bg-[#eef8ef] text-sm text-[#28422c] leading-relaxed">
                This step only links your bank for balance and transaction visibility. No Vault
                is created here.
              </div>
              <button class="btn-full w-full" @click="startLink">
                <i class="mdi mdi-bank-outline text-base mr-1"></i> Link Bank Account
              </button>
            </div>

            <div v-else-if="linkState === 'linking'" class="flex items-center gap-3 py-6">
              <span class="animate-spin text-2xl">⏳</span>
              <span class="text-sm text-[#5c6b5e]">Opening secure connection…</span>
            </div>

            <div v-else>
              <div class="mb-6 flex items-center gap-4 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] px-5 py-4 text-white">
                <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <i class="mdi mdi-bank-check text-2xl"></i>
                </div>
                <div>
                  <p class="text-xs text-white/60 uppercase tracking-wide mb-1">Linked bank</p>
                  <p class="text-base font-extrabold">{{ linkResult.bankName }}</p>
                </div>
              </div>
              <div class="mb-6 rounded-[10px] border border-[#dcefdd] overflow-hidden">
                <div class="flex justify-between px-4 py-2.5 text-sm border-b border-[#dcefdd]">
                  <span class="text-[#5c6b5e]">Connection Reference</span>
                  <span class="font-semibold text-[#0f1a12]">{{ linkResult.reference }}</span>
                </div>
                <div class="flex justify-between px-4 py-2.5 text-sm">
                  <span class="text-[#5c6b5e]">Access Level</span>
                  <span class="font-semibold text-[#0f1a12]">{{ linkResult.tier }}</span>
                </div>
              </div>
              <button class="btn-full w-full" @click="step = 6">
                Continue to Review <i class="mdi mdi-arrow-right text-base ml-1"></i>
              </button>
            </div>

            <button v-if="linkState === 'idle'" class="btn-ghost w-full mt-3" @click="step = 4">← Back</button>
          </div>

          <!-- STEP 6: REVIEW & SUBMIT -->
          <div v-if="step === 6 && !linkedSuccess">
            <div class="mb-8">
              <span class="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Step {{ totalSteps }} of {{ totalSteps }} - Final</span>
              <h2 class="text-xl font-semibold text-[#0f1a12] mt-3 mb-2">Review & confirm</h2>
              <p class="text-sm text-[#5c6b5e] leading-relaxed">Check everything below before you finish.</p>
            </div>

            <div class="space-y-3 mb-6">
              <div class="review-row-card" @click="step = 2">
                <span class="text-[#5c6b5e]">Phone</span>
                <span class="font-semibold text-[#0f1a12]">{{ phone.value }} · Verified</span>
              </div>
              <div class="review-row-card" @click="jumpToBvn">
                <span class="text-[#5c6b5e]">BVN</span>
                <span class="font-semibold text-[#0f1a12]">{{ maskedId(bvn.value) }} · Verified</span>
              </div>
              <div class="review-row-card" @click="step = 4">
                <span class="text-[#5c6b5e]">NIN</span>
                <span class="font-semibold text-[#0f1a12]">{{ maskedId(nin.value) }} · Verified</span>
              </div>
              <div class="review-row-card" @click="step = 5">
                <span class="text-[#5c6b5e]">Bank</span>
                <span class="font-semibold text-[#0f1a12]">{{ linkResult.bankName }}</span>
              </div>
            </div>

            <div
              class="check-card mb-6"
              :class="declaration && 'check-active'"
              @click="declaration = !declaration"
            >
              <div class="check-box"><i v-if="declaration" class="mdi mdi-check text-white text-xs"></i></div>
              <p class="text-sm text-[#28422c] leading-relaxed">
                I confirm the details above are accurate and I'm authorizing this account
                <strong>link for spend tracking only</strong> — not a transfer of funds or the
                creation of a Vault.
              </p>
            </div>

            <button
              class="btn-full w-full"
              :disabled="!declaration"
              :class="{ 'btn-disabled': !declaration }"
              @click="submitLink"
            >
              <i class="mdi mdi-send-check text-base mr-1"></i> Confirm & Link Account
            </button>
          </div>

          <!-- SUCCESS SCREEN -->
          <div v-if="step === 6 && linkedSuccess" class="text-center py-12">
            <div class="w-20 h-20 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-5xl font-bold mb-6 mx-auto shadow-lg">
              ✓
            </div>
            <h2 class="text-xl font-semibold text-[#0f1a12] mb-2">Bank account linked 🎉</h2>
            <p class="text-[#5c6b5e] leading-relaxed mb-3 max-w-xs mx-auto">
              BudgetVault can now see your balance and transactions.
            </p>
            <p class="text-sm text-[#9fb3a1] mb-8 max-w-xs mx-auto">
              Nothing was moved into a Vault — that's a separate step whenever you're ready.
            </p>
            <button class="btn-full w-full max-w-xs mx-auto" @click="resetDemo">Restart</button>
          </div>
        </div>

        <div class="flex justify-center m-4">
          <button @click="gotodashboard" class="text-sm font-medium text-[#2E7D32] hover:underline" @click="resetDemo">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script setup>
import { ref, reactive, computed,} from 'vue'
import OtpPanel from '@/components/OtpPanel.vue'


const gotodashboard = () => {
  router.push('/dashboard')
}

const totalSteps = 6
const step = ref(1)

const stepHeaderTitles = [
  'Connect your bank',
  'Verify your phone',
  'Verify your BVN',
  'Verify your NIN',
  'Link your bank',
  'Review & confirm',
]
const stepHeaderDescriptions = [
  'What this connection does, and what it doesn\u2019t',
  'Confirm it\u2019s really you',
  'One more identity check',
  'Almost there',
  'Open a secure, read-only connection',
  'Check everything, then finish',
]

const showIncompleteBanner = computed(() => step.value > 1 && !linkedSuccess.value)

// ── Consent ──────────────────────────────────────────────────────────
const consentIdentity = ref(false)
const consentData = ref(false)

// ── Shared OTP phase shape (phone / NIN both use this) ─────────────────
function makePhase(prefill) {
  return reactive({
    value: prefill,
    sent: false,
    verifying: false,
    verified: false,
    digits: ['', '', '', '', '', ''],
    resendTimer: 0,
    error: '',
    _timerHandle: null,
  })
}
const phone = makePhase('8012345678')
const nin = makePhase('98765432109')

// BVN uses its own value field + a multi-state flow, but still rides the
// same OTP phase object for its own phone-OTP-in-liveness-lite demo step.
const bvn = makePhase('22134567890')

const otpRefs = reactive({ phone: [], nin: [] })
const setOtpRef = (key, i, el) => {
  if (!otpRefs[key]) otpRefs[key] = []
  otpRefs[key][i] = el
}

const sendOtp = (phase) => {
  phase.sent = true
  phase.digits = ['', '', '', '', '', '']
  phase.error = ''
  phase.resendTimer = 30
  clearInterval(phase._timerHandle)
  phase._timerHandle = setInterval(() => {
    if (phase.resendTimer > 0) phase.resendTimer--
    else clearInterval(phase._timerHandle)
  }, 1000)
}

const autofillOtp = (phase) => {
  phase.digits = ['1', '2', '3', '4', '5', '6']
  phase.error = ''
}

const verifyOtp = (phase) => {
  phase.verifying = true
  phase.error = ''
  setTimeout(() => {
    phase.verifying = false
    if (phase.digits.join('') === '123456') phase.verified = true
    else phase.error = 'That code didn\u2019t match. Try "Autofill Demo OTP" for this demo.'
  }, 700)
}

const onOtpKeydown = ({ event, key, index }) => {
  const inputs = otpRefs[key]
  const phase = key === 'phone' ? phone : nin
  if (event.key === 'Backspace') {
    if (phase.digits[index]) {
      phase.digits[index] = ''
      return
    }
    if (index > 0) {
      phase.digits[index - 1] = ''
      inputs[index - 1]?.focus()
    }
  }
  if (event.key === 'ArrowLeft' && index > 0) inputs[index - 1]?.focus()
  if (event.key === 'ArrowRight' && index < phase.digits.length - 1) inputs[index + 1]?.focus()
}

const onOtpPaste = ({ event, key }) => {
  event.preventDefault()
  const phase = key === 'phone' ? phone : nin
  const pasted = event.clipboardData.getData('text').replace(/\D/g, '')
  const chars = pasted.split('')
  for (let i = 0; i < phase.digits.length; i++) phase.digits[i] = chars[i] || ''
}

// ── BVN sub-state flow ───────────────────────────────────────────────
const bvnSubState = ref('input')
const bvnName = ref('')
const bvnLookupLoading = ref(false)
const livenessLoading = ref(false)

const bvnInitials = computed(() => {
  if (!bvnName.value) return ''
  return bvnName.value.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
})

const maskedBvn = computed(() => {
  const b = bvn.value
  if (b.length !== 11) return ''
  return `${b.slice(0, 3)} \u2022\u2022\u2022\u2022\u2022 ${b.slice(-3)}`
})

const maskedId = (val) => (val ? `${'\u2022'.repeat(Math.max(val.length - 3, 0))}${val.slice(-3)}` : '')

const lookupBvn = () => {
  bvnLookupLoading.value = true
  setTimeout(() => {
    bvnLookupLoading.value = false
    bvnName.value = 'Adekunle Okonkwo' // demo lookup result
    bvnSubState.value = 'confirm'
  }, 900)
}

const confirmBvnNo = () => {
  bvn.value = ''
  bvnName.value = ''
  bvnSubState.value = 'input'
}

const simulateLiveness = () => {
  livenessLoading.value = true
  setTimeout(() => {
    livenessLoading.value = false
    bvn.verified = true
    bvnSubState.value = 'verified'
  }, 1200)
}

const jumpToBvn = () => {
  step.value = 3
  bvnSubState.value = 'verified'
}

// ── Bank link (simulated wallet-linking call) ───────────────────────────
const linkState = ref('idle') // idle | linking | done
const linkResult = reactive({ bankName: '', reference: '', tier: '' })

const startLink = () => {
  linkState.value = 'linking'
  setTimeout(() => {
    linkState.value = 'done'
    linkResult.bankName = 'Wema Bank \u2014 ****4821'
    linkResult.reference = 'BVL-' + Math.random().toString(36).slice(2, 10).toUpperCase()
    linkResult.tier = 'Tier 2 (BVN + NIN verified)'
  }, 1600)
}

// ── Final submit ─────────────────────────────────────────────────────
const declaration = ref(false)
const linkedSuccess = ref(false)

const submitLink = () => {
  linkedSuccess.value = true
}

const resetDemo = () => {
  step.value = 1
  consentIdentity.value = false
  consentData.value = false
  ;[phone, nin, bvn].forEach((p) => {
    p.sent = false
    p.verified = false
    p.verifying = false
    p.digits = ['', '', '', '', '', '']
    p.error = ''
    p.resendTimer = 0
    clearInterval(p._timerHandle)
  })
  bvnSubState.value = 'input'
  bvnName.value = ''
  linkState.value = 'idle'
  linkResult.bankName = ''
  linkResult.reference = ''
  linkResult.tier = ''
  declaration.value = false
  linkedSuccess.value = false
}


</script>


<style scoped>
.v-btn{
    text-transform: none;
}
* {
  box-sizing: border-box;
}

/* FORM FIELDS */
.form-field {
  @apply w-full px-4 py-2.5 rounded-[10px] text-sm font-medium;
  @apply border border-[#bfe3c1] bg-white text-[#0f1a12];
  @apply placeholder:text-[#9fb3a1] transition-all duration-200;
  @apply appearance-none;
}

.form-field:hover:not(:disabled) {
  @apply border-[#8fce93] bg-[#fafbfa];
}

.form-field:focus {
  @apply outline-none border-[#2E7D32];
  @apply shadow-[0_0_0_3px_rgba(76,175,80,0.15)];
}

.form-field:disabled {
  @apply bg-[#f0f0f0] text-[#9fb3a1] cursor-not-allowed opacity-60;
}

/* BUTTONS */
.btn-full {
  @apply w-full px-6 py-3 rounded-[10px] text-sm font-bold;
  @apply bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white;
  @apply shadow-[0_8px_32px_rgba(46,125,50,0.3)];
  @apply transition-all duration-200;
  @apply disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none;
}

.btn-full:not(:disabled):hover {
  @apply opacity-90 -translate-y-1 shadow-[0_12px_40px_rgba(46,125,50,0.4)];
}

.btn-full:not(:disabled):active {
  transform: scale(0.95);
}

.btn-disabled {
  @apply bg-[#e3f2e4] text-[#9fb3a1] shadow-none cursor-not-allowed !important;
}

.btn-ghost {
  @apply px-6 py-3 rounded-[10px] text-sm font-bold;
  @apply border border-[#cfe9d0] text-[#28422c] bg-transparent;
  @apply transition-all duration-200;
}

.btn-ghost:not(:disabled):hover {
  @apply border-[#2E7D32] text-[#2E7D32] bg-[#eef8ef];
}

.btn-ghost:not(:disabled):active {
  transform: scale(0.95);
}

/* CHECK CARDS */
.check-card {
  @apply flex items-start gap-3 border border-[#cfe9d0] p-4 rounded-[10px];
  @apply cursor-pointer transition-all duration-200;
  @apply hover:border-[#2E7D32] hover:bg-[#fafbfa];
}

.check-active {
  @apply border-[#2E7D32] bg-[#eef8ef];
}

.check-box {
  @apply w-5 h-5 rounded-[6px] border-2 border-[#b7d9b9];
  @apply flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200;
}

.check-active .check-box {
  @apply bg-[#2E7D32] border-[#2E7D32];
}

/* OTP INPUTS */
.otp-input {
  @apply w-12 h-14 text-center text-2xl font-extrabold;
  @apply border border-[#cfe9d0] rounded-[10px] bg-white text-[#0f1a12];
  @apply transition-all duration-200 appearance-none;
}

.otp-input:focus {
  @apply outline-none border-[#2E7D32];
  @apply shadow-[0_0_0_3px_rgba(76,175,80,0.15)];
}

.otp-verified-inner {
  @apply flex items-center gap-2 text-sm font-semibold;
  @apply bg-[#eef8ef] text-[#2E7D32] px-3.5 py-2.5 rounded-[10px];
}

.otp-check-dot {
  @apply w-[18px] h-[18px] rounded-full bg-[#4CAF50] text-white text-[11px];
  @apply flex items-center justify-center flex-shrink-0;
}

/* REVIEW ROWS */
.review-row-card {
  @apply flex justify-between items-center gap-3 px-4 py-3 rounded-[10px];
  @apply border border-[#dcefdd] bg-[#f8fdf8] cursor-pointer text-sm transition-colors duration-150;
}

.review-row-card:hover {
  @apply border-[#4CAF50] bg-[#eef8ef];
}

/* ────────────────────────────────────────────── */
/* MOBILE RESPONSIVENESS                         */
/* ────────────────────────────────────────────── */

@media (max-width: 639px) {
  .form-field {
    @apply px-3.5 py-3 text-base;
  }

  .btn-full,
  .btn-ghost {
    @apply px-4 py-3.5 text-base;
  }

  .otp-input {
    @apply w-10 h-12 text-xl;
  }

  .px-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 374px) {
  .form-field {
    @apply text-sm;
  }

  .otp-input {
    @apply w-9 h-11 text-lg;
  }
}
</style>