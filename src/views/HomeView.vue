<template>
  <div class="bg-primaryBg px-[14px] lg:px-11 xl:px-30">
    <div class="mb-8 -mx-[14px] lg:-mx-11 xl:-mx-30"><Slider /></div>
    <ServiceSection />
    <GiftSection />
    <AboutSection />
    <WhyChoiseSection />
    <FeedBackSection />
    <BrandSection />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

// Lazy load components
const Slider = defineAsyncComponent(() => import('@/components/Body/Slider.vue'))
const ServiceSection = defineAsyncComponent(() => import('@/components/Body/ServiceSection.vue'))

const AboutSection = defineAsyncComponent(() => import('@/components/Body/AboutSection.vue'))
const GiftSection = defineAsyncComponent(() => import('@/components/Body/GiftSection.vue'))
const WhyChoiseSection = defineAsyncComponent(
  () => import('@/components/Body/WhyChoiseSection.vue'),
)
const BrandSection = defineAsyncComponent(() => import('@/components/Body/BrandSection.vue'))
const FeedBackSection = defineAsyncComponent(() => import('@/components/Body/FeedBackSection.vue'))
</script>
