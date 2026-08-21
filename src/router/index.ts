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
      path: '/banks&cards',
      name: 'banks&cards',
      component: () => import('@/layouts/sidebar/Banks&Cards.vue'),
      meta: { requiresAuth: true }
    },
    // plain&track
    {
      path: '/smartvaults',
      name: 'smartvaults',
      component: () => import('@/layouts/sidebar/SmartVaults.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/budgetplanner',
      name: 'budgetplanner',
      component: () => import('@/layouts/sidebar/BudgetPlanner.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/expensetracking',
      name: 'expensetracking',
      component: () => import('@/layouts/sidebar/ExpenseTracking.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/billsettlement',
      name: 'billsettlement',
      component: () => import('@/layouts/sidebar/BillSettlement.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/goals&dreams',
      name: 'goals&dreams',
      component: () => import('@/layouts/sidebar/Goals&dreams.vue'),
      meta: { requiresAuth: true }
    },
    // intelligence
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/layouts/sidebar/Notifications.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/moneycalender',
      name: 'moneycalender',
      component: () => import('@/layouts/sidebar/MoneyCalendar.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/financialgps',
      name: 'financial gps',
      component: () => import('@/layouts/sidebar/FinancialGps.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: () => import('@/layouts/sidebar/Subscriptions.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/moneypersonality',
      name: 'moneypersonality',
      component: () => import('@/layouts/sidebar/MoneyPersonality.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/aicoach',
      name: 'Ai coach',
      component: () => import('@/layouts/sidebar/AiCoach.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/yearendreview',
      name: 'year-endreview',
      component: () => import('@/layouts/sidebar/YearEndReview.vue'),
      meta: { requiresAuth: true }
    },
    // collaboration
    {
      path: '/couple',
      name: 'couple',
      component: () => import('@/layouts/sidebar/Couple.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/business',
      name: 'business',
      component: () => import('@/layouts/sidebar/Business.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('@/layouts/sidebar/Student.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/kyc',
      name: 'kyc',
      component: () => import('@/views/WemaKyc.vue')
    },
    {
      path: '/userprofile',
      name: 'profile',
      component: () => import('@/views/profile/userprofile.vue')
    },
    {
      path: '/smart',
      name: 'smart',
      component: () => import('@/views/SmartVault.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore()
//   if (to.meta.requiresAuth && !auth.isAuthenticated) return next({ name: 'login' })
//   if (to.meta.guestOnly && auth.isAuthenticated) return next({ name: 'dashboard' })
//   next()
// })

export default router
