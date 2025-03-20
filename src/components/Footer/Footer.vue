<template>
  <div
    class="border-t-[4px] border-hover bg-[#053024]"
    style="background-image: url('/images/footer/footer_pattent.png')"
  >
    <!-- Top  -->
    <div class="py-[60px]">
      <div class="px-3 md:px-10 grid grid-cols-12">
        <div class="col-span-12 md:col-span-3 px=[10px]">
          <div class="flex items-center mb-4">
            <img loading="lazy" src="/images/header/logo.webp" alt="Logo" width="200" height="70" />
          </div>
          <div class="flex my-3 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#fdc97d"
              class="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
              ></path>
            </svg>
            <span class="text-white font-medium"
              ><span class="font-bold">Địa chỉ:</span> 70 Lữ Gia, Phường 15, Quận 11, Tp.HCM</span
            >
          </div>
          <div class="flex my-3 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#fdc97d"
              class="bi bi-telephone-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              ></path>
            </svg>
            <span class="text-subColor"
              ><span class="text-white font-bold">Điện thoại:</span> 1900 6750</span
            >
          </div>
          <div class="flex my-3 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#fdc97d"
              class="bi bi-envelope-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"
              ></path>
            </svg>
            <span class="text-subColor"
              ><span class="text-white font-bold">Email:</span> support@sapo.vn</span
            >
          </div>
          <div class="flex gap-3 mt-7">
            <img
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/facebook_2.svg?1739018973665"
              alt=""
            />
            <img
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/instagram_1.svg?1739018973665"
              alt=""
            />
            <img
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/shopee.svg?1739018973665"
              alt=""
            />
            <img
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/lazada.svg?1739018973665"
              width="35"
              height="35"
              alt=""
            />
            <img
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/tiktok.svg?1739018973665"
              alt=""
            />
          </div>
        </div>
        <div class="col-span-12 md:col-span-3 px-[10px]">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-6">
              <div class="relative bottom-2"><TwoSquare color="#fdc97d" /></div>
              <h3
                class="text-white font-[800] font-roboto text-lg tracking-wide uppercase mb-4 flex items-center justify-between"
              >
                Chính sách
              </h3>
            </div>
            <button @click="togglePolicies" class="block text-white text-3xl md:hidden">
              <span v-if="showPolicies">-</span>
              <span v-else>+</span>
            </button>
          </div>
          <ul class="hidden md:block">
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách mua hàng</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách thanh toán</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách vận chuyển</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Cam kết cửa hàng</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách bảo mật</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách thành viên</li>
          </ul>
          <ul v-if="showPolicies" class="md:hidden">
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách mua hàng</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách thanh toán</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách vận chuyển</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Cam kết cửa hàng</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách bảo mật</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Chính sách thành viên</li>
          </ul>
        </div>
        <div class="col-span-12 md:col-span-3 px-[10px]">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-6">
              <div class="relative bottom-2"><TwoSquare color="#fdc97d" /></div>
              <h3
                class="text-white font-[800] font-roboto text-lg tracking-wide uppercase mb-4 flex items-center justify-between"
              >
                Hướng dẫn
              </h3>
            </div>
            <button @click="toggleGuides" class="block text-white text-3xl md:hidden">
              <span v-if="showGuides">-</span>
              <span v-else>+</span>
            </button>
          </div>
          <ul class="hidden md:block">
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Hướng dẫn mua hàng</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Hướng dẫn đổi trả</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Hướng dẫn thanh toán</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Quy định bảo hành</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Hướng dẫn chuyển khoản</li>
          </ul>
          <ul v-if="showGuides">
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Hướng dẫn mua hàng</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Hướng dẫn đổi trả</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Hướng dẫn thanh toán</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Quy định bảo hành</li>
            <li class="mb-1 text-white hover:text-hover cursor-pointer">Hướng dẫn chuyển khoản</li>
          </ul>
        </div>
        <div class="col-span-12 md:col-span-3 px-[10px]">
          <div class="flex items-center gap-6">
            <div class="relative bottom-2"><TwoSquare color="#fdc97d" /></div>
            <h3 class="text-white font-[800] font-roboto text-lg tracking-wide uppercase mb-4">
              Hỗ trợ thanh toán
            </h3>
          </div>
          <div class="mb-8">
            <div class="flex space-x-2">
              <img
                loading="lazy"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/payment_1.png?1739018973665"
                alt="Payment 1"
                class="h-8"
              />
              <img
                loading="lazy"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/payment_2.png?1739018973665"
                alt="Payment 2"
                class="h-8"
              />
              <img
                loading="lazy"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/payment_3.png?1739018973665"
                alt="Payment 3"
                class="h-8"
              />
            </div>
            <div class="flex space-x-2">
              <img
                loading="lazy"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/payment_4.png?1739018973665"
                alt="Payment 4"
                class="h-8"
              />
              <img
                loading="lazy"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/payment_5.png?1739018973665"
                alt="Payment 5"
                class="h-8"
              />
              <img
                loading="lazy"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/payment_6.png?1739018973665"
                alt="Payment 6"
                class="h-8"
              />
            </div>
          </div>
          <div class="flex items-center gap-6">
            <div class="relative bottom-2"><TwoSquare color="#fdc97d" /></div>
            <h3 class="text-white font-[800] font-roboto text-lg tracking-wide uppercase mb-4">
              Chứng nhận
            </h3>
          </div>
          <div class="flex">
            <img
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/certifi_1.png?1739018973665"
              alt=""
              width="150"
              height="50"
            />
            <img
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/certifi_2.png?1739018973665"
              alt=""
              width="100"
              height="50"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Bot  -->
    <div class="bg-[#031913] py-4 px-6">
      <p class="text-white text-center">
        © Bản quyền thuộc về <span class="font-bold">Sudes Team</span> | Cung cấp bởi
        <span class="font-bold hover:text-hover hover:underline cursor-pointer">Sapo</span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import TwoSquare from '../Icon/TwoSquare.vue'

export default {
  components: {
    TwoSquare,
  },
  setup() {
    const showPolicies = ref(false)
    const showGuides = ref(false)

    const togglePolicies = () => {
      showPolicies.value = !showPolicies.value
    }

    const toggleGuides = () => {
      showGuides.value = !showGuides.value
    }

    return {
      showPolicies,
      showGuides,
      togglePolicies,
      toggleGuides,
    }
  },
}
</script>
