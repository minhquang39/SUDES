import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: null,
  }),
  getters: {},
  actions: {
    setAddress(addresses) {
      this.addresses = addresses
    },
  },
})
