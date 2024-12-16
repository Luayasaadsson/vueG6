<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <button
    @click="goBack"
    class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mb-3"
  >
    <span class="flex gap-1">
      <ArrowLeftIcon class="w-5 h-5 text-white" />
      <p>Tillbaka</p>
    </span>
  </button>
</template>
