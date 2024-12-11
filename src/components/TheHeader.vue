<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import HamburgerMenu from './HamburgerMenu.vue'
import ThemeToggleButton from './ThemeToggleButton.vue'

const destinationStore = useDestinationStore()
const cartCount = computed(() => destinationStore.cartItemCount)
</script>

<template>
  <header class="bg-gray-500 text-white p-4">
    <nav class="container mx-auto flex items-center">
      <RouterLink to="/" class="hover:underline hidden md:block">Hem</RouterLink>
      <div class="flex-1"></div>
      <div class="hidden md:block">
        <RouterLink to="/cart" class="flex items-center hover:text-gray-300">
          <ShoppingCartIcon class="h-6 w-6 text-white" />
          <span class="ml-1">({{ cartCount }})</span>
        </RouterLink>
      </div>
      <HamburgerMenu />
      <div class="ml-4 hidden md:flex">
        <ThemeToggleButton />
      </div>
    </nav>
  </header>
</template>
