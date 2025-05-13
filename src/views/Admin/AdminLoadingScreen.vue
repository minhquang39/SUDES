<template>
  <div class="min-h-screen bg-primaryBg flex items-center justify-center px-4">
    <div class="max-w-2xl w-full text-center space-y-8">
      <div class="relative">
        <svg class="w-64 h-64 mx-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Nest -->
          <path
            d="M100 40 C 60 40, 40 60, 40 100 C 40 140, 60 160, 100 160 C 140 160, 160 140, 160 100 C 160 60, 140 40, 100 40"
            fill="#0277bd"
            fill-opacity="0.1"
          />
          <path
            d="M100 50 C 70 50, 50 70, 50 100 C 50 130, 70 150, 100 150 C 130 150, 150 130, 150 100 C 150 70, 130 50, 100 50"
            fill="#0277bd"
            fill-opacity="0.2"
          />
          <path
            d="M100 60 C 80 60, 60 80, 60 100 C 60 120, 80 140, 100 140 C 120 140, 140 120, 140 100 C 140 80, 120 60, 100 60"
            fill="#0277bd"
            fill-opacity="0.3"
          />

          <!-- Bird -->
          <g class="bird">
            <path
              d="M100 30 C 90 30, 85 35, 85 40 C 85 45, 90 50, 100 50 C 110 50, 115 45, 115 40 C 115 35, 110 30, 100 30"
              fill="#0277bd"
            />
            <circle cx="95" cy="35" r="2" fill="white" />
            <path d="M90 40 L 85 35" stroke="#0277bd" stroke-width="2" fill="none" />
            <path d="M110 40 L 115 35" stroke="#0277bd" stroke-width="2" fill="none" />
            <!-- Wings -->
            <path
              class="wing left-wing"
              d="M90 45 C 80 40, 75 50, 85 55"
              stroke="#0277bd"
              stroke-width="2"
              fill="none"
            />
            <path
              class="wing right-wing"
              d="M110 45 C 120 40, 125 50, 115 55"
              stroke="#0277bd"
              stroke-width="2"
              fill="none"
            />
          </g>

          <!-- Butterflies -->
          <g class="butterfly butterfly-1">
            <path
              d="M40 60 C 35 55, 30 55, 30 60 C 30 65, 35 65, 40 60"
              fill="#38bdf8"
              fill-opacity="0.7"
            />
            <path
              d="M40 60 C 45 55, 50 55, 50 60 C 50 65, 45 65, 40 60"
              fill="#38bdf8"
              fill-opacity="0.7"
            />
            <path d="M40 60 L 40 65" stroke="#38bdf8" stroke-width="1" />
          </g>

          <g class="butterfly butterfly-2">
            <path
              d="M160 80 C 155 75, 150 75, 150 80 C 150 85, 155 85, 160 80"
              fill="#38bdf8"
              fill-opacity="0.7"
            />
            <path
              d="M160 80 C 165 75, 170 75, 170 80 C 170 85, 165 85, 160 80"
              fill="#38bdf8"
              fill-opacity="0.7"
            />
            <path d="M160 80 L 160 85" stroke="#38bdf8" stroke-width="1" />
          </g>

          <g class="butterfly butterfly-3">
            <path
              d="M70 130 C 65 125, 60 125, 60 130 C 60 135, 65 135, 70 130"
              fill="#38bdf8"
              fill-opacity="0.7"
            />
            <path
              d="M70 130 C 75 125, 80 125, 80 130 C 80 135, 75 135, 70 130"
              fill="#38bdf8"
              fill-opacity="0.7"
            />
            <path d="M70 130 L 70 135" stroke="#38bdf8" stroke-width="1" />
          </g>
        </svg>
        <div class="absolute inset-0 bg-subColor/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Content -->
      <div class="space-y-4">
        <h1 class="text-4xl font-roboto text-mainColor font-bold">Chào mừng trở lại!</h1>
        <h2 class="text-2xl font-roboto text-textColor">{{ userName }}</h2>
        <p class="text-gray-600 max-w-md mx-auto">
          {{ loadingMessage }}
        </p>
      </div>

      <!-- Progress Bar -->
      <div class="relative z-10 pt-4 w-full max-w-md mx-auto">
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="progress-bar h-full bg-mainColor rounded-full"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const progress = ref(0)
const loadingMessages = [
  'Đang tải dữ liệu...',
  'Đang chuẩn bị dashboard...',
  'Sẵn sàng để bắt đầu...',
]
const currentMessageIndex = ref(0)
const loadingMessage = computed(() => loadingMessages[currentMessageIndex.value])

// Lấy tên người dùng từ auth store
const userName = computed(() => {
  if (authStore.user && authStore.user.name) {
    return authStore.user.name
  }
  return 'Admin'
})

onMounted(() => {
  console.log('AdminLoadingScreen đã được mount')

  // Cập nhật thanh tiến trình chậm hơn
  const interval = setInterval(() => {
    progress.value += 1 // Giảm từ 2 xuống 1 để tăng thời gian hiển thị
    console.log('Progress:', progress.value)

    // Thay đổi thông báo khi đạt đến các mốc tiến độ
    if (progress.value >= 30 && currentMessageIndex.value === 0) {
      currentMessageIndex.value = 1
      console.log('Thay đổi thông báo:', loadingMessage.value)
    } else if (progress.value >= 70 && currentMessageIndex.value === 1) {
      currentMessageIndex.value = 2
      console.log('Thay đổi thông báo:', loadingMessage.value)
    }

    // Khi hoàn thành, chuyển hướng đến dashboard
    if (progress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        console.log('Chuyển hướng từ loading đến dashboard')
        router.push('/admin/dashboard/home')
      }, 500)
    }
  }, 50) // Tăng từ 30 lên 50ms để làm chậm tiến trình
})
</script>

<style scoped>
.bird {
  animation: float 3s ease-in-out infinite;
}

.wing {
  animation: flap 1s ease-in-out infinite alternate;
}

.butterfly-1 {
  animation: flutter1 8s ease-in-out infinite;
}

.butterfly-2 {
  animation: flutter2 10s ease-in-out infinite;
}

.butterfly-3 {
  animation: flutter3 7s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes flap {
  0% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.8);
  }
}

@keyframes flutter1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(20px, 0);
  }
  75% {
    transform: translate(10px, 10px);
  }
}

@keyframes flutter2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-15px, 10px);
  }
  50% {
    transform: translate(-5px, 20px);
  }
  75% {
    transform: translate(-10px, 5px);
  }
}

@keyframes flutter3 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(5px, -15px);
  }
  50% {
    transform: translate(15px, -5px);
  }
  75% {
    transform: translate(5px, -10px);
  }
}

.progress-bar {
  transition: width 0.3s ease;
}

/* Utility classes for custom colors */
.bg-mainColor {
  background-color: #0277bd; /* cyan-blue-600 */
}

.bg-subColor {
  background-color: #38bdf8; /* sky-400 */
}

.text-subColor {
  color: #bae6fd; /* sky-200 */
}

.text-textColor {
  color: #0277bd; /* cyan-blue-600 */
}

.text-mainColor {
  color: #0277bd; /* cyan-blue-600 */
}

.bg-primaryBg {
  background-color: #f8fafc;
  background-image:
    radial-gradient(at 10% 10%, rgba(2, 119, 189, 0.1) 0px, transparent 50%),
    radial-gradient(at 90% 90%, rgba(2, 119, 189, 0.1) 0px, transparent 50%);
}
</style>
