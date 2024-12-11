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
const selectedDays = ref<number>(0)
const totalPersons = ref<number>(0)
const selectedDate = ref<string | null>(null)
const ageCategories = ref<{ [key: string]: number }>({})

// Computed properties
const availablePackages = computed(() => props.destination.packages || [])
const availableDates = computed(() => {
  const selectedPackage = availablePackages.value.find((pkg) => pkg.days === selectedDays.value)
  return selectedPackage?.availableDates || []
})

const availableAgeCategories = computed(() => props.destination.ageCategories || [])

const maxPersonsAllowed = computed(() => {
  const selectedPackage = availablePackages.value.find((pkg) => pkg.days === selectedDays.value)
  return selectedPackage?.maxPersons || 10
})

const calculateTotalPrice = computed(() => {
  return availableAgeCategories.value.reduce((total, category) => {
    const count = ageCategories.value[category.name] || 0
    return total + count * category.price
  }, 0)
})

const isBookingValid = computed(() => {
  return (
    selectedDays.value > 0 &&
    totalPersons.value > 0 &&
    selectedDate.value &&
    Object.values(ageCategories.value).reduce((sum, count) => sum + count, 0) === totalPersons.value
  )
})

// Functions
const incrementCategory = (categoryName: string) => {
  if (
    Object.values(ageCategories.value).reduce((sum, count) => sum + count, 0) < totalPersons.value
  ) {
    ageCategories.value[categoryName] = (ageCategories.value[categoryName] || 0) + 1
  }
}

const decrementCategory = (categoryName: string) => {
  if (ageCategories.value[categoryName] && ageCategories.value[categoryName] > 0) {
    ageCategories.value[categoryName] -= 1
  }
}

const bookDestination = () => {
  if (isBookingValid.value) {
    if (isBookingValid.value) {
      const uniqueId = Number(`${props.destination.id}${Date.now()}`)

      destinationStore.addToCart({
        ...props.destination,
        id: uniqueId,
        bookingDetails: {
          days: selectedDays.value,
          totalPersons: totalPersons.value,
          ageCategories: ageCategories.value,
          totalPrice: calculateTotalPrice.value,
          selectedDate: selectedDate.value,
        },
      })
    }
    alert('Bokning tillagd!')
  }
}

// Watchers
watch(
  () => route.query,
  (newQuery) => {
    selectedDays.value = Number(newQuery.days) || availablePackages.value[0]?.days || 0
    totalPersons.value = Number(newQuery.persons) || 0
    selectedDate.value = (newQuery.date as string) || availableDates.value[0] || null
    ageCategories.value = {}
  },
  { immediate: true },
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
  if (!selectedDays.value && availablePackages.value.length > 0) {
    selectedDays.value = availablePackages.value[0].days
  }
  if (!selectedDate.value && availableDates.value.length > 0) {
    selectedDate.value = availableDates.value[0]
  }
})
</script>

<template>
  <div class="booking-container p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-black">Boka din skidupplevelse</h2>

    <div v-if="availablePackages.length" class="grid md:grid-cols-2 gap-6">
      <!-- Days -->
      <div>
        <label class="block text-gray-700 font-bold mb-2">Antal dagar</label>
        <select v-model="selectedDays" class="w-full px-3 py-2 border rounded-md text-gray-500">
          <option v-for="pkg in availablePackages" :key="pkg.days" :value="pkg.days">
            {{ pkg.name }} ({{ pkg.days }} dagar)
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
          class="w-full px-3 py-2 border rounded-md text-gray-500"
        />
      </div>
    </div>

    <!-- Select date -->
    <div v-if="availableDates.length" class="mt-6">
      <label class="block text-gray-700 font-bold mb-2">Välj datum</label>
      <select v-model="selectedDate" class="w-full px-3 py-2 border rounded-md text-gray-500">
        <option v-for="date in availableDates" :key="date" :value="date">
          {{ date }}
        </option>
      </select>
    </div>

    <div v-else class="mt-6 text-gray-500">Inga datum tillgängliga för detta paket.</div>

    <!-- Age categories -->
    <div v-if="availableAgeCategories.length" class="mt-6">
      <h3 class="text-xl font-semibold mb-4 text-gray-900">Ålderskategorier</h3>
      <div
        v-for="category in availableAgeCategories"
        :key="category.name"
        class="flex items-center justify-between mb-4 text-gray-900"
      >
        <span>
          {{ category.name }}
          ({{ category.minAge }}-{{ category.maxAge }} år)
        </span>
        <div class="flex items-center">
          <button
            @click="decrementCategory(category.name)"
            class="px-3 py-1 bg-gray-200 rounded-l text-gray-900"
          >
            -
          </button>
          <input
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
        <span class="text-xl font-bold text-gray-900">
          Totalt pris: {{ calculateTotalPrice }} kr
        </span>
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
