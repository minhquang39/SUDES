import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import AdminLayout from '@/layout/AdminLayout.vue'

import HomeView from '@/views/Client/HomeView.vue'
import LoginView from '@/views/Client/LoginView.vue'
import RegisterView from '@/views/Client/RegisterView.vue'
import AccountView from '@/views/Client/AccountView.vue'
import AccountInfo from '@/components/Body/Account/AccountInfo.vue'
import AccountOrder from '@/components/Body/Account/AccountOrder.vue'
import ChangePassword from '@/components/Body/Account/ChangePassword.vue'
import OTPView from '@/views/Client/OTPView.vue'
import NotFoundView from '@/views/Client/NotFoundView.vue'
import ForgotPasswordView from '@/views/Client/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/Client/ResetPasswordView.vue'
import AdminLogin from '@/views/Admin/AdminLogin.vue'
import DashBoard from '@/views/Admin/DashBoard.vue'
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
          path: '/:slug',
          name: 'product-detail',
          component: () => import('@/views/Client/ProductDetail.vue'),
          meta: {
            isHeader: true,
            isFooter: true,
          },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/components/Body/AboutInfo.vue'),
          meta: {
            isHeader: true,
            isFooter: true,
          },
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/views/Client/Contact.vue'),
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
          name: 'account',
          component: () => import('@/views/Client/AccountView.vue'),
          meta: {
            requiresAuth: true,
            isHeader: true,
          },
        },
        {
          path: '/chinh-sach/:policySlug',
          name: 'policy',
          component: () => import('@/views/Client/PolicyView.vue'),
          meta: {
            requiresAuth: false,
            isHeader: true,
            isFooter: true,
          },
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      meta: {},
      children: [
        {
          path: 'login',
          name: 'admin-login',
          component: AdminLogin,
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: DashBoard,
          meta: {
            requiresAdmin: true,
          },
          children: [
            {
              path: 'blog/list',
              name: 'admin-blog-list',
              component: () => import('@/views/Admin/BlogList.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'policy/list',
              name: 'admin-policy-list',
              component: () => import('@/views/Admin/PolicyList.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'category/list',
              name: 'admin-category',
              component: () => import('@/views/Admin/Category/CategoryList.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'category/add',
              name: 'add-category',
              component: () => import('@/views/Admin/Category/AddCategory.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'category/add-sub-category',
              name: 'add-sub-category',
              component: () => import('@/views/Admin/Category/AddSubCategory.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'category/sub-category',
              name: 'sub-category',
              component: () => import('@/views/Admin/Category/SubCategory.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'product/new',
              name: 'new-product',
              component: () => import('@/views/Admin/Product/AddProduct.vue'),
              meta: {
                requiresAdmin: true,
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
    next({ name: 'login' })
  } else if (to.meta.requiresAdmin && (!authStore.isAuthenticated || !authStore.isAdmin)) {
    next({ name: 'admin-login' })
  } else {
    next()
  }
})

export default router
