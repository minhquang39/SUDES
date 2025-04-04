import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    pendingEmail: localStorage.getItem('pendingEmail') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    login(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout() {
      this.token = null
      this.user = null
      this.pendingEmail = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('pendingEmail')
    },

    setPendingEmail(email) {
      this.pendingEmail = email
      localStorage.setItem('pendingEmail', email)
    },

    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    setUser(user) {
      if (typeof user === 'string') {
        try {
          user = JSON.parse(user)
        } catch (error) {
          console.error('Failed to parse user data:', error)
          return
        }
      }
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearAuth() {
      this.token = null
      this.user = null
      this.pendingEmail = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    clearPendingEmail() {
      this.pendingEmail = null
      localStorage.removeItem('pendingEmail')
    },
  },
})
