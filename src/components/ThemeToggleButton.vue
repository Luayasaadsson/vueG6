<script lang="ts" setup>
import { ref } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

// Hantera tema lokalt i komponenten
const theme = ref<'light' | 'dark'>('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="cursor-pointer hover:scale-110 transition-transform duration-200"
    :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <SunIcon v-if="theme === 'light'" class="w-8 h-8" />
    <MoonIcon v-if="theme === 'dark'" class="w-8 h-8" />
  </button>
</template>
