import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Nếu là FormData, không set Content-Type để browser tự set
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers,
    })

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/account/login'
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access forbidden')
    } else if (error.response?.status === 404) {
      // Not found
      console.error('Resource not found')
    } else if (error.response?.status === 500) {
      // Server error
      console.error('Server error')
    }

    return Promise.reject(error)
  },
)

export default apiClient
