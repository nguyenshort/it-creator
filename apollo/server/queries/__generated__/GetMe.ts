/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me {
  __typename: "User";
  id: string;
  name: string;
  role: UserRole;
  slug: string;
  createdAt: number;
  avatar: string | null;
}

export interface GetMe {
  me: GetMe_me;
}
