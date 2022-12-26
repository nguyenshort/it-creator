<template>
  <div>
    <a-form
      id="project1-form"
      ref="formRef"
      :model="form"
      layout="vertical"
      name="basic"
      autocomplete="off"
      :rules="rules"
    >
      <a-form-item name="name" class="chapter-name" label="Name" has-feedback>
        <a-input v-model:value="form.name" placeholder="Enter project name" />
      </a-form-item>

      <div class="flex">
        <div class="w-[450px] flex-shrink-0">
          <a-form-item label="Logo" name="logo">
            <div class="w-[60px]">
              <a-spin :spinning="loadingLogo">
                <div
                  class="relative h-[60px] w-[60px] cursor-pointer overflow-hidden rounded-full bg-primary-50"
                  @click="openUploadAvatar()"
                >
                  <img
                    v-if="form.logo"
                    alt=""
                    :src="$cdn(form.logo)"
                    class="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    class="absolute flex h-full w-full items-center justify-center bg-primary-600 text-[20px] text-white opacity-0 transition hover:opacity-100"
                  >
                    <Icon name="ic:baseline-cloud-upload" />
                  </div>
                </div>
              </a-spin>
            </div>

            <template #extra>
              <p class="mb-0 mt-2 text-[11px] text-gray-400 opacity-75">
                - You picture will be resized when uploading to server.
              </p>
            </template>
          </a-form-item>

          <a-form-item
            label="Cover"
            name="cover"
            class="aspect-w-12 aspect-h-7 relative"
          >
            <a-spin :spinning="false">
              <div
                class="aspect-w-12 aspect-h-7 relative w-full cursor-pointer overflow-hidden rounded-md bg-primary-50"
                @click="cropRef.open?.()"
              >
                <img
                  v-if="form.cover"
                  alt=""
                  :src="$cdn(form.cover)"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  class="absolute flex h-full w-full items-center justify-center bg-primary-600 text-[40px] text-white opacity-0 transition hover:opacity-100"
                >
                  <Icon name="ic:baseline-cloud-upload" />
                </div>
              </div>
            </a-spin>
          </a-form-item>

          <a-form-item label="Category" name="category">
            <a-select
              v-model:value="form.category"
              placeholder="Phân loại dự án"
              :options="categoriesOption"
            ></a-select>
          </a-form-item>

          <a-form-item name="technologies" label="Programing lang, framework">
            <!-- Dùng loop -->
            <a-select
              v-model:value="form.technologies"
              show-search
              mode="tags"
              placeholder="Nhấn để thêm mới"
              :not-found-content="null"
              :options="technologiesOption"
              @search="techFilter.filter.name = $event"
            >
            </a-select>
          </a-form-item>

          <a-form-item name="estimate" label="Estimate">
            <a-range-picker class="w-full" @change="changeEstimate" />
          </a-form-item>
        </div>

        <div class="ml-16 w-full">

          <a-form-item label="Project Type" name="files">
            <a-radio-group>
              <a-radio :value="1">Personal</a-radio>
              <a-radio :value="2">Enterprise</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="Documents" name="files">
            <includes-upload-files v-model:value="form.files" />

            <template #extra>
              <small>
                - Click button to pick your pictures.
                <br />
                - You can arrange your documents by dragging later.
              </small>
            </template>
          </a-form-item>
        </div>
      </div>

      <a-form-item label="Detail" name="content">
        <includes-editor ref="editorRef" :value="form.content" />
      </a-form-item>
    </a-form>
    <modals-cropper
      ref="cropRef"
      :options="{
        autoCropArea: 1,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        dragMode: 'move',
        viewMode: 1,
        cropBoxMovable: false,
        aspectRatio: 12 / 7
      }"
      endpoint="project"
      @success="form.cover = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'ant-design-vue'
import { reactive, ref, useCategories, useUploadFiles } from '#imports'
import { CreateProjectInput } from '~/apollo/server/__generated__/serverTypes'
import { useTechnologies } from '~/composables/useTechnologies'
import { Dayjs } from 'dayjs'

const form = reactive<CreateProjectInput>({
  category: '',
  logo: '',
  content: '',
  cover: '',
  estimate: [],
  name: '',
  technologies: [],
  files: []
})

const rules = ref({
  category: [
    {
      required: true,
      message: 'Vui lòng nhập tên phân loại'
    }
  ],
  content: [
    {
      required: true,
      message: 'Vui lòng nhập mô tả dự án'
    }
  ],
  cover: [
    {
      message: 'Vui lòng chọn hình ảnh',
      required: true
    }
  ],
  logo: [
    {
      message: 'Vui lòng chọn hình ảnh',
      required: true
    }
  ],
  estimate: [
    {
      message: 'Thời gian ước tính là bắt buộc',
      validator: async () => {
        if (form.estimate?.length !== 2) {
          return Promise.reject('Thời gian ước tính là bắt buộc')
        }
        return Promise.resolve()
      }
    }
  ],
  technologies: [
    {
      message: 'Vui lòng chọn công nghệ',
      validator: async () => {
        if (!form.technologies?.length) {
          return Promise.reject('Vui lòng chọn kĩ năng')
        }
        return Promise.resolve()
      }
    }
  ],
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên dự án'
    }
  ]
})

const { options: categoriesOption } = useCategories()
const { options: technologiesOption, filter: techFilter } = useTechnologies()

const changeEstimate = (dates: [Dayjs, Dayjs]) => {
  form.estimate = [dates[0].unix(), dates[1].unix()]
}

// avatar
const loadingLogo = ref(false)
const { open: openUploadAvatar } = useUploadFiles({
  endpoint: 'documents',
  accept: 'image/*',
  multiple: false,
  onStart: () => {
    loadingLogo.value = true
  },
  onDone: (_files) => {
    if (_files.length) {
      form.logo = _files[0]
    }
    loadingLogo.value = false
  }
})

// crop banner
const cropRef = ref()

// Magic editor
const editorRef = ref()

const formRef = ref<FormInstance>()

const submitForm = async () => {
  const content = editorRef.value?.getContent()
  form.content = content || ''
  await formRef.value?.validateFields()
  return form
}

const setForm = (data: Record<string, any>) => {
  Object.assign(form, data)
}

defineExpose({
  submitForm,
  form,
  setForm
})
</script>

<style scoped>
.chapter-name input,
.chapter-name input:focus {
  border: none !important;
  outline: 0 !important;
  box-shadow: none !important;
  width: 100%;
  font-size: 28px;
  font-weight: 600;
  padding-left: 0;
  margin-bottom: 6px;
}
.chapter-name {
  margin-bottom: 6px;
}
</style>
