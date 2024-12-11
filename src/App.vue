<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import { useThemeStore } from './stores/themeStore'

const themeStore = useThemeStore()

watch(
  () => themeStore.theme,
  (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="min-h-screen bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
  >
    <TheHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>
