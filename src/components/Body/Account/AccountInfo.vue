<template>
  <div>
    <h2 class="text-[#212B25] text-[19px] mb-4 font-normal uppercase">Thông tin tài khoản</h2>

    <div class="flex flex-col md:flex-row gap-6">
      <!-- Phần ảnh đại diện -->
      <div class="flex flex-col items-center">
        <div class="relative">
          <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-mainColor">
            <!-- Loading overlay cho avatar -->

            <img
              v-if="avatarPreview"
              :src="avatarPreview"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <img
              v-else-if="authStore.user?.avatar"
              :src="authStore.user.avatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <span class="text-4xl text-gray-400">{{ getInitials }}</span>
            </div>
          </div>

          <!-- Overlay cho việc thay đổi ảnh -->
          <div
            class="absolute inset-0 rounded-full bg-transparent bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center transition-all cursor-pointer"
            @click="triggerFileInput"
            :class="{ 'pointer-events-none': isAvatarLoading }"
          >
            <span class="text-white opacity-0 hover:opacity-100">Thay đổi</span>
          </div>

          <!-- Input ẩn để upload file -->
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            accept="image/*"
            @change="onFileSelected"
          />
        </div>

        <span class="mt-2 text-sm text-gray-500">Click vào ảnh để thay đổi</span>
      </div>

      <!-- Phần nội dung thông tin tài khoản hiện có -->
      <div class="flex-1">
        <form @submit.prevent="updateInfo" class="bg-white rounded p-4 mb-4">
          <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {{ errorMessage }}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Họ</label>
              <input
                type="text"
                v-model="firstName"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mainColor focus:border-mainColor"
                placeholder="Nhập họ"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên</label>
              <input
                type="text"
                v-model="lastName"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mainColor focus:border-mainColor"
                placeholder="Nhập tên"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                v-model="email"
                disabled
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <span class="text-xs text-gray-500">Email không thể thay đổi</span>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="tel"
                v-model="phone"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mainColor focus:border-mainColor"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <div class="mt-4 flex gap-3">
            <button
              type="submit"
              class="bg-mainColor text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all min-w-[120px] flex items-center justify-center"
              :disabled="isLoading"
            >
              <div v-if="isLoading" class="flex items-center gap-2">
                <div
                  class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
                <span>Đang lưu...</span>
              </div>
              <span v-else>Lưu thông tin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
import apiClient from '@/utils/axios'

const authStore = useAuthStore()
const toast = useToast()
const isLoading = ref(false)
const fileInput = ref(null)
const avatarPreview = ref(authStore.user?.avatar || '')
const avatarFile = ref(null)
const errorMessage = ref('')

const firstName = ref(authStore.user?.first_name || '')
const lastName = ref(authStore.user?.last_name || '')
const phone = ref(authStore.user?.phone || '')
const email = ref(authStore.user?.email || '')
// Tính toán tên đầy đủ
const fullName = computed(() => {
  if (authStore.user?.first_name && authStore.user?.last_name) {
    return `${authStore.user?.first_name} ${authStore.user?.last_name}`.trim()
  }
  return authStore.user?.name || 'Chưa cập nhật'
})

// Hàm lấy chữ cái đầu từ tên để hiển thị khi không có avatar
const getInitials = computed(() => {
  const firstName = authStore.user?.first_name || ''
  const lastName = authStore.user?.last_name || ''

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  } else if (firstName) {
    return firstName.charAt(0).toUpperCase()
  } else if (authStore.user?.email) {
    return authStore.user?.email?.charAt(0).toUpperCase()
  }
  return 'U'
})

// Kích hoạt input file khi click vào avatar
const triggerFileInput = () => {
  fileInput.value.click()
}

// Xử lý khi file được chọn
const onFileSelected = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Kiểm tra định dạng file
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    toast.error('Chỉ chấp nhận file hình ảnh (JPEG, PNG, GIF, WEBP)', {
      position: 'top-right',
    })
    return
  }

  // Kiểm tra kích thước file (giới hạn 2MB)
  if (file.size > 2 * 1024 * 1024) {
    toast.error('Kích thước ảnh không được vượt quá 2MB', {
      position: 'top-right',
    })
    return
  }

  // Tạo preview
  avatarFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

// Cập nhật thông tin
const updateInfo = async () => {
  try {
    isLoading.value = true
    let hasUpdates = false

    // 1. Cập nhật thông tin cá nhân
    if (firstName.value || lastName.value || phone.value) {
      const infoResponse = await apiClient.put('/account/update-info', {
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value || '',
      })

      if (infoResponse.data) {
        hasUpdates = true
        // Cập nhật thông tin trong store
        authStore.setUser({
          ...authStore.user,
          first_name: firstName.value,
          last_name: lastName.value,
          phone: phone.value,
        })
      }
    }

    // 2. Upload avatar nếu có
    if (fileInput.value && fileInput.value.files[0]) {
      isAvatarLoading.value = true
      const formData = new FormData()
      formData.append('avatar', fileInput.value.files[0])

      const avatarResponse = await apiClient.put('/account/update-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (avatarResponse.data) {
        hasUpdates = true
        // Cập nhật avatar trong store
        authStore.setUser({
          ...authStore.user,
          avatar: avatarResponse.data.data.path || avatarResponse.data.data?.avatar,
        })

        // Reset file input và preview
        avatarFile.value = null
        avatarPreview.value = avatarResponse.data.data.path
      }
    }

    if (hasUpdates) {
      toast.success('Cập nhật thông tin thành công', {
        position: 'top-right',
      })
    }
  } catch (error) {
    console.error('Update error:', error)
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin'
    toast.error(errorMessage, {
      position: 'top-right',
    })
  } finally {
    isLoading.value = false
    isAvatarLoading.value = false
  }
}
</script>

<style scoped>
/* Hiệu ứng hover cho avatar */
.rounded-full:hover .opacity-0 {
  opacity: 1;
}
</style>
