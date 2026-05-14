import { Router } from "express";
import {
  createTask,
  deleteTask,
  getMyTasks,
  getProjectTasks,
  updateTask,
  updateTaskStatus,
} from "./task.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} from "./task.validation";

const router = Router();

router.post("/create", authMiddleware, validate(createTaskSchema), createTask);
router.get("/my-tasks", authMiddleware, getMyTasks);
router.get("/project/:projectId/tasks", authMiddleware, getProjectTasks);
router.patch(
  "/:taskId/update",
  authMiddleware,
  validate(updateTaskSchema),
  updateTask,
);
router.patch(
  "/:taskId/update-status",
  authMiddleware,
  validate(updateTaskStatusSchema),
  updateTaskStatus,
);

router.delete("/:taskId/delete", authMiddleware, deleteTask);

export default router;
