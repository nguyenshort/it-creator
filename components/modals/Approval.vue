<template>
  <a-modal v-model:visible="show" title="Thay Đổi Trạng Thái" @ok="handle">
    <ul class="flex flex-wrap">
      <li
        v-for="(item, index) in options"
        :key="index"
        class="mr-5 transform transition"
        :class="{
          'scale-95': form.active !== item.value
        }"
      >
        <div
          class="flex cursor-pointer items-center rounded-lg border-[2px] px-3 py-1.5 transition"
          :class="{
            'border-primary-500 bg-primary-100 text-white':
              form.active === item.value
          }"
          @click="form.active = item.value"
        >
          <span
            class="flex h-4 w-4 items-center justify-center rounded-full border"
          >
            <span
              class="h-2 w-2 transform rounded-full bg-primary-500 transition"
              :class="{
                'scale-0': form.active !== item.value
              }"
            ></span>
          </span>

          <span
            class="ml-2 transition"
            :class="[
              form.active === item.value
                ? 'font-semibold text-primary-600'
                : 'font-normal text-gray-600'
            ]"
          >
            {{ item.label }}
          </span>
        </div>
      </li>
    </ul>
  </a-modal>
</template>

<script lang="ts" setup>
import { APPROVE_PROJECT } from '~/apollo/server/mutations/projects.mutation'
import {
  ApproveProject,
  ApproveProjectVariables
} from '~/apollo/server/mutations/__generated__/ApproveProject'
import { ref, useMutation } from '#imports'
import {
  ApproveProjectInput,
  ProjectActive
} from '~/apollo/server/__generated__/serverTypes'
// Đổi trạng thái dự án
const show = ref(false)

const options = ref([
  {
    value: ProjectActive.ACTIVE,
    label: 'Hoạt Động'
  },
  {
    value: ProjectActive.DRAFT,
    label: 'Bản Nháp'
  },
  {
    value: ProjectActive.DISABLED,
    label: 'Bị Khóa'
  }
])

const form = ref<ApproveProjectInput>({
  id: '',
  active: ProjectActive.ACTIVE
})

const open = (project: ApproveProjectInput) => {
  form.value = JSON.parse(JSON.stringify(project))
  show.value = true
}

const { mutate, loading } = useMutation<
  ApproveProject,
  ApproveProjectVariables
>(APPROVE_PROJECT)

const handle = async () => {
  show.value = false
  await mutate({
    input: {
      id: form.value.id,
      active: form.value.active
    }
  })
}

defineExpose({
  open,
  loading
})
</script>

<style scoped></style>
