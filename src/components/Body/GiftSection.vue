<template>
  <div class="text-center">
    <TextMontserrat color="#053024" :size="20" content="Yến sào sudes net" />
    <TextRoboto color="#053024" content="Bộ sưu tập quà tặng cao cấp" />
    <div class="max-w-[760px] m-auto pt-3 text-sm lg:text-[16px] text-[#333]">
      Bộ quà tặng Sudes Nest là giải pháp quà Tết, quà Trung Thu, quà tặng doanh nghiệp,.. được lựa
      chọn để kết nối các mối quan hệ xã hội, kết nối tình thân, vun đắp các mối quan hệ thêm bền
      chặt gắn kết.
    </div>
    <div class="py-6">
      <TwoSquareSeperate color="#053024" :size="10" />
    </div>
    <!--  -->
    <div class="">
      <!-- PC: Hiển thị 4 mục -->
      <div class="hidden lg:grid grid-cols-4 gap-4">
        <div class="promo-box group overflow-hidden">
          <div class="overflow-hidden">
            <img
              class="group-hover:scale-105 w-full aspect-[382/574] object-cover transition duration-300"
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_4banner_1.jpg?1739018973665"
              alt="Bộ quà 4 mùa"
            />
          </div>
          <div class="banner-info text-left p-4 group-hover:-translate-y-8 transition duration-300">
            <h3 class="text-lg font-[800]">Bộ quà 4 mùa</h3>
            <span class="text-sm mt-[4px]">Giá chỉ từ 499k</span>
            <p class="text-sm text-[#fdc97d] my-3 italic">Xem ngay >></p>
          </div>
        </div>
        <div class="promo-box group overflow-hidden">
          <div class="overflow-hidden">
            <img
              class="group-hover:scale-105 w-full aspect-[382/574] object-cover transition duration-300"
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_4banner_2.jpg?1739018973665"
              alt="Bộ quà 4 mùa"
            />
          </div>
          <div class="banner-info text-left p-4 group-hover:-translate-y-8 transition duration-300">
            <h3 class="text-lg font-[800]">Bộ quà Lộc Phát</h3>
            <span class="text-sm mt-[4px]">Giá chỉ từ 599k</span>
            <p class="text-sm text-[#fdc97d] my-3 italic">Xem ngay >></p>
          </div>
        </div>
        <div class="promo-box group overflow-hidden">
          <div class="overflow-hidden">
            <img
              class="group-hover:scale-105 w-full aspect-[382/574] object-cover transition duration-300"
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_4banner_3.jpg?1739018973665"
              alt="Bộ quà 4 mùa"
            />
          </div>
          <div class="banner-info text-left p-4 group-hover:-translate-y-8 transition duration-300">
            <h3 class="text-lg font-[800]">Bộ quà Thịnh Vượng</h3>
            <span class="text-sm mt-[4px]">Giá chỉ từ 799k</span>
            <p class="text-sm text-[#fdc97d] my-3 italic">Xem ngay >></p>
          </div>
        </div>
        <div class="promo-box group overflow-hidden">
          <div class="overflow-hidden">
            <img
              class="group-hover:scale-105 w-full aspect-[382/574] object-cover transition duration-300"
              loading="lazy"
              src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_4banner_4.jpg?1739018973665"
              alt="Bộ quà 4 mùa"
            />
          </div>
          <div class="banner-info text-left p-4 group-hover:-translate-y-8 transition duration-300">
            <h3 class="text-lg font-[800]">Bộ quà Tài Lộc</h3>
            <span class="text-sm mt-[4px]">Giá chỉ từ 999k</span>
            <p class="text-sm text-[#fdc97d] my-3 italic">Xem ngay >></p>
          </div>
        </div>
      </div>

      <!-- Mobile: Hiển thị 1.5 mục cuộn ngang -->
      <div class="lg:hidden flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory">
        <div class="promo-box flex-shrink-0 w-[70%] snap-start group overflow-hidden">
          <div class="overflow-hidden">
            <picture>
              <source
                media="(max-width: 480px)"
                loading="lazy"
                srcset="
                  https://bizweb.dktcdn.net/thumb/large/100/506/650/themes/944598/assets/img_4banner_1.jpg?1739018973665
                "
              />
              <img
                class="group-hover:scale-105 w-full aspect-[382/574] object-cover transition duration-300"
                loading="lazy"
                src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_4banner_1.jpg?1739018973665"
                alt="Bộ quà 4 mùa"
              />
            </picture>
          </div>
          <div class="banner-info text-left p-4 group-hover:-translate-y-8 transition duration-300">
            <h3 class="text-lg font-[800]">Bộ quà 4 mùa</h3>
            <span class="text-sm mt-[4px]">Giá chỉ từ 499k</span>
            <p class="text-sm text-[#fdc97d] my-3 italic">Xem ngay >></p>
          </div>
        </div>
        <div class="promo-box flex-shrink-0 w-[70%] snap-start group overflow-hidden">
          <div class="overflow-hidden">
            <img
              class="group-hover:scale-105 w-full aspect-[382/574] object-cover transition duration-300"
              loading="lazy"
              src="https://bizweb.dktcdn.net/thumb/large/100/506/650/themes/944598/assets/img_4banner_2.jpg?1739018973665"
              alt="Bộ quà 4 mùa"
            />
          </div>
          <div class="banner-info text-left p-4 group-hover:-translate-y-8 transition duration-300">
            <h3 class="text-lg font-[800]">Bộ quà Lộc Phát</h3>
            <span class="text-sm mt-[4px]">Giá chỉ từ 599k</span>
            <p class="text-sm text-[#fdc97d] my-3 italic">Xem ngay >></p>
          </div>
        </div>
        <div class="promo-box flex-shrink-0 w-[70%] snap-start group overflow-hidden">
          <div class="overflow-hidden">
            <img
              class="group-hover:scale-105 w-full aspect-[382/574] object-cover transition duration-300"
              loading="lazy"
              src="https://bizweb.dktcdn.net/thumb/large/100/506/650/themes/944598/assets/img_4banner_3.jpg?1739018973665"
              alt="Bộ quà 4 mùa"
            />
          </div>
          <div class="banner-info text-left p-4 group-hover:-translate-y-8 transition duration-300">
            <h3 class="text-lg font-[800]">Bộ quà Thịnh Vượng</h3>
            <span class="text-sm mt-[4px]">Giá chỉ từ 799k</span>
            <p class="text-sm text-[#fdc97d] my-3 italic">Xem ngay >></p>
          </div>
        </div>
        <div class="promo-box flex-shrink-0 w-[70%] snap-start group overflow-hidden">
          <div class="overflow-hidden">
            <img
              class="group-hover:scale-105 w-full aspect-[382/574] object-cover transition duration-300"
              loading="lazy"
              src="https://bizweb.dktcdn.net/thumb/large/100/506/650/themes/944598/assets/img_4banner_4.jpg?1739018973665"
              alt="Bộ quà 4 mùa"
            />
          </div>
          <div class="banner-info text-left p-4 group-hover:-translate-y-8 transition duration-300">
            <h3 class="text-lg font-[800]">Bộ quà Tài Lộc</h3>
            <span class="text-sm mt-[4px]">Giá chỉ từ 999k</span>
            <p class="text-sm text-[#fdc97d] my-3 italic">Xem ngay >></p>
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
}
</script>

<style scoped>
.promo-box {
  position: relative;
}

.promo-box::before {
  position: absolute;
  display: block;
  border: 1px solid #fff;
  opacity: 0.5;
  transition: opacity 0.3s cubic-bezier(0.37, 0.01, 0, 0.98);
  z-index: 1;
  content: '';
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
}

.banner-info {
  display: block;
  width: 100%;
  position: absolute;
  bottom: -45px;
  left: 0;
  padding: 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  color: #fff;
  border-top: 2px solid var(--subColor);
  z-index: 1;
}
</style>
