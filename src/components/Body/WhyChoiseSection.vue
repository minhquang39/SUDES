<template>
  <div>
    <div class="text-center py-[30px]">
      <TextMontserrat content="Yến sào Sudes Net" color="#053024" size="18" />
      <TextRoboto content="Vì sao chọn chúng tôi" color="#333" />
      <div class="py-4">
        <TwoSquareSeperate color="#053024" />
      </div>

      <!-- Mobile  -->
      <div class="md:hidden flex overflow-x-auto scroll-smooth px-[7px] md:px-0">
        <div
          v-for="(item, index) in benefits"
          :key="index"
          class="flex w-[90%] flex-shrink-0 items-center text-start gap-3"
        >
          <div class="img-choice">
            <img :src="item.image" alt="" />
          </div>
          <div>
            <p class="text-[16px] text-[#053024] font-bold">{{ item.title }}</p>
            <p class="text-sm">{{ item.subtitle }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-5">
        <div class="hidden md:flex flex-col items-end">
          <!-- left -->
          <div class="flex py-[10px] mb-[20px] items-center rotate-container">
            <div class="pr-[12px] text-end">
              <p class="font-bold text-xl text-[#053024]">Yến sào cao cấp</p>
              <p class="font-[500] text-[16px] text-[#333]">Hoàn toàn được gia công</p>
            </div>
            <div class="img-choice">
              <img
                class="rotate-image"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_1_icon.png?1739018973665"
                alt=""
              />
            </div>
          </div>
          <div class="flex py-[10px] mb-[20px] items-center rotate-container mr-[10%]">
            <div class="pr-[12px] text-end">
              <p class="font-bold text-xl text-[#053024]">Chất lượng tuyệt đối</p>
              <p class="font-[500] text-[16px] text-[#333]">100% tự nhiên</p>
            </div>
            <div class="img-choice">
              <img
                class="rotate-image"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_2_icon.png?1739018973665"
                alt=""
              />
            </div>
          </div>
          <div class="flex py-[10px] mb-[20px] items-center rotate-container">
            <div class="pr-[12px] text-end">
              <p class="font-bold text-xl text-[#053024]">Sản phẩm</p>
              <p class="font-[500] text-[16px] text-[#333]">Đạt chuẩn ATVSTP</p>
            </div>
            <div class="img-choice">
              <img
                class="rotate-image"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_3_icon.png?1739018973665"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="col-span-3 md:col-span-1 flex justify-center items-center px-[40px] md:px-0">
          <img
            src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/banner_choise.png?1739018973665"
            alt=""
          />
        </div>
        <div class="hidden md:flex flex-col items-start">
          <!-- right -->
          <div class="flex py-[10px] mb-[20px] items-center flex-row-reverse rotate-container">
            <div class="pl-[12px] text-start">
              <p class="font-bold text-xl text-[#053024]">Giá cả hợp lý</p>
              <p class="font-[500] text-[16px] text-[#333]">Không qua trung gian</p>
            </div>
            <div class="img-choice">
              <img
                class="rotate-image"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_4_icon.png?1739018973665"
                alt=""
              />
            </div>
          </div>
          <div
            class="flex py-[10px] mb-[20px] items-center flex-row-reverse rotate-container ml-[10%]"
          >
            <div class="pl-[12px] text-start">
              <p class="font-bold text-xl text-[#053024]">Giao hàng</p>
              <p class="font-[500] text-[16px] text-[#333]">Siêu tốc trong 24h</p>
            </div>
            <div class="img-choice">
              <img
                class="rotate-image"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_5_icon.png?1739018973665"
                alt=""
              />
            </div>
          </div>
          <div class="flex py-[10px] mb-[20px] items-center flex-row-reverse rotate-container">
            <div class="pl-[12px] text-start">
              <p class="font-bold text-xl text-[#053024]">Thanh toán</p>
              <p class="font-[500] text-[16px] text-[#333]">Đa dạng và an toàn</p>
            </div>
            <div class="img-choice">
              <img
                class="rotate-image"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_6_icon.png?1739018973665"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextMontserrat from '../Icon/TextMontserrat.vue'
import TextRoboto from '../Icon/TextRoboto.vue'
import TwoSquareSeperate from '../Icon/TwoSquareSeperate.vue'
export default {
  components: {
    TextMontserrat,
    TextRoboto,
    TwoSquareSeperate,
  },
  setup() {
    const benefits = [
      {
        id: 1,
        image:
          'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_1_icon.png?1739018973665',
        title: 'Yến sào cao cấp',
        subtitle: 'Hoàn toàn được gia công',
      },
      {
        id: 2,
        image:
          'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_2_icon.png?1739018973665',
        title: 'Chất lượng tuyệt đối',
        subtitle: '100% tự nhiên',
      },
      {
        id: 3,
        image:
          'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_3_icon.png?1739018973665',
        title: 'Sản phẩm',
        subtitle: 'Đạt chuẩn ATVSTP',
      },
      {
        id: 4,
        image:
          'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_4_icon.png?1739018973665',
        title: 'Giá cả hợp lý',
        subtitle: 'Không qua trung gian',
      },
      {
        id: 5,
        image:
          'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_5_icon.png?1739018973665',
        title: 'Giao hàng',
        subtitle: 'Siêu tốc trong 24h',
      },
      {
        id: 6,
        image:
          'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/why_choise_6_icon.png?1739018973665',
        title: 'Thanh toán',
        subtitle: 'Đa dạng và an toàn',
      },
    ]
    return { benefits }
  },
}
</script>

<style scoped>
.img-choice {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background: linear-gradient(90deg, #fdc97d, #d0a73c);
  perspective: 1000px;
  transform-style: preserve-3d; /* Move this property to the container */
}

@keyframes spin3d {
  0% {
    transform: rotateY(0deg) rotateX(0deg);
  }
  50% {
    transform: rotateY(180deg) rotateX(0deg);
  }
  100% {
    transform: rotateY(360deg) rotateX(0deg);
  }
}

/* Change target from .rotate-image to .img-choice */
.rotate-container:hover .img-choice {
  animation: spin3d 1s ease-in-out;
  transform-origin: center center;
}

@media screen and (max-width: 768px) {
  .img-choice {
    width: 70px;
    height: 70px;
  }
  .img-choice img {
    width: 60px;
    height: 60px;
  }
}
</style>
