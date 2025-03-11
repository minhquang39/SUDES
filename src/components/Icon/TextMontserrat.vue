<template>
  <p :style="{ color: color, fontSize: `${size}px` }" class="uppercase font-[500] responsive-text">
    {{ content }}
  </p>
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
    content: { type: String },
  },
}
</script>

<style scoped>
.responsive-text {
  /* Small screens - half the size */
  font-size: calc(v-bind(size) / 2 * 1px);
}

/* Medium screens and up - full size */
@media (min-width: 768px) {
  .responsive-text {
    font-size: calc(v-bind(size) * 1px);
  }
}
</style>
