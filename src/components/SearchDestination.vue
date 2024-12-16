<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDestinationStore } from '@/stores/destinationStore'
import type { SkiDestination } from '../types/DestinationTypes'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import CustomDropdown from './CustomDropdown.vue'

const router = useRouter()
const destinationStore = useDestinationStore()

const selectedLocation = ref('')
const dateRange = ref<{ start: string; end: string }>({ start: '', end: '' })
const searchResults = ref<SkiDestination[]>([])
const hasSearched = ref(false)

//Sätter upp flatpickr
onMounted(() => {
  destinationStore.fetchActivities()

  const dateInput = document.getElementById('selectedDate') as HTMLInputElement | null
  if (dateInput) {
    flatpickr(dateInput, {
      mode: 'range',
      dateFormat: 'Y-m-d',
      minDate: '2020-01-01',
      onClose: (selectedDates) => {
        if (selectedDates.length === 2) {
          dateRange.value = {
            start: selectedDates[0].toISOString().split('T')[0],
            end: selectedDates[1].toISOString().split('T')[0],
          }
        }
      },
    })
  } else {
    console.error('Hittar inte datumfältet')
  }
})

// Hämtar aktiviteter för dropdown-menyn
const activities = computed(() => destinationStore.Activities)

// Funktion för att trigga sökningen
const performSearch = () => {
  if (!selectedLocation.value && !dateRange.value.start && !dateRange.value.end) {
    hasSearched.value = false
    searchResults.value = []
    return
  }

  hasSearched.value = true

  searchResults.value = destinationStore.searchActivities(selectedLocation.value, {
    startDate: dateRange.value.start,
    endDate: dateRange.value.end,
  })
}

// Navigerar till vald destination
const selectDestination = (destination: SkiDestination) => {
  router.push(`/destination/${destination.id}`)
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <!-- Sökformulär -->
    <div class="flex items-center bg-white p-4 rounded-xl rounded-b-sm shadow-md flex-wrap">
      <!-- Välj destination -->
      <div class="flex-1 min-w-[200px]">
        <p class="block text-sm text-gray-500 mb-1">Var vill du bo?</p>
        <CustomDropdown
          :options="activities.map((a) => ({ value: a.location, label: a.location }))"
          :selected="selectedLocation"
          placeholder="Välj destination"
          @update:selected="(value) => (selectedLocation = String(value))"
        />
      </div>

      <!-- Välj datum -->
      <div class="flex-1 min-w-[200px]">
        <label for="selectedDate" class="block text-sm text-gray-500 mb-1"> Ankomstdag </label>
        <div class="relative">
          <input
            type="text"
            id="selectedDate"
            placeholder="Välj datum"
            class="w-full px-3 py-2 md:py-5 border text-gray-500 border-gray-300 rounded-full rounded-l-xl focus:ring-1 focus:outline-none pr-28 md:pr-52 cursor-pointer"
          />
          <button
            @click="performSearch"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 py-[10px] md:py-[16px] font-bold rounded-full text-md md:text-2xl"
            style="
              background-image: url('images/gif.webp');
              background-size: cover;
              background-position: center;
            "
          >
            Sök
          </button>
        </div>
      </div>
    </div>

    <!-- Sökresultat -->
    <div v-if="searchResults.length" class="mt-1 border rounded-lg rounded-t-sm shadow-md">
      <div v-for="destination in searchResults" :key="destination.id" class="p-4 transition-colors">
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
    <p v-else-if="hasSearched" class="text-center text-light-text dark:text-dark-text mt-4">
      Inga aktiviteter hittades.
    </p>
  </div>
</template>
