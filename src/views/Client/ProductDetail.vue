<template>
  <ProductDetailSkeleton v-if="!product || Object.keys(product).length === 0" />
  <div v-else class="bg-primaryBg py-2">
    <!-- Breadcrumb -->
    <BreadCrumb :product-data="product" />

    <div class="lg:px-11 xl:px-30">
      <div class="">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white px-[14px] md:p-6">
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
              <p class="text-[16px] text-gray-600 font-bold">
                Mã: <span class="text-mainColor">Đang cập nhật</span>
              </p>
              <p class="text-[16px] text-gray-600 font-medium">
                Thương hiệu: <span class="text-mainColor">Sudes Nest</span> | Tình trạng:
                <span class="text-mainColor">{{
                  productVariants && productVariants[currentVariant]?.stock
                    ? 'Còn hàng'
                    : 'Hết hàng'
                }}</span>
              </p>
            </div>

            <div
              class="mb-6 p-4 border border-red-100 bg-red-300 rounded font-medium"
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
                  class="p-1 bg-mainColor hover:bg-hover cursor-pointer text-white rounded hover:opacity-90 hidden"
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
        <div class="mt-8 bg-white px-[14px] md:p-6">
          <div class="grid grid-cols-3 gap-4">
            <div
              class="col-span-3 md:col-span-2 border-r md:pr-4 border-[#eee]"
              :class="{ 'col-span-3': !recentWatch }"
            >
              <!-- Tab Headers -->
              <div class="flex border-b-2 border-mainColor bg-[#f1f1f1]">
                <button
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="activeTab = tab.id"
                  class="px-6 py-3 font-bold text-sm uppercase cursor-pointer"
                  :class="activeTab === tab.id ? 'text-white bg-mainColor ' : 'text-gray-600'"
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
                      <div
                        v-html="product?.description || ''"
                        ref="quillContent"
                        class="text-base"
                      ></div>
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
                <div v-if="activeTab === 'instruct'" class="prose max-w-none text-base">
                  <p>
                    <strong>Bước 1</strong>: Truy cập website v&agrave; lựa chọn sản phẩm cần mua để
                    mua h&agrave;ng
                  </p>
                  <p>
                    <strong>Bước 2</strong>: Click v&agrave; sản phẩm muốn mua, m&agrave;n
                    h&igrave;nh hiển thị ra pop up với c&aacute;c lựa chọn sau
                  </p>
                  <p>
                    Nếu bạn muốn tiếp tục mua h&agrave;ng: Bấm v&agrave;o phần tiếp tục mua
                    h&agrave;ng để lựa chọn th&ecirc;m sản phẩm v&agrave;o giỏ h&agrave;ng
                  </p>
                  <p>
                    Nếu bạn muốn xem giỏ h&agrave;ng để cập nhật sản phẩm: Bấm v&agrave;o xem giỏ
                    h&agrave;ng
                  </p>
                  <p>
                    Nếu bạn muốn đặt h&agrave;ng v&agrave; thanh to&aacute;n cho sản phẩm n&agrave;y
                    vui l&ograve;ng bấm v&agrave;o: Đặt h&agrave;ng v&agrave; thanh to&aacute;n
                  </p>
                  <p>
                    <strong>Bước 3</strong>: Lựa chọn th&ocirc;ng tin t&agrave;i khoản thanh
                    to&aacute;n
                  </p>
                  <p>
                    Nếu bạn đ&atilde; c&oacute; t&agrave;i khoản vui l&ograve;ng nhập th&ocirc;ng
                    tin t&ecirc;n đăng nhập l&agrave; email v&agrave; mật khẩu v&agrave;o mục
                    đ&atilde; c&oacute; t&agrave;i khoản tr&ecirc;n hệ thống
                  </p>
                  <p>
                    Nếu bạn chưa c&oacute; t&agrave;i khoản v&agrave; muốn đăng k&yacute; t&agrave;i
                    khoản vui l&ograve;ng điền c&aacute;c th&ocirc;ng tin c&aacute; nh&acirc;n để
                    tiếp tục đăng k&yacute; t&agrave;i khoản. Khi c&oacute; t&agrave;i khoản bạn sẽ
                    dễ d&agrave;ng theo d&otilde;i được đơn h&agrave;ng của m&igrave;nh
                  </p>
                  <p>
                    Nếu bạn muốn mua h&agrave;ng m&agrave; kh&ocirc;ng cần t&agrave;i khoản vui
                    l&ograve;ng nhấp chuột v&agrave;o mục đặt h&agrave;ng kh&ocirc;ng cần t&agrave;i
                    khoản
                  </p>
                  <p>
                    <strong>Bước 4</strong>: Điền c&aacute;c th&ocirc;ng tin của bạn để nhận đơn
                    h&agrave;ng, lựa chọn h&igrave;nh thức thanh to&aacute;n v&agrave; vận chuyển
                    cho đơn h&agrave;ng của m&igrave;nh
                  </p>
                  <p>
                    <strong>Bước 5</strong>: Xem lại th&ocirc;ng tin đặt h&agrave;ng, điền
                    ch&uacute; th&iacute;ch v&agrave; gửi đơn h&agrave;ng
                  </p>
                  <p>
                    Sau khi nhận được đơn h&agrave;ng bạn gửi ch&uacute;ng t&ocirc;i sẽ li&ecirc;n
                    hệ bằng c&aacute;ch gọi điện lại để x&aacute;c nhận lại đơn h&agrave;ng
                    v&agrave; địa chỉ của bạn.
                  </p>
                  <p>Tr&acirc;n trọng cảm ơn.</p>
                </div>
              </div>
            </div>
            <div
              v-if="recentWatch && recentWatch.length > 0"
              class="col-span-3 md:col-span-1"
              :class="{ 'col-span-0': !recentWatch }"
            >
              <h2 class="text-lg font-bold uppercase mb-4">Bạn đã xem</h2>
              <div class="flex flex-col gap-2">
                <div v-for="(product, index) in recentWatch" :key="product._id">
                  <router-link
                    class="flex items-center gap-2 border-b border-gray-200 pb-2"
                    :class="{ 'border-b-0': index === recentWatch.length - 1 }"
                    :to="`/${product.slug}`"
                  >
                    <img :src="product.images[0]" alt="product image" class="w-20 h-20" />
                    <div class="flex flex-col">
                      <h3 class="text-sm font-medium">{{ product.name }}</h3>
                      <div class="flex items-center gap-2">
                        <p class="text-base font-bold text-red-500">
                          {{ formatPrice(product.variants[0].price) }}đ
                        </p>
                        <span
                          v-if="product.variants[0].oldPrice && product.variants[0].oldPrice > 0"
                          class="text-sm text-gray-500 line-through"
                          >{{ formatPrice(product.variants[0].oldPrice) }}đ</span
                        >
                      </div>
                      <p class="text-sm text-gray-500 italic">Xem tất cả</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 bg-white px-[14px] md:p-6">
          <div class="flex flex-col gap-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold uppercase">Đánh giá sản phẩm</h2>
              <div v-if="reviews && reviews.length > 0" class="text-sm text-gray-600">
                {{ reviews.length }} đánh giá
              </div>
            </div>

            <!-- Reviews List -->
            <div v-if="reviews && reviews.length > 0" class="space-y-6">
              <div
                v-for="review in reviews"
                :key="review.id"
                class="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
              >
                <div class="flex gap-4">
                  <!-- User Avatar -->
                  <div class="flex-shrink-0">
                    <div v-if="review.userAvatar" class="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        :src="review.userAvatar"
                        :alt="review.userName"
                        class="w-full h-full object-cover"
                        @error="handleAvatarError"
                      />
                    </div>
                    <div
                      v-else
                      class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
                    >
                      <span class="text-white font-medium text-sm">
                        {{ getInitials(review.userName) }}
                      </span>
                    </div>
                  </div>

                  <!-- Review Content -->
                  <div class="flex-1">
                    <!-- User Info & Rating -->
                    <div
                      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2"
                    >
                      <div>
                        <h4 class="font-medium text-gray-900">{{ review.userName }}</h4>
                        <p class="text-sm text-gray-500">
                          {{ formatReviewDate(review.createdAt) }}
                        </p>
                      </div>

                      <!-- Star Rating -->
                      <div class="flex items-center gap-1">
                        <div class="flex">
                          <svg
                            v-for="star in 5"
                            :key="star"
                            class="w-4 h-4"
                            :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        </div>
                        <span class="ml-1 text-sm font-medium text-gray-700"
                          >{{ review.rating }}/5</span
                        >
                      </div>
                    </div>

                    <!-- Review Comment -->
                    <div class="text-gray-700 leading-relaxed">
                      <p>{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
              <div class="mb-4">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa có đánh giá nào</h3>
              <p class="text-gray-500">Hãy là người đầu tiên đánh giá sản phẩm này</p>
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
import { useRecentWatchStore } from '@/stores/recentwatch'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import ProductDetailSkeleton from '@/components/Skeleton/ProductDetailSkeleton.vue'
import BreadCrumb from '@/components/Body/BreadCrumb.vue'

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
    ProductDetailSkeleton,
    BreadCrumb,
  },
  setup() {
    const $toast = useToast()
    const authStore = useAuthStore()
    const recentWatchStore = useRecentWatchStore()
    const route = useRoute()
    const thumbsSwiper = ref(null)
    const mainSwiper = ref(null)
    const activeThumbIndex = ref(0)
    const isMobile = ref(window.innerWidth < 768)
    const isAtBeginning = ref(true)
    const isAtEnd = ref(false)
    const productId = ref(null)
    const recentWatch = ref([])
    const product = ref({})
    const reviews = ref([])

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
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const productResponse = await apiClient.get(`/admin/product/${slug}`)
        if (productResponse.status === 200) {
          product.value = productResponse.data.data || {}
          console.log(product.value)
          productId.value = productResponse.data.data._id
          // Reset currentVariant if product variants change
          currentVariant.value = 0
          recentWatchStore.addRecentWatch(productId.value)

          if (authStore.isAuthenticated) {
            recentWatch.value = recentWatchStore.recentWatch
            recentWatchStore.getRecentWatchFromApi()
          }
          const reviewResponse = await apiClient.get(`/account/product/${productId.value}/reviews`)
          if (reviewResponse.status === 200) {
            reviews.value = reviewResponse.data.data.reviews || []
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        product.value = {}
      }

      window.addEventListener('resize', handleResize)
      window.scrollTo(0, 0, { behavior: 'smooth' })
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
      { id: 'instruct', name: 'Hướng dẫn mua hàng' },
    ]
    const activeTab = ref('description')

    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN').format(price)
    }

    // Function to get initials from user name
    const getInitials = (name) => {
      if (!name) return 'U'
      const names = name.split(' ')
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase()
      }
      return name[0].toUpperCase()
    }

    // Function to handle avatar load error
    const handleAvatarError = (event) => {
      event.target.style.display = 'none'
      event.target.parentElement.style.display = 'none'
      event.target.parentElement.nextElementSibling.style.display = 'flex'
    }

    // Format date for reviews (more detailed format)
    const formatReviewDate = (dateString) => {
      if (!dateString) return '-'
      const date = new Date(dateString)
      const now = new Date()
      const diffInMs = now - date
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

      if (diffInDays === 0) {
        return 'Hôm nay'
      } else if (diffInDays === 1) {
        return 'Hôm qua'
      } else if (diffInDays < 7) {
        return `${diffInDays} ngày trước`
      } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7)
        return `${weeks} tuần trước`
      } else {
        return date.toLocaleDateString('vi-VN')
      }
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
        oldPrice: product.value.variants[currentVariant.value].oldPrice,
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
        window.scrollTo(0, 0, { behavior: 'smooth' })
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
      recentWatch,
      reviews,
      getInitials,
      handleAvatarError,
      formatReviewDate,
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
