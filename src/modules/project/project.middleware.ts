import { Request, Response, NextFunction } from "express";
import ApiError from "../../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import Role from "../../models/role.model";
import { ProjectMember } from "../../models";

export const canManageProjectMembers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role === "ADMIN") {
    return next();
  }

  const member = await ProjectMember.findOne({
    where: {
      project_id: req.params.projectId,
      user_id: req.user?.id,
    },
    include: [
      {
        model: Role,
        as: "role",
        required: true,
      },
    ],
  });

  if (!member) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Access denied");
  }
  const roleName = (member as any).role?.name;
  if (roleName !== "Manager") {
    throw new ApiError(StatusCodes.FORBIDDEN, "Only Manager can add members");
  }

  next();
};
