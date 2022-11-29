<template>
  <div>
    <Teleport to="#actions">
      <a-button type="danger">
        <div class="flex items-center">
          <Icon name="material-symbols:delete-outline" />
          <span class="ml-1 font-semibold">Remove</span>
        </div>
      </a-button>

      <a-button
        type="primary"
        class="ml-4"
        :loading="loadingUpdate"
        @click="updateInfo"
      >
        <template #icon>
          <Icon name="ic:baseline-cloud-upload" />
        </template>
        <span class="ml-1 font-semibold"> Update </span>
      </a-button>
    </Teleport>

    <a-spin :spinning="loading">
      <a-form
          id="project1-form"
          ref="formRef"
          :model="form"
          layout="vertical"
          name="basic"
          autocomplete="off"
          :rules="rules"
      >
        <a-form-item name="name" class="chapter-name" has-feedback>
          <a-input v-model:value="form.name" placeholder="Enter project name" />
        </a-form-item>

        <div class="flex">
          <div class="w-[450px] flex-shrink-0">
            <a-form-item label="Logo" name="logo">
              <div class="w-[60px]">
                <a-spin :spinning="loadingLogo">
                  <div
                      class="relative h-[60px] w-[60px] cursor-pointer overflow-hidden rounded-full bg-primary-50"
                      @click="openPickLogo()"
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
              <a-spin :spinning="loadingCover">
                <div
                    class="aspect-w-12 aspect-h-7 relative w-full cursor-pointer overflow-hidden rounded-md bg-primary-50"
                    @click="open()"
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
                  :options="categories"
              ></a-select>
            </a-form-item>

            <a-form-item name="technologies" label="Programing lang, framework">
              <!-- Dùng loop -->
              <a-select
                  v-model:value="form.technologies"
                  show-search
                  mode="tags"
                  placeholder="Nhấn để thêm mới"
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
                  :options="searchTechnologies"
              >
              </a-select>
            </a-form-item>

            <a-form-item name="estimate" label="Estimate">
              <a-range-picker class="w-full" @change="onChangeRangePicker" />
            </a-form-item>
          </div>

          <div class="ml-16 w-full">
            <a-form-item label="Documents" name="files">
              <draggable
                  v-model="form.files"
                  item-key="id"
                  group="people"
                  class="rounded-md bg-primary-50 p-1.5 empty:hidden"
              >
                <template #item="{ element }">
                  <file-item :file="element" />
                </template>
              </draggable>

              <div class="mt-3">
                <a-button type="primary" size="small" @click="pickFiles">
                  <div class="flex items-center">
                    <Icon name="ic:baseline-cloud-upload" />
                    <span class="ml-2 text-xs"> Upload </span>
                  </div>
                </a-button>
              </div>

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
          <novel-editor ref="editorRef" v-model:value="form.content" />
        </a-form-item>
      </a-form>
    </a-spin>

    <a-modal
      v-model:visible="showCropModal"
      title="Cắt ảnh bìa"
      @ok="onCropAvatar"
    >
      <div class="project-cover">
        <image-cropper ref="cropRef" :config="{ aspectRatio: 12 / 7 }" />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { Dayjs } from 'dayjs'
import { FormInstance } from 'ant-design-vue'
import {
  computed,
  nextTick,
  reactive,
  ref,
  useFileDialog,
  useQuery, useRouter,
  useUpload,
  watch
} from '#imports'
import { GetCategories } from '~/apollo/server/queries/__generated__/GetCategories'
import { GET_CATEGORIES } from '~/apollo/server/queries/categories.query'
import {
  GetTechnologies,
  GetTechnologiesVariables
} from '~/apollo/server/queries/__generated__/GetTechnologies'
import { GET_TECHNOLOGIES } from '~/apollo/server/queries/technology.query'
import { CreateProjectInput } from '~/apollo/server/__generated__/serverTypes'
import {GetProjectInfo, GetProjectInfoVariables} from "~/apollo/server/queries/__generated__/GetProjectInfo";
import {GET_PROJECT_INFO} from "~/apollo/server/queries/projects.query"

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

