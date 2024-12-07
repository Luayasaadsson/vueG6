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
    <h1 class="text-3xl font-bold mb-6">Kundvagn</h1>
    <div v-if="cartItems.length" class="space-y-6">
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 class="text-xl font-bold">{{ item.name }}</h2>
        <p>Dagar: {{ item.bookingDetails?.days }}</p>
        <p>Totalt antal personer: {{ item.bookingDetails?.totalPersons }}</p>
        <p>Totalt pris: {{ item.bookingDetails?.totalPrice }} kr</p>
        <button
          @click="removeFromCart(item)"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Ta bort
        </button>
      </div>
      <button
        @click="clearCart"
        class="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Töm kundvagn
      </button>
    </div>
    <div v-else class="text-gray-600 text-center">
      <p>Din kundvagn är tom.</p>
    </div>
  </div>
</template>
