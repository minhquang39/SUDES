<template>
  <div class="bg-primaryBg">
    <div class="px-[14px] md:px-[45px]">
      <div class="flex py-[10px] font-medium leading-[24px]">
        <span>Trang chủ</span>
        <span>></span>
        <span>Đăng nhập tài khoản</span>
      </div>
      <div class="grid grid-cols-12 pt-[25px] pb-[80px]">
        <div class="hidden md:block md:col-span-4"></div>
        <div class="col-span-12 md:block md:col-span-4 bg-white px-[15px] py-[20px]">
          <div class="">
            <h1 class="text-center font-medium text-2xl uppercase mb-[20px]">Đăng nhập</h1>

            <div class="text-red-500 text-center" v-if="error">{{ error }}</div>

            <form @submit.prevent="" action="">
              <div class="mb-[15px]">
                <input
                  type="email"
                  placeholder="Email"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none"
                  v-model="email"
                />
              </div>
              <div class="mb-[15px]">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none"
                  v-model="password"
                />
              </div>

              <div class="bg-mainColor p-1">
                <button
                  @click="handleLogin"
                  type="submit"
                  class="text-center font-bold text-white border border-white p-1 w-full flex items-center justify-center"
                >
                  <svg
                    v-if="isLoading"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ isLoading ? 'Đang chờ...' : 'Đăng nhập' }}
                </button>
              </div>
            </form>

            <div class="flex justify-between my-[15px]">
              <span class="text-sm hover:text-hover cursor-pointer">Quên mật khẩu?</span>
              <router-link to="/account/register" class="text-sm hover:text-hover cursor-pointer"
                >Đăng ký</router-link
              >
            </div>
            <p class="text-center text-sm">Hoặc đăng nhập bằng</p>
            <div class="flex justify-center gap-3 my-7">
              <img
                src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                width="129"
                height="37"
                alt=""
              />
              <img
                src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                width="129"
                height="37"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hidden md:block md:col-span-4"></div>
      </div>
    </div>
  </div>
  <!-- Toast  -->
</template>

<script setup>
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import apiClient from '@/utils/axios'
const $toast = useToast()
const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Vui lòng nhập email và mật khẩu'
    return
  }

  error.value = ''
  isLoading.value = true

  try {
    const response = await apiClient.post('/account/login', {
      email: email.value,
      password: password.value,
    })

    console.log('Login response:', response) // Debug log

    // Kiểm tra response có tồn tại không
    if (!response) {
      $toast.error('Không nhận được phản hồi từ server')
      return
    }

    // Xử lý response thành công
    if (response.data.success) {
      console.log('Login success data:', response.data) // Debug log

      // Kiểm tra token và user có tồn tại không
      if (!response.data.data.token || !response.data.data.user) {
        console.error('Missing token or user data:', response.data) // Debug log
        $toast.error('Thông tin xác thực không đầy đủ')
        return
      }

      try {
        // Lưu vào store và localStorage
        authStore.login(response.data.data.token, response.data.data.user)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data.user))

        console.log('Auth store after login:', authStore) // Debug log

        $toast.success('Đăng nhập thành công', {
          position: 'top-right',
          duration: 1000,
        })

        setTimeout(() => {
          router.push('/')
        }, 1000)
      } catch (error) {
        console.error('Error saving auth data:', error) // Debug log
        $toast.error('Có lỗi xảy ra khi lưu thông tin đăng nhập')
      }
    } else {
      // Xử lý response không thành công từ server
      console.error('Login failed:', response.data) // Debug log
      $toast.error(response.data.message || 'Đăng nhập thất bại')
    }
  } catch (err) {
    console.error('Login error:', err) // Debug log
    // Xử lý lỗi từ Axios
    if (err.response) {
      // Server trả về lỗi với status code
      const { data } = err.response

      // Xử lý các mã lỗi cụ thể
      switch (data.code) {
        case 1004:
          $toast.error('Mật khẩu không chính xác')
          break
        case 1006:
          $toast.error('Tài khoản không tồn tại')
          break
        case 1002:
          $toast.warning('Vui lòng xác thực email trước khi đăng nhập', {
            position: 'top-right',
            duration: 3000,
          })

          // Delay 2s trước khi chuyển hướng
          await new Promise((resolve) => setTimeout(resolve, 2000))
          // Lưu email vào store thay vì query
          authStore.setPendingEmail(email.value)
          router.push('/account/verify')
          break
        default:
          $toast.error(data.message || 'Đăng nhập thất bại')
      }
    } else if (err.request) {
      // Không nhận được response từ server
      $toast.error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet')
    } else {
      // Lỗi khi tạo request
      $toast.error('Có lỗi xảy ra khi gửi yêu cầu')
    }
  } finally {
    isLoading.value = false
  }
}
</script>
