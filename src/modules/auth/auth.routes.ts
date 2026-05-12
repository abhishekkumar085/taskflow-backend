import { Router } from "express";
import validate from "../../middlewares/validate.middleware";
import { createUserSchema, loginUserSchema } from "./auth.validation";
import { login, register } from "./auth.contoller";

const router = Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", validate(loginUserSchema), login);

export default router;
