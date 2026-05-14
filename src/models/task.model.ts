import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<string>;

  declare title: string;

  declare description: string | null;

  declare status: CreationOptional<"TODO" | "IN_PROGRESS" | "DONE">;

  declare priority: CreationOptional<"LOW" | "MEDIUM" | "HIGH">;

  declare due_date: Date | null;

  declare project_id: string;

  declare assigned_to: string | null;

  declare assigned_by: string | null;
  declare created_by: string;

  declare created_at: CreationOptional<Date>;

  declare updated_at: CreationOptional<Date>;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),

      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),

      defaultValue: "TODO",
    },

    priority: {
      type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),

      defaultValue: "MEDIUM",
    },

    due_date: {
      type: DataTypes.DATE,
    },

    project_id: {
      type: DataTypes.UUID,

      allowNull: false,
    },

    assigned_to: {
      type: DataTypes.UUID,
    },

    assigned_by: {
      type: DataTypes.UUID,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },

  {
    sequelize,

    tableName: "tasks",

    underscored: true,

    timestamps: true,
  },
);

export default Task;
