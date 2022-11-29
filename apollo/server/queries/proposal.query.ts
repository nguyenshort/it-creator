import gql from 'graphql-tag'

export const VERIFY_PROJECT = gql`
  query VerifyProject($filter: GetProjectFilter!) {
    studioProject(filter: $filter) {
      id
      logo
      name
      active
    }
  }
`
