import { Project, ProjectMember } from "../../models";
import Role from "../../models/role.model";
import { CreateProjectRepositoryInput } from "./project.types";
import { AddProjectMemberInput } from "./project.types";

export const createProject = async (payload: CreateProjectRepositoryInput) => {
  return Project.create(payload);
};

export const findAllProjects = async () => {
  return Project.findAll();
};

export const findProjectById = async (id: string) => {
  return Project.findByPk(id);
};

export const findRoleById = async (roleId: string) => {
  return Role.findByPk(roleId);
};

export const findProjectMember = async (projectId: string, userId: string) => {
  return ProjectMember.findOne({
    where: { project_id: projectId, user_id: userId },
  });
};

export const addProjectMember = async (payload: AddProjectMemberInput) => {
  return ProjectMember.create(payload);
};

export const updateProject = async (
  id: string,
  payload: Partial<CreateProjectRepositoryInput>,
) => {
  const project = await findProjectById(id);
  if (!project) {
    throw new Error("Project not found");
  }
  return project.update(payload);
};

export const deleteProject = async (id: string) => {
  const project = await findProjectById(id);
  if (!project) {
    throw new Error("Project not found");
  }
  return project.destroy();
};

export const getProjectsByUserId = async (userId: string) => {
  return Project.findAll({ where: { created_by: userId } });
};
