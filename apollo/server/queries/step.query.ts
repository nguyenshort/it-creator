export const GET_STEPS = gql`
    query GetSteps($filter: GetStepsFilter!) {
        steps(filter: $filter) {
            id
            name
            content
            status
            order
        }
    }
`
