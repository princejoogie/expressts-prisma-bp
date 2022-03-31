import { Router } from "express";
import auth from "./auth";
import posts from "./posts";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "api v1 test",
  });
});

router.use("/auth", auth);
router.use("/posts", posts);

export default router;
