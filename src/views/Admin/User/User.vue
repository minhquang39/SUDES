<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-blue-800">Quản lý người dùng</h1>
      <n-button type="primary" @click="openAddUserModal">
        <template #icon>
          <n-icon><AddOutline /></n-icon>
        </template>
        Thêm người dùng
      </n-button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <n-select
        v-model:value="selectedRole"
        filterable
        clearable
        placeholder="Lọc theo vai trò"
        :options="roleOptions"
      />

      <n-input-group>
        <n-input v-model:value="searchText" placeholder="Tìm kiếm người dùng..." clearable />
        <n-button type="primary">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </template>
        </n-button>
      </n-input-group>
    </div>

    <n-data-table
      :columns="columns"
      :data="filteredData"
      :pagination="pagination"
      :row-key="rowKey"
      :loading="loading"
      class="mt-4"
      :scroll-x="1200"
    />

    <n-modal
      v-model:show="showUserModal"
      preset="dialog"
      :title="isEditMode ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'"
    >
      <template #default>
        <n-form ref="formRef" :model="formValue">
          <n-form-item label="Email" path="email">
            <n-input
              v-model:value="formValue.email"
              placeholder="Nhập email"
              :disabled="isEditMode"
            />
          </n-form-item>
          <n-form-item label="Mật khẩu" path="password">
            <n-input
              v-model:value="formValue.password"
              type="password"
              placeholder="Nhập mật khẩu"
              show-password-on="click"
              :disabled="isEditMode"
            />
          </n-form-item>

          <n-form-item label="Vai trò" path="role">
            <n-select v-model:value="formValue.role" :options="roleOptions" />
          </n-form-item>
        </n-form>
      </template>
      <template #action>
        <div class="flex justify-end gap-2">
          <n-button @click="showUserModal = false">Hủy</n-button>
          <n-button type="primary" :loading="submitting" @click="handleSubmitUser">
            {{ isEditMode ? 'Cập nhật' : 'Thêm' }}
          </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, h, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import {
  NButton,
  NDataTable,
  NIcon,
  NPopconfirm,
  NSelect,
  NInput,
  NInputGroup,
  NModal,
  NForm,
  NFormItem,
} from 'naive-ui'
import {
  TrashOutline,
  AddOutline,
  EyeOutline,
  PencilOutline,
  PersonOutline,
} from '@vicons/ionicons5'
import apiClient from '@/utils/axios'

function createColumns({ handleEditUser, handleDeleteUser }) {
  return [
    {
      title: 'USER',
      key: 'name',
      align: '',
      width: 250,
      fixed: 'left',
      render(row) {
        const avatar = row.avatar

        return h('div', { class: 'flex items-center gap-2' }, [
          avatar
            ? h('div', {
                class:
                  'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-cover bg-center',
                style: `background-image: url(${avatar})`,
              })
            : h(
                'div',
                {
                  class: 'w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center',
                },
                [h(PersonOutline)],
              ),
          h('div', { class: 'flex flex-col' }, [
            h('span', { class: 'font-semibold' }, row.first_name + ' ' + row.last_name),
            h('span', { class: 'text-xs text-gray-500' }, row.email),
          ]),
        ])
      },
    },
    {
      title: 'Role',
      key: 'role',
      align: 'center',
      width: 150,
      render(row) {
        return h('span', {}, row.role === 'admin' ? 'Admin' : 'User')
      },
    },
    {
      title: 'USER PHONE',
      key: 'phone',
      align: 'center',
      width: 150,
      render(row) {
        return h('span', {}, row.phone ? `${row.phone}` : '********')
      },
    },
    {
      title: 'CREATED',
      key: 'createdAt',
      align: 'center',
      width: 150,
      render(row) {
        const date = new Date(row.createdAt)
        const formattedDate = date.toISOString().split('T')[0]
        return h('div', { class: 'flex items-center justify-center gap-2' }, [
          h('span', { class: 'text-gray-700' }, formattedDate),
        ])
      },
    },
    {
      title: 'ACTION',
      key: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      render(row) {
        return h('div', { class: 'flex justify-center gap-2' }, [
          h(
            NButton,
            {
              quaternary: true,
              circle: true,
              type: 'warning',
              onClick: () => handleEditUser(row),
            },
            { icon: () => h(PencilOutline) },
          ),
          h(
            NPopconfirm,
            {
              onPositiveClick: () => handleDeleteUser(row),
            },
            {
              default: () => 'Bạn có chắc muốn xóa người dùng này?',
              trigger: () =>
                h(
                  NButton,
                  {
                    quaternary: true,
                    circle: true,
                    type: 'error',
                  },
                  { icon: () => h(TrashOutline) },
                ),
            },
          ),
        ])
      },
    },
  ]
}

