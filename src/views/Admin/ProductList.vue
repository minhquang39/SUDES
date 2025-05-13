<template>
  <div class="product-list">
    <div class="header-actions">
      <h1>Products</h1>
      <n-button type="primary" @click="addProduct">ADD PRODUCT</n-button>
    </div>

    <n-card class="filters-card">
      <div class="filters">
        <div class="filter-group">
          <div class="filter-label">Category By</div>
          <n-select
            v-model:value="filters.category"
            :options="categoryOptions"
            clearable
            placeholder=""
          />
        </div>
        <div class="filter-group">
          <div class="filter-label">Sub Category By</div>
          <n-select
            v-model:value="filters.subCategory"
            :options="subCategoryOptions"
            clearable
            placeholder=""
          />
        </div>
        <div class="filter-group">
          <div class="filter-label">Third Level Sub Category By</div>
          <n-select
            v-model:value="filters.thirdCategory"
            :options="thirdCategoryOptions"
            clearable
            placeholder=""
          />
        </div>
        <div class="filter-group search">
          <n-input v-model:value="searchQuery" placeholder="Search here..." clearable>
            <template #prefix>
              <n-icon><SearchOutline /></n-icon>
            </template>
          </n-input>
        </div>
      </div>
    </n-card>

    <n-data-table
      :columns="columns"
      :data="products"
      :pagination="pagination"
      :row-key="rowKey"
      :bordered="false"
      class="product-table"
    />

    <div class="pagination-footer">
      <div>
        Rows per page:
        <n-select v-model:value="pagination.pageSize" :options="pageSizeOptions" size="small" />
      </div>
      <div>{{ paginationInfo }}</div>
      <div class="page-controls">
        <n-button quaternary circle @click="prevPage" :disabled="pagination.page <= 1">
          <template #icon><ChevronBackOutline /></template>
        </n-button>
        <n-button quaternary circle @click="nextPage" :disabled="pagination.page >= totalPages">
          <template #icon><ChevronForwardOutline /></template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NSelect, NCard, NDataTable, NInput, NIcon, NImage, NRate, NTag } from 'naive-ui'
import {
  SearchOutline,
  ChevronBackOutline,
  ChevronForwardOutline,
  PencilOutline,
  EyeOutline,
  TrashOutline,
} from '@vicons/ionicons5'

const router = useRouter()

// Filters
const filters = ref({
  category: null,
  subCategory: null,
  thirdCategory: null,
})

const searchQuery = ref('')

// Options for filters
const categoryOptions = [
  { label: 'Wellness', value: 'wellness' },
  { label: 'Beauty', value: 'beauty' },
  { label: 'Healthcare', value: 'healthcare' },
]

const subCategoryOptions = [
  { label: 'Mobiles', value: 'mobiles' },
  { label: 'Supplements', value: 'supplements' },
  { label: 'Skincare', value: 'skincare' },
]

const thirdCategoryOptions = [
  { label: 'Protein', value: 'protein' },
  { label: 'Vitamins', value: 'vitamins' },
  { label: 'Herbs', value: 'herbs' },
]

// Table columns
const columns = [
  {
    title: 'PRODUCT',
    key: 'product',
    render(row) {
      return h('div', { class: 'product-cell' }, [
        h(NImage, {
          width: 64,
          height: 64,
          src: row.image,
          objectFit: 'cover',
        }),
        h('div', { class: 'product-info' }, [
          h('div', { class: 'product-name' }, row.name),
          h('div', { class: 'product-brand' }, row.brand),
        ]),
      ])
    },
  },
  {
    title: 'CATEGORY',
    key: 'category',
  },
  {
    title: 'SUB CATEGORY',
    key: 'subCategory',
  },
  {
    title: 'PRICE',
    key: 'price',
    render(row) {
      return h('div', { class: 'price-cell' }, [
        h('div', { class: 'original-price' }, `₹${row.originalPrice.toFixed(2)}`),
        h('div', { class: 'current-price' }, `₹${row.currentPrice.toFixed(2)}`),
      ])
    },
  },
  {
    title: 'SALES',
    key: 'sales',
    render(row) {
      return h('div', {}, `${row.salesCount} sale`)
    },
  },
  {
    title: 'STOCK',
    key: 'stock',
    render(row) {
      return h('div', { class: 'stock-cell' }, row.stock)
    },
  },
  {
    title: 'RATING',
    key: 'rating',
    render(row) {
      return h(NRate, {
        value: row.rating,
        readonly: true,
        allowHalf: true,
        count: 5,
      })
    },
  },
  {
    title: 'ACTION',
    key: 'actions',
    render(row) {
      return h('div', { class: 'action-buttons' }, [
        h(
          NButton,
          {
            quaternary: true,
            circle: true,
            onClick: () => editProduct(row.id),
          },
          {
            icon: () => h(NIcon, null, { default: () => h(PencilOutline) }),
          },
        ),
        h(
          NButton,
          {
            quaternary: true,
            circle: true,
            onClick: () => viewProduct(row.id),
          },
          {
            icon: () => h(NIcon, null, { default: () => h(EyeOutline) }),
          },
        ),
        h(
          NButton,
          {
            quaternary: true,
            circle: true,
            onClick: () => deleteProduct(row.id),
          },
          {
            icon: () => h(NIcon, null, { default: () => h(TrashOutline) }),
          },
        ),
      ])
    },
  },
]

