import { computed, useQuery } from '#imports'
import {
  GetRoles, GetRoles_roles,
  GetRolesVariables
} from "~/apollo/server/queries/__generated__/GetRoles";
import { GET_ROLES } from '~/apollo/server/queries/roles.query'

export const useRoles = (id: string) => {

  const { result, loading } = useQuery<GetRoles, GetRolesVariables>(GET_ROLES, {
    filter: {
      project: id
    }
  })
  const roles = computed(() => Object.values((result.value?.roles || [])).sort((a, b) => a.order - b.order))

  const positions = computed(() => {
    const groups = roles.value.reduce((acc, role) => {
      const key = role.group || 0;
      if (!acc[key]) acc[key] = [];
      acc[key].push(role as any);
      return acc;
    }, {} as Record<number, GetRoles_roles[]>);

    return Object.values(groups);
  })

  return {
    roles,
    loading,
    positions
  }
}
