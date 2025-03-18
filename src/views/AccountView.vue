<template>
  <div class="bg-primaryBg px-0 lg:px-11 xl:px-30">
    <div class="py-[20px]">
      <div class="flex flex-col md:grid md:grid-cols-12 md:gap-5">
        <div class="col-span-3">
          <div class="bg-white p-[20px]">
            <div>
              <h2 class="text-[#212B25] text-[19px] mb-2 font-normal uppercase">Trang tài khoản</h2>
              <p v-if="user" class="text-[#212B25] text-[19px] mb-7 font-bold">
                Xin chào,
                <span class="text-price">{{ user.first_name + ' ' + user.last_name }}</span> !
              </p>
            </div>
            <div>
              <router-link to="/account">
                <p class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4">
                  Thông tin tài khoản
                </p>
              </router-link>
              <router-link to="/account/orders">
                <p class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4">
                  Đơn hàng của bạn
                </p>
              </router-link>
              <router-link to="/account/changepassword">
                <p class="text-[#212B25] font-normal hover:text-hover cursor-pointer mb-4">
                  Đổi mật khẩu
                </p>
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
          <div class="bg-white p-[20px]">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const user = ref('')

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user'))
  console.log(user)
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
