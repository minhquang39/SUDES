<template>
  <div class="admin-layout">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('AdminLayout đã được mount')
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  width: 100%;
}
</style>
