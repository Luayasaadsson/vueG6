<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import {
  TrashIcon,
  ShoppingBagIcon,
  GlobeAltIcon,
  PencilSquareIcon,
} from '@heroicons/vue/24/outline'
import type { CartItem } from '@/types/DestinationTypes'
import TheModal from '@/components/TheModal.vue'
import BackButton from '@/components/BackButton.vue'

const destinationStore = useDestinationStore()
const cartItems = computed(() => destinationStore.cart)
const router = useRouter()

const isModalOpen = ref(false)
const modalContent = ref('')
const confirmAction = ref<null | (() => void)>(null)

const showModal = (content: string, action: () => void) => {
  modalContent.value = content
  confirmAction.value = action
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  confirmAction.value = null
}

const removeFromCart = (item: CartItem) => {
  destinationStore.removeFromCart(item.id)
}

const clearCart = () => {
  showModal('Är du säker på att du vill tömma kundvagnen?', () => {
    destinationStore.clearCart()
    closeModal()
  })
}

const goToCheckout = () => {
  router.push('/checkout')
}

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + (item.bookingDetails?.totalPrice || 0), 0),
)

const editBooking = (item: CartItem) => {
  if (item.originalDestinationId && item.bookingDetails) {
    router.push({
      name: 'destination-details',
      params: { id: item.originalDestinationId.toString() },
      query: {
        days: item.bookingDetails.days.toString(),
        persons: item.bookingDetails.totalPersons.toString(),
        date: item.bookingDetails.selectedDate || '',
        bookingId: item.id.toString(),
      },
    })
  } else {
    console.error('Kan inte ändra bokning då originalDestinationId eller bookingDetails saknas.')
  }
}
</script>

<template>
  <div
    class="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300"
  >
    <BackButton />
    <h1
      class="text-4xl font-extrabold text-center mb-8 flex items-center justify-center space-x-2 text-gray-900 dark:text-gray-100"
    >
      <ShoppingBagIcon class="w-10 h-10 text-gray-900 dark:text-gray-100" />
      <span>Kundvagn</span>
    </h1>
    <div v-if="cartItems.length" class="w-full sm:w-4/5 mx-auto space-y-6">
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        :class="{
          'border-t-2 border-b-2 border-gray-200 dark:border-gray-700': index === 0,
          'border-b-2 border-gray-200 dark:border-gray-700': index !== 0,
        }"
        class="py-6 transition-colors duration-300"
      >
        <div class="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <img
            :src="item.imageUrl"
            :alt="item.name"
            class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
          />
          <div class="flex-1 text-gray-900 dark:text-gray-100">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2">{{ item.name }}</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Dagar: <span class="font-medium">{{ item.bookingDetails?.days }}</span>
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              Personer: <span class="font-medium">{{ item.bookingDetails?.totalPersons }}</span>
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              Valt datum: <span class="font-medium">{{ item.bookingDetails?.selectedDate }}</span>
            </p>
            <p class="text-lg font-bold mt-2">{{ item.bookingDetails?.totalPrice }} kr</p>
          </div>

          <div class="flex space-x-4">
            <button
              @click="editBooking(item)"
              class="p-3 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition rounded-lg"
            >
              <PencilSquareIcon
                class="w-8 h-8 text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400"
              />
            </button>

            <button
              @click="removeFromCart(item)"
              class="p-3 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition rounded-lg"
            >
              <TrashIcon
                class="w-8 h-8 text-gray-900 dark:text-gray-100 hover:text-red-500 dark:hover:text-red-400"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="text-right mt-4 mb-6">
        <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Totalt pris: {{ totalPrice }} kr
        </p>
      </div>
      <div class="flex flex-col sm:flex-row justify-between pb-8 space-y-4 sm:space-y-0">
        <button
          @click="clearCart"
          class="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition focus:outline-none focus:ring-0 flex items-center space-x-2"
        >
          <TrashIcon class="w-5 h-5 text-white" />
          <span>Töm kundvagn</span>
        </button>
        <button
          @click="goToCheckout"
          class="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition focus:outline-none focus:ring-0 flex items-center space-x-2"
        >
          <ShoppingBagIcon class="w-5 h-5 text-white" />
          <span>Gå till kassan</span>
        </button>
      </div>
    </div>
    <div v-else class="text-gray-600 dark:text-gray-300 text-center">
      <p class="text-xl">Din kundvagn är tom.</p>
      <button
        @click="$router.push('/')"
        class="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mx-auto"
      >
        <GlobeAltIcon class="h-5 w-5 mr-2 text-white" />
        <span>Utforska Destinationer</span>
      </button>
    </div>
  </div>
  <TheModal
    :isOpen="isModalOpen"
    :title="'Är du säker?'"
    :content="modalContent"
    @close="closeModal"
  >
    <template #actions>
      <button
        @click="
          () => {
            confirmAction?.()
          }
        "
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Bekräfta
      </button>
      <button
        @click="closeModal"
        class="ml-2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
      >
        Avbryt
      </button>
    </template>
  </TheModal>
</template>

<style scoped>
button {
  transition: all 0.3s ease-in-out;
}
button:hover {
  transform: scale(1.03);
}
</style>
