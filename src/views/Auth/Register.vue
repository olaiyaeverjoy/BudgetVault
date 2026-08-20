<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const agreeTerms = ref(false)

const message = ref('')
const messageType = ref('')

const loading = ref(false)
const successMessage = ref('')
const formRef = ref()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}



const requiredRule = (v: string) => !!v || 'This field is required'

const emailRules = [requiredRule, (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email']
const phoneRules = [requiredRule]

const passwordRules = [
  requiredRule,
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters'
]

const confirmPasswordRules = [
  (v) => !!v || 'Please confirm your password',
  (v) => v === password.value || 'Passwords do not match'
]
const termsRules = [(v: boolean) => v === true || 'You must agree to the terms and conditions']


async function handleRegister() {
  loading.value = true
  successMessage.value = ''

  const { valid } = await formRef.value.validate()

  if (!valid) {
    loading.value = false
    return
  }

  const payload = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    password: password.value
  }

  console.log('payload:', payload)

  try {
    const result = await authStore.register(payload)

    successMessage.value = result?.message || 'Account created and verified, proceeds to Login.'

    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch {
    // authStore.error is already set and shown via the v-alert
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-5 py-8 text-gray-900">
    <div class="w-full max-w-[480px]">
      <!-- Card -->
      <div class="bg-white rounded-[24px] p-10 shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:p-10">
        <!-- Logo -->
        <div class="text-center text-[26px] font-extrabold text-green-600 mb-9">BudgetVault</div>

        <!-- Back -->
        <RouterLink
          to="/"
          class="inline-block text-sm text-gray-500 mb-7 hover:text-green-600 transition"
        >
          ← Back to home
        </RouterLink>

        <!-- Heading -->
        <h1 class="text-[30px] font-bold mb-2.5">Create your account</h1>

        <p class="text-gray-500 leading-6 mb-7">
          Create your BudgetVault account and start managing your money.
        </p>

        <!-- Register Form -->
        <v-form ref="formRef" @submit.prevent="handleRegister">
          <!-- First + Last Name -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <!-- First Name -->
            <v-text-field
              v-model="firstName"
              label="First name"
              placeholder="John"
              autocomplete="given-name"
              variant="outlined"
              density="comfortable"
              color="green"
              hide-details="auto"
              rounded="lg"
            />

            <!-- Last Name -->
            <v-text-field
              v-model="lastName"
              label="Last name"
              placeholder="Doe"
              autocomplete="family-name"
              variant="outlined"
              density="comfortable"
              color="green"
              hide-details="auto"
              rounded="lg"
            />
          </div>

          <!-- Email -->
          <div class="mb-5">
            <v-text-field
              v-model="email"
              label="Email address"
              placeholder="you@example.com"
              type="email"
              autocomplete="email"
              variant="outlined"
              density="comfortable"
              :rules="emailRules"
              color="green"
              hide-details="auto"
              rounded="lg"
            />
          </div>

          <!-- Phone -->
          <div class="mb-5">
            <v-text-field
              v-model="phone"
              label="Phone number"
              placeholder="+234 800 000 0000"
              type="tel"
              autocomplete="tel"
              variant="outlined"
              density="comfortable"
              :rules="phoneRules"
              color="green"
              hide-details="auto"
              rounded="lg"
            />
          </div>

          <!-- Password -->
          <div class="mb-5">
            <v-text-field
              v-model="password"
              label="Password"
              placeholder="Create a password"
              autocomplete="new-password"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              density="comfortable"
              :rules="passwordRules"
              color="green"
              hide-details="auto"
              rounded="lg"
              :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              @click:append-inner="togglePassword"
            />
          </div>

          <!-- Confirm Password -->
          <div class="mb-5">
            <v-text-field
              v-model="confirmPassword"
              label="Confirm password"
              placeholder="Confirm your password"
              autocomplete="new-password"
              :type="showConfirmPassword ? 'text' : 'password'"
              variant="outlined"
              density="comfortable"
              :rules="confirmPasswordRules"
              color="green"
              hide-details="auto"
              rounded="lg"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              @click:append-inner="toggleConfirmPassword"
            />
          </div>

          <!-- Terms -->
          <div class="mb-6">
            <v-checkbox v-model="agreeTerms" color="green" :rules="termsRules" hide-details="auto">
              <template #label>
                <span class="text-sm text-gray-500 leading-5">
                  I agree to the

                  <a href="#" class="text-green-600 font-semibold hover:underline" @click.stop>
                    Terms and Conditions
                  </a>

                  and

                  <a href="#" class="text-green-600 font-semibold hover:underline" @click.stop>
                    Privacy Policy
                  </a>
                </span>
              </template>
            </v-checkbox>
          </div>

          <!-- Register -->
          <v-btn
            type="submit"
            block
            size="large"
            color="green"
            rounded="lg"
            :loading="loading"
            :disabled="loading"
            class="font-weight-bold text-none"
          >
            {{ loading ? 'Creating account...' : 'Create account' }}
          </v-btn>
        </v-form>

        <!-- Message -->
        <div
          v-if="message"
          :class="[
            'mt-[18px] p-[13px] rounded-[10px] text-sm text-center',
            messageType === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-800'
          ]"
        >
          {{ message }}
        </div>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-7 text-gray-400 text-[13px]">
          <div class="flex-1 h-px bg-gray-200"></div>
          <span>OR</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <!-- Login -->
        <div class="text-center text-sm text-gray-500">
          Already have an account?

          <RouterLink to="/login" class="text-green-600 font-bold hover:underline ml-1">
            Log in
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
