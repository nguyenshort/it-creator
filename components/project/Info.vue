<template>
  <div>
    <Teleport to="#actions">
      <a-popconfirm
        v-if="$route.params.id"
        title="Are you sure delete this task?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="removeProjectHandle({ input: { id: $route.params.id } })"
      >
        <a-button type="danger">
          <div class="flex items-center">
            <Icon name="material-symbols:delete-outline" />
            <span class="ml-1 font-semibold">Remove</span>
          </div>
        </a-button>
      </a-popconfirm>

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
  useMutation,
  useRouter
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
import {
  RemoveProject,
  RemoveProjectVariables
} from '~/apollo/server/mutations/__generated__/RemoveProject'
import { REMOVE_PROJECT } from '~/apollo/server/mutations/projects.mutation'

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
    await mutate({
      input: {
        ...input,
        id: route.params.id as string
      }
    })
  } catch (e) {
    // console.log(e)
  }
}

// Remove
const {
  mutate: removeProjectHandle,
  loading: loadingDelete,
  onDone: afterDelete
} = useMutation<RemoveProject, RemoveProjectVariables>(REMOVE_PROJECT)

const router = useRouter()
afterDelete((val) => {
  if (val.data?.removeProject) {
    router.replace('/dashboard')
    $apollo.defaultClient.cache.evict({
      id: `Project:${val.data.removeProject.id}`
    })
  }
})
</script>

<style scoped></style>
