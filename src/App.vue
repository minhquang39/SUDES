<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <n-loading-bar-provider>
            <router-view v-slot="{ Component }">
              <transition name="page" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, provide } from 'vue'
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NLoadingBarProvider,
} from 'naive-ui'
import { customLightTheme } from '@/styles/naive-ui-theme'
import '@/assets/styles/animations.css'

// Sử dụng theme tùy chỉnh
const theme = ref(customLightTheme)

// Cung cấp các dịch vụ Naive UI cho bất kỳ component nào
provide('naive-ui-theme', theme)
</script>
