<template>
  <div
    class="show-more relative hover-btn"
    :style="{
      backgroundColor: isHovered ? hoverBgColor : bgColor,
      color: isHovered ? hoverTextColor : textColor,
      borderColor: isHovered ? hoverBorderColor : borderColor,
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <svg
      width="14"
      height="32"
      viewBox="0 0 14 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="border-svg border-svg-left"
    >
      <path
        d="M13.3726 0H0.372559V13.2018L3.16222 16L6.37256 19L9.5 16L7.93628 14.5L6.37256 13L0.372559 18.6069V32H13.3726"
        fill="none"
      ></path>
      <path
        d="M13.3726 0H0.372559V13.2018L3.16222 16L6.37256 19L9.5 16L7.93628 14.5L6.37256 13L0.372559 18.6069V32H13.3726"
        stroke="currentColor"
      ></path>
    </svg>
    <span class="text-[16px]">Xem chi tiết</span>
    <svg
      width="14"
      height="32"
      viewBox="0 0 14 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="border-svg border-svg-right"
    >
      <path
        d="M13.3726 0H0.372559V13.2018L3.16222 16L6.37256 19L9.5 16L7.93628 14.5L6.37256 13L0.372559 18.6069V32H13.3726"
        fill="none"
      ></path>
      <path
        d="M13.3726 0H0.372559V13.2018L3.16222 16L6.37256 19L9.5 16L7.93628 14.5L6.37256 13L0.372559 18.6069V32H13.3726"
        stroke="currentColor"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#fdc97d',
    },
    hoverBgColor: {
      type: String,
      default: '#d0a73c',
    },
    textColor: {
      type: String,
      default: '#053024',
    },
    borderColor: {
      type: String,
      default: '#053024',
    },
    hoverTextColor: {
      type: String,
      default: 'white',
    },
    hoverBorderColor: {
      type: String,
      default: 'white',
    },
  },
  data() {
    return {
      isHovered: false,
    }
  },
}
</script>

<style scoped>
.show-more {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 20px;
  transition-duration: 0.3s;
  cursor: pointer;
}

.show-more::before {
  position: absolute;
  display: block;
  border: 1px solid;
  border-left: none;
  border-right: none;
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.37, 0.01, 0, 0.98);
  z-index: 10;
  content: '';
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
}

.border-svg-left {
  position: absolute;
  left: 4px;
}

.border-svg-right {
  position: absolute;
  right: 4px;
  transform: rotate(180deg);
}
</style>
