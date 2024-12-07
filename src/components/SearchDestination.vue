<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDestinationStore } from '@/stores/destinationStore'
import type { SkiDestination } from '../types/DestinationTypes'

const destinationStore = useDestinationStore()
const router = useRouter()

const searchQuery = ref('')
const searchResults = ref<SkiDestination[]>([])

const performSearch = () => {
  if (searchQuery.value.length > 2) {
    searchResults.value = destinationStore.searchDestinations(searchQuery.value)
  } else {
    searchResults.value = []
  }
}

const selectDestination = (destination: SkiDestination) => {
  router.push(`/destination/${destination.id}`)
}
</script>

<template>
  <div class="max-w-xl mx-auto px-4 py-6">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Sök skidresor..."
      @input="performSearch"
      class="w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div v-if="searchResults.length" class="mt-2 border border-gray-200 rounded-lg shadow-sm">
      <div
        v-for="destination in searchResults"
        :key="destination.id"
        class="p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
      >
        <h3 class="text-lg font-semibold text-gray-800">
          {{ destination.name }}
        </h3>
        <p class="text-gray-600">{{ destination.location }}</p>
        <button
          @click="selectDestination(destination)"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Visa detaljer
        </button>
      </div>
    </div>
  </div>
</template>
