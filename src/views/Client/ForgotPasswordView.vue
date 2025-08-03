<template>
  <div class="min-h-screen bg-primaryBg flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-mainColor mb-6 text-center">Quên mật khẩu</h2>

      <div v-if="isSuccess" class="text-center">
        <div class="mb-4">
          <div class="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <i class="fas fa-envelope text-green-500 text-2xl"></i>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Kiểm tra email của bạn</h3>
        <p class="text-gray-600 mb-4">
          Chúng tôi đã gửi một OTP đặt lại mật khẩu đến địa chỉ {{ email }}.
        </p>
        <p class="text-sm text-gray-500 mb-6">
          Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam hoặc thử lại.
        </p>
        <router-link
          to="/account/login"
          class="text-mainColor hover:text-hover transition duration-300"
        >
          Quay lại đăng nhập
        </router-link>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mainColor focus:border-transparent"
            placeholder="Nhập email của bạn"
            :disabled="isLoading"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-mainColor hover:bg-hover text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Đang gửi...
          </span>
          <span v-else>Gửi OTP đặt lại mật khẩu</span>
        </button>

        <div class="text-center mt-4">
          <router-link
            to="/account/login"
            class="text-mainColor hover:text-hover transition duration-300"
          >
            Quay lại đăng nhập
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '@/stores/auth'
import apiClient from '@/utils/axios'

const router = useRouter()
const $toast = useToast()
const authStore = useAuthStore()
const email = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)

const handleSubmit = async () => {
  try {
    isLoading.value = true
    authStore.setPendingEmail(email.value)
    await apiClient.post('/account/forgot-password', {
      email: email.value,
    })
    isSuccess.value = true
    setTimeout(() => {
      router.push('/account/verify?type=reset-password')
    }, 3000)
  } catch (error) {
    console.error('Forgot password error:', error)
    $toast.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại', {
      position: 'top-right',
      duration: 1000,
    })
  } finally {
    isLoading.value = false
  }
}
</script>
