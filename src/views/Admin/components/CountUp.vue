<template>
  <span>{{ displayValue }}</span>
</template>

<script>
export default {
  name: 'CountUp',
  props: {
    endVal: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 2,
    },
    decimals: {
      type: Number,
      default: 0,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      displayValue: 0,
      animationFrame: null,
      startTime: null,
    }
  },
  mounted() {
    if (this.delay) {
      setTimeout(this.startAnimation, this.delay * 1000)
    } else {
      this.startAnimation()
    }
  },
  beforeUnmount() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  },
  methods: {
    startAnimation() {
      this.startTime = performance.now()
      this.animationFrame = requestAnimationFrame(this.animate)
    },
    animate(timestamp) {
      if (!this.startTime) this.startTime = timestamp

      const progress = Math.min((timestamp - this.startTime) / (this.duration * 1000), 1)
      this.displayValue = this.formatValue(Math.floor(progress * this.endVal))

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(this.animate)
      } else {
        this.displayValue = this.formatValue(this.endVal)
      }
    },
    formatValue(value) {
      return value.toFixed(this.decimals)
    },
  },
}
</script>
