/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRoleInput, PermissionEnum } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CreateRole
// ====================================================

export interface CreateRole_createRole_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
}

export interface CreateRole_createRole {
  __typename: "Role";
  id: string;
  name: string;
  permissions: PermissionEnum[];
  createdAt: number;
  user: CreateRole_createRole_user | null;
}

export interface CreateRole {
  createRole: CreateRole_createRole;
}

export interface CreateRoleVariables {
  input: CreateRoleInput;
}
