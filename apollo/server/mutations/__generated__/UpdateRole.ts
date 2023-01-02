/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateRoleInput, PermissionEnum } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateRole
// ====================================================

export interface UpdateRole_updateRole_user {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  avatar: string | null;
}

export interface UpdateRole_updateRole {
  __typename: "Role";
  id: string;
  name: string;
  permissions: PermissionEnum[];
  content: string | null;
  user: UpdateRole_updateRole_user | null;
}

export interface UpdateRole {
  updateRole: UpdateRole_updateRole;
}

export interface UpdateRoleVariables {
  input: UpdateRoleInput;
}
