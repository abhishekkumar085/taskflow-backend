import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";
import {
  assignTaskRepository,
  createTaskRepository,
  deleteTaskRepository,
  findTaskByIdRepository,
  getMyTasksRepository,
  getProjectTasksRepository,
  updateTaskRepository,
} from "./task.repository";
import { CreateTaskInput, UpdateTaskInput } from "./task.types";
import { findUserById } from "../auth/auth.repository";
import { ProjectMember } from "../../models";
import logger from "../../utils/logger";

export const createTaskService = async (
  payload: CreateTaskInput,
  userId: string,
) => {
  return createTaskRepository({
    ...payload,
    assigned_by: userId,
    created_by: userId,
  });
};

export const getProjectTasksService = async (projectId: string) => {
  return getProjectTasksRepository(projectId);
};

export const getMyTasksService = async (userId: string) => {
  return getMyTasksRepository(userId);
};

export const updateTaskService = async (
  taskId: string,
  payload: UpdateTaskInput,
) => {
  const task = await findTaskByIdRepository(taskId);
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Task not found");
  }
  return updateTaskRepository(taskId, payload);
};

export const updateTaskStatusService = async (
  taskId: string,
  status: "TODO" | "IN_PROGRESS" | "DONE",
) => {
  const task = await findTaskByIdRepository(taskId);
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Task not found");
  }

  return updateTaskRepository(taskId, { status });
};

export const deleteTaskService = async (taskId: string) => {
  return deleteTaskRepository(taskId);
};

export const assignTaskService = async (
  taskId: string,
  assigned_to: string,
  assigned_by: string,
) => {
  console.log("STEP 1");
  console.log("HIITIITIT SERVICES");
  logger.info("HIIIIIITITITIT");
  const task = await findTaskByIdRepository(taskId);
  console.log("TASK OBJECT:", JSON.stringify(task, null, 2));
  if (!task) throw new ApiError(StatusCodes.NOT_FOUND, "Task not found!");
  const user = await findUserById(assigned_to);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");

  const projectMember = await ProjectMember.findOne({
    where: { project_id: task.project_id, user_id: assigned_to },
  });
  if (!projectMember)
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "User does not belong to this project",
    );

  return assignTaskRepository(taskId, assigned_to, assigned_by);
};
