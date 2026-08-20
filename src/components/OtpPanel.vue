<template>
  <div>
    <!-- VERIFIED STATE -->
    <v-card v-if="phase.verified" class="otp-verified-inner" flat>
      <v-card-text class="d-flex align-center gap-2 text-sm">
        <span class="otp-check-dot">✓</span>
        <span>{{ context }} verified</span>
      </v-card-text>
    </v-card>

    <!-- SEND CODE STATE -->
    <div v-else-if="!phase.sent">
      <p class="text-sm text-[#5c6b5e] mb-3">Send a one-time code to confirm your {{ context }}.</p>
      <v-btn
        block
        class="btn-full"
        color="#2E7D32"
        size="large"
        @click="$emit('send')"
      >
        Send Code
      </v-btn>
    </div>

    <!-- OTP INPUT STATE -->
    <div v-else>
      <!-- OTP DIGIT BOXES -->
      <div class="d-flex justify-center gap-2 mb-4">
        <v-text-field
          v-for="(digit, i) in phase.digits"
          :key="i"
          :value="digit"
          class="otp-input"
          type="text"
          inputmode="numeric"
          maxlength="1"
          variant="outlined"
          density="compact"
          align="center"
          @input="handleDigitInput(i, $event)"
          @keydown="$emit('nav', { event: $event, key: phaseKey, index: i })"
          @paste="$emit('paste', { event: $event, key: phaseKey })"
        />
      </div>

      <!-- RESEND & AUTOFILL BUTTONS -->
      <div class="d-flex align-center gap-4 mb-3 text-sm">
        <v-btn
          variant="text"
          size="small"
          color="#2E7D32"
          :disabled="phase.resendTimer > 0"
          class="font-weight-bold"
          @click="$emit('send')"
        >
          {{ phase.resendTimer > 0 ? `Resend in ${phase.resendTimer}s` : 'Resend Code' }}
        </v-btn>
        <v-btn
          variant="text"
          size="small"
          color="#2E7D32"
          class="font-weight-bold"
          @click="$emit('autofill')"
        >
          Autofill Demo OTP
        </v-btn>
      </div>

      <!-- VERIFY BUTTON -->
      <v-btn
        block
        class="btn-full"
        color="#2E7D32"
        size="large"
        :disabled="phase.digits.join('').length < 6 || phase.verifying"
        :loading="phase.verifying"
        @click="$emit('verify')"
      >
        {{ phase.verifying ? 'Verifying…' : 'Verify Code' }}
      </v-btn>

      <!-- ERROR MESSAGE -->
      <v-alert
        v-if="phase.error"
        type="error"
        class="mt-3"
        dense
        text
      >
        {{ phase.error }}
      </v-alert>
    </div>
  </div>
</template>

<script setup>
defineProps({
  phase: {
    type: Object,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  phaseKey: {
    type: String,
    required: true
  }
})

defineEmits(['send', 'autofill', 'verify', 'set-ref', 'nav', 'paste'])

const handleDigitInput = (i, event) => {
  const v = event.replace(/\D/g, '').slice(-1)
  phase.digits[i] = v
}
</script>

<style scoped>
.v-btn{
    text-transform: none
}
.otp-verified-inner {
  @apply flex items-center gap-2 text-sm font-semibold;
  @apply bg-[#eef8ef] text-[#2E7D32] px-3.5 py-2.5 rounded-[10px];
  background-color: #eef8ef !important;
  color: #2E7D32 !important;
}

.otp-check-dot {
  @apply w-[18px] h-[18px] rounded-full bg-[#4CAF50] text-white text-[11px];
  @apply flex items-center justify-center flex-shrink-0;
  background-color: #4CAF50 !important;
  color: white !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.otp-input .v-field) {
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
}

:deep(.otp-input input) {
  text-align: center !important;
  font-size: 1.5rem !important;
  font-weight: 700 !important;
}

:deep(.otp-input .v-field__outline) {
  border-color: #bfe3c1 !important;
}

:deep(.otp-input:focus-within .v-field__outline) {
  border-color: #2E7D32 !important;
}
</style>