<template>
  <div class="w-full h-full">
    <h2 class="text-[#212B25] text-[19px] mb-2 font-normal uppercase">Địa chỉ</h2>
    <div class="flex justify-center items-center h-full">
      <div></div>
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
      <div class="flex min-h-full items-center justify-center p-4 modal-container">
        <div
          class="bg-white rounded-lg shadow-xl w-[700px] max-w-[90%] mx-4 relative transform transition-all"
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
            <form class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
                    >Họ tên</label
                  >
                  <input
                    type="text"
                    id="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1"
                    >Số điện thoại</label
                  >
                  <input
                    type="text"
                    id="phone"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative mt-10 md:mt-0">
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-1"
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
                    class="w-full overflow-y-auto absolute top-[calc(100%+50px)] left-0 bg-white border border-gray-50 shadow provinceSelect z-50 md:z-0"
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
                </div>
                <div class="relative mt-10 md:mt-0">
                  <label for="district" class="block text-sm font-medium text-gray-700 mb-1"
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
                    v-if="districtSelect"
                    class="w-full overflow-y-auto absolute top-[calc(100%+50px)] left-0 bg-white border border-gray-50 shadow districtSelect z-50 md:z-0"
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
                </div>
                <div class="relative mt-10 md:mt-0">
                  <label for="ward" class="block text-sm font-medium text-gray-700 mb-1"
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
                    v-if="wardSelect"
                    class="w-full overflow-y-auto absolute top-[calc(100%+50px)] left-0 bg-white border border-gray-50 shadow wardSelect z-50 md:z-0"
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
                </div>
              </div>

              <div class="pt-14">
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1"
                  >Địa chỉ</label
                >
                <input
                  type="text"
                  id="address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor focus:border-mainColor"
                />
              </div>

              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="default"
                  class="w-4 h-4 text-mainColor border-gray-300 rounded focus:ring-mainColor"
                />
                <label for="default" class="text-sm text-gray-700">Đặt làm địa chỉ mặc định</label>
              </div>

              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  class="px-6 py-2 bg-mainColor text-white rounded-md hover:bg-opacity-90 transition-all"
                >
                  Lưu thông tin
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
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
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto' // Cho phép cuộn trang trở lại
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

onMounted(async () => {
  document.body.style.overflow = 'hidden'

  try {
    const response = await fetch('/address.json')
    const data = await response.json()
    addresses.value = data
    console.log('Addresses loaded:', addresses.value)
  } catch (error) {
    console.error('Error loading addresses:', error)
  }
})
// Cleanup khi component bị hủy
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>
