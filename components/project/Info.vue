<template>
  <div>
    <Teleport to="#actions">
      <a-button type="danger">
        <div class="flex items-center">
          <Icon name="material-symbols:delete-outline" />
          <span class="ml-1 font-semibold">Remove</span>
        </div>
      </a-button>

      <a-button
        type="primary"
        class="ml-4"
        :loading="updateProject"
        @click="updateHandle"
      >
        <template #icon>
          <Icon name="ic:baseline-cloud-upload" />
        </template>
        <span class="ml-1 font-semibold"> Update </span>
      </a-button>
    </Teleport>

    <a-spin :spinning="loading">
      <project-form ref="formRef" />
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  useQuery,
  watch,
  nextTick,
  useRoute,
  useNuxtApp,
  useMutation
} from '#imports'
import ProjectForm from '~/components/project/Form.vue'
import { GET_PROJECT_INFO } from '~/apollo/server/queries/projects.query'
import {
  GetProjectInfo,
  GetProjectInfoVariables
} from '~/apollo/server/queries/__generated__/GetProjectInfo'
import { CreateProjectInput } from '~/apollo/server/__generated__/serverTypes'
import { GET_TECHNOLOGIES } from '~/apollo/server/queries/technology.query'
import { UPDATE_PROJECT_INFO } from '~/apollo/server/mutations/project.mutate'
import {
  UpdateProjectInfo,
  UpdateProjectInfoVariables
} from '~/apollo/server/mutations/__generated__/UpdateProjectInfo'

const route = useRoute()
const { loading, result } = useQuery<GetProjectInfo, GetProjectInfoVariables>(
  GET_PROJECT_INFO,
  {
    filter: {
      id: route.params.id as string
    }
  }
)

const formRef = ref<InstanceType<typeof ProjectForm>>()

const { $apollo } = useNuxtApp()
watch(
  result,
  () => {
    if (result.value?.studioProject) {
      const _clone = JSON.parse(JSON.stringify(result.value.studioProject))
      delete _clone.__typename
      delete _clone.id
      const _form: CreateProjectInput = {
        ..._clone,
        category: _clone.category.id,
        technologies: _clone.technologies.map((item: any) => item.id)
      }
      nextTick(() => {
        $apollo.defaultClient.writeQuery({
          query: GET_TECHNOLOGIES,
          data: {
            technologies: result.value?.studioProject.technologies
          }
        })
        setTimeout(() => {
          formRef.value?.setForm(_form)
        }, 300)
      })
    }
  },
  { immediate: true }
)

const { mutate, loading: updateProject } = useMutation<
  UpdateProjectInfo,
  UpdateProjectInfoVariables
>(UPDATE_PROJECT_INFO)

const updateHandle = async () => {
  try {
    const input: CreateProjectInput = await formRef.value?.submitForm()
    const project = await mutate({
      input: {
        ...input,
        id: route.params.id as string
      }
    })
    console.log(project)
  } catch (e) {
    // console.log(e)
  }
}
</script>

<style scoped></style>
