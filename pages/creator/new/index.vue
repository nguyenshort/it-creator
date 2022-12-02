<template>
  <div>
    <project-form ref="formRef" />
    <div class="flex justify-end">
      <a-button type="primary" :loading="loading" @click="newProject">
        <template #icon>
          <Icon name="ic:baseline-cloud-upload" />
        </template>
        <span class="ml-1">Tải Lên</span>
      </a-button>
    </div>

    <Teleport to="#actions">
      <a-button type="primary" :loading="loading" @click="newProject">
        <template #icon>
          <Icon name="ic:baseline-cloud-upload" />
        </template>
        <span class="ml-1">Tải Lên</span>
      </a-button>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, useMutation, useRouter } from '#imports'

import ProjectForm from '~/components/project/Form.vue'
import { CREATE_PROJECT } from '~/apollo/server/mutations/project.mutate'
import {
  CreateProject,
  CreateProjectVariables
} from '~/apollo/server/mutations/__generated__/CreateProject'

const formRef = ref<InstanceType<typeof ProjectForm>>()

const { mutate, loading } = useMutation<CreateProject, CreateProjectVariables>(
  CREATE_PROJECT
)

const router = useRouter()
const newProject = async () => {
  try {
    const input = await formRef.value?.submitForm()
    const project = await mutate({ input })
    await router.push(`/projects/${project?.data?.createProject?.id}`)
  } catch (e) {
    // console.log(e)
  }
}
</script>
