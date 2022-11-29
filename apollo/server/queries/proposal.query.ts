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

export const GET_PROPOSALS = gql`
  query GetProposals($filter: GetProposalsFilter!) {
    proposals(filter: $filter) {
      id
      letter
      note
      resume
      role {
        id
        name
        permissions
      }
      status
      updatedAt
      user {
        id
        name
        avatar
      }
    }
  }
`
