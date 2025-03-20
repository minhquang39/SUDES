<template>
  <div>
    <h2 class="text-[#212B25] text-[19px] mb-6 font-normal uppercase">Đổi mật khẩu</h2>
    <div class="w-full md:w-1/2">
      <p>Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 8 kí tự</p>

      <form class="mt-[15px]" action="">
        <div>
          <p class="mb-[5px]">Mật khẩu cũ *</p>
          <input
            class="border border-[#e1e1e1] px-[20px] py-[5px] outline-0 bg-white text-[#333] w-full"
            type="text"
            v-model="oldPassword"
            name="oldPassword"
          />
        </div>
        <div>
          <p class="mb-[5px]">Mật khẩu mới *</p>
          <input
            class="border border-[#e1e1e1] px-[20px] py-[5px] outline-0 bg-white text-[#333] w-full"
            type="text"
            v-model="newPassword"
            name="newPassword"
          />
        </div>
        <div>
          <p class="mb-[5px]">Xác nhận lại mật khẩu *</p>
          <input
            class="border border-[#e1e1e1] px-[20px] py-[5px] outline-0 bg-white text-[#333] w-full"
            type="text"
            v-model="confirmPassword"
            name="confirmPassword"
          />
        </div>

        <button
          @click.prevent="handleChangePassword"
          class="bg-mainColor p-1 text-white w-full font-bold mt-7 hover:bg-[#fdc97d] hover:text-mainColor cursor-pointer"
        >
          <div class="p-[1px] border border-white">Đặt lại mật khẩu</div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
import apiClient from '@/utils/axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
const toast = useToast()
const authStore = useAuthStore()
const handleChangePassword = async () => {
  const email = authStore.user.email

  if (newPassword.value !== confirmPassword.value) {
    alert('Mật khẩu không khớp')
    return
  }

  try {
    const { data } = await apiClient.post('/account/change-password', {
      email,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    })
    if (data.success) {
      toast.open({
        message: 'Đổi mật khẩu thành công',
        type: 'success',
      })
    }
  } catch (error) {
    console.log(error)
    toast.open({
      message: 'Đổi mật khẩu thất bại',
      type: 'error',
    })
  }
}
</script>
