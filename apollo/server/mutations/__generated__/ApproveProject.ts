/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApproveProjectInput, ProjectActive } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: ApproveProject
// ====================================================

export interface ApproveProject_studioProjectApprove {
  __typename: "Project";
  id: string;
  active: ProjectActive;
}

export interface ApproveProject {
  studioProjectApprove: ApproveProject_studioProjectApprove;
}

export interface ApproveProjectVariables {
  input: ApproveProjectInput;
}
