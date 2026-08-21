<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

const email = ref('')
const password = ref('')

const formRef = ref()
const message = ref('')
const messageType = ref<'success' | 'error'>('error')

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email'
]

const passwordRules = [(v: string) => !!v || 'Password is required']

const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  const { valid } = await formRef.value.validate()

  errorMessage.value = ''
  if (!valid) return

  const payload = {
    email: email.value.trim().toLowerCase(),
    password: password.value
  }

  console.log('Login payload:', {
    email: payload.email,
    password: '[HIDDEN]'
  })

  loading.value = true

  try {
    const response = await authStore.login(payload.email, payload.password)

    console.log('Login response:', response)

    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)

    errorMessage.value = 'Invalid email or password.'
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
        <div class="flex items-center justify-center mr-15 mb-5">
          <!-- Logo -->
          <img
            src="@/assets/budgetlogo.png"
            alt="BudgetVault Logo"
            class="h-16 w-auto object-contain"
          />

          <!-- Brand -->
          <div class="flex flex-col items-center -ml-1">
            <p class="font-extrabold leading-none tracking-[-1.5px]">
              <span class="block text-[32px] text-[#074033]"> Budget </span>

              <span class="block -mt-1 text-[29px] text-[#D4A72C]"> Vault </span>
            </p>

            <span class="mt-1 h-[3px] w-[38px] rounded-full bg-[#D4A72C]"></span>
          </div>
        </div>
        <!-- Back -->
        <RouterLink
          to="/"
          class="inline-block text-sm text-gray-500 mb-7 hover:text-green-600 transition"
        >
          ← Back to home
        </RouterLink>

        <!-- Heading -->
        <h1 class="text-[30px] font-bold mb-2.5">Welcome back</h1>

        <p class="text-gray-500 leading-6 mb-7">
          Log in to continue managing your money with BudgetVault.
        </p>

        <!-- Login Form -->
        <v-form ref="formRef" @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-5">
            <v-text-field
              v-model="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              variant="outlined"
              :rules="emailRules"
              color="green"
              hide-details="auto"
            />
          </div>

          <!-- Password -->
          <div class="mb-5">
            <v-text-field
              v-model="password"
              label="Password"
              placeholder="Enter your password"
              autocomplete="current-password"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              :rules="passwordRules"
              color="green"
              hide-details="auto"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePassword"
            />
          </div>

          <!-- Forgot password -->
          <button
            type="button"
            @click="forgotPassword"
            class="block w-full text-right -mt-2 mb-[22px] text-sm font-semibold text-green-600 hover:underline"
          >
            Forgot password?
          </button>

          <div
            v-if="errorMessage"
            class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {{ errorMessage }}
          </div>

          <!-- Login button -->
          <v-btn
            type="submit"
            block
            size="large"
            color="green"
            :loading="loading"
            :disabled="loading"
            class="!normal-case !font-bold !rounded-xl"
          >
            {{ loading ? 'Logging in...' : 'Log in' }}
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

        <!-- Register -->
        <div class="text-center text-sm text-gray-500">
          Don't have an account?

          <RouterLink to="/register" class="text-green-600 font-bold hover:underline ml-1">
            Create one
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
