import { Router } from "express";
import validate from "../../middlewares/validate.middleware";
import {
  createRoleSchema,
  createUserSchema,
  loginUserSchema,
} from "./auth.validation";
import {
  createRole,
  findAllRole,
  findAllUser,
  login,
  logout,
  refreshToken,
  register,
  UserProfile,
} from "./auth.contoller";
import authMiddleware from "../../middlewares/auth.middleware";
import authorize from "../../middlewares/role.middleware";

const router = Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", validate(loginUserSchema), login);
router.post("/refresh-token", authMiddleware, refreshToken);
router.post("/logout", authMiddleware, logout);
router.get("/me/:userId", authMiddleware, UserProfile);
router.post(
  "/create-role",
  authMiddleware,
  authorize("ADMIN"),
  validate(createRoleSchema),
  createRole,
);
router.get("/roles", authMiddleware, findAllRole);
router.get("/users", authMiddleware, findAllUser);

export default router;
