<template>
  <div class="bg-primaryBg">
    <div class="mb-8"><Slider /></div>
    <ServiceSection />
  </div>
</template>

<script>
import Slider from '@/components/Body/Slider.vue'
import ServiceSection from '@/components/Body/ServiceSection.vue'
export default {
  components: {
    Slider,
    ServiceSection,
  },
  setup() {
    return {}
  },
}
</script>
