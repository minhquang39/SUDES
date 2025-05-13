<template>
  <div class="p-4">
    <!-- Header với nút quay lại và lưu -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-blue-800">
        {{ isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}
      </h1>
      <div class="flex gap-2">
        <n-button @click="goBack">Quay lại</n-button>
      </div>
    </div>

    <n-spin :show="loading">
      <div class="grid grid-cols-1 gap-8">
        <!-- Thông tin cơ bản -->
        <n-card title="Thông tin cơ bản">
          <n-form label-placement="left" label-width="160px" require-mark-placement="right-hanging">
            <n-grid :cols="24" :x-gap="24">
              <!-- Tên sản phẩm -->
              <n-form-item-gi :span="24" label="Tên sản phẩm" required>
                <n-input v-model:value="product.name" placeholder="Nhập tên sản phẩm" />
              </n-form-item-gi>

              <!-- Mô tả ngắn -->
              <n-form-item-gi :span="24" label="Mô tả ngắn">
                <n-input
                  v-model:value="product.shortDescription"
                  type="textarea"
                  placeholder="Mô tả ngắn gọn về sản phẩm"
                />
              </n-form-item-gi>

              <!-- Mô tả chi tiết -->
              <n-form-item-gi :span="24" label="Mô tả chi tiết">
                <QuillEditor v-model="product.description" />
              </n-form-item-gi>

              <!-- Danh mục -->
              <n-form-item-gi :span="8" label="Danh mục" required>
                <n-select
                  v-model:value="product.categoryId"
                  :options="
                    categories.map((cat) => ({
                      label: cat.name,
                      value: cat._id,
                    }))
                  "
                  placeholder="Chọn danh mục"
                  @update:value="currentCategory"
                />
              </n-form-item-gi>

              <!-- Danh mục con -->
              <n-form-item-gi :span="8" label="Danh mục con">
                <n-select
                  v-model:value="product.subCategoryId"
                  :options="
                    currentSubCategory.map((cat) => ({
                      label: cat.name,
                      value: cat._id,
                    }))
                  "
                  placeholder="Chọn danh mục con"
                />
              </n-form-item-gi>

              <!-- Trạng thái -->
              <n-form-item-gi :span="8" label="Trạng thái">
                <n-select
                  v-model:value="product.status"
                  :options="[
                    { label: 'Hoạt động', value: 'active' },
                    { label: 'Ẩn', value: 'inactive' },
                  ]"
                  placeholder="Chọn trạng thái"
                />
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </n-card>

        <!-- Hình ảnh sản phẩm -->
        <n-card title="Hình ảnh sản phẩm">
          <n-space vertical>
            <div v-if="product.image && product.image.length > 0" class="flex gap-4 flex-wrap">
              <div v-for="(image, index) in product.image" :key="index" class="relative">
                <n-image
                  :src="image"
                  width="140"
                  height="140"
                  object-fit="cover"
                  preview-disabled
                  class="rounded border border-gray-200"
                />
                <n-button
                  quaternary
                  circle
                  type="error"
                  size="small"
                  class="absolute -top-2 -right-2"
                  @click="removeImage(index)"
                >
                  <template #icon>
                    <n-icon><TrashOutline /></n-icon>
                  </template>
                </n-button>
              </div>
            </div>
            <n-upload multiple :default-upload="false" @change="handleImageUpload">
              <n-upload-dragger>
                <div class="flex flex-col items-center">
                  <n-icon size="48" :depth="3">
                    <CloudUploadOutline />
                  </n-icon>
                  <n-text style="margin-top: 8px"> Click hoặc kéo thả hình ảnh vào đây </n-text>
                  <n-p depth="3" style="margin: 8px 0 0 0"> PNG, JPG, GIF tối đa 2MB </n-p>
                </div>
              </n-upload-dragger>
            </n-upload>
          </n-space>
        </n-card>

        <!-- Phân loại sản phẩm -->
        <n-card title="Phân loại sản phẩm">
          <n-space vertical>
            <div class="flex items-start mb-4">
              <div class="flex items-center h-5">
                <n-checkbox v-model:checked="hasVariants" />
              </div>
              <div class="ml-3 text-sm">
                <n-text>Sản phẩm có nhiều phân loại</n-text>
                <n-p depth="3">
                  Chọn nếu sản phẩm có nhiều phiên bản như kích thước, màu sắc, trọng lượng...
                </n-p>
              </div>
            </div>

            <!-- Phân loại sản phẩm -->
            <div v-if="hasVariants">
              <div class="mb-4">
                <n-text>Phân loại</n-text>
                <div class="flex flex-wrap gap-2 mt-2">
                  <n-tag
                    v-for="(value, index) in variantValues"
                    :key="index"
                    closable
                    @close="removeVariantValue(index)"
                  >
                    {{ value }}
                  </n-tag>
                  <n-input-group>
                    <n-input
                      v-model:value="newVariantValue"
                      @keyup.enter="addVariantValue"
                      placeholder="Thêm giá trị"
                      size="small"
                    />
                    <n-button type="primary" @click="addVariantValue" size="small">
                      <template #icon>
                        <n-icon><AddOutline /></n-icon>
                      </template>
                    </n-button>
                  </n-input-group>
                </div>
              </div>

              <!-- Bảng phân loại -->
              <div v-if="hasVariantValues" class="mt-4">
                <n-text>Danh sách phân loại</n-text>
                <n-data-table
                  :columns="variantColumns"
                  :data="productVariants"
                  :bordered="false"
                  class="mt-2"
                />
              </div>
            </div>

            <!-- Thông tin giá và kho nếu không có phân loại -->
            <div v-if="!hasVariants">
              <n-grid :cols="24" :x-gap="24">
                <!-- Giá bán -->
                <n-form-item-gi :span="8" label="Giá bán (₫)" required>
                  <n-input v-model:value="formattedPrice" placeholder="0" />
                </n-form-item-gi>

                <!-- Giá khuyến mãi -->
                <n-form-item-gi :span="8" label="Giá khuyến mãi (₫)">
                  <n-input v-model:value="formattedSalePrice" placeholder="0" />
                </n-form-item-gi>

                <!-- Số lượng tồn kho -->
                <n-form-item-gi :span="8" label="Tồn kho" required>
                  <n-input-number v-model:value="product.stock" placeholder="0" :min="0" />
                </n-form-item-gi>

                <!-- Mã SKU -->
                <n-form-item-gi :span="8" label="Mã SKU" required>
                  <n-input v-model:value="product.sku" placeholder="VD: YS-NC-001" />
                </n-form-item-gi>
              </n-grid>
            </div>
          </n-space>
        </n-card>
      </div>
    </n-spin>
    <div class="flex justify-end mt-4">
      <n-button type="primary" @click="saveProduct" :loading="isLoading">
        {{ isLoading ? 'Đang lưu...' : isEditMode ? 'Lưu thay đổi' : 'Thêm sản phẩm' }}
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NButton,
  NCard,
  NSpin,
  NForm,
  NFormItemGi,
  NInput,
  NInputNumber,
  NSelect,
  NGrid,
  NSpace,
  NText,
  NP,
  NDataTable,
  NImage,
  NIcon,
  NUpload,
  NUploadDragger,
  NInputGroup,
  NTag,
  NCheckbox,
  useMessage,
} from 'naive-ui'
import { TrashOutline, CloudUploadOutline, AddOutline } from '@vicons/ionicons5'
import apiClient from '@/utils/axios'
import QuillEditor from '@/components/QuillEditor.vue'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const loading = ref(true)
const isLoading = ref(false)
const productId = ref(route.params.id)
console.log(productId.value)

