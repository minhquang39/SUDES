<template>
  <div class="">
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-2xl font-bold text-textColor">Quản lý danh mục</h1>
      <button
        @click="handleAddCategory"
        class="flex items-center bg-mainColor text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Thêm danh mục
      </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-auto h-screen">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
              >
                Ảnh bìa
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Danh mục
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-30"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="categories && categories.length === 0">
              <td colspan="3" class="px-6 py-10 text-center text-gray-500">
                Chưa có chính sách nào. Hãy thêm chính sách mới!
              </td>
            </tr>
            <tr v-for="(category, index) in categories" :key="index" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900">
                    <img :src="category.coverImage" alt="Ảnh bìa" class="w-40 h-20" />
                  </div>
                </div>
              </td>

              <td class="px-6 py-4">
                <p class="text-sm text-gray-500 line-clamp-2">{{ category.name }}</p>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex justify-center space-x-3">
                  <button
                    :id="category._id"
                    @click="handleEditCategory(category._id)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Chỉnh sửa"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="handleConfirmDelete(category._id)"
                    class="text-red-600 hover:text-red-900"
                    title="Xóa"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ModalConfirm
      :showConfirm="showConfirm"
      @confirm-delete="handleDeleteCategory"
      @hide-confirm="showConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ModalConfirm from '@/components/ModalCofirm.vue'
import apiClient from '@/utils/axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const categories = ref([])
const router = useRouter()
// Toggle show modal confirm
const showConfirm = ref(false)
const categoryDeleteId = ref('')
const $toast = useToast()

const handleConfirmDelete = (id) => {
  showConfirm.value = true
  categoryDeleteId.value = id
}

const handleDeleteCategory = async () => {
  try {
    const response = await apiClient.delete(`/admin/category/parent/${categoryDeleteId.value}`)
    if (response.status === 200) {
      showConfirm.value = false
      categories.value = categories.value.filter(
        (category) => category._id !== categoryDeleteId.value,
      )
    }
    $toast.success('Xóa danh mục thành công', {
      position: 'top-right',
      duration: 3000,
    })
    showConfirm.value = false
    categoryDeleteId.value = null
  } catch (error) {
    console.log(error)
    $toast.error('Xóa danh mục thất bại', {
      position: 'top-right',
      duration: 3000,
    })
  }
}

const handleAddCategory = () => {
  router.push('/admin/dashboard/category/add')
}
const handleEditCategory = (id) => {
  router.push({ path: '/admin/dashboard/category/add', query: { type: 'update', id: id } })
  console.log(id)
}

onMounted(async () => {
  // fetch category
  const response = await apiClient.get('/admin/category/parent')
  if (response.status === 200) {
    categories.value = response.data.data
  }
})
</script>
