/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveProjectInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: RemoveProject
// ====================================================

export interface RemoveProject_removeProject {
  __typename: "Project";
  id: string;
}

export interface RemoveProject {
  removeProject: RemoveProject_removeProject;
}

export interface RemoveProjectVariables {
  input: RemoveProjectInput;
}
