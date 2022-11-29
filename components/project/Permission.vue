<template>
  <div>
    <Teleport to="#actions">
      <a-button type="primary" class="ml-4" @click="modalRef?.open()">
        <template #icon>
          <i-ic-baseline-check />
        </template>
        <span class="ml-1">Thêm Mới</span>
      </a-button>
    </Teleport>

    <a-table :columns="columns" :data-source="roles" :loading="loadingRole">
      <template #emptyText>
        <div class="py-10 pt-5 text-center">
          <div style="width: 300px; height: 250px" class="mx-auto">
            <vue-lottie-player
              width="300px"
              height="250px"
              loop
              path="https://assets4.lottiefiles.com/packages/lf20_ij2ngolf.json"
            />
            <div class="text-[11px] text-gray-400">
              This project have no roles now...
            </div>
          </div>
        </div>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'user'">
          <div v-if="record.user" class="flex items-center">
            <a-avatar :src="$cdn(record.user.avatar)" />
            <h4 class="mb-0 ml-2">{{ record.user.name }}</h4>
          </div>
          <div v-else>--</div>
        </template>

        <template v-if="column.key === 'permissions'">
          <span v-for="(premit, index) in record.permissions" :key="index">
            <a-tag v-if="premit === PermissionEnum.REMOVE_PROJECT" color="#f50">
              Delete Project
            </a-tag>
            <a-tag
              v-else-if="premit === PermissionEnum.UPDATE_PROJECT"
              color="#2db7f5"
            >
              Update Project
            </a-tag>

            <a-tag
              v-else-if="premit === PermissionEnum.CREATE_ROLE"
              color="#87d068"
            >
              Create Role
            </a-tag>
            <a-tag
              v-else-if="premit === PermissionEnum.UPDATE_ROLE"
              color="#108ee9"
            >
              Update Role
            </a-tag>
            <a-tag
              v-else-if="premit === PermissionEnum.REMOVE_ROLE"
              color="#f50"
            >
              Remove Role
            </a-tag>
          </span>
        </template>

        <template v-if="column.key === 'createdAt'">
          {{ $dayjs(record.createdAt).format('DD/MM/YYYY hh:mm') }}
        </template>

        <template v-if="column.key === 'action'">
          <div>
            <a-popconfirm
              title="Are you sure delete this position?"
              ok-text="Yes"
              cancel-text="No"
              placement="bottomLeft"
              @confirm="removeRole({ input: { id: record.id } })"
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
              @click="modalRef?.open(record)"
            >
              <div class="flex items-center">
                <Icon name="material-symbols:edit" />
              </div>
            </a-button>
          </div>
        </template>
      </template>
    </a-table>

    <lazy-modals-role-form ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRoles, ref, useMutation, useNuxtApp } from '#imports'
import { PermissionEnum } from '~/apollo/server/__generated__/serverTypes'
import { REMOVE_ROLE } from '~/apollo/server/mutations/roles.mutate'
import {
  RemoveRole,
  RemoveRoleVariables
} from '~/apollo/server/mutations/__generated__/RemoveRole'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    align: 'center'
  },
  {
    title: 'Permissions',
    dataIndex: 'permissions',
    key: 'permissions',
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
const { roles, loading: loadingRole } = useRoles(route.params.id as string)

const modalRef = ref()

const { mutate: removeRole, onDone: afteRemove } = useMutation<
  RemoveRole,
  RemoveRoleVariables
>(REMOVE_ROLE)

const { $apollo } = useNuxtApp()
afteRemove((val) => {
  if (val.data?.removeRole) {
    $apollo.defaultClient.cache.evict({ id: `Role:${val.data.removeRole.id}` })
  }
})
</script>

<style scoped></style>
