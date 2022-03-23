import { Router } from "express";
import auth from "./auth";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "api v1",
  });
});

router.use("/auth", auth);

export default router;
