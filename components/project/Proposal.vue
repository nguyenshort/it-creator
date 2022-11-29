<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="proposals"
      :pagination="{
        showLessItems: true,
        defaultPageSize: 7
      }"
      :loading="loading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'user'">
          <div v-if="record.user" class="flex items-center">
            <a-avatar :src="$cdn(record.user.avatar)" />
            <h4 class="mb-0 ml-2">{{ record.user.name }}</h4>
          </div>
          <div v-else>--</div>
        </template>

        <template v-if="column.key === 'resume'">
          <a v-if="record.resume" :href="$cdn(record.resume)" target="_blank">
            <a-tag color="#87d068"> Download </a-tag>
          </a>
        </template>

        <template v-if="column.key === 'createdAt'">
          {{ $dayjs(record.createdAt).format('DD/MM/YYYY hh:mm') }}
        </template>

        <template v-if="column.key === 'status'">
          <a-tag v-if="record.status === ProposalStatus.WAITING" color="#f50">
            Waiting
          </a-tag>
          <a-tag
            v-if="record.status === ProposalStatus.REJECTED"
            color="#2db7f5"
          >
            Rejected
          </a-tag>
          <a-tag
            v-if="record.status === ProposalStatus.APPROVED"
            color="#108ee9"
          >
            Approved
          </a-tag>
        </template>

        <template v-if="column.key === 'action'">
          <div>
            <a-button
              type="danger"
              size="small"
              @click="
                modalRef?.open({
                  id: record.id,
                  note: record.note,
                  status: ProposalStatus.REJECTED
                })
              "
            >
              <div class="flex items-center">
                <Icon name="material-symbols:close-rounded" />
              </div>
            </a-button>

            <a-button
              type="primary"
              size="small"
              class="ml-2"
              @click="
                modalRef?.open({
                  id: record.id,
                  note: record.note,
                  status: ProposalStatus.APPROVED
                })
              "
            >
              <div class="flex items-center">
                <Icon name="material-symbols:check-small" />
              </div>
            </a-button>
          </div>
        </template>
      </template>
    </a-table>

    <modals-proposal-check ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useQuery, computed, ref } from '#imports'
import {
  GetProposals,
  GetProposalsVariables
} from '~/apollo/server/queries/__generated__/GetProposals'
import { GET_PROPOSALS } from '~/apollo/server/queries/proposal.query'
import { ProposalStatus } from '~/apollo/server/__generated__/serverTypes'

const columns = [
  {
    title: 'Cendidate',
    dataIndex: 'user',
    key: 'user',
    width: 230
  },
  {
    title: 'Position',
    dataIndex: ['role', 'name'],
    key: 'role.name',
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center'
  },
  {
    title: 'Resume',
    dataIndex: 'resume',
    key: 'resume',
    align: 'center'
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
    align: 'center'
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    width: 180
  },
  {
    title: 'Action',
    key: 'action',
    align: 'right',
    width: 120
  }
]

const route = useRoute()

const { result, loading } = useQuery<GetProposals, GetProposalsVariables>(
  GET_PROPOSALS,
  {
    filter: {
      project: route.params.id as string
    }
  }
)
const proposals = computed(() => result.value?.proposals || [])

const modalRef = ref()
</script>

<style scoped></style>
