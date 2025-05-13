<template>
  <div class="order-list">
    <!-- Header với tiêu đề -->
    <div class="header-actions">
      <h1 class="text-2xl font-semibold text-blue-800">Quản lý đơn hàng</h1>
    </div>

    <!-- Bộ lọc -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="filter-group">
        <div class="filter-label">Tìm kiếm</div>
        <n-input-group>
          <n-input
            v-model:value="searchKeyword"
            placeholder="Tìm kiếm theo tên, email, SĐT, SKU..."
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <n-icon><SearchOutline /></n-icon>
            </template>
          </n-input>
        </n-input-group>
      </div>

      <div class="filter-group">
        <div class="filter-label">Trạng thái</div>
        <n-select
          v-model:value="searchStatus"
          :options="statusOptions"
          placeholder="Lọc theo trạng thái"
          clearable
          @update:value="handleSearch"
        />
      </div>

      <div class="filter-group">
        <div class="filter-label">Thời gian</div>
        <n-date-picker
          v-model:value="searchDate"
          type="daterange"
          clearable
          placeholder="Lọc theo ngày"
          @update:value="handleSearch"
          style="width: 100%"
        />
      </div>
    </div>

    <div class="flex justify-end gap-2 mb-4">
      <n-button @click="handleSearch" type="primary">
        <template #icon>
          <n-icon><SearchOutline /></n-icon>
        </template>
        Tìm kiếm
      </n-button>
      <n-button @click="resetSearch" secondary>
        <template #icon>
          <n-icon><RefreshOutline /></n-icon>
        </template>
        Đặt lại
      </n-button>
    </div>

    <!-- Bảng đơn hàng -->
    <n-data-table
      ref="orderTable"
      :columns="columns"
      :data="orders"
      :loading="loading"
      :pagination="pagination"
      :row-key="rowKey"
      :scroll-x="1800"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
      @update:sorter="handleSorterChange"
    />

    <!-- Modal xem chi tiết đơn hàng -->
    <n-modal
      v-model:show="showOrderDetail"
      preset="card"
      style="width: 800px"
      title="Chi tiết đơn hàng"
      :bordered="false"
      :segmented="true"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold">Chi tiết đơn hàng #{{ selectedOrder?._id }}</h3>
            <p class="text-sm text-gray-500">
              {{ formatDate(selectedOrder?.createdAt) }}
            </p>
          </div>
          <n-tag :type="getOrderStatusType(selectedOrder?.orderStatus)">
            {{ getOrderStatusText(selectedOrder?.orderStatus) }}
          </n-tag>
        </div>
      </template>

      <n-spin :show="detailLoading">
        <n-tabs type="line" animated>
          <n-tab-pane name="info" tab="Thông tin đơn hàng">
            <n-grid :cols="24" :x-gap="12">
              <n-grid-item :span="12">
                <div class="mb-4">
                  <h4 class="text-sm font-semibold text-gray-500">THÔNG TIN KHÁCH HÀNG</h4>
                  <div class="mt-2 space-y-2">
                    <p>
                      <span class="font-semibold">Họ tên:</span>
                      {{ selectedOrder?.user?.name || selectedOrder?.shippingAddress?.fullName }}
                    </p>
                    <p>
                      <span class="font-semibold">Email:</span>
                      {{ selectedOrder?.user?.email }}
                    </p>
                    <p>
                      <span class="font-semibold">SĐT:</span>
                      {{ selectedOrder?.shippingAddress?.phone }}
                    </p>
                  </div>
                </div>
              </n-grid-item>
              <n-grid-item :span="12">
                <div class="mb-4">
                  <h4 class="text-sm font-semibold text-gray-500">THÔNG TIN GIAO HÀNG</h4>
                  <div class="mt-2 space-y-2">
                    <p>
                      <span class="font-semibold">Người nhận:</span>
                      {{ selectedOrder?.shippingAddress?.fullName }}
                    </p>
                    <p>
                      <span class="font-semibold">Địa chỉ:</span>
                      {{ selectedOrder?.shippingAddress?.addressLine }},
                      {{ selectedOrder?.shippingAddress?.ward }},
                      {{ selectedOrder?.shippingAddress?.district }},
                      {{ selectedOrder?.shippingAddress?.province }}
                    </p>
                    <p>
                      <span class="font-semibold">SĐT:</span>
                      {{ selectedOrder?.shippingAddress?.phone }}
                    </p>
                  </div>
                </div>
              </n-grid-item>
            </n-grid>

            <h4 class="text-sm font-semibold text-gray-500 mt-4 mb-2">CHI TIẾT ĐƠN HÀNG</h4>
            <n-data-table
              :columns="orderItemColumns"
              :data="selectedOrder?.items || []"
              :bordered="false"
              :single-line="false"
              size="small"
            />

            <div class="mt-4">
              <div class="flex justify-between py-2">
                <span>Tổng tiền sản phẩm:</span>
                <span>{{ formatPrice(calculateSubtotal(selectedOrder?.items)) }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span>Phí vận chuyển:</span>
                <span>{{ formatPrice(selectedOrder?.shippingFee || 0) }}</span>
              </div>
              <div class="flex justify-between py-2 text-lg font-bold">
                <span>Tổng thanh toán:</span>
                <span>{{ formatPrice(calculateTotal(selectedOrder)) }}</span>
              </div>
            </div>
          </n-tab-pane>

          <n-tab-pane name="history" tab="Lịch sử đơn hàng">
            <div class="space-y-4">
              <div
                v-for="(log, index) in selectedOrder?.statusHistory || []"
                :key="index"
                class="flex"
              >
                <div class="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
                <div class="ml-4">
                  <p class="font-semibold">{{ getOrderStatusText(log.status) }}</p>
                  <p class="text-gray-500 text-sm">{{ formatDate(log.timestamp) }}</p>
                  <p v-if="log.note" class="text-sm mt-1">{{ log.note }}</p>
                </div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-spin>

      <template #footer>
        <div class="flex justify-between">
          <div>
            <n-select
              v-model:value="updateStatus"
              :options="statusOptions"
              style="width: 200px"
              placeholder="Cập nhật trạng thái"
            />
            <n-button
              class="ml-2"
              type="primary"
              :disabled="!updateStatus || updateStatus === selectedOrder?.orderStatus"
              :loading="updatingStatus"
              @click="handleUpdateStatus"
            >
              Cập nhật
            </n-button>
          </div>
          <n-button @click="showOrderDetail = false">Đóng</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from 'vue'
import {
  NCard,
  NButton,
  NDataTable,
  NInput,
  NSpace,
  NGrid,
  NGridItem,
  NIcon,
  NSelect,
  NDatePicker,
  NModal,
  NSpin,
  NTabs,
  NTabPane,
  NTag,
  useMessage,
  NInputGroup,
} from 'naive-ui'
import { SearchOutline, RefreshOutline, TimeOutline } from '@vicons/ionicons5'
import apiClient from '@/utils/axios'

const message = useMessage()
const loading = ref(false)
const detailLoading = ref(false)
const updatingStatus = ref(false)
const orders = ref([])
const selectedOrder = ref(null)
const showOrderDetail = ref(false)
const updateStatus = ref(null)

// Dữ liệu tìm kiếm
const searchKeyword = ref('')
const searchStatus = ref(null)
const searchDate = ref(null)

// Danh sách trạng thái đơn hàng
const statusOptions = [
  { label: 'Chờ xác nhận', value: 'pending' },
  { label: 'Đang giao hàng', value: 'shipping' },
  { label: 'Đã hoàn thành', value: 'completed' },
  { label: 'Đã hủy', value: 'cancelled' },
]

// Cài đặt phân trang
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  pageSizes: [10, 20, 30, 50],
  showSizePicker: true,
  prefix({ itemCount }) {
    return `Tổng ${itemCount} đơn hàng`
  },
})

