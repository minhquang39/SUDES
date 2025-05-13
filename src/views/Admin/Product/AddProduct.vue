<template>
  <div class="min-h-screen rounded-3xl bg-gray-50">
    <div class="mx-auto p-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Thêm sản phẩm mới</h1>
        <div class="flex space-x-3">
          <button
            @click="router.back()"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Quay lại
          </button>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="p-6">
          <form @submit.prevent="saveProduct">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <!-- Hình ảnh sản phẩm -->
              <div class="sm:col-span-6">
                <h2 class="text-lg font-medium text-gray-900 border-b pb-2 mt-6">
                  Hình ảnh sản phẩm
                </h2>
              </div>

              <!-- Hình ảnh chính -->
              <div class="sm:col-span-6">
                <label class="block text-sm font-medium text-gray-700"
                  >Hình ảnh chính <span class="text-red-500">*</span></label
                >
                <div class="mt-1 flex items-center">
                  <div v-if="product.image && product.image.length > 0" class="flex gap-4">
                    <div v-for="(image, index) in product.image" :key="index" class="relative">
                      <img
                        :src="image"
                        alt="Product image"
                        class="h-32 w-32 rounded-md object-cover border border-gray-200"
                      />
                      <button
                        @click="removeImage(index)"
                        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    v-else
                    class="h-32 w-32 flex items-center justify-center text-gray-400 border border-gray-200 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12"
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
                  </div>
                  <div class="ml-4">
                    <div
                      class="relative bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                    >
                      <label
                        for="file-upload"
                        class="relative text-sm font-medium text-gray-900 pointer-events-none"
                      >
                        <span>Tải lên</span>
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        @change="handleImageUpload"
                        accept="image/*"
                        multiple
                      />
                    </div>
                    <p class="mt-1 text-xs text-gray-500">PNG, JPG, GIF tối đa 2MB</p>
                  </div>
                </div>
              </div>

              <!-- Thông tin cơ bản -->
              <div class="sm:col-span-6">
                <h2 class="text-lg font-medium text-gray-900 border-b pb-2">Thông tin cơ bản</h2>
              </div>

              <!-- Tên sản phẩm -->
              <div class="sm:col-span-4">
                <label for="name" class="block text-sm font-medium text-gray-700"
                  >Tên sản phẩm <span class="text-red-500">*</span></label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    id="name"
                    v-model="product.name"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
              </div>

              <!-- Mô tả ngắn -->
              <div class="sm:col-span-6">
                <label for="shortDescription" class="block text-sm font-medium text-gray-700"
                  >Mô tả ngắn</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    id="shortDescription"
                    v-model="product.shortDescription"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Mô tả ngắn gọn về sản phẩm"
                  />
                </div>
              </div>

              <!-- Mô tả chi tiết với trình soạn thảo văn bản phong phú -->
              <div class="sm:col-span-6">
                <label for="description" class="block text-sm font-medium text-gray-700"
                  >Mô tả chi tiết</label
                >
                <div class="mt-1">
                  <QuillEditor v-model="product.description" />
                </div>
              </div>

              <!-- Danh mục -->
              <div class="sm:col-span-2">
                <label for="category" class="block text-sm font-medium text-gray-700"
                  >Danh mục <span class="text-red-500">*</span></label
                >
                <div class="mt-1">
                  <select
                    id="category"
                    v-model="product.categoryId"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    @change="currentCategory(product.categoryId)"
                  >
                    <option value="" disabled selected>Chọn danh mục</option>
                    <option v-for="category in categories" :key="category.id" :value="category._id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Danh mục con -->
              <div class="sm:col-span-2">
                <label for="status" class="block text-sm font-medium text-gray-700"
                  >Danh mục con</label
                >
                <div class="mt-1">
                  <select
                    id="status"
                    v-model="product.subCategoryId"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="" disable selected>Chọn danh mục con</option>
                    <option
                      v-for="category in currentSubCategory"
                      :key="category.id"
                      :value="category._id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Trạng thái -->
              <div class="sm:col-span-2">
                <label for="status" class="block text-sm font-medium text-gray-700"
                  >Trạng thái</label
                >
                <div class="mt-1">
                  <select
                    id="status"
                    v-model="product.status"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="" disabled selected>Chọn trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Ẩn</option>
                  </select>
                </div>
              </div>

              <!-- Phân loại sản phẩm -->
              <div class="sm:col-span-6">
                <h2 class="text-lg font-medium text-gray-900 border-b pb-2 mt-6">
                  Phân loại sản phẩm
                </h2>
              </div>

              <div class="sm:col-span-6">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="hasVariants"
                      type="checkbox"
                      v-model="hasVariants"
                      class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="hasVariants" class="font-medium text-gray-700"
                      >Sản phẩm có nhiều phân loại</label
                    >
                    <p class="text-gray-500">
                      Chọn nếu sản phẩm có nhiều phiên bản như kích thước, màu sắc, trọng lượng...
                    </p>
                  </div>
                </div>
              </div>

              <!-- Phần quản lý phân loại -->
              <div v-if="hasVariants" class="sm:col-span-6 border rounded-md p-4 bg-gray-50">
                <!-- Loại phân loại -->
                <div class="mb-4">
                  <div class="flex items-center justify-between">
                    <label class="block text-sm font-medium text-gray-700">Phân loại</label>
                  </div>
                  <div class="mt-2">
                    <div class="flex flex-wrap gap-2 mt-2">
                      <div
                        v-for="(value, index) in variantValues"
                        :key="index"
                        class="flex items-center bg-white border rounded-md px-2 py-1"
                      >
                        <span>{{ value }}</span>
                        <button
                          type="button"
                          @click="removeVariantValue(index)"
                          class="ml-1 text-gray-400 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="text"
                          v-model="newVariantValue"
                          @keyup.enter="addVariantValue"
                          class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Thêm giá trị"
                        />
                        <button
                          type="button"
                          @click="addVariantValue"
                          class="ml-1 text-green-500 hover:text-green-700"
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
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bảng phân loại -->
                <div v-if="hasVariantValues" class="mt-4">
                  <h3 class="text-sm font-medium text-gray-700 mb-2">Danh sách phân loại</h3>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-100">
                        <tr>
                          <th
                            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Phân loại
                          </th>
                          <th
                            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            SKU
                          </th>
                          <th
                            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Giá (₫)
                          </th>
                          <th
                            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Giá cũ (₫)
                          </th>
                          <th
                            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Tồn kho
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(variant, index) in productVariants" :key="index">
                          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {{ variant.name }}
                          </td>
                          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            <input
                              type="text"
                              v-model="variant.sku"
                              class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              :placeholder="product.sku + '-' + (index + 1)"
                            />
                          </td>
                          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            <input
                              type="text"
                              v-model="variant.formattedPrice"
                              class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="0"
                            />
                          </td>
                          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            <input
                              type="text"
                              v-model="variant.formattedOldPrice"
                              class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="0"
                            />
                          </td>
                          <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            <input
                              type="number"
                              v-model="variant.stock"
                              min="0"
                              class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Thông tin giá và kho -->
              <div v-if="!hasVariants" class="sm:col-span-6">
                <h2 class="text-lg font-medium text-gray-900 border-b pb-2 mt-6">
                  Thông tin giá & kho hàng
                </h2>
              </div>

              <!-- Giá bán -->
              <div v-if="!hasVariants" class="sm:col-span-2">
                <label for="price" class="block text-sm font-medium text-gray-700"
                  >Giá bán (₫) <span class="text-red-500">*</span></label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    id="price"
                    v-model="formattedPrice"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                </div>
              </div>

              <!-- Giá khuyến mãi -->
              <div v-if="!hasVariants" class="sm:col-span-2">
                <label for="salePrice" class="block text-sm font-medium text-gray-700"
                  >Giá khuyến mãi (₫)</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    id="salePrice"
                    v-model="formattedSalePrice"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                </div>
              </div>

              <!-- Số lượng tồn kho -->
              <div v-if="!hasVariants" class="sm:col-span-2">
                <label for="stock" class="block text-sm font-medium text-gray-700"
                  >Tồn kho <span class="text-red-500">*</span></label
                >
                <div class="mt-1">
                  <input
                    type="number"
                    id="stock"
                    v-model="product.stock"
                    min="0"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                </div>
              </div>

              <!-- Mã SKU -->
              <div v-if="!hasVariants" class="sm:col-span-2">
                <label for="sku" class="block text-sm font-medium text-gray-700"
                  >Mã SKU <span class="text-red-500">*</span></label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    id="sku"
                    v-model="product.sku"
                    class="shadow-sm p-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="VD: YS-NC-001"
                  />
                </div>
              </div>
            </div>
            <div class="mt-8 flex justify-end">
              <button
                type="button"
                @click="goBack"
                class="bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 px-6 py-2 mr-3"
              >
                Hủy
              </button>

              <button
                type="submit"
                class="border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 px-6 py-2"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Đang thêm...' : 'Thêm sản phẩm' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/utils/axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()
