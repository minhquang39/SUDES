<template>
  <div class="bg-primaryBg md:px-[14px] lg:px-11 xl:px-30 py-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Cột bên trái - Thông tin giỏ hàng -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg md:text-xl font-bold mb-4">GIỎ HÀNG CỦA BẠN</h2>

            <!-- Tiêu đề bảng -->
            <div class="hidden md:grid grid-cols-12 border-b py-2 font-semibold bg-[#f8f8f8]">
              <div class="col-span-6">THÔNG TIN SẢN PHẨM</div>
              <div class="col-span-2 text-center">ĐƠN GIÁ</div>
              <div class="col-span-2 text-center">SỐ LƯỢNG</div>
              <div class="col-span-2 text-center">THÀNH TIỀN</div>
            </div>

            <!-- Danh sách sản phẩm -->
            <div v-if="cartStore.cart.length > 0">
              <div
                v-for="(item, index) in cartStore.cart"
                :key="index"
                class="grid grid-cols-12 items-center py-3 md:p-2 md:border md:border-[#ebebeb]"
                :class="{ 'border-b border-[#ebebeb]': index !== cartStore.cart.length - 1 }"
              >
                <!-- Thông tin sản phẩm -->
                <div class="col-span-12 md:col-span-6 flex items-center gap-3 mb-1 md:mb-0">
                  <router-link :to="`/${item.slug}`">
                    <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover" />
                  </router-link>
                  <div>
                    <h3 class="font-medium hover:text-hover cursor-pointer">
                      {{ item.name }}
                    </h3>
                    <p class="text-xs text-gray-500" v-if="item.SKU">
                      {{ item.SKU }}
                    </p>
                    <button
                      @click="removeItem(index)"
                      class="text-red-500 font-medium text-sm mt-1 hidden md:block"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                <!-- Đơn giá -->
                <div class="col-span-4 md:col-span-2 text-center">
                  <!-- <p class="md:hidden inline-block font-medium mr-2">Đơn giá:</p> -->
                  <p class="hidden md:block text-red-600 font-semibold">
                    {{ formatPrice(item.price) }}
                  </p>
                </div>

                <!-- Số lượng -->
                <div class="col-span-4 md:col-span-2 flex justify-center">
                  <div class="flex items-center border border-[#e5e5e5]">
                    <button
                      @click="updateQuantity(index, item.quantity - 1)"
                      class="px-2 py-1 border-r border-[#e5e5e5] bg-[#f8f8f8]"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model="item.quantity"
                      class="w-10 text-center focus:outline-none"
                      @change="updateQuantity(index, parseInt($event.target.value))"
                    />
                    <button
                      @click="updateQuantity(index, item.quantity + 1)"
                      class="px-2 py-1 border-l border-[#e5e5e5] bg-[#f8f8f8]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <!-- Thành tiền -->
                <div class="col-span-4 md:col-span-2 text-center">
                  <!-- <p class="md:hidden inline-block font-medium mr-2">Thành tiền:</p> -->
                  <p class="text-red-600 font-semibold">
                    {{ formatPrice(item.price * item.quantity) }}
                  </p>
                </div>
                <div class="col-span-12 flex justify-end md:hidden">
                  <button class="text-red-500 font-medium text-sm mt-1" @click="removeItem(index)">
                    Xoá
                  </button>
                </div>
              </div>
            </div>

            <!-- Giỏ hàng trống -->
            <div v-else class="py-8 text-center">
              <p class="text-gray-500">Giỏ hàng của bạn đang trống</p>
              <router-link
                to="/"
                class="mt-4 inline-block bg-primaryColor text-white px-4 py-2 rounded"
              >
                Tiếp tục mua sắm
              </router-link>
            </div>
          </div>
        </div>

        <!-- Cột bên phải - Thông tin đơn hàng -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-xl font-bold mb-4">THÔNG TIN ĐƠN HÀNG</h2>

            <div class="flex justify-between items-center py-4 border-b">
              <span class="font-bold text-lg">Tổng tiền</span>
              <span class="font-bold text-xl text-red-600">{{ formatPrice(totalAmount) }}</span>
            </div>

            <div class="py-4 text-gray-600">
              <p class="mb-2">• Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
            </div>

            <div class="space-y-3 mt-4">
              <button
                @click="router.push('/checkout')"
                class="w-full bg-green-800 text-white py-3 font-medium rounded hover:bg-green-700 transition"
              >
                Thanh toán ngay
              </button>
              <button
                class="w-full border border-primaryColor text-primaryColor py-3 font-medium rounded hover:bg-gray-50 transition"
              >
                Tiếp tục mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// Tính tổng tiền
const totalAmount = computed(() => {
  return cartStore.cart.reduce((total, item) => total + item.price * item.quantity, 0)
})

// Format giá tiền
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
}

// Cập nhật số lượng sản phẩm
const updateQuantity = async (index, newQuantity) => {
  if (newQuantity <= 0) {
    newQuantity = 1
  }
  const product = cartStore.cart[index]
  await cartStore.updateQuantity(product, newQuantity)
}

// Xóa sản phẩm khỏi giỏ hàng
const removeItem = (index) => {
  const product = cartStore.cart[index]
  console.log(product)
  cartStore.removeItem(product)
}

// Tiếp tục mua hàng
const continueShopping = () => {
  router.push('/')
}

// Thanh toán
const checkout = () => {
  router.push('/checkout')
}
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
