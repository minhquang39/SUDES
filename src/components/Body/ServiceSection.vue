<template>
  <div class="pb-8">
    <div class="relative">
      <div class="bg-white bg-container relative p-1">
        <div class="wire-left relative"></div>
        <div class="wire-right relative"></div>
        <div class="services-border border border-mainColor">
          <div class="grid grid-cols-12">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="col-span-6 md:col-span-3 border-b md:border-b-0 border-r border-mainColor p-[10px] text-center md:text-left"
            >
              <div
                class="flex flex-col md:flex-row justify-center items-center gap-5 group cursor-pointer"
              >
                <div class="relative icon-service">
                  <img
                    :src="image.image"
                    alt=""
                    width="40"
                    height="40"
                    class="relative z-10 md:-left-5 group-hover:left-0 transition-all duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <h3 class="text-[14px] font-[600] mb-[3px] text-mainColor">{{ image.title }}</h3>
                  <p class="text-xs text-[#666]">{{ image.subscribe }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const images = [
  {
    image: '/images/body/service/ser_1.webp',
    title: 'Giao hàng siêu tốc',
    subscribe: 'Giao hàng trong 24h',
  },
  {
    image: '/images/body/service/ser_2.webp',
    title: 'Tư vấn miễn phí',
    subscribe: 'Đội ngũ tư vấn tận tình',
  },
  {
    image: '/images/body/service/ser_3.webp',
    title: 'Thanh toán',
    subscribe: 'Thanh toán an toàn',
  },
  {
    image: '/images/body/service/ser_4.webp',
    title: 'Giải pháp quà tặng',
    subscribe: 'Dành cho doanh nghiệp',
  },
]
</script>

<style scoped>
.bg-container::before {
  content: '';
  display: block;
  position: absolute;
  width: 1px;
  height: 30px;
  background: #053024;
  bottom: 100%;
  left: 17px;
}
.bg-container::after {
  content: '';
  display: block;
  position: absolute;
  width: 1px;
  height: 30px;
  background: #053024;
  bottom: 100%;
  right: 17px;
}

.icon-service::after {
  content: '';
  display: block;
  width: 50px;
  height: 50px;
  background: #fff3e1;
  position: absolute;
  bottom: -5px;
  left: -5px;
  border-radius: 100px;
  z-index: 0;
}

.wire-left::before {
  content: '';
  display: block;
  width: 7px;
  height: 7px;
  border: 1px solid #053024;
  position: absolute;
  top: 10px;
  left: 10px;
}
.wire-left::after {
  content: '';
  display: block;
  width: 1px;
  height: 13px;
  background: #053024;
  position: absolute;
  top: 0px;
  left: 13px;
}
.wire-right::before {
  content: '';
  display: block;
  width: 7px;
  height: 7px;
  border: 1px solid #053024;
  position: absolute;
  top: 10px;
  right: 10px;
}
.wire-right::after {
  content: '';
  display: block;
  width: 1px;
  height: 13px;
  background: #053024;
  position: absolute;
  top: 0px;
  right: 13px;
}

@media screen and (max-width: 768px) {
  .icon-service::after {
    display: none;
  }
}
</style>
