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
      <a-form-item name="name" class="chapter-name" :label="$t('project.info.name')" has-feedback>
        <a-input v-model:value="form.name" :placeholder="$t('project.info.namePlaceholder')" />
      </a-form-item>

      <div class="flex">
        <div class="w-[450px] flex-shrink-0">
          <a-form-item :label="$t('project.info.logo')" name="logo">
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
          </a-form-item>

          <a-form-item
            :label="$t('project.info.cover')"
            name="cover"
            class="aspect-w-12 aspect-h-7 relative"
          >
            <a-spin :spinning="false">
              <div
                class="aspect-w-12 aspect-h-7 relative w-full cursor-pointer overflow-hidden rounded-md bg-primary-50 relative"
                @click="cropRef.open?.()"
              >
                <img
                  v-if="form.cover"
                  alt=""
                  :src="$cdn(form.cover)"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  class="absolute flex h-full w-full items-center justify-center bg-primary-600 text-[40px] text-white opacity-0 transition"
                  :class="{
                    'hover:opacity-100': !form.cover,
                  }"
                >
                  <Icon name="ic:baseline-cloud-upload" />
                </div>
              </div>
            </a-spin>

            <button
              v-if="!loadingLogo && form.cover"
              class="absolute top-0 right-0 bg-primary-500 h-[30px] text-white w-[120px] rounded-md"
            >
              {{ $t('project.info.uploadCover') }}
            </button>

          </a-form-item>

          <a-form-item label="Category" :name="$t('project.info.category')">
            <a-select
              v-model:value="form.category"
              :placeholder="$t('project.info.categoryPlaceholder')"
              :options="categoriesOption"
            ></a-select>
          </a-form-item>

          <a-form-item name="technologies" :label="$t('project.info.tech')">
            <!-- Dùng loop -->
            <a-select
              v-model:value="form.technologies"
              show-search
              mode="tags"
              :not-found-content="null"
              :options="technologiesOption"
              @search="techFilter.filter.name = $event"
            >
              <template #removeIcon>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon" width="1em" height="1em" viewBox="0 0 24 24" data-v-4fa0a2a1="" data-v-6d06fcec=""><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z"></path></svg>
              </template>
            </a-select>
          </a-form-item>

          <a-form-item name="estimate" :label="$t('project.info.estimate')">
            <a-range-picker v-model:value="timeRange" class="w-full" @change="changeEstimate" />
          </a-form-item>
        </div>

        <div class="ml-16 w-full">

          <a-form-item :label="$t('project.info.type')">
            <a-radio-group v-model:value="form.enterprise">
              <a-radio :value="false">
                {{ $t('project.info.typePersonal') }}
              </a-radio>
              <a-radio :value="true">
                {{ $t('project.info.typeEnterprise') }}
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item :label="$t('project.info.status')" name="files">
            <a-select
              ref="select"
              v-model:value="form.status"
              style="width: 220px"
            >
              <a-select-option :value="ProjectStatus.PREPARE">
                {{ $t('project.status.prepare') }}
              </a-select-option>
              <a-select-option :value="ProjectStatus.RUNNING">
                {{ $t('project.status.running') }}
              </a-select-option>
              <a-select-option :value="ProjectStatus.STUCK">
                {{ $t('project.status.stuck') }}
              </a-select-option>
              <a-select-option :value="ProjectStatus.DONE">
                {{ $t('project.status.done') }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :label="$t('project.info.link')" name="link">
            <a-input v-model:value="form.link" />
          </a-form-item>

          <a-form-item :label="$t('project.info.documents')" name="files">
            <includes-upload-files v-model:value="form.files" />
          </a-form-item>

          <slot name="afterfiles"></slot>

        </div>
      </div>

      <a-form-item label="Detail" name="content">
        <textarea id="projecteditor"></textarea>
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
import { ref, useCategories, useUploadFiles, useTinymce, toRaw, watch, useNuxtApp } from "#imports";
import { CreateProjectInput, ProjectStatus } from "~/apollo/server/__generated__/serverTypes";
import { useTechnologies } from '~/composables/useTechnologies'
import { Dayjs } from 'dayjs'

const { $dayjs } = useNuxtApp()

const props = defineProps<{
  value: CreateProjectInput
}>()

const { getContent, setContent, value } = useTinymce({
  options: {
    selector: '#projecteditor',
  },
  autoInit: true
})

const form = ref<CreateProjectInput>(toRaw(props.value) || {
  enterprise: false,
  category: '',
  logo: '',
  content: '',
  cover: '',
  estimate: [],
  name: '',
  technologies: [],
  files: [],
  status: ProjectStatus.PREPARE
})

const timeRange = ref<Dayjs[]>(form.value.estimate.map((e) => $dayjs.unix(e)))

watch(() => props.value, (val) => {
  form.value = toRaw(val)
  timeRange.value = form.value.estimate.map((e) => $dayjs.unix(e))
})

watch(value, (val) => {
  form.value.content = val
})

const emit = defineEmits<{
  (e: 'update:value', value: CreateProjectInput): void
}>()
watch(() => form, (value) => {
  emit('update:value', value.value)
}, { deep: true })

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
        if (form.value.estimate?.length !== 2) {
          return Promise.reject('Thời gian ước tính là bắt buộc')
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
  form.value.estimate = [dates[0].unix(), dates[1].unix()]
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
      form.value.logo = _files[0]
    }
    loadingLogo.value = false
  }
})

// crop banner
const cropRef = ref()

//
const formRef = ref<FormInstance>()

const submitForm = async () => {
  form.value.content = getContent()
  await formRef.value?.validateFields()
  return form.value
}

const setForm = (data: Record<string, any>) => {
  Object.assign(form, data)
}

defineExpose({
  submitForm,
  form,
  setForm,
  setContent
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
