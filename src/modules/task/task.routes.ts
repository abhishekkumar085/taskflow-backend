import { Router } from "express";
import {
  assignTask,
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
import {
  canAssignTask,
  canManageTasks,
  canUpdateTaskStatus,
} from "./task.middleware";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  canManageTasks,
  validate(createTaskSchema),
  createTask,
);
router.get("/my-tasks", authMiddleware, getMyTasks);
router.get("/project/:projectId/tasks", authMiddleware, getProjectTasks);
router.patch(
  "/:taskId/update",
  authMiddleware,
  canManageTasks,
  validate(updateTaskSchema),
  updateTask,
);
router.patch(
  "/:taskId/update-status",
  authMiddleware,
  canUpdateTaskStatus,
  validate(updateTaskStatusSchema),
  updateTaskStatus,
);

router.delete("/:taskId/delete", authMiddleware, canManageTasks, deleteTask);

router.patch("/:taskId/assign", authMiddleware, canAssignTask, assignTask);

export default router;
