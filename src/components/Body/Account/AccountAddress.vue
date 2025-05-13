<template>
  <div class="w-full h-full">
    <h2 class="text-[#212B25] text-[19px] mb-2 font-normal uppercase">Địa chỉ</h2>
    <div class="pb-4 h-[300px] overflow-y-auto">
      <div
        class="flex justify-between items-start md:items-center border-b border-gray-200 mb-3 pb-3"
        v-for="(address, index) in addressUser"
        :key="index"
      >
        <div class="">
          <div class="flex gap-2 md:gap-4">
            <b>{{ address?.full_name }}</b>
            <span v-if="address?.is_default" class="text-sm font-normal bg-hover text-white p-1"
              >Mặc định</span
            >
          </div>
          <div>
            <div>
              <span><span class="text-[#666]">Địa chỉ:</span> {{ address?.address_line }}</span>
            </div>
            <div>
              <span><span class="text-[#666]">Điện thoại:</span> {{ address?.phone }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="hidden md:block">
            <div class="mb-2">
              <button
                :id="address?._id"
                @click.prevent="openModalUpdate($event)"
                class="font-bold text-sm cursor-pointer"
              >
                Chỉnh sửa
              </button>
            </div>
            <button
              :id="address?._id"
              @click.prevent="handleDeleteAddress($event)"
              class="text-red-500 font-bold text-sm cursor-pointer"
            >
              Xoá
            </button>
          </div>
          <div class="md:hidden relative group">
            <button>
              <svg
                width="4"
                height="16"
                viewBox="0 0 4 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                cursor="pointer"
              >
                <path
                  d="M2 3C2.82843 3 3.5 2.32843 3.5 1.5C3.5 0.671573 2.82843 0 2 0C1.17157 0 0.5 0.671573 0.5 1.5C0.5 2.32843 1.17157 3 2 3Z"
                  fill="black"
                ></path>
                <path
                  d="M2 9.5C2.82843 9.5 3.5 8.82843 3.5 8C3.5 7.17157 2.82843 6.5 2 6.5C1.17157 6.5 0.5 7.17157 0.5 8C0.5 8.82843 1.17157 9.5 2 9.5Z"
                  fill="black"
                ></path>
                <path
                  d="M2 16C2.82843 16 3.5 15.3284 3.5 14.5C3.5 13.6716 2.82843 13 2 13C1.17157 13 0.5 13.6716 0.5 14.5C0.5 15.3284 1.17157 16 2 16Z"
                  fill="black"
                ></path>
              </svg>
            </button>
            <div
              class="absolute top-0 right-0 min-w-max bg-white shadow-2xl rounded-md p-4 hidden group-hover:block"
            >
              <div class="mb-2">
                <button
                  :id="address?._id"
                  @click.prevent="openModalUpdate($event)"
                  class="font-bold text-[16px] cursor-pointer"
                >
                  Chỉnh sửa
                </button>
              </div>
              <button
                :id="address?._id"
                @click.prevent="handleDeleteAddress($event)"
                class="text-red-500 font-bold text-[16px] cursor-pointer"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-full">
      <div
        @click="openModal"
        class="uppercase text-mainColor font-bold p-2 text-center border border-dashed hover:bg-[#fdc97d] hover:text-white cursor-pointer w-full transition-all duration-300"
      >
        Thêm địa chỉ mới
      </div>
    </div>

    <!-- Modal Add Address -->

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeModalOnOverlay($event)"
    >
      <div class="fixed inset-0 bg-black/50 transition-opacity"></div>

      <!-- Modal container -->
      <div class="flex min-h-full items-center justify-center md:p-4 modal-container">
        <div
          class="bg-white rounded-lg shadow-xl w-screen md:w-[700px] md:max-w-[90%] md:mx-4 relative transform transition-all"
        >
          <!-- Header -->
          <div class="flex justify-between items-center p-4 border-b">
            <p class="text-lg font-medium text-gray-800">Địa chỉ giao hàng</p>
            <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-full transition-all">
              <span class="text-gray-600 text-xl">&times;</span>
            </button>
          </div>

          <!-- Form -->
          <div class="p-6">
            <form @submit.prevent="" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-[12px] font-medium text-gray-700 mb-1"
                    >Họ tên</label
                  >
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor"
                  />
                  <p class="text-red-500 text-[12px]">{{ getError.nameError }}</p>
                </div>
                <div>
                  <label for="phone" class="block text-[12px] font-medium text-gray-700 mb-1"
                    >Số điện thoại</label
                  >
                  <input
                    type="text"
                    id="phone"
                    v-model="phone"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor"
                  />
                  <p class="text-red-500 text-[12px]">{{ getError.phoneError }}</p>
                </div>
              </div>

              <div>
                <label for="email" class="block text-[12px] font-medium text-gray-700 mb-1"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor"
                />
                <p class="text-red-500 text-[12px]">{{ getError.emailError }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:pb-4">
                <div class="relative mt-16 md:mt-0">
                  <label for="city" class="block text-[12px] font-medium text-gray-700 mb-1"
                    >Tỉnh/Thành phố</label
                  >
                  <input
                    type="text"
                    class="absolute px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor z-10"
                    v-model="provinceInput"
                    placeholder="Chọn tỉnh/thành phố"
                    @focus="provinceSelect = true"
                    @input="searchProvince($event)"
                  />

                  <ul
                    v-if="provinceSelect"
                    class="w-full overflow-y-auto absolute top-[calc(100%+50px)] left-0 bg-white border border-gray-50 shadow provinceSelect z-50"
                    :class="!provinceFilter ? 'h-[200px]' : 'h-fit'"
                  >
                    <div v-if="provinceFilter" class="max-h-fit">
                      <li
                        v-for="(p, index) in provinceFilter"
                        :key="index"
                        :name="p.name"
                        class="p-2 hover:bg-gray-100 cursor-pointer"
                        @click="selectProvince($event)"
                      >
                        {{ p.name }}
                      </li>
                    </div>
                    <div v-else>
                      <li
                        v-for="(province, index) in addresses"
                        :key="index"
                        :name="province.name"
                        class="p-2 hover:bg-gray-100 cursor-pointer"
                        @click="selectProvince($event)"
                      >
                        {{ province.name }}
                      </li>
                    </div>
                  </ul>
                  <p class="absolute top-[70px] z-0 text-red-500 text-[12px]">
                    {{ getError.provinceError }}
                  </p>
                </div>
                <div class="relative mt-16 md:mt-0">
                  <label for="district" class="block text-[12px] font-medium text-gray-700 mb-1"
                    >Quận/huyện</label
                  >

                  <input
                    type="text"
                    class="absolute px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor z-10"
                    v-model="districtInput"
                    placeholder="Chọn quận, huyện"
                    @focus="districtSelect = true"
                    @input="searchDistrict($event)"
                  />

                  <ul
                    v-if="districtSelect && provinceInput"
                    class="w-full overflow-y-auto absolute top-[calc(100%+50px)] left-0 bg-white border border-gray-50 shadow districtSelect z-50"
                    :class="!districtFilter ? 'h-[200px]' : 'h-fit'"
                  >
                    <div v-if="districtFilter" class="max-h-fit">
                      <li
                        v-for="(p, index) in districtFilter"
                        :key="index"
                        :name="p.name"
                        class="p-2 hover:bg-gray-100 cursor-pointer"
                        @click="selectDistrict($event)"
                      >
                        {{ p.name }}
                      </li>
                    </div>
                    <div v-else>
                      <li
                        v-for="(district, index) in getDistrict"
                        :key="index"
                        :name="district.name"
                        class="p-2 hover:bg-gray-100 cursor-pointer"
                        @click="selectDistrict($event)"
                      >
                        {{ district.name }}
                      </li>
                    </div>
                  </ul>
                  <p class="absolute top-[70px] z-0 text-red-500 text-[12px]">
                    {{ getError.districtError }}
                  </p>
                </div>
                <div class="relative mt-16 md:mt-0">
                  <label for="ward" class="block text-[12px] font-medium text-gray-700 mb-1"
                    >Phường/xã</label
                  >
                  <input
                    type="text"
                    class="absolute px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor z-10"
                    v-model="wardInput"
                    placeholder="Chọn quận, huyện"
                    @focus="wardSelect = true"
                    @input="searchWard($event)"
                  />

                  <ul
                    v-if="wardSelect && provinceInput"
                    class="w-full overflow-y-auto absolute top-[calc(100%+50px)] left-0 bg-white border border-gray-50 shadow wardSelect z-50"
                    :class="!wardFilter ? 'h-[200px]' : 'h-fit'"
                  >
                    <div v-if="wardFilter" class="max-h-fit">
                      <li
                        v-for="(p, index) in wardFilter"
                        :key="index"
                        :name="p.name"
                        class="p-2 hover:bg-gray-100 cursor-pointer"
                        @click="selectWard($event)"
                      >
                        {{ p.name }}
                      </li>
                    </div>
                    <div v-else>
                      <li
                        v-for="(ward, index) in getWard"
                        :key="index"
                        :name="ward.name"
                        class="p-2 hover:bg-gray-100 cursor-pointer"
                        @click="selectWard($event)"
                      >
                        {{ ward.name }}
                      </li>
                    </div>
                  </ul>
                  <p class="absolute top-[70px] z-0 text-red-500 text-[12px]">
                    {{ getError.wardError }}
                  </p>
                </div>
              </div>

              <div class="pt-14">
                <label for="address" class="block text-[12px] font-medium text-gray-700 mb-1"
                  >Địa chỉ</label
                >
                <input
                  type="text"
                  id="address"
                  v-model="addressPath"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor"
                />
                <p class="z-0 text-red-500 text-[12px]">
                  {{ getError.addressError }}
                </p>
              </div>

              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="default"
                  v-model="isDefault"
                  class="w-4 h-4 text-mainColor border-gray-300 rounded focus:ring-mainColor"
                />
                <label for="default" class="text-[12px] text-gray-700"
                  >Đặt làm địa chỉ mặc định</label
                >
              </div>

              <div class="flex justify-end pt-4">
                <button
                  v-if="pathType === 'create'"
                  type="submit"
                  @click="handleCreateAddress"
                  class="px-6 py-2 bg-mainColor text-white rounded-md hover:bg-opacity-90 transition-all"
                >
                  <div v-if="isLoading" class="flex items-center gap-2">
                    <div
                      class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    ></div>
                    <span>Đang lưu...</span>
                  </div>
                  <span v-else>Lưu thông tin</span>
                </button>
                <button
                  type="submit"
                  v-if="pathType === 'update'"
                  @click="handleUpdateAddress"
                  class="px-6 py-2 bg-mainColor text-white rounded-md hover:bg-opacity-90 transition-all"
                >
                  <div v-if="isLoading" class="flex items-center gap-2">
                    <div
                      class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    ></div>
                    <span>Đang lưu...</span>
                  </div>
                  <span v-else>Sửa thông tin</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiClient from '@/utils/axios'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '@/stores/auth'
import { useAddressStore } from '@/stores/address'

import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()
const isModalOpen = ref(false)
const addresses = ref(null)
const province = ref('')
const provinceFilter = ref(null)
const district = ref('')
const ward = ref('')
const debounce = ref(null)
const provinceInput = ref('')
const provinceSelect = ref(false)
const districtInput = ref('')
const districtSelect = ref(false)
const districtFilter = ref(null)
const wardInput = ref('')
const wardSelect = ref(false)
const wardFilter = ref(null)
// Error
const email = ref('')
const name = ref('')
const phone = ref('')
const addressPath = ref('')
const isDefault = ref(false)

const isLoading = ref(false)
const error = ref({
  emailError: null,
  nameError: null,
  phoneError: null,
  addressError: null,
  provinceError: null,
  districtError: null,
  wardError: null,
})

const getError = computed(() => {
  if (!email.value) {
    error.value.emailError = 'Email không được để trống'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value.emailError = 'Email không hợp lệ'
  } else {
    error.value.emailError = null
  }
  if (!name.value) {
    error.value.nameError = 'Họ tên không được để trống'
  } else {
    error.value.nameError = null
  }
  if (!phone.value) {
    error.value.phoneError = 'Số điện thoại không được để trống'
  } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone.value)) {
    error.value.phoneError = 'Số điện thoại không hợp lệ'
  } else {
    error.value.phoneError = null
  }

  if (!addressPath.value) {
    error.value.addressError = 'Địa chỉ không được để trống'
  } else {
    error.value.addressError = null
  }
  if (!province.value || !provinceInput.value) {
    error.value.provinceError = 'Tỉnh/Thành phố không được để trống'
  } else {
    error.value.provinceError = null
  }
  if (!district.value) {
    error.value.districtError = 'Quận/Huyện không được để trống'
  } else {
    error.value.districtError = null
  }
  if (!ward.value) {
    error.value.wardError = 'Phường/Xã không được để trống'
  } else {
    error.value.wardError = null
  }
  if (
    error.value.emailError ||
    error.value.nameError ||
    error.value.phoneError ||
    error.value.addressError ||
    error.value.provinceError ||
    error.value.districtError ||
    error.value.wardError
  ) {
    return error.value
  }
  return true
})

