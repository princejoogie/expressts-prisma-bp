import { Router } from "express";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import auth from "./auth";
import posts from "./posts";

const router = Router();

router.get("/", async (_, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({
      message: "expressts-prisma-bp API v1",
      databaseConnected: true,
    });
  } catch (e: any) {
    const error = new AppError(
      "InternalServerErrorException",
      "Cannot connect to database"
    );
    return next(error);
  }
});

router.use("/auth", auth);
router.use("/posts", posts);

export default router;
