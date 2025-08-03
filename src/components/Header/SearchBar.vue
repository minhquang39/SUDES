<template>
  <div class="w-full relative">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Tìm sản phẩm..."
      class="w-10/12 lg:w-11/12 bg-white outline-0 px-2 h-[40px] rounded-l-[4px]"
      @focus="showSuggestions"
      @blur="hideSuggestions"
      @input="debouncedSearch"
    />
    <button
      class="absolute h-[40px] w-2/12 lg:w-1/12 bg-[#fdc97d] inline-flex items-center justify-center rounded-r-[4px]"
      @click="searchProducts"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        ></path>
      </svg>
    </button>

    <!-- Suggestion Box -->
    <div
      v-if="isShowSuggestions"
      class="absolute z-50 top-full left-0 w-full bg-white border border-gray-200 rounded shadow-lg"
    >
      <div v-if="isSearching" class="p-4 text-center">
        <div
          class="inline-block animate-spin rounded-full h-6 w-6 border-2 border-t-[#fdc97d] border-r-[#fdc97d] border-b-transparent border-l-transparent"
        ></div>
        <p class="mt-2 text-gray-500">Đang tìm kiếm...</p>
      </div>

      <div v-else-if="error" class="p-4 text-center text-red-500">
        {{ error }}
      </div>

      <div v-else class="suggestion-products">
        <router-link
          v-for="(product, index) in products"
          :key="index"
          :to="`/${product.slug}`"
          class="product-item p-3 border-t border-gray-200 flex items-center"
        >
          <div class="w-16 h-16 bg-gray-100 mr-3 flex items-center justify-center overflow-hidden">
            <img
              v-if="product?.images && product.images.length > 0"
              :src="product.images[0]"
              alt="Sản phẩm"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-xs text-gray-500">Không có ảnh</span>
          </div>
          <div class="flex-1">
            <div class="font-medium">{{ product?.name || 'Sản phẩm không tên' }}</div>
            <div class="flex items-center">
              <span class="text-[#ffa500] font-bold">{{
                formatPrice(
                  product?.variants && product.variants.length > 0
                    ? product.variants[0].price
                    : null,
                )
              }}</span>
              <span
                v-if="
                  product?.variants && product.variants.length > 0 && product.variants[0].oldPrice
                "
                class="text-gray-400 line-through ml-2 text-sm"
                >{{ formatPrice(product.variants[0].oldPrice) }}</span
              >
            </div>
          </div>
        </router-link>
        <div v-if="products.length === 0" class="p-4 text-center text-gray-500">
          Không tìm thấy sản phẩm phù hợp
        </div>
        <div class="p-3 text-center border-t border-gray-200">
          <router-link
            :to="`/search?search=${encodeURIComponent(searchQuery)}`"
            class="text-blue-600 hover:underline"
            >Xem tất cả kết quả »</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import apiClient from '@/utils/axios'

export default {
  setup() {
    const isShowSuggestions = ref(false)
    const searchQuery = ref('')
    const isSearching = ref(false)
    const products = ref([])
    const error = ref(null)
    let searchTimeout = null

    const showSuggestions = () => {
      isShowSuggestions.value = true
      // Tự động tìm kiếm nếu có nhập liệu
      if (searchQuery.value && searchQuery.value.trim().length > 0 && products.value.length === 0) {
        searchProducts()
      }
    }

    const hideSuggestions = () => {
      setTimeout(() => {
        isShowSuggestions.value = false
      }, 200)
    }

    // Hàm debounce cho tìm kiếm
    const debouncedSearch = () => {
      // Chỉ tìm kiếm khi có ít nhất 2 ký tự
      if (!searchQuery.value || searchQuery.value.trim().length < 2) {
        return
      }

      isSearching.value = true
      error.value = null

      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }

      searchTimeout = setTimeout(() => {
        searchProducts()
      }, 500)
    }

    const searchProducts = async () => {
      // Nếu không có từ khóa tìm kiếm, không làm gì cả
      if (!searchQuery.value || searchQuery.value.trim().length === 0) {
        isSearching.value = false
        return
      }

      isSearching.value = true
      error.value = null

      try {
        console.log('Searching for:', searchQuery.value)
        const response = await apiClient.get(
          `/admin/product?search=${encodeURIComponent(searchQuery.value.trim())}`,
        )

        console.log('API Response:', response)

        if (response.data && response.data.data) {
          products.value = response.data.data.product.slice(0, 5)
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

    const formatPrice = (price) => {
      if (!price) return '0đ'
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
    }

    // Dọn dẹp khi component bị hủy
    onBeforeUnmount(() => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    })

    return {
      showSuggestions,
      hideSuggestions,
      isShowSuggestions,
      searchQuery,
      products,
      debouncedSearch,
      searchProducts,
      isSearching,
      formatPrice,
      error,
    }
  },
}
</script>

<style scoped>
@media (max-width: 640px) {
  .product-item {
    padding: 8px;
  }

  .product-item .font-medium {
    font-size: 14px;
  }
}
</style>
