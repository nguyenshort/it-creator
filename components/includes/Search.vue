<template>
  <a-dropdown v-model:visible="openSearch" :trigger="['click']">
    <a class="ant-dropdown-link" @click.prevent>
      <search-outlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          <a-input-group compact>
            <a-select v-model:value="_field" style="width: 40%">
              <a-select-option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
            <a-input
                v-model:value="_keyword"
                style="width: 60%"
                placeholder="Keyword..."
                @press-enter="enterSearch"
            >
              <template #prefix>
                <search-outlined />
              </template>
            </a-input>
          </a-input-group>
        </a-menu-item>
        <a-menu-divider />

        <a-menu-item key="2">
          <div class="flex items-center">
            <a-button type="primary" size="small" block @click="emit('search')">
              Search
            </a-button>
            <div class="w-1 flex-shrink-0"></div>
            <a-button type="danger" size="small" block @click="cancelSearch">
              Cancel
            </a-button>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, watch } from 'vue'
import {SearchTableOption} from "~/composables/useSearch";

const props = defineProps<{
  options: SearchTableOption[]
  field: string
  keyword: string
}>()

const emit = defineEmits<{
  (e: 'update:field', value: typeof props.field): void
  (e: 'update:keyword', value: typeof props.keyword): void

  (e: 'change'): void
  (e: 'search'): void
  (e: 'cancel'): void
}>()

const _keyword = ref<typeof props.keyword>(props.keyword)
const _field = ref<typeof props.field>(props.field)

const openSearch = ref<boolean>(false)

watch([_keyword, _field], () => {
  emit('change')
  emit('update:keyword', _keyword.value)
  emit('update:field', _field.value)
})

const enterSearch = () => {
  emit('search')
  openSearch.value = false
}
const cancelSearch = () => {
  openSearch.value = false
  _keyword.value = ''
  _field.value = ''
  emit('cancel')
}
</script>
