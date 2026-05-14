export type CreateProjectRepositoryInput = {
  name: string;
  description?: string;
  created_by: string;
};

export type AddProjectMemberInput = {
  project_id: string;
  user_id: string;
  role_id: string;
  added_by: string;
};

export type AddProjectMemberPayload = {
  user_id: string;

  role_id: string;
};
