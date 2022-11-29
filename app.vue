<template>
  <nuxt-layout />
</template>

<script lang="ts" setup>
import {onMounted, ref, useEventBus, watch} from "#imports"

const modals = ref<string[]>([])

const mitter = useEventBus<string>('modal')

onMounted(() => {
  mitter.on(event => {
    if(event.startsWith('Modal-')) {
      if(event.endsWith('-Dispose')) {
        const modalName = event.replace('Modal-', '')
            .replace('-Dispose', '')
        modals.value = modals.value.filter((name) => name !== modalName)

      } else {
        const modalName = event.replace('Modal-', '')
        !modals.value.includes(modalName) && modals.value.push(modalName)
      }
    }
  })
})

watch(() => modals.value.length, (value, oldValue) => {
  // Todo: block scroll
  // console.log(value, oldValue)
})
</script>
