/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateStepInput, StepStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CreateStep
// ====================================================

export interface CreateStep_createStep {
  __typename: "Step";
  id: string;
  name: string;
  content: string;
  status: StepStatus;
}

export interface CreateStep {
  createStep: CreateStep_createStep;
}

export interface CreateStepVariables {
  input: CreateStepInput;
}
