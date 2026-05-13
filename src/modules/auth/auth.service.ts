import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";
import logger from "../../utils/logger";
import {
  createRefreshToken,
  createUser,
  findUserByEmail,
} from "./auth.repository";
import { CreateUserInput, LoginUserInput } from "./auth.validation";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/token";
import { RefreshToken } from "../../models";
import { deleteCache, getCache, setCache } from "../../common/utils/redis.util";
import { CACHE_KEYS } from "../../common/constants/cache";
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
    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      role: user.role,
    });
    await createRefreshToken({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
    await setCache(
      `${CACHE_KEYS.REFRESH_TOKEN}:${user.id}`,
      refreshToken,
      7 * 24 * 60 * 60, // 7 days in seconds
    );

    const plainUser = user.toJSON();

    const { password, ...userResponse } = plainUser;

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  } catch (error) {
    logger.error(`Error logging in user: ${error}`);
    throw error;
  }
};

export const refreshAccessToken = async (token: string) => {
  try {
    // const existingToken = await RefreshToken.findOne({
    //   where: {
    //     token,
    //     is_revoked: false,
    //   },
    // });
    // if (!existingToken) {
    //   throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    // }

    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!,
    ) as jwt.JwtPayload;

    const storedToken = await getCache<string>(
      `${CACHE_KEYS.REFRESH_TOKEN}:${decoded.id}`,
    );

    if (!storedToken || storedToken !== token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    }

    const accessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role,
    });
    return {
      accessToken,
    };
  } catch (error) {
    logger.error(`Error refreshing access token: ${error}`);
    throw error;
  }
};

export const logoutUser = async (token: string) => {
  try {
    // const refreshToken = await RefreshToken.findOne({
    //   where: { token },
    // });

    // if (!refreshToken) {
    //   return;
    // }
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!,
    ) as jwt.JwtPayload;
    const storedToken = await getCache<string>(
      `${CACHE_KEYS.REFRESH_TOKEN}:${decoded.id}`,
    );
    if (!storedToken || storedToken !== token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    }
    await deleteCache(`${CACHE_KEYS.REFRESH_TOKEN}:${decoded.id}`);
  } catch (error) {
    logger.error(`Error logging out user: ${error}`);
    throw error;
  }
};
