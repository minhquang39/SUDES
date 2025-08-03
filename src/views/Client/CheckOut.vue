bun <template>
  <div class="min-h-screen bg-white flex flex-col items-center py-8 px-4">
    <div class="w-full max-w-6xl">
      <!-- Logo -->
      <div class="text-center mb-6">
        <img
          src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/logo.png?1739018973665"
          alt="Sudes Nest"
          class="mx-auto h-16"
        />
      </div>

      <!-- Nội dung chính -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Cột trái: Thông tin nhận hàng -->
        <div class="bg-white rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Thông tin nhận hàng</h2>

          <div class="space-y-4">
            <!-- Chọn địa chỉ có sẵn -->
            <div v-if="addressStore.addresses && addressStore.addresses.length > 0">
              <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ đã lưu</label>
              <select
                class="w-full border rounded-md p-2"
                @change="
                  handleSelectAddress($event.target.value ? JSON.parse($event.target.value) : null)
                "
              >
                <option
                  v-for="(address, index) in addressStore.addresses"
                  :key="index"
                  :value="JSON.stringify(address)"
                  :selected="selectedAddress && selectedAddress._id === address._id"
                >
                  {{ address.full_name }} - {{ address.address_line }}
                </option>
                <option value="">+ Thêm địa chỉ mới</option>
              </select>
            </div>

            <input
              type="email"
              placeholder="Email"
              :value="authStore.user.email"
              disabled
              class="w-full border rounded-md p-2 bg-gray-200"
            />

            <input
              type="text"
              id="fullName"
              placeholder="Họ và tên"
              class="w-full border rounded-md p-2"
              v-model="fullName"
              :readonly="!!selectedAddress"
            />

            <div class="flex items-center">
              <select class="border rounded-l-md p-2">
                <option>🇻🇳 +84</option>
              </select>
              <input
                type="tel"
                id="phone"
                placeholder="Số điện thoại"
                class="flex-1 border rounded-r-md p-2"
                v-model="phone"
                :readonly="!!selectedAddress"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
                <input
                  type="text"
                  class="w-full border rounded-md p-2"
                  v-model="provinceInput"
                  placeholder="Chọn tỉnh/thành phố"
                  @focus="provinceSelect = true"
                  @input="searchProvince($event)"
                  :readonly="!!selectedAddress"
                />

                <ul
                  v-if="provinceSelect && !selectedAddress"
                  class="w-full overflow-y-auto absolute top-[calc(100%+5px)] left-0 bg-white border border-gray-50 shadow z-50"
                  :class="!provinceFilter ? 'h-[200px]' : 'h-fit max-h-[200px]'"
                >
                  <div v-if="provinceFilter && provinceFilter.length > 0" class="max-h-fit">
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
                  <div v-else-if="addresses">
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

              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Quận/huyện</label>
                <input
                  type="text"
                  class="w-full border rounded-md p-2"
                  v-model="districtInput"
                  placeholder="Chọn quận, huyện"
                  @focus="districtSelect = true"
                  @input="searchDistrict($event)"
                  :readonly="!!selectedAddress || !provinceInput"
                />

                <ul
                  v-if="districtSelect && provinceInput && !selectedAddress"
                  class="w-full overflow-y-auto absolute top-[calc(100%+5px)] left-0 bg-white border border-gray-50 shadow z-50"
                  :class="!districtFilter ? 'h-[200px]' : 'h-fit max-h-[200px]'"
                >
                  <div v-if="districtFilter && districtFilter.length > 0" class="max-h-fit">
                    <li
                      v-for="(d, index) in districtFilter"
                      :key="index"
                      :name="d.name"
                      class="p-2 hover:bg-gray-100 cursor-pointer"
                      @click="selectDistrict($event)"
                    >
                      {{ d.name }}
                    </li>
                  </div>
                  <div v-else-if="getDistrict && getDistrict.length > 0">
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

              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Phường/xã</label>
                <input
                  type="text"
                  class="w-full border rounded-md p-2"
                  v-model="wardInput"
                  placeholder="Chọn phường, xã"
                  @focus="wardSelect = true"
                  @input="searchWard($event)"
                  :readonly="!!selectedAddress || !districtInput"
                />

                <ul
                  v-if="wardSelect && districtInput && !selectedAddress"
                  class="w-full overflow-y-auto absolute top-[calc(100%+5px)] left-0 bg-white border border-gray-50 shadow z-50"
                  :class="!wardFilter ? 'h-[200px]' : 'h-fit max-h-[200px]'"
                >
                  <div v-if="wardFilter && wardFilter.length > 0" class="max-h-fit">
                    <li
                      v-for="(w, index) in wardFilter"
                      :key="index"
                      :name="w.name"
                      class="p-2 hover:bg-gray-100 cursor-pointer"
                      @click="selectWard($event)"
                    >
                      {{ w.name }}
                    </li>
                  </div>
                  <div v-else-if="getWard && getWard.length > 0">
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

            <input
              type="text"
              id="addressLine"
              placeholder="Địa chỉ cụ thể"
              class="w-full border rounded-md p-2"
              v-model="addressLine"
              :readonly="!!selectedAddress"
            />
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-semibold mb-3">Thanh toán</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="bank_transfer"
                  v-model="paymentMethod"
                  class="mr-2"
                />
                Thanh toán với paypal
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  v-model="paymentMethod"
                  class="mr-2"
                />
                Thu hộ (COD)
              </label>
            </div>
          </div>
        </div>

        <!-- Cột phải: Thông tin đơn hàng -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Đơn hàng ({{ cartStore.cart.length }} sản phẩm)</h2>
            <span class="md:hidden text-blue-600 font-bold"
              >{{ formatPrice(totalPrice + 40000) }}₫</span
            >
          </div>

          <div>
            <div
              v-for="(item, index) in cartStore.cart"
              :key="index"
              class="flex items-center border-b pb-4 mb-4"
            >
              <img
                :src="item.image"
                alt="Set 12 Thượng Vy Yến Đảo"
                class="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div class="flex-1 flex justify-between items-center">
                <div>
                  <div class="font-medium">{{ item.name }}</div>
                  <div class="text-gray-600 text-xs">{{ item.SKU }}</div>
                  <div class="text-gray-600 text-xs">SL: {{ item.quantity }}</div>
                </div>
                <div class="text-gray-600">{{ formatPrice(item.price) }}₫</div>
              </div>
            </div>
          </div>

          <div class="mt-4 space-y-2">
            <div class="flex justify-between">
              <span>Tạm tính</span>
              <span>{{ formatPrice(totalPrice) }}₫</span>
            </div>
            <div class="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>40.000đ</span>
            </div>
            <div class="flex justify-between font-bold text-lg">
              <span>Tổng cộng</span>
              <span>{{ formatPrice(totalPrice + 40000) }}₫</span>
            </div>
          </div>

          <button
            class="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700 disabled:bg-gray-400"
            @click="handleCheckout"
            :disabled="isLoading || cartStore.cart.length === 0"
            v-if="paymentMethod === 'cod'"
          >
            <div v-if="isLoading" class="flex items-center justify-center gap-2">
              <div
                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
              <span>ĐANG XỬ LÝ...</span>
            </div>
            <span v-else>ĐẶT HÀNG</span>
          </button>

          <!-- PayPal Button -->
          <div v-if="paymentMethod === 'bank_transfer'" class="mt-4">
            <button
              @click="handlePayPalCheckout"
              class="w-full flex items-center justify-center bg-[#0070ba] hover:bg-[#005ea6] text-white py-3 rounded-md"
            >
              <img
                src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                alt="PayPal"
                class="h-6 mr-2"
              />
            </button>
          </div>

          <a href="/cart" class="block text-center text-blue-600 mt-4"> ← Quay về giỏ hàng </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAddressStore } from '@/stores/address'
