/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRolesInput, PermissionEnum } from "./../../__generated__/types";

// ====================================================
// GraphQL query operation: GetRoles
// ====================================================

export interface GetRoles_roles_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
}

export interface GetRoles_roles {
  __typename: "Role";
  id: string;
  name: string;
  permissions: PermissionEnum[];
  createdAt: number;
  user: GetRoles_roles_user | null;
}

export interface GetRoles {
  roles: GetRoles_roles[];
}

export interface GetRolesVariables {
  filter: GetRolesInput;
}
