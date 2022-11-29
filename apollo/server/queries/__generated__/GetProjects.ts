/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetMyProjectsFilter, ProjectActive, ProjectStatus, PermissionEnum } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetProjects
// ====================================================

export interface GetProjects_studioProjects_category {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
}

export interface GetProjects_studioProjects_roles_user {
  __typename: "User";
  id: string;
  name: string;
  slug: string;
}

export interface GetProjects_studioProjects_roles {
  __typename: "Role";
  id: string;
  name: string;
  permissions: PermissionEnum[];
  user: GetProjects_studioProjects_roles_user | null;
}

export interface GetProjects_studioProjects {
  __typename: "Project";
  id: string;
  name: string;
  active: ProjectActive;
  status: ProjectStatus;
  createdAt: number;
  slug: string;
  category: GetProjects_studioProjects_category;
  roles: GetProjects_studioProjects_roles[];
}

export interface GetProjects {
  studioProjects: GetProjects_studioProjects[];
}

export interface GetProjectsVariables {
  filter: GetMyProjectsFilter;
}
