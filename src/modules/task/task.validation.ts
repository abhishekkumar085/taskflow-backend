import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(3),

  description: z.string().optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),

  due_date: z.string().datetime().optional(),

  project_id: z.uuid(),

  assigned_to: z.uuid().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(3).optional(),

  description: z.string().optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),

  due_date: z.string().datetime().optional(),

  assigned_to: z.uuid().optional(),
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

// =========================
// TYPES
// =========================

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export type UpdateTaskStatusInput = z.infer<typeof updateTaskStatusSchema>;
