import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import apiClient from '@/utils/axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  getters: {
    isLoggedIn: () => {
      return localStorage.getItem('token') !== null
    },
  },
  actions: {
    async mergeCart() {
      if (this.isLoggedIn) {
        const response = await apiClient.post('/account/cart/merge', this.cart)
        if (response.status === 200) {
          console.log('Merge cart succefull')
        }
      }
    },

    async addToCart(product) {
      if (
        this.cart.find((item) => item.productId === product.productId && item.SKU === product.SKU)
      ) {
        this.cart.find(
          (item) => item.productId === product.productId && item.SKU === product.SKU,
        ).quantity += product.quantity
      } else {
        this.cart.push(product)
      }
      this.saveLocalCart()
      if (this.isLoggedIn) {
        try {
          const response = await apiClient.post('/account/cart', {
            productId: product.productId,
            quantity: product.quantity,
            SKU: product.SKU,
            price: product.price,
            image: product.image,
            name: product.name,
          })
        } catch (error) {
          console.error('Error adding to cart:', error)
        }
      }
    },

    async getCart() {
      if (this.isLoggedIn) {
        try {
          const response = await apiClient.get('/account/cart')
          if (response.status === 200) {
            this.cart = response.data.data.items
            this.saveLocalCart()
            console.log(this.cart)
          }
        } catch (error) {
          console.error('Error getting cart:', error)
        }
      }
    },

    async updateQuantity(product, newQuantity) {
      if (this.isLoggedIn) {
        const currentCart = [...this.cart]
        try {
          const productIdValue =
            typeof product.productId === 'object' ? product.productId._id : product.productId

          const response = await apiClient.put(`/account/cart`, {
            productId: productIdValue,
            SKU: product.SKU,
            quantity: newQuantity,
          })

          if (response.status === 200) {
            currentCart.forEach((item) => {
              if (item.productId === product.productId && item.SKU === product.SKU) {
                item.quantity = newQuantity
              }
            })
            this.cart = currentCart
            this.saveLocalCart()
          }
        } catch (error) {
          console.error('Error updating quantity:', error)
        }
      } else {
        // Nếu chưa đăng nhập, cập nhật local cart
        const index = this.cart.findIndex(
          (item) =>
            (typeof item.productId === 'object' ? item.productId._id : item.productId) ===
              (typeof product.productId === 'object' ? product.productId._id : product.productId) &&
            item.SKU === product.SKU,
        )

        if (index !== -1) {
          this.cart[index].quantity = newQuantity
          this.saveLocalCart()
        }
      }
    },

    async removeItem(product) {
      if (this.isLoggedIn) {
        const productIdValue =
          typeof product.productId === 'object' ? product.productId._id : product.productId

        try {
          const response = await apiClient.delete(`/account/cart`, {
            data: {
              productId: productIdValue,
              SKU: product.SKU,
            },
          })
          if (response.status === 200) {
            this.cart = this.cart.filter(
              (item) => item.productId !== product.productId && item.SKU !== product.SKU,
            )
            this.saveLocalCart()
          }
        } catch (error) {
          console.error('Error removing item:', error)
        }
      } else {
        this.cart = this.cart.filter(
          (item) => item.productId !== product.productId && item.SKU !== product.SKU,
        )
        this.saveLocalCart()
      }
    },
    saveLocalCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
  },
})
