<template>
  <div class="min-h-screen bg-white flex flex-col items-center py-8 px-4">
    <div class="w-full max-w-4xl">
      <!-- Logo -->
      <div class="text-center mb-6">
        <img
          src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/logo.png?1739018973665"
          alt="Sudes Nest"
          class="mx-auto h-16"
        />
      </div>

      <!-- Loading overlay khi đang xử lý PayPal -->
      <div v-if="isProcessingPaypal" class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              class="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>

        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Đang xử lý đơn hàng...</h1>
        <p class="text-gray-600 mb-6">
          Vui lòng đợi trong khi chúng tôi xác nhận thanh toán PayPal của bạn. Không đóng trang này
          cho đến khi quá trình hoàn tất.
        </p>
      </div>

      <!-- Nội dung chính -->
      <div v-else class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Cảm ơn bạn đã đặt hàng!</h1>
        <p class="text-gray-600 mb-6">
          Đơn hàng của bạn đã được tiếp nhận và đang được xử lý. Chúng tôi sẽ liên hệ với bạn sớm
          nhất có thể.
        </p>

        <div class="space-y-4">
          <div>
            <router-link to="/" class="text-blue-600 hover:underline">
              Tiếp tục mua sắm
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import apiClient from '@/utils/axios'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const isProcessingPaypal = ref(false)

onMounted(async () => {
  // Check if we have the PayPal order ID in the URL
  const paypalOrderId = route.query.token

  if (paypalOrderId) {
    try {
      isProcessingPaypal.value = true

      // Get the shipping address data from localStorage
      const orderData = JSON.parse(localStorage.getItem('orderData'))

      if (!orderData) {
        console.error('No order data found in localStorage')
        isProcessingPaypal.value = false
        return
      }

      // Send request to create order after PayPal payment
      const response = await apiClient.post('/account/payment/paypal/create-order', {
        paypalOrderId: paypalOrderId,
        shippingAddress: orderData,
      })

      console.log('Order created successfully:', response.data)

      // Clear the localStorage data after successful order creation
      localStorage.removeItem('orderData')
      cartStore.cart = []

      // Set a short delay to ensure user sees the success state
      setTimeout(() => {
        isProcessingPaypal.value = false
      }, 1000)
    } catch (error) {
      console.error('Error creating order:', error)
      isProcessingPaypal.value = false
      // Handle error - show message to user
    }
  }
})
</script>
