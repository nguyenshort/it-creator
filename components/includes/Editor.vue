<template>
  <textarea id="noveleditor"></textarea>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import {nextTick, onMounted, onUnmounted, useNuxtApp, useUpload} from '#imports'

const props = defineProps<{
  value: string
}>()

watch(
  () => props.value,
  () => window.tinymce.get('noveleditor')?.setContent(props.value)
)

const upload = useUpload()
const { $cdn } = useNuxtApp()

onMounted(() =>
  nextTick(() => {
    window.tinymce
      .init({
        selector: '#noveleditor',
        height: 700,
        plugins:
          'advlist autolink lists link image charmap preview anchor pagebreak lists table emoticons autosave quickbars media',
        toolbar1:
          'undo redo | blocks fontfamily | ' +
          'bold italic forecolor backcolor | alignleft aligncenter ' +
          'alignright alignjustify',
        toolbar2:
          'bullist numlist outdent indent | ' +
          'table media image emoticons | removeformat restoredraft help',
        toolbar_mode: 'floating',
        file_picker_types: 'image',
        contextmenu: 'link image video table',
        images_upload_handler: async (blobInfo) =>
          new Promise((resolve, reject) => {
            upload
              .image(blobInfo.blob(), 'freesize')
              .then((res) => {
                resolve($cdn(res))
              })
              .catch((err) => {
                reject(err)
              })
          })
      })
      .then(() => {
        window.tinymce.get('noveleditor')?.setContent(props.value)
      })
  })
)

onUnmounted(() => {
  window.tinymce.get('noveleditor')?.destroy()
})

const getContent = () => {
  return window.tinymce.get('noveleditor')?.getContent()
}

const reset = () => {
  return window.tinymce.get('noveleditor')?.setContent('')
}

defineExpose({
  getContent,
  reset
})
</script>
