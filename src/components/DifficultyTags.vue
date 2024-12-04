<script setup lang="ts">
const props = defineProps<{ difficulty: string[] }>()
</script>

<template>
  <div class="flex gap-2">
    <span
      v-for="diff in props.difficulty"
      :key="diff"
      class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
    >
      {{ diff }}
    </span>
  </div>
</template>