// Xác định mode thêm/sửa dựa trên route
const isEditMode = computed(() => !!route.params.id)

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

// Dữ liệu sản phẩm
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
  status: 'active',
  image: [],
  imageFiles: [],
})

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

// Danh mục sản phẩm
const categories = ref([])
const currentSubCategory = ref([])

const currentCategory = (id) => {
  const category = categories.value.find((item) => item._id === id)
  if (category && category.children) {
    currentSubCategory.value = category.children
  } else {
    currentSubCategory.value = []
  }
}

// Quản lý phân loại sản phẩm
const hasVariants = ref(false)
const variantValues = ref([])
const newVariantValue = ref('')
const variantInputs = ref([])

// Định nghĩa cột cho bảng phân loại
const variantColumns = [
  { title: 'Phân loại', key: 'name' },
  {
    title: 'SKU',
    key: 'sku',
    render: (row) => {
      return h(NInput, {
        value: row.sku,
        onUpdateValue: (value) => {
          row.sku = value
        },
        placeholder: `SKU-${row.name}`,
      })
    },
  },
  {
    title: 'Giá (₫)',
    key: 'formattedPrice',
    render: (row) => {
      return h(NInput, {
        value: row.formattedPrice,
        onUpdateValue: (value) => {
          row.formattedPrice = value
        },
        placeholder: '0',
      })
    },
  },
  {
    title: 'Giá cũ (₫)',
    key: 'formattedOldPrice',
    render: (row) => {
      return h(NInput, {
        value: row.formattedOldPrice,
        onUpdateValue: (value) => {
          row.formattedOldPrice = value
        },
        placeholder: '0',
      })
    },
  },
  {
    title: 'Tồn kho',
    key: 'stock',
    render: (row) => {
      return h(NInputNumber, {
        value: row.stock,
        onUpdateValue: (value) => {
          row.stock = value
        },
        min: 0,
        placeholder: '0',
      })
    },
  },
]

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

// Kiểm tra xem có giá trị phân loại nào không
const hasVariantValues = computed(() => {
  return variantValues.value.length > 0
})

