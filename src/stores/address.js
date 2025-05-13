import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: JSON.parse(localStorage.getItem('userAddresses')) || null,
  }),
  getters: {},
  actions: {
    setAddress(addresses) {
      this.addresses = addresses
      localStorage.setItem('userAddresses', JSON.stringify(addresses))
    },
  },
})
