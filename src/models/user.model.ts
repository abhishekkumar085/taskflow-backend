import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import sequelize from "../config/database";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;

  declare name: string;

  declare email: string;

  declare password: string;

  declare role: "ADMIN" | "MEMBER";
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "MEMBER"),
      defaultValue: "MEMBER",
    },
  },

  {
    sequelize,

    tableName: "users",

    underscored: true,

    timestamps: true,
  },
);

export default User;
