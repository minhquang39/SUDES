<template>
  <div class="bg-primaryBg py-2">
    <div class="lg:px-11 xl:px-30">
      <!-- Bread cump  -->
      <div class="my-2">Trang chủ > Chính sách mua hàng</div>

      <div v-if="policy" class="bg-white p-[14px]">
        <span class="font-bold text-xl hover:text-hover cursor-pointer uppercase">{{
          policy.title
        }}</span>
        <div v-html="policy.content" class="leading-9"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/utils/axios'
const route = useRoute()
console.log(route.fullPath)

const policy = ref(null)

const fetchPolicy = async (path) => {
  try {
    const response = await apiClient.get('/admin/policy' + path)
    if (response.status === 200) {
      policy.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching policy:', error)
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
    }
  }
}

watch(
  () => route.fullPath,
  (newPath) => {
    fetchPolicy(newPath)
  },
  { immediate: true },
)
</script>