const validate = () => {
  if (
    error.value.emailError ||
    error.value.nameError ||
    error.value.phoneError ||
    error.value.addressError ||
    error.value.provinceError ||
    error.value.districtError ||
    error.value.wardError
  ) {
    return false
  }
  return true
}
const addressUpdateId = ref(null)
const openModalUpdate = async (event) => {
  const addressId = event.target.getAttribute('id')
  const address = addressUser.value.find((address) => address._id === addressId)
  isModalOpen.value = true
  addressUpdateId.value = addressId
  name.value = address.full_name
  phone.value = address.phone
  email.value = address.email
  addressPath.value = address.address_line
  provinceInput.value = address.province
  districtInput.value = address.district
  wardInput.value = address.ward
  isDefault.value = address.is_default
  province.value = address.province
  district.value = address.district
  ward.value = address.ward

  //
  router.push({ query: { ...route.query, submit: 'update' } })
}

const handleUpdateAddress = async () => {
  try {
    if (addressUpdateId.value) {
      isLoading.value = true
      const response = await apiClient.put(`/account/address/${addressUpdateId.value}`, {
        email: email.value,
        full_name: name.value,
        phone: phone.value,
        address_line: addressPath.value,
        province: province.value,
        district: district.value,
        ward: ward.value,
        is_default: isDefault.value,
      })
      if (response.status === 200) {
        console.log(response.data.data)

        if (response.data.data[0]) {
          const defaultAddress = addressUser.value.find(
            (address) => address._id === response.data.data[0]._id,
          )
          if (defaultAddress) {
            defaultAddress.name = response.data.data[0].name
            defaultAddress.phone = response.data.data[0].phone
            defaultAddress.email = response.data.data[0].email
            defaultAddress.address_line = response.data.data[0].address_line
            defaultAddress.province = response.data.data[0].province
            defaultAddress.district = response.data.data[0].district
            defaultAddress.ward = response.data.data[0].ward
            defaultAddress.is_default = response.data.data[0].is_default
          }
        }
        if (response.data.data[1]) {
          const editedAddress = addressUser.value.find(
            (address) => address._id === response.data.data[1]._id,
          )
          if (editedAddress) {
            editedAddress.name = response.data.data[1].name
            editedAddress.phone = response.data.data[1].phone
            editedAddress.email = response.data.data[1].email
            editedAddress.address_line = response.data.data[1].address_line
            editedAddress.province = response.data.data[1].province
            editedAddress.district = response.data.data[1].district
            editedAddress.ward = response.data.data[1].ward
            editedAddress.is_default = response.data.data[1].is_default
          }
        }
        $toast.success('Cập nhật địa chỉ thành công', {
          position: 'top-right',
          duration: 1000,
        })

        addressUser.value = addressUser.value.map((address) =>
          address._id === response.data.data[1]._id ? response.data.data[1] : address,
        )
        authStore.user.address = addressUser.value
        addressStore.setAddress(addressUser.value)
      }
    }
  } catch (error) {
    isLoading.value = false
    $toast.error('Cập nhật địa chỉ thất bại', {
      position: 'top-right',
      duration: 1000,
    })
  } finally {
    isLoading.value = false
  }
}

