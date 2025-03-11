<template>
  <div class="bg-primaryBg px-[14px] lg:px-11 xl:px-30">
    <div class="mb-8 -mx-[14px] lg:-mx-11 xl:-mx-30"><Slider /></div>
    <ServiceSection />
    <GiftSection />
    <AboutSection />
    <WhyChoiseSection />
    <BrandSection />
  </div>
</template>

<script>
import Slider from '@/components/Body/Slider.vue'
import ServiceSection from '@/components/Body/ServiceSection.vue'
import TwoSquareSeperate from '@/components/Icon/TwoSquareSeperate.vue'
import AboutSection from '@/components/Body/AboutSection.vue'
import GiftSection from '@/components/Body/GiftSection.vue'
import WhyChoiseSection from '@/components/Body/WhyChoiseSection.vue'
import BrandSection from '@/components/Body/BrandSection.vue'
export default {
  components: {
    Slider,
    ServiceSection,
    TwoSquareSeperate,
    GiftSection,
    AboutSection,
    WhyChoiseSection,
    BrandSection,
  },
  setup() {
    return {}
  },
}
</script>
