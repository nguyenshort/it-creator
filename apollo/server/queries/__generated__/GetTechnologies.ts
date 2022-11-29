/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetTechnologiesFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetTechnologies
// ====================================================

export interface GetTechnologies_technologies {
  __typename: "Technology";
  id: string;
  name: string;
}

export interface GetTechnologies {
  technologies: GetTechnologies_technologies[];
}

export interface GetTechnologiesVariables {
  filter: GetTechnologiesFilter;
}
