import { Router } from "express";
import { createProject } from "./project.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import { createProjectSchema } from "./project.validation";

const router = Router();
router.post(
  "/create",
  authMiddleware,
  validate(createProjectSchema),
  createProject,
);

export default router;
