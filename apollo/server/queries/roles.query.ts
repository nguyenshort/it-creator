export const GET_ROLES = gql`
    query GetRoles($filter: GetRolesInput!) {
        roles(filter: $filter) {
            id
            name
            permissions
            content
            group
            createdAt
            user {
                id
                name
                email
                avatar
            }
        }
    }
`
