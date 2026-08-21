// src/stores/budgetStore.js
//
// Single source of truth for the user's monthly budget settings
// (monthly_budget_settings table: one row per user). Mirrors the
// pattern in vaultStore.js — fetch, write-through, realtime patch.

import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/authStore'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    settings: null, // the monthly_budget_settings row, or null until loaded
    loading: false,
    saving: false,
    error: null,
    initialized: false,
    _channel: null,
  }),

  getters: {
    monthlyIncome: (state) => Number(state.settings?.monthly_income || 0),
    schedule: (state) => state.settings?.withdrawal_schedule || '1-7',
    autoRenew: (state) => state.settings?.auto_renew ?? true,
  },

  actions: {
    _userId() {
      const auth = useAuthStore()
      const id = auth.profile?.auth_user_id
      if (!id) throw new Error('Not authenticated.')
      return id
    },

    // ============================================
    // FETCH — gets the user's row, or creates a
    // default one if it doesn't exist yet (belt and
    // braces alongside the DB trigger/backfill).
    // ============================================
    async fetchSettings() {
      this.loading = true
      this.error = null
      try {
        const userId = this._userId()

        const { data, error } = await supabase
          .from('monthly_budget_settings')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle()

        if (error) throw error

        if (data) {
          this.settings = data
        } else {
          const { data: created, error: insertError } = await supabase
            .from('monthly_budget_settings')
            .insert({ user_id: userId, monthly_income: 0 })
            .select()
            .single()

          if (insertError) throw insertError
          this.settings = created
        }

        this.initialized = true
        this.subscribeToChanges()
      } catch (err) {
        this.error = err.message || 'Could not load budget settings.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // ============================================
    // SAVE — used by EditBudgetmodal
    // ============================================
    async saveSettings({ amount, schedule, autoRenew }) {
      this.saving = true
      this.error = null
      try {
        const userId = this._userId()

        const { data, error } = await supabase
          .from('monthly_budget_settings')
          .update({
            monthly_income: Number(amount),
            withdrawal_schedule: schedule,
            auto_renew: autoRenew,
          })
          .eq('user_id', userId)
          .select()
          .single()

        if (error) throw error

        this.settings = data
        return data
      } catch (err) {
        this.error = err.message || 'Could not save budget settings.'
        throw err
      } finally {
        this.saving = false
      }
    },

    // ============================================
    // REALTIME
    // ============================================
    subscribeToChanges() {
      if (this._channel) return

      let userId
      try {
        userId = this._userId()
      } catch {
        return
      }

      this._channel = supabase
        .channel(`monthly_budget_settings:user:${userId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'monthly_budget_settings',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            if (payload.eventType === 'DELETE') {
              this.settings = null
            } else {
              this.settings = payload.new
            }
          }
        )
        .subscribe()
    },

    unsubscribe() {
      if (this._channel) {
        supabase.removeChannel(this._channel)
        this._channel = null
      }
    },

    reset() {
      this.unsubscribe()
      this.settings = null
      this.initialized = false
      this.error = null
    },
  },
})