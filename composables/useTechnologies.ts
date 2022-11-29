import {computed, ref, useQuery} from '#imports'
import {
  GetTechnologies,
  GetTechnologiesVariables
} from '~/apollo/server/queries/__generated__/GetTechnologies'
import { GET_TECHNOLOGIES } from '~/apollo/server/queries/technology.query'

export const useTechnologies = () => {
  const filter = ref<GetTechnologiesVariables>({
    filter: {
      name: '',
      limit: 10,
      offset: 0
    }
  })

  const { result, loading } = useQuery<GetTechnologies>(
    GET_TECHNOLOGIES,
    filter
  )

  const technologies = computed(() => result.value?.technologies || [])

  const options = computed(() =>
    technologies.value.map((e) => ({
      label: e.name,
      value: e.id
    }))
  )

  return {
    filter,
    loading,
    technologies,
    options
  }
}
