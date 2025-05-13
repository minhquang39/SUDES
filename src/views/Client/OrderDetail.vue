<template>
  <div class="max-w-5xl mx-auto px-4 py-8" v-if="order">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Chi tiết đơn hàng #{{ order._id }}</h1>
      <div
        class="mt-2 md:mt-0 px-4 py-2 rounded-full text-sm font-semibold"
        :class="
          order.paymentStatus === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        "
      >
        {{ order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán' }}
      </div>
    </div>

    <div class="mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 pb-4 mb-4 border-b border-gray-200">
          <i class="fas fa-info-circle mr-2"></i>Thông tin đơn hàng
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex flex-col">
            <span class="text-sm text-gray-500">Mã đơn hàng:</span>
            <span class="font-medium text-gray-900">#{{ order._id }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm text-gray-500">Ngày đặt hàng:</span>
            <span class="font-medium text-gray-900">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm text-gray-500">Trạng thái vận chuyển:</span>
            <span
              class="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm font-medium"
            >
              {{ order.orderStatus }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 pb-4 mb-4 border-b border-gray-200">
          <i class="fas fa-map-marker-alt mr-2"></i>Địa chỉ giao hàng
        </h2>
        <div class="mt-2">
          <p class="text-lg font-semibold text-gray-800 mb-2">
            {{ order.shippingAddress?.fullName }}
          </p>
          <p class="text-gray-600 mb-2">
            {{ order.shippingAddress?.addressLine }}, {{ order.shippingAddress?.ward }},
            {{ order.shippingAddress?.district }}, {{ order.shippingAddress?.province }}
          </p>
          <p class="text-gray-600">
            <i class="fas fa-phone-alt mr-2"></i>{{ order.shippingAddress?.phone }}
          </p>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 pb-4 mb-4 border-b border-gray-200">
          <i class="fas fa-shopping-basket mr-2"></i>Sản phẩm đã đặt
        </h2>
        <div class="flex flex-col divide-y divide-gray-200">
          <div
            class="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            v-for="(item, index) in order.items"
            :key="index"
          >
            <div class="md:col-span-6 flex items-center gap-4">
              <img :src="item.image" alt="" class="w-20 h-20 rounded-md" />
              <div>
                <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                <p class="text-xs text-gray-500">SKU: {{ item.SKU }}</p>
              </div>
            </div>
            <div class="md:col-span-2 text-right md:text-center">
              <span class="text-sm text-gray-700">{{ formatPrice(item.price) }}</span>
            </div>
            <div class="md:col-span-2 text-right md:text-center">
              <span class="text-sm text-gray-700">x{{ item.quantity }}</span>
            </div>
            <div class="md:col-span-2 text-right font-medium text-gray-900">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 pb-4 mb-4 border-b border-gray-200">
          <i class="fas fa-receipt mr-2"></i>Tóm tắt đơn hàng
        </h2>
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b border-gray-200">
            <span class="text-gray-600">Tổng tiền sản phẩm:</span>
            <span class="text-gray-800">{{ formatPrice(calculateSubtotal()) }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-200">
            <span class="text-gray-600">Phí vận chuyển:</span>
            <span class="text-gray-800">{{ formatPrice(order.shippingFee || 0) }}</span>
          </div>
          <div class="flex justify-between py-3 font-bold text-lg">
            <span>Tổng thanh toán:</span>
            <span>{{ formatPrice(calculateTotal()) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Thêm nút hủy đơn hàng -->
    <div class="mb-8" v-if="order.orderStatus === 'pending' || order.orderStatus === 'processing'">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 pb-4 mb-4 border-b border-gray-200">
          <i class="fas fa-exclamation-triangle mr-2"></i>Hủy đơn hàng
        </h2>
        <div class="space-y-4">
          <p class="text-gray-600">
            Bạn có thể hủy đơn hàng nếu đơn hàng chưa được xử lý. Sau khi hủy, bạn không thể khôi
            phục lại đơn hàng này.
          </p>
          <div class="flex">
            <button
              @click="showCancelConfirm = true"
              class="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sử dụng component ModalCofirm để xác nhận hủy đơn hàng -->
    <ModalCofirm
      :showConfirm="showCancelConfirm"
      type="đơn hàng"
      @hideConfirm="showCancelConfirm = false"
      @confirmDelete="cancelOrder"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/utils/axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import ModalCofirm from '@/components/ModalCofirm.vue'

const $toast = useToast()

export default {
  components: {
    ModalCofirm,
  },
  setup() {
    const router = useRouter()
    const orderId = router.currentRoute.value.params.id
    const order = ref({})
    const showCancelConfirm = ref(false)
    const cancelingOrder = ref(false)

    const fetchOrderDetail = async () => {
      try {
        const response = await apiClient.get('/account/order/' + orderId)
        if (response.status === 200) {
          order.value = response.data.data
        }
      } catch (error) {
        console.error('Error fetching order detail:', error)
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return '-'
      const date = new Date(dateString)
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh',
      })
    }

    const formatPrice = (price) => {
      if (!price) return '0 ₫'
      return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
    }

    const calculateSubtotal = () => {
      if (!order.value.items || !order.value.items.length) return 0
      return order.value.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    const calculateTotal = () => {
      const subtotal = calculateSubtotal()
      const shippingFee = order.value.shippingFee || 0
      return subtotal + shippingFee
    }

    // Xử lý hủy đơn hàng
    const cancelOrder = async () => {
      try {
        const response = await apiClient.put(`/account/order/${orderId}`, {
          orderStatus: 'cancelled',
        })
        if (response.status === 200) {
          // Hiển thị thông báo thành công
          $toast.success('Đơn hàng đã được hủy thành công')
          showCancelConfirm.value = false
          // Cập nhật lại thông tin đơn hàng
          fetchOrderDetail()
        }
      } catch (error) {
        console.error('Error canceling order:', error)
        $toast.error('Không thể hủy đơn hàng. Vui lòng thử lại sau.')
      } finally {
        cancelingOrder.value = false
      }
    }

    onMounted(() => {
      fetchOrderDetail()
    })

    return {
      order,
      formatDate,
      formatPrice,
      calculateSubtotal,
      calculateTotal,
      showCancelConfirm,
      cancelingOrder,
      cancelOrder,
    }
  },
}
</script>