// Hàm xử lý sắp xếp
const sorter = ref(null)
const handleSorterChange = (value) => {
  sorter.value = value
  fetchOrders()
}

// Định nghĩa cột cho bảng đơn hàng
const columns = [
  {
    type: 'expand',
    renderExpand: (row) => {
      return h('div', { class: 'mt-2' }, [
        // Hiển thị bảng sản phẩm với style giống hình mẫu và khoảng cách hẹp
        h('table', { class: ' border-collapse' }, [
          // Header với nền tối
          h('thead', { class: 'bg-gray-700 text-white text-xs' }, [
            h('tr', [
              h('th', { class: 'py-2 px-2 text-left font-medium' }, 'PRODUCT SKU'),
              h('th', { class: 'py-2 px-2 text-left font-medium' }, 'PRODUCT TITLE'),
              h('th', { class: 'py-2 px-2 text-center font-medium w-[100px]' }, 'IMAGE'),
              h('th', { class: 'py-2 px-2 text-center font-medium w-[80px]' }, 'QUANTITY'),
              h('th', { class: 'py-2 px-2 text-right font-medium w-[120px]' }, 'PRICE'),
              h('th', { class: 'py-2 px-2 text-right font-medium w-[120px]' }, 'SUB TOTAL'),
            ]),
          ]),
          // Body
          h(
            'tbody',
            { class: 'bg-gray-800 text-white divide-y divide-gray-700' },
            row.items.map((item) =>
              h('tr', { class: 'hover:bg-gray-750' }, [
                // Cột ID sản phẩm - thu hẹp
                h('td', { class: 'py-2 px-2 text-left text-xs' }, item._id || item.SKU || 'N/A'),
                // Cột tên sản phẩm
                h('td', { class: 'py-2 px-2 text-left' }, item.name),
                // Cột hình ảnh - thu hẹp
                h('td', { class: 'py-2 px-1 text-center' }, [
                  h('div', { class: 'flex justify-center' }, [
                    h('img', {
                      src: item.image,
                      class: 'h-8 w-8 object-cover rounded',
                      onerror: "this.src='https://via.placeholder.com/50'",
                    }),
                  ]),
                ]),
                // Cột số lượng - thu hẹp
                h('td', { class: 'py-2 px-1 text-center' }, item.quantity),
                // Cột đơn giá - thu hẹp
                h(
                  'td',
                  { class: 'py-2 px-2 text-right whitespace-nowrap' },
                  formatPrice(item.price),
                ),
                // Cột thành tiền - thu hẹp
                h(
                  'td',
                  { class: 'py-2 px-2 text-right font-medium whitespace-nowrap' },
                  formatPrice(item.price * item.quantity),
                ),
              ]),
            ),
          ),
        ]),
      ])
    },
  },
  {
    title: 'Mã đơn hàng',
    key: '_id',
    width: 220,
    sorter: true,
    fixed: 'left',
    render(row) {
      return h(
        'div',
        {
          class: 'flex flex-col',
        },
        [
          h('span', { class: 'font-medium' }, `#${row._id}`),
          h('span', { class: 'text-xs text-gray-500' }, formatDateShort(row.createdAt)),
        ],
      )
    },
  },
  {
    title: 'Khách hàng',
    key: 'customer',
    width: 220,
    render(row) {
      return h(
        'div',
        {
          class: 'flex flex-col',
        },
        [
          h('span', { class: 'font-medium' }, row.shippingAddress?.fullName || 'N/A'),
          h('span', { class: 'text-xs text-gray-500' }, row.shippingAddress?.phone || 'N/A'),
        ],
      )
    },
  },
  {
    title: 'Địa chỉ giao hàng',
    key: 'address',
    width: 300,
    ellipsis: {
      tooltip: true,
    },
    render(row) {
      const address = [
        row.shippingAddress?.addressLine,
        row.shippingAddress?.ward,
        row.shippingAddress?.district,
        row.shippingAddress?.province,
      ]
        .filter(Boolean)
        .join(', ')
      return address || 'N/A'
    },
  },
  {
    title: 'Tổng tiền',
    key: 'total',
    width: 150,
    sorter: true,
    render(row) {
      return formatPrice(calculateTotal(row))
    },
  },
  {
    title: 'Trạng thái',
    key: 'orderStatus',
    width: 180,
    sorter: true,
    render(row) {
      return h(
        NTag,
        {
          type: getOrderStatusType(row.orderStatus),
          size: 'small',
          round: true,
        },
        {
          default: () => getOrderStatusText(row.orderStatus),
        },
      )
    },
  },
  {
    title: 'Thanh toán',
    key: 'paymentStatus',
    width: 150,
    render(row) {
      const isPaid = row.paymentStatus === 'paid'
      return h(
        NTag,
        {
          type: isPaid ? 'success' : 'warning',
          size: 'small',
          round: true,
        },
        {
          default: () => (isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'),
        },
      )
    },
  },
  {
    title: 'Thời gian',
    key: 'createdAt',
    width: 180,
    sorter: true,
    render(row) {
      return h(
        'div',
        {
          class: 'flex items-center',
        },
        [
          h(NIcon, { size: 16, class: 'mr-1' }, { default: () => h(TimeOutline) }),
          formatTime(row.createdAt),
        ],
      )
    },
  },
  {
    title: 'Thao tác',
    key: 'actions',
    width: 200,
    fixed: 'right',
    render(row) {
      return h(NSelect, {
        value: row.orderStatus,
        options: statusOptions,
        size: 'small',
        style: 'min-width: 150px',
        disabled: row.orderStatus === 'cancelled' || row.orderStatus === 'completed',
        onUpdateValue: (value) => handleUpdateOrderStatus(row._id, value),
      })
    },
  },
]

// Định nghĩa cột cho bảng chi tiết sản phẩm trong modal
const orderItemColumns = [
  {
    title: 'Sản phẩm',
    key: 'name',
    render(row) {
      return h('div', { class: 'flex items-center space-x-3' }, [
        h('img', {
          src: row.image,
          class: 'w-12 h-12 object-cover rounded',
          onerror: "this.src='https://via.placeholder.com/50'",
        }),
        h('div', [
          h('div', { class: 'font-medium' }, row.name),
          h('div', { class: 'text-xs text-gray-500' }, `SKU: ${row.SKU}`),
        ]),
      ])
    },
  },
  {
    title: 'Đơn giá',
    key: 'price',
    width: 150,
    render(row) {
      return formatPrice(row.price)
    },
  },
  {
    title: 'Số lượng',
    key: 'quantity',
    width: 100,
  },
  {
    title: 'Thành tiền',
    key: 'total',
    width: 150,
    render(row) {
      return formatPrice(row.price * row.quantity)
    },
  },
]

const rowKey = (row) => row._id

// Lấy trạng thái đơn hàng dưới dạng text
const getOrderStatusText = (status) => {
  if (!status) return 'Không xác định'
  const statusObj = statusOptions.find((option) => option.value === status)
  return statusObj?.label || status
}

// Lấy loại tag dựa trên trạng thái
const getOrderStatusType = (status) => {
  switch (status) {
    case 'pending':
      return 'warning'
    case 'shipping':
      return 'info'
    case 'completed':
      return 'success'
    case 'cancelled':
      return 'error'
    default:
      return 'default'
  }
}

// Format giá tiền
const formatPrice = (price) => {
  if (price === undefined || price === null) return '0 ₫'
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
}

// Format ngày giờ
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
}

