<script setup lang="ts">
import type { SkiPackage } from '@/types/DestinationTypes'

const props = defineProps<{ packages: SkiPackage[] }>()
</script>

<template>
  <div class="space-y-4">
    <div class="grid md:grid-cols-2 gap-6" v-if="props.packages.length">
      <div
        v-for="pkg in props.packages"
        :key="pkg.name"
        class="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          {{ pkg.name }}
        </h3>

        <!-- Grid för layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Vänster sida -->
          <div>
            <p class="mb-4 text-neutral-700 dark:text-neutral-300">
              <span class="font-semibold">Antal dagar:</span> {{ pkg.days }}
            </p>
            <ul class="mb-4">
              <h4 class="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Inkluderar:</h4>
              <li
                v-for="(item, index) in pkg.includes"
                :key="index"
                class="text-neutral-600 dark:text-neutral-400 ml-4 list-disc"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Höger sida -->
          <div>
            <p class="mb-4 text-neutral-700 dark:text-neutral-300">
              <span class="font-semibold">Max personer:</span> {{ pkg.maxPersons }}
            </p>
            <p class="mb-2 text-neutral-800 dark:text-neutral-200 font-semibold">
              Tillgängliga datum:
            </p>
            <ul class="text-neutral-600 dark:text-neutral-400">
              <li v-for="(date, index) in pkg.availableDates" :key="index" class="ml-4 list-disc">
                {{ date }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-600 dark:text-gray-300">
      Inga paket tillgängliga för denna destination.
    </p>
  </div>
</template>
