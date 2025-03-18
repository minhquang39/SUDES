import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
    pendingEmail: localStorage.getItem('pendingEmail') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
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

    clearPendingEmail() {
      this.pendingEmail = null
      localStorage.removeItem('pendingEmail')
    },
  },
})