import { useAuthStore } from '@/stores/auth'
import apiClient from '@/utils/axios'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'

const $toast = useToast()
const router = useRouter()
const cartStore = useCartStore()
const addressStore = useAddressStore()
const authStore = useAuthStore()

const isLoading = ref(false)
const paymentMethod = ref('cod')

// PayPal script loading state
const isPayPalLoaded = ref(false)

// Dữ liệu form
const fullName = ref('')
const phone = ref('')
const addressLine = ref('')
const email = ref('')

// Xử lý địa chỉ
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

const selectedAddress = ref(null)

const totalPrice = computed(() => {
  return cartStore.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

// Xử lý địa chỉ
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

const getDistrict = computed(() => {
  if (!addresses.value || !province.value) {
    district.value = ''
    return []
  }

  const selectedProvince = addresses.value.find((p) => p.name === province.value)
  return selectedProvince?.districts || []
})

const getWard = computed(() => {
  if (!district.value) return []

  const selectedDistrict = getDistrict.value.find((d) => d.name === district.value)
  return selectedDistrict?.wards || []
})

// Xử lý đặt hàng
const handleCheckout = async () => {
  // Kiểm tra giỏ hàng rỗng
  if (!cartStore.cart.length) {
    $toast.error('Giỏ hàng của bạn đang trống')
    return
  }

  // Kiểm tra thông tin địa chỉ
  if (
    !selectedAddress.value &&
    (!province.value ||
      !district.value ||
      !ward.value ||
      !addressLine.value ||
      !fullName.value ||
      !phone.value)
  ) {
    $toast.error({
      position: 'top-right',
      message: 'Vui lòng điền đầy đủ thông tin giao hàng',
    })
    return
  }

  try {
    isLoading.value = true
    // Nếu dùng địa chỉ đã lưu
    let orderData = {}

    if (selectedAddress.value) {
      orderData = {
        fullName: selectedAddress.value.full_name,
        phone: selectedAddress.value.phone,
        addressLine: selectedAddress.value.address_line,
        province: selectedAddress.value.province,
        district: selectedAddress.value.district,
        ward: selectedAddress.value.ward,
        paymentMethod: paymentMethod.value,
      }
    } else {
      // Nếu nhập địa chỉ mới
      orderData = {
        fullName: fullName.value,
        phone: phone.value,
        addressLine: addressLine.value,
        province: province.value,
        district: district.value,
        ward: ward.value,
        paymentMethod: paymentMethod.value,
      }
    }

    switch (paymentMethod.value) {
      case 'bank_transfer':
        console.log('Chuyển khoản')
        const response = await apiClient.post('/account/order', orderData)

        if (response.status === 200 || response.status === 201) {
          $toast.success('Đặt hàng thành công!')

          // Chuyển hướng đến trang cảm ơn với orderId
          const orderId = response.data.data?._id || response.data.data?.id || ''
          router.push({
            path: '/thank-you',
            query: orderId ? { orderId } : {},
          })
        }
        break
      case 'cod':
        console.log('Thanh toán khi nhận hàng')
        const codResponse = await apiClient.post('/account/order', orderData)

        if (codResponse.status === 200 || codResponse.status === 201) {
          $toast.success('Đặt hàng thành công!')
          cartStore.cart = []
          // Chuyển hướng đến trang cảm ơn với orderId
          router.push({
            path: '/thank-you',
          })
        }
        break
    }
  } catch (error) {
    console.error('Error creating order:', error)
    $toast.error(error.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại sau')
  } finally {
    isLoading.value = false
  }
}

// Khi chọn địa chỉ có sẵn
const handleSelectAddress = (address) => {
  if (!address) {
    // Reset tất cả các field khi chọn "Thêm địa chỉ mới"
    selectedAddress.value = null
    fullName.value = ''
    phone.value = ''
    addressLine.value = ''
    province.value = ''
    provinceInput.value = ''
    district.value = ''
    districtInput.value = ''
    ward.value = ''
    wardInput.value = ''

    // Reset các dropdown state
    provinceFilter.value = null
    provinceSelect.value = false
    districtFilter.value = null
    districtSelect.value = false
    wardFilter.value = null
    wardSelect.value = false
    return
  }

  selectedAddress.value = address
  // Tự động điền thông tin
  fullName.value = address.full_name
  phone.value = address.phone
  addressLine.value = address.address_line
  province.value = address.province
  provinceInput.value = address.province
  district.value = address.district
  districtInput.value = address.district
  ward.value = address.ward
  wardInput.value = address.ward

  // Đảm bảo đóng các dropdown khi chọn địa chỉ có sẵn
  provinceSelect.value = false
  districtSelect.value = false
  wardSelect.value = false
}

// Xử lý thanh toán PayPal khi click vào nút
const handlePayPalCheckout = async () => {
  // Kiểm tra giỏ hàng rỗng
  if (!cartStore.cart.length) {
    $toast.error('Giỏ hàng của bạn đang trống')
    return
  }

  // // Kiểm tra thông tin địa chỉ
  // if (
  //   !selectedAddress.value &&
  //   (!province.value ||
  //     !district.value ||
  //     !ward.value ||
  //     !addressLine.value ||
  //     !fullName.value ||
  //     !phone.value)
  // ) {
  //   $toast.error({
  //     position: 'top-right',
  //     message: 'Vui lòng điền đầy đủ thông tin giao hàng',
  //   })
  //   return
  // }

  try {
    isLoading.value = true

    // Nếu dùng địa chỉ đã lưu
    const orderData = selectedAddress.value
      ? {
          fullName: selectedAddress.value.full_name,
          phone: selectedAddress.value.phone,
          addressLine: selectedAddress.value.address_line,
          province: selectedAddress.value.province,
          district: selectedAddress.value.district,
          ward: selectedAddress.value.ward,
        }
      : {
          fullName: fullName.value,
          phone: phone.value,
          addressLine: addressLine.value,
          province: province.value,
          district: district.value,
          ward: ward.value,
        }

    localStorage.setItem('orderData', JSON.stringify(orderData))

    const response = await apiClient.post('/account/payment/paypal')

    if (response.status === 200 || response.status === 201) {
      const orderId = response.data.data?._id || response.data.data?.id

      console.log(response.data.data)

      window.location.href = response.data.data.approvalLink
    }

    console.log(orderData)
  } catch (error) {
    console.error('Error creating order:', error)
    $toast.error(error.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại sau')
  } finally {
    isLoading.value = false
  }
}

// Lấy địa chỉ từ store khi component được tạo
onMounted(async () => {
  try {
    // Tải dữ liệu địa chỉ Việt Nam
    const response = await fetch('/address.json')
    const data = await response.json()
    addresses.value = data
  } catch (error) {
    console.error('Error loading addresses:', error)
  }

  if (addressStore.addresses && addressStore.addresses.length > 0) {
    // Tìm địa chỉ mặc định hoặc lấy địa chỉ đầu tiên
    const defaultAddress =
      addressStore.addresses.find((addr) => addr.is_default) || addressStore.addresses[0]
    handleSelectAddress(defaultAddress)
  }
})
</script>
