<template>
  <div
      class="mb-1.5 flex cursor-pointer items-center rounded-md bg-white px-2.5 py-1.5 last:mb-0"
  >
    <a><i :class="icon"></i></a>
    <span class="ml-2">{{ fileName }}</span>
    <button class="ml-auto" @click.prevent.stop="emit('delete', file)">
      <Icon name="material-symbols:delete-outline" class="inline-block scale-90 transform text-rose-500" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import {computed, useNuxtApp} from "#imports";

const props = defineProps<{
  file: string
}>()

const { $fileIcon } = useNuxtApp()
const icon = computed(() => $fileIcon?.getClassWithColor(props.file))

const fileName = computed(() => {
  const file = props.file.split('/')
  const name = file[file.length - 1]
  return name.length > 50 ? name.slice(0, 50) + '...' : name
})

const emit = defineEmits<{
  (e: 'delete', value: typeof props.file): void
}>()
</script>

<style scoped></style>
