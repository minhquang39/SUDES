<template>
  <div class="bg-primaryBg py-2">
    <div class="lg:px-11 xl:px-30">
      <!-- Breadcrumb Skeleton -->
      <div class="my-2">
        <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <!-- Policy Content Skeleton -->
      <div class="bg-white p-[14px]">
        <!-- Title Skeleton -->
        <div class="h-8 w-64 bg-gray-200 rounded mb-6 animate-pulse"></div>

        <!-- Content Skeleton -->
        <div class="space-y-4">
          <!-- Main sections -->
          <div v-for="i in 4" :key="i" class="space-y-3">
            <!-- Section title -->
            <div class="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            
            <!-- Section content -->
            <div class="space-y-2">
              <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <!-- Sub-sections -->
            <div class="ml-4 space-y-2">
              <div v-for="j in 3" :key="j" class="space-y-2">
                <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style> 