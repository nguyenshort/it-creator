export const CHECK_PROPOSAL = gql`
  mutation CheckProposal($input: CheckProposalInput!) {
    checkProposal(input: $input) {
      id
      note
      status
    }
  }
`
