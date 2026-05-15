import { RefreshToken, User } from "../../models";
import Role from "../../models/role.model";
import { createRoleInput, CreateUserInput } from "./auth.validation";

export const createUser = async (userData: CreateUserInput) => {
  const response = await User.create(userData);
  return response;
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export const findUserById = async (id: string) => {
  const user = await User.findByPk(id);
  return user;
};

export const findAllUserRepository = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  return users;
};

// *******************Refresh Token Repository*******************

export const createRefreshToken = async (payload: {
  user_id: string;
  token: string;
  expires_at: Date;
}) => {
  return RefreshToken.create(payload);
};

// ********************Roles Repository*****************************
export const createRoleRepository = async (payload: createRoleInput) => {
  return Role.create(payload);
};
export const findAllRoleRepository = async () => {
  return Role.findAll();
};
