import { ref } from '#imports'
import {
  GetUsers,
  GetUsersVariables
} from '~/apollo/server/queries/__generated__/GetUsers'
import { GET_USERS } from '~/apollo/server/queries/user.query'

export const useUsers = () => {
  const filter = ref<GetUsersVariables>({
    filter: {
      name: '',
      offset: 0,
      limit: 10,
      sort: 'createdAt',
      exclude: []
    }
  })

  const { result, loading, onResult } = useQuery<GetUsers, GetUsersVariables>(
    GET_USERS,
    filter,
    {
      debounce: 300
    }
  )

  const users = computed(() => result.value?.users || [])

  return {
    users,
    loading,
    onResult,
    filter
  }
}
