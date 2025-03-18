<template>
  <div>
    <Header v-if="showHeader" />
    <slot></slot>
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'

const route = useRoute()
const showHeader = computed(() => route.meta.showHeader !== false)
const showFooter = computed(() => route.meta.showFooter !== false)
</script>
