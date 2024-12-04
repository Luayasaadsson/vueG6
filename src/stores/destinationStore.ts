import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SkiDestination, CartItem, Article } from '../types/DestinationTypes'
import skiData from '../data/db.json'
import articlesData from '../data/articles.json'

export const useExperienceStore = defineStore('experiences', () => {
  const destinations = ref<SkiDestination[]>(skiData.destinations)
  const cart = ref<CartItem[]>([])
  const articles = ref<Article[]>(articlesData.articles)

  const featuredDestinations = computed(() => destinations.value.slice(0, 3))

  const addToCart = (item: CartItem) => {
    const existingItem = cart.value.find((cartItem) => cartItem.id === item.id)
    if (!existingItem) {
      cart.value.push(item)
    } else {
      console.warn(`Item with ID ${item.id} already exists in the cart.`)
    }
  }

  const removeFromCart = (experienceId: number) => {
    cart.value = cart.value.filter((item) => item.id !== experienceId)
  }

  const clearCart = () => {
    cart.value = []
  }

  const searchDestinations = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase()
    return destinations.value.filter(
      (dest) =>
        dest.name.toLowerCase().includes(trimmedQuery) ||
        dest.location.toLowerCase().includes(trimmedQuery),
    )
  }

  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + (item.bookingDetails?.totalPrice || 0), 0),
  )

  const cartItemCount = computed(() => cart.value.length)

  return {
    destinations,
    cart,
    articles,
    featuredDestinations,
    addToCart,
    removeFromCart,
    clearCart,
    searchDestinations,
    totalPrice,
    cartItemCount,
  }
})
