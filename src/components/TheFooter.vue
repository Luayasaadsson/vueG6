<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <footer class="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8 mt-10">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
      <div>
        <h3 class="text-xl font-bold mb-4">Om SkiEase</h3>
        <p class="text-sm leading-relaxed">
          SkiEase erbjuder de bästa skidupplevelserna för alla nivåer. Boka din nästa skidresa
          enkelt och smidigt med oss!
        </p>
      </div>

      <div>
        <h3 class="text-xl font-bold mb-4 text">Snabblänkar</h3>
        <ul class="space-y-2">
          <li>
            <RouterLink to="/" class="hover:underline">Hem</RouterLink>
          </li>
          <li>
            <RouterLink to="/cart" class="hover:underline">Kundvagn</RouterLink>
          </li>
          <li>
            <RouterLink to="/checkout" class="hover:underline">Kassan</RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-bold mb-4">Kontakt</h3>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center">
            <EnvelopeIcon class="w-5 h-5 mr-2 text-white" />
            <a href="mailto:info@skiease.com" class="hover:underline">info@skiease.com</a>
          </li>
          <li class="flex items-center">
            <PhoneIcon class="w-5 h-5 mr-2 text-white" />
            <a href="tel:+46123456789" class="hover:underline">+46 123 456 789</a>
          </li>
          <li class="flex items-center">
            <MapPinIcon class="w-5 h-5 mr-2 text-white" />
            <span>Skidvägen 123, 111 22 Stockholm</span>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="border-t border-blue-400 mt-8 pt-4 text-center text-sm flex flex-col md:flex-row items-center justify-center px-6"
    >
      <p>&copy; {{ new Date().getFullYear() }} SkiEase. Alla rättigheter reserverade.</p>
    </div>
  </footer>
</template>
