import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

import sequelize from "../config/database";

import User from "./user.model";

class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<string>;

  declare user_id: ForeignKey<User["id"]>;

  declare token: string;

  declare expires_at: Date;

  declare is_revoked: CreationOptional<boolean>;

  declare created_at: CreationOptional<Date>;

  declare updated_at: CreationOptional<Date>;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    is_revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    created_at: {
      type: DataTypes.DATE,

      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,

      defaultValue: DataTypes.NOW,
    },
  },

  {
    sequelize,

    tableName: "refresh_tokens",

    underscored: true,

    timestamps: true,
  },
);

export default RefreshToken;
