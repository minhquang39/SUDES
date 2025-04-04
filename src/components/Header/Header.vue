<template>
  <div>
    <!-- top  -->
    <div v-if="!isHideHeader" class="bg-[#004e3e]">
      <div class="flex px-[7px] lg:px-11 xl:px-30 py-1 justify-between items-center">
        <div class="flex items-center">
          <div class="mr-2">
            <svg viewBox="0 0 166 197" class="w-5 h-5">
              <path
                d="M82.8652955,196.898522 C97.8853137,196.898522 110.154225,184.733014 110.154225,169.792619 L55.4909279,169.792619 C55.4909279,184.733014 67.8452774,196.898522 82.8652955,196.898522 L82.8652955,196.898522 Z"
                class="notification--bellClapper"
                fill="#fdc97d"
              ></path>
              <path
                d="M146.189736,135.093562 L146.189736,82.040478 C146.189736,52.1121695 125.723173,27.9861651 97.4598237,21.2550099 L97.4598237,14.4635396 C97.4598237,6.74321823 90.6498186,0 82.8530327,0 C75.0440643,0 68.2462416,6.74321823 68.2462416,14.4635396 L68.2462416,21.2550099 C39.9707102,27.9861651 19.5163297,52.1121695 19.5163297,82.040478 L19.5163297,135.093562 L0,154.418491 L0,164.080956 L165.706065,164.080956 L165.706065,154.418491 L146.189736,135.093562 Z"
                class="notification--bell"
                fill="#fdc97d"
              ></path>
            </svg>
          </div>

          <span
            v-html="events[current]"
            class="text-white text-[12px] lg:text-sm"
            :class="{ blink: isBlinking }"
          ></span>
        </div>
        <div class="hidden lg:flex">
          <div class="mr-2">
            <svg
              id="Layer_1"
              enable-background="new 0 0 64 64"
              height="23"
              viewBox="0 0 64 64"
              width="23"
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
            >
              <g>
                <path
                  d="m55.267 22.76h-13.732v-14.337c0-2.07-.809-4.019-2.276-5.486-1.468-1.467-3.416-2.276-5.486-2.276h-25.049c-4.28 0-7.762 3.482-7.762 7.762v16.699c0 4.28 3.482 7.762 7.762 7.762h.587v4.762c0 1.474.877 2.781 2.235 3.331.437.177.892.262 1.343.262.939 0 1.855-.373 2.528-1.067l7.04-7.002v14.05c0 4.279 3.486 7.761 7.77 7.761h11.021l7.312 7.273c.688.708 1.608 1.085 2.552 1.085.451 0 .906-.086 1.344-.264 1.356-.549 2.232-1.854 2.232-3.325v-4.77h.579c4.285 0 7.771-3.481 7.771-7.761v-16.7c0-4.277-3.486-7.759-7.771-7.759zm-33.142 7.124c-.396 0-.777.157-1.058.437l-7.785 7.743c-.229.236-.479.185-.61.132-.135-.055-.361-.198-.361-.55v-6.262c0-.829-.671-1.5-1.5-1.5h-2.087c-2.626 0-4.762-2.136-4.762-4.762v-16.699c0-2.626 2.136-4.762 4.762-4.762h25.048c1.27 0 2.464.496 3.365 1.397.901.9 1.397 2.095 1.397 3.364v16.699c0 2.626-2.137 4.762-4.763 4.762h-11.646zm37.913 17.336c0 2.625-2.14 4.761-4.771 4.761h-2.079c-.828 0-1.5.672-1.5 1.5v6.27c0 .348-.226.491-.359.545-.133.053-.385.107-.634-.148l-7.77-7.729c-.281-.279-.661-.437-1.058-.437h-11.64c-2.63 0-4.77-2.136-4.77-4.761v-14.337h8.314c4.065 0 7.403-3.141 7.73-7.123h13.765c2.631 0 4.771 2.135 4.771 4.76v16.699z"
                  fill="#fdc97d"
                ></path>
                <g>
                  <path
                    d="m33.461 36.667c-1.22 0-2.213.994-2.213 2.213s.994 2.213 2.213 2.213c1.221 0 2.215-.994 2.215-2.213s-.993-2.213-2.215-2.213z"
                    fill="#fdc97d"
                  ></path>
                  <path
                    d="m42.747 36.667c-1.22 0-2.213.994-2.213 2.213s.994 2.213 2.213 2.213c1.221 0 2.215-.994 2.215-2.213s-.994-2.213-2.215-2.213z"
                    fill="#fdc97d"
                  ></path>
                  <path
                    d="m52.033 36.667c-1.22 0-2.213.994-2.213 2.213s.994 2.213 2.213 2.213c1.221 0 2.215-.994 2.215-2.213s-.994-2.213-2.215-2.213z"
                    fill="#fdc97d"
                  ></path>
                </g>
                <g>
                  <path
                    d="m20.753 21.827c-.866 0-1.568.722-1.568 1.589 0 .846.681 1.589 1.568 1.589s1.589-.743 1.589-1.589c0-.867-.722-1.589-1.589-1.589z"
                    fill="#fdc97d"
                  ></path>
                  <path
                    d="m21.059 8.54c-3.192 0-4.659 1.892-4.659 3.169 0 .922.78 1.348 1.419 1.348 1.277 0 .757-1.821 3.169-1.821 1.182 0 2.128.52 2.128 1.608 0 1.277-1.324 2.01-2.104 2.672-.686.591-1.585 1.561-1.585 3.595 0 1.23.331 1.584 1.301 1.584 1.159 0 1.395-.52 1.395-.97 0-1.23.024-1.939 1.324-2.956.638-.497 2.648-2.105 2.648-4.328.001-2.222-2.009-3.901-5.036-3.901z"
                    fill="#fdc97d"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div class="text-white text-end">
            <p class="text-xs">Tư vấn mua hàng</p>
            <span class="text-[16px] font-semibold">1900 6750</span>
          </div>
        </div>
      </div>
    </div>
    <!-- body -->
    <div
      v-if="!isHideHeader"
      class="bg-[rgb(18,102,68)] py-[8px]"
      style="background-image: url('/images/header/header_pattent.webp')"
    >
      <div class="grid grid-cols-12 px-[7px] lg:px-11 xl:px-30 gap-4 items-center">
        <div class="col-span-6 sm:col-span-6 lg:col-span-3 order-1 lg:order-1">
          <div class="px-[7px] lg:px-0">
            <router-link to="/" class="flex items-center">
              <img
                loading="lazy"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/logo.png?1739018973665"
                alt="Logo"
                class="h-15"
              />
            </router-link>
          </div>
        </div>
        <div class="col-span-12 sm:col-span-12 lg:col-span-6 order-3 lg:order-2">
          <div class="px-[7px] lg:px-0">
            <SearchBar />
          </div>
        </div>
        <!--  -->
        <div class="col-span-6 sm:col-span-6 lg:col-span-3 order-2 lg:order-3">
          <div class="flex text-white justify-end items-center gap-4 lg:gap-8 px-[7px] lg:px-0">
            <div class="opacity-100 hover:opacity-75 hidden md:block">
              <MapPinIcon class="size-7" />
              <span class="text-[10px] hidden md:inline">Cửa hàng</span>
            </div>
            <User />
            <div class="opacity-100 hover:opacity-75">
              <ShoppingCartIcon class="size-7" />
              <span class="text-[10px] hidden md:inline">Giỏ hàng</span>
            </div>
            <div class="md:hidden" @click="isMenuOpen = true">
              <Bars3Icon class="size-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Bot -->
    <div
      class="bg-[#004e3e] py-[6px] hidden md:block"
      :class="{
        'fixed top-0 left-0 right-0 z-50 shadow-lg': isHideHeader,
        relative: !isHideHeader,
      }"
    >
      <NavBar></NavBar>
    </div>
    <!--  -->
    <div
      class="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-[999]"
      v-if="isMenuOpen"
      @click="isMenuOpen = false"
    ></div>
    <transition
      enter-active-class="animate__animated animate__slideInLeft animate__faster"
      leave-active-class="animate__animated animate__slideOutLeft animate__faster"
    >
      <NavBarMobile v-show="isMenuOpen" @close-menu="isMenuOpen = false" />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import SearchBar from './SearchBar.vue'
