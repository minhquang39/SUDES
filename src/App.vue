<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

const route = useRoute()
</script>

<template>
  <Header></Header>
  <router-view :key="$route.fullPath"></router-view>
  <Footer></Footer>
</template>

<style scoped></style>
