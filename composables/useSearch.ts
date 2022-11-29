import { Ref } from 'vue'
import {computed, isRef, ref} from "#imports";

export interface SearchTableOption {
    label: string
    value: string
}

type searchFn = (keyword: string, field: string) => void | Promise<void> | undefined

export interface SearchTableProps {
    options: SearchTableOption[] | Ref<SearchTableOption[]>
}

export const useSearchTable = (props: SearchTableProps) => {
    const options = computed(() => {
        return isRef(props.options) ? props.options.value : props.options
    })

    const field = ref<string>(options.value[0].value)
    const keyword = ref<string>('')

    return {
        options,
        field,
        keyword
    }
}
