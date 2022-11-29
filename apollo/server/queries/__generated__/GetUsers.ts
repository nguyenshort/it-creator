/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUsersFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
}

export interface GetUsers {
  users: GetUsers_users[];
}

export interface GetUsersVariables {
  filter: GetUsersFilter;
}
