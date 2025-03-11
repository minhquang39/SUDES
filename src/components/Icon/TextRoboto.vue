<template>
  <p :style="{ color: color }" class="font-roboto uppercase font-[800] responsive-text">
    {{ content }}
  </p>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#333',
    },
    size: {
      type: Number,
      default: 26,
    },
    content: { type: String },
  },
}
</script>

<style scoped>
.responsive-text {
  /* Small screens - half the size */
  font-size: calc(v-bind(size) / 2 * 1px + 7px);
}

/* Medium screens and up - full size */
@media (min-width: 768px) {
  .responsive-text {
    font-size: calc(v-bind(size) * 1px);
  }
}
</style>
