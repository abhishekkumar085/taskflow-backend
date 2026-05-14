export type CreateTaskInput = {
  title: string;
  description?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  due_date?: Date;
  project_id: string;
  assigned_to?: string;
  assigned_by: string;
  created_by: string;
};

export type UpdateTaskInput = {
  title?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  due_date?: Date;
  assigned_to?: string;
  assigned_by?: string;
  created_by?: string;
};

export type UpdateTaskStatusInput = {
  status: "TODO" | "IN_PROGRESS" | "DONE";
};
