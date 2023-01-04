/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortRolesInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: SortRole
// ====================================================

export interface SortRole_sortRoles {
  __typename: "Role";
  id: string;
  order: number;
}

export interface SortRole {
  sortRoles: SortRole_sortRoles[];
}

export interface SortRoleVariables {
  input: SortRolesInput;
}
