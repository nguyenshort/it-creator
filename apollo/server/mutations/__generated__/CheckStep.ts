/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateStepInput, StepStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CheckStep
// ====================================================

export interface CheckStep_updateStep {
  __typename: "Step";
  id: string;
  status: StepStatus;
}

export interface CheckStep {
  updateStep: CheckStep_updateStep;
}

export interface CheckStepVariables {
  input: UpdateStepInput;
}
