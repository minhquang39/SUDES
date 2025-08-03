<template>
  <div class="grid grid-cols-12 lg:px-11 xl:px-30">
    <div class="lg:col-span-3">
      <div class="p-1 bg-[#052b21] w-[95%]">
        <div class="flex items-center border border-white p-1 relative category_navbar">
          <svg
            class="icon-left mx-[12px]"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89464 0.734784 8 1 8H7C7.26522 8 7.51957 7.89464 7.70711 7.70711C7.89464 7.51957 8 7.26522 8 7V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0V0ZM6 6H2V2H6V6ZM17 0H11C10.7348 0 10.4804 0.105357 10.2929 0.292893C10.1054 0.48043 10 0.734784 10 1V7C10 7.26522 10.1054 7.51957 10.2929 7.70711C10.4804 7.89464 10.7348 8 11 8H17C17.2652 8 17.5196 7.89464 17.7071 7.70711C17.8946 7.51957 18 7.26522 18 7V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0V0ZM16 6H12V2H16V6ZM7 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.2652 0.105357 17.5196 0.292893 17.7071C0.48043 17.8946 0.734784 18 1 18H7C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.26522 8 17V11C8 10.7348 7.89464 10.4804 7.70711 10.2929C7.51957 10.1054 7.26522 10 7 10ZM6 16H2V12H6V16ZM14 10C11.794 10 10 11.794 10 14C10 16.206 11.794 18 14 18C16.206 18 18 16.206 18 14C18 11.794 16.206 10 14 10ZM14 16C12.897 16 12 15.103 12 14C12 12.897 12.897 12 14 12C15.103 12 16 12.897 16 14C16 15.103 15.103 16 14 16Z"
              fill="white"
            ></path>
          </svg>
          <span class="text-white text-[15px] uppercase font-[700]">Danh mục sản phẩm</span>
          <ChevronDownIcon class="size-4 ml-2 inline text-white" />
          <!--  -->
          <div class="absolute w-full left-0 z-50 top-full category_menu">
            <ul
              v-if="categories.length > 0"
              class="w-full h-max bg-white border border-black relative navbar_category"
            >
              <router-link
                v-for="(parentCategory, index) in categories"
                :key="index"
                class="group flex items-center justify-between p-1 border border-[#eee] cursor-pointer"
                :to="`/danh-muc/${parentCategory.slug}`"
              >
                <div class="flex">
                  <span
                    class="group-hover:font-medium text-[#333] group-hover:text-[#fdc97d] group-hover:cursor-pointer text-base pl-2"
                    >{{ parentCategory.name }}</span
                  >
                </div>
                <!-- <ChevronRightIcon v-if="parentCategory.children.length > 0" class="size-5" /> -->
              </router-link>
            </ul>
          </div>
        </div>
        <!--  -->

        <!--  -->
      </div>
    </div>
    <div class="lg:col-span-9">
      <ul class="flex">
        <router-link
          to="/"
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white"
        >
          Trang chủ
        </router-link>
        <router-link
          to="/about"
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white"
        >
          Giới thiệu
        </router-link>

        <li
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white"
        >
          Tin tức
        </li>
        <li
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white group"
        >
          <span>Chính sách</span>
          <ChevronDownIcon class="size-4 ml-2 inline" />
          <ul
            v-if="policies.length > 0"
            class="invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto translate-y-10 group-hover:translate-y-0 transition-all duration-300 absolute bg-white font-normal text-[#666] w-max top-[calc(100%+6px)] right-[calc(-70%)] border border-black z-50"
          >
            <router-link
              v-for="(policy, index) in policies"
              :key="index"
              :to="`/chinh-sach/${policy.slug}`"
              class="block p-2 bg-white font-medium hover:text-[#fdc97d] pr-12 border border-[#eee]"
            >
              {{ policy.title }}
            </router-link>
          </ul>
        </li>
        <router-link
          to="/contact"
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white"
        >
          Liên hệ
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import TwoSquare from '../Icon/TwoSquare.vue'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import apiClient from '@/utils/axios'
export default {
  components: { TwoSquare, ChevronRightIcon, ChevronDownIcon },
  setup() {
    const categories = ref([])
    const policies = ref([])

    onMounted(async () => {
      const [categoriesResponse, policiesResponse] = await Promise.all([
        apiClient.get('/admin/category/parent'),
        apiClient.get('/admin/policy'),
      ])
      if (categoriesResponse.status === 200) {
        categories.value = categoriesResponse.data.data
      }
      if (policiesResponse.status === 200) {
        policies.value = policiesResponse.data.data
      }
    })

    return { categories, policies }
  },
}
</script>

<style scoped>
.nav-item::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 10px;
  top: 40px;
}
.nav-item::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  background: #d0a73c;
  transition:
    width 0.3s ease 0s,
    left 0.3s ease 0s;
  width: 0;
}
.nav-item:hover::after {
  width: 30%;
}

.category_navbar:hover .category_menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.category_menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.list-product:hover,
.list-sub-product li:hover {
  color: #d0a73c;
}

.list-product:hover .list-sub-product {
  display: block;
  color: black;
}
</style>
