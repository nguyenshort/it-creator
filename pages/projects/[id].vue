<template>
  <div>
    <project-tab />
    <project-info v-if="tab === 'info'" />
    <project-permission v-else-if="tab === 'members'" />
    <project-progress v-else-if="tab === 'progress'" />
    <project-proposal v-else-if="tab === 'proposal'" />
  </div>
</template>

<script lang="ts" setup>
import { VERIFY_PROJECT } from '~/apollo/server/queries/proposal.query'
import { useRouter, useAsyncQuery, computed } from '#imports'
import { VerifyProject } from '~/apollo/server/queries/__generated__/VerifyProject'

const router = useRouter()
await useAsyncQuery<VerifyProject>(VERIFY_PROJECT, {
  filter: {
    id: router.currentRoute.value.params.id as string
  }
})

const tab = computed(() => router.currentRoute.value.query.tab as string)

// todo: Logo

//
</script>

<style scoped></style>
