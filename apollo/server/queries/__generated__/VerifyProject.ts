/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetProjectFilter, ProjectActive } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: VerifyProject
// ====================================================

export interface VerifyProject_studioProject {
  __typename: "Project";
  id: string;
  logo: string | null;
  name: string;
  active: ProjectActive;
}

export interface VerifyProject {
  studioProject: VerifyProject_studioProject;
}

export interface VerifyProjectVariables {
  filter: GetProjectFilter;
}
