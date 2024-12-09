<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDestinationStore } from '@/stores/destinationStore'
import type { SkiDestination } from '../types/DestinationTypes'

const router = useRouter()
const destinationStore = useDestinationStore()

const selectedLocation = ref('')
const selectedDate = ref('')
const searchResults = ref<SkiDestination[]>([])
const hasSearched = ref(false)

// Hämtar aktiviteter för dropdown-menyn
const activities = computed(() => destinationStore.Activities)

// Funktion för att trigga sökningen
const performSearch = () => {
  if (!selectedLocation.value && !selectedDate.value) {
    hasSearched.value = false
    searchResults.value = []
    return
  }

  hasSearched.value = true

  searchResults.value = destinationStore.searchActivities(selectedLocation.value, {
    startDate: selectedDate.value,
  })
}

// Navigerar till vald destination
const selectDestination = (destination: SkiDestination) => {
  router.push(`/destination/${destination.id}`)
}

onMounted(() => {
  destinationStore.fetchActivities()
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <!-- Sökformulär -->
    <div class="flex items-center bg-white p-4 rounded-xl rounded-b-sm shadow-md flex-wrap">
      <!-- Välj destination -->
      <div class="flex-1 min-w-[200px]">
        <label for="selectedLocation" class="block text-sm text-gray-500 mb-1">
          Var vill du bo?
        </label>
        <select
          v-model="selectedLocation"
          id="selectedLocation"
          class="w-full px-3 py-2 md:py-[23px] border border-gray-300 rounded-full rounded-r-xl focus:ring-1 focus:outline-none cursor-pointer"
        >
          <option value="" disabled selected>Välj destination</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.location">
            {{ activity.location }}
          </option>
        </select>
      </div>

      <!-- Välj datum -->
      <div class="flex-1 min-w-[200px]">
        <label for="selectedDate" class="block text-sm text-gray-500 mb-1"> Ankomstdag </label>
        <div class="relative">
          <input
            type="date"
            v-model="selectedDate"
            id="selectedDate"
            class="w-full px-3 py-2 md:py-5 border border-gray-300 rounded-full rounded-l-xl focus:ring-1 focus:outline-none pr-28 md:pr-52 cursor-pointer"
          />
          <button
            @click="performSearch"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 py-[10px] md:py-[22px] bg-red-600 text-white font-bold rounded-full hover:bg-red-700"
          >
            Sök
          </button>
        </div>
      </div>
    </div>

    <!-- Sökresultat -->
    <div v-if="searchResults.length" class="mt-1 border rounded-lg rounded-t-sm shadow-md">
      <div
        v-for="destination in searchResults"
        :key="destination.id"
        class="p-4 hover:bg-gray-50 transition-colors"
      >
        <h3 class="text-lg font-bold">{{ destination.name }}</h3>
        <p>{{ destination.location }}</p>
        <p>{{ destination.description }}</p>
        <p>Pris: {{ destination.pricePerPerson }} kr</p>
        <button
          @click="selectDestination(destination)"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Läs mer
        </button>
      </div>
    </div>

    <!-- Inga resultat -->
    <p v-else-if="hasSearched" class="text-center text-gray-500 mt-4">Inga aktiviteter hittades.</p>
  </div>
</template>
