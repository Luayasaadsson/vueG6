<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-gray-800">
    <h1 class="text-4xl font-bold mb-4">Oops, något gick fel!</h1>
    <p class="mb-6 text-lg">Sidan du letar efter finns inte eller har flyttats.</p>
    <RouterLink to="/" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Tillbaka till startsidan
    </RouterLink>
  </div>
</template>
