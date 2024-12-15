<script setup lang="ts">
import { computed } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

defineProps<{
  colorClass?: string
}>()

const destinationStore = useDestinationStore()
const cartCount = computed(() => destinationStore.cartItemCount)
</script>

<template>
  <div class="relative hover:scale-110 transition-transform duration-200">
    <ShoppingCartIcon :class="['h-6 w-6', colorClass]" />
    <div
      v-if="cartCount > 0"
      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
    >
      {{ cartCount }}
    </div>
  </div>
</template>
