<template>
  <div class="p-4">
    <!-- Header với nút thêm -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-blue-800">Quản lý sản phẩm</h1>
      <n-button type="primary" @click="handleAddProduct">
        <template #icon>
          <n-icon><AddOutline /></n-icon>
        </template>
        Thêm sản phẩm
      </n-button>
    </div>

    <!-- Bộ lọc -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <n-select
        v-model:value="selectedCategory"
        filterable
        clearable
        placeholder="Chọn danh mục cha"
        :options="categoryOptions"
        @update:value="handleCategoryChange"
      />

      <n-select
        v-model:value="selectedSubCategory"
        filterable
        clearable
        placeholder="Chọn danh mục con"
        :options="subCategoryOptions"
        :disabled="!selectedCategory"
      />

      <n-input-group>
        <n-input
          v-model:value="searchText"
          placeholder="Tìm kiếm sản phẩm..."
          clearable
          @keyup.enter="handleSearch"
        />
        <n-button type="primary" @click="handleSearch">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </template>
        </n-button>
      </n-input-group>
    </div>

    <n-data-table
      :columns="columns"
      :data="filteredData"
      :pagination="pagination"
      :row-key="rowKey"
      :loading="loading"
      class="mt-4"
      :scroll-x="1200"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NButton, NDataTable, NIcon, NPopconfirm, NSelect, NInput, NInputGroup } from 'naive-ui'
import { TrashOutline, AddOutline, EyeOutline, PencilOutline, SearchSharp } from '@vicons/ionicons5'
import apiClient from '@/utils/axios'

// Hàm định dạng tiền với dấu chấm phân cách hàng nghìn
function formatCurrency(amount) {
  if (!amount && amount !== 0) return ''
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫'
}

