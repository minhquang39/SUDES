<template>
  <div class="min-h-screen flex">
    <!-- Admin Sidebar -->
    <div
      class="w-64 bg-mainColor text-white min-h-screen shadow-lg"
      :class="{ hidden: !isSidebarOpen, block: isSidebarOpen }"
    >
      <!-- Logo và tiêu đề -->
      <div class="p-4 border-b border-opacity-20 border-white">
        <div class="flex items-center justify-center">
          <img
            loading="lazy"
            src="https://bizweb.dktcdn.net/100/506/650/themes/944598/assets/logo.png?1739018973665"
            alt="Logo"
            class="h-12"
          />
        </div>
      </div>

      <!-- Menu Items -->
      <div class="py-4">
        <!-- Các menu đơn -->
        <template v-for="(item, index) in singleMenuItems" :key="`single-${index}`">
          <router-link
            :to="item.path"
            class="flex items-center px-4 py-3 hover:bg-opacity-20 hover:bg-hover transition-colors"
            :class="{ 'bg-opacity-20 ': isActive(item.path) }"
          >
            <div v-html="item.icon" class="h-5 w-5 mr-3"></div>
            <span>{{ item.name }}</span>
          </router-link>
        </template>

        <!-- Các menu dropdown -->
        <template v-for="(menu, menuIndex) in dropdownMenus" :key="`dropdown-${menuIndex}`">
          <div class="relative">
            <div
              @click="toggleMenu(menu.id)"
              class="flex items-center justify-between px-4 py-3 hover:bg-opacity-20 hover:bg-hover transition-colors cursor-pointer"
              :class="{
                'bg-opacity-20 ': activeDropdown === menu.id || isInSection(menu.id),
              }"
            >
              <div class="flex items-center">
                <div v-html="menu.icon" class="h-5 w-5 mr-3"></div>
                <span>{{ menu.name }}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-transform duration-200 text-subColor"
                :class="{ 'rotate-180': activeDropdown === menu.id }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <!-- Dropdown submenu -->
            <div
              v-show="activeDropdown === menu.id"
              class="pl-0 bg-opacity-10 overflow-hidden transition-all duration-200"
              :class="{
                'max-h-0': activeDropdown !== menu.id,
                ['max-h-' + menu.maxHeight]: activeDropdown === menu.id,
              }"
            >
              <router-link
                v-for="(subItem, subIndex) in menu.items"
                :key="`sub-${menuIndex}-${subIndex}`"
                :to="subItem.path"
                class="flex items-center px-4 py-2 hover:bg-opacity-20 hover:bg-hover transition-colors"
                :class="{ 'bg-opacity-20 ': isActive(subItem.path) }"
              >
                <span>{{ subItem.name }}</span>
              </router-link>
            </div>
          </div>
        </template>
      </div>

      <!-- Phần dưới sidebar -->
      <div class="border-t border-white border-opacity-20 p-4 mt-auto">
        <button
          @click="logout"
          class="flex items-center text-white hover:text-subColor transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 bg-primaryBg">
      <!-- Navbar -->
      <div class="h-16 flex items-center px-6 shadow-sm">
        <button class="lg:hidden mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 class="text-xl font-semibold text-textColor">Dashboard</h1>
      </div>

      <!-- Page content -->
      <div class="p-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// State for sidebar
const isSidebarOpen = ref(true)
const activeDropdown = ref(null) // Thay thế openMenus bằng activeDropdown

// Menu Items Data
const singleMenuItems = [
  {
    name: 'Trang chủ',
    path: '/admin/dashboard',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>`,
  },

  {
    name: 'Đơn hàng',
    path: '/admin/orders',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>`,
  },
  {
    name: 'Người dùng',
    path: '/admin/users',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>`,
  },
  {
    id: 'policies',
    name: 'Chính sách',
    maxHeight: '60',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>`,
    path: '/admin/dashboard/policy/list',
  },
]

const dropdownMenus = [
  {
    id: 'products',
    name: 'Sản phẩm',
    maxHeight: '40',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>`,
    items: [
      { name: 'Danh sách sản phẩm', path: '/admin/products' },
      { name: 'Thêm sản phẩm', path: '/admin/dashboard/product/new' },
      { name: 'Sửa sản phẩm', path: '/admin/products/edit' },
    ],
  },
  {
    id: 'blog',
    name: 'Bài viết',
    maxHeight: '40',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8z" />
          </svg>`,
    items: [
      { name: 'Danh sách bài viết', path: '/admin/blog/list' },
      { name: 'Thêm bài viết', path: '/admin/blog/add' },
    ],
  },
  {
    name: 'Danh mục',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>`,
    items: [
      { name: 'Danh sách danh mục', path: '/admin/dashboard/category/list' },
      { name: 'Thêm danh mục', path: '/admin/dashboard/category/add' },
      { name: 'Thêm danh mục con', path: '/admin/dashboard/category/add-sub-category' },
      { name: 'Danh mục con', path: '/admin/dashboard/category/sub-category' },
    ],
  },
]

// Kiểm tra xem route hiện tại có thuộc về section nào không và tự động mở dropdown tương ứng
onMounted(() => {
  initActiveDropdown()
})

const initActiveDropdown = () => {
  for (const menu of dropdownMenus) {
    if (isInSection(menu.id)) {
      activeDropdown.value = menu.id
      return
    }
  }
  activeDropdown.value = null // Không có dropdown nào được mở mặc định
}

// Check if current path starts with a specific route
const isActive = (path) => {
  return route.path.startsWith(path)
}

// Section checkers
const isInSection = (section) => {
  const sectionMappings = {
    products: '/admin/products',
    policies: '/admin/policies',
    blog: '/admin/blog',
  }

  return route.path.includes(sectionMappings[section])
}

// Toggle dropdown menu - chỉ mở một menu tại một thời điểm
const toggleMenu = (menuId) => {
  if (activeDropdown.value === menuId) {
    // Nếu menu đã mở, đóng nó
    activeDropdown.value = null
  } else {
    // Nếu menu chưa mở, đóng menu hiện tại (nếu có) và mở menu mới
    activeDropdown.value = menuId
  }
}

// Logout function
const logout = () => {
  // Implement your logout logic here
  // Example:
  // auth.logout()
  // router.push('/login')
}
</script>

<style scoped>
/* Optional: Add transitions for smoother experience */
.max-h-0 {
  max-height: 0;
}

.max-h-40 {
  max-height: 10rem;
}

.max-h-60 {
  max-height: 15rem;
}

/* Utility classes for custom colors */
.bg-mainColor {
  background-color: var(--color-mainColor);
}

.bg-subColor {
  background-color: var(--color-subColor);
}

.text-subColor {
  color: var(--color-subColor);
}

.text-textColor {
  color: var(--color-textColor);
}

.bg-primaryBg {
  background-color: var(--color-primaryBg);
}

.hover\:text-subColor:hover {
  color: var(--color-subColor);
}
</style>
