import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSavingsStore = defineStore('savings', () => {
  const totalSavings = ref(0)

  const transactions = ref([
   
  ])

  const totalAdded = computed(() =>
    transactions.value
      .filter((transaction) => transaction.type === 'deposit')
      .reduce(
        (total, transaction) => total + Number(transaction.amount || 0),
        0
      )
  )

  const totalWithdrawn = computed(() =>
    transactions.value
      .filter((transaction) => transaction.type === 'withdrawal')
      .reduce(
        (total, transaction) => total + Number(transaction.amount || 0),
        0
      )
  )

  function addMoney(amount, description = 'Money added') {
    const value = Number(amount)

    if (!value || value <= 0) {
      return false
    }

    totalSavings.value += value

    transactions.value.unshift({
      id: Date.now(),
      type: 'deposit',
      amount: value,
      description,
      date: new Date().toISOString(),
      method: null
    })

    return true
  }

  function withdrawMoney(
    amount,
    account,
    description = 'Money withdrawn'
  ) {
    const value = Number(amount)

    if (!value || value <= 0) {
      return false
    }

    if (value > totalSavings.value) {
      return false
    }

    totalSavings.value -= value

    transactions.value.unshift({
      id: Date.now(),
      type: 'withdrawal',
      amount: value,
      description,
      date: new Date().toISOString(),
      method: account
        ? `${account.bankName} ${account.maskedAccount}`
        : null
    })

    return true
  }

  function formatNaira(amount) {
    return `₦${Number(amount || 0).toLocaleString('en-NG')}`
  }

  return {
    totalSavings,
    transactions,
    totalAdded,
    totalWithdrawn,
    addMoney,
    withdrawMoney,
    formatNaira
  }
})