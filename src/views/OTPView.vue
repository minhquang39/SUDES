<template>
  <div class="bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Verify the code we sent to your email</h2>
        <p class="text-gray-600 text-sm mb-6">
          Before you can register, please enter the code we sent to your email. We have sent you a
          verification code by email at
          <span class="font-medium text-gray-900">{{ email }}</span>
        </p>
        <p class="text-gray-700 mb-8">Enter the verification code you received:</p>
      </div>

      <form @submit.prevent="handleVerifyCode" action="">
        <div class="flex justify-center space-x-3">
          <div class="flex justify-center w-12 h-12 border-b-2 border-gray-300">
            <input
              ref="input1"
              class="w-full text-center text-2xl focus:outline-none"
              type="text"
              placeholder="0"
              maxlength="1"
              v-model="num1"
              @input="handleInput($event, 1)"
              @keydown="handleKeydown($event, 1)"
            />
          </div>
          <div class="flex justify-center w-12 h-12 border-b-2 border-gray-300">
            <input
              ref="input2"
              class="w-full text-center text-2xl focus:outline-none"
              type="text"
              placeholder="0"
              maxlength="1"
              v-model="num2"
              @input="handleInput($event, 2)"
              @keydown="handleKeydown($event, 2)"
            />
          </div>
          <div class="flex justify-center w-12 h-12 border-b-2 border-gray-300">
            <input
              ref="input3"
              class="w-full text-center text-2xl focus:outline-none"
              type="text"
              placeholder="0"
              maxlength="1"
              v-model="num3"
              @input="handleInput($event, 3)"
              @keydown="handleKeydown($event, 3)"
            />
          </div>
          <div class="flex justify-center w-12 h-12 border-b-2 border-gray-300">
            <input
              ref="input4"
              class="w-full text-center text-2xl focus:outline-none"
              type="text"
              placeholder="0"
              maxlength="1"
              v-model="num4"
              @input="handleInput($event, 4)"
              @keydown="handleKeydown($event, 4)"
            />
          </div>
          <div class="flex justify-center w-12 h-12 border-b-2 border-gray-300">
            <input
              ref="input5"
              class="w-full text-center text-2xl focus:outline-none"
              type="text"
              placeholder="0"
              maxlength="1"
              v-model="num5"
              @input="handleInput($event, 5)"
              @keydown="handleKeydown($event, 5)"
            />
          </div>
          <div class="flex justify-center w-12 h-12 border-b-2 border-gray-300">
            <input
              ref="input6"
              class="w-full text-center text-2xl focus:outline-none"
              type="text"
              placeholder="0"
              maxlength="1"
              v-model="num6"
              @input="handleInput($event, 6)"
              @keydown="handleKeydown($event, 6)"
            />
          </div>
        </div>

        <div class="mt-8">
          <p class="text-sm text-gray-600">Did not receive the code? Need a new one?</p>
          <div class="flex items-center gap-2">
            <button
              @click.prevent="handleResendCode"
              :disabled="timer < 60 || isResending"
              class="text-[#6358de] text-sm font-medium hover:bg-[#4f46e5] hover:text-white rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed p-2 transition-colors flex items-center gap-2"
            >
              <svg
                v-if="isResending"
                class="animate-spin h-4 w-4 text-[#6358de]"
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
              {{ isResending ? 'Đang gửi...' : 'Gửi lại mã' }}
            </button>
            <div class="text-sm text-gray-600 bg-gray-200 rounded-2xl p-1">{{ timer }}s</div>
          </div>
        </div>

        <div class="mt-8">
          <button
            @click="handleVerifyCode"
            :disabled="
              isLoading ||
              num1.length + num2.length + num3.length + num4.length + num5.length + num6.length !==
                6
            "
            class="w-full text-white font-medium py-3 px-4 rounded-lg bg-gray-400 hover:bg-gray-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isLoading"
              class="animate-spin h-5 w-5 text-white"
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
            {{ isLoading ? 'Đang xác thực...' : 'Xác thực' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import apiClient from '@/utils/axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const authStore = useAuthStore()
const email = ref(authStore.pendingEmail)
const router = useRouter()
const isLoading = ref(false)
const isResending = ref(false)

const num1 = ref('')
const num2 = ref('')
const num3 = ref('')
const num4 = ref('')
const num5 = ref('')
const num6 = ref('')

const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
const input4 = ref(null)
const input5 = ref(null)
const input6 = ref(null)
const timer = ref(60)

// Tự động focus vào input đầu tiên khi component được mount
onMounted(async () => {
  input1.value.focus()

  if (email.value) {
    try {
      isLoading.value = true
      const response = await apiClient.post('/account/send-otp', {
        email: email.value,
      })
      if (response.data.success) {
        $toast.success('Mã xác thực đã được gửi đến email của bạn', {
          position: 'top-right',
          duration: 3000,
        })
      }
    } catch (error) {
      $toast.error('Không thể gửi mã xác thực. Vui lòng thử lại sau', {
        position: 'top-right',
        duration: 3000,
      })
    } finally {
      isLoading.value = false
    }
  }
})

const handleInput = (event, position) => {
  const value = event.target.value

  // Chỉ cho phép số
  if (!/^\d*$/.test(value)) {
    switch (position) {
      case 1:
        num1.value = ''
        break
      case 2:
        num2.value = ''
        break
      case 3:
        num3.value = ''
        break
      case 4:
        num4.value = ''
        break
      case 5:
        num5.value = ''
        break
      case 6:
        num6.value = ''
        break
    }
  } else if (value.length === 1) {
    // Nếu đã nhập đủ 1 số và chưa phải ô cuối cùng, focus vào ô tiếp theo
    if (position < 6) {
      switch (position) {
        case 1:
          input2.value.focus()
          break
        case 2:
          input3.value.focus()
          break
        case 3:
          input4.value.focus()
          break
        case 4:
          input5.value.focus()
          break
        case 5:
          input6.value.focus()
          break
      }
    }
  }
}

const handleKeydown = (event, position) => {
  // Xử lý khi nhấn Backspace
  if (event.key === 'Backspace' && !event.target.value && position > 1) {
    event.preventDefault()
    switch (position) {
      case 2:
        input1.value.focus()
        break
      case 3:
        input2.value.focus()
        break
      case 4:
        input3.value.focus()
        break
      case 5:
        input4.value.focus()
        break
      case 6:
        input5.value.focus()
        break
    }
  }
}

const handleResendCode = async () => {
  try {
    isResending.value = true
    const response = await apiClient.post('/account/resend-otp', {
      email: email.value,
    })
    if (response.data.success) {
      $toast.success('Mã xác thực mới đã được gửi', {
        position: 'top-right',
        duration: 3000,
      })
      timer.value = 60
      const timerInterval = setInterval(() => {
        timer.value--
        if (timer.value <= 0) {
          clearInterval(timerInterval)
          timer.value = 60
        }
      }, 1000)
    }
  } catch (error) {
    $toast.error('Không thể gửi lại mã xác thực. Vui lòng thử lại sau', {
      position: 'top-right',
      duration: 3000,
    })
  } finally {
    isResending.value = false
  }
}

const handleVerifyCode = async () => {
  const otp = `${num1.value}${num2.value}${num3.value}${num4.value}${num5.value}${num6.value}`

  if (otp.length !== 6) {
    $toast.error('Vui lòng nhập đầy đủ mã xác thực', {
      position: 'top-right',
      duration: 3000,
    })
    return
  }

  try {
    isLoading.value = true
    const response = await apiClient.post('/account/verify-otp', {
      email: email.value,
      otp: otp,
    })

    if (response.data.success) {
      $toast.success('Xác thực email thành công', {
        position: 'top-right',
        duration: 3000,
      })

      // Delay 2s trước khi chuyển hướng
      await new Promise((resolve) => setTimeout(resolve, 2000))

      authStore.clearPendingEmail()
      router.push('/account/login')
    }
  } catch (error) {
    if (error.response?.data?.code === 1003) {
      $toast.error('Mã xác thực không chính xác', {
        position: 'top-right',
        duration: 3000,
      })
    } else {
      $toast.error('Xác thực thất bại. Vui lòng thử lại', {
        position: 'top-right',
        duration: 3000,
      })
    }
  } finally {
    isLoading.value = false
  }
}

// Thêm watch để tự động verify khi đủ 6 số
watch([num1, num2, num3, num4, num5, num6], ([n1, n2, n3, n4, n5, n6]) => {
  const otp = `${n1}${n2}${n3}${n4}${n5}${n6}`
  if (otp.length === 6) {
    handleVerifyCode()
  }
})
</script>
