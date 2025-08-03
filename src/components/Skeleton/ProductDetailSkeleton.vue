<template>
  <div class="bg-primaryBg py-2">
    <div class="lg:px-11 xl:px-30">
      <!-- Upper section: Product Images and Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white px-[14px] md:p-6">
        <!-- Product Images Skeleton -->
        <div class="flex flex-col md:flex-row-reverse">
          <!-- Main gallery skeleton -->
          <div class="w-full h-[300px] md:h-[500px] bg-gray-200 shimmer-bg"></div>

          <!-- Thumbnails skeleton -->
          <div
            class="relative mt-4 md:mt-0 md:mr-4 md:w-1/5 flex md:flex-col gap-2 overflow-hidden"
          >
            <div
              v-for="i in 4"
              :key="i"
              class="w-1/4 md:w-full h-[70px] md:h-[115px] bg-gray-300 shimmer-item"
            ></div>
          </div>
        </div>

        <!-- Product Info Skeleton -->
        <div>
          <!-- Product title -->
          <div class="h-8 w-3/4 bg-gray-200 mb-4 shimmer-item"></div>

          <!-- Product Status -->
          <div class="mb-4">
            <div class="h-5 w-1/2 bg-gray-200 mb-2 shimmer-item"></div>
            <div class="h-5 w-3/4 bg-gray-200 shimmer-item"></div>
          </div>

          <!-- Short description -->
          <div class="mb-6 p-4 border border-red-100 bg-red-50">
            <div class="h-4 w-full bg-gray-200 mb-2 shimmer-item"></div>
            <div class="h-4 w-5/6 bg-gray-200 mb-2 shimmer-item"></div>
            <div class="h-4 w-4/5 bg-gray-200 shimmer-item"></div>
          </div>

          <!-- Price -->
          <div class="pb-5">
            <div class="flex items-center gap-2">
              <div class="h-6 w-24 bg-gray-200 shimmer-item"></div>
              <div class="h-5 w-20 bg-gray-200 shimmer-item"></div>
              <div class="h-5 w-10 bg-gray-200 shimmer-item"></div>
            </div>

            <!-- Variants -->
            <div class="mt-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="h-5 w-20 bg-gray-200 shimmer-item"></div>
                <div class="h-5 w-16 bg-gray-200 shimmer-item"></div>
              </div>
              <div class="flex flex-wrap gap-2">
                <div v-for="i in 3" :key="i" class="h-8 w-16 bg-gray-200 shimmer-item"></div>
              </div>
            </div>
          </div>

          <!-- Quantity and buttons -->
          <div class="flex gap-4 flex-col md:flex-row">
            <div class="flex items-center gap-2 py-5 md:py-0">
              <div class="h-5 w-20 bg-gray-200 shimmer-item"></div>
              <div class="flex items-center">
                <div class="h-10 w-32 bg-gray-200 shimmer-item"></div>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="h-10 w-28 bg-gray-200 shimmer-item"></div>
              <div class="h-10 w-32 bg-gray-200 shimmer-item"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lower section: Tabs and Recently Viewed -->
      <div class="mt-8 bg-white px-[14px] md:p-6">
        <div class="grid grid-cols-3 gap-4">
          <!-- Left section: Tabs -->
          <div class="col-span-3 md:col-span-2 border-r md:pr-4 border-[#eee]">
            <!-- Tab Headers -->
            <div class="flex border-b-2 border-mainColor bg-[#f1f1f1]">
              <div v-for="i in 3" :key="i" class="h-12 w-40 bg-gray-300 shimmer-item"></div>
            </div>

            <!-- Tab Content -->
            <div class="py-6">
              <div v-for="i in 4" :key="i" class="h-6 w-full bg-gray-200 mb-4 shimmer-item"></div>
              <div
                v-for="i in 3"
                :key="i + 4"
                class="h-6 w-5/6 bg-gray-200 mb-4 shimmer-item"
              ></div>
              <div
                v-for="i in 2"
                :key="i + 7"
                class="h-6 w-4/5 bg-gray-200 mb-4 shimmer-item"
              ></div>
            </div>
          </div>

          <!-- Right section: Recently Viewed -->
          <div class="col-span-3 md:col-span-1">
            <div class="h-8 w-40 bg-gray-200 mb-4 shimmer-item"></div>
            <div class="flex flex-col gap-2">
              <div
                v-for="i in 3"
                :key="i"
                class="flex items-center gap-2 border-b border-gray-200 pb-2"
              >
                <div class="w-20 h-20 bg-gray-300 shimmer-item"></div>
                <div class="flex flex-col">
                  <div class="h-5 w-32 bg-gray-200 mb-1 shimmer-item"></div>
                  <div class="h-5 w-24 bg-gray-200 mb-1 shimmer-item"></div>
                  <div class="h-4 w-20 bg-gray-200 shimmer-item"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailSkeleton',
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

@media (max-width: 767px) {
  .shimmer-item,
  .shimmer-bg {
    animation-duration: 1.5s;
  }
}
</style>
