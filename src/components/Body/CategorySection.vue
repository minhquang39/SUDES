<template>
  <div class="py-[30px]">
    <h3 class="uppercase font-medium text-[#053024] text-center">{{ title }}</h3>
    <div class="flex justify-center">
      <TextRoboto :content="mainText" class="hover:text-hover cursor-pointer" />
    </div>
    <div class="py-4">
      <TwoSquareSeperate />
    </div>
    <div>
      <!-- Categories -->
      <div v-if="category" class="px-4 md:px-0">
        <!-- Scrollable categories on mobile -->
        <div
          class="flex justify-start md:justify-center items-center gap-4 overflow-x-auto pb-2 hide-scrollbar"
        >
          <div
            v-for="(subCategory, index) in firstFourCategories"
            :key="subCategory._id"
            class="p-1 bg-[#fdc97d] text-mainColor hover:text-white font-[500] hover:cursor-pointer hover:bg-mainColor relative category whitespace-nowrap flex-shrink-0"
            @click="currentIndex = index"
            :class="{ active: currentIndex === index }"
          >
            <div class="border border-white p-1 px-3">{{ subCategory.name }}</div>
          </div>
        </div>
        <!-- Products grid -->
        <div class="overflow-x-auto scroll-smooth hide-scrollbar">
          <div class="flex md:grid md:grid-cols-4 py-5 gap-4 min-w-[100%]">
            <router-link
              v-for="product in products"
              :key="product._id"
              :to="{
                name: 'product-detail',
                params: { slug: product.slug },
              }"
            >
              <ProductCard :product="product" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, computed } from 'vue'
import apiClient from '@/utils/axios'
import TextRoboto from '../Icon/TextRoboto.vue'
import TwoSquareSeperate from '../Icon/TwoSquareSeperate.vue'
import ProductCard from './ProductCard.vue'

// Define props
const props = defineProps({
  categoryId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Yến sào Sudes Nest',
  },
  mainText: {
    type: String,
    default: 'Tổ Yến',
  },
})

const currentIndex = ref(0)
const category = ref(null)
const products = ref(null)

// Computed property for first 4 categories
const firstFourCategories = computed(() => {
  if (!category.value?.children) return []
  return category.value.children.slice(0, 4)
})

onMounted(async () => {
  try {
    const response = await apiClient.get(`/admin/category/parent/${props.categoryId}`)
    if (response.status === 200) {
      category.value = response.data.data.category
      products.value = response.data.data.products
      console.log(products.value)
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<style scoped>
.category::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 8px 0 8px;
  border-color: #053024 transparent transparent transparent;
  display: none;
}

.category.active {
  background-color: #053024;
  color: white;
}

.category.active::after {
  display: block;
}

/* Hide scrollbar but keep functionality */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
