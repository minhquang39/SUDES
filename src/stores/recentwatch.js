import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'
import { useAuthStore } from './auth'

export const useRecentWatchStore = defineStore('recentWatch', {
  state: () => ({
    recentWatch: [],
  }),
  actions: {
    async addRecentWatch(productId) {
      const recentWatched = localStorage.getItem('recentWatched')
      if (recentWatched) {
        const recentWatchedArray = JSON.parse(recentWatched)
        if (!recentWatchedArray.includes(productId)) {
          recentWatchedArray.push(productId)
          if (recentWatchedArray.length > 5) {
            recentWatchedArray.shift()
          }
        }
        localStorage.setItem('recentWatched', JSON.stringify(recentWatchedArray))
        if (useAuthStore().isAuthenticated) {
          try {
            const response = await apiClient.post('/account/recently-viewed', {
              productIds: recentWatchedArray,
            })
            console.log(response)
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        // localStorage.setItem('recentWatched', JSON.stringify([productId]))
        // this.recentWatch = [productId]
      }
    },
    getRecentWatch() {
      const recentWatch = localStorage.getItem('recentWatched')
      if (recentWatch) {
        this.recentWatch = JSON.parse(recentWatch)
        return this.recentWatch
      }
      return []
    },

    async getRecentWatchFromApi() {
      try {
        const response = await apiClient.get('/account/recently-viewed')
        this.recentWatch = response.data.data
        console.log(this.recentWatch)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