const handleDeleteAddress = async (event) => {
  const addressId = event.target.getAttribute('id')
  try {
    const response = await apiClient.delete(`/account/address/${addressId}`)
    $toast.success('Xoá địa chỉ thành công', {
      position: 'top-right',
      duration: 1000,
    })
    addressUser.value = addressUser.value.filter((address) => address._id !== addressId)
    authStore.user.address = addressUser.value
    addressStore.setAddress(addressUser.value)
  } catch (error) {
    console.error('Error deleting address:', error)
    $toast.error('Xoá địa chỉ thất bại', {
      position: 'top-right',
      duration: 1000,
    })
  }
}
const handleCreateAddress = async () => {
  if (validate()) {
    try {
      isLoading.value = true
      const response = await apiClient.post('/account/address', {
        email: email.value,
        full_name: name.value,
        phone: phone.value,
        address_line: addressPath.value,
        province: province.value,
        district: district.value,
        ward: ward.value,
        is_default: isDefault.value,
      })
      if (response.status === 200) {
        console.log(response.data.data)
        if (response.data.data[0]) {
          const defaultAddress = addressUser.value.find(
            (address) => address._id === response.data.data[0]._id,
          )
          if (defaultAddress) {
            defaultAddress.name = response.data.data[0].name
            defaultAddress.phone = response.data.data[0].phone
            defaultAddress.email = response.data.data[0].email
            defaultAddress.address_line = response.data.data[0].address_line
            defaultAddress.province = response.data.data[0].province
            defaultAddress.district = response.data.data[0].district
            defaultAddress.ward = response.data.data[0].ward
            defaultAddress.is_default = response.data.data[0].is_default
          }
        }
        $toast.success('Thêm địa chỉ thành công', {
          position: 'top-right',
          duration: 1000,
        })
        addressUser.value.push(response.data.data[1])
        addressStore.setAddress(addressUser.value)
        authStore.user.address = addressUser.value
        setTimeout(() => {
          closeModal()
        }, 2000)
      }
    } catch (error) {
      isLoading.value = false
      $toast.error('Thêm địa chỉ thất bại', {
        position: 'top-right',
        duration: 1000,
      })
    } finally {
      isLoading.value = false
      resetModal()
    }
  }
}

