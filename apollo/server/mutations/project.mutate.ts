import {gql} from "#imports";

export const CREATE_PROJECT = gql`
    mutation CreateProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            id
            slug
        }
    }
`


export const UPDATE_PROJECT_INFO = gql`
    mutation UpdateProjectInfo($input: UpdateProjectInput!) {
        updateProject(input: $input) {
            id
            category {
                id
            }
            logo
            content
            cover
            estimate
            name
            technologies {
                id
                name
            }
            files
        }
    }
`
