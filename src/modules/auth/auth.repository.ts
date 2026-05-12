import { RefreshToken, User } from "../../models";
import { CreateUserInput } from "./auth.validation";

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

// *******************Refresh Token Repository*******************

export const createRefreshToken = async (payload: {
  user_id: string;
  token: string;
  expires_at: Date;
}) => {
  return RefreshToken.create(payload);
};