// Sample data
const products = ref([
  {
    id: 1,
    name: 'Protinex Powder - Rich Chocolate Flavour (Jar) 400...',
    brand: 'Protinex',
    category: 'Wellness',
    subCategory: 'Mobiles',
    originalPrice: 450.0,
    currentPrice: 550.0,
    salesCount: 2,
    stock: 8476,
    rating: 4,
    image: 'https://via.placeholder.com/64',
  },
  {
    id: 2,
    name: "VitaGreen Wheat Grass Capsules 60's...",
    brand: 'VitaGreen',
    category: 'Wellness',
    subCategory: 'Mobiles',
    originalPrice: 150.0,
    currentPrice: 199.0,
    salesCount: 5,
    stock: 4780,
    rating: 4,
    image: 'https://via.placeholder.com/64',
  },
  {
    id: 3,
    name: 'New Clean & Clear Pimple Clearing Face Wash With S...',
    brand: 'Clean & Clear',
    category: 'Wellness',
    subCategory: 'Mobiles',
    originalPrice: 299.0,
    currentPrice: 320.0,
    salesCount: 0,
    stock: 2505,
    rating: 4,
    image: 'https://via.placeholder.com/64',
  },
  {
    id: 4,
    name: "Vitawin Grape Seed Capsule 60's...",
    brand: 'VITAWIN',
    category: 'Wellness',
    subCategory: 'Mobiles',
    originalPrice: 650.0,
    currentPrice: 699.0,
    salesCount: 1,
    stock: 8547,
    rating: 4,
    image: 'https://via.placeholder.com/64',
  },
  {
    id: 5,
    name: 'Inlife Super Reds Powder 200 g...',
    brand: 'Inlife',
    category: 'Wellness',
    subCategory: 'Mobiles',
    originalPrice: 240.0,
    currentPrice: 249.0,
    salesCount: 0,
    stock: 8595,
    rating: 4,
    image: 'https://via.placeholder.com/64',
  },
])

// Pagination
const pagination = ref({
  page: 1,
  pageSize: 50,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  pageCount: 3,
})

const pageSizeOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
]

const totalItems = 100
const totalPages = computed(() => Math.ceil(totalItems / pagination.value.pageSize))

const paginationInfo = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize + 1
  const end = Math.min(start + pagination.value.pageSize - 1, totalItems)
  return `${start}–${end} of ${totalItems}`
})

// Row key
const rowKey = (row) => row.id

// Actions
function addProduct() {
  router.push('/admin/product/add')
}

function editProduct(id) {
  router.push(`/admin/product/edit/${id}`)
}

function viewProduct(id) {
  router.push(`/admin/product/view/${id}`)
}

function deleteProduct(id) {
  // Implement delete logic
  console.log('Delete product', id)
}

function prevPage() {
  if (pagination.value.page > 1) {
    pagination.value.page--
  }
}

function nextPage() {
  if (pagination.value.page < totalPages.value) {
    pagination.value.page++
  }
}
</script>

<style scoped>
.product-list {
  padding: 16px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-actions h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.filters-card {
  margin-bottom: 16px;
}

.filters {
  display: flex;
  gap: 16px;
}

.filter-group {
  flex: 1;
}

.filter-label {
  font-weight: 500;
  margin-bottom: 8px;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-weight: 500;
}

.product-brand {
  color: #666;
  font-size: 0.9em;
}

.price-cell {
  display: flex;
  flex-direction: column;
}

.original-price {
  text-decoration: line-through;
  color: #888;
  font-size: 0.9em;
}

.current-price {
  color: #1677ff;
  font-weight: 500;
}

.stock-cell {
  color: #1677ff;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.page-controls {
  display: flex;
  gap: 8px;
}
</style>
