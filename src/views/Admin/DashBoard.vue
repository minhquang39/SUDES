<template>
  <n-layout has-sider>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      bordered
      @collapse="collapsed = true"
      @expand="collapsed = false"
      :native-scrollbar="false"
      style="height: 100vh"
      class="shadow-lg"
      content-style="padding: 0;"
    >
      <!-- Menu -->
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleUpdateValue"
      />

      <!-- Phần đăng xuất -->
      <div class="border-t border-gray-200 p-4 mt-auto bg-gray-50">
        <n-button
          @click="logout"
          class="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          text
        >
          <div class="flex items-center gap-2">
            <n-icon size="18">
              <ArrowRightOnRectangleIcon />
            </n-icon>
            <span v-if="!collapsed" class="font-medium">Đăng xuất</span>
          </div>
        </n-button>
      </div>
    </n-layout-sider>

    <n-layout>
      <div class="p-6">
        <router-view></router-view>
      </div>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { ref, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NLayout, NLayoutSider, NMenu, NIcon, NButton } from 'naive-ui'
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  NewspaperIcon,
  FolderIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// State for sidebar
const collapsed = ref(false)
const activeKey = ref(route.path)

function handleUpdateValue(key) {
  activeKey.value = key
  router.push(key)
}

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// Menu options
const menuOptions = [
  {
    label: 'Trang chủ',
    key: '/admin/dashboard/home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: 'Đơn hàng',
    key: '/admin/dashboard/orders',
    icon: renderIcon(ShoppingBagIcon),
  },
  {
    label: 'Người dùng',
    key: '/admin/dashboard/users',
    icon: renderIcon(UsersIcon),
  },
  {
    label: 'Chính sách',
    key: '/admin/dashboard/policy/list',
    icon: renderIcon(DocumentTextIcon),
  },
  {
    label: 'Sản phẩm',
    key: 'products',
    icon: renderIcon(ShoppingCartIcon),
    children: [
      {
        label: 'Danh sách sản phẩm',
        key: '/admin/dashboard/products',
      },
      {
        label: 'Thêm sản phẩm',
        key: '/admin/dashboard/product/new',
      },
    ],
  },
  {
    label: 'Bài viết',
    key: 'blog',
    icon: renderIcon(NewspaperIcon),
    children: [
      {
        label: 'Danh sách bài viết',
        key: '/admin/blog/list',
      },
      {
        label: 'Thêm bài viết',
        key: '/admin/blog/add',
      },
    ],
  },
  {
    label: 'Danh mục',
    key: 'categories',
    icon: renderIcon(FolderIcon),
    children: [
      {
        label: 'Danh sách danh mục',
        key: '/admin/dashboard/category/list',
      },
      {
        label: 'Thêm danh mục',
        key: '/admin/dashboard/category/add',
      },
      {
        label: 'Thêm danh mục con',
        key: '/admin/dashboard/category/add-sub-category',
      },
      {
        label: 'Danh mục con',
        key: '/admin/dashboard/category/sub-category',
      },
    ],
  },
]

function logout() {
  authStore.logout()
  router.push('/admin/login')
}
</script>
