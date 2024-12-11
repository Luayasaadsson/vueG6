<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import { TrashIcon, ShoppingBagIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
import type { CartItem } from '@/types/DestinationTypes'

const destinationStore = useDestinationStore()
const cartItems = computed(() => destinationStore.cart)
const router = useRouter();

const removeFromCart = (item: CartItem) => {
  destinationStore.removeFromCart(item.id)
}

const clearCart = () => {
  destinationStore.clearCart()
}

const goToCheckout = () => {
  router.push('/checkout')
}

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + (item.bookingDetails?.totalPrice || 0), 0)
);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-8 flex items-center justify-center space-x-2">
      <ShoppingBagIcon class="w-10 h-10 text-gray-900" />
      <span>Kundvagn</span>
    </h1>
    <div v-if="cartItems.length" class="w-full sm:w-4/5 mx-auto">
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        :class="{
          'border-t-2 border-b-2 border-gray-200': index === 0,
          'border-b-2 border-gray-200': index !== 0
        }"
        class="bg-white p-6"
      >
        <div class="flex items-center space-x-6">
          <img
            :src="item.imageUrl"
            alt="item.name"
            class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
          />
          <div class="flex-1">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{{ item.name }}</h2>
            <p class="text-gray-600">Dagar: <span class="font-medium">{{ item.bookingDetails?.days }}</span></p>
            <p class="text-gray-600">Personer: <span class="font-medium">{{ item.bookingDetails?.totalPersons }}</span></p>
            <p class="text-gray-600">Valt datum: <span class="font-medium">{{ item.bookingDetails?.selectedDate }}</span></p>
            <p class="text-lg font-bold text-gray-900 mt-2">Pris: {{ item.bookingDetails?.totalPrice }} kr</p>
          </div>
          <button
            @click="removeFromCart(item)"
            class="p-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition rounded-lg"
          >
            <TrashIcon class="w-8 h-8 text-gray-900 hover:text-red-500" />
          </button>
        </div>
      </div>
      <div class="text-right mt-4 mb-6">
        <p class="text-2xl font-bold">Totalt pris: {{ totalPrice }} kr</p>
      </div>
      <div class="flex justify-between pb-8">
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
    <div v-else class="text-gray-600 text-center">
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
</template>

<style scoped>
button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.03);
}
</style>
