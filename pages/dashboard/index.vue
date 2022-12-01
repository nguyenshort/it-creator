<template>
  <div>
    <lazy-projects-tab />

    <Teleport to="#actions">
      <a-button type="primary" @click="$router.push('/creator/new')">
        Add New
      </a-button>
    </Teleport>

    <a-table
      :columns="columns"
      :data-source="projects"
      :loading="loading"
      :pagination="{
        total: count,
        showLessItems: true,
        defaultPageSize: 7
      }"
      @change="onChangePage($event.current)"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'action'">
          <lazy-includes-search
            v-model:keyword="keyword"
            v-model:field="field"
            :options="options"
            @change="onSearch"
          />
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <router-link :to="'/projects/' + record.id">
            {{ record.name }}
          </router-link>
        </template>

        <template v-if="column.key === 'active'">
          <a-tag v-if="record.active === ProjectActive.ACTIVE" color="#f50">
            Active
          </a-tag>
          <a-tag
            v-else-if="record.active === ProjectActive.DISABLED"
            color="#87d068"
          >
            Disabled
          </a-tag>
          <a-tag
            v-else-if="record.active === ProjectActive.DRAFT"
            color="#108ee9"
          >
            Draft
          </a-tag>
        </template>

        <template v-if="column.key === 'status'">
          <a-tag v-if="record.status === ProjectStatus.DONE" color="#f50">
            Done
          </a-tag>
          <a-tag
            v-else-if="record.status === ProjectStatus.PREPARE"
            color="#87d068"
          >
            Prepare
          </a-tag>
          <a-tag
            v-else-if="record.status === ProjectStatus.RUNNING"
            color="#108ee9"
          >
            Running
          </a-tag>
          <a-tag
            v-else-if="record.status === ProjectStatus.STUCK"
            color="#2db7f5"
          >
            Stuck
          </a-tag>
        </template>

        <template v-if="column.key === 'createdAt'">
          {{ $dayjs(record.createdAt).format('DD/MM/YYYY') }}
        </template>

        <template v-else-if="column.key === 'action'">
          <div>
            <a-button
              type="primary"
              size="small"
              class="mr-2"
              @click="openApprove({ id: record.id, active: record.active })"
            >
              <div class="flex items-center">
                <Icon name="ion:logo-apple-ar" />
              </div>
            </a-button>

            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="removeProjectHandle({ input: { id: record.id } })"
            >
              <a-button type="danger" size="small">
                <div class="flex items-center">
                  <Icon name="material-symbols:delete-outline" />
                </div>
              </a-button>
            </a-popconfirm>
            <a-button
              type="primary"
              size="small"
              class="ml-2"
              @click="$router.push('/projects/' + record.id)"
            >
              <div class="flex items-center">
                <Icon name="material-symbols:edit" />
              </div>
            </a-button>
          </div>
        </template>
      </template>
    </a-table>

    <lazy-modals-approval ref="approveModalRef" />
  </div>
</template>

<script lang="ts" setup>
import {
  ApproveProjectInput,
  ProjectActive,
  ProjectStatus
} from '~/apollo/server/__generated__/serverTypes'
import {
  computed,
  reactive,
  ref,
  useQuery,
  useSearchTable,
  useRoute,
  useMutation,
  useNuxtApp
} from '#imports'
import {
  GetProjects,
  GetProjectsVariables
} from '~/apollo/server/queries/__generated__/GetProjects'
import {
  COUNT_PROJECTS,
  GET_PROJECTS
} from '~/apollo/server/queries/projects.query'
import {
  CountProjects,
  CountProjectsVariables
} from '~/apollo/server/queries/__generated__/CountProjects'
import {
  RemoveProject,
  RemoveProjectVariables
} from '~/apollo/server/mutations/__generated__/RemoveProject'
import { REMOVE_PROJECT } from '~/apollo/server/mutations/projects.mutation'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Category',
    dataIndex: ['category', 'name'],
    key: 'category',
    align: 'center'
  },
  {
    title: 'Active',
    dataIndex: 'active',
    key: 'active',
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center'
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center'
  },
  {
    title: 'Action',
    key: 'action',
    align: 'right'
  }
]

const route = useRoute()
const { $apollo } = useNuxtApp()

const activeFilter = computed(() => {
  if (route.query.tab === 'active') {
    return [ProjectActive.ACTIVE]
  } else if (route.query.tab === 'disabled') {
    return [ProjectActive.DISABLED]
  } else if (route.query.tab === 'draft') {
    return [ProjectActive.DRAFT]
  }
  return []
})

// Projects
const rawFilter = reactive<GetProjectsVariables>({
  filter: {
    limit: 7,
    offset: 0,
    sort: 'createdAt',
    active: []
  }
})
const projectFilter = computed<GetProjectsVariables>(() => {
  const filter = rawFilter.filter
  filter.active = activeFilter.value
  return rawFilter
})
const { result: projectsResult, loading: loadingProjects } = useQuery<
  GetProjects,
  GetProjectsVariables
>(GET_PROJECTS, projectFilter, {
  debounce: 300,
  fetchPolicy: 'network-only'
})
const projects = computed(() => projectsResult.value?.studioProjects || [])

// Counter
const countFilter = computed<CountProjectsVariables>(() => ({
  filter: {
    active: activeFilter.value
  }
}))
const { result: countResult, loading: loadingCount } = useQuery<
  CountProjects,
  CountProjectsVariables
>(COUNT_PROJECTS, countFilter, {
  debounce: 300,
  fetchPolicy: 'network-only'
})
const count = computed(() => countResult.value?.studioProjectsCount || 0)

const onChangePage = (page: number) => {
  rawFilter.filter.offset = (page - 1) * rawFilter.filter.limit
}

// Remove
const {
  mutate: removeProjectHandle,
  loading: loadingDelete,
  onDone: afterDelete
} = useMutation<RemoveProject, RemoveProjectVariables>(REMOVE_PROJECT)

afterDelete((val) => {
  if (val.data?.removeProject) {
    $apollo.defaultClient.cache.evict({
      id: `Project:${val.data.removeProject.id}`
    })
  }
})

// Approve
const approveModalRef = ref()
const openApprove = (project: ApproveProjectInput) => {
  approveModalRef.value?.open(project)
}

// Search
const { options, keyword, field } = useSearchTable({
  options: ref([
    {
      label: 'Name',
      value: 'goal_name'
    }
  ])
})
const onSearch = () => {
  //
}

const loading = computed(
  () =>
    loadingProjects.value ||
    loadingCount.value ||
    loadingDelete.value ||
    approveModalRef.value?.loading?.value
)
</script>

<style scoped></style>
