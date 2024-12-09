import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SkiDestination, CartItem, Article } from '../types/DestinationTypes'

export const useDestinationStore = defineStore(
  'destinations',
  () => {
    const destinations = ref<SkiDestination[]>([])
    const Activities = ref<SkiDestination[]>([])
    const articles = ref<Article[]>([])
    const cart = ref<CartItem[]>([])

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

    const fetchActivities = async () => {
      try {
        const response = await fetch('/data/searchActivities.json')
        if (!response.ok) {
          throw new Error('Failed to load  activities data')
        }
        const data = await response.json()
        Activities.value = data.activities
      } catch (error) {
        console.error('Error fetching  activities:', error)
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

    const searchActivities = (query: string, filters: { startDate?: string } = {}) => {
      const trimmedQuery = query.trim().toLowerCase()

      return Activities.value.filter((activity) => {
        const matchesLocation =
          !trimmedQuery || activity.location.toLowerCase().includes(trimmedQuery)

        const matchesDate =
          !filters.startDate ||
          activity.packages.some((pkg) => pkg.availableDates.includes(filters.startDate!))

        return matchesLocation && matchesDate
      })
    }

    return {
      destinations,
      articles,
      Activities,
      cart,
      totalPrice,
      cartItemCount,
      fetchDestinations,
      fetchActivities,
      fetchArticles,
      addToCart,
      removeFromCart,
      clearCart,
      searchActivities,
    }
  },
  {
    persist: {
      key: 'destinationStore',
    },
  },
)
