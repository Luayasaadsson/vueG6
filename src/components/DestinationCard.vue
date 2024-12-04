<script setup lang="ts">
import type { SkiDestination } from '@/types/DestinationTypes'

const props = defineProps<{ destination: SkiDestination }>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
    <img 
      :src="props.destination.imageUrl" 
      :alt="props.destination.name" 
      class="w-full h-56 object-cover"
    />
    <div class="p-4">
      <h3 class="text-xl font-bold text-gray-800 mb-2">
        {{ props.destination.name }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ props.destination.description }}
      </p>
      <router-link 
        :to="{ name: 'experience-details', params: { id: props.destination.id } }"
        class="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Boka upplevelse
      </router-link>
    </div>
  </div>
</template>
