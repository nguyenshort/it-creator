<template>
  <div>
    <project-form ref="formRef" v-model:value="form" />
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
import { CreateProjectInput, ProjectStatus } from "~/apollo/server/__generated__/serverTypes";

const formRef = ref<InstanceType<typeof ProjectForm>>()

const form = ref<CreateProjectInput>({
  enterprise: false,
  category: '',
  logo: '',
  content: '',
  cover: '',
  estimate: [],
  name: '',
  technologies: [],
  files: [],
  status: ProjectStatus.PREPARE,
  link: '',
})

const { mutate, loading } = useMutation<CreateProject, CreateProjectVariables>(
  CREATE_PROJECT
)

const router = useRouter()
const newProject = async () => {
  try {
    await formRef.value?.submitForm()
    const project = await mutate({ input: form.value })
    await router.push(`/projects/${project?.data?.createProject?.id}`)
  } catch (e) {
    // console.log(e)
  }
}
</script>
