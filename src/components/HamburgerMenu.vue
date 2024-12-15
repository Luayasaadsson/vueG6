<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggleButton from './ThemeToggleButton.vue'
import CartIcon from './CartIcon.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = (event: MouseEvent) => {
  const menu = document.querySelector('.mobile-nav')
  const button = document.querySelector('.hamburger')
  if (
    isMenuOpen.value &&
    menu &&
    button &&
    !menu.contains(event.target as Node) &&
    !button.contains(event.target as Node)
  ) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div class="relative flex ml-auto">
    <!-- Hamburger-knapp -->
    <button
      class="flex flex-col gap-1.5 bg-transparent border-none cursor-pointer z-[101] md:hidden"
      @click="toggleMenu"
      aria-label="Toggle menu"
    >
      <span
        class="block w-6 h-[3px] bg-white transition-transform duration-300 ease-in-out"
        :class="{ 'translate-y-[9px] rotate-45': isMenuOpen }"
      ></span>
      <span
        class="block w-6 h-[3px] bg-white transition-opacity duration-300 ease-in-out"
        :class="{ 'opacity-0': isMenuOpen }"
      ></span>
      <span
        class="block w-6 h-[3px] bg-white transition-transform duration-300 ease-in-out"
        :class="{ '-translate-y-[8px] -rotate-45': isMenuOpen }"
      ></span>
    </button>

    <!-- Mobilmeny -->
    <nav
      class="fixed top-[3.3rem] right-0 w-full h-full flex flex-col justify-center items-center gap-6 text-white p-8 z-[100] transform transition-transform duration-300 ease-in-out md:hidden"
      :class="[
        isMenuOpen ? 'translate-x-0' : 'translate-x-full',
        'bg-light-background dark:bg-dark-background',
      ]"
    >
      <RouterLink
        @click="toggleMenu"
        to="/"
        class="text-light-text dark:text-dark-text text-[1.2rem] font-bold"
        >Hem</RouterLink
      >
      <RouterLink @click="toggleMenu" to="/cart" class="flex items-center">
        <CartIcon />
      </RouterLink>

      <ThemeToggleButton @click="toggleMenu" class="text-light-text dark:text-dark-text" />
    </nav>
  </div>
</template>
