import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expired or invalid
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/account/login'
          break
        case 403:
          $toast.error('Bạn không có quyền truy cập', {
            position: 'top-right',
            duration: 3000,
          })
          break
        case 404:
          $toast.error('Không tìm thấy tài nguyên', {
            position: 'top-right',
            duration: 3000,
          })
          break
        case 429:
          $toast.error('Quá nhiều yêu cầu. Vui lòng thử lại sau', {
            position: 'top-right',
            duration: 3000,
          })
          break
        case 500:
          $toast.error('Lỗi server. Vui lòng thử lại sau', {
            position: 'top-right',
            duration: 3000,
          })
          break
        default:
          $toast.error('Đã xảy ra lỗi. Vui lòng thử lại', {
            position: 'top-right',
            duration: 3000,
          })
      }
    } else if (error.request) {
      $toast.error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối', {
        position: 'top-right',
        duration: 3000,
      })
    } else {
      $toast.error('Đã xảy ra lỗi. Vui lòng thử lại', {
        position: 'top-right',
        duration: 3000,
      })
    }
    return Promise.reject(error)
  },
)

export default apiClient
