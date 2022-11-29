import { computed, useQuery } from '#imports'
import {
  GetRoles,
  GetRolesVariables
} from '~/apollo/server/queries/__generated__/GetRoles'
import { GET_ROLES } from '~/apollo/server/queries/roles.query'

export const useRoles = (id: string) => {

  const { result, loading } = useQuery<GetRoles, GetRolesVariables>(GET_ROLES, {
    filter: {
      project: id
    }
  })
  const roles = computed(() => result.value?.roles || [])

  return {
    roles,
    loading
  }
}
