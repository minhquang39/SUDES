<template>
  <div class="py-8 mb-10">
    <div class="text-center pt-[30px] bg-section relative -mx-[7px] md:-mx-[45px] xl:-mx-30">
      <div>
        <div class="z-10 relative">
          <TextMontserrat color="#fdc97d" content="Yến sào sudes nest" :size="20" />
          <TextRoboto color="#fff" content="Khách hàng nói về chúng tôi" :size="26" />
          <div class="my-2">
            <TextMontserrat
              color="#fff"
              content="Hơn +50,000 khách hàng đã sử dụng cảm nhận như thế nào về Sudes Nest"
              :size="16"
            />
          </div>
          <div class="my-4"><TwoSquareSeperate color="#fdc97d" :size="10" /></div>
        </div>
        <!-- swiper -->
        <div
          class="slider-container text-black relative z-10 px-[7px] md:px-[45px] xl:px-30 text-left pt-[40px]"
        >
          <!-- Added top padding to accommodate avatars -->
          <swiper
            :slides-per-view="1"
            :space-between="20"
            :breakpoints="{
              360: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }"
            :navigation="false"
            :pagination="false"
            :autoplay="{ delay: progressDuration || 3000, disableOnInteraction: false }"
            :modules="modules"
            @autoplayStart="startProgressBar"
            @autoplayStop="stopProgressBar"
            @slideChange="handleSlideChange"
            @swiper="onSwiper"
            @reachBeginning="updateNavState"
            @reachEnd="updateNavState"
            class="mySwiper swiper-equal-height"
          >
            <swiper-slide
              v-for="(feedback, index) in feedbacks"
              :key="index"
              class="swiper-slide-height !pt-[40px]"
            >
              <div
                class="feedback bg-white relative p-[20px] pt-[46px] z-20 rounded-md shadow-md h-full flex flex-col"
              >
                <div
                  class="avatar-container w-[80px] h-[80px] mx-auto absolute -top-[40px] border-2 border-[#fff] rounded-full shadow-md z-50 overflow-hidden"
                >
                  <img
                    class="w-full h-full rounded-full object-cover"
                    :src="feedback.avatar"
                    alt=""
                  />
                </div>
                <div class="flex-grow flex flex-col">
                  <b class="text-[#333] text-lg font-bold block mt-3">{{ feedback.name }}</b>
                  <p class="text-[#757575] text-sm">{{ feedback.job }}</p>
                  <p class="text-[#333] mt-[12px] text-sm md:text-base leading-relaxed flex-grow">
                    {{ feedback.content }}
                  </p>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <!-- Custom navigation buttons with disabled state -->
          <div class="custom-nav-prev" :class="{ 'nav-disabled': isBeginning }" @click="prevSlide">
            <div class="border-2 border-white h-5 w-5 flex items-center justify-center">
              <ArrowLongLeftIcon class="text-white -rotate-45" />
            </div>
          </div>
          <div class="custom-nav-next" :class="{ 'nav-disabled': isEnd }" @click="nextSlide">
            <div class="border-2 border-white h-5 w-5 flex items-center justify-center">
              <ArrowLongLeftIcon class="text-white -rotate-225" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextMontserrat from '../Icon/TextMontserrat.vue'
import TextRoboto from '../Icon/TextRoboto.vue'
import TwoSquareSeperate from '../Icon/TwoSquareSeperate.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { ref } from 'vue'
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'

const modules = [Pagination, Navigation, Autoplay]
const progressDuration = 5000
const swiperInstance = ref(null)
const isBeginning = ref(true)
const isEnd = ref(false)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
  // Initialize navigation state
  isBeginning.value = true
  isEnd.value = swiper.slides.length <= swiper.params.slidesPerView
}

const startProgressBar = () => {
  // Implementation for progress bar
}

const stopProgressBar = () => {
  // Implementation for stopping progress bar
}

const prevSlide = () => {
  if (swiperInstance.value && !isBeginning.value) {
    swiperInstance.value.slidePrev()
  }
}

const nextSlide = () => {
  if (swiperInstance.value && !isEnd.value) {
    swiperInstance.value.slideNext()
  }
}

const handleSlideChange = () => {
  updateNavState()
}

const updateNavState = () => {
  if (swiperInstance.value) {
    isBeginning.value = swiperInstance.value.isBeginning
    isEnd.value = swiperInstance.value.isEnd
  }
}

