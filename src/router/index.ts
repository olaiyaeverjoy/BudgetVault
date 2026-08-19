import { createRouter, createWebHistory } from 'vue-router'

// import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/Register.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Auth/Login.vue')
    },
    // overview
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/banks&cards",
      name: "banks&cards",
      component: () => import("@/views/sidebar/Banks&Cards.vue"),
      meta: { requiresAuth: true },
    },
    // plain&track
    {
      path: "/smartvaults",
      name: "smartvaults",
      component: () => import("@/views/sidebar/SmartVaults.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/budgetplanner",
      name: "budgetplanner",
      component: () => import("@/views/sidebar/BudgetPlanner.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/expensetracking",
      name: "expensetracking",
      component: () => import("@/views/sidebar/ExpenseTracking.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/billsettlement",
      name: "billsettlement",
      component: () => import("@/views/sidebar/BillSettlement.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/goals&dreams",
      name: "goals&dreams",
      component: () => import("@/views/sidebar/Goals&dreams.vue"),
      meta: { requiresAuth: true },
    },
    // intelligence
    {
      path: "/notifications",
      name: "notifications",
      component: () => import("@/views/sidebar/Notifications.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/moneycalender",
      name: "moneycalender",
      component: () => import("@/views/sidebar/MoneyCalendar.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/financialgps",
      name: "financial gps",
      component: () => import("@/views/sidebar/FinancialGps.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/subscriptions",
      name: "subscriptions",
      component: () => import("@/views/sidebar/Subscriptions.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/moneypersonality",
      name: "moneypersonality",
      component: () => import("@/views/sidebar/MoneyPersonality.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/aicoach",
      name: "Ai coach",
      component: () => import("@/views/sidebar/AiCoach.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/yearendreview",
      name: "year-endreview",
      component: () => import("@/views/sidebar/YearEndReview.vue"),
      meta: { requiresAuth: true },
    },
    // collaboration
    {
      path: "/couple",
      name: "couple",
      component: () => import("@/views/sidebar/Couple.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/business",
      name: "business",
      component: () => import("@/views/sidebar/Business.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/student",
      name: "student",
      component: () => import("@/views/sidebar/Student.vue"),
      meta: { requiresAuth: true },
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore()
//   if (to.meta.requiresAuth && !auth.isAuthenticated) return next({ name: 'login' })
//   if (to.meta.guestOnly && auth.isAuthenticated) return next({ name: 'dashboard' })
//   next()
// })

export default router
