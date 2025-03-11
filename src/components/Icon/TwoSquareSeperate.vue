<template>
  <div class="relative flex items-center justify-center rotate-90">
    <!-- Top Line (replaces ::before) -->
    <div
      class="absolute w-[25px] h-[1px] transform rotate-90"
      :style="{ backgroundColor: color, top: '30px' }"
    ></div>

    <!-- Bottom Line (replaces ::after) -->
    <div
      class="absolute w-[25px] h-[1px] transform rotate-90"
      :style="{ backgroundColor: color, bottom: '40px' }"
    ></div>

    <!-- Hình vuông 1 -->
    <div
      class="absolute rotate-45 border"
      :style="{ borderColor: color, width: `${size}px`, height: `${size}px` }"
    ></div>

    <!-- Hình vuông 2 (Đè lên một nửa) -->
    <div
      class="absolute rotate-45 -translate-y-9/12 opacity-90 border"
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
      type: Number,
      default: 10,
    },
  },
}
</script>

<style scoped></style>
