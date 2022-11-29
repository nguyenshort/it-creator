/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveStepInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: RemoveStep
// ====================================================

export interface RemoveStep_removeStep {
  __typename: "Step";
  id: string;
}

export interface RemoveStep {
  removeStep: RemoveStep_removeStep;
}

export interface RemoveStepVariables {
  input: RemoveStepInput;
}
