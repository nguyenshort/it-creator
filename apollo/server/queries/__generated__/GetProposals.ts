/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProposalsFilter, PermissionEnum, ProposalStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetProposals
// ====================================================

export interface GetProposals_proposals_role {
  __typename: "Role";
  id: string;
  name: string;
  permissions: PermissionEnum[];
}

export interface GetProposals_proposals_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
}

export interface GetProposals_proposals {
  __typename: "Proposal";
  id: string;
  letter: string;
  note: string;
  resume: string;
  role: GetProposals_proposals_role;
  status: ProposalStatus;
  updatedAt: number;
  user: GetProposals_proposals_user | null;
}

export interface GetProposals {
  proposals: GetProposals_proposals[];
}

export interface GetProposalsVariables {
  filter: GetProposalsFilter;
}
