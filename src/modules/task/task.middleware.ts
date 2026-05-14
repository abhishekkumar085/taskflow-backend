import { Request, Response, NextFunction } from "express";
import { ProjectMember, Task } from "../../models";
import Role from "../../models/role.model";
import ApiError from "../../utils/ApiError";
import { StatusCodes } from "http-status-codes";

export const canManageTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const projectId = req.body.project_id;
  const member = await ProjectMember.findOne({
    where: {
      project_id: projectId,
      user_id: req.user?.id,
    },
    include: [
      {
        model: Role,
      },
    ],
  });
  if (!member) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Access denied");
  }
  const roleName = (member as any).Role.name;
  const allowedRoles = ["Manager", "Team Lead"];
  if (!allowedRoles.includes(roleName)) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "Only Manager or Team Lead can manage tasks",
    );
  }

  next();
};

export const canUpdateTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const taskId = Array.isArray(req.params.taskId)
    ? req.params.taskId[0]
    : req.params.taskId;
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Task not found");
  }

  if (task.assigned_to !== req?.user?.id) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You can only update your own tasks",
    );
  }

  next();
};
