<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationStore } from '@/stores/destinationStore'
import TheModal from '@/components/TheModal.vue'

const destinationStore = useDestinationStore()
const articles = destinationStore.articles

const isModalOpen = ref(false)
const modalContent = ref('')

const showDetails = (details: string) => {
  modalContent.value = details
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div>
    <h2 class="text-2xl md:text-4xl font-bold text-center text-light-text dark:text-dark-text mb-5">
      Artiklar
    </h2>
    <div class="grid md:grid-cols-3 gap-4">
      <article
        v-for="(article, index) in articles"
        :key="index"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      >
        <img :src="article.image" :alt="article.title" class="w-full h-96 object-cover" />
        <div class="p-6">
          <span class="text-sm font-semibold text-primary uppercase block mb-2">
            {{ article.category }}
          </span>
          <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {{ article.title }}
          </h3>
          <p class="text-sm md:text-xl text-gray-700 dark:text-gray-300 mb-6">
            {{ article.description }}
          </p>
          <button
            @click="showDetails(article.details)"
            class="relative px-2 py-1 bg-primary text-light-text dark:text-dark-text hover:bg-primary-dark transition overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:rounded-full hover:after:w-full after:transition-all after:duration-300"
          >
            Läs mer
          </button>
        </div>
      </article>
    </div>

    <TheModal
      :isOpen="isModalOpen"
      :title="'Detaljer'"
      :content="modalContent"
      @close="closeModal"
    />
  </div>
</template>
