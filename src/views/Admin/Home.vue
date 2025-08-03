<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Dashboard</h1>

    <!-- Statistics Cards -->
    <div class="flex gap-6 overflow-x-auto pb-4 mb-8">
      <!-- Products Card -->
      <div class="stat-card min-w-[250px] bg-white rounded-lg shadow-sm p-5 flex items-center">
        <div
          class="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mr-4 text-green-500"
        >
          <n-icon size="24">
            <BagHandleOutline />
          </n-icon>
        </div>
        <div class="flex-1">
          <h3 class="text-sm text-gray-500 font-medium mb-1">Products</h3>
          <div class="text-2xl font-bold text-gray-900">
            <count-up :end-val="statistics.products" :duration="2.5" />
          </div>
        </div>
      </div>

      <!-- Users Card -->
      <div class="stat-card min-w-[250px] bg-white rounded-lg shadow-sm p-5 flex items-center">
        <div
          class="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mr-4 text-purple-500"
        >
          <n-icon size="24">
            <PeopleOutline />
          </n-icon>
        </div>
        <div class="flex-1">
          <h3 class="text-sm text-gray-500 font-medium mb-1">Users</h3>
          <div class="text-2xl font-bold text-gray-900">
            <count-up :end-val="statistics.users" :duration="2.5" />
          </div>
        </div>
      </div>

      <!-- Orders Card -->
      <div class="stat-card min-w-[250px] bg-white rounded-lg shadow-sm p-5 flex items-center">
        <div
          class="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center mr-4 text-yellow-500"
        >
          <n-icon size="24">
            <BagOutline />
          </n-icon>
        </div>
        <div class="flex-1">
          <h3 class="text-sm text-gray-500 font-medium mb-1">Orders</h3>
          <div class="text-2xl font-bold text-gray-900">
            <count-up :end-val="statistics.orders" :duration="2.5" />
          </div>
        </div>
      </div>

      <!-- Revenue Card -->
      <div class="stat-card min-w-[250px] bg-white rounded-lg shadow-sm p-5 flex items-center">
        <div
          class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mr-4 text-green-600"
        >
          <n-icon size="24">
            <CashOutline />
          </n-icon>
        </div>
        <div class="flex-1">
          <h3 class="text-sm text-gray-500 font-medium mb-1">Revenue</h3>
          <div class="text-2xl font-bold text-gray-900">
            {{ formatRevenue(statistics.revenue) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Orders Over Time Chart -->
      <div class="bg-white rounded-lg shadow-sm p-5">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-semibold text-gray-700">Orders Over Time</h3>
          <n-select
            v-model:value="orderPeriod"
            :options="periodOptions"
            class="w-30"
            @update:value="fetchOrderStats"
          />
        </div>
        <v-chart class="chart" :option="orderChartOption" autoresize />
      </div>

      <!-- Revenue Over Time Chart -->
      <div class="bg-white rounded-lg shadow-sm p-5">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-semibold text-gray-700">Revenue Over Time</h3>
          <n-select
            v-model:value="revenuePeriod"
            :options="periodOptions"
            class="w-30"
            @update:value="fetchOrderStats"
          />
        </div>
        <v-chart class="chart" :option="revenueChartOption" autoresize />
      </div>
    </div>

    <!-- Distribution Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Orders by Status -->
      <div class="bg-white rounded-lg shadow-sm p-5">
        <h3 class="text-base font-semibold mb-4 text-gray-700">Orders by Status</h3>
        <v-chart class="chart-pie" :option="orderStatusChartOption" autoresize />
      </div>

      <!-- Orders by Payment Method -->
      <div class="bg-white rounded-lg shadow-sm p-5">
        <h3 class="text-base font-semibold mb-4 text-gray-700">Orders by Payment Method</h3>
        <v-chart class="chart-pie" :option="paymentMethodChartOption" autoresize />
      </div>
    </div>

    <!-- Latest Products Table -->
    <div class="bg-white rounded-lg shadow-sm p-5 mb-8">
      <h3 class="text-base font-semibold mb-4 text-gray-700">Latest Products</h3>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-0 font-medium text-gray-500">Image</th>
              <th class="text-left py-3 px-0 font-medium text-gray-500">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in latestProducts"
              :key="product._id"
              class="border-b border-gray-200"
            >
              <td class="py-3 w-[60px]">
                <img
                  :src="product.images[0]"
                  alt="Product"
                  class="w-[50px] h-[50px] object-cover rounded"
                />
              </td>
              <td class="py-3">{{ product.name }}</td>
            </tr>
            <tr v-if="latestProducts.length === 0">
              <td colspan="2" class="py-4 text-center text-gray-500">No products found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/utils/axios'
import CountUp from './components/CountUp.vue'
import { NIcon, NSelect } from 'naive-ui'
import {
  FolderOutline,
  BagHandleOutline,
  PeopleOutline,
  BagOutline,
  CashOutline,
} from '@vicons/ionicons5'
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

export default {
  name: 'AdminHome',
  components: {
    CountUp,
    NIcon,
    NSelect,
    FolderOutline,
    BagHandleOutline,
    PeopleOutline,
    BagOutline,
    CashOutline,
    VChart,
  },
  setup() {
    const statistics = ref({
      products: 0,
      users: 0,
      orders: 0,
      revenue: 0,
    })

    const latestProducts = ref([])
    const orderPeriod = ref('monthly')
    const revenuePeriod = ref('monthly')

    const periodOptions = [
      { label: 'Daily', value: 'daily' },
      { label: 'Weekly', value: 'weekly' },
      { label: 'Monthly', value: 'monthly' },
    ]

    // Dữ liệu cho biểu đồ đơn hàng
    const orderChartOption = ref({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Orders',
          type: 'bar',
          barWidth: '60%',
          data: [],
          itemStyle: {
            color: '#3b82f6',
          },
        },
      ],
    })

    // Dữ liệu cho biểu đồ doanh thu
    const revenueChartOption = ref({
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          const data = params[0]
          return `${data.name}<br/>${data.seriesName}: ${formatPrice(data.value)} đ`
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            if (value >= 1000000000) {
              return (value / 1000000000).toFixed(1) + ' tỷ'
            } else if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + ' tr'
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + ' k'
            }
            return value
          },
        },
      },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: [],
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#10b981',
          },
          itemStyle: {
            color: '#10b981',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(16, 185, 129, 0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(16, 185, 129, 0.05)',
                },
              ],
            },
          },
        },
      ],
    })

    // Biểu đồ đơn hàng theo trạng thái
    const orderStatusChartOption = ref({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
      },
      series: [
        {
          name: 'Order Status',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [],
          color: ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'],
        },
      ],
    })

    // Biểu đồ đơn hàng theo phương thức thanh toán
    const paymentMethodChartOption = ref({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
      },
      series: [
        {
          name: 'Payment Method',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
    })

    // Định dạng giá tiền
    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN').format(price)
    }

    // Định dạng doanh thu tổng quan
    const formatRevenue = (value) => {
      if (value >= 1000000000) {
        return (value / 1000000000).toFixed(1) + ' tỷ đ'
      } else if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + ' triệu đ'
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + ' nghìn đ'
      }
      return value + ' đ'
    }

    onMounted(() => {
      fetchDashboardStats()
      fetchOrderStats()
    })

    const fetchDashboardStats = async () => {
      try {
        const response = await apiClient.get('/dashboard/stats')
        const data = response.data.data

        // Cập nhật thống kê tổng quan
        statistics.value.products = data.totalProducts
        statistics.value.users = data.totalUsers
        statistics.value.orders = data.totalOrders
        statistics.value.revenue = data.revenue

        // Cập nhật biểu đồ đơn hàng theo trạng thái
        if (data.ordersByStatus) {
          // Định nghĩa màu sắc cho từng trạng thái
          const statusColors = {
            completed: '#10b981', //
            pending: '#f59e0b', //
            cancelled: '#ef4444', //
            shipping: '#3b82f6',
          }

          const statusData = data.ordersByStatus.map((item) => {
            const statusName = item._id.charAt(0).toUpperCase() + item._id.slice(1)
            return {
              value: item.count,
              name: statusName,
              itemStyle: {
                color: statusColors[item._id] || '#999999',
              },
            }
          })

          orderStatusChartOption.value.series[0].data = statusData
        }

        // Cập nhật biểu đồ đơn hàng theo phương thức thanh toán
        if (data.ordersByPaymentMethod) {
          const paymentData = data.ordersByPaymentMethod.map((item) => {
            const methodName = item._id.toUpperCase()
            return {
              value: item.count,
              name: methodName,
            }
          })

          paymentMethodChartOption.value.series[0].data = paymentData
        }

        // Cập nhật danh sách sản phẩm mới nhất
        if (data.latestProducts) {
          latestProducts.value = data.latestProducts
        }
      } catch (error) {
        console.error('Error fetching dashboard statistics:', error)
      }
    }

    const fetchOrderStats = async () => {
      try {
        const response = await apiClient.get(`/dashboard/orders?period=${orderPeriod.value}`)
        const data = response.data.data

        // Xử lý dữ liệu cho biểu đồ đơn hàng và doanh thu
        const labels = []
        const orderCounts = []
        const revenues = []

        data.forEach((item) => {
          // Định dạng nhãn thời gian
          let label = ''
          if (orderPeriod.value === 'daily') {
            const date = item._id.date
            label = new Date(date).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
            })
          } else if (orderPeriod.value === 'weekly') {
            label = item._id.year_week
          } else {
            const [year, month] = item._id.year_month.split('-')
            label = `${month}/${year}`
          }

          labels.push(label)
          orderCounts.push(item.count)
          revenues.push(item.revenue)
        })

        // Cập nhật biểu đồ đơn hàng
        orderChartOption.value.xAxis.data = labels
        orderChartOption.value.series[0].data = orderCounts

        // Cập nhật biểu đồ doanh thu
        revenueChartOption.value.xAxis.data = labels
        revenueChartOption.value.series[0].data = revenues
      } catch (error) {
        console.error('Error fetching order statistics:', error)
      }
    }

    return {
      statistics,
      latestProducts,
      orderPeriod,
      revenuePeriod,
      periodOptions,
      orderChartOption,
      revenueChartOption,
      orderStatusChartOption,
      paymentMethodChartOption,
      fetchOrderStats,
      formatPrice,
      formatRevenue,
    }
  },
}
</script>

<style scoped>
.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.chart {
  height: 350px;
}

.chart-pie {
  height: 400px;
}

/* Custom width for select components */
.w-30 {
  width: 120px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart {
    height: 250px;
  }

  .chart-pie {
    height: 300px;
  }

  /* Improve mobile stats cards layout */
  .stat-card {
    min-width: 280px;
  }
}

@media (max-width: 640px) {
  .stat-card {
    min-width: 100%;
  }
}
</style>
