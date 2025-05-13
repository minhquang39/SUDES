<template>
  <div>
    <h2 class="text-[#212B25] text-[19px] mb-2 font-normal uppercase">Đơn hàng của bạn</h2>
    <div class="mt-4">
      <!-- Orders Table -->
      <div class="overflow-x-auto">
        <!-- Desktop Table -->
        <table class="w-full border-collapse hidden md:table">
          <!-- Table Header -->
          <thead>
            <tr class="text-white bg-hover text-lg font-bold">
              <th class="py-2 px-4 border-r border-white text-center">Đơn hàng</th>
              <th class="py-2 px-4 border-r border-white text-center">Ngày</th>
              <th class="py-2 px-4 border-r border-white text-center">Địa chỉ</th>
              <th class="py-2 px-4 border-r border-white text-center">Giá trị đơn hàng</th>
              <th class="py-2 px-4 text-center">TT thanh toán</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody v-if="orders && orders.length > 0">
            <tr
              v-for="(order, index) in orders"
              :key="index"
              class="bg-white border-b border-gray-200"
            >
              <td class="py-2 px-4 border-r border-gray-200 text-center text-sm text-gray-700">
                <router-link :to="'/order/' + order._id" class="text-mainColor hover:underline">{{
                  order._id
                }}</router-link>
              </td>
              <td class="py-2 px-4 border-r border-gray-200 text-center text-sm text-gray-700">
                {{ formatDate(order.createdAt) }}
              </td>
              <td class="py-2 px-4 border-r border-gray-200 text-center text-sm text-gray-700">
                {{ order.shippingAddress.addressLine }}
              </td>
              <td class="py-2 px-4 border-r border-gray-200 text-center text-sm text-gray-700">
                {{ formatPrice(order.totalPrice) }} đ
              </td>
              <td
                class="py-2 px-4 text-center text-sm"
                :class="order.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-500'"
              >
                {{ getPaymentStatus(order.paymentStatus) }}
              </td>
            </tr>
          </tbody>

          <!-- Empty Table Message -->
          <tbody v-else>
            <tr>
              <td colspan="5" class="py-8 text-center text-gray-500">
                <p>Không có đơn hàng nào</p>
                <router-link
                  to="/products"
                  class="text-mainColor hover:underline mt-2 inline-block"
                >
                  Mua sắm ngay
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile Cards -->
        <div class="md:hidden">
          <div v-if="orders && orders.length > 0">
            <div
              v-for="(order, index) in orders"
              :key="index"
              class="mb-4 bg-white rounded shadow-sm"
            >
              <div class="border-b p-3 bg-gray-50 font-medium">
                <div class="flex justify-between items-center">
                  <router-link :to="'/order/' + order._id" class="text-mainColor hover:underline">
                    Đơn hàng #{{ order._id }}
                  </router-link>
                  <span
                    :class="order.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-500'"
                  >
                    {{ getPaymentStatus(order.paymentStatus) }}
                  </span>
                </div>
              </div>
              <div class="p-3">
                <div class="grid grid-cols-3 gap-2 py-1">
                  <span class="text-gray-600">Ngày:</span>
                  <span class="col-span-2 text-gray-900">{{ formatDate(order.createdAt) }}</span>
                </div>
                <div class="grid grid-cols-3 gap-2 py-1">
                  <span class="text-gray-600">Địa chỉ:</span>
                  <span class="col-span-2 text-gray-900">{{
                    order.shippingAddress.addressLine
                  }}</span>
                </div>
                <div class="grid grid-cols-3 gap-2 py-1">
                  <span class="text-gray-600">Giá trị:</span>
                  <span class="col-span-2 text-gray-900 font-medium"
                    >{{ formatPrice(order.totalPrice) }} đ</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div v-else class="py-8 text-center text-gray-500">
            <p>Không có đơn hàng nào</p>
            <router-link to="/products" class="text-mainColor hover:underline mt-2 inline-block">
              Mua sắm ngay
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
import apiClient from '@/utils/axios'

export default {
  setup() {
    const authStore = useAuthStore()
    const orders = ref([]) // State to hold orders data

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

    const fetchOrders = async () => {
      try {
        // Fetch orders from the API
        const response = await apiClient.get('/account/order')

        // Check if the response is successful
        if (response.status === 200) {
          orders.value = response.data.data
          // Process orders data as needed
        } else {
          // Handle error response
          console.error('Error fetching orders:', response.statusText)
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error fetching orders:', error)
      }
    }

    onMounted(() => {
      // Fetch orders when the component is mounted
      fetchOrders()
    })

    // Fix the comparison operator in the template
    const getPaymentStatus = (status) => {
      return status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'
    }

    return {
      orders,
      formatDate,
      formatPrice,
      getPaymentStatus,
    }
  },
}
</script>
