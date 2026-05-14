import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import catchAsync from "../../utils/catchAsync";
import {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  getProjectsByUserIdService,
} from "./project.service";
import { Request, Response } from "express";

export const createProject = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new Error("User not authenticated");
  const user = await createProjectService(req.body, userId);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, "Project created successfully", user),
    );
});

export const getAllProjects = catchAsync(
  async (req: Request, res: Response) => {
    const projects = await getAllProjectsService();
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          "Projects fetched successfully",
          projects,
        ),
      );
  },
);

export const getProjectsByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new Error("User not authenticated");
    const projects = await getProjectsByUserIdService(userId);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          "Projects fetched successfully",
          projects,
        ),
      );
  },
);

export const getProjectById = catchAsync(
  async (req: Request, res: Response) => {
    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;
    if (!projectId) throw new Error("Project ID is required");
    const project = await getProjectByIdService(projectId);
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          "Project fetched successfully",
          project,
        ),
      );
  },
);
