<script setup lang="ts">
import type { SkiPackage } from '@/types/DestinationTypes'

const props = defineProps<{ packages: SkiPackage[] }>()
</script>

<template>
  <div class="space-y-4">
    <div v-for="pkg in props.packages" :key="pkg.name" class="border p-4 rounded-lg">
      <h3 class="font-bold mb-2">{{ pkg.name }}</h3>
      <p>Antal dagar: {{ pkg.days }}</p>
      <ul class="list-disc list-inside">
        <li v-for="(item, index) in pkg.includes" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
