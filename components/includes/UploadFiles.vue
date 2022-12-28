<template>
  <div>
    <draggable
      v-model="files"
      item-key="id"
      group="people"
      class="rounded-md bg-primary-50 p-1.5 empty:hidden"
    >
      <template #item="{ element }">
        <includes-file :file="element" @delete="removeFile(element)" />
      </template>
    </draggable>

    <div class="mt-3">
      <a-button type="primary" size="small" @click="open">
        <div class="flex items-center">
          <Icon name="ic:baseline-cloud-upload" />
          <span class="ml-2 text-xs"> Upload </span>
        </div>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUploadFiles } from '~/composables/useUploadFiles'
import { ref } from '#imports'
import { watch } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: string[]
    endpoint?: string
  }>(),
  {
    endpoint: 'documents',
    value: () => []
  }
)

const emit = defineEmits<{
  (e: 'update:value', value: typeof props.value): void
  (e: 'add', value: typeof props.value): void
}>()

const files = ref(props.value)

const { open } = useUploadFiles({
  endpoint: 'documents',
  onDone: (_files) => {
    emit('add', _files)
    files.value.push(..._files)
  }
})

watch(files, () => {
  emit('update:value', files.value)
}, { deep: true })

watch(props, () => {
  files.value = props.value
}, { deep: true })

const removeFile = (file: string) => {
  files.value = files.value.filter((f) => f !== file)
}
</script>

<style scoped></style>
