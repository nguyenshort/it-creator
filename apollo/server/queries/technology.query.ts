import gql from 'graphql-tag'

export const GET_TECHNOLOGIES = gql`
  query GetTechnologies($filter: GetTechnologiesFilter!) {
    technologies(filter: $filter) {
      id
      name
    }
  }
`