import QuillEditor from '@/components/QuillEditor.vue'
const isLoading = ref(false)
const router = useRouter()

// Hàm format số tiền
const formatCurrency = (value) => {
  if (!value) return ''
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Hàm chuyển đổi từ string có dấu chấm về number
const parseCurrency = (value) => {
  if (!value) return null
  return Number(value.replace(/\./g, ''))
}

// Computed properties cho giá tiền đã format
const formattedPrice = computed({
  get: () => formatCurrency(product.value.price),
  set: (value) => {
    product.value.price = parseCurrency(value)
  },
})

const formattedSalePrice = computed({
  get: () => formatCurrency(product.value.salePrice),
  set: (value) => {
    product.value.salePrice = parseCurrency(value)
  },
})

// Giả lập dữ liệu danh mục
const categories = ref([])

// Dữ liệu sản phẩm mới
const product = ref({
  name: '',
  sku: '',
  shortDescription: '',
  description: '',
  categoryId: '',
  subCategoryId: '',
  price: null,
  salePrice: null,
  stock: null,
  status: 'Đang bán',
  image: '',
  imageFiles: [],
})

const currentCategory = (id) => {
  const category = categories.value.find((item) => item._id === id)
  currentSubCategory.value = category.children
}
const currentSubCategory = ref([])

// Quản lý phân loại sản phẩm
const hasVariants = ref(false)
const variantValues = ref([])
const newVariantValue = ref('')
const variantInputs = ref([])

// Sửa lại computed productVariants
const productVariants = computed(() => {
  if (!hasVariants.value) return []
  if (variantValues.value.length === 0) return []

  // Cập nhật variantInputs khi có thay đổi về số lượng variants
  if (variantInputs.value.length !== variantValues.value.length) {
    variantInputs.value = variantValues.value.map((value, index) => {
      // Tìm giá trị cũ nếu có
      const existingVariant = variantInputs.value.find((v) => v.name === value)
      const newVariant = {
        name: value,
        sku: existingVariant?.sku || `${product.value.sku || 'SKU'}-${value}`,
        price: existingVariant?.price || '',
        oldPrice: existingVariant?.oldPrice || '',
        stock: existingVariant?.stock !== undefined ? existingVariant.stock : '',
      }

      // Định nghĩa getters và setters
      Object.defineProperty(newVariant, 'formattedPrice', {
        get() {
          return formatCurrency(this.price)
        },
        set(value) {
          this.price = parseCurrency(value)
        },
      })

      Object.defineProperty(newVariant, 'formattedOldPrice', {
        get() {
          return formatCurrency(this.oldPrice)
        },
        set(value) {
          this.oldPrice = parseCurrency(value)
        },
      })

      return newVariant
    })
  }

  return variantInputs.value
})

// Thêm watch để reset variantInputs khi tắt hasVariants
watch(hasVariants, (newValue) => {
  if (!newValue) {
    variantInputs.value = []
  }
})

// Kiểm tra xem có giá trị phân loại nào không
const hasVariantValues = computed(() => {
  return variantValues.value.length > 0
})

// Thêm giá trị phân loại
const addVariantValue = () => {
  if (newVariantValue.value && !variantValues.value.includes(newVariantValue.value)) {
    variantValues.value.push(newVariantValue.value)
    newVariantValue.value = ''
  }
}

// Xóa giá trị phân loại
const removeVariantValue = (valueIndex) => {
  variantValues.value.splice(valueIndex, 1)
}

// Xử lý tải lên hình ảnh chính
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 5) {
    $toast.error('Bạn chỉ được tải lên tối đa 5 hình ảnh')
    return
  }
  product.value.imageFiles = files
  product.value.image = []

  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      product.value.image.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const saveProduct = async () => {
  try {
    isLoading.value = true

    // Log cho debug
    console.log('Variants before submission:', variantInputs.value)

    // Validate variants
    if (hasVariants.value) {
      // Kiểm tra xem đã nhập đủ thông tin cho variants chưa
      const invalidVariants = variantInputs.value.some(
        (variant) =>
          !variant.sku || !variant.price || variant.stock === undefined || variant.stock === '',
      )
      if (invalidVariants) {
        $toast.error(
          'Vui lòng nhập đầy đủ mã SKU, giá bán và số lượng tồn kho cho tất cả phân loại',
        )
        isLoading.value = false
        return
      }
    }

    const formData = new FormData()

    // Thêm các trường dữ liệu cơ bản
    formData.append('name', product.value.name)
    formData.append('shortDescription', product.value.shortDescription)
    formData.append('description', product.value.description)
    if (product.value.categoryId) {
      formData.append('category[]', product.value.categoryId)
    }
    if (product.value.subCategoryId) {
      formData.append('category[]', product.value.subCategoryId)
    }
    formData.append('status', product.value.status || 'active')

    // Thêm ảnh
    if (product.value.imageFiles && product.value.imageFiles.length > 0) {
      product.value.imageFiles.forEach((file) => {
        formData.append('images', file)
      })
    }

    // Kiểm tra variants trước khi thêm vào formData
    let variantsToAdd = []

    // Xử lý variants
    if (!hasVariants.value) {
      // Trường hợp không có variants
      const defaultVariant = {
        name: product.value.name,
        sku: product.value.sku,
        price: Number(product.value.price) || 0,
        oldPrice: Number(product.value.salePrice) || 0,
        stock: Number(product.value.stock) || 0,
      }
      variantsToAdd = [defaultVariant]
    } else {
      // Trường hợp có nhiều variants
      variantsToAdd = variantInputs.value.map((variant) => ({
        name: variant.name,
        sku: variant.sku,
        price: Number(variant.price) || 0,
        oldPrice:
          variant.oldPrice !== undefined && variant.oldPrice !== '' ? Number(variant.oldPrice) : 0,
        stock: variant.stock !== undefined && variant.stock !== '' ? Number(variant.stock) : 0,
      }))
    }

    console.log('Variants to submit:', variantsToAdd)
    formData.append('variants', JSON.stringify(variantsToAdd))

    // Log formData để debug
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`)
    }

    const response = await apiClient.post('/admin/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Response:', response)
    $toast.success('Thêm sản phẩm thành công')

    // Reset form sau khi thêm thành công
    product.value = {
      name: '',
      sku: '',
      shortDescription: '',
      description: '',
      categoryId: '',
      subCategoryId: '',
      price: null,
      salePrice: null,
      stock: null,
      status: 'active',
      image: '',
      imageFiles: [],
    }
    variantValues.value = []
    variantInputs.value = []
    hasVariants.value = false
  } catch (error) {
    console.error('Error:', error)
    console.error('Error details:', error.response?.data || error.message)
    $toast.error(
      'Có lỗi xảy ra khi thêm sản phẩm: ' + (error.response?.data?.message || error.message),
    )
  } finally {
    isLoading.value = false
  }
}
onMounted(async () => {
  // fetch category
  try {
    const response = await apiClient.get('/admin/category/parent')
    if (response.status === 200) {
      categories.value = response.data.data
    }
  } catch (error) {
    console.error('Error loading categories:', error)
  }
})

// Thêm hàm xóa ảnh
const removeImage = (index) => {
  product.value.image.splice(index, 1)
}
</script>

<style>
/* CSS cho bảng phân loại sản phẩm */
.variant-table {
  overflow-x: auto;
}

/* CSS cho hiển thị nhiều ảnh */
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.relative {
  position: relative;
}

.relative button {
  opacity: 0;
  transition: opacity 0.2s;
}

.relative:hover button {
  opacity: 1;
}
</style>
