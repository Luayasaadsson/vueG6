<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

interface DropdownOption<T> {
  value: T
  label: string
}

// Props
defineProps<{
  options: DropdownOption<string | number>[]
  selected: string | number | null
  placeholder?: string
  customClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:selected', value: string | number): void
}>()

const handleSelect = (value: string | number) => {
  emit('update:selected', value)
}
</script>

<template>
  <div class="relative w-full min-w-[200px]">
    <!-- Dropdown-knapp -->
    <Menu as="div" class="relative inline-block text-left w-full">
      <div>
        <MenuButton
          :class="[
            'w-full flex justify-between items-center px-3 py-2 md:py-[20px] border border-gray-300 text-gray-500 bg-white rounded-full rounded-r-xl focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer',
            customClass,
          ]"
        >
          <span>{{
            options.find((o) => o.value === selected)?.label || placeholder || 'Välj ett alternativ'
          }}</span>
          <ChevronDownIcon class="w-5 h-5 text-gray-400" />
        </MenuButton>
      </div>

      <!-- Dropdown-meny -->
      <MenuItems
        class="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-50"
      >
        <MenuItem v-for="option in options" :key="option.value" v-slot="{ active }">
          <button
            @click="handleSelect(option.value)"
            :class="[
              'w-full text-left px-4 py-3 transition-all duration-200',
              active ? 'bg-blue-100 text-blue-700' : 'text-gray-700',
            ]"
          >
            {{ option.label }}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>
