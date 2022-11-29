import gql from 'graphql-tag'

export const SUB_NOTIFY = gql`
    subscription SubNotify {
        subNotify {
            msg
            error
        }
    }
`
