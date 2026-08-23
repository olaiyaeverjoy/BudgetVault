import { defineStore } from 'pinia'

export const useBudgetSettingsStore = defineStore('budgetSettings', {
  state: () => ({
    amount: 0,
    schedule: '1-7',
    autoRenew: true,
    withdrawn: 0
  }),

  getters: {
    formattedAmount: (state) => `₦${Number(state.amount || 0).toLocaleString()}`,
    formattedWithdrawn: (state) => `₦${Number(state.withdrawn || 0).toLocaleString()}`,
    remainingBalance: (state) => Math.max(0, Number(state.amount || 0) - Number(state.withdrawn || 0)),
    formattedRemainingBalance() {
      return `₦${this.remainingBalance.toLocaleString()}`
    }
  },

  actions: {
    saveSettings({ amount, schedule, autoRenew }) {
      this.amount = Number(amount)
      this.schedule = schedule
      this.autoRenew = autoRenew
    },

    // Returns false if invalid or over the remaining balance
    recordWithdrawal(amount) {
      const value = Number(amount)
      if (!value || value <= 0) return false
      if (value > this.remainingBalance) return false

      this.withdrawn += value
      return true
    }
  }
})