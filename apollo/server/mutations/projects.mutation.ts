import {gql} from "#imports";

export const REMOVE_PROJECT = gql`
    mutation RemoveProject($input: RemoveProjectInput!) {
        removeProject(input: $input) {
            id
        }
    }
`


export const APPROVE_PROJECT = gql`
    mutation ApproveProject($input: ApproveProjectInput!) {
        studioProjectApprove(input: $input) {
            id
            active
        }
    }
`
