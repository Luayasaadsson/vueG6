<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDestinationStore } from '@/stores/destinationStore'
import type { SkiDestination } from '../types/DestinationTypes'
import BookingForm from '@/components/BookingForm.vue'
import DifficultyTags from '@/components/DifficultyTags.vue'
import PackageList from '@/components/PackageList.vue'

const route = useRoute()
const destinationStore = useDestinationStore()
const destination = ref<SkiDestination | undefined>(undefined)

onMounted(async () => {
  const id = Number(route.params.id)

  if (!destinationStore.destinations.length) {
    await destinationStore.fetchDestinations()
  }
  if (!destinationStore.Activities.length) {
    await destinationStore.fetchActivities()
  }

  destination.value =
    destinationStore.destinations.find((d: SkiDestination) => d.id === id) ||
    destinationStore.Activities.find((d: SkiDestination) => d.id === id)
})
</script>

<template>
  <div v-if="destination" class="container mx-auto px-4 py-8">
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Bild och svårighetsgrad -->
      <div>
        <img
          :src="destination.imageUrl"
          :alt="destination.name"
          class="w-full h-96 object-cover rounded-lg shadow-md mb-6"
        />
        <div v-if="destination.difficulty?.length" class="mb-6">
          <h2 class="text-xl font-semibold mb-3">Svårighetsgrad</h2>
          <DifficultyTags :difficulty="destination.difficulty" />
        </div>
      </div>

      <!-- Text -->
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl font-bold text-light-text dark:text-dark-text mb-4 text-center">
          {{ destination.name }}
        </h1>
        <p class="text-light-text dark:text-dark-text mb-6 text-center">
          {{ destination.description }}
        </p>
      </div>
    </div>

    <!-- Paketlistan -->
    <div v-if="destination.packages?.length" class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Tillgängliga Paket</h2>
      <PackageList :packages="destination.packages" />
    </div>

    <!-- Bokningsformulär -->
    <BookingForm :destination="destination" class="mt-8" />
  </div>

  <!-- Ingen upplevelse hittades -->
  <div
    v-else
    class="flex text-2xl items-center justify-center min-h-screen text-light-text dark:text-dark-text"
  >
    Ingen upplevelse hittades.
  </div>
</template>

