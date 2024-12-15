<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HamburgerMenu from './HamburgerMenu.vue'
import ThemeToggleButton from './ThemeToggleButton.vue'
import CartIcon from './CartIcon.vue'
</script>

<template>
  <header class="bg-gray-500 text-white p-4 sticky top-0 z-50">
    <nav class="container mx-auto flex items-center">
      <RouterLink to="/" class="hover:underline hidden md:block">Hem</RouterLink>
      <div class="flex-1"></div>
      <div class="hidden md:block">
        <RouterLink to="/cart" class="hover:scale-110 transition-transform duration-200">
          <CartIcon />
        </RouterLink>
      </div>
      <HamburgerMenu />
      <div class="ml-4 hidden md:flex">
        <ThemeToggleButton />
      </div>
    </nav>
  </header>
</template>
