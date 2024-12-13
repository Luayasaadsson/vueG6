<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title?: string
  content?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
      <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {{ title }}
      </h3>
      <p class="text-gray-700 dark:text-gray-300 mb-6">{{ content }}</p>
      <div class="flex justify-end space-x-4">
        <slot name="actions">
          <button
            @click="close"
            class="relative px-2 py-1 bg-primary text-light-text dark:text-dark-text hover:bg-primary-dark transition overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:rounded-full hover:after:w-full after:transition-all after:duration-300"
          >
            Stäng
          </button>
          <router-link
            to="/cart"
            class="relative px-2 py-1 bg-secondary text-light-text dark:text-dark-text hover:bg-secondary-dark transition overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:rounded-full hover:after:w-full after:transition-all after:duration-300"
          >
            Kundvagn
          </router-link>
        </slot>
      </div>
    </div>
  </div>
</template>
