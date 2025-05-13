<template>
  <div class="bg-primaryBg px-[14px] lg:px-11 xl:px-30 py-4 lg:py-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-xl sm:text-2xl font-bold mb-3 lg:mb-4">
        Kết quả tìm kiếm: {{ searchQuery }} ({{ totalProducts }} sản phẩm)
      </h1>

      <!-- Loading state -->
      <div v-if="isSearching" class="p-4 sm:p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-t-[#fdc97d] border-r-[#fdc97d] border-b-transparent border-l-transparent"
        ></div>
        <p class="mt-2 text-gray-500">Đang tìm kiếm...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="p-4 sm:p-8 text-center text-red-500">
        {{ error }}
      </div>

      <!-- No results -->
      <div v-else-if="products.length === 0" class="p-4 sm:p-8 text-center">
        <p class="text-gray-500">Không tìm thấy sản phẩm phù hợp với từ khóa "{{ searchQuery }}"</p>
      </div>

      <!-- Product grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
      >
        <router-link
          v-for="(product, index) in products"
          :key="index"
          :to="`/${product.slug}`"
          class="product-card-container"
        >
          <ProductCard :product="product" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/utils/axios'
import ProductCard from '@/components/Body/ProductCard.vue'
export default {
  components: {
    ProductCard,
  },
  setup() {
    const route = useRoute()
    const searchQuery = ref('')
    const isSearching = ref(false)
    const products = ref([])
    const error = ref(null)
    const totalProducts = ref(0)

    // Hàm để trích xuất từ khóa tìm kiếm từ URL
    const extractSearchQuery = () => {
      const query = route.query.search
      if (query) {
        searchQuery.value = decodeURIComponent(query)
        searchProducts()
      } else {
        searchQuery.value = ''
        products.value = []
      }
    }

    // Hàm gọi API tìm kiếm sản phẩm
    const searchProducts = async () => {
      if (!searchQuery.value || searchQuery.value.trim().length === 0) {
        return
      }

      isSearching.value = true
      error.value = null

      try {
        const response = await apiClient.get(
          `/admin/product?search=${encodeURIComponent(searchQuery.value.trim())}`,
        )
        console.log(response.data.data)
        if (response.data && response.data.data) {
          products.value = response.data.data.product
          totalProducts.value = response.data.data.pagination.total
        } else {
          products.value = []
        }
      } catch (err) {
        console.error('API Search Error:', err)
        error.value = `Lỗi khi tìm kiếm: ${err.message || 'Không xác định'}`
        products.value = []
      } finally {
        isSearching.value = false
      }
    }

    // Định dạng giá thành chuỗi dễ đọc
    const formatPrice = (price) => {
      if (!price) return '0đ'
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
    }

    // Khởi tạo khi component được mount
    onMounted(() => {
      extractSearchQuery()
    })

    // Theo dõi sự thay đổi của route để cập nhật kết quả tìm kiếm
    watch(
      () => route.query.search,
      () => {
        extractSearchQuery()
      },
    )

    return {
      searchQuery,
      isSearching,
      products,
      error,
      formatPrice,
      totalProducts,
    }
  },
}
</script>

<style scoped>
.product-card-container {
  display: block;
  height: 100%;
  transition: transform 0.2s;
}

.product-card-container:active {
  transform: scale(0.98);
}

@media (max-width: 640px) {
  .product-card-container {
    /* Make sure product cards fit perfectly on mobile */
    height: auto;
  }
}
</style>
