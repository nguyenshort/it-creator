export const GET_ROLES = gql`
    query GetRoles($filter: GetRolesInput!) {
        roles(filter: $filter) {
            id
            name
            permissions
            createdAt
            user {
                id
                name
                avatar
            }
        }
    }
`
