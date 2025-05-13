<template>
  <div class="min-h-screen flex items-center justify-center bg-amber-50">
    <!-- Logo và tiêu đề -->
    <div class="flex flex-col items-center">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="flex justify-center">
          <div class="bg-amber-200 rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-dark-green"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 15a4 4 0 0 0 3.4 0"></path>
            </svg>
          </div>
        </div>

        <!-- Tiêu đề -->
        <div class="text-center mb-4">
          <h1 class="text-3xl font-bold text-dark-green font-roboto">Sudes Nest</h1>
          <p class="text-amber-800">Admin Portal</p>
        </div>

        <!-- Form đăng nhập -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Header -->
          <div class="bg-[#004337] text-white p-4">
            <h2 class="text-2xl font-bold text-center">Admin Login</h2>
            <p class="text-center text-green-100 mt-1">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          <!-- Form -->
          <div class="p-5">
            <!-- Username -->
            <div class="mb-2">
              <label for="username" class="block text-dark-green mb-2">Email</label>
              <div class="relative">
                <input
                  id="email"
                  type="text"
                  class="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-dark-green"
                  placeholder="Enter your email"
                  v-model="email"
                />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Password -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <label for="password" class="block text-dark-green">Password</label>
              </div>
              <div class="relative">
                <input
                  id="password"
                  v-model="password"
                  class="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-dark-green"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <button
                  type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    @click="showPassword = !showPassword"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Sign In Button -->
            <button
              @click="handleSignin"
              class="w-full bg-amber-300 hover:bg-amber-400 text-dark-green font-bold py-3 px-4 rounded-md transition duration-200"
            >
              Sign In
            </button>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 p-4 text-center text-gray-600 text-sm">
            Need support? <a href="#" class="text-dark-green hover:underline">Contact IT team</a>
          </div>
        </div>

        <!-- Copyright -->
        <div class="text-center mt-6 text-gray-600 text-sm">
          Bird's Nest Admin Portal © {{ new Date().getFullYear() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/utils/axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const $toast = useToast()
const router = useRouter()
const handleSignin = async () => {
  try {
    const response = await apiClient.post('/admin/login', {
      email: email.value,
      password: password.value,
    })
    console.log(response.data.data)
    authStore.setUser(response.data.data.user)
    authStore.setToken(response.data.data.token)
    $toast.success('Đăng nhập thành công', {
      position: 'top-right',
      duration: 1000,
    })
    console.log('Chuyển hướng đến trang loading...')

    // Thêm một khoảng thời gian trước khi chuyển hướng
    setTimeout(() => {
      router.push('/admin/loading')
    }, 500)
  } catch (error) {
    $toast.error('Đăng nhập thất bại', {
      position: 'top-right',
      duration: 1000,
    })
  }
}
</script>
