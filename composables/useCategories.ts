import { computed, useLazyAsyncQuery } from '#build/imports'
import { GetCategories } from '~/apollo/server/queries/__generated__/GetCategories'
import { GET_CATEGORIES } from '~/apollo/server/queries/categories.query'

export const useCategories = () => {
  const { data, pending } = useLazyAsyncQuery<GetCategories>(GET_CATEGORIES)

  const categories = computed(() => data.value?.categories || [])

  const options = computed(() =>
    categories.value.map((e) => ({
      label: e.name,
      value: e.id
    }))
  )

  return {
    categories,
    options,
    pending
  }
}
