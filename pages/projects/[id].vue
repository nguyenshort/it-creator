<template>
  <div>
    <project-tab />

    <project-info />

  </div>
</template>

<script lang="ts" setup>
import {VERIFY_PROJECT} from "~/apollo/server/queries/proposal.query";
import {useRouter, useAsyncQuery} from "#imports";
import {VerifyProject} from "~/apollo/server/queries/__generated__/VerifyProject";

const router = useRouter()
const { data } = await useAsyncQuery<VerifyProject>(
    VERIFY_PROJECT,
    {
      filter: {
        id: router.currentRoute.value.params.id as string
      }
    }
)

// todo: Logo

//
</script>

<style scoped></style>
