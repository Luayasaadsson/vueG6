<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { SkiDestination, CartItem } from '@/types/DestinationTypes'
import { useDestinationStore } from '@/stores/destinationStore'
import TheModal from '@/components/TheModal.vue'
import CustomDropdown from './CustomDropdown.vue'

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
const currentBookingId = ref<number | null>(null)
const isModalOpen = ref(false)
const modalContent = ref('')

// Computed properties
const availablePackages = computed(() => props.destination.packages || [])
const availableDates = computed(() => {
  if (selectedDays.value > 0) {
    const selectedPackage = availablePackages.value.find((pkg) => pkg.days === selectedDays.value)
    return selectedPackage?.availableDates || []
  }
  return availablePackages.value.flatMap((pkg) => pkg.availableDates) || []
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

const showModal = (content: string) => {
  modalContent.value = content
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const bookDestination = () => {
  if (isBookingValid.value) {
    if (currentBookingId.value) {
      destinationStore.removeFromCart(currentBookingId.value)
    }
    const uniqueId = Number(`${props.destination.id}${Date.now()}`)
    destinationStore.addToCart({
      ...props.destination,
      id: uniqueId,
      originalDestinationId: props.destination.id,
      bookingDetails: {
        days: selectedDays.value,
        totalPersons: totalPersons.value,
        ageCategories: ageCategories.value,
        totalPrice: calculateTotalPrice.value,
        selectedDate: selectedDate.value,
      },
    })
    showModal(currentBookingId.value ? 'Bokning uppdaterad!' : 'Bokning tillagd!')
  }
}

// Watchers
watch(
  () => route.query,
  (newQuery) => {
    selectedDays.value = newQuery.days ? Number(newQuery.days) : 0
    totalPersons.value = newQuery.persons ? Number(newQuery.persons) : 0
    selectedDate.value = newQuery.date ? (newQuery.date as string) : null
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
  const queryBookingId = route.query.bookingId ? Number(route.query.bookingId) : null
  if (queryBookingId) {
    const existingBooking = destinationStore.cart.find(
      (item: CartItem) => item.id === queryBookingId,
    )
    if (existingBooking && existingBooking.bookingDetails) {
      currentBookingId.value = queryBookingId
      selectedDays.value = existingBooking.bookingDetails.days
      totalPersons.value = existingBooking.bookingDetails.totalPersons
      selectedDate.value = existingBooking.bookingDetails.selectedDate
      ageCategories.value = { ...existingBooking.bookingDetails.ageCategories }
    }

    console.log('Laddar befintlig bokning:', existingBooking)
    console.log('Laddade ageCategories:', ageCategories.value)
  }
})
</script>

<template>
  <div
    class="booking-container p-8 bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg"
  >
    <h2 class="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white text-center">
      Boka din skidupplevelse
    </h2>

    <div v-if="availablePackages.length" class="grid md:grid-cols-2 gap-8">
      <!-- Days -->
      <div>
        <label class="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Antal dagar
        </label>

        <CustomDropdown
          :options="
            availablePackages.map((pkg) => ({
              value: pkg.days,
              label: `${pkg.name} (${pkg.days} dagar)`,
            }))
          "
          :selected="selectedDays"
          placeholder="Välj antal dagar"
          customClass="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          @update:selected="(value) => (selectedDays = Number(value))"
        />
      </div>

      <!-- Total persons -->
      <div>
        <label class="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Antal personer
        </label>
        <CustomDropdown
          :options="
            Array.from({ length: maxPersonsAllowed }, (_, i) => ({
              value: i + 1,
              label: `${i + 1} person${i > 0 ? 'er' : ''}`,
            }))
          "
          :selected="totalPersons"
          placeholder="Välj antal personer"
          customClass="w-full px-4 py-3 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
          @update:selected="(value) => (totalPersons = Number(value))"
        />
      </div>
    </div>

    <!-- Select date -->
    <div v-if="availableDates.length" class="mt-8">
      <label class="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Välj ankomstdag
      </label>
      <CustomDropdown
        :options="availableDates.map((date) => ({ value: date, label: date }))"
        :selected="selectedDate"
        placeholder="Välj datum"
        customClass="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        @update:selected="(value) => (selectedDate = String(value))"
      />
    </div>

    <div v-else class="mt-8 text-gray-500 dark:text-gray-400">
      Inga datum tillgängliga för detta paket.
    </div>

    <!-- Age categories -->
    <div v-if="availableAgeCategories.length" class="mt-8">
      <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Ålderskategorier</h3>
      <div
        v-for="category in availableAgeCategories"
        :key="category.name"
        class="flex items-center justify-between mb-4"
      >
        <span class="text-gray-700 dark:text-gray-300">
          {{ category.name }}
          ({{ category.minAge }}-{{ category.maxAge }} år)
        </span>
        <div class="flex items-center">
          <button
            @click="decrementCategory(category.name)"
            class="px-4 py-2 bg-gray-200 rounded-full text-gray-900 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            -
          </button>
          <input
            :value="ageCategories[category.name] || 0"
            class="w-10 text-center text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none"
            readonly
          />

          <button
            @click="incrementCategory(category.name)"
            class="px-4 py-2 bg-gray-200 rounded-full text-gray-900 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <!-- Price and Book button -->
    <div class="mt-10 flex flex-col md:flex-row items-center justify-between">
      <div>
        <span class="text-2xl font-extrabold text-gray-800 dark:text-white">
          Totalt pris: {{ calculateTotalPrice }} kr
        </span>
      </div>
      <button
        @click="bookDestination"
        :disabled="!isBookingValid"
        class="mt-6 md:mt-0 px-8 py-3 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Boka nu
      </button>
    </div>

    <TheModal
      :isOpen="isModalOpen"
      :title="'Bokningsdetaljer'"
      :content="modalContent"
      :showCartButton="true"
      @close="closeModal"
    />
  </div>
</template>
