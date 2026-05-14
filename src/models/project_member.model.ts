import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import sequelize from "../config/database";



class ProjectMember extends Model<
  InferAttributes<ProjectMember>,
  InferCreationAttributes<ProjectMember>
> {

  declare id:
    CreationOptional<string>;

  declare project_id: string;

  declare user_id: string;

  declare role_id: string;

  declare added_by:
    CreationOptional<string>;

  declare joined_at:
    CreationOptional<Date>;

  declare created_at:
    CreationOptional<Date>;

  declare updated_at:
    CreationOptional<Date>;
}



ProjectMember.init(
  {

    id: {
      type: DataTypes.UUID,

      defaultValue:
        DataTypes.UUIDV4,

      primaryKey: true,
    },


    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    added_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    joined_at: {
      type: DataTypes.DATE,
      defaultValue:
        DataTypes.NOW,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "project_members",
    underscored: true,
    timestamps: true,
  }
);

export default ProjectMember;