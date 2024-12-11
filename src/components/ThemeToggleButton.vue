<script lang="ts" setup>
import { useThemeStore } from '@/stores/themeStore'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="cursor-pointer hover:scale-110 transition-transform duration-200"
    :aria-label="themeStore.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <SunIcon v-if="themeStore.theme === 'light'" class="w-8 h-8" />
    <MoonIcon v-if="themeStore.theme === 'dark'" class="w-8 h-8" />
  </button>
</template>
