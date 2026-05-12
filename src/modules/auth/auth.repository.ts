import { User } from "../../models";
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
