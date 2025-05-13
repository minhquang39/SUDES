<template>
  <div v-if="!product">Đang tải</div>
  <div v-else class="bg-primaryBg py-2">
    <div class="lg:px-11 xl:px-30">
      <div class="bg-white px-[14px] md:p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Product Images -->
          <div class="flex flex-col md:flex-row-reverse">
            <!-- Main gallery -->
            <swiper
              :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }"
              :spaceBetween="10"
              :navigation="false"
              :thumbs="{ swiper: thumbsSwiper, autoScrollOffset: 1 }"
              :modules="modules"
              class="mySwiper2"
              @swiper="setMainSwiper"
              aria-label="Hình ảnh sản phẩm chính"
            >
              <swiper-slide v-for="(image, index) in product.images" :key="index">
                <img
                  :src="image"
                  class="w-full h-full object-cover"
                  :alt="`${product.name} - Hình ảnh ${index + 1}`"
                  loading="lazy"
                />
              </swiper-slide>
            </swiper>

            <!-- Thumbnails -->
            <div class="relative thumbnails-container mt-4 md:mt-0 md:mr-4 md:w-1/5">
              <swiper
                @swiper="setThumbsSwiper"
                :spaceBetween="10"
                :slidesPerView="4"
                :direction="isMobile ? 'horizontal' : 'vertical'"
                :freeMode="true"
                :watchSlidesProgress="true"
                :modules="modulesThumbs"
                class="thumbnails-swiper"
                aria-label="Hình ảnh thumbnail"
              >
                <swiper-slide
                  v-for="(image, index) in product.images"
                  :key="index"
                  :class="{ 'swiper-slide-thumb-active': activeThumbIndex === index }"
                >
                  <img
                    :src="image"
                    class="w-full h-full object-cover cursor-pointer"
                    :alt="`Thumbnail ${index + 1} - ${product.name}`"
                    loading="lazy"
                    @click="handleThumbClick(index)"
                  />
                </swiper-slide>
              </swiper>
              <div class="custom-navigation-buttons" v-if="product.images?.length > 4">
                <button
                  @click="slidePrev"
                  class="custom-nav-button prev"
                  aria-label="Xem ảnh trước đó"
                  v-show="activeThumbIndex > 0"
                >
                  <span>&#10094;</span>
                </button>
                <button
                  @click="slideNext"
                  class="custom-nav-button next"
                  aria-label="Xem ảnh tiếp theo"
                  v-show="product.images && activeThumbIndex < product.images.length - 1"
                >
                  <span>&#10095;</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-2xl font-bold mb-4">{{ product?.name }}</h1>

            <!-- Product Status -->
            <div class="mb-4">
              <p class="text-[16px] text-gray-600">
                Mã: <span class="text-mainColor">Đang cập nhật</span>
              </p>
              <p class="text-[16px] text-gray-600">
                Thương hiệu: <span class="text-mainColor">Sudes Nest</span> | Tình trạng:
                <span class="text-mainColor">{{
                  productVariants && productVariants[currentVariant]?.stock
                    ? 'Còn hàng'
                    : 'Hết hàng'
                }}</span>
              </p>
            </div>

            <div
              class="mb-6 p-4 border border-red-100 bg-red-50 rounded"
              v-html="product?.shortDescription || ''"
            ></div>

            <!-- Price and variants  -->
            <div class="pb-5">
              <div
                v-if="productVariants && productVariants[currentVariant]"
                class="flex items-center gap-2"
              >
                <span class="text-xl font-bold text-price"
                  >{{ formatPrice(productVariants[currentVariant].price) }}đ</span
                >
                <span
                  v-if="productVariants[currentVariant].oldPrice"
                  class="text-[16px] font-normal line-through text-gray-400"
                  >{{ formatPrice(productVariants[currentVariant].oldPrice) }}đ</span
                >
                <div
                  v-if="productVariants[currentVariant].oldPrice"
                  class="text-white text-xs px-1 bg-price rounded-xs relative after saletag"
                >
                  -{{
                    Math.ceil(
                      ((productVariants[currentVariant].oldPrice -
                        productVariants[currentVariant].price) /
                        productVariants[currentVariant].oldPrice) *
                        100,
                    )
                  }}%
                </div>
              </div>
              <div v-if="productVariants && productVariants.length > 1" class="mt-4">
                <div class="flex items-center gap-2 mb-2">
                  <span>Phân loại: </span>
                  <span class="text-mainColor font-bold">{{
                    productVariants[currentVariant]?.name || ''
                  }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(variant, index) in productVariants"
                    :key="index"
                    class="text-black p-1 border border-gray-300 cursor-pointer hover:bg-mainColor hover:text-white transition-colors"
                    :class="{ 'bg-mainColor text-white': currentVariant === index }"
                    @click="currentVariant = index"
                  >
                    {{ variant.name }}
                  </div>
                </div>
              </div>
            </div>
            <!-- quantity  -->
            <div class="flex gap-4 flex-col md:flex-row">
              <div
                v-if="productVariants && productVariants[currentVariant]?.stock"
                class="flex items-center gap-2 py-5 md:py-0"
              >
                <span id="quantity-label" class="font-bold text-mainColor">Số lượng:</span>
                <div class="flex items-center" aria-labelledby="quantity-label">
                  <button
                    @click="decreaseQuantity"
                    class="p-2 bg-gray-200 border border-gray-300 text-black hover:bg-mainColor hover:text-white"
                    :disabled="quantity <= 1"
                    aria-label="Giảm số lượng"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="product-quantity"
                    v-model="quantity"
                    class="w-16 text-center border border-gray-300 p-2 outline-none"
                    min="1"
                  />
                  <button
                    @click="increaseQuantity"
                    class="p-2 bg-gray-200 border border-gray-300 text-black hover:bg-mainColor hover:text-white"
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>
              </div>

              <div
                v-if="productVariants && productVariants[currentVariant]?.stock"
                class="flex gap-4"
              >
                <button
                  class="p-1 bg-mainColor hover:bg-hover cursor-pointer text-white rounded hover:opacity-90"
                  aria-label="Mua ngay sản phẩm này"
                >
                  <div class="px-4 py-1 border border-gray-100 font-medium">Mua ngay</div>
                </button>
                <button
                  @click="addToCart()"
                  class="p-1 bg-subColor hover:bg-hover text-mainColor hover:text-white cursor-pointer rounded hover:opacity-90"
                  aria-label="Mua ngay sản phẩm này"
                >
                  <div class="px-4 py-1 border border-white font-[500]">Thêm vào giỏ</div>
                </button>
              </div>
              <div v-else>
                <button
                  class="p-1 bg-gray-500 text-white cursor-not-allowed disabled:opacity-50 rounded hover:opacity-90"
                  aria-label="Mua ngay sản phẩm này"
                >
                  <div class="px-4 py-1 border border-white font-[700] uppercase">Hết hàng</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Tabs -->
        <div class="mt-8">
          <!-- Tab Headers -->
          <div class="flex border-b">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = tab.id"
              class="px-6 py-3 font-medium text-sm uppercase"
              :class="
                activeTab === tab.id
                  ? 'text-mainColor border-b-2 border-mainColor -mb-[2px]'
                  : 'text-gray-600'
              "
            >
              {{ tab.name }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="py-6">
            <!-- Mô tả sản phẩm -->
            <div v-if="activeTab === 'description'" class="prose max-w-none">
              <div class="relative">
                <div
                  :class="{ 'max-h-[300px] overflow-hidden': !isExpanded && hasLongContent }"
                  class="description-content"
                  ref="descriptionContent"
                >
                  <div v-html="product?.description || ''" ref="quillContent"></div>
                </div>
                <div
                  v-if="hasLongContent && !isExpanded"
                  class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"
                ></div>
              </div>
              <div class="text-center mt-4" v-if="hasLongContent">
                <button
                  @click="toggleDescription"
                  class="px-8 py-2 bg-[#052b21] text-white rounded-sm hover:opacity-90 inline-flex items-center justify-center gap-2"
                >
                  <span>{{ isExpanded ? 'Thu gọn' : 'Xem thêm' }}</span>
                  <span class="text-xs" v-if="!isExpanded">▼</span>
                  <span class="text-xs" v-else>▲</span>
                </button>
              </div>
            </div>

            <!-- Hướng dẫn mua hàng -->

            <!-- Đánh giá -->
            <div v-if="activeTab === 'reviews'" class="prose max-w-none">
              <p>Nội dung đánh giá sản phẩm...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import apiClient from '@/utils/axios'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const $toast = useToast()

    const route = useRoute()
    const thumbsSwiper = ref(null)
    const mainSwiper = ref(null)
    const activeThumbIndex = ref(0)
    const isMobile = ref(window.innerWidth < 768)
    const isAtBeginning = ref(true)
    const isAtEnd = ref(false)
    const productId = ref(null)

    const product = ref({})

    const setMainSwiper = (swiper) => {
      mainSwiper.value = swiper
      swiper.on('slideChange', () => {
        activeThumbIndex.value = swiper.activeIndex
      })
    }

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper
      // Set initial states
      isAtBeginning.value = swiper.isBeginning
      isAtEnd.value = swiper.isEnd

      swiper.on('slideChange', () => {
        isAtBeginning.value = swiper.isBeginning
        isAtEnd.value = swiper.isEnd
      })
    }

    const handleThumbClick = (index) => {
      if (mainSwiper.value) {
        mainSwiper.value.slideTo(index)
        activeThumbIndex.value = index
      }
    }

    const slidePrev = () => {
      if (mainSwiper.value) {
        const currentIndex = mainSwiper.value.activeIndex
        if (currentIndex > 0) {
          mainSwiper.value.slideTo(currentIndex - 1)
          // activeThumbIndex is updated via the slideChange event
        }
      }
    }

    const slideNext = () => {
      if (mainSwiper.value && product.value.images) {
        const currentIndex = mainSwiper.value.activeIndex
        if (currentIndex < product.value.images.length - 1) {
          mainSwiper.value.slideTo(currentIndex + 1)
          // activeThumbIndex is updated via the slideChange event
        }
      }
    }

    const handleResize = () => {
      isMobile.value = window.innerWidth < 768
    }

    onMounted(async () => {
      const slug = route.params.slug
      try {
        const response = await apiClient.get(`/admin/product/${slug}`)
        if (response.status === 200) {
          product.value = response.data.data || {}
          productId.value = response.data.data._id
          // Reset currentVariant if product variants change
          currentVariant.value = 0
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        product.value = {}
      }

      window.addEventListener('resize', handleResize)
      window.scrollTo(0, 0)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    const quantity = ref(1)

    const productVariants = computed(() => {
      return product.value?.variants || []
    })

    const currentVariant = ref(0)

    const increaseQuantity = () => {
      quantity.value++
    }

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--
      }
    }

    const tabs = [
      { id: 'description', name: 'Mô tả sản phẩm' },
      { id: 'reviews', name: 'Đánh giá' },
    ]
    const activeTab = ref('description')

    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN').format(price)
    }

    const isExpanded = ref(false)
    const descriptionContent = ref(null)
    const hasLongContent = ref(false)
    const quillContent = ref(null)

    const checkContentHeight = () => {
      nextTick(() => {
        if (descriptionContent.value) {
          const scrollHeight = descriptionContent.value.scrollHeight
          hasLongContent.value = scrollHeight > 300
        }
      })
    }

    const toggleDescription = () => {
      isExpanded.value = !isExpanded.value
    }

    // Function to fix Quill lists
    const fixQuillLists = () => {
      if (!quillContent.value) return

      // Find all li elements with data-list="bullet"
      const bulletItems = quillContent.value.querySelectorAll('li[data-list="bullet"]')
      bulletItems.forEach((item) => {
        item.style.listStyleType = 'disc'
        item.style.display = 'list-item'
        item.style.marginLeft = '1.5rem'
      })

      // Find all li elements with data-list="ordered"
      const orderedItems = quillContent.value.querySelectorAll('li[data-list="ordered"]')
      orderedItems.forEach((item) => {
        item.style.listStyleType = 'decimal'
        item.style.display = 'list-item'
        item.style.marginLeft = '1.5rem'
      })

      // Style headings
      const headings = quillContent.value.querySelectorAll('h2, h3')
      headings.forEach((heading) => {
        heading.style.fontWeight = 'bold'
        heading.style.margin = '1rem 0'

        if (heading.tagName === 'H2') {
          heading.style.fontSize = '1.5rem'
        } else {
          heading.style.fontSize = '1.25rem'
        }
      })

      // Style paragraphs
      const paragraphs = quillContent.value.querySelectorAll('p')
      paragraphs.forEach((p) => {
        p.style.marginBottom = '1rem'
      })
    }

    const cartStore = useCartStore()

    const addToCart = () => {
      const data = {
        productId: productId.value,
        quantity: quantity.value,
        SKU: product.value.variants[currentVariant.value].sku,
        price: product.value.variants[currentVariant.value].price,
        image: product.value.images[0],
        slug: product.value.slug,
        name: product.value.name,
      }
      console.log(data)
      cartStore.addToCart(data)
      $toast.success('Đã thêm vào giỏ hàng', {
        duration: 1000,
        position: 'top-right',
      })
    }

    // Watch for changes to the description
    watch(
      () => product.value?.description,
      () => {
        nextTick(() => {
          checkContentHeight()
          fixQuillLists()
        })
      },
    )

    onMounted(() => {
      nextTick(() => {
        checkContentHeight()
        fixQuillLists()
      })
    })

    return {
      thumbsSwiper,
      setMainSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Thumbs],
      modulesThumbs: [FreeMode, Navigation, Thumbs],
      isMobile,
      tabs,
      activeTab,
      quantity,
      increaseQuantity,
      decreaseQuantity,
      product,
      slidePrev,
      slideNext,
      isAtBeginning,
      isAtEnd,
      formatPrice,
      productVariants,
      currentVariant,
      isExpanded,
      toggleDescription,
      descriptionContent,
      hasLongContent,
      activeThumbIndex,
      handleThumbClick,
      quillContent,
      productId,
      addToCart,
      cartStore,
    }
  },
}
</script>

