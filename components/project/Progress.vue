<template>
  <div>
    <div v-if="steps.length" class="flex">
      <div class="max-w-[600px] w-full flex-shrink-0">
        <draggable v-model="steps" item-key="id" group="steps">
          <template #item="{ element }">
            <project-step-item
              :step="element"
              class="mb-5 last:mb-0"
              @edit="modalRef?.open(element)"
            />
          </template>
        </draggable>
      </div>
    </div>

    <div v-else class="py-10 pt-10 text-center">
      <div style="width: 300px; height: 250px" class="mx-auto">
        <vue-lottie-player
          width="300px"
          height="250px"
          loop
          path="https://assets5.lottiefiles.com/packages/lf20_dsxct2el.json"
        />
        <div class="text-[11px] text-gray-400">...</div>
      </div>
    </div>

    <modals-step-form ref="modalRef" />

  </div>
</template>

<script lang="ts" setup>
import { useRoute, useQuery, watch, ref, nextTick } from "#imports";
import {
  GetSteps,
  GetSteps_steps,
  GetStepsVariables
} from '~/apollo/server/queries/__generated__/GetSteps'
import { GET_STEPS } from '~/apollo/server/queries/step.query'

const route = useRoute()

const { result } = useQuery<GetSteps, GetStepsVariables>(GET_STEPS, {
  filter: {
    project: route.params.id as string
  }
})

const steps = ref<GetSteps_steps[]>([])

watch(
  result,
  (val) => {
    if (val?.steps) {
      nextTick(() => {
        steps.value = JSON.parse(JSON.stringify(val.steps))
      })
    }
  },
  { immediate: true }
)

const modalRef = ref()
</script>

<style scoped></style>
