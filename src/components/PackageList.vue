<script setup lang="ts">
import type { SkiPackage } from '@/types/DestinationTypes'

const props = defineProps<{ packages: SkiPackage[] }>()
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold mb-3">Tillgängliga Paket</h2>

    <div v-if="props.packages.length">
      <div
        v-for="pkg in props.packages"
        :key="pkg.name"
        class="border p-4 rounded-lg shadow-md mb-4"
      >
        <h3 class="font-bold mb-2">{{ pkg.name }}</h3>
        <p class="mb-2">Antal dagar: {{ pkg.days }}</p>
        <ul class="list-disc list-inside">
          <li v-for="(item, index) in pkg.includes" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <p v-else class="text-gray-600">Inga paket tillgängliga för denna destination.</p>
  </div>
</template>