// Roles form
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

// Lấy dữ liệu dự án
const router = useRouter()
const { loading, onResult: afterGetResult } = useQuery<GetProjectInfo, GetProjectInfoVariables>(
    GET_PROJECT_INFO,
    {
      filter: {
        id: router.currentRoute.value.params.id as string
      }
    }
)

afterGetResult((result) => {
  if (result.data) {
    const _clone = JSON.parse(JSON.stringify(result.data.studioProject))
    delete _clone.__typename
    delete _clone.id
    const _form: CreateProjectInput = {
      ..._clone,
      category: _clone.category.id,
      technologies: _clone.technologies.map((item: any) => item.id)
    }
    Object.assign(form, _form)
  }
})

// Lấy danh sách phân loại
const { result: queryCategories } = useQuery<GetCategories>(GET_CATEGORIES)
const categories = computed(() =>
  (queryCategories.value?.categories || []).map((e) => ({
    label: e.name,
    value: e.id
  }))
)

// Search technologies
const searchTechFilter = ref<GetTechnologiesVariables>({
  filter: {
    name: '',
    limit: 10,
    offset: 0
  }
})

type OptionData = { label: string; value: string }
const searchTechnologies = ref<OptionData[]>([])
const setTechs = (doc: OptionData[]) => {
  searchTechnologies.value = doc.map((e) => ({
    label: e.label,
    value: e.value
  }))
}
const { onResult } = useQuery<GetTechnologies, GetTechnologiesVariables>(
  GET_TECHNOLOGIES,
  searchTechFilter
)
onResult((result) => {
  setTechs(
    (result?.data?.technologies || []).map((e) => ({
      label: e.name,
      value: e.id
    }))
  )
})
const onChangeRangePicker = (dates: [Dayjs, Dayjs]) => {
  form.estimate = [dates[0].unix(), dates[1].unix()]
}

// avatar
const showCropModal = ref(false)
const cropRef = ref()
const { files, open } = useFileDialog({
  accept: 'image/*',
  multiple: false
})
watch(files, (val) => {
  if (val?.length) {
    showCropModal.value = true
    nextTick(() => cropRef.value?.buildCropper(val[0]))
  }
})
const upload = useUpload()
const loadingCover = ref(false)
const onCropAvatar = async () => {
  loadingCover.value = true
  showCropModal.value = false
  try {
    const data = await cropRef.value?.cropImage()
    form.cover = URL.createObjectURL(data)
    const url = await upload.image(data, 'project')
    URL.revokeObjectURL(form.cover)
    if (url) {
      form.cover = url
    } else {
      form.cover = ''
    }
  } catch (e) {
    //
  }
  loadingCover.value = false
}

// Logo
const loadingLogo = ref(false)
const { files: logoFiles, open: openPickLogo } = useFileDialog({
  accept: 'image/*',
  multiple: false
})
const uploadLogo = async () => {
  if (logoFiles.value?.length) {
    loadingLogo.value = true
    try {
      form.logo = URL.createObjectURL(logoFiles.value[0])
      const url = await upload.image(logoFiles.value[0], 'logo')
      URL.revokeObjectURL(form.logo)
      if (url) {
        form.logo = url
      } else {
        form.logo = ''
      }
    } catch (e) {
      //
    }
    loadingLogo.value = false
  }
}
watch(logoFiles, () => uploadLogo())

// File
const { open: pickFiles, files: documents } = useFileDialog({
  multiple: true
})
const onPickFiles = async () => {
  try {
    const _files = await Promise.all(
      Array.from(documents.value || []).map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            upload
              .document(file, 'project')
              .then((url) => {
                if (url) {
                  resolve(url)
                } else {
                  reject()
                }
              })
              .catch(() => {
                reject()
              })
          })
      )
    )
    form.files?.push(..._files)
  } catch (e) {
    //
  }
}
watch(documents, () => onPickFiles())

const editorRef = ref()

const formRef = ref<FormInstance>()

const submitForm = async () => {
  const content = editorRef.value?.getContent()
  form.content = content || ''
  await formRef.value?.validateFields()
  return form
}
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
