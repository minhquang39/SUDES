import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '@/layout/DefaultLayout.vue'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AccountView from '@/views/AccountView.vue'
import AccountInfo from '@/components/Body/Account/AccountInfo.vue'
import AccountOrder from '@/components/Body/Account/AccountOrder.vue'
import ChangePassword from '@/components/Body/Account/ChangePassword.vue'
import OTPView from '@/views/OTPView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: {
            isHeader: true,
            isFooter: true,
          },
        },
        {
          path: '/account/login',
          name: 'login',
          component: LoginView,
          meta: {
            isHeader: true,
            isFooter: false,
          },
        },
        {
          path: '/account/register',
          name: 'register',
          component: RegisterView,
          meta: {
            isHeader: true,
            isFooter: false,
          },
        },
        {
          path: '/account/verify',
          name: 'verify',
          component: OTPView,
          meta: {
            isHeader: false,
            isFooter: false,
          },
        },
        {
          path: '/account/forgot-password',
          name: 'forgot-password',
          component: ForgotPasswordView,
          meta: {
            isHeader: false,
            isFooter: false,
          },
        },
        {
          path: '/account/reset-password',
          name: 'reset-password',
          component: ResetPasswordView,
          meta: {
            isHeader: false,
            isFooter: false,
          },
        },
        {
          path: '/account',
          name: 'Account',
          component: AccountView,
          meta: {
            requiresAuth: true,
            isHeader: true,
            isFooter: false,
          },
          children: [
            {
              path: '',
              component: AccountInfo,
              meta: {
                requiresAuth: true,
                isHeader: true,
                isFooter: false,
              },
            },
            {
              path: 'orders',
              component: AccountOrder,
              meta: {
                requiresAuth: true,
                isHeader: true,
                isFooter: false,
              },
            },
            {
              path: 'changepassword',
              component: ChangePassword,
              meta: {
                requiresAuth: true,
                isHeader: true,
                isFooter: false,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        isHeader: false,
        isFooter: false,
      },
    },
  ],
})

// GOOD
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
