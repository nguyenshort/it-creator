<template>
  <a-modal
    v-model:visible="show"
    :title="$t('project.process.modal.title')"
    :confirm-loading="loading"
    @ok="submitHandle"
  >
    <a-form ref="formRef" layout="vertical" :model="form">
      <a-form-item
        :label="$t('project.process.modal.name')"
        name="name"
        :rules="[
          {
            required: true,
            message: 'Name is required',
            trigger: 'blur'
          }
        ]"
      >
        <a-input v-model:value="form.name" />
      </a-form-item>

      <a-form-item :label="$t('project.process.modal.status')" name="status">
        <a-select v-model:value="form.status">
          <a-select-option :value="StepStatus.WAITING">
            {{ $t('project.process.modal.waitting') }}
          </a-select-option>
          <a-select-option :value="StepStatus.DONE">
            {{ $t('project.process.modal.done') }}
          </a-select-option>
        </a-select>

        <template #extra>
          <p class="mb-0 mt-2 text-[11px]">
            Bước đang lamf là bước ngay sau bước hoàn thành.
          </p>
        </template>
      </a-form-item>

      <a-form-item :label="$t('project.process.modal.des')" name="content">
        <a-textarea
          v-model:value="form.content"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed, useMutation, useRoute } from '#imports'
import {
  CreateStepInput,
  StepStatus,
  UpdateStepInput
} from '~/apollo/server/__generated__/serverTypes'
import { CREATE_STEP, UPDATE_STEP } from '~/apollo/server/mutations/step.mutate'
import {
  CreateStep,
  CreateStepVariables
} from '~/apollo/server/mutations/__generated__/CreateStep'
import { GetSteps_steps } from '~/apollo/server/queries/__generated__/GetSteps'
import {
  UpdateStep,
  UpdateStepVariables
} from '~/apollo/server/mutations/__generated__/UpdateStep'

const route = useRoute()
const form = ref<Partial<CreateStepInput & UpdateStepInput>>({
  project: route.params.id as string
})

const show = ref(false)

const {
  mutate: createStep,
  loading: loadingCreate,
  onDone
} = useMutation<CreateStep, CreateStepVariables>(CREATE_STEP)

const { mutate: updateStep, loading: loadingUpdate } = useMutation<
  UpdateStep,
  UpdateStepVariables
>(UPDATE_STEP)

const loading = computed(() => loadingCreate.value || loadingUpdate.value)

const submitHandle = async () => {
  if (form.value.id) {
    await updateStep({
      input: {
        id: form.value.id,
        name: form.value.name!,
        content: form.value.content,
        status: form.value.status
      }
    })
  } else {
    await createStep({
      input: {
        name: form.value.name!,
        content: form.value.content,
        status: form.value.status,
        project: form.value.project!
      }
    })
  }
  show.value = false
}

const open = (doc?: GetSteps_steps) => {
  if (doc) {
    form.value = {
      id: doc.id,
      name: doc.name,
      content: doc.content,
      status: doc.status
    }
  } else {
    form.value = {
      project: route.params.id as string
    }
  }
  show.value = true
}

defineExpose({
  open
})
</script>

<style scoped></style>
