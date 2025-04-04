<template>
  <div class="quill-editor">
    <div ref="editorElement"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // Hoặc quill.bubble.css cho giao diện bubble

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Viết nội dung ở đây...',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'snow', // 'snow' hoặc 'bubble'
  },
})

const emit = defineEmits(['update:modelValue', 'change', 'ready'])

const editorElement = ref(null)
let quill = null

onMounted(() => {
  // Cấu hình Quill
  const options = {
    theme: props.theme,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video'],
      ],
    },
    placeholder: props.placeholder,
    readOnly: props.readOnly,
  }

  // Khởi tạo Quill
  quill = new Quill(editorElement.value, options)

  // Thiết lập nội dung ban đầu
  if (props.modelValue) {
    quill.root.innerHTML = props.modelValue
  }

  // Sự kiện khi nội dung thay đổi
  quill.on('text-change', () => {
    const html = quill.root.innerHTML
    if (html === '<p><br></p>') {
      emit('update:modelValue', '')
    } else {
      emit('update:modelValue', html)
    }
    emit('change', html)
  })

  // Phát ra sự kiện khi Quill đã sẵn sàng
  emit('ready', quill)
})

// Cập nhật nội dung khi prop thay đổi
watch(
  () => props.modelValue,
  (newVal) => {
    if (quill && newVal !== quill.root.innerHTML) {
      quill.root.innerHTML = newVal
    }
  },
)

// Watch for readOnly changes
watch(
  () => props.readOnly,
  (newVal) => {
    if (quill) {
      quill.enable(!newVal)
    }
  },
)

// Dọn dẹp khi component unmount
onBeforeUnmount(() => {
  if (quill) {
    quill = null
  }
})

// Expose Quill instance
defineExpose({
  getQuill: () => quill,
  getHTML: () => quill?.root.innerHTML || '',
  getText: () => quill?.getText() || '',
  setHTML: (html) => {
    if (quill) quill.root.innerHTML = html
  },
})
</script>

<style>
.quill-editor {
  border-radius: 0.375rem; /* rounded-md */
}
.ql-toolbar.ql-snow {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  border-color: #e5e7eb; /* border-gray-300 */
}
.ql-container.ql-snow {
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  border-color: #e5e7eb; /* border-gray-300 */
  min-height: 200px;
}
</style>
