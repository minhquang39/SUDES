<template>
  <div class="">
    <!-- Header with title and add button -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-2xl font-bold text-textColor">Quản lý chính sách</h1>
      <button
        @click="openAddPolicyForm"
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
        Thêm chính sách
      </button>
    </div>

    <!-- Policies table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
              >
                Tiêu đề
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nội dung
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-30"
              >
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody v-if="isLoading">
            <tr>
              <td colspan="3" class="px-6 py-10 text-center text-gray-500">
                <div
                  class="w-4 h-4 border-2 border-b-neutral-700 border-t-transparent rounded-full animate-spin"
                ></div>
              </td>
            </tr>
          </tbody>
          <tbody v-else class="bg-white divide-y divide-gray-200">
            <tr v-if="policies && policies.length === 0">
              <td colspan="3" class="px-6 py-10 text-center text-gray-500">
                Chưa có chính sách nào. Hãy thêm chính sách mới!
              </td>
            </tr>

            <tr v-for="(policy, index) in policies" :key="policy._id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900">{{ policy.title }}</div>
                </div>
              </td>

              <td class="px-6 py-4">
                <p class="text-sm text-gray-500 line-clamp-2" v-html="policy.content"></p>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex justify-center space-x-3">
                  <button
                    @click="editPolicy(policy)"
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
                    @click="confirmDelete(policy)"
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

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
        <div
          class="fixed inset-0 bg-white/50 bg-opacity-75 transition-opacity"
          @click="cancelDelete"
        ></div>

        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Xóa chính sách</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Bạn có chắc chắn muốn xóa chính sách này? Hành động này không thể hoàn tác.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              @click="deletePolicy"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Xóa
            </button>
            <button
              @click="cancelDelete"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor sm:mt-0 sm:w-auto sm:text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeForm"
        ></div>

        <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ editMode ? 'Chỉnh sửa chính sách' : 'Thêm chính sách mới' }}
            </h2>
            <button @click="closeForm" class="text-gray-400 hover:text-gray-500">
              <span class="text-2xl">&times;</span>
            </button>
          </div>

          <form @submit.prevent="">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Tiêu đề </label>
                <input
                  v-model="formData.title"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-mainColor focus:border-mainColor"
                  placeholder="Nhập tiêu đề chính sách"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"> Nội dung </label>
                <QuillEditor
                  v-model="formData.content"
                  placeholder="Nhập nội dung chi tiết của chính sách"
                  class="min-h-[300px]"
                />
              </div>
            </div>

            <div class="mt-5 sm:mt-6 space-x-3 flex justify-end">
              <button
                type="button"
                @click="closeForm"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor"
              >
                Hủy
              </button>
              <button
                @click="handleEditPolicy"
                v-if="editMode"
                type="submit"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-mainColor border border-transparent rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor"
              >
                Cập nhật
              </button>
              <button
                @click="handleCreatePolicy"
                v-if="!editMode"
                type="submit"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-mainColor border border-transparent rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor"
              >
                <div
                  v-if="isLoading"
                  class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
                <span v-else> Thêm mới</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import QuillEditor from '@/components/QuillEditor.vue' 
import apiClient from '@/utils/axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()
const policies = ref(null)

const showDeleteConfirm = ref(false)
const policyToDelete = ref(null)
const policyToUpdate = ref(null)
const showForm = ref(false)
const editMode = ref(false)

const isLoading = ref(false)

const formData = reactive({
  title: '',
  content: '',
})

const openAddPolicyForm = () => {
  // Reset form data
  formData.id = null
  formData.title = ''
  formData.type = ''
  formData.content = ''
  editMode.value = false
  showForm.value = true
}

const editPolicy = (policy) => {
  // Populate form with policy data
  formData.title = policy.title
  formData.content = policy.content
  policyToUpdate.value = policy.slug
  console.log(policyToUpdate.value)

  editMode.value = true
  showForm.value = true
}

const handleEditPolicy = async () => {
  try {
    const response = await apiClient.put(`/admin/policy/${policyToUpdate.value}`, formData)
    if (response.status === 200) {
      const updatedPolicy = response.data.data
      console.log('Updated policy:', updatedPolicy)
      const index = policies.value.findIndex((p) => p.slug === policyToUpdate.value)
      if (index !== -1) {
        policies.value[index] = updatedPolicy
      }
      $toast.success('Cập nhật chính sách thành công', {
        position: 'top-right',
        duration: 1000,
      })
    } else {
      $toast.error('Có lỗi xảy ra khi cập nhật chính sách', {
        position: 'top-right',
        duration: 1000,
      })
    }
  } catch (error) {
    console.error('Error updating policy:', error)
    $toast.error('Có lỗi xảy ra khi cập nhật chính sách', {
      position: 'top-right',
      duration: 1000,
    })
  } finally {
    showForm.value = false
    policyToUpdate.value = null
    formData.title = ''
    formData.content = ''
  }
}

const closeForm = () => {
  showForm.value = false
}

const confirmDelete = (policy) => {
  policyToDelete.value = policy
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  policyToDelete.value = null
}

const deletePolicy = async () => {
  if (policyToDelete.value) {
    try {
      const response = await apiClient.delete(`/admin/policy/${policyToDelete.value.slug}`)
      if (response.status === 200) {
        $toast.success('Xóa chính sách thành công', {
          position: 'top-right',
          duration: 1000,
        })
        policies.value = policies.value.filter((p) => p?.slug !== policyToDelete.value?.slug)
      } else {
        $toast.error('Có lỗi xảy ra khi xóa chính sách', {
          position: 'top-right',
          duration: 1000,
        })
      }
    } catch (error) {
      console.error('Error deleting policy:', error)
      $toast.error('Có lỗi xảy ra khi xóa chính sách', {
        position: 'top-right',
        duration: 1000,
      })
    } finally {
      showDeleteConfirm.value = false
      policyToDelete.value = null
    }
    showDeleteConfirm.value = false
    policyToDelete.value = null
  }
}

const handleCreatePolicy = async () => {
  try {
    isLoading.value = true
    const response = await apiClient.post('/admin/policy', formData)
    policies.value.push(response.data.data)
    $toast.success('Thêm chính sách thành công', {
      position: 'top-right',
      duration: 1000,
    })
  } catch (error) {
    isLoading.value = false
    console.log('Error creating policy:', error)
    $toast.error('Có lỗi xảy ra khi thêm chính sách', {
      position: 'top-right',
      duration: 1000,
    })
  } finally {
    isLoading.value = false
    showForm.value = false
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await apiClient.get('/admin/policy')
    policies.value = response.data.data
    console.log('Policies:', policies.value)
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching policies:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
