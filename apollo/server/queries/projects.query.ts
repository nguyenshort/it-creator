import { gql } from '#imports'

export const GET_PROJECTS = gql`
  query GetProjects($filter: GetMyProjectsFilter!) {
    studioProjects(filter: $filter) {
      id
      name
      active
      status
      createdAt
      slug
      category {
        id
        name
        slug
      }
      roles {
        id
        name
        permissions
        user {
          id
          name
          slug
        }
      }
    }
  }
`

export const COUNT_PROJECTS = gql`
  query CountProjects($filter: StudioCountProjectsFilter!) {
    studioProjectsCount(filter: $filter)
  }
`

export const GET_PROJECT_INFO = gql`
  query GetProjectInfo($filter: GetProjectFilter!) {
    studioProject(filter: $filter) {
      id
      category {
        id
      }
        owner {
            id
            name
            email
            avatar
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
      link
      enterprise
      status
    }
  }
`
