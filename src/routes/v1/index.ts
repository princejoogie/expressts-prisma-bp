import { Router } from "express";
import auth from "./auth";
import post from "./post";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "api v1 test",
  });
});

router.use("/auth", auth);
router.use("/post", post);

export default router;
