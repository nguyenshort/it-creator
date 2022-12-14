<template>
  <a-modal v-model:visible="show" :title="$t('project.members.modal.title')" @ok="submitForm">

<!--    <div-->
<!--      v-if="form.id"-->
<!--      class="text-white bg-primary-500 px-3 py-1 rounded mb-3"-->
<!--    >-->
<!--      Adjusting role will create a new role independenly-->
<!--    </div>-->

    <a-form ref="formRef" layout="vertical" :model="form">
      <a-form-item
        name="name"
        :label="$t('project.members.modal.name')"
        :rules="[
          {
            required: true,
            message: 'Can not be empty',
            trigger: 'blur'
          }
        ]"
      >
        <a-input v-model:value="form.name" placeholder="" />
      </a-form-item>

      <a-form-item name="permissions" :label="$t('project.members.modal.permissions')">
        <a-checkbox-group v-model:value="form.permissions" style="width: 100%">
          <a-row>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.UPDATE_PROJECT">
                <span>
                  {{ $t('project.permissions.updateProject') }}
                </span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.REMOVE_PROJECT">
                <span>
                  {{ $t('project.permissions.removeProject') }}
                </span>
              </a-checkbox>
            </a-col>

            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.CREATE_ROLE">
                <span>
                  {{ $t('project.permissions.createRole') }}
                </span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.UPDATE_ROLE">
                <span>
                  {{ $t('project.permissions.updateRole') }}
                </span>
              </a-checkbox>
            </a-col>
            <a-col :span="8" class="mb-1.5">
              <a-checkbox :value="PermissionEnum.REMOVE_ROLE">
                <span>
                  {{ $t('project.permissions.removeRole') }}
                </span>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>

      <a-form-item
        v-if="!form.id"
        name="content"
        :label="$t('project.members.modal.count')"
      >
        <a-input-number v-model:value="form.count" :min="1" placeholder="" class="!w-full" />
      </a-form-item>

      <a-form-item
        name="content"
        :label="$t('project.members.modal.des')"
      >
        <a-textarea v-model:value="form.content" placeholder="" />
      </a-form-item>

      <a-form-item
        v-if="form.id"
        name="user"
        :label="$t('project.members.modal.user')"
      >

        <div v-if="currentUser" class="flex items-center">
          <a-avatar size="large" :src="$cdn(currentUser.avatar)" />
          <div class="ml-2">
            <h4 class="mb-0">{{ currentUser.name }}</h4>
            <h5 class="text-[12px] text-gray-500">{{ currentUser.email }}</h5>
          </div>

          <button
            class="ml-auto bg-rose-500 w-7 h-7 text-white rounded-full flex items-center justify-center shadow shadow-rose-300"
            @click="removeUser"
          >
            <Icon name="material-symbols:delete-outline-rounded" />
          </button>

        </div>

        <div v-else>
          <a-input
            v-model:value="keyword.filter.email"
            placeholder="Email..."
          >
            <template #prefix>
              <div class="mr-2">
                <Icon v-if="loading" name="line-md:loading-twotone-loop" />
                <Icon v-else name="ic:sharp-alternate-email" />
              </div>
            </template>
          </a-input>
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
  useMutation,
  toRaw,
  useNuxtApp,
  useQuery,
  reactive
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
import { GetRoles_roles } from "~/apollo/server/queries/__generated__/GetRoles";
import { UpdateRole, UpdateRoleVariables } from "~/apollo/server/mutations/__generated__/UpdateRole";
import { GET_ROLES } from "~/apollo/server/queries/roles.query";
import { GET_USERS } from "~/apollo/server/queries/user.query";
import { GetUsers, GetUsersVariables } from "~/apollo/server/queries/__generated__/GetUsers";

const route = useRoute()
const show = ref(false)

const form = ref<Partial<UpdateRoleInput & CreateRoleInput>>({
  name: '',
  permissions: [],
  project: route.params.id as string,
  content: '',
  count: 1
})

const { roles } = useRoles(route.params.id as string)

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
    const _input = getInput(['project', 'count'])

    await updateMutation({
      input: _input
    })
  } else  {
    const data = await createMutate({
      input: {
        name: form.value.name as string,
        permissions: form.value.permissions as PermissionEnum[],
        project: form.value.project as string,
        content: form.value.content as string,
        count: form.value.count as number
      }
    })
    if(data?.data?.createRole) {
      $apollo.defaultClient.writeQuery({
        query: GET_ROLES,
        variables: {
          filter: {
            project: route.params.id as string
          }
        },
        data: {
          roles: [...roles.value, ...data.data.createRole]
        }
      })
    }
  }

  show.value = false
}

const keyword = reactive<GetUsersVariables>({
  filter: {
    email: '',
    sort: 'name',
    offset: 0,
    limit: 1
  }
})


const open = (role?: GetRoles_roles) => {

  keyword.filter.email = ''
  isNoUser.value = true
  currentUser.value = undefined
  form.value.user = ''

  if (role) {
    form.value.id = role.id
    form.value.name = role.name
    form.value.content = role.content
    form.value.permissions = role.permissions
    form.value.user = role.user?.id || ''

    if(role.user) {
      currentUser.value = role.user
    }
  } else {
    form.value = {
      name: '',
      permissions: [],
      project: route.params.id as string,
      content: '',
      count: 1
    }
  }
  show.value = true
}

// Ti??m ki???m th??nh vi??n
const currentUser = ref<GetUsers['users'][0]>()
const isNoUser = ref(false)

const { loading, onResult } = useQuery<GetUsers, GetUsersVariables>(GET_USERS, keyword, { debounce: 300 })

onResult((data) => {
  if(keyword.filter.email) {
    const user = data?.data.users[0]
    if (user) {
      if(roles.value.findIndex(role => role.user?.id === user.id) !== -1) {
        isNoUser.value = true
        currentUser.value = undefined
        form.value.user = ''
      } else {
        isNoUser.value = false
        currentUser.value = user
        form.value.user = user.id
      }
    } else {
      isNoUser.value = true
      currentUser.value = undefined
      form.value.user = ''
    }
  }
})

const removeUser = () => {
  currentUser.value = undefined
  form.value.user = ''
  keyword.filter.email = ''
}

defineExpose({
  open
})
</script>

<style scoped></style>
