<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-textColor">Quản lý danh mục con</h1>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-auto p-5 flex flex-col gap-y-2">
        <div v-for="(category, index) in categories" :key="index">
          <!-- parent category -->
          <div
            @click="handleShowSubCategory(index)"
            class="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
          >
            <p>{{ category.name }}</p>
            <ChevronDownIcon
              v-if="!showSubCategory[index] && category.children.length"
              class="size-5"
            />
            <ChevronUpIcon
              v-if="showSubCategory[index] && category.children.length"
              class="size-5"
            />
          </div>
          <!-- sub category -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[500px]"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 max-h-[500px]"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-show="showSubCategory[index]" class="flex flex-col ml-5">
              <div
                class="hover:bg-gray-100 p-2 cursor-pointer"
                v-for="(subCategory, index) in category.children"
                :key="index"
              >
                <div v-show="!showEditSubCategory[index]" class="flex justify-between items-center">
                  <p>{{ subCategory.name }}</p>
                  <div class="flex items-center gap-x-2">
                    <div
                      @click="handleShowEditSubCategory(index)"
                      class="hover:bg-gray-300 p-2 rounded-full"
                    >
                      <PencilIcon class="size-4" />
                    </div>
                    <div @click="showConfirm = true" class="hover:bg-gray-300 p-2 rounded-full">
                      <TrashIcon @click="handleConfirmDelete(subCategory._id)" class="size-4" />
                    </div>
                  </div>
                </div>
                <div v-show="showEditSubCategory[index]" class="flex items-center gap-x-2">
                  <input
                    type="text"
                    class="border border-gray-300 rounded-md p-1"
                    v-model="subCategoryName"
                  />
                  <button
                    @click="hanldeUpdateSubCategory(subCategory._id)"
                    class="bg-blue-500 text-white p-1 px-3 rounded-md cursor-pointer"
                  >
                    Lưu
                  </button>
                  <button
                    @click="showEditSubCategory[index] = false"
                    class="bg-red-500 text-white p-1 px-3 rounded-md cursor-pointer"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <ModalConfirm
      :showConfirm="showConfirm"
      @confirm-delete="handleDeleteSubCategory"
      @hide-confirm="showConfirm = false"
      type="danh mục con"
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
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'
const categories = ref([])
const router = useRouter()
// Toggle show modal confirm
const showConfirm = ref(false)
const $toast = useToast()
const subCategoryId = ref('')
const showSubCategory = ref([])
const showEditSubCategory = ref([])
const subCategoryName = ref('')

const handleShowEditSubCategory = (id) => {
  showEditSubCategory.value = showEditSubCategory.value.map(() => false)
  showEditSubCategory.value[id] = true
}

const hanldeUpdateSubCategory = async (id) => {
  try {
    const response = await apiClient.put(`/admin/category/child/${id}`, {
      name: subCategoryName.value,
    })
    if (response.status === 200) {
      const childCategory = response.data.data
      const parentCategory = categories.value.find((category) =>
        category.children.some((child) => child._id === id),
      )
      const parentIndex = categories.value.findIndex(
        (category) => category._id === parentCategory._id,
      )
      categories.value[parentIndex].children = categories.value[parentIndex].children.map(
        (child) => (child._id === id ? childCategory : child),
      )
      showEditSubCategory.value = showEditSubCategory.value.map(() => false)

      $toast.success('Cập nhật danh mục con thành công', {
        position: 'top-right',
        duration: 1000,
      })
    }
  } catch (error) {
    $toast.error('Cập nhật danh mục con thất bại', {
      position: 'top-right',
      duration: 1000,
    })
  }
}

const handleShowSubCategory = (id) => {
  // Nếu subcategory đang mở, đóng nó
  if (showSubCategory.value[id]) {
    showSubCategory.value[id] = false
  } else {
    // Đóng tất cả subcategories trước
    showSubCategory.value = showSubCategory.value.map(() => false)
    // Mở subcategory được chọn
    showSubCategory.value[id] = true
  }
}

const handleDeleteSubCategory = async () => {
  try {
    const response = await apiClient.delete(`/admin/category/child/${subCategoryId.value}`)
    if (response.status === 200) {
      const parentCategory = response.data.data
      console.log('category', parentCategory)
      const parentIndex = categories.value.findIndex(
        (category) => category._id === parentCategory._id,
      )
      categories.value[parentIndex].children = categories.value[parentIndex].children.filter(
        (child) => child._id !== subCategoryId.value,
      )
      $toast.success('Xóa danh mục con thành công')
      showConfirm.value = false
      subCategoryId.value = ''
    }
  } catch (error) {
    $toast.error('Xóa danh mục con thất bại')
  }
}

const handleConfirmDelete = (id) => {
  subCategoryId.value = id
  showConfirm.value = true
}

onMounted(async () => {
  // fetch category
  const response = await apiClient.get('/admin/category/parent')
  if (response.status === 200) {
    categories.value = response.data.data
    console.log(categories.value)
  }
})
</script>
