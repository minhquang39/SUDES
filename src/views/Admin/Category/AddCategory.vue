<template>
  <div>
    <h1 class="text-2xl font-bold text-textColor mb-4">
      {{ type === 'update' ? 'Cập nhật danh mục' : 'Thêm danh mục' }}
    </h1>

    <div class="bg-white rounded-lg shadow-xl overflow-hidden p-6">
      <form @submit.prevent="">
        <div class="mb-4">
          <label for="category-name" class="block text-sm font-medium text-gray-700 mb-1"
            >Tên danh mục</label
          >
          <input
            id="category-name"
            v-model="name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập tên danh mục"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Ảnh danh mục</label>
          <div class="flex items-start space-x-4">
            <!-- Image Preview -->
            <div class="relative group">
              <div
                class="h-[180px] w-[180px] rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
              >
                <template v-if="imageCategoryPreview">
                  <img
                    class="w-full h-full object-cover"
                    :src="imageCategoryPreview"
                    alt="Ảnh danh mục"
                  />
                  <div
                    class="absolute inset-0 bg-black/30 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
                  >
                    <button
                      type="button"
                      @click="clearImage"
                      class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div class="text-center p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p class="mt-1 text-sm text-gray-500">Chưa có ảnh</p>
                  </div>
                </template>
              </div>

              <!-- File Input (hidden but accessible) -->
              <input
                type="file"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer z-0"
                @change="handleImageCategory($event)"
                aria-label="Chọn ảnh danh mục"
              />
            </div>

            <!-- Upload Instructions -->
            <div class="flex-1">
              <p class="text-sm text-gray-500">Chọn ảnh cho danh mục</p>
              <p class="text-xs text-gray-400 mt-1">Hỗ trợ JPG, PNG hoặc GIF. Tối đa 2MB.</p>

              <div v-if="imageCategory" class="mt-2">
                <p class="text-xs text-gray-600">
                  <span class="font-medium">File: </span>{{ imageCategory.name }}
                </p>
                <p class="text-xs text-gray-600">
                  <span class="font-medium">Kích thước: </span
                  >{{ formatFileSize(imageCategory.size) }}
                </p>
              </div>

              <button
                type="button"
                class="mt-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                @click="triggerFileInput"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="-ml-0.5 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                {{ imageCategory ? 'Thay đổi ảnh' : 'Tải ảnh lên' }}
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            @click="handleUpdateCategory"
            v-if="type === 'update'"
            type="submit"
            class="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading || !name.trim()"
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
            {{ isLoading ? 'Đang cập nhật...' : 'Sửa danh mục' }}
          </button>
          <button
            @click="handleCreateCategory"
            v-else
            type="submit"
            class="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading || !name.trim()"
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
import { ref, computed, onMounted } from 'vue'
import apiClient from '@/utils/axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useRoute } from 'vue-router'
const route = useRoute()

const $toast = useToast()
const imageCategory = ref(null)
const imageCategoryPreview = ref(null)
const isLoading = ref(false)
const name = ref('')
const formData = ref(null)
const fileInput = ref(null)

const type = computed(() => route.query.type)
const id = computed(() => route.query.id)

console.log(type.value)
console.log(id.value)

const handleImageCategory = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    $toast.error('Kích thước file quá lớn. Tối đa 2MB.', {
      position: 'top-right',
      duration: 3000,
    })
    return
  }

  formData.value = new FormData()
  formData.value.append('name', name.value)
  formData.value.append('coverImage', file)

  imageCategory.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imageCategoryPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const clearImage = () => {
  imageCategory.value = null
  imageCategoryPreview.value = null
  formData.value = null
  // If we need to reset the file input
  const inputs = document.querySelectorAll('input[type="file"]')
  inputs.forEach((input) => {
    input.value = ''
  })
}

const triggerFileInput = () => {
  // Programmatically click the hidden file input
  const inputs = document.querySelectorAll('input[type="file"]')
  if (inputs.length > 0) {
    inputs[0].click()
  }
}

const handleCreateCategory = async () => {
  if (!name.value.trim()) {
    $toast.warning('Vui lòng nhập tên danh mục', {
      position: 'top-right',
      duration: 3000,
    })
    return
  }

  // Update FormData with latest name value
  if (!formData.value) {
    formData.value = new FormData()
    formData.value.set('name', name.value)
    formData.value.set('coverImage', imageCategory.value)
  }

  try {
    isLoading.value = true
    const response = await apiClient.post('/admin/category/parent', formData.value)
    console.log(response)
    if (response.status === 200) {
      $toast.success('Thêm danh mục thành công', {
        position: 'top-right',
        duration: 3000,
      })
      // Reset form after successful submission
      name.value = ''
      clearImage()
    }
  } catch (error) {
    console.log(error)
    let errorMessage = 'Thêm danh mục thất bại'

    if (error.response && error.response.data) {
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error
      }
    }

    $toast.error(errorMessage, {
      position: 'top-right',
      duration: 3000,
    })
  } finally {
    isLoading.value = false
  }
}

const handleUpdateCategory = async () => {
  const formData = new FormData()
  formData.set('name', name.value)
  formData.set('coverImage', imageCategory.value)
  try {
    isLoading.value = true
    const response = await apiClient.put(`/admin/category/parent/${id.value}`, formData)
    if (response.status === 200) {
      $toast.success('Cập nhật danh mục thành công', {
        position: 'top-right',
        duration: 3000,
      })
    }
  } catch (error) {
    isLoading.value = false
    let errorMessage = 'Cập nhật danh mục thất bại'
    if (error.response && error.response.data) {
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data
      }
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (type.value === 'update') {
    const response = await apiClient.get(`/admin/category/parent/${id.value}`)
    if (response.status === 200) {
      name.value = response.data.data.name
      imageCategoryPreview.value = response.data.data.coverImage
    }
  }
})
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  transition-delay: 150ms;
}
</style>
