<template>
  <div class="rounded-sm bg-white w-full h-full">
    <div class="overflow-hidden aspect-square">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="w-full h-full object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
      />
    </div>
    <div class="p-2 border-t-2 border-black">
      <p class="text-center font-medium min-h-[50px] text-sm md:text-base line-clamp-2">
        {{ product.name }}
      </p>
      <div class="flex justify-center items-center gap-2 py-2">
        <p
          v-if="product.variants[0].oldPrice > 0"
          class="text-gray-500 line-through text-xs md:text-sm"
        >
          {{ formatCurrency(product.variants[0].oldPrice) }}₫
        </p>
        <p class="text-price font-bold text-sm md:text-xl">
          {{ formatCurrency(product.variants[0].price) }}₫
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const formatCurrency = (value) => {
  if (!value) return '0'
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
