import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";
import logger from "../../utils/logger";
import { createUser, findUserByEmail } from "./auth.repository";
import { CreateUserInput, LoginUserInput } from "./auth.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (payload: CreateUserInput) => {
  try {
    const existingUser = await findUserByEmail(payload.email);
    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const response = await createUser({ ...payload, password: hashedPassword });
    return response;
  } catch (error) {
    logger.error(`Error registering user: ${error}`);
    throw error;
  }
};

export const loginUser = async (payload: LoginUserInput) => {
  try {
    const user = await findUserByEmail(payload.email);
    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
    const plainUser = user.toJSON();

    const { password, ...userResponse } = plainUser;

    return {
      token,
      user: userResponse,
    };
  } catch (error) {
    logger.error(`Error logging in user: ${error}`);
    throw error;
  }
};
