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
  destination.value = destinationStore.destinations.find((d: SkiDestination) => d.id === id)
})
</script>

<template>
  <div v-if="destination" class="container mx-auto px-4 py-8">
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <img
          :src="destination.imageUrl"
          :alt="destination.name"
          class="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          {{ destination.name }}
        </h1>
        <p class="text-gray-600 mb-6">
          {{ destination.description }}
        </p>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-3">Svårighetsgrad</h2>
          <DifficultyTags :difficulty="destination.difficulty" />
        </div>

        <div class="mb-6">
          <PackageList :packages="destination.packages" />
        </div>
      </div>
    </div>
    <BookingForm :destination="destination" class="mt-8" />
  </div>
  <div v-else class="text-center py-8 text-2xl text-gray-600">Ingen upplevelse hittades</div>
</template>
