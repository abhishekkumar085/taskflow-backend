import { StatusCodes } from "http-status-codes";
import { Task } from "../../models";
import ApiError from "../../utils/ApiError";
import { CreateTaskInput, UpdateTaskInput } from "./task.types";

export const createTaskRepository = async (payload: CreateTaskInput) => {
  return Task.create(payload);
};

export const findTaskByIdRepository = async (taskId: string) => {
  const task = await Task.findByPk(taskId);
  console.log("TASK OBJECT:", JSON.stringify(task, null, 2));
  console.dir(task, { depth: null });
  return task;
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

export const assignTaskRepository = async (
  taskId: string,
  assigned_to: string,
  assigned_by: string,
) => {
  await Task.update(
    {
      assigned_to,
      assigned_by,
    },

    {
      where: { id: taskId },
    },
  );

  return findTaskByIdRepository(taskId);
};
