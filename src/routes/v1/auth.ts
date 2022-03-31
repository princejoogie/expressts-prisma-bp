import { Router } from "express";
import { validator } from "../../middlewares/validator";
import {
  loginController,
  registerController,
  refreshTokenController,
} from "../../controllers/auth";
import { loginSchema } from "../../dtos";

const router = Router();

router.get("/refresh-token", refreshTokenController);
router.post("/login", validator(loginSchema), loginController);
router.post("/register", validator(loginSchema), registerController);

export default router;
