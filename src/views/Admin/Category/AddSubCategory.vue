<template>
  <div>
    <h1 class="text-2xl font-bold text-textColor mb-4">Thêm danh mục con</h1>

    <div class="bg-white rounded-lg shadow-xl overflow-hidden p-6">
      <form @submit.prevent="">
        <div class="mb-4">
          <label for="category-name" class="block text-sm font-medium text-gray-700 mb-1"
            >Danh mục cha</label
          >
          <select
            id="category-name"
            v-model="parentCategory"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option disabled value="">Vui lòng chọn danh mục cha</option>
            <option v-for="category in parentCategories" :key="category.id" :value="category._id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="category-name" class="block text-sm font-medium text-gray-700 mb-1"
            >Tên danh mục con</label
          >
          <input
            id="category-name"
            v-model="subCategory"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập tên danh mục con"
            required
          />
        </div>

        <div class="mt-6">
          <button
            @click="handleCreateSubCategory"
            type="submit"
            class="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading || !subCategory.trim()"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            {{ isLoading ? 'Đang thêm...' : 'Thêm danh mục' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/utils/axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()
const parentCategory = ref('')
const subCategory = ref('')
const isLoading = ref(false)

//handle create sub category
const handleCreateSubCategory = async () => {
  try {
    isLoading.value = true
    const response = await apiClient.post('/admin/category/child', {
      parentId: parentCategory.value,
      name: subCategory.value,
    })
    if (response.status === 200) {
      $toast.success('Thêm danh mục con thành công', {
        position: 'top-right',
        duration: 1000,
      })
    }
  } catch (error) {
    $toast.error('Thêm danh mục con thất bại', {
      position: 'top-right',
      duration: 1000,
    })
  } finally {
    isLoading.value = false
    subCategory.value = ''
    parentCategory.value = ''
  }
}
// Get parent categories
const parentCategories = ref([])

onMounted(async () => {
  try {
    const response = await apiClient.get('/admin/category/parent')
    if (response.status === 200) {
      parentCategories.value = response.data.data
    }
  } catch (error) {}
})
</script>
