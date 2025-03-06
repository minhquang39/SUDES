<template>
  <div class="grid grid-cols-12 lg:px-11 xl:px-30">
    <div class="lg:col-span-3">
      <div class="p-1 bg-[#052b21] w-[95%]">
        <div class="flex items-center border border-white p-1 relative category_navbar">
          <svg
            class="icon-left mx-[12px]"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89464 0.734784 8 1 8H7C7.26522 8 7.51957 7.89464 7.70711 7.70711C7.89464 7.51957 8 7.26522 8 7V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0V0ZM6 6H2V2H6V6ZM17 0H11C10.7348 0 10.4804 0.105357 10.2929 0.292893C10.1054 0.48043 10 0.734784 10 1V7C10 7.26522 10.1054 7.51957 10.2929 7.70711C10.4804 7.89464 10.7348 8 11 8H17C17.2652 8 17.5196 7.89464 17.7071 7.70711C17.8946 7.51957 18 7.26522 18 7V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0V0ZM16 6H12V2H16V6ZM7 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.2652 0.105357 17.5196 0.292893 17.7071C0.48043 17.8946 0.734784 18 1 18H7C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.26522 8 17V11C8 10.7348 7.89464 10.4804 7.70711 10.2929C7.51957 10.1054 7.26522 10 7 10ZM6 16H2V12H6V16ZM14 10C11.794 10 10 11.794 10 14C10 16.206 11.794 18 14 18C16.206 18 18 16.206 18 14C18 11.794 16.206 10 14 10ZM14 16C12.897 16 12 15.103 12 14C12 12.897 12.897 12 14 12C15.103 12 16 12.897 16 14C16 15.103 15.103 16 14 16Z"
              fill="white"
            ></path>
          </svg>
          <span class="text-white text-[15px] uppercase font-[700]">Danh mục sản phẩm</span>
          <ChevronDownIcon class="size-4 ml-2 inline text-white" />
          <!--  -->
          <div class="absolute w-full left-0 z-50 top-full category_menu">
            <ul class="bg-white border border-black h-[330px] relative">
              <li
                v-for="(item, index) in fakeCategories"
                :key="index"
                class="group flex items-center justify-between p-1 border border-[#eee] cursor-pointer"
              >
                <div class="flex">
                  <img :src="item.image" alt="" class="mx-2" />
                  <span class="group-hover:font-medium text-[#333] group-hover:text-[#fdc97d]">{{
                    item.category_name
                  }}</span>
                </div>
                <ChevronRightIcon v-if="item.children" class="size-5" />

                <!-- Nội dung hiện ra khi hover -->
                <div
                  v-if="item.children"
                  class="absolute hidden group-hover:block left-full top-0 md:w-[calc(100vw-360px)] xl:w-[calc(100vw-540px)] h-[330px] bg-white border border-black z-[999] transition-all duration-300 ease-in-out p-3 z"
                >
                  <div class="grid grid-cols-12">
                    <div
                      v-for="(subCategory, index) in item.children"
                      :key="index"
                      class="col-span-4"
                    >
                      <div
                        class="font-medium text-lg text-[#666] hover:text-[#fdc97d] mb-2 flex items-center"
                      >
                        <TwoSquare class="block mr-3" size="7" />
                        {{ subCategory.category_name }}
                      </div>
                      <ul v-if="subCategory.children">
                        <li v-for="(miniCategory, index) in subCategory.children" :key="index">
                          <p class="text-[#444] hover:text-[#fdc97d] mb-1">
                            {{ miniCategory.category_name }}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--  -->

        <!--  -->
      </div>
    </div>
    <div class="lg:col-span-9">
      <ul class="flex">
        <li
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white"
        >
          Trang chủ
        </li>
        <li
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white"
        >
          Giới thiệu
        </li>
        <li
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white group"
        >
          <span>Sản phẩm</span>

          <ChevronDownIcon class="size-4 ml-2 inline" />
          <ul
            class="invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto translate-y-10 group-hover:translate-y-0 transition-all duration-300 absolute bg-white text-[#666] font-normal w-max top-[calc(100%+6px)] right-[calc(-70%)] border border-black z-50"
          >
            <li
              v-for="(mainProduct, index) in fakeCategories"
              :key="index"
              class="p-2 font-medium border border-[#eee] flex justify-between relative list-product"
            >
              <span>{{ mainProduct.category_name }}</span>

              <ChevronRightIcon v-if="mainProduct.children" class="ml-8 size-5" />
              <!--  -->
              <ul
                v-if="mainProduct.children"
                class="absolute top-0 left-[calc(100%+1px)] w-[260px] bg-white border border-black hidden list-sub-product"
              >
                <li
                  v-for="(subProduct, index) in mainProduct.children"
                  :key="index"
                  class="p-2 font-medium border border-[#eee] flex justify-between relative"
                >
                  <span>{{ subProduct.category_name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white"
        >
          Tin tức
        </li>
        <li
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white group"
        >
          <span>Chính sách</span>
          <ChevronDownIcon class="size-4 ml-2 inline" />
          <ul
            class="invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto translate-y-10 group-hover:translate-y-0 transition-all duration-300 absolute bg-white font-normal text-[#666] w-max top-[calc(100%+6px)] right-[calc(-70%)] border border-black z-50"
          >
            <li class="p-2 font-medium hover:text-[#fdc97d] pr-12 border border-[#eee]">
              Chính sách mua hàng
            </li>
            <li class="p-2 font-medium hover:text-[#fdc97d] pr-12 border border-[#eee]">
              Chính sách thanh toán
            </li>
            <li class="p-2 font-medium hover:text-[#fdc97d] pr-12 border border-[#eee]">
              Chính sách vận chuyển
            </li>
            <li class="p-2 font-medium hover:text-[#fdc97d] pr-12 border border-[#eee]">
              Chính sách cửa hàng
            </li>
            <li class="p-2 font-medium hover:text-[#fdc97d] pr-12 border border-[#eee]">
              Chính sách bảo mật
            </li>
            <li class="p-2 font-medium hover:text-[#fdc97d] pr-12 border border-[#eee]">
              Chính sách thành viên
            </li>
          </ul>
        </li>
        <li
          class="relative cursor-pointer nav-item text-[16px] py-[10px] px-[20px] font-semibold text-white"
        >
          Liên hệ
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import TwoSquare from '../Icon/TwoSquare.vue'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
export default {
  components: { TwoSquare, ChevronRightIcon, ChevronDownIcon },
  setup() {
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

    return { fakeCategories }
  },
}
</script>

<style scoped>
.nav-item::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 10px;
  top: 40px;
}
.nav-item::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  background: #d0a73c;
  transition:
    width 0.3s ease 0s,
    left 0.3s ease 0s;
  width: 0;
}
.nav-item:hover::after {
  width: 30%;
}

/* .category_navbar:hover .category_menu {
  display: block;
} */
.category_navbar:hover .category_menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.category_menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.list-product:hover,
.list-sub-product li:hover {
  color: #d0a73c;
}

.list-product:hover .list-sub-product {
  display: block;
  color: black;
}
</style>
