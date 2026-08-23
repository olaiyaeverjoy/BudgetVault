import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBudgetStore = defineStore('budgets', () => {
  const budgets = ref([])
  let nextId = 1

  /* -----------------------------
     Helpers
  ----------------------------- */

  const totalAllocation = computed(() =>
    budgets.value.reduce(
      (sum, budget) => sum + Number(budget.moneyAdded || 0),
      0
    )
  )

  /**
   * A budget becomes available for settlement only when
   * the amount saved is enough to cover the target amount.
   */
  function isEligible(budget) {
    return (
      Number(budget?.amount) > 0 &&
      Number(budget?.moneyAdded || 0) >= Number(budget?.amount)
    )
  }

  /**
   * These are the ONLY budgets that should currently
   * appear inside BillSettlement.vue and Dashboard
   * "Settle Budget".
   */
  const eligibleBills = computed(() =>
    budgets.value.filter(isEligible)
  )

  /* -----------------------------
     Create Budget
  ----------------------------- */

  function createBudget({ name, amount, description }) {
    const trimmedName = (name || '').trim()
    const numAmount = Number(amount)

    if (!trimmedName || !numAmount || numAmount <= 0) {
      return null
    }

    const budget = {
      id: nextId++,

      name: trimmedName,

      amount: numAmount,

      description: (description || '').trim(),

      // Money saved toward this budget
      moneyAdded: 0,

      // Recurring cycle
      cycle: 1,

      // Last time this budget was settled
      lastSettledAt: null
    }

    budgets.value.push(budget)

    return budget
  }

  const unsettledDebt = computed(() =>
  budgets.value.reduce((sum, b) => {
    const target = Number(b.amount || 0)
    const saved = Number(b.moneyAdded || 0)

    return sum + Math.max(0, target - saved)
  }, 0)
)

  /* -----------------------------
     Add Money
  ----------------------------- */

  function addMoney(id, amount) {
    const budget = budgets.value.find(
      (item) => item.id === id
    )

    if (!budget) {
      return null
    }

    const value = Number(amount || 0)

    if (value <= 0) {
      return null
    }

    budget.moneyAdded =
      Number(budget.moneyAdded || 0) + value

    return budget
  }

  /* -----------------------------
     Withdraw
  ----------------------------- */

  function withdraw(id, amount) {
    const budget = budgets.value.find(
      (item) => item.id === id
    )

    if (!budget) {
      return null
    }

    const requestedAmount = Number(amount || 0)

    if (requestedAmount <= 0) {
      return null
    }

    const availableAmount = Number(
      budget.moneyAdded || 0
    )

    const withdrawalAmount = Math.min(
      requestedAmount,
      availableAmount
    )

    if (withdrawalAmount <= 0) {
      return null
    }

    budget.moneyAdded =
      availableAmount - withdrawalAmount

    return {
      budget,
      amount: withdrawalAmount
    }
  }

  /* -----------------------------
     Settle Budget
  ----------------------------- */

  function settleBudget(id) {
    const budget = budgets.value.find(
      (item) => item.id === id
    )

    if (!budget || !isEligible(budget)) {
      return null
    }

    const settledAmount = Number(budget.amount)

    /*
     * Do NOT delete the budget.
     *
     * Resetting moneyAdded to 0 makes it disappear
     * from eligibleBills immediately.
     *
     * The budget then starts a new recurring cycle.
     */
    budget.moneyAdded = 0

    budget.cycle =
      Number(budget.cycle || 1) + 1

    budget.lastSettledAt =
      new Date().toISOString()

    return {
      budget,
      settledAmount
    }
  }

  /* -----------------------------
     Delete Budget Permanently
  ----------------------------- */

  function deleteBudget(id) {
    const index = budgets.value.findIndex(
      (budget) => budget.id === id
    )

    if (index === -1) {
      return false
    }

    budgets.value.splice(index, 1)

    return true
  }

  /* -----------------------------
     Progress
  ----------------------------- */

  function progress(budget) {
    if (!budget?.amount) {
      return 0
    }

    return Math.min(
      100,
      Math.round(
        (Number(budget.moneyAdded || 0) /
          Number(budget.amount)) *
          100
      )
    )
  }

  const totalBudgetTarget = computed(() =>
  budgets.value.reduce((sum, b) => sum + Number(b.amount || 0), 0)
)
  /* -----------------------------
     Currency
  ----------------------------- */

  function formatNaira(amount) {
    return `₦${Number(amount || 0).toLocaleString('en-NG')}`
  }

  return {
    budgets,

    totalAllocation,
    
    unsettledDebt,

    eligibleBills,

    totalBudgetTarget,

    isEligible,

    createBudget,

    addMoney,

    withdraw,

    settleBudget,

    deleteBudget,

    progress,

    formatNaira
  }
})