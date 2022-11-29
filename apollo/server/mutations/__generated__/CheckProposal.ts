/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckProposalInput, ProposalStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CheckProposal
// ====================================================

export interface CheckProposal_checkProposal {
  __typename: "Proposal";
  id: string;
  note: string;
  status: ProposalStatus;
}

export interface CheckProposal {
  checkProposal: CheckProposal_checkProposal;
}

export interface CheckProposalVariables {
  input: CheckProposalInput;
}
