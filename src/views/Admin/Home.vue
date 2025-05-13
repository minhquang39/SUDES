<template>
  <div style="padding: 1.5rem">
    <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem">Dashboard</h1>
    <div
      style="
        display: flex;
        gap: 1.5rem;
        overflow-x: auto;
        padding-bottom: 1rem;
        margin-bottom: 2rem;
      "
    >
      <div
        class="stat-card"
        style="
          min-width: 250px;
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          padding: 1.25rem;
          display: flex;
          align-items: center;
        "
      >
        <div
          style="
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            background-color: #ecfdf5;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            color: #10b981;
          "
        >
          <n-icon size="24">
            <BagHandleOutline />
          </n-icon>
        </div>
        <div style="flex: 1">
          <h3 style="font-size: 0.875rem; color: #6b7280; font-weight: 500; margin-bottom: 0.25rem">
            Products
          </h3>
          <div style="font-size: 1.5rem; font-weight: 700; color: #1f2937">
            <count-up :end-val="statistics.products" :duration="2.5" />
          </div>
        </div>
      </div>

      <div
        class="stat-card"
        style="
          min-width: 250px;
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          padding: 1.25rem;
          display: flex;
          align-items: center;
        "
      >
        <div
          style="
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            background-color: #f5f3ff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            color: #8b5cf6;
          "
        >
          <n-icon size="24">
            <PeopleOutline />
          </n-icon>
        </div>
        <div style="flex: 1">
          <h3 style="font-size: 0.875rem; color: #6b7280; font-weight: 500; margin-bottom: 0.25rem">
            Users
          </h3>
          <div style="font-size: 1.5rem; font-weight: 700; color: #1f2937">
            <count-up :end-val="statistics.users" :duration="2.5" />
          </div>
        </div>
      </div>

      <div
        class="stat-card"
        style="
          min-width: 250px;
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          padding: 1.25rem;
          display: flex;
          align-items: center;
        "
      >
        <div
          style="
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            background-color: #fefce8;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            color: #eab308;
          "
        >
          <n-icon size="24">
            <BagOutline />
          </n-icon>
        </div>
        <div style="flex: 1">
          <h3 style="font-size: 0.875rem; color: #6b7280; font-weight: 500; margin-bottom: 0.25rem">
            Orders
          </h3>
          <div style="font-size: 1.5rem; font-weight: 700; color: #1f2937">
            <count-up :end-val="statistics.orders" :duration="2.5" />
          </div>
        </div>
      </div>

      <div
        class="stat-card"
        style="
          min-width: 250px;
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          padding: 1.25rem;
          display: flex;
          align-items: center;
        "
      >
        <div
          style="
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            background-color: #f0fdf4;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            color: #22c55e;
          "
        >
          <n-icon size="24">
            <CashOutline />
          </n-icon>
        </div>
        <div style="flex: 1">
          <h3 style="font-size: 0.875rem; color: #6b7280; font-weight: 500; margin-bottom: 0.25rem">
            Revenue
          </h3>
          <div style="font-size: 1.5rem; font-weight: 700; color: #1f2937">
            {{ formatRevenue(statistics.revenue) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Biểu đồ thống kê -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem">
      <!-- Biểu đồ đơn hàng theo thời gian -->
      <div
        style="
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          padding: 1.25rem;
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          "
        >
          <h3 style="font-size: 1rem; font-weight: 600; color: #374151">Orders Over Time</h3>
          <n-select
            v-model:value="orderPeriod"
            :options="periodOptions"
            style="width: 120px"
            @update:value="fetchOrderStats"
          />
        </div>
        <v-chart class="chart" :option="orderChartOption" autoresize />
      </div>

      <!-- Biểu đồ doanh thu theo thời gian -->
      <div
        style="
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          padding: 1.25rem;
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          "
        >
          <h3 style="font-size: 1rem; font-weight: 600; color: #374151">Revenue Over Time</h3>
          <n-select
            v-model:value="revenuePeriod"
            :options="periodOptions"
            style="width: 120px"
            @update:value="fetchOrderStats"
          />
        </div>
        <v-chart class="chart" :option="revenueChartOption" autoresize />
      </div>
    </div>

    <!-- Biểu đồ phân phối đơn hàng -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem">
      <!-- Biểu đồ đơn hàng theo trạng thái -->
      <div
        style="
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          padding: 1.25rem;
        "
      >
        <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: #374151">
          Orders by Status
        </h3>
        <v-chart class="chart" :option="orderStatusChartOption" autoresize />
      </div>

      <!-- Biểu đồ đơn hàng theo phương thức thanh toán -->
      <div
        style="
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          padding: 1.25rem;
        "
      >
        <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: #374151">
          Orders by Payment Method
        </h3>
        <v-chart class="chart" :option="paymentMethodChartOption" autoresize />
      </div>
    </div>

    <!-- Sản phẩm mới nhất -->
    <div
      style="
        background-color: #ffffff;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        padding: 1.25rem;
        margin-bottom: 2rem;
      "
    >
      <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: #374151">
        Latest Products
      </h3>
      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse">
          <thead>
            <tr style="border-bottom: 1px solid #e5e7eb">
              <th style="text-align: left; padding: 0.75rem; font-weight: 500; color: #6b7280">
                Image
              </th>
              <th style="text-align: left; padding: 0.75rem; font-weight: 500; color: #6b7280">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in latestProducts"
              :key="product._id"
              style="border-bottom: 1px solid #e5e7eb"
            >
              <td style="padding: 0.75rem; width: 60px">
                <img
                  :src="product.images[0]"
                  alt="Product"
                  style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px"
                />
              </td>
              <td style="padding: 0.75rem">{{ product.name }}</td>
            </tr>
            <tr v-if="latestProducts.length === 0">
              <td colspan="2" style="padding: 1rem; text-align: center; color: #6b7280">
                No products found
              </td>
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
          color: ['#10b981', '#ef4444', '#f59e0b'],
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
          color: ['#3b82f6', '#8b5cf6', '#f97316'],
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
            completed: '#10b981', // green
            pending: '#f59e0b', // amber
            cancelled: '#ef4444', // red
            processing: '#3b82f6', // blue
          }

          const statusData = data.ordersByStatus.map((item) => {
            const statusName = item._id.charAt(0).toUpperCase() + item._id.slice(1)
            return {
              value: item.count,
              name: statusName,
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart {
  height: 350px;
}

.chart-pie {
  height: 400px;
}

@media (max-width: 768px) {
  .chart {
    height: 250px;
  }

  .chart-pie {
    height: 300px;
  }
}
</style>
