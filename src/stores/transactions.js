import { defineStore } from 'pinia'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: []
    // shape once you start pushing real data:
    // { id, icon: '🛒', name: 'Supermarket', subtitle: 'Today · Food & groceries', amount: -18200 }
  }),

  actions: {
    addTransaction(tx) {
      this.transactions.unshift({ id: Date.now(), ...tx })
    }
  }
})