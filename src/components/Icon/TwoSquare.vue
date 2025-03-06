<template>
  <div class="relative flex items-center justify-center rotate-90">
    <!-- Hình vuông 1 -->
    <div
      class="absolute w-[10px] h-[10px] rotate-45 border"
      :style="{ borderColor: color, width: `${size}px`, height: `${size}px` }"
    ></div>

    <!-- Hình vuông 2 (Đè lên một nửa) -->
    <div
      class="absolute w-[10px] h-[10px] rotate-45 -translate-y-9/12 opacity-90 border"
      :style="{ borderColor: color, width: `${size}px`, height: `${size}px` }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black',
    },
    size: {
      type: String,
    },
  },
}
</script>
