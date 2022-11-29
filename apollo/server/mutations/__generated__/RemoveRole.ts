/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveRoleInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: RemoveRole
// ====================================================

export interface RemoveRole_removeRole {
  __typename: "Role";
  id: string;
}

export interface RemoveRole {
  removeRole: RemoveRole_removeRole;
}

export interface RemoveRoleVariables {
  input: RemoveRoleInput;
}