// Thêm watch để reset variantInputs khi tắt hasVariants
watch(hasVariants, (newValue) => {
  if (!newValue) {
    variantInputs.value = []
  }
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

// Xử lý tải lên hình ảnh
const handleImageUpload = (options) => {
  const { file } = options
  const reader = new FileReader()
  reader.onload = (e) => {
    // Kiểm tra số lượng ảnh không vượt quá 5
    if (!product.value.image) product.value.image = []
    if (!product.value.imageFiles) product.value.imageFiles = []

    if (product.value.image.length < 5) {
      product.value.image.push(e.target.result)
      product.value.imageFiles.push(file.file)
    } else {
      message.error('Bạn chỉ được tải lên tối đa 5 hình ảnh')
    }
  }
  reader.readAsDataURL(file.file)
}

// Thêm hàm xóa ảnh
const removeImage = (index) => {
  product.value.image.splice(index, 1)
  if (product.value.imageFiles) {
    product.value.imageFiles.splice(index, 1)
  }
}

// Quay lại trang danh sách
const goBack = () => {
  router.back()
}

// Lấy dữ liệu sản phẩm nếu đang ở chế độ chỉnh sửa
const fetchProduct = async () => {
  if (!isEditMode.value) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const response = await apiClient.get(`/admin/product/id/${productId.value}`)

    const productData = response.data.data
    console.log(productData)

    // Cập nhật dữ liệu vào form
    product.value = {
      ...productData,
      price: productData.variants?.[0]?.price || 0,
      salePrice: productData.variants?.[0]?.oldPrice || 0,
      stock: productData.variants?.[0]?.stock || 0,
      sku: productData.variants?.[0]?.sku || '',
      image: productData.images || [],
      status: productData.status || 'active',
      categoryId: productData.category?.[0]?._id || '',
      subCategoryId: productData.category?.[1]?._id || '',
    }

    // Nếu sản phẩm có nhiều phân loại
    if (productData.variants && productData.variants.length > 1) {
      hasVariants.value = true

      // Trích xuất các giá trị phân loại
      const variantNames = productData.variants.map((v) => v.name || '')

      // Lọc các giá trị không rỗng và không trùng lặp
      variantValues.value = [...new Set(variantNames.filter((name) => name))]

      // Chuẩn bị dữ liệu variants
      variantInputs.value = productData.variants.map((v) => ({
        name: v.name || '',
        sku: v.sku || '',
        price: v.price || 0,
        oldPrice: v.oldPrice || 0,
        stock: v.stock || 0,
        formattedPrice: formatCurrency(v.price || 0),
        formattedOldPrice: formatCurrency(v.oldPrice || 0),
      }))
    }

    if (productData.categoryId) {
      currentCategory(productData.categoryId)
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    message.error('Không thể tải thông tin sản phẩm')
  } finally {
    loading.value = false
  }
}

// Lưu sản phẩm
const saveProduct = async () => {
  try {
    isLoading.value = true

    // Validate variants
    if (hasVariants.value) {
      // Kiểm tra xem đã nhập đủ thông tin cho variants chưa
      const invalidVariants = variantInputs.value.some(
        (variant) =>
          !variant.sku || !variant.price || variant.stock === undefined || variant.stock === '',
      )
      if (invalidVariants) {
        message.error(
          'Vui lòng nhập đầy đủ mã SKU, giá bán và số lượng tồn kho cho tất cả phân loại',
        )
        isLoading.value = false
        return
      }

      // Kiểm tra SKU trùng lặp
      const skus = variantInputs.value.map((variant) => variant.sku)
      const uniqueSkus = [...new Set(skus)]

      if (skus.length !== uniqueSkus.length) {
        // Tìm các SKU trùng lặp
        const duplicateSkus = skus.filter((sku, index) => skus.indexOf(sku) !== index)
        message.error(
          `Phát hiện mã SKU trùng lặp: ${duplicateSkus.join(', ')}. Vui lòng sử dụng mã SKU khác nhau cho mỗi phân loại.`,
        )
        isLoading.value = false
        return
      }
    }

    const formData = new FormData()

    if (isEditMode.value) {
      //   formData.append('_id', productId.value)
    }

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

    formData.append('variants', JSON.stringify(variantsToAdd))

    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }
    let response
    if (isEditMode.value) {
      // Nếu là chỉnh sửa, gọi API PUT
      response = await apiClient.put(`/admin/product/${productId.value}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      message.success('Cập nhật sản phẩm thành công')
    } else {
      // Nếu là thêm mới, gọi API POST
      response = await apiClient.post('/admin/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      message.success('Thêm sản phẩm thành công')
    }

    // Chuyển về trang danh sách sản phẩm
    router.push('/admin/dashboard/products')
  } catch (error) {
    console.error('Error saving product:', error)
    message.error(
      'Có lỗi xảy ra khi lưu sản phẩm: ' + (error.response?.data?.message || error.message),
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

  // Fetch product data if in edit mode
  await fetchProduct()
})
</script>

<style>
.n-upload-dragger {
  height: 140px !important;
}
</style>
