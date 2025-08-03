<template>
  <div class="slider-skeleton">
    <!-- Main skeleton container with similar dimensions to the actual slider -->
    <div class="skeleton-image-container">
      <div class="shimmer-bg"></div>

      <!-- Skeleton for pagination dots -->
      <div class="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        <div
          v-for="i in 3"
          :key="i"
          class="w-2.5 h-2.5 bg-gray-300 transform rotate-45 shimmer-item"
        ></div>
      </div>

      <!-- Skeleton for navigation arrows -->
      <div
        class="nav-arrow nav-arrow-left absolute top-1/2 left-5 transform -translate-y-1/2 rotate-45 w-6 h-6 bg-gray-300 flex items-center justify-center shimmer-item"
      >
        <div class="w-2.5 h-2.5 border-2 border-gray-400"></div>
      </div>
      <div
        class="nav-arrow nav-arrow-right absolute top-1/2 right-5 transform -translate-y-1/2 rotate-45 w-6 h-6 bg-gray-300 flex items-center justify-center shimmer-item"
      >
        <div class="w-2.5 h-2.5 border-2 border-gray-400"></div>
      </div>

      <!-- Skeleton for progress bar -->
      <div class="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
        <div class="h-full w-1/3 bg-gray-400 shimmer-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderSkeleton',
}
</script>

<style scoped>
.slider-skeleton {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.skeleton-image-container {
  position: relative;
  width: 100%;
  padding-top: 40%; /* Aspect ratio similar to your slider */
  background-color: #f0f0f0;
  overflow: hidden;
}

.shimmer-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 2s infinite;
  background-size: 200% 100%;
}

.shimmer-item {
  position: relative;
  overflow: hidden;
}

.shimmer-item::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media screen and (max-width: 640px) {
  .nav-arrow {
    display: none;
  }
}
</style>
