/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetStepsFilter, StepStatus } from "./../../__generated__/types";

// ====================================================
// GraphQL query operation: Steps
// ====================================================

export interface Steps_steps {
  __typename: "Step";
  id: string;
  name: string;
  content: string;
  status: StepStatus;
}

export interface Steps {
  steps: Steps_steps[];
}

export interface StepsVariables {
  filter: GetStepsFilter;
}
