import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGoalsStore = defineStore('goals', () => {
  const goals = ref([])

  const totalTarget = computed(() =>
    goals.value.reduce((sum, g) => sum + Number(g.target || 0), 0)
  )

  const totalSaved = computed(() =>
    goals.value.reduce((sum, g) => sum + Number(g.saved || 0), 0)
  )

  const percent = computed(() => {
    if (!totalTarget.value) return 0
    return Math.min(100, Math.round((totalSaved.value / totalTarget.value) * 100))
  })

  function createGoal({ name, amount, description, timeframe }) {
    const trimmedName = (name || '').trim()
    const numAmount = Number(amount)

    if (!trimmedName || !numAmount || numAmount <= 0) return null

    const goal = {
      id: Date.now(),
      name: trimmedName,
      description: (description || '').trim() || 'No description added.',
      saved: 0,
      target: numAmount,
      timeframe: (timeframe || '').trim() || 'Not set',
      locked: false
    }

    goals.value.push(goal)
    return goal
  }

  function addMoney(id, amount) {
    const goal = goals.value.find((g) => g.id === id)
    if (!goal || goal.locked) return null

    const value = Number(amount || 0)
    if (value <= 0) return null

    goal.saved = Math.min(goal.target, goal.saved + value)
    return goal
  }

  function toggleLock(id) {
    const goal = goals.value.find((g) => g.id === id)
    if (!goal) return null
    goal.locked = !goal.locked
    return goal
  }

  function formatNaira(amount) {
    return `₦${Number(amount || 0).toLocaleString('en-NG')}`
  }

  return { goals, totalTarget, totalSaved, percent, createGoal, addMoney, toggleLock, formatNaira }
})