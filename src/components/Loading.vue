<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="spinner">
        <svg class="spinner-svg" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
        </svg>
      </div>
      <h2 class="loading-text">{{ message }}</h2>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  message: {
    type: String,
    default: 'Đang tải...',
  },
})
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner {
  width: 60px;
  height: 60px;
}

.spinner-svg {
  animation: rotate 2s linear infinite;
  transform-origin: center center;
}

.path {
  stroke: #0277bd;
  stroke-dasharray: 89, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
}

.loading-text {
  color: #0277bd;
  font-size: 1.5rem;
  font-weight: 500;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
