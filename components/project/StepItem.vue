<template>
  <div
    class="cutsom-shadow step-item relative flex cursor-pointer items-start rounded-lg bg-white py-3 px-5"
  >
    <div
      class="border-lg mr-2 flex h-[30px] w-[30px] flex-shrink-0 transform cursor-pointer items-center justify-center rounded-full border text-[18px] transition"
      :class="{
        'scale-90 bg-gray-100': StepStatus.WAITING === step.status,
        'border-primary-500 bg-primary-500 text-white':
          StepStatus.DONE === step.status
      }"
      @click="
        checkStep({
          input: {
            id: step.id,
            status: StepStatus.DONE
          }
        })
      "
    >
      <Icon
        name="material-symbols:check-small"
        class="transform transition"
        :class="{
          'scale-0 opacity-0': step.status === StepStatus.WAITING
        }"
      />
    </div>

    <div class="ml-1.5">
      <h3 class="mb-0 text-[18px]">{{ step.name }}</h3>
      <p class="mb-0 text-[12px] text-gray-500 line-clamp-2">
        {{ step.content }}
      </p>
    </div>

    <button
      class="delete-btn absolute right-[50px] top-3 flex h-[22px] w-[22px] items-center justify-center rounded-md bg-primary-500 text-white shadow-lg shadow-primary-200"
      :disabled="deleting"
      @click="emitter('edit')"
    >
      <Icon name="mdi:lead-pencil" />
    </button>

    <a-popconfirm
      title="Are you sure delete this task?"
      ok-text="Yes"
      cancel-text="No"
      @confirm="
        deleteHandle({
          input: {
            id: step.id
          }
        })
      "
    >
      <button
        class="delete-btn absolute right-5 top-3 flex h-[22px] w-[22px] items-center justify-center rounded-md bg-rose-500 text-white shadow-lg shadow-rose-200"
        :disabled="deleting"
      >
        <Icon name="material-symbols:close" />
      </button>
    </a-popconfirm>
  </div>
</template>

<script lang="ts" setup>
import { useMutation, useNuxtApp, useRouter, useEventBus } from '#imports'
import { GetSteps_steps } from '~/apollo/server/queries/__generated__/GetSteps'
import {
  CheckStep,
  CheckStepVariables
} from '~/apollo/server/mutations/__generated__/CheckStep'
import { CHECK_STEP, REMOVE_STEP } from "~/apollo/server/mutations/step.mutate";
import { GET_STEPS } from '~/apollo/server/queries/step.query'
import { StepStatus } from '~/apollo/server/__generated__/serverTypes'
import { RemoveRole, RemoveRoleVariables } from "~/apollo/server/mutations/__generated__/RemoveRole";

const props = defineProps<{
  step: GetSteps_steps
}>()

const router = useRouter()
const { $apollo } = useNuxtApp()

const emitter = defineEmits<{
  (event: 'edit'): void
}>()

// Check Step
const { mutate: checkStep, onDone } = useMutation<
  CheckStep,
  CheckStepVariables
>(CHECK_STEP)

onDone((val) => {
  if (val.data?.updateStep) {
    const cache = $apollo.defaultClient.readQuery({
      query: GET_STEPS,
      variables: {
        filter: {
          project: router.currentRoute.value.params.id as string
        }
      }
    })
    // check lai
    if (cache?.steps) {
      cache.steps.forEach((_step: GetSteps_steps) => {
        $apollo.defaultClient.cache.modify({
          id: $apollo.defaultClient.cache.identify({
            __typename: 'Step',
            id: _step.id
          }),
          fields: {
            status() {
              return props.step.order >= _step.order
                ? StepStatus.DONE
                : StepStatus.WAITING
            }
          }
        })
      })
    }
  }
})

// delete step
const {
  mutate: deleteHandle,
  loading: deleting,
  onDone: afterDelete
} = useMutation<RemoveRole, RemoveRoleVariables>(REMOVE_STEP)
afterDelete(() => {
  $apollo.defaultClient.cache.evict({
    id: $apollo.defaultClient.cache.identify({
      __typename: 'Step',
      id: props.step.id
    })
  })
})

</script>

<style scoped>
.step-item:hover .delete-btn {
  opacity: 1;
  transform: scale(1);
}
.step-item .delete-btn {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: scale(0.7);
}

.step-item .delete-btn:hover {
  transform: scale(1.1);
}
</style>
