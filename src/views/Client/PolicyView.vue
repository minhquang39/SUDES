<template>
  <div class="bg-primaryBg py-2">
    <div class="lg:px-11 xl:px-30">
      <!-- Bread cump  -->
      <div class="my-2">Trang chủ > Chính sách mua hàng</div>

      <div v-if="loading">
        <PolicySkeleton />
      </div>
      <div v-else-if="policy" class="bg-white p-[14px]">
        <span class="font-bold text-xl hover:text-hover cursor-pointer uppercase">{{
          policy.title
        }}</span>
        <div v-html="policy.content" class="leading-9"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/utils/axios'
import PolicySkeleton from '@/components/Skeleton/PolicySkeleton.vue'

const route = useRoute()
const policy = ref(null)
const loading = ref(true)

const policySlug = computed(() => {
  return route.fullPath.split('/').pop()
})

const fetchPolicy = async (path) => {
  try {
    loading.value = true
    const response = await apiClient.get('/admin/policy/' + path)
    if (response.status === 200) {
      policy.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching policy:', error)
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
    }
  } finally {
    loading.value = false
  }
}

watch(
  () => route.fullPath,
  (newPath) => {
    fetchPolicy(policySlug.value)
  },
  { immediate: true },
)
</script>
