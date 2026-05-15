import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import {
  assignTaskService,
  createTaskService,
  deleteTaskService,
  getMyTasksService,
  getProjectTasksService,
  updateTaskService,
  updateTaskStatusService,
} from "./task.service";
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = await createTaskService(req.body, req.user?.id!);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Task created successfully", task));
});

export const getProjectTasks = catchAsync(
  async (req: Request, res: Response) => {
    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;
    const tasks = await getProjectTasksService(projectId);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(StatusCodes.OK, "Tasks fetched successfully", tasks),
      );
  },
);

export const getMyTasks = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const tasks = await getMyTasksService(userId);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Tasks fetched successfully", tasks));
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.taskId)
    ? req.params.taskId[0]
    : req.params.taskId;
  const task = await updateTaskService(taskId, req.body);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Task updated successfully", task));
});

export const updateTaskStatus = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = Array.isArray(req.params.taskId)
      ? req.params.taskId[0]
      : req.params.taskId;
    const { status } = req.body;
    const task = await updateTaskStatusService(taskId, status);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          "Task status updated successfully",
          task,
        ),
      );
  },
);

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.taskId)
    ? req.params.taskId[0]
    : req.params.taskId;
  await deleteTaskService(taskId);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Task deleted successfully", null));
});
export const assignTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.taskId)
    ? req.params.taskId[0]
    : req.params.taskId;
  const assignedTo = req.body.assigned_to;
  const userId = req.user?.id;

  if (!userId) throw new ApiError(StatusCodes.UNAUTHORIZED, "Access Denied!");

  const task = await assignTaskService(taskId, assignedTo, userId);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Task assigned successfully", task));
});
