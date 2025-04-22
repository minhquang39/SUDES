<template>
  <div class="bg-primaryBg px-[14px] lg:px-11 xl:px-30">
    <div class="mb-8 -mx-[14px] lg:-mx-11 xl:-mx-30"><Slider /></div>
    <ServiceSection />
    <GiftSection />
    <AboutSection />
    <CategorySection
      categoryId="67eb677ca07153fe3bf1ffac"
      title="Yến sào Sudes Nest"
      mainText="Tổ Yến"
    />
    <WhyChoiseSection />
    <FeedBackSection />
    <BrandSection />
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
import apiClient from '@/utils/axios'

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
const CategorySection = defineAsyncComponent(() => import('@/components/Body/CategorySection.vue'))
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const $toast = useToast()

onMounted(async () => {
  // Kiểm tra xem có token trong URL không
  const token = route.query.token
  const type = route.query.type // Thêm type để phân biệt loại token

  if (token) {
    try {
      if (type === 'reset-password') {
        // Nếu là token reset password, chuyển đến trang reset password
        router.push({
          path: '/account/reset-password',
          query: { token },
        })
      } else {
        // Xử lý token đăng nhập như cũ
        authStore.setToken(token)
        const response = await apiClient.get('/account/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('response', response.data.data)
        authStore.setUser(response.data.data)
        $toast.success('Đăng nhập thành công!', {
          position: 'top-right',
          duration: 1000,
        })
      }

      // Xóa token khỏi URL để tránh lưu lại trong history
      const newUrl = window.location.pathname
      window.history.replaceState({}, document.title, newUrl)
    } catch (err) {
      console.error('Token error:', err)
      authStore.clearAuth() // Xóa token nếu có lỗi
      $toast.error('Có lỗi xảy ra, vui lòng thử lại', {
        position: 'top-right',
        duration: 1000,
      })
    }
  }
})
</script>