const selectProvince = (event) => {
  const name = event.target.getAttribute('name')
  provinceInput.value = name
  province.value = name
  provinceFilter.value = null
  provinceSelect.value = false
  districtInput.value = ''
  district.value = ''
  districtFilter.value = null
  districtSelect.value = false
  wardInput.value = ''
  ward.value = ''
  wardFilter.value = null
  wardSelect.value = false
}
const searchProvince = (event) => {
  clearTimeout(debounce.value)
  debounce.value = setTimeout(() => {
    provinceFilter.value = addresses.value.filter((p) =>
      p.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )
  }, 500)
}

const selectDistrict = (event) => {
  const name = event.target.getAttribute('name')
  districtInput.value = name
  district.value = name
  districtFilter.value = null
  districtSelect.value = false
}
const searchDistrict = (event) => {
  clearTimeout(debounce.value)
  debounce.value = setTimeout(() => {
    districtFilter.value = getDistrict.value.filter((d) =>
      d.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )
  }, 500)
}

const selectWard = (event) => {
  const name = event.target.getAttribute('name')
  wardInput.value = name
  ward.value = name
  wardFilter.value = null
  wardSelect.value = false
}

const searchWard = (event) => {
  clearTimeout(debounce.value)
  debounce.value = setTimeout(() => {
    wardFilter.value = getWard.value.filter((w) =>
      w.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )
  }, 500)
}

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Ngăn cuộn trang
  router.push({ query: { ...route.query, submit: 'create' } })
}

