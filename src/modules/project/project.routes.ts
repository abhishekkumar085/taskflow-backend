import { Router } from "express";
import { addMemberToProject, createProject } from "./project.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import {
  addProjectMemberSchema,
  createProjectSchema,
} from "./project.validation";

const router = Router();
router.post(
  "/create",
  authMiddleware,
  validate(createProjectSchema),
  createProject,
);
router.post(
  "/:projectId/add-member",
  authMiddleware,
  validate(addProjectMemberSchema),
  addMemberToProject,
);
export default router;
