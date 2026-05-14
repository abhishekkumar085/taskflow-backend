import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import sequelize from "../config/database";
class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare id:
    CreationOptional<string>;
  declare name: string;
  declare description:
    CreationOptional<string>;
  declare created_by:
    CreationOptional<string>;
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue:
        DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },

  {
    sequelize,
    tableName: "roles",
    underscored: true,
    timestamps: true,
  }
);

export default Role;