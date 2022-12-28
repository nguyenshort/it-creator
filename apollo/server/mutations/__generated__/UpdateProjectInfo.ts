/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProjectInput, ProjectStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateProjectInfo
// ====================================================

export interface UpdateProjectInfo_updateProject_category {
  __typename: "Category";
  id: string;
}

export interface UpdateProjectInfo_updateProject_technologies {
  __typename: "Technology";
  id: string;
  name: string;
}

export interface UpdateProjectInfo_updateProject {
  __typename: "Project";
  id: string;
  category: UpdateProjectInfo_updateProject_category;
  logo: string | null;
  content: string | null;
  cover: string;
  estimate: number[];
  name: string;
  technologies: UpdateProjectInfo_updateProject_technologies[];
  files: string[];
  enterprise: boolean | null;
  link: string | null;
  status: ProjectStatus;
}

export interface UpdateProjectInfo {
  updateProject: UpdateProjectInfo_updateProject;
}

export interface UpdateProjectInfoVariables {
  input: UpdateProjectInput;
}
