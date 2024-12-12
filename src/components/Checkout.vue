<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDestinationStore } from '@/stores/destinationStore';

const destinationStore = useDestinationStore();
const cartItems = computed(() => destinationStore.cart);

const showBankIdLogin = ref(true);

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + (item.bookingDetails?.totalPrice || 0), 0)
);
</script>

<template>
  <div class="checkout-page container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="md:col-span-2 space-y-8">
      
      <div class="bg-white rounded-lg shadow-md p-6 relative">
        <h2 class="text-2xl font-bold mb-4 flex items-center justify-between">
          <span class="text-gray-700">1. Logga in med BankID</span>
          <button 
            @click="showBankIdLogin = !showBankIdLogin" 
            class="text-gray-600 hover:text-gray-800"
          >
            <span class="text-xl text-gray-400">{{ showBankIdLogin ? '▲' : '▼' }}</span>
          </button>
        </h2>
        <transition name="fade">
          <div v-show="showBankIdLogin" class="space-y-4">
            <p class="text-gray-700">
              För att fortsätta med köpet, var god logga in med BankID.
            </p>
            <!-- QR KOD -->
            <div class="flex justify-left">
                <img src="@/assets/images/qr.png" alt="BankID QR Code" class="w-48 h-40 object-cover" />
            </div>
            <button 
              class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled
            >
              Logga in med BankID
            </button>
          </div>
        </transition>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 relative">
        <h2 class="text-xl font-semibold flex items-center justify-between text-gray-500 cursor-not-allowed">
          <span>2. Betalningsmetod</span>
          <span class="text-xl text-gray-400">▼</span>
        </h2>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 relative">
        <h2 class="text-xl font-semibold flex items-center justify-between text-gray-500 cursor-not-allowed">
          <span>3. Bekräfta & Betala</span>
          <span class="text-xl text-gray-400">▼</span>
        </h2>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 md:col-span-1 space-y-4 h-fit">
      <h2 class="text-xl font-bold mb-4 text-gray-700">Din beställning</h2>
      <div v-if="cartItems.length" class="space-y-4">
        <div class="max-h-96 overflow-y-auto">
          <div 
            v-for="(item, index) in cartItems" 
            :key="index" 
            class="flex items-center space-x-4 border-b pb-4"
          >
            <img 
              :src="item.imageUrl" 
              alt="item.name" 
              class="w-16 h-16 object-cover rounded" 
            />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
              <p class="text-gray-600 text-sm">Dagar: {{ item.bookingDetails?.days }}</p>
              <p class="text-gray-600 text-sm">Personer: {{ item.bookingDetails?.totalPersons }}</p>
              <p class="text-gray-600 text-sm" v-if="item.bookingDetails?.selectedDate">
                Datum: {{ item.bookingDetails.selectedDate }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-gray-800 font-semibold">{{ item.bookingDetails?.totalPrice }} kr</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between pt-4 text-gray-700">
          <span class="text-lg font-bold">Totalt:</span>
          <span class="text-lg font-bold">{{ totalPrice }} kr</span>
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        Din varukorg är tom.
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.max-h-96 {
  max-height: 90%; 
}
</style>
