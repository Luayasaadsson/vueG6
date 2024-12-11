<script setup lang="ts">
const props = defineProps<{ articles: { title: string; description: string }[] }>()
</script>

<template>
  <div>
    <h2 class="text-3xl font-semibold text-light-text dark:text-dark-text mb-6">Artiklar</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <article
        v-for="(article, index) in props.articles"
        :key="index"
        class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-3">
          {{ article.title }}
        </h3>
        <p class="text-gray-600">
          {{ article.description }}
        </p>
      </article>
    </div>
  </div>
</template>
