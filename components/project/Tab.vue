<template>
  <Teleport to="#tabs">
    <lazy-includes-tab :tabs="tabs" />
  </Teleport>
</template>

<script lang="ts" setup>
import {ref} from "#imports"

const tabs = ref([
  {
    key: 'info',
    tab: 'Info'
  },
  {
    key: 'members',
    tab: 'Members'
  },
  {
    key: 'progress',
    tab: 'Progress'
  },
  {
    key: 'proposal',
    tab: 'Proposal'
  }
])
</script>

<style scoped></style>