import NavBar from './NavBar.vue'
import NavBarMobile from './NavBarMobile.vue'
import { useRouter, useRoute } from 'vue-router'
import User from './User.vue'
import { MapPinIcon, ChevronDownIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/vue/24/solid'

export default {
  components: {
    SearchBar,
    NavBar,
    NavBarMobile,
    MapPinIcon,

    ChevronDownIcon,
    ShoppingCartIcon,

    Bars3Icon,
    User,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const events = ref([
      '<span>[05.09 - 01.10] Càng mua càng giảm: mua 6 tặng <span class="text-[#fdc97d] font-semibold"> 1</span>, mua 10 tặng <span class="text-[#fdc97d] font-semibold"> 2 </span>, mua 20 tặng<span class="text-[#fdc97d] font-semibold"> 5 </span> </span>',
      '<span>Khuyến mãi <span class="text-[#fdc97d] font-semibold">30/4 - 1/5 hấp dẫn nhất mua hè này</span> KHÔNG THỂ BỎ LỠ!!!!</span>',
      '<span>Ưu đãi độc quyền. <span class="text-[#fdc97d] font-semibold">Giảm 30 - 50%</span> cho những ai có ngày sinh trùng với Black Friday.</span>',
    ])
    const isMenuOpen = ref(false)
    const current = ref(0)
    let intervalId = null
    const isBlinking = ref(false)
    const isHideHeader = ref(false)

    // Thêm xử lý click outside

    watch(isMenuOpen, (newVal) => {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    })
    onMounted(() => {
      intervalId = setInterval(() => {
        isBlinking.value = true
        current.value++
        if (current.value > 2) {
          current.value = 0
        }

        setTimeout(() => {
          isBlinking.value = false
        }, 5000)
      }, 3000)
      window.addEventListener('scroll', onScroll)
    })

    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId)
      }
      window.removeEventListener('scroll', onScroll)
    })

    const onScroll = () => {
      isHideHeader.value = window.scrollY > 200
    }

    return {
      events,
      current,
      isBlinking,
      isMenuOpen,
      router,
      route,
      onScroll,
      isHideHeader,
    }
  },
}
</script>

<style scoped>
.blink {
  animation: blink 0.5s ease;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.user-icon::after {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 40px;
  bottom: -20px;
}

/* .user-icon:hover .user-menu {
  display: block;
} */
.user-menu::after {
  content: '';
  position: absolute;
  bottom: 100%;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.05));
}
.user-menu {
  z-index: 999;
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  width: max-content;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
