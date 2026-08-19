// src/stores/authStore.js

import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'
import ApiService from '@/services/api'

const SESSION_KEY = 'budgetvault_session'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    profile: JSON.parse(
      localStorage.getItem(SESSION_KEY) || 'null'
    ),

    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.profile,

    user: (state) => state.profile,
  },

  actions: {

    // ============================================
    // LOGIN
    // ============================================

    async login(email, password) {
      this.loading = true
      this.error = null

      try {
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password,
          })

        if (error) {
          throw error
        }

        if (!data.user) {
          throw new Error('Login failed.')
        }

        // ========================================
        // GET USER PROFILE
        // ========================================

        const {
          data: profile,
          error: profileError,
        } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_user_id', data.user.id)
          .single()

        if (profileError || !profile) {
          throw new Error(
            'Could not load your profile.'
          )
        }

        // ========================================
        // SAVE SESSION
        // ========================================

        this.profile = profile

        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify(profile)
        )

        return profile

      } catch (err) {

        this.error =
          err.message ||
          'Incorrect email or password.'

        throw err

      } finally {

        this.loading = false

      }
    },


    // ============================================
    // REGISTER
    // ============================================

    async register(form) {
      this.loading = true
      this.error = null

      try {

        const result = await ApiService.post(
          '/onboard',
          {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password,
          }
        )

        return result

      } catch (err) {

        this.error =
          err.response?.data?.error ||
          err.message ||
          'Registration failed.'

        throw err

      } finally {

        this.loading = false

      }
    },


    // ============================================
    // LOGOUT
    // ============================================

    async logout() {

      await supabase.auth.signOut()

      this.profile = null

      localStorage.removeItem(SESSION_KEY)

    },


    // ============================================
    // FETCH CURRENT SESSION
    // ============================================

    async fetchSession() {

      const { data } =
        await supabase.auth.getSession()

      if (!data.session) {

        this.profile = null

        localStorage.removeItem(SESSION_KEY)

        return

      }

      // ========================================
      // GET PROFILE
      // ========================================

      const {
        data: profile,
        error,
      } = await supabase
        .from('profiles')
        .select('*')
        .eq(
          'auth_user_id',
          data.session.user.id
        )
        .single()

      if (error || !profile) {

        this.profile = null

        localStorage.removeItem(SESSION_KEY)

        return

      }

      // ========================================
      // SAVE PROFILE
      // ========================================

      this.profile = profile

      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(profile)
      )
    },


    // ============================================
    // CLEAR ERROR
    // ============================================

    clearError() {

      this.error = null

    },

  },
})
