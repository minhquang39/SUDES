<template>
  <!-- Menu -->
  <div class="absolute w-[75vw] h-full top-0 left-0 bg-white flex flex-col shadow-lg z-[999]">
    <!-- top  -->
    <div class="flex w-full bg-[#004e3e] p-3 px-12 justify-between">
      <span
        v-for="(tab, index) in tabs"
        :key="index"
        @click="setActiveTab(index)"
        class="font-bold text-[16px] navbar-mobile-tab relative cursor-pointer"
        :class="{
          'text-[#fdc97d] active': activeTab === index,
          'text-white': activeTab !== index,
        }"
        >{{ tab.name }}</span
      >
    </div>
    <!-- Content with single scroll -->
    <div class="overflow-y-auto flex-1 p-4">
      <!-- Danh mục tab -->
      <div v-if="activeTab === 0">
        <div v-for="category in fakeCategories" :key="category._id" class="py-2">
          <p
            @click="toggleCategoryMenu(category._id)"
            class="cursor-pointer flex items-center justify-between"
          >
            <span class="flex items-center">
              <img v-if="category.image" :src="category.image" alt="" class="w-6 h-6 mr-2" />
              {{ category.category_name }}
            </span>
            <svg
              v-if="category.children"
              :class="{ 'rotate-90': isCategoryMenuOpen(category._id) }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 transition-transform duration-300 ml-2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </p>
          <div v-if="isCategoryMenuOpen(category._id)" class="pl-4 mt-2 border-l-2 border-l-[#ccc]">
            <div v-for="subCategory in category.children" :key="subCategory._id" class="py-1">
              <p
                @click="toggleSubCategoryMenu(subCategory._id)"
                class="cursor-pointer flex items-center justify-between"
              >
                {{ subCategory.category_name }}
                <svg
                  v-if="subCategory.children"
                  :class="{ 'rotate-90': isSubCategoryMenuOpen(subCategory._id) }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 transition-transform duration-300 ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </p>
              <div
                v-if="isSubCategoryMenuOpen(subCategory._id)"
                class="pl-4 mt-1 border-l-2 border-l-[#eee]"
              >
                <p
                  v-for="miniCategory in subCategory.children"
                  :key="miniCategory._id"
                  class="py-1"
                >
                  {{ miniCategory.category_name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu tab -->
      <div v-if="activeTab === 1">
        <p class="py-2">Trang chủ</p>
        <p class="py-2">Giới thiệu</p>
        <div class="py-2">
          <p @click="toggleProductMenu" class="cursor-pointer flex items-center justify-between">
            <span class="flex items-center"> Sản phẩm </span>
            <svg
              :class="{ 'rotate-90': isProductMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 transition-transform duration-300 ml-2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </p>
          <div v-if="isProductMenuOpen" class="pl-4 mt-2 border-l-2 border-l-[#fff]">
            <div v-for="category in fakeCategories" :key="category._id" class="cursor-pointer py-1">
              <p @click="toggleSubMenu(category._id)" class="flex items-center justify-between">
                {{ category.category_name }}
                <svg
                  v-if="category.children"
                  :class="{ 'rotate-90': isSubMenuOpen(category._id) }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 transition-transform duration-300 ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </p>
              <div v-if="isSubMenuOpen(category._id)" class="pl-4 mt-1 border-l-2 border-l-[#ccc]">
                <p v-for="subCategory in category.children" :key="subCategory._id" class="py-1">
                  {{ subCategory.category_name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p class="py-2">Tin tức</p>
        <div class="py-2">
          <p @click="togglePolicyMenu" class="cursor-pointer flex items-center justify-between">
            <span class="flex items-center"> Chính sách </span>
            <svg
              :class="{ 'rotate-90': isPolicyMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 transition-transform duration-300 ml-2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </p>
          <div v-if="isPolicyMenuOpen" class="pl-4 mt-2 border-l-2 border-l-[#ccc]">
            <p class="py-1">Chính sách mua hàng</p>
            <p class="py-1">Chính sách thanh toán</p>
            <p class="py-1">Chính sách vận chuyển</p>
            <p class="py-1">Chính sách cửa hàng</p>
            <p class="py-1">Chính sách bảo mật</p>
            <p class="py-1">Chính sách thành viên</p>
          </div>
        </div>
        <p class="py-2">Liên hệ</p>
      </div>
    </div>
    <!-- Close button -->
    <div
      class="h-7 w-7 absolute top-0 right-[calc(0%-25px)] border border-[#fff] bg-[#004e3e] flex items-center justify-center cursor-pointer"
      @click="closeMenu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        class="size-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  emits: ['close-menu'],
  setup(props, { emit }) {
    const activeTab = ref(0)
    const isPolicyMenuOpen = ref(false)
    const isProductMenuOpen = ref(false)
    const openSubMenus = ref([])
    const openCategoryMenus = ref([])
    const openSubCategoryMenus = ref([])
    const tabs = ref([
      {
        id: 'categories',
        name: 'Danh mục',
      },
      {
        id: 'menu',
        name: 'Menu',
      },
    ])

    const fakeCategories = ref([
      // Danh mục cha: Tổ yến
      {
        _id: '1',
        category_name: 'Tổ yến',
        category_slug: 'to-yen',
        parentId: null,
        createdAt: new Date('2025-03-01'),
        updateAt: new Date('2025-03-01'),
        image: '/images/header/navbar/1.webp',
        children: [
          // Tổ yến thô
          {
            _id: '2',
            category_name: 'Tổ yến thô',
            category_slug: 'to-yen-tho',
            parentId: '1',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '3',
                category_name: 'Tổ yến thô loại 1',
                category_slug: 'to-yen-tho-loai-1',
                parentId: '2',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '4',
                category_name: 'Tổ yến thô loại 2',
                category_slug: 'to-yen-tho-loai-2',
                parentId: '2',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '5',
                category_name: 'Tổ yến thô loại 3',
                category_slug: 'to-yen-tho-loai-3',
                parentId: '2',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
          // Tổ yến làm sạch
          {
            _id: '6',
            category_name: 'Tổ yến làm sạch',
            category_slug: 'to-yen-lam-sach',
            parentId: '1',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '7',
                category_name: 'Tổ yến làm sạch thường',
                category_slug: 'to-yen-lam-sach-thuong',
                parentId: '6',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '8',
                category_name: 'Tổ yến làm sạch cao cấp',
                category_slug: 'to-yen-lam-sach-cao-cap',
                parentId: '6',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '9',
                category_name: 'Tổ yến làm sạch đặc biệt',
                category_slug: 'to-yen-lam-sach-dac-biet',
                parentId: '6',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
          // Tổ yến tinh chế
          {
            _id: '10',
            category_name: 'Tổ yến tinh chế',
            category_slug: 'to-yen-tinh-che',
            parentId: '1',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '11',
                category_name: 'Tổ yến tinh chế loại 1',
                category_slug: 'to-yen-tinh-che-loai-1',
                parentId: '10',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '12',
                category_name: 'Tổ yến tinh chế loại 2',
                category_slug: 'to-yen-tinh-che-loai-2',
                parentId: '10',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '13',
                category_name: 'Tổ yến tinh chế cao cấp',
                category_slug: 'to-yen-tinh-che-cao-cap',
                parentId: '10',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
          // Tổ yến cao cấp
          {
            _id: '14',
            category_name: 'Tổ yến cao cấp',
            category_slug: 'to-yen-cao-cap',
            parentId: '1',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '15',
                category_name: 'Tổ yến cao cấp có đường',
                category_slug: 'to-yen-cao-cap-co-duong',
                parentId: '14',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '16',
                category_name: 'Tổ yến cao cấp ít đường',
                category_slug: 'to-yen-cao-cap-it-duong',
                parentId: '14',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '17',
                category_name: 'Tổ yến cao cấp không đường',
                category_slug: 'to-yen-cao-cap-khong-duong',
                parentId: '14',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
          // Tổ yến rút lông
          {
            _id: '18',
            category_name: 'Tổ yến rút lông',
            category_slug: 'to-yen-rut-long',
            parentId: '1',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '19',
                category_name: 'Chân yến rút lông',
                category_slug: 'chan-yen-rut-long',
                parentId: '18',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '20',
                category_name: 'Hồng yến rút lông',
                category_slug: 'hong-yen-rut-long',
                parentId: '18',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '21',
                category_name: 'Yến huyết rút lông',
                category_slug: 'yen-huyet-rut-long',
                parentId: '18',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
          // Yến vụn
          {
            _id: '22',
            category_name: 'Yến vụn',
            category_slug: 'yen-vun',
            parentId: '1',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '23',
                category_name: 'Yến vụn baby',
                category_slug: 'yen-vun-baby',
                parentId: '22',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '24',
                category_name: 'Yến vụn tinh chế',
                category_slug: 'yen-vun-tinh-che',
                parentId: '22',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
        ],
      },

      // Danh mục cha: Yến chưng tươi
      {
        _id: '25',
        category_name: 'Yến chưng tươi',
        category_slug: 'yen-chung-tuoi',
        parentId: null,
        createdAt: new Date('2025-03-01'),
        updateAt: new Date('2025-03-01'),
        image: '/images/header/navbar/2.webp',

        children: [
          {
            _id: '26',
            category_name: 'Yến chưng dinh dưỡng',
            category_slug: 'yen-chung-dinh-duong',
            parentId: '25',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '27',
            category_name: 'Yến hũ chưng sẵn cho bé',
            category_slug: 'yen-hu-chung-san-cho-be',
            parentId: '25',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '28',
            category_name: 'Yến hũ chưng không đường',
            category_slug: 'yen-hu-chung-khong-duong',
            parentId: '25',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '29',
            category_name: 'Yến hũ chưng ít đường',
            category_slug: 'yen-hu-chung-it-duong',
            parentId: '25',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '30',
            category_name: 'Yến chưng hạt sen',
            category_slug: 'yen-chung-hat-sen',
            parentId: '25',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
        ],
      },

      // Danh mục cha: Yến nước
      {
        _id: '31',
        category_name: 'Yến nước',
        category_slug: 'yen-nuoc',
        parentId: null,
        createdAt: new Date('2025-03-01'),
        updateAt: new Date('2025-03-01'),
        image: '/images/header/navbar/3.webp',

        children: [
          {
            _id: '32',
            category_name: 'Yến nước chưng đường phèn',
            category_slug: 'yen-nuoc-chung-duong-phen',
            parentId: '31',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '33',
            category_name: 'Yến nước kỳ tử',
            category_slug: 'yen-nuoc-ky-tu',
            parentId: '31',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '34',
            category_name: 'Yến nước đường ăn kiêng',
            category_slug: 'yen-nuoc-duong-an-kieng',
            parentId: '31',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '35',
            category_name: 'Yến nước nha đam hạt chia',
            category_slug: 'yen-nuoc-nha-dam-hat-chia',
            parentId: '31',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
        ],
      },

      // Danh mục cha: Đông trùng hạ thảo
      {
        _id: '36',
        category_name: 'Đông trùng hạ thảo',
        category_slug: 'dong-trung-ha-thao',
        parentId: null,
        createdAt: new Date('2025-03-01'),
        updateAt: new Date('2025-03-01'),
        image: '/images/header/navbar/4.png',

        children: [
          {
            _id: '37',
            category_name: 'Nấm đông trùng hạ thảo tươi',
            category_slug: 'nam-dong-trung-ha-thao-tuoi',
            parentId: '36',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '38',
            category_name: 'Nấm đông trùng hạ thảo khô',
            category_slug: 'nam-dong-trung-ha-thao-kho',
            parentId: '36',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '39',
            category_name: 'Viên đông trùng hạ thảo',
            category_slug: 'vien-dong-trung-ha-thao',
            parentId: '36',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
        ],
      },

      // Danh mục cha: Sâm Hàn Quốc
      {
        _id: '40',
        category_name: 'Sâm Hàn Quốc',
        category_slug: 'sam-han-quoc',
        parentId: null,
        createdAt: new Date('2025-03-01'),
        updateAt: new Date('2025-03-01'),
        image: '/images/header/navbar/5.png',

        children: [
          // Hồng sâm
          {
            _id: '41',
            category_name: 'Hồng sâm',
            category_slug: 'hong-sam',
            parentId: '40',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '42',
                category_name: 'Kẹo hồng sâm',
                category_slug: 'keo-hong-sam',
                parentId: '41',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '43',
                category_name: 'Trà hồng sâm',
                category_slug: 'tra-hong-sam',
                parentId: '41',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '44',
                category_name: 'Cao hồng sâm',
                category_slug: 'cao-hong-sam',
                parentId: '41',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
          // Thiên sâm
          {
            _id: '45',
            category_name: 'Thiên sâm',
            category_slug: 'thien-sam',
            parentId: '40',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '46',
                category_name: 'Thiên sâm premium',
                category_slug: 'thien-sam-premium',
                parentId: '45',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '47',
                category_name: 'Thiên sâm đông trùng',
                category_slug: 'thien-sam-dong-trung',
                parentId: '45',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
          // Hắc sâm
          {
            _id: '48',
            category_name: 'Hắc sâm',
            category_slug: 'hack-sam',
            parentId: '40',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '49',
                category_name: 'Kẹo hắc sâm',
                category_slug: 'keo-hack-sam',
                parentId: '48',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '50',
                category_name: 'Nước hắc sâm',
                category_slug: 'nuoc-hack-sam',
                parentId: '48',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '51',
                category_name: 'Cao hắc sâm',
                category_slug: 'cao-hack-sam',
                parentId: '48',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
          // Sâm tươi
          {
            _id: '52',
            category_name: 'Sâm tươi',
            category_slug: 'sam-tuoi',
            parentId: '40',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
            children: [
              {
                _id: '53',
                category_name: 'Sâm củ tươi',
                category_slug: 'sam-cu-tuoi',
                parentId: '52',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
              {
                _id: '54',
                category_name: 'Bình sâm tươi ngâm sẵn',
                category_slug: 'binh-sam-tuoi-ngam-san',
                parentId: '52',
                createdAt: new Date('2025-03-01'),
                updateAt: new Date('2025-03-01'),
              },
            ],
          },
        ],
      },

      // Danh mục cha: Saffron
      {
        _id: '55',
        category_name: 'Saffron',
        category_slug: 'saffron',
        parentId: null,
        createdAt: new Date('2025-03-01'),
        updateAt: new Date('2025-03-01'),
        image: '/images/header/navbar/6.webp',

        children: [
          {
            _id: '56',
            category_name: 'Saffron Tây Á',
            category_slug: 'saffron-tay-a',
            parentId: '55',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '57',
            category_name: 'Set quà tặng Saffron',
            category_slug: 'set-qua-tang-saffron',
            parentId: '55',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '58',
            category_name: 'Mật ong Saffron',
            category_slug: 'mat-ong-saffron',
            parentId: '55',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '59',
            category_name: 'Mỹ phẩm Saffron',
            category_slug: 'my-pham-saffron',
            parentId: '55',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
        ],
      },

      // Danh mục cha: Soup
      {
        _id: '60',
        category_name: 'Soup',
        category_slug: 'soup',
        parentId: null,
        createdAt: new Date('2025-03-01'),
        updateAt: new Date('2025-03-01'),
        image: '/images/header/navbar/7.webp',

        children: [
          {
            _id: '61',
            category_name: 'Soup Vi cá - bào ngư - tổ yến',
            category_slug: 'soup-vi-ca-bao-ngu-to-yen',
            parentId: '60',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '62',
            category_name: 'Soup Vi cá - bào ngư',
            category_slug: 'soup-vi-ca-bao-ngu',
            parentId: '60',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '63',
            category_name: 'Bát Trân Ngư Xí Ngự Thiện',
            category_slug: 'bat-tran-ngu-xi-ngu-thien',
            parentId: '60',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
          {
            _id: '64',
            category_name: 'Bát Trân Uy Uy Ngự Thiện',
            category_slug: 'bat-tran-uy-uy-ngu-thien',
            parentId: '60',
            createdAt: new Date('2025-03-01'),
            updateAt: new Date('2025-03-01'),
          },
        ],
      },

      // Danh mục cha: Quà biếu cao cấp
      {
        _id: '65',
        category_name: 'Quà biếu cao cấp',
        category_slug: 'qua-bieu-cao-cap',
        parentId: null,
        createdAt: new Date('2025-03-01'),
        updateAt: new Date('2025-03-01'),
        image: '/images/header/navbar/8.png',
      },
    ])

    const setActiveTab = (index) => {
      activeTab.value = index
    }

    const togglePolicyMenu = () => {
      isPolicyMenuOpen.value = !isPolicyMenuOpen.value
    }

    const toggleProductMenu = () => {
      isProductMenuOpen.value = !isProductMenuOpen.value
    }

    const toggleSubMenu = (id) => {
      if (openSubMenus.value.includes(id)) {
        openSubMenus.value = openSubMenus.value.filter((menuId) => menuId !== id)
      } else {
        openSubMenus.value.push(id)
      }
    }

    const isSubMenuOpen = (id) => {
      return openSubMenus.value.includes(id)
    }

    const toggleCategoryMenu = (id) => {
      if (openCategoryMenus.value.includes(id)) {
        openCategoryMenus.value = openCategoryMenus.value.filter((menuId) => menuId !== id)
      } else {
        openCategoryMenus.value.push(id)
      }
    }

    const isCategoryMenuOpen = (id) => {
      return openCategoryMenus.value.includes(id)
    }

    const toggleSubCategoryMenu = (id) => {
      if (openSubCategoryMenus.value.includes(id)) {
        openSubCategoryMenus.value = openSubCategoryMenus.value.filter((menuId) => menuId !== id)
      } else {
        openSubCategoryMenus.value.push(id)
      }
    }

    const isSubCategoryMenuOpen = (id) => {
      return openSubCategoryMenus.value.includes(id)
    }

    const closeMenu = () => {
      // Delay emitting the close event to allow animations to complete
      setTimeout(() => {
        emit('close-menu')
      }, 300) // Match this with your transition duration
    }

    return {
      tabs,
      activeTab,
      setActiveTab,
      isPolicyMenuOpen,
      togglePolicyMenu,
      isProductMenuOpen,
      toggleProductMenu,
      fakeCategories,
      toggleSubMenu,
      isSubMenuOpen,
      toggleCategoryMenu,
      isCategoryMenuOpen,
      toggleSubCategoryMenu,
      isSubCategoryMenuOpen,
      closeMenu,
    }
  },
}
</script>

<style scoped>
.navbar-mobile-tab.active::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 3px;
  top: calc(100% + 5px);
  background-color: #fdc97d;
  transition: width 0.3s;
}

.rotate-90 {
  transform: rotate(0deg);
}
</style>
