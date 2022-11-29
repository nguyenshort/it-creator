/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateStepInput, StepStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateStep
// ====================================================

export interface UpdateStep_updateStep {
  __typename: "Step";
  id: string;
  name: string;
  content: string;
  status: StepStatus;
}

export interface UpdateStep {
  updateStep: UpdateStep_updateStep;
}

export interface UpdateStepVariables {
  input: UpdateStepInput;
}
