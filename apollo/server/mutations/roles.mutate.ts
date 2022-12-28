export const CREATE_ROLE = gql`
    mutation CreateRole($input: CreateRoleInput!) {
        createRole(input: $input) {
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

export const UPDATE_ROLE = gql`
    mutation UpdateRole($input: UpdateRoleInput!) {
        updateRole(input: $input) {
            id
            name
            permissions
            content
            user {
                id
                name
                email
                avatar
            }
        }
    }
`

export const REMOVE_ROLE = gql`
    mutation RemoveRole($input: RemoveRoleInput!) {
        removeRole(input: $input) {
            id
        }
    }
`
