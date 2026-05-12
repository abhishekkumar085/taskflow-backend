import Project from "./project.model";
import ProjectMember from "./project_member.model";
import Task from "./task.model";
import User from "./user.model";

// =========================
// USER ↔ PROJECT (Creator)
// =========================

User.hasMany(Project, {
  foreignKey: "created_by",
  as: "createdProjects",
});

Project.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
});

// =========================
// PROJECT ↔ TASK
// =========================

Project.hasMany(Task, {
  foreignKey: "project_id",
  as: "tasks",
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

// =========================
// USER ↔ TASK (Assigned)
// =========================

User.hasMany(Task, {
  foreignKey: "assigned_to",
  as: "assignedTasks",
});

Task.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "assignee",
});

// =========================
// USER ↔ TASK (Created)
// =========================

User.hasMany(Task, {
  foreignKey: "created_by",
  as: "createdTasks",
});

Task.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
});

// =========================
// USER ↔ PROJECT (Members)
// =========================

User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: "user_id",
  as: "projects",
});

Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: "project_id",
  as: "members",
});

// =========================
// PROJECT MEMBER RELATIONS
// =========================

User.hasMany(ProjectMember, {
  foreignKey: "user_id",
});

Project.hasMany(ProjectMember, {
  foreignKey: "project_id",
});

ProjectMember.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

ProjectMember.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

export { User, Project, Task, ProjectMember };
