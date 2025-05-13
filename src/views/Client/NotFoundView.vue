<template>
  <div class="min-h-screen bg-primaryBg flex items-center justify-center px-4">
    <div class="max-w-2xl w-full text-center space-y-8">
      <!-- 404 Illustration -->
      <div class="relative">
        <svg
          class="w-64 h-64 mx-auto animate-pulse-custom"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Bird's Nest -->
          <path
            d="M100 40 C 60 40, 40 60, 40 100 C 40 140, 60 160, 100 160 C 140 160, 160 140, 160 100 C 160 60, 140 40, 100 40"
            fill="#053024"
            fill-opacity="0.1"
          />
          <path
            d="M100 50 C 70 50, 50 70, 50 100 C 50 130, 70 150, 100 150 C 130 150, 150 130, 150 100 C 150 70, 130 50, 100 50"
            fill="#053024"
            fill-opacity="0.2"
          />
          <path
            d="M100 60 C 80 60, 60 80, 60 100 C 60 120, 80 140, 100 140 C 120 140, 140 120, 140 100 C 140 80, 120 60, 100 60"
            fill="#053024"
            fill-opacity="0.3"
          />

          <!-- Eggs -->
          <circle cx="85" cy="100" r="8" fill="#fdc97d" />
          <circle cx="115" cy="100" r="8" fill="#fdc97d" />

          <!-- Bird -->
          <path
            d="M100 30 C 90 30, 85 35, 85 40 C 85 45, 90 50, 100 50 C 110 50, 115 45, 115 40 C 115 35, 110 30, 100 30"
            fill="#053024"
          />
          <circle cx="100" cy="35" r="3" fill="#fdc97d" />
          <path d="M95 35 L 90 30" stroke="#053024" stroke-width="2" fill="none" />
        </svg>
        <div class="absolute inset-0 bg-subColor/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Content -->
      <div class="space-y-4">
        <h1 class="text-6xl font-roboto text-mainColor font-bold">404</h1>
        <h2 class="text-2xl font-roboto text-textColor">Oops! Trang không tồn tại</h2>
        <p class="text-gray-600 max-w-md mx-auto">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="relative z-10 flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <router-link
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-mainColor hover:bg-hover transition-colors duration-200 btn-scale"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          Về trang chủ
        </router-link>

        <button
          @click="$router.back()"
          class="inline-flex items-center justify-center px-6 py-3 border border-mainColor rounded-md shadow-sm text-base font-medium text-mainColor bg-white hover:bg-mainColor hover:text-white transition-colors duration-200 btn-scale"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Quay lại
        </button>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute bottom-0 left-0 w-full z-0 overflow-hidden">
        <svg
          class="relative block w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#053024"
            fill-opacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Thêm class để kích hoạt animation
  document.body.classList.add('page-enter-active')
})
</script>

<style scoped>
.animate-pulse-custom {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.btn-scale:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
