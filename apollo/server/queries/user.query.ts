import gql from 'graphql-tag'

export const USER_DOCUMENT = gql`
  fragment UserDoc on User {
    id
    name
    avatar
  }
`

export const GET_USERS = gql`

  fragment UserDoc on User {
    id
    name
    avatar
  }
  
  query GetUsers($filter: GetUsersFilter!) {
    users(filter: $filter) {
      ...UserDoc
    }
  }
`
