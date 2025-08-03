<template>
  <div>
    <h2 class="text-[#212B25] text-[19px] mb-4 font-normal uppercase">Đánh giá sản phẩm</h2>

    <!-- Tab Navigation -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'pending'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
            activeTab === 'pending'
              ? 'border-mainColor text-mainColor'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          Chưa đánh giá
          <span
            v-if="pendingCount > 0"
            class="ml-2 bg-mainColor text-white text-xs rounded-full px-2 py-1"
          >
            {{ pendingCount }}
          </span>
        </button>
        <button
          @click="activeTab = 'completed'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
            activeTab === 'completed'
              ? 'border-mainColor text-mainColor'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          Đánh giá của tôi
          <span
            v-if="completedCount > 0"
            class="ml-2 bg-mainColor text-white text-xs rounded-full px-2 py-1"
          >
            {{ completedCount }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="min-h-[400px]">
      <!-- Pending Reviews Tab -->
      <div v-if="activeTab === 'pending'">
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
          <span class="ml-2 text-gray-600">Đang tải...</span>
        </div>

        <!-- Pending products list -->
        <div v-else-if="pendingReviews && pendingReviews.length > 0" class="space-y-6">
          <div
            v-for="(item, index) in pendingReviews"
            :key="`${item.orderId}-${item.productId}-${index}`"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6"
          >
            <!-- Product Info -->
            <div class="flex flex-col md:flex-row gap-4 mb-6">
              <div class="flex-shrink-0">
                <img
                  :src="item.productImage"
                  :alt="item.productName"
                  class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ item.productName }}
                </h3>
                <div class="text-sm text-gray-600 space-y-1">
                  <p><span class="font-medium">Mã đơn hàng:</span> {{ item.orderId }}</p>
                  <p><span class="font-medium">Mã sản phẩm:</span> {{ item.SKU }}</p>
                  <p><span class="font-medium">Số lượng:</span> {{ item.quantity }}</p>
                  <p><span class="font-medium">Giá:</span> {{ formatPrice(item.price) }} đ</p>
                  <p><span class="font-medium">Ngày mua:</span> {{ formatDate(item.orderDate) }}</p>
                </div>
              </div>
            </div>

            <!-- Review Action -->
            <div class="border-t border-gray-200 pt-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-md font-medium text-gray-900">Đánh giá sản phẩm</h4>
                <span class="text-sm text-gray-500">Chưa đánh giá</span>
              </div>

              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-gray-600 mb-4">Bạn chưa đánh giá sản phẩm này</p>
                <button
                  @click="openReviewModal(item, index)"
                  class="px-6 py-2 bg-mainColor text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-offset-2 transition-colors duration-200"
                >
                  Viết đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state for pending reviews -->
        <div v-else class="py-12 text-center">
          <div class="mb-4">
            <svg
              class="mx-auto h-16 w-16 text-gray-400"
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
          <h3 class="text-lg font-medium text-gray-900 mb-2">Không có sản phẩm nào để đánh giá</h3>
          <p class="text-gray-600 mb-4">
            Bạn đã đánh giá tất cả sản phẩm hoặc chưa có sản phẩm nào cần đánh giá
          </p>
          <router-link
            to="/products"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mainColor hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor"
          >
            Mua sắm ngay
          </router-link>
        </div>
      </div>

      <!-- Completed Reviews Tab -->
      <div v-else-if="activeTab === 'completed'">
        <!-- Loading state -->
        <div v-if="loadingCompleted" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
          <span class="ml-2 text-gray-600">Đang tải...</span>
        </div>

        <!-- Completed reviews list -->
        <div v-else-if="completedReviews && completedReviews.length > 0" class="space-y-6">
          <div
            v-for="(item, index) in completedReviews"
            :key="`${item.orderId}-${item.productId}-${index}`"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6"
          >
            <!-- Product Info -->
            <div class="flex flex-col md:flex-row gap-4 mb-6">
              <div class="flex-shrink-0">
                <img
                  :src="item.productImage"
                  :alt="item.productName"
                  class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ item.productName }}
                </h3>
                <div class="text-sm text-gray-600 space-y-1">
                  <p><span class="font-medium">Mã đơn hàng:</span> {{ item.orderId }}</p>
                  <p><span class="font-medium">Mã sản phẩm:</span> {{ item.SKU }}</p>
                  <p><span class="font-medium">Số lượng:</span> {{ item.quantity }}</p>
                  <p><span class="font-medium">Giá:</span> {{ formatPrice(item.price) }} đ</p>
                  <p><span class="font-medium">Ngày mua:</span> {{ formatDate(item.createdAt) }}</p>
                </div>
              </div>
            </div>

            <!-- Review Display -->
            <div class="border-t border-gray-200 pt-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-md font-medium text-gray-900">Đánh giá của bạn</h4>
                <span class="text-xs text-gray-500">{{ formatDate(item.reviewDate) }}</span>
              </div>

              <!-- Display existing review -->
              <div class="bg-gray-50 rounded-lg p-4">
                <!-- Stars display -->
                <div class="flex items-center gap-1 mb-3">
                  <div class="flex">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      class="w-5 h-5"
                      :class="star <= item.rating ? 'text-yellow-400' : 'text-gray-300'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <span class="ml-2 text-sm font-medium text-gray-700"
                    >{{ item.rating }}/5 sao</span
                  >
                </div>

                <!-- Comment display -->
                <div v-if="item.comment" class="text-sm text-gray-700 leading-relaxed">
                  <p class="font-medium text-gray-900 mb-1">Nhận xét:</p>
                  <p class="italic">"{{ item.comment }}"</p>
                </div>
                <div v-else class="text-sm text-gray-500 italic">
                  Bạn đã đánh giá {{ item.rating }} sao nhưng không có nhận xét.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state for completed reviews -->
        <div v-else class="py-12 text-center">
          <div class="mb-4">
            <svg
              class="mx-auto h-16 w-16 text-gray-400"
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
          <p class="text-gray-600 mb-4">Bạn chưa đánh giá sản phẩm nào</p>
          <button
            @click="activeTab = 'pending'"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mainColor hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor"
          >
            Xem sản phẩm cần đánh giá
          </button>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <Transition name="review-modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 review-modal-overlay"
        @click="closeModal"
      >
        <div class="fixed inset-0 bg-black/50 review-modal-backdrop"></div>
        <div
          class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative review-modal-content"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Đánh giá sản phẩm</h3>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="px-6 py-4" v-if="selectedItem">
            <!-- Product Info -->
            <div class="flex gap-3 mb-6">
              <img
                :src="selectedItem.productImage"
                :alt="selectedItem.productName"
                class="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
              />
              <div class="flex-1">
                <h4 class="font-medium text-gray-900 mb-2">{{ selectedItem.productName }}</h4>
                <div class="text-sm text-gray-600 space-y-1">
                  <p><span class="font-medium">Mã đơn hàng:</span> {{ selectedItem.orderId }}</p>
                  <p><span class="font-medium">Số lượng:</span> {{ selectedItem.quantity }}</p>
                  <p>
                    <span class="font-medium">Giá:</span> {{ formatPrice(selectedItem.price) }} đ
                  </p>
                </div>
              </div>
            </div>

            <!-- Review Form -->
            <div>
              <!-- Star Rating -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Xếp hạng sao <span class="text-red-500">*</span>
                </label>
                <div class="flex items-center gap-1">
                  <button
                    v-for="star in 5"
                    :key="star"
                    @click="setRating(star)"
                    class="transition-colors duration-200 hover:scale-110"
                    type="button"
                  >
                    <svg
                      class="w-8 h-8"
                      :class="
                        star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                      "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </button>
                  <span class="ml-2 text-sm text-gray-600">
                    {{ rating ? `${rating}/5 sao` : 'Chưa đánh giá' }}
                  </span>
                </div>
              </div>

              <!-- Comment -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"> Nhận xét </label>
                <textarea
                  v-model="comment"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-mainColor resize-none"
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              @click="closeModal"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              @click="submitReview"
              :disabled="!rating || submitting"
              class="px-6 py-2 bg-mainColor text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span v-if="submitting" class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang gửi...
              </span>
              <span v-else>Gửi đánh giá</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toast-notification'
