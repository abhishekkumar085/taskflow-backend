import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(3),
  description: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const addProjectMemberSchema = z.object({
  user_id: z.uuid(),

  role_id: z.uuid(),
});

export type AddProjectMemberInput = z.infer<typeof addProjectMemberSchema>;
