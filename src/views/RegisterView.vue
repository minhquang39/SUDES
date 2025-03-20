<template>
  <div class="bg-primaryBg">
    <div class="px-[14px] md:px-[45px]">
      <div class="flex py-[10px] font-medium leading-[24px]">
        <span>Trang chủ</span>
        <span>></span>
        <span>Đăng nhập tài khoản</span>
      </div>
      <div class="grid grid-cols-12 pt-[25px] pb-[40px]">
        <div class="hidden md:block md:col-span-4"></div>
        <div class="col-span-12 md:block md:col-span-4 bg-white px-[15px] py-[20px]">
          <div class="">
            <h1 class="text-center font-medium text-2xl uppercase mb-[20px]">Đăng ký</h1>

            <form @submit.prevent="handleRegister" class="space-y-4">
              <!-- Thông báo lỗi -->
              <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded-md text-center text-sm">
                {{ error }}
              </div>

              <!-- Form fields -->
              <div class="grid grid-cols-2 gap-4">
                <div class="mb-2">
                  <label for="firstName" class="block text-sm font-medium text-gray-600 mb-1"
                    >Họ</label
                  >
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Nhập họ"
                    class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none focus:border-mainColor"
                    v-model="firstName"
                  />
                </div>

                <div class="mb-2">
                  <label for="lastName" class="block text-sm font-medium text-gray-600 mb-1"
                    >Tên</label
                  >
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Nhập tên"
                    class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none focus:border-mainColor"
                    v-model="lastName"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="mb-2">
                <label for="email" class="block text-sm font-medium text-gray-600 mb-1"
                  >Email</label
                >
                <input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none focus:border-mainColor"
                  v-model="email"
                />
              </div>

              <!-- Phone -->
              <div class="mb-2">
                <label for="phone" class="block text-sm font-medium text-gray-600 mb-1"
                  >Số điện thoại</label
                >
                <input
                  id="phone"
                  type="tel"
                  placeholder="0912345678"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none focus:border-mainColor"
                  v-model="phone"
                />
              </div>

              <!-- Password -->
              <div class="mb-2">
                <label for="password" class="block text-sm font-medium text-gray-600 mb-1"
                  >Mật khẩu</label
                >
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full border border-[#e1e1e1] text-[#333] px-[20px] h-[45px] text-sm outline-none focus:border-mainColor"
                  v-model="password"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
                </p>
              </div>

              <!-- Submit button -->
              <div class="mt-6">
                <button
                  type="submit"
                  class="w-full bg-mainColor text-white font-bold py-3 rounded hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                  :disabled="isLoading"
                >
                  <span>Đăng ký</span>
                  <div
                    v-if="isLoading"
                    class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  ></div>
                </button>
              </div>

              <!-- Đã có tài khoản -->
              <div class="text-center mt-4">
                <p class="text-sm text-gray-600">
                  Đã có tài khoản?
                  <router-link to="/account/login" class="text-mainColor hover:underline"
                    >Đăng nhập</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
        <div class="hidden md:block md:col-span-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import apiClient from '@/utils/axios'
const router = useRouter()
const authStore = useAuthStore()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

// Validate email bằng regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate số điện thoại Việt Nam (10 số, bắt đầu bằng 0)
function isValidPhone(phone) {
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/
  return phoneRegex.test(phone)
}

// Validate password (ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số)
function isValidPassword(password) {
  // Ít nhất 8 ký tự, có chữ hoa, chữ thường và số
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return passwordRegex.test(password)
}

// Xử lý validate từng trường dữ liệu riêng biệt
function validateForm() {
  // Reset error
  error.value = ''

  // Kiểm tra các trường bắt buộc
  if (
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !email.value.trim() ||
    !phone.value.trim() ||
    !password.value.trim()
  ) {
    error.value = 'Vui lòng nhập đầy đủ thông tin'
    return false
  }

  // Validate email
  if (!isValidEmail(email.value)) {
    error.value = 'Email không hợp lệ'
    return false
  }

  // Validate số điện thoại
  if (!isValidPhone(phone.value)) {
    error.value =
      'Số điện thoại không hợp lệ (phải có 10 chữ số và bắt đầu bằng 03, 05, 07, 08, 09)'
    return false
  }

  // Validate password
  if (!isValidPassword(password.value)) {
    error.value = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
    return false
  }

  // Nếu tất cả đều hợp lệ
  return true
}

const handleRegister = async () => {
  // Validate form trước
  if (!validateForm()) {
    return // Dừng lại nếu form không hợp lệ
  }

  try {
    isLoading.value = true
    error.value = ''

    // Gọi API đăng ký
    const response = await apiClient.post('/account/register', {
      first_name: firstName.value.trim(),
      last_name: lastName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      password: password.value,
    })

    if (response.data.success) {
      // Lưu email vào store để sử dụng ở trang verify
      authStore.setPendingEmail(email.value)

      // Hiển thị thông báo thành công
      $toast.success('Đăng ký thành công! Vui lòng xác thực email của bạn.', {
        position: 'top-right',
        duration: 3000,
      })

      // Delay 2s trước khi chuyển hướng
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push('/account/verify')
    } else {
      error.value = response.data.message || 'Đăng ký không thành công'
    }
  } catch (err) {
    console.error('Register error:', err)
    if (err.response) {
      const { data } = err.response
      switch (data.code) {
        case 1001:
          error.value = 'Email đã được sử dụng'
          break
        case 1003:
          error.value = 'Số điện thoại đã được sử dụng'
          break
        default:
          error.value = data.message || 'Có lỗi xảy ra khi đăng ký'
      }
    } else if (err.request) {
      error.value = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet'
    } else {
      error.value = 'Có lỗi xảy ra khi gửi yêu cầu'
    }
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = async () => {
  try {
    // TODO: Implement Google OAuth login
    $toast.info('Tính năng đăng nhập bằng Google đang được phát triển')
  } catch (error) {
    console.error('Google login error:', error)
    $toast.error('Có lỗi xảy ra khi đăng nhập bằng Google')
  }
}
</script>