import apiClient from '@/utils/axios'

const toast = useToast()
const loading = ref(false)
const loadingCompleted = ref(false)
const reviewableItems = ref([])
const completedReviews = ref([])
const submitting = ref(false)

// Tab state
const activeTab = ref('pending')

// Modal state
const showModal = ref(false)
const selectedItem = ref(null)
const selectedIndex = ref(-1)
const rating = ref(0)
const comment = ref('')

// Computed properties for filtered data
const pendingReviews = computed(() => {
  return reviewableItems.value.filter((item) => !item.hasReview)
})

const pendingCount = computed(() => pendingReviews.value.length)
const completedCount = computed(() => completedReviews.value.length)

// Format date to local format
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('vi-VN')
}

// Format price with thousand separators
const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('vi-VN').format(price)
}

// Open review modal for new review
const openReviewModal = (item, index) => {
  selectedItem.value = item
  selectedIndex.value = index
  rating.value = 0
  comment.value = ''
  showModal.value = true
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

// Close modal
const closeModal = () => {
  showModal.value = false
  // Reset data after transition
  setTimeout(() => {
    selectedItem.value = null
    selectedIndex.value = -1
    rating.value = 0
    comment.value = ''
  }, 300)
  // Restore body scroll
  document.body.style.overflow = 'auto'
}

// Set rating
const setRating = (newRating) => {
  rating.value = newRating
}

// Fetch reviewable products (pending reviews)
const fetchReviewableProducts = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('/account/reviewable-products')
    if (response.status === 200) {
      // All items from this API are pending reviews
      reviewableItems.value = response.data.data.map((item) => ({
        ...item,
        hasReview: false,
      }))
      console.log(reviewableItems.value)
    }
  } catch (error) {
    console.error('Error fetching reviewable products:', error)
    toast.error('Có lỗi xảy ra khi tải danh sách sản phẩm')
  } finally {
    loading.value = false
  }
}

