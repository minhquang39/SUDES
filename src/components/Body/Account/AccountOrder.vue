<template>
  <div>
    <h2 class="text-[#212B25] text-[19px] mb-2 font-normal uppercase">Đơn hàng của bạn</h2>
    <div class="mt-4">
      <!-- Header Row -->
      <div class="hidden md:flex text-white bg-hover text-lg font-bold">
        <div class="flex-1 flex items-center justify-center border-r border-white py-2 px-4">
          <p>Đơn hàng</p>
        </div>
        <div class="flex-1 flex items-center justify-center border-r border-white py-2 px-4">
          <p>Ngày</p>
        </div>
        <div class="flex-1 flex items-center justify-center border-r border-white py-2 px-4">
          <p>Địa chỉ</p>
        </div>
        <div class="flex-1 flex items-center justify-center border-r border-white py-2 px-4">
          <p>Giá trị đơn hàng</p>
        </div>
        <div class="flex-1 flex items-center justify-center py-2 px-4">
          <p>TT thanh toán</p>
        </div>
      </div>

      <!-- Empty Orders Message -->
      <div class="text-center py-8 text-gray-500">
        <p>Không có đơn hàng nào</p>
        <router-link to="/products" class="text-mainColor hover:underline mt-2 inline-block">
          Mua sắm ngay
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'

const authStore = useAuthStore()
const toast = useToast()
const isEditing = ref(false)

const fullName = computed(() => {
  if (authStore.user.firstName && authStore.user.lastName) {
    return `${authStore.user.firstName} ${authStore.user.lastName}`
  }
  return authStore.user.name || 'Chưa cập nhật'
})

const updateInfo = async () => {
  // Xử lý cập nhật thông tin
}
</script>
