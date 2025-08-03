<template>
  <div class="slider-container">
    <SliderSkeleton v-if="isLoading" />

    <div v-else>
      <swiper
        :navigation="false"
        :autoplay="{ delay: progressDuration, disableOnInteraction: false }"
        :modules="modules"
        @autoplayStart="startProgressBar"
        @autoplayStop="stopProgressBar"
        @slideChange="handleSlideChange"
        @swiper="onSwiper"
        @reachBeginning="updateNavState"
        @reachEnd="updateNavState"
        class="mySwiper"
      >
        <swiper-slide v-for="(slide, index) in slideImages" :key="index">
          <div>
            <img :src="slide.image" :alt="slide.title" />
          </div>
        </swiper-slide>
      </swiper>

      <!-- Custom progressbar -->
      <div class="custom-progress-container">
        <div class="custom-progress-bar" ref="progressBar"></div>
      </div>

      <!-- Custom pagination -->
      <div class="custom-pagination">
        <span
          v-for="(slide, index) in slideImages"
          :key="`dot-${index}`"
          class="pagination-dot"
          :class="{ active: activeIndex === index }"
          @click="goToSlide(index)"
        ></span>
      </div>

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
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { ref, onMounted } from 'vue'
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
import SliderSkeleton from '../Skeleton/SliderSkeleton.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    ArrowLongLeftIcon,
    SliderSkeleton,
  },
  setup() {
    const progressBar = ref(null)
    const progressDuration = 5000
    const swiper = ref(null)
    const isBeginning = ref(true)
    const isEnd = ref(false)
    const isLoading = ref(true)
    const slideImages = [
      { image: '/images/body/slider/slider_1.webp', title: 'Slide 1' },
      { image: '/images/body/slider/slider_2.webp', title: 'Slide 2' },
      { image: '/images/body/slider/slider_3.webp', title: 'Slide 3' },
    ]

    const onSwiper = (swiperInstance) => {
      swiper.value = swiperInstance
      isBeginning.value = swiperInstance.isBeginning
      isEnd.value = swiperInstance.isEnd
    }

    const updateNavState = () => {
      if (swiper.value) {
        isBeginning.value = swiper.value.isBeginning
        isEnd.value = swiper.value.isEnd
      }
    }

    const startProgressBar = () => {
      if (progressBar.value) {
        progressBar.value.style.transition = 'none'
        progressBar.value.style.width = '0%'
        void progressBar.value.offsetWidth // Force reflow
        progressBar.value.style.transition = `width ${progressDuration}ms linear`
        progressBar.value.style.width = '100%'
      }
    }

    const stopProgressBar = () => {
      if (progressBar.value) {
        progressBar.value.style.transition = 'none'
        progressBar.value.style.width = '0%'
      }
    }

    const activeIndex = ref(0)

    const goToSlide = (index) => {
      if (swiper.value) {
        swiper.value.slideTo(index)
      }
    }

    const handleSlideChange = () => {
      if (swiper.value) {
        activeIndex.value = swiper.value.activeIndex
      }
      startProgressBar()
      updateNavState()
    }

    const prevSlide = () => {
      if (swiper.value && !isBeginning.value) {
        swiper.value.slidePrev()
      }
    }

    const nextSlide = () => {
      if (swiper.value && !isEnd.value) {
        swiper.value.slideNext()
      }
    }

    const preloadImages = () => {
      const imagePromises = slideImages.map((slide) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            setTimeout(() => {
              resolve()
            }, 1000) // Độ trễ 2 giây
          }
          img.onerror = () => resolve() // Vẫn tiếp tục nếu có lỗi
          img.src = slide.image
        })
      })

      Promise.all(imagePromises).then(() => {
        isLoading.value = false // Tắt loading khi tất cả ảnh đã được tải
      })
    }

    onMounted(() => {
      preloadImages()
      setTimeout(() => {
        startProgressBar()
      }, 100)
    })

    return {
      modules: [Pagination, Navigation, Autoplay],
      slideImages,
      startProgressBar,
      stopProgressBar,
      handleSlideChange,
      progressDuration,
      progressBar,
      onSwiper,
      prevSlide,
      nextSlide,
      isBeginning,
      isEnd,
      updateNavState,
      activeIndex,
      goToSlide,
      isLoading,
    }
  },
}
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.custom-progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 10;
}

.custom-progress-bar {
  height: 100%;
  width: 0%;
  background-color: #d0a73c;
  transition: width 5000ms linear;
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
  left: 20px;
  transform: translateY(-50%) translateX(-50px) rotate(45deg); 
}

.custom-nav-next {
  right: 20px;
  transform: translateY(-50%) translateX(50px) rotate(45deg); 
}

.slider-container:hover .custom-nav-prev,
.slider-container:hover .custom-nav-next {
  opacity: 1;
  transform: translateY(-50%) translateX(0) rotate(45deg); 
}

.custom-nav-prev:hover,
.custom-nav-next:hover {
  background-color: #d0a73c;
}

.nav-disabled {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
  pointer-events: none;
}

.slider-container:hover .custom-nav-prev.nav-disabled,
.slider-container:hover .custom-nav-next.nav-disabled {
  opacity: 0.3 !important;
}

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

.custom-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  z-index: 20;
}

.pagination-dot {
  width: 10px;
  height: 10px;
  background-color: transparent;
  border: 1px solid #fff;
  transform: rotate(45deg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dot.active {
  background-color: #053024;
  transform: rotate(45deg);
}

@media screen and (max-width: 640px) {
  .custom-nav-prev,
  .custom-nav-next {
    display: none;
  }
}
</style>
