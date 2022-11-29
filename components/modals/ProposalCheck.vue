<template>
  <a-modal
    v-model:visible="show"
    title="Thay Đổi"
    :confirm-loading="loadingCheck"
    @ok="
      checkProposal({
        input: form
      })
    "
  >
    <ul class="flex flex-wrap">
      <li
        v-for="(item, index) in options"
        :key="index"
        class="mr-5 transform transition"
        :class="{
          'scale-95': form.status !== item.value
        }"
      >
        <div
          class="flex cursor-pointer items-center rounded-lg border-[2px] px-3 py-1.5 transition"
          :class="{
            'border-primary-500 bg-primary-100 text-white':
              form.status === item.value
          }"
          @click="form.status = item.value"
        >
          <span
            class="flex h-4 w-4 items-center justify-center rounded-full border"
          >
            <span
              class="h-2 w-2 transform rounded-full bg-primary-500 transition"
              :class="{
                'scale-0': form.status !== item.value
              }"
            ></span>
          </span>

          <span
            class="ml-2 transition"
            :class="[
              form.status === item.value
                ? 'font-semibold text-primary-600'
                : 'font-normal text-gray-600'
            ]"
          >
            {{ item.label }}
          </span>
        </div>
      </li>
    </ul>

    <div>
      <h4>Note:</h4>
      <a-textarea
        v-model:value="form.note"
        placeholder="Autosize height with minimum and maximum number of lines"
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, useMutation } from '#imports'
import {
  CheckProposalInput,
  ProposalStatus
} from '~/apollo/server/__generated__/serverTypes'
import {
  CheckProposal,
  CheckProposalVariables
} from '~/apollo/server/mutations/__generated__/CheckProposal'
import { CHECK_PROPOSAL } from '~/apollo/server/mutations/proposal.mutate'

const show = ref(false)

const form = ref<CheckProposalInput>({
  id: '',
  status: ProposalStatus.WAITING,
  note: ''
})

const options = ref([
  {
    value: ProposalStatus.WAITING,
    label: 'Waiting'
  },
  {
    value: ProposalStatus.APPROVED,
    label: 'Approved'
  },
  {
    value: ProposalStatus.REJECTED,
    label: 'Rejected'
  }
])

const { mutate: checkProposal, loading: loadingCheck } = useMutation<
  CheckProposal,
  CheckProposalVariables
>(CHECK_PROPOSAL)

const open = (proposal: CheckProposalInput) => {
  form.value = proposal
  show.value = true
}

defineExpose({
  open
})
</script>

<style scoped></style>
