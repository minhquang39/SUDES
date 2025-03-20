<template>
  <div class="min-h-screen bg-primaryBg flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-mainColor mb-6 text-center">Đặt lại mật khẩu</h2>

      <div v-if="isSuccess" class="text-center">
        <div class="mb-4">
          <div class="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
            <i class="fas fa-check text-green-500 text-2xl"></i>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Đặt lại mật khẩu thành công!</h3>
        <p class="text-gray-600 mb-6">Bạn có thể đăng nhập bằng mật khẩu mới.</p>
        <router-link
          to="/account/login"
          class="inline-block bg-mainColor hover:bg-hover text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Đăng nhập ngay
        </router-link>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
            >Mật khẩu mới</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mainColor focus:border-transparent"
            placeholder="Nhập mật khẩu mới"
            :disabled="isLoading"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1"
            >Xác nhận mật khẩu</label
          >
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mainColor focus:border-transparent"
            placeholder="Nhập lại mật khẩu mới"
            :disabled="isLoading"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="isLoading || !isValid"
          class="w-full bg-mainColor hover:bg-hover text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Đang xử lý...
          </span>
          <span v-else>Đặt lại mật khẩu</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import apiClient from '@/utils/axios'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const $toast = useToast()
const authStore = useAuthStore()

const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const error = ref('')
const isSuccess = ref(false)
const email = ref(authStore.pendingEmail)
const isValid = computed(() => {
  if (password.value.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return false
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Mật khẩu không khớp'
    return false
  }
  error.value = ''
  return true
})

const handleSubmit = async () => {
  if (!isValid.value) return

  try {
    isLoading.value = true
    const response = await apiClient.post('/account/reset-password', {
      email: email.value,
      newPassword: password.value,
    })
    if (response.data.success) {
      isSuccess.value = true
      $toast.success('Đặt lại mật khẩu thành công')

      // Xóa email đang chờ xử lý
      authStore.clearPendingEmail()

      // Chuyển về trang đăng nhập sau 3 giây
      setTimeout(() => {
        router.push('/account/login')
      }, 3000)
    }
  } catch (error) {
    console.error('Reset password error:', error)
    $toast.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại')
  } finally {
    isLoading.value = false
  }
}
</script>
