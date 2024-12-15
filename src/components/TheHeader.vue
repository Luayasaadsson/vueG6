<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HamburgerMenu from './HamburgerMenu.vue'
import ThemeToggleButton from './ThemeToggleButton.vue'
import CartIcon from './CartIcon.vue'
</script>

<template>
  <header class="bg-gray-500/60 text-white p-4 sticky top-0 z-50">
    <nav class="container mx-auto flex items-center">
      <RouterLink
        to="/"
        class="relative text-2xl font-bold dark:text-dark-text md:absolute md:left-1/2 md:transform md:-translate-x-1/2 overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white dark:after:bg-white after:rounded-full hover:after:w-full after:transition-all after:duration-300"
      >
        SkiEase
      </RouterLink>

      <div class="flex-1"></div>
      <div class="hidden md:block">
        <RouterLink to="/cart" class="hover:scale-110 transition-transform duration-200">
          <CartIcon colorClass="text-white" />
        </RouterLink>
      </div>
      <HamburgerMenu />
      <div class="ml-6 hidden md:flex">
        <ThemeToggleButton />
      </div>
    </nav>
  </header>
</template>
