export const CREATE_STEP = gql`
    mutation CreateStep($input: CreateStepInput!) {
        createStep(input: $input) {
            id
            name
            content
            status
        }
    }
`

export const CHECK_STEP = gql`
    mutation CheckStep($input: UpdateStepInput!) {
        updateStep(input: $input) {
            id
            status
        }
    }
`

export const UPDATE_STEP = gql`
    mutation UpdateStep($input: UpdateStepInput!) {
        updateStep(input: $input) {
            id
            name
            content
            status
        }
    }
`

export const SORT_STEPS = gql`
    mutation SortSteps($input: SortStepsInput!) {
        sortSteps(input: $input) {
            id
            order
            status
        }
    }
`

export const REMOVE_STEP = gql`
    mutation RemoveStep($input: RemoveStepInput!) {
        removeStep(input: $input) {
            id
        }
    }
`
