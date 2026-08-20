
// Single source of truth for Smart Vault data. Every read comes from
// Supabase (never hardcoded), every write goes to Supabase first and
// the local state is patched only from what the DB confirms (either
// the insert/update response, or a realtime event). This means two
// tabs / two devices stay in sync automatically.

import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/authStore'

const VAULT_COLORS = ['emerald', 'gold', 'blue', 'purple', 'rose']

function pickColor(index) {
  return VAULT_COLORS[index % VAULT_COLORS.length]
}

export const useVaultStore = defineStore('vaults', {
  state: () => ({
    vaults: [],
    loading: false,
    saving: false,
    error: null,
    initialized: false,
    _channel: null,
  }),

  getters: {
    totalProtected: (state) =>
      state.vaults.reduce((sum, v) => sum + Number(v.current || 0), 0),

    totalTarget: (state) =>
      state.vaults.reduce((sum, v) => sum + Number(v.target || 0), 0),

    activeVaultsCount: (state) =>
      state.vaults.filter((v) => v.status !== 'completed').length,

    completedVaultsCount: (state) =>
      state.vaults.filter((v) => v.status === 'completed').length,

    vaultById: (state) => (id) => state.vaults.find((v) => v.id === id),
  },

  actions: {
    _userId() {
      const auth = useAuthStore()
      const id = auth.profile?.auth_user_id
      if (!id) throw new Error('Not authenticated.')
      return id
    },

    // ============================================
    // FETCH — initial load
    // ============================================
    async fetchVaults() {
      this.loading = true
      this.error = null
      try {
        const userId = this._userId()

        const { data, error } = await supabase
          .from('category_vaults')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: true })

        if (error) throw error

        this.vaults = data || []
        this.initialized = true

        // Start listening for changes after the first successful fetch
        this.subscribeToChanges()
      } catch (err) {
        this.error = err.message || 'Could not load vaults.'
        throw err
      } finally {
        this.loading = false
      }
    },

    // ============================================
    // CREATE — used by AddBudgetItemModal
    // ============================================
    async createVault({ itemName, icon, amount, accountNumber, bankName }) {
      this.saving = true
      this.error = null
      try {
        const userId = this._userId()

        const payload = {
          user_id: userId,
          icon,
          title: itemName,
          target: Number(amount),
          current: 0,
          color: pickColor(this.vaults.length),
          payee_name: itemName,
          payee_account_number: accountNumber || null,
          payee_bank: bankName || null,
        }

        const { data, error } = await supabase
          .from('category_vaults')
          .insert(payload)
          .select()
          .single()

        if (error) throw error

        // Realtime will also deliver this INSERT, so guard against duplicates
        if (!this.vaults.some((v) => v.id === data.id)) {
          this.vaults.push(data)
        }

        return data
      } catch (err) {
        this.error = err.message || 'Could not create vault.'
        throw err
      } finally {
        this.saving = false
      }
    },

    // ============================================
    // ADD FUNDS — creates a settlement, DB trigger
    // bumps `current` and writes transaction_history
    // ============================================
    async addFunds(vaultId, amount) {
      this.error = null
      try {
        const userId = this._userId()

        const { data, error } = await supabase
          .from('category_vault_settlements')
          .insert({
            vault_id: vaultId,
            user_id: userId,
            amount: Number(amount),
            status: 'settled', // trigger applies the update+log
          })
          .select()
          .single()

        if (error) throw error
        return data
      } catch (err) {
        this.error = err.message || 'Could not add funds.'
        throw err
      }
    },

    // ============================================
    // UPDATE — e.g. rename, change target
    // ============================================
    async updateVault(vaultId, changes) {
      this.error = null
      try {
        const userId = this._userId()

        const { data, error } = await supabase
          .from('category_vaults')
          .update(changes)
          .eq('id', vaultId)
          .eq('user_id', userId)
          .select()
          .single()

        if (error) throw error

        const idx = this.vaults.findIndex((v) => v.id === vaultId)
        if (idx !== -1) this.vaults[idx] = data
        return data
      } catch (err) {
        this.error = err.message || 'Could not update vault.'
        throw err
      }
    },

    // ============================================
    // DELETE
    // ============================================
    async deleteVault(vaultId) {
      this.error = null
      try {
        const userId = this._userId()

        const { error } = await supabase
          .from('category_vaults')
          .delete()
          .eq('id', vaultId)
          .eq('user_id', userId)

        if (error) throw error

        this.vaults = this.vaults.filter((v) => v.id !== vaultId)
      } catch (err) {
        this.error = err.message || 'Could not delete vault.'
        throw err
      }
    },

    // ============================================
    // REALTIME — keep local state in sync with the DB
    // without needing manual refetches or polling
    // ============================================
    subscribeToChanges() {
      if (this._channel) return // already subscribed

      let userId
      try {
        userId = this._userId()
      } catch {
        return
      }

      this._channel = supabase
        .channel(`category_vaults:user:${userId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'category_vaults',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => this._applyRealtimeChange(payload)
        )
        .subscribe()
    },

    _applyRealtimeChange(payload) {
      const { eventType, new: newRow, old: oldRow } = payload

      if (eventType === 'INSERT') {
        if (!this.vaults.some((v) => v.id === newRow.id)) {
          this.vaults.push(newRow)
        }
      } else if (eventType === 'UPDATE') {
        const idx = this.vaults.findIndex((v) => v.id === newRow.id)
        if (idx !== -1) this.vaults[idx] = newRow
      } else if (eventType === 'DELETE') {
        this.vaults = this.vaults.filter((v) => v.id !== oldRow.id)
      }
    },

    unsubscribe() {
      if (this._channel) {
        supabase.removeChannel(this._channel)
        this._channel = null
      }
    },

    // Call this from authStore.logout() so a new user never inherits
    // the previous user's vaults or an orphaned realtime subscription.
    reset() {
      this.unsubscribe()
      this.vaults = []
      this.initialized = false
      this.error = null
    },
  },
})