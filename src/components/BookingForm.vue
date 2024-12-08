<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { SkiDestination } from '@/types/DestinationTypes'
import { useDestinationStore } from '@/stores/destinationStore'

// Props
const props = defineProps<{
  destination: SkiDestination
}>()

// Router och Store
const route = useRoute()
const router = useRouter()
const destinationStore = useDestinationStore()

// Reaktiva variabler
const selectedDays = ref(Number(route.query.days) || props.destination.packages[0].days)
const totalPersons = ref(Number(route.query.persons) || 0)
const selectedDate = ref<string | null>((route.query.date as string) || null)
const ageCategories = ref<{ [key: string]: number }>({})

// Computed properties
const maxPersonsAllowed = computed(() => {
  const selectedPackage = props.destination.packages.find((p) => p.days === selectedDays.value)
  return selectedPackage?.maxPersons || 10
})

const availableDates = computed(() => {
  const selectedPackage = props.destination.packages.find((pkg) => pkg.days === selectedDays.value)
  return selectedPackage ? selectedPackage.availableDates : []
})

const calculateTotalPrice = computed(() => {
  let total = 0
  props.destination.ageCategories.forEach((category) => {
    const count = ageCategories.value[category.name] || 0
    total += count * category.price
  })
  return total
})

const isBookingValid = computed(() => {
  return (
    getTotalSelectedPersons() === totalPersons.value &&
    totalPersons.value > 0 &&
    !!selectedDate.value
  )
})

// Functions
const incrementCategory = (categoryName: string) => {
  if (
    getTotalSelectedPersons() < totalPersons.value &&
    totalPersons.value <= maxPersonsAllowed.value
  ) {
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

const bookDestination = () => {
  if (isBookingValid.value) {
    destinationStore.addToCart({
      ...props.destination,
      bookingDetails: {
        days: selectedDays.value,
        totalPersons: totalPersons.value,
        ageCategories: ageCategories.value,
        totalPrice: calculateTotalPrice.value,
        selectedDate: selectedDate.value,
      },
    })
  } else {
    alert('Vänligen fyll i alla fält och välj ett giltigt datum.')
  }
}

// Watchers
watch(
  () => route.query,
  (newQuery) => {
    selectedDays.value = Number(newQuery.days) || props.destination.packages[0].days
    totalPersons.value = Number(newQuery.persons) || 0
    selectedDate.value = (newQuery.date as string) || null
  },
)

watch([selectedDays, totalPersons, selectedDate], ([newDays, newPersons, newDate]) => {
  router.replace({
    query: {
      ...route.query,
      days: newDays,
      persons: newPersons,
      date: newDate,
    },
  })
})

// Lifecycle hook
onMounted(() => {
  if (!selectedDate.value && availableDates.value.length > 0) {
    selectedDate.value = availableDates.value[0]
  }
})
</script>

<template>
  <div class="booking-container p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Boka din skidupplevelse</h2>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- Days -->
      <div>
        <label class="block text-gray-700 font-bold mb-2">Antal dagar</label>
        <select v-model="selectedDays" class="w-full px-3 py-2 border rounded-md">
          <option v-for="pkg in destination.packages" :key="pkg.days" :value="pkg.days">
            {{ pkg.days }} dagar
          </option>
        </select>
      </div>

      <!-- Total persons -->
      <div>
        <label class="block text-gray-700 font-bold mb-2">Antal personer</label>
        <input
          type="number"
          v-model.number="totalPersons"
          min="1"
          :max="maxPersonsAllowed"
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>

    <!-- Select date -->
    <div class="mt-6">
      <label class="block text-gray-700 font-bold mb-2">Välj datum</label>
      <select v-model="selectedDate" class="w-full px-3 py-2 border rounded-md">
        <option v-for="date in availableDates" :key="date" :value="date">
          {{ date }}
        </option>
      </select>
    </div>

    <!-- Age categories -->
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
            type="number"
            :value="ageCategories[category.name] || 0"
            class="w-16 text-center border-t border-b"
            readonly
          />
          <button @click="incrementCategory(category.name)" class="px-3 py-1 bg-gray-200 rounded-r">
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Price and Book button -->
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
