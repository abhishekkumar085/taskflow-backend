import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";
import {
  createTaskRepository,
  deleteTaskRepository,
  findTaskByIdRepository,
  getMyTasksRepository,
  getProjectTasksRepository,
  updateTaskRepository,
} from "./task.repository";
import { CreateTaskInput, UpdateTaskInput } from "./task.types";

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
