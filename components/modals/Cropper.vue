<template>
  <a-modal
    v-model:visible="show"
    title="Di Chuyển Và Cắt Hình Của Bạn"
    @ok="uploadImage"
  >
    <div class="project-cover">
      <vue-cropper
        ref="cropperRef"
        class="crop-image-tool"
        output-type="jpg"
        v-bind="options"
        :style="{ height: height + 'px' }"
      />

      <div class="mx-auto mt-5 flex w-[250px] items-center justify-around">
        <button
          class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500"
          @click="cropperRef?.rotate(-90)"
        >
          <Icon name="ic:baseline-rotate-left" class="text-current" />
        </button>

        <button
          class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500"
          @click="cropperRef?.relativeZoom(-0.2)"
        >
          <Icon name="majesticons:zoom-out-line" class="text-current" />
        </button>

        <button
          class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500"
          @click="cropperRef?.relativeZoom(0.2)"
        >
          <Icon name="majesticons:zoom-in-line" class="text-current" />
        </button>

        <button
          class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500"
          @click="cropperRef?.rotate(90)"
        >
          <Icon name="ic:baseline-rotate-right" class="text-current" />
        </button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { VueCropperProps, VueCropperMethods } from 'vue-cropperjs'
import {nextTick, ref, useFileDialog, useUpload, watch} from '#imports'

const props = withDefaults(defineProps<{
  options: Partial<VueCropperProps>
  autoClose?: boolean
  height?: number
}>(), {
  autoClose: true,
  height: 400,
})

const cropperRef = ref<VueCropperMethods>()

const show = ref(false)

const emit = defineEmits<{
  (event: 'start', value: string): void
  (event: 'fail'): void
  (event: 'success', value: string): void
}>()

const { files, open } = useFileDialog({
  accept: 'image/*',
  multiple: false
})
watch(files, (files) => {
  if (files?.length) {
    show.value = true
    nextTick(() => cropperRef.value?.replace(URL.createObjectURL(files[0])))
  }
})

const upload = useUpload()
const uploadImage = async () => {
  try {
    const data = await new Promise<Blob | null>((resolve, reject) => {
      cropperRef.value?.getCroppedCanvas().toBlob((blob) => {
        if (!blob) {
          reject()
        }
        resolve(blob)
      }, 'image/jpeg')
    })
    if (!data) {
      emit('fail')
    } else {

      if(props.autoClose) {
        show.value = false
      }

      const placeholder = URL.createObjectURL(data)
      emit('start', placeholder)

      const url = await upload.image(data, 'logo')
      URL.revokeObjectURL(placeholder)
      if (url) {
        emit('success', url)
      } else {
        emit('fail')
      }
    }
    //
  } catch (e) {
    emit('fail')
  }
}

defineExpose({
  open
})
</script>

<style scoped></style>
