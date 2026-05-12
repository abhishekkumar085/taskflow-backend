import { Router } from "express";
import validate from "../../middlewares/validate.middleware";
import { createUserSchema, loginUserSchema } from "./auth.validation";
import { login, logout, refreshToken, register } from "./auth.contoller";

const router = Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", validate(loginUserSchema), login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
