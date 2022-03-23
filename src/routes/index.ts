import { Router } from "express";
import { validator } from "../middlewares/validator";
import { authController } from "../controllers/auth.controller";
import { authSchema } from "../dtos";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "hello world",
  });
});

router.post("/login", validator(authSchema), authController);

export default router;
