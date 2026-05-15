import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  email: z.string().trim().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password too long"),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password too long"),
});

export const createRoleSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().optional(),
  created_by: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type createRoleInput = z.infer<typeof createRoleSchema>;
