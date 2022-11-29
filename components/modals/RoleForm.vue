<template>
  <a-modal v-model:visible="show" :title="'Add New'" @ok="submitForm">
    <a-form layout="vertical" :model="form" ref="formRef">
      <a-form-item
        name="name"
        label="Role Name"
        :rules="[
          {
            required: true,
            message: 'Can not be empty',
            trigger: 'blur'
          }

        ]"
      >
        <a-input v-model:value="form.name" placeholder="Name..." />
      </a-form-item>

      <a-form-item name="permissions" label="Permissions">
        <a-checkbox-group v-model:value="form.permissions" style="width: 100%">
          <a-row>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.UPDATE_PROJECT">
                <span>Update Project</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.REMOVE_PROJECT">
                <span>Remove Project</span>
              </a-checkbox>
            </a-col>

            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.CREATE_ROLE">
                <span>Create Role</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.UPDATE_ROLE">
                <span>Update Role</span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.REMOVE_ROLE">
                <span>Delete Role</span>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>

        <template #extra>
          <p class="mb-0 mt-1 text-[11px] text-gray-500 opacity-75">
            - Nếu bạn muốn tao vij tri ma ko co phan
          </p>
        </template>
      </a-form-item>

      <a-form-item label="User" name="user">
        <div>
          <a-select
            show-search
            placeholder="Enter user name"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            allow-clear
            :options="usersOptions"
          ></a-select>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import {
  ref,
  useRoles,
  useRoute,
  useUsers,
  computed,
  watch,
  useMutation,
  toRaw, useNuxtApp
} from "#imports";
import {
  CreateRoleInput,
  PermissionEnum,
  UpdateRoleInput
} from '~/apollo/server/__generated__/serverTypes'
import { CREATE_ROLE, UPDATE_ROLE } from "~/apollo/server/mutations/roles.mutate";
import {
  CreateRole,
  CreateRoleVariables
} from '~/apollo/server/mutations/__generated__/CreateRole'
import { FormInstance } from 'ant-design-vue'
import { GetRoles, GetRoles_roles } from "~/apollo/server/queries/__generated__/GetRoles";
import { UpdateRole, UpdateRoleVariables } from "~/apollo/server/mutations/__generated__/UpdateRole";
import { GET_ROLES } from "~/apollo/server/queries/roles.query";

const route = useRoute()
const show = ref(false)

const form = ref<Partial<UpdateRoleInput & CreateRoleInput>>({
  name: '',
  permissions: [],
  project: route.params.id as string,
  user: ''
})

const { roles } = useRoles(route.params.id as string)

const { users, filter } = useUsers()

watch(roles, (val) => {
  filter.value.filter.exclude = val
    .filter((item) => item.user)
    .map((item) => item.user!.id)
})

const usersOptions = computed<{ label: string; value: string }[]>(() =>
  (users.value || []).map((user) => ({
    label: user.name,
    value: user.id
  }))
)

const { mutate: createMutate } = useMutation<
  CreateRole,
  CreateRoleVariables
>(CREATE_ROLE)

const { mutate: updateMutation } = useMutation<UpdateRole, UpdateRoleVariables>(UPDATE_ROLE)

const formRef = ref<FormInstance>()

const { $apollo } = useNuxtApp()
const submitForm = async () => {
  await formRef.value?.validateFields()

  type Keys = keyof (UpdateRoleInput & CreateRoleInput)

  const getInput = (exclude: Keys[]) => {
    return Object.entries(toRaw(form.value)).reduce((acc, [key, value]) => {
      if (value && !exclude.includes(key as Keys)) {
        acc[key] = value
      }
      return acc
    }, {} as any)
  }

  if(form.value.id) {
    const _input = getInput(['project'])

    await updateMutation({
      input: _input
    })
  } else  {
    const _input = getInput(['id'])

    const data = await createMutate({
      input: _input
    })
    $apollo.defaultClient.writeQuery({
      query: GET_ROLES,
      variables: {
        filter: {
          project: route.params.id as string
        }
      },
      data: {
        roles: [...roles.value, data?.data?.createRole]
      }
    })
  }

  show.value = false
}

const open = (role?: GetRoles_roles) => {
  if (role) {
    form.value.name = role.name
    form.value.permissions = role.permissions
    form.value.user = role.user?.id || ''
    form.value.id = role.id
  } else {
    form.value = {
      name: '',
      permissions: [],
      project: route.params.id as string,
      user: ''
    }
  }
  show.value = true
}

defineExpose({
  open
})
</script>

<style scoped></style>