<style scoped>
.thumbnails-container {
  position: relative;
}

.thumbnails-swiper {
  height: auto;
}

/* Responsive styles cho slider chính (mySwiper2) */
.mySwiper2 {
  height: 300px; /* Chiều cao nhỏ hơn cho mobile */
  width: 100%; /* Đảm bảo chiều rộng đầy đủ */
}

.mySwiper2 .swiper-slide {
  height: 100%;
  display: flex; /* Thêm flexbox để căn giữa ảnh */
  align-items: center;
  justify-content: center;
}

.mySwiper2 .swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 100%;
}

/* Thumbnail styles */
.thumbnails-swiper .swiper-slide-thumb-active {
  opacity: 1;
  border: 2px solid var(--color-mainColor);
}

.thumbnails-swiper .swiper-slide {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.thumbnails-swiper .swiper-slide:hover {
  opacity: 1;
}

/* Mobile navigation buttons */
@media (max-width: 767px) {
  .mySwiper2 {
    margin-bottom: 0.5rem;
  }

  .thumbnails-swiper .swiper-button-next,
  .thumbnails-swiper .swiper-button-prev {
    width: 30px;
    height: 30px;
    background-color: var(--color-mainColor);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thumbnails-swiper .swiper-button-next {
    right: 5px;
  }

  .thumbnails-swiper .swiper-button-prev {
    left: 5px;
  }

  .thumbnails-swiper .swiper-button-next::after,
  .thumbnails-swiper .swiper-button-prev::after {
    font-size: 12px;
    font-weight: bold;
  }
}

/* Desktop styles */
@media (min-width: 768px) {
  /* Khôi phục chiều cao cho desktop về kích thước lớn như trước */
  .mySwiper2 {
    height: 500px;
  }

  .mySwiper2 .swiper-slide img {
    object-fit: cover; /* Khôi phục về cover để hiển thị đẹp hơn trên desktop */
  }

  .thumbnails-swiper {
    height: 500px;
  }

  .thumbnails-swiper .swiper-slide {
    height: calc(500px / 4 - 8px);
  }

  /* Custom navigation buttons for vertical slider */
  .thumbnails-swiper .swiper-button-next,
  .thumbnails-swiper .swiper-button-prev {
    width: 30px;
    height: 30px;
    background-color: var(--color-mainColor);
    color: white;
    right: 50% !important;
    left: auto !important;
    transform-origin: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thumbnails-swiper .swiper-button-next {
    top: auto !important;
    bottom: 5px;
    margin-right: -15px;
  }

  .thumbnails-swiper .swiper-button-prev {
    top: 5px !important;
    bottom: auto;
    margin-right: -15px;
  }

  .thumbnails-swiper .swiper-button-next::after,
  .thumbnails-swiper .swiper-button-prev::after {
    font-size: 12px;
    font-weight: bold;
  }
}

/* Custom Navigation Buttons */
.custom-navigation-buttons {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.custom-nav-button {
  position: relative;
  width: 30px;
  height: 30px;
  background-color: var(--color-mainColor);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  border: none;
  outline: none;
  z-index: 20;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.custom-nav-button.prev {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
}

.custom-nav-button.next {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%) rotate(-270deg);
}

.custom-nav-button span {
  font-size: 14px;
  font-weight: bold;
}

.custom-nav-button.opacity-0 {
  opacity: 0;
  pointer-events: none;
}

/* Hide default swiper navigation buttons */
.thumbnails-swiper .swiper-button-next,
.thumbnails-swiper .swiper-button-prev {
  display: none !important;
}

@media (max-width: 767px) {
  .custom-navigation-buttons {
    flex-direction: row;
    align-items: center;
  }

  .custom-nav-button.prev {
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }

  .custom-nav-button.next {
    top: 50%;
    bottom: auto;
    left: auto;
    right: 5px;
    transform: translateY(-50%);
  }
}

/* Tab styles */
.prose {
  max-width: none;
}

.prose h3 {
  color: #333;
  margin-top: 1.5em;
}

.prose ul {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose li {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}

/* Fix image gallery layout */
.mySwiper2 {
  height: 300px;
  width: 100%;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .mySwiper2 {
    height: 500px;
  }

  .thumbnails-container {
    width: 100px;
    margin-right: 1rem;
  }

  .thumbnails-swiper {
    height: 500px;
  }

  .thumbnails-swiper .swiper-slide {
    height: calc(500px / 4 - 8px);
  }
}

/* Fix navigation buttons */
.custom-nav-button {
  background-color: var(--color-mainColor);
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s;
}

.custom-nav-button:hover {
  opacity: 0.8;
}

.description-content {
  transition: max-height 0.5s ease-out;
}

.description-content img {
  max-width: 100%;
  height: auto;
}

.saletag::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -4px;
  transform: translate(0, -50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 5px 0px;
  border-color: transparent #d31100 transparent transparent;
}
</style>
