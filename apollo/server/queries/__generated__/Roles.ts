/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRolesInput, PermissionEnum } from "./../../__generated__/types";

// ====================================================
// GraphQL query operation: Roles
// ====================================================

export interface Roles_roles_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
}

export interface Roles_roles {
  __typename: "Role";
  id: string;
  name: string;
  order: number;
  permissions: PermissionEnum[];
  user: Roles_roles_user | null;
}

export interface Roles {
  roles: Roles_roles[];
}

export interface RolesVariables {
  filter: GetRolesInput;
}