const resetModal = () => {
  name.value = null
  phone.value = null
  email.value = null
  addressPath.value = null
  isDefault.value = false
  provinceInput.value = null
  province.value = null
  provinceFilter.value = null
  provinceSelect.value = false
  districtInput.value = null
  district.value = null
  districtFilter.value = null
  districtSelect.value = false
  wardInput.value = null
  ward.value = null
  wardFilter.value = null
  wardSelect.value = false
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto' // Cho phép cuộn trang trở lại
  resetModal()
}

const closeModalOnOverlay = (event) => {
  // Chỉ đóng khi click vào overlay
  const modalContainer = document.querySelector('.modal-container')
  const provinceSelect = document.querySelector('.provinceSelect')
  if (
    modalContainer &&
    provinceSelect &&
    !modalContainer.contains(event.target) &&
    !provinceSelect.contains(event.target)
  ) {
    closeModal()
    provinceSelect.value = false
  }
}

const getDistrict = computed(() => {
  if (!addresses.value || !province.value) {
    district.value = ''
    return
  }

  const selectedProvince = addresses.value.find((p) => p.name === province.value)
  return selectedProvince?.districts || []
})

const getWard = computed(() => {
  if (!district.value) return []

  const selectedDistrict = getDistrict.value.find((d) => d.name === district.value)
  return selectedDistrict?.wards || []
})

const addressStore = useAddressStore()
const authStore = useAuthStore()
const addressUser = ref(null)
const route = useRoute()
const router = useRouter()
const pathType = computed(() => route.query.submit)

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await fetch('/address.json')
    const data = await response.json()
    addresses.value = data
    isLoading.value = false
  } catch (error) {
    console.error('Error loading addresses:', error)
    isLoading.value = false
  } finally {
    isLoading.value = false
  }
  if (!addressUser.value) {
    try {
      const response = await apiClient.get('/account/address')
      addressUser.value = response.data.data
      addressStore.setAddress(response.data.data)
      authStore.user.address = response.data.data
    } catch (error) {
      console.error('Error loading addresses:', error)
    }
  }
})
// Cleanup khi component bị hủy
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>
