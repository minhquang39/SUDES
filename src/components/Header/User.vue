<template>
  <div class="opacity-100 flex relative user-icon" @click.stop="isOpenUserMenu = !isOpenUserMenu">
    <div>
      <UserIcon class="size-7" />
      <span class="text-[10px] hidden md:inline">Tài khoản</span>
    </div>
    <div class="absolute -right-2 lg:right-0 top-1/4">
      <ChevronDownIcon class="size-4" />
    </div>
    <!--  -->
    <div
      class="absolute w-max text-sm bg-white text-black p-3 top-[calc(100%+16px)] right-0 z-[999] user-menu"
      v-show="isOpenUserMenu"
    >
      <div v-if="!authStore.isAuthenticated">
        <router-link
          to="/account/login"
          class="flex items-center gap-2 hover:bg-mainColor hover:text-white rounded pl-2 pr-16 py-1 cursor-pointer"
          @click.stop="isOpenUserMenu = false"
        >
          <ArrowRightStartOnRectangleIcon class="size-5" />
          Đăng nhập
        </router-link>

        <router-link
          to="/account/register"
          class="flex items-center gap-2 hover:bg-mainColor hover:text-white rounded pl-2 pr-16 py-1 cursor-pointer"
          @click.stop="isOpenUserMenu = false"
        >
          <UserPlusIcon class="size-5" />
          Đăng ký
        </router-link>
      </div>
      <div v-else>
        <router-link
          to="/account"
          class="flex items-center gap-2 hover:bg-mainColor hover:text-white rounded pl-2 pr-16 py-1 cursor-pointer"
          @click.stop="isOpenUserMenu = false"
        >
          <UserIcon class="size-5" />
          Tài khoản
        </router-link>
        <div
          class="flex items-center gap-2 hover:bg-mainColor hover:text-white rounded pl-2 pr-16 py-1 cursor-pointer"
          @click.stop="logOut"
        >
          <ArrowLeftStartOnRectangleIcon class="size-5" />
          Đăng xuất
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  UserPlusIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
const isOpenUserMenu = ref(false)
const router = useRouter()
const authStore = useAuthStore()

console.log(authStore.isAuthenticated)

const handleClickOutside = (event) => {
  const userMenu = document.querySelector('.user-menu')
  const userIcon = document.querySelector('.user-icon')

  if (isOpenUserMenu.value && userMenu && userIcon) {
    if (!userMenu.contains(event.target) && !userIcon.contains(event.target)) {
      isOpenUserMenu.value = false
    }
  }
}

const logOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('pendingEmail')
  authStore.logout()
  isOpenUserMenu.value = false
  setTimeout(() => {
    router.push('/account/login')
  }, 1000)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
