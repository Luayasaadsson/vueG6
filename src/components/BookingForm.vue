<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { SkiDestination } from '@/types/DestinationTypes'
import { useDestinationStore } from '@/stores/destinationStore'

const props = defineProps<{
  destination: SkiDestination
}>()

const route = useRoute()
const router = useRouter()
const destinationStore = useDestinationStore()

const selectedDays = ref(Number(route.query.days) || props.destination.packages[0].days)
const totalPersons = ref(Number(route.query.persons) || 0)
const ageCategories = ref<{ [key: string]: number }>({})

const maxPersonsAllowed = computed(
  () => props.destination.packages.find((p) => p.days === selectedDays.value)?.maxPersons || 10,
)

watch(
  () => route.query,
  (newQuery) => {
    selectedDays.value = Number(newQuery.days) || props.destination.packages[0].days
    totalPersons.value = Number(newQuery.persons) || 0
  },
)

const incrementCategory = (categoryName: string) => {
  if (getTotalSelectedPersons() < totalPersons.value) {
    ageCategories.value[categoryName] = (ageCategories.value[categoryName] || 0) + 1
  }
}

const decrementCategory = (categoryName: string) => {
  if (ageCategories.value[categoryName] && ageCategories.value[categoryName] > 0) {
    ageCategories.value[categoryName] -= 1
  }
}

const getTotalSelectedPersons = () => {
  return Object.values(ageCategories.value).reduce((a, b) => a + b, 0)
}

const calculateTotalPrice = computed(() => {
  let total = 0
  props.destination.ageCategories.forEach((category) => {
    const count = ageCategories.value[category.name] || 0
    total += count * category.price
  })
  return total
})

const isBookingValid = computed(() => {
  return getTotalSelectedPersons() === totalPersons.value && totalPersons.value > 0
})

const bookDestination = () => {
  if (isBookingValid.value) {
    destinationStore.addToCart({
      ...props.destination,
      bookingDetails: {
        days: selectedDays.value,
        totalPersons: totalPersons.value,
        ageCategories: ageCategories.value,
        totalPrice: calculateTotalPrice.value,
      },
    })
  }
}

watch([selectedDays, totalPersons], ([newDays, newPersons]) => {
  router.replace({
    query: {
      ...route.query,
      days: newDays,
      persons: newPersons,
    },
  })
})
</script>

<template>
  <div class="booking-container p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Boka din skidupplevelse</h2>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- Dagar -->
      <div>
        <label class="block text-gray-700 font-bold mb-2">Antal dagar</label>
        <select v-model="selectedDays" class="w-full px-3 py-2 border rounded-md">
          <option v-for="pkg in destination.packages" :key="pkg.days" :value="pkg.days">
            {{ pkg.days }} dagar
          </option>
        </select>
      </div>

      <!-- Totalt antal personer -->
      <div>
        <label class="block text-gray-700 font-bold mb-2">Antal personer</label>
        <input
          v-model.number="totalPersons"
          :max="maxPersonsAllowed"
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>

    <!-- Ålderskategorier -->
    <div class="mt-6">
      <h3 class="text-xl font-semibold mb-4">Ålderskategorier</h3>
      <div
        v-for="category in destination.ageCategories"
        :key="category.name"
        class="flex items-center justify-between mb-4"
      >
        <span>
          {{ category.name }}
          ({{ category.minAge }}-{{ category.maxAge }} år)
        </span>
        <div class="flex items-center">
          <button @click="decrementCategory(category.name)" class="px-3 py-1 bg-gray-200 rounded-l">
            -
          </button>
          <input

            :value="ageCategories[category.name] || 0"
            :max="totalPersons"
            class="w-16 text-center border-t border-b"
            readonly
          />
          <button @click="incrementCategory(category.name)" class="px-3 py-1 bg-gray-200 rounded-r">
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Pris och Boka-knapp -->
    <div class="mt-6 flex justify-between items-center">
      <div>
        <span class="text-xl font-bold"> Totalt pris: {{ calculateTotalPrice }} kr </span>
      </div>
      <button
        @click="bookDestination"
        :disabled="!isBookingValid"
        class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        Boka nu
      </button>
    </div>
  </div>
</template>