// Format ngày ngắn gọn
const formatDateShort = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
}

// Format thời gian
const formatTime = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
}

// Tính tổng tiền sản phẩm
const calculateSubtotal = (items) => {
  if (!items || !items.length) return 0
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Tính tổng tiền đơn hàng
const calculateTotal = (order) => {
  if (!order) return 0
  const subtotal = calculateSubtotal(order.items)
  const shippingFee = order.shippingFee || 0
  return subtotal + shippingFee
}

// Lấy danh sách đơn hàng
const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('/admin/order')

    if (response.status === 200) {
      // Trả về tất cả đơn hàng
      orders.value = response.data.data || []

      // Thiết lập tổng số đơn hàng cho phân trang
      pagination.itemCount = orders.value.length

      // Lọc dữ liệu phía client nếu có tìm kiếm
      if (searchKeyword.value) {
        const keyword = searchKeyword.value.toLowerCase()
        orders.value = orders.value.filter((order) => {
          const customerName = order.shippingAddress?.fullName?.toLowerCase() || ''
          const email = order.user?.email?.toLowerCase() || ''
          const phone = order.shippingAddress?.phone?.toLowerCase() || ''
          const orderId = order._id?.toLowerCase() || ''

          // Tìm kiếm trong các sản phẩm của đơn hàng
          const hasMatchingItems = order.items?.some((item) => {
            const itemName = item.name?.toLowerCase() || ''
            const itemSku = item.SKU?.toLowerCase() || ''
            return itemName.includes(keyword) || itemSku.includes(keyword)
          })

          return (
            customerName.includes(keyword) ||
            email.includes(keyword) ||
            phone.includes(keyword) ||
            orderId.includes(keyword) ||
            hasMatchingItems
          )
        })
      }

      // Lọc theo trạng thái
      if (searchStatus.value) {
        orders.value = orders.value.filter((order) => order.orderStatus === searchStatus.value)
      }

      // Lọc theo ngày
      if (searchDate.value && Array.isArray(searchDate.value)) {
        const [startDate, endDate] = searchDate.value
        if (startDate && endDate) {
          const start = new Date(startDate)
          const end = new Date(endDate)
          end.setHours(23, 59, 59, 999) // Đặt thời gian kết thúc là cuối ngày

          orders.value = orders.value.filter((order) => {
            const orderDate = new Date(order.createdAt)
            return orderDate >= start && orderDate <= end
          })
        }
      }

      // Sắp xếp dữ liệu nếu có
      if (sorter.value) {
        const { columnKey, order } = sorter.value
        const isAscend = order === 'ascend'

        orders.value.sort((a, b) => {
          let valueA, valueB

          // Xử lý các trường đặc biệt
          if (columnKey === 'total') {
            valueA = calculateTotal(a)
            valueB = calculateTotal(b)
          } else if (columnKey === 'createdAt') {
            valueA = new Date(a.createdAt).getTime()
            valueB = new Date(b.createdAt).getTime()
          } else {
            valueA = a[columnKey]
            valueB = b[columnKey]
          }

          // So sánh
          if (valueA < valueB) return isAscend ? -1 : 1
          if (valueA > valueB) return isAscend ? 1 : -1
          return 0
        })
      }

      // Phân trang dữ liệu
      const start = (pagination.page - 1) * pagination.pageSize
      const end = start + pagination.pageSize
      orders.value = orders.value.slice(start, end)
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    message.error('Không thể tải danh sách đơn hàng')
  } finally {
    loading.value = false
  }
}

