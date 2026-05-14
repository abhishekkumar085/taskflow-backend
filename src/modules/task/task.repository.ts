import { StatusCodes } from "http-status-codes";
import { Task } from "../../models";
import ApiError from "../../utils/ApiError";
import { CreateTaskInput, UpdateTaskInput } from "./task.types";

export const createTaskRepository = async (payload: CreateTaskInput) => {
  return Task.create(payload);
};

export const findTaskByIdRepository = async (taskId: string) => {
  return Task.findByPk(taskId);
};

export const getProjectTasksRepository = async (projectId: string) => {
  return Task.findAll({ where: { project_id: projectId } });
};

export const getMyTasksRepository = async (userId: string) => {
  return Task.findAll({ where: { assigned_to: userId } });
};

export const updateTaskRepository = async (
  taskId: string,
  payload: UpdateTaskInput,
) => {
  await Task.update(payload, { where: { id: taskId } });
  return findTaskByIdRepository(taskId);
};

export const deleteTaskRepository = async (taskId: string) => {
  const task = await findTaskByIdRepository(taskId);
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Task not found");
  }
  return task.destroy();
};
