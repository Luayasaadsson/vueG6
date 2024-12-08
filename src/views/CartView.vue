<script setup lang="ts">
import { computed } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import type { CartItem } from '@/types/DestinationTypes'

const destinationStore = useDestinationStore()
const cartItems = computed(() => destinationStore.cart)

const removeFromCart = (item: CartItem) => {
  destinationStore.removeFromCart(item.id)
}

const clearCart = () => {
  destinationStore.clearCart()
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Kundvagn</h1>
    <div v-if="cartItems.length" class="space-y-6">
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative"
      >
        <div class="flex items-center space-x-4">
          <img
            :src="item.imageUrl"
            alt="item.name"
            class="w-48 h-48 object-cover rounded-lg shadow-sm"
          />
          <div>
            <h2 class="text-2xl font-semibold text-gray-800">{{ item.name }}</h2>
            <p class="text-gray-600">Dagar: {{ item.bookingDetails?.days }}</p>
            <p class="text-gray-600">Personer: {{ item.bookingDetails?.totalPersons }}</p>
            <p class="text-gray-600">Valt datum: {{ item.bookingDetails?.selectedDate }}</p>
            <p class="text-xl font-bold text-gray-800">
              Totalt pris: {{ item.bookingDetails?.totalPrice }} kr
            </p>
          </div>
        </div>
        <button
          @click="removeFromCart(item)"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 absolute right-0 top-2"
        >
          Ta bort
        </button>
      </div>
      <div class="text-right">
        <button
          @click="clearCart"
          class="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 text-lg"
        >
          Töm kundvagn
        </button>
      </div>
    </div>
    <div v-else class="text-gray-600 text-center">
      <p class="text-xl">Din kundvagn är tom.</p>
    </div>
  </div>
</template>