// Fetch completed reviews (will be implemented later)
const fetchCompletedReviews = async () => {
  loadingCompleted.value = true
  try {
    const response = await apiClient.get('/account/review-product')

    setTimeout(() => {
      completedReviews.value = response.data.data
      console.log(completedReviews.value)
      loadingCompleted.value = false
    }, 1000)
  } catch (error) {
    console.error('Error fetching completed reviews:', error)
    toast.error('Có lỗi xảy ra khi tải danh sách đánh giá')
    loadingCompleted.value = false
  }
}

// Submit review
const submitReview = async () => {
  if (!rating.value) {
    toast.warning('Vui lòng chọn số sao đánh giá')
    return
  }

  submitting.value = true
  try {
    const reviewData = {
      productId: selectedItem.value.productId,
      orderId: selectedItem.value.orderId,
      SKU: selectedItem.value.SKU,
      rating: rating.value,
      comment: comment.value || '',
    }

    console.log(reviewData)
    const response = await apiClient.post('/account/review-product', reviewData)

    if (response.status === 200 || response.status === 201) {
      toast.success('Đánh giá của bạn đã được gửi thành công!')
      reviewableItems.value[selectedIndex.value].hasReview = true
      closeModal()
    }
  } catch (error) {
    console.error('Error submitting review:', error)
    if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Có lỗi xảy ra khi gửi đánh giá')
    }
  } finally {
    submitting.value = false
  }
}

// Watch for tab changes
watch(activeTab, (newTab) => {
  if (newTab === 'completed') {
    fetchCompletedReviews()
  }
})

onMounted(() => {
  fetchReviewableProducts()
})

// Handle ESC key to close modal
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && showModal.value) {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleEscape)

  // Cleanup
  return () => {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = 'auto'
  }
})
</script>

<style scoped>
/* Review Modal Transition Styles */
.review-modal-enter-active {
  transition: all 0.3s ease-out;
}

.review-modal-leave-active {
  transition: all 0.3s ease-in;
}

.review-modal-enter-from {
  opacity: 0;
}

.review-modal-leave-to {
  opacity: 0;
}

/* Backdrop animation */
.review-modal-enter-active .review-modal-backdrop {
  transition: opacity 0.3s ease-out;
}

.review-modal-leave-active .review-modal-backdrop {
  transition: opacity 0.3s ease-in;
}

.review-modal-enter-from .review-modal-backdrop {
  opacity: 0;
}

.review-modal-leave-to .review-modal-backdrop {
  opacity: 0;
}

/* Modal content animation */
.review-modal-enter-active .review-modal-content {
  transition: all 0.3s ease-out;
}

.review-modal-leave-active .review-modal-content {
  transition: all 0.3s ease-in;
}

.review-modal-enter-from .review-modal-content {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.review-modal-leave-to .review-modal-content {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

/* Enhanced star rating animations */
.review-modal-content .transition-colors:hover {
  transform: scale(1.1);
}

/* Button animations */
.review-modal-content button {
  transition: all 0.2s ease;
}

.review-modal-content button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.review-modal-content button:active:not(:disabled) {
  transform: translateY(0);
}

/* Form elements focus animations */
.review-modal-content textarea:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Modal overlay for backdrop click detection */
.review-modal-overlay {
  backdrop-filter: blur(4px);
}
</style>
