<template>
  <div class="w-full relative">
    <input
      type="text"
      placeholder="Tìm sản phẩm..."
      class="w-10/12 lg:w-11/12 bg-white outline-0 p-2 rounded-l-[4px]"
      @focus="showSuggestions"
      @blur="hideSuggestions"
    />
    <button
      class="absolute h-[40px] w-2/12 lg:w-1/12 bg-[#fdc97d] inline-flex items-center justify-center rounded-r-[4px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        ></path>
      </svg>
    </button>
    <div v-if="isShowSuggestions" class="absolute w-full bg-white">Đề xuất phổ biến</div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const isShowSuggestions = ref(false)

    const showSuggestions = () => {
      isShowSuggestions.value = true
    }
    const hideSuggestions = () => {
      setTimeout(() => {
        isShowSuggestions.value = false
      }, 200)
    }
    return {
      showSuggestions,
      hideSuggestions,
      isShowSuggestions,
    }
  },
}
</script>
