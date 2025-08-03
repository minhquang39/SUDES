<template>
  <div class="bg-primaryBg px-[14px] lg:px-11 xl:px-30 py-6">
    <!-- Cover image skeleton -->
    <div class="w-full h-[150px] md:h-[200px] bg-gray-200 shimmer-bg"></div>

    <!-- Category title skeleton -->
    <div class="text-center mt-4">
      <div class="h-8 w-48 bg-gray-200 mx-auto shimmer-item"></div>
      <div class="my-5 flex justify-center">
        <!-- Two square separator skeleton -->
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-gray-300 rotate-45 shimmer-item"></div>
          <div class="w-4 h-4 bg-gray-300 rotate-45 shimmer-item"></div>
        </div>
      </div>
    </div>

    <!-- Subcategories skeleton -->
    <div
      class="flex md:flex-wrap gap-4 md:justify-center text-center overflow-x-auto scroll-smooth"
    >
      <div
        v-for="i in 5"
        :key="i"
        class="h-8 w-[90px] md:w-[120px] bg-gray-200 shimmer-item flex-shrink-0"
      ></div>
    </div>

    <!-- Description skeleton -->
    <div class="text-center mt-4">
      <div class="h-4 w-full bg-gray-200 mb-2 shimmer-item"></div>
      <div class="h-4 w-5/6 mx-auto bg-gray-200 mb-2 shimmer-item"></div>
      <div class="h-4 w-4/5 mx-auto bg-gray-200 shimmer-item"></div>
    </div>

    <!-- Sort options skeleton -->
    <div class="hidden md:flex justify-end items-center gap-2 py-2 border-b-2 border-[#053024]">
      <div class="h-6 w-24 bg-gray-200 shimmer-item"></div>
      <div class="flex gap-2">
        <div v-for="i in 5" :key="i" class="h-6 w-20 bg-gray-200 shimmer-item"></div>
      </div>
    </div>

    <!-- Mobile sort button skeleton -->
    <div class="flex md:hidden justify-end py-2 mb-2">
      <div class="h-10 w-28 bg-gray-200 shimmer-item"></div>
    </div>

    <!-- Products grid skeleton -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
      <div v-for="i in 8" :key="i" class="product-skeleton">
        <!-- Product image skeleton -->
        <div class="aspect-square bg-gray-200 mb-2 shimmer-bg"></div>

        <!-- Product name skeleton -->
        <div class="h-5 w-3/4 bg-gray-200 mb-2 shimmer-item"></div>

        <!-- Product price skeleton -->
        <div class="flex items-center gap-2">
          <div class="h-6 w-20 bg-gray-200 shimmer-item"></div>
          <div class="h-4 w-16 bg-gray-200 shimmer-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryDetailSkeleton',
}
</script>

<style scoped>
.shimmer-bg {
  position: relative;
  overflow: hidden;
}

.shimmer-bg::after {
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

.product-skeleton {
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (max-width: 767px) {
  .shimmer-item,
  .shimmer-bg {
    animation-duration: 1.5s;
  }
}
</style>
