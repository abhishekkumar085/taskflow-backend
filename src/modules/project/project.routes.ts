import { Router } from "express";
import { addMemberToProject, createProject } from "./project.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import {
  addProjectMemberSchema,
  createProjectSchema,
} from "./project.validation";
import authorize from "../../middlewares/role.middleware";
import { canManageProjectMembers } from "./project.middleware";

const router = Router();
router.post(
  "/create",
  authMiddleware,
  authorize("ADMIN"),
  validate(createProjectSchema),
  createProject,
);
router.post(
  "/:projectId/add-member",
  authMiddleware,
  //   authorize("ADMIN"),
  canManageProjectMembers,
  validate(addProjectMemberSchema),
  addMemberToProject,
);
export default router;
