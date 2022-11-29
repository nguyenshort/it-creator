/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetProjectInfo
// ====================================================

export interface GetProjectInfo_studioProject_category {
  __typename: "Category";
  id: string;
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
  logo: string | null;
  content: string | null;
  cover: string;
  estimate: number[];
  name: string;
  technologies: GetProjectInfo_studioProject_technologies[];
  files: string[];
}

export interface GetProjectInfo {
  studioProject: GetProjectInfo_studioProject;
}

export interface GetProjectInfoVariables {
  filter: GetProjectFilter;
}
