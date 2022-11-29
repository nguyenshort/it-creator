/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortStepsInput, StepStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: SortSteps
// ====================================================

export interface SortSteps_sortSteps {
  __typename: "Step";
  id: string;
  order: number;
  status: StepStatus;
}

export interface SortSteps {
  sortSteps: SortSteps_sortSteps[];
}

export interface SortStepsVariables {
  input: SortStepsInput;
}
