import e from "express";
import {
  addProjectMember,
  createProject,
  deleteProject,
  findAllProjects,
  findProjectById,
  findProjectMember,
  findRoleById,
  getProjectsByUserId,
  updateProject,
} from "./project.repository";
import {
  AddProjectMemberPayload,
  CreateProjectRepositoryInput,
} from "./project.types";
import ApiError from "../../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { findUserById } from "../auth/auth.repository";

export const createProjectService = async (
  payload: CreateProjectRepositoryInput,
  userId: string,
) => {
  return createProject({
    ...payload,
    created_by: userId,
  });
};

export const getAllProjectsService = async () => {
  return findAllProjects();
};

export const getProjectsByUserIdService = async (userId: string) => {
  return getProjectsByUserId(userId);
};

export const getProjectByIdService = async (id: string) => {
  return findProjectById(id);
};

export const updateProjectService = async (
  id: string,
  payload: Partial<CreateProjectRepositoryInput>,
) => {
  return updateProject(id, payload);
};

export const deleteProjectService = async (id: string) => {
  return deleteProject(id);
};

export const addProjectMemberService = async (
  projectId: string,
  payload: AddProjectMemberPayload,
  addedBy: string,
) => {
  const project = await findProjectById(projectId);
  if (!project) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Project not found");
  }

  const user = await findUserById(payload.user_id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const role = await findRoleById(payload.role_id);
  if (!role) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Role not found");
  }

  const existingMember = await findProjectMember(projectId, payload.user_id);
  if (existingMember) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "User already exists in project",
    );
  }
  const addMember = await addProjectMember({
    project_id: projectId,
    user_id: payload.user_id,
    role_id: payload.role_id,
    added_by: addedBy,
  });
  return addMember;
};
