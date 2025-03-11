<template>
  <div>
    <div class="text-center">
      <TextMontserrat color="#053024" content="Yến sào sudes nest" size="20" />
      <TextRoboto color="#333" content="Đối tác của chúng tôi" size="26" />
      <div class="pt-4"><TwoSquareSeperate color="#053024" size="10" /></div>
    </div>
    <div
      class="flex md:grid md:grid-cols-8 gap-3 py-8 md:py-5 overflow-x-scroll scroll-smooth md:overflow-auto"
    >
      <div
        v-for="(brand, index) in brands"
        :key="index"
        class="w-[40%] flex-shrink-0 md:col-span-1 md:w-full"
      >
        <img :src="brand" alt="" />
      </div>
      <div class="w-[40%] flex-shrink-0 md:col-span-1 md:w-full">
        <img
          src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_brand_1.png?1739018973665"
          alt=""
        />
      </div>
      <div class="w-[40%] flex-shrink-0 md:col-span-1 md:w-full">
        <img
          src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_brand_2.png?1739018973665"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextMontserrat from '../Icon/TextMontserrat.vue'
import TextRoboto from '../Icon/TextRoboto.vue'
import TwoSquareSeperate from '../Icon/TwoSquareSeperate.vue'
const brands = [
  'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_brand_1.png?1739018973665',
  'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_brand_2.png?1739018973665',
  'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_brand_3.png?1739018973665',
  'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_brand_4.png?1739018973665',
  'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_brand_5.png?1739018973665',
  'https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/img_brand_6.png?1739018973665',
]
</script>