function createColumns({ handleViewProduct, handleEditProduct, handleDeleteProduct }) {
  return [
    {
      type: 'expand',
      width: 40,
      fixed: 'left',
      renderExpand: (row) => {
        return h('div', { class: 'p-4 bg-gray-50' }, [
          h('h3', { class: 'text-lg font-medium mb-3' }, 'Các phân loại sản phẩm'),
          row.variants && row.variants.length > 0
            ? h(
                'div',
                { class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' },
                row.variants.map((variant, index) => {
                  return h(
                    'div',
                    { class: 'p-3 bg-white rounded shadow-sm border border-gray-200' },
                    [
                      h('div', { class: 'flex justify-between items-center mb-2' }, [
                        h('span', { class: 'font-semibold' }, `Phân loại ${index + 1}`),
                        h(
                          'span',
                          {
                            class:
                              variant.stock <= 10 ? 'text-red-500 font-medium' : 'text-green-600',
                          },
                          `Còn: ${variant.stock || 0}`,
                        ),
                      ]),
                      h('div', { class: 'grid grid-cols-2 gap-1 text-sm' }, [
                        h('div', [
                          h('span', { class: 'text-gray-500' }, 'Giá: '),
                          h(
                            'span',
                            { class: 'font-medium text-red-600' },
                            formatCurrency(variant.price),
                          ),
                        ]),
                        variant.oldPrice > 0 &&
                          h('div', [
                            h('span', { class: 'text-gray-500' }, 'Giá gốc: '),
                            h(
                              'span',
                              { class: 'line-through text-gray-400' },
                              formatCurrency(variant.oldPrice),
                            ),
                          ]),
                        variant.sku &&
                          h('div', { class: 'col-span-2' }, [
                            h('span', { class: 'text-gray-500' }, 'SKU: '),
                            h('span', {}, variant.sku),
                          ]),
                      ]),
                    ],
                  )
                }),
              )
            : h('p', { class: 'text-gray-500' }, 'Sản phẩm không có phân loại'),
        ])
      },
    },
    {
      title: 'Product',
      key: 'product',
      width: 250,
      ellipsis: {
        tooltip: true,
      },
      render(row) {
        return h('div', { class: 'flex items-center gap-2' }, [
          h('img', {
            src: row.images?.[0] || '',
            alt: row.name,
            class: 'w-12 h-12 rounded-md object-cover',
          }),
          h('div', { class: 'flex flex-col' }, [
            h('span', { class: 'font-semibold' }, row.name),
            h(
              'span',
              {
                class: 'text-xs text-gray-500',
              },
              row.variants && row.variants.length > 1
                ? `${row.variants.length} phân loại`
                : 'Sản phẩm đơn',
            ),
          ]),
        ])
      },
    },
    {
      title: 'Category',
      key: 'category',
      align: 'center',
      width: 120,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'Sub Category',
      key: 'subCategory',
      align: 'center',
      width: 120,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'Price',
      key: 'price',
      align: 'center',
      width: 130,
      render(row) {
        // Lấy giá thấp nhất và cao nhất nếu có nhiều variants
        if (row.variants && row.variants.length > 1) {
          const prices = row.variants.map((v) => parseFloat(v.price || 0))
          const minPrice = Math.min(...prices)
          const maxPrice = Math.max(...prices)

          if (minPrice === maxPrice) {
            return h('div', { class: 'flex flex-col items-center' }, [
              h('span', { class: 'font-semibold text-red-600' }, `${formatCurrency(minPrice)}`),
            ])
          } else {
            return h('div', { class: 'flex flex-col items-center' }, [
              h(
                'span',
                { class: 'font-semibold text-red-600' },
                `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`,
              ),
            ])
          }
        }

        // Trường hợp một variant
        return h('div', { class: 'flex flex-col items-center' }, [
          h(
            'span',
            { class: 'font-semibold text-red-600' },
            `${formatCurrency(row.variants?.[0]?.price || 0)}`,
          ),
          row.variants?.[0]?.oldPrice
            ? h(
                'span',
                { class: 'line-through text-gray-400 text-sm' },
                formatCurrency(row.variants?.[0]?.oldPrice),
              )
            : null,
        ])
      },
    },
    {
      title: 'Stock',
      key: 'stock',
      align: 'center',
      width: 80,
      render(row) {
        // Tính tổng số lượng từ tất cả các variants
        if (row.variants && row.variants.length > 0) {
          const totalStock = row.variants.reduce(
            (sum, variant) => sum + (parseInt(variant.stock) || 0),
            0,
          )
          return h(
            'span',
            {
              class: totalStock <= 10 ? 'text-red-500 font-medium' : 'text-gray-900',
            },
            totalStock,
          )
        }

        return h('span', {}, row.stock || 0)
      },
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      render(row) {
        return h('div', { class: 'flex justify-center gap-2' }, [
          h(
            NButton,
            {
              quaternary: true,
              circle: true,
              type: 'info',
              onClick: () => handleViewProduct(row),
            },
            { icon: () => h(EyeOutline) },
          ),
          h(
            NButton,
            {
              quaternary: true,
              circle: true,
              type: 'warning',
              onClick: () => handleEditProduct(row),
            },
            { icon: () => h(PencilOutline) },
          ),
          h(
            NPopconfirm,
            {
              onPositiveClick: () => handleDeleteProduct(row),
            },
            {
              default: () => 'Bạn có chắc muốn xóa sản phẩm này?',
              trigger: () =>
                h(
                  NButton,
                  {
                    quaternary: true,
                    circle: true,
                    type: 'error',
                  },
                  { icon: () => h(TrashOutline) },
                ),
            },
          ),
        ])
      },
    },
  ]
}

const data = ref([])

export default defineComponent({
  components: {
    NButton,
    NDataTable,
    NIcon,
    NPopconfirm,
    NSelect,
    NInput,
    NInputGroup,
  },
  setup() {
    const router = useRouter()
    const message = useMessage()
    const loading = ref(true)

    // Filter state
    const searchText = ref('')
    const selectedCategory = ref(null)
    const selectedSubCategory = ref(null)
    const categories = ref([])
    const originalData = ref([])

    // Filter options
    const categoryOptions = computed(() => {
      const uniqueCategories = [...new Set(originalData.value.map((item) => item.category))]
        .filter((category) => category && category !== 'N/A')
        .sort()

      return uniqueCategories.map((cat) => ({
        label: cat,
        value: cat,
      }))
    })

    const subCategoryOptions = computed(() => {
      if (!selectedCategory.value) return []

      const filteredItems = originalData.value.filter(
        (item) => item.category === selectedCategory.value,
      )
      const uniqueSubCategories = [...new Set(filteredItems.map((item) => item.subCategory))]
        .filter((subCategory) => subCategory && subCategory !== 'N/A')
        .sort()

      return uniqueSubCategories.map((subCat) => ({
        label: subCat,
        value: subCat,
      }))
    })

    // Filtered data based on search and selected categories
    const filteredData = computed(() => {
      let result = [...originalData.value]

      // Filter by category
      if (selectedCategory.value) {
        result = result.filter((item) => item.category === selectedCategory.value)
      }

      // Filter by sub-category
      if (selectedSubCategory.value) {
        result = result.filter((item) => item.subCategory === selectedSubCategory.value)
      }

      // Filter by search text
      if (searchText.value.trim()) {
        const searchLower = searchText.value.toLowerCase().trim()
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(searchLower) ||
            (item.sku && item.sku.toLowerCase().includes(searchLower)),
        )
      }

      return result
    })

    onMounted(async () => {
      try {
        loading.value = true
        const response = await apiClient.get('/admin/product')
        const rawData = response.data.data.product
        originalData.value = rawData.map((item, index) => ({
          ...item,
          category: item.category?.[0]?.name || 'N/A', // nếu là object
          subCategory: item.category?.[1]?.name || 'N/A',
          stock: item.variants?.[0]?.stock || item.defaultStock || 0,
        }))
        data.value = [...originalData.value]
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        loading.value = false
      }
    })

    function handleAddProduct() {
      router.push('/admin/dashboard/product/new')
    }

    function handleEditProduct(row) {
      router.push(`/admin/dashboard/product/edit/${row._id}`)
    }

    function handleViewProduct(row) {
      const slug = row.slug || row.seo?.slug || row._id
      window.open(`http://localhost:5173/${slug}`, '_blank')
    }

    async function handleDeleteProduct(row) {
      try {
        loading.value = true
        // Gọi API xóa sản phẩm
        await apiClient.delete(`/admin/product/${row._id}`)
        // Xóa sản phẩm khỏi danh sách hiện tại
        originalData.value = originalData.value.filter((item) => item._id !== row._id)
        data.value = [...originalData.value]
        message.success('Xóa sản phẩm thành công')
      } catch (error) {
        console.error('Error deleting product:', error)
        message.error('Xóa sản phẩm thất bại')
      } finally {
        loading.value = false
      }
    }

    function handleCategoryChange(value) {
      // Reset sub-category when main category changes
      selectedSubCategory.value = null
    }

    function handleSearch() {
      // Implement any additional search logic if needed
      console.log('Searching for:', searchText.value)
    }

    return {
      data,
      columns: createColumns({ handleViewProduct, handleEditProduct, handleDeleteProduct }),
      pagination: {
        pageSize: 5,
      },
      rowKey: (row) => row._id,
      handleAddProduct,
      handleEditProduct,
      handleViewProduct,
      loading,
      // Filter-related
      searchText,
      selectedCategory,
      selectedSubCategory,
      categoryOptions,
      subCategoryOptions,
      filteredData,
      handleCategoryChange,
      handleSearch,
    }
  },
})
</script>
