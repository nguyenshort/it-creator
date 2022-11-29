/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PermissionEnum {
  CREATE_ROLE = "CREATE_ROLE",
  REMOVE_PROJECT = "REMOVE_PROJECT",
  REMOVE_ROLE = "REMOVE_ROLE",
  UPDATE_PROJECT = "UPDATE_PROJECT",
  UPDATE_ROLE = "UPDATE_ROLE",
}

export enum ProjectActive {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
  DRAFT = "DRAFT",
}

export enum ProjectStatus {
  DONE = "DONE",
  PREPARE = "PREPARE",
  RUNNING = "RUNNING",
  STUCK = "STUCK",
}

export enum ProposalStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  WAITING = "WAITING",
}

export enum StepStatus {
  DONE = "DONE",
  WAITING = "WAITING",
}

export enum UserRole {
  ADMIN = "ADMIN",
  SP_ADMIN = "SP_ADMIN",
  USER = "USER",
}

export interface ApproveProjectInput {
  active: ProjectActive;
  id: string;
}

export interface CheckProposalInput {
  id: string;
  note?: string | null;
  status: ProposalStatus;
}

export interface CreateProjectInput {
  category: string;
  content?: string | null;
  cover: string;
  estimate: number[];
  files?: string[] | null;
  link?: string | null;
  logo?: string | null;
  name: string;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

export interface CreateRoleInput {
  name: string;
  permissions: PermissionEnum[];
  project: string;
  user?: string | null;
}

export interface CreateStepInput {
  content?: string | null;
  name: string;
  project: string;
  status?: StepStatus | null;
}

export interface GetMyProjectsFilter {
  active?: ProjectActive[] | null;
  category?: string | null;
  limit: number;
  name?: string | null;
  offset: number;
  sort: string;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

export interface GetProjectFilter {
  id: string;
}

export interface GetProposalsFilter {
  project: string;
}

export interface GetRolesInput {
  project: string;
}

export interface GetStepsFilter {
  project: string;
}

export interface GetTechnologiesFilter {
  limit: number;
  name?: string | null;
  offset: number;
}

export interface GetUsersFilter {
  exclude?: string[] | null;
  limit: number;
  name?: string | null;
  offset: number;
  sort: string;
}

export interface RemoveProjectInput {
  id: string;
}

export interface RemoveRoleInput {
  id: string;
}

export interface RemoveStepInput {
  id: string;
}

export interface SortStepsInput {
  steps: string[];
}

export interface StudioCountProjectsFilter {
  active?: ProjectActive[] | null;
  category?: string | null;
  name?: string | null;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

export interface UpdateProjectInput {
  category?: string | null;
  content?: string | null;
  cover?: string | null;
  estimate?: number[] | null;
  files?: string[] | null;
  id: string;
  link?: string | null;
  logo?: string | null;
  name?: string | null;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

export interface UpdateRoleInput {
  id: string;
  name?: string | null;
  permissions?: PermissionEnum[] | null;
  user?: string | null;
}

export interface UpdateStepInput {
  content?: string | null;
  id: string;
  name?: string | null;
  status?: StepStatus | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