// Lấy chi tiết đơn hàng
const viewOrderDetail = async (orderId) => {
  detailLoading.value = true
  updateStatus.value = null

  try {
    const response = await apiClient.get(`/admin/order/${orderId}`)
    if (response.status === 200) {
      selectedOrder.value = response.data.data
      showOrderDetail.value = true
    }
  } catch (error) {
    console.error('Error fetching order detail:', error)
    message.error('Không thể tải thông tin chi tiết đơn hàng')
  } finally {
    detailLoading.value = false
  }
}

// Cập nhật trạng thái đơn hàng
const handleUpdateStatus = async () => {
  if (!selectedOrder.value || !updateStatus.value) return

  updatingStatus.value = true
  try {
    const response = await apiClient.put(`/admin/order/${selectedOrder.value._id}/status`, {
      status: updateStatus.value,
    })

    if (response.status === 200) {
      message.success('Cập nhật trạng thái đơn hàng thành công')
      // Cập nhật lại chi tiết đơn hàng
      await viewOrderDetail(selectedOrder.value._id)
      // Cập nhật lại danh sách đơn hàng
      fetchOrders()
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    message.error('Không thể cập nhật trạng thái đơn hàng')
  } finally {
    updatingStatus.value = false
  }
}

// Cập nhật trạng thái đơn hàng
const handleUpdateOrderStatus = async (orderId, newStatus) => {
  updatingStatus.value = true
  try {
    const response = await apiClient.put(`/admin/order/${orderId}`, {
      status: newStatus,
    })

    if (response.status === 200) {
      message.success('Cập nhật trạng thái đơn hàng thành công')
      // Cập nhật lại danh sách đơn hàng
      fetchOrders()
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    message.error('Không thể cập nhật trạng thái đơn hàng')
  } finally {
    updatingStatus.value = false
  }
}

// Xử lý thay đổi trang
const handlePageChange = (currentPage) => {
  pagination.page = currentPage
  fetchOrders()
}

// Xử lý thay đổi số lượng hiển thị
const handlePageSizeChange = (pageSize) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  fetchOrders()
}

// Xử lý tìm kiếm
const handleSearch = () => {
  pagination.page = 1
  fetchOrders()
}

// Đặt lại tìm kiếm
const resetSearch = () => {
  searchKeyword.value = ''
  searchStatus.value = null
  searchDate.value = null
  pagination.page = 1
  fetchOrders()
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.order-list {
  padding: 16px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-actions h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.filter-group {
  width: 100%;
}

.filter-label {
  font-weight: 500;
  margin-bottom: 8px;
  color: #666;
}

.n-data-table-td {
  padding: 12px !important;
}

/* Thêm style cho các cell trong bảng */
.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-weight: 500;
}

.product-brand {
  color: #666;
  font-size: 0.9em;
}

.action-buttons {
  display: flex;
  gap: 8px;
}
</style>
