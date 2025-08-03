<template>
  <div class="bg-primaryBg px-0 lg:px-11 xl:px-30 min-h-screen">
    <div class="py-[20px]">
      <div class="flex flex-col md:grid md:grid-cols-12 md:gap-5">
        <div class="col-span-3">
          <div class="bg-white p-[20px] h-full">
            <div>
              <h2 class="text-[#212B25] text-[19px] mb-2 font-normal uppercase">Trang tài khoản</h2>
              <p v-if="user" class="text-[#212B25] text-[19px] mb-7 font-bold">
                Xin chào,
                <span class="text-price">{{ user?.first_name + ' ' + user?.last_name }}</span> !
              </p>
            </div>
            <div>
              <router-link
                :to="{ path: '/account', query: { type: 'info' } }"
                class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4 block"
                :class="{ 'text-hover font-medium': currentType === 'info' }"
              >
                Thông tin tài khoản
              </router-link>
              <router-link
                :to="{ path: '/account', query: { type: 'address' } }"
                class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4 block"
                :class="{ 'text-hover font-medium': currentType === 'address' }"
                >Sổ địa chỉ</router-link
              >
              <router-link
                :to="{ path: '/account', query: { type: 'orders' } }"
                class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4 block"
                :class="{ 'text-hover font-medium': currentType === 'orders' }"
              >
                Đơn hàng của bạn
              </router-link>
              <router-link
                :to="{ path: '/account', query: { type: 'reviews' } }"
                class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4 block"
                :class="{ 'text-hover font-medium': currentType === 'reviews' }"
              >
                Đánh giá
              </router-link>
              <router-link
                :to="{ path: '/account', query: { type: 'password' } }"
                class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4 block"
                :class="{ 'text-hover font-medium': currentType === 'password' }"
              >
                Đổi mật khẩu
              </router-link>
              <p
                @click="logOut"
                class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4"
              >
                Đăng xuất
              </p>
            </div>
          </div>
        </div>
        <div class="col-span-9">
          <div class="bg-white p-[20px] h-full">
            <component :is="currentComponent"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AccountInfo from '@/components/Body/Account/AccountInfo.vue'
import AccountOrder from '@/components/Body/Account/AccountOrder.vue'
import ChangePassword from '@/components/Body/Account/ChangePassword.vue'
import AccountAddress from '@/components/Body/Account/AccountAddress.vue'
import AccountReview from '@/components/Body/Account/AccountReview.vue'
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const user = authStore.user

// Lấy type từ query parameter, mặc định là 'info'
const currentType = computed(() => {
  return route.query.type || 'info'
})

// Component tương ứng với type
const currentComponent = computed(() => {
  switch (currentType.value) {
    case 'orders':
      return AccountOrder
    case 'password':
      return ChangePassword
    case 'address':
      return AccountAddress
    case 'reviews':
      return AccountReview
    default:
      return AccountInfo
  }
})

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user'))
})

const logOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  authStore.logout()
  setTimeout(() => {
    router.push('/')
  }, 1000)
}
</script>
