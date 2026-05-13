import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import catchAsync from "../../utils/catchAsync";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "./auth.service";
import { Request, Response } from "express";

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        "User registered successfully",
        user,
      ),
    );
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const data = await loginUser(req.body);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "User logged in successfully", data));
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const data = await refreshAccessToken(refreshToken);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, "Token refreshed successfully", data),
    );
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  await logoutUser(refreshToken);
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, "Logged out successfully", {}));
});

export const UserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = await getUserProfile(req.params.userId as string);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        "User profile fetched successfully",
        user,
      ),
    );
});
