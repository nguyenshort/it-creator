/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProposalsFilter, PermissionEnum, ProposalEnum } from "./../../__generated__/types";

// ====================================================
// GraphQL query operation: Proposals
// ====================================================

export interface Proposals_proposals_role {
  __typename: "Role";
  id: string;
  name: string;
  permissions: PermissionEnum[];
}

export interface Proposals_proposals_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
}

export interface Proposals_proposals {
  __typename: "Proposal";
  id: string;
  letter: string;
  note: string;
  resume: string;
  role: Proposals_proposals_role;
  status: ProposalEnum;
  updatedAt: number;
  user: Proposals_proposals_user | null;
}

export interface Proposals {
  proposals: Proposals_proposals[];
}

export interface ProposalsVariables {
  filter: GetProposalsFilter;
}
