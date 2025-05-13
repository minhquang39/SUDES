<template>
  <div>
    <Header v-if="showHeader" />
    <div class="overflow-hidden">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'

const route = useRoute()
const showHeader = computed(() => route.meta.isHeader)
const showFooter = computed(() => route.meta.isFooter)
</script>
