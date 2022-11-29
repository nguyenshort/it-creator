/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetStepsFilter, StepStatus } from "./../../__generated__/types";

// ====================================================
// GraphQL query operation: GetSteps
// ====================================================

export interface GetSteps_steps {
  __typename: "Step";
  id: string;
  name: string;
  content: string;
  status: StepStatus;
  order: number;
}

export interface GetSteps {
  steps: GetSteps_steps[];
}

export interface GetStepsVariables {
  filter: GetStepsFilter;
}
