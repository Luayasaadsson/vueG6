<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-gray-500 text-white p-4">
    <nav class="container mx-auto flex">
      <div class="mx-auto">
        <RouterLink to="/" class="mr-4 hover:underline">Hem</RouterLink>
        <RouterLink to="/cart" class="hover:underline">Kundvagn</RouterLink>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
