<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDestinationStore } from '@/stores/destinationStore'
import SearchDestination from '@/components/SearchDestination.vue'
import DestinationCard from '@/components/DestinationCard.vue'
import ArticleList from '@/components/ArticleList.vue'

const destinationStore = useDestinationStore()
const { destinations, articles } = storeToRefs(destinationStore)

onMounted(() => {
  destinationStore.fetchDestinations()
  destinationStore.fetchArticles()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
      Upplev Sveriges Bästa Skidresor
    </h1>

    <SearchDestination />

    <section class="mt-12">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Populära Skidresor</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <DestinationCard
          v-for="destination in destinations"
          :key="destination.id"
          :destination="destination"
        />
      </div>
    </section>

    <section class="mt-12">
      <ArticleList :articles="articles" />
    </section>
  </div>
</template>
