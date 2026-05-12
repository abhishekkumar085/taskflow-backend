import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import catchAsync from "../../utils/catchAsync";
import { loginUser, registerUser } from "./auth.service";
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
