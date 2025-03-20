<template>
  <div
    class="-mx-[14px] lg:-mx-11 xl:-mx-30 lg:py-[80px] border-t-4 border-b-4 border-[#d0a73c] bg-[#053024]"
    style="
      background-image: url(https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/section_about_bg.jpg?1738494458067);
      background-repeat: no-repeat;
      background-position: top left;
      background-size: cover;
    "
  >
    <div class="md:grid md:grid-cols-2 px-[7px] md:px-[45px] xl:px-30">
      <div class="text-center px-[20px] py-[28px] relative content">
        <TextMontserrat content="Yến sào sudes net" color="white" :size="18" />
        <TextRoboto content="Câu chuyện về sudes net" color="#fdc97d" />
        <div class="pt-4"><TwoSquareSeperate color="#fdc97d" :size="10" /></div>
        <p class="text-white text-[16px] pt-5 text-justify">
          Yến sào Sudes Nest Câu chuyện về Sudes Nest Như quý vị đã biết: "Tài sản lớn nhất của đời
          người là sức khỏe và trí tuệ", có sức khỏe và trí tuệ thì sẽ có tất cả. Sản phẩm yến sào
          là thực phẩm bổ dưỡng mang lại cho Quý vị sức khỏe, trí tuệ và sự trẻ trung. Yến sào được
          thị trường đón nhận với phương châm: "Chất lượng uy tín là thương hiệu". Sản phẩm yến sào
          của Yến sào <span class="font-[600]">Sudes Nest</span> được khai thác và yến nuôi tổ với
          chất lượng tuyệt đối...
        </p>

        <div class="pt-5"><SeeMore /></div>
      </div>
      <div>
        <img
          loading="lazy"
          src="https://bizweb.dktcdn.net/thumb/grande/100/506/650/themes/944598/assets/section_about_product_1.png?1739018973665"
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
import SeeMore from '../Icon/SeeMore.vue'
</script>

<style scoped>
.content {
  background-color: rgba(0, 0, 0, 0.2);
}
.content::after {
  position: absolute;
  display: block;
  border: 1px solid #fdc97d;
  opacity: 0.5;
  z-index: 1;
  content: '';
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
}
</style>
