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

export enum UserRole {
  ADMIN = "ADMIN",
  SP_ADMIN = "SP_ADMIN",
  USER = "USER",
}

export interface ApproveProjectInput {
  active: ProjectActive;
  id: string;
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

export interface StudioCountProjectsFilter {
  active?: ProjectActive[] | null;
  category?: string | null;
  name?: string | null;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
