<template>
  <Teleport to="#tabs">
    <lazy-includes-tab :tabs="tabs" />
  </Teleport>
</template>

<script lang="ts" setup>
import {ref} from "#imports";
import {ProjectActive} from "~/apollo/server/__generated__/serverTypes";

const tabs = ref([
  {
    key: '',
    tab: 'All'
  },
  {
    key: ProjectActive.ACTIVE.toLowerCase(),
    tab: 'Active'
  },
  {
    key: ProjectActive.DRAFT.toLowerCase(),
    tab: 'Draft'
  },
  {
    key: ProjectActive.DISABLED.toLowerCase(),
    tab: 'Blocked'
  }
])
</script>

<style scoped></style>