export default defineComponent({
  components: {
    NButton,
    NDataTable,
    NIcon,
    NPopconfirm,
    NSelect,
    NInput,
    NInputGroup,
    NModal,
    NForm,
    NFormItem,
  },
  setup() {
    const router = useRouter()
    const message = useMessage()
    const loading = ref(true)
    const submitting = ref(false)
    const formRef = ref(null)
    const currentUserId = ref(null)
    const isEditMode = ref(false)

    const searchText = ref('')
    const selectedRole = ref(null)
    const originalData = ref([])

    // Role options
    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ]

    const showUserModal = ref(false)
    const formValue = ref({
      email: '',
      password: '',
      role: 'user',
    })

    const filteredData = computed(() => {
      let result = [...originalData.value]

      if (selectedRole.value) {
        result = result.filter((item) => item.role === selectedRole.value)
      }

      if (searchText.value.trim()) {
        const searchLower = searchText.value.toLowerCase().trim()
        result = result.filter(
          (item) =>
            (item.name && item.name.toLowerCase().includes(searchLower)) ||
            (item.email && item.email.toLowerCase().includes(searchLower)) ||
            (item.phone && item.phone.includes(searchLower)),
        )
      }

      return result
    })

    async function fetchUsers() {
      try {
        loading.value = true
        const response = await apiClient.get('/admin/user')
        console.log(response.data.data)
        originalData.value = response.data.data
      } catch (error) {
        console.error('Error fetching users:', error)
        message.error(
          'Không thể tải danh sách người dùng: ' + (error.response?.data?.message || error.message),
        )
      } finally {
        loading.value = false
      }
    }

    onMounted(async () => {
      try {
        await fetchUsers()
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    })

    function openAddUserModal() {
      resetForm()
      isEditMode.value = false
      showUserModal.value = true
    }

    function handleEditUser(row) {
      isEditMode.value = true
      currentUserId.value = row._id
      formValue.value = {
        email: row.email,
        password: '********',
        role: row.role,
      }
      showUserModal.value = true
    }

    async function handleDeleteUser(row) {
      try {
        loading.value = true
        await apiClient.delete(`/admin/user/${row._id}`)
        originalData.value = originalData.value.filter((item) => item._id !== row._id)
        message.success('Xóa người dùng thành công')
      } catch (error) {
        console.error('Error deleting user:', error)
        message.error(
          'Xóa người dùng thất bại: ' + (error.response?.data?.message || error.message),
        )
      } finally {
        loading.value = false
      }
    }

    async function handleSubmitUser() {
      if (!formRef.value) return

      try {
        submitting.value = true

        if (isEditMode.value) {
          await apiClient.put(`/admin/user/${currentUserId.value}`, { role: formValue.value.role })
          message.success('Cập nhật người dùng thành công')
        } else {
          await apiClient.post('/admin/user', formValue.value)
          message.success('Thêm người dùng thành công')
        }

        showUserModal.value = false
        resetForm()

        await fetchUsers()
      } catch (error) {
        console.error('Error with user operation:', error)
        message.error(
          (isEditMode.value ? 'Cập nhật' : 'Thêm') +
            ' người dùng thất bại: ' +
            (error.response?.data?.message || error.message),
        )
      } finally {
        submitting.value = false
      }
    }

    function resetForm() {
      formValue.value = {
        email: '',
        password: '',
        role: 'user',
      }
      currentUserId.value = null
    }

    return {
      columns: createColumns({ handleEditUser, handleDeleteUser }),
      pagination: {
        pageSize: 10,
      },
      rowKey: (row) => row._id,
      handleEditUser,
      loading,
      searchText,
      selectedRole,
      roleOptions,
      filteredData,
      showUserModal,
      formValue,
      formRef,
      submitting,
      handleSubmitUser,
      isEditMode,
      openAddUserModal,
    }
  },
})
</script>
