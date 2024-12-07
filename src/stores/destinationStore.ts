import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SkiDestination, CartItem, Article } from '../types/DestinationTypes'

export const useDestinationStore = defineStore(
  'destinations',
  () => {
    const destinations = ref<SkiDestination[]>([])
    const articles = ref<Article[]>([])
    const cart = ref<CartItem[]>([])

    const featuredDestinations = computed(() => destinations.value.slice(0, 3))
    const totalPrice = computed(() =>
      cart.value.reduce((sum, item) => sum + (item.bookingDetails?.totalPrice || 0), 0),
    )
    const cartItemCount = computed(() => cart.value.length)

    const fetchDestinations = async () => {
      try {
        const response = await fetch('/data/db.json')
        if (!response.ok) {
          throw new Error('Failed to load destinations data')
        }
        const data = await response.json()
        destinations.value = data.destinations
      } catch (error) {
        console.error('Error fetching destinations:', error)
      }
    }

    const fetchArticles = async () => {
      try {
        const response = await fetch('/data/articles.json')
        if (!response.ok) {
          throw new Error('Failed to load articles data')
        }
        const data = await response.json()
        articles.value = data.articles
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    const addToCart = (item: CartItem) => {
      const existingItem = cart.value.find((cartItem) => cartItem.id === item.id)
      if (!existingItem) {
        cart.value.push(item)
      } else {
        console.warn(`Item with ID ${item.id} already exists in the cart.`)
      }
    }

    const removeFromCart = (destinationId: number) => {
      cart.value = cart.value.filter((item) => item.id !== destinationId)
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

    return {
      destinations,
      articles,
      cart,
      featuredDestinations,
      totalPrice,
      cartItemCount,
      fetchDestinations,
      fetchArticles,
      addToCart,
      removeFromCart,
      clearCart,
      searchDestinations,
    }
  },
  {
    persist: {
      key: 'destinationStore',
    },
  },
)
