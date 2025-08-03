<template>
  <div v-if="isLoading">
    <CategoryDetailSkeleton />
  </div>
  <div v-else>
    <BreadCrumb />
    <div class="bg-primaryBg px-[14px] lg:px-11 xl:px-30 py-6">
      <CategoryDetailSkeleton v-if="isLoading" />
      <div>
        <img
          src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/collection_banner.jpg?1739018973665"
          alt=""
        />
      </div>
      <div class="text-center mt-4">
        <b class="text-2xl font-bold text-[#333]">Tất cả sản phẩm</b>
        <div class="my-5">
          <TwoSquareSeperate />
        </div>
      </div>
      <div
        v-if="categories"
        class="flex md:flex-wrap gap-4 md:justify-center text-center overflow-x-auto scroll-smooth"
      >
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/danh-muc/${category.slug}`"
          class="font-[600] text-[#333] text-[13px] md:text-[16px] py-1 px-3 md:px-5 md:py-1 border border-black relative btn-category hover:bg-mainColor hover:text-white cursor-pointer flex-shrink-0 min-w-[90px] md:min-w-[120px] text-center"
        >
          {{ category.name }}
        </router-link>
      </div>
      <p class="text-center text-[#333] text-[16px] mt-4">
        <b>Sudes Nest</b> đến nay đã chiếm trọn niềm tin của khách hàng bởi chất lượng - tinh tế -
        hợp khẩu vị trong từng dòng sản phẩm về Yến sào. <b>Sudes Nest</b> luôn mang đến cho quý
        khách hàng những sản phẩm chất lượng nhất - tốt nhất - tinh hoa nhất với đội ngũ chuyên gia
        nghiên cứu dinh dưỡng hàng đầu Việt Nam và luôn đầu tư dây chuyền sản xuất công nghệ cao,
        hiện đại, quy mô sản xuất lớn.
      </p>

      <!-- Sort cho mobile -->
      <div class="flex md:hidden justify-end py-2 mb-2">
        <button
          @click="showSort = true"
          class="flex items-center gap-2 bg-[#fdc97d] text-[#053024] px-4 py-2 rounded font-semibold shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-sort-alpha-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
            ></path>
            <path
              d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"
            ></path>
          </svg>
          Xếp theo
        </button>
      </div>

      <!-- Sort cho desktop -->
      <div class="hidden md:flex justify-end items-center gap-2 py-2 border-b-2 border-[#053024]">
        <h3 class="flex font-bold gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-sort-alpha-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
            ></path>
            <path
              d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"
            ></path>
          </svg>
          Xếp theo
        </h3>
        <ul class="flex gap-2">
          <li>
            <input
              class="hidden peer"
              type="radio"
              name="sort"
              id="default"
              value="default"
              v-model="sortType"
            />
            <label
              for="default"
              class="inline-flex items-center gap-1 cursor-pointer select-none before:content-[''] before:inline-block before:w-3 before:h-3 before:rotate-45 before:border before:border-[#053024] before:mr-1 before:transition-all peer-checked:before:bg-[#fdc97d] peer-checked:before:border-[#053024] font-semibold peer-checked:text-[#053024]"
            >
              Mặc định
            </label>
          </li>
          <li>
            <input
              class="hidden peer"
              type="radio"
              name="sort"
              id="az"
              value="az"
              v-model="sortType"
            />
            <label
              for="az"
              class="inline-flex items-center gap-1 cursor-pointer select-none before:content-[''] before:inline-block before:w-3 before:h-3 before:rotate-45 before:border before:border-[#053024] before:mr-1 before:transition-all peer-checked:before:bg-[#fdc97d] peer-checked:before:border-[#053024] font-semibold peer-checked:text-[#053024]"
            >
              Tên A-Z
            </label>
          </li>
          <li>
            <input
              class="hidden peer"
              type="radio"
              name="sort"
              id="za"
              value="za"
              v-model="sortType"
            />
            <label
              for="za"
              class="inline-flex items-center gap-1 cursor-pointer select-none before:content-[''] before:inline-block before:w-3 before:h-3 before:rotate-45 before:border before:border-[#053024] before:mr-1 before:transition-all peer-checked:before:bg-[#fdc97d] peer-checked:before:border-[#053024] font-semibold peer-checked:text-[#053024]"
            >
              Tên Z-A
            </label>
          </li>
          <li>
            <input
              class="hidden peer"
              type="radio"
              name="sort"
              id="price-asc"
              value="price-asc"
              v-model="sortType"
            />
            <label
              for="price-asc"
              class="inline-flex items-center gap-1 cursor-pointer select-none before:content-[''] before:inline-block before:w-3 before:h-3 before:rotate-45 before:border before:border-[#053024] before:mr-1 before:transition-all peer-checked:before:bg-[#fdc97d] peer-checked:before:border-[#053024] font-semibold peer-checked:text-[#053024]"
            >
              Giá tăng dần
            </label>
          </li>
          <li>
            <input
              class="hidden peer"
              type="radio"
              name="sort"
              id="price-desc"
              value="price-desc"
              v-model="sortType"
            />
            <label
              for="price-desc"
              class="inline-flex items-center gap-1 cursor-pointer select-none before:content-[''] before:inline-block before:w-3 before:h-3 before:rotate-45 before:border before:border-[#053024] before:mr-1 before:transition-all peer-checked:before:bg-[#fdc97d] peer-checked:before:border-[#053024] font-semibold peer-checked:text-[#053024]"
            >
              Giá giảm dần
            </label>
          </li>
        </ul>
      </div>

      <!-- Overlay sort cho mobile -->
      <div
        v-if="showSort"
        class="fixed inset-0 z-50 flex items-end md:hidden bg-black/40"
        @click.self="showSort = false"
      >
        <div class="w-full bg-white rounded-t-xl p-4">
          <div class="font-bold text-lg mb-4 text-[#053024]">Xếp theo</div>
          <ul>
            <li
              v-for="option in sortOptions"
              :key="option.value"
              @click="selectSort(option.value)"
              :class="[
                'px-4 py-3 mb-2 rounded text-center font-semibold cursor-pointer transition',
                sortType === option.value
                  ? 'bg-[#053024] text-white'
                  : 'bg-gray-100 text-[#053024] hover:bg-[#fdc97d]',
              ]"
            >
              {{ option.label }}
            </li>
          </ul>
          <button
            @click="showSort = false"
            class="w-full mt-2 py-2 rounded bg-gray-200 text-[#053024] font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
        <router-link
          v-for="product in sortedProducts.filter((p) => p.status === 'active')"
          :key="product.id"
          :to="`/${product.slug}`"
        >
          <ProductCard :product="product" />
        </router-link>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-2 mt-8">
        <button
          @click="handlePageChange(currentPage - 1)"
          :disabled="currentPage === 1"
          v-if="currentPage !== 1"
          class="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <<
        </button>

        <button
          v-for="page in totalPage"
          :key="page"
          @click="handlePageChange(page)"
          :class="[
            'px-4 py-2 border rounded-md hover:bg-gray-100',
            currentPage === page ? 'bg-mainColor text-white hover:bg-mainColor/90' : '',
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="handlePageChange(currentPage + 1)"
          :disabled="currentPage === totalPage"
          v-if="currentPage !== totalPage"
          class="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          >>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TwoSquareSeperate from '@/components/Icon/TwoSquareSeperate.vue'
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/utils/axios'
import ProductCard from '../../components/Body/ProductCard.vue'
import CategoryDetailSkeleton from '@/components/Skeleton/CategoryDetailSkeleton.vue'
const categories = ref([])
const products = ref([])
const currentPage = ref(1)
const totalPage = ref(1)
const limit = ref(10)
const sortType = ref('newest')
const showSort = ref(false)
const isLoading = ref(true)

// Các lựa chọn sắp xếp
const sortOptions = [
  { value: 'default', label: 'Mặc định' },
  { value: 'az', label: 'Tên A-Z' },
  { value: 'za', label: 'Tên Z-A' },
  { value: 'newest', label: 'Hàng mới' },
  { value: 'price-asc', label: 'Giá thấp đến cao' },
  { value: 'price-desc', label: 'Giá cao xuống thấp' },
]

// Hàm chọn sắp xếp từ mobile
const selectSort = (value) => {
  sortType.value = value
  showSort.value = false
}

const fetchProducts = async (page = 1) => {
  try {
    const response = await apiClient.get(`/admin/product?page=${page}&limit=${limit.value}`)
    products.value = response.data.data.product
    totalPage.value = response.data.data.pagination.totalPage
    currentPage.value = page
  } catch (error) {
    console.log(error)
  } finally {
  }
}

const handlePageChange = (page) => {
  fetchProducts(page)
}

const sortedProducts = computed(() => {
  let sorted = [...products.value]
  switch (sortType.value) {
    case 'az':
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' }))
      break
    case 'za':
      sorted.sort((a, b) => b.name.localeCompare(a.name, 'vi', { sensitivity: 'base' }))
      break
    case 'newest':
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'price-asc':
      sorted.sort((a, b) => {
        const priceA = a.variants?.[0]?.price ?? a.price ?? 0
        const priceB = b.variants?.[0]?.price ?? b.price ?? 0
        return priceA - priceB
      })
      break
    case 'price-desc':
      sorted.sort((a, b) => {
        const priceA = a.variants?.[0]?.price ?? a.price ?? 0
        const priceB = b.variants?.[0]?.price ?? b.price ?? 0
        return priceB - priceA
      })
      break
    default:
      break
  }
  return sorted
})

onMounted(async () => {
  window.scrollTo(0, 0, { behavior: 'smooth' })
  await new Promise((resolve) => setTimeout(resolve, 1500))
  try {
    isLoading.value = true
    const [category, product] = await Promise.all([
      apiClient.get('/admin/category/parent'),
      apiClient.get('/admin/product?page=1&limit=10'),
    ])
    categories.value = category.data.data
    products.value = product.data.data.product
    totalPage.value = product.data.data.pagination.totalPage
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.btn-category:hover::after {
  background-color: #fdc97d;
}

.btn-category::after {
  content: '';
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  left: -5px;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 1px solid #053024;
  z-index: 10;
}
</style>
