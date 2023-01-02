/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectFilter, ProjectStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetProjectInfo
// ====================================================

export interface GetProjectInfo_studioProject_category {
  __typename: "Category";
  id: string;
}

export interface GetProjectInfo_studioProject_owner {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  avatar: string | null;
}

export interface GetProjectInfo_studioProject_technologies {
  __typename: "Technology";
  id: string;
  name: string;
}

export interface GetProjectInfo_studioProject {
  __typename: "Project";
  id: string;
  category: GetProjectInfo_studioProject_category;
  owner: GetProjectInfo_studioProject_owner;
  logo: string | null;
  content: string | null;
  cover: string;
  estimate: number[];
  name: string;
  technologies: GetProjectInfo_studioProject_technologies[];
  files: string[];
  link: string | null;
  enterprise: boolean | null;
  status: ProjectStatus;
}

export interface GetProjectInfo {
  studioProject: GetProjectInfo_studioProject;
}

export interface GetProjectInfoVariables {
  filter: GetProjectFilter;
}