const feedbacks = [
  {
    name: 'Ngọc Vy',
    job: 'Kế toán',
    avatar:
      'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/feedback_1_avatar.jpg?1739018973665',
    content:
      'Tôi đã lựa chọn Sudes Nest để dành tặng cho người yêu của mình những món quà thật ý nghĩa.Tôi rất hài lòng với dịch vụ chuyên nghiệp, chất lượng sản phẩm cũng như sự tận tình của Sudes Nest.Chắc chắn rằng tôi sẽ quay lại nhiều lần nữa.',
  },
  {
    name: 'Minh Trần',
    job: 'Lập trình viên',
    avatar:
      'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/feedback_2_avatar.jpg?1739018973665',
    content:
      '"Rất thích sản phẩm của Sudes Nest, trước toàn ra mua trực tiếp, lần này đặt hàng online, được 2 hôm là có hàng, chuẩn mẫu mã, ship nhanh và chất lượng tốt nữa. Tôi sẽ quay lại mua nữa."',
  },
  {
    name: 'Thuỳ Trang',
    job: 'Đầu bếp',
    avatar:
      'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/feedback_3_avatar.jpg?1739018973665',
    content:
      '"Biết đến Sudes Nest khi định mua quà biếu Tết. Sản phẩm đa dạng tha hồ cho các bạn lựa khi đến đây. Giá cả theo mình là rất xứng đáng với chất lượng sản phẩm. Mua online hay offline cũng được."',
  },
  {
    name: 'Hồng Vân',
    job: 'Người mẫu',
    avatar:
      'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/feedback_4_avatar.jpg?1739018973665',
    content:
      '"Tôi đã lựa chọn Sudes Nest để dành tặng cho mẹ yêu của mình những món quà thật ý nghĩa.Tôi rất hài lòng với dịch vụ chuyên nghiệp, chất lượng sản phẩm cũng như sự tận tình của Sudes Nest.Chắc chắn rằng tôi sẽ quay lại nhiều lần nữa."',
  },
]
</script>

<style scoped>
.bg-section::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 300px;
  background-color: #053024;
  top: 0;
  left: 0;
  background-image: url('https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/section_feedback_bg.jpg?1738494458067S');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.feedback::after {
  content: '';
  display: block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.2;
  background-image: url('//bizweb.dktcdn.net/100/506/650/themes/944598/assets/quote.svg?1738494458067');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 20;
}

/* Add Swiper custom styles */
.feedback {
  display: flex;
  flex-direction: column;
}

/* Rest of your styles */
/* Thay đổi cách tiếp cận - sử dụng opacity thay vì transform để hiệu ứng */
.slider-container {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}
.custom-nav-prev,
.custom-nav-next {
  position: absolute;
  top: 50%;
  display: flex;
  width: 24px;
  height: 24px;
  background-color: #053024;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(-50%) rotate(45deg);
}
.custom-nav-prev {
  left: 120px;
  transform: translateY(-50%) translateX(-80px) rotate(45deg); /* Giảm giá trị dịch chuyển X */
}

.custom-nav-next {
  right: 120px;
  transform: translateY(-50%) translateX(80px) rotate(45deg); /* Giảm giá trị dịch chuyển X */
}

/* Chỉ thay đổi opacity khi hover, không di chuyển */
.slider-container:hover .custom-nav-prev,
.slider-container:hover .custom-nav-next {
  opacity: 1;
  transform: translateY(-50%) translateX(0) rotate(45deg); /* Giảm giá trị dịch chuyển X */
}

.custom-nav-prev:hover,
.custom-nav-next:hover {
  background-color: #d0a73c;
}

/* Thêm style cho nút bị disable */
.nav-disabled {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
  pointer-events: none;
}

/* Khi hover vào slider, nút disabled vẫn giữ opacity thấp */
.slider-container:hover .custom-nav-prev.nav-disabled,
.slider-container:hover .custom-nav-next.nav-disabled {
  opacity: 0.3 !important;
}

/* Nút disabled khi hover không đổi màu */
.custom-nav-prev.nav-disabled:hover,
.custom-nav-next.nav-disabled:hover {
  background-color: #053024;
  opacity: 0.3;
}

.custom-nav-prev.nav-disabled {
  opacity: 0.3;
  pointer-events: none;
}

.custom-nav-next.nav-disabled {
  opacity: 0.3;
  pointer-events: none;
}

.custom-nav-prev.nav-disabled:hover,
.custom-nav-next.nav-disabled:hover {
  background-color: #053024;
  opacity: 0.3;
}

@media screen and (max-width: 640px) {
  .custom-nav-prev,
  .custom-nav-next {
    display: none;
  }
}

/* Add these new styles */
.swiper-slide-height {
  overflow: visible !important; /* Allow content to overflow */
}

.slider-container {
  overflow: visible !important; /* Allow content to overflow */
}

/* Fix for swiper wrapper overflow that might cut off avatars */
:deep(.swiper-wrapper) {
  overflow: visible !important;
}

/* Add or update these styles to fix equal height */
:deep(.swiper-wrapper) {
  align-items: stretch !important;
  overflow: visible !important;
}

.swiper-slide-height {
  height: auto !important;
  overflow: visible !important;
  display: flex !important;
}

.feedback {
  display: flex;
  flex-direction: column;
  height: 100% !important; /* Force full height */
  box-sizing: border-box;
}

/* Set a fixed minimum height for mobile */
@media screen and (max-width: 640px) {
  .feedback {
    min-height: 280px; /* Adjust this value as needed */
  }

  .feedback::after {
    width: 30px;
    height: 30px;
  }
}

/* Set a fixed height for larger screens */
@media screen and (min-width: 641px) {
  .feedback {
    height: 300px !important; /* Set your desired fixed height */
  }
}
</style>
