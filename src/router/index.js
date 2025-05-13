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
import ThankYouView from '@/views/Client/ThankYou.vue'
import AdminLogin from '@/views/Admin/AdminLogin.vue'
import DashBoard from '@/views/Admin/DashBoard.vue'
import AdminLoadingScreen from '@/views/Admin/AdminLoadingScreen.vue'

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
          path: '/search',
          name: 'search',
          component: () => import('@/views/Client/SearchDetail.vue'),
          meta: {
            isHeader: true,
            isFooter: true,
          },
        },
        {
          path: '/danh-muc/:slug',
          name: 'category-detail',
          component: () => import('@/views/Client/CategoryDetail.vue'),
          meta: {
            isHeader: true,
            isFooter: true,
          },
        },
        {
          path: '/collection/all',
          name: 'all-product',
          component: () => import('@/views/Client/AllProduct.vue'),
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
          path: '/order/:id',
          name: 'order-detail',
          component: () => import('@/views/Client/OrderDetail.vue'),
          meta: {
            requiresAuth: true,
            isHeader: true,
            isFooter: true,
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
        {
          path: '/cart',
          name: 'cart',
          component: () => import('@/views/Client/Cart.vue'),
          meta: {
            requiresAuth: false,
            isHeader: true,
            isFooter: true,
          },
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('@/views/Client/CheckOut.vue'),
          meta: {
            requiresAuth: true,
            isHeader: false,
            isFooter: false,
          },
        },
        {
          path: '/thank-you',
          name: 'thank-you',
          component: () => import('@/views/Client/ThankYou.vue'),
          meta: {
            requiresAuth: true,
            isHeader: false,
            isFooter: false,
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
          path: 'loading',
          name: 'admin-loading',
          component: AdminLoadingScreen,
          meta: {
            requiresAdmin: false,
          },
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
              path: 'home',
              name: 'admin-home',
              component: () => import('@/views/Admin/Home.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
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
              component: () => import('@/views/Admin/Product/ProductForm.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'product/edit/:id',
              component: () => import('@/views/Admin/Product/ProductForm.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'products',
              name: 'product-list',
              component: () => import('@/views/Admin/Product/ProductList.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'users',
              name: 'user-list',
              component: () => import('@/views/Admin/User/User.vue'),
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: 'orders',
              name: 'order-list',
              component: () => import('@/views/Admin/OrderList.vue'),
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
  console.log('Điều hướng đến:', to.path)
  const authStore = useAuthStore()

  // Đặc biệt xử lý cho trang loading
  if (to.name === 'admin-loading') {
    console.log('Cho phép truy cập trang loading')
    return next()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Yêu cầu đăng nhập, chuyển hướng đến trang login')
    next({ name: 'login' })
  } else if (to.meta.requiresAdmin && (!authStore.isAuthenticated || !authStore.isAdmin)) {
    console.log('Yêu cầu quyền admin, chuyển hướng đến trang admin-login')
    next({ name: 'admin-login' })
  } else {
    console.log('Cho phép điều hướng đến:', to.path)
    next()
  }
})

export default router
